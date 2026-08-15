---
name: update-pi-ai
description: Bump the bundled @earendil-works/pi-ai dependency of dsh-providers, rebuild the shipped lib/, run every gate (lint, types, knip, smoke tests), refresh the provider-catalog snapshot, and review the catalog diff for user-visible changes (new providers, new OAuth flows, protocol changes). Use when the user asks to update pi-ai, refresh the provider catalog, or when the weekly update-pi-ai workflow needs to be reproduced or debugged locally.
whenToUse: The user wants to update the pi-ai package, sync the provider catalog, reproduce or fix the weekly "Update pi-ai" GitHub Actions run, or diagnose a route failure that names a pi-ai version skew. Not for pi.dev model-catalog refreshes (the Accounts page does that at runtime, no package bump needed) and not for bumping other dependencies.
---

## pi-ai Dependency Update Workflow

The plugin bundles its own `@earendil-works/pi-ai`, separate from the copy inside the host's `llm-pi-ai` adapter. Model LISTS refresh at runtime from the remote catalog, but new providers, new OAuth login flows, and protocol changes only arrive through this dependency bump.

### Key repository facts

- Dependency policy: **tilde pin** (`~X.Y.Z`) — pi-ai is 0.x, so a minor bump is breaking; never restore a caret range. Note the pin's real semantics for users: `dsh plugin add` resolves the range fresh (a dependent repo's lockfile is not consulted for git installs), so users may run a patch version newer than the one this repo was tested and built against.
- `lib/` ships prebuilt and is committed; every bump must rebuild it in the same change, and the lockfile must be regenerated whenever the declared range changes (`pnpm install --lockfile-only`) or CI's frozen install fails. The build is byte-deterministic (the CSS-module class map is emitted sorted), so CI diffs `lib/` against the commit — an unchanged rebuild produces zero diff.
- `scripts/pi-ai-catalog.snapshot.json` is the committed description of the installed catalog; `scripts/pi-ai-catalog.mjs` diffs against it. CI fails if the snapshot does not match the locked pi-ai. The snapshot's `adapterVersion`/`adapterPiAiRange` fields describe this repo's devDependency — what CI resolves, not what any user's harness runs.
- The weekly `.github/workflows/update-pi-ai.yml` run performs the same bump with one deliberate difference from the manual flow below: it refreshes the snapshot mechanically and opens the PR even when the gates fail, writing the failure into the PR body — a broken upstream is exactly when the report matters. The human review happens on the PR, not before the snapshot write. Repo prerequisite: "Allow GitHub Actions to create and approve pull requests" must be enabled in Settings, and the bot PR carries no CI checks of its own (GITHUB_TOKEN does not trigger workflows) — the gates ran inline.

### Steps

1. Confirm a clean working tree (`git status --short`).
2. Bump within policy: `LATEST=$(npm view @earendil-works/pi-ai version)` then `pnpm add "@earendil-works/pi-ai@~${LATEST}"`.
3. Rebuild and gate: `pnpm build && pnpm check && pnpm test`. A smoke-test failure names the broken contract (a lost OAuth flow, a dropped protocol, a catalog that no longer enumerates). Fix the plugin or hold the bump; never delete the assertion to make it pass.
4. Review the catalog diff BEFORE refreshing the snapshot: `node scripts/pi-ai-catalog.mjs`.
   - A **new OAuth provider** is user-visible: it appears on the Accounts page with a login button. Mention it in the change description.
   - A **removed provider** may strand signed-in users; check whether `auth.json` entries or written routes reference it before merging.
   - An **adapter protocol change** affects what routes may name; verify the three protocols the smoke test lists are still served.
5. Refresh the snapshot: `node scripts/pi-ai-catalog.mjs --update`.
6. Commit `package.json`, `pnpm-lock.yaml`, `lib/`, and the snapshot together in one change, with the catalog diff summarized in the message body.

### Version-skew discipline

The host adapter (`@deepseek-ai/dsh-llm-pi-ai`) carries its own pi-ai with its own catalog. This plugin can therefore offer a provider whose route the adapter then refuses; the route write rolls back and the error names the actual versions on both sides (`piAiVersionSkew()` reads them at runtime from the failing installation). When such an error is reported, read the versions out of the error message itself — the snapshot only describes this repo's CI environment, not the user's harness. The catalog script also warns whenever the bundled pi-ai runs ahead of the adapter's declared range.
