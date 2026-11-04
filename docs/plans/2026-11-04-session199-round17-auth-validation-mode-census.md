# Session 199 — Round 17: THE FRESH-CONTEXT RE-VALIDATION + THE AUTH-VIEW/VALIDATION-MODE CENSUS (2026-11-04)

The rotation trigger: the owner's newest commit (`8cda321` "update session log")
adds `docs/session_28.md` — the raw narration transcript of the round-16
session. This round: pull at `8cda321`, re-internalize the doc set, re-prove
the gate + the live parity/drift bars + the mobile-menu census, audit with a
fresh angle, then close the validation-mode class the fresh angle surfaces.

## Phase 0 — The intake (Verified)

- Workspace cloned fresh at `8cda321` (the delta from round-16's ship
  `504749e` is `docs/session_28.md` alone — a doc, no code). Environment
  rebuilt: `bun install`, `.env` created from `.env.example` carrying the
  mandated contract `DATABASE_URL="file:../db/custom.db"` (`db/` at the repo
  root), a fresh `AUTH_SECRET`, `db:push`/`db:seed`, census **MATCH (3 + 4
  users)**. The doc set re-internalized (AGENTS · CLAUDE · README · PAD v2.0
  · the skill v1.199.0 · the worklog · session_27 + session_28 · the
  round-16 plan · the web-application skill + the catalog · the Tailwind v4
  report · the ssh-wrapper runbook). The neo-crm lineage repo stands as the
  tech-stack pattern reference — the patterns already carried verbatim (no
  new tech-stack surface; recorded).

## Phase 1 — The status validation (Verified — every claim re-proven)

| Doc claim | Live evidence |
| --- | --- |
| lint 0/0 · tsc 0 | Both green at HEAD |
| Unit 462/462 (36 files) | `bun run test` — 462 passed |
| Build 22 routes | Route table counted |
| Smoke 14/14 | The ladder green on :3210 with `db/smoke.db` |
| E2E 79/79 (8 specs) | `CI=1 bun run test:e2e` — 79 passed |
| Live parity COMPUTE IDENTICAL | `scripts/parity-199.ts` at 1280 + 390 |
| Drift NO DRIFT (all five legs) | `scripts/drift-199.ts` (content+mobile · auth · preflight · motion · geometry) |
| Mobile-menu census (link-ride) | byte-equivalent on both apps; link-ride navigates AND closes; sole delta OUR aria-expanded |
| Census MATCH 3+4 | `bun run db:census` (resolved path printed) |
| skills/ excluded | tsconfig `exclude`, eslint `ignores`, vitest include-allowlist, playwright `testDir` |
| Advisory ledger 10 (4 high · 5 moderate · 1 low) | `bun audit` — all dev-toolchain transitive; runtime zod ^4.6.7 patched; no security driver |

No Tailwind v4 bug in the EIGHT pinned traps. The standing config asks
re-verified live: the `.env`/db-path contract, the vitest/playwright configs,
the sitemap/SEO family (smoke rung 12), `.env.example` var-by-var, the
TODO/FIXME sweep clean.

## Phase 2 — The audit findings (the fresh angle: the AUTH-VIEW/VALIDATION-MODE census — the faces no probe read: every login probe since session-199 read the /login SIGN-IN view at-rest only — parity-199 reads the landing, the drift login leg reads the sign-in card's chrome, round-13 pinned the inks, round-16 pinned the Google G; the card's OTHER in-place views (reached by clicking "Sign up" / "Forgot password?") were pinned at session-21/79/111 — the CRM era, against the OLD reference — and their text faces, their geometry, their input attributes, and the forms' VALIDATION MODE were never re-read against the CURRENT reference)

**F-17a (HIGH, VISIBLE, behavioral — the F-16d genus on the auth family):
the AUTH CARD's VALIDATION MODE.** All three reachable auth forms on OURS
carry `noValidate`; the CURRENT reference's carry NONE (probe-verified live
on both apps, 1280×800):

- The **sign-in form**: an EMPTY submit on OURS fires the submit event and
  POSTs to `/api/auth/login` (probe-verified: `submitFired: true, posts:
  ["/api/auth/login"]`) — a network round-trip then OUR red banner for empty
  fields. The reference NATIVE-VALIDATES: the submit event never fires, no
  POST leaves the page, the browser paints its own bubbles
  (`submitFired: false, posts: []`; `formNoValidate: false`; both email and
  password inputs `required` on both apps).
- The **signup form**: same mode divergence (probe-verified:
  `submitFired: true, posts: ["/api/auth/signup"]` on ours; the reference's
  form carries no noValidate and its three inputs are required).
