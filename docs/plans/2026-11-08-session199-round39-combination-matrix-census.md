# The Round-39 Remediation Plan — the COMBINATION-MATRIX CENSUS + THE STACK-A11Y PIN (session-199)

**The round's fresh angle:** the media-axis COMBINATIONS no probe ever
read. Rounds 29/31/32 censused the three Playwright `emulateMedia` axes
INDIVIDUALLY (reduce · forcedColors · colorScheme) and round-37 probed
the triple stack POSITIVE (IDENTICAL faces both apps) — but the
combination matrix (the pairwise `forced+scheme-dark`, the pairwise
`reduce+scheme-dark`, and the full triple stack) was never censused,
never pinned, and never read by the a11y gate (which sweeps at default
emulation + pure forcedColors only). The exact round-38 pattern: the
axis nobody reads is the axis that rots — here the COMBINATION is the
unread axis.

**The catches:**

- **F-39a (MEDIUM, coverage-gap/census-shape — the round's own audit
  catch, live-diagnosed on both apps while censusing the combination
  matrix)**: the axe-under-combination family is UNPINNED and EXPANDS
  beyond every recorded constant. Under pure forcedColors (light) the
  recorded families are: the landing's 3-node amber-eyebrow collapse
  (the round-33 F-33b pin — "the flag is the browser-emulation
  artifact, not a painted divergence"), the login's ZERO, the
  dashboard's ZERO (the round-32 F-32d clean-sweep pin). Under the
  pairwise `forced+scheme-dark` the artifact family EXPLODES — live
  census (2026-11-08, both apps, axe-core 4.13):
  - `/login`: **color-contrast(11)** — the h1, the subtitle, the
    Google-button span, the "or" divider, both labels, both inputs,
    both bottom buttons + the Sign up span — **byte-identical node
    family on BOTH apps** (the reference's own face; the parity
    doctrine holds).
  - `/` (landing): **color-contrast(16)** both apps — the same count
    as the at-screen sanctioned register with ONE node swap (the
    amber eyebrow family passes under the dark system palette while
    the hero's `md:text-6xl` face flags).
  - `/dashboard` (OURS — the superset's own surface): **color-contrast
    (22)** — the amber eyebrow, the h1, the subtitle, the refresh
    button, the three tab buttons, the search input, the inquiry
    names/emails — the artifact expansion on OUR OWN face.
  - The MECHANISM (decoded this round, the round-33 artifact class
    extended): under `forced+scheme-dark` the forced palette computes
    text as CanvasText WHITE while backgrounds serialize as
    `rgba(0, 0, 0, 0)` (transparent) or `rgba(0, 0, 0, 0.5/0.7)`
    (semi-transparent) — axe cannot resolve the backdrop to a solid
    color and flags the pair. **The RENDER is fully legible** —
    pixel-verified on the login AND the dashboard (white 255,255,255
    glyphs on the 96.5%-black canvas = CanvasText-on-Canvas 21:1) —
    the flags are the axe math artifact, never a painted divergence.
  - The per-axis decomposition (live, /login): default ZERO · reduce
    only ZERO · scheme-dark only ZERO · forced only (light) ZERO ·
    forced+scheme-dark 11 — the finding is COMBINATION-ONLY (the
    unread axis rots in exactly this shape).
  - The gap: NOTHING pins these family SHAPES — a future repaint (or
    an axe/browser change) would silently move the counts with no
    census to catch it. The round-33 precedent pins the forced-light
    collapse family; this round pins the combination families.
- **F-39b (the census — the combination matrix finally read, live on
  both apps)**: every shared face IDENTICAL both apps under EVERY
  stack (pairwise + triple, 1280×800):
  - The per-side constants COMPOSE additively: the reduce collapse
    (REF reveal 0.3s / header 0.5s vs OURS 1e-05s) survives the
    forced-colors system-palette collapse — **the a11y superset
    composes** (OUR reduce collapse holds under every stack, never
    beaten by the forced palette); the body-ink dead face (REF
    rgb(10,10,10) vs OURS rgb(9,11,9→9,9,11)) survives the
    non-forced stacks.
  - The forced palette COMPOSES with the emulated scheme: under
    `forced+scheme-dark` the system palette goes dark (bodyBg black,
    the CTA LinkText `rgb(255, 255, 0)`, the featured card black on
    black-white ink) — IDENTICAL both apps.
  - The fresh constant: `html`'s computed `color-scheme` reads
    `light dark` under forcedColors (vs `normal` at screen) — the
    UA's forced reporting, IDENTICAL both apps, never before
    recorded.
  - The orientation-a11y extension re-probed (the round-37 recorded
    candidate): login/signup at landscape 844×390 — ZERO axe
    violations (re-verified; stays recorded, not this round's ship).

**The standing re-validation at open** (all green, the round-38 ship
state reproduced exactly): lint 0/0 · tsc 0 · 641/641 (57 files) ·
build 22 routes · smoke 14/14 · e2e 130/130 · census MATCH · parity
IDENTICAL both viewports · drift NO DRIFT ×23 (exit 0, the full
runtime) · the mobile-menu census byte-equivalent — the operator's
standing emphasis works exactly as expected, NO Tailwind v4 bug. The
operator's standing login instruction executed (the reference's
authed-world re-census — the PAD §2 record holds: the demo login →
`/`, the derived-title 404 shells, zero cookies, the seven-key
localStorage family). The advisory re-triage: the posture UNCHANGED
(10 advisories, all dev/build/test toolchain-transitive; the runtime
zod 4.6.7 above the `<4.6.6` patched floor — the PAD §10 ledger row
stands, no security driver). The neo-crm stack patterns re-verified
(the identical core pins).

**The remediation, TDD (the pin battery born RED before the cures):**

- **R-2 the born-RED pin battery** — `tests/stack-faces.test.ts`
  (+7, the 45th source-contract family): ① the e2e round-39 describe
  pin (the stack census legs exist — the combination families
  pinned); ② the AGENTS.md doc pin (the stack-posture paragraph's
  exact phrases); ③ the drift `[stack]` leg pin (the 24th leg
  exists); ④ the reduce-block's universal-selector contract (the
  `*, *::before, *::after` + `0.01ms !important` shape in
  globals.css — the collapse mechanism the composition proof rides);
  ⑤ the zero-forced-colors-rules census (zero `@media
  (forced-colors)` rules and zero `forced-color-adjust` overrides in
  src/, comment-stripped — the zero-handling posture every stack
  rides); ⑥ the historical cross-check (the round-32 clean-sweep pin
  + the round-33 3-node collapse pin still exist in the a11y spec —
  the per-axis families hold alongside the new combination ones);
  ⑦ the triple-stack emulation shape pin (the e2e describe rides ALL
  THREE axes in one `emulateMedia` call — never a pairwise-only
  leg). **Born RED 4/7 observed** (the doc/leg/describe pins ①②③ +
  the triple-emulation shape pin ⑦ RED at birth; the standing-fact
  pins ④⑤⑥ green — current-tree facts).
- **R-3 the e2e legs (+3 → 133)** — `tests/e2e/a11y.spec.ts`, the
  round-39 describe: the login's combination family shape
  (`color-contrast(11)` under the full triple stack), the landing's
  (`color-contrast(16)`), and the dashboard's (`color-contrast(22)`
  + the render-legibility computed proof — h1 CanvasText white over
  the black canvas) — all three pinned as the artifact's census
  baseline (a moved count REDs the pin, forcing a conscious
  re-record; the counts re-verified against the standalone artifact
  at execution, re-recorded if the artifact's own census differs).
- **R-4 the mutation proof** — M1 the AGENTS.md note reverted → the
  doc pin RED; M2 a `forced-colors` rule planted in globals.css →
  the zero-rules census RED; M3 the e2e describe's count constant
  bumped → the e2e leg RED; M4 the reduce block's selector narrowed
  → the selector contract RED. All restored cmp-identical (the /tmp
  backup harness).
- **R-5 the drift `[stack]` leg (the 24th)** — `stackFace`: one
  fresh context per app carrying the full triple stack
  (reducedMotion + colorScheme at the context, forcedColors via
  `emulateMedia`); the computed-face sweep (the h1/CTA/featured/
  footer/body faces, the html color-scheme constant, the reveal +
  header transition durations) diffed both apps — the shared faces
  IDENTICAL (the dark system palette), the per-side constants
  (the reduce collapse pair) recorded per side. **The full 24-leg
  battery re-proven live, exit 0.**
- **R-6 the doc cures + the count-ladder re-lock** — the new counts
  (641 + 7 = 648/58 files · e2e 130 + 3 = 133/8); AGENTS.md gains
  the stack-posture paragraph (the combination matrix + the
  artifact-family census + the compose doctrine + the
  never-pin-a-pairwise-only-stack rule) + the drift budget note
  23→24 legs; CLAUDE.md + SKILL.md name the stack-faces family; the
  PAD gains the §2 combination-matrix record + the §7.1/§7.3 gate
  lines re-locked + the §3.2 tree annotation 57→58; README's count
  sites re-locked; the count-ladder census battery's
  SOURCE_CONTRACTS list gains stack-faces (the 45th); the
  probe-load budget pin extended 23→24 legs wrap-safe; the worklog
  round-39 entry + the Stage-Summary verification line re-locked.
- **R-7 the captures refresh** against the dev server (the
  operator's standing instruction) — the timing-family expectation
  documented (the known reveal-timing family).
- **R-8 the full gate + the session log** — lint 0/0 · tsc 0 ·
  648/648 (58 files) · build 22 routes · smoke 14/14 · e2e 133/133;
  `docs/session_72.md`; the ship (one atomic commit on main via the
  SSH wrapper — dry-run → push → remote verification → key
  shredding; no new branches).

**Validation against the tree (pre-execution):** all anchors verified
live this round — the combination families decoded on both apps (the
login's 11-node byte-identical set; the landing's 16; the dashboard's
22); the per-axis decomposition ZERO/ZERO/ZERO/ZERO/11; the render
pixel-verified legible (both the login and the dashboard); the
mechanism (CanvasText-white over the unresolvable transparent
serialization) read live; the reduce-block's universal selector
confirmed in globals.css; the zero-forced-colors-rules posture
confirmed (the round-31 record re-verified); the round-32/33 legs
re-read as the per-axis precedents; the drift leg pattern (the
[forced-colors] template) re-read; the a11y spec's structure
(scanTwoGate + the describe registration pattern) re-read; the
login-page's no-authed-redirect contract confirmed (the e2e legs can
ride the storageState).
