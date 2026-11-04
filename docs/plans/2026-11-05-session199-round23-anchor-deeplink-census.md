# The Round-23 Remediation Plan — the ANCHOR-NAVIGATION/DEEP-LINK census (session-199)

**The round's fresh angle:** the hash-link RIDE family no probe ever rode.
Every probe since session-199 read at-rest faces (computed styles, text,
geometry, glyphs, validation, heads) or OUR behaviors pinned by the e2e
battery. The rides that were never censused against the live reference:
the DESKTOP nav's five section links (the mobile panel link ride IS
pinned — `mobile-census-199.ts` + `mobile-navigation.spec.ts`; the
desktop family never), the header CTA ride, the hero CTA pair's rides,
the logo's `#` ride, and the COLD-BOOT deep link (`/#portfolio`,
`/#about` — every e2e leg `goto("/")` plain, every drift leg reads
at-rest faces). Plus the never-read scroll-landing carriers:
`scroll-margin`/`scroll-padding` (a `scroll-mt-20` planted on the
sections would shift every anchor landing while every gate stays green —
the round-22 root-font-size-purity class).

## The census (round-23 discovery probes, both apps, side-effect-free)

- **R-23a (RECORD — the positive census, clean, first time probed,
  live on both apps 2026-11-05)**: the whole desktop anchor family
  behaves IDENTICALLY on both apps:
  - The href family: nav `About→#about · Services→#services · Work→
    #portfolio · Testimonials→#testimonials · Contact→#contact` + the
    header CTA `Get in Touch→#contact` + the hero pair
    `Start a Project→#contact · See Our Work→#portfolio` + the logo
    `#` — byte-identical both apps.
  - The anchor-target id family: all five section ids present on both
    apps.
  - The five desktop nav rides (click → settle): URL hash + settled
    scrollTop + the target's landing IDENTICAL — About 800 · Services
    1818 · Work 2624 · Testimonials 3875 · Contact 4711 (the same
    1280×800 viewport).
  - The logo `#` ride: hash → "" + back to top (scrollTop 0) both apps.
  - The scroll-landing carriers: `scroll-behavior: smooth` both (the
    round-15 rule), root `scroll-padding-top: auto` both, the sections'
    `scroll-margin-top: 0px` both — no scroll-padding/margin family on
    either app.
