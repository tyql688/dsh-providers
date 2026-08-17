/**
 * The HTTP contract between this plugin's Host half and its browser half.
 *
 * dsh's API gateway method table is closed to out-of-tree plugins, so the Host
 * registers its own routes on `ctx.webServer` and the browser half fetches
 * them same-origin. Both halves ship from this package and inline this file,
 * so the contract has one source instead of two kept in sync.
 */
/**
 * Prefix every route of this plugin lives under.
 *
 * Deliberately NOT under `/plugins/<package>`: the client-module registry owns
 * `/plugins` and serves this package's browser bundle at
 * `/plugins/dsh-providers/client.js`. The webserver matches the longest
 * prefix, so a route there would capture that request and answer JS with JSON.
 */
export declare const PROVIDERS_ROUTE_PREFIX = "/dsh-providers";
/** The two authentication methods a pi-ai provider can offer. */
export type AuthTypeName = 'oauth' | 'api_key';
/** One authentication method a provider offers, projected for a selector. */
export interface AuthMethodView {
    type: AuthTypeName;
    /** Method display name, e.g. `Anthropic (Claude Pro/Max)`. */
    name: string;
    /** OAuth only: the button label the provider asks for, e.g. `Sign in with SuperGrok or X Premium`. */
    loginLabel?: string;
    /** OAuth only: backed by a provider subscription rather than metered billing. */
    subscription?: boolean;
}
/** One provider row: what it offers, and where its credential currently stands. */
export interface ProviderView {
    /** pi-ai provider id; also the llm route key and the stem of {@link ProviderView.ref}. */
    id: string;
    /** Provider display name, e.g. `OpenAI Codex`. */
    displayName: string;
    /** Offered methods, OAuth first when both exist. */
    methods: AuthMethodView[];
    /**
     * Kind of credential the managed stores hold: an OAuth account in
     * `auth.json`, or an api key in the managed credentials document — whether
     * this plugin or the shipped Models page wrote it. Absent while signed out.
     */
    credential?: AuthTypeName;
    /**
     * Whether a request could authenticate right now. True also for a provider
     * carrying no stored credential but reachable through its own ambient
     * discovery (an environment key, an AWS profile, ADC files).
     */
    configured: boolean;
    /** Label for where the working credential comes from: `OAuth`, `ANTHROPIC_API_KEY`, … */
    source?: string;
    /** OAuth access-token expiry in epoch milliseconds. */
    expires?: number;
    /** Last refresh or status failure for this provider. */
    error?: string;
    /** Credential reference the provider's llm route reads. */
    ref: string;
    /** Whether an `llm-pi-ai` route for this provider exists in the settings document. */
    routed: boolean;
    /** When the pi.dev catalog was last checked, epoch ms; absent when never. */
    catalogCheckedAt?: number;
    /** Endpoint the models are served from, offered as the starting value for endpoint discovery. */
    baseURL?: string;
    /**
     * Whether reading an OpenAI-compatible `/v1/models` listing is worth offering.
     * False for a provider pi-ai maintains, where the catalog already answers
     * better than a listing can; true where the route points somewhere else.
     */
    discoverable?: boolean;
    /**
     * Models the live routes serve, in the adapter's own order. Present only for
     * a routed provider: the installed catalog's list would be a promise this
     * deployment has not made.
     */
    models?: ModelView[];
    /**
     * Label of a local CLI login this plugin could adopt (e.g. `Codex CLI`),
     * present only while the provider itself is signed out. Detection only —
     * the tokens never travel; the import happens Host-side on explicit request.
     */
    importSource?: string;
}
/** Body of `POST import-credential`: adopt a detected local CLI login for one provider. */
export interface ImportCredentialRequest {
    provider: string;
}
/** One model the provider's live routes serve. */
export interface ModelView {
    /** Model id, as the picker and the session log record it. */
    id: string;
    /** Human-readable name. */
    name: string;
    /** Route key serving it: the provider id, or `<provider>-<protocol>` on a split provider. */
    route: string;
    /**
     * Wire protocol the serving route names, when it names one. Shown so a
     * split provider's two entries make sense on screen. A catalog route names
     * none, and such a provider is never split.
     */
    api?: string;
    /** Accepted request modalities, when the adapter discloses them. */
    input?: string[];
}
/** Reply of `GET providers`. */
export interface ProvidersResponse {
    providers: ProviderView[];
}
/**
 * Reply of `GET stored-key`. Sent only for a key this plugin itself stored in
 * the managed credentials document; an OAuth token or an ambient environment
 * value is never returned by this route.
 */
