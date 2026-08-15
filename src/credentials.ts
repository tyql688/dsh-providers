/**
 * The plugin's Host half: one credential provider that also owns the account
 * service.
 *
 * It extends the shipped local provider instead of replacing it, so every
 * existing credential layer keeps its precedence and one layer is added on top
 * for references owned by a signed-in OAuth account. The seam resolves
 * per request, which is dsh's hot-update mechanism and exactly where a token
 * that may need refreshing belongs — see the README's "How it works".
 */

import { access } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { homedir } from 'node:os'
import { dirname, isAbsolute, join, resolve as resolvePath } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Context } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { credentialRef } from '@deepseek-ai/dsh-credentials'
import type { CredentialInfo, CredentialRef, ResolvedCredential } from '@deepseek-ai/dsh-credentials'
import { LocalCredentialProvider } from '@deepseek-ai/dsh-credentials-local'
// Type-only: pulls in the LLM seam's Context merge (ctx.llm). Read as an
// optional service — a composition without it simply lists no models.
import type {} from '@deepseek-ai/dsh-llm'
import type { Config as LocalConfig } from '@deepseek-ai/dsh-credentials-local'
import { resolveDshHome } from '@deepseek-ai/dsh-home-paths'
import { builtinModels, getBuiltinModelDataGeneratedAt } from '@earendil-works/pi-ai/providers/all'
import type {
  AuthContext,
  AuthType,
  Credential,
  ModelsError,
  MutableModels,
  Provider,
} from '@earendil-works/pi-ai'
import { errorMessage } from './errors.ts'
import { LoginSessions } from './login.ts'
import type { LoginSession } from './login.ts'
import { providerRef } from './refs.ts'
import { mergeModels, planRoutes, retainServed, soleRoute } from './catalog.ts'
import type { MergedModel, RouteSpec } from './catalog.ts'
import { RemoteCatalog } from './remote-catalog.ts'
import type { RefreshOutcome } from './remote-catalog.ts'
import {
  applyRouteOps,
  ensureRoute,
  hasPinnedModels,
  isRouted,
  ownedRouteKeys,
  PI_AI_NS,
  routeApi,
  routeBaseUrl,
  routeOps,
  routeSnapshot,
  snapshotOps,
  unroute,
} from './routing.ts'
import { AuthStore } from './store.ts'
import type { KeyPort } from './store.ts'
import type {
  AuthMethodView,
  AuthTypeName,
  CatalogUpdate,
  ModelView,
  ProviderView,
  RefreshCatalogResponse,
  StoredKeyResponse,
} from './wire.ts'

/** Basename of the token document inside the harness home. */
const AUTH_FILENAME = 'auth.json'
/** Basename of the catalog cache beside it. */
const CATALOG_FILENAME = 'model-catalog.json'

/**
 * Protocols whose `/v1/models` listing the adapter's discovery can read.
 * Knowing this here lets a card hide the button instead of offering one that
 * always fails.
 */
const LISTABLE_PROTOCOLS = new Set(['openai-completions', 'openai-responses'])

/**
 * Catalog requests in flight at once during a page-level update. The
 * bottleneck is per-request latency, so eight is plenty — and kinder to a
 * service nobody here operates than forty would be.
 */
const CATALOG_FETCH_CONCURRENCY = 8

/**
 * Run one operation over every item with a bounded number in flight.
 * @returns the results in input order, so a caller can pair them up positionally.
 */
