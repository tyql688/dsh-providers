import { c as BadRequest, l as errorMessage, t as OVERFLOW_SUFFIXES } from "./catalog-BV3bBZ_P.js";
import { t as PROVIDERS_ROUTE_PREFIX } from "./wire-ag4RQFWe.js";
import { stat } from "node:fs/promises";
import { homedir } from "node:os";
import { builtinModels } from "@earendil-works/pi-ai/providers/all";
import { foldSessionTitle } from "@deepseek-ai/dsh-session-title";

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
//#region src/usage.ts
const KEY_SEPARATOR = " ";
const keyOf = (provider, model) => `${provider}${KEY_SEPARATOR}${model}`;
const emptyBuckets = () => ({
	inputTokens: 0,
	outputTokens: 0,
	cacheReadTokens: 0,
	cacheWriteTokens: 0,
	reasoningTokens: 0,
	cost: 0,
	cacheSavings: 0,
	totalDurationMs: 0,
	maxDurationMs: 0,
	unpricedTokens: 0,
	calls: 0
});
const bucketTotal = (buckets) => buckets.inputTokens + buckets.outputTokens + buckets.cacheReadTokens + buckets.cacheWriteTokens;
/** Format one epoch-ms instant as the host-local `YYYY-MM-DD` day it falls in. */
function localDate(time) {
	const at = new Date(time);
	const month = String(at.getMonth() + 1).padStart(2, "0");
	const day = String(at.getDate()).padStart(2, "0");
	return `${at.getFullYear()}-${month}-${day}`;
}
/**
* Start of the host-local day `daysBack` days before today (0 = today),
* epoch ms. Stepped on the calendar, not by fixed 24h spans: a DST change
* inside the window would otherwise shift every earlier midnight by an hour
* and mislabel the buckets.
*/
function dayStart(daysBack) {
	const at = /* @__PURE__ */ new Date();
	at.setHours(0, 0, 0, 0);
	at.setDate(at.getDate() - daysBack);
	return at.getTime();
}
/** How long a session title may grow before truncation. */
const TITLE_MAX = 48;
/**
* How many sessions the response's heaviest-sessions list carries. The list
* also feeds the dialog's drill-downs (by model / provider / project / day),
* so it must reach well past the "recent sessions" panel's few display rows —
* a light model whose sessions all fell under a small cap would drill into an
* empty list.
*/
const MAX_SESSION_ROWS = 60;
/** How many steps the session timeline carries (most recent); `stepsTotal`
* in the response tells the client when the timeline is a tail view. */
const MAX_SESSION_STEPS = 480;
/**
* One turn's contribution to the active-time figure is capped at an hour: a
* crash-interrupted turn is closed by the RELOAD, so its raw span measures
* the downtime between sessions, not work. Real turns that long are rare
* enough that the cap costs nothing.
*/
const TURN_CAP_MS = 3600 * 1e3;
/** One day in epoch ms, for the all-time span estimate. */
const DAY_MS = 1440 * 60 * 1e3;
/** Midnight (epoch ms) of the host-local day `time` falls in. */
function midnightOf(time) {
	const at = new Date(time);
	at.setHours(0, 0, 0, 0);
	return at.getTime();
}
/**
* Activity calendar week count: 53 ≈ one year plus a boundary week, the same
* order as GitHub's contribution graph. The calendar grid always spans this
* many weeks, independent of the requested window.
*/
const HEATMAP_WEEKS = 53;
/** Widest span the `all` range may cover; a year of daily data is plenty. */
const ALL_MAX_DAYS = 366;
/** How many trailing days the week-hour heatmap always spans. */
const HOUR_SPAN = 7;
/** The Monday `weeks` weeks before this week's Monday, epoch ms (local). */
function mondayWeeksBack(weeks) {
	const today = /* @__PURE__ */ new Date();
	today.setHours(0, 0, 0, 0);
	const weekday = (today.getDay() + 6) % 7;
	return new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekday - weeks * 7).getTime();
}
/**
* The session's first user text, whitespace-collapsed and truncated — the
* row a "recent sessions" table can actually read. Only text blocks count;
* the content block map is merge-extensible, so the shape is guarded.
*/
function sessionTitle(events) {
	for (const event of events) {
		if (event.type !== "user/message") continue;
		for (const block of event.data.content) {
			if (block.type !== "text" || typeof block.text !== "string") continue;
			const text = block.text.trim().replace(/\s+/g, " ");
			if (text.length === 0) continue;
			return text.length <= TITLE_MAX ? text : `${text.slice(0, TITLE_MAX)}…`;
		}
	}
	return null;
}
/**
* Harvest delegation display names from one session log into `into`: the
* `subagent` tool call carries the parent-chosen `description`, and its
* result text names the child session it started ("started subagent <id>").
* That description is the name the UI's subagent surfaces display — child
* logs themselves never carry it (auto-titling skips delegated sessions).
*/
function harvestDelegationLabels(events, into) {
	const pending = /* @__PURE__ */ new Map();
	for (const event of events) {
		if (event.type === "tool/call" && event.data.name === "subagent") {
			const rawArguments = event.data.arguments;
			if (typeof rawArguments !== "string") continue;
			try {
				const parsed = JSON.parse(rawArguments);
				if (typeof parsed.description === "string") pending.set(event.data.callId, parsed.description);
			} catch {}
			continue;
		}
		if (event.type !== "tool/result") continue;
		const block = event.data.message.content[0];
		const description = pending.get(block.toolCallId);
		if (description === void 0) continue;
		const pieces = block.content ?? [];
		for (const piece of pieces) {
			if (typeof piece.text !== "string") continue;
			const match = /started subagent (\S+)/.exec(piece.text);
			if (match !== null) into.set(match[1], description);
		}
	}
}
/**
* The path with the host's home directory as `~` — the display form of the
* session panel's cwd. Only the panel gets it: the window response keeps raw
* cwds, which the drill-down filter compares by equality.
*/
function tildify(path) {
	const home = homedir();
	if (path === home) return "~";
	for (const separator of ["/", "\\"]) if (path.startsWith(home + separator)) return `~${separator}${path.slice(home.length + 1)}`;
	return path;
}
/** The map's seat for `key`, created on first touch. */
function seat(map, key, make) {
	let value = map.get(key);
	if (value === void 0) {
		value = make();
		map.set(key, value);
	}
	return value;
}
/**
* Fold one session log into its digest.
*
* Usage arrives twice per step at most — usage chunks while streaming, then
* the assembled message's final accounting — so samples are keyed by
* `(turn, step)` and the last one wins, exactly as the `tokenUsage`
* projection de-duplicates them. The route attribution rides the last
* `request/header`, which the loop appends inside the step before dispatch.
* Tool errors join their call through the result block's `toolCallId`.
*/
function foldLog(events, cwd, price, collectSteps = false) {
	const samples = /* @__PURE__ */ new Map();
	const callNames = /* @__PURE__ */ new Map();
	const stepStarts = /* @__PURE__ */ new Map();
	const turnStarts = /* @__PURE__ */ new Map();
	const digest = {
		models: /* @__PURE__ */ new Map(),
		tools: /* @__PURE__ */ new Map(),
		hours: /* @__PURE__ */ new Map(),
		activity: /* @__PURE__ */ new Map(),
		cwd,
		title: null,
		delegations: /* @__PURE__ */ new Map()
	};
	harvestDelegationLabels(events, digest.delegations);
	digest.title = foldSessionTitle(events)?.title ?? sessionTitle(events);
	let provider = "";
	let model = "";
	let contextWindow = null;
	for (const event of events) {
		if (event.type === "step/start") {
			stepStarts.set(`${event.data.turn}:${event.data.step}`, event.time);
			continue;
		}
		if (event.type === "turn/start") {
			turnStarts.set(event.data.turn, event.time);
			continue;
		}
		if (event.type === "turn/end") {
			const date = localDate(event.time);
			const day = seat(digest.activity, date, () => ({
				activeMs: 0,
				failed: 0
			}));
			const started = turnStarts.get(event.data.turn);
			if (started !== void 0) day.activeMs += Math.min(Math.max(event.time - started, 0), TURN_CAP_MS);
			if (event.data.reason.kind !== "completed") day.failed += 1;
			continue;
		}
		if (event.type === "request/context") {
			contextWindow = event.data.contextWindow ?? null;
			continue;
		}
		if (event.type === "request/header") {
			provider = event.data.header.config.provider;
			model = event.data.header.config.model;
			continue;
		}
		if (event.type === "tool/call") {
			callNames.set(event.data.callId, event.data.name);
			const tools = seat(digest.tools, localDate(event.time), () => /* @__PURE__ */ new Map());
			seat(tools, event.data.name, () => ({
				calls: 0,
				errors: 0
			})).calls += 1;
			continue;
		}
		if (event.type === "tool/result") {
			const block = event.data.message.content[0];
			if (!(event.data.error !== void 0 || block.isError === true)) continue;
			const name$1 = callNames.get(block.toolCallId);
			if (name$1 === void 0) continue;
			const tools = seat(digest.tools, localDate(event.time), () => /* @__PURE__ */ new Map());
			seat(tools, name$1, () => ({
				calls: 0,
				errors: 0
			})).errors += 1;
			continue;
		}
		let usage;
		let key;
		if (event.type === "assistant/chunk" && event.data.chunk.type === "usage") {
			usage = event.data.chunk.usage;
			key = `${event.data.turn}:${event.data.step}`;
		} else if (event.type === "assistant/message" && event.data.usage !== void 0) {
			usage = event.data.usage;
			key = `${event.data.turn}:${event.data.step}`;
		} else continue;
		const at = new Date(event.time);
		samples.set(key, {
			date: localDate(event.time),
			hour: at.getHours(),
			turn: event.data.turn,
			step: event.data.step,
			provider,
			model,
			inputTokens: usage.inputTokens,
			outputTokens: usage.outputTokens,
			cacheReadTokens: usage.cacheReadTokens ?? 0,
			cacheWriteTokens: usage.cacheWriteTokens ?? 0,
			reasoningTokens: usage.reasoningTokens ?? 0,
			stepStart: stepStarts.get(key) ?? null,
			contextWindow,
			time: event.time
		});
	}
	let contextPeak = null;
	for (const sample of samples.values()) {
		const prompt = sample.inputTokens + sample.cacheReadTokens + sample.cacheWriteTokens;
		if (contextPeak === null || prompt > contextPeak.tokens) contextPeak = {
			tokens: prompt,
			window: sample.contextWindow
		};
	}
	for (const sample of samples.values()) {
		const buckets = seat(seat(digest.models, sample.date, () => /* @__PURE__ */ new Map()), keyOf(sample.provider, sample.model), emptyBuckets);
		buckets.inputTokens += sample.inputTokens;
		buckets.outputTokens += sample.outputTokens;
		buckets.cacheReadTokens += sample.cacheReadTokens;
		buckets.cacheWriteTokens += sample.cacheWriteTokens;
		buckets.reasoningTokens += sample.reasoningTokens;
		buckets.calls += 1;
		if (sample.stepStart !== null) {
			const duration = Math.max(0, sample.time - sample.stepStart);
			buckets.totalDurationMs += duration;
			buckets.maxDurationMs = Math.max(buckets.maxDurationMs, duration);
		}
		price(sample, buckets);
		const slot = seat(digest.hours, sample.date, () => Array.from({ length: 24 }, () => [0, 0]))[sample.hour];
		slot[0] += sample.inputTokens + sample.outputTokens + sample.cacheReadTokens + sample.cacheWriteTokens;
		slot[1] += 1;
	}
	return {
		digest,
		steps: collectSteps ? buildSteps(samples, price) : [],
		stepsTotal: samples.size,
		contextPeak
	};
}
/**
* The per-step timeline: the deduped samples, oldest first, each priced into
* a scratch bucket by the same callback the totals use — so the steps' cost
* can never disagree with the session's sum.
*/
function buildSteps(samples, price) {
	return [...samples.values()].toSorted((a, b) => a.time - b.time).slice(-MAX_SESSION_STEPS).map((sample) => {
		const scratch = emptyBuckets();
		price(sample, scratch);
		return {
			turn: sample.turn,
			step: sample.step,
			time: sample.time,
			durationMs: sample.stepStart === null ? null : Math.max(0, sample.time - sample.stepStart),
			provider: sample.provider,
			model: sample.model,
			inputTokens: sample.inputTokens,
			outputTokens: sample.outputTokens,
			cacheReadTokens: sample.cacheReadTokens,
			cacheWriteTokens: sample.cacheWriteTokens,
			reasoningTokens: sample.reasoningTokens,
			cost: scratch.cost
		};
	});
}
/** Add one bucket set into another. */
function addBuckets(into, from) {
	into.inputTokens += from.inputTokens;
	into.outputTokens += from.outputTokens;
	into.cacheReadTokens += from.cacheReadTokens;
	into.cacheWriteTokens += from.cacheWriteTokens;
	into.reasoningTokens += from.reasoningTokens;
	into.cost += from.cost;
	into.cacheSavings += from.cacheSavings;
	into.totalDurationMs += from.totalDurationMs;
	into.maxDurationMs = Math.max(into.maxDurationMs, from.maxDurationMs);
	into.unpricedTokens += from.unpricedTokens;
	into.calls += from.calls;
}
/**
* Accumulates digests into one window's every grouping. The day axis always
* spans the fixed 53-week calendar grid (Monday-aligned, zero-filled before
* the requested span), the response's `days` field is the last `spanDays` of
* it, and every grouping — models, tools, projects, sessions, week hours —
* aggregates over only the LAST `windowDays` days of the axis.
*/
var WindowView = class {
	dates;
	indexOfDate = /* @__PURE__ */ new Map();
	days = [];
	/** First day index whose data feeds the groupings. */
	windowStart;
	/** First day index whose hour slots feed the week heatmap: the scan span's
	* trailing week, independent of the window — the overview's 时段分布 must
	* always show the same seven-day rhythm, even when the window is today. */
	hourStart;
	/** How many trailing axis days the response's `days` field carries. */
	spanDays;
	/** How many trailing days feed the groupings and the week-hour heatmap. */
	windowDays;
	models = /* @__PURE__ */ new Map();
	tools = /* @__PURE__ */ new Map();
	projects = /* @__PURE__ */ new Map();
	hoursByDate = /* @__PURE__ */ new Map();
	sessionRows = /* @__PURE__ */ new Map();
	perDate = /* @__PURE__ */ new Map();
	sessions = /* @__PURE__ */ new Set();
	/** Child session id → delegation description, across every merged digest. */
	delegationLabels = /* @__PURE__ */ new Map();
	constructor(spanDays, windowDays) {
		this.spanDays = spanDays;
		this.windowDays = windowDays;
		const axisStart = new Date(Math.min(dayStart(spanDays - 1), mondayWeeksBack(HEATMAP_WEEKS - 1)));
		axisStart.setDate(axisStart.getDate() - (axisStart.getDay() + 6) % 7);
		const cursor = axisStart;
		const end = dayStart(0);
		this.dates = /* @__PURE__ */ new Set();
		let index = 0;
		while (cursor.getTime() <= end) {
			const date = localDate(cursor.getTime());
			const day = {
				date,
				...emptyBuckets(),
				toolCalls: 0,
				failedTurns: 0,
				activeMs: 0,
				byModel: []
			};
			this.dates.add(date);
			this.indexOfDate.set(date, index);
			this.days.push(day);
			this.perDate.set(date, {
				day,
				byModel: /* @__PURE__ */ new Map(),
				sessions: /* @__PURE__ */ new Set()
			});
			index += 1;
			cursor.setDate(cursor.getDate() + 1);
		}
		this.windowStart = index - windowDays;
		this.hourStart = Math.max(0, index - Math.min(HOUR_SPAN, spanDays));
	}
	/** Merge one session's digest. The day axis spans the whole span (the
	* preceding period must carry real figures for the deltas), while the
	* groupings — sessions, models, projects, tools, hours — count only the
	* window's days. */
	add(sessionId, digest, subagent = false) {
		for (const [child, label] of digest.delegations) this.delegationLabels.set(child, label);
		for (const [date, models] of digest.models) {
			const slot = this.perDate.get(date);
			if (slot === void 0) continue;
			const inWindow = (this.indexOfDate.get(date) ?? -1) >= this.windowStart;
			for (const [modelKey, buckets] of models) {
				addBuckets(slot.day, buckets);
				if (!inWindow) continue;
				this.sessions.add(sessionId);
				let session = this.sessionRows.get(sessionId);
				if (session === void 0) {
					session = {
						title: digest.title,
						cwd: digest.cwd,
						lastDate: date,
						buckets: emptyBuckets(),
						models: /* @__PURE__ */ new Set(),
						dates: /* @__PURE__ */ new Set(),
						subagent
					};
					this.sessionRows.set(sessionId, session);
				}
				if (date > session.lastDate) session.lastDate = date;
				session.models.add(modelKey);
				session.dates.add(date);
				addBuckets(session.buckets, buckets);
				slot.byModel.set(modelKey, (slot.byModel.get(modelKey) ?? 0) + bucketTotal(buckets));
				addBuckets(seat(this.models, modelKey, emptyBuckets), buckets);
				addBuckets(seat(this.projects, digest.cwd, emptyBuckets), buckets);
			}
		}
		for (const [date, tools] of digest.tools) {
			const slot = this.perDate.get(date);
			if (slot === void 0) continue;
			const inWindow = (this.indexOfDate.get(date) ?? -1) >= this.windowStart;
			for (const [name$1, row] of tools) {
				slot.day.toolCalls += row.calls;
				if (!inWindow) continue;
				const toolSum = seat(this.tools, name$1, () => ({
					calls: 0,
					errors: 0
				}));
				toolSum.calls += row.calls;
				toolSum.errors += row.errors;
			}
		}
		for (const [date, activity] of digest.activity) {
			const slot = this.perDate.get(date);
			if (slot === void 0) continue;
			slot.day.activeMs += activity.activeMs;
			slot.day.failedTurns += activity.failed;
		}
		for (const [date, hours] of digest.hours) {
			if (!this.dates.has(date)) continue;
			if ((this.indexOfDate.get(date) ?? -1) < this.hourStart) continue;
			let slots = this.hoursByDate.get(date);
			if (slots === void 0) {
				slots = Array.from({ length: 24 }, () => [0, 0]);
				this.hoursByDate.set(date, slots);
			}
			for (let hour = 0; hour < 24; hour += 1) {
				slots[hour][0] += hours[hour][0];
				slots[hour][1] += hours[hour][1];
			}
		}
	}
	finish(skippedSessions) {
		for (const slot of this.perDate.values()) slot.day.byModel = [...slot.byModel].map(([modelKey, tokens]) => {
			const separator = modelKey.indexOf(KEY_SEPARATOR);
			return {
				provider: modelKey.slice(0, separator),
				model: modelKey.slice(separator + 1),
				tokens
			};
		}).toSorted((a, b) => b.tokens - a.tokens);
		const models = [...this.models].map(([modelKey, buckets]) => {
			const separator = modelKey.indexOf(KEY_SEPARATOR);
			return {
				provider: modelKey.slice(0, separator),
				model: modelKey.slice(separator + 1),
				...buckets
			};
		}).toSorted((a, b) => bucketTotal(b) - bucketTotal(a));
		const tools = [...this.tools].map(([name$1, row]) => ({
			name: name$1,
			...row
		})).toSorted((a, b) => b.calls - a.calls);
		const projects = [...this.projects].map(([cwd, buckets]) => ({
			cwd,
			...buckets
		})).toSorted((a, b) => bucketTotal(b) - bucketTotal(a));
		const sessions = [...this.sessionRows].map(([id, row]) => ({
			id,
			title: this.delegationLabels.get(id) ?? row.title,
			cwd: row.cwd,
			subagent: row.subagent,
			lastDate: row.lastDate,
			dates: [...row.dates].toSorted(),
			models: [...row.models].toSorted(),
			...row.buckets
		})).toSorted((a, b) => bucketTotal(b) - bucketTotal(a)).slice(0, MAX_SESSION_ROWS);
		const weekHours = this.days.slice(-Math.min(HOUR_SPAN, this.spanDays)).map((day) => {
			const slots = this.hoursByDate.get(day.date);
			return {
				date: day.date,
				hours: Array.from({ length: 24 }, (_, hour) => {
					const [tokens, calls] = slots?.[hour] ?? [0, 0];
					return {
						hour,
						tokens,
						calls
					};
				})
			};
		});
		return {
			days: this.days.slice(-this.spanDays),
			models,
			tools,
			projects,
			sessions,
			weekHours,
			heatmap: this.days,
			sessionCount: this.sessions.size,
			skippedSessions
		};
	}
};
/**
* Bumped when the fold's output shape changes: the digest cache's fingerprint
* incorporates it, so a deploy with new fold fields never replays a digest
* folded by the old code.
*/
const FOLD_VERSION = 5;
/**
* Folds the whole session corpus into window views, with a per-session
* digest cache over the persisted majority. One instance lives as long as
* the routes row; the cache is memory only and rebuilt on reload.
*/
var UsageCollector = class {
	cache = /* @__PURE__ */ new Map();
	/** In-flight `collect` promises per span key, so concurrent asks share one scan. */
	inflight = /* @__PURE__ */ new Map();
	/** The installed pi-ai catalog, opened once on first pricing. */
	catalog;
	constructor(ctx) {
		this.ctx = ctx;
	}
	/**
	* The last `days` host-local days, oldest first, today always last; the
	* groupings aggregate over only the last `windowDays` of them. Concurrent
	* calls for the same span collapse into one scan: the card's beat and the
	* dialog's open may land in the same tick, and re-scanning the corpus for
	* each would multiply the work instead of sharing it.
	*/
	collect(days, windowDays = days) {
		const key = `${days}:${windowDays}`;
		const running = this.inflight.get(key);
		if (running !== void 0) return running;
		const run = (async () => {
			try {
				return await this.scan(days, windowDays);
			} finally {
				this.inflight.delete(key);
			}
		})();
		this.inflight.set(key, run);
		return run;
	}
	/**
	* The `all` range: one extra listing pass finds the earliest session
	* creation, then the span covers from there to today, capped at a year
	* (`ALL_MAX_DAYS`) — a year of daily data is plenty for every surface, and
	* the calendar grid is fixed at 53 weeks regardless.
	*/
	async collectAll() {
		const query = this.ctx.get("sessionQuery");
		if (query === void 0) throw new Error("session query is not available in this composition");
		const records = await query.listSessions();
		let earliest = Infinity;
		for (const record of records) {
			const created = record.header.createdAt;
			if (typeof created === "number" && created < earliest) earliest = created;
		}
		const span = Number.isFinite(earliest) ? Math.min(ALL_MAX_DAYS, Math.round((dayStart(0) - midnightOf(earliest)) / DAY_MS) + 1) : 1;
		return this.collect(span, span);
	}
	/**
	* One session's full accounting for the session-stats surface: totals, the
	* per-model split, and the per-step timeline — the session folded TOGETHER
	* with its known descendant (subagent) sessions, so the parent's figures
	* carry the whole delegation tree. Each log folds fresh — a handful of
	* session reads, cheap enough to skip the digest cache — and the steps
	* price with the same callback as the totals. Descendant steps join the
	* timeline flagged `subagent`; each descendant's own share lands in the
	* `subagents` rows.
	* @returns null when no such session exists.
	*/
	async sessionUsage(id) {
		const query = this.ctx.get("sessionQuery");
		if (query === void 0) throw new Error("session query is not available in this composition");
		const records = await query.listSessions();
		if (!records.some((record) => record.header.id === id)) return null;
		const children = /* @__PURE__ */ new Map();
		const headers = /* @__PURE__ */ new Map();
		for (const record of records) {
			headers.set(record.header.id, record.header);
			const parent = record.header.parentSession;
			if (parent === void 0 || record.header.origin !== "subagent") continue;
			seat(children, parent, () => []).push(record.header.id);
		}
		const order = [id];
		const seen = new Set([id]);
		for (let index = 0; index < order.length; index += 1) for (const child of children.get(order[index]) ?? []) {
			if (seen.has(child)) continue;
			seen.add(child);
			order.push(child);
		}
		const log = await query.readSession(id);
		const { digest, steps, stepsTotal, contextPeak } = foldLog(log.events, log.session.cwd ?? null, (sample, buckets) => this.price(sample, buckets), true);
		const delegationLabels = new Map(digest.delegations);
		const ownHeader = headers.get(id);
		if (ownHeader?.origin === "subagent" && ownHeader.parentSession !== void 0) try {
			harvestDelegationLabels((await query.readSession(ownHeader.parentSession)).events, delegationLabels);
		} catch {}
		const totals = emptyBuckets();
		const byModel = /* @__PURE__ */ new Map();
		const toolTotals = /* @__PURE__ */ new Map();
		for (const models$1 of digest.models.values()) for (const [modelKey, buckets] of models$1) {
			addBuckets(totals, buckets);
			addBuckets(seat(byModel, modelKey, emptyBuckets), buckets);
		}
		for (const dayTools of digest.tools.values()) for (const [name$1, row] of dayTools) {
			const entry = seat(toolTotals, name$1, () => ({
				calls: 0,
				errors: 0
			}));
			entry.calls += row.calls;
			entry.errors += row.errors;
		}
		const subagents = [];
		for (const childId of order.slice(1)) {
			let childLog;
			try {
				childLog = await query.readSession(childId);
			} catch {
				continue;
			}
			const child = foldLog(childLog.events, childLog.session.cwd ?? null, (sample, buckets) => this.price(sample, buckets));
			for (const [grandchild, label] of child.digest.delegations) delegationLabels.set(grandchild, label);
			const share = emptyBuckets();
			for (const models$1 of child.digest.models.values()) for (const buckets of models$1.values()) addBuckets(share, buckets);
			if (share.calls === 0) continue;
			subagents.push({
				id: childId,
				agentPreset: headers.get(childId)?.agentPreset ?? null,
				title: delegationLabels.get(childId) ?? sessionTitle(childLog.events) ?? child.digest.title,
				inputTokens: share.inputTokens,
				outputTokens: share.outputTokens,
				cacheReadTokens: share.cacheReadTokens,
				cacheWriteTokens: share.cacheWriteTokens,
				cost: share.cost,
				calls: share.calls
			});
		}
		subagents.sort((a, b) => bucketTotal(b) - bucketTotal(a));
		const tools = [...toolTotals].map(([name$1, row]) => ({
			name: name$1,
			calls: row.calls,
			errors: row.errors
		})).toSorted((a, b) => b.calls - a.calls);
		const toolCalls = tools.reduce((sum, row) => sum + row.calls, 0);
		const models = [...byModel].map(([modelKey, buckets]) => {
			const separator = modelKey.indexOf(KEY_SEPARATOR);
			return {
				provider: modelKey.slice(0, separator),
				model: modelKey.slice(separator + 1),
				inputTokens: buckets.inputTokens,
				outputTokens: buckets.outputTokens,
				cacheReadTokens: buckets.cacheReadTokens,
				cacheWriteTokens: buckets.cacheWriteTokens,
				reasoningTokens: buckets.reasoningTokens,
				cost: buckets.cost,
				unpricedTokens: buckets.unpricedTokens,
				calls: buckets.calls
			};
		}).toSorted((a, b) => bucketTotal(b) - bucketTotal(a));
		return {
			id,
			title: delegationLabels.get(id) ?? digest.title,
			cwd: digest.cwd === null ? null : tildify(digest.cwd),
			inputTokens: totals.inputTokens,
			outputTokens: totals.outputTokens,
			cacheReadTokens: totals.cacheReadTokens,
			cacheWriteTokens: totals.cacheWriteTokens,
			cost: totals.cost,
			unpricedTokens: totals.unpricedTokens,
			calls: totals.calls,
			toolCalls,
			reasoningTokens: totals.reasoningTokens,
			contextPeak,
			tools,
			models,
			subagents,
			steps,
			stepsTotal
		};
	}
	async scan(days, windowDays) {
		const query = this.ctx.get("sessionQuery");
		if (query === void 0) throw new Error("session query is not available in this composition");
		const persistence = this.ctx.get("sessionPersistence");
		const windowStart = dayStart(days - 1);
		const records = await query.listSessions();
		const alive = /* @__PURE__ */ new Set();
		const view = new WindowView(days, windowDays);
		let skipped = 0;
		for (const record of records) {
			alive.add(record.header.id);
			let fingerprint;
			if (!record.live) {
				const location = persistence?.locate(record.header);
				if (location !== void 0) try {
					const info = await stat(location.path);
					if (info.mtimeMs < windowStart) continue;
					fingerprint = `${FOLD_VERSION}:${info.size}:${info.mtimeMs}`;
				} catch {}
				const cached = this.cache.get(record.header.id);
				if (cached !== void 0 && cached.fingerprint === fingerprint && fingerprint !== void 0) {
					view.add(record.header.id, cached.digest, record.header.origin === "subagent");
					continue;
				}
			}
			let digest;
			try {
				const log = await query.readSession(record.header.id);
				digest = foldLog(log.events, log.session.cwd ?? null, (sample, buckets) => this.price(sample, buckets)).digest;
			} catch {
				skipped += 1;
				continue;
			}
			if (!record.live && fingerprint !== void 0) this.cache.set(record.header.id, {
				fingerprint,
				digest
			});
			view.add(record.header.id, digest, record.header.origin === "subagent");
		}
		for (const id of this.cache.keys()) if (!alive.has(id)) this.cache.delete(id);
		return view.finish(skipped);
	}
	/**
	* Price one sample into its slice's buckets at the installed catalog's
	* flat per-MTok rates. The logged route key is the pi-ai provider id, or
	* `<provider>-<suffix>` on a split provider, so the exact id is tried
	* first and the de-suffixed one second; a route no catalog entry matches
	* (another adapter's, a hand-declared one) counts as unpriced instead.
	*/
	price(sample, buckets) {
		this.catalog ??= builtinModels();
		let entry = this.catalog.getModel(sample.provider, sample.model);
		if (entry === void 0) {
			const suffixAt = sample.provider.lastIndexOf("-");
			if (suffixAt > 0 && OVERFLOW_SUFFIXES.includes(sample.provider.slice(suffixAt + 1))) entry = this.catalog.getModel(sample.provider.slice(0, suffixAt), sample.model);
		}
		if (entry === void 0) {
			buckets.unpricedTokens += sample.inputTokens + sample.outputTokens + sample.cacheReadTokens + sample.cacheWriteTokens;
			return;
		}
		const rates = entry.cost;
		buckets.cost += (sample.inputTokens * rates.input + sample.outputTokens * rates.output + sample.cacheReadTokens * rates.cacheRead + sample.cacheWriteTokens * rates.cacheWrite) / 1e6;
		if (rates.cacheRead < rates.input) buckets.cacheSavings += sample.cacheReadTokens * (rates.input - rates.cacheRead) / 1e6;
	}
};

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
	usage: "GET",
	"usage/session": "GET",
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
/**
* Widest fixed day window `usage` answers: a full year. The UI's widest
* fetch is the 90-day window doubled for its preceding period (180); the
* headroom lets a hand-built request reach a year of daily detail. The
* `all` range is capped server-side instead.
*/
const MAX_USAGE_DAYS = 366;
/** Dispatch one request to its operation. */
async function handle(ctx, usage, req, res) {
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
	if (operation === "usage") {
		const raw = url.searchParams.get("days");
		if (raw === "all") {
			sendJson(res, 200, await usage.collectAll());
			return;
		}
		const days = raw === null ? 1 : Number.parseInt(raw, 10);
		if (!Number.isInteger(days) || days < 1 || days > MAX_USAGE_DAYS) {
			sendError(res, 400, `days must be an integer between 1 and ${MAX_USAGE_DAYS}, or all`);
			return;
		}
		const rawWindow = url.searchParams.get("window");
		let windowDays = days;
		if (rawWindow !== null) {
			windowDays = Number.parseInt(rawWindow, 10);
			if (!Number.isInteger(windowDays) || windowDays < 1 || windowDays > days) {
				sendError(res, 400, "window must be an integer between 1 and days");
				return;
			}
		}
		sendJson(res, 200, await usage.collect(days, windowDays));
		return;
	}
	if (operation === "usage/session") {
		const id = url.searchParams.get("id");
		if (id === null || id.length === 0) {
			sendError(res, 400, "id is required");
			return;
		}
		const session = await usage.sessionUsage(id);
		if (session === null) {
			sendError(res, 404, "session not found");
			return;
		}
		sendJson(res, 200, session);
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
	const usage = new UsageCollector(ctx);
	ctx.inject(["webServer"], (webCtx) => {
		webCtx.effect(() => webCtx.webServer.register({
			kind: "prefix",
			path: PROVIDERS_ROUTE_PREFIX,
			handler: (req, res) => handle(ctx, usage, req, res).catch((error) => {
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