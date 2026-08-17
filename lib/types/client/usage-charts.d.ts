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
import type { UsageDay, UsageDayHours } from '../wire.ts';
/** One horizontal usage bar: dot, name, share track, share, value. With
 * `onPick` the row turns into a button that drills into the matching
 * sessions; `picked` marks the row the current filter came from. */
export declare function UsageBar({ item, onPick, picked }: {
    item: {
        key: string;
        label: string;
        color: string;
        share: number;
        value: string;
        title?: string | undefined;
        /** Small pill after the name, e.g. the subagent marker. */
        tag?: string | undefined;
    };
    onPick?: (() => void) | undefined;
    picked?: boolean;
}): import("react").JSX.Element;
/** One stacked slice of one day column. */
export interface DaySlice {
    key: string;
    /** Localized series name, shown in the tooltip legend. */
    label: string;
    color: string;
    value: number;
}
/** One column of the stacked day chart, sliced along the caller's dimension. */
export interface StackedDay {
    date: string;
    cost: number;
    calls: number;
    slices: DaySlice[];
}
/**
 * The stacked day columns over a shared baseline. Hovering a column raises a
 * tooltip with the day's breakdown (the caller's slices carry their own
 * labels), the day's call count and cost. The chart is one image to assistive
 * tech (`summary` labels it; the per-day figures live in the dialog's day
 * table, so the columns themselves carry no tab stops) and the tooltip is
 * visual only.
 */
export declare function StackedDayChart({ days, summary, callsLabel }: {
    days: readonly StackedDay[];
    summary: string;
    callsLabel: string;
}): import("react").JSX.Element;
/** Stepped day ticks under a chart: every `n/6`-th day, always the last, which
 * is today and wears a marker dot. */
export declare function DayAxis({ days, todayLabel }: {
    days: readonly UsageDay[];
    todayLabel: string;
}): import("react").JSX.Element | null;
/** Clock ticks under the today view's per-hour trend: 0/6/12/18, then now
 * (the now marker merges into its tick when it lands on one). */
export declare function HourAxis({ nowLabel }: {
    nowLabel: string;
}): import("react").JSX.Element;
/** One point of the smooth area chart. */
export interface TrendPoint {
    date: string;
    value: number;
}
/**
 * The smooth area chart of one value per day (the total and cost modes of
 * the trend panel): a gradient area under a curved line, an optional moving
 * average as a dashed line, dashed gridlines, today's marker dot at the
 * right edge, and a hover crosshair with the day's figures. Renders flat;
 * the crosshair is the only motion.
 */
export declare function AreaTrend({ points, average, format, summary, movingAverageLabel, formatPoint }: {
    points: readonly TrendPoint[];
    /** Parallel moving-average series, drawn dashed under the same scale. */
    average?: readonly TrendPoint[] | undefined;
    format: (amount: number) => string;
    summary: string;
    movingAverageLabel?: ((formatted: string) => string) | undefined;
    /** Tooltip title of one point; defaults to its date as a full day label. */
    formatPoint?: ((point: TrendPoint) => string) | undefined;
}): import("react").JSX.Element | null;
/** One donut segment. */
export interface DonutSlice {
    key: string;
    label: string;
    color: string;
    value: number;
}
/**
 * A donut of series shares with the window total in the middle. Segments
 * sweep open from twelve o'clock on mount: they render at length zero and
 * transition to their share once mounted (reduced motion renders them full
 * size straight away). `size` scales the whole geometry.
 */
export declare function UsageDonut({ slices, centerValue, centerLabel, size }: {
    slices: readonly DonutSlice[];
    centerValue: string;
    centerLabel: string;
    size?: number;
}): import("react").JSX.Element;
/** The less → more legend swatches (levels 0–4), the calendar's own key. */
export declare function CalendarLegendSwatches(): import("react").JSX.Element;
/**
 * The activity calendar, GitHub-contribution style: one cell per day over
 * the fixed 53-week grid, weeks as columns, the newest weeks scrolled into
 * view, intensity in five discrete levels (quartiles of the grid's max day).
 * Hovering a cell raises a tooltip with the day and its tokens — or the
 * no-activity label — positioned away from the scroll container's edges.
 * The day table below carries the figures, so the grid is one labeled image.
 */
export declare function UsageCalendar({ days, summary, noActivityLabel, tokensLabel, onPickDay, pickedDate }: {
    days: readonly UsageDay[];
    summary: string;
    noActivityLabel: string;
    tokensLabel: (formatted: string) => string;
    /** When set, a day cell click drills into that day's sessions. */
    onPickDay?: ((date: string) => void) | undefined;
    /** The day the current drill-down came from; its cell keeps an outline. */
    pickedDate?: string | undefined;
}): import("react").JSX.Element;
/**
 * The 7×24 hour heatmap: the last seven days as rows, 24 clock slots as
 * columns, each cell colored by the slot's share of the window's busiest
 * hour. The hour heads show every sixth hour; cells carry hover titles.
 */
export declare function WeekHoursHeatmap({ rows, summary, callsLabel, onPickDay, pickedDate }: {
    rows: readonly UsageDayHours[];
    summary: string;
    callsLabel: string;
    /** When set, a cell or day-label click drills into that day's sessions. */
    onPickDay?: ((date: string) => void) | undefined;
    /** The day the current drill-down came from; its row label keeps an outline. */
    pickedDate?: string | undefined;
}): import("react").JSX.Element;
/**
 * The card's mini area trend: one point per day across the width, today at
 * the right edge with a marker dot. Stretched to the card's width; the
 * non-uniform scale keeps the stroke hairline (`vector-effect`) and the dot
 * is an HTML circle pinned to the last point, so nothing distorts. Renders
 * flat — a draw-on animation would fight the card's refresh beat.
 */
export declare function TrendSparkline({ days, label }: {
    days: readonly UsageDay[];
    label: string;
}): import("react").JSX.Element | null;
/** One model call's placement on the session clock. */
export interface SessionTimelineStep {
    time: number;
    durationMs: number | null;
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
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
export declare function SessionTimeline({ steps, summary, callsLabel, partLabels, cumulativeLabel, contextLabel, clearLabel, contextWindow, preceding, }: {
    steps: readonly SessionTimelineStep[];
    summary: string;
    callsLabel: string;
    /** Localized names of the four token kinds, aligned with {@link PARTS}. */
    partLabels: readonly string[];
    /** Localized name of the running total the line draws. */
    cumulativeLabel: string;
    /** Localized name of the context-size line. */
    contextLabel: string;
    /** Localized label of the selection summary's clear button. */
    clearLabel: string;
    /** The route's advertised context window, for the fill percent; null hides it. */
    contextWindow?: number | null;
    /** Tokens burned before the carried steps (the tail view of a long
     * session): the cumulative line starts there, not at zero. */
    preceding?: number;
}): import("react").JSX.Element;
