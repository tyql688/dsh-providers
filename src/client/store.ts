/**
 * The accounts page store: one snapshot of the Host's account state, plus the
 * login wizard's reducer. The Host stays the single source of truth — every
 * mutation calls this plugin's routes and the page re-renders from the reply,
 * never from an optimistic local edit. A bare observable rather than a React
 * construct, because the client stack binds hooks at the render boundary.
 */

import { errorMessage } from '../errors.ts'
import { PROVIDERS_ROUTE_PREFIX } from '../wire.ts'
import type {
  AuthLink,
  AuthTypeName,
  DiscoverEndpointResponse,
  LoginEvent,
  LoginStartResponse,
  ProviderView,
  ProvidersResponse,
  RefreshCatalogResponse,
  StoredKeyResponse,
} from '../wire.ts'

/** Value of {@link AccountsState.updating} while the page-level update runs. */
export const ALL_PROVIDERS = '*'

/** A provider may emit repeated informational steps during one flow. */
const MAX_INFO_MESSAGES = 64

/** One informational step, with whatever links came with it. */
export interface LoginInfo {
  /**
   * Render key. The index cannot serve: the log is trimmed from the front
   * once full, which would renumber every surviving entry.
   */
  id: number
  message: string
  links: readonly AuthLink[]
}

/** Source of {@link LoginInfo.id}; the wizard is one flow at a time. */
let nextInfoId = 0

/** The question the wizard is currently asking — the `prompt` wire event, minus its tag. */
export type LoginPrompt = Omit<Extract<LoginEvent, { type: 'prompt' }>, 'type'>

/**
 * The login wizard's state: one slot per step kind, because a flow can show
 * several at once — an authorization URL stays on screen while the
 * manual-code field waits beneath it.
 */
export interface LoginFlowState {
  provider: string
  method: AuthTypeName
  /** Absent until `POST login` answers; the stream cannot open before it. */
  loginId: string | null
  authUrl: string | null
  instructions: string | null
  deviceCode: { userCode: string; verificationUri: string } | null
  progress: string | null
  infos: LoginInfo[]
  prompt: LoginPrompt | null
  /** True while an answer is in flight, so the field cannot be submitted twice. */
  answering: boolean
  /**
   * The stored key the wizard revealed, api-key flows only. Cleared on `done`:
   * a successful replace stores a new key, so the revealed one turns stale.
   */
  storedKey: string | null
  /** True while the stored-key read is in flight. */
  peekingKey: boolean
  /**
   * The first prompt this flow ever showed. The stored key may prefill only
   * that one: a provider that asks a second secret (an account id beside the
   * key) must get an empty field, not the API key stuffed into it.
   */
  prefillPromptId: string | null
  done: boolean
  error: string | null
}

/** The page snapshot. */
export interface AccountsState {
  status: 'idle' | 'loading' | 'ready' | 'error'
  /**
   * Most recent failure the page should show: a load that found no data, or
   * a mutation the Host refused. Rendered whenever non-null; cleared by the
   * next successful load.
   */
  error: string | null
  providers: readonly ProviderView[]
  /** Provider whose card is open; one at a time, like the shipped Models page. */
  selected: string | null
  /** Substring the provider list is filtered by. */
  filter: string
  /** The open login wizard, or null while none is running. */
  login: LoginFlowState | null
  /** Provider whose sign-out is in flight. */
  loggingOut: string | null
  /** Provider whose Models-page wiring is in flight. */
  routing: string | null
  /**
   * Provider whose model list is being updated, or {@link ALL_PROVIDERS} while
   * the page-level catalog update runs.
   */
  updating: string | null
  /** Outcome of the last catalog update, shown until the next one starts. */
  catalogNotice: { tone: 'ok' | 'warn'; text: string } | null
  /** Provider whose full model list is expanded rather than previewed. */
  expandedModels: string | null
  /** Provider whose endpoint-discovery field is open, with its current value. */
  discovering: { provider: string; baseURL: string } | null
  /** Provider whose sign-out is awaiting confirmation. */
  confirmingLogout: string | null
  /** Provider whose CLI-login import is awaiting confirmation. */
  confirmingImport: string | null
  /** Provider whose CLI-login import is in flight. */
  importing: string | null
}

const INITIAL: AccountsState = {
  status: 'idle',
  error: null,
  providers: [],
  selected: null,
  filter: '',
  login: null,
  loggingOut: null,
  routing: null,
  updating: null,
  catalogNotice: null,
  expandedModels: null,
  discovering: null,
  confirmingLogout: null,
  confirmingImport: null,
  importing: null,
}

