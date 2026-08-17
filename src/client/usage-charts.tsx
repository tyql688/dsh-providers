/**
 * The usage surfaces' chart primitives: a stacked day-column chart with a
 * hover tooltip, a smooth area chart with a hover crosshair, a donut of
 * series shares, a GitHub-style usage calendar with weekday rhythm bars, a
 * 7×24 hour heatmap, and the card's 14-day trend sparkline. Pure
 * presentational SVG/CSS pieces — data arrives already grouped, colors
 * arrive from the shared series palette, labels arrive from the caller
 * (locale lives outside), and every animation collapses under reduced motion
 * (CSS side).
 */

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { dayTotal, formatCost, formatDay, formatDayFull, formatPercent, formatShare, formatTokens, PARTS } from './usage-format.tsx'
import type { UsageDay, UsageDayHours } from '../wire.ts'
import styles from './AccountsSection.module.css'

/** One horizontal usage bar: dot, name, share track, share, value. With
 * `onPick` the row turns into a button that drills into the matching
 * sessions; `picked` marks the row the current filter came from. */
export function UsageBar({ item, onPick, picked }: {
  item: {
    key: string
    label: string
    color: string
    share: number
    value: string
    title?: string | undefined
    /** Small pill after the name, e.g. the subagent marker. */
    tag?: string | undefined
  }
  onPick?: (() => void) | undefined
  picked?: boolean
}) {
  const className = `${styles.usageMiniRow}${onPick === undefined ? '' : ` ${styles.usagePickable}`}${picked === true ? ` ${styles.usagePicked}` : ''}`
  const cells = (
    <>
      <span className={styles.usageDot} style={{ background: item.color }} aria-hidden="true" />
      <span className={styles.usageModelName} title={item.title}>
        {item.label}
        {item.tag !== undefined && <span className={styles.usageRowTag}>{item.tag}</span>}
      </span>
      <span className={styles.usageMiniTrack} aria-hidden="true">
        <span style={{ width: `${item.share * 100}%`, background: item.color }} />
      </span>
      <span className={styles.usageShare}>{formatShare(item.share)}</span>
      <span className={styles.usageNum}>{item.value}</span>
    </>
  )
  return onPick === undefined
    ? <div className={className}>{cells}</div>
    : <button type="button" className={className} onClick={onPick}>{cells}</button>
}

/** Stagger between neighbouring chart columns rising in. */
const STAGGER_MS = 25

/** One stacked slice of one day column. */
export interface DaySlice {
  key: string
  /** Localized series name, shown in the tooltip legend. */
  label: string
  color: string
  value: number
}

/** One column of the stacked day chart, sliced along the caller's dimension. */
export interface StackedDay {
  date: string
  cost: number
  calls: number
  slices: DaySlice[]
}

/**
 * The stacked day columns over a shared baseline. Hovering a column raises a
 * tooltip with the day's breakdown (the caller's slices carry their own
 * labels), the day's call count and cost. The chart is one image to assistive
 * tech (`summary` labels it; the per-day figures live in the dialog's day
 * table, so the columns themselves carry no tab stops) and the tooltip is
 * visual only.
 */
export function StackedDayChart({ days, summary, callsLabel }: {
  days: readonly StackedDay[]
  summary: string
  callsLabel: string
}) {
  const totals = days.map(day => day.slices.reduce((sum, slice) => sum + slice.value, 0))
  const peak = Math.max(...totals, 1)
  const count = days.length
  const [active, setActive] = useState<number | null>(null)
  const day = active === null ? null : days[active]
  return (
    <div
      className={styles.usageChart}
      role="img"
      aria-label={summary}
      onMouseLeave={() => setActive(null)}
    >
      {/* Dashed 25/50/75% gridlines, painted over the columns the way a chart
          baseline grid should read. */}
      <div className={styles.usageChartGrid} aria-hidden="true">
        <span style={{ top: '25%' }} />
        <span style={{ top: '50%' }} />
        <span style={{ top: '75%' }} />
      </div>
      {days.map((column, index) => {
        const sum = totals[index]!
        return (
          <div
            key={column.date}
            className={styles.usageChartCol}
            aria-hidden="true"
            onMouseEnter={() => setActive(index)}
          >
            {sum > 0 && (
              <div
                className={styles.usageChartFill}
                style={{
                  height: `${sum / peak * 100}%`,
                  // The rise cascade must not trail for minutes on long spans.
                  animationDelay: `${Math.min(index * STAGGER_MS, 600)}ms`,
                }}
              >
                {column.slices.map(slice => slice.value > 0 && (
                  <span key={slice.key} style={{ height: `${slice.value / sum * 100}%`, background: slice.color }} />
                ))}
              </div>
            )}
          </div>
        )
      })}
      {day !== null && active !== null && (
        <div
          className={styles.usageTip}
          style={active === 0
            ? { left: 0 }
            : active === count - 1
              ? { right: 0 }
              : { left: `${(active + 0.5) / count * 100}%`, transform: 'translateX(-50%)' }}
          aria-hidden="true"
        >
          <span className={styles.usageTipDate}>{formatDayFull(day.date)}</span>
          {day.slices.map(slice => slice.value > 0 && (
            <div key={slice.key} className={styles.usageTipRow}>
              <span className={styles.usageDot} style={{ background: slice.color }} aria-hidden="true" />
              <span className={styles.usageTipName}>{slice.label}</span>
              <span className={styles.usageTipShare}>
                {formatTokens(slice.value)}
                {' · '}
                {formatShare(slice.value / Math.max(totals[active]!, 1))}
              </span>
            </div>
          ))}
          <span className={styles.usageTipFoot}>
            {day.calls > 0 && <span>{day.calls.toLocaleString()} {callsLabel}</span>}
            <span>{formatCost(day.cost)}</span>
          </span>
        </div>
      )}
    </div>
  )
}

