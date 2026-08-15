import { readFile } from 'node:fs/promises'
import { basename, dirname, relative, resolve as resolvePath } from 'node:path'
import { transform } from 'lightningcss'
import { defineConfig } from 'tsdown'

/**
 * Two builds from one package: the Host half as ordinary Node ESM, and the
 * browser half as the closure-factory bundle dsh's client loader expects
 * (`packages/client/tsdown.client.ts` is the contract this reproduces).
 *
 * They live in one package because the client-module scan is per package: a
 * package declaring `dsh.client` and exporting `./client` joins the browser
 * roster as soon as any of its rows is mounted.
 *
 * Three things about the browser build are fixed by the shell, not by us:
 *
 * 1. The closure-factory wrapper: CJS wrapped in a
 *    `window.__ModuleLoader__.load({ id, factory })` call, where the loader
 *    passes a `require` answering from its own frozen module table.
 * 2. The externals list: only the shell's seeded platform modules may stay
 *    external. Everything else must inline — a `require` the table cannot
 *    answer throws at runtime, and inlining a package the shell also loads
 *    would duplicate a runtime identity compared by reference.
 * 3. CSS Modules compiled in-bundle: importing `x.module.css` yields the
 *    hashed class map and injects one `<style data-plugin>` tag at factory
 *    execution, which is how the loader removes this plugin's styles on
 *    unload.
 */

/** Plugin id: the package name, stamped into the loader handoff and style tags. */
const ID = 'dsh-providers'

/**
 * Module specifiers the shell seeds into its frozen table. Mirrors
 * `PLATFORM_MODULES` in `@deepseek-ai/dsh-client-web`; anything absent here
 * must be inlined instead.
 */
const PLATFORM_MODULES = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-web-react',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-ui-attachment',
  '@deepseek-ai/dsh-client-schema-form',
]

/** Virtual-id wrapper keeping module CSS out of tsdown's own css pipeline. */
const CSS_VIRTUAL_PREFIX = '\0dsh-css:'
/** The suffix matters: tsdown's guard matches ids ending in `.css`. */
const CSS_VIRTUAL_SUFFIX = '.mjs'

/** Compile one CSS Module to a class map plus a self-injecting style tag. */
const cssModules = {
  name: 'dsh-css-modules-inline',
  resolveId(source: string, importer: string | undefined) {
    if (!source.endsWith('.module.css')) return null
    const absolute = importer === undefined ? source : resolvePath(dirname(importer), source)
    // Relative to the package root: the virtual id leaks into the bundle's
    // region comments, and an absolute id would stamp the build machine's
    // filesystem layout into the published artifact.
    return CSS_VIRTUAL_PREFIX + relative(import.meta.dirname, absolute) + CSS_VIRTUAL_SUFFIX
  },
  async load(this: { addWatchFile(id: string): void }, virtualId: string) {
    if (!virtualId.startsWith(CSS_VIRTUAL_PREFIX)) return null
    const fileId = resolvePath(
      import.meta.dirname,
      virtualId.slice(CSS_VIRTUAL_PREFIX.length, -CSS_VIRTUAL_SUFFIX.length),
    )
    // The virtual id otherwise hides the physical stylesheet from the watch graph.
    this.addWatchFile(fileId)
    const source = await readFile(fileId)
    const { code, exports: cssExports } = transform({
      filename: fileId,
      code: source,
      cssModules: { pattern: '[hash]_[local]' },
      minify: true,
    })
    const classMap: Record<string, string> = {}
    // Sorted: lightningcss hands back hash-map order, and an unsorted map is
    // the one thing that makes the build non-deterministic.
    const entries = Object.entries(cssExports ?? {}).toSorted((a, b) => a[0].localeCompare(b[0]))
    for (const [local, exported] of entries) classMap[local] = exported.name
    return [
      `const css = ${JSON.stringify(code.toString())};`,
      `const tagId = ${JSON.stringify(`${ID}/${basename(fileId)}`)};`,
      'if (typeof document !== \'undefined\' && document.querySelector(\'style[data-plugin-css=\' + JSON.stringify(tagId) + \']\') === null) {',
      '  const tag = document.createElement(\'style\');',
      `  tag.dataset.plugin = ${JSON.stringify(ID)};`,
      '  tag.dataset.pluginCss = tagId;',
      '  tag.textContent = css;',
      '  document.head.appendChild(tag);',
      '}',
      `export default ${JSON.stringify(classMap)};`,
    ].join('\n')
  },
}

export default defineConfig([
  {
    // Host half: one file per exported entry point. Dependencies stay
    // external — the harness packages are peers resolved from the profile's
    // own installation, and inlining cordis or the credential seam would
    // duplicate a service identity.
    name: ID,
    entry: [
      'src/index.ts',
      'src/routes.ts',
      'src/wire.ts',
    ],
    outDir: 'lib',
    format: ['esm'],
    platform: 'node',
    target: 'node22',
    fixedExtension: false,
    sourcemap: true,
    dts: false,
    clean: true,
    tsconfig: 'tsconfig.json',
  },
  {
    name: `${ID}/client`,
    entry: { client: 'src/client/index.ts' },
    outDir: 'lib',
    format: 'cjs',
    platform: 'browser',
    // Types ship from lib/types (tsc); a dts pass here would wrap the
    // banner/footer into the declaration and break parsing.
    dts: false,
    sourcemap: true,
    clean: false,
    tsconfig: 'tsconfig.client.json',
    external: PLATFORM_MODULES,
    // tsdown auto-externalizes declared dependencies; anything the shell's
    // table cannot answer must inline instead, so the rule is the table list.
    noExternal: (id: string) => (PLATFORM_MODULES.includes(id) ? undefined : true),
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
      'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV ?? 'production'),
      'import.meta.env': JSON.stringify({ MODE: process.env.NODE_ENV ?? 'production' }),
    },
    plugins: [cssModules],
    outputOptions: {
      entryFileNames: 'client.js',
      banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(ID)}, factory: (require) => {`,
      footer: 'return module.exports; } });',
      intro: 'var module = { exports: {} }; var exports = module.exports;',
    },
  },
])
