/**
 * The sign-out confirmation. Signing out deletes a credential nothing can
 * restore, so it asks first. The remove-route option lives here rather than
 * on the card: it is a decision about this particular sign-out.
 */
import type { Translate } from '@deepseek-ai/dsh-client-ui-slots';
import type { AccountsKey } from './locales.ts';
/** Props of {@link LogoutDialog}. */
export interface LogoutDialogProps {
    providerName: string;
    /** Whether the provider currently has a Models-page entry to remove. */
    routed: boolean;
    busy: boolean;
    t: Translate<AccountsKey>;
    onCancel: () => void;
    onConfirm: (removeRoute: boolean) => void;
}
/** Render the sign-out confirmation. */
export declare function LogoutDialog({ providerName, routed, busy, t, onCancel, onConfirm }: LogoutDialogProps): import("react").JSX.Element;
