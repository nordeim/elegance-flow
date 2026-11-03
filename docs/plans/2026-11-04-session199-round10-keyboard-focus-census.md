# Session 199 — Round 10: THE FRESH-CONTEXT RE-VALIDATION + THE KEYBOARD/FOCUS CENSUS (the focus-visible cure + the ring re-pin + the keyboard-operability battery) (2026-11-04)

The rotation trigger: the owner's newest commit (`ba734f3` "update session
log") adds `docs/session_14.md` — the raw narration transcript of the
round-9 session. This round: pull at `ba734f3`, re-internalize the doc set,
re-prove the gate + the live parity/drift bars + the mobile-menu census,
audit with fresh angles, then close the keyboard/focus class the fresh
angle surfaces.

## Phase 0 — The intake (Verified)

- Fresh clone at `ba734f3` (the delta from round-9's ship `d851e1d` is
  `docs/session_14.md` alone — a doc, no code). The environment rebuilt:
  `.env` copied from `.env.example` with the mandated contract
  `DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root),
  `bun install`, `db:push`/`db:seed`, census **MATCH (3 + 4 users)**.
  The doc set re-internalized (AGENTS · CLAUDE · README · PAD v2.0 · the
  skill v1.199.0 · the worklog · session_13 + session_14 · the round-9
  plan · the web-application skill §2/§13–§16 + the catalog's named
  skills · the Tailwind v4 report · the ssh-wrapper runbook). The neo-crm
  lineage repo stands as the tech-stack pattern reference — the patterns
  already carried verbatim.

## Phase 1 — The status validation (Verified — every claim re-proven)

| Doc claim | Live evidence |
| --- | --- |
| lint 0/0 · tsc 0 | Both green at HEAD |
| Unit 372/372 (29 files) | `bun run test` — 372 passed |
| Build 22 routes | Route table counted (the `┌` root line included) |
| Smoke 14/14 | The ladder green on :3210 with `db/smoke.db` |
| E2E 54/54 (6 specs) | `CI=1 bun run test:e2e` — 54 passed |
| Live parity COMPUTE IDENTICAL | `scripts/parity-199.ts` at 1280 + 390 |
| Content + mobile-menu NO DRIFT | `scripts/drift-199.ts` |
| Mobile-menu census (link-ride) | `scripts/mobile-census-199.ts` — byte-equivalent on both apps; link-ride navigates AND closes; sole delta OUR aria-expanded |
| Census MATCH 3+4 | `bun run db:census` (resolved path printed) |
| skills/ excluded | tsconfig `exclude`, eslint `ignores`, vitest include-allowlist |

No Tailwind v4 bug: the six re-pin traps verified (the round-8 re-pin
battery green inside the 372), the computed faces IDENTICAL, the e2e
mobile battery green. The standing config asks re-verified: `.env`/
db-path contract, the vitest/playwright configs, the sitemap/SEO family
(4 public locs + robots + manifest + the OG family, live-fetched), the
`.env.example` var-by-var, the screenshots pixel-health, the TODO/FIXME
sweep clean, the advisory ledger **unchanged at 10** (4 high, 5 moderate,
1 low — all dev-toolchain transitive; runtime zod ^4.6.7 above the GHSA
floor; no security driver).

## Phase 2 — The audit findings (the fresh angle: the KEYBOARD/FOCUS census — the skill §13's prescribed "Keyboard paths are tested" standing duty, never run in this domain)

**F-1 (HIGH, a11y, OUR superset surface) — the inbox + app-shell render
focused controls with NO visible focus indicator.** Live-computed
(settled, transitions applied) on the inbox at /dashboard:

- the status tabs (`role="tab"` buttons): `outline: none`,
  `box-shadow: none`, border unchanged — INVISIBLE focus;
- every row-action button (mark-read / archive / unarchive / the trash
  delete / confirm-delete / cancel): `outline: none`, `box-shadow: none`,
  border unchanged — INVISIBLE focus;
- the shell's logout button + home links: same — INVISIBLE focus.

Only the search input shows any cue (its authored
`focus:border-zinc-950` 1px border shift). Keyboard OPERABILITY itself
works everywhere (live-proven: Enter activates the tabs, the two-step
delete rides on Enter alone) — but the user cannot SEE where focus is: a
**WCAG 2.4.7 (Focus Visible) failure** on the surface the docs claim
"passes AA outright" (PAD §5.2, README's ♿ WCAG 2.2 AA row). axe-core
cannot catch this class (no focus-visibility-styling rule); the a11y
two-gate passes while 2.4.7 fails.

**F-2 (MEDIUM, parity, the reference-mirrored auth card) — the
sign-in button's focus ring computes a DIVERGENT color.** Live, settled,
both apps: OUR ring arm is `rgb(10, 10, 10) 0 0 0 4px` —
`--color-ring: #0a0a0a` (the session-9 S9-16 stock value, neutral-950) —
while the LIVE reference computes `rgb(9, 9, 11) 0 0 0 4px`
(**zinc-950, #09090b**). Imperceptible to the eye (1/255 per channel)
but a computed-face divergence by the parity doctrine's letter — and the
focus-face class sits in NO probe: `scripts/parity-199.ts` reads at-rest
faces only (zero focus/hover reads), the round-8 re-pin battery pins the
palette + `--shadow-sm`/`--blur-sm` but NOT `--color-ring`. The auth
card's INPUT rings are IDENTICAL to the reference (slate-400 4px over
the white 2px offset — verified live, settled); the divergence is the
`ring-ring` token arm alone (consumed by the submit family in
`page-layout.ts`, `login-reset.ts`, and the verify-code inputs).

