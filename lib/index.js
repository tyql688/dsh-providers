import { t as errorMessage } from "./errors-CHMfc6Mk.js";
import { t as PROVIDERS_ROUTE_PREFIX } from "./wire-ag4RQFWe.js";
import { access, chmod, mkdir, readFile, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, isAbsolute, join, resolve } from "node:path";
import z from "@deepseek-ai/schemastery";
import { credentialRef } from "@deepseek-ai/dsh-credentials";
import { LocalCredentialProvider } from "@deepseek-ai/dsh-credentials-local";
import { resolveDshHome } from "@deepseek-ai/dsh-home-paths";
import { builtinModels, getBuiltinModelDataGeneratedAt } from "@earendil-works/pi-ai/providers/all";
import { randomUUID } from "node:crypto";
import { supportedProtocols } from "@deepseek-ai/dsh-llm-pi-ai";
import { withFileLock, writeFileAtomic } from "@deepseek-ai/dsh-atomic-write";
import { settingsNamespace } from "@deepseek-ai/dsh-settings";

//#region src/login.ts
/** How long a settled session stays readable before it is forgotten. */
const SETTLED_RETENTION_MS = 6e4;
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
const ABANDON_GRACE_MS = 6e4;
/**
* Cap on buffered events per attempt. Only repeatable narration (`progress`,
* `info`) is trimmed once the cap is hit: structural events (prompts, URLs,
* the outcome) must survive for a late subscriber to render the flow at all.
*/
const MAX_BUFFERED_EVENTS = 512;
/** Translate one pi-ai notification into its wire event. */
function toWireEvent(event) {
	switch (event.type) {
		case "auth_url": return {
			type: "auth_url",
			url: event.url,
			...event.instructions === void 0 ? {} : { instructions: event.instructions }
		};
		case "device_code": return {
			type: "device_code",
			userCode: event.userCode,
			verificationUri: event.verificationUri,
			...event.intervalSeconds === void 0 ? {} : { intervalSeconds: event.intervalSeconds },
			...event.expiresInSeconds === void 0 ? {} : { expiresInSeconds: event.expiresInSeconds }
		};
		case "info": return {
			type: "info",
			message: event.message,
			...event.links === void 0 ? {} : { links: event.links.map((link) => ({
				url: link.url,
				...link.label === void 0 ? {} : { label: link.label }
			})) }
		};
		case "progress": return {
			type: "progress",
			message: event.message
		};
	}
}
/** Translate one pi-ai prompt into its wire event. */
function toWirePrompt(requestId, prompt) {
	return {
		type: "prompt",
		requestId,
		kind: prompt.type,
		message: prompt.message,
		..."placeholder" in prompt && prompt.placeholder !== void 0 ? { placeholder: prompt.placeholder } : {},
		...prompt.type === "select" ? { options: prompt.options.map((option) => ({
			id: option.id,
			label: option.label,
			...option.description === void 0 ? {} : { description: option.description }
		})) } : {}
	};
}
/** One in-flight or recently settled login attempt. */
var Attempt = class {
	id = randomUUID();
	buffer = [];
	listeners = /* @__PURE__ */ new Set();
	pending = /* @__PURE__ */ new Map();
	abort = new AbortController();
	done = false;
	/** Armed while nobody is watching an unsettled flow; see {@link ABANDON_GRACE_MS}. */
	abandonTimer;
	result;
	/**
	* @param settle - work that must finish before the surface hears success
	*   (writing the provider's llm route). A failure here does not fail the
	*   sign-in — the credential is stored either way — so it is reported as a
	*   step and the flow still completes.
	* @param onSettled - invoked once the flow settles, for retention bookkeeping.
	*/
	constructor(provider, run, settle, onSettled) {
		this.provider = provider;
		this.onSettled = onSettled;
		this.result = run(this.interaction()).then(async (credential) => {
			if (this.done) return credential;
			try {
				await settle(credential);
			} catch (error) {
				if (!this.done) this.emit({
					type: "info",
					message: errorMessage(error)
				});
			}
			if (this.done) return credential;
			this.emit({
				type: "done",
				provider,
				credential: credential.type
			});
			this.settleNow();
			return credential;
		}, (error) => {
			if (!this.done) {
				this.emit({
					type: "error",
					message: errorMessage(error)
				});
				this.settleNow();
			}
			throw error;
		});
		this.result.catch(() => {});
		this.armAbandon();
	}
	/** Start the abandon window; a flow nobody watches must not hold its callback port. */
	armAbandon() {
		if (this.done || this.abandonTimer !== void 0) return;
		this.abandonTimer = setTimeout(() => {
			this.abandonTimer = void 0;
			if (this.done || this.listeners.size > 0) return;
			this.cancel("login abandoned");
		}, ABANDON_GRACE_MS);
		this.abandonTimer.unref();
	}
	/** Stop the abandon window; a surface is watching again. */
	disarmAbandon() {
		if (this.abandonTimer === void 0) return;
		clearTimeout(this.abandonTimer);
		this.abandonTimer = void 0;
	}
	/** Mark the attempt settled and hand it to the registry's retention bookkeeping, once. */
	settleNow() {
		this.finish();
		this.onSettled(this);
	}
	/** Publish one event to every current subscriber and buffer it for late ones. */
	emit(event) {
		if (this.buffer.length >= MAX_BUFFERED_EVENTS) {
			const trimmable = this.buffer.findIndex((kept) => kept.type === "progress" || kept.type === "info");
			if (trimmable >= 0) this.buffer.splice(trimmable, 1);
		}
		this.buffer.push(event);
		for (const listener of this.listeners) try {
			listener(event);
		} catch {}
	}
	/** Mark the attempt settled and reject anything still waiting on the user. */
	finish() {
		this.done = true;
		this.disarmAbandon();
		for (const [requestId, prompt] of this.pending) {
			prompt.detach();
			prompt.reject(/* @__PURE__ */ new Error("login flow ended"));
			this.buffer.push({
				type: "prompt_done",
				requestId
			});
		}
		this.pending.clear();
		this.listeners.clear();
	}
	/** The interaction pi-ai's provider-owned login implementation drives. */
	interaction() {
		return {
			signal: this.abort.signal,
			notify: (event) => {
				this.emit(toWireEvent(event));
			},
			prompt: (prompt) => new Promise((resolve$1, reject) => {
				if (this.done || this.abort.signal.aborted) {
					reject(/* @__PURE__ */ new Error("login flow ended"));
					return;
				}
				const requestId = randomUUID();
				const onAbort = () => {
					this.pending.delete(requestId);
					this.emit({
						type: "prompt_done",
						requestId
					});
					reject(/* @__PURE__ */ new Error("prompt cancelled"));
				};
				prompt.signal?.addEventListener("abort", onAbort, { once: true });
				this.pending.set(requestId, {
					resolve: resolve$1,
					reject,
					detach: () => prompt.signal?.removeEventListener("abort", onAbort)
				});
				this.emit(toWirePrompt(requestId, prompt));
			})
		};
	}
	subscribe(listener) {
		for (const event of this.buffer) listener(event);
		if (this.done) return () => {};
		this.listeners.add(listener);
		this.disarmAbandon();
		return () => {
			this.listeners.delete(listener);
			if (this.listeners.size === 0) this.armAbandon();
		};
	}
	settled() {
		return this.done;
	}
	/**
	* Answer one pending prompt.
	* @returns whether a prompt was waiting under that id.
	*/
	answer(requestId, value) {
		const prompt = this.pending.get(requestId);
		if (prompt === void 0) return false;
		this.pending.delete(requestId);
		prompt.detach();
		this.emit({
			type: "prompt_done",
			requestId
		});
		prompt.resolve(value);
		return true;
	}
	/**
	* Abort the whole flow. pi-ai closes its callback server and rejects — but
	* the attempt does not wait for it to: a flow that ignores the abort signal
	* would otherwise stay "live" forever, blocking the map from ever forgetting
	* it. Cancellation settles the attempt here and now; a late resolution from
	* the underlying flow is ignored (see the `done` guards in the constructor).
	*/
	cancel(message = "login cancelled") {
		this.abort.abort();
		if (this.done) return;
		for (const [requestId, prompt] of this.pending) {
			prompt.detach();
			this.emit({
				type: "prompt_done",
				requestId
			});
			prompt.reject(new Error(message));
		}
		this.pending.clear();
		this.emit({
			type: "error",
			message
		});
		this.settleNow();
	}
};
/** The live registry of login attempts, keyed by the id the surface holds. */
var LoginSessions = class {
	attempts = /* @__PURE__ */ new Map();
	timers = /* @__PURE__ */ new Set();
	/**
	* Start one attempt.
	* @param settle - work awaited before the surface is told the flow succeeded.
	*/
	start(provider, run, settle) {
		for (const live of this.attempts.values()) if (live.provider === provider && !live.settled()) live.cancel();
		const attempt = new Attempt(provider, run, settle, (settled) => {
			const timer = setTimeout(() => {
				this.attempts.delete(settled.id);
				this.timers.delete(timer);
			}, SETTLED_RETENTION_MS);
			timer.unref();
			this.timers.add(timer);
		});
		this.attempts.set(attempt.id, attempt);
		return attempt;
	}
	/** Look one attempt up; undefined once it has been forgotten. */
	get(loginId) {
		return this.attempts.get(loginId);
	}
	/**
	* Answer a pending prompt of one attempt.
	* @returns whether the prompt was found and answered.
	*/
	answer(loginId, requestId, value) {
		return this.attempts.get(loginId)?.answer(requestId, value) ?? false;
	}
	/**
	* Cancel one attempt.
	* @returns whether an attempt was found.
	*/
	cancel(loginId) {
		const attempt = this.attempts.get(loginId);
		if (attempt === void 0) return false;
		attempt.cancel();
		return true;
	}
	/** Cancel every live attempt and drop the retention timers; used at plugin disposal. */
	dispose() {
		for (const attempt of this.attempts.values()) attempt.cancel();
		this.attempts.clear();
		for (const timer of this.timers) clearTimeout(timer);
		this.timers.clear();
	}
};