- The **reset form**: ours fires + our custom guard renders OUR banner
  ("Enter a valid email address to reset your password.") where the
  reference's native gate paints the browser bubble. The attribute census:
  the reference's reset email input carries `required`; OURS carries none —
  the missing member that makes our empty-submit path reachable at all.
- **The minLength trap inside the cure**: OURS' signup password/confirm
  inputs carry `minLength={8}` (ours-only; the reference's inputs carry NO
  minlength — its "Min. 8 characters" PLACEHOLDER communicates the policy,
  its server enforces it). While `noValidate` rode the forms the attribute
  was INERT; dropping noValidate without dropping minLength would ACTIVATE a
  client gate STRICTER than the reference's (an ours-only native bubble the
  reference never paints). The mirror: drop both; the Zod seam
  (`min 8`, "Password must be at least 8 characters" — pinned by the auth
  e2e quartet) stays the server-side enforcement exactly as the reference's
  server owns its own.
- The **verify form** keeps its `noValidate` — the reference's verify view
  is unreachable without a REAL signup on the operator's app (no safe probe
  exists); our verify view's own incomplete-guard UX stands, recorded as
  the unverifiable member.

Invisible to every gate: the drift login leg reads at-rest computed faces
(inks, pads, divider, Google); parity-199 reads the landing; the e2e auth
battery fills VALID non-empty credentials (the empty-submit mode never
rode); the smoke ladder curls SSR HTML; the round-16 geometry census read
the LANDING's form — no probe ever rode an EMPTY submit on the auth card,
and no probe ever read a non-sign-in view's form attributes.

**The positive censuses (clean, first time probed on the CURRENT
reference):** the non-sign-in views' TEXT faces byte-identical (h2s
"Create your account" / "Reset your password", the description paragraphs,
every button label, every input label/placeholder/id/type, the form classes
`space-y-3 sm:space-y-4` / `space-y-4 sm:space-y-5`, the h2 classes); the
non-sign-in views' GEOMETRY byte-identical at 1280 (the back button, h2,
form, and card rects ALL equal — the session-79 space-y/`-mb-2` decodes
re-proven on the current reference: our `mb-2` / `mb-2 sm:mb-4` compute
the same gaps the reference's `-mb-2` collapses to under its v3 space-y);
the view-swap triggers and the back-button rides identical on both apps.

