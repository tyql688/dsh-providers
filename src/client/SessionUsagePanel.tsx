/**
 * The current session's usage panel: totals over cost, the token mix, the
 * per-model split, the tool traffic, and a per-step timeline — the same
 * accounting the trajectory shows as steps, folded Host-side from the
 * session log (descendant subagent sessions folded into their own rows)
 * and refreshed on a slow beat. Rendered by the conversation's stats view
 * tab.
 */

import { Fragment, useEffect, useState } from 'react'
import type { Translate } from '@deepseek-ai/dsh-client-ui-slots'
import { errorMessage } from '../errors.ts'
import { PROVIDERS_ROUTE_PREFIX } from '../wire.ts'
import type { SessionUsageResponse } from '../wire.ts'
import type { AccountsKey } from './locales.ts'
import { dayTotal, formatCalls, formatCost, formatDuration, formatPercent, formatShare, formatTokens, OTHER_COLOR, PARTS, seriesColor } from './usage-format.tsx'
import { SessionTimeline, UsageBar } from './usage-charts.tsx'
import styles from './AccountsSection.module.css'

/** How often the figures refresh while the panel is showing. */
const REFRESH_MS = 30_000

/** Ranked tool rows shown before the rest collapse into one Other row. */
const MAX_TOOL_ROWS = 9

/** Props of {@link SessionUsagePanel}. */
export interface SessionUsagePanelProps {
  sessionId: string
  t: Translate<AccountsKey>
}

