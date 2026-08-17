import { supportedProtocols } from "@deepseek-ai/dsh-llm-pi-ai";

//#region src/errors.ts
/** Human text for a failure, without leaking a stack into a UI or an HTTP body. */
function errorMessage(error) {
	return error instanceof Error ? error.message : String(error);
}
/**
* A refusal the client caused. The HTTP layer answers it 400 rather than 500,
* so a validation message reads as "fix the input", not "the Host broke".
*/
var BadRequest = class extends Error {};

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
export { retainServed as a, BadRequest as c, planRoutes as i, errorMessage as l, SUFFIX_PROTOCOLS as n, routeProfile as o, mergeModels as r, soleRoute as s, OVERFLOW_SUFFIXES as t };
//# sourceMappingURL=catalog-BV3bBZ_P.js.map