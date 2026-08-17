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

import { stat } from 'node:fs/promises'
import { homedir } from 'node:os'
import { foldSessionTitle } from '@deepseek-ai/dsh-session-title'
import type { Context } from '@deepseek-ai/cordis'
import { builtinModels } from '@earendil-works/pi-ai/providers/all'
import type { Models } from '@earendil-works/pi-ai'
// Type-only: the `ctx.sessionQuery` Context merge and its record shapes.
import type {} from '@deepseek-ai/dsh-session-query'
// Type-only: the `ctx.sessionPersistence` Context merge (artifact location).
import type {} from '@deepseek-ai/dsh-session-persistence'
import type { SessionEvent, SessionId } from '@deepseek-ai/dsh-session'
import { OVERFLOW_SUFFIXES } from './catalog.ts'
import type {
  SessionUsageModel,
  SessionUsageResponse,
  SessionUsageStep,
  UsageBuckets,
  UsageDay,
  UsageDayHours,
  UsageModelRow,
  UsageProjectRow,
  UsageResponse,
  UsageSessionRow,
  UsageToolRow,
} from './wire.ts'

// ── the fold layer ──────────────────────────────────────────────────────────

/** `provider` and `model` joined on a space (neither may contain one). */
type ModelKey = string

/** One day's turn fold: busy time plus the turns that did not complete. */
interface DayActivity {
  activeMs: number
  failed: number
}

/** One day's tool traffic: name → calls/errors. */
type ToolFold = Map<string, { calls: number; errors: number }>

/** One day's clock histogram: 24 slots of [tokens, calls]. */
type HourFold = [number, number][]

/** Everything one session contributes, keyed by `YYYY-MM-DD`. */
interface SessionDigest {
  models: Map<string, Map<ModelKey, UsageBuckets>>
  tools: Map<string, ToolFold>
  hours: Map<string, HourFold>
  /** Agent-busy milliseconds per day: summed turn durations, capped per turn. */
  activity: Map<string, DayActivity>
  /** The session header's cwd, for the per-project grouping. */
  cwd: string | null
  /** The session's first user text, truncated; null when it recorded none. */
  title: string | null
  /** Child session id → the delegation description this session started it with. */
  delegations: Map<string, string>
}

/** Cached digest of one persisted session, valid while its artifact fingerprint holds. */
interface CacheEntry {
  fingerprint: string
  digest: SessionDigest
}

/** A usage sample bound to the route that produced it and the instant it landed. */
interface Sample {
  date: string
  hour: number
  turn: number
  step: number
  provider: string
  model: string
  inputTokens: number
  outputTokens: number
  cacheReadTokens: number
  cacheWriteTokens: number
  /** Reasoning tokens, a subset of `outputTokens` (0 when unreported). */
  reasoningTokens: number
  /** Step-open epoch ms, for the call's wall time; null when unpaired. */
  stepStart: number | null
  /** The route's advertised context window at this sample, when logged. */
  contextWindow: number | null
  time: number
}

const KEY_SEPARATOR = ' '

const keyOf = (provider: string, model: string): ModelKey => `${provider}${KEY_SEPARATOR}${model}`

const emptyBuckets = (): UsageBuckets => (
  {
    inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, reasoningTokens: 0,
    cost: 0, cacheSavings: 0, totalDurationMs: 0, maxDurationMs: 0, unpricedTokens: 0, calls: 0,
  }
)

const bucketTotal = (buckets: Pick<UsageBuckets, 'inputTokens' | 'outputTokens' | 'cacheReadTokens' | 'cacheWriteTokens'>): number =>
  buckets.inputTokens + buckets.outputTokens + buckets.cacheReadTokens + buckets.cacheWriteTokens

/** Format one epoch-ms instant as the host-local `YYYY-MM-DD` day it falls in. */
function localDate(time: number): string {
  const at = new Date(time)
  const month = String(at.getMonth() + 1).padStart(2, '0')
  const day = String(at.getDate()).padStart(2, '0')
  return `${at.getFullYear()}-${month}-${day}`
}

/**
 * Start of the host-local day `daysBack` days before today (0 = today),
 * epoch ms. Stepped on the calendar, not by fixed 24h spans: a DST change
 * inside the window would otherwise shift every earlier midnight by an hour
 * and mislabel the buckets.
 */
function dayStart(daysBack: number): number {
  const at = new Date()
  at.setHours(0, 0, 0, 0)
  at.setDate(at.getDate() - daysBack)
  return at.getTime()
}

