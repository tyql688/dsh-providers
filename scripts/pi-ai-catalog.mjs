/**
 * Snapshot and diff the installed pi-ai provider catalog.
 *
 * The plugin bundles its own `@earendil-works/pi-ai`, so new providers, new
 * OAuth flows, and protocol changes only arrive through a dependency bump.
 * This script makes such a bump reviewable: it reduces the installed package
 * to the facts the plugin's surface depends on and compares them against the
 * committed snapshot.
 *
 *   node scripts/pi-ai-catalog.mjs            print facts and diff vs snapshot
 *   node scripts/pi-ai-catalog.mjs --check    exit 1 when the snapshot drifted
 *   node scripts/pi-ai-catalog.mjs --update   rewrite the snapshot
 */

import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const SNAPSHOT_PATH = join(here, 'pi-ai-catalog.snapshot.json')

/**
 * A package's manifest, found by walking up from a resolvable specifier —
 * neither package exports `./package.json` directly.
 * @param name - the package whose manifest is wanted.
 * @param specifier - an exported specifier that resolves into that package.
 */
async function readManifest(name, specifier) {
  let dir = dirname(fileURLToPath(import.meta.resolve(specifier)))
  for (let depth = 0; depth < 6; depth++) {
    try {
      const manifest = JSON.parse(await readFile(join(dir, 'package.json'), 'utf8'))
      if (manifest.name === name) return manifest
    } catch {
      // keep walking
    }
    dir = dirname(dir)
  }
  throw new Error(`cannot find package.json for ${name}`)
}

/** The numeric [major, minor, patch] of a version string, or undefined. */
const parseVersion = text => text.match(/^(\d+)\.(\d+)\.(\d+)/)?.slice(1, 4).map(Number)

/**
 * Whether a version satisfies a `^x.y.z` / `~x.y.z` / exact range — the only
 * forms these manifests actually use. Null when the range is another shape.
 */
function satisfies(version, range) {
  const prefix = range.startsWith('^') || range.startsWith('~') ? range[0] : ''
  const want = parseVersion(prefix === '' ? range : range.slice(1))
  const have = parseVersion(version)
  if (want === undefined || have === undefined) return null
  const [wantMajor, wantMinor, wantPatch] = want
  const [haveMajor, haveMinor, havePatch] = have
  const atLeast = haveMajor !== wantMajor
    ? haveMajor > wantMajor
    : haveMinor !== wantMinor ? haveMinor > wantMinor : havePatch >= wantPatch
  if (!atLeast) return false
  if (prefix === '') return haveMajor === wantMajor && haveMinor === wantMinor && havePatch === wantPatch
  // For 0.x a caret pins the minor, exactly like a tilde.
  if (prefix === '~' || wantMajor === 0) return haveMajor === wantMajor && haveMinor === wantMinor
  return haveMajor === wantMajor
}

/** The installed catalog, reduced to what the plugin's surface depends on. */
async function collect() {
  const { builtinProviders, getBuiltinModelDataGeneratedAt } = await import('@earendil-works/pi-ai/providers/all')
  const { supportedProtocols } = await import('@deepseek-ai/dsh-llm-pi-ai')
  const piAi = await readManifest('@earendil-works/pi-ai', '@earendil-works/pi-ai/providers/all')
  const adapter = await readManifest('@deepseek-ai/dsh-llm-pi-ai', '@deepseek-ai/dsh-llm-pi-ai')
  const generatedAt = getBuiltinModelDataGeneratedAt()
  const adapterPiAiRange = adapter.dependencies?.['@earendil-works/pi-ai'] ?? null
  const providers = builtinProviders()
    .map(provider => ({
      id: provider.id,
      name: provider.name,
      oauth: provider.auth.oauth !== undefined,
      // The wire protocols this provider's models speak. A provider whose
      // models all move to a protocol the plugin's route table does not carry
      // would sign in and then serve nothing — that failure starts here.
      apis: [...new Set(provider.getModels().map(model => model.api))].toSorted(),
    }))
    .toSorted((a, b) => a.id.localeCompare(b.id))
  return {
    piAiVersion: piAi.version,
    modelDataGeneratedAt: generatedAt === undefined ? null : new Date(generatedAt).toISOString(),
    // The adapter here is this repo's devDependency — what CI resolves, not
    // what any user's harness runs. It bounds the drift, nothing more.
    adapterVersion: adapter.version,
    adapterPiAiRange,
    adapterRangeSatisfied: adapterPiAiRange === null ? null : satisfies(piAi.version, adapterPiAiRange),
    adapterProtocols: [...supportedProtocols()].toSorted(),
    providers,
  }
}

