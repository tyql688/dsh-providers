/**
 * Linking an existing Codex CLI login.
 *
 * The Codex CLI and pi-ai's `openai-codex` flow share one OAuth client id, so
 * a token the CLI obtained is a token pi-ai can refresh. This module reads the
 * CLI's `auth.json` and maps it into the credential shape pi-ai's own login
 * writes — same fields, same accountId derivation. Detection is offered to
 * the page as a boolean only; token material never leaves the Host.
 *
 * The link is a SHARE, not a copy: OpenAI rotates the refresh token on every
 * refresh and invalidates the old one, so two independent copies would race —
 * whichever refreshed first would sign the other out (`refresh_token_reused`).
 * A linked credential therefore mirrors every refreshed token back into the
 * CLI's `auth.json`, and when the CLI rotates first, {@link adoptCodexTokens}
 * adopts its newer chain instead of failing. One chain, two readers.
 */

import { readFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { withFileLock, writeFileAtomic } from '@deepseek-ai/dsh-atomic-write'
import type { Credential, OAuthCredential } from '@earendil-works/pi-ai'
import { BadRequest } from './errors.ts'

/** The provider id this import serves. */
export const CODEX_PROVIDER_ID = 'openai-codex'

/** Label the page shows for the source of this import. */
export const CODEX_SOURCE_LABEL = 'Codex CLI'

/** The token file the Codex CLI maintains. */
function codexAuthPath(): string {
  const home = process.env['CODEX_HOME']
  return join(home !== undefined && home.length > 0 ? home : join(homedir(), '.codex'), 'auth.json')
}

/** The CLI document's shape, as far as this import reads it. */
interface CodexAuthFile {
  tokens?: {
    access_token?: unknown
    refresh_token?: unknown
  }
}

/** A non-empty string field, or undefined. */
function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

/** The CLI's stored tokens, or undefined when there is no usable login. */
async function readCodexTokens(): Promise<{ access: string; refresh: string } | undefined> {
  let raw: string
  try {
    raw = await readFile(codexAuthPath(), 'utf8')
  } catch {
    return undefined
  }
  let parsed: CodexAuthFile
  try {
    parsed = JSON.parse(raw) as CodexAuthFile
  } catch {
    return undefined
  }
  const access = text(parsed.tokens?.access_token)
  const refresh = text(parsed.tokens?.refresh_token)
  // An api-key-only auth.json (no OAuth tokens) is not importable here.
  return access !== undefined && refresh !== undefined ? { access, refresh } : undefined
}

/** Whether a Codex CLI login exists that this plugin could import. */
export async function detectCodexLogin(): Promise<boolean> {
  return await readCodexTokens() !== undefined
}

/** One claim read out of a JWT payload without verifying it; undefined on any shape surprise. */
function jwtClaim(token: string, pick: (payload: Record<string, unknown>) => unknown): unknown {
  const part = token.split('.')[1]
  if (part === undefined) return undefined
  try {
    return pick(JSON.parse(Buffer.from(part, 'base64url').toString('utf8')) as Record<string, unknown>)
  } catch {
    return undefined
  }
}

/** Marker on a credential whose token chain is shared with the CLI's file. */
const LINK_FLAG = 'linkedCodexCli'

/** Whether a stored credential is a linked Codex CLI login. */
export function isLinkedCodexCredential(credential: Credential | undefined): credential is OAuthCredential {
  return credential?.type === 'oauth' && credential[LINK_FLAG] === true
}

/**
 * The Codex CLI login as a pi-ai credential — the same fields pi-ai's own
 * login stores, plus the link marker that keeps the chain mirrored. The
 * accountId comes from the access token exactly the way pi-ai derives it; a
 * token without one is refused the way pi-ai's login refuses it, instead of
 * storing a credential every request would then fail.
 * @throws BadRequest when no usable CLI login exists.
 */
export async function readCodexCredential(): Promise<OAuthCredential> {
  const tokens = await readCodexTokens()
  if (tokens === undefined) {
    throw new BadRequest('dsh-providers: no Codex CLI login found to import (run `codex login` first)')
  }
  const accountId = jwtClaim(tokens.access, payload => (
    (payload['https://api.openai.com/auth'] as { chatgpt_account_id?: unknown } | undefined)?.chatgpt_account_id
  ))
  if (text(accountId) === undefined) {
    throw new BadRequest('dsh-providers: the Codex CLI token carries no ChatGPT account id, so it cannot serve requests here')
  }
  const exp = jwtClaim(tokens.access, payload => payload['exp'])
  // Expiry from the token itself, with pi-ai's own five-minute margin; an
  // unreadable claim forces a refresh on first use, which is merely slower.
  const expires = typeof exp === 'number' && Number.isFinite(exp) ? exp * 1000 - 5 * 60 * 1000 : 0
  return {
    type: 'oauth',
    access: tokens.access,
    refresh: tokens.refresh,
    expires,
    accountId: accountId as string,
    [LINK_FLAG]: true,
  }
}

/**
 * Mirror a refreshed linked credential back into the CLI's `auth.json`, so
 * the CLI keeps working on the rotated chain. Unknown fields survive, the
 * write is atomic and owner-only, and a missing or unreadable file simply
 * ends the mirroring — the CLI signed out on its own, and there is nothing
 * left to keep in sync.
 */
export async function mirrorCodexTokens(credential: OAuthCredential): Promise<void> {
  const path = codexAuthPath()
  try {
    await withFileLock(path, async () => {
      const parsed = JSON.parse(await readFile(path, 'utf8')) as Record<string, unknown>
      const tokens = typeof parsed['tokens'] === 'object' && parsed['tokens'] !== null
        ? parsed['tokens'] as Record<string, unknown>
        : {}
      parsed['tokens'] = { ...tokens, access_token: credential.access, refresh_token: credential.refresh }
      parsed['last_refresh'] = new Date().toISOString()
      await writeFileAtomic(path, `${JSON.stringify(parsed, null, 2)}\n`, { mode: 0o600 })
    })
  } catch {
    // Best-effort by design: the linked chain in our store stays authoritative.
  }
}

/**
 * The CLI's chain when it rotated ahead of us: a refresh that fails because
 * our refresh token was already consumed re-reads the file, and a DIFFERENT
 * refresh token there means the CLI holds the live chain — adopt it.
 * @returns the adopted credential, or undefined when the file offers nothing newer.
 */
export async function adoptCodexTokens(current: OAuthCredential): Promise<OAuthCredential | undefined> {
  try {
    const fromFile = await readCodexCredential()
    return fromFile.refresh !== current.refresh ? fromFile : undefined
  } catch {
    return undefined
  }
}
