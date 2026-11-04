# The Round-21 Remediation Plan — the GOOGLE-BUTTON/TIME-DIMENSION/KEYBOARD census (session-199)

**The round's fresh angle:** the TIME-DIMENSION + KEYBOARD + GOOGLE-BUTTON
surfaces no probe ever read. Every probe since session-199 read at-rest
faces (computed styles, text, geometry, inks, glyphs) or rode the
side-effect-free interaction behaviors (round-19's contact/filters/
carousel-selector/header-flip, round-20's auth FAILURE rides). Never
censused: the carousel's at-rest TIME dimension (does it auto-advance?),
the keyboard TAB ORDER against the reference's own ride, the contact
select's OPTION LIST, the mailto/tel link hrefs, the viewport RESIZE
ride on the mobile menu (the operator's standing emphasis — the
mobile-menu census opens the panel at 390 but never rides the
desktop↔mobile transition), and the auth card's GOOGLE-BUTTON click
behavior (inks pinned at round-13, the G glyph at round-16 — the CLICK
was never ridden on either app).

## The census (round-21 discovery probes 1–3, both apps, side-effect-free)

- **R-21a (RECORD, functional — no cure possible)**: the reference's
  "Continue with Google" button is a REAL Google OAuth redirect.
  Live-ridden (external navigation intercepted, zero side effects): the
  click navigates to `https://accounts.google.com/v3/signin/identifier`
  with `client_id=185178814199-6a35e9aqcmlm15ig0upncg07c91av8do.apps.googleusercontent.com`,
  `redirect_uri=https://app.base44.com/api/apps/auth/callback`,
  `response_type=code`, `scope=openid email profile`,
  `prompt=select_account`, and a state object carrying
  `{domain, from_url, app_id}` (the platform's own app id). OURS: the
  honest info-toast fallback ("Google sign-in not configured — This
  self-hosted clone uses email and password sign-in (demo credentials in
  the README)." — probe-verified at both viewports: bottom-right at
  1280, top at 390, role="status", auto-dismisses at 4s, zero page
  errors). UNIMPLEMENTABLE in the self-hosted clone: the OAuth
  redirect_uri is registered to base44's Google app; completing the flow
  needs the owner's Google credentials (the R-20d unverifiable-member
  precedent). The honest-superset fallback STAYS — the record rides the
  docs + the standing drift leg.
- **F-21a (the curable catch — a COVERAGE gap, the round-19/20 pin
  doctrine)**: the Google button's honest fallback is UNPINNED — no unit
  source-contract, no e2e ride. It is a user-visible behavior on the
  auth card (the exact class round-19 pinned for the contact panel and
  round-20 pinned for the sent card's role): a regression that breaks
  the handler, swaps the variant, or drops the honest text would ship
  with every gate green.
- **The positive censuses (clean, first time probed)**:
  - **The carousel auto-advance ride** — NO auto-advance on EITHER app
    over 14s at rest; the active quote, the three selectors' geometry
    (464x78), and the aria states identical at t0 and t14. The
    click-only carousel is the true face on both apps.
  - **The keyboard TAB ride** — the first 8 focusable stops IDENTICAL on
    both apps: the logo `a[#]` → About → Services → Work → Testimonials
    → Contact → the header CTA → the hero "Start a Project" CTA. (The
    round-10 keyboard battery pinned OUR rides; the reference's own Tab
    order was never censused.)
  - **The contact select's OPTION LIST** — identical six options
    ("Select a service... / Creative Direction / Design & Web /
    Photography / Brand Strategy / Other / Not Sure") + the identical
    class string (ours carries the documented trap-⑦ outline-2/
    transparent/offset-2 composition that computes the reference's v3
    `outline-none` face).
  - **The mailto/tel link census** — identical hrefs
    (`mailto:hello@yourstudio.com`, `tel:+1 (000) 000-0000`).
  - **The viewport RESIZE ride (the mobile menu's transition behavior)**
    — IDENTICAL on both apps across the full cycle: at 1280 the desktop
    nav + no hamburger; at 390 the hamburger ("Open menu") + no desktop
    nav; open at 390 → the panel + "Close menu"; resize back to 1280
    with the panel open → the desktop nav restored + the panel retired.
    The sole delta OUR `aria-expanded` superset (the standing census's
    own record). The mobile menu is working exactly as expected across
    the resize cycle — no Tailwind v4 media-query bug on the header
    family (the md: breakpoints compute identically in both builds).

## The cure set (TDD)

- **R-1** `tests/google-fallback.test.ts` (the 41st unit file) — born
  RED where the catch bites (the handler/variant/text pins), GREEN on
  the keeps: ① the click handler's honest toast call
  (`toast.info("Google sign-in not configured", <the exact
  description>)` at source); ② the button's `type="button"` (it rides
  inside the card's block section beside the form — a type-less button
  in a form would submit it; the never-submits pin); ③ the keeps (the
  `LOGIN_LAYOUT.google` class mount, the `GoogleIcon` mount, the
  "Continue with Google" span); ④ the no-navigation contract (the
  handler carries NO `router.push`/`window.open`/`location` assignment
  — the honest LOCAL fallback; the R-21a record in the comment).
- **R-2** `tests/e2e/auth.spec.ts` (+1, 86/86): the Google button click
  ride on the standalone artifact — the honest toast renders in the
  Notifications region (`role="status"`, the exact title + description),
  auto-dismisses by 4500ms, zero page errors; the URL never leaves
  /login (the no-navigation contract, behavioral).
- **R-3** `scripts/drift-199.ts` gains the **[google] census leg (the
  10th)**: the reference's Google-button ride (the intercepted
  navigation's STATIC OAuth params — host, client_id, redirect_uri,
  scope, prompt; the dynamic nonce/dsh/state params excluded) vs OURS
  (the toast face: rendered + role + the exact text). NO DRIFT is the
  standing bar (the R-21a record re-read every run).
- **R-4** the count ladder re-anchor (unit 496 → 496+N / 40 → 41 files;
  e2e 85 → 86) at every live-tense site + the census battery's
  SOURCE_CONTRACTS list.
- **R-5** the mutation proof: M1 drop the toast call (① RED) · M2 swap
  the variant to success (① RED) · M3 drop `type="button"` (② RED) ·
  M4 plant a router.push in the handler (④ RED). All restored
  cmp-identical.
- **R-6** the captures: the `ours-*` faces refreshed + the NEW
  `ours-google-toast-1280.png` (the click ride), PIL-verified
  non-blank.
- **R-7** the doc lockstep: `docs/session_37.md` + this plan's Phase-5
  + the worklog round-21 entry + the PAD §10 round-21 clause + the
  count re-anchors + the R-21a record in AGENTS/README/CLAUDE/SKILL
  (the superset family lists).
- **R-8** the full gate re-proof (lint 0/0 · tsc 0 · unit · build 22
  routes · smoke 14/14 · e2e 86/86) + the final live probes (parity ·
  drift all TEN legs · the mobile census).
- **R-9** ship: one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --remote git@github.com:nordeim/elegance-flow.git`.

## Phase 5 — The execution record (filled at ship)

- **R-1** ✓ `tests/google-fallback.test.ts` (the 41st unit file, 4
  checks) — **4/4 GREEN** (the pin battery: the face was already
  correct — the catch was the coverage gap, F-21a). One harness
  iteration: ②'s first draft sliced the window from the className (the
  `type="button"` line rides BEFORE it) — the window now starts at the
  `<button` tag.
- **R-2** ✓ the e2e leg (`tests/e2e/auth.spec.ts` +1, **86/86**): the
  toast ride on the standalone artifact (the Notifications region's
  role=status card, the exact title + description, the URL never
  leaves /login, the 4s auto-dismiss, zero page errors).
- **R-3** ✓ the `[google]` census leg (the 10th) — **THE LIVE
  MECHANISM FIND**: redirect followers BYPASS Playwright route
  interception (the 302 chain's target never hits the route handler —
  the first draft read all OAuth params `(none)` because the
  route-captured URL was Google's own `_/bscframe` retry); the fix
  captures the first accounts.google.com `framenavigated` URL + the
  platform's own document request (route-visible, continued). The leg
  pins the platform endpoint's shape (path/from_url/app_id) + the
  OAuth redirect's STATIC params + our toast face, each side against
  its RECORDED constant. **NO DRIFT — all TEN legs.**
- **R-4** ✓ the count ladder re-anchored at **500/41** (13 seam/196 +
  28 source contracts/304 — google-fallback the 28th) · e2e **86/8**;
  the census battery's SOURCE_CONTRACTS list + all five root docs +
  the worklog verification line re-locked (the census flagged exactly
  the stale sites; all updated).
- **R-5** ✓ the mutation proof: **4/4 classes bite** (M1 the toast
  call dropped ①④ RED · M2 the variant swapped to success ①④ RED · M3
  type=button→submit ② RED · M4 a router.push planted ①④ RED), all
  restored `cmp`-identical (the /tmp backup harness).
- **R-6** ✓ the captures: the 8 `ours-*` faces refreshed + the NEW
  `ours-google-toast-1280.png` (the click ride, captured mid-toast at
  600ms), all PIL-verified non-blank. (Visual capability unavailable
  this session — the round-20 precedent; the evidence stack is the PIL
  check + the drift leg's live DOM read + the e2e assertion.)
- **R-7** ✓ the doc lockstep: `docs/session_37.md` + this Phase-5 +
  the worklog round-21 entry + the PAD §10 round-21 clause + the SKILL
  v1.200.0 (the §4 superset record + the §7 battery entry) + the
  count re-anchors in all five root docs.
- **R-8** ✓ the full gate re-proof: **lint 0/0 · tsc 0 · 500/500 (41
  files) · build 22 routes · smoke 14/14 · e2e 86/86** (the google
  toast leg green on the fresh artifact) · parity **COMPUTE IDENTICAL**
  both viewports · drift **NO DRIFT all TEN legs** · the mobile census
  **byte-equivalent**.
- **R-9** ✓ one atomic commit on main via the ssh wrapper (dry-run →
  push → remote verification → key shredding).
