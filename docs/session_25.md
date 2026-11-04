`docs/session_23.md` logs the round-14 re-validation (the preflight-face
census at the owner's `2cf497d`); `docs/session_24.md` is the
owner-committed narration transcript of that session. Now at fresh HEAD
`eb00ab8`, this round: the clone re-orientation, the gate + the live
probes + the mobile-menu census re-proven, a fresh-eyes audit — and the
motion/glyph class closed: the anchor-ride glide and the quote glyphs
now sit under the gate at every tier.

## Re-orientation

Workspace refreshed at `eb00ab8` (the delta from round-14's ship
`d159845` is `docs/session_24.md` alone — a doc, no code). The
environment: `.env` carries the mandated contract
`DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), census
**MATCH (3 + 4 users)**. The doc set re-internalized (AGENTS · CLAUDE ·
README · PAD v2.0 · the skill v1.199.0 · the worklog · session_23 +
session_24 · the round-14 plan · the web-application skill + the
catalog · the Tailwind v4 report · the ssh-wrapper runbook). The
neo-crm lineage repo stands as the tech-stack pattern reference — the
patterns already carried verbatim; no new tech-stack surface this
round.

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **436/436 (33→34 files, the
  round-14 ladder)** · build (**22 routes**) · smoke **14/14** · e2e
  **75/75 (8 specs)** — every count matching the round-14 re-anchor.
- **Live parity**: `scripts/parity-199.ts` — **COMPUTE IDENTICAL at
  1280 + 390** (the oklab/rgba s18 serialization class excluded, same
  paint).
- **Drift**: `scripts/drift-199.ts` — **NO DRIFT** (the round-14
  three-leg probe: content + mobile-menu · auth-card · preflight).
- **The mobile-menu census** (the operator's standing emphasis):
  byte-equivalent live on BOTH apps at 390×844; link-ride navigates
  `#about` AND closes on both; the sole delta OUR `aria-expanded` (the
  documented invisible a11y superset). **No Tailwind v4 bug** in the
  eight pinned traps.
- The standing config asks re-verified: the `.env`/db-path contract,
  the vitest/playwright configs (the `skills/` exclusions),
  `.env.example` var-by-var (all six vars cover the src env census),
  the sitemap/SEO family (smoke rung 12), the TODO/FIXME sweep clean,
  the advisory ledger **unchanged — 10 (4 high, 5 moderate, 1 low), all
  dev-toolchain transitive**; runtime zod ^4.6.7 above the GHSA floor;
  no security driver.

## The audit — the fresh angle: the MOTION/GLYPH census → the smooth-scroll and quote-glyph catches

The time-dimension and glyph faces no probe read (parity-199 reads
at-rest element faces; round-13 read focus; round-14 read hover +
pseudo-elements — but the SCROLL TRAJECTORY, the QUOTE GLYPHS, the
carousel's idle behavior, the :active faces, and the html element's own
face family were never read by anything):