/** How long a session title may grow before truncation. */
const TITLE_MAX = 48

/**
 * How many sessions the response's heaviest-sessions list carries. The list
 * also feeds the dialog's drill-downs (by model / provider / project / day),
 * so it must reach well past the "recent sessions" panel's few display rows —
 * a light model whose sessions all fell under a small cap would drill into an
 * empty list.
 */
const MAX_SESSION_ROWS = 60

/** How many steps the session timeline carries (most recent); `stepsTotal`
 * in the response tells the client when the timeline is a tail view. */
const MAX_SESSION_STEPS = 480

/**
 * One turn's contribution to the active-time figure is capped at an hour: a
 * crash-interrupted turn is closed by the RELOAD, so its raw span measures
 * the downtime between sessions, not work. Real turns that long are rare
 * enough that the cap costs nothing.
 */
const TURN_CAP_MS = 60 * 60 * 1000

/** One day in epoch ms, for the all-time span estimate. */
const DAY_MS = 24 * 60 * 60 * 1000

/** Midnight (epoch ms) of the host-local day `time` falls in. */
function midnightOf(time: number): number {
  const at = new Date(time)
  at.setHours(0, 0, 0, 0)
  return at.getTime()
}

/**
 * Activity calendar week count: 53 ≈ one year plus a boundary week, the same
 * order as GitHub's contribution graph. The calendar grid always spans this
 * many weeks, independent of the requested window.
 */
const HEATMAP_WEEKS = 53

/** Widest span the `all` range may cover; a year of daily data is plenty. */
const ALL_MAX_DAYS = 366

/** How many trailing days the week-hour heatmap always spans. */
const HOUR_SPAN = 7

/** The Monday `weeks` weeks before this week's Monday, epoch ms (local). */
function mondayWeeksBack(weeks: number): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const weekday = (today.getDay() + 6) % 7 // Monday = 0
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekday - weeks * 7).getTime()
}

/**
 * The session's first user text, whitespace-collapsed and truncated — the
 * row a "recent sessions" table can actually read. Only text blocks count;
 * the content block map is merge-extensible, so the shape is guarded.
 */
function sessionTitle(events: readonly SessionEvent[]): string | null {
  for (const event of events) {
    if (event.type !== 'user/message') continue
    for (const block of event.data.content) {
      if (block.type !== 'text' || typeof block.text !== 'string') continue
      const text = block.text.trim().replace(/\s+/g, ' ')
      if (text.length === 0) continue
      return text.length <= TITLE_MAX ? text : `${text.slice(0, TITLE_MAX)}…`
    }
  }
  return null
}

/**
 * Harvest delegation display names from one session log into `into`: the
 * `subagent` tool call carries the parent-chosen `description`, and its
 * result text names the child session it started ("started subagent <id>").
 * That description is the name the UI's subagent surfaces display — child
 * logs themselves never carry it (auto-titling skips delegated sessions).
 */
function harvestDelegationLabels(events: readonly SessionEvent[], into: Map<string, string>): void {
  const pending = new Map<string, string>()
  for (const event of events) {
    if (event.type === 'tool/call' && event.data.name === 'subagent') {
      const rawArguments = (event.data as { arguments?: unknown }).arguments
      if (typeof rawArguments !== 'string') continue
      try {
        const parsed = JSON.parse(rawArguments) as { description?: unknown }
        if (typeof parsed.description === 'string') pending.set(event.data.callId, parsed.description)
      } catch {
        // Unparseable arguments: the call keeps no label.
      }
      continue
    }
    if (event.type !== 'tool/result') continue
    const block = event.data.message.content[0]
    const description = pending.get(block.toolCallId)
    if (description === undefined) continue
    const pieces = (block as { content?: { text?: unknown }[] }).content ?? []
    for (const piece of pieces) {
      if (typeof piece.text !== 'string') continue
      const match = /started subagent (\S+)/.exec(piece.text)
      if (match !== null) into.set(match[1]!, description)
    }
  }
}

/**
 * The path with the host's home directory as `~` — the display form of the
 * session panel's cwd. Only the panel gets it: the window response keeps raw
 * cwds, which the drill-down filter compares by equality.
 */
function tildify(path: string): string {
  const home = homedir()
  if (path === home) return '~'
  for (const separator of ['/', '\\']) {
    if (path.startsWith(home + separator)) return `~${separator}${path.slice(home.length + 1)}`
  }
  return path
}