/** Stepped day ticks under a chart: every `n/6`-th day, always the last, which
 * is today and wears a marker dot. */
export function DayAxis({ days, todayLabel }: { days: readonly UsageDay[]; todayLabel: string }) {  const count = days.length
  if (count === 0) return null
  const step = Math.max(1, Math.ceil(count / 6))
  const ticks = days.filter((_, index) => index % step === 0 || index === count - 1)
  return (
    <div className={styles.usageChartAxis} aria-hidden="true">
      {ticks.map((day, index) => {
        const isLast = index === ticks.length - 1
        return (
          <span
            key={day.date}
            className={isLast ? styles.usageAxisToday : undefined}
            title={isLast ? todayLabel : undefined}
          >
            {formatDay(day.date)}
          </span>
        )
      })}
    </div>
  )
}

/** Clock ticks under the today view's per-hour trend: 0/6/12/18, then now
 * (the now marker merges into its tick when it lands on one). */
export function HourAxis({ nowLabel }: { nowLabel: string }) {
  const now = new Date().getHours()
  const onTick = now % 6 === 0
  // The chart's axis ends at the current hour; later ticks would label
  // future slots that carry no data.
  const ticks = [0, 6, 12, 18].filter(tick => tick <= now)
  return (
    <div className={styles.usageChartAxis} aria-hidden="true">
      {ticks.map(tick => (
        <span
          key={tick}
          className={onTick && tick === now ? styles.usageAxisToday : undefined}
          title={onTick && tick === now ? nowLabel : undefined}
        >
          {`${String(tick).padStart(2, '0')}:00`}
        </span>
      ))}
      {!onTick && (
        <span className={styles.usageAxisToday} title={nowLabel}>
          {`${String(now).padStart(2, '0')}:00`}
        </span>
      )}
    </div>
  )
}

/** One point of the smooth area chart. */
export interface TrendPoint {
  date: string
  value: number
}

const AREA_WIDTH = 100
const AREA_HEIGHT = 40
/** Space between the peak and the top edge, in viewBox units. */
const AREA_PAD = 3

/**
 * A smooth cubic path through the points (Catmull-Rom style control points).
 * Control-point y is clamped to the data's own range: an unclamped spline
 * undershoots below the baseline between zero-valued neighbours, drawing
 * negative usage that cannot exist.
 */
function smoothLine(points: readonly (readonly [number, number])[]): string {
  if (points.length === 0) return ''
  const minY = Math.min(...points.map(point => point[1]))
  const maxY = Math.max(...points.map(point => point[1]))
  const clampY = (y: number): number => Math.max(minY, Math.min(maxY, y))
  let d = `M${points[0]![0].toFixed(2)} ${points[0]![1].toFixed(2)}`
  for (let i = 0; i < points.length - 1; i += 1) {
    const before = points[Math.max(0, i - 1)]!
    const from = points[i]!
    const to = points[i + 1]!
    const after = points[Math.min(points.length - 1, i + 2)]!
    const c1x = from[0] + (to[0] - before[0]) / 6
    const c1y = clampY(from[1] + (to[1] - before[1]) / 6)
    const c2x = to[0] - (after[0] - from[0]) / 6
    const c2y = clampY(to[1] - (after[1] - from[1]) / 6)
    d += ` C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${to[0].toFixed(2)} ${to[1].toFixed(2)}`
  }
  return d
}

/**
 * The smooth area chart of one value per day (the total and cost modes of
 * the trend panel): a gradient area under a curved line, an optional moving
 * average as a dashed line, dashed gridlines, today's marker dot at the
 * right edge, and a hover crosshair with the day's figures. Renders flat;
 * the crosshair is the only motion.
 */
