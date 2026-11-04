`docs/session_25.md` logs the round-15 re-validation (the motion/glyph
census at the owner's `eb00ab8`); `docs/session_26.md` is the
owner-committed narration transcript of that session. Now at fresh HEAD
`afb2ec2`, this round: the clone re-orientation, the gate + the live
probes + the mobile-menu census re-proven, a fresh-eyes audit — and the
attribute/geometry class closed: the hero's off-canvas structure, the
two new leading decodes, the form's validation mode, and the glyph
quartet now sit under the gate at every tier.

## Re-orientation

Workspace refreshed at `afb2ec2` (the delta from round-15's ship
`8d809ea` is `docs/session_26.md` alone — a doc, no code). The
environment: `.env` carries the mandated contract
`DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), census
**MATCH (3 + 4 users)**. The doc set re-internalized (AGENTS · CLAUDE ·
README · PAD v2.0 · the skill v1.199.0 · the worklog · session_25 +
session_26 · the round-15 plan · the web-application skill + the
catalog · the Tailwind v4 report · the ssh-wrapper runbook). The
neo-crm lineage repo stands as the tech-stack pattern reference — the
patterns already carried verbatim; no new tech-stack surface this
round.

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **443/443 (35 files, the
  round-15 ladder)** · build (**22 routes**) · smoke **14/14** · e2e
  **76/76 (8 specs)** — every count matching the round-15 re-anchor.
- **Live parity**: `scripts/parity-199.ts` — **COMPUTE IDENTICAL at
  1280 + 390** (the oklab/rgba s18 serialization class excluded, same
  paint).
- **Drift**: `scripts/drift-199.ts` — **NO DRIFT** (the round-15
  four-leg probe: content + mobile-menu · auth-card · preflight ·
  motion/glyph).
- **The mobile-menu census** (the operator's standing emphasis):
  byte-equivalent live on BOTH apps at 390×844; link-ride navigates
  `#about` AND closes on both; the sole delta OUR `aria-expanded` (the
  documented invisible a11y superset). **No Tailwind v4 bug** in the
  eight pinned traps.
- The standing config asks re-verified: the `.env`/db-path contract, the
  vitest/playwright configs (the `skills/` exclusions), `.env.example`
  var-by-var (byte-equal to `.env`), the sitemap/SEO family (smoke rung
  12), the TODO/FIXME sweep clean, the advisory ledger **unchanged — 10
  (4 high, 5 moderate, 1 low), all dev-toolchain transitive**; runtime
  zod ^4.6.7 above the GHSA floor; no security driver.

## The audit — the fresh angle: the ATTRIBUTE/GEOMETRY census → the off-canvas hero and the leading/glyph catches

