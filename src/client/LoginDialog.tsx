/**
 * The login wizard. It renders the flow's state rather than a fixed sequence
 * of screens, because the sequence belongs to the provider — an authorization
 * URL, a device code, a secret field, a select. Every slot that has a value
 * renders, so a URL can stay on screen while the paste field waits below it.
 */

import { useEffect, useState } from 'react'
import { Button, Input, Modal, writeClipboard } from '@deepseek-ai/dsh-client-ui-primitives'
import { SecretField } from './SecretField.tsx'
import type { Translate } from '@deepseek-ai/dsh-client-ui-slots'
import type { AccountsKey } from './locales.ts'
import type { LoginFlowState } from './store.ts'
import styles from './AccountsSection.module.css'

/** Props of {@link LoginDialog}. */
export interface LoginDialogProps {
  flow: LoginFlowState
  /** Display name of the provider being signed in to. */
  providerName: string
  t: Translate<AccountsKey>
  onAnswer: (value: string) => void
  /** Fetch the stored key; the eye on an untouched field is what triggers it. */
  onPeekKey: () => void
  onClose: () => void
}

/** Render the wizard for one login flow. */
export function LoginDialog({ flow, providerName, t, onAnswer, onPeekKey, onClose }: LoginDialogProps) {
  // The draft carries the id of the question it answers. Rendering derives the
  // field value from that pairing, so when the flow moves to the next question
  // the old text is gone on the SAME render — an effect-based reset would leave
  // a typed secret sitting in the next (possibly plain-text) field for a frame.
  const [draft, setDraft] = useState<{ requestId: string; value: string } | null>(null)
  const [copied, setCopied] = useState(false)

  // "Copied" is confirmation, not state: revert the label after a moment.
  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(false), 2_000)
    return () => clearTimeout(timer)
  }, [copied])
  const requestId = flow.prompt?.requestId
  const typed = requestId !== undefined && draft?.requestId === requestId ? draft.value : undefined
  // The FIRST secret prompt of a replace wizard may prefill with the stored
  // key — that is where "what is the current key" belongs, and the eye is the
  // reveal. Later prompts never do: a provider asking a second secret (an
  // account id beside the key) needs an empty field, not the key stuffed into
  // it. Once the user types, their draft wins.
  const prefillable = flow.prompt?.kind === 'secret' && requestId === flow.prefillPromptId
  const value = typed ?? (prefillable ? flow.storedKey ?? '' : '')
  const edit = (next: string): void => {
    if (requestId !== undefined) setDraft({ requestId, value: next })
  }

  const submit = (): void => {
    if (flow.prompt === null || flow.answering) return
    onAnswer(value)
  }

  const copyUrl = async (): Promise<void> => {
    if (flow.authUrl === null) return
    // The helper reports whether the clipboard actually accepted the write;
    // a denied clipboard must not claim "Copied".
    setCopied(await writeClipboard(flow.authUrl))
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={t('loginTitle', { provider: providerName })}
      closeLabel={t('close')}
      // A footer only once the flow settles: while it runs, the modal's own ×,
      // Escape, and mask click already close (and `closeLogin` cancels the
      // attempt), so a fourth "cancel" would be one more way to lose the flow
      // by accident. On success or failure the close button is the natural
      // next action, and worth reaching without the corner.
      footer={flow.done || flow.error !== null
        ? <Button variant="ghost" onClick={onClose}>{t('close')}</Button>
        : undefined}
    >
      <div className={styles.wizard}>
        {flow.authUrl !== null && (
          <div className={styles.wizardUrl}>
            {flow.instructions !== null && <span>{flow.instructions}</span>}
            <span className={styles.wizardUrlText}>{flow.authUrl}</span>
            <div className={styles.actions}>
              <Button
                variant="primary"
                onClick={() => window.open(flow.authUrl ?? '', '_blank', 'noopener,noreferrer')}
              >
                {t('openLink')}
              </Button>
              <Button variant="outline" onClick={() => void copyUrl()}>
                {copied ? t('copied') : t('copyLink')}
              </Button>
            </div>
          </div>
        )}

        {flow.deviceCode !== null && (
          <div className={styles.wizardUrl}>
            <span>{t('deviceCodeTitle')}</span>
            <span className={styles.deviceCode}>{flow.deviceCode.userCode}</span>
            <Button
              variant="primary"
              onClick={() => window.open(flow.deviceCode?.verificationUri ?? '', '_blank', 'noopener,noreferrer')}
            >
              {t('deviceCodeUrl')}
            </Button>
          </div>
        )}

        {flow.prompt !== null && flow.prompt.kind === 'select' && (
          <div className={styles.optionList}>
            <span>{flow.prompt.message}</span>
            {(flow.prompt.options ?? []).map(option => (
              <button
                key={option.id}
                type="button"
                className={styles.option}
                disabled={flow.answering}
                onClick={() => onAnswer(option.id)}
              >
                <span>{option.label}</span>
                {option.description !== undefined && (
                  <span className={styles.optionDescription}>{option.description}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {flow.prompt !== null && flow.prompt.kind === 'secret' && (
          <>
            <SecretField
              label={flow.prompt.message}
              value={value}
              placeholder={flow.prompt.placeholder ?? t('secretPlaceholder')}
              showLabel={t('revealSecret')}
              hideLabel={t('hideSecret')}
              autoFocus
              onChange={edit}
              onSubmit={submit}
              onReveal={() => {
                // Opening the eye on a field the user has not typed in is the
                // request to see the current key; the controller ignores it for
                // non-api-key flows and once a key is already fetched.
                if (typed === undefined) onPeekKey()
              }}
            />
            <Button
              variant="primary"
              disabled={flow.answering || value.trim().length === 0}
              onClick={submit}
            >
              {t('submit')}
            </Button>
          </>
        )}

        {flow.prompt !== null && flow.prompt.kind !== 'select' && flow.prompt.kind !== 'secret' && (
          <label className={styles.field}>
            <span className={styles.fieldLabel}>{flow.prompt.message}</span>
            <div className={styles.promptRow}>
              <Input
                className={styles.promptInput}
                type="text"
                value={value}
                autoFocus
                autoComplete="off"
                spellCheck={false}
                placeholder={flow.prompt.placeholder ?? ''}
                onChange={event => edit(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') submit()
                }}
              />
              <Button
                variant="primary"
                className={styles.promptSubmit}
                disabled={flow.answering}
                onClick={submit}
              >
                {t('submit')}
              </Button>
            </div>
          </label>
        )}

        {flow.progress !== null && <span>{flow.progress}</span>}
        {flow.prompt === null && !flow.done && flow.error === null && flow.progress === null
          && (flow.authUrl !== null || flow.deviceCode !== null) && <span>{t('waiting')}</span>}
        {flow.done && <span>{t('done')}</span>}
        {flow.error !== null && (
          <span className={styles.error}>{`${t('loginFailed')}: ${flow.error}`}</span>
        )}

        {flow.infos.length > 0 && (
          <div className={styles.log}>
            {flow.infos.map(info => (
              <span key={info.id}>
                {info.message}
                {info.links.map(link => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                    {` ${link.label ?? link.url}`}
                  </a>
                ))}
              </span>
            ))}
          </div>
        )}
      </div>
    </Modal>
  )
}
