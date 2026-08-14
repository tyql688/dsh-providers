/**
 * Login-flow orchestration: adapts pi-ai's `AuthInteraction` to a surface that
 * is not a terminal. pi-ai owns the handshake and asks only for somewhere to
 * `notify()` progress and somewhere to `prompt()` for a value; this turns the
 * first into a buffered event stream and the second into a pending request the
 * surface answers out of band.
 */
import type { AuthInteraction, Credential } from '@earendil-works/pi-ai';
import type { LoginEvent } from './wire.ts';
/** What a caller needs to drive and observe one login attempt. */
export interface LoginSession {
    /** Identifies this attempt in `answer` and `cancel`. */
    readonly id: string;
    /** Provider being signed in to. */
    readonly provider: string;
    /** Replay every buffered event, then receive live ones until the flow settles. */
    subscribe(listener: (event: LoginEvent) => void): () => void;
    /** Settles when the flow finishes; resolves with the stored credential, rejects on failure or cancellation. */
    readonly result: Promise<Credential>;
    /** Whether the flow has settled. */
    settled(): boolean;
}
/** The live registry of login attempts, keyed by the id the surface holds. */
export declare class LoginSessions {
    private readonly attempts;
    private readonly timers;
    /**
     * Start one attempt.
     * @param settle - work awaited before the surface is told the flow succeeded.
     */
    start(provider: string, run: (interaction: AuthInteraction) => Promise<Credential>, settle: (credential: Credential) => Promise<void>): LoginSession;
    /** Look one attempt up; undefined once it has been forgotten. */
    get(loginId: string): LoginSession | undefined;
    /**
     * Answer a pending prompt of one attempt.
     * @returns whether the prompt was found and answered.
     */
    answer(loginId: string, requestId: string, value: string): boolean;
    /**
     * Cancel one attempt.
     * @returns whether an attempt was found.
     */
    cancel(loginId: string): boolean;
    /** Cancel every live attempt and drop the retention timers; used at plugin disposal. */
    dispose(): void;
}
