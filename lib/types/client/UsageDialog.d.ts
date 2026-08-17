/**
 * The usage statistics panel the sidebar card opens — a hero-first
 * dashboard. One hero card carries the window's three headline figures with
 * their period-over-period pills and the day trend beneath (a smooth area
 * for the total or cost, stacked columns by model or by token kind), then a
 * row of the model share donut beside the GitHub-style usage calendar with
 * weekday rhythm, the last week's hour heatmap beside the tool ranking, the
 * model ranking table, recent sessions beside projects, and the
 * recent-first day table. Figures come from the same Host `usage` route as
 * the card, fetched fresh on open and on every window switch.
 */
import type { SnapshotSelectorHook, Translate } from '@deepseek-ai/dsh-client-ui-slots';
import type { UsageState, UsageStore } from './usage-store.ts';
import type { AccountsKey } from './locales.ts';
/** Props of {@link UsageDialog}. */
export interface UsageDialogProps {
    controller: UsageStore;
    useSnapshot: SnapshotSelectorHook<UsageState>;
    t: Translate<AccountsKey>;
    onClose: () => void;
}
/** Render the usage statistics panel. */
export declare function UsageDialog({ controller, useSnapshot, t, onClose }: UsageDialogProps): import("react").JSX.Element;
