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
// Type-only: the composer's SlotMap merge (the 'conversation.input.model' seat).
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
// Type-only: ctx.modelDirectories, ctx.sessions, and the `model` locale namespace.
import type {} from '@deepseek-ai/dsh-client-ui-model-selection/client'
// Type-only: the sidebar shell's SlotMap merge (the 'sidebar.footer.action' seat).
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import { AccountsSection } from './AccountsSection.tsx'
import { ModelSeat } from './ModelSeat.tsx'
import type { AccountsSectionInjected } from './AccountsSection.tsx'
import { SessionUsageView } from './SessionUsageView.tsx'
import { UsageCard } from './UsageCard.tsx'
import type { UsageCardInjected } from './UsageCard.tsx'
import { en, zh } from './locales.ts'
import type { AccountsKey } from './locales.ts'
import { AccountsStore } from './store.ts'
import { UsageStore } from './usage-store.ts'

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

  // The sidebar-foot usage card: today's token figures from this plugin's
  // own `usage` route, seated in the shell's additive foot row. Copy rides
  // the framework locale seat, so a language flip re-renders the card.
  const usage = new UsageStore()
  const useUsageSnapshot = bindSnapshotSelector(usage)
  ctx.effect(() => () => usage.dispose(), 'dsh-providers: usage store')
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
    name: 'sidebar.footer.action',
    id: 'usage',
    locale: NS,
    inject: (): UsageCardInjected => ({ controller: usage, useSnapshot: useUsageSnapshot }),
  }, UsageCard))

  // The session view ring's stats tab (对话 / 轨迹 / 统计): the current
  // session's accounting from this plugin's `usage/session` route. One list
  // entry with an id and label is the whole contract; the view reads the
  // current session off the standard sessions feed.
  ctx.slots.inject('conversation.view', () => ctx.slots.register({
    name: 'conversation.view',
    id: 'usage',
    order: 20,
    label: () => t('usageViewTab'),
    locale: NS,
    inject: () => ({}),
  }, SessionUsageView))

  // The composer model seat, re-rendered with brand glyphs. It SHADOWS the
  // stock occupant (single slots render the lowest priority) and reuses that
  // plugin's own directory service and `model` copy, so unloading this plugin
  // simply restores the stock seat. Registration waits on both services, so
  // a composition without the model-selection plugin registers nothing.
  ctx.inject(['slots', 'modelDirectories', 'sessions'], (scope) => {
    scope.slots.inject('conversation.input.model', () => scope.slots.register({
      name: 'conversation.input.model',
      locale: 'model',
      priority: -1,
      inject: (sessionId) => {
        const directory = scope.modelDirectories.directoryFor(sessionId)
        const available = scope.sessions.subagentAddress(sessionId) === undefined
        return {
          available,
          directory: directory.store,
          load: () => {
            if (available) directory.load().catch(() => {})
          },
          select: selection => available
            ? directory.select(selection).then(() => true, () => false)
            : Promise.resolve(false),
        }
      },
    }, ModelSeat))
  })
}