/** The map's seat for `key`, created on first touch. */
function seat<K, T>(map: Map<K, T>, key: K, make: () => T): T {
  let value = map.get(key)
  if (value === undefined) {
    value = make()
    map.set(key, value)
  }
  return value
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
function foldLog(
  events: readonly SessionEvent[],
  cwd: string | null,
  price: (sample: Sample, buckets: UsageBuckets) => void,
  collectSteps = false,
): { digest: SessionDigest; steps: SessionUsageStep[]; stepsTotal: number; contextPeak: { tokens: number; window: number | null } | null } {
  const samples = new Map<string, Sample>()
  const callNames = new Map<string, string>()
  const stepStarts = new Map<string, number>()
  const turnStarts = new Map<number, number>()
  const digest: SessionDigest = {
    models: new Map(), tools: new Map(), hours: new Map(), activity: new Map(), cwd, title: null, delegations: new Map(),
  }
  // Delegation display names this session assigned to its children — the
  // window view names subagent session rows through them.
  harvestDelegationLabels(events, digest.delegations)
  // The displayed session name: the title plugin's own fold over the log's
  // `session/title` events (fallback → LLM name → user rename, last wins) —
  // the exact function the UI's session list reads through. A log the title
  // plugin never touched falls back to the first user text.
  digest.title = foldSessionTitle(events)?.title ?? sessionTitle(events)
  let provider = ''
  let model = ''
  let contextWindow: number | null = null
  for (const event of events) {
    if (event.type === 'step/start') {
      stepStarts.set(`${event.data.turn}:${event.data.step}`, event.time)
      continue
    }
    if (event.type === 'turn/start') {
      turnStarts.set(event.data.turn, event.time)
      continue
    }
    if (event.type === 'turn/end') {
      const date = localDate(event.time)
      const day = seat(digest.activity, date, () => ({ activeMs: 0, failed: 0 }))
      const started = turnStarts.get(event.data.turn)
      if (started !== undefined) {
        day.activeMs += Math.min(Math.max(event.time - started, 0), TURN_CAP_MS)
      }
      if (event.data.reason.kind !== 'completed') day.failed += 1
      continue
    }
    if (event.type === 'request/context') {
      // Logged only on route or capacity change; last one wins.
      contextWindow = event.data.contextWindow ?? null
      continue
    }
    if (event.type === 'request/header') {
      provider = event.data.header.config.provider
      model = event.data.header.config.model
      continue
    }
    if (event.type === 'tool/call') {
      callNames.set(event.data.callId, event.data.name)
      const tools = seat(digest.tools, localDate(event.time), () => new Map())
      seat(tools, event.data.name, () => ({ calls: 0, errors: 0 })).calls += 1
      continue
    }
    if (event.type === 'tool/result') {
      const block = event.data.message.content[0]
      const failed = event.data.error !== undefined || block.isError === true
      if (!failed) continue
      const name = callNames.get(block.toolCallId)
      if (name === undefined) continue
      const tools = seat(digest.tools, localDate(event.time), () => new Map())
      seat(tools, name, () => ({ calls: 0, errors: 0 })).errors += 1
      continue
    }
    let usage
    let key
    if (event.type === 'assistant/chunk' && event.data.chunk.type === 'usage') {
      usage = event.data.chunk.usage
      key = `${event.data.turn}:${event.data.step}`
    } else if (event.type === 'assistant/message' && event.data.usage !== undefined) {
      usage = event.data.usage
      key = `${event.data.turn}:${event.data.step}`
    } else {
      continue
    }
    const at = new Date(event.time)
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
      time: event.time,
    })
  }
  let contextPeak: { tokens: number; window: number | null } | null = null
  for (const sample of samples.values()) {
    const prompt = sample.inputTokens + sample.cacheReadTokens + sample.cacheWriteTokens
    if (contextPeak === null || prompt > contextPeak.tokens) {
      contextPeak = { tokens: prompt, window: sample.contextWindow }
    }
  }
  for (const sample of samples.values()) {
    const models = seat(digest.models, sample.date, () => new Map<ModelKey, UsageBuckets>())
    const buckets = seat(models, keyOf(sample.provider, sample.model), emptyBuckets)
    buckets.inputTokens += sample.inputTokens
    buckets.outputTokens += sample.outputTokens
    buckets.cacheReadTokens += sample.cacheReadTokens
    buckets.cacheWriteTokens += sample.cacheWriteTokens
    buckets.reasoningTokens += sample.reasoningTokens
    buckets.calls += 1
    if (sample.stepStart !== null) {
      const duration = Math.max(0, sample.time - sample.stepStart)
      buckets.totalDurationMs += duration
      buckets.maxDurationMs = Math.max(buckets.maxDurationMs, duration)
    }
    price(sample, buckets)
    const hours = seat(digest.hours, sample.date, () => Array.from({ length: 24 }, () => [0, 0] as [number, number]))
    const slot = hours[sample.hour]!
    slot[0] += sample.inputTokens + sample.outputTokens + sample.cacheReadTokens + sample.cacheWriteTokens
    slot[1] += 1
  }
  return { digest, steps: collectSteps ? buildSteps(samples, price) : [], stepsTotal: samples.size, contextPeak }
}