/** Whether a provider can serve a request right now. */
export function providerUsable(view: ProviderView): boolean {
  return view.configured && view.error === undefined
}

/** Fold one login event into the wizard state. */
function reduceLogin(previous: LoginFlowState, event: LoginEvent): LoginFlowState {
  switch (event.type) {
    case 'auth_url':
      return { ...previous, authUrl: event.url, instructions: event.instructions ?? null }
    case 'device_code':
      return {
        ...previous,
        deviceCode: { userCode: event.userCode, verificationUri: event.verificationUri },
      }
    case 'info':
      return {
        ...previous,
        infos: [...previous.infos, {
          id: nextInfoId++,
          message: event.message,
          links: event.links ?? [],
        }].slice(-MAX_INFO_MESSAGES),
      }
    case 'progress':
      return { ...previous, progress: event.message }
    case 'prompt': {
      const { type: _type, ...prompt } = event
      return { ...previous, answering: false, prompt, prefillPromptId: previous.prefillPromptId ?? prompt.requestId }
    }
    case 'prompt_done':
      // The flow resolved this question itself (pi-ai races the manual-code
      // field against its own callback server), so the field must disappear
      // rather than wait for an answer nothing is listening for.
      return previous.prompt?.requestId === event.requestId
        ? { ...previous, prompt: null, answering: false }
        : previous
    case 'done':
      return { ...previous, done: true, prompt: null, answering: false, progress: null, storedKey: null }
    case 'error':
      return { ...previous, error: event.message, prompt: null, answering: false, progress: null }
  }
}

/** The accounts page controller and its snapshot source. */
export class AccountsStore {
  private state: AccountsState = INITIAL
  private readonly listeners = new Set<() => void>()
  /** The open event stream, closed when the wizard closes or the flow settles. */
  private stream: EventSource | undefined
  /** Increments per load so a slow reply cannot publish over a newer one. */
  private generation = 0
  /** Increments per login attempt so a slow start cannot drive a newer wizard. */
  private loginGeneration = 0

  /** @param origin - where the account plane is served; the page's own origin. */
  constructor(private readonly origin: string = '') {}

