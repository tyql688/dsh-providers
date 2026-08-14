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

import { settingsNamespace } from '@deepseek-ai/dsh-settings'
import type { SettingsPathOp } from '@deepseek-ai/dsh-settings'
import type { Context } from '@deepseek-ai/cordis'
import type { CredentialRef } from '@deepseek-ai/dsh-credentials'
import { OVERFLOW_SUFFIXES, routeProfile, SUFFIX_PROTOCOLS } from './catalog.ts'
import type { RouteSpec } from './catalog.ts'

/** The adapter namespace whose routes this plugin writes. */
export const PI_AI_NS = settingsNamespace('llm-pi-ai')

/** The shape this module reads out of the adapter's section. */
interface PiAiSection {
  providers?: Record<string, Record<string, unknown> | undefined>
}

/** One route entry as stored, or undefined for a route that does not exist. */
export type RouteEntry = Record<string, unknown> | undefined

/**
 * The settings service, or undefined when the composition mounts none.
 *
 * Read through the global service store rather than `ctx.settings`: the
 * property proxy only serves services the fiber DECLARED, and reaching an
 * undeclared one through it suspends the caller forever. Settings is optional
 * here — a composition without it still authenticates, it just cannot write
 * the route.
 */
function settingsOf(ctx: Context): Context['settings'] | undefined {
  return ctx.get('settings')
}

/**
 * The adapter's currently RESOLVED routes — every layer merged, schema
 * defaults included. Right for "does this route exist", wrong for "did anyone
 * write this field": resolution materializes defaults, so a route that names
 * no models still resolves with `models: []`.
 */
function currentRoutes(ctx: Context): Record<string, RouteEntry> {
  const section = settingsOf(ctx)?.get(PI_AI_NS) as PiAiSection | undefined
  return section?.providers ?? {}
}

/**
 * The routes as STORED — the user layer alone, which is what answers "did
 * anyone write this field". Known limitation: a route supplied by a lower
 * settings layer (a composition base) is visible to `currentRoutes` but not
 * here, so ownership checks and snapshots cannot see or manage it.
 */
function storedRoutes(ctx: Context): Record<string, RouteEntry> {
  const settings = settingsOf(ctx)
  if (settings === undefined) return {}
  const descriptor = settings.describe().find(entry => entry.ns === PI_AI_NS)
  const section = descriptor?.user as PiAiSection | undefined
  return section?.providers ?? {}
}

/** Whether the adapter already serves a route for one provider. */
export function isRouted(ctx: Context, providerId: string): boolean {
  return currentRoutes(ctx)[providerId] !== undefined
}

/** The route's `baseURL`, or undefined when it inherits the catalog's. */
export function routeBaseUrl(ctx: Context, providerId: string): string | undefined {
  const baseURL = currentRoutes(ctx)[providerId]?.baseURL
  return typeof baseURL === 'string' && baseURL.length > 0 ? baseURL : undefined
}

/** The route's `api`, or undefined on a catalog route. */
export function routeApi(ctx: Context, routeId: string): string | undefined {
  const api = currentRoutes(ctx)[routeId]?.api
  return typeof api === 'string' && api.length > 0 ? api : undefined
}

/**
 * The overflow routes this plugin currently owns for one provider.
 *
 * Ownership is inferred, not marked: the key must be one of the suffixes this
 * plugin produces, the route must read the provider's own credential
 * reference, AND its `api` must be the protocol that suffix stands for —
 * exactly what this plugin writes — so a route the user created under a
 * colliding key is never touched unless it is indistinguishable from ours.
 * A marker field is not expressible in the adapter's closed profile schema,
 * and would be invisible to someone reading their own settings file.
 */
function overflowRoutes(ctx: Context, providerId: string, ref: CredentialRef): string[] {
  const stored = storedRoutes(ctx)
  return OVERFLOW_SUFFIXES
    .map(suffix => `${providerId}-${suffix}`)
    .filter((routeId) => {
      const entry = stored[routeId]
      const suffix = routeId.slice(providerId.length + 1)
      return entry?.apiKeyEnv === ref && entry.api === SUFFIX_PROTOCOLS[suffix]
    })
}

