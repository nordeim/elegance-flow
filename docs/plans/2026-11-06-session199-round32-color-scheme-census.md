# The Round-32 Remediation Plan — the COLOR-SCHEME/MEDIA-SURFACE-COMPLETION census (session-199)

**The round's fresh angle:** the session-56 candidate list's first road —
the color-scheme emulation axis, the one axis round-31 excepted ("the
reference ships no dark-mode face to probe" — every OTHER emulateMedia
axis already rode a leg). The round-32 discovery probe took it live on
BOTH apps (dark and light), folded in the session-56 candidate 3 (the
axe-core sweep under forced colors on the superset's own /dashboard), and
re-executed the operator's standing login instruction (the authed-world
re-census).

## The census (round-32 discovery probes — both apps, guest-only GETs + the one sanctioned demo login)

- **F-32a (the color-scheme census — a POSITIVE census, the round-22/31
  precedent)**: under `colorScheme: "dark"` AND `colorScheme: "light"`
  emulation, both apps compute IDENTICAL faces on every probed element
  at 1280×800 — and NOTHING MOVES: the landing family (html
  `color-scheme: normal` both apps both schemes; body bg white; the h1
  white ink; the header transparent; the footer zinc-950) and the login
  auth-card family (the email input's translucent slate-50 face) compute
  the SAME values under dark, light, and default emulation. Neither app
  declares `color-scheme` anywhere; neither ships a single
  `prefers-color-scheme` media rule (the CSSMediaRule walk — ZERO both
  sides); the UA default (`normal`) rides. The reference ships no
  dark-mode face; OURS mirrors the zero-handling posture (the
  byte-mirror default — the same posture as print and forced-colors).
- **F-32b (the scheme-invariance decode — the known per-side constants
  never move)**: the recorded divergences are SCHEME-INVARIANT — the
  body-ink dead face (REF `rgb(10, 10, 10)` vs OURS `rgb(9, 9, 11)` —
  the round-30 single-token compromise, unchanged under both emulations)
  and the login email's translucent fill (REF `rgba(248, 250, 252, 0.5)`
  vs OURS `oklab(0.984146 -0.00124145 -0.00314122 / 0.5)` — the s18
  serialization class, numerically equal paint). The probe's CTA
  selector artifact (REF `a.bg-amber-500` → null) is the F-31c
  class-literal decode again: the reference inks its CTA by its own
  mechanism, OURS spells the class — the computed faces identical
  (parity-pinned), so the selector miss is the recorded s11 instance,
  not drift.
- **F-32c (the coverage completion — the F-28c/F-29b/F-30c/F-31e genus
  CLOSED at the surface level)**: `page.emulateMedia({ colorScheme })`
  appeared nowhere in the tree before round-32. With round-29 (reduce),
  round-30 (print), round-31 (forced-colors) and round-32 (colorScheme),
  EVERY axis of Playwright's `emulateMedia` surface now rides a census
  leg — the round-31 "excepted only because" note retires.
- **F-32d (the superset forced-colors a11y sweep — the session-56
  candidate 3, folded in)**: axe-core under `forcedColors: "active"` on
  OUR `/dashboard` (the superset surface the round-31 spot-check read
  faces on but never scanned): **ZERO violations** — structural clean
  AND contrast clean under the system-palette collapse (the inbox's
  amber-700/zinc-600 inks and the explicit-surface construction survive
  the Canvas/CanvasText collapse legibly). A positive find: the
  superset's own a11y posture holds under the last un-scanned condition.
- **The positive authed-world re-census (the operator's standing login
  instruction)**: the demo login still succeeds → redirects to `/` (the
  landing); every candidate authed route (/dashboard, /profile,
  /settings, /about, /contact) still serves the derived-title 404 shell
  (titles like "Dashboard | EleganceFlow", innerText ≈ 85–89 chars);
  zero cookies (the base44 session rides localStorage: token,
  base44_access_token, base44_analytics_session_id). The PAD §2 record
  re-verified live 2026-11-06 (round-32).

