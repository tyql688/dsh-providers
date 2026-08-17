/**
 * The conversation's stats view tab (对话 / 轨迹 / 统计): the current
 * session's token accounting and tool traffic inline in the session's view
 * ring. One `conversation.view` list entry; the current session id rides
 * the standard sessions feed.
 */

import type { SnapshotSelectorHook, Translate } from '@deepseek-ai/dsh-client-ui-slots'
import type { AccountsKey } from './locales.ts'
import { SessionUsagePanel } from './SessionUsagePanel.tsx'
import styles from './AccountsSection.module.css'

/** The sessions feed's read face the view needs (a structural subset). */
interface SessionListFeed {
  current: string | undefined
}

/** Props of {@link SessionUsageView}: the standard kit plus the view-ring
 * owner props (the inspect handoff belongs to the trajectory tab). */
export interface SessionUsageViewProps {
  useSessions?: SnapshotSelectorHook<SessionListFeed>
  t?: Translate<AccountsKey>
}

/** Render the stats tab for the current session, or nothing without one. */
export function SessionUsageView({ useSessions, t }: SessionUsageViewProps) {
  const sessions = useSessions?.(snapshot => snapshot)
  const current = sessions?.current
  if (current === undefined || t === undefined) return null
  return (
    <div className={styles.usageSessionView}>
      <SessionUsagePanel sessionId={current} t={t} />
    </div>
  )
}
