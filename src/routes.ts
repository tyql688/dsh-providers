/**
 * The account plane's HTTP routes.
 *
 * dsh's API gateway has a closed method table, so an out-of-tree plugin cannot
 * add an `auth.*` domain to it. It can register its own named route on
 * `ctx.webServer`, which is how the client bundles already reach the browser.
 * One prefix route at {@link PROVIDERS_ROUTE_PREFIX} dispatches every operation.
 */

import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Context } from '@deepseek-ai/cordis'
// Type-only: pulls the web carrier's Context merge (ctx.webServer).
import type {} from '@deepseek-ai/dsh-host-webserver'
import { errorMessage } from './errors.ts'
import { isTrustedAccountRequest } from './trust.ts'
import { PROVIDERS_ROUTE_PREFIX } from './wire.ts'
import type {
  AnswerRequest,
  CancelRequest,
  DiscoverEndpointRequest,
  DiscoverEndpointResponse,
  ErrorResponse,
  LoginEvent,
  LoginRequest,
  LoginStartResponse,
  LogoutRequest,
  ProvidersResponse,
  RefreshCatalogRequest,
  RouteRequest,
} from './wire.ts'

/** Largest request body accepted; every payload here is a few short fields. */
const MAX_BODY_BYTES = 64 * 1024

/** A refusal the client caused, answered 400; everything else answers 500. */
class BadRequest extends Error {}

/** SSE keep-alive period, below the common 60s idle timeout of intermediaries. */
const HEARTBEAT_MS = 25_000

/** Answer with one JSON document. */
function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const text = JSON.stringify(body)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(text),
    'cache-control': 'no-store',
  })
  res.end(text)
}

/** Answer with one error document. */
function sendError(res: ServerResponse, status: number, message: string): void {
  sendJson(res, status, { error: message } satisfies ErrorResponse)
}

/** Read and parse a bounded JSON request body. */
async function readJson<T>(req: IncomingMessage): Promise<T> {
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req) {
    const buffer = chunk as Buffer
    size += buffer.length
    if (size > MAX_BODY_BYTES) throw new BadRequest('request body too large')
    chunks.push(buffer)
  }
  const text = Buffer.concat(chunks).toString('utf8')
  if (text.trim().length === 0) throw new BadRequest('request body is empty')
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new BadRequest('request body is not valid JSON')
  }
  if (parsed === null || typeof parsed !== 'object') throw new BadRequest('request body is not a JSON object')
  return parsed as T
}

