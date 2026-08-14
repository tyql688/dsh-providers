/**
 * Login-flow orchestration: adapts pi-ai's `AuthInteraction` to a surface that
 * is not a terminal. pi-ai owns the handshake and asks only for somewhere to
 * `notify()` progress and somewhere to `prompt()` for a value; this turns the
 * first into a buffered event stream and the second into a pending request the
 * surface answers out of band.
 */

import { randomUUID } from 'node:crypto'
import type {
  AuthEvent,
  AuthInteraction,
  AuthPrompt,
  Credential,
} from '@earendil-works/pi-ai'
import { errorMessage } from './errors.ts'
import type { LoginEvent } from './wire.ts'

/** How long a settled session stays readable before it is forgotten. */
const SETTLED_RETENTION_MS = 60_000

/**
 * How long an unwatched, unsettled attempt is kept alive before it is
 * cancelled.
 *
 * pi-ai's OAuth implementations bind a loopback callback server on the fixed
 * port the provider's registered redirect URI names. A flow whose surface went
 * away would otherwise hold that port until the process exits and fail the
 * user's NEXT sign-in with `EADDRINUSE`. The window only runs while nobody is
 * watching, so a browser that reloads mid-flow re-attaches long before it
 * fires.
 */
const ABANDON_GRACE_MS = 60_000

/**
 * Cap on buffered events per attempt. Only repeatable narration (`progress`,
 * `info`) is trimmed once the cap is hit: structural events (prompts, URLs,
 * the outcome) must survive for a late subscriber to render the flow at all.
 */
const MAX_BUFFERED_EVENTS = 512

/** One prompt pi-ai is waiting on. */
interface PendingPrompt {
  resolve: (value: string) => void
  reject: (error: Error) => void
  /** Removes the abort listener when the prompt settles. */
  detach: () => void
}

/** What a caller needs to drive and observe one login attempt. */
export interface LoginSession {
  /** Identifies this attempt in `answer` and `cancel`. */
  readonly id: string
  /** Provider being signed in to. */
  readonly provider: string
  /** Replay every buffered event, then receive live ones until the flow settles. */
  subscribe(listener: (event: LoginEvent) => void): () => void
  /** Settles when the flow finishes; resolves with the stored credential, rejects on failure or cancellation. */
  readonly result: Promise<Credential>
  /** Whether the flow has settled. */
  settled(): boolean
}

/** Translate one pi-ai notification into its wire event. */
function toWireEvent(event: AuthEvent): LoginEvent {
  switch (event.type) {
    case 'auth_url':
      return {
        type: 'auth_url',
        url: event.url,
        ...event.instructions === undefined ? {} : { instructions: event.instructions },
      }
    case 'device_code':
      return {
        type: 'device_code',
        userCode: event.userCode,
        verificationUri: event.verificationUri,
        ...event.intervalSeconds === undefined ? {} : { intervalSeconds: event.intervalSeconds },
        ...event.expiresInSeconds === undefined ? {} : { expiresInSeconds: event.expiresInSeconds },
      }
    case 'info':
      return {
        type: 'info',
        message: event.message,
        ...event.links === undefined ? {} : {
          links: event.links.map(link => ({
            url: link.url,
            ...link.label === undefined ? {} : { label: link.label },
          })),
        },
      }
    case 'progress':
      return { type: 'progress', message: event.message }
  }
}

/** Translate one pi-ai prompt into its wire event. */
function toWirePrompt(requestId: string, prompt: AuthPrompt): LoginEvent {
  return {
    type: 'prompt',
    requestId,
    kind: prompt.type,
    message: prompt.message,
    ...'placeholder' in prompt && prompt.placeholder !== undefined
      ? { placeholder: prompt.placeholder }
      : {},
    ...prompt.type === 'select'
      ? {
        options: prompt.options.map(option => ({
          id: option.id,
          label: option.label,
          ...option.description === undefined ? {} : { description: option.description },
        })),
      }
      : {},
  }
}

/** One in-flight or recently settled login attempt. */
class Attempt implements LoginSession {
  readonly id = randomUUID()
  private readonly buffer: LoginEvent[] = []
  private readonly listeners = new Set<(event: LoginEvent) => void>()
  private readonly pending = new Map<string, PendingPrompt>()
  private readonly abort = new AbortController()
  private done = false
  /** Armed while nobody is watching an unsettled flow; see {@link ABANDON_GRACE_MS}. */
  private abandonTimer: NodeJS.Timeout | undefined
  readonly result: Promise<Credential>

