/**
 * Contract smoke tests against the installed dependencies.
 *
 * These exist to make a pi-ai (or adapter) bump fail loudly in CI instead of
 * silently breaking the Accounts page: the plugin's surface assumes the
 * catalog enumerates, the OAuth providers it advertises still offer login,
 * and the adapter still serves the wire protocols the routes name.
 */

import assert from 'node:assert/strict'
import { test } from 'node:test'
import { builtinModels, builtinProviders, getBuiltinModelDataGeneratedAt } from '@earendil-works/pi-ai/providers/all'
import { supportedProtocols } from '@deepseek-ai/dsh-llm-pi-ai'

/**
 * OAuth flows the Accounts page is expected to offer; a removal is breaking.
 * `radius` also carries OAuth but is deliberately not asserted: it is a
 * gateway with a dynamic (initially empty) catalog, and the snapshot diff
 * already reports it — this list is only what must block a bump.
 */
const OAUTH_PROVIDERS = ['anthropic', 'github-copilot', 'kimi-coding', 'openai-codex', 'openrouter', 'xai']

/** Protocols the plugin's route writes may name. */
const ROUTE_PROTOCOLS = ['openai-completions', 'openai-responses', 'anthropic-messages']

/**
 * OAuth providers whose models must keep speaking a protocol the plugin can
 * route, or a signed-in user would see an empty model list. `openai-codex`
 * (openai-codex-responses, served via the adapter's own catalog) and `radius`
 * (dynamic catalog) are legitimately outside this set.
 */
const ROUTABLE_OAUTH_PROVIDERS = ['anthropic', 'github-copilot', 'kimi-coding', 'openrouter', 'xai']

test('the built-in catalog enumerates', () => {
  const providers = builtinProviders()
  assert.ok(providers.length >= 30, `expected a full catalog, got ${providers.length} providers`)
  const ids = new Set(providers.map(provider => provider.id))
  assert.equal(ids.size, providers.length, 'provider ids must be unique')
})

test('every provider declares auth semantics', () => {
  for (const provider of builtinProviders()) {
    assert.ok(
      provider.auth.apiKey !== undefined || provider.auth.oauth !== undefined,
      `${provider.id} declares no auth method at all`,
    )
  }
})

test('the advertised OAuth providers still offer login', () => {
  const oauth = new Set(builtinProviders().filter(provider => provider.auth.oauth !== undefined).map(provider => provider.id))
  for (const id of OAUTH_PROVIDERS) {
    assert.ok(oauth.has(id), `${id} lost its OAuth flow`)
  }
})

test('routable OAuth providers still speak a routable protocol', () => {
  const providers = new Map(builtinProviders().map(provider => [provider.id, provider]))
  const routable = new Set(ROUTE_PROTOCOLS)
  for (const id of ROUTABLE_OAUTH_PROVIDERS) {
    const provider = providers.get(id)
    assert.ok(provider !== undefined, `${id} disappeared from the catalog`)
    const apis = new Set(provider.getModels().map(model => model.api))
    assert.ok(
      [...apis].some(api => routable.has(api)),
      `${id} no longer serves any routable protocol (now: ${[...apis].join(', ') || 'none'}) — a signed-in user would get an empty model list`,
    )
  }
})

test('the adapter still serves the protocols routes name', () => {
  const protocols = new Set(supportedProtocols())
  for (const protocol of ROUTE_PROTOCOLS) {
    assert.ok(protocols.has(protocol), `adapter dropped ${protocol}`)
  }
})

test('the baked model data carries its generation stamp', () => {
  const generatedAt = getBuiltinModelDataGeneratedAt()
  assert.equal(typeof generatedAt, 'number')
  assert.ok(generatedAt > Date.UTC(2025, 0, 1), 'generation stamp is implausibly old')
})

test('a Models collection constructs and enumerates', () => {
  const models = builtinModels()
  assert.ok(models.getProviders().length >= 30)
})
