/**
 * Package entry: the credential provider row the bundle patch mounts in place
 * of `@deepseek-ai/dsh-credentials-local`. It provides `ctx.credentials`
 * (every layer the shipped provider has, plus one for references a signed-in
 * OAuth account owns) and `ctx.providerAuth` (the account service the HTTP
 * routes drive). The HTTP routes themselves are the separate `./routes`
 * entry, mounted as the bundle's second row.
 */
export { default } from './credentials.ts';
export type { Config, ProviderAuthService } from './credentials.ts';
export type { LoginSession } from './login.ts';
export * from './wire.ts';