/**
 * The per-step timeline: the deduped samples, oldest first, each priced into
 * a scratch bucket by the same callback the totals use — so the steps' cost
 * can never disagree with the session's sum.
 */
function buildSteps(samples: ReadonlyMap<string, Sample>, price: (sample: Sample, buckets: UsageBuckets) => void): SessionUsageStep[] {
  return [...samples.values()]
    .toSorted((a, b) => a.time - b.time)
    .slice(-MAX_SESSION_STEPS)
    .map((sample) => {
      const scratch = emptyBuckets()
      price(sample, scratch)
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
        cost: scratch.cost,
      }
    })
}

/** Add one bucket set into another. */
function addBuckets(into: UsageBuckets, from: UsageBuckets): void {
  into.inputTokens += from.inputTokens
  into.outputTokens += from.outputTokens
  into.cacheReadTokens += from.cacheReadTokens
  into.cacheWriteTokens += from.cacheWriteTokens
  into.reasoningTokens += from.reasoningTokens
  into.cost += from.cost
  into.cacheSavings += from.cacheSavings
  into.totalDurationMs += from.totalDurationMs
  into.maxDurationMs = Math.max(into.maxDurationMs, from.maxDurationMs)
  into.unpricedTokens += from.unpricedTokens
  into.calls += from.calls
}

// ── the view layer ──────────────────────────────────────────────────────────

/**
 * Accumulates digests into one window's every grouping. The day axis always
 * spans the fixed 53-week calendar grid (Monday-aligned, zero-filled before
 * the requested span), the response's `days` field is the last `spanDays` of
 * it, and every grouping — models, tools, projects, sessions, week hours —
 * aggregates over only the LAST `windowDays` days of the axis.
 */
class WindowView {
  private readonly dates: Set<string>
  private readonly indexOfDate = new Map<string, number>()
  readonly days: UsageDay[] = []
  /** First day index whose data feeds the groupings. */
  private readonly windowStart: number
  /** First day index whose hour slots feed the week heatmap: the scan span's
   * trailing week, independent of the window — the overview's 时段分布 must
   * always show the same seven-day rhythm, even when the window is today. */
  private readonly hourStart: number
  /** How many trailing axis days the response's `days` field carries. */
  private readonly spanDays: number
  /** How many trailing days feed the groupings and the week-hour heatmap. */
  private readonly windowDays: number
  private readonly models = new Map<ModelKey, UsageBuckets>()
  private readonly tools = new Map<string, { calls: number; errors: number }>()
  private readonly projects = new Map<string | null, UsageBuckets>()
  private readonly hoursByDate = new Map<string, HourFold>()
  private readonly sessionRows = new Map<string, {
    title: string | null
    cwd: string | null
    lastDate: string
    buckets: UsageBuckets
    models: Set<string>
    dates: Set<string>
    subagent: boolean
  }>()
  private readonly perDate = new Map<string, { day: UsageDay; byModel: Map<ModelKey, number>; sessions: Set<string> }>()
  private readonly sessions = new Set<string>()
  /** Child session id → delegation description, across every merged digest. */
  private readonly delegationLabels = new Map<string, string>()

