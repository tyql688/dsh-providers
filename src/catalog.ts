/**
 * Turns a provider's model list into the `llm-pi-ai` routes that serve it.
 *
 * The adapter declares the wire protocol (`api`) per route, not per model, so a
 * provider whose models speak different protocols is split into one route per
 * protocol.
 */

import { supportedProtocols } from '@deepseek-ai/dsh-llm-pi-ai'
import type { PiAiModality, PiAiModelProfile, PiAiProviderProfile } from '@deepseek-ai/dsh-llm-pi-ai'
import type { Api, Model, Provider } from '@earendil-works/pi-ai'
import type { CatalogModel } from './remote-catalog.ts'

/** Request modalities the route schema accepts; anything else is dropped. */
const MODALITIES = new Set<string>(['text', 'image'])

/**
 * Per-protocol route-key suffix and display label, for the extra routes of a
 * multi-protocol provider. The suffixes end up in settings keys the user can
 * see and edit, so they must never change. A protocol absent from this table
 * is not routed at all: minting an unmapped suffix would create a route key
 * that {@link OVERFLOW_SUFFIXES}-based ownership checks could never recognize
 * or clean up.
 */
const PROTOCOLS: Record<string, { suffix: string; label: string }> = {
  'openai-completions': { suffix: 'completions', label: 'Completions' },
  'openai-responses': { suffix: 'responses', label: 'Responses' },
  'anthropic-messages': { suffix: 'anthropic', label: 'Anthropic' },
}

/** Every route-key suffix this module can produce; used to recognize our own routes later. */
export const OVERFLOW_SUFFIXES: readonly string[] = Object.values(PROTOCOLS).map(protocol => protocol.suffix)

/** Route-key suffix → the wire protocol it stands for; the inverse of {@link PROTOCOLS}. */
export const SUFFIX_PROTOCOLS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(PROTOCOLS).map(([api, protocol]) => [protocol.suffix, api]),
)

/** One model after merging the remote catalog over the baked data. */
export interface MergedModel {
  id: string
  name: string
  /** Wire protocol. Always known — a model without one cannot be routed. */
  api: string
  /** Endpoint. Always known for the same reason. */
  baseUrl: string
  contextWindow?: number
  maxTokens?: number
  input?: readonly PiAiModality[]
  /** Whether the model reasons at all. */
  reasoning?: boolean
  /** Thinking level → wire spelling; `null` means the level is unsupported. */
  thinkingLevels?: Record<string, string | null>
  /** Whether the endpoint accepts a `reasoning_effort` parameter. */
  supportsReasoningEffort?: boolean
  /** Wire format the endpoint returns reasoning in, when the catalog names one. */
  thinkingFormat?: string
  /** Request headers this model needs, e.g. GitHub Copilot's editor identification. */
  headers?: Record<string, string>
}

/** One `llm-pi-ai` route this plugin writes for a provider. */
export interface RouteSpec {
  /** Key under `llm-pi-ai.providers`. The primary route uses the provider id itself. */
  routeId: string
  /** Wire protocol every model on this route speaks. */
  api: string
  /** Endpoint this route sends to. */
  baseURL: string
  /** Name shown for this route in configuration UIs. */
  displayName: string
  /**
   * Request headers every model on this route needs. Headers are model-level in
   * pi-ai but route-level in the adapter, so this is set only when every model
   * in the group agrees (GitHub Copilot does, and its endpoint rejects requests
   * without them).
   */
  headers?: Record<string, string>
  /** The models this route serves, in catalog order. */
  models: PiAiModelProfile[]
}

/** Keep only the modalities the route schema accepts. */
function modalities(input: readonly string[] | undefined): readonly PiAiModality[] | undefined {
  if (input === undefined) return undefined
  const kept = input.filter((modality): modality is PiAiModality => MODALITIES.has(modality))
  return kept.length > 0 ? kept : undefined
}

/**
 * Reasoning wire formats the adapter's schema accepts. pi-ai knows more (e.g.
 * `baseten`); a value outside this set is dropped rather than written, so
 * pi-ai's own baseURL-based detection answers instead of the route failing.
 */
const THINKING_FORMATS = new Set([
  'openai', 'deepseek', 'openrouter', 'together', 'zai', 'qwen', 'string-thinking', 'ant-ling',
])