//#endregion
//#region src/refs.ts
/**
* The credential reference one provider's llm route reads: `openai-codex`
* yields `OPENAI_CODEX_API_KEY`.
*
* Must match the shipped Models page's `deriveKeyRef` character for character
* (uppercase, then collapse each run of non-alphanumerics into one
* underscore), or a provider configured there and here would land on two
* different references.
*/
function providerRef(providerId) {
	return credentialRef(`${providerId.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}_API_KEY`);
}

//#endregion
//#region src/catalog.ts
/** Request modalities the route schema accepts; anything else is dropped. */
const MODALITIES = new Set(["text", "image"]);
/**
* Per-protocol route-key suffix and display label, for the extra routes of a
* multi-protocol provider. The suffixes end up in settings keys the user can
* see and edit, so they must never change. A protocol absent from this table
* is not routed at all: minting an unmapped suffix would create a route key
* that {@link OVERFLOW_SUFFIXES}-based ownership checks could never recognize
* or clean up.
*/
const PROTOCOLS = {
	"openai-completions": {
		suffix: "completions",
		label: "Completions"
	},
	"openai-responses": {
		suffix: "responses",
		label: "Responses"
	},
	"anthropic-messages": {
		suffix: "anthropic",
		label: "Anthropic"
	}
};
/** Every route-key suffix this module can produce; used to recognize our own routes later. */
const OVERFLOW_SUFFIXES = Object.values(PROTOCOLS).map((protocol) => protocol.suffix);
/** Route-key suffix → the wire protocol it stands for; the inverse of {@link PROTOCOLS}. */
const SUFFIX_PROTOCOLS = Object.fromEntries(Object.entries(PROTOCOLS).map(([api, protocol]) => [protocol.suffix, api]));
/** Keep only the modalities the route schema accepts. */
function modalities(input) {
	if (input === void 0) return void 0;
	const kept = input.filter((modality) => MODALITIES.has(modality));
	return kept.length > 0 ? kept : void 0;
}
/**
* Reasoning wire formats the adapter's schema accepts. pi-ai knows more (e.g.
* `baseten`); a value outside this set is dropped rather than written, so
* pi-ai's own baseURL-based detection answers instead of the route failing.
*/
const THINKING_FORMATS = new Set([
	"openai",
	"deepseek",
	"openrouter",
	"together",
	"zai",
	"qwen",
	"string-thinking",
	"ant-ling"
]);
/** Read `supportsReasoningEffort` off a catalog entry's compat block, when it is a boolean. */
function reasoningEffortSwitch(compat) {
	if (typeof compat !== "object" || compat === null) return void 0;
	const value = compat.supportsReasoningEffort;
	return typeof value === "boolean" ? value : void 0;
}
/** Read `thinkingFormat` off a catalog entry's compat block, when the adapter can accept it. */
function thinkingFormat(compat) {
	if (typeof compat !== "object" || compat === null) return void 0;
	const value = compat.thinkingFormat;
	return typeof value === "string" && THINKING_FORMATS.has(value) ? value : void 0;
}
/** Read string-valued request headers off a catalog entry, if any. */
function headersOf(value) {
	if (typeof value !== "object" || value === null) return void 0;
	const headers = {};
	for (const [name, header] of Object.entries(value)) if (typeof header === "string") headers[name] = header;
	return Object.keys(headers).length > 0 ? headers : void 0;
}
/** Project one baked pi-ai catalog model into the merge shape. */
function fromBaked(model, providerBaseUrl) {
	const baseUrl = model.baseUrl ?? providerBaseUrl;
	if (baseUrl === void 0 || baseUrl.length === 0) return void 0;
	const input = modalities(model.input);
	const effort = reasoningEffortSwitch(model.compat);
	const format = thinkingFormat(model.compat);
	const headers = headersOf(model.headers);
	return {
		id: model.id,
		name: model.name,
		api: model.api,
		baseUrl,
		...model.contextWindow === void 0 ? {} : { contextWindow: model.contextWindow },
		...model.maxTokens === void 0 ? {} : { maxTokens: model.maxTokens },
		...input === void 0 ? {} : { input },
		reasoning: model.reasoning,
		...model.thinkingLevelMap === void 0 ? {} : { thinkingLevels: { ...model.thinkingLevelMap } },
		...effort === void 0 ? {} : { supportsReasoningEffort: effort },
		...format === void 0 ? {} : { thinkingFormat: format },
		...headers === void 0 ? {} : { headers }
	};
}
/**
* Project one remote catalog model. Fields the remote entry omits fall back to
* the baked entry of the same id, so a partial remote entry never erases what
* the baked data already knows.
*/
function fromRemote(model, baked, providerBaseUrl) {
	const api = model.api ?? baked?.api;
	const baseUrl = model.baseUrl ?? baked?.baseUrl ?? providerBaseUrl;
	if (api === void 0 || baseUrl === void 0 || baseUrl.length === 0) return void 0;
	const input = modalities(model.input) ?? baked?.input;
	const contextWindow = model.contextWindow ?? baked?.contextWindow;
	const maxTokens = model.maxTokens ?? baked?.maxTokens;
	const thinkingLevels = model.thinkingLevelMap ?? baked?.thinkingLevels;
	const effort = reasoningEffortSwitch(model.compat) ?? baked?.supportsReasoningEffort;
	const format = thinkingFormat(model.compat) ?? baked?.thinkingFormat;
	const headers = headersOf(model.headers) ?? baked?.headers;
	return {
		id: model.id,
		name: model.name ?? baked?.name ?? model.id,
		api,
		baseUrl,
		...contextWindow === void 0 ? {} : { contextWindow },
		...maxTokens === void 0 ? {} : { maxTokens },
		...input === void 0 ? {} : { input },
		reasoning: model.reasoning ?? baked?.reasoning ?? false,
		...thinkingLevels === void 0 ? {} : { thinkingLevels: { ...thinkingLevels } },
		...effort === void 0 ? {} : { supportsReasoningEffort: effort },
		...format === void 0 ? {} : { thinkingFormat: format },
		...headers === void 0 ? {} : { headers }
	};
}
/**
* Merge the remote catalog over the baked one.
*
* This is an overlay, not a replacement: a remote entry supersedes the baked
* entry with the same id and new ids are appended, but a model the remote
* catalog dropped keeps serving — removing it would break a session pinned to
* it, and a catalog fetch is not the place to decide that.
* @returns the merged models, baked order first, remote additions after.
*/
function mergeModels(provider, overlay) {
	let baked = [];
	try {
		baked = provider.getModels();
	} catch {}
	const merged = /* @__PURE__ */ new Map();
	for (const model of baked) {
		const projected = fromBaked(model, provider.baseUrl);
		if (projected !== void 0) merged.set(projected.id, projected);
	}
	for (const model of overlay) {
		const projected = fromRemote(model, merged.get(model.id), provider.baseUrl);
		if (projected !== void 0) merged.set(projected.id, projected);
	}
	return [...merged.values()];
}
/** Thinking levels in escalation order; the adapter accepts exactly these keys. */
const THINKING_LEVELS = [
	"off",
	"minimal",
	"low",
	"medium",
	"high",
	"xhigh",
	"max"
];
/** Levels pi-ai treats as supported by default when a model does not spell them out. */
const DEFAULT_LEVELS = new Set([
	"off",
	"minimal",
	"low",
	"medium",
	"high"
]);
/**
* Which thinking levels a model offers, and how each is spelled on the wire.
*
* This must be written out explicitly: the adapter reads an absent
* `reasoningEfforts` as "use the installed catalog's answer", and a model that
* catalog has never heard of then becomes non-reasoning (Grok 4.6 arriving from
* the remote catalog hit exactly that).
*
* The mapping follows pi-ai's own defaulting: a level mapped to a string is
* offered with that spelling, `null` means unsupported, and an unmapped level
* takes the provider default. `off` is declared with no wire value — that is
* how pi-ai records it as supported without a spelling to send.
* @returns the efforts dict, `false` for a model that does not reason, or
*   undefined when nothing is known and inheriting is the honest answer.
*/
function reasoningEfforts(model) {
	if (model.reasoning === void 0) return void 0;
	if (!model.reasoning) return false;
	const efforts = {};
	for (const level of THINKING_LEVELS) {
		const wire = model.thinkingLevels?.[level];
		if (wire === null) continue;
		if (typeof wire === "string") {
			efforts[level] = wire;
			continue;
		}
		if (!DEFAULT_LEVELS.has(level)) continue;
		efforts[level] = level === "off" ? null : level;
	}
	return Object.keys(efforts).some((level) => level !== "off") ? efforts : false;
}
/** The reasoning-dispatch switches a model entry may carry, or undefined for none. */
function compatProfile(model) {
	const compat = {};
	if (model.thinkingFormat !== void 0) compat.thinkingFormat = model.thinkingFormat;
	if (model.supportsReasoningEffort !== void 0) compat.supportsReasoningEffort = model.supportsReasoningEffort;
	return Object.keys(compat).length > 0 ? compat : void 0;
}
/** The settings shape of one merged model. */
function modelProfile(model) {
	const efforts = reasoningEfforts(model);
	const compat = model.api !== "openai-completions" ? void 0 : compatProfile(model);
	return {
		id: model.id,
		name: model.name,
		...model.contextWindow === void 0 ? {} : { contextWindow: model.contextWindow },
		...model.maxTokens === void 0 ? {} : { maxTokens: model.maxTokens },
		...model.input === void 0 ? {} : { input: [...model.input] },
		...efforts === void 0 ? {} : { reasoningEfforts: efforts },
		...compat === void 0 ? {} : { compat }
	};
}
/**
* Plan the routes a provider needs to serve every model it has, grouped by
* wire protocol: the largest group gets the provider's own key and every other
* group gets `<provider>-<protocol>`.
*
* Protocols the adapter cannot serve at all are dropped here rather than
* failing the route later — Bedrock, Vertex, Azure, Codex and Gemini frame or
* authenticate requests in ways a base URL plus a key cannot express.
* @returns one spec per route, the primary first; empty when nothing is routable.
*/
function planRoutes(provider, models) {
	const order = supportedProtocols();
	const supported = new Set(order);
	const groups = /* @__PURE__ */ new Map();
	for (const model of models) {
		if (!supported.has(model.api) || PROTOCOLS[model.api] === void 0) continue;
		const group = groups.get(model.api);
		if (group === void 0) groups.set(model.api, [model]);
		else group.push(model);
	}
	if (groups.size === 0) return [];
	const ranked = [...groups.entries()].toSorted(([leftApi, left], [rightApi, right]) => right.length - left.length || order.indexOf(leftApi) - order.indexOf(rightApi));
	const specs = [];
	for (const [api, group] of ranked) {
		const protocol = PROTOCOLS[api];
		const first = group[0];
		if (protocol === void 0 || first === void 0) continue;
		const primary = specs.length === 0;
		const headers = new Set(group.map((model) => JSON.stringify(model.headers ?? null))).size === 1 ? first.headers : void 0;
		specs.push({
			routeId: primary ? provider.id : `${provider.id}-${protocol.suffix}`,
			api,
			baseURL: first.baseUrl,
			displayName: primary ? provider.name : `${provider.name} · ${protocol.label}`,
			...headers === void 0 ? {} : { headers },
			models: group.map(modelProfile)
		});
	}
	return specs;
}
/**
* Keep models the routes already serve that the new plan would drop.
*
* A catalog update is not only additive: this plugin's pi-ai is newer than the
* adapter's, and pi-ai retires models. Retiring a model upstream is a fair
* reason to stop offering it, but not a reason for it to vanish from under a
* session pinned to it — least of all from a button labelled "update".
* Retained entries carry only an id and a name; everything else defaults from
* the adapter's own entry, which by definition exists.
*
* Applied only to a single-route provider, and only to models whose serving
* route's protocol matches (or names none — a catalog route, never split):
* retaining a model onto a wire it does not speak would trade a missing model
* for one that fails every request.
* @param served - ids the provider's routes serve right now, with their names
*   and, when known, the protocol of the route serving each.
* @returns the specs, the sole one extended with whatever it would have dropped.
*/
function retainServed(specs, served) {
	const [only] = specs;
	if (specs.length !== 1 || only === void 0) return [...specs];
	const planned = new Set(only.models.map((model) => model.id));
	const kept = served.filter((model) => !planned.has(model.id) && (model.api === void 0 || model.api === only.api));
	if (kept.length === 0) return [...specs];
	return [{
		...only,
		models: [...only.models, ...kept.map((model) => ({
			id: model.id,
			name: model.name
		}))]
	}];
}
/** The settings fragment to write under one route's key. */
function routeProfile(spec) {
	return {
		api: spec.api,
		baseURL: spec.baseURL,
		models: spec.models
	};
}
/**
* Describe a provider as a single fully-declared route, when one route can
* describe it at all. This is the sign-in fallback for a provider the shipped
* adapter has never heard of: with no catalog entry to inherit, the route must
* spell out protocol, endpoint and models or the adapter cannot build it.
* @returns the single route, or undefined when one route cannot describe it.
*/
function soleRoute(provider, models) {
	const routes = planRoutes(provider, models);
	return routes.length === 1 ? routes[0] : void 0;
}

