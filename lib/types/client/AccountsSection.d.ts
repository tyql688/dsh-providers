/**
 * The Accounts settings page: a search box over two groups of provider rows,
 * one card open at a time, plus the login wizard while a flow is running.
 * Everything it renders arrives through the slot's inject face; no component
 * here reaches for cordis, since `ctx` belongs to `apply`.
 */
import type { SnapshotSelectorHook, Translate } from '@deepseek-ai/dsh-client-ui-slots';
import type { AccountsState, AccountsStore } from './store.ts';
import type { AccountsKey } from './locales.ts';
/** Injected dependencies of {@link AccountsSection} (the slot `inject` face). */
export interface AccountsSectionInjected {
    /** The page store; loaded on mount and after every mutation. */
    controller: AccountsStore;
    /** uSES selector hook bound to the store. */
    useSnapshot: SnapshotSelectorHook<AccountsState>;
    /** Section copy. */
    t: Translate<AccountsKey>;
}
/** Props delivered by the slot outlet: the inject face, spread flat. */
export type AccountsSectionProps = Partial<AccountsSectionInjected>;
/**
 * Render the Accounts settings page.
 * @returns the page, or null before the inject face is bound.
 */
export declare function AccountsSection({ controller, useSnapshot, t }: AccountsSectionProps): import("react").JSX.Element | null;
