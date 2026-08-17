/**
 * The conversation's stats view tab (对话 / 轨迹 / 统计): the current
 * session's token accounting and tool traffic inline in the session's view
 * ring. One `conversation.view` list entry; the current session id rides
 * the standard sessions feed.
 */
import type { SnapshotSelectorHook, Translate } from '@deepseek-ai/dsh-client-ui-slots';
import type { AccountsKey } from './locales.ts';
/** The sessions feed's read face the view needs (a structural subset). */
interface SessionListFeed {
    current: string | undefined;
}
/** Props of {@link SessionUsageView}: the standard kit plus the view-ring
 * owner props (the inspect handoff belongs to the trajectory tab). */
export interface SessionUsageViewProps {
    useSessions?: SnapshotSelectorHook<SessionListFeed>;
    t?: Translate<AccountsKey>;
}
/** Render the stats tab for the current session, or nothing without one. */
export declare function SessionUsageView({ useSessions, t }: SessionUsageViewProps): import("react").JSX.Element | null;
export {};
