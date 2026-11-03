# Session 199 — Round 9: THE FRESH-CONTEXT RE-VALIDATION + THE DEAD-CODE CENSUS (the recovery path + the dependency manifest + the styling surface's dead utilities) (2026-11-04)

The rotation trigger: the owner's newest commit (`82d383b` "update session
log") adds `docs/session_12.md` — the raw narration transcript of the
round-8 session. This round: pull at `82d383b`, re-internalize the doc set,
re-prove the gate + the live parity/drift bars + the mobile-menu census,
audit with fresh angles, then close the dead-code class the fresh angle
surfaces.

## Phase 0 — The intake (Verified)

- Pull at `82d383b` (the delta from round-8's ship `494773e` is
  `docs/session_12.md` alone — a doc, no code). The environment verified
  in place: `.env` pinned to the mandated contract
  `DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), census
  MATCH (3 + 4 users). The doc set re-internalized (AGENTS · CLAUDE ·
  README · PAD v2.0 · the skill v1.199.0 · the worklog · session_11 +
  session_12 · the round-8 plan · the web-application skill + the
  catalog's named skills · the Tailwind v4 report · the ssh-wrapper
  runbook). The neo-crm lineage repo stands as the tech-stack pattern
  reference — the patterns already carried verbatim.

## Phase 1 — The status validation (Verified — every claim re-proven)

| Doc claim | Live evidence |
| --- | --- |
| lint 0/0 · tsc 0 | Both green at HEAD |
| Unit 367/367 (28 files) | `bun run test` — 367 passed |
| Build 22 routes | Route table counted (the `┌` root line included) |
| Smoke 14/14 | The ladder green on :3210 with `db/smoke.db` |
| E2E 54/54 (6 specs) | `CI=1 bun run test:e2e` — 54 passed |
| Live parity COMPUTE IDENTICAL | `scripts/parity-199.ts` at 1280 + 390 |
| Content + mobile-menu NO DRIFT | `scripts/drift-199.ts` |
| Mobile-menu census (link-ride) | `scripts/mobile-census-199.ts` — byte-equivalent on both apps; link-ride navigates AND closes; sole delta OUR `aria-expanded` |
| Login-card face | A fresh live probe both apps: h1 + buttons + divider IDENTICAL |
| Census MATCH 3+4 | `bun run db:census` (resolved path printed) |
| skills/ excluded | tsconfig `exclude`, eslint `ignores`, vitest `include` |

No Tailwind v4 bug: the six re-pin traps verified (the round-8 re-pin
battery green inside the 367), the computed faces IDENTICAL, the e2e
mobile battery green.

The standing config asks re-verified: `.env`/db-path contract, the
vitest/playwright configs, the sitemap/SEO family (4 public locs), the
`.env.example` var-by-var, the screenshots pixel-health (10 files, all
real content), the TODO/FIXME sweep clean.

## Phase 2 — The audit findings (the fresh angle: the DEAD-CODE census — the recovery path + the dependency manifest + the styling surface)

**F-1 — the npm-world recovery path carries the RETIRED CRM dependency
contract (the straggler class, the same genus as round-3's sitemap and
round-5's DEPLOYMENT.md).**
`scripts/install_packages.sh` — the recovery path for an npm-only
environment (installs by package NAME from the registry, never consuming
the lockfile; the premise documented in the lineage skill) — still
installs session-199's retired set:

- **11 RETIRED packages installed**: the radix family ×6, cva,
  html2canvas-pro, jspdf, recharts, zustand — exactly the eleven
  dependencies the domain transformation retired.
- **3 LIVE packages missing**: `zod` (the runtime validation seam — every
  parseBody path), `axe-core` (the a11y engine, injected by path), and
  `fast-check` (see F-2).

An agent on the recovery path gets a corrupted tree: tsc fails on the
missing zod imports, the a11y spec cannot load its engine, and eleven
orphan packages ride in. The primary path (`bun install` via `bun.lock`)
is unaffected — but the recovery path is the one an agent reaches for in
exactly the most fragile situations (a wiped environment, no bun). No
test pins the script (the doc-pointer census sweeps docs, not scripts;
no battery reads the file).

**F-2 — two declared dependencies have ZERO live consumers (the
dead-dep class; the web-application skill §2's dead-dependency census is
a prescribed standing duty that this domain has never run).**

- `fast-check ^4.10.2` — session-172's property-family devDep; its
  consumer (`tests/property.test.ts`, the CRM CSV round-trip family)
  retired with the CRM domain at session-199 — the declaration stayed.
  Repo-wide import sweep: zero matches in src/tests/scripts/configs.
- `tw-animate-css ^1.4.0` (the npm package) — never imported: the app
  consumes the VENDORED copy at `src/app/vendor/tw-animate.css`
  (globals.css line 2 — the sanctioned vendoring fix per the
  web-application skill §12); the npm declaration is the pre-vendoring
  straggler.

(The import-based census was run for EVERY declared package:
`axe-core` is consumed by path injection —
`node_modules/axe-core/axe.min.js` in `tests/e2e/a11y.spec.ts` — and the
framework/config-consumed set (next, react, react-dom, typescript,
prisma, eslint, eslint-config-next, @types/*, @tailwindcss/postcss,
tailwindcss) each carries a verifiable consumption citation. fast-check
and tw-animate-css are the only two with none.)

**F-3 — three dead `@utility` blocks in the required-reading styling
surface (the dead-CSS class).** `src/app/globals.css` carries three
`@utility` blocks with ZERO consumers anywhere in src/tests/scripts:

- `chart-no-outline` — its selectors target `.recharts-wrapper` /
  `.recharts-surface` — a library RETIRED at session-199. A fresh agent
  reading the required-reading styling surface sees recharts selectors
  in a recharts-free tree.
- `scrollbar-thin` and `input-base` — the CRM dashboard's chrome
  primitives (the surfaces that retired with the domain).

Verified tree-shaken from the build (absent from the standalone
artifact's CSS) — dead weight in the source alone, no computed-face
impact. No test pins them (the re-pin battery pins the `@theme` block,
not the `@utility` tail).

**F-4 (the class) — no battery pins the dependency manifest.** Rounds
6–8 pinned DEPLOYMENT.md's claims, the root docs' count ladder, the
re-pin token family, and the docs' file pointers — but the
manifest ↔ recovery-script lockstep and the live-import discipline (the
class that let F-1/F-2/F-3 ship at the transformation and linger for
eight rounds) have no census.

**The standing-duty re-triage (I-1, unchanged).** `bun audit` reports 10
advisories (4 high, 5 moderate, 1 low) — ALL dev/build/lint/test
toolchain-transitive (minimatch via eslint, deepmerge-ts via the prisma
CLI, vite + launch-editor via vitest, source-map-js via postcss, zod
NESTED inside eslint-config-next while the RUNTIME direct zod is
^4.6.7, above the GHSA floor). Zero runtime request-path exposure; the
lockfile posture stays surgical — no security driver.

## Phase 3 — The remediation ToDo list

1. **[R-1, TDD — the dead-code census battery]** Create
   `tests/dead-code-census.test.ts` — born RED on the real bugs:
   - The manifest ↔ recovery-script lockstep: the install script's
     package set must EQUAL package.json's dependency union (both
     directions — a new dep forces the script forward; a retired dep
     never lingers).
   - The live-import census: every declared dependency carries a
     consumer citation (the `DEP_CONSUMERS` map — package → {file,
     regex}, the consumption mechanism documented per entry; imports,
     CSS imports, config wiring, path injection, and the JSX-runtime
     contract for react/react-dom/@types). A dep losing its consumer
     fails; a new dep without a citation fails (the lockstep forcing
     function).
   - The retired never-returns: the 11 CRM names + fast-check +
     tw-animate-css (npm) never return in the script OR the manifest.
   - The `@utility` consumer census: every `@utility` block in
     globals.css must have a consumer in src/ (the generic form —
     future-proof at zero blocks), plus the three retired names never
     return (the regression pin).
2. **[R-2, cure F-1]** Rewrite `scripts/install_packages.sh` — the live
   20-package set + the recovery-premise header (the npm-world path:
   installs by name, never consumes the lockfile; the CRM-era list
   retired at round-9).
3. **[R-3, cure F-2]** `bun remove fast-check tw-animate-css` — the
   package-manager path (never a hand-edited manifest); bun.lock updated
   by bun accordingly. The dead-dep retirement doctrine (the
   web-application skill §2), not advisory churn — the lockfile
   posture's "no security driver" rule governs UPGRADES, not the
   retirement of dead weight.
4. **[R-4, cure F-3]** Remove the three dead `@utility` blocks from
   globals.css (the `@theme` re-pin block — the pinned surface —
   untouched; the built CSS already proves the utilities never emit, so
   the computed face is unchanged; the parity probe re-proves it).
5. **[Count ladder]** The unit count moves 367/28 → 367+N/29 (N = the
   battery's checks); the count-ladder battery enforces the re-anchor at
   EVERY live-tense site (AGENTS · CLAUDE · README · PAD
   §3.2/§7.1/§7.3/§10 · SKILL §7 · the worklog Stage Summary) — its
   SOURCE_CONTRACTS list must add the dead-code-census family (the
   union lockstep). The AGENTS "526 packages" claim re-censused on the
   manual cadence (a bun-install output claim). The PAD §11 globals.css
   ~Lines row re-censused (approximate by design, but kept honest).
6. **[Advisory re-triage]** `bun audit` re-run post-removal — the
   ledger row re-verified (the two removals are not in any advisory
   chain; the count should hold at 10).
7. **[Captures]** Re-run `scripts/capture-199.ts` against the dev server
   on :3000 — the 6 `ours-*` faces under `docs/screenshots/` refreshed.
8. **[Doc lockstep]** `docs/session_13.md` (the session_11 house pattern
   — the formal round-9 log) + the worklog round-9 lines + this plan's
   execution record.
9. **[Gate re-proof]** The full chain re-run after the changes:
   `bun run gate` (lint → typecheck → test (367+N) → build 22 → smoke
   14 → e2e 54) + the live parity/drift/mobile probes.
10. **[Ship]** One atomic commit on main; push via
    `python3 docs/ssh_git_wrapper_v3.py --key-file <key>` (the paramiko
    shim — this sandbox has no OpenSSH binary); remote ref verified ==
    HEAD; the operator key shredded after.

## Phase 4 — The verification bar

- The dead-code battery born RED on the real bugs (the script's set ≠
  the manifest's; the two dead deps declared; the three dead @utility
  blocks present), then GREEN on the cured tree.
- The mutation proof: the battery must BITE (a package dropped from the
  script → RED; a retired name re-added → RED; a citation corrupted →
  RED; a dead @utility re-added → RED; a dead dep re-declared → RED) —
  every file restored byte-identical after.
- The gate green at ship; the parity/drift/mobile bars re-proven; the
  count ladder consistent everywhere; the push verified; the working
  tree clean; no key/shim/db/log artifacts staged.

## Phase 5 — The execution record (filled at ship)

- **R-1 born RED as designed** — 5/5 failures at birth, each pointing
  at a real audited bug: the lockstep check reported
  `missingFromScript: [zod, axe-core, fast-check]` +
  `orphanedInScript: [the 11 CRM names]`; the census check reported
  `declaredWithoutCitation: [@types/react-dom, fast-check,
  tw-animate-css]`; the never-returns and both @utility checks RED on
  their findings.
- **The cures landed exactly as planned**: the script rewritten to the
  live 19-package set; `bun remove fast-check tw-animate-css
  @types/react-dom` (bun.lock updated by bun; bun install re-run —
  "522 packages", no changes); the three dead @utility blocks removed
  (globals.css 468 → 423 lines; the @theme re-pin block untouched).
- **The mutation proof: 6/6 bite** (zod dropped from the install line ·
  recharts re-added · fast-check re-declared · a corrupted citation ·
  a new consumerless @utility · chart-no-outline re-added) — every file
  restored byte-identical, 5/5 green after.
- **The count-ladder lockstep worked exactly as built**: the round-7
  battery itself went RED on the new file (4 designed REDs — the
  all-shapes sweep, the worklog verification line, the PAD §7.1 split
  rows, the category-union) and forced every site forward; the re-anchor
  landed 372/29 (13 batteries/196 + 16 contracts/176) at every
  live-tense site; the AGENTS packages claim re-censused 526 → 522.
- **The advisory ledger held at 10** post-removal (the three removals
  were in no advisory chain) — the PAD §10 row unchanged, accurate.
- **The captures re-run** — the 6 `ours-*` faces refreshed,
  pixel-verified (non-white ratios 10.4%–99.8%, all real content).
- **The gate re-proof**: lint 0/0 · tsc 0 · **372/372 (29 files)** ·
  build (22 routes) · smoke 14/14 · e2e 54/54 · parity COMPUTE
  IDENTICAL (both viewports) · drift NO DRIFT · the mobile census
  byte-equivalent.
- **Shipped** as one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py` (the paramiko shim), remote verified ==
  HEAD, key shredded.