export interface StoredKeyResponse {
    /** The stored api key; absent when this provider stores none. */
    key?: string;
}
/** A link carried beside an informational login message. */
export interface AuthLink {
    url: string;
    label?: string;
}
/** One option of a `select` prompt. */
export interface AuthSelectOption {
    id: string;
    label: string;
    description?: string;
}
/**
 * One step of a login flow, streamed as an SSE `data:` line.
 *
 * These mirror pi-ai's `AuthEvent` and `AuthPrompt` one for one rather than
 * being reduced to a smaller set: which steps a provider takes is the
 * provider's business, and collapsing them would make a flow this code has
 * never seen unrenderable.
 */
export type LoginEvent = {
    type: 'auth_url';
    url: string;
    instructions?: string;
} | {
    type: 'device_code';
    userCode: string;
    verificationUri: string;
    intervalSeconds?: number;
    expiresInSeconds?: number;
} | {
    type: 'info';
    message: string;
    links?: AuthLink[];
} | {
    type: 'progress';
    message: string;
} | {
    type: 'prompt';
    /** Identifies this prompt in the matching `POST answer`. */
    requestId: string;
    kind: 'text' | 'secret' | 'select' | 'manual_code';
    message: string;
    placeholder?: string;
    /** `select` only. */
    options?: AuthSelectOption[];
}
/** The named prompt no longer needs an answer: it was answered, or the flow resolved it out of band. */
 | {
    type: 'prompt_done';
    requestId: string;
} | {
    type: 'done';
    provider: string;
    credential: AuthTypeName;
} | {
    type: 'error';
    message: string;
};
/** Body of `POST login`. */
export interface LoginRequest {
    provider: string;
    method: AuthTypeName;
}
/**
 * Reply of `POST login`. The flow starts here and its steps arrive on
 * `GET events?loginId=…` — `EventSource` can only issue a GET, so starting
 * the flow and streaming it are two requests. Every event is buffered, so
 * opening the stream late loses nothing.
 */
export interface LoginStartResponse {
    loginId: string;
}
/** Body of `POST answer`. */
export interface AnswerRequest {
    loginId: string;
    requestId: string;
    value: string;
}
/** Body of `POST cancel`. */
export interface CancelRequest {
    loginId: string;
}
/** Body of `POST route`: wire one provider into the Models page without signing in again. */
export interface RouteRequest {
    provider: string;
}
/**
 * Body of `POST refresh-catalog`: refresh model catalogs from pi.dev.
 * Omitting `provider` updates every routed provider (the page-level action);
 * naming one updates just that card.
 */
export interface RefreshCatalogRequest {
    provider?: string;
    /**
     * Bypass the freshness window; omitted or false respects it. The page's
     * buttons send true — pressing update means now.
     */
    force?: boolean;
}
/** What one provider's catalog update did. */
export interface CatalogUpdate {
    provider: string;
    /** Models the provider's routes serve afterwards. */
    count: number;
    /** Whether the served set actually changed. */
    changed: boolean;
}
/** Reply of `POST refresh-catalog`. */
export interface RefreshCatalogResponse {
    updated: CatalogUpdate[];
    /** Providers that could not be updated, each with the reason; the rest still applied. */
    errors: {
        provider: string;
        message: string;
    }[];
}
/**
 * Body of `POST discover-endpoint`: read an OpenAI-compatible `/v1/models`
 * listing and adopt it as this provider's model list. Deliberately distinct
 * from a catalog update, which asks pi.dev instead of the endpoint.
 */
