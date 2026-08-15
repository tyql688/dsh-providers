/**
 * The Accounts settings page: a search box over two groups of provider rows,
 * one card open at a time, plus the login wizard while a flow is running.
 * Everything it renders arrives through the slot's inject face; no component
 * here reaches for cordis, since `ctx` belongs to `apply`.
 */

import { useEffect } from 'react'
import { Button, IconSearchOutline16, Input, Modal } from '@deepseek-ai/dsh-client-ui-primitives'
import type { SnapshotSelectorHook, Translate } from '@deepseek-ai/dsh-client-ui-slots'
import type { AuthTypeName, ProviderView, RefreshCatalogResponse } from '../wire.ts'
import { LoginDialog } from './LoginDialog.tsx'
import { LogoutDialog } from './LogoutDialog.tsx'
import { ProviderRow } from './ProviderRow.tsx'
import { ALL_PROVIDERS } from './store.ts'
import type { AccountsState, AccountsStore } from './store.ts'
import type { AccountsKey } from './locales.ts'
import styles from './AccountsSection.module.css'

/** Injected dependencies of {@link AccountsSection} (the slot `inject` face). */
export interface AccountsSectionInjected {
  /** The page store; loaded on mount and after every mutation. */
  controller: AccountsStore
  /** uSES selector hook bound to the store. */
  useSnapshot: SnapshotSelectorHook<AccountsState>
  /** Section copy. */
  t: Translate<AccountsKey>
}

/** Props delivered by the slot outlet: the inject face, spread flat. */
export type AccountsSectionProps = Partial<AccountsSectionInjected>

/**
 * One line for what a catalog update did. A batch that updated thirty-nine
 * providers and failed on one is neither a success nor a failure, so the
 * changed count leads and the failures are named.
 */
function summarizeUpdate(result: RefreshCatalogResponse, t: Translate<AccountsKey>): {
  tone: 'ok' | 'warn'
  text: string
} {
  const changed = result.updated.filter(update => update.changed)
  const failed = result.errors
  if (failed.length > 0) {
    return {
      tone: 'warn',
      text: t('catalogPartial', {
        count: failed.length,
        providers: failed.map(error => error.provider).join(', '),
        reason: failed[0]?.message ?? '',
      }),
    }
  }
  if (changed.length === 0) return { tone: 'ok', text: t('catalogUnchanged') }
  return {
    tone: 'ok',
    text: t('catalogUpdated', {
      count: changed.length,
      models: changed.reduce((total, update) => total + update.count, 0),
    }),
  }
}

/** Whether one provider matches the current filter, by id or display name. */
function matches(view: ProviderView, needle: string): boolean {
  if (needle.length === 0) return true
  const lowered = needle.toLowerCase()
  return view.id.toLowerCase().includes(lowered)
    || view.displayName.toLowerCase().includes(lowered)
}

/**
 * Render the Accounts settings page.
 * @returns the page, or null before the inject face is bound.
 */
export function AccountsSection({ controller, useSnapshot, t }: AccountsSectionProps) {
  // The outlet spreads the inject face, so a render before it is bound is
  // possible in principle; render nothing until then.
  const bound = controller !== undefined && useSnapshot !== undefined && t !== undefined
  return bound ? <Page controller={controller} useSnapshot={useSnapshot} t={t} /> : null
}

