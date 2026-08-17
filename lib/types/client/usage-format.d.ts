/**
 * Shared figures vocabulary of the usage card and its statistics dialog:
 * formatters, the four-bucket mix table, and the tweened number. One module
 * so the card and the dialog can never disagree about a color or a unit.
 */
import type { UsageBuckets } from '../wire.ts';
/** Compact token count for the card's figures: 12.3K, 4.5M. */
export declare function formatTokens(amount: number): string;
/** Dollar figure at estimate precision; sub-cent spend still reads as spend. */
export declare function formatCost(amount: number): string;
/** Short localized day label for chart axes, e.g. `8/15`. */
export declare function formatDay(date: string): string;
/** Day label with the weekday, for tooltips and the day table: `周三 8/15`. */
export declare function formatDayFull(date: string): string;
/** Whole-percent share for the cache-hit tile. */
export declare function formatPercent(ratio: number): string;
/** Whole calls for a figure; the tween hands fractional values mid-flight. */
export declare function formatCalls(amount: number): string;
/** Compact duration for the activity figures: 45s, 23m, 1.4h. */
export declare function formatDuration(ms: number): string;
/** One-decimal share for legends and rankings: 42.3%. */
export declare function formatShare(ratio: number): string;
/** Muted color of every "other" catch-all series. */
export declare const OTHER_COLOR = "var(--dsw-alias-label-tertiary)";
/** The rank's series color. */
export declare function seriesColor(index: number): string;
/** How many ranked series get their own color before collapsing into other. */
export declare const MAX_SERIES: 4;
/** All four buckets of one slice, the figure every total in the UI sums. */
export declare function dayTotal(day: Pick<UsageBuckets, 'inputTokens' | 'outputTokens' | 'cacheReadTokens' | 'cacheWriteTokens'>): number;
/**
 * The four mix segments. The prompt side stays one family — solid business
 * blue for input, a tint of it for cache read — against the green output,
 * while cache write wears the warn hue: it is the one bucket that becomes
 * tomorrow's input, so it stands apart from both. Tints mix the theme
 * alias, so both themes keep their own hue.
 */
export declare const PARTS: readonly [{
    readonly key: "usageInput";
    readonly field: "inputTokens";
    readonly color: "var(--dsw-alias-state-business-primary)";
}, {
    readonly key: "usageOutput";
    readonly field: "outputTokens";
    readonly color: "var(--dsw-alias-state-success-primary)";
}, {
    readonly key: "usageCacheRead";
    readonly field: "cacheReadTokens";
    readonly color: "color-mix(in srgb, var(--dsw-alias-state-business-primary) 42%, transparent)";
}, {
    readonly key: "usageCacheWrite";
    readonly field: "cacheWriteTokens";
    readonly color: "var(--dsw-alias-state-warn-primary)";
}];
/**
 * One figure that counts toward its target instead of jumping: an ease-out
 * tween from the previously shown value, re-aimed whenever the target moves.
 * A fresh mount starts at zero, so the card opens with a count-up. Reduced
 * motion snaps straight to the target.
 */
export declare function AnimatedNumber({ value, format }: {
    value: number;
    format: (amount: number) => string;
}): import("react").JSX.Element;