//#endregion
//#region src/remote-catalog.ts
/** Where the curated catalog is served. pi's own default. */
const CATALOG_BASE_URL = "https://pi.dev";
/**
* How long a checked provider is trusted before another request goes out.
* pi's interval: long enough that opening the page is free, short enough that
* a model announced this morning arrives today.
*/
const CATALOG_REFRESH_INTERVAL_MS = 14400 * 1e3;
/**
* Per-attempt ceiling, deliberately short. The failure this guards against is
* not a slow reply but a connection that never establishes — behind a VPN or a
* proxying resolver a first connection can stall indefinitely, and waiting out
* a long ceiling only delays the retry that works.
*/
const REQUEST_TIMEOUT_MS = 8e3;
/** Attempts per provider; pi's catalog client retries for the same reason. */
const REQUEST_ATTEMPTS = 3;
/** Pause before retrying, scaled by attempt, so a fast-failing resolver is not hit three times in a row. */
const RETRY_DELAY_MS = 250;
/** Owner-only permissions, matching the token document beside it. */
const FILE_MODE$1 = 384;
/** Directory permissions for the harness home, when this document creates it. */
const DIR_MODE$1 = 448;
/** Parse one catalog body, which the server may shape as a dict, a list, or `{models}`. */
function parseCatalog(providerId, value) {
	const entries = Array.isArray(value) ? value : typeof value === "object" && value !== null && "models" in value && Array.isArray(value.models) ? value.models : typeof value === "object" && value !== null ? Object.values(value) : void 0;
	if (entries === void 0) throw new Error(`dsh-providers: ${providerId} answered a catalog this reader cannot parse`);
	return entries.filter((entry) => typeof entry === "object" && entry !== null && typeof entry.id === "string");
}
/**
* The models to overlay; empty when the cached catalog is not newer than the
* baked data. A catalog served before this package's data was generated has
* nothing to add and would silently downgrade a model the baked data
* describes better, so it is ignored. pi applies the same test with the same
* stamp.
*/
function usableModels(entry, bakedGeneratedAt) {
	if (entry === void 0) return [];
	if (bakedGeneratedAt !== void 0 && (entry.lastModified === void 0 || entry.lastModified <= bakedGeneratedAt)) return [];
	return entry.models;
}
/**
* The persisted pi.dev catalog overlay. Reads are cheap and offline; only
* {@link RemoteCatalog.refresh} touches the network. The document is written
* under the same cross-process lock the token store uses.
*/
var RemoteCatalog = class {
	/** Parsed document, held for the process; every write refreshes it. */
	document;
	/**
	* @param bakedGeneratedAt - generation stamp of the installed pi-ai's model data.
	* @param baseUrl - where the catalog is served; overridable for testing.
	*/
	constructor(path, bakedGeneratedAt, baseUrl = CATALOG_BASE_URL) {
		this.path = path;
		this.bakedGeneratedAt = bakedGeneratedAt;
		this.baseUrl = baseUrl;
	}
	/** Parse the document, treating an absent or corrupt one as empty. */
	async load() {
		if (this.document !== void 0) return this.document;
		let text;
		try {
			text = await readFile(this.path, "utf8");
		} catch (error) {
			if (error.code === "ENOENT") return this.document = {};
			throw error;
		}
		try {
			const parsed = JSON.parse(text);
			if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
			return this.document = parsed;
		} catch {
			return this.document = {};
		}
	}
	/** Replace one provider's entry, under the document lock. */
	async commit(providerId, entry) {
		await mkdir(dirname(this.path), {
			recursive: true,
			mode: DIR_MODE$1
		});
		await withFileLock(this.path, async () => {
			this.document = void 0;
			const document = {
				...await this.load(),
				[providerId]: entry
			};
			await writeFileAtomic(this.path, `${JSON.stringify(document, null, 2)}\n`, {
				mode: FILE_MODE$1,
				dirMode: DIR_MODE$1
			});
			this.document = document;
		});
	}
	/** The overlay cached for one provider, without touching the network. */
	async stored(providerId) {
		return usableModels((await this.load())[providerId], this.bakedGeneratedAt);
	}
	/** When one provider was last checked against the server. */
	async checkedAt(providerId) {
		return (await this.load())[providerId]?.checkedAt;
	}
	/**
	* Fetch one provider's catalog, revalidating what is cached.
	*
	* An unserved provider does not throw: the endpoint answers 404 for a
	* provider pi.dev does not publish, which is a fact about that provider, not
	* a failure of the refresh. A transport failure or a 5xx does throw, so a
	* batch can report which providers it could not reach.
	* @param options - `force` bypasses the freshness window; `signal` cancels.
	*/
	async refresh(providerId, options = {}) {
		const stored = (await this.load())[providerId];
		const cached = usableModels(stored, this.bakedGeneratedAt);
		if (options.force !== true && stored?.lastModified !== void 0 && Date.now() - stored.checkedAt < CATALOG_REFRESH_INTERVAL_MS) return {
			models: cached,
			changed: false
		};
		const validator = stored !== void 0 && stored.models.length > 0 ? stored.etag : void 0;
		const url = new URL(`/api/models/providers/${encodeURIComponent(providerId)}`, this.baseUrl);
		const headers = {
			accept: "application/json",
			...validator === void 0 ? {} : { "if-none-match": validator }
		};
		const cancelled = () => options.signal?.aborted ?? false;
		let response;
		let failure;
		for (let attempt = 0; attempt < REQUEST_ATTEMPTS && response === void 0; attempt += 1) {
			if (cancelled()) throw options.signal?.reason ?? /* @__PURE__ */ new Error("dsh-providers: catalog refresh cancelled");
			if (attempt > 0) await new Promise((resolve$1) => setTimeout(resolve$1, RETRY_DELAY_MS * attempt));
			const signal = options.signal === void 0 ? AbortSignal.timeout(REQUEST_TIMEOUT_MS) : AbortSignal.any([options.signal, AbortSignal.timeout(REQUEST_TIMEOUT_MS)]);
			try {
				response = await fetch(url, {
					headers,
					signal
				});
			} catch (error) {
				if (cancelled()) throw error;
				failure = error;
			}
		}
		if (response === void 0) throw failure;
		const checkedAt = Date.now();
		if (response.status === 304 && stored !== void 0) {
			await this.commit(providerId, {
				...stored,
				checkedAt
			});
			return {
				models: cached,
				changed: false
			};
		}
		if (response.status === 404 || response.status === 501) {
			await this.commit(providerId, {
				models: [],
				checkedAt,
				lastModified: 0
			});
			return {
				models: [],
				changed: cached.length > 0
			};
		}
		if (!response.ok) throw new Error(`dsh-providers: the model catalog for ${providerId} answered ${response.status}`);
		const models = parseCatalog(providerId, await response.json());
		const lastModified = Date.parse(response.headers.get("last-modified") ?? "");
		const etag = response.headers.get("etag");
		const entry = {
			models,
			checkedAt,
			lastModified: Number.isNaN(lastModified) ? checkedAt : lastModified,
			...etag === null ? {} : { etag }
		};
		await this.commit(providerId, entry);
		const published = usableModels(entry, this.bakedGeneratedAt);
		return {
			models: published,
			changed: JSON.stringify(published) !== JSON.stringify(cached)
		};
	}
};

