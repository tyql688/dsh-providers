/**
 * The composer model seat, re-rendered with brand marks.
 *
 * dsh's stock seat draws provider groups as text; this occupant shadows it
 * (lower slot priority renders) to put each provider's glyph on its group
 * heading and the current provider's glyph on the trigger. Everything else —
 * the directory store, selection RPCs, the `model` copy — is the stock
 * plugin's own machinery, reached through `ctx.modelDirectories` and the
 * shared locale namespace, so the two seats can never disagree about state.
 */

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import {
  IconCheckOutline16,
  IconChevronDownOutline14,
  IconChevronRightOutline14,
  IconWarningOutline16,
  Toast,
} from '@deepseek-ai/dsh-client-ui-primitives'
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots'
import type { ModelDirectoryState, ModelSelectInjected } from '@deepseek-ai/dsh-client-ui-model-selection/client'
import { ProviderGlyph } from './ProviderGlyph.tsx'
import styles from './AccountsSection.module.css'

/** The selection payload, as the stock seat's face types it. */
type Selection = Parameters<ModelSelectInjected['select']>[0]
/** One provider group out of the directory snapshot. */
type Group = ModelDirectoryState['groups'][number]

/** Props: the stock seat's inject face, the owner's lock, the `model` copy. */
export type ModelSeatProps = ModelSelectInjected & { locked: boolean } & PropsLocale<'model'>

