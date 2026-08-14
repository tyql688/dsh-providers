/**
 * The secret input, with a reveal toggle.
 *
 * A pasted API key is the one field where a typo is both easy and invisible —
 * the provider answers 401 minutes later — hence the reveal. The eye icon is
 * drawn inline because the shared icon set ships no such glyph.
 */

import { useState } from 'react'
import { Input } from '@deepseek-ai/dsh-client-ui-primitives'
import styles from './AccountsSection.module.css'

/** Props of {@link SecretField}. */
export interface SecretFieldProps {
  value: string
  placeholder?: string
  label: string
  /** Reveal-toggle accessible names, for the hidden and shown states. */
  showLabel: string
  hideLabel: string
  autoFocus?: boolean
  onChange: (value: string) => void
  onSubmit: () => void
  /** Fired each time the eye toggles to revealed — where a lazy prefill fetches. */
  onReveal?: () => void
}

/** The eye at 16px, struck through while the value is visible. */
function EyeIcon({ struck }: { struck: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M1.5 8s2.4-4.2 6.5-4.2S14.5 8 14.5 8s-2.4 4.2-6.5 4.2S1.5 8 1.5 8Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="1.9" stroke="currentColor" strokeWidth="1.2" />
      {struck && <path d="m2.6 2.6 10.8 10.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />}
    </svg>
  )
}

/** Render a labelled secret input with a reveal toggle. */
export function SecretField({
  value, placeholder, label, showLabel, hideLabel, autoFocus = false, onChange, onSubmit, onReveal,
}: SecretFieldProps) {
  const [revealed, setRevealed] = useState(false)
  return (
    <label className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldControl}>
        <Input
          className={styles.fieldInput}
          type={revealed ? 'text' : 'password'}
          value={value}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck={false}
          {...placeholder === undefined ? {} : { placeholder }}
          onChange={event => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onSubmit()
          }}
        />
        <button
          type="button"
          className={styles.reveal}
          aria-label={revealed ? hideLabel : showLabel}
          aria-pressed={revealed}
          onClick={() => {
            setRevealed(!revealed)
            if (!revealed) onReveal?.()
          }}
        >
          <EyeIcon struck={revealed} />
        </button>
      </span>
    </label>
  )
}