/** The page proper, with the inject face proven present. */
function Page({ controller, useSnapshot, t }: AccountsSectionInjected) {
  const status = useSnapshot(state => state.status)
  const error = useSnapshot(state => state.error)
  const providers = useSnapshot(state => state.providers)
  const openRow = useSnapshot(state => state.selected)
  const filter = useSnapshot(state => state.filter)
  const login = useSnapshot(state => state.login)
  const loggingOut = useSnapshot(state => state.loggingOut)
  const routing = useSnapshot(state => state.routing)
  const updating = useSnapshot(state => state.updating)
  const catalogNotice = useSnapshot(state => state.catalogNotice)
  const expandedModels = useSnapshot(state => state.expandedModels)
  const discovering = useSnapshot(state => state.discovering)
  const confirmingLogout = useSnapshot(state => state.confirmingLogout)
  const confirmingImport = useSnapshot(state => state.confirmingImport)
  const importing = useSnapshot(state => state.importing)

  useEffect(() => {
    void controller.load()
  }, [controller])

  // The Models page and external `settings.yaml` edits change the same routes
  // this page reports. Refetching when the window regains focus is the cheap
  // way to stay converged; subscribing to the Host's own invalidations would
  // need a wire this plugin does not own.
  useEffect(() => {
    const refresh = (): void => {
      if (document.visibilityState === 'visible') void controller.load()
    }
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [controller])

  const visible = providers.filter(view => matches(view, filter))
  const connected = visible.filter(view => view.credential !== undefined || view.configured)
  const rest = visible.filter(view => view.credential === undefined && !view.configured)

  const rowProps = {
    t,
    onToggle: (providerId: string) => controller.select(providerId),
    onLogin: (providerId: string, method: AuthTypeName) => {
      void controller.beginLogin(providerId, method)
    },
    onRoute: (providerId: string) => {
      void controller.route(providerId)
    },
    onUpdateCatalog: (providerId: string) => {
      void controller.updateCatalog(providerId, result => summarizeUpdate(result, t))
    },
    onAskDiscover: (providerId: string | null, baseURL?: string) => {
      controller.askDiscover(providerId, baseURL)
    },
    onEditDiscoverUrl: (baseURL: string) => controller.editDiscoverUrl(baseURL),
    onDiscover: (providerId: string, baseURL: string) => {
      void controller.discoverEndpoint(providerId, baseURL, count => t('discovered', { count }))
    },
    onToggleModels: (providerId: string) => {
      controller.expandModels(expandedModels === providerId ? null : providerId)
    },
    onAskLogout: (providerId: string) => controller.askLogout(providerId),
    onAskImport: (providerId: string) => controller.askImport(providerId),
  }

  const group = (label: string, rows: readonly ProviderView[]) => rows.length === 0
    ? null
    : (
      <section className={styles.group}>
        <h3 className={styles.groupLabel}>{label}</h3>
        {rows.map(view => (
          <ProviderRow
            key={view.id}
            view={view}
            open={openRow === view.id}
            loggingOut={loggingOut === view.id}
            routing={routing === view.id}
            updating={updating === view.id || updating === ALL_PROVIDERS}
            importing={importing === view.id}
            expandedModels={expandedModels === view.id}
            discovering={discovering?.provider === view.id ? discovering.baseURL : null}
            {...rowProps}
          />
        ))}
      </section>
    )

  return (
    <div className={styles.section}>
      <p className={styles.intro}>{t('intro')}</p>

      {error !== null && (
        // Rendered whatever the page status: a mutation the Host refused and
        // a failed background refresh both land here, and both would
        // otherwise be invisible on a page that already loaded.
        <div className={styles.notice}>
          <span className={styles.error}>{error}</span>
          <Button variant="outline" size="sm" onClick={() => void controller.load()}>{t('retry')}</Button>
        </div>
      )}

      {status === 'loading' && <p className={styles.hint}>{t('loading')}</p>}

      {status === 'ready' && (
        <>
          <div className={styles.toolbar}>
            <Input
              className={styles.search}
              icon={<IconSearchOutline16 />}
              value={filter}
              placeholder={t('search')}
              aria-label={t('search')}
              onChange={event => controller.filter(event.target.value)}
            />
            <Button
              variant="outline"
              disabled={updating !== null}
              onClick={() => void controller.updateCatalog(undefined, result => summarizeUpdate(result, t))}
            >
              {updating === ALL_PROVIDERS ? t('updatingCatalogs') : t('updateCatalogs')}
            </Button>
          </div>

          {catalogNotice !== null && (
            <p className={`${styles.catalogNotice} ${catalogNotice.tone === 'warn' ? styles.warn : ''}`}>
              {catalogNotice.text}
            </p>
          )}

          <div className={styles.list}>
            {group(t('groupConnected'), connected)}
            {group(t('groupAll'), rest)}
            {visible.length === 0 && <p className={styles.hint}>{t('empty')}</p>}
          </div>
        </>
      )}

      {confirmingLogout !== null && (() => {
        const target = providers.find(candidate => candidate.id === confirmingLogout)
        return (
          <LogoutDialog
            providerName={target?.displayName ?? confirmingLogout}
            routed={target?.routed === true}
            busy={loggingOut === confirmingLogout}
            t={t}
            onCancel={() => controller.askLogout(null)}
            onConfirm={removeRoute => void controller.logout(confirmingLogout, removeRoute)}
          />
        )
      })()}

      {confirmingImport !== null && (() => {
        const target = providers.find(candidate => candidate.id === confirmingImport)
        return (
          <Modal
            open
            onClose={() => controller.askImport(null)}
            title={t('importTitle', { source: target?.importSource ?? '' })}
            closeLabel={t('close')}
            description={t('importDescription')}
            footer={(
              <div className={styles.actions}>
                <Button variant="ghost" onClick={() => controller.askImport(null)}>{t('cancel')}</Button>
                <Button
                  variant="primary"
                  disabled={importing === confirmingImport}
                  onClick={() => void controller.importCredential(confirmingImport)}
                >
                  {importing === confirmingImport ? t('importing') : t('importConfirm')}
                </Button>
              </div>
            )}
          />
        )
      })()}

      {login !== null && (
        <LoginDialog
          flow={login}
          providerName={providers.find(candidate => candidate.id === login.provider)?.displayName ?? login.provider}
          t={t}
          onAnswer={value => void controller.answer(value)}
          onPeekKey={() => void controller.peekStoredKey()}
          onClose={() => void controller.closeLogin()}
        />
      )}
    </div>
  )
}
