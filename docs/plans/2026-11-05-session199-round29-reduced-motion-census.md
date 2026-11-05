# The Round-29 Remediation Plan — the PREFERS-REDUCED-MOTION census (session-199)

**The round's fresh angle:** the session-50 log's own candidate list named
it — the `prefers-reduced-motion` cross-app census, the media condition
no probe ever emulated. The parity probe, all sixteen drift legs, the
e2e suite and the captures all run at default emulation; the round-28
reveal cure made the stakes real (a twenty-element CSS-transition
family now rides the landing). The census emulated `reduce` on both
apps (1280×800, hydration-safe ordering — the hero read BEFORE any
wheel; the v1 probe artifact: wheeling before hydration means the hero
observer never fires, a probe bug, not a product bug).

## The census (round-29 discovery probes — both apps, guest-only GETs)

- **F-29a (MEDIUM — the reduced-motion divergence family)**: under
  `prefers-reduced-motion: reduce` the two apps diverge on the motion
  family:
  - **The reference ships ZERO reduced-motion handling** (live-probed:
    its rendered stylesheets carry no `prefers-reduced-motion` rule) —
    its raf-driven scroll-reveal STILL ANIMATES the full progression
    under reduce (live-sampled after the wheel ride: opacity
    0.193 → 0.430 → 0.681 → 0.964 → 1 at 120/260/420/700/1100ms), and
    its CSS transitions run at full duration (services cards `0.3s`,
    header `0.5s`).
  - **OURS collapses every CSS transition to `0.01ms`** — the CRM-era
    `@media (prefers-reduced-motion: reduce)` block in `globals.css`
    (carried through the domain transformation, named a standing motion
    contract at PAD §5.4 since the transformation) forces
    `transition-duration: 0.01ms !important` on `*, ::before, ::after`
    — beating the reveal family's inline `transitionDuration` by the
    cascade (author `!important` > inline normal — live-verified: the
    computed duration reads `1e-05s` while the inline style says
    `800ms`). The reveal family SNAPS (opacity 1 at the first
    120ms sample after the wheel; no rideable `0 < o < 1` window), the
    header flip snaps, the card hovers snap.
  - **The identical faces**: the at-rest hidden family (opacity 0 +
    the ∓40X/+30Y/scale(0.96)/∓30X offsets), the settled hero/mount
    family (1/none), and the post-reveal end state (1/none) are
    IDENTICAL under reduce — the divergence exists only mid-flight and
    in the computed transition-duration faces.
  - **The delay survival**: the block kills `transition-duration` but
    NOT `transition-delay` — the hero cascade's staggered snaps still
    space at 0/100/200/600ms (content never sticks hidden).
- **F-29b (the coverage catch)**: no probe ever emulated a media
  condition. The parity probe's `pick()` reads bg/color/fs/fw/lh; the
  drift legs read faces/attrs at default emulation; Playwright's
  `reducedMotion` context option was never used anywhere in the tree.
  The family survived every gate for the same class of reason as the
  round-28 F-28c catch — faces nobody reads under a condition nobody
  emulates.
