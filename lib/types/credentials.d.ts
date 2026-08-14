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
import type { Context } from '@deepseek-ai/cordis';
import z from '@deepseek-ai/schemastery';
import type { CredentialInfo, CredentialRef, ResolvedCredential } from '@deepseek-ai/dsh-credentials';
import { LocalCredentialProvider } from '@deepseek-ai/dsh-credentials-local';
import type { Config as LocalConfig } from '@deepseek-ai/dsh-credentials-local';
import type { AuthType } from '@earendil-works/pi-ai';
import type { LoginSession } from './login.ts';
import type { KeyPort } from './store.ts';
import type { ProviderView, RefreshCatalogResponse, StoredKeyResponse } from './wire.ts';
/** Plugin config: the local provider's own fields plus this plugin's. */
export interface Config extends LocalConfig {
    /** Token document path; defaults to `auth.json` under the harness home. */
    authPath?: string;
    /** Catalog cache path; defaults to `model-catalog.json` under the harness home. */
    catalogPath?: string;
    /** Where the curated model catalog is served; defaults to pi's own host. */
    catalogBaseUrl?: string;
    /**
     * Write the provider's `llm-pi-ai` route on a successful sign-in, so its
     * models reach the picker without a second trip to the Models page.
     * Defaults to true.
     */
    autoRoute?: boolean;
}
/** The account service this plugin's HTTP routes drive. */
export interface ProviderAuthService {
    /** Every installed provider with its offered methods and current credential state. */
    listProviders(): Promise<ProviderView[]>;
    /**
     * The api key this plugin stores for one provider, for the replace wizard's
     * explicit reveal. Resolves to no key for an OAuth account (its token never
     * leaves the Host through this surface) and for an ambient environment value
     * (this plugin never stored it; the shell that exported it is the place to
     * read it).
     */
    storedKey(providerId: string): Promise<StoredKeyResponse>;
    /** Start one login attempt; its steps arrive through the returned session. */
    login(providerId: string, method: AuthType): LoginSession;
    /** Answer a pending prompt of one attempt. */
    answer(loginId: string, requestId: string, value: string): boolean;
    /** Abort one attempt. */
    cancel(loginId: string): boolean;
    /** Look one attempt up for streaming. */
    session(loginId: string): LoginSession | undefined;
    /**
     * Write one provider's `llm-pi-ai` route without signing in again — the
     * repair for a provider that has a credential but no route: a sign-in whose
     * settings write failed, or a key supplied through the environment that
     * nothing ever created a route for.
     */
    route(providerId: string): Promise<void>;
    /**
     * Refresh model catalogs from the curated remote catalog and rewrite the
     * affected routes.
     * @param providerId - one provider, or undefined for every routed provider.
     * @param force - ask the server regardless of the freshness window.
     */
    refreshCatalog(providerId?: string, force?: boolean): Promise<RefreshCatalogResponse>;
    /**
     * Read an OpenAI-compatible `/v1/models` listing and adopt it as one
     * provider's model list.
     * @param baseURL - endpoint to read; defaults to the provider's own.
     * @returns how many models the endpoint reported.
     */
    discoverEndpoint(providerId: string, baseURL?: string): Promise<number>;
    /** Remove a provider's credential, optionally removing its llm route too. */
    logout(providerId: string, removeRoute?: boolean): Promise<void>;
}
declare module '@deepseek-ai/cordis' {
    interface Context {
        providerAuth: ProviderAuthService;
    }
}
/**
 * The credential provider (`ctx.credentials`) and account service
 * (`ctx.providerAuth`) this plugin mounts in place of `dsh-credentials-local`.
 * Both live in one class because the account service needs the store and the
 * store needs the seam's local layers; splitting them would make the two
 * inject each other.
 */
