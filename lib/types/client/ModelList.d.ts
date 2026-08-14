/**
 * The models a provider's routes serve. Each model shows its display name
 * only (the picker uses the same name); the id stays on hover. The modality
 * tag appears only when it separates one model from another.
 */
import type { Translate } from '@deepseek-ai/dsh-client-ui-slots';
import type { ModelView } from '../wire.ts';
import type { AccountsKey } from './locales.ts';
/** Props of {@link ModelList}. */
export interface ModelListProps {
    /** Models across every route of one provider, in adapter order. */
    models: readonly ModelView[];
    /** Whether the whole list is shown rather than the preview. */
    expanded: boolean;
    t: Translate<AccountsKey>;
    onToggleExpand: () => void;
}
/** Render one provider's models as a grouped, expandable list. */
export declare function ModelList({ models, expanded, t, onToggleExpand }: ModelListProps): import("react").JSX.Element;
