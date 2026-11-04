# Session 199 — Round 15: THE FRESH-CONTEXT RE-VALIDATION + THE MOTION/GLYPH CENSUS (2026-11-04)

The rotation trigger: the owner's newest commit (`eb00ab8` "update session log")
adds `docs/session_24.md` — the raw narration transcript of the round-14
session. This round: pull at `eb00ab8`, re-internalize the doc set, re-prove
the gate + the live parity/drift bars + the mobile-menu census, audit with a
fresh angle, then close the motion/glyph class the fresh angle surfaces.

## Phase 0 — The intake (Verified)

- Workspace refreshed at `eb00ab8` (the delta from round-14's ship `d159845`
  is `docs/session_24.md` alone — a doc, no code). Environment: `.env`
  carries the mandated contract `DATABASE_URL="file:../db/custom.db"`
  (`db/` at the repo root), census **MATCH (3 + 4 users)**. The doc set
  re-internalized (AGENTS · CLAUDE · README · PAD v2.0 · the skill v1.199.0 ·
  the worklog · session_23 + session_24 · the round-14 plan · the
  web-application skill + the catalog · the Tailwind v4 report · the
  ssh-wrapper runbook). The neo-crm lineage repo stands as the tech-stack
  pattern reference — the patterns already carried verbatim (no new
  tech-stack surface; recorded).

## Phase 1 — The status validation (Verified — every claim re-proven)

| Doc claim | Live evidence |
| --- | --- |
| lint 0/0 · tsc 0 | Both green at HEAD |
| Unit 436/436 (34 files) | `bun run test` — 436 passed |
| Build 22 routes | Route table counted |
| Smoke 14/14 | The ladder green on :3210 with `db/smoke.db` |
| E2E 75/75 (8 specs) | `CI=1 bun run test:e2e` — 75 passed |
| Live parity COMPUTE IDENTICAL | `scripts/parity-199.ts` at 1280 + 390 |
| Drift NO DRIFT (all three legs) | `scripts/drift-199.ts` (content+mobile · auth · preflight) |
| Mobile-menu census (link-ride) | byte-equivalent on both apps; link-ride navigates AND closes; sole delta OUR aria-expanded |
| Census MATCH 3+4 | `bun run db:census` (resolved path printed) |
| skills/ excluded | tsconfig `exclude`, eslint `ignores`, vitest include-allowlist, playwright `testDir` |
| Advisory ledger 10 (4 high · 5 moderate · 1 low) | `bun audit` — all dev-toolchain transitive; runtime zod ^4.6.7 patched; no security driver |

No Tailwind v4 bug in the EIGHT pinned traps. The standing config asks
re-verified live: the `.env`/db-path contract, the vitest/playwright configs,
the sitemap/SEO family (smoke rung 12), `.env.example` var-by-var, the
TODO/FIXME sweep clean.

## Phase 2 — The audit findings (the fresh angle: the MOTION/GLYPH census — the time-dimension and glyph faces no probe reads: parity-199 reads at-rest element faces, round-13 read focus, round-14 read hover + pseudo-elements; the SCROLL TRAJECTORY, the QUOTE GLYPHS, the carousel's time behavior, the :active faces, and the html-element's own face family were never read by anything)

**F-15a (HIGH, VISIBLE, functional — the parity-gated public surface AND the
mobile menu, the operator's standing emphasis): the ANCHOR-RIDE MOTION face.
The reference's app CSS ships `html { scroll-behavior: smooth }` (the rule
found live in its stylesheets; its html computes smooth) — every anchor
navigation GLIDES through intermediate positions.** Live-trajectory-probed:
the reference's `#about` ride sampled 0→27→199→552→686→751→778→796→800 over
~700ms; OURS computes `scroll-behavior: auto` and JUMPS (scrollY lands at
the target on the first sample). The divergence rides EVERY in-page
navigation: the 5 desktop nav links, the 5 mobile-menu links, both hero
CTAs, the footer links. Invisible to every gate: parity-199 reads the
elements' own faces (never the html element's scroll-behavior), the drift
probe reads text/img/login/preflight faces, the e2e anchor assertions ride
hash/visibility (which pass identically under an instant jump), the
mobile-menu census reads open/close + hash. The raw-rule genus (the
session-10 `button { cursor: pointer }` and session-16 `th, td { padding:
1px }` precedents — reference CSS rules outside the utility system that the
port must carry explicitly); NOT a ninth v4 trap (nothing v3/v4-related —
the rule was simply never ported).

