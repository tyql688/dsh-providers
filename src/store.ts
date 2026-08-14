/**
 * The pi-ai `CredentialStore` this plugin hands to `builtinModels()`. One
 * store, two backings: OAuth credentials have no home in dsh's credential seam
 * and live in this plugin's `$DSH_HOME/auth.json`, while api keys already have
 * one — the seam's managed document, which the shipped Models page also writes
 * — and are delegated there through {@link KeyPort} so one key has one source
 * of truth.
 */

import { chmod, mkdir, readFile, stat } from 'node:fs/promises'
import { dirname } from 'node:path'
import { withFileLock, writeFileAtomic } from '@deepseek-ai/dsh-atomic-write'
import { credentialRef } from '@deepseek-ai/dsh-credentials'
import type { CredentialRef } from '@deepseek-ai/dsh-credentials'
import type {
  AuthOperationOptions,
  Credential,
  CredentialInfo,
  CredentialStore,
  OAuthCredential,
} from '@earendil-works/pi-ai'
import { providerRef } from './refs.ts'

/** Owner-only permissions for a document holding refresh tokens. */
const FILE_MODE = 0o600
/** Owner-only permissions for the directory this document is created in. */
const DIR_MODE = 0o700
/** Permission bits outside the owner; a token document must have none of them. */
const GROUP_OTHER_BITS = 0o077
/** How long a parsed document answers reads before it is re-read from disk. */
const READ_CACHE_MS = 50

/**
 * The credential-seam side of the store: how an api-key value reaches and
 * leaves `$DSH_HOME/.credentials.yaml`. Implemented by the credential provider
 * itself over its own local layers, which keeps this store free of any opinion
 * about environment precedence.
 */
export interface KeyPort {
  /**
   * Value of one reference in the seam's managed document ONLY.
   *
   * Deliberately not the effective layered value: a key exported in the
   * environment or written into a `.env` is not a credential this plugin
   * stores, and reporting it as one would make the page offer to sign out of
   * an account it never held. Ambient values still reach requests through the
   * provider's own discovery, where they belong.
   */
  readStoredKey(ref: CredentialRef): Promise<string | undefined>
  /** Store one value, or remove it when `value` is undefined. */
  writeKey(ref: CredentialRef, value: string | undefined): Promise<void>
}

/**
 * What `auth.json` holds for an api-key provider: the *names* of the extra
 * references its credential spreads across, so {@link AuthStore.read} can
 * reassemble the `env` map pi-ai's `resolve()` expects. Cloudflare needs this
 * — its login collects an account id and a gateway id beside the key. No
 * secret value is recorded here.
 */
interface ApiKeyRecord {
  type: 'api_key'
  /** Reference names carrying this credential's provider-scoped extras. */
  envRefs?: string[]
}

/** One entry of the document: a whole OAuth credential, or api-key metadata. */
type StoredEntry = OAuthCredential | ApiKeyRecord

/** The `auth.json` document: entries keyed by pi-ai provider id. */
type AuthDocument = Record<string, StoredEntry>

/** Whether an entry is a complete OAuth credential rather than api-key metadata. */
function isOAuthEntry(entry: StoredEntry | undefined): entry is OAuthCredential {
  return entry?.type === 'oauth'
}

/**
 * Validate one reference name through the seam's own constructor, instead of
 * casting: `envRefs` comes out of a user-editable document, and an invalid
 * name written into the credentials file would fail plugin activation on the
 * next boot.
 * @returns the reference, or undefined for a name the seam cannot hold.
 */
function asRef(name: string): CredentialRef | undefined {
  try {
    return credentialRef(name)
  } catch {
    return undefined
  }
}

/**
 * Narrow a token document other OS users can read, before reading its
 * contents. This store creates and replaces the file at `0600`, but a
 * hand-written or restored-from-backup one carries whatever umask produced
 * it, and serving refresh tokens out of a world-readable file would defeat
 * the promised mode. POSIX only: Windows has no mode to inspect.
 */
async function assertOwnerOnly(filename: string): Promise<void> {
  if (process.platform === 'win32') return
  let mode: number
  try {
    mode = (await stat(filename)).mode
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return
    throw error
  }
  if ((mode & GROUP_OTHER_BITS) === 0) return
  // Narrowing is the actionable repair and this process owns the file, so fix
  // it rather than refusing to start with tokens the user still cannot reach.
  await chmod(filename, FILE_MODE)
}

