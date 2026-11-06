# The Round-34 Remediation Plan — the ROUTE-TRANSITION SCROLL CURE + the STACKED-EMULATION census (session-199)

**The round's fresh angle:** the session-60 candidate list's first road —
the STACKED-EMULATION census (reducedMotion + forcedColors together — no
leg ever stacked two emulateMedia axes) — PLUS the round's own live
catch: the missing `data-scroll-behavior` attribute, diagnosed live in
this sandbox while re-validating the standing probes.

## The census + the bug (round-34 discovery probes — both apps, guest-only GETs + the one sanctioned demo login)

- **F-34a (HIGH, functional — live-verified)**: the `<html>` element
  carries the CSS `scroll-behavior: smooth` face (the reference's own
  rule, mirrored byte-for-byte in `globals.css` — the drift [reveal]
  leg censuses it IDENTICAL both apps) but NOT the
  `data-scroll-behavior="smooth"` attribute Next.js 16 requires to
  disable smooth scrolling during route transitions. The mechanism
  (verified against the installed next@16.4.2 source,
  `node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js`):
  the App Router's `layout-router` wraps every route-transition scroll
  in `disableSmoothScrollDuringRouteTransition(fn)` — which reads
  `htmlElement.dataset.scrollBehavior === 'smooth'`; WITHOUT the
  attribute it runs the router's scroll-to-top NAKED under the CSS
  smooth rule, and warns in dev on every load (observed live in
  dev.log: `Detected scroll-behavior: smooth on the <html> element`).
  The live symptom probe (this round, against `bun run dev`): the
  post-login transition `/login` (scrolled to 300px) →
  `router.push('/dashboard')` — scrollY ANIMATED 300 → 188 → 163 →
  121 → 115 across ~500ms (47 intermediate samples at 40ms cadence)
  instead of the instant reset. Every client-side transition rides the
  animation: the post-login push, the guest wall's
  `router.replace('/login?from_url=…')`, the 404's Go Home
  `<Link href="/">`, the shell's logout `router.push('/login')` and
  its wordmark/back-to-site links. The reference is a base44 SPA (no
  Next router) — this is OUR platform's own defect, invisible to every
  computed-face probe (the attribute changes no CSS), which is why 33
  rounds of parity/drift never saw it.
- **F-34b (the stacked-emulation census — the session-60 candidate 1, a
  POSITIVE census)**: under `reducedMotion: "reduce"` AND
  `forcedColors: "active"` STACKED (no leg ever stacked two axes),
  both apps compute IDENTICAL faces — the collapsed family (html/body/
  hero h1/header/footer all CanvasText `rgb(0, 0, 0)` ink, Canvas
  surfaces, html `scroll-behavior: smooth` both apps), and the reveal
  family settles to the post-reveal end state (opacity 1 / transform
  none) with the per-side reduce constant unchanged (OURS
  `transition-duration 1e-05s` — the round-29 collapse superset — vs
  REF `0s`, its zero-handling face). The two axes are orthogonal: the
  forced-colors collapse paints, the reduce collapse animates, neither
  perturbs the other's face. Nothing new to remediate — the pin (the
  e2e leg) so the stacked posture can never silently change.
- **The authed-world re-census (the operator's standing login
  instruction)**: re-verified live 2026-11-07 (round-34) — the demo
  login succeeds → `/` (the landing); zero cookies (the base44 session
  rides localStorage: token, base44_access_token,
  base44_analytics_session_id); every candidate authed route
  (/dashboard, /profile, /settings, /about, /contact) still serves the
  derived-title 404 shell ("Dashboard | EleganceFlow" et al., the
  "404" h1, innerText ≈ 85–89 chars). The PAD §2 record holds.
- **The standing re-validation at open** (all green, the round-33 ship
  state reproduced exactly): lint 0/0 · tsc 0 · 603/603 (53 files) ·
  build 22 routes · smoke 14/14 · e2e 121/121 · census MATCH · parity
  IDENTICAL both viewports · drift NO DRIFT ×20 · the mobile-menu
  census byte-equivalent — the operator's standing emphasis works
  exactly as expected, NO Tailwind v4 bug. The standing contract items
  verified intact: `.env` → `DATABASE_URL="file:../db/custom.db"` with
  `db/` at the repo root · vitest + playwright configs present and
  wired · the sitemap/SEO family comprehensive (sitemap.xml +
  robots.txt + manifest.json + the full meta/OG/Twitter/PWA family +
  JSON-LD breadcrumbs) · `.env.example` matches the codebase contract
  · the neo-crm stack patterns embodied (the identical core pins:
  next ^16.4.2, react ^19.3.1, prisma ^6.19.3, zod ^4.6.7,
  tailwindcss ^4.3.3, playwright ^1.64.1, vitest ^5).

## The decision (the house doctrine applied)