**The records (no cure):** the Google button's re-pinned literal classes vs
the reference's `var(--sem-*)` semantic tokens (round-13's recorded decode —
the computed faces pinned by the drift login leg); the submit buttons'
family (ours `flex` + the round-13 composed outline composition vs the
reference's `inline-flex … whitespace-nowrap ring-offset-background
[&_svg]…` — the inert members: no svg children inside the submits,
never-wrapping labels, the ring-offset var without a ring; the `display`
face flex vs inline-flex, layout-identical for w-full buttons); the
sign-in form's `w-full` class superset (computed width identical in the
column stack); OUR autocomplete superset family (`email` /
`current-password` / `new-password` / `one-time-code` — the reference ships
none; invisible, a11y-positive, kept — the aria-expanded genus); OUR
explicit `type="button"` on the view-swap buttons (inert outside forms);
the superset `/reset-password` screen keeps its own form mode (the
reference 404s the route — our surface, our design).

## Phase 3 — The remediation ToDo list

1. **[R-1, TDD — the auth-validation source-contract battery]** Create
   `tests/auth-validation.test.ts` (comment-stripped source reads, the
   house pattern): ① the sign-in form (onSubmit={onSigninSubmit}) carries
   NO `noValidate`; ② the signup form (onSubmit={onSignupSubmit}) carries
   NO `noValidate`; ③ the reset form (onSubmit={onSendResetLink}) carries
   NO `noValidate`; ④ the verify form (onSubmit={onVerifySubmit}) KEEPS
   its `noValidate` (the unreachable-reference record); ⑤ the reset
   view's email input carries `required`; ⑥ the signup password/confirm
   inputs carry NO `minLength` (the mode mirror — the placeholder + the
   Zod seam own the policy); ⑦ the autocomplete superset family stays
   (email / current-password / new-password — pinned so it never silently
   disappears); ⑧ the retired-form regressions (noValidate never returns
   to the three cured forms). **Born RED on the live tree** (①②③⑤⑥ fail
   on the real divergences; ④⑦ pass — the keeps).
2. **[R-2, the cures]** `src/components/layout/login-card.tsx`: drop
   `noValidate` from the sign-in form (line ~685), the signup form
   (~411), and the reset form (~365); add `required` to the reset view's
   email input (~373); drop `minLength={8}` from the signup password and
   confirm inputs (~444, ~464). The verify form UNTOUCHED. Mechanism
   comments at each site (the F-16d genus record + the
   placeholder-owns-the-policy note).
3. **[R-3, the live-probe cure — the auth-validation joins the drift
   bar]** Extend `scripts/drift-199.ts` with the AUTH-VALIDATION census
   leg (both apps, 1280): the sign-in form's noValidate; the reset
   view's form noValidate + its email's required (reached by clicking
   "Forgot password?"); the signup view's form noValidate + its
   password's minlength census (reached by clicking "Sign up"). Run it
   BEFORE the R-2 cure → **DRIFT DETECTED on the real divergences**;
   after → **NO DRIFT** on all six legs.
4. **[R-4, the e2e legs (+2)]** Extend `tests/e2e/auth.spec.ts`: ① the
   empty sign-in submit NEVER POSTs (form.noValidate false; the empty
   form checkValidity false; clicking "Sign in" with empty fields fires
   zero POST requests — the native gate holds on the standalone
   artifact); ② the non-sign-in views' validation faces (the reset
   view's email input carries the required gate + its form native-validates;
   the signup view's form native-validates and its password inputs carry
   no minlength attribute).
5. **[R-5, count ladder]** Unit 462/36 → 462+N/37; e2e 79/8 → 81/8 — the
   count-ladder battery enforces the re-anchor at EVERY live-tense site
   (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 · the
   worklog Stage Summary) + the auth-validation family in the CLAUDE/SKILL
   prose lists + the ladder's SOURCE_CONTRACTS.
6. **[R-6, mutation proof]** The battery must BITE: noValidate restored
   on the sign-in form (① RED) · required dropped from the reset email
   (⑤ RED) · minLength restored on a signup password input (⑥ RED) ·
   noValidate dropped from the verify form (④ RED — the keep-pin) · the
   live drift leg re-run on a reverted tree (DRIFT) · the e2e legs (the
   sign-in noValidate mutation rebuilt into the artifact → the
   never-POSTs pin RED). All files restored byte-identical (the
   /tmp-backup harness, cmp-verified).
7. **[R-7, captures]** Re-run `scripts/capture-199.ts` (the login face
   refresh — the standing capture set).
8. **[R-8, doc lockstep]** `docs/session_29.md` (the session_27 house
   pattern) + the worklog round-17 lines + this plan's execution record;
   PAD §10 records the round-17 close; the auth-validation family in the
   CLAUDE/SKILL prose lists; the records (the submit-family class-string
   genus · the autocomplete supersets · the verify-form record) in the
   session log.
9. **[R-9, gate re-proof]** The full chain re-run after the changes:
   `bun run gate` + `CI=1` e2e + the live parity/drift/mobile probes
   (parity stays green — no probed at-rest computed style changed; the
   drift bar now carries the auth-validation leg).
10. **[R-10, ship]** One atomic commit on main; push via
    `python3 docs/ssh_git_wrapper_v3.py --key-file <key> --remote
    git@github.com:nordeim/elegance-flow.git` (the round-11 `--remote`
    lesson); remote ref verified == HEAD; the operator key shredded
    after; the scratch probe scripts removed.

## Phase 4 — The verification bar

- The unit battery born RED on the real divergences, GREEN after the
  cures, and proven to bite by mutation; the drift probe's
  auth-validation leg red on the pre-fix tree, NO DRIFT after (all six
  legs); the e2e legs green on the standalone artifact (81/81).
- The gate green at ship; the parity/mobile bars re-proven (no probed
  at-rest computed style changed); the count ladder consistent
  everywhere; the push verified; the working tree clean; no
  key/shim/db/log artifacts staged.

## Phase 5 — The execution record (filled at ship)

- **R-1 born RED 6/4 on the live tree** — the sign-in/signup/reset
  noValidate pins (×3), the reset email's `required` gate, the
  no-minLength census, and the exactly-one-noValidate count failed on
  the real divergences; the verify-form keep-pin and both autocomplete
  superset pins passed by design (the honest keeps). Two harness
  finds, recorded in the worklog's LIVE FINDS: the `[^>]*` tag-regex
  truncates at the JSX arrow `=>` inside `onChange` (the round-10
  lesson re-applied — the bounded-window match), and the deep JSX
  indentation (34 spaces/line) exceeds a 300-char match window (the
  window bumped to 700/600).
- **R-2 the cures**: the `noValidate` drop on the sign-in, signup, and
  reset forms (mechanism comments at each site, the F-16d genus
  record); `required` on the reset view's email input; the
  `minLength={8}` drop on the signup password family (the placeholder
  + the Zod seam own the policy); the verify form untouched. The
  battery **10/10 GREEN** after; lint/tsc clean.
- **R-3 born-RED live proof**: the extended drift probe ran against
  the PRE-FIX tree (the /tmp-backup harness: the cures backed up, the
  sources restored to HEAD) → **DRIFT DETECTED on 6 fields** (the
  three form noValidate modes, the reset email's required, the signup
  password's minlength census); after the cures → **NO DRIFT on all
  six legs** ([390] content+mobile · [login] auth-card · [preflight]
  form-face · [motion] motion/glyph · [geometry] structure/geometry ·
  [auth-validation] the new census). Harness find: the leg rides ONE
  shared browser for both apps — under the full run's dozen
  concurrent browser launches the view-swap clicks stalled past the
  action timeout (found live at the born-RED proof; the first
  retry-wrapper attempt leaked browsers and made it worse — the
  shared-browser shape is the cure).
- **R-4 the e2e legs**: +2 checks in `tests/e2e/auth.spec.ts` — the
  empty sign-in submit NEVER POSTs (form.noValidate false, the empty
  form checkValidity false, the click fires zero `/api/auth/*`
  requests) and the swapped views' validation faces (the reset
  email's required gate + native mode; the signup's native mode + no
  minlength) — green on the clean artifact (81/81). Harness find: the
  browser's native validation bubble registers in Chromium's a11y
  tree as an ALERT node — a zero-alert census assertion on a
  natively-validating form counts the BUBBLE itself (found live; the
  assertion retired with the mechanism note).
- **R-5 the count ladder re-anchored 462/36 → 472/37 (13 seam/196 +
  24 source contracts/276) + 79/8 → 81/8 (e2e)** at every live-tense
  site (AGENTS · CLAUDE · README · PAD §3.2 tree diagram + §7.1 table
  + the gate command lines + §7.3 + §10 · SKILL §7 · the worklog Stage
  Summary) + the auth-validation family in the CLAUDE/SKILL prose
  lists + the ladder's SOURCE_CONTRACTS list (the four lockstep
  checks went RED by design until the re-anchor; 472/472 GREEN
  after).
- **R-6 the mutation proof: 4/4 unit classes bite + the live drift
  leg + the e2e leg** — M1 the sign-in noValidate restored (2 RED: ① +
  the exactly-one count) · M2 the reset email's required dropped (1
  RED) · M3 the signup minLength restored (1 RED) · M4 the verify
  form's noValidate dropped (2 RED: the keep-pin ④ + the count) — the
  live drift leg (the M1 mutation re-applied to the tree → the
  auth-validation census re-detected the signNoValidate drift) — the
  e2e leg (the M1 mutation rebuilt into the artifact → the
  never-POSTs pin RED on the real :3100 world; restored, rebuilt,
  81/81) — all files restored byte-identical via the /tmp-backup
  harness (`cmp`-verified).
- **The positive censuses recorded**: the non-sign-in views' text
  faces byte-identical; the non-sign-in views' geometry byte-identical
  at 1280 (the session-79 decodes re-proven); the swap triggers + the
  back-button rides identical.
- **The records**: the Google button's var()/literal decode (round-13)
  · the submit family's flex/inline-flex + inert members · the
  sign-in form's w-full superset · the autocomplete supersets (kept)
  · the type=button supersets · the /reset-password screen's own
  mode.
- **The advisory ledger held at 10** post-cure (all dev-toolchain
  transitive; no security driver).
- **R-7 the captures refreshed** — the 6 `ours-*` faces (all
  pixel-verified non-blank).
- **R-8 the doc lockstep**: `docs/session_29.md` (the session_27
  house pattern) + the worklog round-17 lines + the LIVE FINDS
  additions + this execution record; the count re-anchors at every
  live-tense site; the auth-validation family in the CLAUDE/SKILL
  prose lists.
- **R-9 the gate re-proof**: lint 0/0 · tsc 0 · **472/472 (37 files)**
  · build (22 routes) · smoke 14/14 · e2e **81/81 (8 specs)** ·
  parity COMPUTE IDENTICAL (both viewports) · drift NO DRIFT (all six
  legs) · the mobile census byte-equivalent.
- **Shipped** as one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --remote
  git@github.com:nordeim/elegance-flow.git` (the round-11 `--remote`
  lesson applied), remote verified == HEAD, key shredded, the scratch
  probe scripts removed.
