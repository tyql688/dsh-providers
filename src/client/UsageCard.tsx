/**
 * The sidebar-foot usage card: today's token total, its cost at catalog
 * rates, the 14-day trend the figures ride on, and the input/output/cache
 * mix as shares — the figures dsh's own session logs account, summed
 * Host-side by this plugin's `usage` route. Clicking it opens the statistics
 * dialog. The collapsed rail gets a bare chart icon that opens the same
 * dialog, the way the shell's own foot rows collapse to icons — otherwise
 * the statistics panel would be unreachable on narrow screens.
 */

import { useEffect, useState } from 'react'
import type { SnapshotSelectorHook, Translate } from '@deepseek-ai/dsh-client-ui-slots'
import type { UsageState, UsageStore } from './usage-store.ts'
import type { AccountsKey } from './locales.ts'
import { AnimatedNumber, dayTotal, formatCost, formatShare, formatTokens, PARTS } from './usage-format.tsx'
import { TrendSparkline } from './usage-charts.tsx'
import { UsageDialog } from './UsageDialog.tsx'
import styles from './AccountsSection.module.css'

/** How often the figures refresh while the page is visible. */
const REFRESH_MS = 60_000

/** Injected dependencies of {@link UsageCard} (the slot `inject` face). */
export interface UsageCardInjected {
  controller: UsageStore
  useSnapshot: SnapshotSelectorHook<UsageState>
}

/**
 * Props: the sidebar's column state, the inject face spread flat, and the
 * framework locale seat (`locale` registration option), which re-renders the
 * card when the display language flips.
 */
export type UsageCardProps = { wide?: boolean; t?: Translate<AccountsKey> } & Partial<UsageCardInjected>

/** Render the wide card, or the rail's icon button when collapsed. */
export function UsageCard({ wide, controller, useSnapshot, t }: UsageCardProps) {
  const bound = controller !== undefined && useSnapshot !== undefined && t !== undefined
  if (!bound) return null
  return wide === true
    ? <Card controller={controller} useSnapshot={useSnapshot} t={t} />
    : <RailButton controller={controller} useSnapshot={useSnapshot} t={t} />
}

/** The collapsed rail's entry point: one chart glyph that opens the dialog. */
function RailButton({ controller, useSnapshot, t }: UsageCardInjected & { t: Translate<AccountsKey> }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        className={styles.usageRailButton}
        title={t('usageDialogTitle')}
        aria-label={t('usageDialogTitle')}
        onClick={() => setOpen(true)}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 13V8M8 13V3M13 13v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <UsageDialog
          controller={controller}
          useSnapshot={useSnapshot}
          t={t}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

/** The card proper, mounted only while wide and bound. */
function Card({ controller, useSnapshot, t }: UsageCardInjected & { t: Translate<AccountsKey> }) {
  const state = useSnapshot(snapshot => snapshot)
  const [open, setOpen] = useState(false)

  // Refresh on mount, then on a slow beat while the page is visible; a tab
  // coming back from the background refreshes immediately.
  useEffect(() => {
    void controller.load()
    const tick = (): void => {
      if (!document.hidden) void controller.load()
    }
    const timer = setInterval(tick, REFRESH_MS)
    document.addEventListener('visibilitychange', tick)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [controller])

  const today = state.today
  const total = today === null ? 0 : dayTotal(today)
  const notes: string[] = [t('usageDetail', { amount: total.toLocaleString() })]
  if (state.error !== null) notes.push(t('usageFailed', { message: state.error }))
  if (state.skippedSessions > 0) notes.push(t('usageIncomplete', { count: state.skippedSessions }))
  if (today !== null && today.unpricedTokens > 0) {
    notes.push(t('usageUnpriced', { amount: today.unpricedTokens.toLocaleString() }))
  }
  const approximate = today !== null && today.unpricedTokens > 0

  return (
    <>
      <button
        type="button"
        className={styles.usageCard}
        title={notes.join('\n')}
        aria-label={t('usageDialogTitle')}
        onClick={() => setOpen(true)}
      >
        <div className={styles.usageHead}>
          <span className={styles.usageTitle}>{t('usageTitle')}</span>
          {state.error !== null && <span className={styles.usageAlert} aria-hidden="true">!</span>}
          <span className={styles.usageCost}>
            {today === null ? '—' : (
              <>
                {approximate && '≈'}
                <AnimatedNumber value={today.cost} format={formatCost} />
              </>
            )}
          </span>
        </div>
        <div className={styles.usageTotal}>
          {today === null
            ? (state.loading ? '…' : '—')
            : <AnimatedNumber value={total} format={formatTokens} />}
        </div>
        {state.trend.length > 1 && (
          <div className={styles.usageTrend}>
            <TrendSparkline
              days={state.trend}
              label={`${t('usageTrend')} · ${t('usageWindowDays', { count: state.trend.length })}`}
            />
          </div>
        )}
        <div className={styles.usageBar} aria-hidden="true">
          {today !== null && total > 0 && PARTS.map(part => (
            <span
              key={part.key}
              style={{ width: `${today[part.field] / total * 100}%`, background: part.color }}
            />
          ))}
        </div>
        <dl className={styles.usageGrid}>
          {PARTS.map(part => (
            <div key={part.key} className={styles.usageEntry}>
              <span className={styles.usageDot} style={{ background: part.color }} aria-hidden="true" />
              <dt className={styles.usageLabel}>{t(part.key)}</dt>
              <dd
                className={styles.usageValue}
                title={today === null
                  ? undefined
                  : `${today[part.field].toLocaleString()} · ${total > 0 ? formatShare(today[part.field] / total) : '—'}`}
              >
                {today === null ? '—' : formatTokens(today[part.field])}
              </dd>
            </div>
          ))}
        </dl>
        <span className={styles.usageStatus} role={state.error === null ? 'status' : 'alert'}>
          {notes.join(' ')}
        </span>
      </button>
      {open && (
        <UsageDialog
          controller={controller}
          useSnapshot={useSnapshot}
          t={t}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
