/**
 * The account plane's HTTP routes.
 *
 * dsh's API gateway has a closed method table, so an out-of-tree plugin cannot
 * add an `auth.*` domain to it. It can register its own named route on
 * `ctx.webServer`, which is how the client bundles already reach the browser.
 * One prefix route at {@link PROVIDERS_ROUTE_PREFIX} dispatches every operation.
 */
import type { Context } from '@deepseek-ai/cordis';
export declare const name = "providers-routes";
export declare const inject: string[];
/**
 * Mount the account routes on the web server, once one exists.
 *
 * `webServer` is an optional dependency, reached through `ctx.inject` rather
 * than declared on the row: dsh's boot audit fails loudly on a row that never
 * activates, so declaring it would turn every headless profile into a boot
 * failure. The scoped fiber also unmounts the routes with the server.
 */
export declare function apply(ctx: Context): void;
