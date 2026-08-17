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
import type { UsageDay, UsageResponse } from '../wire.ts';
/** The dialog's window choices; `7` is the default. */
export type UsageWindowDays = 'today' | 'all' | number;
/** What the surfaces render. Loaded figures survive a failed refresh; the errors report it. */
export interface UsageState {
    today: UsageDay | null;
    /** The card's trend window, oldest first, today last; empty before the first load. */
    trend: UsageDay[];
    skippedSessions: number;
    loading: boolean;
    error: string | null;
    /** The dialog's window: every grouping the route serves. Null before its first load. */
    window: UsageResponse | null;
    /** Day window `window` was loaded for; tells a stale window from the selected one. */
    windowDays: UsageWindowDays;
    /** Epoch ms of the last window landing; a fresh default window skips the dialog's own fetch. */
    windowAt: number;
    /**
     * The equally long period right before the window, for trend deltas.
     * Empty when the window is `all`, or before the first load.
     */
    previous: UsageDay[];
    windowLoading: boolean;
    windowError: string | null;
}
/** Fetches and holds the usage figures. */
export declare class UsageStore {
    private readonly origin;
    private state;
    private readonly listeners;
    /** Increment per load so a slow reply cannot overwrite a newer one; one per surface. */
    private generation;
    private windowGeneration;
    /** @param origin - where the usage route is served; the page's own origin. */
    constructor(origin?: string);
    getSnapshot(): UsageState;
    subscribe(listener: () => void): () => void;
    private set;
    /**
     * Call the usage route for one day span, optionally capping its groupings
     * to the last `windowDays` of the span (see the route's `window` param),
     * or for the all-time span. Missing grouping fields — a host running an
     * older bundle — read as empty rather than crashing the dialog's render.
     */
    private fetchUsage;
    /** Refresh the card's figures; a failure keeps the last good numbers on screen. */
    load(): Promise<void>;
    /**
     * Refresh the dialog's window plus the period before it. A fixed window
     * arrives in one doubled fetch with the window cap — the route scans the
     * corpus once per request, and the card's beat already holds the default
     * window, so a warm today-view open skips the fetch entirely. The `all`
     * range has no preceding period. A failure keeps the last good window on
     * screen.
     */
    loadWindow(days: UsageWindowDays): Promise<void>;
    dispose(): void;
}
