/**
 * The accounts page store: one snapshot of the Host's account state, plus the
 * login wizard's reducer. The Host stays the single source of truth — every
 * mutation calls this plugin's routes and the page re-renders from the reply,
 * never from an optimistic local edit. A bare observable rather than a React
 * construct, because the client stack binds hooks at the render boundary.
 */
import type { AuthLink, AuthTypeName, LoginEvent, ProviderView, RefreshCatalogResponse } from '../wire.ts';
/** Value of {@link AccountsState.updating} while the page-level update runs. */
export declare const ALL_PROVIDERS = "*";
/** One informational step, with whatever links came with it. */
export interface LoginInfo {
    /**
     * Render key. The index cannot serve: the log is trimmed from the front
     * once full, which would renumber every surviving entry.
     */
    id: number;
    message: string;
    links: readonly AuthLink[];
}
/** The question the wizard is currently asking — the `prompt` wire event, minus its tag. */
export type LoginPrompt = Omit<Extract<LoginEvent, {
    type: 'prompt';
}>, 'type'>;
/**
 * The login wizard's state: one slot per step kind, because a flow can show
 * several at once — an authorization URL stays on screen while the
 * manual-code field waits beneath it.
 */
export interface LoginFlowState {
    provider: string;
    method: AuthTypeName;
    /** Absent until `POST login` answers; the stream cannot open before it. */
    loginId: string | null;
    authUrl: string | null;
    instructions: string | null;
    deviceCode: {
        userCode: string;
        verificationUri: string;
    } | null;
    progress: string | null;
    infos: LoginInfo[];
    prompt: LoginPrompt | null;
    /** True while an answer is in flight, so the field cannot be submitted twice. */
    answering: boolean;
    /**
     * The stored key the wizard revealed, api-key flows only. Cleared on `done`:
     * a successful replace stores a new key, so the revealed one turns stale.
     */
    storedKey: string | null;
    /** True while the stored-key read is in flight. */
    peekingKey: boolean;
    /**
     * The first prompt this flow ever showed. The stored key may prefill only
     * that one: a provider that asks a second secret (an account id beside the
     * key) must get an empty field, not the API key stuffed into it.
     */
    prefillPromptId: string | null;
    done: boolean;
    error: string | null;
}
/** The page snapshot. */
export interface AccountsState {
    status: 'idle' | 'loading' | 'ready' | 'error';
    /**
     * Most recent failure the page should show: a load that found no data, or
     * a mutation the Host refused. Rendered whenever non-null; cleared by the
     * next successful load.
     */
    error: string | null;
    providers: readonly ProviderView[];
    /** Provider whose card is open; one at a time, like the shipped Models page. */
    selected: string | null;
    /** Substring the provider list is filtered by. */
    filter: string;
    /** The open login wizard, or null while none is running. */
    login: LoginFlowState | null;
    /** Provider whose sign-out is in flight. */
    loggingOut: string | null;
    /** Provider whose Models-page wiring is in flight. */
    routing: string | null;
    /**
     * Provider whose model list is being updated, or {@link ALL_PROVIDERS} while
     * the page-level catalog update runs.
     */
    updating: string | null;
    /** Outcome of the last catalog update, shown until the next one starts. */
    catalogNotice: {
        tone: 'ok' | 'warn';
        text: string;
    } | null;
    /** Provider whose full model list is expanded rather than previewed. */
    expandedModels: string | null;
    /** Provider whose endpoint-discovery field is open, with its current value. */
    discovering: {
        provider: string;
        baseURL: string;
    } | null;
    /** Provider whose sign-out is awaiting confirmation. */
    confirmingLogout: string | null;
    /** Provider whose CLI-login import is awaiting confirmation. */
    confirmingImport: string | null;
    /** Provider whose CLI-login import is in flight. */
    importing: string | null;
}
/** Whether a provider can serve a request right now. */
export declare function providerUsable(view: ProviderView): boolean;
/** The accounts page controller and its snapshot source. */
export declare class AccountsStore {
    private readonly origin;
    private state;
    private readonly listeners;
    /** The open event stream, closed when the wizard closes or the flow settles. */
    private stream;
    /** Increments per load so a slow reply cannot publish over a newer one. */
    private generation;
    /** Increments per login attempt so a slow start cannot drive a newer wizard. */
    private loginGeneration;
    /** @param origin - where the account plane is served; the page's own origin. */
    constructor(origin?: string);
    getSnapshot(): AccountsState;
    subscribe(listener: () => void): () => void;
    /** Publish the next state; the snapshot identity moves only when the state does. */
    private set;
    /** Update the wizard through its reducer, if one is open. */
    private reduce;
    /** Call one account route, surfacing the Host's own message on refusal. */
    private call;
    /**
     * Load every provider row. A failed refresh of an already loaded page keeps
     * the page and shows the error beside it, rather than replacing loaded data
     * with a blank error screen.
     */
    load(): Promise<void>;
    /** Open one provider's card, or close it when it is the one already open. */
    select(providerId: string): void;
    /** Filter the provider list. */
    filter(value: string): void;
    /** The open wizard, when login attempt `generation` still owns it. */
    private currentLogin;
    /** Open the wizard and start one login flow. */
    beginLogin(providerId: string, method: AuthTypeName): Promise<void>;
    /** Attach to one flow's event stream, replacing any stream still open. */
    private openStream;
    /** Close the event stream if one is open. */
    private closeStream;
    /** Answer the wizard's current question. */
    answer(value: string): Promise<void>;
    /** Abort the flow and close the wizard. */
    closeLogin(): Promise<void>;
    /**
     * Reveal the key currently stored for the wizard's provider. An explicit
     * user action, api-key flows only; the Host answers nothing for a provider
     * whose credential is an OAuth account or an ambient environment value.
     */
    peekStoredKey(): Promise<void>;
    /** Clear a busy marker, unless a newer operation has claimed it since. */
    private release;
    /**
     * Refresh model catalogs from the curated remote catalog. The button means
     * "update now", so the request bypasses the Host's freshness window.
     * @param providerId - one provider, or undefined for every routed one.
     * @param summarize - renders the reply; the copy lives with the section.
     */
    updateCatalog(providerId: string | undefined, summarize: (result: RefreshCatalogResponse) => {
        tone: 'ok' | 'warn';
        text: string;
    }): Promise<void>;
    /** Open or close the endpoint-discovery field for one provider. */
    askDiscover(providerId: string | null, baseURL?: string): void;
    /** Edit the endpoint the discovery field will interrogate. */
    editDiscoverUrl(baseURL: string): void;
    /** Read an OpenAI-compatible listing and adopt it as this provider's model list. */
    discoverEndpoint(providerId: string, baseURL: string, summarize: (count: number) => string): Promise<void>;
    /** Show a provider's whole model list rather than its preview. */
    expandModels(providerId: string | null): void;
    /** Ask for confirmation before signing out; sign-out is not undoable. */
    askLogout(providerId: string | null): void;
    /** Wire one provider into the Models page without signing in again. */
    route(providerId: string): Promise<void>;
    /** Remove one provider's credential. */
    logout(providerId: string, removeRoute: boolean): Promise<void>;
    /** Ask for confirmation before importing a CLI login; the first refresh may sign the CLI out. */
    askImport(providerId: string | null): void;
    /** Adopt a detected local CLI login for one provider and reload the page. */
    importCredential(providerId: string): Promise<void>;
    /** Close any open stream; called when the plugin unloads. */
    dispose(): void;
}