**F-15c (HIGH, VISIBLE, text): the TESTIMONIAL QUOTE GLYPH.** OURS renders
typographic quotes — U+201C/U+201D via the `&ldquo;…&rdquo;` entities at
`landing-page.tsx:456` — where the live reference renders STRAIGHT double
quotes (U+0022) as standalone text-node children (the DOM structure
matches: 3 children on both sides; only the glyphs differ). Verified by the
FULL-TEXT census (the round-15 probe: every visible text node on both apps,
whitespace-normalized, byte-diffed): **96 vs 96 text nodes, the SOLE text
divergence on the entire landing is the quote-glyph pair** (both glyphs —
every apostrophe, em-dash and ellipsis elsewhere matches). Invisible to
every gate: the drift probe's text census reads nav/h1/h2/services/stats/
chips/imgs — never the quote text; the e2e carousel test checks
distinct-ness (3 quotes), not bytes; no unit pin reads the glyph form (the
TESTIMONIALS array's `quote` strings carry no glyphs — the glyphs are added
at the render site, unpinned).

**F-15b (Informational — the class-string-vs-computed-face record, NO
cure): the active carousel selector's class string.** OURS carries the
explicit `border-l-amber-500` utility (pinned at
`tests/landing-page.test.ts:103-105`); the REFERENCE's active selector
carries only `border-l-4 bg-zinc-900` and paints its left border amber via
its cross-origin app CSS (the mechanism sheet's `cssRules` are blocked —
not enumerable; the computed face is the contract). BOTH compute
`borderLeftColor: rgb(245, 158, 11)` + `borderLeftWidth: 4px` + `bg:
rgb(24, 24, 27)` — the computed face is IDENTICAL; the class string
differs. The trap-⑥ genus (copy the COMPUTED face, never the literal
class) INVERTED-and-correct: dropping our explicit utility would compute
`currentColor`-derived white on the v4 build (v4's preflight border-color
default) and BREAK the face. Keep ours; document.

**The positive censuses (clean, first time probed):**
- **The carousel's TIME behavior** — neither app auto-advances (15s idle,
  1 distinct quote each; the active selector swaps only on click, both
  apps; the selectors' `transition-property: all` + `duration 200ms` on
  both). The e2e click-rotation pin (landing.spec.ts:112) covered the
  click face; the idle face was never probed.
- **The :active faces** — real mousedown hold on the hero CTA:
  color/bg/border/transform/opacity IDENTICAL.
- **The renamed-scale carrier census** — ZERO carriers of bare `ring`,
  `shadow`, `rounded-sm`, `rounded-xs`, `drop-shadow*` on EITHER app's
  DOM (the ninth-v4-trap hunt closes EMPTY: no renamed utility scale has
  a live carrier; the eight pinned traps remain the complete census).
- **The html-element face family** — tap-highlight-color, text-size-adjust,
  font-family, line-height, the empty class string: IDENTICAL apart from
  scroll-behavior (the html genus closes with F-15a as its sole delta).

## Phase 3 — The remediation ToDo list

1. **[R-1, TDD — the motion/glyph source-contract battery]** Create
   `tests/motion-glyph.test.ts` (comment-stripped source reads, the house
   pattern): ① the smooth-scroll pin (globals.css's base layer carries the
   raw `html { scroll-behavior: smooth }` rule — the reference's own
   mechanism, the raw-rule genus); ② the html-purity pin (the layout's
   `<html>` element carries no `scroll-smooth` utility — the reference's
   html ships the bare element; the rule, never the class); ③ the
   quote-glyph pin (landing-page.tsx renders the quote wrapped in STRAIGHT
   double quotes — the `"{testimonial.quote}"` literal, comment-stripped);
   ④ the retired-form regression pin (the `&ldquo;`/`&rdquo;` entities
   never return to landing-page.tsx). **Born RED on the live tree** (①③
   fail — the rule and the straight-quote literal are absent; ②④
   keep-green) — the honest record.
