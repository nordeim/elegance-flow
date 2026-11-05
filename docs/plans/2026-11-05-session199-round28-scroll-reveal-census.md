# The Round-28 Remediation Plan — the SCROLL-REVEAL/EXTREME-VIEWPORT census (session-199)

**The round's fresh angle:** the session-48 log's own candidate list named
it first — the landscape/320px extreme-viewport family no probe ever
visited. The census opened there (320px + 844×390 + a full-width ladder
ride) and the extreme viewport exposed a SYSTEMATIC geometry divergence:
the reference's about content column sits +40px right of ours at EVERY
width and its right edge pokes past the viewport (r=1296 at 1280,
r=406 at 390), scrollW = clientW+6 at every viewport ≥390 (a transient
horizontal scrollbar). Seventeen live probes decoded the mechanism.

## The census (round-28 discovery probes — both apps, guest-only GETs)

- **F-28a (HIGH, VISIBLE — the scroll-reveal family absent from our
  mirror)**: the reference ships a **twenty-element reveal animation
  family** ours renders statically — the reference's signature motion
  identity, invisible to every gate for twenty-seven rounds:
  - **The hero mount cascade** (fires at every load, in view): the
    `.max-w-3xl` wrapper `translateY(40px)`, the amber eyebrow
    `translateX(-20px)`, the h1 spans ×2 `translateY(30px)`, the CTAs
    wrap `translateY(20px)` — staggered (delays ≈ 0/100/200/600ms from
    mount, live-sampled: the wrap reaches opacity 1 at ~800ms, the CTAs
    start at ~680ms), each ~700–800ms ease-out.
  - **About** grid kids ×2: `translateX(∓40px)`, ~800ms ease-out raf,
    reveal on scroll (mid-flight live-sampled: opacity 0.656 /
    translateX ∓13.6 at t+400ms; end state `opacity: 1; transform:
    none` — EXACTLY our static faces).
  - **Services** cards ×4: `translateY(30px)`, the cards' OWN
    `transition-all duration-300` class (`all 0.3s
    cubic-bezier(0.4, 0, 0.2, 1)`), **100ms stagger** (live-sampled:
    cards at 0.30/0.56/0.78/0.93 opacity in sequence).
  - **Portfolio** cards ×6: `scale(0.96)` at mount (3/3 loads stable).
  - **Testimonials** quote block (the div inside `.md:col-span-3`):
    `translateY(20px)`.
  - **Contact** grid kids ×2: `translateX(∓30px)`, ~800ms ease-out.
  OURS: no wiring — every element statically visible. The post-reveal
  end state of the reference EQUALS our current static state (the
  parity probes' at-load in-view reads and the full-page captures both
  land on the revealed face — the family's blind spot).
- **F-28b (MEDIUM, DRIFT — the at-rest geometry/scrollbar family)**: at
  rest the translated kids produce the +40px about-column shift, the
  +30px contact-form shift, and `scrollW = clientW + 6` at every
  viewport ≥390 (the transient horizontal scrollbar; at 320 the
  byte-identical footer-socials row overflows to 351 on BOTH apps —
  already parity). OURS: flush columns, zero overflow. Post-reveal both
  converge identical — the divergence exists only in the pre-reveal
  window, which no probe ever censused.
- **F-28c (the coverage catch)**: no probe ever read a below-fold
  at-rest opacity/transform. The parity probe's `pick()` reads
  bg/color/fs/fw/lh (transform-independent); the drift legs read
  faces/attributes/class strings; full-page captures auto-reveal; the
  e2e visibility assertions pass on opacity-0 elements (Playwright's
  visible = non-empty box + visibility, opacity-agnostic). The family
  survived because its faces are exactly what nothing reads at the
  moment nothing reads them.
- **F-28d (the reference's own nondeterminism — recorded, NOT
  mirrored)**: the portfolio auto-reveals at load in ~75% of loads (a
  mount race — mid-flight `scale(0.9636)` caught at the first styled
  read); one load showed `translateX(-30px)` portfolio initials instead
  of `scale(0.96)`; the about re-hid on a wheel-scroll-up once but
  stayed revealed through a programmatic `scrollTo` ride (the trigger
  wiring is inconsistent on the reference itself). The DOMINANT family
  (initial styles stable 3/3 loads, one-shot reveal, end state = our
  static state) is what we mirror; the races are recorded here as the
  reference's own bugs.

## The cures (TDD — the pin batteries born RED; the mutation proof follows)

1. **The seam** `src/lib/reveal.ts` — the `REVEAL_FAMILY` constants
   (the twenty-element participant map with per-element transforms,
   the ~800ms ease-out decode `cubic-bezier(0.22, 0.61, 0.36, 1)`, the
   hero cascade delays 0/100/200/600ms, the services 100ms stagger on
   the cards' own 300ms class transition) + the pure
   `revealStyle(spec, revealed)` resolver returning the two inline
   states (`opacity: 0; transform: <offset>` → `opacity: 1; transform:
   none`), the inline transition decode, and the stagger delay.
2. **The landing wiring** — `useRevealGroup` in
   `landing-page.tsx`: one `IntersectionObserver` per element
   (threshold 0, one-shot disconnect — the dominant semantics; the
   hero elements intersect at mount → the cascade rides the same
   observer + the delay constants). Inline styles only (no classes, no
   wrappers — the DOM stays byte-identical; the drift legs' class-attr
   reads ride untouched). The services cards ride their OWN
   `transition-all duration-300` class (the inline style carries only
   opacity/transform/delay — the byte-closest decode of the
   reference's computed `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`); every
   element's inline style CLEARS at settle (delay+duration+80ms) so
   the settled DOM equals today's DOM and the services cards' hover
   transitions return unlagged. The SSR HTML ships the initial styles
   (no flash-of-visible — the reference's SPA mounts hidden; our SSR
   renders hidden).
3. **The deliberate re-pins** (gate-impact cures, all live-verified
   necessary): the a11y two-gate's landing audits gain the
   reveal-warming scroll ride (axe-core SKIPS opacity-0 nodes for
   color-contrast — live-proven on a fixture — so the audit coverage
   would silently shrink without it; the warm-up keeps the sanctioned
   citation register intact); the hero-geometry e2e test and the drift
   [geometry] leg gain settle-waits (a translated ancestor shifts
   descendant client rects — `h1 y=197` breaks mid-cascade; poll
   `transform === "none"`); `capture-199.ts` gains the warm-up scroll
   before every full-page capture (otherwise below-fold sections shoot
   at opacity 0).
4. **The pins** — `tests/reveal-faces.test.ts` (the 48th unit file):
   ① the seam constants (offsets/durations/delays/staggers), ② the
   landing source contract (the twenty wired elements ride the seam;
   comment-stripped source reads), ③ the two inline states + the
   services-cards-own-transition decode + the settle cleanup, ④ the
   NO-WIRING negatives (the SCROLL label, the section headers, the
   stats grid, the filter chips, the testimonial selectors, the
   footer, the form fields — none wired), ⑤ the SSR initial-styles
   contract (grep-able in the rendered HTML). Born RED.
5. **The e2e legs** (+4): the reveal ride (at-rest hidden → mid-flight
   `0 < opacity < 1` → post-reveal `opacity 1/transform none` → the
   one-shot stays revealed after scroll-up), the services stagger ride
   (card0 leads card3), the hero cascade leg (mount-time motion +
   settles), the SSR initial-styles leg (fetch "/" — the raw HTML
   carries the initials — the no-FOUC proof).
6. **The drift [reveal] leg (NEW, the sixteenth)**: both apps at 1280
   + 390 — the at-rest family (opacity 0 + the transforms, diffed),
   the mid-flight motion presence, the post-reveal family (diffed),
   the hero post-cascade state; the transition-duration rides the
   per-side constant pattern (OUR 0.8s CSS decode vs the reference's
   0s raf mechanism — the expectConst precedent from the round-27
   login leg).
7. **The ladder + docs** — the count ladder re-locked; every touched
   root doc + the worklog verification line re-locked; the captures
   refreshed (with the warm-up); the session log written.

## The execution order

R-1 the pin battery born RED → R-2 the seam + the wiring + the
re-pins → R-3 GREEN + the mutation proof → R-4 the e2e legs (rebuild
the artifact first — the stale-standalone lesson) → R-5 the drift
[reveal] leg → R-6 the ladder + the docs → R-7 the captures → R-8 the
full gate + the live probes → R-9 the ship.
