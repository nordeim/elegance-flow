`docs/session_21.md` logs the round-13 re-validation (the focus-face
census at the owner's `7f42923`); `docs/session_22.md` is the
owner-committed narration transcript of that session. Now at fresh HEAD
`2cf497d`, this round: the clone re-orientation, the gate + the live
probes + the mobile-menu census re-proven, a fresh-eyes audit — and the
preflight-face class closed: the placeholder ink, the form background,
and the transition-property list all sit under the gate at every tier.

## Re-orientation

Workspace refreshed at `2cf497d` (the delta from round-13's ship
`882c4fd` is `docs/session_22.md` alone — a doc, no code). The
environment: `.env` carries the mandated contract
`DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), census
**MATCH (3 + 4 users)**. The doc set re-internalized (AGENTS · CLAUDE ·
README · PAD v2.0 · the skill v1.199.0 · the worklog · session_21 +
session_22 · the round-13 plan · the web-application skill + the
catalog · the Tailwind v4 report · the ssh-wrapper runbook). The
neo-crm lineage repo stands as the tech-stack pattern reference — the
patterns already carried verbatim; no new tech-stack surface this
round.

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **425/425 (33 files)** ·
  build (**22 routes**) · smoke **14/14** · e2e **72→74/74 (8 specs,
  re-run after the round-13 re-anchor)** — every count matching the
  round-13 re-anchor.
- **Live parity**: `scripts/parity-199.ts` — **COMPUTE IDENTICAL at
  1280 + 390** (the oklab/rgba s18 serialization class excluded, same
  paint).
- **Drift**: `scripts/drift-199.ts` — **NO DRIFT** (text + img + login
  faces).
- **The mobile-menu census** (the operator's standing emphasis):
  byte-equivalent live on BOTH apps at 390×844; link-ride navigates
  `#about` AND closes on both; the sole delta OUR `aria-expanded` (the
  documented invisible a11y superset). **No Tailwind v4 bug** in the
  seven pinned traps.
- The standing config asks re-verified: the `.env`/db-path contract,
  the vitest/playwright configs (the `skills/` exclusions),
  `.env.example` var-by-var (all six vars cover the src env census),
  the sitemap/SEO family (smoke rung 12), the TODO/FIXME sweep clean,
  the advisory ledger **unchanged — 10 (4 high, 5 moderate, 1 low), all
  dev-toolchain transitive**; runtime zod ^4.6.7 above the GHSA floor;
  no security driver.

## The audit — the fresh angle: the HOVER-FACE census → the PREFLIGHT-GENUS family

The interactive state family no probe read (parity-199 reads at-rest
faces; round-13 read the focus faces): a probe rode real `.hover()` on
13 landing controls at both viewports — **every hover
color/bg/border/opacity/timing face IDENTICAL** (the sole deltas: the
transition-property lists below + the s18 serialization forms). The
project overlay's hover face IDENTICAL (opacity 0→1 · 0.3s · same-paint
bg); the cursor family IDENTICAL; the input font family IDENTICAL; the
auth inputs' placeholder/bg IDENTICAL (explicit slate utilities,
round-13's pins re-proven live). The toast leg CLOSED (the reference's
toast system is DOM-DEAD per session-131's census — ours is the
documented superset; no reference face exists to parity-check).