/** Whether a value is a non-empty string, the only shape every field here takes. */
function isText(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

/** The body's `provider` field, or undefined after answering 400 for a missing one. */
function providerOf(res: ServerResponse, body: { provider?: unknown }): string | undefined {
  if (isText(body.provider)) return body.provider
  sendError(res, 400, 'provider is required')
  return undefined
}

/**
 * Stream one login attempt as Server-Sent Events.
 *
 * The subscription replays the attempt's buffered steps first: the browser
 * starts a flow with `POST login` and opens this stream with a second request
 * (`EventSource` can only GET), so the first steps have usually already
 * happened by the time anyone is listening.
 */
function streamLogin(ctx: Context, res: ServerResponse, loginId: string): void {
  const session = ctx.providerAuth.session(loginId)
  if (session === undefined) {
    sendError(res, 404, `unknown login ${loginId}`)
    return
  }
  res.writeHead(200, {
    'content-type': 'text/event-stream; charset=utf-8',
    'cache-control': 'no-store',
    connection: 'keep-alive',
    // The browser reads this same-origin; no intermediary should buffer it.
    'x-accel-buffering': 'no',
  })
  // `EventSource` does not fire `open` until the status line arrives, and Node
  // holds headers back until the first write; a flow with no buffered events
  // yet would leave the stream stuck in "connecting".
  res.flushHeaders()
  const send = (event: LoginEvent): void => {
    res.write(`data: ${JSON.stringify(event)}\n\n`)
    if (event.type === 'done' || event.type === 'error') res.end()
  }
  const unsubscribe = session.subscribe(send)
  const heartbeat = setInterval(() => res.write(': keep-alive\n\n'), HEARTBEAT_MS)
  heartbeat.unref()
  const stop = (): void => {
    clearInterval(heartbeat)
    unsubscribe()
  }
  res.on('close', stop)
  res.on('finish', stop)
  // A write landing after the peer disconnected emits 'error' on the
  // response; without a listener that would crash the process.
  res.on('error', stop)
  // A stream opened after the attempt settled already got the whole replay
  // from `subscribe`; close it rather than hold a socket open for events that
  // can never arrive.
  if (session.settled()) {
    stop()
    res.end()
  }
}

/** The method each operation answers to; anything else is 405 with `Allow`. */
const OPERATION_METHODS: Record<string, 'GET' | 'POST'> = {
  providers: 'GET',
  events: 'GET',
  'stored-key': 'GET',
  login: 'POST',
  answer: 'POST',
  cancel: 'POST',
  route: 'POST',
  'refresh-catalog': 'POST',
  'discover-endpoint': 'POST',
  logout: 'POST',
}

/**
 * Refuse a field that is present but not the type the contract names. An
 * unparseable optional field must be a 400, not a silent fallback: a client
 * sending `provider: 42` to `refresh-catalog` meant one provider, and
 * degrading that to "refresh all" would do forty writes nobody asked for.
 */
function refuseWrongType(res: ServerResponse, body: object, field: string, type: 'string' | 'boolean'): boolean {
  const value = (body as Record<string, unknown>)[field]
  if (value === undefined || typeof value === type && (type !== 'string' || (value as string).length > 0)) return false
  sendError(res, 400, `${field} must be a non-empty ${type === 'string' ? 'string' : 'boolean'} when present`)
  return true
}

/** Dispatch one request to its operation. */
async function handle(ctx: Context, req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (!isTrustedAccountRequest(req)) {
    sendError(res, 403, 'the account plane is reachable from this machine only')
    return
  }
  const url = new URL(req.url ?? '/', 'http://localhost')
  const operation = url.pathname.slice(PROVIDERS_ROUTE_PREFIX.length).replace(/^\//, '')
  const method = req.method ?? 'GET'
  const expected = OPERATION_METHODS[operation]

  if (expected === undefined) {
    sendError(res, 404, `${url.pathname} is not an account operation`)
    return
  }
  if (method !== expected) {
    res.setHeader('allow', expected)
    sendError(res, 405, `${operation} only answers ${expected}`)
    return
  }

  if (operation === 'providers') {
    sendJson(res, 200, { providers: await ctx.providerAuth.listProviders() } satisfies ProvidersResponse)
    return
  }

  if (operation === 'events') {
    const loginId = url.searchParams.get('loginId')
    if (loginId === null) {
      sendError(res, 400, 'loginId is required')
      return
    }
    streamLogin(ctx, res, loginId)
    return
  }

  // The replace wizard's explicit reveal. No `no-store` exception needed: every
  // reply here already carries `cache-control: no-store`, which a secret read
  // must. Scope stays the managed document's api key — see `storedKey`.
  if (operation === 'stored-key') {
    const provider = url.searchParams.get('provider')
    if (provider === null) {
      sendError(res, 400, 'provider is required')
      return
    }
    sendJson(res, 200, await ctx.providerAuth.storedKey(provider))
    return
  }

  if (operation === 'login') {
    const body = await readJson<LoginRequest>(req)
    const provider = providerOf(res, body)
    if (provider === undefined) return
    if (body.method !== 'oauth' && body.method !== 'api_key') {
      sendError(res, 400, 'method must be "oauth" or "api_key"')
      return
    }
    const session = ctx.providerAuth.login(provider, body.method)
    sendJson(res, 200, { loginId: session.id } satisfies LoginStartResponse)
    return
  }

  if (operation === 'answer') {
    const body = await readJson<AnswerRequest>(req)
    if (!isText(body.loginId) || !isText(body.requestId)) {
      sendError(res, 400, 'loginId and requestId are required')
      return
    }
    if (typeof body.value !== 'string') {
      sendError(res, 400, 'value must be a string')
      return
    }
    const answered = ctx.providerAuth.answer(body.loginId, body.requestId, body.value)
    if (!answered) {
      sendError(res, 409, 'that prompt is no longer waiting for an answer')
      return
    }
    sendJson(res, 200, {})
    return
  }

  if (operation === 'cancel') {
    const body = await readJson<CancelRequest>(req)
    if (!isText(body.loginId)) {
      sendError(res, 400, 'loginId is required')
      return
    }
    if (!ctx.providerAuth.cancel(body.loginId)) {
      sendError(res, 404, `unknown login ${body.loginId}`)
      return
    }
    sendJson(res, 200, {})
    return
  }

  if (operation === 'route') {
    const body = await readJson<RouteRequest>(req)
    const provider = providerOf(res, body)
    if (provider === undefined) return
    await ctx.providerAuth.route(provider)
    sendJson(res, 200, {})
    return
  }

  if (operation === 'refresh-catalog') {
    const body = await readJson<RefreshCatalogRequest>(req)
    if (refuseWrongType(res, body, 'provider', 'string') || refuseWrongType(res, body, 'force', 'boolean')) return
    // An absent provider is the page-level action, not a missing field: it
    // updates every routed provider at once.
    const result = await ctx.providerAuth.refreshCatalog(body.provider, body.force === true)
    sendJson(res, 200, result)
    return
  }

  if (operation === 'discover-endpoint') {
    const body = await readJson<DiscoverEndpointRequest>(req)
    const provider = providerOf(res, body)
    if (provider === undefined) return
    if (refuseWrongType(res, body, 'baseURL', 'string')) return
    const count = await ctx.providerAuth.discoverEndpoint(provider, body.baseURL)
    sendJson(res, 200, { count } satisfies DiscoverEndpointResponse)
    return
  }

  const body = await readJson<LogoutRequest>(req)
  const provider = providerOf(res, body)
  if (provider === undefined) return
  if (refuseWrongType(res, body, 'unroute', 'boolean')) return
  await ctx.providerAuth.logout(provider, body.unroute === true)
  sendJson(res, 200, {})
}

export const name = 'providers-routes'
export const inject = ['providerAuth']

/**
 * Mount the account routes on the web server, once one exists.
 *
 * `webServer` is an optional dependency, reached through `ctx.inject` rather
 * than declared on the row: dsh's boot audit fails loudly on a row that never
 * activates, so declaring it would turn every headless profile into a boot
 * failure. The scoped fiber also unmounts the routes with the server.
 */
export function apply(ctx: Context): void {
  ctx.inject(['webServer'], (webCtx: Context) => {
    webCtx.effect(
      () => webCtx.webServer.register({
        kind: 'prefix',
        path: PROVIDERS_ROUTE_PREFIX,
        handler: (req, res) => handle(ctx, req, res).catch((error: unknown) => {
          ctx.logger.warn('dsh-providers: account route failed')
          ctx.logger.warn(error)
          if (res.headersSent) {
            res.end()
            return
          }
          // 400 only for refusals the client caused; a Host-side failure (no
          // settings mounted, pi.dev unreachable) is not the client's fault.
          sendError(res, error instanceof BadRequest ? 400 : 500, errorMessage(error))
        }),
      }),
      'dsh-providers: account routes',
    )
  })
}
