import { n as errorMessage, t as BadRequest } from "./errors-J0NwkhsH.js";
import { t as PROVIDERS_ROUTE_PREFIX } from "./wire-ag4RQFWe.js";

//#region src/trust.ts
/** Read one header as a single string, ignoring the repeated-header form. */
function header(request, name$1) {
	const value = request.headers[name$1];
	return typeof value === "string" ? value : void 0;
}
/** Parse a `Host` authority through WHATWG normalization; http: is a special scheme, so this yields a non-empty hostname or throws. */
function parseAuthority(authority) {
	try {
		return new URL(`http://${authority}`);
	} catch {
		return;
	}
}
/** Whether a hostname is a dotted IPv4 address in 127/8. */
function isDottedLoopback(hostname) {
	const parts = hostname.split(".");
	return parts.length === 4 && parts[0] === "127" && parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255);
}
/**
* Whether a normalized hostname names the local loopback authority:
* localhost, IPv6 loopback (brackets retained by WHATWG), IPv4-mapped IPv6
* loopback (WHATWG serializes `::ffff:127.0.0.1` as `[::ffff:7f00:1]`), or
* any IPv4 address in 127/8.
*/
function isLoopbackHostname(hostname) {
	if (hostname === "localhost" || hostname === "[::1]") return true;
	const mapped = /^\[::ffff:(.+)\]$/i.exec(hostname)?.[1];
	if (mapped !== void 0) return /^7f[0-9a-f]{2}:[0-9a-f]{1,4}$/i.test(mapped) || isDottedLoopback(mapped);
	return isDottedLoopback(hostname);
}
/** Whether a socket peer address is loopback: IPv4 127/8, IPv6 ::1, or IPv4-mapped loopback. */
function isLoopbackAddress(address) {
	if (address === "::1") return true;
	return isDottedLoopback(/^::ffff:(.+)$/i.exec(address)?.[1] ?? address);
}
/** Whether one request may reach this plugin's account routes. */
function isTrustedAccountRequest(request) {
	const peer = request.socket.remoteAddress;
	if (peer === void 0 || !isLoopbackAddress(peer)) return false;
	const host = header(request, "host");
	if (host === void 0) return false;
	const hostUrl = parseAuthority(host);
	if (hostUrl === void 0 || !isLoopbackHostname(hostUrl.hostname)) return false;
	if (header(request, "sec-fetch-site") === "cross-site") return false;
	const origin = header(request, "origin");
	if (origin === void 0) return true;
	try {
		return new URL(origin).host === hostUrl.host;
	} catch {
		return false;
	}
}

