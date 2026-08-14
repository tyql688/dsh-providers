/**
 * The Accounts settings page, browser half: one `settings.section` entry that
 * talks to this plugin's own Host routes same-origin. Deliberately not through
 * the API gateway — its method table is closed to out-of-tree plugins, and
 * abusing `settings.mutate` would write login commands into a document meant
 * for durable preferences.
 */
import type { Context } from '@deepseek-ai/cordis';
import type { AccountsKey } from './locales.ts';
export type { AccountsSectionInjected, AccountsSectionProps } from './AccountsSection.tsx';
export type { AccountsState, AccountsStore, LoginFlowState } from './store.ts';
export type { AccountsKey } from './locales.ts';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** The Accounts page copy. */
        'settings.accounts': AccountsKey;
    }
}
/**
 * Required services. The target slot is declared by the settings base
 * package, whose activation order relative to this one is not constrained —
 * registration waits on the declaration through `slots.inject()`, not on a
 * service edge.
 */
export declare const inject: string[];
/** Register the Accounts section and its copy. */
export declare function apply(ctx: Context): void;
