/**
 * The sign-out confirmation. Signing out deletes a credential nothing can
 * restore, so it asks first. The remove-route option lives here rather than
 * on the card: it is a decision about this particular sign-out.
 */

import { useState } from 'react'
import { Button, Modal } from '@deepseek-ai/dsh-client-ui-primitives'
import type { Translate } from '@deepseek-ai/dsh-client-ui-slots'
import type { AccountsKey } from './locales.ts'
import styles from './AccountsSection.module.css'

/** Props of {@link LogoutDialog}. */
export interface LogoutDialogProps {
  providerName: string
  /** Whether the provider currently has a Models-page entry to remove. */
  routed: boolean
  busy: boolean
  t: Translate<AccountsKey>
  onCancel: () => void
  onConfirm: (removeRoute: boolean) => void
}

/** Render the sign-out confirmation. */
export function LogoutDialog({ providerName, routed, busy, t, onCancel, onConfirm }: LogoutDialogProps) {
  const [removeRoute, setRemoveRoute] = useState(false)
  return (
    <Modal
      open
      onClose={onCancel}
      title={t('logoutTitle', { provider: providerName })}
      closeLabel={t('close')}
      description={t('logoutDescription')}
      footer={(
        <div className={styles.actions}>
          <Button variant="ghost" onClick={onCancel}>{t('cancel')}</Button>
          <Button variant="primary" disabled={busy} onClick={() => onConfirm(removeRoute)}>
            {busy ? t('signingOut') : t('logoutConfirm')}
          </Button>
        </div>
      )}
    >
      {routed && (
        <div className={styles.confirmBody}>
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={removeRoute}
              onChange={event => setRemoveRoute(event.target.checked)}
            />
            {t('removeRoute')}
          </label>
          <p className={styles.hint}>{t('removeRouteHint')}</p>
        </div>
      )}
    </Modal>
  )
}
