# Repository Guidelines

dsh-providers is a single-package DeepSeek Harness (dsh) plugin: OAuth/API-key sign-in for the bundled pi-ai provider catalog, live model catalogs, and the `llm-pi-ai` route writes that make a signed-in provider usable. It mounts via `cordis.patch.yml`; dsh source is never modified.

## Layout

- `src/` — Host half: `credentials.ts` (credential provider + account service), `routes.ts` (loopback HTTP surface), `routing.ts` (settings-side route writes with snapshot rollback), `catalog.ts` / `remote-catalog.ts` (model catalogs), `login.ts`, `store.ts`, `trust.ts`, `wire.ts` (the browser/Host contract).
- `src/client/` — the Accounts settings page (React, CSS module). State lives in `store.ts`; components render from snapshots only.
- `lib/` — prebuilt output, committed so git installs run no build scripts.
- `scripts/` — maintenance tools; `pi-ai-catalog.mjs` + its committed snapshot describe the installed pi-ai catalog.
- `.dsh/skills/` — repo skills; `update-pi-ai` documents the dependency-bump workflow.

## Commands

- `pnpm install` / `pnpm build`
- `pnpm check` — oxlint + both tsconfig typechecks + knip; must pass clean.
- `pnpm catalog` — print the pi-ai catalog diff against the snapshot (`--check` exits non-zero on drift, `--update` rewrites it).

Before handing back: `pnpm build && pnpm check`. A UI change is not verified until seen in a running harness; say so when that step was skipped.

## Constraints

- **Rebuild `lib/` in the same change as any `src/` change.** The build is byte-deterministic (the CSS-module class map is emitted sorted — keep it that way); keeping the shipped `lib/` current — including NEW output files — is the committer's responsibility.
- **pi-ai stays tilde-pinned.** It is 0.x — minor bumps are breaking. Bumps go through the `update-pi-ai` skill, never as a side effect of another change, and always with the catalog snapshot refreshed and the lockfile regenerated. Users installing via `dsh plugin add` resolve the range fresh (no lockfile travels), so they may run a newer patch than the one this repo tested.
- **Two pi-ai copies exist**: this plugin's and the adapter's. A route the adapter cannot serve must roll back (`awaitLiveRoutes` + snapshot ops) and the error names both versions. Preserve that contract in any routing change.
- **Custom (hand-declared) providers are out of scope.** dsh's native Models page owns that flow; do not reintroduce a competing editor here.
- **The Host is the source of truth.** Client mutations call a route and re-render from the reply — no optimistic local edits.
- **Secrets discipline.** Keys are never logged. A stored key reaches the browser only through the explicit reveal endpoint. Endpoint discovery never attaches a stored credential to an origin the user did not configure outside the request. OAuth tokens never reach the browser at all.
- **Styling.** Colors resolve through `--dsw-*` aliases only; the settings page stays a single column; class names live in `AccountsSection.module.css` and dead rules are deleted with their last user.
- **Bilingual docs.** `README.md` and `README.zh.md` are a pair; edit both or neither.
- **Comments** state constraints the code cannot show, in the surrounding style; no changelog narration, no attribution.
- **Markdown docs are not hard-wrapped.** One paragraph or list item per line; let the renderer wrap.

## Change discipline

- Smallest change that removes the root cause; delete dead code with the feature that used it (locales, CSS, wire types, service methods all travel together).
- `wire.ts` is a contract: removing a field means removing every producer and consumer in the same change.
- Never commit, push, tag, or release unless explicitly asked.