declare class AuthCredentialProvider extends LocalCredentialProvider implements KeyPort {
    static Config: z<Config>;
    /** Token document, with the api-key half bridged back onto the seam. */
    private readonly store;
    /** The curated pi.dev catalog overlaid on this plugin's baked pi-ai data. */
    private readonly catalog;
    /** pi-ai's provider collection: login flows, refresh, and status checks. */
    private readonly models;
    /** Live login attempts. */
    private readonly sessions;
    /** Whether a sign-in writes the provider's `llm-pi-ai` route. */
    private readonly autoRoute;
    constructor(ctx: Context, config: Config);
    /** Set at plugin disposal; a mutation continuing past it must not write. */
    private disposed;
    /** Tail of the serialized mutation queue. */
    private mutations;
    /**
     * Run one mutating operation after every earlier one has finished.
     *
     * All mutations share one queue rather than a per-provider one because they
     * share state broader than a provider: route writes snapshot and batch the
     * whole `llm-pi-ai` section, so two interleaved write-verify-rollback
     * sequences (a sign-in during a page-level catalog update, a sign-out during
     * endpoint discovery) could roll each other's committed work back.
     */
    private serialize;
    /** Every installed pi-ai provider id. */
    private providerIds;
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
    private authContext;
    /** The seam's ordinary layered answer, skipping this class's account layer. */
    private localResolve;
    /** The provider id a reference belongs to, when a signed-in OAuth account owns it. */
    private accountProviderFor;
    /**
     * Resolve one reference, answering from the signed-in account when one owns
     * it. Resolution stays per call, so a token pi-ai refreshes reaches the very
     * next request without a restart.
     */
    resolve(ref: CredentialRef): Promise<ResolvedCredential | undefined>;
    /**
     * Describe one reference without exposing its value. A reference a
     * signed-in account owns reports unwritable — the seam's existing way of
     * saying "a higher source answers this" — so the shipped Models page renders
     * its key field read-only instead of letting a typed key silently lose to
     * the token.
     */
    describe(ref: CredentialRef): Promise<CredentialInfo>;
    /**
     * Store one value in the managed document. Refuses a reference a signed-in
     * account answers: the write would appear to succeed while resolution kept
     * returning the token.
     */
    set(ref: CredentialRef, value: string): Promise<void>;
    /** Remove one reference, refusing one a signed-in account answers for the same reason {@link AuthCredentialProvider.set} does. */
    unset(ref: CredentialRef): Promise<void>;
    /**
     * The `KeyPort` read half: the managed document only.
     *
     * `LocalCredentialProvider` labels that layer `file`. Everything else it can
     * answer with — the process environment, a project or user `.env` — is
     * ambient: this plugin did not store it, so the store must not report it as
     * a credential of its own.
     */
    readStoredKey(ref: CredentialRef): Promise<string | undefined>;
    /** The `KeyPort` write half; `undefined` removes the reference. */
    writeKey(ref: CredentialRef, value: string | undefined): Promise<void>;
    /** The account service published as `ctx.providerAuth`. */
    private service;
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
    private routedModels;
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
    private isDiscoverable;
    /** Project one provider into its accounts-page row. */
    private providerView;
    /**
     * Every installed provider, in catalog order.
     *
     * Rows build concurrently: `providerView` ends in a `checkAuth`, which for
     * an ambient provider can walk a credential chain (AWS profiles, ADC files)
     * at real cost — forty of those in sequence is a page that takes seconds to
     * open, and the surface refetches this on every window focus.
     */
    private listProviders;
    /**
     * The key one provider's replace wizard may reveal: the managed document's
     * entry only, and only while that document — not an OAuth account — is what
     * answers the provider.
     */
    private storedKey;
    /**
     * Start one login attempt. pi-ai owns the handshake; this only supplies the
     * interaction and, on success, makes the provider reachable.
     */
    private login;
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
    private assertRoutableAuth;
    /**
     * Point one provider's llm route at the reference this plugin answers,
     * putting back exactly what was stored before if the adapter cannot serve
     * the result — never deleting a route the user configured themselves.
     * @param credential - the credential just stored, when the caller has it; a
     *   repair from the page reads the stored one instead.
     */
    private routeProvider;
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
    private awaitLiveRoutes;
    /**
     * The endpoint a credential itself decides, when its method derives one.
     * GitHub Copilot is the case: `toAuth` returns the account's base URL beside
     * the token, and the credential seam carries a value, not a URL.
     */
    private credentialBaseUrl;
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
    private commitRoutes;
    /**
     * Plan what one provider's catalog refresh should write, if anything.
     * @returns the report row, plus the commit when a write is actually needed —
     *   absent both for an up-to-date provider (writing a model list PINS the
     *   route off the adapter's catalog, so a no-op write would quietly stop the
     *   route from inheriting future catalog fixes) and for one with nothing
     *   routable.
     */
    private planCatalogUpdate;
    /**
     * Refresh model catalogs and rewrite the routes they describe. "Refresh"
     * means the curated catalog at pi.dev, not the provider's own listing.
     *
     * Fetching runs in parallel; writing is one batched mutation through
     * {@link AuthCredentialProvider.commitRoutes}. Per-provider fetch failures
     * are reported rather than thrown: one unreachable catalog is no reason to
     * leave the other thirty-nine stale.
     */
    private refreshCatalog;
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
    private discoverEndpoint;
    /** Remove a provider's credential, optionally removing its llm routes too. */
    private logout;
}
export default AuthCredentialProvider;