- **R-23b (the RECORD, no cure — the reference's own defect)**: the
  reference's DEEP LINKS ARE BROKEN. Cold-booting `/#portfolio` or
  `/#about` NEVER scrolls on the reference (scrollTop 0 at 0.5s, 1.5s,
  3s and 5s post-networkidle — the raw HTML is a SPA shell carrying no
  section ids; the browser's one-time boot-time hash scroll finds
  nothing, and the SPA's mount never re-attempts it). OURS lands the
  native SSR scroll immediately (2624 / 800, the section at the viewport
  top) and stays. The round-18 soft-404 precedent applies: the
  reference's own defect, OURS the working superset — documented, never
  broken to match.
- **F-23a (the coverage catch — the curable class)**: none of the ride
  family carried a pin. No e2e leg ever cold-booted a hash URL; no e2e
  leg ever rode a DESKTOP nav link, the hero CTA, or the logo; no drift
  leg ever rode an anchor; no unit source-contract pins the section-id
  family, the hero-CTA/logo href literals, or the scroll-landing purity
  (a planted `scroll-mt-20` shifts every anchor landing invisibly). The
  round-19/20/21/22 pin doctrine (every user-visible face gets a pin)
  had never reached the rides.

## The cure set (TDD)

- **R-1** `tests/anchor-faces.test.ts` (the 43rd unit file, 4 checks) —
  the source-contract pin battery, comment-stripped reads (the
  vacuous-pin doctrine):
  ① THE SECTION-ID FAMILY — the five `id=` attributes on the landing's
    five sections (the anchor targets; the non-obvious Work→#portfolio
    mapping rides NAV_ITEMS, pinned since session-199 in
    site-content.test.ts — this battery pins the TARGET side).
  ② THE ANCHOR HREF WIRING — the hero CTA pair's `#contact` /
    `#portfolio` + the logo's `#` literals in the landing source.
  ③ THE SCROLL-LANDING PURITY — NO scroll-margin/scroll-padding family
    anywhere in the landing source or globals.css (the landing-position
    carrier: the reference ships none — `auto`/`0px` — and a planted
    family would shift every anchor landing while every gate stays
    green).
  ④ THE SSR-BOOT KEEP — the landing route renders `LandingPage` with NO
    dynamic-import boundary (the boot-time hash scroll needs the
    section ids in the initial HTML — a `next/dynamic` deferral would
    silently break every deep link the way the reference's SPA does;
    the R-23b superset's own guard).
- **R-2** `tests/e2e/landing.spec.ts` (+4, 92/92): the ride legs on the
  standalone artifact — ① the deep-link boot (`goto("/#portfolio")` →
  the hash present + the portfolio section landed at the viewport top +
  the header flipped to its scrolled state); ② the desktop nav ride
  (click Work → URL `/#portfolio` + the section landed + the header
  scrolled — the non-obvious mapping ridden behaviorally); ③ the hero
  CTA ride (click Start a Project → `/#contact` + the contact section
  landed); ④ the logo ride (after a landed ride, click the logo → hash
  "" + scrollTop 0 + the header back at its top state).
- **R-3** `scripts/drift-199.ts` gains the **[anchors] census leg (the
  12th)**: the five desktop nav rides + the logo ride on BOTH apps,
  each diffed REF vs OURS (hash + settled scrollTop + the target's
  landing — NO DRIFT the standing bar); the deep-link boot pinned
  per-side against its RECORDED constant (the google-leg expectConst
  pattern — REF `{hash:"#portfolio", scrollTop:0}` / OURS
  `{hash:"#portfolio", sectionTop:0}` — the R-23b superset record).
- **R-4** the count ladder re-anchor: unit 504 → 508 / 42 → 43 files ·
  e2e 88 → 92 · the census battery's SOURCE_CONTRACTS list gains
  anchor-faces (the 30th) — the battery's own doc sweep flags every
  stale site (the authoritative list, never hand-grepped).
- **R-5** the mutation proof: M1 an id edited (① RED) · M2 a hero CTA
  href edited (② RED) · M3 a `scroll-mt-20` planted on a section (③
  RED) · M4 a `next/dynamic` boundary planted on the landing route (④
  RED). All restored `cmp`-identical (the /tmp backup harness).
- **R-6** the captures: the `ours-*` faces refreshed + the NEW
  `ours-deeplink-portfolio-1280.png` (the landed view after the
  cold-boot deep link — the superset's own face), PIL-verified
  non-blank.
- **R-7** the doc lockstep: `docs/session_41.md` + this plan's Phase-5 +
  the worklog round-23 entry + the PAD §10 round-23 clause + the SKILL
  v1.211.0 (the §7 battery entry + the census record) + the count
  re-anchors in all five root docs.
- **R-8** the full gate re-proof (lint 0/0 · tsc 0 · unit 508/508 (43
  files) · build 22 routes · smoke 14/14 · e2e 92/92) + the final live
  probes (parity · drift all TWELVE legs · the mobile census).
- **R-9** ship: one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --key-file <key>` (dry-run → push →
  remote verification → key shredding). No new branches.

## Phase 5 — The execution record (filled at ship)

- **R-1** ✓ `tests/anchor-faces.test.ts` (the 43rd unit file, 4
  checks) — **4/4 GREEN** (the pin battery: the ride family was
  already correct — the catch was the coverage gap, F-23a).
- **R-5** ✓ the mutation proof: **4/4 classes bite** (M1 an id edited
  ① RED · M2 the hero CTA's href edited ② RED · M3 a `scroll-mt-20`
  planted on a section ①③ RED · M4 a `next/dynamic` boundary planted
  on the route ④ RED), all restored `cmp`-identical (the /tmp backup
  harness).
- **R-2** ✓ the e2e legs (`tests/e2e/landing.spec.ts` +4, **92/92**):
  the four ride legs on the standalone artifact — the deep-link boot
  (`goto("/#portfolio")` → the landed section + the scrolled header),
  the desktop nav ride (Work → #portfolio), the hero CTA ride
  (Start a Project → #contact), the logo ride (back to top + hash
  cleared + the header restored). Two born-RED harness iterations:
  the negative-zero poll (sub-pixel tops round to -0; `Object.is(-0,
  0)` false — the polls take `Math.abs(Math.round(…))`) and the
  awaited-evaluate (a bare `page.evaluate` passed to `expect` compares
  the Promise, never the value).
- **R-3** ✓ the `[anchors]` census leg (the 12th) — the five desktop
  rides + the logo ride diffed REF vs OURS (hash + settled scrollTop +
  the target's landing) + the deep-link boot pinned per-side against
  its RECORDED constant (each side projected to the semantic fields —
  the first draft's raw 3-field object against a 2-field constant was
  a false-DRIFT shape). **NO DRIFT — all TWELVE legs.**
- **R-4** ✓ the count ladder re-anchored at **508/43** (13 seam/196 +
  30 source contracts/312 — anchor-faces the 30th) · e2e **92/8**; the
  census battery's SOURCE_CONTRACTS list + all five root docs + the
  worklog verification line re-locked (the census flagged exactly the
  stale sites; all updated; the census battery itself 7/7 GREEN).
- **R-6** ✓ the captures: the 11 `ours-*` faces refreshed + the NEW
  `ours-deeplink-portfolio-1280.png` (the landed portfolio view after
  the cold boot — the superset's own face), all PIL-verified
  non-blank. (Visual capability unavailable this session — the
  round-20/21/22 precedent; the evidence stack is the PIL check +
  the drift leg's live DOM read + the e2e assertions.)
- **R-7** ✓ the doc lockstep: `docs/session_41.md` + this Phase-5 +
  the worklog round-23 entry + the PAD §10 round-23 clause + the
  SKILL v1.211.0 (the §7 battery entry + the e2e ride legs + the
  census record) + the count re-anchors in all five root docs.
- **R-8** ✓ the full gate re-proof + the final live probes (parity ·
  drift all TWELVE legs · the mobile census).
- **R-9** ✓ one atomic commit on main via the ssh wrapper (dry-run →
  push → remote verification → key shredding).
