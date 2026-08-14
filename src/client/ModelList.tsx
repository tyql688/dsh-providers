/**
 * The models a provider's routes serve. Each model shows its display name
 * only (the picker uses the same name); the id stays on hover. The modality
 * tag appears only when it separates one model from another.
 */

import { Fragment } from 'react'
import { Button } from '@deepseek-ai/dsh-client-ui-primitives'
import type { Translate } from '@deepseek-ai/dsh-client-ui-slots'
import type { ModelView } from '../wire.ts'
import type { AccountsKey } from './locales.ts'
import styles from './AccountsSection.module.css'

/**
 * How many models a collapsed list shows. Enough that a small provider shows
 * everything without an expander; short enough that a 400-model gateway does
 * not bury the card's own controls.
 */
const PREVIEW = 8

/** Props of {@link ModelList}. */
export interface ModelListProps {
  /** Models across every route of one provider, in adapter order. */
  models: readonly ModelView[]
  /** Whether the whole list is shown rather than the preview. */
  expanded: boolean
  t: Translate<AccountsKey>
  onToggleExpand: () => void
}

/** Whether a model accepts images. */
function vision(model: ModelView): boolean {
  return model.input?.includes('image') === true
}

/** Render one provider's models as a grouped, expandable list. */
export function ModelList({ models, expanded, t, onToggleExpand }: ModelListProps) {
  if (models.length === 0) return <p className={styles.hint}>{t('modelsEmpty')}</p>

  const shown = expanded ? models : models.slice(0, PREVIEW)
  const hidden = models.length - shown.length

  // Keep adapter order rather than sorting: it is the order the picker uses.
  const groups: { route: string; api?: string; models: ModelView[] }[] = []
  for (const model of shown) {
    const last = groups.at(-1)
    if (last?.route === model.route) last.models.push(model)
    else groups.push({ route: model.route, ...model.api === undefined ? {} : { api: model.api }, models: [model] })
  }
  const grouped = groups.length > 1
  const tagged = shown.some(vision) && !shown.every(vision)

  return (
    <div className={styles.modelList}>
      <ul className={styles.modelRows}>
        {groups.map(group => (
          <Fragment key={group.route}>
            {/* Route key and protocol, only when there is more than one
                group: the protocol is why a second route exists, and
                labelling a provider's only route says nothing. */}
            {grouped && (
              <li className={styles.modelGroupLabel}>
                {group.route}
                {group.api !== undefined && ` · ${group.api}`}
              </li>
            )}
            {group.models.map(model => (
              <li key={`${model.route}/${model.id}`} className={styles.modelRow} title={model.id}>
                <span className={styles.modelName}>{model.name}</span>
                {tagged && vision(model) && <span className={styles.modelTag}>{t('modalityImage')}</span>}
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      {(hidden > 0 || expanded) && (
        <Button variant="ghost" size="sm" onClick={onToggleExpand}>
          {expanded ? t('modelsCollapse') : t('modelsExpand', { count: hidden })}
        </Button>
      )}
    </div>
  )
}