**F-3 (the class) — the keyboard/focus family has NO pin anywhere.**
The e2e suite carries ZERO keyboard interaction (no `keyboard.` usage in
any spec); the parity probe reads at-rest faces only; axe cannot check
focus visibility; no unit battery pins the focus-visible source
contract. The class rode entirely on native-button luck — exactly the
genus rounds 6–9 closed for docs, tokens, pointers, and the dependency
tree: a prescribed standing duty (web-application skill §13: "Keyboard
paths are tested: Escape closes, Enter submits native forms, all
controls are real buttons/inputs") that this domain had never run.

**I-2 (LOW, the manual-cadence claim) — AGENTS' "522 packages" is
machine-unstable.** This sandbox's `bun install` reports **425**;
round-9's reported 522; the lockfile carries **526 package entries**.
Bun's install report is platform-conditional (optional deps per
platform/arch); the claim re-words to the platform-stable lockfile-entry
form.

**Positive findings (live-verified, no action):** the mobile menu is
keyboard-operable on BOTH apps (Enter opens — the toggle is a native
BUTTON at tabIndex 0; Enter on About navigates `#about` AND closes; the
sole delta OUR aria-expanded); the login form submits by Enter on both
(ours → the real /dashboard; the reference → `/`, its empty shell); the
landing links keep the browser-default visible outline on BOTH apps
(`outline: auto` — parity holds); the 404's home button carries the
outline-none+ring standard pattern; the toast viewport carries
`role="region"` + items `role="status"`; the session cookie is `secure`
in production; the security-header set is pinned (http-headers battery);
zero lint/type suppressions in src/; the OTP console delivery is
documented in-place (the demo contract).

## Phase 3 — The remediation ToDo list

1. **[R-1, TDD — the focus-contract battery]** Create
   `tests/focus-contract.test.ts` — born RED on the real bugs:
   - The `--color-ring` re-pin pin: globals.css must carry
     `--color-ring: #09090b` (the LIVE reference's computed focus-ring
     color — the zinc-950 v3 literal); the retired `#0a0a0a` never
     returns; every `ring-ring` consumer cited (the submit family +
     the verify-code inputs).
   - The inbox source contract (comment-stripped): every `<button`
     element in inbox-page.tsx carries the `focus-visible:ring` family
     (generic form — a new button without the family fails).
   - The app-shell source contract: the logout button + home links
     carry the family.
   - The search input keeps its authored `focus:border-zinc-950` (the
     existing visible cue, pinned).
   - The auth family keeps `focus-visible:ring-ring` (the reference's
     own pattern, pinned).
2. **[R-2, TDD — the keyboard-operability e2e spec]** Create
   `tests/e2e/keyboard.spec.ts` (self-sufficient; the house patterns) —
   born RED on F-1's computed face:
   - the mobile menu opens by keyboard (Enter on the toggle at 390) and
     a panel link rides by keyboard (Enter on About → `#about` + the
     panel closes);
   - the login form submits by keyboard (Enter in the password field →
     /dashboard);
   - the inbox tabs activate by keyboard (Enter on Archived);
   - the two-step delete rides on Enter alone (the spec's OWN probe row
     on an isolated `x-forwarded-for` bucket);
   - the focus-visibility computed pin: the focused tab computes a
     visible ring (`box-shadow` ≠ none) — F-1's gate-level face;
   - the auth card's focus-ring computed pin: the focused sign-in
     button computes the `rgb(9, 9, 11)` ring arm — F-2's gate-level
     pin (the round-8 blur(4px) trap pattern).
3. **[R-3, cure F-1]** The focus-visible family
   (`focus-visible:outline-none focus-visible:ring-2
   focus-visible:ring-ring focus-visible:ring-offset-2` — the auth
   card's own family, one design language; `ring-ring` now resolves to
   zinc-950) on: the inbox tab strip, every row-action button, the
   shell's logout + home controls. At-rest faces UNCHANGED (the family
   applies on focus-visible only) — the parity bar untouched.