/** Read `supportsReasoningEffort` off a catalog entry's compat block, when it is a boolean. */
function reasoningEffortSwitch(compat: unknown): boolean | undefined {
  if (typeof compat !== 'object' || compat === null) return undefined
  const value = (compat as { supportsReasoningEffort?: unknown }).supportsReasoningEffort
  return typeof value === 'boolean' ? value : undefined
}

/** Read `thinkingFormat` off a catalog entry's compat block, when the adapter can accept it. */
function thinkingFormat(compat: unknown): string | undefined {
  if (typeof compat !== 'object' || compat === null) return undefined
  const value = (compat as { thinkingFormat?: unknown }).thinkingFormat
  return typeof value === 'string' && THINKING_FORMATS.has(value) ? value : undefined
}

/** Read string-valued request headers off a catalog entry, if any. */
function headersOf(value: unknown): Record<string, string> | undefined {
  if (typeof value !== 'object' || value === null) return undefined
  const headers: Record<string, string> = {}
  for (const [name, header] of Object.entries(value)) {
    if (typeof header === 'string') headers[name] = header
  }
  return Object.keys(headers).length > 0 ? headers : undefined
}

/** Project one baked pi-ai catalog model into the merge shape. */
function fromBaked(model: Model<Api>, providerBaseUrl: string | undefined): MergedModel | undefined {
  const baseUrl = model.baseUrl ?? providerBaseUrl
  if (baseUrl === undefined || baseUrl.length === 0) return undefined
  const input = modalities(model.input)
  const effort = reasoningEffortSwitch(model.compat)
  const format = thinkingFormat(model.compat)
  const headers = headersOf(model.headers)
  return {
    id: model.id,
    name: model.name,
    api: model.api as string,
    baseUrl,
    ...model.contextWindow === undefined ? {} : { contextWindow: model.contextWindow },
    ...model.maxTokens === undefined ? {} : { maxTokens: model.maxTokens },
    ...input === undefined ? {} : { input },
    reasoning: model.reasoning,
    ...model.thinkingLevelMap === undefined ? {} : { thinkingLevels: { ...model.thinkingLevelMap } },
    ...effort === undefined ? {} : { supportsReasoningEffort: effort },
    ...format === undefined ? {} : { thinkingFormat: format },
    ...headers === undefined ? {} : { headers },
  }
}

/**
 * Project one remote catalog model. Fields the remote entry omits fall back to
 * the baked entry of the same id, so a partial remote entry never erases what
 * the baked data already knows.
 */
function fromRemote(
  model: CatalogModel,
  baked: MergedModel | undefined,
  providerBaseUrl: string | undefined,
): MergedModel | undefined {
  const api = model.api ?? baked?.api
  const baseUrl = model.baseUrl ?? baked?.baseUrl ?? providerBaseUrl
  if (api === undefined || baseUrl === undefined || baseUrl.length === 0) return undefined
  const input = modalities(model.input) ?? baked?.input
  const contextWindow = model.contextWindow ?? baked?.contextWindow
  const maxTokens = model.maxTokens ?? baked?.maxTokens
  const thinkingLevels = model.thinkingLevelMap ?? baked?.thinkingLevels
  const effort = reasoningEffortSwitch(model.compat) ?? baked?.supportsReasoningEffort
  const format = thinkingFormat(model.compat) ?? baked?.thinkingFormat
  const headers = headersOf(model.headers) ?? baked?.headers
  return {
    id: model.id,
    name: model.name ?? baked?.name ?? model.id,
    api,
    baseUrl,
    ...contextWindow === undefined ? {} : { contextWindow },
    ...maxTokens === undefined ? {} : { maxTokens },
    ...input === undefined ? {} : { input },
    reasoning: model.reasoning ?? baked?.reasoning ?? false,
    ...thinkingLevels === undefined ? {} : { thinkingLevels: { ...thinkingLevels } },
    ...effort === undefined ? {} : { supportsReasoningEffort: effort },
    ...format === undefined ? {} : { thinkingFormat: format },
    ...headers === undefined ? {} : { headers },
  }
}

/**
 * Merge the remote catalog over the baked one.
 *
 * This is an overlay, not a replacement: a remote entry supersedes the baked
 * entry with the same id and new ids are appended, but a model the remote
 * catalog dropped keeps serving — removing it would break a session pinned to
 * it, and a catalog fetch is not the place to decide that.
 * @returns the merged models, baked order first, remote additions after.
 */