  constructor(spanDays: number, windowDays: number) {
    this.spanDays = spanDays
    this.windowDays = windowDays
    // Walk calendar days from the earlier of the span start and the heatmap's
    // Monday start, forward to today: consecutive local days, exact across DST.
    // The axis must open on a Monday even when the span reaches further back
    // than the heatmap grid (the `all` window) — the calendar chunks the axis
    // into week columns from day one, so a mid-week start skews every column's
    // weekday rows.
    const axisStart = new Date(Math.min(dayStart(spanDays - 1), mondayWeeksBack(HEATMAP_WEEKS - 1)))
    axisStart.setDate(axisStart.getDate() - (axisStart.getDay() + 6) % 7)
    const cursor = axisStart
    const end = dayStart(0)
    this.dates = new Set()
    let index = 0
    while (cursor.getTime() <= end) {
      const date = localDate(cursor.getTime())
      const day: UsageDay = { date, ...emptyBuckets(), toolCalls: 0, failedTurns: 0, activeMs: 0, byModel: [] }
      this.dates.add(date)
      this.indexOfDate.set(date, index)
      this.days.push(day)
      this.perDate.set(date, { day, byModel: new Map(), sessions: new Set() })
      index += 1
      cursor.setDate(cursor.getDate() + 1)
    }
    this.windowStart = index - windowDays
    this.hourStart = Math.max(0, index - Math.min(HOUR_SPAN, spanDays))
  }

  /** Merge one session's digest. The day axis spans the whole span (the
   * preceding period must carry real figures for the deltas), while the
   * groupings — sessions, models, projects, tools, hours — count only the
   * window's days. */
  add(sessionId: string, digest: SessionDigest, subagent = false): void {
    for (const [child, label] of digest.delegations) this.delegationLabels.set(child, label)
    for (const [date, models] of digest.models) {
      const slot = this.perDate.get(date)
      if (slot === undefined) continue
      const inWindow = (this.indexOfDate.get(date) ?? -1) >= this.windowStart
      for (const [modelKey, buckets] of models) {
        addBuckets(slot.day, buckets)
        if (!inWindow) continue
        this.sessions.add(sessionId)
        let session = this.sessionRows.get(sessionId)
        if (session === undefined) {
          session = {
            title: digest.title, cwd: digest.cwd, lastDate: date, buckets: emptyBuckets(), models: new Set(), dates: new Set(), subagent,
          }
          this.sessionRows.set(sessionId, session)
        }
        if (date > session.lastDate) session.lastDate = date
        session.models.add(modelKey)
        session.dates.add(date)
        addBuckets(session.buckets, buckets)
        slot.byModel.set(modelKey, (slot.byModel.get(modelKey) ?? 0) + bucketTotal(buckets))
        addBuckets(seat(this.models, modelKey, emptyBuckets), buckets)
        addBuckets(seat(this.projects, digest.cwd, emptyBuckets), buckets)
      }
    }
    for (const [date, tools] of digest.tools) {
      const slot = this.perDate.get(date)
      if (slot === undefined) continue
      const inWindow = (this.indexOfDate.get(date) ?? -1) >= this.windowStart
      for (const [name, row] of tools) {
        slot.day.toolCalls += row.calls
        if (!inWindow) continue
        const toolSum = seat(this.tools, name, () => ({ calls: 0, errors: 0 }))
        toolSum.calls += row.calls
        toolSum.errors += row.errors
      }
    }
    for (const [date, activity] of digest.activity) {
      const slot = this.perDate.get(date)
      if (slot === undefined) continue
      slot.day.activeMs += activity.activeMs
      slot.day.failedTurns += activity.failed
    }
    for (const [date, hours] of digest.hours) {
      if (!this.dates.has(date)) continue
      if ((this.indexOfDate.get(date) ?? -1) < this.hourStart) continue
      let slots = this.hoursByDate.get(date)
      if (slots === undefined) {
        slots = Array.from({ length: 24 }, () => [0, 0] as [number, number])
        this.hoursByDate.set(date, slots)
      }
      for (let hour = 0; hour < 24; hour += 1) {
        slots[hour]![0] += hours[hour]![0]
        slots[hour]![1] += hours[hour]![1]
      }
    }
  }