**F-15a (HIGH, VISIBLE, functional — the parity-gated public surface
AND the mobile menu): the ANCHOR-RIDE MOTION face.** The reference's
app CSS ships the raw rule `html { scroll-behavior: smooth }` (found
live in its stylesheets; its html computes smooth) — every anchor
navigation GLIDES through intermediate positions (trajectory-probed:
the #about ride sampled 0→27→199→552→686→751→778→796→800 over ~700ms).
OURS computed `auto` and JUMPED (the target on the first sample). The
divergence rode EVERY in-page navigation — the 5 desktop nav links, the
5 mobile-menu links, both hero CTAs, the footer links — while every
gate stayed green (parity-199 reads the elements' own at-rest faces,
never the html element's scroll-behavior; the drift probe read
text/img/login/preflight faces; the e2e anchor assertions ride
hash/visibility, which pass identically under an instant jump; the
mobile-menu census reads open/close + hash). The raw-rule genus — the
session-10 `button { cursor: pointer }` and session-16 `th, td {
padding: 1px }` precedents: reference CSS rules outside the utility
system that the port must carry explicitly. NOT a ninth v4 trap
(nothing v3/v4-related — the rule was simply never ported).

**F-15c (HIGH, VISIBLE, text): the TESTIMONIAL QUOTE GLYPH.** OURS
rendered typographic quotes — U+201C/U+201D via the `&ldquo;…&rdquo;`
entities — where the live reference renders STRAIGHT double quotes
(U+0022) as standalone text-node children (the DOM structure matches:
3 children on both sides; only the glyphs differ). Verified by the
FULL-TEXT census (every visible text node on both apps,
whitespace-normalized, byte-diffed): **96 vs 96 text nodes, the SOLE
text divergence on the entire landing** (every apostrophe, em-dash and
ellipsis elsewhere matches). Invisible to every gate: the drift probe's
text census walks nav/h1/h2/services/stats/chips — never the quote
block; the e2e carousel test checks distinct-ness, not bytes; no unit
pin read the glyph form (the TESTIMONIALS array's quote strings carry
no glyphs — the glyphs were added at the render site, unpinned).

**F-15b (Informational — the class-string-vs-face record, NO cure):
the active carousel selector.** OURS carries the explicit
`border-l-amber-500` utility (pinned at `tests/landing-page.test.ts`);
the REFERENCE's active selector carries only `border-l-4 bg-zinc-900`
and paints its left border amber via its cross-origin app CSS (the
mechanism sheet's `cssRules` are blocked — not enumerable; the computed
face is the contract). BOTH compute `borderLeftColor: rgb(245, 158,
11)` + 4px — identical face, differing class string. The trap-⑥ genus
INVERTED-and-correct: dropping our explicit utility would compute the
v4 preflight's currentColor-derived border on the zinc-950 section and
BREAK the face. Keep ours; documented.

**The positive censuses (clean, first time probed):** the carousel's
TIME behavior — neither app auto-advances (15s idle, 1 distinct quote
each; the selectors' transition `all`/200ms on both; the e2e
click-rotation pin covered the click face, the idle face was never
probed); the :active faces on the hero CTA IDENTICAL (real mousedown
hold: color/bg/border/transform/opacity); the RENAMED-SCALE carrier
census — ZERO carriers of bare `ring`/`shadow`/`rounded-sm`/
`rounded-xs`/`drop-shadow*` on EITHER app's DOM (the ninth-v4-trap
hunt closes EMPTY; the eight pinned traps remain the complete census);
the html-element face family IDENTICAL apart from scroll-behavior
(tap-highlight-color, text-size-adjust, font-family, line-height, the
empty class string all match).

## The TDD cure (born RED → green → proven to bite)

`tests/motion-glyph.test.ts` (+7 checks, the 35th unit file) **born RED
4/7 on the live tree** — the smooth rule (×2: presence + exactly-once)
and the glyph family (×2: the straight-quote literal + the
retired-entity regression) all failed on the real divergences; the
keeps-green trio (the html purity ×2 + the raw-code-point regression)
passed by design. The cures: the raw `html { scroll-behavior: smooth
}` rule in globals.css's base layer (the mechanism comment records the
trajectory evidence + the raw-rule genus) and the
`"{testimonial.quote}"` literal at the render site (the DOM structure
unchanged — 3 children; only the glyph bytes change).

`scripts/drift-199.ts` gains the **MOTION/GLYPH census** (the html
element's computed scroll-behavior + the quote paragraph's first/last
code points, both apps at 1280) — **born RED live on the pre-fix tree
(2-field DRIFT: scrollBehavior smooth/auto + quoteGlyphs 34…34 vs
8220…8221), NO DRIFT after the cure** (all four legs). The trajectory
re-probed post-cure: OURS glides [0,53,285,683,846,929,967,995,1007,
1008] exactly like the reference's [0,27,318,552,686,751,778,796,800].
The landing e2e battery gains the computed pin (+1): the html computes
smooth + the quote renders the U+0022 pair — on the standalone
artifact.

**The mutation proof: 3/3 unit classes bite + the live drift leg + the
e2e leg** — M1 the smooth rule dropped (2 RED) · M2 the glyph reverted
to `&ldquo;` (2 RED) · M3 a `scroll-smooth` class planted on the html
element (2 RED — the purity pins bite) — the live drift leg (the
pre-fix world re-applied → the 2-field DRIFT re-detected; restored →
NO DRIFT on all four legs) — the e2e leg (the glyph mutation rebuilt
into the artifact → the round-15 pin RED; restored, rebuilt, 76/76) —
all files restored byte-identical via the /tmp-backup harness.

## Shipped

The count ladder re-anchored **443/35 (13 seam/196 + 22 source
contracts/247) · e2e 76/8** at every live-tense site (AGENTS · CLAUDE ·
README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 · the worklog Stage Summary
+ the PAD §10 tree-diagram line); the motion-glyph family in the
CLAUDE/SKILL prose lists + the ladder's SOURCE_CONTRACTS; the captures
refreshed (6 `ours-*` faces, the testimonials region verified
rendering); the gate re-proven green (lint 0/0 · tsc 0 · 443/443 · 22
routes · smoke 14/14 · e2e 76/76); parity IDENTICAL · drift NO DRIFT
(all four legs) · the mobile census byte-equivalent; the advisory
ledger unchanged at 10. Pushed as one atomic commit on main via the
SSH wrapper (`--remote` pointing at elegance-flow, the key shredded
after, no new branches).
