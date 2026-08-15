/**
 * The composer model seat, re-rendered with brand marks.
 *
 * dsh's stock seat draws provider groups as text; this occupant shadows it
 * (lower slot priority renders) to put each provider's glyph on its group
 * heading and the current provider's glyph on the trigger. Everything else —
 * the directory store, selection RPCs, the `model` copy — is the stock
 * plugin's own machinery, reached through `ctx.modelDirectories` and the
 * shared locale namespace, so the two seats can never disagree about state.
 */
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import type { ModelSelectInjected } from '@deepseek-ai/dsh-client-ui-model-selection/client';
/** Props: the stock seat's inject face, the owner's lock, the `model` copy. */
export type ModelSeatProps = ModelSelectInjected & {
    locked: boolean;
} & PropsLocale<'model'>;
/** Render the composer model seat with provider glyphs. */
export declare function ModelSeat({ locked, available, directory, load, select, t }: ModelSeatProps): import("react").JSX.Element | null;