  finish(skippedSessions: number): UsageResponse {
    for (const slot of this.perDate.values()) {
      slot.day.byModel = [...slot.byModel]
        .map(([modelKey, tokens]) => {
          const separator = modelKey.indexOf(KEY_SEPARATOR)
          return { provider: modelKey.slice(0, separator), model: modelKey.slice(separator + 1), tokens }
        })
        .toSorted((a, b) => b.tokens - a.tokens)
    }
    const models: UsageModelRow[] = [...this.models]
      .map(([modelKey, buckets]) => {
        const separator = modelKey.indexOf(KEY_SEPARATOR)
        return { provider: modelKey.slice(0, separator), model: modelKey.slice(separator + 1), ...buckets }
      })
      .toSorted((a, b) => bucketTotal(b) - bucketTotal(a))
    const tools: UsageToolRow[] = [...this.tools]
      .map(([name, row]) => ({ name, ...row }))
      .toSorted((a, b) => b.calls - a.calls)
    const projects: UsageProjectRow[] = [...this.projects]
      .map(([cwd, buckets]) => ({ cwd, ...buckets }))
      .toSorted((a, b) => bucketTotal(b) - bucketTotal(a))
    const sessions: UsageSessionRow[] = [...this.sessionRows]
      .map(([id, row]) => ({
        id,
        // A subagent session's display name is its parent's delegation
        // description, exactly as the UI's subagent surfaces label it.
        title: this.delegationLabels.get(id) ?? row.title,
        cwd: row.cwd,
        subagent: row.subagent,
        lastDate: row.lastDate,
        dates: [...row.dates].toSorted(),
        models: [...row.models].toSorted(),
        ...row.buckets,
      }))
      .toSorted((a, b) => bucketTotal(b) - bucketTotal(a))
      .slice(0, MAX_SESSION_ROWS)
    // The heatmap rows: the scan span's last seven days (fewer when the
    // span is shorter), each 24 clock slots — window-independent, so the
    // overview's hour rhythm reads the same in every window.
    const weekHours: UsageDayHours[] = this.days.slice(-Math.min(HOUR_SPAN, this.spanDays)).map((day) => {
      const slots = this.hoursByDate.get(day.date)
      return {
        date: day.date,
        hours: Array.from({ length: 24 }, (_, hour) => {
          const [tokens, calls] = slots?.[hour] ?? [0, 0]
          return { hour, tokens, calls }
        }),
      }
    })
    return {
      days: this.days.slice(-this.spanDays),
      models,
      tools,
      projects,
      sessions,
      weekHours,
      heatmap: this.days,
      sessionCount: this.sessions.size,
      skippedSessions,
    }
  }
}

// ── the collector ───────────────────────────────────────────────────────────

/**
 * Bumped when the fold's output shape changes: the digest cache's fingerprint
 * incorporates it, so a deploy with new fold fields never replays a digest
 * folded by the old code.
 */
const FOLD_VERSION = 5

/**
 * Folds the whole session corpus into window views, with a per-session
 * digest cache over the persisted majority. One instance lives as long as
 * the routes row; the cache is memory only and rebuilt on reload.
 */
export class UsageCollector {
  private readonly cache = new Map<string, CacheEntry>()
  /** In-flight `collect` promises per span key, so concurrent asks share one scan. */
  private readonly inflight = new Map<string, Promise<UsageResponse>>()
  /** The installed pi-ai catalog, opened once on first pricing. */
  private catalog: Models | undefined

  constructor(private readonly ctx: Context) {}

  /**
   * The last `days` host-local days, oldest first, today always last; the
   * groupings aggregate over only the last `windowDays` of them. Concurrent
   * calls for the same span collapse into one scan: the card's beat and the
   * dialog's open may land in the same tick, and re-scanning the corpus for
   * each would multiply the work instead of sharing it.
   */
  collect(days: number, windowDays = days): Promise<UsageResponse> {
    const key = `${days}:${windowDays}`
    const running = this.inflight.get(key)
    if (running !== undefined) return running
    const run = (async () => {
      try {
        return await this.scan(days, windowDays)
      } finally {
        this.inflight.delete(key)
      }
    })()
    this.inflight.set(key, run)
    return run
  }

