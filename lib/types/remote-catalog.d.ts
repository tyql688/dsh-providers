/**
 * The pi.dev model catalog overlay — this plugin's equivalent of the "update
 * model catalogs" button in pi's own coding agent, which overlays the same
 * public endpoint onto the baked `providers/data/*.json`. The protocol mirrors
 * pi's: ETag revalidation, `last-modified` ordering against the baked data's
 * stamp, and a freshness window.
 */
/**
 * One model as the catalog describes it. Everything beyond the id is optional
 * because this is someone else's document: a catalog that grows a field must
 * not break this reader, and one that drops a field must fall back to the
 * baked value rather than crash.
 */
export interface CatalogModel {
    id: string;
    name?: string;
    /** Wire protocol this model speaks — the one field a listing endpoint cannot tell us. */
    api?: string;
    /** Endpoint this model is served from, when it differs from the provider's. */
    baseUrl?: string;
    contextWindow?: number;
    maxTokens?: number;
    /** Accepted request modalities, e.g. `["text", "image"]`. */
    input?: readonly string[];
    /** Whether the model reasons at all. */
    reasoning?: boolean;
    /**
     * Thinking level → wire spelling. `null` marks the level unsupported; a
     * missing key means the provider default, which pi-ai reads as supported for
     * the five base levels and unsupported for `xhigh` and `max`.
     */
    thinkingLevelMap?: Record<string, string | null>;
    /** Protocol compatibility switches; the adapter's profile schema names only these two. */
    compat?: {
        supportsReasoningEffort?: boolean;
        thinkingFormat?: string;
    };
    /** Request headers this model needs. */
    headers?: Record<string, string>;
}
/** Outcome of one provider's refresh, for reporting a mixed batch honestly. */
export interface RefreshOutcome {
    /** The models now cached for this provider, baked overlay excluded. */
    models: readonly CatalogModel[];
    /** Whether the served catalog changed what was cached. */
    changed: boolean;
}
/**
 * The persisted pi.dev catalog overlay. Reads are cheap and offline; only
 * {@link RemoteCatalog.refresh} touches the network. The document is written
 * under the same cross-process lock the token store uses.
 */
export declare class RemoteCatalog {
    private readonly path;
    private readonly bakedGeneratedAt;
    private readonly baseUrl;
    /** Parsed document, held for the process; every write refreshes it. */
    private document;
    /**
     * @param bakedGeneratedAt - generation stamp of the installed pi-ai's model data.
     * @param baseUrl - where the catalog is served; overridable for testing.
     */
    constructor(path: string, bakedGeneratedAt: number | undefined, baseUrl?: string);
    /** Parse the document, treating an absent or corrupt one as empty. */
    private load;
    /** Replace one provider's entry, under the document lock. */
    private commit;
    /** The overlay cached for one provider, without touching the network. */
    stored(providerId: string): Promise<readonly CatalogModel[]>;
    /** When one provider was last checked against the server. */
    checkedAt(providerId: string): Promise<number | undefined>;
    /**
     * Fetch one provider's catalog, revalidating what is cached.
     *
     * An unserved provider does not throw: the endpoint answers 404 for a
     * provider pi.dev does not publish, which is a fact about that provider, not
     * a failure of the refresh. A transport failure or a 5xx does throw, so a
     * batch can report which providers it could not reach.
     * @param options - `force` bypasses the freshness window; `signal` cancels.
     */
    refresh(providerId: string, options?: {
        force?: boolean;
        signal?: AbortSignal;
    }): Promise<RefreshOutcome>;
}
