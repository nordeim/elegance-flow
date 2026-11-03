Repo cloned — HEAD is at round-6 (session-199). Note the root already contains `.env.example`, `db/`, `vitest.config.ts`, `playwright.config.ts`. Now let me review the core docs.
Now the round-6 plan and worklog:
HEAD `622173b` = round-6 ship `41fd88e` + owner's `session_8.md` doc commit. This is now the round-7 standing cadence. Let me read the remaining core docs.
Now the PAD and skill doc (reading in parallel):
Now let me read the remaining PAD sections and the repo skills (web-application + catalog):
Now the web-application skill (the mandated starting point):
Skills internalized. Now let me set up the environment — check bun, install deps, configure `.env`, and initialize the DB:
Environment is up (census MATCH 3+4). Let me verify the package-count claim and run the gate (lint → typecheck → test):
Gate green so far: lint 0/0 · tsc 0 · **351/351 (25 files)** — all matching docs. Package claim "526" exact. Now the build:
Build: 22 routes — matches. Now the smoke ladder:
The e2e auth setup failed. Let me inspect the failure:
The sandbox reset wiped the Playwright browsers. Installing them:
Full gate green: lint 0/0 · tsc 0 · 351/351 · build 22 routes · smoke 14/14 · **e2e 53/53**. Now the live probes (parity + drift). Let me check the scripts first:
Both probes pass: **COMPUTE IDENTICAL** at both viewports, **NO DRIFT**. Now the mobile-menu census — the operator's standing emphasis — live on BOTH apps at 390×844:
Mobile-menu census: **byte-equivalent on both apps** — same 5 links + amber CTA, same order, link-ride navigates `#contact` AND closes on both. Sole delta: our `aria-expanded` (false→true) — the documented invisible a11y superset. No Tailwind v4 bug. Cleaning up and moving to the audit phase:
Advisory ledger: 10 advisories (4 high, 5 moderate, 1 low) — **exactly matches round-6's ledger**, all dev-toolchain-transitive (runtime zod 4.6.7 patched). Now the fresh-eyes audit. Round-6 closed the unpinned-DEPLOYMENT.md class; let me check whether the root docs' own count-ladder claims (351/25, 53/6, 14, 22) are pinned anywhere — the same unpinned-doc class, one level up:
Found the round-7 finding class: **six root docs claim the count ladder (351/25, 53/6, 14, 22 routes) but no test pins those claims** — the same unpinned-doc class round-6 just closed for DEPLOYMENT.md. Let me complete the broader audit sweep first:
Clean sweep. Now the operator's standing config asks — vitest/playwright configs, sitemap/SEO, .env.example:
Configs in place (vitest includes only `src/`+`tests/`, so `skills/` is never picked up). Verify tsconfig/eslint exclusions, sitemap/SEO, and `.env.example`:
All standing config asks verified. Now let me map the exact unpinned count-claim landscape across the root docs, and study the existing census-battery house pattern:
The house pattern is clear. The round-7 finding: **the root docs' count-ladder claims (351/25, 53/6, 14 rungs, 22 routes, 526 packages, 10/169 + 15/182 split) are pinned by NO test** — the same unpinned-doc class, one level up. Let me verify these counts are statically census-able (TDD feasibility):
Unit census is exact: **25 files → 351 it() blocks**. E2e: 52 in specs + likely 1 in auth.setup.ts = 53. Smoke/lockfile regexes need refining:
Unit census is exact (25/351) and e2e = 52 spec tests + 1 setup test = 53. But I notice something: **PAD §7.1's split (seam batteries 10 files/169, source contracts 15 files/182) doesn't match the live tree** — my natural categorization gives 12/182 seams + 13/169 contracts. Let me classify each file definitively by what it actually does:
The split in PAD §7.1 (10/169 + 15/182) disagrees with the tree census and with CLAUDE.md/SKILL.md's own exhaustive family lists (13 seam batteries + 12 source contracts). Let me map all stale-count carriers precisely:
The bug landscape is fully mapped. Let me enumerate every live-tense claim site precisely so the battery's shapes cover them all:
Three real stale sites found: README L103 ("24 unit files" — live 25), PAD L212 ("23 *.test.ts" — live 25), PAD §7.1's wrong split rows. Let me do one final exhaustive sweep for any other stale numeric shapes before writing the plan:
Audit complete — three stale doc sites + the unpinned class. Now writing the round-7 remediation plan (house pattern), then validating it against the tree before execution:
Plan written. Now validating the plan's key mechanics against the tree before executing — first the smoke script's self-tally structure:
The script self-reports "SMOKE: 14/14" via a hard-coded echo — worth pinning to the rung census too (same class). The plan is validated: census mechanics verified exact (25/351, 6/53, 14 rungs, 22 routes). Now writing the battery — **TDD: born RED on the three real bugs**:
Now the TDD moment of truth — the battery must be born RED on the three real bugs:
Born RED — 5 failures. Let me see the complete failure list to categorize expected-vs-unexpected:
5 failures = 3 expected real-bug REDs (F-1/F-2 aggregate, F-3 split rows, F-1 regression pin) + 2 battery defects of mine (missing worklog shape `/(\d+)\/(\d+) unit/`, and the prose label mismatch — CLAUDE.md says "password"/"census" while files are "password-seam"/"db-census"). Fixing the battery defects:
**TDD stage 1 complete** — the battery is born RED on exactly the right things: F-1 (`README unitFiles=24`), F-2 (`PAD unitFiles=23`), F-3 (split row `10≠13`), the prose gap (`CLAUDE.md must name count-ladder-census`), plus all the planned lockstep sites. Now the cure — all doc sites to the live census (358/26, split 13/196 + 13/162):
Now the PAD edits (F-2 tree annotation, F-3 split rows, §7.3 checklist, §10 compound) and SKILL.md:
Now the worklog — the verification line + the round-7 log line and stage bullet:
One format fix — the stray blank line in the worklog's round list:
Two worklog shapes I designed but failed to include in the table (`/e2e (\d+)\/(\d+)/`, `/smoke (\d+)\/(\d+)/`). Adding them:
**GREEN — 7/7.** TDD cycle complete. Now the mutation proof — every claim class must bite. Ten mutation classes, each applied → RED → restored → final GREEN:
9/10 — M10 was a badly-designed mutation (README carries the same claim at two other sites, so dropping one is legitimately still green). The real coverage class is dropping a doc's ONLY claim of a family — SKILL.md's single unit claim. Fixing the mutation:
**10/10 BITE — the pin is real.** All files restored byte-identical. Now verifying the working tree is exactly the intended changes, and running the full unit suite:
**358/358 (26 files)** — docs and suite now agree exactly. Lint 0/0, tsc 0. Now refreshing the dev-server screenshot set:
All 6 `ours-*` faces refreshed. Verifying capture health (pixel density check, the round-6 procedure):
All captures healthy (density profiles match the reference set). Now the round-7 session log — the session_7 house pattern:
Now the gate re-proof — build, smoke, e2e (lint/tsc/unit already green):
**FULL GATE GREEN**: lint 0/0 · tsc 0 · **358/358 (26 files)** · build 22 routes · smoke 14/14 · e2e 53/53. Now the ship phase — reading the SSH wrapper runbook:
No ssh binary, no paramiko — deploying the Appendix-A shim path. First install paramiko and build the shim outside the repo:
Shim deployed and executing. Now the commit — reviewing the final change set first:
Change set is clean (no key material, no logs, db/ ignored). The `.env.example` already ships in the tree and was verified var-by-var against `boot-env.ts` this round. Committing with the house-style message:
Committed as `7ee3bf2` on main. Now the push — materializing the operator key outside the repo, then dry-run:
Dry-run clean (`622173b..7ee3bf2` fast-forward). Executing the real push:
**Push verified: remote main @ `7ee3bf2` == local HEAD.** Shredding the operator key and final cleanup:
All 12 tasks complete. Here's the round-7 report:

