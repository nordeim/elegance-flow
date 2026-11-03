# Session 199 — Round 8: THE FRESH-CONTEXT RE-VALIDATION + THE RE-PIN TOKEN PINS + THE DOC-POINTER CENSUS (2026-11-03)

The rotation trigger: the owner's newest commit (`160de00` "update session
log") adds `docs/session_10.md` — the raw narration transcript of the
round-7 session. This round: pull at `160de00`, re-internalize the doc set,
re-prove the gate + the live parity/drift bars + the mobile-menu census,
audit with fresh angles, then close two open coverage classes the fresh
angle surfaces.

## Phase 0 — The intake (Verified)

- Pull at `160de00` (the delta from round-7's ship `7ee3bf2` is
  `docs/session_10.md` alone — a doc, no code). The environment verified
  in place: `.env` pinned to the mandated contract
  `DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), census
  MATCH (3 + 4 users). The doc set re-internalized (AGENTS · CLAUDE ·
  README · PAD v2.0 · the skill v1.199.0 · the worklog · session_9 +
  session_10 · the round-7 plan · the web-application skill + the
  catalog's named skills · the Tailwind v4 report · the ssh-wrapper
  runbook). The neo-crm lineage repo stands as the tech-stack pattern
  reference — the patterns already carried verbatim.

## Phase 1 — The status validation (Verified — every claim re-proven)

| Doc claim | Live evidence |
| --- | --- |
| lint 0/0 · tsc 0 | Both green at HEAD |
| Unit 358/358 (26 files) | `bun run test` — 358 passed |
| Build 22 routes | Route table counted (the `┌` root line included) |
| Smoke 14/14 | The ladder green on :3210 with `db/smoke.db` |
| E2E 53/53 (6 specs) | `CI=1 bun run test:e2e` — 53 passed |
| Live parity COMPUTE IDENTICAL | `scripts/parity-199.ts` at 1280 + 390 |
| Content + mobile-menu NO DRIFT | `scripts/drift-199.ts` |
| Census MATCH 3+4 | `bun run db:census` (resolved path printed) |
| skills/ excluded | tsconfig `exclude`, eslint `ignores`, vitest `include` |

The mobile-menu census (the operator's standing emphasis), re-taken live
on BOTH apps at 390×844 — this round scripted as
`scripts/mobile-census-199.ts` (the link-ride behavior face, joining the
drift probe's static DOM face): the toggle opens the inline panel — the
same 5 links + the amber CTA in the same order — and a link-ride navigates
the anchor AND closes the panel on both. The one delta: OUR toggle carries
`aria-expanded` (false → true → false across the cycle); the reference's
carries none — the documented invisible a11y superset. No Tailwind v4
bug: the six re-pin traps verified in `globals.css`, the computed faces
IDENTICAL, the e2e mobile battery green.

The standing config asks re-verified: `.env`/db-path contract
(`DATABASE_URL="file:../db/custom.db"`, census prints the resolved
repo-root path), the vitest/playwright configs (the `skills/` exclusions
across tsconfig/eslint/vitest include), the sitemap/SEO family (the 4
public locs + robots + manifest, smoke rung 12 + the census batteries),
`.env.example` var-by-var, the TODO/FIXME sweep clean.

## Phase 2 — The audit findings (the fresh angle: the re-pin family's GATE coverage + the styling doc's live-tree pointers)

**F-1 — four of the six re-pin traps carry NO gate-level pin in this
domain.** The six traps (AGENTS.md) are "all live in
`src/app/globals.css` @theme" — but only ①(partial: 3 zinc + 2 amber
steps) and ⑤ (`@custom-variant hover`, `tests/landing-page.test.ts`) sit
under the unit gate:

- **Trap ② `--shadow-sm`** — the token pin
  (`--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);`) has no unit pin and no
  e2e computed pin. Dropping it ships the whole gate green while the
  scrolled header (the landing's own `shadow-sm` consumer) renders one
  notch heavier.
- **Trap ③ `--blur-sm`** — same class: `--blur-sm: 4px;` unpinned; the
  auth card's `backdrop-blur-sm` would silently compute blur(8px).
- **Trap ④ the space-y flip** — the auth fields'
  `[&>*+*]:mt-1.5` (in `src/lib/page-layout.ts`) has no pin
  (`tests/error-boundaries.test.ts` pins other page-layout members).
- **Trap ⑥ the leading re-derivations** — `leading-[0.9] md:leading-none`
  (h1) + `leading-[0.95] md:leading-none` (the five h2s) have NO pin in
  any tier (the parity probe is manual, outside the gate chain).
- The palette family's pins are partial: 29 `@theme` re-pin tokens live
  in `globals.css` (zinc ×11, amber ×8, slate ×10); the landing battery
  pins 5.

The only guard for ②③④⑥ today is the MANUAL parity probe — which is not
in the `gate` chain. This is the same coverage class the repo's own
doctrine hunts: an unpinned contract is a future silent regression.

**F-2 — the required-reading styling doc carries stale live-tree
pointers.** `docs/Tailwind-V4-Validation-Report.md` — pointed at by all
five root docs as required reading before touching styling — still
carries the PRIOR domain's cross-references:

- Two DANGLING spec citations: trap 6 cites
  `tests/e2e/session7-parity.spec.ts` and trap 8 cites
  `tests/e2e/session8-parity.spec.ts` — neither file exists in the live
  tree (retired with the CRM domain at session-199). A repo-wide doc sweep
  finds exactly these two dangling path references — no other doc carries
  one.
- A FALSE pin claim: trap 7 says the blur pin is "Pinned by the
  session-7 e2e spec (`auth.spec.ts`: the login card must compute
  `backdrop-filter: blur(4px)` + `border-radius: 16px`)" — the live
  `auth.spec.ts` carries no such computed pin (the citation described
  the lineage spec, not this domain's).
- A stale PAD pointer: the trap log's head says "see …
  `Project_Architecture_Document.md` ADR-004/005 and §4.4" — the live
  PAD's Tailwind ADR is ADR-005 alone (ADR-004 is scrypt auth) and §4.4
  does not exist (the design-system reference is §5).
- The consumers named in the trap log (CourseCatalog, MyCourses, p_
  panels, streak cells, the Dashboard CTA, ui/card…) are the retired
  domain's — they read as current to a fresh agent on the required
  reading list.

**F-3 (the class) — no test pins doc→file references.** Rounds 6–7
pinned DEPLOYMENT.md's claims and the root docs' count ladder, but the
dangling-POINTER class (a load-bearing doc citing a file that no longer
exists — the same class that shipped round-5's ORBITAL-era runbook) has
no battery. F-2's two dangling citations are its proof.

**The standing-duty re-triage (I-1, unchanged).** `bun audit` reports 10
advisories (4 high, 5 moderate, 1 low) — ALL dev/build/lint/test
toolchain-transitive (minimatch via eslint, deepmerge-ts via the prisma
CLI's @prisma/config, vite + launch-editor via vitest, source-map-js via
postcss, zod@4.6.5 NESTED inside eslint-config-next ›
eslint-plugin-react-hooks while the RUNTIME direct zod is ^4.6.7, above
the GHSA floor). Zero runtime request-path exposure; the lockfile stays
untouched per the surgical doctrine — no security driver.

## Phase 3 — The remediation ToDo list

1. **[R-1, the re-pin token battery]** Create
   `tests/re-pin-tokens.test.ts` — the six-trap family under the unit
   gate (comment-stripped source reads, the house pattern):
   - The complete `@theme` re-pin block: enumerate ALL 29
     `--color-(zinc|amber|slate)-N` tokens in `globals.css`, assert the
     extracted set equals the expected v3-literal contract (each token →
     its exact v3 hex — a dropped token fails, a new token forces the
     battery forward: the same lockstep forcing function the
     count-ladder battery gave the counts).
   - The token pins: `--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);` and
     `--blur-sm: 4px;` (traps ② ③).
   - The space-y flip: `page-layout.ts`'s `field: "[&>*+*]:mt-1.5"`
     (trap ④).
   - The leading re-derivations: the h1's
     `leading-[0.9] md:leading-none` + the FIVE h2
     `leading-[0.95] md:leading-none` constructions counted exactly
     (trap ⑥) — plus the retired-form regression pin: no bare
     `leading-[0.9]`/`leading-[0.95]` occurrence may ride WITHOUT its
     `md:leading-none` companion (the class-literal-only port the s11
     doctrine forbids).
2. **[R-2, the computed pin — restore trap 7's citation to truth]** Add
   ONE e2e check to `tests/e2e/auth.spec.ts`: the login card computes
   `backdrop-filter: blur(4px)` and `border-radius: 16px` (the
   `--blur-sm` pin's computed face on the live artifact). The e2e
   ladder moves 53 → 54.
3. **[R-3, TDD — the doc-pointer census battery]** Create
   `tests/doc-pointer-census.test.ts` — born RED on the two real
   dangling citations (F-2): sweep the load-bearing doc set (the five
   root docs + `docs/DEPLOYMENT.md` + the Tailwind report) for
   path-shaped file references (`tests/…`, `src/…`, `scripts/…`,
   `prisma/…` with a code extension) and assert each EXISTS in the live
   tree — with a documented lineage exemption list (the trap log's
   retired spec names, marked as lineage in the doc text itself).
4. **[R-3a, the Tailwind report cure]** Fix the stale pointers: the PAD
   reference → ADR-005 + §5; trap 6/8's citations marked as the lineage
   specs (retired at session-199); trap 7's citation re-pointed at the
   LIVE pin (R-2's auth.spec check); a lineage orientation note at the
   trap-log head (the consumers named are the prior domain's; the
   current domain's six members live in AGENTS.md; the token-level
   pins unit-gated + the auth card's computed faces e2e-gated).
5. **[Count ladder]** The unit count moves 358/26 → 358+N/28 (N = the
   two batteries' checks); the e2e count moves 53 → 54. The
   count-ladder battery enforces the re-anchor at EVERY live-tense site
   (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 · the
   worklog Stage Summary) — its category lists must add the two new
   source-contract families (the union lockstep).
6. **[Captures]** Re-run `scripts/capture-199.ts` against the dev server
   on :3000 — the 6 `ours-*` faces under `docs/screenshots/` refreshed.
7. **[Doc lockstep]** `docs/session_11.md` (the session_9 house pattern
   — the formal round-8 log) + the worklog round-8 lines + this plan's
   execution record.
8. **[Gate re-proof]** The full chain re-run after the changes:
   `bun run gate` (lint → typecheck → test (358+N) → build 22 → smoke
   14 → e2e 54).
9. **[Ship]** One atomic commit on main; push via
   `python3 docs/ssh_git_wrapper_v3.py --key-file <key>` (the paramiko
   shim — this sandbox has no OpenSSH binary); remote ref verified ==
   HEAD; the operator key shredded after.

## Phase 4 — The verification bar

- The doc-pointer battery born RED on the two real dangling citations,
  then GREEN on the cured report; the mutation proof demonstrates the
  pointer pin bites (a re-dangled citation fails; a dropped lineage
  exemption fails; an invented path fails).
- The re-pin battery green on the live tree (characterization of the
  six-trap family) and mutation-proven (a dropped `--shadow-sm` token, a
  dropped slate step, a bare `leading-[0.9]` without its md: companion,
  a flipped space-y class each fail their check).
- The e2e computed pin green against the artifact; the count ladder
  consistent everywhere (the count-ladder battery green — no stale
  358/26 or 53 outside historical-tense sites).
- The gate green at ship; the push verified; the working tree clean; no
  key/shim/db/log artifacts staged.
