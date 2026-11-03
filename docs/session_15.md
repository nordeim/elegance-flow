`docs/session_13.md` logs the round-9 re-validation (the dead-code
census at the owner's `82d383b`); `docs/session_14.md` is the
owner-committed narration transcript of that session. Now at fresh HEAD
`ba734f3`, this round: the clone re-orientation, the gate + both live
probes + the mobile-menu census re-proven, a fresh-eyes audit — and
the keyboard/focus class closed: the `--color-ring` re-pin, the
superset's focus-visible source contract, and the keyboard-operability
e2e battery finally sit under the gate.

## Re-orientation

Fresh clone at `ba734f3` (the delta from round-9's ship `d851e1d` is
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

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **372/372 (29 files)** ·
  build (**22 routes**) · smoke **14/14** · e2e **54/54 (6 specs)**.
- **Live parity**: `scripts/parity-199.ts` — **COMPUTE IDENTICAL at 1280
  + 390** (the oklab/rgba s18 serialization class excluded, same paint).
- **Drift**: `scripts/drift-199.ts` — **NO DRIFT** (content face + the
  mobile menu's open DOM).
- **The mobile-menu census (the operator's standing emphasis)**,
  `scripts/mobile-census-199.ts` live on BOTH apps at 390×844: the
  same 5 links + the amber CTA, link-ride navigates `#about` AND
  closes on both; the sole delta OUR `aria-expanded` (the documented
  invisible a11y superset). **No Tailwind v4 bug** (the six re-pin
  traps unit-gated since round-8, computed faces IDENTICAL).
- The standing config asks re-verified: the vitest/playwright configs
  (the `skills/` exclusions — tsconfig exclude + eslint ignores + the
  vitest include-allowlist), the sitemap/SEO family (the 4 public locs
  + robots + manifest + the OG family, live-fetched), `.env.example`
  var-by-var, the screenshots pixel-health, the TODO/FIXME sweep
  clean, the security headers, the cookie `secure`-in-production flag,
  zero lint/type suppressions in src/.

## The audit — the fresh angle: the KEYBOARD/FOCUS census (the skill §13's prescribed "Keyboard paths are tested" standing duty, never run in this domain)

**F-1 — OUR superset surface rendered focused controls with NO visible
focus indicator (a WCAG 2.4.7 Focus-Visible failure on the surface the
docs claimed "passes AA outright").** Live-computed settled (the
transitions applied) on the inbox at /dashboard: the status tabs and
EVERY row-action button (mark-read / archive / unarchive / the trash
delete / confirm-delete / cancel) computed `outline: none`,
`box-shadow: none`, borders unchanged; the shell's sign-out button and
home links likewise. Only the search input showed any cue (its
authored `focus:border-zinc-950` 1px border shift). Keyboard
OPERABILITY itself worked everywhere (live-proven: Enter activates the
tabs, the two-step delete rides on Enter alone) — but the user could
not SEE where focus was. axe-core cannot check focus-visibility
STYLING (no such rule) — the a11y two-gate passed while 2.4.7 failed.

**F-2 — the auth card's sign-in button focus ring computed a DIVERGENT
color from the live reference.** Live, settled, both apps: OUR ring arm
`rgb(10, 10, 10) 0 0 0 4px` — `--color-ring: #0a0a0a`, the session-9
S9-16 stock shadcn near-black (neutral-950) — vs the LIVE reference's
`rgb(9, 9, 11) 0 0 0 4px` (**zinc-950, #09090b**). Imperceptible to
the eye (1/255 per channel) but a computed-face divergence by the
parity doctrine's letter — and the focus-face class sat in NO probe:
`parity-199.ts` reads at-rest faces only, the round-8 re-pin battery
pins the palette + `--shadow-sm`/`--blur-sm` but NOT `--color-ring`.
The auth card's INPUT rings were IDENTICAL to the reference (the
slate-400 4px arm over the white 2px offset — verified settled); the
divergence was the `ring-ring` token arm alone.

**F-3, the class — the keyboard/focus family had NO pin anywhere.**
Zero keyboard interaction in the e2e suite (no `keyboard.press` in any
spec); the parity probe reads at-rest faces; axe cannot check focus
visibility; no unit battery pinned the focus-visible source contract.
The class rode entirely on native-button luck — the same genus rounds
6–9 closed for docs, tokens, pointers, and the dependency tree.

**Positive findings (live-verified, no action):** the mobile menu is
keyboard-operable on BOTH apps (Enter opens — the toggle is a native
BUTTON at tabIndex 0; Enter on About navigates AND closes); the login
form submits by Enter on both (ours → the real /dashboard; the
reference → `/`, its empty shell); the landing links keep the
browser-default visible outline on BOTH apps (parity holds); the 404's
home button carries the outline-none+ring standard pattern; the toast
viewport carries `role="region"` + items `role="status"`.

**I-2 — AGENTS' "522 packages" claim was machine-unstable.** This
sandbox's `bun install` reports 425; round-9's reported 522; the
lockfile carries 526 entries. Bun's install report is
platform-conditional — the claim re-worded to the platform-stable
lockfile-entry form.

**The standing duty re-triaged (I-1, unchanged):** `bun audit` reports
10 advisories (4 high, 5 moderate, 1 low) — ALL dev-toolchain
transitive; the runtime direct zod is ^4.6.7, above the GHSA floor.
Zero runtime exposure; no security driver.

## The remediation (TDD)

- **`tests/focus-contract.test.ts` (+8 checks)** — **born RED on the
  real bugs** (5/8 at birth: the ring token value, the retired value
  present, the inbox buttons, the shell button, the shell links; the
  three already-good contracts — the consumer citations, the search
  cue, the auth family — pinned green from the start). The contract:
  ① the `--color-ring` re-pin pin (`#09090b` — the LIVE reference's
  computed ring; the retired `#0a0a0a` never returns; every `ring-ring`
  consumer cited: the page-layout submit family · the login-reset
  submits · the verify-code inputs); ② the inbox source contract
  (every `<button>` carries the focus-visible ring family, GENERIC —
  a new familyless button fails, proven by mutation); ③ the shell
  source contract (the WHITE variant — the shell's bars are
  bg-zinc-950, a zinc-950 ring would vanish on them); ④ the search
  cue pin; ⑤ the auth family pin. Two harness lessons recorded
  in-place: the `[^>]*` tag-regex truncates at JSX arrow `=>` (a
  quote/brace-depth scanner instead — else 7 of 8 buttons pass a
  match that never reached the className), and the scanner must match
  `<a\s` for multi-line anchors.
- **`tests/e2e/keyboard.spec.ts` (+7 checks, the 7th spec)** — the
  keyboard rides (Enter opens the mobile menu at 390 + Enter rides a
  panel link navigates AND closes · Enter in the password field
  submits → /dashboard · Enter activates the inbox tabs · the
  two-step delete rides on Enter alone on the spec's OWN probe row at
  the `198.51.100.212` XFF bucket) + the two computed pins: the
  focused tab computes a ring (F-1's gate-level face — `box-shadow`
  ≠ none, read after a Shift+Tab keyboard focus) and the sign-in
  button computes `rgb(9, 9, 11) 0px 0px 0px 4px` (F-2's gate-level
  pin, the round-8 blur(4px) trap pattern — with the settle-wait
  lesson: the card's `transition-all duration-200` ANIMATES the ring
  in, 0.34px/alpha-0.09 mid-flight observed at birth).
- **The cures**: `--color-ring: #0a0a0a` → `#09090b` in globals.css
  (the at-rest faces untouched — the family applies on focus-visible
  only, the parity bar re-proven); the focus-visible family on all 8
  inbox buttons + the shell's 3 controls (one design language:
  `focus-visible:ring-ring` → zinc-950 on the white card;
  `focus-visible:ring-white focus-visible:ring-offset-zinc-950` on
  the dark bars).
- **The mutation proof: 8 classes, 8 REDs** — the token reverted
  (the unit pair AND the e2e computed pin — the reverted build
  computed exactly the audited `rgb(10,10,10)` face) · the inbox
  delete family dropped · the shell sign-out family dropped · the
  shell link family dropped · the search cue dropped · a new
  familyless button · the ladder family list drops the member — every
  file restored byte-identical (the /tmp-backup harness — the v1
  lesson: `git checkout` on an UNCOMMITTED tree wipes the cures with
  the mutations), 8/8 green after.
- **The count ladder re-anchored 372/29 → 380/30 (unit) + 54/6 →
  61/7 (e2e)** at every live-tense site (AGENTS · CLAUDE · README ·
  PAD §3.2/§5.2/§7.1/§7.3/§10 · SKILL §4/§7 · the worklog Stage
  Summary), the category split now 13 batteries/196 + 17
  contracts/184, the new family in the CLAUDE/SKILL prose lists — the
  round-7 lockstep battery itself went RED on the new file (the same
  four designed forcing REDs) and walked every site forward, exactly
  as designed.
- **The AGENTS install line platform-stabilized** (the lockfile's 526
  entries; bun's install REPORT varies by platform, 425–522 observed).
- **The advisory ledger re-triaged post-cure**: unchanged — 10
  advisories, all dev-toolchain-transitive.

## The round's deliverables

`tests/focus-contract.test.ts` (the mutation-proven battery) ·
`tests/e2e/keyboard.spec.ts` (the keyboard-operability spec, the 7th) ·
the re-pinned `--color-ring` + the focus-visible families
(inbox-page.tsx + app-shell.tsx) · the plan doc
`docs/plans/2026-11-04-session199-round10-keyboard-focus-census.md` ·
the refreshed dev-server capture set (the 6 `ours-*` faces under
`docs/screenshots/`, pixel-verified) · this log + the worklog round-10
lines.

## The gate re-proof before ship

The full chain re-run after the changes: lint 0/0 · tsc 0 · **380/380
(30 files)** · build (22 routes) · smoke 14/14 · e2e **61/61 (7
specs)** — plus the live parity/drift/mobile probes re-proven — then
the push to main via `docs/ssh_git_wrapper_v3.py` (the paramiko shim —
this sandbox has no OpenSSH binary), remote ref verified == HEAD, key
shredded, no new branches.

**Suggested next:** the standing cadence — `bun audit` re-triage each
round; the round-10 battery extends the self-enforcing perimeter to
the interaction class itself: an unfocused control, a reverted ring
token, or a keyboard regression is now a red test, not a probe
discipline.
