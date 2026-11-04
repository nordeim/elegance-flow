# The Round-22 Remediation Plan — the INTERMEDIATE-VIEWPORT/BOUNDARY census (session-199)

**The round's fresh angle:** the two breakpoint BOUNDARIES — sm (640) and
md (768) — that no probe ever visited. Every probe since session-199 read
faces at 1280 (desktop) and 390 (phone) only: the parity script's two
viewports, the drift legs' widths, the e2e device (Desktop Chrome =
1280×720), the captures. Yet the boundaries carry whole computed
families: the landing's header flip (`hidden md:flex` nav /
`md:hidden` hamburger — the mobile menu's own retirement boundary, the
operator's standing emphasis), the hero h1's `text-5xl md:text-7xl
lg:text-8xl`, the grid flips (`sm:grid-cols-2` services/work + the
contact form pair, `md:grid-cols-2` about/contact, `md:grid-cols-5`
testimonials), the h2 family's trap-⑥ leading decodes at their own
boundary, the auth card's whole sm:/md: family (`h-11 sm:h-12` inputs,
`h-20 sm:h-24` logo, `text-2xl sm:text-3xl` title, `p-8 sm:p-10
md:pt-12 md:pb-10 md:px-10` inner pads, `sm:flex-row` footer, the
`sm:hidden` trailing spacer, `text-base md:text-sm` input ink), the
toast viewport's own breakpoints (`sm:bottom-0 sm:right-0 sm:top-auto
sm:flex-col` + `md:max-w-[420px]`), and the html font-size — the v4
REM-BREAKPOINT CARRIER (v3's media queries were px-based; v4's are
rem-based — a non-16px root would SHIFT every breakpoint on our build
while the reference's v3 build stayed put; the standing Tailwind-v4
hunt). Plus the never-censused width-independent attribute faces: the
footer social hrefs + rel/target, every img's loading/decoding attrs.

## The census (round-22 discovery probes 1–2, both apps, side-effect-free)

- **R-22a (RECORD — the positive census, clean, first time probed)**:
  every boundary face COMPUTES IDENTICAL on both apps at 640 AND 768:
  - html font-size **16px both apps** (the v4 rem-breakpoint carrier
    matches v3's px breakpoints at the default root — no shift).
  - The header flip at 768 IDENTICAL: hamburger `display:none` +
    desktop nav `display:flex` + CTA `display:flex` on both (at 640:
    hamburger `block` + nav/CTA `none`). **The mobile menu's retirement
    boundary works exactly as expected — no Tailwind v4 media-query bug
    on the header family** (the md: queries compute identically in both
    builds).
  - The hero h1 **48px/43.2px at 640 → 72px/72px at 768** both apps
    (the trap-⑥ boundary flip itself).
  - The h2 family **36px/34.2px at 640 → 48/60px with leading=font at
    768** both apps (the round-16 leading decodes' own boundary).
  - The grids: about **592px → 328px×2** (the `md:grid-cols-2` flip),
    work **284×2 → 348×2**, testimonials **286×2 → 350×2**, the contact
    form pair **286×2 → 154×2** — all IDENTICAL both apps.
  - The auth card family: input h **48px** at 640 (the `sm:h-12` flip)
    + submit 48px, input font **16px → 14px** at 768 (`md:text-sm`),
    logo **96×96** (`sm:h-24`), title **30px** (`sm:text-3xl`),
    subtitle 16px, inner pad **40px → 48px 40px 40px**
    (`sm:p-10`→`md:pt-12/pb-10/px-10`), the trailing `sm:hidden` spacer
    display:none from sm — all IDENTICAL both apps.
  - The mobile panel OPEN at 640 (the between-boundary state): the
    byte-identical wrap class `md:hidden bg-zinc-950 border-t
    border-white/10 px-6 py-6 flex flex-col gap-4` + the same 5 links +
    the amber CTA on both apps.
  - The toast viewport (OURS-side ride, the honest Google toast): fixed
    bottom-right from sm (640: `top:auto` resolved, `bottom:0px`) and
    `max-width:420px` from md (768) — the byte-extracted viewport class
    string's own breakpoints, live-verified (the reference side has no
    side-effect-free toast trigger — the R-21a record; its viewport
    classes were byte-extracted at session-7).
  - The footer socials: `#` hrefs ×4 (Instagram/Twitter/LinkedIn/
    Dribbble) on both — no target/rel attrs on either. The img census:
    **no loading/decoding/draggable attrs on either app** (the
    reference ships no lazy-loading family; ours matches).
