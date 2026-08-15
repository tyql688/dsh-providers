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

import Ai302Color from '@lobehub/icons/es/Ai302/components/Color'
import AiHubMixColor from '@lobehub/icons/es/AiHubMix/components/Color'
import AntGroupColor from '@lobehub/icons/es/AntGroup/components/Color'
import ClaudeColor from '@lobehub/icons/es/Claude/components/Color'
import AzureColor from '@lobehub/icons/es/Azure/components/Color'
import BaichuanColor from '@lobehub/icons/es/Baichuan/components/Color'
import BailianColor from '@lobehub/icons/es/Bailian/components/Color'
import BasetenMono from '@lobehub/icons/es/Baseten/components/Mono'
import BedrockColor from '@lobehub/icons/es/Bedrock/components/Color'
import CerebrasColor from '@lobehub/icons/es/Cerebras/components/Color'
import CloudflareColor from '@lobehub/icons/es/Cloudflare/components/Color'
import CodexColor from '@lobehub/icons/es/Codex/components/Color'
import CohereColor from '@lobehub/icons/es/Cohere/components/Color'
import DeepInfraColor from '@lobehub/icons/es/DeepInfra/components/Color'
import DeepSeekColor from '@lobehub/icons/es/DeepSeek/components/Color'
import DoubaoColor from '@lobehub/icons/es/Doubao/components/Color'
import FireworksColor from '@lobehub/icons/es/Fireworks/components/Color'
import GeminiColor from '@lobehub/icons/es/Gemini/components/Color'
import GithubCopilotMono from '@lobehub/icons/es/GithubCopilot/components/Mono'
import GoogleColor from '@lobehub/icons/es/Google/components/Color'
import GrokMono from '@lobehub/icons/es/Grok/components/Mono'
import GroqMono from '@lobehub/icons/es/Groq/components/Mono'
import HuggingFaceColor from '@lobehub/icons/es/HuggingFace/components/Color'
import HunyuanColor from '@lobehub/icons/es/Hunyuan/components/Color'
import HyperbolicColor from '@lobehub/icons/es/Hyperbolic/components/Color'
import IFlyTekCloudColor from '@lobehub/icons/es/IFlyTekCloud/components/Color'
import InternLMColor from '@lobehub/icons/es/InternLM/components/Color'
import JinaMono from '@lobehub/icons/es/Jina/components/Mono'
import KimiColor from '@lobehub/icons/es/Kimi/components/Color'
import KimiMono from '@lobehub/icons/es/Kimi/components/Mono'
import LmStudioMono from '@lobehub/icons/es/LmStudio/components/Mono'
import LongCatColor from '@lobehub/icons/es/LongCat/components/Color'
import MinimaxColor from '@lobehub/icons/es/Minimax/components/Color'
import MistralColor from '@lobehub/icons/es/Mistral/components/Color'
import ModelScopeColor from '@lobehub/icons/es/ModelScope/components/Color'
import MoonshotMono from '@lobehub/icons/es/Moonshot/components/Mono'
import NebiusMono from '@lobehub/icons/es/Nebius/components/Mono'
import NovitaColor from '@lobehub/icons/es/Novita/components/Color'
import NvidiaColor from '@lobehub/icons/es/Nvidia/components/Color'
import OllamaMono from '@lobehub/icons/es/Ollama/components/Mono'
import OpenAIMono from '@lobehub/icons/es/OpenAI/components/Mono'
import OpenCodeMono from '@lobehub/icons/es/OpenCode/components/Mono'
import OpenRouterColor from '@lobehub/icons/es/OpenRouter/components/Color'
import PerplexityColor from '@lobehub/icons/es/Perplexity/components/Color'
import PPIOColor from '@lobehub/icons/es/PPIO/components/Color'
import QiniuColor from '@lobehub/icons/es/Qiniu/components/Color'
import QwenColor from '@lobehub/icons/es/Qwen/components/Color'
import SambaNovaColor from '@lobehub/icons/es/SambaNova/components/Color'
import SiliconCloudColor from '@lobehub/icons/es/SiliconCloud/components/Color'
import SparkColor from '@lobehub/icons/es/Spark/components/Color'
import StepfunMono from '@lobehub/icons/es/Stepfun/components/Mono'
import TogetherColor from '@lobehub/icons/es/Together/components/Color'
import VercelMono from '@lobehub/icons/es/Vercel/components/Mono'
import VertexAIColor from '@lobehub/icons/es/VertexAI/components/Color'
import VllmColor from '@lobehub/icons/es/Vllm/components/Color'
import VolcengineColor from '@lobehub/icons/es/Volcengine/components/Color'
import WenxinColor from '@lobehub/icons/es/Wenxin/components/Color'
import XAIMono from '@lobehub/icons/es/XAI/components/Mono'
import XiaomiMiMoMono from '@lobehub/icons/es/XiaomiMiMo/components/Mono'
import XinferenceColor from '@lobehub/icons/es/Xinference/components/Color'
import YiColor from '@lobehub/icons/es/Yi/components/Color'
import ZAIMono from '@lobehub/icons/es/ZAI/components/Mono'
import ZhipuColor from '@lobehub/icons/es/Zhipu/components/Color'
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