export function mergeModels(provider: Provider, overlay: readonly CatalogModel[]): MergedModel[] {
  let baked: readonly Model<Api>[] = []
  try {
    baked = provider.getModels()
  } catch {
    // pi-ai documents a throwing `getModels` as "no models".
  }
  const merged = new Map<string, MergedModel>()
  for (const model of baked) {
    const projected = fromBaked(model, provider.baseUrl)
    if (projected !== undefined) merged.set(projected.id, projected)
  }
  for (const model of overlay) {
    const projected = fromRemote(model, merged.get(model.id), provider.baseUrl)
    if (projected !== undefined) merged.set(projected.id, projected)
  }
  return [...merged.values()]
}

/** Thinking levels in escalation order; the adapter accepts exactly these keys. */
const THINKING_LEVELS = ['off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'] as const

/** Levels pi-ai treats as supported by default when a model does not spell them out. */
const DEFAULT_LEVELS = new Set(['off', 'minimal', 'low', 'medium', 'high'])

/**
 * Which thinking levels a model offers, and how each is spelled on the wire.
 *
 * This must be written out explicitly: the adapter reads an absent
 * `reasoningEfforts` as "use the installed catalog's answer", and a model that
 * catalog has never heard of then becomes non-reasoning (Grok 4.6 arriving from
 * the remote catalog hit exactly that).
 *
 * The mapping follows pi-ai's own defaulting: a level mapped to a string is
 * offered with that spelling, `null` means unsupported, and an unmapped level
 * takes the provider default. `off` is declared with no wire value — that is
 * how pi-ai records it as supported without a spelling to send.
 * @returns the efforts dict, `false` for a model that does not reason, or
 *   undefined when nothing is known and inheriting is the honest answer.
 */
function reasoningEfforts(model: MergedModel): NonNullable<PiAiModelProfile['reasoningEfforts']> | undefined {
  if (model.reasoning === undefined) return undefined
  if (!model.reasoning) return false
  // Note the sentinel inversion: in `thinkingLevels` a `null` means the level
  // is UNSUPPORTED, while in the emitted dict `efforts.off = null` means
  // supported with no wire spelling — pi-ai's own convention on each side.
  const efforts: Record<string, string | null> = {}
  for (const level of THINKING_LEVELS) {
    const wire = model.thinkingLevels?.[level]
    if (wire === null) continue
    if (typeof wire === 'string') {
      efforts[level] = wire
      continue
    }
    if (!DEFAULT_LEVELS.has(level)) continue
    efforts[level] = level === 'off' ? null : level
  }
  // The adapter refuses a dict offering nothing beyond `off`: a model that can
  // only be asked not to think does not reason.
  return Object.keys(efforts).some(level => level !== 'off')
    ? efforts as NonNullable<PiAiModelProfile['reasoningEfforts']>
    : false
}

/** The reasoning-dispatch switches a model entry may carry, or undefined for none. */
function compatProfile(model: MergedModel): PiAiModelProfile['compat'] | undefined {
  const compat: Record<string, unknown> = {}
  if (model.thinkingFormat !== undefined) compat.thinkingFormat = model.thinkingFormat
  if (model.supportsReasoningEffort !== undefined) compat.supportsReasoningEffort = model.supportsReasoningEffort
  // `thinkingFormat` was already checked against the adapter's accepted set,
  // which is what the branded union encodes — hence the cast.
  return Object.keys(compat).length > 0 ? compat as PiAiModelProfile['compat'] : undefined
}

/** The settings shape of one merged model. */
function modelProfile(model: MergedModel): PiAiModelProfile {
  const efforts = reasoningEfforts(model)
  const compat = model.api !== 'openai-completions' ? undefined : compatProfile(model)
  return {
    id: model.id,
    name: model.name,
    ...model.contextWindow === undefined ? {} : { contextWindow: model.contextWindow },
    ...model.maxTokens === undefined ? {} : { maxTokens: model.maxTokens },
    // Written deliberately: a configured model defaults to text-only, so
    // omitting `input` would silently strip vision from a model the catalog
    // knows accepts images.
    ...model.input === undefined ? {} : { input: [...model.input] },
    ...efforts === undefined ? {} : { reasoningEfforts: efforts },
    // The adapter only takes reasoning switches on `openai-completions`. They
    // decide whether `reasoning_effort` goes on the wire and what shape the
    // thinking comes back in; dropping them does not fail a request, it makes
    // the model look like it stopped thinking.
    ...compat === undefined ? {} : { compat },
  }
}

