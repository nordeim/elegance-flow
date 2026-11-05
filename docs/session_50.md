# Session 50 — Round-28: the scroll-reveal/extreme-viewport census (the twenty-element motion family + the a11y/capture warm-up doctrine)

Round-27 shipped `9f2b8a9` + the owner's session-log push `900c837`
(docs/session_49.md); the owner pushed nothing else, so round-28 opens at
that HEAD — the re-validation rotation's twenty-eighth pass: the workspace
re-cloned over HTTPS after the sandbox recycle, the environment rebuilt
(`.env` → `DATABASE_URL="file:../db/custom.db"` with `db/` at the
repo root · db:push/db:seed · census MATCH), the gate + the live probes
re-proven, a fresh-eyes audit on the extreme-viewport family the
session-48 log's own candidate list named first, the cures landed under
TDD, and the count ladder re-anchored.

## The status validation — every doc claim re-proven at `900c837`

- **Gate**: lint 0/0 · tsc 0 · unit **528/528 (47 files, the round-27
  ladder at the round's open)** · build (**22 routes**, standalone) ·
  smoke **14/14** · e2e **107/107 (8 specs)** — after the
  browser-binary reinstall the workspace reset drops (the known
  round-23 lesson).
- **Live parity**: COMPUTE IDENTICAL at 1280 + 390 (the s18
  serialization class excluded, same paint).
- **Drift**: NO DRIFT — all fifteen legs.
- **Mobile census**: byte-equivalent — same 5 links + amber CTA ·
  link-ride navigates AND closes · the sole delta OUR aria-expanded
  (the operator's standing emphasis: the menu works exactly as
  expected, no Tailwind v4 bug).
- **Configs**: vitest (`vitest.config.ts`) + Playwright
  (`playwright.config.ts`) verified green by the gate; `.env` per
  contract; `.env.example` matches the codebase (the 6-var contract —
  unchanged this round); the sitemap/robots/manifest SEO family
  verified (smoke rung 12, the drift [docs] leg, the pinned batteries).

## The round's fresh angle — the extreme viewport and the motion it exposed

The session-48 log's candidate list named the landscape/320px
extreme-viewport census first. The ladder ride (320px · 390 · 640 ·
768 · 844 landscape · 1280, both apps) opened on a SYSTEMATIC
divergence: the reference's about content column sits +40px right of
ours at EVERY width, its right edge poking past the viewport
(r=1296 at 1280, r=406 at 390), scrollW = clientW + 6 at every
viewport ≥390 — a transient horizontal scrollbar ours never had.
Seventeen live probes decoded the mechanism: the reference ships a
**twenty-element scroll-reveal/mount-cascade family** ours rendered
statically.

### The census (both apps, guest-only GETs + the boundary rides)

- **F-28a (HIGH, VISIBLE — the scroll-reveal family absent)**: the
  reference's signature motion identity, live-decoded element by
  element: the **hero mount cascade** (the `.max-w-3xl` wrapper
  `translateY(40px)` · the amber eyebrow `translateX(-20px)` · the
  h1 spans ×2 `translateY(30px)` · the CTAs wrap `translateY(20px)`,
  staggered 0/100/200/600ms from mount, each ~800ms ease-out,
  live-sampled mid-flight), the **about grid kids ×2**
  `translateX(∓40px)` (the extreme-viewport +40px shift decoded), the
  **services cards ×4** `translateY(30px)` on the cards' OWN
  `transition-all duration-300` class with the **100ms stagger**
  (live-sampled 0.30/0.56/0.78/0.93), the **portfolio cards ×6**
  `scale(0.96)` with the **mount-time auto-reveal** (live-sampled
  twice: all six cards in lockstep, NO stagger, ~400ms — the
  reference's own dominant load behavior), the **testimonials quote
  block** `translateY(20px)` mount-revealed, and the **contact grid
  kids ×2** `translateX(∓30px)`. The reveal END state (`opacity: 1;
  transform: none`) EQUALS our prior static face — the reason every
  at-load probe passed for twenty-seven rounds while the motion was
  absent.
- **F-28b (MEDIUM, DRIFT — the at-rest geometry/scrollbar family)**:
  the pre-reveal translated kids produce the +40/+30 column shifts
  and `scrollW = clientW + 6` at every viewport ≥390; ours was flush
  and clean. Post-reveal both converge identical. (At 320 the
  byte-identical footer-socials row overflows to 351 on BOTH apps —
  already parity.)
- **F-28c (the coverage catch)**: no probe ever read a below-fold
  at-rest opacity/transform — the parity probe's `pick()` reads
  bg/color/fs/fw/lh (transform-independent), every drift leg reads
  faces/attrs/class strings, full-page captures auto-reveal, and
  Playwright's visible is opacity-agnostic. The family survived
  because its faces are exactly what nothing reads at the moment
  nothing reads them.
- **F-28d (the reference's own nondeterminism — recorded, never
  mirrored)**: the portfolio auto-reveal is racy across loads (~75%
  fire; one load stays hidden 5s); one load showed `translateX(-30px)`
  portfolio initials instead of `scale(0.96)`; the about re-hid on a
  wheel-scroll-up once but stayed revealed through a programmatic
  `scrollTo` ride. The DOMINANT family (initial styles stable 3/3
  loads, one-shot reveal, end state = our static state) is what we
  mirror.

### The cure (TDD)

1. **The seam** `src/lib/reveal.ts` — the `REVEAL_FAMILY` constants
   (the twenty-element participant map with the live-probed offsets,
   the ~800ms ease-out decode `cubic-bezier(0.22, 0.61, 0.36, 1)`,
   the 400ms mount family, the services stagger on the cards' own
   class) + the pure `revealStyle` resolver returning the reference's
   two inline states byte-for-byte.
2. **The wiring** — `useRevealGroup` in the landing: one
   IntersectionObserver per element (threshold 0, ONE-SHOT disconnect
   — the dominant semantics), the mount family timer-scheduled, the
   settle cleanup clearing the stagger delay (the services cards'
   hover transitions return unlagged; the settled face carries the
   reference's own post-reveal pair), the specs as MODULE CONSTANTS
   (the in-render spec arrays re-ran the effect every render and
   canceled the settle timers mid-flight — the first-run bug caught
   by the e2e stagger/cascade legs), and the SSR HTML shipping the
   hidden initials (no flash of visible content, no hydration
   mismatch — the reference's SPA mounts hidden, our SSR renders
   hidden).
3. **The deliberate re-pins** — the a11y two-gate's landing audits
   gain the reveal-warming scroll ride (axe-core SKIPS opacity-0
   nodes for color-contrast — live-proven on a fixture — so the
   warm-up keeps the sanctioned citation coverage intact); the
   hero-geometry e2e test and the drift [geometry] leg gain
   settle-waits (a translated ancestor shifts descendant client
   rects — `h1 y=197` breaks mid-cascade); `capture-199.ts` warms
   the reveals before every full-page capture.

### The pins

- `tests/reveal-faces.test.ts` (**+14, the 48th unit file**): ① the
  seam constants (offsets/durations/delays/staggers/the mount
  family) · ② the two inline states + the services own-class decode
  · ③ the landing source contract (the twenty wired elements ride
  the seam) · ④ the no-wiring negatives (the SCROLL label, the hero
  paragraph, the section headers, the stats grid, the chips, the
  selectors, the footer, the form fields — none wired) · ⑤ the
  observer semantics + the settle cleanup · ⑥ the SSR no-FOUC
  contract. **Born RED 14/14**; the mutation proof 5/5 bite (the
  about offset · the hero wrapper wiring · the services stagger ·
  the SCROLL indicator wired · the settle cleanup disabled), all
  restored cmp-identical.
- `tests/e2e/landing.spec.ts` (**+4, 111/111**): the reveal ride
  (at-rest hidden → the wheel ride mid-flight → the end state → the
  one-shot keep), the services stagger (the WHEEL trigger — the
  smooth-scroll glide would leave the cards below the fold), the
  hero cascade at load, and the SSR no-FOUC leg (the raw HTML
  carries the twenty hidden initials).
- `scripts/drift-199.ts`: the **[reveal] census leg (the 16th)** —
  the at-rest hidden family (the deterministic scroll members) + the
  hero post-cascade + the mount-settled family + the post-reveal end
  state diffed at BOTH viewports + the mid-flight motion presence on
  both apps + the transition mechanism per-side (the reference's raf
  0s vs OUR CSS 0.8s decode — the expectConst pattern; the services
  cards' own 0.3s class transition IDENTICAL). **NO DRIFT — all
  SIXTEEN legs.**

## The count ladder re-anchored

**542/48** (13 seam batteries / 196 + 35 source contracts / 346 —
reveal-faces the 35th) · e2e **111/8** · smoke 14/14 · drift legs 16.
The census battery's SOURCE_CONTRACTS list, all five root docs, and
the worklog verification line re-locked; the census battery itself
**7/7 GREEN**. The 14 captures refreshed (the reveal warm-up riding
every full-page capture — the same settled face every prior round
shot, PIL-verified non-blank, per-section content verified).

## The round's live finds (the harness lessons)

- **The motion-family blind spot**: every probe since session-199
  read computed faces at load or auto-revealing full-page captures —
  the reveal family's pre-reveal window is exactly the blind spot;
  the extreme-viewport ladder was the road in.
- **The raf-vs-CSS transition decode**: the reference animates via a
  raf loop writing per-frame inline values (its computed transition
  stays `all 0s ease` mid-flight); OUR CSS-transition decode matches
  the start/end states and the perceived motion, the duration pinned
  per-side (the expectConst pattern).
- **The mount-family distinction**: the portfolio/testimonials
  auto-reveal at MOUNT (~400ms, lockstep) while about/services/
  contact wait for scroll — reading at networkidle+900 conflated them
  and caught mid-flight values; the first-styled-moment read is the
  deterministic one for initials, the late read for settled faces.
- **The specs-identity churn bug**: a `useRevealGroup` effect keyed
  on in-render spec arrays re-runs on EVERY render and its cleanup
  cancels the pending settle/mount timers — the cure: module-constant
  specs; caught by the e2e stagger/cascade legs, invisible to the
  unit source contracts.
- **The axe opacity-0 skip**: axe-core's color-contrast never flags
  `opacity: 0` nodes (live-proven on a fixture) — any a11y audit of
  a reveal-wired surface must warm the reveals first or the coverage
  silently shrinks.
- **The over-matching selector**: `#contact .grid > div` matches the
  form's inner name/email grid too — the direct-kids form
  `#contact > div > div` reads the intended two; the same over-match
  on the reference's side made the drift pass vacuously.
- **The smooth-scroll ride trap**: `scrollIntoView` on OUR
  `scroll-behavior: smooth` superset glides ~300-500ms — an instant
  WHEEL is the deterministic reveal trigger for mid-flight sampling.

Next round opens at the round-28 ship — candidate fresh angles: the
toast family's own computed faces, or the reduced-motion
(prefers-reduced-motion) cross-app census.