2. **[R-2, the cures]** `globals.css` @layer base: the `html {
   scroll-behavior: smooth }` rule + the mechanism comment (the
   reference's raw rule, the trajectory evidence, the gate-invisibility
   record). `landing-page.tsx:456`: `&ldquo;{testimonial.quote}&rdquo;` →
   `"{testimonial.quote}"` (the DOM structure unchanged — 3 children; only
   the glyph bytes change).
3. **[R-3, the live-probe cure — the motion/glyph faces join the drift
   bar]** Extend `scripts/drift-199.ts` with the MOTION/GLYPH census leg
   (both apps, the landing at 1280): the html element's computed
   scroll-behavior + the quote block's first character code (the glyph
   face). Run it BEFORE the R-2 cure → **DRIFT DETECTED on the real
   bugs**; after the cure → NO DRIFT.
4. **[R-4, the e2e legs]** Extend `tests/e2e/landing.spec.ts` (+1): the
   html element computes `scroll-behavior: smooth` and the rendered
   testimonial quote begins with a straight double quote (U+0022) — on the
   standalone artifact.
5. **[R-5, count ladder]** Unit 436/34 → 436+N/35; e2e 75/8 → 76/8 — the
   count-ladder battery enforces the re-anchor at EVERY live-tense site
   (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 · the
   worklog Stage Summary) + the motion-glyph family in the CLAUDE/SKILL
   prose lists + the new family in the ladder's SOURCE_CONTRACTS list.
6. **[R-6, mutation proof]** The batteries must BITE: the smooth rule
   dropped (RED) · the glyph reverted to `&ldquo;` (RED) · a
   `scroll-smooth` class planted on the html element (② RED) · the live
   drift leg re-run on a reverted tree (DRIFT) · the e2e leg (the glyph
   mutation rebuilt into the artifact → the new pin RED). All files
   restored byte-identical (the /tmp-backup harness).
7. **[R-7, captures]** Re-run `scripts/capture-199.ts` (the 6 `ours-*`
   faces refreshed — the quote glyph changes the testimonials' visible
   face).
8. **[R-8, doc lockstep]** `docs/session_25.md` (the session_23 house
   pattern) + the worklog round-15 lines + this plan's execution record;
   PAD §10 records the round-15 close; F-15b recorded in the session log.
9. **[R-9, gate re-proof]** The full chain re-run after the changes:
   `bun run gate` + `CI=1` e2e + the live parity/drift/mobile probes
   (parity stays green — no probed at-rest ELEMENT face changed; drift now
   carries the motion/glyph census).
10. **[R-10, ship]** One atomic commit on main; push via
    `python3 docs/ssh_git_wrapper_v3.py --key-file <key> --remote
    git@github.com:nordeim/elegance-flow.git` (the round-11 `--remote`
    lesson); remote ref verified == HEAD; the operator key shredded
    after; the scratch probe scripts removed.

## Phase 4 — The verification bar

- The unit battery born RED on the real bugs, GREEN after the cures, and
  proven to bite by mutation; the drift probe's motion/glyph census red on
  the pre-fix tree, NO DRIFT after; the e2e leg green on the standalone
  artifact.
- The gate green at ship; the parity/mobile bars re-proven (the landing's
  probed at-rest element faces untouched); the count ladder consistent
  everywhere; the push verified; the working tree clean; no
  key/shim/db/log artifacts staged.

## Phase 5 — The execution record (filled at ship)

