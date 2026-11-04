`docs/session_27.md` logs the round-16 re-validation (the
attribute/geometry census at the owner's `afb2ec2`); `docs/session_28.md`
is the owner-committed narration transcript of that session. Now at fresh
HEAD `8cda321`, this round: the clone re-orientation, the gate + the live
probes + the mobile-menu census re-proven, a fresh-eyes audit — and the
auth-view/validation-mode class closed: the auth card's three reachable
forms now native-validate exactly like the reference, under the gate at
every tier.

## Re-orientation

Workspace cloned fresh at `8cda321` (the delta from round-16's ship
`504749e` is `docs/session_28.md` alone — a doc, no code). The
environment rebuilt: `bun install`, `.env` created from `.env.example`
carrying the mandated contract `DATABASE_URL="file:../db/custom.db"`
(`db/` at the repo root), a fresh `AUTH_SECRET`, `db:push`/`db:seed`,
census **MATCH (3 + 4 users)**. The doc set re-internalized (AGENTS ·
CLAUDE · README · PAD v2.0 · the skill v1.199.0 · the worklog ·
session_27 + session_28 · the round-16 plan · the web-application skill
+ the catalog · the Tailwind v4 report · the ssh-wrapper runbook). The
neo-crm lineage repo stands as the tech-stack pattern reference — the
patterns already carried verbatim; no new tech-stack surface this round.

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **462/462 (36 files, the
  round-16 ladder)** · build (**22 routes**) · smoke **14/14** · e2e
  **79/79 (8 specs)** — every count matching the round-16 re-anchor.
- **Live parity**: `scripts/parity-199.ts` — **COMPUTE IDENTICAL at
  1280 + 390** (the oklab/rgba s18 serialization class excluded, same
  paint).
- **Drift**: `scripts/drift-199.ts` — **NO DRIFT** (the round-16
  five-leg probe: content + mobile-menu · auth-card · preflight ·
  motion/glyph · geometry).
- **The mobile-menu census** (the operator's standing emphasis):
  byte-equivalent live on BOTH apps at 390×844; link-ride navigates
  `#about` AND closes on both; the sole delta OUR `aria-expanded` (the
  documented invisible a11y superset). **No Tailwind v4 bug** in the
  eight pinned traps.
- The standing config asks re-verified: the `.env`/db-path contract, the
  vitest/playwright configs (the `skills/` exclusions), `.env.example`
  var-by-var, the sitemap/SEO family (smoke rung 12), the TODO/FIXME
  sweep clean, the advisory ledger **unchanged — 10 (4 high, 5
  moderate, 1 low), all dev-toolchain transitive**; runtime zod ^4.6.7
  above the GHSA floor; no security driver.

## The audit — the fresh angle: the AUTH-VIEW/VALIDATION-MODE census → the auth card's validation-mode catch

The faces no probe read (every login probe since session-199 read the
/login SIGN-IN view at-rest — parity-199 reads the landing, the drift
login leg reads the card's at-rest inks/pads, round-13 pinned the inks,
round-16 pinned the Google G; the card's OTHER in-place views were
pinned at session-21/79/111 — the CRM era, against the OLD reference —
and their text faces, their geometry, their input attributes, and the
forms' VALIDATION MODE were never re-read against the CURRENT
reference):

**F-17a (HIGH, VISIBLE, behavioral — the F-16d genus on the auth
family): the AUTH CARD's VALIDATION MODE.** All three reachable auth
forms on OURS carried `noValidate`; the CURRENT reference's carry NONE
(probe-verified live on both apps, 1280×800): an EMPTY sign-in submit
on OURS fired the submit event and POSTed to `/api/auth/login`
(probe-verified: `submitFired: true, posts: ["/api/auth/login"]`) — a
network round-trip then OUR red banner for empty fields — where the
reference NATIVE-VALIDATES (the submit event never fires, no POST
leaves the page, the browser paints its own bubbles: `submitFired:
false, posts: []`); the empty signup submit POSTed `/api/auth/signup`
on ours; the empty reset submit fired our JS guard's banner where the
reference's native gate paints the browser bubble (the reference's
reset email input carries `required`; OURS carried none — the missing
gate that made our empty-submit path reachable). PLUS the trap inside
the cure: OURS' signup password/confirm inputs carried
`minLength={8}` (ours-only; the reference's inputs ship NO minlength —
its "Min. 8 characters" PLACEHOLDER communicates the policy, its
server enforces it); while noValidate rode the form the attribute was
INERT, and dropping noValidate without dropping minLength would
ACTIVATE a client gate STRICTER than the reference's. The mirror:
drop both; our Zod seam ("Password must be at least 8 characters" —
pinned by the auth e2e quartet) owns the enforcement server-side
exactly as the reference's server owns its own. The verify form KEEPS
its noValidate — the reference's verify view is unreachable without a
REAL signup on the operator's app (no safe probe exists); our verify
view's own incomplete-guard UX stands, recorded as the unverifiable
member. Invisible to every gate: the drift login leg reads at-rest
computed faces; the e2e auth battery fills VALID non-empty credentials
(the empty-submit mode never rode); the smoke ladder curls SSR HTML.

**The positive censuses (clean, first time probed on the CURRENT
reference):** the non-sign-in views' TEXT faces byte-identical (the
h2s "Create your account" / "Reset your password", the description
paragraphs, every button label, every input label/placeholder/id/type,
the form classes, the h2 classes); the non-sign-in views' GEOMETRY
byte-identical at 1280 (the back-button, h2, form, and card rects ALL
equal — the session-79 space-y/`-mb-2` decodes re-proven on the
current reference: our `mb-2` / `mb-2 sm:mb-4` compute the same gaps
the reference's `-mb-2` collapses to under its v3 space-y); the
view-swap triggers and the back-button rides identical on both apps.

**The records (no cure):** the Google button's re-pinned literal
classes vs the reference's `var(--sem-*)` semantic tokens (round-13's
recorded decode — the computed faces pinned by the drift login leg);
the submit buttons' family (ours `flex` + the round-13 composed
outline composition vs the reference's `inline-flex …
whitespace-nowrap ring-offset-background [&_svg]…` — the inert
members: no svg children inside the submits, never-wrapping labels,
the ring-offset var without a ring; the `display` face flex vs
inline-flex, layout-identical for w-full buttons); the sign-in form's
`w-full` class superset (computed width identical in the column
stack); OUR autocomplete superset family (email / current-password /
new-password / one-time-code — the reference ships none; invisible,
a11y-positive, kept — the aria-expanded genus); OUR explicit
`type="button"` on the view-swap buttons (inert outside forms); the
superset `/reset-password` screen keeps its own form mode (the
reference 404s the route — our surface, our design).

## The TDD cure (born RED → green → proven to bite)

`tests/auth-validation.test.ts` (+10 checks, the 37th unit file)
**born RED 6/4 on the live tree** — the sign-in/signup/reset
noValidate pins (×3), the reset email's `required` gate, the
minLength census, and the exactly-one-noValidate count all failed on
the real divergences; the verify-form keep-pin and the autocomplete
superset pins passed by design (the honest keeps). The cures in
`login-card.tsx`: the `noValidate` drop on the sign-in, signup, and
reset forms (mechanism comments at each site); `required` on the reset
view's email input; the `minLength={8}` drop on the signup password
family (the placeholder + the Zod seam own the policy); the verify
form untouched. The battery **10/10 GREEN** after; lint/tsc clean.

`scripts/drift-199.ts` gains the **AUTH-VALIDATION census leg** (both
apps, one shared browser: the sign-in form's noValidate; the reset
view's form noValidate + its email's required, reached via the
"Forgot password?" swap; the signup view's form noValidate + its
password's minlength census, reached via the "Sign up" swap) —
**born-RED live on the pre-fix tree (6-field DRIFT: the three
noValidate modes, the reset email's required, the signup
minLength)**, **NO DRIFT after the cure (all six legs)** — and the
live mutation leg (the sign-in noValidate re-applied → the drift
re-detected it).

`tests/e2e/auth.spec.ts` (+2) pins the faces on the standalone
artifact: the empty sign-in submit NEVER POSTs (form.noValidate
false; the empty form checkValidity false; the click fires zero
`/api/auth/*` requests — the native gate holds) and the swapped
views' validation faces (the reset email's required gate + its form's
native mode; the signup's native mode + no minlength on the password
family) — green on the clean artifact (81/81).

**The mutation proof: 4/4 unit classes bite + the live drift leg + the
e2e leg** — M1 the sign-in noValidate restored (2 RED: ① + the
exactly-one count) · M2 the reset email's required dropped (1 RED) ·
M3 the signup minLength restored (1 RED) · M4 the verify form's
noValidate dropped (2 RED: the keep-pin + the count) — the live drift
leg (the M1 mutation re-applied to the tree → the auth-validation
census re-detected the signNoValidate drift) — the e2e leg (the M1
mutation rebuilt into the artifact → the never-POSTs pin RED;
restored, rebuilt, 81/81) — all files restored byte-identical via the
/tmp-backup harness (`cmp`-verified).

## Shipped

The count ladder re-anchored **472/37 (13 seam/196 + 24 source
contracts/276) · e2e 81/8** at every live-tense site (AGENTS · CLAUDE
· README · PAD §3.2/§7.1/§7.3/§10 + the tree diagram · SKILL §7 · the
worklog Stage Summary); the auth-validation family in the CLAUDE/SKILL
prose lists + the ladder's SOURCE_CONTRACTS; the captures refreshed
(the 6 `ours-*` faces); the gate re-proven green (lint 0/0 · tsc 0 ·
472/472 · 22 routes · smoke 14/14 · e2e 81/81); parity IDENTICAL ·
drift NO DRIFT (all six legs) · the mobile census byte-equivalent; the
advisory ledger unchanged at 10. Pushed as one atomic commit on main
via the SSH wrapper (`--remote` pointing at elegance-flow, the key
shredded after, no new branches).