/** Render the current session's usage figures, refreshing on a slow beat. */
export function SessionUsagePanel({ sessionId, t }: SessionUsagePanelProps) {
  const [data, setData] = useState<SessionUsageResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch on mount, then on a slow beat; a failure keeps the last figures.
  useEffect(() => {
    let alive = true
    const load = async (): Promise<void> => {
      try {
        const response = await fetch(`${PROVIDERS_ROUTE_PREFIX}/usage/session?id=${encodeURIComponent(sessionId)}`)
        const body = await response.json() as SessionUsageResponse & { error?: string }
        if (!response.ok) throw new Error(body.error ?? `${response.status} ${response.statusText}`)
        if (alive) setData(body)
      } catch (cause) {
        if (alive) setError(errorMessage(cause))
      }
    }
    void load()
    const timer = setInterval(load, REFRESH_MS)
    return () => {
      alive = false
      clearInterval(timer)
    }
  }, [sessionId])

  const total = data === null ? 0 : dayTotal(data)
  const unpriced = data !== null && data.unpricedTokens > 0
  /** Tokens the truncated-away head of the timeline burned, so the
   * cumulative line starts at the true height instead of zero. */
  const stepsPreceding = data === null ? 0 : Math.max(0, total - data.steps.reduce(
    (sum, step) => sum + step.inputTokens + step.outputTokens + step.cacheReadTokens + step.cacheWriteTokens,
    0,
  ))

  // The tool ranking: the top rows by share keep their own colors, the tail
  // folds into one summed Other row, so the list stays ten lines.
  const toolRows = data === null ? [] : data.tools.slice(0, MAX_TOOL_ROWS)
  const toolRest = data === null ? [] : data.tools.slice(MAX_TOOL_ROWS)
  const toolDisplay = toolRest.length === 0 ? toolRows : [...toolRows, {
    name: t('usageOtherTools', { count: toolRest.length }),
    calls: toolRest.reduce((sum, row) => sum + row.calls, 0),
    errors: toolRest.reduce((sum, row) => sum + row.errors, 0),
  }]

  // Efficiency figures over the carried steps: cache hit of the whole
  // session, mean call latency, and the reasoning share of the output.
  const contextTokens = data === null ? 0 : data.inputTokens + data.cacheReadTokens + data.cacheWriteTokens
  const cacheHit = contextTokens > 0 && data !== null ? data.cacheReadTokens / contextTokens : 0
  const timedSteps = data === null ? [] : data.steps.filter(step => step.durationMs !== null)
  const avgLatencyMs = timedSteps.length > 0
    ? timedSteps.reduce((sum, step) => sum + (step.durationMs ?? 0), 0) / timedSteps.length
    : 0
  const reasoningShare = data !== null && data.outputTokens > 0 ? data.reasoningTokens / data.outputTokens : 0

  /** The descendant (subagent) sessions' shares; absent on an older host. */
  const subagents = data?.subagents ?? []
  /** The delegation tree's own sum — everything the children burned. */
  const subSum = subagents.reduce((sum, row) => ({
    inputTokens: sum.inputTokens + row.inputTokens,
    outputTokens: sum.outputTokens + row.outputTokens,
    cacheReadTokens: sum.cacheReadTokens + row.cacheReadTokens,
    cacheWriteTokens: sum.cacheWriteTokens + row.cacheWriteTokens,
    cost: sum.cost + row.cost,
    calls: sum.calls + row.calls,
  }), { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, cost: 0, calls: 0 })
  const subTokens = dayTotal(subSum)


  return (
    <div className={styles.usageSessionBody}>
      {error !== null && <div className={styles.seatError}>{t('usageFailed', { message: error })}</div>}

      {data === null ? (
        <p className={styles.hint}>{error !== null ? t('retry') : t('loading')}</p>
      ) : (
        <>
          <section className={styles.usageHero}>
            <div className={styles.usageSessionHead}>
              <span className={styles.usageSessionName} title={data.id}>{data.title ?? data.id}</span>
              {data.cwd !== null && <span className={styles.usageSessionMeta}>{data.cwd}</span>}
            </div>

            <div className={styles.usageSessionStats}>
              <div className={styles.usageDrillStat}>
                <span className={styles.usageHeroLabel}>{t('usageTokens')}</span>
                <span className={styles.usageDrillValue} title={total.toLocaleString()}>{formatTokens(total)}</span>
              </div>
              {subagents.length > 0 && (
                <div className={styles.usageDrillStat}>
                  <span className={styles.usageHeroLabel}>{t('sessionUsageTree')}</span>
                  <span
                    className={styles.usageDrillValue}
                    title={`${(total + subTokens).toLocaleString()} · ${formatCost(data.cost + subSum.cost)}`}
                  >
                    {formatTokens(total + subTokens)}
                  </span>
                </div>
              )}
              <div className={styles.usageDrillStat}>
                <span className={styles.usageHeroLabel}>{t('usageCost')}</span>
                <span className={styles.usageDrillValue} title={data.cost.toFixed(4)}>
                  {unpriced && '≈'}{formatCost(data.cost)}
                </span>
              </div>
              <div className={styles.usageDrillStat}>
                <span className={styles.usageHeroLabel}>{t('usageCalls')}</span>
                <span className={styles.usageDrillValue}>{formatCalls(data.calls)}</span>
              </div>
              <div className={styles.usageDrillStat}>
                <span className={styles.usageHeroLabel}>{t('usageToolCalls')}</span>
                <span className={styles.usageDrillValue}>{formatCalls(data.toolCalls)}</span>
              </div>
              {data.contextPeak !== null && (
                <div className={styles.usageDrillStat}>
                  <span className={styles.usageHeroLabel}>{t('usageContextPeak')}</span>
                  <span
                    className={styles.usageDrillValue}
                    title={data.contextPeak.window !== null && data.contextPeak.window > 0
                      ? `${data.contextPeak.tokens.toLocaleString()} / ${data.contextPeak.window.toLocaleString()}`
                      : data.contextPeak.tokens.toLocaleString()}
                  >
                    {data.contextPeak.window !== null && data.contextPeak.window > 0
                      ? formatPercent(data.contextPeak.tokens / data.contextPeak.window)
                      : formatTokens(data.contextPeak.tokens)}
                  </span>
                </div>
              )}
              {PARTS.map(part => (
                <div
                  key={part.key}
                  className={styles.usageDrillStat}
                  style={{ background: `color-mix(in srgb, ${part.color} 8%, var(--dsw-alias-bg-layer-1))` }}
                >
                  <span className={`${styles.usageHeroLabel} ${styles.usageDrillKind}`}>
                    <span className={styles.usageDot} style={{ background: part.color }} aria-hidden="true" />
                    {t(part.key)}
                  </span>
                  <span className={styles.usageDrillValue} title={data[part.field].toLocaleString()}>
                    {formatTokens(data[part.field])}
                  </span>
                </div>
              ))}
              <div className={styles.usageDrillStat}>
                <span className={styles.usageHeroLabel}>{t('usageCacheHit')}</span>
                <span className={styles.usageDrillValue} title={data.cacheReadTokens.toLocaleString()}>
                  {contextTokens > 0 ? formatPercent(cacheHit) : '—'}
                </span>
              </div>
              <div className={styles.usageDrillStat}>
                <span className={styles.usageHeroLabel}>{t('usageAvgLatency')}</span>
                <span className={styles.usageDrillValue}>
                  {avgLatencyMs > 0 ? formatDuration(avgLatencyMs) : '—'}
                </span>
              </div>
              <div className={styles.usageDrillStat}>
                <span className={styles.usageHeroLabel}>{t('usageReasoning')}</span>
                <span className={styles.usageDrillValue} title={data.reasoningTokens.toLocaleString()}>
                  {data.reasoningTokens > 0 ? formatPercent(reasoningShare) : '—'}
                </span>
              </div>
            </div>

            <div className={styles.usageBar} role="img" aria-label={t('usageMixShare')}>
              {total > 0 && PARTS.map(part => (
                <span
                  key={part.key}
                  style={{ width: `${data[part.field] / total * 100}%`, background: part.color }}
                  title={`${t(part.key)} · ${data[part.field].toLocaleString()} · ${formatShare(data[part.field] / total)}`}
                />
              ))}
            </div>
            <div className={styles.usageLegend}>
              {PARTS.map(part => (
                <span key={part.key} className={styles.usageLegendItem} title={data[part.field].toLocaleString()}>
                  <span className={styles.usageDot} style={{ background: part.color }} aria-hidden="true" />
                  <span className={styles.usageLegendName}>{t(part.key)}</span>
                  <span className={styles.usageValue}>{total > 0 ? formatShare(data[part.field] / total) : '—'}</span>
                </span>
              ))}
            </div>
          </section>

          {data.models.length > 0 && (
            <section className={styles.usagePanel}>
              <div className={styles.usagePanelHead}>
                <span className={styles.usageHeading}>{t('usageModels')}</span>
              </div>
              <div className={styles.usageMiniList}>
                {data.models.map((row) => {
                  const tokens = dayTotal(row)
                  return (
                    <UsageBar
                      key={`${row.provider} ${row.model}`}
                      item={{
                        key: `${row.provider} ${row.model}`,
                        label: row.model,
                        color: 'var(--dsw-alias-state-business-primary)',
                        share: total > 0 ? tokens / total : 0,
                        value: formatCost(row.cost),
                        title: row.reasoningTokens > 0
                          ? `${row.provider} · ${row.model} · ${t('usageReasoning')} ${row.reasoningTokens.toLocaleString()}`
                          : `${row.provider} · ${row.model}`,
                      }}
                    />
                  )
                })}
              </div>
            </section>
          )}

          <section className={styles.usagePanel}>
            <div className={styles.usagePanelHead}>
              <span className={styles.usageHeading}>
                {t('sessionUsageSteps')}
                <span className={styles.usageHeadingCount}>
                  {data.stepsTotal > data.steps.length
                    ? `${formatCalls(data.steps.length)}/${formatCalls(data.stepsTotal)}`
                    : formatCalls(data.stepsTotal)}
                </span>
              </span>
            </div>
            {data.steps.length > 0 && (
              <SessionTimeline
                steps={data.steps}
                summary={t('sessionUsageSteps')}
                callsLabel={t('usageCalls')}
                partLabels={PARTS.map(part => t(part.key))}
                cumulativeLabel={t('sessionUsageCumulative')}
                contextLabel={t('sessionUsageContext')}
                clearLabel={t('sessionUsageClear')}
                contextWindow={data.contextPeak?.window ?? null}
                preceding={stepsPreceding}
              />
            )}
            {data.steps.length === 0 && (
              <p className={styles.hint}>{t('sessionUsageEmpty')}</p>
            )}
          </section>

          {data.tools.length > 0 && (
            <section className={styles.usagePanel}>
              <div className={styles.usagePanelHead}>
                <span className={styles.usageHeading}>
                  {t('usageColTool')}
                  <span className={styles.usageHeadingCount}>{formatCalls(data.toolCalls)}</span>
                </span>
              </div>
              <div className={styles.usageMiniList}>
                {toolDisplay.map((row, index) => (
                  <UsageBar
                    key={row.name}
                    item={{
                      key: row.name,
                      label: row.name,
                      color: index < toolRows.length ? seriesColor(index) : OTHER_COLOR,
                      share: data.toolCalls > 0 ? row.calls / data.toolCalls : 0,
                      value: `${formatCalls(row.calls)}${row.errors > 0 ? ` · ${row.errors}✗` : ''}`,
                    }}
                  />
                ))}
              </div>
            </section>
          )}

          {subagents.length > 0 && (
            <section className={styles.usagePanel}>
              <div className={styles.usagePanelHead}>
                <span className={styles.usageHeading}>
                  {t('sessionUsageSubagents')}
                  <span className={styles.usageHeadingCount}>{formatCalls(subagents.length)}</span>
                </span>
              </div>
              <div className={`${styles.usageList} ${styles.usageListSubagents}`}>
                <span className={styles.usageListCell}>{t('usageColSession')}</span>
                <span className={`${styles.usageListCell} ${styles.usageNum}`}>{t('usageInput')}</span>
                <span className={`${styles.usageListCell} ${styles.usageNum}`}>{t('usageOutput')}</span>
                <span className={`${styles.usageListCell} ${styles.usageNum}`}>{t('usageCacheRead')}</span>
                <span className={`${styles.usageListCell} ${styles.usageNum}`}>{t('usageCacheWrite')}</span>
                <span className={`${styles.usageListCell} ${styles.usageNum}`}>{t('usageCost')}</span>
                {subagents.map(row => (
                  <Fragment key={row.id}>
                    <span
                      className={styles.usageModelName}
                      title={[row.title, row.id, `${row.calls} ${t('usageCalls')}`].filter(Boolean).join(' · ')}
                    >
                      {row.agentPreset !== null && row.agentPreset !== undefined
                        ? `${row.agentPreset}${row.title === null ? '' : ` · ${row.title}`}`
                        : row.title ?? row.id}
                    </span>
                    <span className={styles.usageNum} title={row.inputTokens.toLocaleString()}>{formatTokens(row.inputTokens)}</span>
                    <span className={styles.usageNum} title={row.outputTokens.toLocaleString()}>{formatTokens(row.outputTokens)}</span>
                    <span className={styles.usageNum} title={row.cacheReadTokens.toLocaleString()}>
                      {formatTokens(row.cacheReadTokens)}
                    </span>
                    <span className={styles.usageNum} title={row.cacheWriteTokens.toLocaleString()}>
                      {formatTokens(row.cacheWriteTokens)}
                    </span>
                    <span className={styles.usageNum}>{formatCost(row.cost)}</span>
                  </Fragment>
                ))}
                {/* The rollups: what the children burned, then the whole
                    tree — the parent's own figures plus the children's. */}
                {([
                  { key: 'sessionUsageSubtotal', row: subSum },
                  {
                    key: 'sessionUsageTreeTotal',
                    row: {
                      inputTokens: data.inputTokens + subSum.inputTokens,
                      outputTokens: data.outputTokens + subSum.outputTokens,
                      cacheReadTokens: data.cacheReadTokens + subSum.cacheReadTokens,
                      cacheWriteTokens: data.cacheWriteTokens + subSum.cacheWriteTokens,
                      cost: data.cost + subSum.cost,
                    },
                  },
                ] as const).map(({ key, row }) => (
                  <Fragment key={key}>
                    <span className={`${styles.usageModelName} ${styles.usageRowStrong}`}>{t(key)}</span>
                    {([row.inputTokens, row.outputTokens, row.cacheReadTokens, row.cacheWriteTokens] as const).map((value, cell) => (
                      // oxlint-disable-next-line react/no-array-index-key -- fixed positional bucket columns
                      <span key={cell} className={`${styles.usageNum} ${styles.usageRowStrong}`} title={value.toLocaleString()}>
                        {formatTokens(value)}
                      </span>
                    ))}
                    <span className={`${styles.usageNum} ${styles.usageRowStrong}`}>{formatCost(row.cost)}</span>
                  </Fragment>
                ))}
              </div>
            </section>
          )}

          {unpriced && (
            <p className={styles.hint}>{t('usageUnpriced', { amount: data.unpricedTokens.toLocaleString() })}</p>
          )}
        </>
      )}
    </div>
  )
}