export function AreaTrend({ points, average, format, summary, movingAverageLabel, formatPoint }: {
  points: readonly TrendPoint[]
  /** Parallel moving-average series, drawn dashed under the same scale. */
  average?: readonly TrendPoint[] | undefined
  format: (amount: number) => string
  summary: string
  movingAverageLabel?: ((formatted: string) => string) | undefined
  /** Tooltip title of one point; defaults to its date as a full day label. */
  formatPoint?: ((point: TrendPoint) => string) | undefined
}) {
  const [active, setActive] = useState<number | null>(null)
  const frame = useRef<HTMLDivElement | null>(null)
  const count = points.length
  if (count < 2) return null
  const peak = Math.max(...points.map(point => point.value), 1)
  const y = (value: number): number => AREA_HEIGHT - AREA_PAD - value / peak * (AREA_HEIGHT - AREA_PAD * 2)
  const coords = points.map((point, index) => [index / (count - 1) * AREA_WIDTH, y(point.value)] as const)
  const line = smoothLine(coords)
  const area = `${line} L${AREA_WIDTH} ${AREA_HEIGHT} L0 ${AREA_HEIGHT} Z`
  const lastY = coords[count - 1]![1]
  const averageLine = average === undefined || average.length !== count
    ? ''
    : smoothLine(average.map((point, index) => [index / (count - 1) * AREA_WIDTH, y(point.value)] as const))
  const hover = (event: MouseEvent<HTMLDivElement>): void => {
    const rect = frame.current?.getBoundingClientRect()
    if (rect === undefined || rect.width === 0) return
    const ratio = (event.clientX - rect.left) / rect.width
    setActive(Math.max(0, Math.min(count - 1, Math.round(ratio * (count - 1)))))
  }
  return (
    <div
      className={styles.usageArea}
      ref={frame}
      onMouseMove={hover}
      onMouseLeave={() => setActive(null)}
    >
      <div className={styles.usageChartGrid} aria-hidden="true">
        <span style={{ top: '25%' }} />
        <span style={{ top: '50%' }} />
        <span style={{ top: '75%' }} />
      </div>
      <svg
        viewBox={`0 0 ${AREA_WIDTH} ${AREA_HEIGHT}`}
        preserveAspectRatio="none"
        className={styles.usageAreaSvg}
        role="img"
        aria-label={summary}
      >
        <defs>
          <linearGradient id="dsh-usage-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--dsw-alias-state-business-primary)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--dsw-alias-state-business-primary)" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#dsh-usage-area-fill)" />
        <path
          d={line}
          fill="none"
          stroke="var(--dsw-alias-state-business-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {averageLine !== '' && (
          <path
            d={averageLine}
            fill="none"
            stroke="var(--dsw-alias-state-warn-primary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      <span className={styles.usageSparkDot} style={{ top: `${lastY / AREA_HEIGHT * 100}%` }} aria-hidden="true" />
      {active !== null && (
        <>
          <span className={styles.usageAreaLine} style={{ left: `${active / (count - 1) * 100}%` }} aria-hidden="true" />
          <span
            className={styles.usageAreaDot}
            style={{ left: `${active / (count - 1) * 100}%`, top: `${coords[active]![1] / AREA_HEIGHT * 100}%` }}
            aria-hidden="true"
          />
          <div
            className={styles.usageTip}
            style={active === 0
              ? { left: 0 }
              : active === count - 1
                ? { right: 0 }
                : { left: `${(active + 0.5) / count * 100}%`, transform: 'translateX(-50%)' }}
            aria-hidden="true"
          >
            <span className={styles.usageTipDate}>{formatPoint?.(points[active]!) ?? formatDayFull(points[active]!.date)}</span>
            <span className={styles.usageTipFoot}>
              <span>{format(points[active]!.value)}</span>
              {average !== undefined && average[active] !== undefined && movingAverageLabel !== undefined && (
                <span>{movingAverageLabel(format(average[active]!.value))}</span>
              )}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

/** One donut segment. */
export interface DonutSlice {
  key: string
  label: string
  color: string
  value: number
}

/** Default donut geometry (px). */
const DONUT_SIZE = 140
const DONUT_RADIUS = 54
const DONUT_STROKE = 16
/** Breathing room between segments, in path-length units. */
const DONUT_GAP = 2.5

/**
 * A donut of series shares with the window total in the middle. Segments
 * sweep open from twelve o'clock on mount: they render at length zero and
 * transition to their share once mounted (reduced motion renders them full
 * size straight away). `size` scales the whole geometry.
 */
export function UsageDonut({ slices, centerValue, centerLabel, size = DONUT_SIZE }: {
  slices: readonly DonutSlice[]
  centerValue: string
  centerLabel: string
  size?: number
}) {
  const shown = slices.filter(slice => slice.value > 0)
  const total = shown.reduce((sum, slice) => sum + slice.value, 0)
  const radius = DONUT_RADIUS / DONUT_SIZE * size
  const stroke = DONUT_STROKE / DONUT_SIZE * size
  const circumference = 2 * Math.PI * radius
  const gap = shown.length > 1 ? DONUT_GAP : 0
  const center = size / 2
  const [drawn, setDrawn] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const frame = requestAnimationFrame(() => setDrawn(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  let offset = 0
  return (
    <div className={styles.usageDonut} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className={styles.usageDonutSvg} aria-hidden="true">
        {total === 0 ? (
          <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--dsw-alias-interactive-bg-hover)" strokeWidth={stroke} />
        ) : (
          shown.map((slice) => {
            const length = slice.value / total * circumference
            const start = offset
            offset += length
            return (
              <circle
                key={slice.key}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth={stroke}
                className={styles.usageDonutSegment}
                strokeDasharray={`${drawn ? Math.max(length - gap, 0.5) : 0.5} ${circumference}`}
                strokeDashoffset={-(start + gap / 2)}
              >
                <title>{`${slice.label} · ${formatTokens(slice.value)}`}</title>
              </circle>
            )
          })
        )}
      </svg>
      <div className={styles.usageDonutCenter}>
        <span className={styles.usageDonutValue}>{centerValue}</span>
        <span className={styles.usageLabel}>{centerLabel}</span>
      </div>
    </div>
  )
}

/** Lazy weekday label formatter (Monday = index 0). */
let weekdayLabel: Intl.DateTimeFormat | undefined

function weekdayName(index: number): string {
  weekdayLabel ??= new Intl.DateTimeFormat(undefined, { weekday: 'narrow' })
  // 2024-01-01 was a Monday, so the first seven days of that year are the
  // weekday sequence with Monday first.
  return weekdayLabel.format(new Date(2024, 0, 1 + index))
}

/** Lazy short month label formatter, for the calendar's month header. */
let monthLabel: Intl.DateTimeFormat | undefined

function monthName(date: string): string {
  monthLabel ??= new Intl.DateTimeFormat(undefined, { month: 'short' })
  return monthLabel.format(new Date(`${date}T12:00:00`))
}

/** A cell's theme-safe heat color: share 0..1 lifts a faint hue to the solid. */
function heatColor(share: number): string {
  const strength = Math.round(10 + share * 70)
  return `color-mix(in srgb, var(--dsw-alias-state-business-primary) ${strength}%, transparent)`
}

// ── activity calendar (GitHub style, 53 weeks) ───────────────────────────────

/** Heatmap cell edge length (px) — GitHub's density: 12px on a 4px gap. */
const CALENDAR_CELL_PX = 12
/** Cell gap (px). */
const CALENDAR_CELL_GAP_PX = 4
/** Cell pitch = edge + gap; tooltip positioning computes columns from it. */
const CALENDAR_PITCH_PX = CALENDAR_CELL_PX + CALENDAR_CELL_GAP_PX
/** Width of the weekday label column left of the grid (px). */
const CALENDAR_LABEL_PX = 22

/** Calendar intensity 0–4: 0 = no activity, then quartiles of the grid's max day. */
function calendarLevel(tokens: number, maxTokens: number): 0 | 1 | 2 | 3 | 4 {
  if (tokens <= 0 || maxTokens <= 0) return 0
  const ratio = tokens / maxTokens
  if (ratio <= 0.25) return 1
  if (ratio <= 0.5) return 2
  if (ratio <= 0.75) return 3
  return 4
}

/** color-mix percentages of the business hue for levels 0–4. */
const CALENDAR_MIX_PERCENT = [0, 18, 38, 60, 84] as const

/**
 * The empty cell's tint: quiet but PRESENT — a level-0 cell that matches the
 * panel background makes the whole year grid invisible, which is how this
 * calendar read before. Same recipe as the hour heatmap's cells.
 */
const CALENDAR_EMPTY = 'color-mix(in srgb, var(--dsw-alias-label-tertiary) 9%, transparent)'

function calendarCellColor(level: 0 | 1 | 2 | 3 | 4): string {
  const percent = CALENDAR_MIX_PERCENT[level]!
  if (percent === 0) return CALENDAR_EMPTY
  return `color-mix(in srgb, var(--dsw-alias-state-business-primary) ${percent}%, ${CALENDAR_EMPTY})`
}

/** The less → more legend swatches (levels 0–4), the calendar's own key. */
export function CalendarLegendSwatches() {
  return (
    <>
      {([0, 1, 2, 3, 4] as const).map(level => (
        <span
          key={level}
          className={styles.usageCalendarLegendSwatch}
          style={{ background: calendarCellColor(level) }}
          aria-hidden="true"
        />
      ))}
    </>
  )
}

/**
 * The activity calendar, GitHub-contribution style: one cell per day over
 * the fixed 53-week grid, weeks as columns, the newest weeks scrolled into
 * view, intensity in five discrete levels (quartiles of the grid's max day).
 * Hovering a cell raises a tooltip with the day and its tokens — or the
 * no-activity label — positioned away from the scroll container's edges.
 * The day table below carries the figures, so the grid is one labeled image.
 */
export function UsageCalendar({ days, summary, noActivityLabel, tokensLabel, onPickDay, pickedDate }: {
  days: readonly UsageDay[]
  summary: string
  noActivityLabel: string
  tokensLabel: (formatted: string) => string
  /** When set, a day cell click drills into that day's sessions. */
  onPickDay?: ((date: string) => void) | undefined
  /** The day the current drill-down came from; its cell keeps an outline. */
  pickedDate?: string | undefined
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [hovered, setHovered] = useState<{ week: number; day: number; cell: UsageDay } | null>(null)

  // Chronological cells chunk into week columns; the trailing partial week
  // pads with null cells so every column keeps its weekday alignment.
  const weeks = useMemo(() => {
    const columns: (UsageDay | null)[][] = []
    for (let i = 0; i < days.length; i += 7) {
      const column = days.slice(i, i + 7) as (UsageDay | null)[]
      while (column.length < 7) column.push(null)
      columns.push(column)
    }
    return columns
  }, [days])
  const maxTokens = useMemo(() => Math.max(0, ...days.map(day => dayTotal(day))), [days])
  // A month label over each week column whose first day opens a new month;
  // the label spans the columns until the next month change.
  const monthSpans = useMemo(() => {
    const raw = weeks.map((column) => {
      const first = column.find(cell => cell !== null)
      return first === undefined ? null : monthName(first.date)
    })
    const spans: number[] = []
    raw.forEach((label, week) => {
      if (label !== null && label !== raw[week - 1]) {
        let end = week + 1
        while (end < raw.length && raw[end] === label) end += 1
        spans[week] = end - week
      }
    })
    return spans
  }, [weeks])

  // Most recent weeks matter most — start scrolled to the right end.
  useEffect(() => {
    const el = scrollRef.current
    if (el !== null) el.scrollLeft = el.scrollWidth
  }, [])

  return (
    <div ref={scrollRef} className={styles.usageCalendar} role="img" aria-label={summary}>
      <div className={styles.usageCalendarGrid}>
        <div className={styles.usageCalendarMonthRow} style={{ gridTemplateColumns: `repeat(${weeks.length}, ${CALENDAR_CELL_PX}px)`, marginLeft: CALENDAR_LABEL_PX + CALENDAR_CELL_GAP_PX }}>
          {weeks.map((column, week) => {
            // `monthSpans` seats an entry exactly where a month opens.
            const span = monthSpans[week]
            if (span === undefined) return null
            const label = monthName(column.find(cell => cell !== null)!.date)
            return (
              <span
                key={label + String(week)}
                className={styles.usageCalendarMonth}
                style={{ gridColumn: `${week + 1} / span ${span}` }}
              >
                {label}
              </span>
            )
          })}
        </div>
        <div className={styles.usageCalendarBody}>
          {/* GitHub's weekday rail: labels on Monday, Wednesday, Friday only. */}
          <div className={styles.usageCalendarWeekdays} aria-hidden="true">
            {Array.from({ length: 7 }, (_, day) => (
              <span key={day}>{day % 2 === 0 && day < 5 ? weekdayName(day) : ''}</span>
            ))}
          </div>
          <div className={styles.usageCalendarWeekRow}>
            {weeks.map((column, week) => (
              // oxlint-disable-next-line react/no-array-index-key -- weeks are a fixed positional grid
              <div key={week} className={styles.usageCalendarWeek}>
                {column.map((cell, day) => cell === null ? (
                  // oxlint-disable-next-line react/no-array-index-key -- trailing pad cells of the last week
                  <span key={`pad-${day}`} className={styles.usageCalendarCell} aria-hidden="true" />
                ) : (
                  <span
                    key={cell.date}
                    role="img"
                    aria-label={`${cell.date}: ${dayTotal(cell)}`}
                    className={`${styles.usageCalendarCell}${onPickDay === undefined ? '' : ` ${styles.usagePickable}`}${cell.date === pickedDate ? ` ${styles.usagePicked}` : ''}`}
                    style={{ background: calendarCellColor(calendarLevel(dayTotal(cell), maxTokens)) }}
                    onClick={onPickDay === undefined ? undefined : () => onPickDay(cell.date)}
                    onMouseEnter={() => setHovered({ week, day, cell })}
                    onMouseLeave={() => setHovered(null)}
                  />
                ))}
              </div>
            ))}
            {hovered !== null && (
              <div
                className={styles.usageTip}
                style={{
                  left: hovered.week * CALENDAR_PITCH_PX + CALENDAR_CELL_PX / 2,
                  top: hovered.day < 2 ? (hovered.day + 1) * CALENDAR_PITCH_PX + 2 : hovered.day * CALENDAR_PITCH_PX - 4,
                  transform: `translate(${hovered.week > weeks.length - 8 ? '-90%' : hovered.week < 8 ? '-10%' : '-50%'}, ${hovered.day < 2 ? '0' : '-100%'})`,
                }}
                aria-hidden="true"
              >
                <span className={styles.usageTipDate}>{formatDayFull(hovered.cell.date)}</span>
                <span className={styles.usageTipFoot}>
                  {dayTotal(hovered.cell) > 0
                    ? tokensLabel(formatTokens(dayTotal(hovered.cell)))
                    : noActivityLabel}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * The 7×24 hour heatmap: the last seven days as rows, 24 clock slots as
 * columns, each cell colored by the slot's share of the window's busiest
 * hour. The hour heads show every sixth hour; cells carry hover titles.
 */
export function WeekHoursHeatmap({ rows, summary, callsLabel, onPickDay, pickedDate }: {
  rows: readonly UsageDayHours[]
  summary: string
  callsLabel: string
  /** When set, a cell or day-label click drills into that day's sessions. */
  onPickDay?: ((date: string) => void) | undefined
  /** The day the current drill-down came from; its row label keeps an outline. */
  pickedDate?: string | undefined
}) {
  const peak = Math.max(...rows.flatMap(row => row.hours.map(slot => slot.tokens)), 1)
  const pickable = onPickDay === undefined ? '' : ` ${styles.usagePickable}`
  return (
    <div className={styles.usageWeekHours} role="img" aria-label={summary}>
      <span className={styles.usageWeekHead} />
      {Array.from({ length: 24 }, (_, hour) => (
        <span key={hour} className={styles.usageWeekHead}>{hour % 6 === 0 ? hour : ''}</span>
      ))}
      {rows.map(row => (
        <Fragment key={row.date}>
          <span
            className={`${styles.usageWeekDay}${pickable}${row.date === pickedDate ? ` ${styles.usagePicked}` : ''}`}
            onClick={onPickDay === undefined ? undefined : () => onPickDay(row.date)}
          >
            {formatDay(row.date)}
          </span>
          {row.hours.map(slot => (
            <span
              key={slot.hour}
              className={`${styles.usageWeekCell}${pickable}`}
              style={slot.tokens > 0 ? { background: heatColor(slot.tokens / peak) } : undefined}
              title={`${formatDayFull(row.date)} · ${String(slot.hour).padStart(2, '0')}:00 · ${formatTokens(slot.tokens)} · ${slot.calls.toLocaleString()} ${callsLabel}`}
              onClick={onPickDay === undefined ? undefined : () => onPickDay(row.date)}
              aria-hidden="true"
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}

const SPARK_WIDTH = 100
const SPARK_HEIGHT = 28
/** Space between the peak and the top edge, in viewBox units. */
const SPARK_PAD = 2

/**
 * The card's mini area trend: one point per day across the width, today at
 * the right edge with a marker dot. Stretched to the card's width; the
 * non-uniform scale keeps the stroke hairline (`vector-effect`) and the dot
 * is an HTML circle pinned to the last point, so nothing distorts. Renders
 * flat — a draw-on animation would fight the card's refresh beat.
 */
export function TrendSparkline({ days, label }: { days: readonly UsageDay[]; label: string }) {
  const count = days.length
  if (count < 2) return null
  const totals = days.map(day => dayTotal(day))
  const peak = Math.max(...totals, 1)
  const y = (value: number): number => SPARK_HEIGHT - SPARK_PAD - value / peak * (SPARK_HEIGHT - SPARK_PAD * 2)
  const points = totals.map((value, index) => [index / (count - 1) * SPARK_WIDTH, y(value)] as const)
  const line = points.map(([x, pointY], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${pointY.toFixed(2)}`).join(' ')
  const area = `${line} L${SPARK_WIDTH} ${SPARK_HEIGHT} L0 ${SPARK_HEIGHT} Z`
  const lastY = points[count - 1]![1]
  return (
    <div className={styles.usageSpark} role="img" aria-label={label}>
      <svg viewBox={`0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="dsh-usage-spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--dsw-alias-state-business-primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--dsw-alias-state-business-primary)" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#dsh-usage-spark-fill)" />
        <path
          d={line}
          fill="none"
          stroke="var(--dsw-alias-state-business-primary)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {lastY > SPARK_PAD && (
        <span className={styles.usageSparkDot} style={{ top: `${lastY / SPARK_HEIGHT * 100}%` }} aria-hidden="true" />
      )}
    </div>
  )
}

// ── session timeline ────────────────────────────────────────────────────────

/** One model call's placement on the session clock. */
export interface SessionTimelineStep {
  time: number
  durationMs: number | null
  inputTokens: number
  outputTokens: number
  cacheReadTokens: number
  cacheWriteTokens: number
}

/** How many time slices the timeline draws at most. */
const TIMELINE_SLICES = 48

/** `HH:MM` for the axis labels and bucket titles. */
function clockTime(epochMs: number): string {
  const at = new Date(epochMs)
  return `${String(at.getHours()).padStart(2, '0')}:${String(at.getMinutes()).padStart(2, '0')}`
}

/**
 * The session's token flow over real time: the span from the first call to
 * the last is cut into equal-time slices (idle gaps stay empty, so the
 * rhythm reads honestly), each slice a stacked column of the four token
 * kinds, with the cumulative total overlaid as a line and the context size
 * (each call's prompt tokens, the window's fill) as a dashed line. The left
 * axis scales the columns, the right axis (in the line's color) scales the
 * cumulative line, time labels mark the start, middle, and end, hovering
 * raises a crosshair with the slice's breakdown, and dragging selects a
 * range whose subtotal renders under the chart (a plain click clears it).
 */
export function SessionTimeline({
  steps, summary, callsLabel, partLabels, cumulativeLabel, contextLabel, clearLabel, contextWindow = null, preceding = 0,
}: {
  steps: readonly SessionTimelineStep[]
  summary: string
  callsLabel: string
  /** Localized names of the four token kinds, aligned with {@link PARTS}. */
  partLabels: readonly string[]
  /** Localized name of the running total the line draws. */
  cumulativeLabel: string
  /** Localized name of the context-size line. */
  contextLabel: string
  /** Localized label of the selection summary's clear button. */
  clearLabel: string
  /** The route's advertised context window, for the fill percent; null hides it. */
  contextWindow?: number | null
  /** Tokens burned before the carried steps (the tail view of a long
   * session): the cumulative line starts there, not at zero. */
  preceding?: number
}) {
  const [active, setActive] = useState<number | null>(null)
  /** The slice a drag started on; null while not dragging. */
  const [drag, setDrag] = useState<number | null>(null)
  /** The selected slice range (as dragged, may run right-to-left). */
  const [range, setRange] = useState<[number, number] | null>(null)
  const frame = useRef<HTMLDivElement | null>(null)
  const start = Math.min(...steps.map(step => step.time))
  const end = Math.max(...steps.map(step => step.time))
  const span = Math.max(end - start, 1)
  interface Slice { t0: number; t1: number; calls: number; buckets: [number, number, number, number] }
  const slices: Slice[] = Array.from({ length: TIMELINE_SLICES }, (_, index) => ({
    t0: start + span * index / TIMELINE_SLICES,
    t1: start + span * (index + 1) / TIMELINE_SLICES,
    calls: 0,
    buckets: [0, 0, 0, 0],
  }))
  // The context-size series fills in the same pass: each slice's largest
  // prompt (input + cache read + cache write — what sat in the window on
  // that call).
  const contextRaw = slices.map(() => 0)
  for (const step of steps) {
    const at = Math.min(Math.floor((step.time - start) / span * TIMELINE_SLICES), TIMELINE_SLICES - 1)
    const slice = slices[at]!
    slice.calls += 1
    slice.buckets[0] += step.inputTokens
    slice.buckets[1] += step.outputTokens
    slice.buckets[2] += step.cacheReadTokens
    slice.buckets[3] += step.cacheWriteTokens
    const prompt = step.inputTokens + step.cacheReadTokens + step.cacheWriteTokens
    if (prompt > contextRaw[at]!) contextRaw[at] = prompt
  }
  const sliceTotals = slices.map(slice => slice.buckets.reduce((sum, value) => sum + value, 0))
  const peak = Math.max(...sliceTotals, 1)
  const grandTotal = sliceTotals.reduce((sum, value) => sum + value, 0)

  const width = 640
  const height = 190
  const chartTop = 12
  const chartBottom = 150
  const chartLeft = 46
  const chartRight = width - 46
  const chartHeight = chartBottom - chartTop
  const chartWidth = chartRight - chartLeft
  const slot = chartWidth / TIMELINE_SLICES
  const barWidth = Math.max(2, slot * 0.62)

  // The cumulative line climbs the session total over the same slices,
  // starting from what the truncated-away head already burned.
  const lineTotal = Math.max(preceding + grandTotal, 1)
  let climbing = preceding
  const cumulative = sliceTotals.map(total => climbing += total)
  const linePoints = slices.map((_, index) => {
    const x = chartLeft + slot * index + slot / 2
    const y = chartBottom - (cumulative[index]! / lineTotal) * chartHeight
    return `${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ')

  // The context-size line: idle slices carry the last known size forward.
  // Scaled against the advertised window when known, so the line's height
  // reads as fill; against its own peak otherwise.
  let carried = 0
  const contextLine = contextRaw.map(value => carried = value > 0 ? value : carried)
  const contextFirst = contextRaw.findIndex(value => value > 0)
  const contextMax = Math.max(contextWindow ?? 0, ...contextLine, 1)
  const contextPoints = contextFirst < 0 ? '' : contextLine.slice(contextFirst).map((value, offset) => {
    const x = chartLeft + slot * (contextFirst + offset) + slot / 2
    const y = chartBottom - (value / contextMax) * chartHeight
    return `${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ')
  // Bottom anchors: session start, midpoint, and the true end — the last
  // slice's START would undersell the right edge by one slice's span.
  const ticks: { x: number; anchor: 'start' | 'middle' | 'end'; label: string }[] = [
    { x: chartLeft, anchor: 'start', label: clockTime(start) },
    { x: chartLeft + chartWidth / 2, anchor: 'middle', label: clockTime(start + span / 2) },
    { x: chartRight, anchor: 'end', label: clockTime(end) },
  ]

  const indexAt = (event: MouseEvent<HTMLDivElement>): number | null => {
    const rect = frame.current?.getBoundingClientRect()
    if (rect === undefined || rect.width === 0) return null
    const viewX = (event.clientX - rect.left) / rect.width * width
    return Math.max(0, Math.min(TIMELINE_SLICES - 1, Math.floor((viewX - chartLeft) / slot)))
  }
  const activeSlice = active === null ? null : slices[active]!

  // The selection, drag order normalized, with the range's own subtotal.
  const selection = range === null ? null : (() => {
    const [lo, hi] = range[0] <= range[1] ? range : [range[1], range[0]]
    const buckets: [number, number, number, number] = [0, 0, 0, 0]
    let calls = 0
    for (let index = lo; index <= hi; index += 1) {
      calls += slices[index]!.calls
      for (let part = 0; part < 4; part += 1) buckets[part] += slices[index]!.buckets[part]!
    }
    return { lo, hi, calls, buckets, total: buckets.reduce((sum, value) => sum + value, 0) }
  })()

  return (
    <>
      <div
        className={styles.usageTimelineFrame}
        ref={frame}
        onMouseDown={(event) => {
          event.preventDefault()
          const index = indexAt(event)
          if (index === null) return
          setDrag(index)
          setRange([index, index])
        }}
        onMouseUp={() => {
          if (drag === null) return
          setDrag(null)
          // A plain click (no drag) clears the selection instead of keeping it.
          if (range !== null && range[0] === range[1]) setRange(null)
        }}
        onMouseMove={(event) => {
          const index = indexAt(event)
          if (index === null) return
          setActive(index)
          if (drag !== null) setRange([drag, index])
        }}
        onMouseLeave={() => {
          setActive(null)
          setDrag(null)
        }}
      >
        <svg
          className={styles.usageTimeline}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={summary}
        >
          {/* Dashed gridlines with the two scales' ticks: the columns' peak on
            the left, the cumulative line's total on the right. */}
          {[0.25, 0.5, 0.75, 1].map((level) => {
            const y = chartBottom - level * chartHeight
            return (
              <g key={level}>
                <line className={styles.usageTimelineGrid} x1={chartLeft} x2={chartRight} y1={y} y2={y} />
                {(level === 0.5 || level === 1) && (
                  <>
                    <text className={styles.usageTimelineLabel} textAnchor="end" x={chartLeft - 6} y={y + 3}>
                      {formatTokens(peak * level)}
                    </text>
                    <text className={styles.usageTimelineLabelLine} textAnchor="start" x={chartRight + 6} y={y + 3}>
                      {formatTokens(lineTotal * level)}
                    </text>
                  </>
                )}
              </g>
            )
          })}
          <line className={styles.usageTimelineAxis} x1={chartLeft} x2={chartRight} y1={chartBottom} y2={chartBottom} />
          {ticks.map(tick => (
            <text
              key={tick.label + tick.anchor}
              className={styles.usageTimelineLabel}
              textAnchor={tick.anchor}
              x={tick.x}
              y={chartBottom + 18}
            >
              {tick.label}
            </text>
          ))}
          {slices.map((slice, index) => {
            const total = sliceTotals[index]!
            if (total === 0) return null
            const x = chartLeft + slot * index + (slot - barWidth) / 2
            const scale = chartHeight / peak
            let y = chartBottom
            return (
              <g key={slice.t0}>
                {slice.buckets.map((value, part) => {
                  if (value === 0) return null
                  const sliceHeight = Math.max(1, value * scale)
                  y -= sliceHeight
                  return (
                    <rect
                      key={PARTS[part]!.key}
                      x={x}
                      y={y}
                      width={barWidth}
                      height={sliceHeight}
                      rx={1.5}
                      fill={PARTS[part]!.color}
                    />
                  )
                })}
              </g>
            )
          })}
          <path
            className={styles.usageTimelineArea}
            d={`M ${chartLeft},${chartBottom} L ${linePoints.replaceAll(' ', ' L ')} L ${chartRight},${chartBottom} Z`}
          />
          <polyline
            className={styles.usageTimelineLine}
            points={`${chartLeft},${chartBottom} ${linePoints}`}
          />
          {contextPoints !== '' && (
            <polyline className={styles.usageTimelineContext} points={contextPoints} />
          )}
        </svg>
        {selection !== null && (
          <span
            className={styles.usageTimelineBrush}
            style={{
              left: `${(chartLeft + slot * selection.lo) / width * 100}%`,
              width: `${slot * (selection.hi - selection.lo + 1) / width * 100}%`,
              top: `${chartTop / height * 100}%`,
              height: `${chartHeight / height * 100}%`,
            }}
            aria-hidden="true"
          />
        )}
        {active !== null && activeSlice !== null && drag === null && (
          <>
            <span
              className={styles.usageAreaLine}
              style={{ left: `${(chartLeft + slot * (active + 0.5)) / width * 100}%` }}
              aria-hidden="true"
            />
            <div
              className={styles.usageTip}
              style={active < 6
                ? { left: `${chartLeft / width * 100}%` }
                : active > TIMELINE_SLICES - 7
                  ? { right: `${(width - chartRight) / width * 100}%` }
                  : { left: `${(chartLeft + slot * (active + 0.5)) / width * 100}%`, transform: 'translateX(-50%)' }}
              aria-hidden="true"
            >
              <span className={styles.usageTipDate}>{`${clockTime(activeSlice.t0)}–${clockTime(activeSlice.t1)}`}</span>
              {/* All four kinds, zeros included — a hidden zero row would make
                the mix read differently from slice to slice. */}
              {activeSlice.buckets.map((value, part) => (
                <div key={PARTS[part]!.key} className={styles.usageTipRow}>
                  <span className={styles.usageDot} style={{ background: PARTS[part]!.color }} aria-hidden="true" />
                  <span className={styles.usageTipName}>{partLabels[part]}</span>
                  <span className={styles.usageTipShare}>{value.toLocaleString()}</span>
                </div>
              ))}
              {contextLine[active]! > 0 && (
                <div className={styles.usageTipRow}>
                  <span className={styles.usageDot} style={{ background: 'var(--dsw-alias-label-secondary)' }} aria-hidden="true" />
                  <span className={styles.usageTipName}>{contextLabel}</span>
                  <span className={styles.usageTipShare}>
                    {formatTokens(contextLine[active]!)}
                    {contextWindow !== null && contextWindow > 0 && ` · ${formatPercent(contextLine[active]! / contextWindow)}`}
                  </span>
                </div>
              )}
              <span className={styles.usageTipFoot}>
                {activeSlice.calls > 0 && <span>{activeSlice.calls} {callsLabel}</span>}
                <span>{cumulativeLabel} {formatTokens(cumulative[active]!)}</span>
              </span>
            </div>
          </>
        )}
      </div>
      {/* The chart's key — the four stacked kinds, the two overlay lines —
          and the dragged range's subtotal. */}
      <div className={styles.usageLegend}>
        {PARTS.map((part, index) => (
          <span key={part.key} className={styles.usageLegendItem}>
            <span className={styles.usageDot} style={{ background: part.color }} aria-hidden="true" />
            <span className={styles.usageLegendName}>{partLabels[index]}</span>
          </span>
        ))}
        <span className={styles.usageLegendItem}>
          <span className={styles.usageTimelineSwatchLine} aria-hidden="true" />
          <span className={styles.usageLegendName}>{cumulativeLabel}</span>
        </span>
        {contextPoints !== '' && (
          <span className={styles.usageLegendItem}>
            <span className={styles.usageTimelineSwatchContext} aria-hidden="true" />
            <span className={styles.usageLegendName}>{contextLabel}</span>
          </span>
        )}
        {selection !== null && (
          <>
            <span className={styles.usageLegendItem}>
              <span className={styles.usageValue}>
                {`${clockTime(slices[selection.lo]!.t0)}–${clockTime(slices[selection.hi]!.t1)}`}
                {' · '}
                {formatTokens(selection.total)}
                {' · '}
                {selection.calls} {callsLabel}
              </span>
            </span>
            {selection.buckets.map((value, part) => (
              <span key={PARTS[part]!.key} className={styles.usageLegendItem} title={value.toLocaleString()}>
                <span className={styles.usageDot} style={{ background: PARTS[part]!.color }} aria-hidden="true" />
                <span className={styles.usageLegendName}>{partLabels[part]}</span>
                <span className={styles.usageValue}>{formatTokens(value)}</span>
              </span>
            ))}
            <button type="button" className={styles.usageWindowChoice} onClick={() => setRange(null)}>
              {clearLabel}
            </button>
          </>
        )}
      </div>
    </>
  )
}