/** Render the composer model seat with provider glyphs. */
export function ModelSeat({ locked, available, directory, load, select, t }: ModelSeatProps) {
  const state = useSyncExternalStore(fn => directory.subscribe(fn), () => directory.getSnapshot())
  const [open, setOpen] = useState(false)
  const [pane, setPane] = useState<'root' | 'model' | 'effort'>('root')
  /** Whether the snapshot's error came from a load or a selection. */
  const lastAction = useRef<'load' | 'select'>('load')
  const [toast, setToast] = useState<{ seq: number; text: string } | null>(null)
  const toastSeq = useRef(0)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()

  const choices = useMemo(() => state.groups.flatMap(group => group.models.map(model => ({ group, model }))), [state.groups])
  const current = state.current === null
    ? undefined
    : choices.find(choice => choice.group.id === state.current?.provider && choice.model.id === state.current.model)
  const reasoning = current?.model.reasoning
  const effectiveEffort = state.current?.reasoningEffort ?? reasoning?.defaultEffort
  const effortLabel = reasoning === undefined
    ? undefined
    : effectiveEffort === undefined
      ? t('effort.providerDefault')
      : reasoning.efforts.find(level => level.id === effectiveEffort)?.name ?? effectiveEffort
  const effortChoices = useMemo(() => reasoning === undefined ? [] : [
    ...reasoning.defaultEffort === undefined
      ? [{ key: 'provider-default', effort: undefined, label: t('effort.providerDefault') }]
      : [],
    ...reasoning.efforts.map(effort => ({
      key: `effort:${effort.id}`,
      effort: effort.id,
      label: effort.name,
      ...effort.description === undefined ? {} : { description: effort.description },
    })),
  ], [reasoning, t])
  const busy = state.status === 'selecting'

  const reload = (): void => {
    lastAction.current = 'load'
    load()
  }

  useEffect(() => {
    if (available) {
      lastAction.current = 'load'
      load()
    }
  }, [available, load])

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: MouseEvent): void => {
      if (!(event.target instanceof Node && rootRef.current?.contains(event.target) === true)) setOpen(false)
    }
    document.addEventListener('mousedown', closeOutside)
    return () => document.removeEventListener('mousedown', closeOutside)
  }, [open])

  if (!available) return null

  const close = (restoreFocus = false): void => {
    setOpen(false)
    setPane('root')
    if (restoreFocus) queueMicrotask(() => triggerRef.current?.focus())
  }

  const moveFocus = (offset: number): void => {
    const items = itemRefs.current.filter(item => item !== null)
    if (items.length === 0) return
    const active = items.findIndex(item => item === document.activeElement)
    items[(Math.max(active, 0) + offset + items.length) % items.length]?.focus()
  }

  const onRootKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Escape' && open) {
      event.preventDefault()
      if (pane !== 'root') setPane('root')
      else close(true)
      return
    }
    if (!open) return
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      moveFocus(event.key === 'ArrowDown' ? 1 : -1)
    }
  }

  const onBlur = (event: React.FocusEvent): void => {
    if (event.relatedTarget instanceof Node && rootRef.current?.contains(event.relatedTarget) === true) return
    close()
  }

  const settleSelection = (accepted: boolean): void => {
    if (accepted) {
      if (rootRef.current !== null) close(true)
      return
    }
    const message = directory.getSnapshot().error
    if (message !== null) {
      toastSeq.current += 1
      setToast({ seq: toastSeq.current, text: t('error.action', { message }) })
    }
  }

  const choose = (selection: Selection): void => {
    if (state.current?.provider === selection.provider && state.current.model === selection.model) {
      close(true)
      return
    }
    lastAction.current = 'select'
    void select(selection).then(settleSelection)
  }

  const chooseEffort = (effort: string | undefined): void => {
    if (state.current === null) return
    if (effectiveEffort === effort) {
      close(true)
      return
    }
    lastAction.current = 'select'
    void select({
      provider: state.current.provider,
      model: state.current.model,
      ...effort === undefined ? {} : { reasoningEffort: effort },
    }).then(settleSelection)
  }

  const modelLabel = current?.model.name ?? t('trigger.fallback')
  const triggerLabel = effortLabel === undefined ? modelLabel : `${modelLabel} · ${effortLabel}`
  const triggerAria = current === undefined
    ? t('trigger.selectAria')
    : effortLabel === undefined
      ? t('trigger.aria', { model: modelLabel })
      : t('trigger.ariaEffort', { model: modelLabel, effort: effortLabel })

  itemRefs.current = []
  let itemIndex = 0
  const itemRef = () => {
    const at = itemIndex++
    return (node: HTMLButtonElement | null) => {
      itemRefs.current[at] = node
    }
  }

  const loadError = state.error !== null && lastAction.current === 'load' && (
    <div className={styles.seatError}>
      <span>{t('error.action', { message: state.error ?? '' })}</span>
      <button type="button" className={styles.seatRetry} onClick={reload}>{t('retry')}</button>
    </div>
  )

  const option = (
    selected: boolean,
    onClick: () => void,
    label: React.ReactNode,
    description?: string,
  ) => (
    <button
      ref={itemRef()}
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      className={selected ? `${styles.seatOption} ${styles.seatSelected}` : styles.seatOption}
      disabled={busy}
      onClick={onClick}
    >
      <span className={styles.seatOptionCopy}>
        <span className={styles.seatOptionName}>{label}</span>
        {description !== undefined && <span className={styles.seatOptionDescription}>{description}</span>}
      </span>
      <span className={styles.seatCheck}>{selected ? <IconCheckOutline16 /> : null}</span>
    </button>
  )

  return (
    <div ref={rootRef} className={styles.seatRoot} onKeyDown={onRootKeyDown} onBlur={onBlur}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.seatTrigger}
        aria-label={triggerAria}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? `${id}-menu` : undefined}
        title={triggerLabel}
        disabled={locked}
        onClick={() => {
          if (open) {
            close()
          } else {
            setPane('root')
            setOpen(true)
            reload()
          }
        }}
      >
        {current !== undefined && (
          <ProviderGlyph provider={current.group.id} displayName={current.group.name} size={14} />
        )}
        <span className={styles.seatTriggerLabel}>{modelLabel}</span>
        {effortLabel !== undefined && <span className={styles.seatTriggerEffort}>{effortLabel}</span>}
        <IconChevronDownOutline14 className={open ? styles.seatChevronOpen : styles.seatChevron} />
      </button>

      {open && (
        <div
          id={`${id}-menu`}
          className={styles.seatMenu}
          role="menu"
          aria-label={t('menu.aria')}
          aria-busy={state.status === 'loading' || busy}
        >
          {pane === 'root' && (
            <>
              <button ref={itemRef()} type="button" role="menuitem" className={styles.seatCell} onClick={() => setPane('model')}>
                <span className={styles.seatCellLabel}>{t('menu.model')}</span>
                <span className={styles.seatCellValue}>
                  {current !== undefined && (
                    <ProviderGlyph provider={current.group.id} displayName={current.group.name} size={14} />
                  )}
                  <span className={styles.seatCellValueText} title={modelLabel}>{modelLabel}</span>
                </span>
                <IconChevronRightOutline14 className={styles.seatCellChevron} />
              </button>
              {reasoning !== undefined && (
                <button ref={itemRef()} type="button" role="menuitem" className={styles.seatCell} onClick={() => setPane('effort')}>
                  <span className={styles.seatCellLabel}>{t('menu.effort')}</span>
                  <span className={styles.seatCellValue}>
                    <span className={styles.seatCellValueText}>{effortLabel}</span>
                  </span>
                  <IconChevronRightOutline14 className={styles.seatCellChevron} />
                </button>
              )}
            </>
          )}

          {pane === 'model' && (
            <>
              {state.status === 'loading' && <div className={styles.seatStatus}>{t('status.loading')}</div>}
              {loadError}
              {state.failures.map(failure => (
                <div key={failure.id} className={styles.seatWarning}>
                  <span>{t('warning.groupLoad', { name: failure.name, message: failure.message })}</span>
                  <button type="button" className={styles.seatRetry} onClick={reload}>{t('retry')}</button>
                </div>
              ))}
              <div className={`${styles.seatGroups} scrollable`}>
                {state.groups.map((group: Group) => (
                  <section key={group.id} role="group" aria-labelledby={`${id}-${group.id}`} className={styles.seatGroup}>
                    <div className={styles.seatGroupTitle} id={`${id}-${group.id}`}>
                      <ProviderGlyph provider={group.id} displayName={group.name} size={14} />
                      {group.name}
                    </div>
                    {group.models.map(model => option(
                      state.current?.provider === group.id && state.current.model === model.id,
                      // The model's declared default effort travels with the
                      // selection, as the stock seat sends it — omitting it
                      // would run at the provider default while the trigger
                      // shows the model's own.
                      () => choose({
                        provider: group.id,
                        model: model.id,
                        ...model.reasoning?.defaultEffort === undefined ? {} : { reasoningEffort: model.reasoning.defaultEffort },
                      }),
                      model.name,
                      model.description,
                    ))}
                  </section>
                ))}
              </div>
              {state.status === 'ready' && choices.length === 0 && (
                <div className={styles.seatEmpty}>{t('empty.models')}</div>
              )}
            </>
          )}

          {pane === 'effort' && (
            <>
              {loadError}
              {effortChoices.length === 0
                ? <div className={styles.seatEmpty}>{t('empty.efforts')}</div>
                : effortChoices.map(level => (
                  <span key={level.key} style={{ display: 'contents' }}>
                    {option(
                      effectiveEffort === level.effort,
                      () => chooseEffort(level.effort),
                      level.label,
                      'description' in level ? level.description : undefined,
                    )}
                  </span>
                ))}
            </>
          )}
        </div>
      )}

      {toast !== null && (
        <Toast
          key={toast.seq}
          text={toast.text}
          icon={<IconWarningOutline16 />}
          anchor={rootRef.current?.closest('[data-composer-card]') ?? null}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  )
}