  /**
   * @param settle - work that must finish before the surface hears success
   *   (writing the provider's llm route). A failure here does not fail the
   *   sign-in — the credential is stored either way — so it is reported as a
   *   step and the flow still completes.
   * @param onSettled - invoked once the flow settles, for retention bookkeeping.
   */
  constructor(
    readonly provider: string,
    run: (interaction: AuthInteraction) => Promise<Credential>,
    settle: (credential: Credential) => Promise<void>,
    private readonly onSettled: (attempt: Attempt) => void,
  ) {
    this.result = run(this.interaction()).then(
      async (credential) => {
        // A cancelled attempt already announced its outcome; a flow that kept
        // running past the abort signal must not resurrect the wizard.
        if (this.done) return credential
        // Before `done`, not after: the surface refetches the moment it hears
        // success, and a route written afterwards would miss that answer — the
        // provider would render as signed in but absent from the model picker
        // until something else triggered a reload.
        try {
          await settle(credential)
        } catch (error) {
          if (!this.done) this.emit({ type: 'info', message: errorMessage(error) })
        }
        // Re-checked after the await: settle writes the provider's route, which
        // can take seconds, and a cancel landing inside that window already
        // announced `error` and settled — a `done` after it would contradict
        // the replayed stream and double the retention bookkeeping.
        if (this.done) return credential
        this.emit({ type: 'done', provider, credential: credential.type })
        this.settleNow()
        return credential
      },
      (error: unknown) => {
        if (!this.done) {
          this.emit({ type: 'error', message: errorMessage(error) })
          this.settleNow()
        }
        throw error
      },
    )
    // The surface consumes failures through the event stream; an unobserved
    // rejection here would take the process down instead.
    this.result.catch(() => {})
    // A flow starts before its stream is opened (the browser needs a second
    // request for that), so the abandon window runs from construction.
    this.armAbandon()
  }

  /** Start the abandon window; a flow nobody watches must not hold its callback port. */
  private armAbandon(): void {
    if (this.done || this.abandonTimer !== undefined) return
    this.abandonTimer = setTimeout(() => {
      this.abandonTimer = undefined
      if (this.done || this.listeners.size > 0) return
      this.cancel('login abandoned')
    }, ABANDON_GRACE_MS)
    this.abandonTimer.unref()
  }

  /** Stop the abandon window; a surface is watching again. */
  private disarmAbandon(): void {
    if (this.abandonTimer === undefined) return
    clearTimeout(this.abandonTimer)
    this.abandonTimer = undefined
  }

  /** Mark the attempt settled and hand it to the registry's retention bookkeeping, once. */
  private settleNow(): void {
    this.finish()
    this.onSettled(this)
  }

  /** Publish one event to every current subscriber and buffer it for late ones. */
  private emit(event: LoginEvent): void {
    if (this.buffer.length >= MAX_BUFFERED_EVENTS) {
      const trimmable = this.buffer.findIndex(kept => kept.type === 'progress' || kept.type === 'info')
      if (trimmable >= 0) this.buffer.splice(trimmable, 1)
    }
    this.buffer.push(event)
    for (const listener of this.listeners) {
      try {
        listener(event)
      } catch {
        // A broken subscriber must not abort a login that is otherwise fine.
      }
    }
  }

  /** Mark the attempt settled and reject anything still waiting on the user. */
  private finish(): void {
    this.done = true
    this.disarmAbandon()
    for (const [requestId, prompt] of this.pending) {
      prompt.detach()
      prompt.reject(new Error('login flow ended'))
      this.buffer.push({ type: 'prompt_done', requestId })
    }
    this.pending.clear()
    this.listeners.clear()
  }

