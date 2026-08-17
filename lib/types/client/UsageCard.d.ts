/**
 * The sidebar-foot usage card: today's token total, its cost at catalog
 * rates, the 14-day trend the figures ride on, and the input/output/cache
 * mix as shares — the figures dsh's own session logs account, summed
 * Host-side by this plugin's `usage` route. Clicking it opens the statistics
 * dialog. The collapsed rail gets a bare chart icon that opens the same
 * dialog, the way the shell's own foot rows collapse to icons — otherwise
 * the statistics panel would be unreachable on narrow screens.
 */
import type { SnapshotSelectorHook, Translate } from '@deepseek-ai/dsh-client-ui-slots';
import type { UsageState, UsageStore } from './usage-store.ts';
import type { AccountsKey } from './locales.ts';
/** Injected dependencies of {@link UsageCard} (the slot `inject` face). */
export interface UsageCardInjected {
    controller: UsageStore;
    useSnapshot: SnapshotSelectorHook<UsageState>;
}
/**
 * Props: the sidebar's column state, the inject face spread flat, and the
 * framework locale seat (`locale` registration option), which re-renders the
 * card when the display language flips.
 */
export type UsageCardProps = {
    wide?: boolean;
    t?: Translate<AccountsKey>;
} & Partial<UsageCardInjected>;
/** Render the wide card, or the rail's icon button when collapsed. */
export declare function UsageCard({ wide, controller, useSnapshot, t }: UsageCardProps): import("react").JSX.Element | null;