/** Markdown diff between two collected catalogs; empty array means no drift. */
function diff(before, after) {
  const lines = []
  for (const field of ['piAiVersion', 'modelDataGeneratedAt', 'adapterVersion', 'adapterPiAiRange', 'adapterRangeSatisfied']) {
    if ((before[field] ?? null) !== (after[field] ?? null)) lines.push(`- ${field}: \`${before[field]}\` → \`${after[field]}\``)
  }
  const protoBefore = new Set(before.adapterProtocols)
  const protoAfter = new Set(after.adapterProtocols)
  for (const proto of after.adapterProtocols) {
    if (!protoBefore.has(proto)) lines.push(`- adapter protocol added: \`${proto}\``)
  }
  for (const proto of before.adapterProtocols) {
    if (!protoAfter.has(proto)) lines.push(`- adapter protocol REMOVED: \`${proto}\``)
  }
  const known = new Map(before.providers.map(provider => [provider.id, provider]))
  const current = new Map(after.providers.map(provider => [provider.id, provider]))
  for (const provider of after.providers) {
    const prev = known.get(provider.id)
    if (prev === undefined) {
      lines.push(`- provider added: \`${provider.id}\` (${provider.name})${provider.oauth ? ' **with OAuth login**' : ''}`)
      continue
    }
    if (prev.name !== provider.name) lines.push(`- provider \`${provider.id}\` renamed: "${prev.name}" → "${provider.name}"`)
    if (prev.oauth !== provider.oauth) lines.push(`- provider \`${provider.id}\`: OAuth login ${provider.oauth ? 'ADDED' : 'REMOVED'}`)
    const apisBefore = (prev.apis ?? []).join(', ')
    const apisAfter = (provider.apis ?? []).join(', ')
    if (apisBefore !== apisAfter) {
      lines.push(`- provider \`${provider.id}\` protocols changed: [${apisBefore}] → [${apisAfter}]`)
    }
  }
  for (const provider of before.providers) {
    if (!current.has(provider.id)) lines.push(`- provider REMOVED: \`${provider.id}\` (${provider.name})`)
  }
  return lines
}

const mode = process.argv[2] ?? '--diff'
if (!['--diff', '--check', '--update'].includes(mode)) {
  console.error(`unknown mode "${mode}" — use --diff, --check, or --update`)
  process.exit(2)
}
const facts = await collect()

if (mode === '--update') {
  await writeFile(SNAPSHOT_PATH, `${JSON.stringify(facts, null, 2)}\n`)
  console.log(`snapshot written: pi-ai ${facts.piAiVersion}, ${facts.providers.length} providers, `
    + `${facts.providers.filter(provider => provider.oauth).length} with OAuth`)
  process.exit(0)
}

let snapshotText
try {
  snapshotText = await readFile(SNAPSHOT_PATH, 'utf8')
} catch {
  console.error('no snapshot yet — run with --update first')
  process.exit(1)
}
let snapshot
try {
  snapshot = JSON.parse(snapshotText)
  if (!Array.isArray(snapshot.providers)) throw new Error('providers missing')
  snapshot.adapterProtocols ??= []
} catch (error) {
  console.error(`snapshot exists but cannot be read (${error instanceof Error ? error.message : error}) — regenerate with --update`)
  process.exit(1)
}

const changes = diff(snapshot, facts)
console.log(`## pi-ai catalog: ${snapshot.piAiVersion} → ${facts.piAiVersion}`)
console.log('')
if (changes.length === 0) {
  console.log('No catalog changes.')
} else {
  for (const line of changes) console.log(line)
}
if (facts.adapterRangeSatisfied === false) {
  console.log('')
  console.log(`> ⚠️ pi-ai ${facts.piAiVersion} is OUTSIDE the adapter's declared range ${facts.adapterPiAiRange}`
    + ' — a provider this catalog adds may sign in here and still be refused a route by the adapter.')
}
if (mode === '--check' && changes.length > 0) process.exit(1)