//#endregion
//#region src/routing.ts
/** The adapter namespace whose routes this plugin writes. */
const PI_AI_NS = settingsNamespace("llm-pi-ai");
/**
* The settings service, or undefined when the composition mounts none.
*
* Read through the global service store rather than `ctx.settings`: the
* property proxy only serves services the fiber DECLARED, and reaching an
* undeclared one through it suspends the caller forever. Settings is optional
* here — a composition without it still authenticates, it just cannot write
* the route.
*/
function settingsOf(ctx) {
	return ctx.get("settings");
}
/**
* The adapter's currently RESOLVED routes — every layer merged, schema
* defaults included. Right for "does this route exist", wrong for "did anyone
* write this field": resolution materializes defaults, so a route that names
* no models still resolves with `models: []`.
*/
function currentRoutes(ctx) {
	return (settingsOf(ctx)?.get(PI_AI_NS))?.providers ?? {};
}
/**
* The routes as STORED — the user layer alone, which is what answers "did
* anyone write this field". Known limitation: a route supplied by a lower
* settings layer (a composition base) is visible to `currentRoutes` but not
* here, so ownership checks and snapshots cannot see or manage it.
*/
function storedRoutes(ctx) {
	const settings = settingsOf(ctx);
	if (settings === void 0) return {};
	return (settings.describe().find((entry) => entry.ns === PI_AI_NS)?.user)?.providers ?? {};
}
/** Whether the adapter already serves a route for one provider. */
function isRouted(ctx, providerId) {
	return currentRoutes(ctx)[providerId] !== void 0;
}
/** The route's `baseURL`, or undefined when it inherits the catalog's. */
function routeBaseUrl(ctx, providerId) {
	const baseURL = currentRoutes(ctx)[providerId]?.baseURL;
	return typeof baseURL === "string" && baseURL.length > 0 ? baseURL : void 0;
}
/** The route's `api`, or undefined on a catalog route. */
function routeApi(ctx, routeId) {
	const api = currentRoutes(ctx)[routeId]?.api;
	return typeof api === "string" && api.length > 0 ? api : void 0;
}
/**
* The overflow routes this plugin currently owns for one provider.
*
* Ownership is inferred, not marked: the key must be one of the suffixes this
* plugin produces, the route must read the provider's own credential
* reference, AND its `api` must be the protocol that suffix stands for —
* exactly what this plugin writes — so a route the user created under a
* colliding key is never touched unless it is indistinguishable from ours.
* A marker field is not expressible in the adapter's closed profile schema,
* and would be invisible to someone reading their own settings file.
*/
function overflowRoutes(ctx, providerId, ref) {
	const stored = storedRoutes(ctx);
	return OVERFLOW_SUFFIXES.map((suffix) => `${providerId}-${suffix}`).filter((routeId) => {
		const entry = stored[routeId];
		const suffix = routeId.slice(providerId.length + 1);
		return entry?.apiKeyEnv === ref && entry.api === SUFFIX_PROTOCOLS[suffix];
	});
}
/** Every route key this plugin owns for one provider, primary first. */
function ownedRouteKeys(ctx, providerId, ref) {
	return [providerId, ...overflowRoutes(ctx, providerId, ref)];
}
/**
* Point one provider's route at the credential reference this plugin answers,
* creating the route when the adapter does not serve one yet. Fills in absent
* fields only — it never overwrites a value someone already wrote.
*
* `displayName` is written because the adapter defaults a route's name to its
* key, and a bare id (`xai`) would look broken beside properly named providers
* on the shipped Models page.
* @param displayName - written only when the route names none, so a name
*   chosen on the Models page is never overwritten.
* @param baseURL - endpoint derived from the credential, when the method has
*   one. GitHub Copilot is the case: its endpoint comes out of the access
*   token, and the credential seam carries a value, not a URL.
* @param declared - protocol, endpoint and models, for a provider the
*   adapter's own catalog cannot describe. Omitted for a catalog route.
*/
async function ensureRoute(ctx, providerId, ref, displayName, baseURL, declared) {
	const settings = settingsOf(ctx);
	if (settings === void 0) throw new Error("dsh-providers: no settings provider is mounted, so the provider route cannot be written");
	const existing = storedRoutes(ctx)[providerId];
	const resolved = currentRoutes(ctx)[providerId];
	const ops = [{
		op: "set",
		path: [
			"providers",
			providerId,
			"apiKeyEnv"
		],
		value: ref
	}];
	if (displayName !== void 0 && existing?.displayName === void 0 && resolved?.displayName === void 0) ops.push({
		op: "set",
		path: [
			"providers",
			providerId,
			"displayName"
		],
		value: displayName
	});
	if (baseURL !== void 0 && existing?.baseURL === void 0 && resolved?.baseURL === void 0) ops.push({
		op: "set",
		path: [
			"providers",
			providerId,
			"baseURL"
		],
		value: baseURL
	});
	if (declared !== void 0) for (const [field, value] of Object.entries(routeProfile(declared))) {
		if (existing?.[field] !== void 0) continue;
		ops.push({
			op: "set",
			path: [
				"providers",
				providerId,
				field
			],
			value
		});
	}
	await settings.mutate(PI_AI_NS, ops);
}
/**
* The ops that replace every route this plugin owns for one provider with a
* planned set.
*
* Unlike {@link ensureRoute}, this OVERWRITES `api` and `models` — that is
* what a catalog refresh is for. `baseURL` is overwritten only when
* `reclaimBaseUrl` is set (endpoint discovery, where the user named the
* endpoint) or when the route has none: a refresh must not silently repoint a
* route the user aimed at a gateway. Other fields (a retry policy, a display
* name the user chose) are left alone, and an overflow route the new plan no
* longer needs is removed rather than left serving a protocol the provider
* dropped.
* @param specs - the planned routes, primary first.
*/
function routeOps(ctx, providerId, ref, specs, reclaimBaseUrl = false) {
	const stored = storedRoutes(ctx);
	const resolved = currentRoutes(ctx);
	const planned = new Set(specs.map((spec) => spec.routeId));
	const ops = [];
	for (const routeId of overflowRoutes(ctx, providerId, ref)) if (!planned.has(routeId)) ops.push({
		op: "unset",
		path: ["providers", routeId]
	});
	for (const spec of specs) {
		ops.push({
			op: "set",
			path: [
				"providers",
				spec.routeId,
				"apiKeyEnv"
			],
			value: ref
		});
		if (stored[spec.routeId]?.displayName === void 0 && resolved[spec.routeId]?.displayName === void 0) ops.push({
			op: "set",
			path: [
				"providers",
				spec.routeId,
				"displayName"
			],
			value: spec.displayName
		});
		if (spec.headers !== void 0 && stored[spec.routeId]?.headers === void 0 && resolved[spec.routeId]?.headers === void 0) ops.push({
			op: "set",
			path: [
				"providers",
				spec.routeId,
				"headers"
			],
			value: spec.headers
		});
		const storedBase = stored[spec.routeId]?.baseURL ?? resolved[spec.routeId]?.baseURL;
		const keepBase = !reclaimBaseUrl && typeof storedBase === "string" && storedBase.length > 0;
		for (const [field, value] of Object.entries(routeProfile(spec))) {
			if (field === "baseURL" && keepBase) continue;
			ops.push({
				op: "set",
				path: [
					"providers",
					spec.routeId,
					field
				],
				value
			});
		}
	}
	return ops;
}
/**
* Commit a batch of route operations as one settings mutation.
*
* One mutation rather than one per provider: the document carries a revision,
* so a page-level update writing forty providers one at a time would mean
* forty revisions, forty adapter re-registrations, and forty windows in which
* the picker sees a half-updated section.
*/
async function applyRouteOps(ctx, ops) {
	if (ops.length === 0) return;
	const settings = settingsOf(ctx);
	if (settings === void 0) throw new Error("dsh-providers: no settings provider is mounted, so the model routes cannot be written");
	await settings.mutate(PI_AI_NS, [...ops]);
}
/**
* The stored state of every route this plugin owns for one provider, taken
* before a write so the write can be undone exactly.
*
* Whole entries, not just the fields a write touches: a rollback must also
* remove a route the failed write created (recorded here as undefined) and
* put back every field of a route it deleted — `apiKeyEnv` included, which
* is what ownership inference reads.
* @returns entry per owned route key; undefined marks a key with no stored route.
*/
function routeSnapshot(ctx, providerId, ref) {
	const stored = storedRoutes(ctx);
	const snapshot = {};
	for (const routeId of ownedRouteKeys(ctx, providerId, ref)) snapshot[routeId] = stored[routeId];
	return snapshot;
}
/**
* The ops that put back exactly what {@link routeSnapshot} recorded: every
* key the snapshot covers or this plugin now owns is restored to its recorded
* entry, or removed when the snapshot recorded none.
*/
function snapshotOps(ctx, providerId, ref, snapshot) {
	const keys = new Set([...Object.keys(snapshot), ...ownedRouteKeys(ctx, providerId, ref)]);
	const ops = [];
	for (const routeId of keys) {
		const entry = snapshot[routeId];
		ops.push(entry === void 0 ? {
			op: "unset",
			path: ["providers", routeId]
		} : {
			op: "set",
			path: ["providers", routeId],
			value: entry
		});
	}
	return ops;
}
/** Whether one provider is served by routes this plugin wrote rather than by the adapter's installed catalog. */
function hasPinnedModels(ctx, providerId, ref) {
	if (overflowRoutes(ctx, providerId, ref).length > 0) return true;
	const models = storedRoutes(ctx)[providerId]?.models;
	return Array.isArray(models) && models.length > 0;
}
/**
* Remove one provider's routes entirely, overflow included.
*
* Signing out does NOT call this by default. A route outliving its credential
* is a state dsh already models — the reference resolves to nothing and the
* request fails with `MISSING_CREDENTIAL` naming the provider — whereas
* deleting it would also delete a `models` list, a gateway `baseURL`, or an
* api key the user configured through the shipped Models page under the same
* reference. Removal is something the user asks for explicitly.
*/
async function unroute(ctx, providerId, ref) {
	const settings = settingsOf(ctx);
	if (settings === void 0) return;
	const ops = overflowRoutes(ctx, providerId, ref).map((routeId) => ({
		op: "unset",
		path: ["providers", routeId]
	}));
	if (currentRoutes(ctx)[providerId] !== void 0) ops.push({
		op: "unset",
		path: ["providers", providerId]
	});
	if (ops.length === 0) return;
	await settings.mutate(PI_AI_NS, ops);
}