  /**
   * The `all` range: one extra listing pass finds the earliest session
   * creation, then the span covers from there to today, capped at a year
   * (`ALL_MAX_DAYS`) — a year of daily data is plenty for every surface, and
   * the calendar grid is fixed at 53 weeks regardless.
   */
  async collectAll(): Promise<UsageResponse> {
    const query = this.ctx.get('sessionQuery')
    if (query === undefined) throw new Error('session query is not available in this composition')
    const records = await query.listSessions()
    let earliest = Infinity
    for (const record of records) {
      const created = record.header.createdAt
      if (typeof created === 'number' && created < earliest) earliest = created
    }
    const span = Number.isFinite(earliest)
      // Calendar days, not elapsed 24h spans: a session from yesterday 23:59
      // is two days of axis at 00:01, not one. Midnight-to-midnight keeps a
      // DST transition from drifting the count.
      ? Math.min(ALL_MAX_DAYS, Math.round((dayStart(0) - midnightOf(earliest)) / DAY_MS) + 1)
      : 1
    return this.collect(span, span)
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
  async sessionUsage(id: string): Promise<SessionUsageResponse | null> {
    const query = this.ctx.get('sessionQuery')
    if (query === undefined) throw new Error('session query is not available in this composition')
    const records = await query.listSessions()
    if (!records.some(record => record.header.id === id)) return null

    // The delegation tree, walked breadth-first over the corpus's
    // `parentSession` links (cycle-safe: a seen id never re-enters). Only
    // `origin: 'subagent'` children count — `parentSession` is seed lineage,
    // so a forked/resumed branch carries it too, and folding a fork in would
    // double-count the parent's own history.
    const children = new Map<string, SessionId[]>()
    const headers = new Map<string, (typeof records)[number]['header']>()
    for (const record of records) {
      headers.set(record.header.id, record.header)
      const parent = record.header.parentSession
      if (parent === undefined || record.header.origin !== 'subagent') continue
      seat(children, parent, () => []).push(record.header.id)
    }
    const order: SessionId[] = [id as SessionId]
    const seen = new Set<string>([id])
    for (let index = 0; index < order.length; index += 1) {
      for (const child of children.get(order[index]!) ?? []) {
        if (seen.has(child)) continue
        seen.add(child)
        order.push(child)
      }
    }

    const log = await query.readSession(id as SessionId)
    const { digest, steps, stepsTotal, contextPeak } = foldLog(
      log.events,
      log.session.cwd ?? null,
      (sample, buckets) => this.price(sample, buckets),
      true,
    )

    // Delegation display names, harvested from every log of the tree. When
    // the viewed session is itself a subagent, its own name lives in ITS
    // parent's log — one extra read, display-only, best effort.
    const delegationLabels = new Map(digest.delegations)
    const ownHeader = headers.get(id)
    if (ownHeader?.origin === 'subagent' && ownHeader.parentSession !== undefined) {
      try {
        harvestDelegationLabels((await query.readSession(ownHeader.parentSession)).events, delegationLabels)
      } catch {
        // The parent log is unreadable: the fallback title stands.
      }
    }
    // The headline figures fold ONLY this session — they must reconcile with
    // the composer's own meter, which never counts delegated work. The
    // descendants' shares land exclusively in the `subagents` rows; the
    // client presents the tree rollup from those.
    const totals = emptyBuckets()
    const byModel = new Map<ModelKey, UsageBuckets>()
    const toolTotals = new Map<string, { calls: number; errors: number }>()
    for (const models of digest.models.values()) {
      for (const [modelKey, buckets] of models) {
        addBuckets(totals, buckets)
        addBuckets(seat(byModel, modelKey, emptyBuckets), buckets)
      }
    }
    for (const dayTools of digest.tools.values()) {
      for (const [name, row] of dayTools) {
        const entry = seat(toolTotals, name, () => ({ calls: 0, errors: 0 }))
        entry.calls += row.calls
        entry.errors += row.errors
      }
    }

    // The descendants: each folded fresh into its own row. An unreadable or
    // usage-less descendant just drops out.
    const subagents: SessionUsageResponse['subagents'] = []
    for (const childId of order.slice(1)) {
      let childLog
      try {
        childLog = await query.readSession(childId)
      } catch {
        continue
      }
      const child = foldLog(
        childLog.events,
        childLog.session.cwd ?? null,
        (sample, buckets) => this.price(sample, buckets),
      )
      // A sub-parent's own delegations name ITS children; the walk is
      // breadth-first, so every child's labels are merged before its
      // descendants' rows are built.
      for (const [grandchild, label] of child.digest.delegations) delegationLabels.set(grandchild, label)
      const share = emptyBuckets()
      for (const models of child.digest.models.values()) {
        for (const buckets of models.values()) addBuckets(share, buckets)
      }
      if (share.calls === 0) continue
      subagents.push({
        id: childId,
        agentPreset: headers.get(childId)?.agentPreset ?? null,
        // The parent-chosen delegation description is the UI's display name
        // for the child; a longer first-text cut fills in when no label was
        // recorded (a subagent is never LLM-titled).
        title: delegationLabels.get(childId) ?? sessionTitle(childLog.events) ?? child.digest.title,
        inputTokens: share.inputTokens,
        outputTokens: share.outputTokens,
        cacheReadTokens: share.cacheReadTokens,
        cacheWriteTokens: share.cacheWriteTokens,
        cost: share.cost,
        calls: share.calls,
      })
    }
    subagents.sort((a, b) => bucketTotal(b) - bucketTotal(a))
    const tools: UsageToolRow[] = [...toolTotals]
      .map(([name, row]) => ({ name, calls: row.calls, errors: row.errors }))
      .toSorted((a, b) => b.calls - a.calls)
    const toolCalls = tools.reduce((sum, row) => sum + row.calls, 0)
    const models: SessionUsageModel[] = [...byModel]
      .map(([modelKey, buckets]) => {
        const separator = modelKey.indexOf(KEY_SEPARATOR)
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
          calls: buckets.calls,
        }
      })
      .toSorted((a, b) => bucketTotal(b) - bucketTotal(a))
    return {
      id,
      // A subagent's display name is its parent's delegation description —
      // what the breadcrumb shows; top-level sessions keep the folded title.
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
      stepsTotal,
    }
  }

