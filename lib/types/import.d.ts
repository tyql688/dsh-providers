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
import type { Credential, OAuthCredential } from '@earendil-works/pi-ai';
/** The provider id this import serves. */
export declare const CODEX_PROVIDER_ID = "openai-codex";
/** Label the page shows for the source of this import. */
export declare const CODEX_SOURCE_LABEL = "Codex CLI";
/** Whether a Codex CLI login exists that this plugin could import. */
export declare function detectCodexLogin(): Promise<boolean>;
/** Whether a stored credential is a linked Codex CLI login. */
export declare function isLinkedCodexCredential(credential: Credential | undefined): credential is OAuthCredential;
/**
 * The Codex CLI login as a pi-ai credential — the same fields pi-ai's own
 * login stores, plus the link marker that keeps the chain mirrored. The
 * accountId comes from the access token exactly the way pi-ai derives it; a
 * token without one is refused the way pi-ai's login refuses it, instead of
 * storing a credential every request would then fail.
 * @throws BadRequest when no usable CLI login exists.
 */
export declare function readCodexCredential(): Promise<OAuthCredential>;
/**
 * Mirror a refreshed linked credential back into the CLI's `auth.json`, so
 * the CLI keeps working on the rotated chain. Unknown fields survive, the
 * write is atomic and owner-only, and a missing or unreadable file simply
 * ends the mirroring — the CLI signed out on its own, and there is nothing
 * left to keep in sync.
 */
export declare function mirrorCodexTokens(credential: OAuthCredential): Promise<void>;
/**
 * The CLI's chain when it rotated ahead of us: a refresh that fails because
 * our refresh token was already consumed re-reads the file, and a DIFFERENT
 * refresh token there means the CLI holds the live chain — adopt it.
 * @returns the adopted credential, or undefined when the file offers nothing newer.
 */
export declare function adoptCodexTokens(current: OAuthCredential): Promise<OAuthCredential | undefined>;
