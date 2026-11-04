# The Round-20 Remediation Plan — the AUTH-FAILURE/RESPONSE census (session-199)

**The round's fresh angle:** every probe since session-199 read the auth
card at-rest (round-13's inks, round-16's geometry, round-17's validation
MODES on EMPTY submits — the native gate blocked everything, round-19 rode
the LANDING's interactive behaviors, never the auth card's own live rides)
and the response-header family was pinned at session-20 against the OLD
NEO-CRM reference — never re-read against the current EleganceFlow
reference. Round-20 rides the reference's live FAILURE behaviors
(zero side effects by construction) and re-censuses the document-header
family on the current reference.

**The census (round-20 probes 1–3, both apps, 1280×800):**

- **F-20a (MODERATE, a11y/semantic — THE CATCH)**: the sent view's GREEN
  CALLOUT carries NO ROLE on ours — the screen reader is silent on the
  success announcement. The reference's platform callouts ALL carry
  `role="alert"` (the red failure banner AND the green sent banner), and
  our own card's idiom already mirrors it (ErrorCallout and InfoCallout
  both render `role="alert"`) — the sent callout is the ROLE-LESS
  STRAGGLER of the family. Everything else in the family is
  byte-identical (probe-verified live): the full class string (`relative
  w-full border p-4 [&>svg~*]:pl-7 … text-foreground bg-green-50/70
  border-green-200 rounded-xl`), the inner DIV (`[&_p]:leading-relaxed
  text-green-700 text-sm`, a BARE text node — the session-79 record
  re-proven), the mount parent (`DIV.space-y-4.sm:space-y-6`), the h2,
  the email line, the back button.
- **The positive censuses (clean, first time probed)**:
  - **The login-failure ride** — wrong credentials on the reference:
    POST `…/api/apps/{id}/auth/login` → 400 → the red `role="alert"`
    banner "Invalid email or password" (the EXACT full class string +
    the inner `[&_p]:leading-relaxed text-red-700 text-sm` div) mounts
    INSIDE the form, the form STAYS, the password KEEPS its value, the
    banner PERSISTS 6s+, a second wrong submit REPLACES (never
    duplicates). OURS: byte-identical on every member (our POST answers
    401 — see R-20b).
  - **The reset-submit ride** — a ghost email (valid format, no
    mailbox, no account — zero side effects on either app): the
    reference POSTs `…/auth/reset-password-request` → 200 → swaps
    in-place to the "Check your email" sent card (the h2, the "We've
    sent password reset instructions to {email}" para, the "Back to
    sign in" button, the green callout — identical to ours modulo
    F-20a's role). OURS: the same swap, the no-enumeration 200, NO db
    write on the ghost path (probe-verified: `findUnique` misses → the
    token branch never runs).
  - **The response-header family re-census** — the CRM-era session-20
    pins re-proven on the CURRENT reference: `referrer-policy:
    strict-origin-when-cross-origin` + `x-content-type-options: nosniff`
    + `strict-transport-security: max-age=31536000` on ALL FIVE surfaces
    (/, /login, /sitemap.xml, /robots.txt, /manifest.json), the
    sitemap's bare `application/xml`, robots' `text/plain;
    charset=utf-8`, the manifest's `application/json`. OURS: identical
    on every key (ours adds only the framework's `vary`/`cache-control`
    — invisible supersets).
- **The records (no cure)**: (R-20b) the login-failure STATUS — the
  reference's platform answers **400**, ours answers **401** (the
  canonical auth-failure status; invisible; ours stays) · (R-20c) the
  platform's endpoint shapes (`/api/apps/{id}/auth/login` +
  `reset-password-request` vs our `/api/auth/login` +
  `/api/auth/forgot-password` — platform routing, invisible) · (R-20d)
  the reference's real-account sent card (the email-delivery link face)
  — unverifiable without a real email side effect (the round-17
  unverifiable-member precedent); our `resetUrl` superset stays ·
  (R-20e) the reference's login-failure RATE-LIMIT face is unknown and
  deliberately NOT hunted (hammering the platform's auth risks the
  owner's test account; today's 3 rides all answered identically — the
  evidence stands at the census level, and the standing drift leg rides
  only the side-effect-free reset path).

## The cure set (TDD)

- **R-1** `tests/auth-failure-faces.test.ts` (the 40th unit file) —
  born RED: ① the sent callout's `role="alert"` (F-20a — the
  family-completing mirror); ② the callout-family census (every callout
  render in the card carries a role — Error/Info/sent, all `alert`,
  the no-roleless-callout pin); ③ the login-failure callout's anatomy
  byte-pinned at source (the role + the red class family + the inner
  text div + the NO-auto-dismiss contrast: the timer rides `info`
  only, the error banner persists); ④ the sent card's keeps (the h2,
  the email line, the back button, the callout's exact bare text);
  ⑤ the green callout's inner shape (a BARE text node — no `<p>`
  wrapper, the `[&_p]` arm inert — the session-79 record re-proven).
