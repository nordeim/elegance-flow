# Session 39 — Round-22: the INTERMEDIATE-VIEWPORT/BOUNDARY census (the widths no probe ever visited)

Round-21 shipped `5dc8ce7` (the google-button census) + the session-log
commit `dcacf09`; the owner pushed nothing new, so round-22 opens at the
same HEAD — the re-validation rotation's twenty-second pass: the
workspace refreshed over HTTPS, the environment rebuilt
(`.env` → `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo
root · db:push/db:seed · census MATCH), the gate + the live probes
re-proven, a fresh-eyes audit on the surfaces no probe ever read, the
positive census recorded, the coverage catch closed under TDD, and the
count ladder re-anchored.

## The status validation — every doc claim re-proven at `dcacf09`

- **Gate**: lint 0/0 · tsc 0 · unit **500/500 (41 files, the round-21
  ladder at the round's open)** · build (**22 routes**, standalone) ·
  smoke **14/14** · e2e **86/86 (8 specs)**.
- **Live parity**: COMPUTE IDENTICAL at 1280 + 390 (the s18
  serialization class excluded, same paint).
- **Drift**: NO DRIFT — the round-21 ten legs.
- **The mobile-menu census**: byte-equivalent both apps; the sole delta
  OUR `aria-expanded` superset.

## The fresh angle — the intermediate-viewport/boundary census

Every probe since session-199 read faces at 1280 (desktop) and 390
(phone) only — the parity script's two viewports, the drift legs'
widths, the e2e device (Desktop Chrome = 1280×720), the captures.
Round-22 probed the two breakpoint BOUNDARIES — sm (640) and md (768) —
plus the never-censused width-independent attribute faces (the footer
social hrefs, every img's loading/decoding attrs).

**The record (positive census — clean, first time probed):**

- **R-22a**: every boundary face COMPUTES IDENTICAL on both apps at
  640 AND 768: the html font-size 16px both (the v4 REM-BREAKPOINT
  CARRIER — v3's px media queries and v4's rem queries agree at the
  default root; a DECLARED root size would shift every boundary on our
  build only); the header flip at 768 (hamburger `display:none`,
  desktop nav + CTA `display:flex` — **the mobile menu's retirement
  boundary works exactly as expected; no Tailwind v4 media-query bug
  on the header family**); the hero h1 48px/43.2px at 640 → 72px/72px
  at 768 (the trap-⑥ boundary flip); the h2 family 36px/34.2px →
  48/60px; the grids (about 592px → 328px×2, work 284×2 → 348×2,
  testimonials 286×2 → 350×2, the contact form pair 286×2 → 154×2);
  the auth card's whole sm:/md: family (input 44→48px at sm, 16→14px
  at md, logo 96×96, title 30px, inner pads 40px → 48px 40px 40px,
  the `sm:hidden` spacer); the mobile panel OPEN at 640 (the
  byte-identical wrap class + the same 5 links + amber CTA); the toast
  viewport ours-side (bottom-right from sm, max-w-420 from md — the
  byte-extracted viewport string's own breakpoints live-verified; the
  reference side unrideable without a toast trigger, the R-21a
  record); the footer socials `#` hrefs ×4 both; the img attrs NONE
  on both apps.

**The catch (curable — the coverage class):**

- **F-22a**: NONE of the boundary faces carried a pin — no unit
  source-contract read the sm:/md: family (the re-pin battery pins
  tokens, not breakpoint classes; the geometry battery pinned
  structures at 1280/390); no e2e leg ever rode 640/768; the drift
  script's ten legs read 1280/390 only. The drift classes that would
  ship invisibly: a sm:/md: class edit anywhere in the boundary
  families, a root `html { font-size: … }` declaration (the v4
  REM-BREAKPOINT SHIFT — every boundary moves 640→720/768→864 at 18px
  while the reference's px-based v3 build stays put), a
  viewport-class regression in the toast or the LOGIN_LAYOUT contract.

## The cure (TDD)

- **The battery** — `tests/viewport-faces.test.ts` (the 42nd unit
  file, 4 checks): the landing's breakpoint-class family (the header
  trio, the h1 text ladder, the five grid flips, the form pair, the
  panel wrap) · the LOGIN_LAYOUT sm:/md: contract · the toast
  viewport's breakpoint string · the root-font-size PURITY (globals
  declares NO font-size on html/:root). **4/4 GREEN** (a pin battery
  on the correct behavior — the catch was the coverage gap). One
  counting-harness iteration: a bare RegExp `.test(` method call in ④
  inflated the count-ladder census (it counts `\b(?:it|test)\(` in
  stripped sources) — the check rewritten to `.match`.
- **The mutation proof 4/4 classes bite**: M1 the h1 ladder edited
  (① RED) · M2 the input's `sm:h-12` dropped (② RED) · M3 the toast's
  `sm:top-auto` dropped (③ RED) · M4 a root font-size planted on the
  REAL html rule (④ RED — the first draft planted it inside the
  round-15 record comment, which the comment-stripper removes: the
  lesson — mutations must land on the live rule). All restored
  `cmp`-identical (the /tmp backup harness).
- **The e2e legs (+2, 88/88)**: both boundary rides on the standalone
  artifact — at 640 the hamburger visible + the desktop nav hidden +
  the h1 at 48px; at 768 the hamburger hidden + the desktop nav and
  CTA visible + the h1 at 72px.
- **The drift leg [viewport] (the 11th)**: the 640/768 computed faces
  on BOTH apps — nine faces per boundary (the html font-size carrier,
  the header trio, the h1 font, the about grid, the card's
  input-height/input-font/inner-pad) + the open-panel census at 640.
  **NO DRIFT — all ELEVEN legs.** One tsc iteration: the diff() calls
  need the `out` array (13 of them missed in the first draft).
- **The count ladder re-anchored**: unit **504/42** (13 seam/196 + 29
  source contracts/308 — viewport-faces the 29th) · e2e **88/8**; the
  census battery's SOURCE_CONTRACTS list + all five root docs + the
  worklog verification line re-locked (the census flagged exactly the
  stale sites; all updated; census 7/7 GREEN).
- **The captures refreshed**: the 9 `ours-*` faces + the NEW
  `ours-landing-768.png` (the md boundary face, full-page) +
  `ours-login-640.png` (the sm boundary of the card), all
  PIL-verified non-blank. (Visual capability unavailable this session
  — the round-20/21 precedent; the evidence stack is the PIL check +
  the drift leg's live DOM read + the e2e assertions.)

## Ship

One atomic commit on main via `docs/ssh_git_wrapper_v3.py` (dry-run →
push → remote verification → key shredding). No new branches.
