/**
 * The pi.dev model catalog overlay — this plugin's equivalent of the "update
 * model catalogs" button in pi's own coding agent, which overlays the same
 * public endpoint onto the baked `providers/data/*.json`. The protocol mirrors
 * pi's: ETag revalidation, `last-modified` ordering against the baked data's
 * stamp, and a freshness window.
 */

import { mkdir, readFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { withFileLock, writeFileAtomic } from '@deepseek-ai/dsh-atomic-write'

/** Where the curated catalog is served. pi's own default. */
const CATALOG_BASE_URL = 'https://pi.dev'

/**
 * How long a checked provider is trusted before another request goes out.
 * pi's interval: long enough that opening the page is free, short enough that
 * a model announced this morning arrives today.
 */
const CATALOG_REFRESH_INTERVAL_MS = 4 * 60 * 60 * 1000

/**
 * Per-attempt ceiling, deliberately short. The failure this guards against is
 * not a slow reply but a connection that never establishes — behind a VPN or a
 * proxying resolver a first connection can stall indefinitely, and waiting out
 * a long ceiling only delays the retry that works.
 */
const REQUEST_TIMEOUT_MS = 8_000

/** Attempts per provider; pi's catalog client retries for the same reason. */
const REQUEST_ATTEMPTS = 3

/** Pause before retrying, scaled by attempt, so a fast-failing resolver is not hit three times in a row. */
const RETRY_DELAY_MS = 250

/** Owner-only permissions, matching the token document beside it. */
const FILE_MODE = 0o600

/** Directory permissions for the harness home, when this document creates it. */
const DIR_MODE = 0o700

/**
 * One model as the catalog describes it. Everything beyond the id is optional
 * because this is someone else's document: a catalog that grows a field must
 * not break this reader, and one that drops a field must fall back to the
 * baked value rather than crash.
 */
export interface CatalogModel {
  id: string
  name?: string
  /** Wire protocol this model speaks — the one field a listing endpoint cannot tell us. */
  api?: string
  /** Endpoint this model is served from, when it differs from the provider's. */
  baseUrl?: string
  contextWindow?: number
  maxTokens?: number
  /** Accepted request modalities, e.g. `["text", "image"]`. */
  input?: readonly string[]
  /** Whether the model reasons at all. */
  reasoning?: boolean
  /**
   * Thinking level → wire spelling. `null` marks the level unsupported; a
   * missing key means the provider default, which pi-ai reads as supported for
   * the five base levels and unsupported for `xhigh` and `max`.
   */
  thinkingLevelMap?: Record<string, string | null>
  /** Protocol compatibility switches; the adapter's profile schema names only these two. */
  compat?: { supportsReasoningEffort?: boolean; thinkingFormat?: string }
  /** Request headers this model needs. */
  headers?: Record<string, string>
}

/** One provider's cached catalog plus the validators used to revalidate it. */
interface CatalogEntry {
  models: CatalogModel[]
  /** When this provider was last checked, epoch ms. */
  checkedAt: number
  /** `last-modified` of the served catalog, epoch ms; 0 means the server serves none. */
  lastModified?: number
  /** `etag` verbatim, quotes included, echoed back as `if-none-match`. */
  etag?: string
}

/** The document: one entry per provider id. */
type CatalogDocument = Record<string, CatalogEntry>

/** Outcome of one provider's refresh, for reporting a mixed batch honestly. */
export interface RefreshOutcome {
  /** The models now cached for this provider, baked overlay excluded. */
  models: readonly CatalogModel[]
  /** Whether the served catalog changed what was cached. */
  changed: boolean
}

/** Parse one catalog body, which the server may shape as a dict, a list, or `{models}`. */
function parseCatalog(providerId: string, value: unknown): CatalogModel[] {
  const entries = Array.isArray(value)
    ? value
    : typeof value === 'object' && value !== null && 'models' in value && Array.isArray(value.models)
      ? value.models
      : typeof value === 'object' && value !== null
        ? Object.values(value)
        : undefined
  if (entries === undefined) throw new Error(`dsh-providers: ${providerId} answered a catalog this reader cannot parse`)
  return entries.filter((entry): entry is CatalogModel => (
    typeof entry === 'object' && entry !== null && typeof (entry as CatalogModel).id === 'string'
  ))
}

/**
 * The models to overlay; empty when the cached catalog is not newer than the
 * baked data. A catalog served before this package's data was generated has
 * nothing to add and would silently downgrade a model the baked data
 * describes better, so it is ignored. pi applies the same test with the same
 * stamp.
 */
function usableModels(entry: CatalogEntry | undefined, bakedGeneratedAt: number | undefined): readonly CatalogModel[] {
  if (entry === undefined) return []
  if (bakedGeneratedAt !== undefined && (entry.lastModified === undefined || entry.lastModified <= bakedGeneratedAt)) {
    return []
  }
  return entry.models
}

/**
 * The persisted pi.dev catalog overlay. Reads are cheap and offline; only
 * {@link RemoteCatalog.refresh} touches the network. The document is written
 * under the same cross-process lock the token store uses.
 */
export class RemoteCatalog {
  /** Parsed document, held for the process; every write refreshes it. */
  private document: CatalogDocument | undefined

  /**
   * @param bakedGeneratedAt - generation stamp of the installed pi-ai's model data.
   * @param baseUrl - where the catalog is served; overridable for testing.
   */
  constructor(
    private readonly path: string,
    private readonly bakedGeneratedAt: number | undefined,
    private readonly baseUrl: string = CATALOG_BASE_URL,
  ) {}

  /** Parse the document, treating an absent or corrupt one as empty. */
  private async load(): Promise<CatalogDocument> {
    if (this.document !== undefined) return this.document
    let text: string
    try {
      text = await readFile(this.path, 'utf8')
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return this.document = {}
      throw error
    }
    try {
      const parsed: unknown = JSON.parse(text)
      if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object')
      return this.document = parsed as CatalogDocument
    } catch {
      // A cache is not worth failing a boot over: a damaged one is an empty
      // one, and the next refresh rewrites it.
      return this.document = {}
    }
  }

  /** Replace one provider's entry, under the document lock. */
  private async commit(providerId: string, entry: CatalogEntry): Promise<void> {
    await mkdir(dirname(this.path), { recursive: true, mode: DIR_MODE })
    await withFileLock(this.path, async () => {
      // Re-read inside the lock: another process may have refreshed a
      // different provider since this one's document was parsed.
      this.document = undefined
      const document = { ...await this.load(), [providerId]: entry }
      await writeFileAtomic(this.path, `${JSON.stringify(document, null, 2)}\n`, {
        mode: FILE_MODE,
        dirMode: DIR_MODE,
      })
      this.document = document
    })
  }

  /** The overlay cached for one provider, without touching the network. */
  async stored(providerId: string): Promise<readonly CatalogModel[]> {
    return usableModels((await this.load())[providerId], this.bakedGeneratedAt)
  }

  /** When one provider was last checked against the server. */
  async checkedAt(providerId: string): Promise<number | undefined> {
    return (await this.load())[providerId]?.checkedAt
  }

  /**
   * Fetch one provider's catalog, revalidating what is cached.
   *
   * An unserved provider does not throw: the endpoint answers 404 for a
   * provider pi.dev does not publish, which is a fact about that provider, not
   * a failure of the refresh. A transport failure or a 5xx does throw, so a
   * batch can report which providers it could not reach.
   * @param options - `force` bypasses the freshness window; `signal` cancels.
   */
  async refresh(
    providerId: string,
    options: { force?: boolean; signal?: AbortSignal } = {},
  ): Promise<RefreshOutcome> {
    const document = await this.load()
    const stored = document[providerId]
    const cached = usableModels(stored, this.bakedGeneratedAt)

    if (
      options.force !== true
      && stored?.lastModified !== undefined
      && Date.now() - stored.checkedAt < CATALOG_REFRESH_INTERVAL_MS
    ) {
      return { models: cached, changed: false }
    }

    // Only revalidate when a cached body backs the validator: a 304 answering
    // an empty cache would leave the overlay empty and look like success.
    const validator = stored !== undefined && stored.models.length > 0 ? stored.etag : undefined
    const url = new URL(`/api/models/providers/${encodeURIComponent(providerId)}`, this.baseUrl)
    const headers = {
      accept: 'application/json',
      ...validator === undefined ? {} : { 'if-none-match': validator },
    }
    // A call rather than a snapshot: the flag changes across the awaits below,
    // and a narrowed local would let the compiler assume it cannot.
    const cancelled = (): boolean => options.signal?.aborted ?? false
    let response: Response | undefined
    let failure: unknown
    for (let attempt = 0; attempt < REQUEST_ATTEMPTS && response === undefined; attempt += 1) {
      if (cancelled()) {
        throw options.signal?.reason ?? new Error('dsh-providers: catalog refresh cancelled')
      }
      if (attempt > 0) await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt))
      const signal = options.signal === undefined
        ? AbortSignal.timeout(REQUEST_TIMEOUT_MS)
        : AbortSignal.any([options.signal, AbortSignal.timeout(REQUEST_TIMEOUT_MS)])
      try {
        response = await fetch(url, { headers, signal })
      } catch (error) {
        // The caller's own cancellation is a decision, not a transport failure.
        if (cancelled()) throw error
        failure = error
      }
    }
    if (response === undefined) throw failure
    const checkedAt = Date.now()

    if (response.status === 304 && stored !== undefined) {
      await this.commit(providerId, { ...stored, checkedAt })
      return { models: cached, changed: false }
    }
    if (response.status === 404 || response.status === 501) {
      // pi.dev publishes no catalog for this provider. Record the check so the
      // next refresh does not ask again immediately; `lastModified: 0` keeps
      // the entry from ever overlaying the baked data.
      await this.commit(providerId, { models: [], checkedAt, lastModified: 0 })
      return { models: [], changed: cached.length > 0 }
    }
    if (!response.ok) {
      throw new Error(`dsh-providers: the model catalog for ${providerId} answered ${response.status}`)
    }

    const models = parseCatalog(providerId, await response.json())
    const lastModified = Date.parse(response.headers.get('last-modified') ?? '')
    const etag = response.headers.get('etag')
    const entry: CatalogEntry = {
      models,
      checkedAt,
      // A 200 without `last-modified` (a mirror or CDN stripping the header)
      // still carried a fresh body: stamp it with the fetch time so it can
      // overlay the baked data. `0` is reserved for the 404 path above, where
      // it deliberately means "never overlay" — reusing it here would make
      // the whole remote-catalog feature silently inert behind such a host,
      // while the UI kept reporting the catalog as up to date.
      lastModified: Number.isNaN(lastModified) ? checkedAt : lastModified,
      ...etag === null ? {} : { etag },
    }
    await this.commit(providerId, entry)
    const published = usableModels(entry, this.bakedGeneratedAt)
    return {
      models: published,
      changed: JSON.stringify(published) !== JSON.stringify(cached),
    }
  }
}