//#endregion
//#region src/routes.ts
/** Largest request body accepted; every payload here is a few short fields. */
const MAX_BODY_BYTES = 64 * 1024;
/** SSE keep-alive period, below the common 60s idle timeout of intermediaries. */
const HEARTBEAT_MS = 25e3;
/** Answer with one JSON document. */
function sendJson(res, status, body) {
	const text = JSON.stringify(body);
	res.writeHead(status, {
		"content-type": "application/json; charset=utf-8",
		"content-length": Buffer.byteLength(text),
		"cache-control": "no-store"
	});
	res.end(text);
}
/** Answer with one error document. */
function sendError(res, status, message) {
	sendJson(res, status, { error: message });
}
/** Read and parse a bounded JSON request body. */
async function readJson(req) {
	const chunks = [];
	let size = 0;
	for await (const chunk of req) {
		const buffer = chunk;
		size += buffer.length;
		if (size > MAX_BODY_BYTES) throw new BadRequest("request body too large");
		chunks.push(buffer);
	}
	const text = Buffer.concat(chunks).toString("utf8");
	if (text.trim().length === 0) throw new BadRequest("request body is empty");
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		throw new BadRequest("request body is not valid JSON");
	}
	if (parsed === null || typeof parsed !== "object") throw new BadRequest("request body is not a JSON object");
	return parsed;
}
/** Whether a value is a non-empty string, the only shape every field here takes. */
function isText(value) {
	return typeof value === "string" && value.length > 0;
}
/** The body's `provider` field, or undefined after answering 400 for a missing one. */
function providerOf(res, body) {
	if (isText(body.provider)) return body.provider;
	sendError(res, 400, "provider is required");
}
/**
* Stream one login attempt as Server-Sent Events.
*
* The subscription replays the attempt's buffered steps first: the browser
* starts a flow with `POST login` and opens this stream with a second request
* (`EventSource` can only GET), so the first steps have usually already
* happened by the time anyone is listening.
*/
function streamLogin(ctx, res, loginId) {
	const session = ctx.providerAuth.session(loginId);
	if (session === void 0) {
		sendError(res, 404, `unknown login ${loginId}`);
		return;
	}
	res.writeHead(200, {
		"content-type": "text/event-stream; charset=utf-8",
		"cache-control": "no-store",
		connection: "keep-alive",
		"x-accel-buffering": "no"
	});
	res.flushHeaders();
	const send = (event) => {
		res.write(`data: ${JSON.stringify(event)}\n\n`);
		if (event.type === "done" || event.type === "error") res.end();
	};
	const unsubscribe = session.subscribe(send);
	const heartbeat = setInterval(() => res.write(": keep-alive\n\n"), HEARTBEAT_MS);
	heartbeat.unref();
	const stop = () => {
		clearInterval(heartbeat);
		unsubscribe();
	};
	res.on("close", stop);
	res.on("finish", stop);
	res.on("error", stop);
	if (session.settled()) {
		stop();
		res.end();
	}
}
/** The method each operation answers to; anything else is 405 with `Allow`. */
const OPERATION_METHODS = {
	providers: "GET",
	events: "GET",
	"stored-key": "GET",
	login: "POST",
	answer: "POST",
	cancel: "POST",
	route: "POST",
	"refresh-catalog": "POST",
	"discover-endpoint": "POST",
	"import-credential": "POST",
	logout: "POST"
};
/**
* Refuse a field that is present but not the type the contract names. An
* unparseable optional field must be a 400, not a silent fallback: a client
* sending `provider: 42` to `refresh-catalog` meant one provider, and
* degrading that to "refresh all" would do forty writes nobody asked for.
*/
function refuseWrongType(res, body, field, type) {
	const value = body[field];
	if (value === void 0 || typeof value === type && (type !== "string" || value.length > 0)) return false;
	sendError(res, 400, `${field} must be a non-empty ${type === "string" ? "string" : "boolean"} when present`);
	return true;
}
/** Dispatch one request to its operation. */
async function handle(ctx, req, res) {
	if (!isTrustedAccountRequest(req)) {
		sendError(res, 403, "the account plane is reachable from this machine only");
		return;
	}
	const url = new URL(req.url ?? "/", "http://localhost");
	const operation = url.pathname.slice(PROVIDERS_ROUTE_PREFIX.length).replace(/^\//, "");
	const method = req.method ?? "GET";
	const expected = OPERATION_METHODS[operation];
	if (expected === void 0) {
		sendError(res, 404, `${url.pathname} is not an account operation`);
		return;
	}
	if (method !== expected) {
		res.setHeader("allow", expected);
		sendError(res, 405, `${operation} only answers ${expected}`);
		return;
	}
	if (operation === "providers") {
		sendJson(res, 200, { providers: await ctx.providerAuth.listProviders() });
		return;
	}
	if (operation === "events") {
		const loginId = url.searchParams.get("loginId");
		if (loginId === null) {
			sendError(res, 400, "loginId is required");
			return;
		}
		streamLogin(ctx, res, loginId);
		return;
	}
	if (operation === "stored-key") {
		const provider$1 = url.searchParams.get("provider");
		if (provider$1 === null) {
			sendError(res, 400, "provider is required");
			return;
		}
		sendJson(res, 200, await ctx.providerAuth.storedKey(provider$1));
		return;
	}
	if (operation === "login") {
		const body$1 = await readJson(req);
		const provider$1 = providerOf(res, body$1);
		if (provider$1 === void 0) return;
		if (body$1.method !== "oauth" && body$1.method !== "api_key") {
			sendError(res, 400, "method must be \"oauth\" or \"api_key\"");
			return;
		}
		sendJson(res, 200, { loginId: ctx.providerAuth.login(provider$1, body$1.method).id });
		return;
	}
	if (operation === "answer") {
		const body$1 = await readJson(req);
		if (!isText(body$1.loginId) || !isText(body$1.requestId)) {
			sendError(res, 400, "loginId and requestId are required");
			return;
		}
		if (typeof body$1.value !== "string") {
			sendError(res, 400, "value must be a string");
			return;
		}
		if (!ctx.providerAuth.answer(body$1.loginId, body$1.requestId, body$1.value)) {
			sendError(res, 409, "that prompt is no longer waiting for an answer");
			return;
		}
		sendJson(res, 200, {});
		return;
	}
	if (operation === "cancel") {
		const body$1 = await readJson(req);
		if (!isText(body$1.loginId)) {
			sendError(res, 400, "loginId is required");
			return;
		}
		if (!ctx.providerAuth.cancel(body$1.loginId)) {
			sendError(res, 404, `unknown login ${body$1.loginId}`);
			return;
		}
		sendJson(res, 200, {});
		return;
	}
	if (operation === "route") {
		const provider$1 = providerOf(res, await readJson(req));
		if (provider$1 === void 0) return;
		await ctx.providerAuth.route(provider$1);
		sendJson(res, 200, {});
		return;
	}
	if (operation === "refresh-catalog") {
		const body$1 = await readJson(req);
		if (refuseWrongType(res, body$1, "provider", "string") || refuseWrongType(res, body$1, "force", "boolean")) return;
		sendJson(res, 200, await ctx.providerAuth.refreshCatalog(body$1.provider, body$1.force === true));
		return;
	}
	if (operation === "import-credential") {
		const provider$1 = providerOf(res, await readJson(req));
		if (provider$1 === void 0) return;
		await ctx.providerAuth.importCredential(provider$1);
		sendJson(res, 200, {});
		return;
	}
	if (operation === "discover-endpoint") {
		const body$1 = await readJson(req);
		const provider$1 = providerOf(res, body$1);
		if (provider$1 === void 0) return;
		if (refuseWrongType(res, body$1, "baseURL", "string")) return;
		sendJson(res, 200, { count: await ctx.providerAuth.discoverEndpoint(provider$1, body$1.baseURL) });
		return;
	}
	const body = await readJson(req);
	const provider = providerOf(res, body);
	if (provider === void 0) return;
	if (refuseWrongType(res, body, "unroute", "boolean")) return;
	await ctx.providerAuth.logout(provider, body.unroute === true);
	sendJson(res, 200, {});
}
const name = "providers-routes";
const inject = ["providerAuth"];
/**
* Mount the account routes on the web server, once one exists.
*
* `webServer` is an optional dependency, reached through `ctx.inject` rather
* than declared on the row: dsh's boot audit fails loudly on a row that never
* activates, so declaring it would turn every headless profile into a boot
* failure. The scoped fiber also unmounts the routes with the server.
*/
function apply(ctx) {
	ctx.inject(["webServer"], (webCtx) => {
		webCtx.effect(() => webCtx.webServer.register({
			kind: "prefix",
			path: PROVIDERS_ROUTE_PREFIX,
			handler: (req, res) => handle(ctx, req, res).catch((error) => {
				ctx.logger.warn("dsh-providers: account route failed");
				ctx.logger.warn(error);
				if (res.headersSent) {
					res.end();
					return;
				}
				sendError(res, error instanceof BadRequest ? 400 : 500, errorMessage(error));
			})
		}), "dsh-providers: account routes");
	});
}

//#endregion
export { apply, inject, name };
//# sourceMappingURL=routes.js.map