  private async scan(days: number, windowDays: number): Promise<UsageResponse> {
    const query = this.ctx.get('sessionQuery')
    if (query === undefined) throw new Error('session query is not available in this composition')
    const persistence = this.ctx.get('sessionPersistence')
    const windowStart = dayStart(days - 1)

    const records = await query.listSessions()
    const alive = new Set<string>()
    const view = new WindowView(days, windowDays)
    let skipped = 0
    for (const record of records) {
      alive.add(record.header.id)
      let fingerprint: string | undefined
      if (!record.live) {
        const location = persistence?.locate(record.header)
        if (location !== undefined) {
          try {
            const info = await stat(location.path)
            // Untouched since before the window: nothing in range, skip the read.
            if (info.mtimeMs < windowStart) continue
            fingerprint = `${FOLD_VERSION}:${info.size}:${info.mtimeMs}`
          } catch {
            // Listed but not statable (raced deletion, odd backend): read it anyway.
          }
        }
        const cached = this.cache.get(record.header.id)
        if (cached !== undefined && cached.fingerprint === fingerprint && fingerprint !== undefined) {
          view.add(record.header.id, cached.digest, record.header.origin === 'subagent')
          continue
        }
      }
      let digest: SessionDigest
      try {
        const log = await query.readSession(record.header.id)
        digest = foldLog(log.events, log.session.cwd ?? null, (sample, buckets) => this.price(sample, buckets)).digest
      } catch {
        skipped += 1
        continue
      }
      // A live session's log still moves; only a persisted artifact's
      // fingerprint can vouch for a replay.
      if (!record.live && fingerprint !== undefined) {
        this.cache.set(record.header.id, { fingerprint, digest })
      }
      view.add(record.header.id, digest, record.header.origin === 'subagent')
    }
    for (const id of this.cache.keys()) if (!alive.has(id)) this.cache.delete(id)
    return view.finish(skipped)
  }

  /**
   * Price one sample into its slice's buckets at the installed catalog's
   * flat per-MTok rates. The logged route key is the pi-ai provider id, or
   * `<provider>-<suffix>` on a split provider, so the exact id is tried
   * first and the de-suffixed one second; a route no catalog entry matches
   * (another adapter's, a hand-declared one) counts as unpriced instead.
   */
  private price(sample: Sample, buckets: UsageBuckets): void {
    this.catalog ??= builtinModels()
    let entry = this.catalog.getModel(sample.provider, sample.model)
    if (entry === undefined) {
      const suffixAt = sample.provider.lastIndexOf('-')
      if (suffixAt > 0 && OVERFLOW_SUFFIXES.includes(sample.provider.slice(suffixAt + 1))) {
        entry = this.catalog.getModel(sample.provider.slice(0, suffixAt), sample.model)
      }
    }
    if (entry === undefined) {
      buckets.unpricedTokens += sample.inputTokens + sample.outputTokens + sample.cacheReadTokens + sample.cacheWriteTokens
      return
    }
    const rates = entry.cost
    buckets.cost += (
      sample.inputTokens * rates.input
      + sample.outputTokens * rates.output
      + sample.cacheReadTokens * rates.cacheRead
      + sample.cacheWriteTokens * rates.cacheWrite
    ) / 1_000_000
    // What the cache reads would have cost at full input rates, minus what
    // they cost at cache rates — the money prompt caching saved.
    if (rates.cacheRead < rates.input) {
      buckets.cacheSavings += sample.cacheReadTokens * (rates.input - rates.cacheRead) / 1_000_000
    }
  }
}