/** Every route key this plugin owns for one provider, primary first. */
export function ownedRouteKeys(ctx: Context, providerId: string, ref: CredentialRef): string[] {
  return [providerId, ...overflowRoutes(ctx, providerId, ref)]
}

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
export async function ensureRoute(
  ctx: Context,
  providerId: string,
  ref: CredentialRef,
  displayName?: string,
  baseURL?: string,
  declared?: RouteSpec,
): Promise<void> {
  const settings = settingsOf(ctx)
  if (settings === undefined) {
    throw new Error('dsh-providers: no settings provider is mounted, so the provider route cannot be written')
  }
  // The stored view, not the resolved one: a field this plugin should fill in
  // must look absent until someone actually wrote it.
  const existing = storedRoutes(ctx)[providerId]
  // For fill-ins the resolved view matters too: a value supplied by a lower
  // settings layer (a composition base) is invisible in the user layer, and a
  // user-layer write here would silently shadow it. `displayName` and
  // `baseURL` carry no schema default, so a resolved value means some layer
  // actually wrote one.
  const resolved = currentRoutes(ctx)[providerId]
  const ops: SettingsPathOp[] = [
    { op: 'set', path: ['providers', providerId, 'apiKeyEnv'], value: ref },
  ]
  if (displayName !== undefined && existing?.displayName === undefined && resolved?.displayName === undefined) {
    ops.push({ op: 'set', path: ['providers', providerId, 'displayName'], value: displayName })
  }
  if (baseURL !== undefined && existing?.baseURL === undefined && resolved?.baseURL === undefined) {
    ops.push({ op: 'set', path: ['providers', providerId, 'baseURL'], value: baseURL })
  }
  if (declared !== undefined) {
    for (const [field, value] of Object.entries(routeProfile(declared))) {
      // A route already describing itself keeps its own answer: the user may
      // have narrowed its models or repointed it at a gateway.
      if (existing?.[field] !== undefined) continue
      ops.push({ op: 'set', path: ['providers', providerId, field], value })
    }
  }
  await settings.mutate(PI_AI_NS, ops)
}

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
export function routeOps(
  ctx: Context,
  providerId: string,
  ref: CredentialRef,
  specs: readonly RouteSpec[],
  reclaimBaseUrl = false,
): SettingsPathOp[] {
  const stored = storedRoutes(ctx)
  const resolved = currentRoutes(ctx)
  const planned = new Set(specs.map(spec => spec.routeId))
  const ops: SettingsPathOp[] = []

  for (const routeId of overflowRoutes(ctx, providerId, ref)) {
    if (!planned.has(routeId)) ops.push({ op: 'unset', path: ['providers', routeId] })
  }

  for (const spec of specs) {
    ops.push({ op: 'set', path: ['providers', spec.routeId, 'apiKeyEnv'], value: ref })
    // Fill-ins check the resolved view too: a value from a lower settings
    // layer is absent from the user layer, and writing there would shadow it.
    if (stored[spec.routeId]?.displayName === undefined && resolved[spec.routeId]?.displayName === undefined) {
      ops.push({ op: 'set', path: ['providers', spec.routeId, 'displayName'], value: spec.displayName })
    }
    // Headers are model-level in pi-ai and route-level here, so they are
    // written like the display name: filled in when the route names none,
    // never overwriting a set someone chose themselves.
    if (spec.headers !== undefined && stored[spec.routeId]?.headers === undefined && resolved[spec.routeId]?.headers === undefined) {
      ops.push({ op: 'set', path: ['providers', spec.routeId, 'headers'], value: spec.headers })
    }
    const storedBase = stored[spec.routeId]?.baseURL ?? resolved[spec.routeId]?.baseURL
    const keepBase = !reclaimBaseUrl && typeof storedBase === 'string' && storedBase.length > 0
    for (const [field, value] of Object.entries(routeProfile(spec))) {
      if (field === 'baseURL' && keepBase) continue
      ops.push({ op: 'set', path: ['providers', spec.routeId, field], value })
    }
  }
  return ops
}

/**
 * Commit a batch of route operations as one settings mutation.
 *
 * One mutation rather than one per provider: the document carries a revision,
 * so a page-level update writing forty providers one at a time would mean
 * forty revisions, forty adapter re-registrations, and forty windows in which
 * the picker sees a half-updated section.
 */
export async function applyRouteOps(ctx: Context, ops: readonly SettingsPathOp[]): Promise<void> {
  if (ops.length === 0) return
  const settings = settingsOf(ctx)
  if (settings === undefined) {
    throw new Error('dsh-providers: no settings provider is mounted, so the model routes cannot be written')
  }
  await settings.mutate(PI_AI_NS, [...ops])
}

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
export function routeSnapshot(
  ctx: Context,
  providerId: string,
  ref: CredentialRef,
): Record<string, RouteEntry> {
  const stored = storedRoutes(ctx)
  const snapshot: Record<string, RouteEntry> = {}
  for (const routeId of ownedRouteKeys(ctx, providerId, ref)) {
    snapshot[routeId] = stored[routeId]
  }
  return snapshot
}

/**
 * The ops that put back exactly what {@link routeSnapshot} recorded: every
 * key the snapshot covers or this plugin now owns is restored to its recorded
 * entry, or removed when the snapshot recorded none.
 */
export function snapshotOps(
  ctx: Context,
  providerId: string,
  ref: CredentialRef,
  snapshot: Record<string, RouteEntry>,
): SettingsPathOp[] {
  const keys = new Set([...Object.keys(snapshot), ...ownedRouteKeys(ctx, providerId, ref)])
  const ops: SettingsPathOp[] = []
  for (const routeId of keys) {
    const entry = snapshot[routeId]
    ops.push(entry === undefined
      ? { op: 'unset', path: ['providers', routeId] }
      : { op: 'set', path: ['providers', routeId], value: entry })
  }
  return ops
}

/** Whether one provider is served by routes this plugin wrote rather than by the adapter's installed catalog. */
export function hasPinnedModels(ctx: Context, providerId: string, ref: CredentialRef): boolean {
  if (overflowRoutes(ctx, providerId, ref).length > 0) return true
  const models = storedRoutes(ctx)[providerId]?.models
  // An empty list is the adapter's own spelling of "serve the built-in
  // catalog", so it is not a pin either.
  return Array.isArray(models) && models.length > 0
}

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
export async function unroute(ctx: Context, providerId: string, ref: CredentialRef): Promise<void> {
  const settings = settingsOf(ctx)
  if (settings === undefined) return
  const ops: SettingsPathOp[] = overflowRoutes(ctx, providerId, ref)
    .map(routeId => ({ op: 'unset', path: ['providers', routeId] }))
  if (currentRoutes(ctx)[providerId] !== undefined) {
    ops.push({ op: 'unset', path: ['providers', providerId] })
  }
  if (ops.length === 0) return
  await settings.mutate(PI_AI_NS, ops)
}
