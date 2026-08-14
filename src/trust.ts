/**
 * Request check for this plugin's routes: loopback same-origin only — the same
 * posture as dsh's own configuration plane, minus its `trustedHosts` escape
 * hatch. Guards against DNS rebinding (via `Host`, the one header rebinding
 * cannot forge) and cross-site requests (via `Sec-Fetch-Site` and `Origin`).
 * Authentication is out of scope, as it is for the plane this mirrors.
 */

import type { IncomingMessage } from 'node:http'

/** Read one header as a single string, ignoring the repeated-header form. */
function header(request: IncomingMessage, name: string): string | undefined {
  const value = request.headers[name]
  return typeof value === 'string' ? value : undefined
}

/** Parse a `Host` authority through WHATWG normalization; http: is a special scheme, so this yields a non-empty hostname or throws. */
function parseAuthority(authority: string): URL | undefined {
  try {
    return new URL(`http://${authority}`)
  } catch {
    return undefined
  }
}

/** Whether a hostname is a dotted IPv4 address in 127/8. */
function isDottedLoopback(hostname: string): boolean {
  const parts = hostname.split('.')
  return parts.length === 4
    && parts[0] === '127'
    && parts.every(part => /^\d{1,3}$/.test(part) && Number(part) <= 255)
}

/**
 * Whether a normalized hostname names the local loopback authority:
 * localhost, IPv6 loopback (brackets retained by WHATWG), IPv4-mapped IPv6
 * loopback (WHATWG serializes `::ffff:127.0.0.1` as `[::ffff:7f00:1]`), or
 * any IPv4 address in 127/8.
 */
function isLoopbackHostname(hostname: string): boolean {
  if (hostname === 'localhost' || hostname === '[::1]') return true
  const mapped = /^\[::ffff:(.+)\]$/i.exec(hostname)?.[1]
  if (mapped !== undefined) {
    return /^7f[0-9a-f]{2}:[0-9a-f]{1,4}$/i.test(mapped) || isDottedLoopback(mapped)
  }
  return isDottedLoopback(hostname)
}

/** Whether a socket peer address is loopback: IPv4 127/8, IPv6 ::1, or IPv4-mapped loopback. */
function isLoopbackAddress(address: string): boolean {
  if (address === '::1') return true
  const mapped = /^::ffff:(.+)$/i.exec(address)?.[1]
  const dotted = mapped ?? address
  return isDottedLoopback(dotted)
}

/** Whether one request may reach this plugin's account routes. */
export function isTrustedAccountRequest(request: IncomingMessage): boolean {
  // The peer address first: `Host` is client-supplied, so on a server bound
  // beyond loopback (0.0.0.0, a custom `trustedHosts` setup) a remote client
  // could simply send `Host: localhost`. The socket's remote address is the
  // one thing about the connection the client cannot choose.
  const peer = request.socket.remoteAddress
  if (peer === undefined || !isLoopbackAddress(peer)) return false
  const host = header(request, 'host')
  if (host === undefined) return false
  const hostUrl = parseAuthority(host)
  if (hostUrl === undefined || !isLoopbackHostname(hostUrl.hostname)) return false
  if (header(request, 'sec-fetch-site') === 'cross-site') return false
  const origin = header(request, 'origin')
  // An absent Origin is fine: the Host fence above already bound the request,
  // and a plain-HTTP browser read attaches no Origin at all. The literal
  // "null" is an opaque origin (sandboxed iframe, file: page) and is refused.
  if (origin === undefined) return true
  try {
    return new URL(origin).host === hostUrl.host
  } catch {
    return false
  }
}