The faces no probe read (parity-199 reads ~40 computed at-rest styles;
the drift probe read text/img/login/preflight/motion faces; the e2e
battery rode behaviors; the smoke ladder curled HTML — NOTHING ever
read (1) every element's raw attribute set, (2) the bounding geometry
of the sections, (3) the computed line-height sweep, (4) the icon-glyph
fingerprints, (5) the form's validation-mode behavior):

**F-16a (CRITICAL, VISIBLE, functional, BOTH viewports — the round's
headline catch): the HERO BACKGROUND STRUCTURE.** The reference nests
its hero photo + gradient inside `<div class="absolute inset-0">`
(taking the img OUT of the flex flow); OURS rendered the `<img>` as a
DIRECT section child — a second IN-FLOW FLEX ITEM. The measured
consequence (dev server AND the standalone artifact): the
`relative max-w-7xl mx-auto px-6 pt-32 pb-20` content column computed
its min-content width (410px at 1280 / 229px at 390) and was pushed
ENTIRELY OFF-CANVAS (x=1280 at desktop, x=390 at phone — the h1, the
eyebrow, the paragraph and both CTAs clipped by the section's
`overflow-hidden`); the hero rendered 1008px tall at 1280 (vs 800) and
927 at 390 (vs 844); the photo rode in-flow (y=18/h=973 at 1280) instead
of absolutely covering; the body scroll heights ran +234/+82. PLUS the
scroll indicator: the reference's `absolute bottom-10 left-6` label
sits INSIDE the content column (renders at [256,719]); OURS sat at
section level ([24,952]) — a second visible-position divergence.
Invisible to every gate: parity reads computed styles (identical — the
class strings byte-mirror); the e2e hero test rode `toBeVisible()` (a
non-empty bounding box passes ENTIRELY off-canvas) + `toContainText`;
the smoke ladder curls the SSR HTML; the drift probes read text/faces,
never geometry; the capture refreshes verified non-blank regions, never
the hero's pixel content. The only pure-DOM structure divergence on the
whole landing (the normalized tree census, svg internals excluded).

**F-16b (HIGH, VISIBLE): the `leading-snug` × `md:text-3xl` decode —
the trap-⑥ genus, two NEW members.** The testimonial quote paragraph
computes **41.25px** on our v4 build (1.375 × 30) where the live
reference computes **36px**: v3-era Tailwind pairs `text-3xl` with
line-height 36px and emits the `md:` media rules after the plain
utilities, so the reference's plain `leading-snug` is DEAD at md+;
our v4 sorts the leading utility LAST at every width. Below md both
compute 33px. Five quote lines × 5.25px = the ENTIRE +26px testimonials
section delta, proven by the full landing leading sweep.

**F-16c (HIGH, VISIBLE): the `leading-relaxed` × `md:text-xl` decode.**
The hero paragraph computes **32.5px** on ours where the reference
computes **28px** (v3's text-xl pairing wins in its cascade at md+;
29.25px on both below md). The h1/h2 family carried this decode from
session-199; these two carriers were never decoded.

**F-16d (MEDIUM, VISIBLE, behavioral): the contact form's VALIDATION
MODE.** OURS carried `noValidate` — an EMPTY submit FIRED the submit
event and POSTed to `/api/inquiry` (400 → our error toast; probe-verified
live: `submitEventFired: true, posts: ["/api/inquiry"]`). The reference
NATIVE-VALIDATES: the submit event never fires, no POST leaves the
page, the browser paints its own bubbles (`submitEventFired: false,
posts: []`, the same four `required` controls on both apps — the
attribute census). The native gate is the byte-mirror face; the Zod 400
backstop stays for non-empty-but-invalid payloads.

**F-16e (HIGH, VISIBLE, glyph family): the ICON-GLYPH census.** Our
lucide-react 0.525 ships REDESIGNED glyphs where the reference ships
its older lucide-era set — 13 of 18 index-matched landing icons
identical, the menu icon differing only in internals (line vs path
primitives — the SAME painted geometry, recorded, kept lucide-react),
and FOUR glyphs visibly different drawings: the palette (the
reference's circles-and-body vs our teardrop), the megaphone
(horn-and-handle vs the solid horn), the mail (the 1.94-radius arc vs
our 2.009), the phone (the classic handset vs our continuous-stroke
redraw) — PLUS the login card's Google G (the classic 22.56-based
quartet vs our 23.5-based redraw). Cured surgically: the four glyphs +
the G now carry the reference's EXACT path data in its exact child
order on the exact lucide skeleton (`src/components/ui/reference-icons.tsx`
+ the login-card quartet), the other 14 stay lucide-react; the rejected
alternative (pinning lucide-react down to the reference's unreadable
era) recorded.

**The records (no cure):** the accent bar's class-vs-inline-style (the
F-15b genus, identical computed face); our 8 explicit `type="button"`
(inert outside forms); the OPTION `selected` attr; `initial-scale=1`
vs `1.0` (the viewport meta's platform serialization); our 18
`aria-hidden` icon supersets; the reference's auth-card `transform`
class (the v3 translate carrier — our v4 decodes without it).

**The positive censuses (clean, first time probed):** every OTHER
section's geometry IDENTICAL at 1280 (about 1018 · services 806 ·
contact 711 · footer 137); the img attribute family null-on-null with
identical natural sizes; the fonts/caret-color/accent-color/
color-scheme/::selection families identical; the hero photo's src+alt
byte-identical (round-12's pins re-proven); the auth card's Lock glyph
identical.

## The TDD cure (born RED → green → proven to bite)

`tests/geometry-faces.test.ts` (+19 checks, the 36th unit file) **born
RED 18/19 on the live tree** — the hero wrapper (×2: the img+gradient
inside `absolute inset-0` + the section-opens-with-wrapper negative),
the scroll label's nesting (×2: the inside form + the section-level
negative), the leading decodes (×2), the validation mode (×1), the four
glyph paths + the skeleton (×5), the glyph sites + the import negative
(×3), the GoogleIcon quartet + its retired forms (×2), the auth Mail
swap (×1) — all failed on the real divergences; the one keep-green
(the new-lucide path data never appears in OUR source — the divergence
rode the package) passed by design. The cures: the hero wrapper div +
the scroll-label move inside the content column in
`landing-page.tsx`; `leading-snug md:leading-9` +
`leading-relaxed md:leading-7`; the `noValidate` drop; the
reference-glyph components (`src/components/ui/reference-icons.tsx`)
swapped in at the six glyph sites (the services palette/megaphone, the
contact mail/phone, the auth mail family); the login GoogleIcon's
quartet re-pinned to the reference's 22.56-based paths.