**F-14a (HIGH, VISIBLE) — the contact form's PLACEHOLDER INK.** The
reference's v3 preflight paints `::placeholder` gray-400 (#9ca3af →
rgb(156,163,175)); v4's paints `color-mix(in oklab, currentcolor 50%,
transparent)` (verified at tailwindcss/index.css:843-847 + live) — our
placeholders computed zinc-950@50% (near-black) where the reference
renders light gray, VISIBLY, on the parity-gated public surface.
Invisible to every gate: parity reads the elements' own styles (never
pseudo-elements), the drift probe read text content, no e2e pin read a
placeholder color, and the capture pixel-diff read the subtle gray
shift as alignment noise.

**F-14b (MEDIUM, latent) — the input/textarea BACKGROUND.** The v3
preflight left the UA `field` default (white); v4's resets
`background-color: transparent` (preflight.css:255). Same paint over
the white contact section — the latent-face genus, curable without
bundle conflict (the auth inputs carry explicit bg-slate-50/50; the
select carries byte-mirrored bg-white).

**F-14c (MEDIUM — the EIGHTH v4 re-pin trap) — the transition-colors
property-list expansion.** v4 adds outline-color + the gradient custom
properties to the list (34 carriers). The mechanism is HARDCODED in
dist/lib.mjs — NOT theme-driven; an @theme override does nothing.

**F-14d (Informational — the load-bearing decode).**
`transition-transform`'s v4 list (`transform, translate, scale,
rotate`) is REQUIRED: v4 compiles translate-x/scale to the individual
properties, so re-pinning it to v3's bare `transform` would kill the
hover motions. The trap-⑥ genus INVERTED — documented, never re-pinned
(a keeps-out pin guards it).

**F-14e (Informational, latent — the two-bundle foreground record).**
Our body ink rgb(9,9,11) (round-13's --color-foreground re-pin, the
auth bundle's VISIBLE face) vs the reference landing's latent
rgb(10,10,10) (neutral-950). The inherited-ink census proved ZERO
visible text inherits the body ink on EITHER app — the seven apparent
hits on ours were the explicit-zinc-950-equals-token coincidence,
disproven per-element. Documented, no cure.

## The TDD cure (born RED → green → proven to bite)

`tests/preflight-faces.test.ts` (+11 checks, the 34th unit file) **born
RED 6/11 on the live tree** — the placeholder literal, the scoped-bg
rule, the transition re-pin; the keeps-green pair (the keeps-out + the
class-string purity) passed by design. The cures: the scoped
`#contact input::placeholder, #contact textarea::placeholder { color:
#9ca3af }` + `#contact input, #contact textarea { background-color:
#fff }` in globals.css's base layer, and the UNLAYERED
`.transition-colors { transition-property: <the v3 six-property list>
}` rule.

**THE HARNESS FIND (caught by the live re-read, the honest record):
the first cure spelled the transition re-pin as a custom
`@utility transition-colors` — and the live computed re-read caught the
face STILL computing the v4 list.** v4.3 SILENTLY DROPS a custom
@utility colliding with a functional built-in (the compiled CSS
carried only the built-in's expanded list; the unit pin alone would
have "proven" the block present while the face stayed wrong). Only an
UNLAYERED rule — unlayered author styles outrank every @layer
including utilities — re-pins the face. The battery pins re-anchored
to the unlayered form; the trap log records the two-layer mechanism.

`scripts/drift-199.ts` gains the **PREFLIGHT-FACE census** (the name
input's placeholder + bg, the textarea's placeholder, the nav link's
transition-property, both apps at 1280) — **born RED live on the
pre-fix tree (4-field DRIFT), NO DRIFT after the cure**. The landing
e2e battery gains the computed pin (+1): the placeholder computes
rgb(156,163,175), the bg white, the transition-property the v3 list —
on the standalone artifact.

**The mutation proof: 4/4 unit classes bite + the live drift leg + the
e2e leg** — M1 the placeholder literal reverted to the v4 color-mix
form (1 RED) · M2 the scoped bg rule dropped (1 RED) · M3 the unlayered
re-pin removed (3 RED) · M4 a transition-transform override planted
(1 RED — the keeps-out pin's first form missed the unlayered-rule
shape and passed vacuously; strengthened with the
`^\.transition-transform\s*\{` negative, it bites) — the live drift
leg (the pre-fix world re-applied → 4-field DRIFT re-detected) — the
e2e leg (M1 rebuilt into the artifact → the round-14 pin RED; the
battery 11/11 after, all files restored byte-identical via the
/tmp-backup harness, e2e 75/75 after the clean rebuild).

## Shipped

The count ladder re-anchored **436/34 (13 seam/196 + 21 source
contracts/240) · e2e 75/8** at every live-tense site (AGENTS · CLAUDE ·
README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 · the worklog Stage Summary
+ the PAD §10 tree-diagram line); the preflight-faces family in the
CLAUDE/SKILL prose lists; the trap census SEVEN → EIGHT at every site
(AGENTS · CLAUDE · SKILL §3 · the Tailwind report gains the full
trap-⑧ appendix with the load-bearing-decode record); the captures
refreshed (6 `ours-*` faces, the gray-400 placeholder pixels verified
in the contact region); the gate re-proven green (lint 0/0 · tsc 0 ·
436/436 · 22 routes · smoke 14/14 · e2e 75/75); parity IDENTICAL ·
drift NO DRIFT (all three legs) · the mobile census byte-equivalent;
the advisory ledger unchanged at 10. Pushed as one atomic commit on
main via the SSH wrapper (`--remote` pointing at elegance-flow, the
key shredded after, no new branches).
