/**
 * One provider row: a summary line that expands into its own card, ordered by
 * what the user came for — the account's state, the models it serves, the
 * actions.
 */

import { Button, IconChevronDownOutline14, Input, StateDot } from '@deepseek-ai/dsh-client-ui-primitives'
import type { Translate } from '@deepseek-ai/dsh-client-ui-slots'
import type { AuthTypeName, ProviderView } from '../wire.ts'
import { ModelList } from './ModelList.tsx'
import { ProviderGlyph } from './ProviderGlyph.tsx'
import { providerUsable } from './store.ts'
import type { AccountsKey } from './locales.ts'
import styles from './AccountsSection.module.css'

/** Props of {@link ProviderRow}. */
export interface ProviderRowProps {
  view: ProviderView
  open: boolean
  t: Translate<AccountsKey>
  /** Whether this provider's sign-out is in flight. */
  loggingOut: boolean
  /** Whether this provider's Models-page wiring is in flight. */
  routing: boolean
  /** Whether this provider's model list is being updated. */
  updating: boolean
  /** Whether this provider's whole model list is shown rather than a preview. */
  expandedModels: boolean
  /** The endpoint being edited for discovery, or null while the field is closed. */
  discovering: string | null
  /** Whether this provider's CLI-login import is in flight. */
  importing: boolean
  onToggle: (providerId: string) => void
  onLogin: (providerId: string, method: AuthTypeName) => void
  /** Ask to adopt the detected local CLI login shown on this row. */
  onAskImport: (providerId: string) => void
  onRoute: (providerId: string) => void
  onUpdateCatalog: (providerId: string) => void
  onAskDiscover: (providerId: string | null, baseURL?: string) => void
  onEditDiscoverUrl: (baseURL: string) => void
  onDiscover: (providerId: string, baseURL: string) => void
  onToggleModels: (providerId: string) => void
  onAskLogout: (providerId: string) => void
}

/**
 * A timestamp to the minute. No seconds, and a year only when it is not the
 * current one: a token lives for hours and a catalog is checked within days,
 * so "how long ago" is all the reader wants — but a catalog left unchecked
 * since last summer must not read as tomorrow.
 */
function formatMoment(epochMs: number): string {
  const date = new Date(epochMs)
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    ...(date.getFullYear() !== new Date().getFullYear() ? { year: 'numeric' } : {}),
    hour: '2-digit',
    minute: '2-digit',
  })
}

/** The one-line status phrase for a provider. */
function statusText(view: ProviderView, t: Translate<AccountsKey>): string {
  if (view.credential === 'oauth') return t('statusSignedIn')
  if (view.credential === 'api_key') return t('statusApiKey')
  if (view.configured) return t('statusAmbient', { source: view.source ?? '—' })
  return t('statusMissing')
}

/**
 * The state dot, rendered only when there is a state to report. Most rows are
 * simply not signed in and already say so in words; a dot on all thirty of
 * them would drown out the two that matter.
 */
function StatusDot({ view }: { view: ProviderView }) {
  if (view.error !== undefined) return <StateDot state="error" size={8} />
  if (providerUsable(view)) return <StateDot state="done" size={8} />
  return null
}

/** The label one sign-in method carries, given whether the provider is already connected. */
function methodLabel(
  method: ProviderView['methods'][number],
  connected: boolean,
  t: Translate<AccountsKey>,
): string {
  if (method.type === 'api_key') return connected ? t('replaceApiKey') : t('signInApiKey')
  // The provider's own line ("Sign in with SuperGrok or X Premium") is a
  // first-run invitation; showing it to someone already signed in reads as
  // though the sign-in did not take.
  if (connected) return t('signInAgain')
  return method.loginLabel ?? t('signInOauthNamed', { name: method.name })
}