- **R-1 born RED 4/7 on the live tree** — the smooth rule (×2: presence
  + exactly-once) and the glyph family (×2: the straight-quote literal +
  the retired-entity regression) all failed on the real divergences;
  the keeps-green trio (the html purity ×2 + the raw-code-point
  regression) passed by design. The first pin form missed the indented
  `@layer base` context (`^html` never matched the 2-space indent) —
  re-anchored to the `^\s*html` form before the cure landed.
- **R-2 the cures**: the raw `html { scroll-behavior: smooth }` rule in
  globals.css's base layer (the mechanism comment records the
  trajectory evidence + the raw-rule genus + the gate-invisibility
  record) + the `"{testimonial.quote}"` literal at the render site
  (the DOM structure unchanged — 3 children; only the glyph bytes
  change). The battery 7/7 GREEN after.
- **R-3 born-RED live proof**: the extended drift probe ran against the
  PRE-FIX tree → **DRIFT DETECTED on the motion/glyph face (2 fields:
  scrollBehavior · quoteGlyphs)**; after the cures → **NO DRIFT on all
  four legs** ([390] content + mobile-menu · [login] auth-card ·
  [preflight] form-face · [motion] motion/glyph). The trajectory
  re-probed post-cure: OURS glides [0,53,285,683,846,929,967,995,1007,
  1008] exactly like the reference's [0,27,318,552,686,751,778,796,
  800] — the motion face itself, not just the computed token.
- **R-4 the e2e leg**: +1 check in `tests/e2e/landing.spec.ts` — the
  html element computes `scroll-behavior: smooth` and the quote
  paragraph renders the U+0022 pair (first + last code point 34) —
  green on the standalone artifact (76/76 after the clean rebuild).
- **R-5 the count ladder re-anchored 436/34 → 443/35 (13 seam/196 + 22
  source contracts/247) + 75/8 → 76/8 (e2e)** at every live-tense site
  (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 + the §10
  tree-diagram line · SKILL §7 · the worklog Stage Summary) + the
  motion-glyph family in the CLAUDE/SKILL prose lists + the ladder's
  SOURCE_CONTRACTS list (the union-vs-filesystem check went RED by
  design until the family was listed — the lockstep enforced).
- **R-6 the mutation proof: 3/3 unit classes bite + the live drift leg
  + the e2e leg** — M1 the smooth rule dropped (2 RED) · M2 the glyph
  reverted to `&ldquo;` (2 RED) · M3 a `scroll-smooth` class planted
  on the html element (2 RED — the purity pins bite: `<html lang="en">`
  + the no-class negative) — the live drift leg (the pre-fix world
  re-applied → the 2-field DRIFT re-detected; restored → NO DRIFT all
  four legs) — the e2e leg (the M2 mutation rebuilt into the artifact →
  the round-15 pin RED, the spec's other tests green; restored,
  rebuilt, 76/76) — all files restored byte-identical via the
  /tmp-backup harness (`cmp`-verified).
- **The positive censuses recorded**: the carousel's idle behavior
  (neither app auto-advances), the :active faces IDENTICAL, the
  renamed-scale carrier census ZERO on both apps (the ninth-trap hunt
  closes empty), the html-element face family IDENTICAL apart from
  scroll-behavior.
- **F-15b recorded**: the class-string-vs-computed-face record (both
  compute rgb(245,158,11) + 4px; our explicit `border-l-amber-500` is
  the correct v4 decode of the reference's cross-origin app-CSS amber —
  keep, documented).
- **The advisory ledger held at 10** post-cure.
- **The captures refreshed** (the 6 `ours-*` faces; the testimonials
  region verified rendering — 75% non-white on the zinc-950 section).
- **The gate re-proof**: lint 0/0 · tsc 0 · **443/443 (35 files)** ·
  build (22 routes) · smoke 14/14 · e2e **76/76 (8 specs)** · parity
  COMPUTE IDENTICAL (both viewports) · drift NO DRIFT (all four legs)
  · the mobile census byte-equivalent.
- **Shipped** as one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --remote git@github.com:nordeim/elegance-flow.git`
  (the round-11 `--remote` lesson applied), remote verified == HEAD,
  key shredded, the scratch probe scripts removed.