4. **[R-4, cure F-2]** `globals.css`: `--color-ring: #0a0a0a` →
   `#09090b`, the comment recording the round-10 re-pin (the live
   reference's computed ring; the session-9 stock neutral-950 value
   retired).
5. **[R-5, cure I-2]** AGENTS' install line re-worded to the
   platform-stable form (526 lockfile entries; bun's report varies by
   platform).
6. **[Count ladder]** Unit 372/29 → 372+N/30; e2e 54/6 → 54+M/7 —
   the count-ladder battery enforces the re-anchor at EVERY live-tense
   site (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 ·
   the worklog Stage Summary) + the CLAUDE/SKILL prose family lists +
   the e2e spec enumerations. PAD §5.2's WCAG posture line gains the
   focus-visible family; PAD §10 records the round-10 close.
7. **[Mutation proof]** Both batteries must BITE (the ring token
   reverted · a focus-visible class dropped · the computed pin's
   rgb arm corrupted · a new button without the family · the search
   cue dropped) — every file restored byte-identical after.
8. **[Captures]** Re-run `scripts/capture-199.ts` against the dev
   server on :3000 — the 6 `ours-*` faces refreshed.
9. **[Doc lockstep]** `docs/session_15.md` (the session_13 house
   pattern — the formal round-10 log) + the worklog round-10 lines +
   this plan's execution record.
10. **[Gate re-proof]** The full chain re-run after the changes:
    `bun run gate` + `CI=1` e2e + the live parity/drift/mobile probes.
11. **[Ship]** One atomic commit on main; push via
    `python3 docs/ssh_git_wrapper_v3.py --key-file <key>`; remote ref
    verified == HEAD; the operator key shredded after.

## Phase 4 — The verification bar

- Both batteries born RED on the real bugs, then GREEN on the cured
  tree; the mutation proof bites on every class.
- The gate green at ship; the parity/drift/mobile bars re-proven (the
  at-rest faces untouched); the count ladder consistent everywhere; the
  push verified; the working tree clean; no key/shim/db/log artifacts
  staged.

## Phase 5 — The execution record (filled at ship)

- **R-1 born RED as designed** — 5/8 failures at birth (the ring token
  value · the retired value present · the inbox buttons · the shell
  button · the shell links), each pointing at a real audited bug; the
  three already-good contracts (the consumer citations, the search
  cue, the auth family) pinned green from the start. Two harness
  defects found and fixed AT BIRTH (the honest record): the `[^>]*`
  tag-regex truncated at JSX arrow `=>` (a quote/brace-depth scanner
  replaced it — else 7 of 8 buttons pass a match that never reached
  the className) and `<a ` missed multi-line anchors (`<a\s`).
- **R-2 born RED on the computed faces** — the keyboard rides green
  from the first run (the behaviors were always there — the class was
  VISIBILITY, not operability); the ring computed pin RED at first on
  the transition mid-flight (0.34px/alpha-0.09 observed — the
  settle-wait cure recorded in the spec).
- **The cures landed exactly as planned**: `--color-ring: #0a0a0a →
  #09090b`; the focus-visible family on all 8 inbox buttons + the
  shell's 3 controls (ring-ring on the white card, ring-white +
  ring-offset-zinc-950 on the dark bars).
- **The mutation proof: 8/8 bite** — the token reverted (unit ① ② AND
  the e2e computed pin: the reverted build computed exactly the
  audited rgb(10,10,10) face) · the inbox delete family dropped · the
  shell sign-out family dropped · the shell link family dropped · the
  search cue dropped · a new familyless button · the ladder family
  list drops the member — all files restored byte-identical (the
  /tmp-backup harness; the v1 harness's `git checkout` wiped the
  cures with the mutations on the uncommitted tree — the lesson
  recorded in the worklog's LIVE FINDS).
- **The count-ladder lockstep worked exactly as built**: the round-7
  battery went RED on the new file (the same four designed forcing
  REDs) and walked every site forward; the re-anchor landed 380/30
  (unit; 13/196 + 17/184) + 61/7 (e2e) at every live-tense site.
- **The AGENTS install claim platform-stabilized** (the lockfile's 526
  entries; bun's report varies by platform, 425–522 observed).
- **The advisory ledger held at 10** post-cure.
- **The captures re-run** — the 6 `ours-*` faces refreshed,
  pixel-verified.
- **The gate re-proof**: lint 0/0 · tsc 0 · **380/380 (30 files)** ·
  build (22 routes) · smoke 14/14 · e2e **61/61 (7 specs)** · parity
  COMPUTE IDENTICAL (both viewports) · drift NO DRIFT · the mobile
  census byte-equivalent.
- **Shipped** as one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py` (the paramiko shim), remote verified ==
  HEAD, key shredded.
