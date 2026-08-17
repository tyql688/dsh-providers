/**
 * The current session's usage panel: totals over cost, the token mix, the
 * per-model split, the tool traffic, and a per-step timeline — the same
 * accounting the trajectory shows as steps, folded Host-side from the
 * session log (descendant subagent sessions folded into their own rows)
 * and refreshed on a slow beat. Rendered by the conversation's stats view
 * tab.
 */
import type { Translate } from '@deepseek-ai/dsh-client-ui-slots';
import type { AccountsKey } from './locales.ts';
/** Props of {@link SessionUsagePanel}. */
export interface SessionUsagePanelProps {
    sessionId: string;
    t: Translate<AccountsKey>;
}
/** Render the current session's usage figures, refreshing on a slow beat. */
export declare function SessionUsagePanel({ sessionId, t }: SessionUsagePanelProps): import("react").JSX.Element;
