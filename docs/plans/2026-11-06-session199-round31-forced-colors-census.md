# The Round-31 Remediation Plan — the FORCED-COLORS/THEME-FACE census (session-199)

**The round's fresh angle:** the session-54 candidate list named the
forced-colors cross-app census — "the last un-emulated media axis in
Playwright's emulateMedia surface" — with the form-control theme faces
(`accent-color`, `color-scheme`) as the alternate road. The round-31
discovery probes took BOTH: forced-colors completes the media-axis set
(round-29 reduce · round-30 print · round-31 forced-colors — screen,
colorScheme excepted only because the reference ships no dark-mode face
to probe), and the theme faces fold in as a bonus positive census. The
round also re-executed the operator's standing login instruction — the
reference's authed-world re-census (the round-30 record re-verified
live).

## The census (round-31 discovery probes — both apps, guest-only GETs + the one sanctioned demo login)

- **F-31a (the forced-colors census — a POSITIVE census, the round-22
  precedent)**: under `forcedColors: "active"` (Chromium's Windows
  High-Contrast emulation) both apps compute IDENTICAL faces on every
  probed element at 1280×800:
  - the LANDING family: html/body, the hero h1, the header, the amber
    CTA (`rgb(0, 0, 159)` — the system LinkText), the FEATURED card
    (Canvas white bg + CanvasText black ink — the amber collapses),
    the non-featured cards, the services h2, the contact
    input/select/textarea, the footer — every face collapses to the
    system palette (CanvasText `rgb(0,0,0)` / Canvas `rgb(255,255,255)`
    / LinkText `rgb(0,0,159)`), IDENTICAL both apps;
  - the LOGIN family (the auth-card parity surface): the card, the
    email/password inputs (both keep the reference's own
    `rgba(255, 255, 255, 0.5)` translucency — the forced-colors
    override preserves alpha-adjusted canvases; identical both sides),
    the submit, the Google button, the h1 — ALL IDENTICAL;
  - `forced-color-adjust` computes `auto` on every probed element on
    both apps (no opt-out, no `forced-color-adjust: none` anywhere);
  - the system-color resolution: CanvasText → `rgb(0, 0, 0)`, Canvas →
    `rgb(255, 255, 255)` on both apps;
  - OURS' superset surfaces (the `/dashboard` inbox) collapse cleanly
    to the system palette (no breakage, adjust auto) — no reference
    counterpart exists (the empty-shell record), so this is a
    spot-check, not a parity leg.
- **F-31b (the stylesheet census — the substring trap decoded)**: both
  apps ship ZERO true `@media (forced-colors)` rules — the census walks
  `CSSMediaRule` objects (the `conditionText` check), NOT substring
  matches: OURS' rendered bundle DOES contain the string
  "forced-colors" inside the giant `@layer utilities` block (Tailwind
  v4's own `forced-color-adjust-*` utility CLASS definitions —
  `.forced-color-adjust-auto` etc.), which a naive substring census
  would miscount as a rule. The v2 probe's false positive is itself a
  recorded lesson (the same genus as the round-30 `.test(`
  census-collision: the counting rule must match the thing counted).