export interface DiscoverEndpointRequest {
    provider: string;
    /** Endpoint to interrogate; defaults to the provider's own. */
    baseURL?: string;
}
/** Reply of `POST discover-endpoint`. */
export interface DiscoverEndpointResponse {
    /** How many models the endpoint reported. */
    count: number;
}
/**
 * One slice of provider-reported token usage, summed over every session log.
 * Buckets are disjoint, as `TokenUsage` reports them: billed input is
 * `inputTokens + cacheReadTokens + cacheWriteTokens`.
 */
export interface UsageBuckets {
    /** Uncached input tokens. */
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    /**
     * Reasoning (thinking) tokens the provider reported. A SUBSET of
     * `outputTokens`, never added into any total — carried so reasoning-heavy
     * models can show how much of their output was thinking.
     */
    reasoningTokens: number;
    /**
     * Approximate cost in USD over the tokens a pi-ai catalog price matched,
     * at the flat per-model rates (tiered pricing is priced at the base tier).
     */
    cost: number;
    /**
     * What the cache reads WOULD have cost at full input rates minus what they
     * cost at cache rates — the money prompt caching saved. 0 for unpriced
     * models and for catalogs whose cache rate is not below the input rate.
     */
    cacheSavings: number;
    /** Summed model-call wall time (step open to final accounting). */
    totalDurationMs: number;
    /** The slowest single model call; 0 when none reported. */
    maxDurationMs: number;
    /** Tokens no catalog price matched; counted in the buckets, absent from `cost`. */
    unpricedTokens: number;
    /** Model calls that reported usage (one per turn/step sample). */
    calls: number;
}
/** One model's share of one day, for the by-model day stacking. */
export interface UsageDayModel {
    provider: string;
    model: string;
    tokens: number;
}
/** One local calendar day's usage. */
export interface UsageDay extends UsageBuckets {
    /** Host-local calendar day, `YYYY-MM-DD`. */
    date: string;
    /** Tool invocations the model requested that day. */
    toolCalls: number;
    /** Turns that ended other than `completed` (aborted, error, max-tokens). */
    failedTurns: number;
    /**
     * Agent-busy time that day: summed turn durations (turn/start to turn/end),
     * capped per turn so a crash-interrupted turn cannot inflate the day.
     */
    activeMs: number;
    /** The day's tokens split per model, largest first. */
    byModel: UsageDayModel[];
}
/** One model's usage over the requested window. */
export interface UsageModelRow extends UsageBuckets {
    /** Logged route key, e.g. `anthropic` or `xai-responses`. */
    provider: string;
    /** Model id, as the session log records it. */
    model: string;
}
/** One tool's invocations over the requested window. */
export interface UsageToolRow {
    /** Tool name as the model requested it. */
    name: string;
    calls: number;
    /** Calls whose result reported a failure. */
    errors: number;
}
/** One working directory's usage over the requested window. */
export interface UsageProjectRow extends UsageBuckets {
    /** Session cwd; null groups the sessions that record none. */
    cwd: string | null;
}
/** One hour-of-day slice summed across the whole window (0–23, host-local). */
export interface UsageHour {
    hour: number;
    tokens: number;
    calls: number;
}
/** One day's 24 clock slots, for the hour heatmap. */
export interface UsageDayHours {
    date: string;
    hours: UsageHour[];
}
/** One session's usage over the requested window, heaviest first. */
export interface UsageSessionRow extends UsageBuckets {
    /** Session id (also the row's key). */
    id: string;
    /** The session's first user text, truncated; null when it recorded none. */
    title: string | null;
    /** Session cwd; null groups the sessions that record none. */
    cwd: string | null;
    /** The latest in-window day the session contributed usage. */
    lastDate: string;
    /** Every in-window day the session contributed usage, ascending; the drill-down day filter reads it. */
    dates: string[];
    /** Distinct `provider model` keys the session burned in the window; the drill-down model/provider filters read it. */
    models: string[];
    /** True when the session ran as a delegated subagent child. */
    subagent?: boolean;
}
/** One step's token accounting, for the session usage timeline. */
export interface SessionUsageStep {
    turn: number;
    step: number;
    /** Epoch ms when the step's final accounting landed. */
    time: number;
    /** Model-call wall time: from step open to its last accounting. */
    durationMs: number | null;
    /** The route key the step ran on. */
    provider: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    /** Reasoning tokens, a subset of `outputTokens` (0 when unreported). */
    reasoningTokens: number;
    /** Approximate cost at catalog rates; 0 when the step was unpriced. */
    cost: number;
}
/** One descendant (subagent) session's contribution to the session view. */
export interface SessionUsageSubagent {
    id: string;
    /** The agent preset the child ran as (e.g. `Explore`); null when unrecorded. */
    agentPreset: string | null;
    /** The subagent's first user text (its task), truncated; null when none. */
    title: string | null;
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    /** Approximate cost at catalog rates. */
    cost: number;
    calls: number;
}
/** One model's share of one session. */
export interface SessionUsageModel {
    provider: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    /** Reasoning tokens, a subset of `outputTokens` (0 when unreported). */
    reasoningTokens: number;
    cost: number;
    unpricedTokens: number;
    calls: number;
}
/**
 * Reply of `GET usage/session?id=`: one session's full accounting — totals,
 * the per-model split, and the per-step timeline (oldest first, capped at
 * the most recent 480 steps). Totals, groupings, and the timeline fold ONLY
 * this session, so they reconcile with the composer's own meter; each known
 * descendant (subagent) session's share arrives separately in the
 * `subagents` rows, and the client presents the tree rollup from those.
 */
