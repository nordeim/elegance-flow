# Session 34 — Round-20: the AUTH-FAILURE/RESPONSE census (the live failure rides + the header family re-read)

Round-19 shipped `2764f36` (the interaction-behavior census); the owner
pushed nothing new, so round-20 opens at the same HEAD — the
re-validation rotation's twentieth pass: the gate + the live probes
re-proven, a fresh-eyes audit on the two surfaces no CURRENT-reference
probe ever read (the auth card's live FAILURE behaviors and the
response-header family), one catch closed under TDD, and a header
superset find recorded.

## The status validation — every doc claim re-proven at `2764f36`

- **Gate**: lint 0/0 · tsc 0 · unit **491/491 (39 files, the round-19
  ladder at the round's open)** · build (**22 routes**, standalone) ·
  smoke **14/14** · e2e **84/84 (8 specs)**.
- **Live parity**: COMPUTE IDENTICAL at 1280 + 390 (the s18
  serialization class excluded, same paint).
- **Drift**: NO DRIFT — the round-19 eight legs.
- **The mobile-menu census**: byte-equivalent both apps; the sole delta
  OUR `aria-expanded` superset.

## The fresh angle — the auth-failure/response census

Every probe since session-199 read the auth card at-rest (round-13's
inks, round-16's geometry, round-17's validation MODES on EMPTY submits
— the native gate blocked everything) and the response-header family
was pinned at session-20 against the OLD NEO-CRM reference. Round-20
rode the reference's live FAILURE behaviors (zero side effects by
construction) and re-censused the headers on the current reference.

**The catch:**

- **F-20a (MODERATE, a11y/semantic)**: the sent view's GREEN CALLOUT
  carried **NO ROLE** — the success announcement was screen-reader
  silent. Live-ridden on the reference: its platform callouts ALL carry
  `role="alert"` (the red failure banner AND the green sent banner), and
  our own card's idiom already mirrors it (ErrorCallout + InfoCallout
  both render `role="alert"`) — the sent callout was the ROLE-LESS
  STRAGGLER of the family. Everything else byte-identical: the full
  class string, the inner bare-text div, the mount parent, the
  h2/para/button.

**The born-RED header find (R-20f)**: the CURRENT reference ships
`x-content-type-options: nosniff` **only on / and /login** — its
sitemap/robots/manifest carry none (the session-20 pins were measured
against the OLD CRM reference, which shipped nosniff on every
response). OURS keeps it on all five surfaces — the security superset,
stays (the drift leg diffs nosniff only on the reference's own two
surfaces).

**The positive censuses (clean, first time probed)**: the LOGIN-FAILURE
RIDE — wrong credentials on both apps: the red `role="alert"` banner
"Invalid email or password" (byte-identical full class string + inner
div), mounted inside the form, persisting 6s+, single-alert on retry,
the password value KEPT, the form KEPT · the RESET-SUBMIT RIDE — a
ghost email (no mailbox, no account, no db row): the same 200 swap to
the "Check your email" card, the same h2/para/button, identical modulo
F-20a's role · the HEADER FAMILY re-proven on the current reference
(referrer-policy + HSTS + the content-types on all five surfaces).

**The records (no cure)**: the platform's 400 vs our canonical 401
(R-20b) · the platform endpoint shapes vs our `/api/auth/*` (R-20c) ·
the real-account sent card unverifiable without an email side effect
(R-20d, the round-17 precedent) · the reference's login rate-limit face
deliberately NOT hunted — 3 rides today all identical; the standing
drift leg rides only the side-effect-free reset path (R-20e).

## The cure (TDD)

- **Born-RED battery** — `tests/auth-failure-faces.test.ts` (the 40th
  unit file, 5 checks): pre-cure **2 RED / 3 GREEN** (the honest
  split — the keeps GREEN by design).
- **The cures**: `role="alert"` on the sent view's callout div +
  the mechanism comment in `login-card.tsx` — the family-completing
  mirror. Post-cure **5/5 GREEN**, lint/tsc clean.
- **The drift leg [authfail] (the 9th)**: the header family on both
  apps (nosniff diffed only on / + /login — the R-20f superset) + the
  ghost-email reset ride. Born-RED live on the pre-cure tree: the
  exact **1-field sentCalloutRole DRIFT** with the final harness (the
  first draft diffed nosniff everywhere and read a 4-field DRIFT —
  three of them the ours-only superset, not real drift); **NO DRIFT
  after — all NINE legs**.
- **The e2e leg (+1, 85/85)**: the ghost-email sent card on the
  standalone artifact — the ANNOUNCED callout with the exact text, the
  h2/para/button faces, NO reset link (the graceful degrade).

## The mutation proof + the count ladder

- **Unit 3/3 classes bite**: M1 the role dropped (①② RED) · M2
  `role="status"` planted (①② RED — the census counts the JSX render
  shape `<div role="alert"`, never the bare string: a mechanism comment
  citing the role made the naive count read 4) · M3 the ErrorCallout's
  role dropped (②③ RED). All restored `cmp`-identical.
- **The count ladder re-anchored**: unit **496/496 (40 files)** — 13
  seam/196 + 27 source contracts/300 (auth-failure-faces the 27th);
  e2e **85/85 (8 specs)**; the census battery's list + the five root
  docs + the worklog verification line re-locked (the census caught
  three stragglers the batch sed missed — CLAUDE's gate-chain line,
  PAD's §7.1 e2e row, PAD's tree annotation).
- **The captures refreshed**: the 7 `ours-*` faces + the NEW
  `ours-reset-sent-1280.png` (the ghost-email ride — no db row), all
  PIL-verified non-blank.

## Ship

One atomic commit on main via `docs/ssh_git_wrapper_v3.py` (the
paramiko shim; dry-run → push → remote verification → key shredding).
No new branches.
