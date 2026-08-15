---
name: update-pi-ai
description: Bump the bundled @earendil-works/pi-ai dependency of dsh-providers, rebuild the shipped lib/, run the gates (lint, types, knip), refresh the provider-catalog snapshot, and review the catalog diff for user-visible changes (new providers, new OAuth flows, protocol changes). Use when the user asks to update pi-ai or refresh the provider catalog.
whenToUse: The user wants to update the pi-ai package, sync the provider catalog, or diagnose a route failure that names a pi-ai version skew. Not for pi.dev model-catalog refreshes (the Accounts page does that at runtime, no package bump needed) and not for bumping other dependencies.
---

## pi-ai Dependency Update Workflow

The plugin bundles its own `@earendil-works/pi-ai`, separate from the copy inside the host's `llm-pi-ai` adapter. Model LISTS refresh at runtime from the remote catalog, but new providers, new OAuth login flows, and protocol changes only arrive through this dependency bump.

### Key repository facts

- Dependency policy: **tilde pin** (`~X.Y.Z`) — pi-ai is 0.x, so a minor bump is breaking; never restore a caret range. Note the pin's real semantics for users: `dsh plugin add` resolves the range fresh (a dependent repo's lockfile is not consulted for git installs), so users may run a patch version newer than the one this repo was tested and built against.
- `lib/` ships prebuilt and is committed; every bump must rebuild it in the same change, and the lockfile must be regenerated whenever the declared range changes (`pnpm install --lockfile-only`). The build is byte-deterministic (the CSS-module class map is emitted sorted), so an unchanged rebuild produces zero diff.
- `scripts/pi-ai-catalog.snapshot.json` is the committed description of the installed catalog; `scripts/pi-ai-catalog.mjs` diffs against it (`--check` exits non-zero on drift). The snapshot's `adapterVersion`/`adapterPiAiRange` fields describe this repo's devDependency — what this checkout resolves, not what any user's harness runs.

### Steps

1. Confirm a clean working tree (`git status --short`).
2. Bump within policy: `LATEST=$(npm view @earendil-works/pi-ai version)` then `pnpm add "@earendil-works/pi-ai@~${LATEST}"`.
3. Rebuild and gate: `pnpm build && pnpm check`. A type error here usually means pi-ai changed a contract the plugin consumes; fix the plugin or hold the bump.
4. Review the catalog diff BEFORE refreshing the snapshot: `node scripts/pi-ai-catalog.mjs`.
   - A **new OAuth provider** is user-visible: it appears on the Accounts page with a login button. Mention it in the change description.
   - A **removed provider** may strand signed-in users; check whether `auth.json` entries or written routes reference it before merging.
   - An **adapter protocol change** affects what routes may name; verify `openai-completions`, `openai-responses`, and `anthropic-messages` are still served.
5. Refresh the snapshot: `node scripts/pi-ai-catalog.mjs --update`.
6. Commit `package.json`, `pnpm-lock.yaml`, `lib/`, and the snapshot together in one change, with the catalog diff summarized in the message body.

### Version-skew discipline

The host adapter (`@deepseek-ai/dsh-llm-pi-ai`) carries its own pi-ai with its own catalog. This plugin can therefore offer a provider whose route the adapter then refuses; the route write rolls back and the error names the actual versions on both sides (`piAiVersionSkew()` reads them at runtime from the failing installation). When such an error is reported, read the versions out of the error message itself — the snapshot only describes this repo's checkout, not the user's harness. The catalog script also warns whenever the bundled pi-ai runs ahead of the adapter's declared range.