/**
 * Keyword → brand glyph, matched as a substring of `id name endpoint` (never
 * the wire protocol — `openai-completions` would brand every gateway OpenAI).
 * Order is precedence: house brands and aggregators before the model vendors
 * whose names their endpoints embed, specific spellings before short ones.
 */
const KEYWORD_GLYPHS: readonly (readonly [string, IconType])[] = [
  // Aggregators and inference clouds, whose URLs often also name a model brand.
  ['openrouter', OpenRouterColor],
  ['siliconflow', SiliconCloudColor],
  ['silicon', SiliconCloudColor],
  ['aihubmix', AiHubMixColor],
  ['302.ai', Ai302Color],
  ['302ai', Ai302Color],
  ['ppinfra', PPIOColor],
  ['ppio', PPIOColor],
  ['deepinfra', DeepInfraColor],
  ['novita', NovitaColor],
  ['hyperbolic', HyperbolicColor],
  ['sambanova', SambaNovaColor],
  ['nebius', NebiusMono],
  ['modelscope', ModelScopeColor],
  ['dashscope', BailianColor],
  ['bailian', BailianColor],
  ['fireworks', FireworksColor],
  ['together', TogetherColor],
  ['cerebras', CerebrasColor],
  ['groq', GroqMono],
  ['huggingface', HuggingFaceColor],
  ['cloudflare', CloudflareColor],
  ['vercel', VercelMono],
  ['jina', JinaMono],
  ['qiniu', QiniuColor],
  ['volcengine', VolcengineColor],
  ['volces', VolcengineColor],
  ['doubao', DoubaoColor],
  ['perplexity', PerplexityColor],
  ['baseten', BasetenMono],
  ['nvidia', NvidiaColor],
  // Local and self-hosted runtimes.
  ['ollama', OllamaMono],
  ['lmstudio', LmStudioMono],
  ['lm-studio', LmStudioMono],
  ['xinference', XinferenceColor],
  ['vllm', VllmColor],
  // Model vendors.
  ['deepseek', DeepSeekColor],
  ['anthropic', ClaudeColor],
  ['claude', ClaudeColor],
  ['bigmodel', ZhipuColor],
  ['zhipu', ZhipuColor],
  ['glm', ZhipuColor],
  ['moonshot', MoonshotMono],
  ['kimi', MoonshotMono],
  ['minimax', MinimaxColor],
  ['mistral', MistralColor],
  ['cohere', CohereColor],
  ['gemini', GeminiColor],
  ['googleapis', GeminiColor],
  ['google', GoogleColor],
  ['bedrock', BedrockColor],
  ['azure', AzureColor],
  ['vertex', VertexAIColor],
  ['hunyuan', HunyuanColor],
  ['tencent', HunyuanColor],
  ['qianfan', WenxinColor],
  ['wenxin', WenxinColor],
  ['ernie', WenxinColor],
  ['baidu', WenxinColor],
  ['iflytek', IFlyTekCloudColor],
  ['xinghuo', SparkColor],
  ['spark', SparkColor],
  ['stepfun', StepfunMono],
  ['internlm', InternLMColor],
  ['baichuan', BaichuanColor],
  ['lingyiwanwu', YiColor],
  ['01.ai', YiColor],
  ['longcat', LongCatColor],
  ['qwen', QwenColor],
  ['aliyun', BailianColor],
  ['grok', GrokMono],
  ['x.ai', GrokMono],
  ['z.ai', ZAIMono],
  // Last: half the custom endpoints on earth spell "openai" somewhere.
  ['openai', OpenAIMono],
  ['gpt', OpenAIMono],
]

/**
 * The brand a free-text identity suggests, for a provider the id table does
 * not know.
 * @returns the glyph, or undefined when nothing matches.
 */
function matchGlyph(id: string, displayName: string, baseURL?: string): IconType | undefined {
  const haystack = `${id} ${displayName} ${baseURL ?? ''}`.toLowerCase()
  return KEYWORD_GLYPHS.find(([keyword]) => haystack.includes(keyword))?.[1]
}

/** Props of {@link ProviderGlyph}. */
export interface ProviderGlyphProps {
  /** pi-ai provider id. */
  provider: string
  /** Display name, used for keyword matching and the monogram fallback. */
  displayName: string
  /** Endpoint, when known; a custom provider's URL usually names its brand. */
  baseURL?: string | undefined
  size?: number
}

/**
 * Render one provider's brand mark.
 * @returns the glyph, a keyword-matched glyph, or a first-letter monogram for
 *   a brand nothing recognizes.
 */
export function ProviderGlyph({ provider, displayName, baseURL, size = 18 }: ProviderGlyphProps) {
  const themed = THEMED_GLYPHS[provider]
  if (themed !== undefined) {
    return (
      <>
        <themed.light size={size} className={`${styles.glyph} ${styles.lightOnly}`} />
        <themed.dark size={size} className={`${styles.glyph} ${styles.darkOnly}`} />
      </>
    )
  }
  const Glyph = GLYPHS[provider] ?? matchGlyph(provider, displayName, baseURL)
  if (Glyph === undefined) {
    return (
      <span className={styles.monogram} aria-hidden="true" style={{ width: size, height: size }}>
        {displayName.slice(0, 1).toUpperCase()}
      </span>
    )
  }
  return <Glyph size={size} className={styles.glyph} />
}