/**
 * Credential storage for pi-ai, split between this plugin's token document and
 * the harness credential seam.
 */
export class AuthStore implements CredentialStore {
  /** @param providerIds - every provider id this store may be asked about; `list()` scans it. */
  constructor(
    private readonly authPath: string,
    private readonly keys: KeyPort,
    private readonly providerIds: () => readonly string[],
  ) {}

  /**
   * Most recent parse and when it was taken. Listing the accounts page asks
   * about every installed provider at once, and each question would otherwise
   * re-read the same document. A window this short cannot outlive a
   * user-visible state change, and every write path reads fresh under the lock.
   */
  private cached: { document: AuthDocument; at: number } | undefined

  /** Parse the document through the short read cache. */
  private async load(): Promise<AuthDocument> {
    const now = Date.now()
    if (this.cached !== undefined && now - this.cached.at < READ_CACHE_MS) return this.cached.document
    const document = await this.loadFresh()
    this.cached = { document, at: now }
    return document
  }

  /** Parse the document, treating an absent one as empty. */
  private async loadFresh(): Promise<AuthDocument> {
    await assertOwnerOnly(this.authPath)
    let text: string
    try {
      text = await readFile(this.authPath, 'utf8')
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {}
      throw error
    }
    if (text.trim().length === 0) return {}
    const parsed: unknown = JSON.parse(text)
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error(`dsh-providers: ${this.authPath} is not a JSON object`)
    }
    return parsed as AuthDocument
  }

  /** Replace the document atomically at owner-only permissions. */
  private async save(document: AuthDocument): Promise<void> {
    await writeFileAtomic(this.authPath, `${JSON.stringify(document, null, 2)}\n`, {
      mode: FILE_MODE,
      dirMode: DIR_MODE,
    })
    this.cached = { document, at: Date.now() }
  }

  /** Take the cross-process document lock, creating its directory first. */
  private async locked<T>(operation: () => Promise<T>): Promise<T> {
    await mkdir(dirname(this.authPath), { recursive: true, mode: DIR_MODE })
    return withFileLock(this.authPath, operation)
  }

  /** Assemble one api-key credential from the seam, or undefined when nothing is stored. */
  private async readApiKey(
    providerId: string,
    record: ApiKeyRecord | undefined,
  ): Promise<Credential | undefined> {
    const key = await this.keys.readStoredKey(providerRef(providerId))
    const env: Record<string, string> = {}
    for (const name of record?.envRefs ?? []) {
      const ref = asRef(name)
      if (ref === undefined) continue
      const value = await this.keys.readStoredKey(ref)
      if (value !== undefined) env[name] = value
    }
    // No key means no credential: the extras alone cannot authenticate.
    if (key === undefined) return undefined
    return {
      type: 'api_key',
      key,
      ...Object.keys(env).length > 0 ? { env } : {},
    }
  }

  /** Read one provider's credential from whichever backing owns its kind. */
  private async readEntry(document: AuthDocument, providerId: string): Promise<Credential | undefined> {
    const entry = document[providerId]
    if (isOAuthEntry(entry)) return entry
    return this.readApiKey(providerId, entry)
  }

  /** Commit one credential into whichever backing owns its kind. */
  private async writeEntry(
    document: AuthDocument,
    providerId: string,
    credential: Credential,
  ): Promise<AuthDocument> {
    if (credential.type === 'oauth') {
      // Signing in with OAuth supersedes a key this plugin stored for the same
      // provider; leaving it would keep answering after the token expires. The
      // previous entry's env extras go with it: overwriting the ApiKeyRecord
      // is the last record naming them, and secrets nothing points at would
      // sit in the credentials document forever.
      const previous = document[providerId]
      await this.keys.writeKey(providerRef(providerId), undefined)
      if (!isOAuthEntry(previous)) {
        for (const name of previous?.envRefs ?? []) {
          const ref = asRef(name)
          if (ref !== undefined) await this.keys.writeKey(ref, undefined)
        }
      }
      return { ...document, [providerId]: credential }
    }
    await this.keys.writeKey(providerRef(providerId), credential.key)
    const envRefs = Object.keys(credential.env ?? {})
    for (const [name, value] of Object.entries(credential.env ?? {})) {
      const ref = asRef(name)
      if (ref === undefined) {
        throw new Error(`dsh-providers: the ${providerId} login returned "${name}", which is not a storable credential reference name`)
      }
      await this.keys.writeKey(ref, value)
    }
    // Extras the previous credential stored that the new one no longer names
    // would otherwise linger unreferenced; same hygiene as the OAuth path.
    const previous = document[providerId]
    if (!isOAuthEntry(previous)) {
      for (const name of previous?.envRefs ?? []) {
        if (envRefs.includes(name)) continue
        const ref = asRef(name)
        if (ref !== undefined) await this.keys.writeKey(ref, undefined)
      }
    }
    return {
      ...document,
      [providerId]: { type: 'api_key', ...envRefs.length > 0 ? { envRefs } : {} },
    }
  }

  /** Remove one provider from both backings. */
  private async deleteEntry(document: AuthDocument, providerId: string): Promise<AuthDocument> {
    const entry = document[providerId]
    if (!isOAuthEntry(entry)) {
      await this.keys.writeKey(providerRef(providerId), undefined)
      for (const name of entry?.envRefs ?? []) {
        const ref = asRef(name)
        if (ref !== undefined) await this.keys.writeKey(ref, undefined)
      }
    }
    const { [providerId]: _removed, ...kept } = document
    return kept
  }

  /** Read the stored credential, possibly expired; undefined when this plugin stores none. */
  async read(providerId: string, _options?: AuthOperationOptions): Promise<Credential | undefined> {
    return this.readEntry(await this.load(), providerId)
  }

  /** One entry per provider this plugin has a credential for, without exposing secrets. */
  async list(_options?: AuthOperationOptions): Promise<readonly CredentialInfo[]> {
    const document = await this.load()
    const infos: CredentialInfo[] = []
    const seen = new Set<string>()
    for (const [providerId, entry] of Object.entries(document)) {
      if (isOAuthEntry(entry)) {
        infos.push({ providerId, type: 'oauth' })
        seen.add(providerId)
      }
    }
    // An api key stored through the shipped Models page leaves no entry in
    // this document, so a stored value counts as a credential even without one
    // — but only a STORED value: see `KeyPort.readStoredKey`.
    for (const providerId of this.providerIds()) {
      if (seen.has(providerId)) continue
      if (await this.keys.readStoredKey(providerRef(providerId)) !== undefined) {
        infos.push({ providerId, type: 'api_key' })
      }
    }
    return infos
  }

  /**
   * The only write path: a serialized read-modify-write under the document
   * lock. `Models.getAuth()` runs OAuth refresh inside this callback, which is
   * what makes a rotated token safe against concurrent requests — across
   * processes, not just within this one.
   * @param fn - receives the current credential and returns the next one, or
   *   undefined to leave it unchanged.
   */
  async modify(
    providerId: string,
    fn: (current: Credential | undefined) => Promise<Credential | undefined>,
    _options?: AuthOperationOptions,
  ): Promise<Credential | undefined> {
    return this.locked(async () => {
      const document = await this.loadFresh()
      const current = await this.readEntry(document, providerId)
      const next = await fn(current)
      if (next === undefined) return current
      await this.save(await this.writeEntry(document, providerId, next))
      return next
    })
  }

  /** Remove a provider's credential from both backings. */
  async delete(providerId: string, _options?: AuthOperationOptions): Promise<void> {
    await this.locked(async () => {
      await this.save(await this.deleteEntry(await this.loadFresh(), providerId))
    })
  }

  /**
   * Read one provider's stored OAuth credential without touching the seam.
   * The credential provider needs exactly this to decide whether a reference
   * is answered by a token or by its ordinary local layers.
   */
  async readOAuth(providerId: string): Promise<OAuthCredential | undefined> {
    const entry = (await this.load())[providerId]
    return isOAuthEntry(entry) ? entry : undefined
  }

  /** Every provider this plugin currently holds an OAuth credential for, in document order. */
  async oauthProviders(): Promise<string[]> {
    return Object.entries(await this.load())
      .filter(([, entry]) => isOAuthEntry(entry))
      .map(([providerId]) => providerId)
  }
}
