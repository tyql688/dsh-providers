/**
 * The secret input, with a reveal toggle.
 *
 * A pasted API key is the one field where a typo is both easy and invisible —
 * the provider answers 401 minutes later — hence the reveal. The eye icon is
 * drawn inline because the shared icon set ships no such glyph.
 */
/** Props of {@link SecretField}. */
export interface SecretFieldProps {
    value: string;
    placeholder?: string;
    label: string;
    /** Reveal-toggle accessible names, for the hidden and shown states. */
    showLabel: string;
    hideLabel: string;
    autoFocus?: boolean;
    onChange: (value: string) => void;
    onSubmit: () => void;
    /** Fired each time the eye toggles to revealed — where a lazy prefill fetches. */
    onReveal?: () => void;
}
/** Render a labelled secret input with a reveal toggle. */
export declare function SecretField({ value, placeholder, label, showLabel, hideLabel, autoFocus, onChange, onSubmit, onReveal, }: SecretFieldProps): import("react").JSX.Element;
