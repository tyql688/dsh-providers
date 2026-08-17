# dsh-providers

[English](README.md) · **简体中文**

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 补上模型提供方管理:OAuth / API 密钥登录、令牌自动刷新、实时模型目录、token 用量统计。基于 [`@earendil-works/pi-ai`](https://www.npmjs.com/package/@earendil-works/pi-ai) 与 [`@lobehub/icons`](https://github.com/lobehub/lobe-icons)。

## 安装

```sh
dsh plugin --profile web add github:tyql688/dsh-providers
```

也可本地 clone:

```sh
git clone https://github.com/tyql688/dsh-providers.git
cd dsh-providers
pnpm install
dsh plugin --profile web add "$PWD"
```

卸载:

```sh
dsh plugin --profile web remove dsh-providers
```

## 使用

`dsh web`,打开**设置 → 账户**登录、更新模型目录,或读取 OpenAI 兼容端点:

![账户页](docs/accounts.png)

支持的提供方(pi-ai 0.84.2):

- **OAuth**:Anthropic、GitHub Copilot、Kimi For Coding、OpenAI Codex、OpenRouter、Radius、xAI
- **API 密钥**:Amazon Bedrock、Ant Ling、Azure OpenAI、Baseten、Cerebras、Cloudflare AI Gateway、Cloudflare Workers AI、DeepSeek、Fireworks、Google、Google Vertex AI、Groq、Hugging Face、MiniMax / MiniMax CN、Mistral、Moonshot AI / CN、NVIDIA、OpenAI、OpenCode Zen / Go、Qwen Token Plan(×3)、Together、Vercel AI Gateway、Xiaomi(×4)、Z.AI / Z.AI Coding CN

侧边栏会多一张**「今日 Token」**卡片,点击打开用量统计弹窗;每个会话新增**「统计」**页签(顶部数字只统计本会话、与 composer 状态栏对账,子代理单独列表并汇总):

![今日 Token 卡片](docs/usage-card.png)

![Token 用量统计弹窗](docs/usage-dialog.png)

![会话统计页](docs/session-stats.png)

存储:OAuth 令牌在 `$DSH_HOME/auth.json`,API 密钥在 `.credentials.yaml`,目录缓存在 `model-catalog.json`,路由在 `settings.yaml`。环境变量密钥不会被存储。

已在 `@deepseek-ai/dsh@0.1.0-rc.6`、Node 22+ 验证。

## 开发

```sh
pnpm install
pnpm build     # 改源码后重建 lib/(随源码一起提交)
pnpm check     # oxlint + tsc + knip
```