//#endregion
//#region src/store.ts
/** Owner-only permissions for a document holding refresh tokens. */
const FILE_MODE = 384;
/** Owner-only permissions for the directory this document is created in. */
const DIR_MODE = 448;
/** Permission bits outside the owner; a token document must have none of them. */
const GROUP_OTHER_BITS = 63;
/** How long a parsed document answers reads before it is re-read from disk. */
const READ_CACHE_MS = 50;
/** Whether an entry is a complete OAuth credential rather than api-key metadata. */
function isOAuthEntry(entry) {
	return entry?.type === "oauth";
}
/**
* Validate one reference name through the seam's own constructor, instead of
* casting: `envRefs` comes out of a user-editable document, and an invalid
* name written into the credentials file would fail plugin activation on the
* next boot.
* @returns the reference, or undefined for a name the seam cannot hold.
*/
function asRef(name) {
	try {
		return credentialRef(name);
	} catch {
		return;
	}
}
/**
* Narrow a token document other OS users can read, before reading its
* contents. This store creates and replaces the file at `0600`, but a
* hand-written or restored-from-backup one carries whatever umask produced
* it, and serving refresh tokens out of a world-readable file would defeat
* the promised mode. POSIX only: Windows has no mode to inspect.
*/
async function assertOwnerOnly(filename) {
	if (process.platform === "win32") return;
	let mode;
	try {
		mode = (await stat(filename)).mode;
	} catch (error) {
		if (error.code === "ENOENT") return;
		throw error;
	}
	if ((mode & GROUP_OTHER_BITS) === 0) return;
	await chmod(filename, FILE_MODE);
}
/**
* Credential storage for pi-ai, split between this plugin's token document and
* the harness credential seam.
*/
var AuthStore = class {
	/** @param providerIds - every provider id this store may be asked about; `list()` scans it. */
	constructor(authPath, keys, providerIds) {
		this.authPath = authPath;
		this.keys = keys;
		this.providerIds = providerIds;
	}
	/**
	* Most recent parse and when it was taken. Listing the accounts page asks
	* about every installed provider at once, and each question would otherwise
	* re-read the same document. A window this short cannot outlive a
	* user-visible state change, and every write path reads fresh under the lock.
	*/
	cached;
	/** Parse the document through the short read cache. */
	async load() {
		const now = Date.now();
		if (this.cached !== void 0 && now - this.cached.at < READ_CACHE_MS) return this.cached.document;
		const document = await this.loadFresh();
		this.cached = {
			document,
			at: now
		};
		return document;
	}
	/** Parse the document, treating an absent one as empty. */
	async loadFresh() {
		await assertOwnerOnly(this.authPath);
		let text;
		try {
			text = await readFile(this.authPath, "utf8");
		} catch (error) {
			if (error.code === "ENOENT") return {};
			throw error;
		}
		if (text.trim().length === 0) return {};
		const parsed = JSON.parse(text);
		if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error(`dsh-providers: ${this.authPath} is not a JSON object`);
		return parsed;
	}
	/** Replace the document atomically at owner-only permissions. */
	async save(document) {
		await writeFileAtomic(this.authPath, `${JSON.stringify(document, null, 2)}\n`, {
			mode: FILE_MODE,
			dirMode: DIR_MODE
		});
		this.cached = {
			document,
			at: Date.now()
		};
	}
	/** Take the cross-process document lock, creating its directory first. */
	async locked(operation) {
		await mkdir(dirname(this.authPath), {
			recursive: true,
			mode: DIR_MODE
		});
		return withFileLock(this.authPath, operation);
	}
	/** Assemble one api-key credential from the seam, or undefined when nothing is stored. */
	async readApiKey(providerId, record) {
		const key = await this.keys.readStoredKey(providerRef(providerId));
		const env = {};
		for (const name of record?.envRefs ?? []) {
			const ref = asRef(name);
			if (ref === void 0) continue;
			const value = await this.keys.readStoredKey(ref);
			if (value !== void 0) env[name] = value;
		}
		if (key === void 0) return void 0;
		return {
			type: "api_key",
			key,
			...Object.keys(env).length > 0 ? { env } : {}
		};
	}
	/** Read one provider's credential from whichever backing owns its kind. */
	async readEntry(document, providerId) {
		const entry = document[providerId];
		if (isOAuthEntry(entry)) return entry;
		return this.readApiKey(providerId, entry);
	}
	/** Commit one credential into whichever backing owns its kind. */
	async writeEntry(document, providerId, credential) {
		if (credential.type === "oauth") {
			const previous$1 = document[providerId];
			await this.keys.writeKey(providerRef(providerId), void 0);
			if (!isOAuthEntry(previous$1)) for (const name of previous$1?.envRefs ?? []) {
				const ref = asRef(name);
				if (ref !== void 0) await this.keys.writeKey(ref, void 0);
			}
			return {
				...document,
				[providerId]: credential
			};
		}
		await this.keys.writeKey(providerRef(providerId), credential.key);
		const envRefs = Object.keys(credential.env ?? {});
		for (const [name, value] of Object.entries(credential.env ?? {})) {
			const ref = asRef(name);
			if (ref === void 0) throw new Error(`dsh-providers: the ${providerId} login returned "${name}", which is not a storable credential reference name`);
			await this.keys.writeKey(ref, value);
		}
		const previous = document[providerId];
		if (!isOAuthEntry(previous)) for (const name of previous?.envRefs ?? []) {
			if (envRefs.includes(name)) continue;
			const ref = asRef(name);
			if (ref !== void 0) await this.keys.writeKey(ref, void 0);
		}
		return {
			...document,
			[providerId]: {
				type: "api_key",
				...envRefs.length > 0 ? { envRefs } : {}
			}
		};
	}
	/** Remove one provider from both backings. */
	async deleteEntry(document, providerId) {
		const entry = document[providerId];
		if (!isOAuthEntry(entry)) {
			await this.keys.writeKey(providerRef(providerId), void 0);
			for (const name of entry?.envRefs ?? []) {
				const ref = asRef(name);
				if (ref !== void 0) await this.keys.writeKey(ref, void 0);
			}
		}
		const { [providerId]: _removed,...kept } = document;
		return kept;
	}
	/** Read the stored credential, possibly expired; undefined when this plugin stores none. */
	async read(providerId, _options) {
		return this.readEntry(await this.load(), providerId);
	}
	/** One entry per provider this plugin has a credential for, without exposing secrets. */
	async list(_options) {
		const document = await this.load();
		const infos = [];
		const seen = /* @__PURE__ */ new Set();
		for (const [providerId, entry] of Object.entries(document)) if (isOAuthEntry(entry)) {
			infos.push({
				providerId,
				type: "oauth"
			});
			seen.add(providerId);
		}
		for (const providerId of this.providerIds()) {
			if (seen.has(providerId)) continue;
			if (await this.keys.readStoredKey(providerRef(providerId)) !== void 0) infos.push({
				providerId,
				type: "api_key"
			});
		}
		return infos;
	}
	/**
	* The only write path: a serialized read-modify-write under the document
	* lock. `Models.getAuth()` runs OAuth refresh inside this callback, which is
	* what makes a rotated token safe against concurrent requests — across
	* processes, not just within this one.
	* @param fn - receives the current credential and returns the next one, or
	*   undefined to leave it unchanged.
	*/
	async modify(providerId, fn, _options) {
		return this.locked(async () => {
			const document = await this.loadFresh();
			const current = await this.readEntry(document, providerId);
			const next = await fn(current);
			if (next === void 0) return current;
			await this.save(await this.writeEntry(document, providerId, next));
			return next;
		});
	}
	/** Remove a provider's credential from both backings. */
	async delete(providerId, _options) {
		await this.locked(async () => {
			await this.save(await this.deleteEntry(await this.loadFresh(), providerId));
		});
	}
	/**
	* Read one provider's stored OAuth credential without touching the seam.
	* The credential provider needs exactly this to decide whether a reference
	* is answered by a token or by its ordinary local layers.
	*/
	async readOAuth(providerId) {
		const entry = (await this.load())[providerId];
		return isOAuthEntry(entry) ? entry : void 0;
	}
	/** Every provider this plugin currently holds an OAuth credential for, in document order. */
	async oauthProviders() {
		return Object.entries(await this.load()).filter(([, entry]) => isOAuthEntry(entry)).map(([providerId]) => providerId);
	}
};

