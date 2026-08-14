/**
 * Brand glyphs for the provider rows. Icons come from `@lobehub/icons`,
 * imported one component at a time so the bundle carries exactly the brands
 * this page shows. Colour variants are preferred; a brand whose official mark
 * is monochrome ships `Mono`, which renders in `currentColor` and follows the
 * theme. Kimi is themed: its colour K is white-filled and only reads on dark,
 * so light mode shows the Mono mark instead (see {@link THEMED_GLYPHS}).
 */
/** Props of {@link ProviderGlyph}. */
export interface ProviderGlyphProps {
    /** pi-ai provider id. */
    provider: string;
    /** Display name, used for the monogram fallback. */
    displayName: string;
    size?: number;
}
/**
 * Render one provider's brand mark.
 * @returns the glyph, or a first-letter monogram for a brand the library does
 *   not ship.
 */
export declare function ProviderGlyph({ provider, displayName, size }: ProviderGlyphProps): import("react").JSX.Element;
