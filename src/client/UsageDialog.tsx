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

import { Fragment, useEffect, useMemo, useState } from 'react'
import { Modal } from '@deepseek-ai/dsh-client-ui-primitives'
import type { SnapshotSelectorHook, Translate } from '@deepseek-ai/dsh-client-ui-slots'
import type { UsageBuckets, UsageModelRow, UsageResponse } from '../wire.ts'
import type { UsageState, UsageStore } from './usage-store.ts'
import type { AccountsKey } from './locales.ts'
import { ProviderGlyph } from './ProviderGlyph.tsx'
import {
  AnimatedNumber,
  dayTotal,
  formatCalls,
  formatCost,
  formatDay,
  formatDayFull,
  formatDuration,
  formatPercent,
  formatShare,
  formatTokens,
  MAX_SERIES,
  OTHER_COLOR,
  PARTS,
  seriesColor,
} from './usage-format.tsx'
import {
  AreaTrend,
  CalendarLegendSwatches,
  DayAxis,
  HourAxis,
  StackedDayChart,
  UsageBar,
  UsageCalendar,
  UsageDonut,
  WeekHoursHeatmap,
} from './usage-charts.tsx'
import type { StackedDay } from './usage-charts.tsx'
import type { UsageWindowDays } from './usage-store.ts'
import styles from './AccountsSection.module.css'

/** Offered day windows: today, the fixed ranges (7 is the default), and all time. */
const WINDOWS: UsageWindowDays[] = ['today', 7, 30, 90, 'all']

/** The trend chart's value modes; the today view ignores them. */
type TrendMode = 'total' | 'model' | 'kind' | 'cost'

/** The dialog's tab bar: the trend, the breakdowns, and the activity views. */
type UsageTab = 'overview' | 'breakdown' | 'activity'
const TABS: UsageTab[] = ['overview', 'breakdown', 'activity']

/** Ranked rows shown before the rest collapse into one Other row. */
const MAX_MODEL_ROWS = 12
const MAX_TOOL_ROWS = 7
const MAX_PROJECT_ROWS = 6
const MAX_SESSION_ROWS = 8

/** Stagger between neighbouring ranked bars rising in. */
const STAGGER_MS = 25

/** Props of {@link UsageDialog}. */
export interface UsageDialogProps {
  controller: UsageStore
  useSnapshot: SnapshotSelectorHook<UsageState>
  t: Translate<AccountsKey>
  onClose: () => void
}

/** Sum a bucket list into one bucket set. */
function sumBuckets(rows: readonly UsageBuckets[]): UsageBuckets {
  const totals: UsageBuckets = {
    inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0,
    reasoningTokens: 0, cost: 0, cacheSavings: 0, totalDurationMs: 0, maxDurationMs: 0,
    unpricedTokens: 0, calls: 0,
  }
  for (const row of rows) {
    totals.inputTokens += row.inputTokens
    totals.outputTokens += row.outputTokens
    totals.cacheReadTokens += row.cacheReadTokens
    totals.cacheWriteTokens += row.cacheWriteTokens
    totals.reasoningTokens += row.reasoningTokens
    totals.cost += row.cost
    totals.cacheSavings += row.cacheSavings
    totals.totalDurationMs += row.totalDurationMs
    totals.maxDurationMs = Math.max(totals.maxDurationMs, row.maxDurationMs)
    totals.unpricedTokens += row.unpricedTokens
    totals.calls += row.calls
  }
  return totals
}

/** The trailing `span`-day moving average of a point series, aligned 1:1. */
function movingAverage(points: readonly { date: string; value: number }[], span: number): { date: string; value: number }[] {
  return points.map((point, index) => {
    const start = Math.max(0, index - span + 1)
    let sum = 0
    for (let i = start; i <= index; i += 1) sum += points[i]!.value
    return { date: point.date, value: sum / (index - start + 1) }
  })
}

/** Trailing path segment of a cwd, for the project rows. */
function projectLabel(cwd: string): string {
  const trimmed = cwd.replace(/[/\\]+$/, '')
  const cut = Math.max(trimmed.lastIndexOf('/'), trimmed.lastIndexOf('\\'))
  return cut >= 0 ? trimmed.slice(cut + 1) || trimmed : trimmed
}

/**
 * Period-over-period movement pill; hidden when the prior period is empty.
 * Colored by what the movement means for the metric: `goodWhenUp` metrics
 * (cache hit) wear success on the way up, everything else wears warn.
 */