- **F-31c (the featured-card class-literal note — the s11 doctrine
  instance)**: the reference's featured card div carries
  `relative p-8 flex flex-col gap-5 group transition-all duration-300
  text-zinc-950` — NO `bg-amber-500` class — yet computes
  `rgb(245, 158, 11)` (amber-500) at screen: its bundle inks the card
  by its own mechanism (the base44 runtime's composed styles). OURS
  spells the amber in the class string (`… text-zinc-950
  bg-amber-500`) — the COMPUTED face identical at screen (parity
  pins the face, never the literal — the s11 doctrine), and under
  forced-colors both collapse to Canvas identically. No drift; the
  decode is recorded so no future class-string diff probe mistakes it
  for one.
- **F-31d (the form-control theme faces — the session-54 alternate
  candidate, folded in)**: `accent-color: auto`,
  `color-scheme: normal`, and the caret family (html caret
  `rgb(0, 0, 0)`; the login email caret `rgb(9, 9, 11)` — zinc-950)
  compute IDENTICAL on both apps, landing and login. A positive
  census: neither app declares `accent-color` or `color-scheme`
  anywhere (the UA defaults ride).
- **F-31e (the coverage catch — the F-28c/F-29b/F-30c genus
  completed)**: `page.emulateMedia({ forcedColors: "active" })`
  appears NOWHERE in the tree — the e2e suite, the drift legs, the
  parity probe and the captures all run at default emulation. With
  round-29 (reduce), round-30 (print) and round-31 (forced-colors),
  every media axis Playwright's `emulateMedia` surface exposes is now
  censused.
- **The positive authed-world re-census (the operator's standing
  login instruction)**: the demo login still succeeds → redirects to
  `/` (the landing); every candidate authed route (/dashboard,
  /profile, /settings, /about, /contact) still serves the
  derived-title 404 shell; zero cookies (the base44 session rides
  localStorage) — the round-30 PAD §2 record re-verified live
  2026-11-06 (round-31).

## The decision (the house doctrine applied)

**No source changes ship.** The census is positive on every parity
surface: the forced-colors collapse is browser-driven on both apps,
no `@media (forced-colors)` rule or `forced-color-adjust` override
exists on either side, and the reference's own zero-handling posture
is the byte-mirror default we already ship (the same posture as print
— no WCAG forced-colors criterion rides the project's a11y two-gate
baseline, and the browser's own forced-colors mode renders both apps
identically legible). The cures are the COVERAGE pins (the round-29
precedent: a positive census still gets its battery, its e2e legs
and its drift leg, so the posture can never silently change).

## The cures (TDD — the pin battery born RED on the doc stratum; the mutation proof follows)

1. **The pin battery** `tests/forced-colors-faces.test.ts` (the 51st
   unit file, the 38th source contract): ① the zero-`@media
   (forced-colors)` posture pin (comment-stripped globals.css — no
   forced-colors media rule, no `forced-color-adjust` declaration;
   the only @media rule stays the reduce pair); ② the
   featured-card class decode pin (OURS spells `bg-amber-500` in the
   class the reference's own DOM does not carry — the computed-face
   s11 doctrine instance); ③ the per-side recorded constants (the
   system-palette collapse registry: CanvasText/Canvas/LinkText +
   the adjust-auto face); ④ the theme-face constants (accent-color
   auto, color-scheme normal, the zinc-950 login caret — nobody
   declares either property); ⑤ the substring-trap lesson pin (the
   utilities-layer class definitions are not media rules — the
   CSSMediaRule-walk counting rule); ⑥ the PAD doc cure pin (§5.2
   names the forced-colors census record).
2. **The e2e legs (+2 → 117)**: a forced-colors describe in
   `tests/e2e/landing.spec.ts` (`page.emulateMedia({ forcedColors:
   "active" })` in-test): ① the artifact under forced-colors — the
   h1 collapses to CanvasText, the featured card to Canvas, the
   header CTA to LinkText `rgb(0, 0, 159)`, `forced-color-adjust:
   auto` on the probed family, and the rendered sheets carry ZERO
   forced-colors media rules (the CSSMediaRule walk); ② the
   screen-restore contract — after `emulateMedia({ forcedColors:
   "none" })` the amber face returns (the collapse never sticks).
3. **The drift [forced-colors] leg (the 19th)**: the face sweep
   (html/h1/header/CTA/featured-card/non-featured/h2/input/select/
   footer) diffed at `forcedColors: "active"` on both apps + the
   per-side media-rule census (expectConst: 0 both sides — the
   CSSMediaRule walk) + the adjust-auto census + the LinkText
   constant pinned per-side.
4. **The doc cures (F-31e)**: PAD §5.2 gains the forced-colors
   census record (the positive-census entry with the per-side
   constants and the substring-trap note); the count ladder
   re-locked across all five root docs + the worklog verification
   line (565+N/51 · e2e 117/8 · nineteen legs); the PAD audit-chain
   entry; AGENTS.md gains the forced-colors note beside the
   body-ink paragraph (the media-axis set completed).
5. **The captures** re-run (no visual change this round — the
   byte-identical expectation at default emulation; PIL-verified
   non-blank), the session log `docs/session_56.md` written.

## The execution order

R-1 the pin battery born RED → R-2 the PAD cure (§5.2) → R-3 GREEN +
the mutation proof (M1 a forced-colors media rule planted in
globals.css · M2 a `forced-color-adjust: none` override planted · M3
the featured card's `bg-amber-500` class removed · M4 the PAD record
reverted · M5 the theme-face claim corrupted — each must bite) →
R-4 the e2e legs (the artifact is current — no src changes this
round; rebuild not required unless src changes) → R-5 the drift
[forced-colors] leg → R-6 the ladder + docs re-lock → R-7 the
captures → R-8 the full gate + the live probes → R-9 the ship.
