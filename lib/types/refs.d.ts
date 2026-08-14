/**
 * Provider id → credential reference, in one place because three layers must
 * agree on it: the store, the credential provider, and the settings writer
 * that puts it in the `llm-pi-ai` route's `apiKeyEnv`.
 */
import type { CredentialRef } from '@deepseek-ai/dsh-credentials';
/**
 * The credential reference one provider's llm route reads: `openai-codex`
 * yields `OPENAI_CODEX_API_KEY`.
 *
 * Must match the shipped Models page's `deriveKeyRef` character for character
 * (uppercase, then collapse each run of non-alphanumerics into one
 * underscore), or a provider configured there and here would land on two
 * different references.
 */
export declare function providerRef(providerId: string): CredentialRef;
