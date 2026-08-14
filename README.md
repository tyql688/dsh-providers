# dsh-providers

**English** · [简体中文](README.zh.md)

Model providers for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness): sign in with OAuth or an API key, and keep every provider's model catalog current. dsh ships without OAuth and with model lists frozen at release; this adds the login flows, token refresh, and a live catalog — without patching any dsh package. Built on [`@earendil-works/pi-ai`](https://www.npmjs.com/package/@earendil-works/pi-ai) and [`@lobehub/icons`](https://github.com/lobehub/lobe-icons).

## Install

```sh
dsh plugin --profile web add github:tyql688/dsh-providers
dsh plugin --profile web approve-builds   # first add reports a blocked build; this fixes it
```

Or from a local clone (`pnpm install` first, then `dsh plugin --profile web add "$PWD"`) — neither needs the allowance. Remove with `dsh plugin --profile web remove dsh-providers`; best to sign out of OAuth providers first (ticking "remove route").

## Usage

Run `dsh web`, open **Settings → Accounts**:

| Action | What it does |
|---|---|
| **Sign in** | OAuth or API key; also writes the provider's route so models reach the picker right away |
| **Replace the API key** | Empty field; its eye reveals the stored key. OAuth tokens and environment values never reach the browser |
| **Update model catalogs** | Fetches `pi.dev` model lists and rewrites routes (top button: all routed providers, card button: one) |
| **Read an endpoint…** | Adopts an OpenAI-compatible `/v1/models` listing as the model list |
| **Sign out** | Deletes the credential; the route is kept unless you tick the checkbox |

Storage: OAuth tokens in `$DSH_HOME/auth.json` (`0600`), API keys in `.credentials.yaml` (the file dsh's Models page writes), catalog cache in `model-catalog.json` (safe to delete), routes in `llm-pi-ai.providers.<id>` of `settings.yaml`. Keys in the environment stay yours — reported as ambient, never stored.

Row options: `authPath`, `catalogPath`, `catalogBaseUrl`, `autoRoute` (default true).

Known limits: a multi-protocol provider becomes several routes (`xai` + `xai-responses`, same credential). Credentials with a complex auth shape (several request headers, env extras — Cloudflare, for example) cannot be routed: a dsh route carries one credential string. The sign-in itself succeeds and keeps the credential; the error says why.

Verified against `@deepseek-ai/dsh@0.1.0-rc.6`, `@deepseek-ai/cordis@4.0.1`, Node 22+.

## Development

```sh
pnpm install   # deps; `prepare` builds lib/
pnpm check     # oxlint + tsc + knip
```

Internals, in one paragraph: the bundle swaps the base `credentials` row for a provider extending `dsh-credentials-local` (all layers keep precedence, an account layer is added on top), and serves the page's routes under `/dsh-providers`, loopback same-origin only — dsh's API gateway is closed to out-of-tree plugins. This plugin and the shipped `dsh-llm-pi-ai` adapter each resolve their own `pi-ai`: this copy decides logins and the provider list, the adapter's decides the wire. Protocols outside openai-completions / openai-responses / anthropic-messages ride the adapter's own catalog.