/**
 * Plan the routes a provider needs to serve every model it has, grouped by
 * wire protocol: the largest group gets the provider's own key and every other
 * group gets `<provider>-<protocol>`.
 *
 * Protocols the adapter cannot serve at all are dropped here rather than
 * failing the route later — Bedrock, Vertex, Azure, Codex and Gemini frame or
 * authenticate requests in ways a base URL plus a key cannot express.
 * @returns one spec per route, the primary first; empty when nothing is routable.
 */
export function planRoutes(provider: Provider, models: readonly MergedModel[]): RouteSpec[] {
  const order = supportedProtocols()
  const supported = new Set(order)
  const groups = new Map<string, MergedModel[]>()
  for (const model of models) {
    // Both filters matter: the adapter must speak the protocol, and this
    // module must have a stable suffix for it (see PROTOCOLS).
    if (!supported.has(model.api) || PROTOCOLS[model.api] === undefined) continue
    const group = groups.get(model.api)
    if (group === undefined) groups.set(model.api, [model])
    else group.push(model)
  }
  if (groups.size === 0) return []

  // Largest group first, so the provider's own key carries the models most
  // people mean when they name it. Ties break on the protocol table's order.
  const ranked = [...groups.entries()].toSorted(([leftApi, left], [rightApi, right]) => (
    right.length - left.length || order.indexOf(leftApi) - order.indexOf(rightApi)
  ))

  const specs: RouteSpec[] = []
  for (const [api, group] of ranked) {
    const protocol = PROTOCOLS[api]
    const first = group[0]
    if (protocol === undefined || first === undefined) continue
    const primary = specs.length === 0
    const shared = new Set(group.map(model => JSON.stringify(model.headers ?? null)))
    const headers = shared.size === 1 ? first.headers : undefined
    specs.push({
      routeId: primary ? provider.id : `${provider.id}-${protocol.suffix}`,
      api,
      // Models in a group share a protocol but not necessarily an endpoint;
      // the first one's endpoint is the route's, matching what pi-ai's own
      // provider-level `baseUrl` means.
      baseURL: first.baseUrl,
      displayName: primary ? provider.name : `${provider.name} · ${protocol.label}`,
      ...headers === undefined ? {} : { headers },
      models: group.map(modelProfile),
    })
  }
  return specs
}

/**
 * Keep models the routes already serve that the new plan would drop.
 *
 * A catalog update is not only additive: this plugin's pi-ai is newer than the
 * adapter's, and pi-ai retires models. Retiring a model upstream is a fair
 * reason to stop offering it, but not a reason for it to vanish from under a
 * session pinned to it — least of all from a button labelled "update".
 * Retained entries carry only an id and a name; everything else defaults from
 * the adapter's own entry, which by definition exists.
 *
 * Applied only to a single-route provider, and only to models whose serving
 * route's protocol matches (or names none — a catalog route, never split):
 * retaining a model onto a wire it does not speak would trade a missing model
 * for one that fails every request.
 * @param served - ids the provider's routes serve right now, with their names
 *   and, when known, the protocol of the route serving each.
 * @returns the specs, the sole one extended with whatever it would have dropped.
 */
export function retainServed(
  specs: readonly RouteSpec[],
  served: readonly { id: string; name: string; api?: string }[],
): RouteSpec[] {
  const [only] = specs
  if (specs.length !== 1 || only === undefined) return [...specs]
  const planned = new Set(only.models.map(model => model.id))
  const kept = served.filter(model => (
    !planned.has(model.id) && (model.api === undefined || model.api === only.api)
  ))
  if (kept.length === 0) return [...specs]
  return [{ ...only, models: [...only.models, ...kept.map(model => ({ id: model.id, name: model.name }))] }]
}

/** The settings fragment to write under one route's key. */
export function routeProfile(spec: RouteSpec): Partial<PiAiProviderProfile> {
  return { api: spec.api, baseURL: spec.baseURL, models: spec.models }
}

/**
 * Describe a provider as a single fully-declared route, when one route can
 * describe it at all. This is the sign-in fallback for a provider the shipped
 * adapter has never heard of: with no catalog entry to inherit, the route must
 * spell out protocol, endpoint and models or the adapter cannot build it.
 * @returns the single route, or undefined when one route cannot describe it.
 */
export function soleRoute(provider: Provider, models: readonly MergedModel[]): RouteSpec | undefined {
  const routes = planRoutes(provider, models)
  return routes.length === 1 ? routes[0] : undefined
}