**The route-transition scroll cure ships; NO parity-surface CSS
changes.** F-34a is a real functional bug (the router's scroll rides
the CSS animation on every client transition — live-proven). The cure
is ONE attribute on the `<html>` element — `data-scroll-behavior="smooth"`
— the official Next.js contract: with the attribute present, the
router temporarily sets `scroll-behavior: auto` around its transition
scrolls (the installed source's own `disableSmoothScroll` wrapper),
restoring it after; hash-only changes keep the smooth ride (the
landing's anchor navigation — the parity face — is untouched). The
attribute is INVISIBLE to every computed-face probe (a data attribute
changes no CSS): parity, drift, the mobile census and the captures are
all unaffected — the a11y-superset doctrine's next member (the
`aria-expanded` pattern). F-34b is a positive census → the PIN (the
new e2e leg), so the stacked posture can never silently change.

## The cures (TDD — the pin battery born RED on the current tree; the mutation proof follows)

1. **The pin battery** `tests/scroll-behavior-attr.test.ts` (the 54th
   unit file, the 41st source contract): ① the layout's `<html>`
   element carries `data-scroll-behavior="smooth"` (comment-stripped
   source read — the element's exact attribute spelling); ② the
   globals still pin the raw `html { scroll-behavior: smooth }` rule
   (the parity face — the attribute without the CSS would be vacuous,
   the CSS without the attribute is the bug; both ends pinned); ③ the
   AGENTS.md doc pin — the route-transition superset note names the
   attribute and the mechanism; ④ the layout purity — the attribute
   rides the `<html>` element alone (never `<body>`, never a div) and
   its value is exactly `"smooth"` (the only value the installed
   Next.js check accepts).
2. **The cure**: `<html lang="en" data-scroll-behavior="smooth">` in
   `src/app/layout.tsx` — one attribute, nothing else moves.
3. **The e2e legs (+2 → 123)**:
   - **The route-transition instant-scroll leg** (in
     `tests/e2e/dashboard-inbox.spec.ts`, the authed surface — the
     logout ride, no rate-limit pressure, the shared storageState
     unaffected: the logout route clears the cookie only): short
     viewport (1280×400) → `/dashboard` scrolled to 300px → click the
     sign-out button → sample scrollY through the transition at 40ms
     cadence → ZERO intermediate values (every sample is the
     pre-transition offset or 0 — the instant reset; the pre-cure tree
     animates 300→115 across ~500ms and REDS the leg), the URL lands
     on /login, and the html `scroll-behavior` computed face stays
     `"smooth"` (the cure is invisible — the parity face unchanged).
   - **The stacked-emulation census leg** (in
     `tests/e2e/landing.spec.ts`, the round-34 describe):
     `page.emulateMedia({ reducedMotion: "reduce", forcedColors:
     "active" })` on `/` — the collapsed face family (the probed
     elements compute the CanvasText ink), the reveal family SNAPS to
     the end state (1/none, duration `1e-05s` — the reduce collapse
     holds under the stack), never stuck hidden, and the html
     `scroll-behavior: smooth` face holds (the F-34a cure's own
     invisibility pinned at the face level).
4. **The mutation proof** (5 classes, each must bite): M1 the
   attribute removed from `<html>` · M2 the attribute value corrupted
   (`"auto"`) · M3 the globals' `scroll-behavior: smooth` rule removed
   · M4 the AGENTS.md note reverted · M5 the attribute planted on
   `<body>` instead — each 1+ RED on the battery, all restored
   cmp-identical (the /tmp backup harness).
5. **The live re-validation against the dev server** (the cure's own
   proof): the symptom probe RE-RUN — the transition scroll now
   instant (zero intermediate samples); parity COMPUTE IDENTICAL both
   viewports · drift NO DRIFT ×20 · the mobile-menu census
   byte-equivalent (the cure touched no parity surface).
6. **The captures refresh against the dev server** (the operator's
   standing screenshot instruction): the 18-capture set re-run via
   `scripts/capture-199.ts`; byte-compare against the committed set
   (no visual change expected — the round ships no parity-surface
   change); PIL-verify non-blank.
7. **The doc cures**: the session log `docs/session_62.md` + this plan
   doc; the count ladder re-locked at all sites (603+N/54 · e2e 123/8
   — the census battery's claim shapes enumerate them); the PAD §7.1
   split rows re-locked (13 seam/196 + 41 source contracts/407+N);
   the census battery's SOURCE_CONTRACTS gains `scroll-behavior-attr`
   (the 41st); CLAUDE.md + SKILL.md name the new family; AGENTS.md
   gains the route-transition superset note (the attribute + the
   mechanism + the instant-reset contract); the PAD §5.2 gains the
   stacked-emulation census record + the route-transition cure
   record; the worklog round-34 entry + verification line.
8. **The cleanup**: the round's scratch probes (the authed-world
   census, the scroll-transition symptom probe, the stacked-emulation
   census) live OUTSIDE the repo (`/home/z/my-project/scratch/`) and
   are never committed (the house scratch discipline).

## The execution order

R-1 the pin battery born RED → R-2 the cure (the one attribute) →
R-3 GREEN + the mutation proof (M1–M5 — each class must bite) → R-4
the two e2e legs → R-5 the live re-validation against the DEV server
(the symptom probe's instant proof + parity + drift + the mobile
census) → R-6 the captures → R-7 the ladder + docs re-lock → R-8 the
full gate (lint → typecheck → test → build → smoke → e2e) → R-9 the
ship (the SSH wrapper, main only).