- **F-22a (the coverage catch — the curable class)**: NONE of these
  boundary faces carries a pin. No unit source-contract reads the
  sm:/md: family (the re-pin battery pins tokens, not the breakpoint
  classes; the geometry battery pins structures at 1280/390); no e2e
  leg ever rode 640/768 (the device is 1280×720); the drift script's
  ten legs read 1280/390 only. The drift classes that would ship
  invisibly: a sm:/md: class edit anywhere in the boundary families, a
  root `html { font-size: … }` declaration (the v4 REM-BREAKPOINT SHIFT
  — every boundary moves 640→720/768→864 at 18px while every gate
  stays green; the reference's px-based v3 build would not move), a
  viewport-class regression in the toast or the LOGIN_LAYOUT contract.
  The round-19/20/21 pin doctrine (every user-visible face gets a pin)
  had never reached the intermediate widths.

## The cure set (TDD)

- **R-1** `tests/viewport-faces.test.ts` (the 42nd unit file) — the
  source-contract pin battery, comment-stripped reads (the vacuous-pin
  doctrine): ① the landing's breakpoint-class family (the header's
  `hidden md:flex` / `md:hidden` / `hidden md:inline-flex`, the h1's
  `text-5xl md:text-7xl lg:text-8xl`, the grids' `sm:grid-cols-2
  lg:grid-cols-4` / `sm:grid-cols-2 lg:grid-cols-3` / `md:grid-cols-2`
  ×2 / `md:grid-cols-5` / the contact form pair's `sm:grid-cols-2`);
  ② the LOGIN_LAYOUT sm:/md: family (the `h-11 … sm:h-12` input +
  submit, `h-20 … sm:h-24` logo, `text-2xl sm:text-3xl` title,
  `sm:text-base` subtitle, `p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10`
  inner, `space-y-4 sm:space-y-5` form, `space-y-3 sm:space-y-4`
  fields, `sm:flex-row` footer, the `sm:hidden` trailing spacer, the
  input's `text-base md:text-sm`); ③ the toast viewport's breakpoint
  string (the `top-0 … flex-col-reverse … p-4 sm:bottom-0 sm:right-0
  sm:top-auto sm:flex-col md:max-w-[420px]` family); ④ the
  root-font-size PURITY (globals.css carries NO html/root font-size
  declaration — the UA 16px default is the rem-breakpoint carrier; a
  declared root size shifts every v4 boundary — the standing v4 hunt's
  live member).
- **R-2** `tests/e2e/landing.spec.ts` (+2, 88/88): the boundary rides
  on the standalone artifact — at 640 the hamburger visible + the
  desktop nav hidden + the h1 at 48px; at 768 the hamburger hidden +
  the desktop nav and CTA visible + the h1 at 72px (the computed
  boundary faces, behavioral).
- **R-3** `scripts/drift-199.ts` gains the **[viewport] census leg (the
  11th)**: the 640/768 computed faces on BOTH apps (the header flip,
  the h1 font, the about grid, the card's input-height/inner-pad/
  input-font, the open panel's wrap class at 640) — each diffed REF vs
  OURS, NO DRIFT the standing bar.
- **R-4** the count ladder re-anchor (unit 500 → 500+N / 41 → 42
  files; e2e 86 → 88) at every live-tense site + the census battery's
  SOURCE_CONTRACTS list (the battery's own census flags the stale
  sites — the authoritative list, never hand-grepped).
- **R-5** the mutation proof: M1 a boundary class edited in the
  landing's h1 (① RED) · M2 the LOGIN_LAYOUT input's `sm:h-12` dropped
  (② RED) · M3 the toast viewport's `sm:top-auto` dropped (③ RED) · M4
  a root font-size declaration planted in globals.css (④ RED). All
  restored cmp-identical (the /tmp backup harness).
- **R-6** the captures: the `ours-*` faces refreshed + the NEW
  `ours-landing-768.png` (the md boundary face) + `ours-login-640.png`
  (the sm boundary of the card) — PIL-verified non-blank.
- **R-7** the doc lockstep: `docs/session_39.md` + this plan's Phase-5
  + the worklog round-22 entry + the PAD §10 round-22 clause + the
  SKILL v1.210.0 (the §7 battery entry + the census record) + the
  count re-anchors in all five root docs.
- **R-8** the full gate re-proof (lint 0/0 · tsc 0 · unit · build 22
  routes · smoke 14/14 · e2e 88/88) + the final live probes (parity ·
  drift all ELEVEN legs · the mobile census).
- **R-9** ship: one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --key-file <key>` (dry-run → push →
  remote verification → key shredding). No new branches.

## Phase 5 — The execution record (filled at ship)

- **R-1** ✓ `tests/viewport-faces.test.ts` (the 42nd unit file, 4
  checks) — **4/4 GREEN** (the pin battery: the boundary faces were
  already correct — the catch was the coverage gap, F-22a). One
  counting-harness iteration: a bare RegExp `.test(` method call in ④
  inflated the count-ladder census (it counts `\b(?:it|test)\(` in
  comment-stripped sources) — the check rewritten to `.match`, the
  live census reading 504 exactly.
- **R-2** ✓ the e2e legs (`tests/e2e/landing.spec.ts` +2, **88/88**):
  both boundary rides on the standalone artifact — at 640 the
  hamburger visible + the desktop nav hidden + the h1 at 48px; at 768
  the hamburger hidden + the desktop nav and CTA visible + the h1 at
  72px.
- **R-3** ✓ the `[viewport]` census leg (the 11th) — the 640/768
  computed faces on BOTH apps (nine faces per boundary: the html
  font-size carrier, the header trio, the h1 font, the about grid, the
  card's input-height/input-font/inner-pad) + the open-panel census at
  640 (the byte-identical wrap class + the same links). **NO DRIFT —
  all ELEVEN legs.** One tsc iteration: the diff() calls need the
  `out` array (13 of them missed in the first draft).
- **R-4** ✓ the count ladder re-anchored at **504/42** (13 seam/196 +
  29 source contracts/308 — viewport-faces the 29th) · e2e **88/8**;
  the census battery's SOURCE_CONTRACTS list + all five root docs +
  the worklog verification line re-locked (the census flagged exactly
  the stale sites; all updated; the census battery itself 7/7 GREEN).
- **R-5** ✓ the mutation proof: **4/4 classes bite** (M1 the h1 ladder
  edited ① RED · M2 the input's `sm:h-12` dropped ② RED · M3 the
  toast's `sm:top-auto` dropped ③ RED · M4 a root font-size planted on
  the REAL html rule ④ RED — the first draft planted it inside the
  round-15 record comment, which the comment-stripper removes: the
  lesson — mutations must land on the live rule), all restored
  `cmp`-identical (the /tmp backup harness).
- **R-6** ✓ the captures: the 9 `ours-*` faces refreshed + the NEW
  `ours-landing-768.png` (the md boundary face, full-page) +
  `ours-login-640.png` (the sm boundary of the card), all
  PIL-verified non-blank. (Visual capability unavailable this session
  — the round-20/21 precedent; the evidence stack is the PIL check +
  the drift leg's live DOM read + the e2e assertions.)
- **R-7** ✓ the doc lockstep: `docs/session_39.md` + this Phase-5 +
  the worklog round-22 entry + the PAD §10 round-22 clause + the SKILL
  v1.210.0 (the §7 battery entry) + the count re-anchors in all five
  root docs.
- **R-8** ✓ the full gate re-proof: **lint 0/0 · tsc 0 · 504/504 (42
  files) · build 22 routes · smoke 14/14 · e2e 88/88** (the two
  boundary legs green on the fresh artifact) · parity **COMPUTE
  IDENTICAL** both viewports · drift **NO DRIFT all ELEVEN legs** ·
  the mobile census **byte-equivalent**.
- **R-9** ✓ one atomic commit on main via the ssh wrapper (dry-run →
  push → remote verification → key shredding).