async function mapConcurrent<TIn, TOut>(
  items: readonly TIn[],
  limit: number,
  operation: (item: TIn) => Promise<TOut>,
): Promise<TOut[]> {
  const results: TOut[] = Array.from({ length: items.length })
  let next = 0
  const worker = async (): Promise<void> => {
    for (;;) {
      const index = next++
      if (index >= items.length) return
      const item = items[index]
      // noUncheckedIndexedAccess narrowing; an in-range element is never absent.
      if (item === undefined) continue
      results[index] = await operation(item)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

/** How many models a set of route specs serves in total. */
function countModels(specs: readonly RouteSpec[]): number {
  return specs.reduce((total, spec) => total + spec.models.length, 0)
}

/** Source label reported for a reference answered by a signed-in account. */
const OAUTH_SOURCE = 'oauth'

/**
 * The version skew between this plugin's bundled pi-ai and the installed
 * adapter, for route-failure messages. The two are separate installs with
 * separate catalogs, so "the adapter cannot serve this" is usually a version
 * gap — naming both sides turns a dead end into a diagnosis.
 */
function piAiVersionSkew(): string {
  interface Manifest { name?: string; version?: string; dependencies?: Record<string, string> }
  interface Found { manifest: Manifest; dir: string }
  // Everything sits inside one try: this helper runs on error paths, and a
  // resolution failure here must cost only the diagnosis, never replace the
  // original error with its own.
  const manifestOf = (name: string, specifier: string): Found | undefined => {
    try {
      const require = createRequire(import.meta.url)
      // Walk up from a resolvable file: neither package exports `./package.json`.
      let dir = dirname(fileURLToPath(import.meta.resolve(specifier)))
      for (let depth = 0; depth < 6; depth++) {
        try {
          const manifest = require(join(dir, 'package.json')) as Manifest
          if (manifest.name === name) return { manifest, dir }
        } catch {
          // keep walking
        }
        dir = dirname(dir)
      }
    } catch {
      // A packaging layout this walk cannot read only costs the diagnosis.
    }
    return undefined
  }
  const plugin = manifestOf('@earendil-works/pi-ai', '@earendil-works/pi-ai/providers/all')?.manifest.version ?? 'unknown'
  const adapter = manifestOf('@deepseek-ai/dsh-llm-pi-ai', '@deepseek-ai/dsh-llm-pi-ai')
  // The adapter's own pi-ai is a separate install nested under it; its actual
  // version beats the declared range as a diagnosis. Fall back to the range.
  let adapterPiAi = adapter?.manifest.dependencies?.['@earendil-works/pi-ai'] ?? 'unknown'
  if (adapter !== undefined) {
    // npm nests it inside the package; pnpm links it beside the package's
    // scope dir. Reading the file directly sidesteps pi-ai's export map.
    for (const base of [join(adapter.dir, 'node_modules'), dirname(dirname(adapter.dir))]) {
      try {
        const nested = createRequire(import.meta.url)(join(base, '@earendil-works', 'pi-ai', 'package.json')) as Manifest
        if (nested.name === '@earendil-works/pi-ai' && nested.version !== undefined) {
          adapterPiAi = nested.version
          break
        }
      } catch {
        // The range already stands in.
      }
    }
  }
  return `this plugin bundles pi-ai ${plugin}; the adapter is llm-pi-ai ${adapter?.manifest.version ?? 'unknown'} on pi-ai ${adapterPiAi}`
}

/** How long a freshly written route is given to become a live LLM route. */
const ROUTE_ACTIVATION_TIMEOUT_MS = 2_000
/** Interval between checks while waiting for that activation. */
const ROUTE_ACTIVATION_POLL_MS = 50

/** Plugin config: the local provider's own fields plus this plugin's. */
export interface Config extends LocalConfig {
  /** Token document path; defaults to `auth.json` under the harness home. */
  authPath?: string
  /** Catalog cache path; defaults to `model-catalog.json` under the harness home. */
  catalogPath?: string
  /** Where the curated model catalog is served; defaults to pi's own host. */
  catalogBaseUrl?: string
  /**
   * Write the provider's `llm-pi-ai` route on a successful sign-in, so its
   * models reach the picker without a second trip to the Models page.
   * Defaults to true.
   */
  autoRoute?: boolean
}

/** One provider's planned routes, queued for a batched commit. */
interface RouteCommit {
  providerId: string
  ref: CredentialRef
  specs: readonly RouteSpec[]
  /** Overwrite the route's `baseURL` even where the user set one; see {@link routeOps}. */
  reclaimBaseUrl?: boolean
}

/** The account service this plugin's HTTP routes drive. */
export interface ProviderAuthService {
  /** Every installed provider with its offered methods and current credential state. */
  listProviders(): Promise<ProviderView[]>
  /**
   * The api key this plugin stores for one provider, for the replace wizard's
   * explicit reveal. Resolves to no key for an OAuth account (its token never
   * leaves the Host through this surface) and for an ambient environment value
   * (this plugin never stored it; the shell that exported it is the place to
   * read it).
   */
  storedKey(providerId: string): Promise<StoredKeyResponse>
  /** Start one login attempt; its steps arrive through the returned session. */
  login(providerId: string, method: AuthType): LoginSession
  /** Answer a pending prompt of one attempt. */
  answer(loginId: string, requestId: string, value: string): boolean
  /** Abort one attempt. */
  cancel(loginId: string): boolean
  /** Look one attempt up for streaming. */
  session(loginId: string): LoginSession | undefined
  /**
   * Write one provider's `llm-pi-ai` route without signing in again — the
   * repair for a provider that has a credential but no route: a sign-in whose
   * settings write failed, or a key supplied through the environment that
   * nothing ever created a route for.
   */
  route(providerId: string): Promise<void>
  /**
   * Refresh model catalogs from the curated remote catalog and rewrite the
   * affected routes.
   * @param providerId - one provider, or undefined for every routed provider.
   * @param force - ask the server regardless of the freshness window.
   */
  refreshCatalog(providerId?: string, force?: boolean): Promise<RefreshCatalogResponse>
  /**
   * Read an OpenAI-compatible `/v1/models` listing and adopt it as one
   * provider's model list.
   * @param baseURL - endpoint to read; defaults to the provider's own.
   * @returns how many models the endpoint reported.
   */
  discoverEndpoint(providerId: string, baseURL?: string): Promise<number>
  /** Remove a provider's credential, optionally removing its llm route too. */
  logout(providerId: string, removeRoute?: boolean): Promise<void>
}

declare module '@deepseek-ai/cordis' {
  interface Context {
    providerAuth: ProviderAuthService
  }
}

/**
 * The bearer token inside a resolved auth, when that is the WHOLE credential:
 * exactly one header, `Authorization: Bearer <token>`, no api key and no env
 * extras. Kimi Code's subscription auth has this shape.
 *
 * The token is usable through the single-string credential seam because the
 * adapter's anthropic transport sends the resolved string as `x-api-key` —
 * and the endpoint accepts the subscription token under that header too
 * (verified live against `api.kimi.com/coding`: both spellings answer 200,
 * no auth answers 401). A credential with anything more than this one header
 * stays unroutable.
 */
function soleBearerToken(auth: Awaited<ReturnType<MutableModels['getAuth']>>): string | undefined {
  if (auth === undefined) return undefined
  const apiKey = auth.auth.apiKey
  if (apiKey !== undefined && apiKey.length > 0) return undefined
  if (Object.keys(auth.env ?? {}).length > 0) return undefined
  const headers = Object.entries(auth.auth.headers ?? {})
  const [header] = headers
  if (headers.length !== 1 || header === undefined) return undefined
  const [name, value] = header
  if (name.toLowerCase() !== 'authorization' || typeof value !== 'string') return undefined
  return /^Bearer (.+)$/.exec(value)?.[1]
}

/** Whether a pi-ai failure means the OAuth refresh failed, so the fix is to sign in again. */
function isOAuthFailure(error: unknown): boolean {
  return (error as ModelsError | undefined)?.code === 'oauth'
}

/** Project one provider's auth methods, OAuth first so a subscription leads its card. */
function methodViews(provider: Provider): AuthMethodView[] {
  const views: AuthMethodView[] = []
  const oauth = provider.auth.oauth
  if (oauth !== undefined) {
    views.push({
      type: 'oauth',
      name: oauth.name,
      ...oauth.loginLabel === undefined ? {} : { loginLabel: oauth.loginLabel },
      ...oauth.isSubscription === undefined ? {} : { subscription: oauth.isSubscription },
    })
  }
  const apiKey = provider.auth.apiKey
  // A method with no `login` is ambient-only (an AWS profile, ADC files); a
  // button for it could never prompt for anything, so it is not offered.
  if (apiKey?.login !== undefined) views.push({ type: 'api_key', name: apiKey.name })
  return views
}

/**
 * The credential provider (`ctx.credentials`) and account service
 * (`ctx.providerAuth`) this plugin mounts in place of `dsh-credentials-local`.
 * Both live in one class because the account service needs the store and the
 * store needs the seam's local layers; splitting them would make the two
 * inject each other.
 */
class AuthCredentialProvider extends LocalCredentialProvider implements KeyPort {
  static override Config: z<Config> = z.object({
    path: z.string(),
    dshHome: z.string(),
    watch: z.boolean().default(true),
    debounceMs: z.number().min(0).default(100),
    authPath: z.string(),
    catalogPath: z.string(),
    catalogBaseUrl: z.string(),
    autoRoute: z.boolean().default(true),
  })

  /** Token document, with the api-key half bridged back onto the seam. */
  private readonly store: AuthStore
  /** The curated pi.dev catalog overlaid on this plugin's baked pi-ai data. */
  private readonly catalog: RemoteCatalog
  /** pi-ai's provider collection: login flows, refresh, and status checks. */
  private readonly models: MutableModels
  /** Live login attempts. */
  private readonly sessions = new LoginSessions()
  /** Whether a sign-in writes the provider's `llm-pi-ai` route. */
  private readonly autoRoute: boolean

  constructor(ctx: Context, config: Config) {
    super(ctx, config)
    this.autoRoute = config.autoRoute ?? true
    const home = resolveDshHome(config.dshHome)
    const authPath = config.authPath === undefined
      ? join(home, AUTH_FILENAME)
      : resolvePath(config.authPath)
    this.catalog = new RemoteCatalog(
      config.catalogPath === undefined ? join(home, CATALOG_FILENAME) : resolvePath(config.catalogPath),
      getBuiltinModelDataGeneratedAt(),
      config.catalogBaseUrl,
    )
    this.store = new AuthStore(authPath, this, () => this.providerIds())
    this.models = builtinModels({
      credentials: this.store,
      authContext: this.authContext(),
    })
    ctx.provide('providerAuth', this.service())
    ctx.effect(() => () => {
      this.disposed = true
      this.sessions.dispose()
    })
  }

  /** Set at plugin disposal; a mutation continuing past it must not write. */
  private disposed = false

  /** Tail of the serialized mutation queue. */
  private mutations: Promise<unknown> = Promise.resolve()

  /**
   * Run one mutating operation after every earlier one has finished.
   *
   * All mutations share one queue rather than a per-provider one because they
   * share state broader than a provider: route writes snapshot and batch the
   * whole `llm-pi-ai` section, so two interleaved write-verify-rollback
   * sequences (a sign-in during a page-level catalog update, a sign-out during
   * endpoint discovery) could roll each other's committed work back.
   */
  private serialize<T>(operation: () => Promise<T>): Promise<T> {
    const run = this.mutations.then(() => {
      if (this.disposed) throw new Error('dsh-providers: the plugin is unloading')
      return operation()
    })
    this.mutations = run.catch(() => {})
    return run
  }

  /** Every provider id this plugin serves: the installed pi-ai catalog. */
  private providerIds(): string[] {
    return this.models.getProviders().map(provider => provider.id)
  }

  /**
   * Ambient lookup for pi-ai's own auth resolution.
   *
   * It reads the seam's LOCAL layers only — never this class's account layer.
   * A provider resolving `ANTHROPIC_API_KEY` while this class answers that
   * same reference for a signed-in account would re-enter itself, and ambient
   * discovery is supposed to see the environment, not this plugin's answer.
   * The upside: a key in `$DSH_HOME/.credentials.yaml` satisfies
   * provider-native discovery too, which plain `process.env` would miss.
   */
  private authContext(): AuthContext {
    return {
      env: async (name) => {
        let ref: CredentialRef
        try {
          ref = credentialRef(name)
        } catch {
          // Not a name this seam can hold, so the environment has no such value either.
          return undefined
        }
        return (await this.localResolve(ref))?.value
      },
      fileExists: async (path) => {
        const expanded = path.startsWith('~')
          ? join(homedir(), path.slice(1))
          : path
        if (!isAbsolute(expanded)) return false
        try {
          await access(expanded)
          return true
        } catch {
          return false
        }
      },
    }
  }

  /** The seam's ordinary layered answer, skipping this class's account layer. */
  private localResolve(ref: CredentialRef): Promise<ResolvedCredential | undefined> {
    return super.resolve(ref)
  }

  /** The provider id a reference belongs to, when a signed-in OAuth account owns it. */
  private async accountProviderFor(ref: CredentialRef): Promise<string | undefined> {
    for (const providerId of await this.store.oauthProviders()) {
      if (providerRef(providerId) === ref) return providerId
    }
    return undefined
  }

  /**
   * Resolve one reference, answering from the signed-in account when one owns
   * it. Resolution stays per call, so a token pi-ai refreshes reaches the very
   * next request without a restart.
   */
  override async resolve(ref: CredentialRef): Promise<ResolvedCredential | undefined> {
    const local = await this.localResolve(ref)
    // The process environment shadows every managed source in this seam, and
    // an account is a managed source; overriding it here would make an
    // explicitly exported key stop working the moment someone signs in.
    if (local?.source === 'env') return local
    const providerId = await this.accountProviderFor(ref)
    if (providerId === undefined) return local
    const auth = await this.models.getAuth(providerId)
    const apiKey = auth?.auth.apiKey
    if (apiKey !== undefined && apiKey.length > 0) return { value: apiKey, source: OAUTH_SOURCE }
    // A bearer-only credential (Kimi Code) answers with its token: the
    // adapter sends the resolved string as the provider's key header, which
    // the endpoint accepts — see {@link soleBearerToken}.
    const bearer = soleBearerToken(auth)
    if (bearer === undefined) return local
    return { value: bearer, source: OAUTH_SOURCE }
  }

  /**
   * Describe one reference without exposing its value. A reference a
   * signed-in account owns reports unwritable — the seam's existing way of
   * saying "a higher source answers this" — so the shipped Models page renders
   * its key field read-only instead of letting a typed key silently lose to
   * the token.
   */
  override async describe(ref: CredentialRef): Promise<CredentialInfo> {
    const local = await super.describe(ref)
    if (local.source === 'env') return local
    if (await this.accountProviderFor(ref) === undefined) return local
    return { configured: true, source: OAUTH_SOURCE, writable: false }
  }

  /**
   * Store one value in the managed document. Refuses a reference a signed-in
   * account answers: the write would appear to succeed while resolution kept
   * returning the token.
   */
  override async set(ref: CredentialRef, value: string): Promise<void> {
    const providerId = await this.accountProviderFor(ref)
    if (providerId !== undefined) {
      throw new Error(
        `dsh-providers: "${ref}" is answered by the signed-in ${providerId} account;`
        + ' sign out of that provider before storing a key under this reference',
      )
    }
    await super.set(ref, value)
  }

  /** Remove one reference, refusing one a signed-in account answers for the same reason {@link AuthCredentialProvider.set} does. */
  override async unset(ref: CredentialRef): Promise<void> {
    const providerId = await this.accountProviderFor(ref)
    if (providerId !== undefined) {
      throw new Error(
        `dsh-providers: "${ref}" is answered by the signed-in ${providerId} account;`
        + ' sign out of that provider instead',
      )
    }
    await super.unset(ref)
  }

  /**
   * The `KeyPort` read half: the managed document only.
   *
   * `LocalCredentialProvider` labels that layer `file`. Everything else it can
   * answer with — the process environment, a project or user `.env` — is
   * ambient: this plugin did not store it, so the store must not report it as
   * a credential of its own.
   */
  async readStoredKey(ref: CredentialRef): Promise<string | undefined> {
    const local = await this.localResolve(ref)
    return local?.source === 'file' ? local.value : undefined
  }

  /** The `KeyPort` write half; `undefined` removes the reference. */
  async writeKey(ref: CredentialRef, value: string | undefined): Promise<void> {
    if (value === undefined || value.length === 0) {
      // Removing a reference that stores nothing must be a no-op: the local
      // provider refuses ANY write to an env-shadowed reference, so an
      // unconditional unset would fail OAuth sign-in and api-key sign-out for
      // every user who exports the provider's key in their shell.
      if (await this.readStoredKey(ref) === undefined) return
      await super.unset(ref)
      return
    }
    await super.set(ref, value)
  }

  /** The account service published as `ctx.providerAuth`. */
  private service(): ProviderAuthService {
    return {
      listProviders: () => this.listProviders(),
      storedKey: providerId => this.storedKey(providerId),
      login: (providerId, method) => this.login(providerId, method),
      answer: (loginId, requestId, value) => this.sessions.answer(loginId, requestId, value),
      cancel: loginId => this.sessions.cancel(loginId),
      session: loginId => this.sessions.get(loginId),
      route: providerId => this.serialize(() => this.routeProvider(providerId)),
      refreshCatalog: (providerId, force) => this.serialize(() => this.refreshCatalog(providerId, force)),
      discoverEndpoint: (providerId, baseURL) => this.serialize(() => this.discoverEndpoint(providerId, baseURL)),
      logout: (providerId, removeRoute) => this.serialize(() => this.logout(providerId, removeRoute)),
    }
  }

  /**
   * The models one provider's live routes serve.
   *
   * Read through the harness LLM seam rather than pi-ai's installed catalog:
   * the seam answers what this deployment can actually select, which a route
   * narrowed by a `models` list makes different from the catalog. A route the
   * adapter refuses to answer about is simply absent from the result.
   * @returns undefined when no route answered at all, which distinguishes "not
   *   routed yet" from "routed and serving nothing".
   */
  private async routedModels(providerId: string): Promise<ModelView[] | undefined> {
    const llm = this.ctx.get('llm')
    if (llm === undefined) return undefined
    const views: ModelView[] = []
    let answered = false
    for (const routeId of ownedRouteKeys(this.ctx, providerId, providerRef(providerId))) {
      let models
      try {
        models = await llm.listModels(routeId)
      } catch {
        continue
      }
      answered = true
      const api = routeApi(this.ctx, routeId)
      for (const model of models) {
        views.push({
          id: model.id,
          name: model.name,
          route: routeId,
          ...api === undefined ? {} : { api },
          ...model.inputModalities === undefined ? {} : { input: [...model.inputModalities] },
        })
      }
    }
    return answered ? views : undefined
  }

  /**
   * Whether to offer reading an OpenAI-compatible listing for this provider.
   * Not for a provider pi-ai maintains — the curated catalog answers better
   * than a listing can. Worth offering only when the route points at an
   * endpoint that is not the provider's own (so the catalog describes a
   * different service than the one being called), or when no catalog covers it.
   * @param endpoint - the route's own `baseURL`, when it names one.
   * @param primary - the provider's planned primary route.
   * @param catalogued - how many models the catalogs describe for it.
   */
  private isDiscoverable(endpoint: string | undefined, primary: RouteSpec, catalogued: number): boolean {
    if (!LISTABLE_PROTOCOLS.has(primary.api)) return false
    const custom = endpoint !== undefined && endpoint !== primary.baseURL
    return custom || catalogued === 0
  }

  /** Project one provider into its accounts-page row. */
  private async providerView(
    provider: Provider,
    stored: Map<string, AuthTypeName>,
  ): Promise<ProviderView> {
    const ref = providerRef(provider.id)
    const credential = stored.get(provider.id)
    const merged = mergeModels(provider, await this.catalog.stored(provider.id))
    const primary = planRoutes(provider, merged)[0]
    const checkedAt = await this.catalog.checkedAt(provider.id)
    const endpoint = routeBaseUrl(this.ctx, provider.id)
    const view: ProviderView = {
      id: provider.id,
      displayName: provider.name,
      methods: methodViews(provider),
      ...credential === undefined ? {} : { credential },
      configured: false,
      ref,
      routed: isRouted(this.ctx, provider.id),
      ...checkedAt === undefined ? {} : { catalogCheckedAt: checkedAt },
      ...primary === undefined ? {} : {
        // Prefer the route's own endpoint: a provider already pointed at a
        // gateway must offer THAT endpoint for discovery, not the vendor's,
        // or reading it would silently repoint the route back.
        baseURL: endpoint ?? primary.baseURL,
        discoverable: this.isDiscoverable(endpoint, primary, merged.length),
      },
    }
    if (credential === 'oauth') {
      const oauth = await this.store.readOAuth(provider.id)
      if (oauth !== undefined) view.expires = oauth.expires
    }
    if (view.routed) {
      const models = await this.routedModels(provider.id)
      if (models !== undefined) view.models = models
    }
    try {
      // Status only: `checkAuth` deliberately does not refresh, so listing the
      // page never costs a token exchange per provider.
      const check = await this.models.checkAuth(provider.id)
      if (check !== undefined) {
        view.configured = true
        if (check.source !== undefined) view.source = check.source
      }
    } catch (error) {
      view.error = isOAuthFailure(error)
        ? `${errorMessage(error)} — sign in again`
        : errorMessage(error)
    }
    return view
  }

  /**
   * Every installed provider, in catalog order.
   *
   * Rows build concurrently: `providerView` ends in a `checkAuth`, which for
   * an ambient provider can walk a credential chain (AWS profiles, ADC files)
   * at real cost — forty of those in sequence is a page that takes seconds to
   * open, and the surface refetches this on every window focus.
   */
  private async listProviders(): Promise<ProviderView[]> {
    const stored = new Map<string, AuthTypeName>()
    for (const info of await this.store.list()) stored.set(info.providerId, info.type)
    return mapConcurrent(
      this.models.getProviders(),
      CATALOG_FETCH_CONCURRENCY,
      provider => this.providerView(provider, stored),
    )
  }

  /**
   * The key one provider's replace wizard may reveal: the managed document's
   * entry only, and only while that document — not an OAuth account — is what
   * answers the provider.
   */
  private async storedKey(providerId: string): Promise<StoredKeyResponse> {
    const stored = await this.store.list()
    const info = stored.find(entry => entry.providerId === providerId)
    if (info?.type !== 'api_key') return {}
    const key = await this.readStoredKey(providerRef(providerId))
    return key === undefined ? {} : { key }
  }

  /**
   * Start one login attempt. pi-ai owns the handshake; this only supplies the
   * interaction and, on success, makes the provider reachable.
   */
  private login(providerId: string, method: AuthType): LoginSession {
    return this.sessions.start(
      providerId,
      interaction => this.models.login(providerId, method, interaction),
      async (credential) => {
        if (!this.autoRoute) return
        await this.serialize(() => this.routeProvider(providerId, credential))
      },
    )
  }

  /**
   * Refuse to route a credential the adapter's route cannot carry.
   *
   * The handshake between this plugin and the adapter is a single credential
   * reference resolved to ONE string (`apiKeyEnv`). pi-ai can resolve auth
   * that is more than that — request headers derived from the credential, or
   * provider-scoped env extras such as Cloudflare's account and gateway ids —
   * and a route written for such a provider would fail every request with a
   * bare authentication error instead of saying what is missing. Failing the
   * routing step names the gap; the credential itself stays stored either
   * way. Two shapes pass: extras BESIDE a key only warn (the key alone may
   * authenticate), and a bearer-only credential routes because `resolve()`
   * answers with its token — see {@link soleBearerToken}.
   */
  private async assertRoutableAuth(providerId: string): Promise<void> {
    let auth: Awaited<ReturnType<MutableModels['getAuth']>>
    try {
      auth = await this.models.getAuth(providerId)
    } catch {
      // An auth-status failure (an expired token) is already the page's to report.
      return
    }
    if (auth === undefined) return
    if (soleBearerToken(auth) !== undefined) return
    const extras = [
      ...Object.keys(auth.auth.headers ?? {}).map(name => `header "${name}"`),
      ...Object.keys(auth.env ?? {}).map(name => `env "${name}"`),
    ]
    if (extras.length === 0) return
    const key = auth.auth.apiKey
    if (key !== undefined && key.length > 0) {
      this.ctx.logger.warn(
        `dsh-providers: ${providerId} resolves ${extras.join(', ')} beside its key;`
        + ' the llm route carries only the key, so requests may still be refused',
      )
      return
    }
    throw new Error(
      `dsh-providers: ${providerId} authenticates with ${extras.join(', ')} rather than a single api key,`
      + ' which a dsh route cannot carry: its credential is one string handed to the'
      + " provider's own key method. The sign-in itself succeeded and is stored; an api-key"
      + ' sign-in routes this provider today, and the stored credential waits for a dsh'
      + ' release whose adapter can attach request auth of this shape',
    )
  }

  /**
   * Point one provider's llm route at the reference this plugin answers,
   * putting back exactly what was stored before if the adapter cannot serve
   * the result — never deleting a route the user configured themselves.
   * @param credential - the credential just stored, when the caller has it; a
   *   repair from the page reads the stored one instead.
   */
  private async routeProvider(providerId: string, credential?: Credential): Promise<void> {
    const ref = providerRef(providerId)
    await this.assertRoutableAuth(providerId)
    const stored = credential ?? await this.store.read(providerId)
    const provider = this.models.getProvider(providerId)
    const baseURL = stored === undefined ? undefined : await this.credentialBaseUrl(providerId, stored)
    const declared = provider === undefined
      ? undefined
      : soleRoute(provider, mergeModels(provider, await this.catalog.stored(providerId)))
    const snapshot = routeSnapshot(this.ctx, providerId, ref)
    // Prefer the adapter's own catalog entry when it has one: that keeps the
    // provider's API implementation, its quirks, and its ambient discovery.
    // Only describe the provider ourselves when the adapter does not know it.
    try {
      await ensureRoute(this.ctx, providerId, ref, provider?.name, baseURL)
      if (await this.awaitLiveRoutes([providerId])) return
    } catch (error) {
      if (declared === undefined) throw error
    }
    if (declared !== undefined) {
      // Also under the rollback: this mutation can be rejected by the
      // adapter's own settings validation, and propagating that without
      // restoring the snapshot would leave exactly the broken section the
      // rollback below exists to prevent.
      try {
        await ensureRoute(this.ctx, providerId, ref, provider?.name, baseURL, declared)
        if (await this.awaitLiveRoutes([providerId])) return
      } catch (error) {
        await applyRouteOps(this.ctx, snapshotOps(this.ctx, providerId, ref, snapshot))
        throw error
      }
    }
    // The adapter could not build this route. Leaving the broken write in
    // place is worse than useless — `llm-pi-ai` resolves its whole section at
    // once, so one unbuildable route takes every OTHER provider's route down
    // with it — so restore exactly the pre-write state and say so.
    await applyRouteOps(this.ctx, snapshotOps(this.ctx, providerId, ref, snapshot))
    throw new Error(
      `dsh-providers: the installed llm adapter cannot serve ${providerId}`
      + `${declared === undefined
        ? ' — it speaks a wire protocol the adapter only reaches through its own catalog, which this dsh release does not carry'
        : ' — even described in full'}`
      + `, so its route was left as it was (${piAiVersionSkew()})`,
    )
  }

  /**
   * Wait, briefly, for every named route to become a live LLM route.
   *
   * The adapter re-resolves its providers when the settings document commits,
   * which is a separate turn: answering the surface the instant the write
   * lands would report the provider as routed while the seam still refuses to
   * list its models. A provider split across protocols is only wired
   * correctly when all of its routes answer.
   * @returns whether every route answered — trivially true with no llm seam
   *   mounted, where there is nothing to verify against and treating every
   *   write as failed would make sign-in impossible.
   */
  private async awaitLiveRoutes(routeIds: readonly string[]): Promise<boolean> {
    const llm = this.ctx.get('llm')
    if (llm === undefined) return true
    const deadline = Date.now() + ROUTE_ACTIVATION_TIMEOUT_MS
    for (;;) {
      const live = await Promise.all(routeIds.map(async (routeId) => {
        try {
          await llm.listModels(routeId)
          return true
        } catch {
          return false
        }
      }))
      if (live.every(Boolean)) return true
      if (Date.now() >= deadline) return false
      await new Promise(resolve => setTimeout(resolve, ROUTE_ACTIVATION_POLL_MS))
    }
  }

  /**
   * The endpoint a credential itself decides, when its method derives one.
   * GitHub Copilot is the case: `toAuth` returns the account's base URL beside
   * the token, and the credential seam carries a value, not a URL.
   */
  private async credentialBaseUrl(
    providerId: string,
    credential: Credential,
  ): Promise<string | undefined> {
    if (credential.type !== 'oauth') return undefined
    const oauth = this.models.getProvider(providerId)?.auth.oauth
    if (oauth === undefined) return undefined
    try {
      return (await oauth.toAuth(credential)).baseUrl
    } catch {
      // A method that cannot derive an endpoint simply has none to record.
      return undefined
    }
  }

  /**
   * Write the planned routes of one or more providers as a single settings
   * mutation, undoing all of it if the adapter cannot serve the result.
   *
   * The undo matters: `llm-pi-ai` resolves its whole settings section at
   * once, so a single route it refuses to build takes every other provider's
   * route down with it until someone edits the document by hand. Snapshots
   * are whole-entry, so a rollback also removes routes the write created and
   * fully restores routes it deleted.
   * @returns how many models the committed routes serve.
   */
  private async commitRoutes(commits: readonly RouteCommit[]): Promise<number> {
    const snapshots = commits.map(commit => ({
      providerId: commit.providerId,
      ref: commit.ref,
      snapshot: routeSnapshot(this.ctx, commit.providerId, commit.ref),
    }))
    await applyRouteOps(this.ctx, commits.flatMap(commit => (
      routeOps(this.ctx, commit.providerId, commit.ref, commit.specs, commit.reclaimBaseUrl ?? false)
    )))
    if (await this.awaitLiveRoutes(commits.flatMap(commit => commit.specs.map(spec => spec.routeId)))) {
      return commits.reduce((total, commit) => total + countModels(commit.specs), 0)
    }
    await applyRouteOps(this.ctx, snapshots.flatMap(entry => (
      snapshotOps(this.ctx, entry.providerId, entry.ref, entry.snapshot)
    )))
    throw new Error(
      'dsh-providers: the installed llm adapter would not serve the updated routes,'
      + ` so the previous ones were put back (${piAiVersionSkew()})`,
    )
  }

  /**
   * Plan what one provider's catalog refresh should write, if anything.
   * @returns the report row, plus the commit when a write is actually needed —
   *   absent both for an up-to-date provider (writing a model list PINS the
   *   route off the adapter's catalog, so a no-op write would quietly stop the
   *   route from inheriting future catalog fixes) and for one with nothing
   *   routable.
   */
  private async planCatalogUpdate(
    provider: Provider,
    outcome: RefreshOutcome,
  ): Promise<{ update: CatalogUpdate; commit?: RouteCommit }> {
    const served = await this.routedModels(provider.id) ?? []
    const specs = retainServed(planRoutes(provider, mergeModels(provider, outcome.models)), served)
    if (specs.length === 0) {
      return { update: { provider: provider.id, count: served.length, changed: false } }
    }
    const ref = providerRef(provider.id)
    const count = countModels(specs)
    const planned = specs.flatMap(spec => spec.models.map(model => model.id)).toSorted().join(' ')
    const serving = served.map(model => model.id).toSorted().join(' ')
    if (!hasPinnedModels(this.ctx, provider.id, ref) && planned === serving) {
      return { update: { provider: provider.id, count: served.length, changed: false } }
    }
    return {
      update: {
        provider: provider.id,
        count,
        changed: outcome.changed || count !== served.length,
      },
      commit: { providerId: provider.id, ref, specs },
    }
  }

  /**
   * Refresh model catalogs and rewrite the routes they describe. "Refresh"
   * means the curated catalog at pi.dev, not the provider's own listing.
   *
   * Fetching runs in parallel; writing is one batched mutation through
   * {@link AuthCredentialProvider.commitRoutes}. Per-provider fetch failures
   * are reported rather than thrown: one unreachable catalog is no reason to
   * leave the other thirty-nine stale.
   */
  private async refreshCatalog(providerId?: string, force = false): Promise<RefreshCatalogResponse> {
    // Routed providers only, for a named one too: "update the catalog" must
    // never CREATE a route — an unrouted provider has no served list to
    // update, and committing its plan would be a sign-in side effect smuggled
    // through a refresh.
    if (providerId !== undefined && !isRouted(this.ctx, providerId)) {
      throw new Error(`dsh-providers: ${providerId} has no llm route; sign in or wire it first`)
    }
    const providers = providerId === undefined
      ? this.models.getProviders().filter(provider => isRouted(this.ctx, provider.id))
      : this.models.getProviders().filter(provider => provider.id === providerId)

    const errors: { provider: string; message: string }[] = []
    const fetched = await mapConcurrent(providers, CATALOG_FETCH_CONCURRENCY, async (provider) => {
      try {
        return { provider, outcome: await this.catalog.refresh(provider.id, { force }) }
      } catch (error) {
        errors.push({ provider: provider.id, message: errorMessage(error) })
        return undefined
      }
    })

    const updated: CatalogUpdate[] = []
    const commits: RouteCommit[] = []
    for (const entry of fetched) {
      if (entry === undefined) continue
      const plan = await this.planCatalogUpdate(entry.provider, entry.outcome)
      updated.push(plan.update)
      if (plan.commit !== undefined) commits.push(plan.commit)
    }
    if (commits.length > 0) await this.commitRoutes(commits)
    return { updated, errors }
  }

  /**
   * Read an OpenAI-compatible `/v1/models` listing and adopt it as one
   * provider's model list.
   *
   * The endpoint is named explicitly rather than by route: naming a route
   * makes the adapter answer from its own registry without a network call,
   * the opposite of asking the endpoint. The credential travels for this one
   * call, only to an origin the user configured outside the request, and is
   * never stored by the seam. Listings are thin — an id,
   * sometimes a name and a capacity, never a protocol or a modality — so
   * everything the merged catalog already knows about a model with the same
   * id is carried forward. That keeps this from silently stripping vision off
   * a model whose listing entry says nothing about images.
   * @returns how many models the endpoint reported.
   */
  private async discoverEndpoint(providerId: string, baseURL?: string): Promise<number> {
    const llm = this.ctx.get('llm')
    if (llm === undefined) throw new Error('dsh-providers: no llm service is mounted')
    const provider = this.models.getProvider(providerId)
    if (provider === undefined) throw new Error(`dsh-providers: no provider named ${providerId}`)
    const merged = mergeModels(provider, await this.catalog.stored(providerId))
    const primary = planRoutes(provider, merged)[0]
    if (primary === undefined || !LISTABLE_PROTOCOLS.has(primary.api)) {
      throw new Error(
        `dsh-providers: ${providerId} speaks ${primary?.api ?? 'no supported protocol'}, which has no model`
        + ' listing this build can read; use the catalog update instead',
      )
    }
    const api = primary.api
    const endpoint = baseURL !== undefined && baseURL.trim().length > 0 ? baseURL.trim() : primary.baseURL
    let target: URL
    try {
      target = new URL(endpoint)
    } catch {
      throw new Error(`dsh-providers: "${endpoint}" is not a valid endpoint URL`)
    }
    if (target.protocol !== 'http:' && target.protocol !== 'https:') {
      throw new Error(`dsh-providers: endpoint discovery only speaks http(s), not ${target.protocol.slice(0, -1)}`)
    }
    // The credential travels only to an origin the user configured OUTSIDE
    // this request: the provider's own catalog endpoint, or the baseURL
    // already stored in its route. The endpoint field arrives from the
    // browser, and attaching the stored key to an arbitrary URL would let any
    // same-origin page exfiltrate it with one POST. An unauthenticated listing
    // still works against any other endpoint; one that requires auth must be
    // written into the route first.
    const trustedOrigins = new Set<string>()
    for (const known of [primary.baseURL, routeBaseUrl(this.ctx, providerId)]) {
      if (known === undefined) continue
      try {
        trustedOrigins.add(new URL(known).origin)
      } catch {
        // A malformed known endpoint simply vouches for nothing.
      }
    }
    const auth = trustedOrigins.has(target.origin) ? await this.models.getAuth(providerId) : undefined
    const discovered = await llm.discoverModels(PI_AI_NS, {
      baseURL: endpoint,
      api,
      ...auth?.auth.apiKey === undefined ? {} : { apiKey: auth.auth.apiKey },
    })
    if (discovered.length === 0) {
      throw new Error(`dsh-providers: ${endpoint} reported no models, so the list was left unchanged`)
    }
    const known = new Map<string, MergedModel>(merged.map(model => [model.id, model]))
    const spec: RouteSpec = {
      routeId: providerId,
      api,
      baseURL: endpoint,
      displayName: provider.name,
      models: discovered.map((model) => {
        const base = known.get(model.id)
        const contextWindow = model.contextWindow ?? base?.contextWindow
        const maxTokens = model.maxTokens ?? base?.maxTokens
        const input = base?.input
        return {
          id: model.id,
          name: model.name ?? base?.name ?? model.id,
          ...contextWindow === undefined ? {} : { contextWindow },
          ...maxTokens === undefined ? {} : { maxTokens },
          ...input === undefined ? {} : { input: [...input] },
        }
      }),
    }
    // One endpoint answers one list, so a provider previously split across
    // protocols collapses back to the single route that list describes. The
    // user named this endpoint, so the route's baseURL is deliberately
    // overwritten (`reclaimBaseUrl`) — the one write that is allowed to.
    await this.commitRoutes([{ providerId, ref: providerRef(providerId), specs: [spec], reclaimBaseUrl: true }])
    return discovered.length
  }

  /** Remove a provider's credential, optionally removing its llm routes too. */
  private async logout(providerId: string, removeRoute = false): Promise<void> {
    await this.models.logout(providerId)
    if (removeRoute) await unroute(this.ctx, providerId, providerRef(providerId))
  }
}

export default AuthCredentialProvider