export interface SessionUsageResponse {
    id: string;
    /** The session's first user text, truncated; null when it recorded none. */
    title: string | null;
    /** Display form of the session's cwd, home shortened to `~`; null when unrecorded. */
    cwd: string | null;
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    cost: number;
    unpricedTokens: number;
    calls: number;
    toolCalls: number;
    /** Reasoning tokens, a subset of `outputTokens` (0 when unreported). */
    reasoningTokens: number;
    /** The session's tool traffic, busiest first. */
    tools: UsageToolRow[];
    /**
     * The session's fullest prompt: the largest prompt-side token count any
     * call reported (input + cache read + cache write), paired with the route's
     * advertised context window when known. Null before the first call.
     */
    contextPeak: {
        tokens: number;
        window: number | null;
    } | null;
    models: SessionUsageModel[];
    /** The known descendant (subagent) sessions' shares, heaviest first. */
    subagents: SessionUsageSubagent[];
    /** The session's model calls as a timeline, oldest first, capped at the most recent; `stepsTotal` is the true count. */
    steps: SessionUsageStep[];
    /** Every model call the session recorded; exceeds `steps.length` when the timeline carries only the tail. */
    stepsTotal: number;
}
/**
 * Reply of `GET usage?days=N`: the last N host-local days, oldest first,
 * today always last, zero-filled where nothing ran — plus the same window
 * regrouped per model, per tool, per project, and per session, each busiest
 * first, the last seven days' per-hour figures for the heatmap, and a fixed
 * 53-week day axis for the activity calendar (independent of the window).
 * `days=all` spans from the earliest session creation, capped at a year.
 */
export interface UsageResponse {
    days: UsageDay[];
    models: UsageModelRow[];
    tools: UsageToolRow[];
    projects: UsageProjectRow[];
    /** The heaviest sessions of the window, largest first. */
    sessions: UsageSessionRow[];
    /** The window's last seven days, oldest first, 24 clock slots each. */
    weekHours: UsageDayHours[];
    /** The last 53 weeks of days, Monday-aligned, oldest first — the calendar grid. */
    heatmap: UsageDay[];
    /** Sessions that contributed at least one usage sample inside the window. */
    sessionCount: number;
    /** Session logs that could not be read; their usage is missing from the figures. */
    skippedSessions: number;
}
/** Body of `POST logout`. */
export interface LogoutRequest {
    provider: string;
    /**
     * Also remove the provider's `llm-pi-ai` route. Defaults to false: the route
     * may carry a model list, a gateway endpoint, or an api key configured
     * through the shipped Models page under the same reference.
     */
    unroute?: boolean;
}
/** Every route's failure shape. */
export interface ErrorResponse {
    error: string;
}
