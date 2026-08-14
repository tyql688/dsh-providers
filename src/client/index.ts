/**
 * The Accounts settings page, browser half: one `settings.section` entry that
 * talks to this plugin's own Host routes same-origin. Deliberately not through
 * the API gateway — its method table is closed to out-of-tree plugins, and
 * abusing `settings.mutate` would write login commands into a document meant
 * for durable preferences.
 */

import type { Context } from '@deepseek-ai/cordis'
import { bindSnapshotSelector } from '@deepseek-ai/dsh-client-web-react'
// Type-only: pulls the settings shell's SlotMap merge (the 'settings.section' entry).
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
import { AccountsSection } from './AccountsSection.tsx'
import type { AccountsSectionInjected } from './AccountsSection.tsx'
import { en, zh } from './locales.ts'
import type { AccountsKey } from './locales.ts'
import { AccountsStore } from './store.ts'

export type { AccountsSectionInjected, AccountsSectionProps } from './AccountsSection.tsx'
export type { AccountsState, AccountsStore, LoginFlowState } from './store.ts'
export type { AccountsKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The Accounts page copy. */
    'settings.accounts': AccountsKey
  }
}

/** Dictionary namespace owned by this plugin. */
const NS = 'settings.accounts'

/**
 * Required services. The target slot is declared by the settings base
 * package, whose activation order relative to this one is not constrained —
 * registration waits on the declaration through `slots.inject()`, not on a
 * service edge.
 */
export const inject = ['slots', 'locale']

/** Register the Accounts section and its copy. */
export function apply(ctx: Context): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'dsh-providers: copy dictionaries')

  const controller = new AccountsStore()
  const useSnapshot = bindSnapshotSelector(controller)
  ctx.effect(() => () => controller.dispose(), 'dsh-providers: account store')

  // One bound translate serves both the nav label and the injected face, so
  // the page's copy and its nav entry can never disagree about the locale.
  const t = ctx.locale.bind(NS)
  const injected = (): AccountsSectionInjected => ({ controller, useSnapshot, t })

  ctx.slots.inject('settings.section', () => ctx.slots.register({
    name: 'settings.section',
    id: 'accounts',
    order: 11,
    label: () => t('nav'),
    inject: injected,
  }, AccountsSection))
}
