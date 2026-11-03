`docs/session_11.md` logs the round-8 re-validation (the re-pin token
pins + the doc-pointer census at the owner's `160de00`);
`docs/session_12.md` is the owner-committed narration transcript of
that session. Now at fresh HEAD `82d383b`, this round: pull
re-orientation, the gate + both live probes + the mobile-menu census +
a fresh login-card probe re-proven, a fresh-eyes audit — and the
dead-code class closed: the manifest ↔ recovery-script lockstep, the
live-import discipline, and the @utility consumer census finally sit
under the unit gate.

## Re-orientation

Pulled at `82d383b` (the delta from round-8's ship `494773e` is
`docs/session_12.md` alone — a doc, no code). The environment verified
in place: `.env` pinned to the mandated contract
`DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), census
MATCH (3 + 4 users). The doc set re-internalized (AGENTS · CLAUDE ·
README · PAD v2.0 · the skill v1.199.0 · the worklog · session_11 +
session_12 · the round-8 plan · the web-application skill + the
catalog's named skills · the Tailwind v4 report · the ssh-wrapper
runbook). The neo-crm lineage repo stands as the tech-stack pattern
reference — the patterns already carried verbatim.

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **367/367 (28 files)** ·
  build (**22 routes**) · smoke **14/14** · e2e **54/54 (6 specs)**.
- **Live parity**: `scripts/parity-199.ts` — **COMPUTE IDENTICAL at 1280
  + 390** (the oklab/rgba s18 serialization class excluded, same paint).
- **Drift**: `scripts/drift-199.ts` — **NO DRIFT** (content face + the
  mobile menu's open DOM).
- **The mobile-menu census (the operator's standing emphasis)**,
  `scripts/mobile-census-199.ts` live on BOTH apps at 390×844: the
  same 5 links + the amber CTA, link-ride navigates `#about` AND
  closes on both; the sole delta OUR `aria-expanded` (the documented
  invisible a11y superset). **No Tailwind v4 bug** (the six re-pin
  traps unit-gated since round-8, computed faces IDENTICAL).
- **A fresh login-card probe** (both apps live): h1 "Welcome to
  EleganceFlow" + the four buttons + the "or" divider — IDENTICAL face.
- The standing config asks re-verified: the vitest/playwright configs
  (the `skills/` exclusions), the sitemap/SEO family (the 4 public
  locs), `.env.example` var-by-var, the screenshots pixel-health, the
  TODO/FIXME sweep clean.

## The audit — the fresh angle: the DEAD-CODE census (the recovery path + the dependency manifest + the styling surface)

**F-1 — the npm-world recovery path carried the RETIRED CRM dependency
contract** (the same straggler genus as round-3's sitemap and round-5's
DEPLOYMENT.md: a surface no test pins, carrying the prior domain's
contract). `scripts/install_packages.sh` — the name-based recovery
fallback for an npm-only environment — still installed **11 retired
packages** (the radix family ×6, cva, html2canvas-pro, jspdf, recharts,
zustand — exactly the eleven the transformation retired) while
**MISSING the live zod/axe-core**: an agent on the recovery path got a
tree that typecheck-fails on the current domain.

**F-2 — two-plus-one declared dependencies with ZERO live consumers**
(the dead-dep class; the web-application skill §2's dead-dependency
census is a prescribed standing duty this domain had never run):
`fast-check ^4.10.2` (session-172's property-family devDep — its
consumer retired with the CRM domain), `tw-animate-css ^1.4.0` (the npm
package — the app consumes the VENDORED
`src/app/vendor/tw-animate.css`; the npm declaration is the
pre-vendoring straggler), and `@types/react-dom` (compile-unconsumed —
empirically proven: `tsc --noEmit` green with the package hidden). The
import-based census was run for EVERY declared package: all others
carry verifiable consumers (axe-core by path injection —
`node_modules/axe-core/axe.min.js` in the a11y spec).

**F-3 — three dead `@utility` blocks in the required-reading styling
surface**: `chart-no-outline` (selectors for the RETIRED recharts
library), `scrollbar-thin`, `input-base` (the CRM dashboard's chrome
primitives) — zero consumers in src/tests/scripts, tree-shaken from
the build (verified absent from the artifact's CSS) but live in
globals.css, misleading a fresh agent on the required reading list.

**F-4, the class:** no battery pinned the dependency manifest — the
lockstep to the recovery script, the live-import discipline, and the
@utility consumer rule all rode on grep discipline.

**The standing duty re-triaged (I-1, unchanged):** `bun audit` reports
10 advisories (4 high, 5 moderate, 1 low) — ALL dev/build/lint/test
toolchain-transitive; the runtime direct zod is ^4.6.7, above the GHSA
floor. Zero runtime exposure; no security driver.

## The remediation (TDD)

- **`tests/dead-code-census.test.ts` (+5 checks)** — **born RED on the
  real bugs** (5/5: the script's set ≠ the manifest's; fast-check +
  tw-animate-css + @types/react-dom declared without consumers; the
  retired names present; the three dead utilities present), then GREEN
  on the cured tree. The contract: ① the manifest ↔ recovery-script
  lockstep (set equality, both directions — a new dep forces the script
  forward); ② the live-import census (the `DEP_CONSUMERS` map — every
  declared dependency carries a consumer citation: an import, a CSS
  import, config wiring, a path injection, a CLI script entry, or a
  framework peer/runtime contract — a dep losing its consumer fails, a
  new dep without a citation fails); ③ the retired never-returns (the
  11 CRM names + fast-check + the npm tw-animate-css — in the script
  AND the manifest; @types/react-dom deliberately NOT pinned
  never-returns: a future direct react-dom import legitimately
  re-adds it, with a citation); ④ the @utility consumer census (every
  `@utility` in globals.css must have a consumer in src/ — future-proof
  at zero blocks — plus the three retired names never return).
- **The cures**: `scripts/install_packages.sh` rewritten to the live
  19-package set with the recovery-premise header (the round-9 catch
  recorded in-place); `bun remove fast-check tw-animate-css
  @types/react-dom` (the package-manager path — the dead-dep
  retirement doctrine, not advisory churn; bun.lock updated by bun);
  the three dead `@utility` blocks removed from globals.css (the
  `@theme` re-pin block — the pinned surface — untouched; the built CSS
  already proved the utilities never emit, so the computed face is
  unchanged).
- **The mutation proof: 6 classes, 6 REDs** — zod dropped from the
  script's install line · the retired recharts re-added · fast-check
  re-declared · a corrupted citation · a new consumerless @utility ·
  the retired chart-no-outline re-added — each failed its check; every
  file restored byte-identical; 5/5 green after.
- **The count ladder re-anchored 367/28 → 372/29** at every live-tense
  site (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 ·
  the worklog Stage Summary verification line), the category split now
  13 batteries/196 + 16 contracts/176, the new family named in the
  CLAUDE/SKILL prose lists — the round-7 lockstep battery itself went
  RED on the new file and forced every site forward, exactly as
  designed. The AGENTS "526 packages" claim re-censused to **522**
  (the manual-cadence claim; bun's own count). The PAD §11 globals.css
  row re-censused 468 → 423.
- **The advisory ledger re-triaged post-removal**: unchanged — 10
  advisories, all dev-toolchain-transitive (the three removals were in
  no advisory chain).

## The round's deliverables

`tests/dead-code-census.test.ts` (the mutation-proven battery) · the
cured `scripts/install_packages.sh` · the three dead deps retired
(package.json + bun.lock via `bun remove`) · the three dead `@utility`
blocks removed from globals.css · the plan doc
`docs/plans/2026-11-04-session199-round9-dead-code-census.md` · the
refreshed dev-server capture set (the 6 `ours-*` faces under
`docs/screenshots/`, pixel-verified) · this log + the worklog round-9
lines.

## The gate re-proof before ship

The full chain re-run after the changes: lint 0/0 · tsc 0 · **372/372
(29 files)** · build (22 routes) · smoke 14/14 · e2e **54/54 (6
specs)** — plus the live parity/drift/mobile probes re-proven — then
the push to main via `docs/ssh_git_wrapper_v3.py` (the paramiko shim —
this sandbox has no OpenSSH binary), remote ref verified == HEAD, key
shredded, no new branches.

**Suggested next:** the standing cadence — `bun audit` re-triage each
round; the round-9 battery extends the self-enforcing perimeter to the
dependency tree itself: a dead dep, a stale recovery script, or a
consumerless @utility is now a red test, not a grep discipline.
