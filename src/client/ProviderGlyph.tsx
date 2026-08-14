/**
 * Brand glyphs for the provider rows. Icons come from `@lobehub/icons`,
 * imported one component at a time so the bundle carries exactly the brands
 * this page shows. Colour variants are preferred; a brand whose official mark
 * is monochrome ships `Mono`, which renders in `currentColor` and follows the
 * theme. Kimi is themed: its colour K is white-filled and only reads on dark,
 * so light mode shows the Mono mark instead (see {@link THEMED_GLYPHS}).
 */

import AntGroupColor from '@lobehub/icons/es/AntGroup/components/Color'
import ClaudeColor from '@lobehub/icons/es/Claude/components/Color'
import AzureColor from '@lobehub/icons/es/Azure/components/Color'
import BasetenMono from '@lobehub/icons/es/Baseten/components/Mono'
import BedrockColor from '@lobehub/icons/es/Bedrock/components/Color'
import CerebrasColor from '@lobehub/icons/es/Cerebras/components/Color'
import CloudflareColor from '@lobehub/icons/es/Cloudflare/components/Color'
import CodexColor from '@lobehub/icons/es/Codex/components/Color'
import DeepSeekColor from '@lobehub/icons/es/DeepSeek/components/Color'
import FireworksColor from '@lobehub/icons/es/Fireworks/components/Color'
import GithubCopilotMono from '@lobehub/icons/es/GithubCopilot/components/Mono'
import GoogleColor from '@lobehub/icons/es/Google/components/Color'
import GroqMono from '@lobehub/icons/es/Groq/components/Mono'
import HuggingFaceColor from '@lobehub/icons/es/HuggingFace/components/Color'
import KimiColor from '@lobehub/icons/es/Kimi/components/Color'
import KimiMono from '@lobehub/icons/es/Kimi/components/Mono'
import MinimaxColor from '@lobehub/icons/es/Minimax/components/Color'
import MistralColor from '@lobehub/icons/es/Mistral/components/Color'
import MoonshotMono from '@lobehub/icons/es/Moonshot/components/Mono'
import NvidiaColor from '@lobehub/icons/es/Nvidia/components/Color'
import OpenAIMono from '@lobehub/icons/es/OpenAI/components/Mono'
import OpenCodeMono from '@lobehub/icons/es/OpenCode/components/Mono'
import OpenRouterColor from '@lobehub/icons/es/OpenRouter/components/Color'
import QwenColor from '@lobehub/icons/es/Qwen/components/Color'
import TogetherColor from '@lobehub/icons/es/Together/components/Color'
import VercelMono from '@lobehub/icons/es/Vercel/components/Mono'
import VertexAIColor from '@lobehub/icons/es/VertexAI/components/Color'
import XAIMono from '@lobehub/icons/es/XAI/components/Mono'
import XiaomiMiMoMono from '@lobehub/icons/es/XiaomiMiMo/components/Mono'
import ZAIMono from '@lobehub/icons/es/ZAI/components/Mono'
import type { IconType } from '@lobehub/icons/es/types'
import styles from './AccountsSection.module.css'

/**
 * Brands whose mark switches variants with the theme: Kimi's colour K is
 * white-filled and only reads on dark, so light mode shows the Mono mark.
 * Both render and CSS picks one, so a theme toggle needs no re-render.
 */
const THEMED_GLYPHS: Readonly<Record<string, { light: IconType; dark: IconType }>> = {
  'kimi-coding': { light: KimiMono, dark: KimiColor },
}

/**
 * pi-ai provider id → brand glyph. Several ids share one brand (regional
 * twins, subscription routes), which is why this maps ids explicitly.
 */
const GLYPHS: Readonly<Record<string, IconType>> = {
  'amazon-bedrock': BedrockColor,
  'ant-ling': AntGroupColor,
  anthropic: ClaudeColor,
  'azure-openai-responses': AzureColor,
  baseten: BasetenMono,
  cerebras: CerebrasColor,
  'cloudflare-ai-gateway': CloudflareColor,
  'cloudflare-workers-ai': CloudflareColor,
  deepseek: DeepSeekColor,
  fireworks: FireworksColor,
  'github-copilot': GithubCopilotMono,
  google: GoogleColor,
  'google-vertex': VertexAIColor,
  groq: GroqMono,
  huggingface: HuggingFaceColor,
  minimax: MinimaxColor,
  'minimax-cn': MinimaxColor,
  mistral: MistralColor,
  moonshotai: MoonshotMono,
  'moonshotai-cn': MoonshotMono,
  nvidia: NvidiaColor,
  openai: OpenAIMono,
  'openai-codex': CodexColor,
  opencode: OpenCodeMono,
  'opencode-go': OpenCodeMono,
  openrouter: OpenRouterColor,
  'qwen-token-plan': QwenColor,
  'qwen-token-plan-cn': QwenColor,
  'qwen-token-plan-individual': QwenColor,
  together: TogetherColor,
  'vercel-ai-gateway': VercelMono,
  xai: XAIMono,
  xiaomi: XiaomiMiMoMono,
  'xiaomi-token-plan-ams': XiaomiMiMoMono,
  'xiaomi-token-plan-cn': XiaomiMiMoMono,
  'xiaomi-token-plan-sgp': XiaomiMiMoMono,
  zai: ZAIMono,
  'zai-coding-cn': ZAIMono,
}

/** Props of {@link ProviderGlyph}. */
export interface ProviderGlyphProps {
  /** pi-ai provider id. */
  provider: string
  /** Display name, used for the monogram fallback. */
  displayName: string
  size?: number
}

/**
 * Render one provider's brand mark.
 * @returns the glyph, or a first-letter monogram for a brand the library does
 *   not ship.
 */
export function ProviderGlyph({ provider, displayName, size = 18 }: ProviderGlyphProps) {
  const themed = THEMED_GLYPHS[provider]
  if (themed !== undefined) {
    return (
      <>
        <themed.light size={size} className={`${styles.glyph} ${styles.lightOnly}`} />
        <themed.dark size={size} className={`${styles.glyph} ${styles.darkOnly}`} />
      </>
    )
  }
  const Glyph = GLYPHS[provider]
  if (Glyph === undefined) {
    return (
      <span className={styles.monogram} aria-hidden="true" style={{ width: size, height: size }}>
        {displayName.slice(0, 1).toUpperCase()}
      </span>
    )
  }
  return <Glyph size={size} className={styles.glyph} />
}
