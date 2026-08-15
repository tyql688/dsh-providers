/**
 * One provider row: a summary line that expands into its own card, ordered by
 * what the user came for — the account's state, the models it serves, the
 * actions.
 */
import type { Translate } from '@deepseek-ai/dsh-client-ui-slots';
import type { AuthTypeName, ProviderView } from '../wire.ts';
import type { AccountsKey } from './locales.ts';
/** Props of {@link ProviderRow}. */
export interface ProviderRowProps {
    view: ProviderView;
    open: boolean;
    t: Translate<AccountsKey>;
    /** Whether this provider's sign-out is in flight. */
    loggingOut: boolean;
    /** Whether this provider's Models-page wiring is in flight. */
    routing: boolean;
    /** Whether this provider's model list is being updated. */
    updating: boolean;
    /** Whether this provider's whole model list is shown rather than a preview. */
    expandedModels: boolean;
    /** The endpoint being edited for discovery, or null while the field is closed. */
    discovering: string | null;
    /** Whether this provider's CLI-login import is in flight. */
    importing: boolean;
    onToggle: (providerId: string) => void;
    onLogin: (providerId: string, method: AuthTypeName) => void;
    /** Ask to adopt the detected local CLI login shown on this row. */
    onAskImport: (providerId: string) => void;
    onRoute: (providerId: string) => void;
    onUpdateCatalog: (providerId: string) => void;
    onAskDiscover: (providerId: string | null, baseURL?: string) => void;
    onEditDiscoverUrl: (baseURL: string) => void;
    onDiscover: (providerId: string, baseURL: string) => void;
    onToggleModels: (providerId: string) => void;
    onAskLogout: (providerId: string) => void;
}
/** Render one provider row and, while open, its card. */
export declare function ProviderRow({ view, open, t, loggingOut, routing, updating, expandedModels, discovering, importing, onToggle, onLogin, onAskImport, onRoute, onUpdateCatalog, onAskDiscover, onEditDiscoverUrl, onDiscover, onToggleModels, onAskLogout, }: ProviderRowProps): import("react").JSX.Element;