  getSnapshot(): AccountsState {
    return this.state
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  /** Publish the next state; the snapshot identity moves only when the state does. */
  private set(next: Partial<AccountsState>): void {
    this.state = { ...this.state, ...next }
    for (const listener of this.listeners) listener()
  }

  /** Update the wizard through its reducer, if one is open. */
  private reduce(event: LoginEvent): void {
    const login = this.state.login
    if (login === null) return
    this.set({ login: reduceLogin(login, event) })
  }

  /** Call one account route, surfacing the Host's own message on refusal. */
  private async call<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.origin}${PROVIDERS_ROUTE_PREFIX}/${path}`, {
      ...init,
      headers: { 'content-type': 'application/json', ...init?.headers },
    })
    const text = await response.text()
    let parsed: unknown = {}
    try {
      parsed = text.length > 0 ? JSON.parse(text) : {}
    } catch {
      // A non-JSON body (a proxy's interception page) must surface as the
      // HTTP failure it is, not as a bare JSON SyntaxError.
      throw new Error(`${response.status} ${response.statusText}`)
    }
    if (!response.ok) {
      throw new Error((parsed as { error?: string }).error ?? `${response.status} ${response.statusText}`)
    }
    return parsed as T
  }

  /**
   * Load every provider row. A failed refresh of an already loaded page keeps
   * the page and shows the error beside it, rather than replacing loaded data
   * with a blank error screen.
   */
  async load(): Promise<void> {
    const generation = this.generation += 1
    if (this.state.status === 'idle') this.set({ status: 'loading' })
    try {
      const { providers } = await this.call<ProvidersResponse>('providers')
      if (generation !== this.generation) return
      this.set({ status: 'ready', error: null, providers })
    } catch (error) {
      if (generation !== this.generation) return
      this.set({
        ...this.state.status === 'ready' ? {} : { status: 'error' },
        error: errorMessage(error),
      })
    }
  }

  /** Open one provider's card, or close it when it is the one already open. */
  select(providerId: string): void {
    this.set({ selected: this.state.selected === providerId ? null : providerId })
  }

  /** Filter the provider list. */
  filter(value: string): void {
    this.set({ filter: value })
  }

  /** The open wizard, when login attempt `generation` still owns it. */
  private currentLogin(providerId: string, generation: number): LoginFlowState | null {
    const login = this.state.login
    if (login === null || login.provider !== providerId || generation !== this.loginGeneration) return null
    return login
  }

  /** Open the wizard and start one login flow. */
  async beginLogin(providerId: string, method: AuthTypeName): Promise<void> {
    const generation = this.loginGeneration += 1
    this.closeStream()
    this.set({
      login: {
        provider: providerId,
        method,
        loginId: null,
        authUrl: null,
        instructions: null,
        deviceCode: null,
        progress: null,
        infos: [],
        prompt: null,
        answering: false,
        storedKey: null,
        peekingKey: false,
        prefillPromptId: null,
        done: false,
        error: null,
      },
    })
    try {
      const { loginId } = await this.call<LoginStartResponse>('login', {
        method: 'POST',
        body: JSON.stringify({ provider: providerId, method }),
      })
      const started = this.currentLogin(providerId, generation)
      if (started === null) return
      this.set({ login: { ...started, loginId } })
      this.openStream(loginId)
    } catch (error) {
      if (this.currentLogin(providerId, generation) === null) return
      this.reduce({ type: 'error', message: errorMessage(error) })
    }
  }

  /** Attach to one flow's event stream, replacing any stream still open. */
  private openStream(loginId: string): void {
    this.closeStream()
    const stream = new EventSource(`${this.origin}${PROVIDERS_ROUTE_PREFIX}/events?loginId=${encodeURIComponent(loginId)}`)
    this.stream = stream
    stream.addEventListener('message', (message: MessageEvent<string>) => {
      const event = JSON.parse(message.data) as LoginEvent
      this.reduce(event)
      if (event.type === 'done') {
        this.closeStream()
        void this.load()
        return
      }
      if (event.type === 'error') this.closeStream()
    })
    stream.addEventListener('error', () => {
      // The Host closes the stream on `done`/`error`, which the browser also
      // reports as an error; only an unsettled flow has actually lost its stream.
      if (this.state.login?.done === true || this.state.login?.error !== null) return
      this.closeStream()
      this.reduce({ type: 'error', message: 'the login stream closed unexpectedly' })
    })
  }

  /** Close the event stream if one is open. */
  private closeStream(): void {
    this.stream?.close()
    this.stream = undefined
  }

  /** Answer the wizard's current question. */
  async answer(value: string): Promise<void> {
    const login = this.state.login
    if (login === null || login.prompt === null || login.loginId === null) return
    const { requestId } = login.prompt
    this.set({ login: { ...login, answering: true } })
    try {
      await this.call('answer', {
        method: 'POST',
        body: JSON.stringify({ loginId: login.loginId, requestId, value }),
      })
    } catch (error) {
      // A refused answer is a step failure, not a flow failure: the Host says
      // why (usually that the flow already resolved this question itself).
      this.reduce({ type: 'info', message: errorMessage(error) })
      this.reduce({ type: 'prompt_done', requestId })
    }
  }

  /** Abort the flow and close the wizard. */
  async closeLogin(): Promise<void> {
    const login = this.state.login
    this.closeStream()
    this.set({ login: null })
    if (login === null || login.loginId === null || login.done) return
    try {
      await this.call('cancel', { method: 'POST', body: JSON.stringify({ loginId: login.loginId }) })
    } catch {
      // The flow is already unreachable from here; the Host reaps it either way.
    }
  }

  /**
   * Reveal the key currently stored for the wizard's provider. An explicit
   * user action, api-key flows only; the Host answers nothing for a provider
   * whose credential is an OAuth account or an ambient environment value.
   */
  async peekStoredKey(): Promise<void> {
    const login = this.state.login
    if (login === null || login.method !== 'api_key' || login.peekingKey || login.storedKey !== null) return
    const generation = this.loginGeneration
    this.set({ login: { ...login, peekingKey: true } })
    try {
      const { key } = await this.call<StoredKeyResponse>(
        `stored-key?provider=${encodeURIComponent(login.provider)}`,
      )
      const current = this.currentLogin(login.provider, generation)
      // A key that came back absent leaves the button in place: the page's row
      // said api_key, so that only happens when the credential left in between,
      // and an honest "reveal again" beats a frozen empty answer.
      if (current !== null) this.set({ login: { ...current, peekingKey: false, storedKey: key ?? null } })
    } catch (error) {
      const current = this.currentLogin(login.provider, generation)
      if (current !== null) this.set({ login: { ...current, peekingKey: false } })
      this.reduce({ type: 'info', message: errorMessage(error) })
    }
  }

  /** Clear a busy marker, unless a newer operation has claimed it since. */
  private release(field: 'updating' | 'routing' | 'loggingOut', token: string): void {
    if (this.state[field] === token) this.set({ [field]: null })
  }

  /**
   * Refresh model catalogs from the curated remote catalog. The button means
   * "update now", so the request bypasses the Host's freshness window.
   * @param providerId - one provider, or undefined for every routed one.
   * @param summarize - renders the reply; the copy lives with the section.
   */
  async updateCatalog(
    providerId: string | undefined,
    summarize: (result: RefreshCatalogResponse) => { tone: 'ok' | 'warn'; text: string },
  ): Promise<void> {
    const token = providerId ?? ALL_PROVIDERS
    this.set({ updating: token, catalogNotice: null })
    try {
      const result = await this.call<RefreshCatalogResponse>('refresh-catalog', {
        method: 'POST',
        body: JSON.stringify({ force: true, ...providerId === undefined ? {} : { provider: providerId } }),
      })
      await this.load()
      if (this.state.updating === token) this.set({ catalogNotice: summarize(result) })
    } catch (error) {
      if (this.state.updating === token) this.set({ catalogNotice: { tone: 'warn', text: errorMessage(error) } })
    } finally {
      this.release('updating', token)
    }
  }

  /** Open or close the endpoint-discovery field for one provider. */
  askDiscover(providerId: string | null, baseURL = ''): void {
    this.set({ discovering: providerId === null ? null : { provider: providerId, baseURL } })
  }

  /** Edit the endpoint the discovery field will interrogate. */
  editDiscoverUrl(baseURL: string): void {
    const discovering = this.state.discovering
    if (discovering === null) return
    this.set({ discovering: { ...discovering, baseURL } })
  }

  /** Read an OpenAI-compatible listing and adopt it as this provider's model list. */
  async discoverEndpoint(
    providerId: string,
    baseURL: string,
    summarize: (count: number) => string,
  ): Promise<void> {
    this.set({ updating: providerId, catalogNotice: null })
    try {
      const { count } = await this.call<DiscoverEndpointResponse>('discover-endpoint', {
        method: 'POST',
        body: JSON.stringify({ provider: providerId, ...baseURL.trim().length === 0 ? {} : { baseURL } }),
      })
      await this.load()
      if (this.state.updating === providerId) {
        this.set({ discovering: null, catalogNotice: { tone: 'ok', text: summarize(count) } })
      }
    } catch (error) {
      if (this.state.updating === providerId) {
        this.set({ catalogNotice: { tone: 'warn', text: errorMessage(error) } })
      }
    } finally {
      this.release('updating', providerId)
    }
  }

  /** Show a provider's whole model list rather than its preview. */
  expandModels(providerId: string | null): void {
    this.set({ expandedModels: providerId })
  }

  /** Ask for confirmation before signing out; sign-out is not undoable. */
  askLogout(providerId: string | null): void {
    this.set({ confirmingLogout: providerId })
  }

  /** Wire one provider into the Models page without signing in again. */
  async route(providerId: string): Promise<void> {
    this.set({ routing: providerId })
    try {
      await this.call('route', { method: 'POST', body: JSON.stringify({ provider: providerId }) })
      await this.load()
    } catch (error) {
      this.set({ error: errorMessage(error) })
    } finally {
      this.release('routing', providerId)
    }
  }

  /** Remove one provider's credential. */
  async logout(providerId: string, removeRoute: boolean): Promise<void> {
    this.set({ loggingOut: providerId, confirmingLogout: null })
    try {
      await this.call('logout', {
        method: 'POST',
        body: JSON.stringify({ provider: providerId, unroute: removeRoute }),
      })
      await this.load()
    } catch (error) {
      this.set({ error: errorMessage(error) })
    } finally {
      this.release('loggingOut', providerId)
    }
  }

  /** Ask for confirmation before importing a CLI login; the first refresh may sign the CLI out. */
  askImport(providerId: string | null): void {
    this.set({ confirmingImport: providerId })
  }

  /** Adopt a detected local CLI login for one provider and reload the page. */
  async importCredential(providerId: string): Promise<void> {
    this.set({ importing: providerId, confirmingImport: null })
    try {
      await this.call('import-credential', {
        method: 'POST',
        body: JSON.stringify({ provider: providerId }),
      })
      await this.load()
    } catch (error) {
      this.set({ error: errorMessage(error) })
    } finally {
      if (this.state.importing === providerId) this.set({ importing: null })
    }
  }

  /** Close any open stream; called when the plugin unloads. */
  dispose(): void {
    this.closeStream()
    this.listeners.clear()
  }
}
