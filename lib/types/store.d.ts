/**
 * The pi-ai `CredentialStore` this plugin hands to `builtinModels()`. One
 * store, two backings: OAuth credentials have no home in dsh's credential seam
 * and live in this plugin's `$DSH_HOME/auth.json`, while api keys already have
 * one — the seam's managed document, which the shipped Models page also writes
 * — and are delegated there through {@link KeyPort} so one key has one source
 * of truth.
 */
import type { CredentialRef } from '@deepseek-ai/dsh-credentials';
import type { AuthOperationOptions, Credential, CredentialInfo, CredentialStore, OAuthCredential } from '@earendil-works/pi-ai';
/**
 * The credential-seam side of the store: how an api-key value reaches and
 * leaves `$DSH_HOME/.credentials.yaml`. Implemented by the credential provider
 * itself over its own local layers, which keeps this store free of any opinion
 * about environment precedence.
 */
export interface KeyPort {
    /**
     * Value of one reference in the seam's managed document ONLY.
     *
     * Deliberately not the effective layered value: a key exported in the
     * environment or written into a `.env` is not a credential this plugin
     * stores, and reporting it as one would make the page offer to sign out of
     * an account it never held. Ambient values still reach requests through the
     * provider's own discovery, where they belong.
     */
    readStoredKey(ref: CredentialRef): Promise<string | undefined>;
    /** Store one value, or remove it when `value` is undefined. */
    writeKey(ref: CredentialRef, value: string | undefined): Promise<void>;
}
/**
 * Credential storage for pi-ai, split between this plugin's token document and
 * the harness credential seam.
 */
export declare class AuthStore implements CredentialStore {
    private readonly authPath;
    private readonly keys;
    private readonly providerIds;
    /** @param providerIds - every provider id this store may be asked about; `list()` scans it. */
    constructor(authPath: string, keys: KeyPort, providerIds: () => readonly string[]);
    /**
     * Most recent parse and when it was taken. Listing the accounts page asks
     * about every installed provider at once, and each question would otherwise
     * re-read the same document. A window this short cannot outlive a
     * user-visible state change, and every write path reads fresh under the lock.
     */
    private cached;
    /** Parse the document through the short read cache. */
    private load;
    /** Parse the document, treating an absent one as empty. */
    private loadFresh;
    /** Replace the document atomically at owner-only permissions. */
    private save;
    /** Take the cross-process document lock, creating its directory first. */
    private locked;
    /** Assemble one api-key credential from the seam, or undefined when nothing is stored. */
    private readApiKey;
    /** Read one provider's credential from whichever backing owns its kind. */
    private readEntry;
    /** Commit one credential into whichever backing owns its kind. */
    private writeEntry;
    /** Remove one provider from both backings. */
    private deleteEntry;
    /** Read the stored credential, possibly expired; undefined when this plugin stores none. */
    read(providerId: string, _options?: AuthOperationOptions): Promise<Credential | undefined>;
    /** One entry per provider this plugin has a credential for, without exposing secrets. */
    list(_options?: AuthOperationOptions): Promise<readonly CredentialInfo[]>;
    /**
     * The only write path: a serialized read-modify-write under the document
     * lock. `Models.getAuth()` runs OAuth refresh inside this callback, which is
     * what makes a rotated token safe against concurrent requests — across
     * processes, not just within this one.
     * @param fn - receives the current credential and returns the next one, or
     *   undefined to leave it unchanged.
     */
    modify(providerId: string, fn: (current: Credential | undefined) => Promise<Credential | undefined>, _options?: AuthOperationOptions): Promise<Credential | undefined>;
    /** Remove a provider's credential from both backings. */
    delete(providerId: string, _options?: AuthOperationOptions): Promise<void>;
    /**
     * Read one provider's stored OAuth credential without touching the seam.
     * The credential provider needs exactly this to decide whether a reference
     * is answered by a token or by its ordinary local layers.
     */
    readOAuth(providerId: string): Promise<OAuthCredential | undefined>;
    /** Every provider this plugin currently holds an OAuth credential for, in document order. */
    oauthProviders(): Promise<string[]>;
}
