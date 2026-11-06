# The Round-30 Remediation Plan — the BODY-INK/PRINT-MEDIA census (session-199)

**The round's fresh angle:** the session-52 candidate list named the
toast family (already censused at session-131 — the reference's toast
system is DOM-dead, F-131c1) and the print-media census. The round-30
discovery probes took the print-media road and it led to a REAL
un-recorded divergence: the print emulation surfaced a body-element
color drift that exists at SCREEN emulation too — a face no probe in
the tree ever read (the parity probe's pick() list starts at the
header; every drift leg reads its own family; the BODY element itself
was never a probe target). The round also executed the operator's
standing login instruction against the reference — the authed-world
re-census (the session-199 empty-shell record, 30 rounds stale,
re-verified live).

## The census (round-30 discovery probes — both apps, guest-only GETs)

- **F-30a (MEDIUM — the body-ink dead-face divergence)**: the BODY
  element's own computed `color` face diverges at rest:
  - **The reference computes `rgb(10, 10, 10)`** — its landing
    bundle's authored rule `body { color: hsl(var(--foreground)) }`
    with the stock shadcn `--foreground: 0 0% 3.9%` (neutral-950
    #0a0a0a).
  - **OURS computes `rgb(9, 9, 11)`** (zinc-950 #09090b) — the
    round-13 single-token re-pin (`--color-foreground: #09090b`) was
    made on the LOGIN-CARD evidence (the reference's PLATFORM bundle —
    its auth card's text computes zinc-950), which sacrificed the body
    face (the LANDING bundle's neutral-950). The two-bundle doctrine
    (round-26) applied to a token: one `--color-foreground` cannot
    match both bundles; round-13 chose the live face (the auth card)
    and the body face was the silent casualty — never recorded.
  - **The face is DEAD on both sides — zero visible drift**: the
    blast-radius census (every text node whose computed color equals
    the body ink) found ZERO true body-riders on either app. Every
    visible text carries explicit ink: the about/projects/contact h2s
    own `text-zinc-950`; the services card div carries
    `text-zinc-950`; the featured card's price rides that div; the
    select owns `text-zinc-950`; the dark sections' texts carry their
    white/zinc inks. The 13 "inheritors" the v3 probe listed on OURS
    are coincidental zinc-950 matches (ancestor-inked, not
    body-riders) — the equality check cannot distinguish them; the
    v5 ancestry probe decoded each one to its explicit-ink ancestor.
  - The footer element's own face is the same class (it inherits the
    body ink on both apps; no text node rides it).
- **F-30b (the print-media census — the round-29 genus extended)**:
  under `media: print` emulation both apps compute IDENTICAL faces on
  every probed surface (header position fixed, the hero h1's white
  ink, the body bg white, `print-color-adjust: economy`, every display
  face) — the ONLY drifted faces are the F-30a body/footer pair. The
  stylesheet census: **both apps ship ZERO `@media print` rules** (the
  reference's own zero-handling posture — its dark sections' white
  text prints white-on-white under economy background stripping, a
  hazard it ships itself; never mirrored, the same posture as its
  missing 404 status). No `@page` rules on either side.
- **F-30c (the coverage catch)**: no probe ever read the body/html
  element faces (the parity pick() list, the drift legs, the e2e
  faces — all start at the header or deeper); no probe ever emulated
  print media (`page.emulateMedia` appears nowhere in the tree). The
  F-28c/F-29b genus: faces nobody reads under conditions nobody
  emulates.
- **The positive censuses (no drift found)**: ① the reference's
  AUTHED-WORLD re-census (the operator's standing login instruction):
  the demo login succeeds and redirects to `/` (the landing); every
  candidate authed route (/dashboard, /profile, /settings, /about,
  /contact) still serves the empty 404 shell ("The page X could not
  be found in this application" — the derived-title family); zero
  cookies (the base44 session rides localStorage) — the session-199
  record holds, 30 rounds later. ② The mobile-menu census
  byte-equivalent (re-proven at open — the standing emphasis, no
  Tailwind v4 bug). ③ The ink-face sweep: every visible text surface
  on the landing computes the IDENTICAL ink on both apps (the two
  other v4-diff classes are the documented s11 `md:leading-none`
  decode and the s18 oklab/rgba serialization).

## The decision (the house doctrine applied)

**The single token STAYS zinc-950** — it is load-bearing on the
login card (the platform bundle's live face, pinned by the drift
login leg since round-13), the toast, and the superset's own
surfaces (the inbox, the shell). Re-pinning it to neutral-950 to
match the reference's dead body face would (a) break the login-card
parity (a LIVE face, probed every drift run) and (b) change our
superset surfaces' ink — a visible change with no parity driver. The
body face is the recorded SACRIFICED side of the single-token
compromise: the s18 serialization-class pattern (a numerically
different, paint-equivalent divergence — equivalent because nothing
paints with it on either side), now RECORDED with per-side constants
and pinned so it can never silently go live (the no-rider pins).

**No print rules ship on our side either** — the reference ships
zero print handling; the byte-mirror posture applies (unlike the
reduce condition, where the WCAG posture demanded the 0.01ms
superset, print carries no criterion in the project's a11y two-gate
baseline; the white-on-white hazard is the reference's own face,
recorded per-side, never "fixed" unilaterally).

## The cures (TDD — the pin battery born RED on the doc stratum; the mutation proof follows)

1. **The pin battery** `tests/body-ink-faces.test.ts` (the 50th unit
   file, the 37th source contract): ① the token contract
   (comment-stripped globals.css: `--color-foreground: #09090b` +
   the body rule `color: var(--color-foreground)`); ② the layout
   body-class contract (`text-foreground` on the body element);
   ③ the no-rider construction (the landing's REF-unclassed surfaces
   carry explicit inks: the services card div's `text-zinc-950`, the
   about/projects/contact h2s' own `text-zinc-950`, the select's
   `text-zinc-950` — the dead face can never silently go live);
   ④ the per-side recorded constants (REF body `rgb(10, 10, 10)` vs
   OURS `rgb(9, 9, 11)` — the documented dead-face divergence
   registry, the single-token compromise's sacrificed side);
   ⑤ the print census pins (globals.css ships exactly TWO @media
   rules — the hover unwrap + the reduced-motion pair — and ZERO
   print rules; the deliberate byte-mirror posture); ⑥ the PAD doc
   cure pin (§5.2 names the body-ink dead-face record). Born RED on
   ⑥ (the row does not exist today); ①–⑤ green by design (the
   round-27/29 born-RED precedent).
2. **The drift [body-ink] leg (the 18th)**: the body + html element
   faces at screen on both apps (the html face IDENTICAL — the UA
   default rgb(0,0,0), no rule on either side; the body face rides
   the per-side expectConst constants — the recorded divergence; the
   footer element's own face the same class), the print-emulation
   census (both apps under `media: print`: the face sweep diffed —
   every face IDENTICAL except the recorded body pair), the sheet
   print-rules census per-side (expectConst: 0 both sides), the
   `print-color-adjust` face (economy both sides).
3. **The e2e legs (+2 → 115)**: a print-mode describe in
   `tests/e2e/landing.spec.ts` (`page.emulateMedia({ media: "print" })`
   in-test — the context-level option does not exist for media, only
   for reducedMotion/colorScheme): ① the artifact under print — the
   fixed header stays fixed, the hero h1 keeps its white ink (the
   recorded hazard face), the zinc-950 surfaces keep their ink, the
   body face asserts OUR recorded constant rgb(9, 9, 11), and the
   rendered sheets carry ZERO print rules; ② the body-ink no-rider
   contract at screen — the un-inked-at-REF surfaces compute
   rgb(9, 9, 11) via their explicit ancestors (the card div / the
   h2s / the select), never via the body default (the blast-radius
   rider census = 0 true riders).
4. **The doc cures (F-30c)**: PAD §5.2 gains the body-ink dead-face
   row (the single-token compromise record with the per-side
   constants); the count ladder re-locked across all five root docs +
   the worklog verification line (551+N/50 · e2e 115/8 · eighteen
   legs); the PAD audit-chain entry; AGENTS.md gains the body-ink
   note in the parity section.
5. **The captures** re-run (no visual change this round — the
   byte-identical expectation; PIL-verified non-blank), the session
   log `docs/session_54.md` written.

## The execution order

R-1 the pin battery born RED → R-2 the PAD cure (§5.2) → R-3 GREEN +
the mutation proof (M1 the token corrupted to #0a0a0a · M2 the body
rule deleted · M3 a print rule planted in globals.css · M4 the
services card's text-zinc-950 removed · M5 the PAD record reverted —
each must bite) → R-4 the e2e legs (the artifact is current — no src
changes this round; rebuild not required unless src changes) → R-5
the drift [body-ink] leg → R-6 the ladder + docs re-lock → R-7 the
captures → R-8 the full gate + the live probes → R-9 the ship.