//#endregion
//#region src/credentials.ts
/** Basename of the token document inside the harness home. */
const AUTH_FILENAME = "auth.json";
/** Basename of the catalog cache beside it. */
const CATALOG_FILENAME = "model-catalog.json";
/**
* Protocols whose `/v1/models` listing the adapter's discovery can read.
* Knowing this here lets a card hide the button instead of offering one that
* always fails.
*/
const LISTABLE_PROTOCOLS = new Set(["openai-completions", "openai-responses"]);
/**
* Catalog requests in flight at once during a page-level update. The
* bottleneck is per-request latency, so eight is plenty — and kinder to a
* service nobody here operates than forty would be.
*/
const CATALOG_FETCH_CONCURRENCY = 8;
/**
* Run one operation over every item with a bounded number in flight.
* @returns the results in input order, so a caller can pair them up positionally.
*/
async function mapConcurrent(items, limit, operation) {
	const results = Array.from({ length: items.length });
	let next = 0;
	const worker = async () => {
		for (;;) {
			const index = next++;
			if (index >= items.length) return;
			const item = items[index];
			if (item === void 0) continue;
			results[index] = await operation(item);
		}
	};
	await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
	return results;
}
/** How many models a set of route specs serves in total. */
function countModels(specs) {
	return specs.reduce((total, spec) => total + spec.models.length, 0);
}
/** Source label reported for a reference answered by a signed-in account. */
const OAUTH_SOURCE = "oauth";
/** How long a freshly written route is given to become a live LLM route. */
const ROUTE_ACTIVATION_TIMEOUT_MS = 2e3;
/** Interval between checks while waiting for that activation. */
const ROUTE_ACTIVATION_POLL_MS = 50;
/**
* The bearer token inside a resolved auth, when that is the WHOLE credential:
* exactly one header, `Authorization: Bearer <token>`, no api key and no env
* extras. Kimi Code's subscription auth has this shape.
*
* The token is usable through the single-string credential seam because the
* adapter's anthropic transport sends the resolved string as `x-api-key` —
* and the endpoint accepts the subscription token under that header too
* (verified live against `api.kimi.com/coding`: both spellings answer 200,
* no auth answers 401). A credential with anything more than this one header
* stays unroutable.
*/
function soleBearerToken(auth) {
	if (auth === void 0) return void 0;
	const apiKey = auth.auth.apiKey;
	if (apiKey !== void 0 && apiKey.length > 0) return void 0;
	if (Object.keys(auth.env ?? {}).length > 0) return void 0;
	const headers = Object.entries(auth.auth.headers ?? {});
	const [header] = headers;
	if (headers.length !== 1 || header === void 0) return void 0;
	const [name, value] = header;
	if (name.toLowerCase() !== "authorization" || typeof value !== "string") return void 0;
	return /^Bearer (.+)$/.exec(value)?.[1];
}
/** Whether a pi-ai failure means the OAuth refresh failed, so the fix is to sign in again. */
function isOAuthFailure(error) {
	return error?.code === "oauth";
}
/** Project one provider's auth methods, OAuth first so a subscription leads its card. */
function methodViews(provider) {
	const views = [];
	const oauth = provider.auth.oauth;
	if (oauth !== void 0) views.push({
		type: "oauth",
		name: oauth.name,
		...oauth.loginLabel === void 0 ? {} : { loginLabel: oauth.loginLabel },
		...oauth.isSubscription === void 0 ? {} : { subscription: oauth.isSubscription }
	});
	const apiKey = provider.auth.apiKey;
	if (apiKey?.login !== void 0) views.push({
		type: "api_key",
		name: apiKey.name
	});
	return views;
}
/**
* The credential provider (`ctx.credentials`) and account service
* (`ctx.providerAuth`) this plugin mounts in place of `dsh-credentials-local`.
* Both live in one class because the account service needs the store and the
* store needs the seam's local layers; splitting them would make the two
* inject each other.
*/
var AuthCredentialProvider = class extends LocalCredentialProvider {
	static Config = z.object({
		path: z.string(),
		dshHome: z.string(),
		watch: z.boolean().default(true),
		debounceMs: z.number().min(0).default(100),
		authPath: z.string(),
		catalogPath: z.string(),
		catalogBaseUrl: z.string(),
		autoRoute: z.boolean().default(true)
	});
	/** Token document, with the api-key half bridged back onto the seam. */
	store;
	/** The curated pi.dev catalog overlaid on this plugin's baked pi-ai data. */
	catalog;
	/** pi-ai's provider collection: login flows, refresh, and status checks. */
	models;
	/** Live login attempts. */
	sessions = new LoginSessions();
	/** Whether a sign-in writes the provider's `llm-pi-ai` route. */
	autoRoute;
	constructor(ctx, config) {
		super(ctx, config);
		this.autoRoute = config.autoRoute ?? true;
		const home = resolveDshHome(config.dshHome);
		const authPath = config.authPath === void 0 ? join(home, AUTH_FILENAME) : resolve(config.authPath);
		this.catalog = new RemoteCatalog(config.catalogPath === void 0 ? join(home, CATALOG_FILENAME) : resolve(config.catalogPath), getBuiltinModelDataGeneratedAt(), config.catalogBaseUrl);
		this.store = new AuthStore(authPath, this, () => this.providerIds());
		this.models = builtinModels({
			credentials: this.store,
			authContext: this.authContext()
		});
		ctx.provide("providerAuth", this.service());
		ctx.effect(() => () => {
			this.disposed = true;
			this.sessions.dispose();
		});
	}
	/** Set at plugin disposal; a mutation continuing past it must not write. */
	disposed = false;
	/** Tail of the serialized mutation queue. */
	mutations = Promise.resolve();
	/**
	* Run one mutating operation after every earlier one has finished.
	*
	* All mutations share one queue rather than a per-provider one because they
	* share state broader than a provider: route writes snapshot and batch the
	* whole `llm-pi-ai` section, so two interleaved write-verify-rollback
	* sequences (a sign-in during a page-level catalog update, a sign-out during
	* endpoint discovery) could roll each other's committed work back.
	*/
	serialize(operation) {
		const run = this.mutations.then(() => {
			if (this.disposed) throw new Error("dsh-providers: the plugin is unloading");
			return operation();
		});
		this.mutations = run.catch(() => {});
		return run;
	}
	/** Every installed pi-ai provider id. */
	providerIds() {
		return this.models.getProviders().map((provider) => provider.id);
	}
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
	authContext() {
		return {
			env: async (name) => {
				let ref;
				try {
					ref = credentialRef(name);
				} catch {
					return;
				}
				return (await this.localResolve(ref))?.value;
			},
			fileExists: async (path) => {
				const expanded = path.startsWith("~") ? join(homedir(), path.slice(1)) : path;
				if (!isAbsolute(expanded)) return false;
				try {
					await access(expanded);
					return true;
				} catch {
					return false;
				}
			}
		};
	}
	/** The seam's ordinary layered answer, skipping this class's account layer. */
	localResolve(ref) {
		return super.resolve(ref);
	}
	/** The provider id a reference belongs to, when a signed-in OAuth account owns it. */
	async accountProviderFor(ref) {
		for (const providerId of await this.store.oauthProviders()) if (providerRef(providerId) === ref) return providerId;
	}
	/**
	* Resolve one reference, answering from the signed-in account when one owns
	* it. Resolution stays per call, so a token pi-ai refreshes reaches the very
	* next request without a restart.
	*/
	async resolve(ref) {
		const local = await this.localResolve(ref);
		if (local?.source === "env") return local;
		const providerId = await this.accountProviderFor(ref);
		if (providerId === void 0) return local;
		const auth = await this.models.getAuth(providerId);
		const apiKey = auth?.auth.apiKey;
		if (apiKey !== void 0 && apiKey.length > 0) return {
			value: apiKey,
			source: OAUTH_SOURCE
		};
		const bearer = soleBearerToken(auth);
		if (bearer === void 0) return local;
		return {
			value: bearer,
			source: OAUTH_SOURCE
		};
	}
	/**
	* Describe one reference without exposing its value. A reference a
	* signed-in account owns reports unwritable — the seam's existing way of
	* saying "a higher source answers this" — so the shipped Models page renders
	* its key field read-only instead of letting a typed key silently lose to
	* the token.
	*/
	async describe(ref) {
		const local = await super.describe(ref);
		if (local.source === "env") return local;
		if (await this.accountProviderFor(ref) === void 0) return local;
		return {
			configured: true,
			source: OAUTH_SOURCE,
			writable: false
		};
	}
	/**
	* Store one value in the managed document. Refuses a reference a signed-in
	* account answers: the write would appear to succeed while resolution kept
	* returning the token.
	*/
	async set(ref, value) {
		const providerId = await this.accountProviderFor(ref);
		if (providerId !== void 0) throw new Error(`dsh-providers: "${ref}" is answered by the signed-in ${providerId} account; sign out of that provider before storing a key under this reference`);
		await super.set(ref, value);
	}
	/** Remove one reference, refusing one a signed-in account answers for the same reason {@link AuthCredentialProvider.set} does. */
	async unset(ref) {
		const providerId = await this.accountProviderFor(ref);
		if (providerId !== void 0) throw new Error(`dsh-providers: "${ref}" is answered by the signed-in ${providerId} account; sign out of that provider instead`);
		await super.unset(ref);
	}
	/**
	* The `KeyPort` read half: the managed document only.
	*
	* `LocalCredentialProvider` labels that layer `file`. Everything else it can
	* answer with — the process environment, a project or user `.env` — is
	* ambient: this plugin did not store it, so the store must not report it as
	* a credential of its own.
	*/
	async readStoredKey(ref) {
		const local = await this.localResolve(ref);
		return local?.source === "file" ? local.value : void 0;
	}
	/** The `KeyPort` write half; `undefined` removes the reference. */
	async writeKey(ref, value) {
		if (value === void 0 || value.length === 0) {
			if (await this.readStoredKey(ref) === void 0) return;
			await super.unset(ref);
			return;
		}
		await super.set(ref, value);
	}
	/** The account service published as `ctx.providerAuth`. */
	service() {
		return {
			listProviders: () => this.listProviders(),
			storedKey: (providerId) => this.storedKey(providerId),
			login: (providerId, method) => this.login(providerId, method),
			answer: (loginId, requestId, value) => this.sessions.answer(loginId, requestId, value),
			cancel: (loginId) => this.sessions.cancel(loginId),
			session: (loginId) => this.sessions.get(loginId),
			route: (providerId) => this.serialize(() => this.routeProvider(providerId)),
			refreshCatalog: (providerId, force) => this.serialize(() => this.refreshCatalog(providerId, force)),
			discoverEndpoint: (providerId, baseURL) => this.serialize(() => this.discoverEndpoint(providerId, baseURL)),
			logout: (providerId, removeRoute) => this.serialize(() => this.logout(providerId, removeRoute))
		};
	}
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
	async routedModels(providerId) {
		const llm = this.ctx.get("llm");
		if (llm === void 0) return void 0;
		const views = [];
		let answered = false;
		for (const routeId of ownedRouteKeys(this.ctx, providerId, providerRef(providerId))) {
			let models;
			try {
				models = await llm.listModels(routeId);
			} catch {
				continue;
			}
			answered = true;
			const api = routeApi(this.ctx, routeId);
			for (const model of models) views.push({
				id: model.id,
				name: model.name,
				route: routeId,
				...api === void 0 ? {} : { api },
				...model.inputModalities === void 0 ? {} : { input: [...model.inputModalities] }
			});
		}
		return answered ? views : void 0;
	}
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
	isDiscoverable(endpoint, primary, catalogued) {
		if (!LISTABLE_PROTOCOLS.has(primary.api)) return false;
		return endpoint !== void 0 && endpoint !== primary.baseURL || catalogued === 0;
	}
	/** Project one provider into its accounts-page row. */
	async providerView(provider, stored) {
		const ref = providerRef(provider.id);
		const credential = stored.get(provider.id);
		const merged = mergeModels(provider, await this.catalog.stored(provider.id));
		const primary = planRoutes(provider, merged)[0];
		const checkedAt = await this.catalog.checkedAt(provider.id);
		const endpoint = routeBaseUrl(this.ctx, provider.id);
		const view = {
			id: provider.id,
			displayName: provider.name,
			methods: methodViews(provider),
			...credential === void 0 ? {} : { credential },
			configured: false,
			ref,
			routed: isRouted(this.ctx, provider.id),
			...checkedAt === void 0 ? {} : { catalogCheckedAt: checkedAt },
			...primary === void 0 ? {} : {
				baseURL: endpoint ?? primary.baseURL,
				discoverable: this.isDiscoverable(endpoint, primary, merged.length)
			}
		};
		if (credential === "oauth") {
			const oauth = await this.store.readOAuth(provider.id);
			if (oauth !== void 0) view.expires = oauth.expires;
		}
		if (view.routed) {
			const models = await this.routedModels(provider.id);
			if (models !== void 0) view.models = models;
		}
		try {
			const check = await this.models.checkAuth(provider.id);
			if (check !== void 0) {
				view.configured = true;
				if (check.source !== void 0) view.source = check.source;
			}
		} catch (error) {
			view.error = isOAuthFailure(error) ? `${errorMessage(error)} — sign in again` : errorMessage(error);
		}
		return view;
	}
	/**
	* Every installed provider, in catalog order.
	*
	* Rows build concurrently: `providerView` ends in a `checkAuth`, which for
	* an ambient provider can walk a credential chain (AWS profiles, ADC files)
	* at real cost — forty of those in sequence is a page that takes seconds to
	* open, and the surface refetches this on every window focus.
	*/
	async listProviders() {
		const stored = /* @__PURE__ */ new Map();
		for (const info of await this.store.list()) stored.set(info.providerId, info.type);
		return mapConcurrent(this.models.getProviders(), CATALOG_FETCH_CONCURRENCY, (provider) => this.providerView(provider, stored));
	}
	/**
	* The key one provider's replace wizard may reveal: the managed document's
	* entry only, and only while that document — not an OAuth account — is what
	* answers the provider.
	*/
	async storedKey(providerId) {
		if ((await this.store.list()).find((entry) => entry.providerId === providerId)?.type !== "api_key") return {};
		const key = await this.readStoredKey(providerRef(providerId));
		return key === void 0 ? {} : { key };
	}
	/**
	* Start one login attempt. pi-ai owns the handshake; this only supplies the
	* interaction and, on success, makes the provider reachable.
	*/
	login(providerId, method) {
		return this.sessions.start(providerId, (interaction) => this.models.login(providerId, method, interaction), async (credential) => {
			if (!this.autoRoute) return;
			await this.serialize(() => this.routeProvider(providerId, credential));
		});
	}
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
	async assertRoutableAuth(providerId) {
		let auth;
		try {
			auth = await this.models.getAuth(providerId);
		} catch {
			return;
		}
		if (auth === void 0) return;
		if (soleBearerToken(auth) !== void 0) return;
		const extras = [...Object.keys(auth.auth.headers ?? {}).map((name) => `header "${name}"`), ...Object.keys(auth.env ?? {}).map((name) => `env "${name}"`)];
		if (extras.length === 0) return;
		const key = auth.auth.apiKey;
		if (key !== void 0 && key.length > 0) {
			this.ctx.logger.warn(`dsh-providers: ${providerId} resolves ${extras.join(", ")} beside its key; the llm route carries only the key, so requests may still be refused`);
			return;
		}
		throw new Error(`dsh-providers: ${providerId} authenticates with ${extras.join(", ")} rather than a single api key, which a dsh route cannot carry: its credential is one string handed to the provider's own key method. The sign-in itself succeeded and is stored; an api-key sign-in routes this provider today, and the stored credential waits for a dsh release whose adapter can attach request auth of this shape`);
	}
	/**
	* Point one provider's llm route at the reference this plugin answers,
	* putting back exactly what was stored before if the adapter cannot serve
	* the result — never deleting a route the user configured themselves.
	* @param credential - the credential just stored, when the caller has it; a
	*   repair from the page reads the stored one instead.
	*/
	async routeProvider(providerId, credential) {
		const ref = providerRef(providerId);
		await this.assertRoutableAuth(providerId);
		const stored = credential ?? await this.store.read(providerId);
		const provider = this.models.getProvider(providerId);
		const baseURL = stored === void 0 ? void 0 : await this.credentialBaseUrl(providerId, stored);
		const declared = provider === void 0 ? void 0 : soleRoute(provider, mergeModels(provider, await this.catalog.stored(providerId)));
		const snapshot = routeSnapshot(this.ctx, providerId, ref);
		try {
			await ensureRoute(this.ctx, providerId, ref, provider?.name, baseURL);
			if (await this.awaitLiveRoutes([providerId])) return;
		} catch (error) {
			if (declared === void 0) throw error;
		}
		if (declared !== void 0) try {
			await ensureRoute(this.ctx, providerId, ref, provider?.name, baseURL, declared);
			if (await this.awaitLiveRoutes([providerId])) return;
		} catch (error) {
			await applyRouteOps(this.ctx, snapshotOps(this.ctx, providerId, ref, snapshot));
			throw error;
		}
		await applyRouteOps(this.ctx, snapshotOps(this.ctx, providerId, ref, snapshot));
		throw new Error(`dsh-providers: the installed llm adapter cannot serve ${providerId}${declared === void 0 ? " — it speaks a wire protocol the adapter only reaches through its own catalog, which this dsh release does not carry" : " — even described in full"}, so its route was left as it was`);
	}
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
	async awaitLiveRoutes(routeIds) {
		const llm = this.ctx.get("llm");
		if (llm === void 0) return true;
		const deadline = Date.now() + ROUTE_ACTIVATION_TIMEOUT_MS;
		for (;;) {
			if ((await Promise.all(routeIds.map(async (routeId) => {
				try {
					await llm.listModels(routeId);
					return true;
				} catch {
					return false;
				}
			}))).every(Boolean)) return true;
			if (Date.now() >= deadline) return false;
			await new Promise((resolve$1) => setTimeout(resolve$1, ROUTE_ACTIVATION_POLL_MS));
		}
	}
	/**
	* The endpoint a credential itself decides, when its method derives one.
	* GitHub Copilot is the case: `toAuth` returns the account's base URL beside
	* the token, and the credential seam carries a value, not a URL.
	*/
	async credentialBaseUrl(providerId, credential) {
		if (credential.type !== "oauth") return void 0;
		const oauth = this.models.getProvider(providerId)?.auth.oauth;
		if (oauth === void 0) return void 0;
		try {
			return (await oauth.toAuth(credential)).baseUrl;
		} catch {
			return;
		}
	}
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
	async commitRoutes(commits) {
		const snapshots = commits.map((commit) => ({
			providerId: commit.providerId,
			ref: commit.ref,
			snapshot: routeSnapshot(this.ctx, commit.providerId, commit.ref)
		}));
		await applyRouteOps(this.ctx, commits.flatMap((commit) => routeOps(this.ctx, commit.providerId, commit.ref, commit.specs, commit.reclaimBaseUrl ?? false)));
		if (await this.awaitLiveRoutes(commits.flatMap((commit) => commit.specs.map((spec) => spec.routeId)))) return commits.reduce((total, commit) => total + countModels(commit.specs), 0);
		await applyRouteOps(this.ctx, snapshots.flatMap((entry) => snapshotOps(this.ctx, entry.providerId, entry.ref, entry.snapshot)));
		throw new Error("dsh-providers: the installed llm adapter would not serve the updated routes, so the previous ones were put back");
	}
	/**
	* Plan what one provider's catalog refresh should write, if anything.
	* @returns the report row, plus the commit when a write is actually needed —
	*   absent both for an up-to-date provider (writing a model list PINS the
	*   route off the adapter's catalog, so a no-op write would quietly stop the
	*   route from inheriting future catalog fixes) and for one with nothing
	*   routable.
	*/
	async planCatalogUpdate(provider, outcome) {
		const served = await this.routedModels(provider.id) ?? [];
		const specs = retainServed(planRoutes(provider, mergeModels(provider, outcome.models)), served);
		if (specs.length === 0) return { update: {
			provider: provider.id,
			count: served.length,
			changed: false
		} };
		const ref = providerRef(provider.id);
		const count = countModels(specs);
		const planned = specs.flatMap((spec) => spec.models.map((model) => model.id)).toSorted().join(" ");
		const serving = served.map((model) => model.id).toSorted().join(" ");
		if (!hasPinnedModels(this.ctx, provider.id, ref) && planned === serving) return { update: {
			provider: provider.id,
			count: served.length,
			changed: false
		} };
		return {
			update: {
				provider: provider.id,
				count,
				changed: outcome.changed || count !== served.length
			},
			commit: {
				providerId: provider.id,
				ref,
				specs
			}
		};
	}
	/**
	* Refresh model catalogs and rewrite the routes they describe. "Refresh"
	* means the curated catalog at pi.dev, not the provider's own listing.
	*
	* Fetching runs in parallel; writing is one batched mutation through
	* {@link AuthCredentialProvider.commitRoutes}. Per-provider fetch failures
	* are reported rather than thrown: one unreachable catalog is no reason to
	* leave the other thirty-nine stale.
	*/
	async refreshCatalog(providerId, force = false) {
		if (providerId !== void 0 && !isRouted(this.ctx, providerId)) throw new Error(`dsh-providers: ${providerId} has no llm route; sign in or wire it first`);
		const providers = providerId === void 0 ? this.models.getProviders().filter((provider) => isRouted(this.ctx, provider.id)) : this.models.getProviders().filter((provider) => provider.id === providerId);
		const errors = [];
		const fetched = await mapConcurrent(providers, CATALOG_FETCH_CONCURRENCY, async (provider) => {
			try {
				return {
					provider,
					outcome: await this.catalog.refresh(provider.id, { force })
				};
			} catch (error) {
				errors.push({
					provider: provider.id,
					message: errorMessage(error)
				});
				return;
			}
		});
		const updated = [];
		const commits = [];
		for (const entry of fetched) {
			if (entry === void 0) continue;
			const plan = await this.planCatalogUpdate(entry.provider, entry.outcome);
			updated.push(plan.update);
			if (plan.commit !== void 0) commits.push(plan.commit);
		}
		if (commits.length > 0) await this.commitRoutes(commits);
		return {
			updated,
			errors
		};
	}
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
	async discoverEndpoint(providerId, baseURL) {
		const llm = this.ctx.get("llm");
		if (llm === void 0) throw new Error("dsh-providers: no llm service is mounted");
		const provider = this.models.getProvider(providerId);
		if (provider === void 0) throw new Error(`dsh-providers: no provider named ${providerId}`);
		const merged = mergeModels(provider, await this.catalog.stored(providerId));
		const primary = planRoutes(provider, merged)[0];
		if (primary === void 0 || !LISTABLE_PROTOCOLS.has(primary.api)) throw new Error(`dsh-providers: ${providerId} speaks ${primary?.api ?? "no supported protocol"}, which has no model listing this build can read; use the catalog update instead`);
		const api = primary.api;
		const endpoint = baseURL !== void 0 && baseURL.trim().length > 0 ? baseURL.trim() : primary.baseURL;
		let target;
		try {
			target = new URL(endpoint);
		} catch {
			throw new Error(`dsh-providers: "${endpoint}" is not a valid endpoint URL`);
		}
		if (target.protocol !== "http:" && target.protocol !== "https:") throw new Error(`dsh-providers: endpoint discovery only speaks http(s), not ${target.protocol.slice(0, -1)}`);
		const trustedOrigins = /* @__PURE__ */ new Set();
		for (const known$1 of [primary.baseURL, routeBaseUrl(this.ctx, providerId)]) {
			if (known$1 === void 0) continue;
			try {
				trustedOrigins.add(new URL(known$1).origin);
			} catch {}
		}
		const auth = trustedOrigins.has(target.origin) ? await this.models.getAuth(providerId) : void 0;
		const discovered = await llm.discoverModels(PI_AI_NS, {
			baseURL: endpoint,
			api,
			...auth?.auth.apiKey === void 0 ? {} : { apiKey: auth.auth.apiKey }
		});
		if (discovered.length === 0) throw new Error(`dsh-providers: ${endpoint} reported no models, so the list was left unchanged`);
		const known = new Map(merged.map((model) => [model.id, model]));
		const spec = {
			routeId: providerId,
			api,
			baseURL: endpoint,
			displayName: provider.name,
			models: discovered.map((model) => {
				const base = known.get(model.id);
				const contextWindow = model.contextWindow ?? base?.contextWindow;
				const maxTokens = model.maxTokens ?? base?.maxTokens;
				const input = base?.input;
				return {
					id: model.id,
					name: model.name ?? base?.name ?? model.id,
					...contextWindow === void 0 ? {} : { contextWindow },
					...maxTokens === void 0 ? {} : { maxTokens },
					...input === void 0 ? {} : { input: [...input] }
				};
			})
		};
		await this.commitRoutes([{
			providerId,
			ref: providerRef(providerId),
			specs: [spec],
			reclaimBaseUrl: true
		}]);
		return discovered.length;
	}
	/** Remove a provider's credential, optionally removing its llm routes too. */
	async logout(providerId, removeRoute = false) {
		await this.models.logout(providerId);
		if (removeRoute) await unroute(this.ctx, providerId, providerRef(providerId));
	}
};
var credentials_default = AuthCredentialProvider;

//#endregion
export { PROVIDERS_ROUTE_PREFIX, credentials_default as default };
//# sourceMappingURL=index.js.map