/** Render one provider row and, while open, its card. */
export function ProviderRow({
  view, open, t, loggingOut, routing, updating, expandedModels, discovering, importing,
  onToggle, onLogin, onAskImport, onRoute, onUpdateCatalog, onAskDiscover, onEditDiscoverUrl,
  onDiscover, onToggleModels, onAskLogout,
}: ProviderRowProps) {
  const expired = view.expires !== undefined && view.expires <= Date.now()
  const subscription = view.methods.some(method => method.subscription === true)
  const connected = view.credential !== undefined
  const models = view.models ?? []

  return (
    <div className={`${styles.row} ${open ? styles.rowOpen : ''}`}>
      <button
        type="button"
        data-provider-id={view.id}
        aria-expanded={open}
        className={styles.rowSummary}
        onClick={() => onToggle(view.id)}
      >
        <ProviderGlyph provider={view.id} displayName={view.displayName} baseURL={view.baseURL} />
        <span className={styles.rowName}>{view.displayName}</span>
        {subscription && <span className={styles.badge}>{t('subscription')}</span>}
        <span className={styles.rowStatus}>{statusText(view, t)}</span>
        <StatusDot view={view} />
        <IconChevronDownOutline14 className={open ? styles.chevronOpen : styles.chevron} />
      </button>

      {open && (
        <div className={styles.card}>
          {/* One meta line, only the parts that apply: an api key does not
              expire, and a catalog nobody has fetched has no age. */}
          {(view.expires !== undefined || view.catalogCheckedAt !== undefined) && (
            <p className={styles.meta}>
              {view.expires !== undefined && (
                <span className={expired ? styles.warn : undefined}>
                  {expired ? t('expired') : t('expiresAt', { time: formatMoment(view.expires) })}
                </span>
              )}
              {view.expires !== undefined && view.catalogCheckedAt !== undefined && <span aria-hidden="true">·</span>}
              {view.catalogCheckedAt !== undefined && (
                <span>{t('catalogChecked', { time: formatMoment(view.catalogCheckedAt) })}</span>
              )}
            </p>
          )}

          {view.error !== undefined && <p className={styles.error}>{view.error}</p>}

          {view.routed && (
            <div className={styles.models}>
              <div className={styles.modelsHead}>
                <span className={styles.modelsLabel}>{t('models', { count: models.length })}</span>
                <span className={styles.grow} />
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={updating}
                  onClick={() => onUpdateCatalog(view.id)}
                >
                  {updating ? t('updatingCatalog') : t('updateCatalog')}
                </Button>
                {view.discoverable === true && (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={updating}
                    onClick={() => onAskDiscover(discovering === null ? view.id : null, view.baseURL ?? '')}
                  >
                    {t('discoverEndpoint')}
                  </Button>
                )}
              </div>

              {discovering !== null && (
                <form
                  className={styles.discover}
                  onSubmit={(event) => {
                    event.preventDefault()
                    onDiscover(view.id, discovering)
                  }}
                >
                  <Input
                    className={styles.discoverInput}
                    value={discovering}
                    placeholder={view.baseURL ?? 'https://…/v1'}
                    aria-label={t('discoverEndpointLabel')}
                    onChange={event => onEditDiscoverUrl(event.target.value)}
                  />
                  <Button type="submit" variant="outline" size="sm" disabled={updating}>
                    {updating ? t('discoveringEndpoint') : t('discoverSubmit')}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onAskDiscover(null)}>{t('cancel')}</Button>
                  <p className={styles.hint}>{t('discoverHint')}</p>
                </form>
              )}

              <ModelList
                models={models}
                expanded={expandedModels}
                t={t}
                onToggleExpand={() => onToggleModels(view.id)}
              />
            </div>
          )}

          {view.configured && !view.routed && (
            <div className={styles.notice}>
              <span className={styles.warn}>{t('noRoute')}</span>
              <Button
                variant="outline"
                size="sm"
                disabled={routing}
                onClick={() => onRoute(view.id)}
              >
                {routing ? t('routing') : t('routeNow')}
              </Button>
            </div>
          )}

          <div className={styles.actions}>
            {view.methods.map(method => (
              <Button
                key={method.type}
                variant={!connected && method.type === 'oauth' ? 'primary' : 'outline'}
                onClick={() => onLogin(view.id, method.type)}
              >
                {methodLabel(method, connected, t)}
              </Button>
            ))}
            {view.importSource !== undefined && (
              <Button
                variant="outline"
                disabled={importing}
                onClick={() => onAskImport(view.id)}
              >
                {importing ? t('importing') : t('importFrom', { source: view.importSource })}
              </Button>
            )}
            {/* Sign-out is the action here nothing undoes, so it is styled
                apart from the buttons that add things. */}
            {connected && (
              <Button
                variant="ghost"
                className={styles.destructive}
                disabled={loggingOut}
                onClick={() => onAskLogout(view.id)}
              >
                {loggingOut ? t('signingOut') : t('signOut')}
              </Button>
            )}
          </div>

          {view.methods.length === 0 && <p className={styles.hint}>{t('noMethods')}</p>}

          {/* Shown only for ambient credentials: WHICH variable answers is
              the whole diagnosis there. For a credential this plugin holds it
              is plumbing nobody needs to read. */}
          {view.credential === undefined && view.configured && (
            <span className={styles.factRef}>{t('reference', { ref: view.ref })}</span>
          )}
        </div>
      )}
    </div>
  )
}