## Round-7 re-validation + remediation — SHIPPED as `7ee3bf2` on main

**Status validation (every doc claim re-proven at HEAD `622173b`):** environment rebuilt from pristine — `.env` carries the mandated `DATABASE_URL="file:../db/custom.db"` (`db/` at repo root, census MATCH 3+4, 526-package claim exact). Full gate green: **lint 0/0 · tsc 0 · unit 351/351 (25 files) · build 22 routes · smoke 14/14 · e2e 53/53**. Live parity probe **COMPUTE IDENTICAL** at 1280+390; drift probe **NO DRIFT**.

**Reference comparison (the standing emphasis):** mobile-menu census re-taken live on BOTH apps at 390×844 — same 5 links + amber CTA, same order, link-ride navigates AND closes on both; sole delta is our `aria-expanded` (the documented invisible a11y superset). **No Tailwind v4 bugs** (six re-pin traps verified, computed faces identical). Your standing config asks verified: `.env`/db-path contract, vitest/playwright configs with `skills/` excluded, sitemap ships the 4 public locs, `.env.example` matches var-by-var.

**The audit catch (fresh angle — the docs' own bookkeeping):** THREE stale count sites — README's tree annotation "**24 unit files**", PAD §3.2's "**23 \*.test.ts**" (stale since round-3!), and PAD §7.1's mis-derived split rows "**10/169 + 15/182**" (live categorized census: 13/196 + 12/155). All three drifted through **four consecutive hand-run re-anchors** because no test pinned any root-doc claim — the same unpinned-doc class that shipped the round-3/round-5 stragglers, still open at the root level.

**Cure (TDD):** `tests/count-ladder-census.test.ts` (+7 checks) — born RED on all three real bugs, then **10/10 mutation classes bite** (incl. the smoke script's own self-report and a dropped-claim coverage map). Every claim shape across the five root docs + the worklog's verification line is now pinned to the live tree census, and the category-union lockstep forces future test additions to update the battery + PAD + prose together. Count ladder re-anchored **351/25 → 358/26** everywhere; gate re-proven green after.

**Shipped:** the census battery, round-7 plan, `docs/session_9.md`, refreshed screenshots, doc cures — one atomic commit pushed via the SSH wrapper (paramiko shim), **remote verified `main @ 7ee3bf2` == HEAD**, key shredded, no new branches, tree clean.

**Suggested next:** the standing cadence — `bun audit` re-triage each round; the count-ladder battery now makes every future suite change self-enforcing (a stale doc number is a red test, not a grep discipline).
