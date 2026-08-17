/**
 * Shared figures vocabulary of the usage card and its statistics dialog:
 * formatters, the four-bucket mix table, and the tweened number. One module
 * so the card and the dialog can never disagree about a color or a unit.
 */

import { useEffect, useRef, useState } from 'react'
import type { UsageBuckets } from '../wire.ts'
import type { AccountsKey } from './locales.ts'

/** How long one figure tweens toward a new value. */
const TWEEN_MS = 500

/** Shared formatters: the tween calls these every animation frame. */
let compact: Intl.NumberFormat | undefined
let dayLabel: Intl.DateTimeFormat | undefined
let dayFullLabel: Intl.DateTimeFormat | undefined

/** Compact token count for the card's figures: 12.3K, 4.5M. */
export function formatTokens(amount: number): string {
  compact ??= new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 })
  return compact.format(amount)
}

/** Dollar figure at estimate precision; sub-cent spend still reads as spend. */
export function formatCost(amount: number): string {
  if (amount === 0) return '$0'
  if (amount < 0.01) return '<$0.01'
  return `$${amount.toFixed(2)}`
}

/** Short localized day label for chart axes, e.g. `8/15`. */
export function formatDay(date: string): string {
  dayLabel ??= new Intl.DateTimeFormat(undefined, { month: 'numeric', day: 'numeric' })
  // The wire date is a local calendar day; noon keeps it stable across DST.
  return dayLabel.format(new Date(`${date}T12:00:00`))
}

/** Day label with the weekday, for tooltips and the day table: `周三 8/15`. */
export function formatDayFull(date: string): string {
  dayFullLabel ??= new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'numeric', day: 'numeric' })
  return dayFullLabel.format(new Date(`${date}T12:00:00`))
}

/** Whole-percent share for the cache-hit tile. */
export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`
}

/** Whole calls for a figure; the tween hands fractional values mid-flight. */
export function formatCalls(amount: number): string {
  return Math.round(amount).toLocaleString()
}

/** Compact duration for the activity figures: 45s, 23m, 1.4h. */
export function formatDuration(ms: number): string {
  const minutes = ms / 60_000
  if (minutes < 1) return `${Math.round(ms / 1000)}s`
  if (minutes < 60) return `${Math.round(minutes)}m`
  return `${(minutes / 60).toFixed(1)}h`
}

/** One-decimal share for legends and rankings: 42.3%. */
export function formatShare(ratio: number): string {
  return `${(ratio * 100).toFixed(1)}%`
}

/**
 * Categorical palette for model/tool series, cycled by rank. Theme aliases
 * only, so both themes keep their own contrast — and only the CHROMATIC
 * state aliases: `brand-primary` is near-black in the light theme and would
 * paint a monochrome chart. The last entry is the muted catch-all the
 * "other" rows wear.
 */
const SERIES_COLORS = [
  'var(--dsw-alias-state-business-primary)',
  'var(--dsw-alias-state-success-primary)',
  'var(--dsw-alias-state-warn-primary)',
  'var(--dsw-alias-state-error-secondary)',
] as const

/** Muted color of every "other" catch-all series. */
export const OTHER_COLOR = 'var(--dsw-alias-label-tertiary)'

/** The rank's series color. */
export function seriesColor(index: number): string {
  return SERIES_COLORS[index % SERIES_COLORS.length]!
}

/** How many ranked series get their own color before collapsing into other. */
export const MAX_SERIES = SERIES_COLORS.length

/** All four buckets of one slice, the figure every total in the UI sums. */
export function dayTotal(day: Pick<UsageBuckets, 'inputTokens' | 'outputTokens' | 'cacheReadTokens' | 'cacheWriteTokens'>): number {
  return day.inputTokens + day.outputTokens + day.cacheReadTokens + day.cacheWriteTokens
}

/**
 * The four mix segments. The prompt side stays one family — solid business
 * blue for input, a tint of it for cache read — against the green output,
 * while cache write wears the warn hue: it is the one bucket that becomes
 * tomorrow's input, so it stands apart from both. Tints mix the theme
 * alias, so both themes keep their own hue.
 */
export const PARTS = [
  { key: 'usageInput', field: 'inputTokens', color: 'var(--dsw-alias-state-business-primary)' },
  { key: 'usageOutput', field: 'outputTokens', color: 'var(--dsw-alias-state-success-primary)' },
  { key: 'usageCacheRead', field: 'cacheReadTokens', color: 'color-mix(in srgb, var(--dsw-alias-state-business-primary) 42%, transparent)' },
  { key: 'usageCacheWrite', field: 'cacheWriteTokens', color: 'var(--dsw-alias-state-warn-primary)' },
] as const satisfies readonly { key: AccountsKey; field: keyof UsageBuckets; color: string }[]

/**
 * One figure that counts toward its target instead of jumping: an ease-out
 * tween from the previously shown value, re-aimed whenever the target moves.
 * A fresh mount starts at zero, so the card opens with a count-up. Reduced
 * motion snaps straight to the target.
 */
export function AnimatedNumber({ value, format }: { value: number; format: (amount: number) => string }) {
  const [shown, setShown] = useState(0)
  const shownRef = useRef(0)

  useEffect(() => {
    const from = shownRef.current
    if (from === value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shownRef.current = value
      setShown(value)
      return
    }
    const start = performance.now()
    let frame = requestAnimationFrame(function step(now: number) {
      const progress = Math.min((now - start) / TWEEN_MS, 1)
      const eased = 1 - (1 - progress) ** 3
      const current = progress < 1 ? from + (value - from) * eased : value
      shownRef.current = current
      setShown(current)
      if (progress < 1) frame = requestAnimationFrame(step)
    })
    return () => cancelAnimationFrame(frame)
  }, [value])

  return <>{format(shown)}</>
}
