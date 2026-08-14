/**
 * The login wizard. It renders the flow's state rather than a fixed sequence
 * of screens, because the sequence belongs to the provider — an authorization
 * URL, a device code, a secret field, a select. Every slot that has a value
 * renders, so a URL can stay on screen while the paste field waits below it.
 */
import type { Translate } from '@deepseek-ai/dsh-client-ui-slots';
import type { AccountsKey } from './locales.ts';
import type { LoginFlowState } from './store.ts';
/** Props of {@link LoginDialog}. */
export interface LoginDialogProps {
    flow: LoginFlowState;
    /** Display name of the provider being signed in to. */
    providerName: string;
    t: Translate<AccountsKey>;
    onAnswer: (value: string) => void;
    /** Fetch the stored key; the eye on an untouched field is what triggers it. */
    onPeekKey: () => void;
    onClose: () => void;
}
/** Render the wizard for one login flow. */
export declare function LoginDialog({ flow, providerName, t, onAnswer, onPeekKey, onClose }: LoginDialogProps): import("react").JSX.Element;