## The decision (the house doctrine applied)

**No source changes ship.** The census is positive on every parity
surface: neither app answers the color-scheme preference (no rule, no
declaration, no face movement), and the reference's own zero-handling
posture is the byte-mirror default we already ship (the print /
forced-colors posture — no WCAG dark-mode criterion rides the a11y
two-gate baseline). The dashboard sweep is clean. The cures are the
COVERAGE pins (the round-29/31 precedent: a positive census still gets
its battery, its e2e legs and its drift leg, so the posture can never
silently change).

## The cures (TDD — the pin battery born RED on the doc stratum; the mutation proof follows)

1. **The pin battery** `tests/color-scheme-faces.test.ts` (the 52nd
   unit file, the 39th source contract): ① the zero-`prefers-color-scheme`
   posture pin (comment-stripped globals.css — the only @media rule
   stays the reduce pair; no color-scheme declaration; no dark: variant
   anywhere in the seam) + the landing/auth seam purity; ② the per-side
   scheme-invariance registry (the recorded constants unchanged under
   dark/light: the body-ink dead face + the login email's s18
   serialization pair); ③ the color-scheme constant record
   (`color-scheme: normal` both apps both schemes, zero scheme media
   rules both sides — the CSSMediaRule-walk counting rule); ④ the
   CTA class-literal decode note (the s11 instance — the probe
   selector's null on the reference, not drift); ⑤ the superset
   forced-colors a11y record (the /dashboard zero-violations census);
   ⑥ the PAD doc cure pin (§5.2 names the color-scheme census record).
2. **The e2e legs (+3 → 120)**: a color-scheme describe in
   `tests/e2e/landing.spec.ts` (+2: the dark-and-light census leg —
   zero `prefers-color-scheme` rules in the rendered sheets + the faces
   unchanged under both emulations + `color-scheme: normal`; the
   screen-restore contract — after `emulateMedia({ colorScheme: "light" })`
   → `"dark"` → `"light"` round-trip the faces stay identical, the
   emulation never sticks); the forced-colors a11y sweep leg in
   `tests/e2e/a11y.spec.ts` (+1: axe-core injected under
   `forcedColors: "active"` on /dashboard — structural zero + contrast
   zero, the F-32d census pinned on the artifact).
3. **The drift `[color-scheme]` leg (the 20th)**: the face sweep
   (html color-scheme, body bg/ink, h1, header, footer, the login
   email family) diffed at BOTH schemes on both apps + the per-side
   scheme-media-rule census (expectConst: 0 both sides) + the
   scheme-invariance assertion (each side's faces identical under dark
   and light — the nothing-moves contract).
4. **The doc cures (F-32c)**: PAD §5.2 gains the color-scheme census
   record (the positive census with the scheme-invariance decode + the
   media-surface completion note); §2's authed-world record gains the
   round-32 re-verification; the count ladder re-locked across all five
   root docs + the worklog verification line (577+N/52 · e2e 120/8 ·
   twenty legs); the §7.1 split rows re-locked; AGENTS.md's
   forced-colors paragraph extends to name the completed surface set.
5. **The captures** re-run (no visual change this round — the
   byte-identical expectation at default emulation; PIL-verified
   non-blank), the session log `docs/session_58.md` written.

## The execution order

R-1 the pin battery born RED → R-2 the PAD cure (§5.2 + §2) → R-3
GREEN + the mutation proof (M1 a prefers-color-scheme media rule
planted in globals.css · M2 a `color-scheme: dark` declaration planted
· M3 a `dark:` variant planted in the landing seam · M4 the PAD record
reverted · M5 the battery's scheme-invariance registry corrupted — each
must bite) → R-4 the e2e legs (the artifact is current — no src changes
this round; rebuild not required unless src changes) → R-5 the drift
`[color-scheme]` leg → R-6 the ladder + docs re-lock → R-7 the captures
→ R-8 the full gate + the live probes → R-9 the ship.