`scripts/drift-199.ts` gains the **GEOMETRY census** (both apps, 1280 +
390: the hero rect, the content column's x — the off-canvas detector,
the h1 rect, the scroll label's x, the quote-P + hero-P computed
line-heights, the form's noValidate, the four glyph fingerprints — plus
the login Google-G fingerprint) — **born RED live on the pre-fix tree
(20-field DRIFT across the two viewports: the hero 1008/927 vs 800/844,
contentX 1280/390 vs 232/0, the line-heights 41.25/32.5 vs 36/28, the
glyphs, the validation mode), NO DRIFT after the cure (all five legs)**.
`tests/e2e/landing.spec.ts` (+3) pins the faces on the standalone
artifact: the hero geometry (the content column IN-CANVAS at both
viewports, the 800px hero, the h1 box [256,197,768,288], the label
inside the column), the leading decodes (36px/28px at md+, 33px/29.25px
at phone), and the native-validation + glyph pin (the empty submit
never leaves the page — no POST — and the reference's palette/phone
shapes render).

**The mutation proof: 6/6 unit classes bite + the live drift leg + the
e2e leg** — M1 the hero wrapper dropped (2 RED: ①②; and rebuilt into
the artifact → the round-16 e2e geometry pin RED) · M2 the quote decode
reverted (1 RED) · M3 noValidate restored (1 RED) · M4 the palette glyph
reverted to the new-lucide body (2 RED: the path pin + the retired-form
negative) · M5 the GoogleIcon quartet reverted (2 RED) · M6 the scroll
label moved back to section level (2 RED) — the live drift leg (the
pre-fix world re-applied → the 20-field DRIFT re-detected; restored →
NO DRIFT all five legs) — the e2e leg (the M1 mutation rebuilt into
the artifact → the geometry pin RED; restored, rebuilt) — all files
restored byte-identical via the /tmp-backup harness (`cmp`-verified).

## Shipped

The count ladder re-anchored **462/36 (13 seam/196 + 23 source
contracts/266) · e2e 79/8** at every live-tense site (AGENTS · CLAUDE ·
README · PAD §7.1/§7.3/§10 + the tree diagram · SKILL §7 · the worklog
Stage Summary); the geometry-faces family in the CLAUDE/SKILL prose
lists + the ladder's SOURCE_CONTRACTS; the trap-⑥ expansion (the two
new leading-decode members) at AGENTS/SKILL §3/the Tailwind report's
round-16 appendix; the captures refreshed (the 6 `ours-*` faces — the
hero content column renders IN-CANVAS for the first time); the gate
re-proven green (lint 0/0 · tsc 0 · 462/462 · 22 routes · smoke 14/14 ·
e2e 79/79); parity IDENTICAL · drift NO DRIFT (all five legs) · the
mobile census byte-equivalent; the advisory ledger unchanged at 10.
Pushed as one atomic commit on main via the SSH wrapper (`--remote`
pointing at elegance-flow, the key shredded after, no new branches).
