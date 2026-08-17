/**
 * Usage analytics folded from the durable session logs, in two layers.
 *
 * The FOLD layer turns one session log into a compact `SessionDigest` —
 * per-day figures split by model, by tool, and by hour of day. dsh already
 * accounts every model call: adapters report `TokenUsage` on the stream and
 * the session log keeps it (`assistant/chunk` usage chunks, plus the
 * assembled `assistant/message`'s own `usage`), tool traffic rides
 * `tool/call` / `tool/result`, and every event carries its epoch time. The
 * fold reads those through `ctx.sessionQuery` with the same de-duplication
 * `dsh-token-meter`'s `tokenUsage` projection runs.
 *
 * The VIEW layer merges digests and projects them into the wire response:
 * a zero-filled day axis plus per-model / per-tool / per-project /
 * per-hour groupings over the requested window.
 *
 * Reading every log per request would not scale, so persisted sessions are
 * pruned and cached by their artifact's stat fingerprint: a file untouched
 * since before the window cannot contribute and is never opened, and an
 * unchanged file replays its digest from cache. Live sessions are few and in
 * memory; they are folded fresh every call.
 */
import type { Context } from '@deepseek-ai/cordis';
import type { SessionUsageResponse, UsageResponse } from './wire.ts';
/**
 * Folds the whole session corpus into window views, with a per-session
 * digest cache over the persisted majority. One instance lives as long as
 * the routes row; the cache is memory only and rebuilt on reload.
 */
export declare class UsageCollector {
    private readonly ctx;
    private readonly cache;
    /** In-flight `collect` promises per span key, so concurrent asks share one scan. */
    private readonly inflight;
    /** The installed pi-ai catalog, opened once on first pricing. */
    private catalog;
    constructor(ctx: Context);
    /**
     * The last `days` host-local days, oldest first, today always last; the
     * groupings aggregate over only the last `windowDays` of them. Concurrent
     * calls for the same span collapse into one scan: the card's beat and the
     * dialog's open may land in the same tick, and re-scanning the corpus for
     * each would multiply the work instead of sharing it.
     */
    collect(days: number, windowDays?: number): Promise<UsageResponse>;
    /**
     * The `all` range: one extra listing pass finds the earliest session
     * creation, then the span covers from there to today, capped at a year
     * (`ALL_MAX_DAYS`) — a year of daily data is plenty for every surface, and
     * the calendar grid is fixed at 53 weeks regardless.
     */
    collectAll(): Promise<UsageResponse>;
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
    sessionUsage(id: string): Promise<SessionUsageResponse | null>;
    private scan;
    /**
     * Price one sample into its slice's buckets at the installed catalog's
     * flat per-MTok rates. The logged route key is the pi-ai provider id, or
     * `<provider>-<suffix>` on a split provider, so the exact id is tried
     * first and the de-suffixed one second; a route no catalog entry matches
     * (another adapter's, a hand-declared one) counts as unpriced instead.
     */
    private price;
}