  /** The interaction pi-ai's provider-owned login implementation drives. */
  private interaction(): AuthInteraction {
    return {
      signal: this.abort.signal,
      notify: (event) => {
        this.emit(toWireEvent(event))
      },
      prompt: prompt => new Promise<string>((resolve, reject) => {
        // Also refuse after cancellation: a flow that ignores the abort
        // signal must not surface fresh questions to a surface that gave up.
        if (this.done || this.abort.signal.aborted) {
          reject(new Error('login flow ended'))
          return
        }
        const requestId = randomUUID()
        // A prompt can be resolved out of band — pi-ai races the manual-code
        // prompt against its callback server and aborts the loser — so the
        // per-prompt signal must retract the request from the surface too.
        const onAbort = (): void => {
          this.pending.delete(requestId)
          this.emit({ type: 'prompt_done', requestId })
          reject(new Error('prompt cancelled'))
        }
        prompt.signal?.addEventListener('abort', onAbort, { once: true })
        this.pending.set(requestId, {
          resolve,
          reject,
          detach: () => prompt.signal?.removeEventListener('abort', onAbort),
        })
        this.emit(toWirePrompt(requestId, prompt))
      }),
    }
  }

  subscribe(listener: (event: LoginEvent) => void): () => void {
    for (const event of this.buffer) listener(event)
    if (this.done) return () => {}
    this.listeners.add(listener)
    this.disarmAbandon()
    return () => {
      this.listeners.delete(listener)
      if (this.listeners.size === 0) this.armAbandon()
    }
  }

  settled(): boolean {
    return this.done
  }

  /**
   * Answer one pending prompt.
   * @returns whether a prompt was waiting under that id.
   */
  answer(requestId: string, value: string): boolean {
    const prompt = this.pending.get(requestId)
    if (prompt === undefined) return false
    this.pending.delete(requestId)
    prompt.detach()
    this.emit({ type: 'prompt_done', requestId })
    prompt.resolve(value)
    return true
  }

  /**
   * Abort the whole flow. pi-ai closes its callback server and rejects — but
   * the attempt does not wait for it to: a flow that ignores the abort signal
   * would otherwise stay "live" forever, blocking the map from ever forgetting
   * it. Cancellation settles the attempt here and now; a late resolution from
   * the underlying flow is ignored (see the `done` guards in the constructor).
   */
  cancel(message = 'login cancelled'): void {
    this.abort.abort()
    if (this.done) return
    for (const [requestId, prompt] of this.pending) {
      prompt.detach()
      this.emit({ type: 'prompt_done', requestId })
      prompt.reject(new Error(message))
    }
    this.pending.clear()
    this.emit({ type: 'error', message })
    this.settleNow()
  }
}

/** The live registry of login attempts, keyed by the id the surface holds. */
export class LoginSessions {
  private readonly attempts = new Map<string, Attempt>()
  private readonly timers = new Set<NodeJS.Timeout>()

  /**
   * Start one attempt.
   * @param settle - work awaited before the surface is told the flow succeeded.
   */
  start(
    provider: string,
    run: (interaction: AuthInteraction) => Promise<Credential>,
    settle: (credential: Credential) => Promise<void>,
  ): LoginSession {
    // One provider, one live flow. A second attempt would try to bind the same
    // fixed OAuth callback port and fail with `EADDRINUSE` — which is what a
    // user who simply clicked Sign in again would see.
    for (const live of this.attempts.values()) {
      if (live.provider === provider && !live.settled()) live.cancel()
    }
    const attempt = new Attempt(provider, run, settle, (settled) => {
      // Retained briefly rather than dropped, so a browser that reloads
      // mid-flow still gets the outcome instead of an unknown-session error.
      const timer = setTimeout(() => {
        this.attempts.delete(settled.id)
        this.timers.delete(timer)
      }, SETTLED_RETENTION_MS)
      timer.unref()
      this.timers.add(timer)
    })
    this.attempts.set(attempt.id, attempt)
    return attempt
  }

  /** Look one attempt up; undefined once it has been forgotten. */
  get(loginId: string): LoginSession | undefined {
    return this.attempts.get(loginId)
  }

  /**
   * Answer a pending prompt of one attempt.
   * @returns whether the prompt was found and answered.
   */
  answer(loginId: string, requestId: string, value: string): boolean {
    return this.attempts.get(loginId)?.answer(requestId, value) ?? false
  }

  /**
   * Cancel one attempt.
   * @returns whether an attempt was found.
   */
  cancel(loginId: string): boolean {
    const attempt = this.attempts.get(loginId)
    if (attempt === undefined) return false
    attempt.cancel()
    return true
  }

  /** Cancel every live attempt and drop the retention timers; used at plugin disposal. */
  dispose(): void {
    for (const attempt of this.attempts.values()) attempt.cancel()
    this.attempts.clear()
    for (const timer of this.timers) clearTimeout(timer)
    this.timers.clear()
  }
}
