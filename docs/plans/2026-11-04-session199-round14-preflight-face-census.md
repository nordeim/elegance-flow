# Session 199 — Round 14: THE FRESH-CONTEXT RE-VALIDATION + THE PREFLIGHT-FACE CENSUS (2026-11-04)

The rotation trigger: the owner's newest commit (`2cf497d` "update session
log") adds `docs/session_22.md` — the raw narration transcript of the
round-13 session. This round: pull at `2cf497d`, re-internalize the doc
set, re-prove the gate + the live parity/drift bars + the mobile-menu
census, audit with a fresh angle, then close the preflight-face class the
fresh angle surfaces.

## Phase 0 — The intake (Verified)

- Workspace refreshed at `2cf497d` (the delta from round-13's ship
  `882c4fd` is `docs/session_22.md` alone — a doc, no code). Environment:
  `.env` carries the mandated contract
  `DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), census
  **MATCH (3 + 4 users)**. The doc set re-internalized (AGENTS · CLAUDE ·
  README · PAD v2.0 · the skill v1.199.0 · the worklog · session_21 +
  session_22 · the round-13 plan · the web-application skill + the
  catalog · the Tailwind v4 report · the ssh-wrapper runbook). The
  neo-crm lineage repo stands as the tech-stack pattern reference — the
  patterns already carried verbatim (no new tech-stack surface; recorded).

## Phase 1 — The status validation (Verified — every claim re-proven)

| Doc claim | Live evidence |
| --- | --- |
| lint 0/0 · tsc 0 | Both green at HEAD |
| Unit 425/425 (33 files) | `bun run test` — 425 passed |
| Build 22 routes | Route table counted |
| Smoke 14/14 | The ladder green on :3210 with `db/smoke.db` |
| E2E 74/74 (8 specs) | `CI=1 bun run test:e2e` — 74 passed |
| Live parity COMPUTE IDENTICAL | `scripts/parity-199.ts` at 1280 + 390 |
| Content + mobile-menu + img + login NO DRIFT | `scripts/drift-199.ts` (both legs) |
| Mobile-menu census (link-ride) | byte-equivalent on both apps; link-ride navigates AND closes; sole delta OUR aria-expanded |
| Census MATCH 3+4 | `bun run db:census` (resolved path printed) |
| skills/ excluded | tsconfig `exclude`, eslint `ignores`, vitest include-allowlist, playwright `testDir` |
| Advisory ledger 10 (4 high · 5 moderate · 1 low) | `bun audit` — all dev-toolchain transitive; runtime zod ^4.6.7 patched; no security driver |

No Tailwind v4 bug in the SEVEN pinned traps (the round-8 + round-13
batteries green inside the 425; computed faces IDENTICAL; the e2e mobile
battery green). The standing config asks re-verified live: the
`.env`/db-path contract, the vitest/playwright configs, the sitemap/SEO
family (smoke rung 12), `.env.example` var-by-var (all six vars cover the
src census: DATABASE_URL · AUTH_SECRET · NEXT_PUBLIC_SITE_URL ·
NEO_PROXY_HOPS · NEO_DISABLE_IN_APP_OTP · NEO_DISABLE_IN_APP_RESET), the
TODO/FIXME sweep clean.

## Phase 2 — The audit findings (the fresh angle: the HOVER-FACE census — the interactive state family no probe reads: parity-199 reads at-rest faces, round-13 read the focus faces, and the hover/prelintency family — the pseudo-element + preflight faces — was never read by anything)

**F-14a (HIGH, VISIBLE, the landing — the parity-gated public surface):
the contact form's PLACEHOLDER INK computes divergent.** Live-probed
(pseudo-element computed styles): the reference's name/email/textarea
placeholders compute **`rgb(156, 163, 175)`** — the v3 preflight's
`gray-400` (#9ca3af, `input::placeholder, textarea::placeholder { color:
theme(colors.gray.400) }`) — while OURS compute
**`oklab(0.140764 0.00120224 -0.00421676 / 0.5)`** = zinc-950 @ 50% (the
v4 preflight's `::placeholder { color: color-mix(in oklab, currentcolor
50%, transparent) }` — verified at `node_modules/tailwindcss/index.css`
lines 843–847 + the live computed face). The class strings are
byte-equal (neither app's inputs carry a placeholder utility); the
computed face diverges VISIBLY (light gray vs half-black placeholder
text). Invisible to every gate: parity-199 reads the elements' own styles
(never pseudo-elements), the drift probe reads text content (the
placeholder paints no text node), no e2e pin reads a placeholder color,
and the capture pixel-diff read the subtle shift as alignment noise.

**F-14b (MEDIUM, latent, the landing): the contact form's input/textarea
BACKGROUND computes divergent.** The reference's inputs compute
**`rgb(255, 255, 255)`** (the UA `field` default — the v3 preflight never
reset input backgrounds) while OURS compute **`rgba(0, 0, 0, 0)`** (the
v4 preflight's form-element reset, `preflight.css` line 255
`background-color: transparent`). Same paint over the white contact
section (verified `contactSectionBg` white on both) — the latent-face
genus; the mechanism (the preflight reset) would surface on any future
non-white context. The SELECT carries explicit `bg-white` on both apps
(byte-mirrored); the auth inputs carry explicit `bg-slate-50/50` (round-13
pinned). No bundle conflict — the scoped cure is available.

**F-14c (MEDIUM, latent-behavior, the EIGHTH Tailwind v4 re-pin trap):
the `transition-colors` property-list expansion.** The reference's v3-era
build emits `transition-property: color, background-color, border-color,
text-decoration-color, fill, stroke` on every `transition-colors` carrier
(nav links, form controls, mail-link icons, footer links — 34 carriers in
src/); our v4.3 build emits `color, background-color, border-color,
outline-color, text-decoration-color, fill, stroke, --tw-gradient-from,
--tw-gradient-via, --tw-gradient-to` — v4 added `outline-color` + the
gradient custom properties to the list. Verified in the compiled CSS +
live (ours animates outline-color/gradient changes on hover/focus
transitions where the reference snaps them). THE MECHANISM IS NOT
THEME-DRIVEN: v4.3's functional utility hardcodes the list as a static
value (`dist/lib.mjs`: `colors:[a("transition-property","color,
background-color, border-color, outline-color, …, --tw-gradient-to")]`) —
an `@theme { --transition-property-colors }` override does NOTHING (only
the bare `transition` utility reads `--transition-property-*` theme
keys). The cure must be a v4-native `@utility transition-colors`
override re-pinning the v3 list (replicating the built-in's
timing/duration declarations: `var(--tw-ease, …)` /
`var(--tw-duration, …)`).

**F-14d (Informational — the LOAD-BEARING decode, NO re-pin):
`transition-transform`'s v4 list is the cure, not a bug.** v4's
`transition-transform` emits `transform, translate, scale, rotate` (vs
v3's bare `transform`) — and the divergence is REQUIRED: v4 compiles
`translate-x-1`/`scale-110` to the individual `translate`/`scale`
properties (not into `transform` as v3 did), so re-pinning the list to
v3's bare `transform` would KILL the hover motions (the hero CTA arrow,
the project-image zoom, the submit arrow). The computed-face divergence
here produces the IDENTICAL visible motion — the trap-⑥ genus inverted
(the class string mirrors; the property list must differ to render the
same face). Documented in the trap log; a keeps-out pin guards it.

**F-14e (Informational, latent, documented): the base/body ink — the
two-bundle foreground record, round-13's --color-line genus on the TEXT
token.** OURS body ink rgb(9,9,11) (round-13's `--color-foreground`
re-pin — the auth bundle's VISIBLE face) vs the REF landing's body ink
rgb(10,10,10) (neutral-950 — its app bundle's LATENT ink). The
inherited-ink census (every visible text node's computed color vs the
body color, both apps) proved **ZERO visible text inherits the body ink
on EITHER app** — the reference paints every visible text an explicit
color; our seven apparent inherited hits were the
explicit-zinc-950-equals-token coincidence (the per-element comparison
proved every one computes rgb(9,9,11) on BOTH apps). Latent delta,
documented; no cure (the auth card's visible foreground keeps the token —
the round-13 pin holds).

**The toast leg (closed — no reference face exists):** the reference's
toast system is DOM-DEAD (session-131's D-131a1 live census: four `Ix.*`
calls in its bundle, ZERO rendered elements on any trigger path); OUR
toast is the documented superset carrying the reference's own
byte-verified string pair. Nothing to parity-check.

**The positive censuses (clean, first time probed):** the HOVER faces —
nav links ×2, header CTA, hero CTAs ×2, filter chips ×2, carousel
selector, form submit, footer link, social icon — colors/bgs/borders/
opacity/timing IDENTICAL at both viewports (the sole deltas: the
transition-property lists of F-14c + the s18 serialization forms); the
project overlay's hover face (opacity 0→1 · `transition-property:
opacity` · 0.3s · bg same-paint); the cursor family (pointer/default per
control); the input font family; the auth inputs' placeholder (explicit
slate utilities, IDENTICAL) + bg (explicit bg-slate-50/50, the oklab/rgba
s18 form).

**The s18 serialization classes (filtered, no action):** the hero
secondary CTA's hover border (oklab white@.5 vs rgba white@.5), the
selector role ink (oklab white@.3), the project overlay bg (oklab
zinc-950@.8), the auth input bg (oklab slate-50@.5) — every one
numerically the same paint.

## Phase 3 — The remediation ToDo list

1. **[R-1, TDD — the preflight-face source-contract battery]** Create
   `tests/preflight-faces.test.ts` (comment-stripped source reads, the
   house pattern): ① the placeholder cure pin (globals.css carries the
   scoped `#contact input::placeholder, #contact textarea::placeholder`
   rule with the v3 `#9ca3af` literal); ② the input-bg cure pin (the
   scoped `#contact input, #contact textarea` rule with
   `background-color: #fff`); ③ the `@utility transition-colors`
   re-pin (the exact v3 six-property list + the built-in's
   timing/duration declarations; the retired v4 additions —
   `outline-color`, `--tw-gradient-from` — never return inside it); ④
   the transition-transform keeps-out pin (globals.css never overrides
   `transition-transform` — the load-bearing decode of F-14d); ⑤ the
   class-string purity pin (the landing's form controls carry no
   `placeholder:` utility — the cure stays in CSS, the byte-mirror
   holds). **Born RED on the live tree** (①②③ fail; ④⑤ keep-green) —
   the honest record.
2. **[R-2, the cures]** `globals.css`: the scoped preflight-face block
   (①② — placed after the base layer's body rule, the comment records
   the two preflight mechanisms with the source line citations); the
   `@utility transition-colors` override (③ — the custom-utilities
   section, replicating `transition-timing-function: var(--tw-ease,
   var(--default-transition-timing-function))` and
   `transition-duration: var(--tw-duration,
   var(--default-transition-duration))` verbatim).
3. **[R-3, the live-probe cure — the preflight faces join the drift
   bar]** Extend `scripts/drift-199.ts` with the PREFLIGHT-FACE census
   leg (both apps, the landing at 1280): the name input's placeholder
   color + background, the textarea's placeholder color, the nav link's
   transition-property. Run it BEFORE the R-2 cure → **DRIFT DETECTED
   on the real bugs** (the born-red live leg); after the cure → NO
   DRIFT.
4. **[R-4, the e2e legs]** Extend `tests/e2e/landing.spec.ts` (+1): the
   landing's name-input placeholder computes `rgb(156, 163, 175)`, its
   background computes `rgb(255, 255, 255)`, and the nav link's
   transition-property carries the v3 six-property list — on the
   standalone artifact.
5. **[R-5, count ladder]** Unit 425/33 → 425+N/34; e2e 74/8 → 75/8 —
   the count-ladder battery enforces the re-anchor at EVERY live-tense
   site (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 ·
   the worklog Stage Summary) + the preflight-faces family in the
   CLAUDE/SKILL prose lists + the trap census SEVEN → EIGHT (AGENTS ·
   CLAUDE · SKILL §3 · the Tailwind v4 report's trap log gains the
   trap-⑧ appendix with the F-14d load-bearing-decode record).
6. **[R-6, mutation proof]** The batteries must BITE: the placeholder
   literal reverted to the v4 color-mix form (RED) · the scoped bg rule
   dropped (RED) · the `@utility transition-colors` override removed
   (RED) · a `@utility transition-transform` override planted (④ RED —
   the keeps-out pin bites) · the live drift leg re-run on a reverted
   tree (DRIFT) · the e2e leg (the placeholder mutation rebuilt into
   the artifact → the new pin RED). All files restored byte-identical
   (the /tmp-backup harness).
7. **[R-7, captures]** Re-run `scripts/capture-199.ts` (the 6 `ours-*`
   faces refreshed — the placeholder cure changes the contact form's
   visible face).
8. **[R-8, doc lockstep]** `docs/session_23.md` (the session_21 house
   pattern) + the worklog round-14 lines + this plan's execution
   record; PAD §10 records the round-14 close; F-14d/F-14e recorded in
   the session log.
9. **[R-9, gate re-proof]** The full chain re-run after the changes:
   `bun run gate` + `CI=1` e2e + the live parity/drift/mobile probes
   (parity stays green — no probed at-rest face changed; drift now
   carries the preflight census).
10. **[R-10, ship]** One atomic commit on main; push via
    `python3 docs/ssh_git_wrapper_v3.py --key-file <key> --remote
    git@github.com:nordeim/elegance-flow.git` (the round-11 `--remote`
    lesson); remote ref verified == HEAD; the operator key shredded
    after; the scratch probe scripts removed.

## Phase 4 — The verification bar

- The unit battery born RED on the real bugs, GREEN after the cures, and
  proven to bite by mutation; the drift probe's preflight census red on
  the pre-fix tree, NO DRIFT after; the e2e leg green on the standalone
  artifact.
- The gate green at ship; the parity/mobile bars re-proven (the
  landing's probed at-rest faces untouched); the count ladder consistent
  everywhere; the push verified; the working tree clean; no
  key/shim/db/log artifacts staged.

## Phase 5 — The execution record (filled at ship)

- **R-1 born RED 6/11 on the live tree** — the placeholder literal (×2),
  the scoped-bg rule, and the transition re-pin (×3) all failed on the
  real divergences; the keeps-green pair (④ the keeps-out, ⑤ the
  class-string purity) passed by design.
- **THE HARNESS FIND (the round-14 lesson, recorded at R-2): the first
  cure spelled the transition re-pin as a custom
  `@utility transition-colors` — and the live computed re-read caught
  the face STILL computing the v4 list.** v4.3 SILENTLY DROPS a custom
  @utility colliding with a functional built-in (the compiled CSS
  carried only the built-in's expanded list; the unit pin alone would
  have "proven" the block present while the face stayed wrong). Only
  the UNLAYERD `.transition-colors` rule re-pins the face (unlayered
  author styles outrank every @layer, including utilities, in the
  cascade). The battery pins re-anchored to the unlayered form; the
  trap log records the two-layer mechanism (the hardcoded static list
  + the silently-dropped custom @utility).
- **R-2 the cures**: the scoped `#contact input::placeholder,
  #contact textarea::placeholder { color: #9ca3af }` + `#contact
  input, #contact textarea { background-color: #fff }` in globals.css's
  base layer (the two-bundle scoping: the auth family's inputs carry
  their own explicit faces; the superset surfaces keep the v4 defaults
  by design); the unlayered `.transition-colors { transition-property:
  color, background-color, border-color, text-decoration-color, fill,
  stroke }` rule. The battery 11/11 GREEN after.
- **R-3 born-RED live proof**: the extended drift probe ran against the
  PRE-FIX tree → **DRIFT DETECTED on the preflight face (4 fields:
  inputPlaceholder · inputBg · textareaPlaceholder · navTransition)**;
  after the cures → **NO DRIFT on all three legs** ([390] content +
  mobile-menu · [login] auth-card · [preflight] form-face).
- **R-4 the e2e leg**: +1 check in `tests/e2e/landing.spec.ts` — the
  placeholder computes rgb(156,163,175), the input bg rgb(255,255,255),
  the nav link's transition-property the v3 six-property list — green
  on the standalone artifact (75/75 after the clean rebuild).
- **R-5 the count ladder re-anchored 425/33 → 436/34 (13 seam/196 + 21
  source contracts/240) + 74/8 → 75/8 (e2e)** at every live-tense site
  (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 + the §10 tree
  diagram · SKILL §7 · the worklog Stage Summary) + the
  preflight-faces family in the CLAUDE/SKILL prose lists + the trap
  census SEVEN → EIGHT (AGENTS · CLAUDE · SKILL §3 · the Tailwind
  report's trap log gains the full trap-⑧ appendix with the
  load-bearing-decode + the sibling-preflight-face records).
- **R-6 the mutation proof: 4/4 unit classes bite + the live drift leg
  + the e2e leg** — M1 the placeholder literal reverted to the v4
  color-mix form (1 RED) · M2 the scoped bg rule dropped (1 RED) · M3
  the unlayered re-pin removed (3 RED) · M4 a transition-transform
  override planted (1 RED — the keeps-out pin's first form missed the
  unlayered-rule shape and passed vacuously on the first run;
  strengthened with the `^\.transition-transform\s*\{` negative, it
  bites — the strengthened pin is part of the shipped battery) — the
  live drift leg (the pre-fix world re-applied → the 4-field DRIFT
  re-detected) — the e2e leg (M1 rebuilt into the artifact → the
  round-14 pin RED, 1 failed / 1 matched-passed; restored, rebuilt,
  75/75) — all files restored byte-identical via the /tmp-backup
  harness.
- **The preflight census re-run clean**: NO DRIFT on all three legs.
- **The positive censuses recorded**: the hover faces IDENTICAL on all
  13 probed controls at both viewports; the project overlay's hover
  face IDENTICAL; the cursor family IDENTICAL; the input font family
  IDENTICAL; the auth inputs' placeholder/bg IDENTICAL (round-13's
  pins re-proven live).
- **The toast leg closed**: the reference's toast system is DOM-DEAD
  (session-131's census); ours is the documented superset.
- **F-14e recorded**: the two-bundle foreground record (latent on both
  apps; zero visible inherited-ink text on either side; no cure).
- **The advisory ledger held at 10** post-cure.
- **The captures refreshed** (the 6 `ours-*` faces; the gray-400
  placeholder pixels verified present in the contact region's crop).
- **The gate re-proof**: lint 0/0 · tsc 0 · **436/436 (34 files)** ·
  build (22 routes) · smoke 14/14 · e2e **75/75 (8 specs)** · parity
  COMPUTE IDENTICAL (both viewports) · drift NO DRIFT (all three legs)
  · the mobile census byte-equivalent.
- **Shipped** as one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --remote git@github.com:nordeim/elegance-flow.git`
  (the round-11 `--remote` lesson applied), remote verified == HEAD,
  key shredded, the scratch probe scripts removed.