- **F-29c (the doc-stratum catch — this round's own audit finding)**:
  three stale-doc sites contradict the round-28 ship: PAD §5.4 claims
  the reference's mount-time reveal animations are "NOT reproduced"
  (the family IS reproduced since round-28); PAD §10's LOW row carries
  the same stale claim; PAD §3.1's Layer-1 list says "16 modules" —
  `route-title` (round-25) and `reveal` (round-28) are missing, 18 on
  disk. The count-ladder census pins counts and the doc-pointer census
  pins file references, but neither pins the module list or the motion
  prose — the unpinned-doc class again (the round-7 precedent).

## The decision (the house doctrine applied)

**The reduce block STAYS — a deliberate, now-RECORDED a11y superset**
(the `scroll-behavior: smooth` precedent: a visible functional
superset, documented and pinned). The WCAG 2.3.3 posture for
motion-sensitive users is our own surface standard; the reference's own
gap — zero reduced-motion handling, its full animation family riding
under `reduce` — is recorded per-side and NEVER mirrored (the same
posture as the reference's missing 404 status and its title-lie icons).
The per-side constants join the drift battery's `expectConst` family:
REF `{services: 0.3s, header: 0.5s, mid-flight: animates}` vs OURS
`{services: 1e-05s, header: 1e-05s, mid-flight: snaps}`.

## The cures (TDD — the pin battery born RED on the doc stratum; the mutation proof follows)

1. **The pin battery** `tests/reduced-motion-faces.test.ts` (the 49th
   unit file, the 36th source contract): ① the globals reduce-block
   contract (comment-stripped `globals.css` read: the block exists with
   exactly the three `0.01ms !important`/`1 !important` declarations on
   `*, ::before, ::after` — and does NOT touch `transition-delay`, the
   stagger-spacing survival); ② the seam-purity pin (the reveal seam
   and the landing wiring carry NO reduced-motion handling of their
   own — no `matchMedia`, no `motion-reduce:` utility — the reduce
   behavior flows from the global block alone, keeping the seam pure
   and the DOM byte-stable); ③ the PAD doc cures (§5.4 names the
   reveal family REPRODUCED + the reduce block the recorded superset;
   §3.1 lists 18 modules with `route-title` and `reveal`; the "NOT
   reproduced" phrasing retired root-wide); ④ the recorded per-side
   constants (the reference's zero-handling record + our collapse
   record, pinned as the documented superset registry). Born RED (③
   fails on today's stale PAD; ① ② green by design — the round-27
   4/5-born-RED precedent).
2. **The drift [motion-prefs] leg (the 17th)**: both apps at 1280
   (the family is viewport-independent global CSS): the at-rest family
   diffed (identical hidden), the settled hero/mount family diffed
   (identical), the post-reveal end state diffed (identical), the
   scroll-behavior diffed (both `smooth` — the superset runs under
   reduce on both sides), the reduce-rules census per-side
   (expectConst: REF `[]` vs OURS the three-declaration block), the
   live transition-duration constants per-side (expectConst: REF
   `0.3s`/`0.5s` vs OURS `1e-05s`/`1e-05s`), and the mid-flight
   presence per-side (REF animates — a sample strictly between 0 and 1;
   OURS snaps — the first post-wheel sample already 1).
3. **The e2e leg (+1 → 112)**: a reduce-mode describe in
   `tests/e2e/landing.spec.ts` (`test.use` → `contextOptions.
   reducedMotion: "reduce"`): the artifact under reduce reveals the
   family by snap (at-rest hidden → wheel → opacity 1 by the first
   sample, no mid-flight window → stays 1) — the reduce-mode contract
   that content NEVER sticks hidden (the F-29 hazard the census guards
   against, pinned on the standalone artifact).
4. **The doc cures (F-29c)**: PAD §3.1 (16 → 18 modules, the two
   seams added to the list), PAD §5.4 (the reveal family reproduced
   since round-28; the reduce block the recorded a11y superset with
   the per-side constants), PAD §10 (the stale LOW row retired to a
   CLOSED record), the PAD audit-chain entry + §7.1 split rows
   re-locked, the count ladder re-locked across all five root docs +
   the worklog verification line, the AGENTS.md Tailwind-v4/motion
   notes gaining the reduce-superset line.
5. **The captures** re-run (normal mode — the settled faces are
   unchanged by this round; PIL-verified non-blank), the session log
   `docs/session_52.md` written.

## The execution order

R-1 the pin battery born RED → R-2 the doc cures (PAD §3.1/§5.4/§10)
→ R-3 GREEN + the mutation proof (M1 the block deleted · M2 the
`0.01ms` value edited · M3 "NOT reproduced" restored · M4 the module
list re-shrunk · M5 a delay-kill planted in the block — each must
bite) → R-4 the e2e leg (rebuild the artifact first — the
stale-standalone lesson) → R-5 the drift [motion-prefs] leg → R-6 the
ladder + docs re-lock → R-7 the captures → R-8 the full gate + the
live probes → R-9 the ship.