function DeltaBadge({ current, previous, goodWhenUp, t }: {
  current: number
  previous: number
  goodWhenUp: boolean
  t: Translate<AccountsKey>
}) {
  if (previous <= 0 || current === previous) return null
  const ratio = current / previous - 1
  const swing = Math.abs(ratio) >= 9.995 ? '10x+' : formatPercent(Math.abs(ratio))
  const up = ratio > 0
  const good = up === goodWhenUp
  return (
    <span
      className={`${styles.usageDelta} ${good ? styles.usageDeltaGood : styles.usageDeltaBad}`}
      title={t('usageVsPrevious')}
      aria-hidden="true"
    >
      {up ? '↑' : '↓'}
      {swing}
    </span>
  )
}

/** Everything the charts derive from one loaded window. */
function deriveView(window: UsageResponse, t: Translate<AccountsKey>) {
  const totals = sumBuckets(window.days)
  const total = dayTotal(totals)
  // The by-model series: the window's top models keep their rank colors
  // everywhere (day stacks, donut, ranking); the tail folds into Other.
  const ranked = window.models.slice(0, MAX_SERIES)
  const series = ranked.map((row, index) => ({
    key: `${row.provider} ${row.model}`,
    label: row.model,
    color: seriesColor(index),
    value: dayTotal(row),
  }))
  const otherLabel = t('usageOtherShort')
  const restTokens = window.models.slice(MAX_SERIES).reduce((sum, row) => sum + dayTotal(row), 0)
  if (restTokens > 0) series.push({ key: 'other', label: otherLabel, color: OTHER_COLOR, value: restTokens })

  const byModelDays: StackedDay[] = window.days.map((day) => {
    const known = new Map(day.byModel.map(row => [`${row.provider} ${row.model}`, row.tokens]))
    let attributed = 0
    const slices = ranked.map((row, index) => {
      const tokens = known.get(`${row.provider} ${row.model}`) ?? 0
      attributed += tokens
      return { key: `${row.provider} ${row.model}`, label: row.model, color: seriesColor(index), value: tokens }
    })
    const other = Math.max(0, dayTotal(day) - attributed)
    if (other > 0) slices.push({ key: 'other', label: otherLabel, color: OTHER_COLOR, value: other })
    return { date: day.date, cost: day.cost, calls: day.calls, slices }
  })
  const byKindDays: StackedDay[] = window.days.map(day => ({
    date: day.date,
    cost: day.cost,
    calls: day.calls,
    slices: PARTS.map(part => ({ key: part.key, label: t(part.key), color: part.color, value: day[part.field] })),
  }))
  return { totals, total, series, byModelDays, byKindDays }
}

