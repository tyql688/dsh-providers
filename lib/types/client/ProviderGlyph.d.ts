/**
 * Brand glyphs for the provider rows. Icons come from `@lobehub/icons`,
 * imported one component at a time so the bundle carries exactly the brands
 * this page shows. Colour variants are preferred; a brand whose official mark
 * is monochrome ships `Mono`, which renders in `currentColor` and follows the
 * theme. Kimi is themed: its colour K is white-filled and only reads on dark,
 * so light mode shows the Mono mark instead (see {@link THEMED_GLYPHS}).
 *
 * Resolution order: the explicit id table (installed pi-ai providers), then a
 * keyword match over id, name and endpoint (custom providers name themselves,
 * so the brand must be inferred), then a monogram.
 */
/** Props of {@link ProviderGlyph}. */
export interface ProviderGlyphProps {
    /** pi-ai provider id. */
    provider: string;
    /** Display name, used for keyword matching and the monogram fallback. */
    displayName: string;
    /** Endpoint, when known; a custom provider's URL usually names its brand. */
    baseURL?: string | undefined;
    size?: number;
}
/**
 * Render one provider's brand mark.
 * @returns the glyph, a keyword-matched glyph, or a first-letter monogram for
 *   a brand nothing recognizes.
 */
export declare function ProviderGlyph({ provider, displayName, baseURL, size }: ProviderGlyphProps): import("react").JSX.Element;
