/**
 * Writes the `llm-pi-ai` routes that make a signed-in provider reachable.
 *
 * The shipped adapter mounts dormant and registers a route only when its
 * settings section names one, so this module writes that route — `apiKeyEnv`
 * pointing at the reference the credential provider answers, which is the
 * whole handshake between this plugin and the adapter. Writes are per-field
 * path ops rather than a section replace, so a route the user has already
 * narrowed survives a sign-in.
 */
import type { SettingsPathOp } from '@deepseek-ai/dsh-settings';
import type { Context } from '@deepseek-ai/cordis';
import type { CredentialRef } from '@deepseek-ai/dsh-credentials';
import type { RouteSpec } from './catalog.ts';
/** The adapter namespace whose routes this plugin writes. */
export declare const PI_AI_NS: import("@deepseek-ai/dsh-settings").SettingsNamespace;
/** One route entry as stored, or undefined for a route that does not exist. */
export type RouteEntry = Record<string, unknown> | undefined;
/** Whether the adapter already serves a route for one provider. */
export declare function isRouted(ctx: Context, providerId: string): boolean;
/** The route's `baseURL`, or undefined when it inherits the catalog's. */
export declare function routeBaseUrl(ctx: Context, providerId: string): string | undefined;
/** The route's `api`, or undefined on a catalog route. */
export declare function routeApi(ctx: Context, routeId: string): string | undefined;
/** Every route key this plugin owns for one provider, primary first. */
export declare function ownedRouteKeys(ctx: Context, providerId: string, ref: CredentialRef): string[];
/**
 * Point one provider's route at the credential reference this plugin answers,
 * creating the route when the adapter does not serve one yet. Fills in absent
 * fields only — it never overwrites a value someone already wrote.
 *
 * `displayName` is written because the adapter defaults a route's name to its
 * key, and a bare id (`xai`) would look broken beside properly named providers
 * on the shipped Models page.
 * @param displayName - written only when the route names none, so a name
 *   chosen on the Models page is never overwritten.
 * @param baseURL - endpoint derived from the credential, when the method has
 *   one. GitHub Copilot is the case: its endpoint comes out of the access
 *   token, and the credential seam carries a value, not a URL.
 * @param declared - protocol, endpoint and models, for a provider the
 *   adapter's own catalog cannot describe. Omitted for a catalog route.
 */
export declare function ensureRoute(ctx: Context, providerId: string, ref: CredentialRef, displayName?: string, baseURL?: string, declared?: RouteSpec): Promise<void>;
/**
 * The ops that replace every route this plugin owns for one provider with a
 * planned set.
 *
 * Unlike {@link ensureRoute}, this OVERWRITES `api` and `models` — that is
 * what a catalog refresh is for. `baseURL` is overwritten only when
 * `reclaimBaseUrl` is set (endpoint discovery, where the user named the
 * endpoint) or when the route has none: a refresh must not silently repoint a
 * route the user aimed at a gateway. Other fields (a retry policy, a display
 * name the user chose) are left alone, and an overflow route the new plan no
 * longer needs is removed rather than left serving a protocol the provider
 * dropped.
 * @param specs - the planned routes, primary first.
 */
export declare function routeOps(ctx: Context, providerId: string, ref: CredentialRef, specs: readonly RouteSpec[], reclaimBaseUrl?: boolean): SettingsPathOp[];
/**
 * Commit a batch of route operations as one settings mutation.
 *
 * One mutation rather than one per provider: the document carries a revision,
 * so a page-level update writing forty providers one at a time would mean
 * forty revisions, forty adapter re-registrations, and forty windows in which
 * the picker sees a half-updated section.
 */
export declare function applyRouteOps(ctx: Context, ops: readonly SettingsPathOp[]): Promise<void>;
/**
 * The stored state of every route this plugin owns for one provider, taken
 * before a write so the write can be undone exactly.
 *
 * Whole entries, not just the fields a write touches: a rollback must also
 * remove a route the failed write created (recorded here as undefined) and
 * put back every field of a route it deleted — `apiKeyEnv` included, which
 * is what ownership inference reads.
 * @returns entry per owned route key; undefined marks a key with no stored route.
 */
export declare function routeSnapshot(ctx: Context, providerId: string, ref: CredentialRef): Record<string, RouteEntry>;
/**
 * The ops that put back exactly what {@link routeSnapshot} recorded: every
 * key the snapshot covers or this plugin now owns is restored to its recorded
 * entry, or removed when the snapshot recorded none.
 */
export declare function snapshotOps(ctx: Context, providerId: string, ref: CredentialRef, snapshot: Record<string, RouteEntry>): SettingsPathOp[];
/** Whether one provider is served by routes this plugin wrote rather than by the adapter's installed catalog. */
export declare function hasPinnedModels(ctx: Context, providerId: string, ref: CredentialRef): boolean;
/**
 * Remove one provider's routes entirely, overflow included.
 *
 * Signing out does NOT call this by default. A route outliving its credential
 * is a state dsh already models — the reference resolves to nothing and the
 * request fails with `MISSING_CREDENTIAL` naming the provider — whereas
 * deleting it would also delete a `models` list, a gateway `baseURL`, or an
 * api key the user configured through the shipped Models page under the same
 * reference. Removal is something the user asks for explicitly.
 */
export declare function unroute(ctx: Context, providerId: string, ref: CredentialRef): Promise<void>;
