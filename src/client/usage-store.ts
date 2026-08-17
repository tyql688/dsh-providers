/**
 * The sidebar usage card's store: one snapshot of today's token figures plus
 * the statistics dialog's window, refreshed from the Host's `usage` route.
 * Same shape discipline as the accounts store — a bare observable, hooks
 * bind at the render boundary, and the Host stays the single source of
 * truth.
 *
 * The card's beat also keeps the dialog's default window warm: `load` asks
 * for the doubled span with the window cap, so opening the dialog renders
 * from the last beat instead of waiting on a fresh scan.
 */

import { errorMessage } from '../errors.ts'
import { PROVIDERS_ROUTE_PREFIX } from '../wire.ts'
import type { UsageDay, UsageResponse } from '../wire.ts'

/** Days the card's trend sparkline spans. */
const SPARK_DAYS = 14

/** The dialog's window choices; `7` is the default. */
export type UsageWindowDays = 'today' | 'all' | number

/** The dialog's default window, the one the card's beat keeps warm. */
const DEFAULT_WINDOW_DAYS = 7

/** A window this fresh is served from the card's beat; no refetch on open. */
const WINDOW_WARM_MS = 45_000

/** What the surfaces render. Loaded figures survive a failed refresh; the errors report it. */
export interface UsageState {
  today: UsageDay | null
  /** The card's trend window, oldest first, today last; empty before the first load. */
  trend: UsageDay[]
  skippedSessions: number
  loading: boolean
  error: string | null
  /** The dialog's window: every grouping the route serves. Null before its first load. */
  window: UsageResponse | null
  /** Day window `window` was loaded for; tells a stale window from the selected one. */
  windowDays: UsageWindowDays
  /** Epoch ms of the last window landing; a fresh default window skips the dialog's own fetch. */
  windowAt: number
  /**
   * The equally long period right before the window, for trend deltas.
   * Empty when the window is `all`, or before the first load.
   */
  previous: UsageDay[]
  windowLoading: boolean
  windowError: string | null
}

const INITIAL: UsageState = {
  today: null,
  trend: [],
  skippedSessions: 0,
  loading: false,
  error: null,
  window: null,
  windowDays: 0,
  windowAt: 0,
  previous: [],
  windowLoading: false,
  windowError: null,
}

/** Fetches and holds the usage figures. */
export class UsageStore {
  private state: UsageState = INITIAL
  private readonly listeners = new Set<() => void>()
  /** Increment per load so a slow reply cannot overwrite a newer one; one per surface. */
  private generation = 0
  private windowGeneration = 0

  /** @param origin - where the usage route is served; the page's own origin. */
  constructor(private readonly origin: string = '') {}

  getSnapshot(): UsageState {
    return this.state
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private set(next: Partial<UsageState>): void {
    this.state = { ...this.state, ...next }
    for (const listener of this.listeners) listener()
  }

  /**
   * Call the usage route for one day span, optionally capping its groupings
   * to the last `windowDays` of the span (see the route's `window` param),
   * or for the all-time span. Missing grouping fields — a host running an
   * older bundle — read as empty rather than crashing the dialog's render.
   */
  private async fetchUsage(days: number | 'all', windowDays?: number): Promise<UsageResponse> {
    const windowParam = days === 'all' || windowDays === undefined ? '' : `&window=${windowDays}`
    const response = await fetch(`${this.origin}${PROVIDERS_ROUTE_PREFIX}/usage?days=${days}${windowParam}`)
    const body = await response.json() as UsageResponse & { error?: string }
    if (!response.ok) throw new Error(body.error ?? `${response.status} ${response.statusText}`)
    return {
      ...body,
      days: body.days.map(day => ({ ...day, activeMs: day.activeMs ?? 0, failedTurns: day.failedTurns ?? 0 })),
      weekHours: body.weekHours ?? [],
      sessions: body.sessions ?? [],
      heatmap: (body.heatmap ?? []).map(day => ({ ...day, activeMs: day.activeMs ?? 0, failedTurns: day.failedTurns ?? 0 })),
    }
  }

  /** Refresh the card's figures; a failure keeps the last good numbers on screen. */
  async load(): Promise<void> {
    const generation = ++this.generation
    this.set({ loading: true, error: null })
    try {
      // One doubled fetch with the default window cap: today + trend come
      // from the span, and the dialog's default window (7 days, vs the 7
      // before) lands in the same beat, so opening the dialog is instant. A
      // dialog showing another window keeps it — the beat must not yank a
      // today/30/90 day view back to the default underneath the open panel.
      const body = await this.fetchUsage(SPARK_DAYS, DEFAULT_WINDOW_DAYS)
      if (generation !== this.generation) return
      const warmWindow = this.state.windowDays === DEFAULT_WINDOW_DAYS || this.state.windowDays === 0
      this.set({
        today: body.days.at(-1) ?? null,
        trend: body.days,
        skippedSessions: body.skippedSessions,
        window: warmWindow ? { ...body, days: body.days.slice(-DEFAULT_WINDOW_DAYS) } : this.state.window,
        windowDays: warmWindow ? DEFAULT_WINDOW_DAYS : this.state.windowDays,
        windowAt: warmWindow ? Date.now() : this.state.windowAt,
        previous: warmWindow ? body.days.slice(0, DEFAULT_WINDOW_DAYS) : this.state.previous,
        loading: false,
        error: null,
      })
    } catch (cause) {
      if (generation !== this.generation) return
      this.set({ loading: false, error: errorMessage(cause) })
    }
  }

  /**
   * Refresh the dialog's window plus the period before it. A fixed window
   * arrives in one doubled fetch with the window cap — the route scans the
   * corpus once per request, and the card's beat already holds the default
   * window, so a warm today-view open skips the fetch entirely. The `all`
   * range has no preceding period. A failure keeps the last good window on
   * screen.
   */
  async loadWindow(days: UsageWindowDays): Promise<void> {
    if (
      this.state.window !== null
      && this.state.windowDays === days
      && Date.now() - this.state.windowAt < WINDOW_WARM_MS
    ) return
    const generation = ++this.windowGeneration
    this.set({ windowLoading: true, windowError: null })
    try {
      if (days === 'all') {
        const body = await this.fetchUsage('all')
        if (generation !== this.windowGeneration) return
        this.set({
          window: body,
          windowDays: 'all',
          windowAt: Date.now(),
          previous: [],
          windowLoading: false,
          windowError: null,
        })
        return
      }
      // The today span covers the week-hour heatmap's horizon (7 days) so
      // the overview's 时段分布 reads a full week; the window cap keeps the
      // groupings on today only.
      const span = days === 'today' ? 7 : days * 2
      const cap = days === 'today' ? 1 : days
      const body = await this.fetchUsage(span, cap)
      if (generation !== this.windowGeneration) return
      this.set({
        window: { ...body, days: body.days.slice(-(days === 'today' ? 1 : days)) },
        windowDays: days,
        windowAt: Date.now(),
        previous: days === 'today' ? body.days.slice(-2, -1) : body.days.slice(0, days),
        windowLoading: false,
        windowError: null,
      })
    } catch (cause) {
      if (generation !== this.windowGeneration) return
      this.set({ windowLoading: false, windowError: errorMessage(cause) })
    }
  }

  dispose(): void {
    this.generation += 1
    this.windowGeneration += 1
    this.listeners.clear()
  }
}
