# The Round-35 Remediation Plan — the ORIENTATION-FAMILY census (the landscape phone + the rotation ride) (session-199)

**The round's fresh angle:** the session-56 candidate 2 (the landscape
print-orientation family) extended to the full ORIENTATION census — the
phone held in LANDSCAPE (844×390, the md boundary crossed from below) is
the one viewport configuration no permanent probe ever censused, and the
ROTATION ride (the mobile menu open while the boundary crosses) is the
one behavior of the operator's standing emphasis never ridden.

## The census (round-35 discovery probes — both apps, guest-only GETs + the sanctioned demo login)

- **F-35a (the rotation ride — the standing emphasis at the orientation
  crossing, a POSITIVE census)**: at portrait 390×844 the menu opens
  (aria-expanded true, the label flips to "Close menu"); ROTATING to
  844×390 flips the header to its desktop face (the toggle and the
  inline panel ride `md:hidden` → display none, the desktop nav + the
  amber CTA render) while the open-menu STATE survives hidden; rotating
  back to 390×844 the panel REOPENS automatically (the state was never
  reset). The reference behaves IDENTICALLY on every leg (its toggle
  label also reads "Close menu" after the round-trip, its panel also
  reopens) — the sole delta is OUR aria-expanded (the documented a11y
  superset, the mobile census's own recorded delta). No probe ever
  crossed the md boundary WITH THE MENU OPEN: the round-22 boundary
  legs censured the closed-state flip (640/768), the round-50 extreme
  ladder censured landscape GEOMETRY (the content column) never the
  menu behavior, and the mobile battery rides portrait only.
- **F-35b (the landscape print-orientation family — the session-56
  candidate 2, a POSITIVE census)**: under `media: "print"` emulation
  at 844×390 both apps compute IDENTICAL faces — the hero h1 white
  ink, body bg white, html ink black, ZERO `@media print` rules (the
  CSSMediaRule walk), the same document height (6063 at rest). The
  round-30 print census rode the default viewport; the orientation
  axis of the print family was the recorded candidate, now closed.
- **F-35c (the auth card at landscape — a POSITIVE census)**: at
  844×390 the login card computes IDENTICAL geometry both apps — the
  `w-full max-w-md` card at rect [198, 16, 448, 746] (x=198 is the
  exact (844−448)/2 centering), the page scrolls (the 746px card in
  the 390px viewport), the email input visible. The drift [login] leg
  rides 1280 and 390 portrait; the landscape short-height leg never
  ran.
- **F-35d (the landing's a11y register at landscape — a POSITIVE
  census)**: axe-core at 844×390 flags the SAME 16 sanctioned
  color-contrast nodes on both apps (the register that rides 1280 and
  390 portrait holds at the orientation) — and the reference's own
  select-name violation (its unassociated contact select; OURS binds
  id/htmlFor, the standing superset). OUR structural count: zero.
- **F-35e (the superset's /dashboard at landscape — a POSITIVE
  census)**: at 844×390 the inbox renders sanely (the Inquiries h1,
  the shell header visible, no horizontal scrollbar) and axe-core
  returns ZERO violations — the superset's own surface stays legible
  at the orientation (the e2e inbox battery rides 1280 and 390
  portrait).
- **The standing re-validation at open** (all green, the round-34 ship
  state reproduced exactly): lint 0/0 · tsc 0 · 609/609 (54 files) ·
  build 22 routes · smoke 14/14 · e2e 123/123 · census MATCH · parity
  IDENTICAL both viewports · drift NO DRIFT ×20 · the mobile-menu
  census byte-equivalent — the operator's standing emphasis works
  exactly as expected, NO Tailwind v4 bug. The operator's standing
  login instruction executed (the reference's authed-world re-census —
  the PAD §2 record holds: the demo login → `/`, the derived-title
  404 shells, zero cookies). The standing contract items verified
  intact (`.env` → `DATABASE_URL="file:../db/custom.db"` with `db/` at
  the repo root · vitest + playwright configs · the sitemap/SEO family
  · `.env.example` · the neo-crm stack patterns embodied). The
  advisory re-triage: the posture UNCHANGED (10 advisories, all
  dev/build/test toolchain-transitive; the runtime zod 4.6.7 above the
  patched floor — the PAD §10 ledger row stands, no security driver).

## The decision (the house doctrine applied)

**No parity-surface source changes ship.** All five orientation
censuses are POSITIVE (both apps identical, the sole delta the
documented aria-expanded superset) — the positive-census precedent
(rounds 22/28/31/32/34): the PIN, so the orientation posture can never
silently change. The round-50 landscape scratch ride is promoted to a
permanent drift leg; the rotation ride joins the operator's mobile
battery as its first orientation-crossing leg.

## The cures (TDD — the pin battery born RED on the current tree; the mutation proof follows)

1. **The pin battery** `tests/orientation-faces.test.ts` (the 55th
   unit file, the 42nd source contract):
   - ① The rotation mechanism's source contract: the mobile toggle
     button carries `md:hidden` AND the panel wrap carries `md:hidden`
     (the class pair that flips both faces at the boundary — remove
     either and the rotation ride breaks: a visible hamburger over the
     desktop nav, or a panel that never hides) — pinned in
     `src/components/landing/landing-page.tsx` (comment-stripped).
   - ② The no-orientation-directive posture: neither app ships an
     orientation lock or directive — the landscape face is purely
     width-driven (the md flip); pin the absence (no `orientation` in
     the layout's metadata/export, no orientation-lock meta planted).
   - ③ The e2e legs' source contracts: the rotation leg in
     `mobile-navigation.spec.ts` (the `setViewportSize` ride across
     844), the landscape print leg in `landing.spec.ts`
     (`emulateMedia({ media: "print" })` at the landscape viewport),
     the landscape login leg in `auth.spec.ts` (844×390).
   - ④ The AGENTS.md doc pin — the orientation note names the rotation
     ride and the width-driven mechanism.
2. **The e2e legs (+3 → 126)**:
   - **The rotation ride leg** (in `tests/e2e/mobile-navigation.spec.ts`,
     the operator's standing emphasis battery): open the menu at
     390×844 → `setViewportSize(844×390)` → the toggle and the panel
     are hidden, the desktop CTA is visible → rotate back → the panel
     is visible again, the button reads "Close menu", aria-expanded
     true (the state survives the crossing — the reference's own face,
     live-proven).
   - **The landscape print leg** (in `tests/e2e/landing.spec.ts`):
     `emulateMedia({ media: "print" })` at 844×390 — the print faces
     (h1 white, body bg white, html ink black) + ZERO print rules (the
     CSSMediaRule walk, never the substring — the round-30 lesson).
   - **The landscape login leg** (in `tests/e2e/auth.spec.ts`): the
     card at 844×390 — visible, centered (x=198, width 448 — the
     max-w-md decode), the document scrollable (the 746px card in the
     390px viewport), the email input visible.
3. **The drift leg** (the 21st): `orientationFace(url)` — the
   landscape family at 844×390: the landing's header flip (the
   hamburger hidden, the desktop nav + CTA visible, the h1 font), the
   login card's centering geometry (x/width), and the print-landscape
   faces — diffed both apps, NO DRIFT expected (the recorded
   constants ride expectConst if a serialization class appears).
4. **The mutation proof** (5 classes, each must bite): M1 the rotation
   leg's `setViewportSize` reverted to a no-op · M2 the toggle's
   `md:hidden` removed from the source · M3 the panel wrap's
   `md:hidden` removed · M4 the landscape print leg's emulateMedia
   reverted · M5 the AGENTS.md note reverted — each 1+ RED on the
   battery/legs, all restored cmp-identical (the /tmp backup harness).
5. **The live re-validation** (the pin's own proof): the orientation
   census re-run (the drift [orientation] leg — NO DRIFT) + the
   standing probes (parity, the mobile census — no source change
   shipped).
6. **The captures refresh** (the operator's standing screenshot
   instruction): the 18-capture set re-run via `scripts/capture-199.ts`
   against the dev server; byte-compare against the committed set; 
   PIL-verify non-blank.
7. **The doc cures**: the session log `docs/session_64.md` + this plan
   doc; the count ladder re-locked at all sites (609+N/55 · e2e 126/8);
   the census battery's SOURCE_CONTRACTS gains `orientation-faces`
   (the 42nd); the PAD §7.1 split rows re-locked; the PAD §5.2 gains
   the orientation-census record; CLAUDE.md + SKILL.md name the new
   family; AGENTS.md gains the orientation note; the worklog round-35
   entry + verification line.
8. **The cleanup**: the round's scratch probes (the rotation ride, the
   landscape family, the landscape axe sweeps, the dashboard landscape
   sweep) live OUTSIDE the repo (`/home/z/my-project/scratch/`) and are
   never committed (the house scratch discipline).

## The execution order

R-1 the pin battery born RED → R-2 the three e2e legs + the drift leg
→ R-3 GREEN + the mutation proof (M1–M5 — each class must bite) → R-4
the live re-validation (the orientation census leg + the standing
probes) → R-5 the captures → R-6 the ladder + docs re-lock → R-7 the
full gate (lint → typecheck → test → build → smoke → e2e) → R-8 the
ship (the SSH wrapper, main only).