- **R-2** the cure: `role="alert"` on the sent view's callout div in
  `src/components/layout/login-card.tsx` + the mechanism comment (the
  platform's idiom, the family-completing mirror).
- **R-3** `scripts/drift-199.ts` gains the **[authfail] census** (the
  9th leg): the response-header face (both apps, five surfaces, the
  reference's key family — referrer-policy / x-content-type-options /
  HSTS / content-type / status) + the reset-submit ride (both apps, the
  ghost email — the h2 / the callout's role / the callout's class / the
  inner div's class / the button text / the POST status). Born-RED live
  proof on the pre-cure tree (the role field DRIFTs); NO DRIFT after —
  all NINE legs.
- **R-4** `tests/e2e/reset-password.spec.ts` (+1): the ghost-email ride
  on the standalone artifact — the sent card renders with the ANNOUNCED
  callout (`getByRole("alert")` carries the check-your-email text), the
  h2/para/button faces, and NO reset link (the ghost path's null
  resetUrl — the graceful degrade re-proven).
- **R-5** the count ladder re-anchor (unit 491 → 491+N / 39 → 40
  files; e2e 84 → 85) at every live-tense site + the ladder's
  SOURCE_CONTRACTS list.
- **R-6** the mutation proof: M1 drop the sent callout's role (①② RED)
  · M2 plant `role="status"` (the byte-mirror breaks — ① RED) · M3 drop
  the ErrorCallout's role (②③ RED). All restored `cmp`-identical.
- **R-7** the captures: the 6 `ours-*` faces refreshed + the NEW
  `ours-reset-sent-1280.png` (the ghost-email ride — no db row), all
  PIL-verified non-blank.
- **R-8** the doc lockstep: `docs/session_34.md` + this plan's Phase-5
  + the worklog round-20 entry + the PAD §10 round-20 clause + the
  count re-anchors + the F-20a/R-20b–e records.
- **R-9** the full gate re-proof (lint 0/0 · tsc 0 · unit · build 22
  routes · smoke 14/14 · e2e) + the final live probes (parity · drift
  all NINE legs · the mobile census).
- **R-10** ship: one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --remote git@github.com:nordeim/elegance-flow.git`.

## Phase 5 — The execution record (filled at ship)

- **R-1** ✓ `tests/auth-failure-faces.test.ts` (the 40th unit file, 5
  checks) — born-RED **2/3** on the live tree (①② RED — the F-20a
  cure + the family census; ③④⑤ GREEN — the anatomy/keeps/seam pins).
  One harness iteration: ④'s first draft pinned the LANDING panel's
  h3 class string (round-19's muscle memory) — the login card's h2
  rides `LOGIN_RESET_LAYOUT.title`; fixed to the real keep.
- **R-2** ✓ the cures: `role="alert"` on the sent view's callout div +
  the mechanism comment in `login-card.tsx`. Battery **5/5** · tsc 0.
  Live find on the way: the family-census count must read the JSX
  RENDER SHAPE (`<div role="alert"`), never the bare string — the
  cure's own mechanism comment citing `role="alert"` made the naive
  count read 4.
- **R-3** ✓ the `[authfail]` leg (the 9th) — born-RED live on the
  pre-cure tree (the /tmp backup + `git show HEAD:` restore harness):
  the final harness reads a **1-field DRIFT** (sentCalloutRole — the
  exact F-20a set). The FIRST draft diffed nosniff on all five
  surfaces and read a 4-field DRIFT — three of them the ours-only
  security superset (**R-20f**, the round's header find: the current
  reference ships nosniff only on / and /login; the session-20 pins
  were OLD-reference measurements). The leg now diffs nosniff only on
  the reference's own two surfaces; **NO DRIFT after — all NINE
  legs**.
- **R-4** ✓ e2e +1 (**85/85**): the ghost-email sent card on the
  standalone artifact (the ANNOUNCED callout with the exact text, the
  h2/para/button faces, NO reset link — the graceful degrade; no db
  row on the unknown path). Rebuilt the artifact first (the stale-
  artifact lesson).
- **R-5** ✓ the count ladder re-anchored at **496/40** (13 seam/196 +
  27 source contracts/300 — auth-failure-faces the 27th) · e2e
  **85/8**; the census battery's category list + all five root docs +
  the worklog verification line re-locked. The census caught THREE
  stragglers the batch sed missed (CLAUDE's gate-chain line, PAD's
  §7.1 e2e row, PAD's tree annotation "39 *.test.ts" — count every
  shape, and verify every sed landed).
- **R-6** ✓ the mutation proof: unit **3/3** (M1 the role dropped ①②
  RED · M2 role="status" planted ①② RED · M3 the ErrorCallout's role
  dropped ②③ RED), all restored `cmp`-identical (the /tmp backup
  harness).
- **R-7** ✓ the 7 `ours-*` captures refreshed + the NEW
  `ours-reset-sent-1280.png` (the ghost-email ride — no db row), all
  PIL-verified non-blank.
- **R-8** ✓ session_34 + this Phase-5 + the worklog round-20 entry +
  the PAD §10 round-20 clause + the SKILL/CLAUDE prose family lists +
  the count re-anchors.
- **R-9** (the full gate + the final live probes — filled at ship:
  lint 0/0 · tsc 0 · 496/496 · 22 routes · smoke 14/14 · e2e 85/85 ·
  parity IDENTICAL both viewports · drift NO DRIFT all NINE legs ·
  the mobile census byte-equivalent).
- **R-10** ✓ one atomic commit on main via the ssh wrapper (dry-run →
  push → remote verification → key shredding).