/** Render the usage statistics panel. */
export function UsageDialog({ controller, useSnapshot, t, onClose }: UsageDialogProps) {
  const window = useSnapshot(snapshot => snapshot.window)
  const previous = useSnapshot(snapshot => snapshot.previous)
  const loadedDays = useSnapshot(snapshot => snapshot.windowDays)
  const loading = useSnapshot(snapshot => snapshot.windowLoading)
  const error = useSnapshot(snapshot => snapshot.windowError)
  const [windowDays, setWindowDays] = useState<UsageWindowDays>(7)
  const [trendMode, setTrendMode] = useState<TrendMode>('total')
  const [activeTab, setActiveTab] = useState<UsageTab>('overview')
  /** The drill-down pick: which model/provider/project/day's sessions are listed. */
  const [filter, setFilter] = useState<{ kind: 'model' | 'provider' | 'project' | 'day'; value: string } | null>(null)

  // Fetch on open and on every window switch: the dialog mounts only while shown.
  useEffect(() => {
    void controller.loadWindow(windowDays)
  }, [controller, windowDays])

  // Render the last loaded window while the next one is in flight; deltas
  // and headings must describe the loaded window, not the pending pick.
  const view = useMemo(
    () => window === null ? null : deriveView(window, t),
    [window, t],
  )
  const before = sumBuckets(previous)
  const beforeToolCalls = previous.reduce((sum, day) => sum + day.toolCalls, 0)
  const loaded = window !== null && view !== null

  const contextTokens = loaded ? view.totals.inputTokens + view.totals.cacheReadTokens + view.totals.cacheWriteTokens : 0
  const cacheHit = loaded && contextTokens > 0 ? view.totals.cacheReadTokens / contextTokens : 0
  const beforeContext = before.inputTokens + before.cacheReadTokens + before.cacheWriteTokens
  const cacheHitBefore = beforeContext > 0 ? before.cacheReadTokens / beforeContext : 0
  const toolCalls = loaded ? window.days.reduce((sum, day) => sum + day.toolCalls, 0) : 0
  const approximate = loaded && view.totals.unpricedTokens > 0
  const ranDays = loaded ? window.days.filter(day => dayTotal(day) > 0 || day.toolCalls > 0).toReversed() : []
  /** The window shows no activity at all: every module renders an empty state. */
  const empty = loaded && view.total === 0 && view.totals.calls === 0 && toolCalls === 0

  const modelRows = loaded ? window.models.slice(0, MAX_MODEL_ROWS) : []
  const modelRest = loaded ? window.models.slice(MAX_MODEL_ROWS) : []
  const modelPeak = Math.max(...modelRows.map(dayTotal), 1)
  const modelRestTokens = modelRest.reduce((sum, row) => sum + dayTotal(row), 0)

  // The provider rollup: the model rows regrouped one level up. Shown only
  // when more than one provider reported — one provider says nothing the
  // model table does not.
  const providerRows = loaded
    ? [...window.models.reduce((map, row) => {
      const entry = map.get(row.provider) ?? { provider: row.provider, tokens: 0, cost: 0 }
      entry.tokens += dayTotal(row)
      entry.cost += row.cost
      map.set(row.provider, entry)
      return map
    }, new Map<string, { provider: string; tokens: number; cost: number }>()).values()]
      .toSorted((a, b) => b.tokens - a.tokens)
    : []
  const modelRestCost = modelRest.reduce((sum, row) => sum + row.cost, 0)
  const modelRestUnpriced = modelRest.some(row => row.unpricedTokens > 0)
  const toolRows = loaded ? window.tools.slice(0, MAX_TOOL_ROWS) : []
  const toolRest = loaded ? window.tools.slice(MAX_TOOL_ROWS) : []
  const toolRestCalls = toolRest.reduce((sum, row) => sum + row.calls, 0)
  const toolTotal = toolRows.reduce((sum, row) => sum + row.calls, 0) + toolRestCalls
  const toolOther = {
    name: t('usageOtherTools', { count: toolRest.length }),
    calls: toolRestCalls,
    errors: toolRest.reduce((sum, row) => sum + row.errors, 0),
  }
  const toolDisplay = toolRestCalls > 0 ? [...toolRows, toolOther] : toolRows
  const projectRows = loaded ? window.projects.slice(0, MAX_PROJECT_ROWS) : []
  /** The day table's largest day; the row's tokens read bold when it matches. */
  const tablePeak = loaded ? Math.max(...ranDays.map(day => dayTotal(day)), 0) : 0

  /** Toggle a drill-down pick; picking the active one again clears it. */
  const pick = (kind: 'model' | 'provider' | 'project' | 'day', value: string) =>
    setFilter(current => current !== null && current.kind === kind && current.value === value ? null : { kind, value })

  /** Click props for one model table row: every cell picks the model. */
  const modelRowPick = (row: UsageModelRow) => {
    const key = `${row.provider} ${row.model}`
    const picked = filter !== null && filter.kind === 'model' && filter.value === key
    return {
      onClick: () => pick('model', key),
      cls: (base: string) => `${base} ${styles.usagePickable}${picked ? ` ${styles.usagePicked}` : ''}`,
    }
  }

  /** The sessions behind the current pick. The Host caps the session list,
   * so a pick whose sessions all fell under the cap shows none — the empty
   * copy says so. */
  const detailRows = filter === null || !loaded ? [] : window.sessions.filter((row) => {
    switch (filter.kind) {
      case 'model': return row.models.includes(filter.value)
      case 'provider': return row.models.some(key => key.startsWith(`${filter.value} `))
      case 'project': return (row.cwd ?? '') === filter.value
      case 'day': return row.dates.includes(filter.value)
    }
  })
  const detailPeak = Math.max(0, ...detailRows.map(dayTotal))
  const detailLabel = filter === null ? ''
    : filter.kind === 'day' ? formatDayFull(filter.value)
      : filter.kind === 'project' ? (filter.value === '' ? t('usageNoCwd') : projectLabel(filter.value))
        : filter.value

  /** The drill-down session list, rendered under the tab the pick came from. */
  const renderDetail = (tab: 'breakdown' | 'activity') => filter !== null && (filter.kind === 'day') === (tab === 'activity') && (
    <section className={styles.usagePanel} hidden={activeTab !== tab}>
      <div className={styles.usagePanelHead}>
        <span className={styles.usageHeading}>{detailLabel} · {t('usageSessions')} {detailRows.length}</span>
        <button type="button" className={styles.usageWindowChoice} onClick={() => setFilter(null)}>
          {t('usageFilterClear')}
        </button>
      </div>
      {detailRows.length === 0 ? (
        <p className={styles.usageEmptyState}>{t('usageFilterEmpty')}</p>
      ) : (
        <div className={styles.usageMiniList}>
          {detailRows.map((row, index) => (
            <UsageBar
              key={row.id}
              item={{
                key: row.id,
                label: row.title ?? row.id,
                tag: row.subagent === true ? t('usageTagSubagent') : undefined,
                color: seriesColor(index % MAX_SERIES),
                share: detailPeak > 0 ? dayTotal(row) / detailPeak : 0,
                value: formatCost(row.cost),
                title: `${formatTokens(dayTotal(row))} · ${formatCost(row.cost)}${row.cwd === null ? '' : ` · ${row.cwd}`}`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  )

  // The trend series: the window's daily figures and their 7-day average,
  // for the total and cost modes of the trend chart. The today window has no
  // day axis to trend over — its hero chart runs on today's per-hour figures
  // instead, so the hero keeps one height across every window pick.
  const trendPoints = loaded ? window.days.map(day => ({ date: day.date, value: dayTotal(day) })) : []
  const costPoints = loaded ? window.days.map(day => ({ date: day.date, value: day.cost })) : []
  const trendAverage = trendPoints.length >= 7 ? movingAverage(trendPoints, 7) : undefined
  const costAverage = costPoints.length >= 7 ? movingAverage(costPoints, 7) : undefined
  // The per-hour figures are cut at the current hour, so the end marker
  // reads as "now", never as a future slot.
  const hourPoints = windowDays === 'today' && loaded
    ? (window.weekHours.at(-1)?.hours ?? [])
      .filter(slot => slot.hour <= new Date().getHours())
      .map(slot => ({ date: String(slot.hour), value: slot.tokens }))
    : []

  // The insights chips: what the window says about itself at a glance. The
  // today view's hero deltas carry its story, so the chips skip it.
  const activeDays = loaded ? window.days.filter(day => dayTotal(day) > 0).length : 0
  const peakDay = loaded ? window.days.reduce((best, day) => dayTotal(day) > dayTotal(best) ? day : best) : null
  // Consecutive active days ending today; zero when today is inactive.
  let streak = 0
  if (loaded) {
    for (let index = window.days.length - 1; index >= 0; index -= 1) {
      if (dayTotal(window.days[index]!) > 0) streak += 1
      else break
    }
  }
  const insights = loaded && view.total > 0 && peakDay !== null && windowDays !== 'today' ? [
    t('usageActive', { count: activeDays }),
    t('usagePeak', { date: formatDay(peakDay.date), amount: formatTokens(dayTotal(peakDay)) }),
    t('usageAvg', { amount: formatTokens(view.total / activeDays) }),
    ...(streak > 1 ? [t('usageStreak', { count: streak })] : []),
  ] : []

  /** The legend pills under the trend chart, one row of dot · name · value. */
  const legendEntries = !loaded ? [] : windowDays === 'today' || trendMode === 'kind' || trendMode === 'total'
    ? PARTS.map(part => ({ key: part.key, label: t(part.key), color: part.color, value: view.totals[part.field] }))
    : trendMode === 'model'
      ? view.series.map(entry => ({ key: entry.key, label: entry.label, color: entry.color, value: entry.value }))
      : []

  // Agent-busy time over the loaded window, and today's burn rate (ccusage's
  // status line metric): tokens per active minute. Both hide while zero.
  const activeMs = loaded ? window.days.reduce((sum, day) => sum + day.activeMs, 0) : 0
  const burnRate = windowDays === 'today' && activeMs > 0 ? view!.total / (activeMs / 60_000) : 0

  interface HeroStat {
    key: AccountsKey
    value: number
    format: (amount: number) => string
    previous?: number
    prefix?: string
    goodWhenUp?: boolean
  }
  const heroStats: HeroStat[] = !loaded ? [] : [
    { key: 'usageTokens', value: view.total, format: formatTokens, previous: dayTotal(before) },
    { key: 'usageCost', value: view.totals.cost, format: formatCost, previous: before.cost, prefix: approximate ? '≈' : '' },
    { key: 'usageCacheHit', value: cacheHit, format: formatPercent, previous: cacheHitBefore, goodWhenUp: true },
    { key: 'usageCalls', value: view.totals.calls, format: formatCalls, previous: before.calls },
    { key: 'usageToolCalls', value: toolCalls, format: formatCalls, previous: beforeToolCalls },
    { key: 'usageSessions', value: window.sessionCount, format: formatCalls },
  ]

  const rangeLabel = windowDays === 'today'
    ? t('usageToday')
    : windowDays === 'all'
      ? t('usageAllTime')
      : t('usageDialogRange', { count: windowDays })

  return (
    <Modal
      open
      onClose={onClose}
      title={t('usageDialogTitle')}
      closeLabel={t('close')}
      description={`${rangeLabel} · ${t('usageEstimateNote')}`}
      className={styles.usageModal}
      contentClassName={`${styles.usageModalContent} ${styles.usageModalFrame}`}
    >
      <div className={`${styles.usageDialogBody} ${styles.usageVariantStellar}`}>
        {error !== null && <div className={styles.seatError}>{t('usageFailed', { message: error })}</div>}
        {loaded && window.skippedSessions > 0 && (
          <div className={styles.seatWarning}>{t('usageIncomplete', { count: window.skippedSessions })}</div>
        )}

        <div className={styles.usageTopRow}>
          {insights.length > 0 && (
            <div className={styles.usageInsights}>
              {insights.map(text => <span key={text} className={styles.usageChip}>{text}</span>)}
            </div>
          )}
          <div className={styles.usageWindowRow} role="group" aria-label={t('usageDialogTitle')}>
            {WINDOWS.map(option => (
              <button
                key={String(option)}
                type="button"
                className={option === windowDays ? styles.usageWindowActive : styles.usageWindowChoice}
                aria-busy={option === windowDays && loading}
                onClick={() => { setWindowDays(option); setFilter(null) }}
              >
                {option === 'today'
                  ? t('usageToday')
                  : option === 'all'
                    ? t('usageAllTime')
                    : t('usageWindowDays', { count: option })}
              </button>
            ))}
          </div>
        </div>

        {!loaded && <p className={styles.hint}>{loading ? t('loading') : '—'}</p>}

        {loaded && (
          <div className={styles.usageLayout}>
            <div className={styles.usageTabs} role="tablist" aria-orientation="vertical" aria-label={t('usageDialogTitle')}>
              {TABS.map(tab => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={tab === activeTab}
                  className={tab === activeTab ? styles.usageTabActive : styles.usageTab}
                  onClick={() => setActiveTab(tab)}
                >
                  {t(tab === 'overview' ? 'usageTabOverview' : tab === 'breakdown' ? 'usageTabBreakdown' : 'usageTabActivity')}
                </button>
              ))}
            </div>

            <div className={styles.usageContent}>
              {/* The hero belongs to the overview tab; the other tabs fill the
                  canvas with their own charts. Tabs hide, never unmount: a
                  remount would replay the count-up and rise animations and
                  reset the calendar's scroll on every tab switch. */}
              <section className={styles.usageHero} hidden={activeTab !== 'overview'}>
                <div className={styles.usageHeroStats}>
                  {heroStats.slice(0, 3).map(stat => (
                    <div key={stat.key} className={styles.usageHeroStat}>
                      <span className={styles.usageHeroLabel}>{t(stat.key)}</span>
                      <span
                        className={styles.usageHeroNumber}
                        title={stat.value.toLocaleString()}
                      >
                        {stat.prefix ?? ''}
                        <AnimatedNumber value={stat.value} format={stat.format} />
                        {stat.previous !== undefined && loadedDays === windowDays && (
                          <DeltaBadge current={stat.value} previous={stat.previous} goodWhenUp={stat.goodWhenUp ?? false} t={t} />
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={styles.usageHeroHead}>
                  <span className={styles.usageHeading}>{windowDays === 'today' ? t('usageTodayHours') : t('usageTrend')}</span>
                  {windowDays !== 'today' && (
                    <div className={styles.usageWindowRow}>
                      {(['total', 'model', 'kind', 'cost'] as const).map(mode => (
                        <button
                          key={mode}
                          type="button"
                          className={mode === trendMode ? styles.usageWindowActive : styles.usageWindowChoice}
                          onClick={() => setTrendMode(mode)}
                        >
                          {t(mode === 'total' ? 'usageStackTotal' : mode === 'model' ? 'usageStackModel' : mode === 'kind' ? 'usageStackKind' : 'usageStackCost')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {windowDays === 'today' ? (
                  hourPoints.length >= 2 && (
                    <>
                      <AreaTrend
                        points={hourPoints}
                        format={formatTokens}
                        summary={t('usageTodayHours')}
                        formatPoint={point => `${point.date.padStart(2, '0')}:00`}
                      />
                      <HourAxis nowLabel={t('usageToday')} />
                    </>
                  )
                ) : trendMode === 'total' || trendMode === 'cost' ? (
                  <>
                    <AreaTrend
                      points={trendMode === 'cost' ? costPoints : trendPoints}
                      average={trendMode === 'cost' ? costAverage : trendAverage}
                      format={trendMode === 'cost' ? formatCost : formatTokens}
                      summary={t('usageTrend')}
                      movingAverageLabel={formatted => t('usageMovingAvg', { amount: formatted })}
                    />
                    <DayAxis days={window.days} todayLabel={t('usageToday')} />
                  </>
                ) : (
                  <>
                    <StackedDayChart
                      key={`${trendMode}:${loadedDays}`}
                      days={trendMode === 'model' ? view.byModelDays : view.byKindDays}
                      summary={t('usageTrend')}
                      callsLabel={t('usageCalls')}
                    />
                    <DayAxis days={window.days} todayLabel={t('usageToday')} />
                  </>
                )}

                {legendEntries.length > 0 && (
                  <div className={styles.usageLegend}>
                    {legendEntries.map(entry => (
                      <span key={entry.key} className={styles.usageLegendItem}>
                        <span className={styles.usageDot} style={{ background: entry.color }} aria-hidden="true" />
                        <span className={styles.usageLegendName}>{entry.label}</span>
                        <span className={styles.usageValue}><AnimatedNumber value={entry.value} format={formatTokens} /></span>
                      </span>
                    ))}
                  </div>
                )}

                <div className={styles.usageHeroFoot}>
                  {activeMs > 0 && <span>{t('usageActiveTime')} {formatDuration(activeMs)}</span>}
                  {burnRate > 0 && <span>{t('usagePerMinute', { amount: formatTokens(burnRate) })}</span>}
                  <span>{t('usageCalls')} {formatCalls(view.totals.calls)}</span>
                  <span>{t('usageToolCalls')} {formatCalls(toolCalls)}</span>
                  <span>{t('usageSessions')} {formatCalls(window.sessionCount)}</span>
                </div>
              </section>

              {empty && (
                <section className={styles.usagePanel}>
                  <p className={styles.usageEmptyState}>{t('usageEmpty')}</p>
                </section>
              )}

              {!empty && (
                <section className={styles.usagePanel} hidden={activeTab !== 'overview'}>
                  <div className={styles.usagePanelHead}>
                    <span className={styles.usageHeading}>{t('usageMixShare')}</span>
                  </div>
                  <div className={styles.usageDonutRow}>
                    <UsageDonut
                      size={160}
                      slices={PARTS.map(part => ({
                        key: part.key,
                        label: t(part.key),
                        color: part.color,
                        value: view.totals[part.field],
                      }))}
                      centerValue={formatTokens(view.total)}
                      centerLabel={t('usageTokens')}
                    />
                    <div className={styles.usageMiniList}>
                      {PARTS.map(part => (
                        <UsageBar
                          key={part.key}
                          item={{
                            key: part.key,
                            label: t(part.key),
                            color: part.color,
                            share: view.total > 0 ? view.totals[part.field] / view.total : 0,
                            value: formatTokens(view.totals[part.field]),
                            title: view.totals[part.field].toLocaleString(),
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {!empty && (
                <>
                  <section className={styles.usagePanel} hidden={activeTab !== 'activity'}>
                    <div className={styles.usagePanelHead}>
                      <span className={styles.usageHeading}>{t('usageCalendar')}</span>
                      <div className={styles.usageCalendarLegend}>
                        <span className={styles.usageCalendarLegendText}>{t('usageLess')}</span>
                        <CalendarLegendSwatches />
                        <span className={styles.usageCalendarLegendText}>{t('usageMore')}</span>
                      </div>
                    </div>
                    <UsageCalendar
                      days={window.heatmap}
                      summary={t('usageCalendar')}
                      noActivityLabel={t('usageNoActivity')}
                      tokensLabel={formatted => t('usageTokensAmount', { amount: formatted })}
                      onPickDay={date => pick('day', date)}
                      pickedDate={filter?.kind === 'day' ? filter.value : undefined}
                    />
                  </section>

                  <section className={styles.usagePanel} hidden={activeTab !== 'activity'}>
                    <div className={styles.usagePanelHead}>
                      <span className={styles.usageHeading}>{t('usageHours')}</span>
                    </div>
                    <WeekHoursHeatmap
                      rows={window.weekHours}
                      summary={t('usageHours')}
                      callsLabel={t('usageCalls')}
                      onPickDay={date => pick('day', date)}
                      pickedDate={filter?.kind === 'day' ? filter.value : undefined}
                    />
                  </section>

                  {renderDetail('activity')}
                </>
              )}

              {!empty && (
                <>
                  <section className={styles.usagePanel} hidden={activeTab !== 'breakdown'}>
                    <div className={styles.usagePanelHead}>
                      <span className={styles.usageHeading}>{t('usageColModel')}</span>
                    </div>
                    <div className={`${styles.usageList} ${styles.usageListModel}`}>
                      <span className={styles.usageListCell}>{t('usageColModel')}</span>
                      <span className={`${styles.usageListCell} ${styles.usageNum}`}>{t('usageColShare')}</span>
                      <span className={`${styles.usageListCell} ${styles.usageNum}`}>{t('usageTokens')}</span>
                      <span className={`${styles.usageListCell} ${styles.usageNum}`}>{t('usageCalls')}</span>
                      <span className={`${styles.usageListCell} ${styles.usageNum}`}>{t('usageCost')}</span>
                      {modelRows.map((row, index) => {
                        const tokens = dayTotal(row)
                        const pickRow = modelRowPick(row)
                        return (
                          <Fragment key={`${row.provider} ${row.model}`}>
                            <div className={pickRow.cls(styles.usageListMain)} onClick={pickRow.onClick}>
                              <ProviderGlyph provider={row.provider} displayName={row.provider} size={16} />
                              <span className={styles.usageModelName} title={`${row.provider} · ${row.model}`}>{row.model}</span>
                            </div>
                            <span className={pickRow.cls(styles.usageShare)} onClick={pickRow.onClick}>
                              {view.total > 0 ? formatShare(tokens / view.total) : ''}
                            </span>
                            <span className={pickRow.cls(styles.usageNum)} onClick={pickRow.onClick}>{formatTokens(tokens)}</span>
                            <span className={pickRow.cls(styles.usageNum)} onClick={pickRow.onClick}>{row.calls.toLocaleString()}</span>
                            <span className={pickRow.cls(styles.usageNum)} onClick={pickRow.onClick}>
                              {row.unpricedTokens > 0 && '≈'}
                              {formatCost(row.cost)}
                            </span>
                            <div className={pickRow.cls(styles.usageModelTrack)} aria-hidden="true" onClick={pickRow.onClick}>
                              <span
                                className={styles.usageModelBar}
                                style={{
                                  width: `${tokens / modelPeak * 100}%`,
                                  background: index < MAX_SERIES ? seriesColor(index) : OTHER_COLOR,
                                  animationDelay: `${index * STAGGER_MS}ms`,
                                }}
                              />
                            </div>
                          </Fragment>
                        )
                      })}
                      {modelRest.length > 0 && (
                        <Fragment>
                          <span className={styles.usageModelName}>{t('usageOther', { count: modelRest.length })}</span>
                          <span className={styles.usageShare} />
                          <span className={styles.usageNum}>{formatTokens(modelRestTokens)}</span>
                          <span className={styles.usageNum} />
                          <span className={styles.usageNum}>
                            {modelRestUnpriced && '≈'}
                            {formatCost(modelRestCost)}
                          </span>
                        </Fragment>
                      )}
                    </div>
                  </section>
                </>
              )}

              {!empty && (
                <div className={styles.usageMain3} hidden={activeTab !== 'breakdown'}>
                  {providerRows.length > 1 && (
                    <section className={styles.usagePanel}>
                      <div className={styles.usagePanelHead}>
                        <span className={styles.usageHeading}>{t('usageColProvider')}</span>
                      </div>
                      <div className={styles.usageMiniList}>
                        {providerRows.map((row, index) => (
                          <UsageBar
                            key={row.provider}
                            item={{
                              key: row.provider,
                              label: row.provider,
                              color: seriesColor(index),
                              share: view.total > 0 ? row.tokens / view.total : 0,
                              value: formatCost(row.cost),
                              title: `${row.provider} · ${formatTokens(row.tokens)}`,
                            }}
                            onPick={() => pick('provider', row.provider)}
                            picked={filter?.kind === 'provider' && filter.value === row.provider}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                  {window.sessions.length > 0 && (
                    <section className={styles.usagePanel}>
                      <div className={styles.usagePanelHead}>
                        <span className={styles.usageHeading}>{t('usageRecentSessions')}</span>
                      </div>
                      <div className={styles.usageMiniList}>
                        {window.sessions.slice(0, MAX_SESSION_ROWS).map((row, index) => (
                          <UsageBar
                            key={row.id}
                            item={{
                              key: row.id,
                              label: row.title ?? row.id,
                              tag: row.subagent === true ? t('usageTagSubagent') : undefined,
                              color: seriesColor(index),
                              share: view.total > 0 ? dayTotal(row) / view.total : 0,
                              value: formatCost(row.cost),
                              title: row.cwd === null ? row.id : `${row.id} · ${row.cwd}`,
                            }}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {projectRows.length > 0 && (
                    <section className={styles.usagePanel}>
                      <div className={styles.usagePanelHead}>
                        <span className={styles.usageHeading}>{t('usageColProject')}</span>
                      </div>
                      <div className={styles.usageMiniList}>
                        {projectRows.map((row, index) => (
                          <UsageBar
                            key={row.cwd ?? 'none'}
                            item={{
                              key: row.cwd ?? 'none',
                              label: row.cwd === null ? t('usageNoCwd') : projectLabel(row.cwd),
                              color: seriesColor(index),
                              share: view.total > 0 ? dayTotal(row) / view.total : 0,
                              value: formatCost(row.cost),
                              title: row.cwd ?? undefined,
                            }}
                            onPick={() => pick('project', row.cwd ?? '')}
                            picked={filter?.kind === 'project' && filter.value === (row.cwd ?? '')}
                          />
                        ))}
                      </div>
                    </section>
                  )}

                  {toolRows.length > 0 && (
                    <section className={styles.usagePanel}>
                      <div className={styles.usagePanelHead}>
                        <span className={styles.usageHeading}>{t('usageColTool')}</span>
                      </div>
                      <div className={styles.usageMiniList}>
                        {toolDisplay.map((row, index) => (
                          <UsageBar
                            key={row.name}
                            item={{
                              key: row.name,
                              label: row.name,
                              color: index < toolRows.length ? seriesColor(index) : OTHER_COLOR,
                              share: toolTotal > 0 ? row.calls / toolTotal : 0,
                              value: `${row.calls.toLocaleString()}${row.errors > 0 ? ` · ${row.errors}✗` : ''}`,
                            }}
                          />
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              {renderDetail('breakdown')}

              {!empty && ranDays.length > 0 && (
                <section className={styles.usagePanel} hidden={activeTab !== 'activity'}>
                  <div className={styles.usagePanelHead}>
                    <span className={styles.usageHeading}>{t('usageDays')}</span>
                  </div>
                  <div className={styles.usageTable}>
                    <span className={styles.usageTableHead}>{t('usageDate')}</span>
                    <span className={styles.usageTableHead}>{t('usageTokens')}</span>
                    <span className={styles.usageTableHead}>{t('usageInput')}</span>
                    <span className={styles.usageTableHead}>{t('usageOutput')}</span>
                    <span className={styles.usageTableHead}>{t('usageCacheRead')}</span>
                    <span className={styles.usageTableHead}>{t('usageCalls')}</span>
                    <span className={styles.usageTableHead}>{t('usageTools')}</span>
                    <span className={styles.usageTableHead}>{t('usageCost')}</span>
                    {ranDays.map((day) => {
                      const tokens = dayTotal(day)
                      const isPeak = tokens > 0 && tokens === tablePeak
                      return (
                        <div key={day.date} className={styles.usageTableRow}>
                          <span title={[
                            day.activeMs > 0 ? `${t('usageActiveTime')} ${formatDuration(day.activeMs)}` : '',
                            day.failedTurns > 0 ? `${t('usageFailedTurns')} ${day.failedTurns}` : '',
                          ].filter(Boolean).join(' · ') || undefined}>
                            {formatDayFull(day.date)}
                          </span>
                          <span className={styles.usageCellValue}>
                            <span className={isPeak ? `${styles.usageValue} ${styles.usagePeak}` : styles.usageValue}>
                              {tokens.toLocaleString()}
                            </span>
                            {tablePeak > 0 && (
                              <span className={styles.usageCellBar} aria-hidden="true">
                                <span style={{ width: `${tokens / tablePeak * 100}%` }} />
                              </span>
                            )}
                          </span>
                          <span className={styles.usageValue}>{day.inputTokens.toLocaleString()}</span>
                          <span className={styles.usageValue}>{day.outputTokens.toLocaleString()}</span>
                          <span className={styles.usageValue}>{day.cacheReadTokens.toLocaleString()}</span>
                          <span className={styles.usageValue}>{day.calls.toLocaleString()}</span>
                          <span className={styles.usageValue}>{day.toolCalls.toLocaleString()}</span>
                          <span className={styles.usageValue}>
                            {day.unpricedTokens > 0 && '≈'}
                            {formatCost(day.cost)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}

              {approximate && (
                <p className={styles.hint}>{t('usageUnpriced', { amount: view.totals.unpricedTokens.toLocaleString() })}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
