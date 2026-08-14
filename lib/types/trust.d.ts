/**
 * Request check for this plugin's routes: loopback same-origin only — the same
 * posture as dsh's own configuration plane, minus its `trustedHosts` escape
 * hatch. Guards against DNS rebinding (via `Host`, the one header rebinding
 * cannot forge) and cross-site requests (via `Sec-Fetch-Site` and `Origin`).
 * Authentication is out of scope, as it is for the plane this mirrors.
 */
import type { IncomingMessage } from 'node:http';
/** Whether one request may reach this plugin's account routes. */
export declare function isTrustedAccountRequest(request: IncomingMessage): boolean;
