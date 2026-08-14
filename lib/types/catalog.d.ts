/**
 * Turns a provider's model list into the `llm-pi-ai` routes that serve it.
 *
 * The adapter declares the wire protocol (`api`) per route, not per model, so a
 * provider whose models speak different protocols is split into one route per
 * protocol.
 */
import type { PiAiModality, PiAiModelProfile, PiAiProviderProfile } from '@deepseek-ai/dsh-llm-pi-ai';
import type { Provider } from '@earendil-works/pi-ai';
import type { CatalogModel } from './remote-catalog.ts';
/** Every route-key suffix this module can produce; used to recognize our own routes later. */
export declare const OVERFLOW_SUFFIXES: readonly string[];
/** Route-key suffix → the wire protocol it stands for; the inverse of {@link PROTOCOLS}. */
export declare const SUFFIX_PROTOCOLS: Readonly<Record<string, string>>;
/** One model after merging the remote catalog over the baked data. */
export interface MergedModel {
    id: string;
    name: string;
    /** Wire protocol. Always known — a model without one cannot be routed. */
    api: string;
    /** Endpoint. Always known for the same reason. */
    baseUrl: string;
    contextWindow?: number;
    maxTokens?: number;
    input?: readonly PiAiModality[];
    /** Whether the model reasons at all. */
    reasoning?: boolean;
    /** Thinking level → wire spelling; `null` means the level is unsupported. */
    thinkingLevels?: Record<string, string | null>;
    /** Whether the endpoint accepts a `reasoning_effort` parameter. */
    supportsReasoningEffort?: boolean;
    /** Wire format the endpoint returns reasoning in, when the catalog names one. */
    thinkingFormat?: string;
    /** Request headers this model needs, e.g. GitHub Copilot's editor identification. */
    headers?: Record<string, string>;
}
/** One `llm-pi-ai` route this plugin writes for a provider. */
export interface RouteSpec {
    /** Key under `llm-pi-ai.providers`. The primary route uses the provider id itself. */
    routeId: string;
    /** Wire protocol every model on this route speaks. */
    api: string;
    /** Endpoint this route sends to. */
    baseURL: string;
    /** Name shown for this route in configuration UIs. */
    displayName: string;
    /**
     * Request headers every model on this route needs. Headers are model-level in
     * pi-ai but route-level in the adapter, so this is set only when every model
     * in the group agrees (GitHub Copilot does, and its endpoint rejects requests
     * without them).
     */
    headers?: Record<string, string>;
    /** The models this route serves, in catalog order. */
    models: PiAiModelProfile[];
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
export declare function mergeModels(provider: Provider, overlay: readonly CatalogModel[]): MergedModel[];
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
export declare function planRoutes(provider: Provider, models: readonly MergedModel[]): RouteSpec[];
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
export declare function retainServed(specs: readonly RouteSpec[], served: readonly {
    id: string;
    name: string;
    api?: string;
}[]): RouteSpec[];
/** The settings fragment to write under one route's key. */
export declare function routeProfile(spec: RouteSpec): Partial<PiAiProviderProfile>;
/**
 * Describe a provider as a single fully-declared route, when one route can
 * describe it at all. This is the sign-in fallback for a provider the shipped
 * adapter has never heard of: with no catalog entry to inherit, the route must
 * spell out protocol, endpoint and models or the adapter cannot build it.
 * @returns the single route, or undefined when one route cannot describe it.
 */
export declare function soleRoute(provider: Provider, models: readonly MergedModel[]): RouteSpec | undefined;
