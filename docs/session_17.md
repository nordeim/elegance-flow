`docs/session_15.md` logs the round-10 re-validation (the keyboard/focus
census at the owner's `ba734f3`); `docs/session_16.md` is the
owner-committed narration transcript of that session. Now at fresh HEAD
`c62976e`, this round: the clone re-orientation, the gate + both live
probes + the mobile-menu census re-proven, a fresh-eyes audit — and the
state-face + client-error classes closed: the inbox's five state faces
and the zero-console/page-error census finally sit under the gate, and
the census's first live catch (the designed 404's React #418 hydration
mismatch on the standalone artifact) is cured at the source.

## Re-orientation

Workspace refreshed at `c62976e` (the delta from round-10's ship
`e4aa92b` is `docs/session_16.md` alone — a doc, no code). The
environment: `.env` carries the mandated contract
`DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), probe
residue reseeded, census **MATCH (3 + 4 users)**. The doc set
re-internalized (AGENTS · CLAUDE · README · PAD v2.0 · the skill
v1.199.0 · the worklog · session_15 + session_16 · the round-10 plan ·
the web-application skill §13–§16/§20 + the catalog · the Tailwind v4
report · the ssh-wrapper runbook). The neo-crm lineage repo stands as
the tech-stack pattern reference — the patterns already carried
verbatim.

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **380/380 (30 files)** ·
  build (**22 routes**) · smoke **14/14** · e2e **61/61 (7 specs)**.
- **Live parity**: `scripts/parity-199.ts` — **COMPUTE IDENTICAL at 1280
  + 390** (the oklab/rgba s18 serialization class excluded, same paint).
- **Drift**: `scripts/drift-199.ts` — **NO DRIFT** (content face + the
  mobile menu's open DOM).
- **The mobile-menu census (the operator's standing emphasis)**,
  `scripts/mobile-census-199.ts` live on BOTH apps at 390×844: the same
  5 links + the amber CTA, link-ride navigates `#about` AND closes on
  both; the sole delta OUR `aria-expanded` (the documented invisible
  a11y superset). **No Tailwind v4 bug** (the six re-pin traps
  unit-gated since round-8, computed faces IDENTICAL).
- The standing config asks re-verified: the `.env`/db-path contract,
  the vitest/playwright configs (the `skills/` exclusions), the
  sitemap/SEO family (the 4 public locs + robots + manifest + the OG
  family), `.env.example` var-by-var, the screenshots pixel-health, the
  TODO/FIXME sweep clean, the security headers, the cookie
  `secure`-in-production flag, zero lint/type suppressions in src/.
- The advisory ledger re-triaged: **unchanged — 10 advisories (4 high,
  5 moderate, 1 low), all dev-toolchain transitive**; runtime zod
  ^4.6.7 above the GHSA floor; no security driver.

## The audit — the fresh angle: the INBOX-STATE census (the skill §20 pre-ship's "Empty-state, loading, and error paths exercised for every changed surface", never run in this domain) + the CLIENT-ERROR census

**F-1 — the inbox's five state faces were implemented and live-working
but carried by ZERO gate coverage.** Live-probed (route interception on
the dev server): the initial-load face (`Loading inquiries…` + spinner,
guarded on `loading && rows === null` — a refresh keeps the stale rows,
no blank flash), the network-error face (`role="alert"` + "Network
error — check your connection and try again."), the server-error face
(the HONEST envelope message surfaced verbatim, with the envelope-less
fallback), the empty-search face (the query echoed), and the recovery
face (an error clears on the next good load). But the dashboard-inbox
e2e battery pins rows/tabs/transitions/delete/search/sign-out/401 —
never a state face — and no unit battery pinned the state source
contracts. A regression (the catch dropped, `role="alert"` removed,
`setError(null)` lost) would ship green through every gate: the
prescribed pre-ship standing duty, never run for this surface — the
same genus as round-10's keyboard census.

**F-2 — the e2e suite carried ZERO console-error/page-error pins.**
The skill §18's incident family (hydration mismatch, effect races,
production-only crashes) is invisible to lint, tsc, unit, AND
behavior-asserting e2e — no spec listens to `page.on("console")` or
`page.on("pageerror")`. The dev-server sweep of all six surfaces found
only expected entries (the documented dev-only AUTH_SECRET warning; the
browser's own resource report of the designed 404) — clean, but riding
on luck.

**THE LIVE CATCH — the designed 404 shipped a React #418 hydration
text mismatch on EVERY real 404 of the standalone artifact.** The
round's e2e census was BORN RED on it: the prerendered `/_not-found`
(the build table's `○` static route) bakes the build-time pathname —
`"_not-found"` — into the HTML, while the client's first render
interpolates the REAL unmatched path via `usePathname()` → React #418
(text content mismatch) → React discards the server HTML and re-renders
client-side. Invisible to every existing gate: the smoke ladder curls
the 404's STATUS; the e2e 404 pin (landing.spec) read the settled face
AFTER React's recovery re-render — the visible face was always correct;
the DEV server renders the 404 per-request and never shows the class.
Only a console/page-error listener on the production artifact catches
it — exactly the census this round added.

**Positive findings (live-verified, no action):** all five state faces
work; the two-`[role="alert"]` census resolves to the Next.js route
announcer (`__next-route-announcer__`, expected platform behavior);
the PAD §10 known-issues register current; git tree clean.

## The remediation (TDD)

- **`tests/inbox-states.test.ts` (+18 checks)** — the source-contract
  battery: ① the loading face (the `loading && rows === null` guard +
  the text + the spinner + the boot state); ② the error faces
  (`role="alert"` + the network message with its THREE arms counted +
  the honest-envelope fallback + rows cleared on error); ③ the empty
  faces (both messages + the query-echo ternary); ④ the recovery
  contract (`setError(null)` on ok + both failure arms); ⑤ the busy
  contract (the busyId key + the disable on all FIVE row actions + the
  finally reset + the double-fire guard); ⑥ the refresh contract
  (setLoading + void load + disabled + the spin). Born GREEN (the
  states work — the honest record, the round-10 ③–⑤ precedent) — and
  the mutation proof itself STRENGTHENED two pins (the network-message
  count and the disable floor 4→5: dropping one of the arms left the
  pins green — the first-drop-bites doctrine applied).
- **`tests/e2e/inbox-states.spec.ts` (+10 checks, the 8th spec)** —
  born RED on the real bug (the #418): the five state faces ridden
  against the real UI via route interception (a delayed GET → the
  loading face; an aborted GET → the network alert; a 500 envelope →
  the honest message; the heal → recovery; the garbage query → the
  miss echo) + the CLIENT-ERROR census (zero console errors + zero
  page errors on the landing at 1280 AND 390, the login card, the
  authenticated dashboard; the designed 404's SANCTIONED register —
  only the true-404 document's own resource report allowed, zero page
  errors everywhere).
- **The cure — the two-phase decode in `not-found-body.tsx`**: hydrate
  with the baked literal (`"_not-found"` — the exact value the
  prerendered HTML carries, so hydration compares equal), then fill
  the real path after mount (the landing scroll-state idiom). The
  visible face settles to the reference's face (the real path — the
  landing.spec 404 pin still green); the #418 is dead at the source.
  The landing unit battery (+2) pins the decode.
- **The mutation proof: 8/8 bite** — the alert role dropped · the
  network message reworded (all arms) · `setError(null)` dropped · the
  busy disable dropped · the loading guard broken · the empty message
  dropped · **the two-phase decode reverted (the e2e leg: the rebuilt
  artifact re-throws the exact `Minified React error #418` and the
  census goes RED on it)** · the census register corrupted (a broken
  sanctioned pattern fails on the healthy app — the census reads real
  entries, never vacuously green). All files restored byte-identical
  (the /tmp-backup harness), 11/11 green after.
- **Two harness lessons recorded** (the worklog's LIVE FINDS): the
  naive `//` comment-stripper eats the `/^\//` regex literal (a
  quote/regex-aware stripper local to the new contract — the round-10
  extractor-lesson's next member), and the `.test(` census-collision
  bit LIVE again in the fresh files (`.match` everywhere — the
  count-ladder regex counts a bare `.test(` as a test block).
- **The count ladder re-anchored 380/30 → 400/31 (unit; 13 seam
  batteries/196 + 18 source contracts/204) + 61/7 → 71/8 (e2e)** at
  every live-tense site (AGENTS · CLAUDE · README · PAD
  §3.2/§7.1/§7.3/§10 · SKILL §7 · the worklog Stage Summary), the new
  family in the CLAUDE/SKILL prose lists — the round-7 lockstep
  battery itself going RED on the new file and forcing every site
  forward, exactly as designed.
- **The advisory ledger held at 10** post-cure.
- **The captures re-run** — the 6 `ours-*` faces refreshed,
  pixel-verified.

## The round's deliverables

`tests/inbox-states.test.ts` (the state source contracts) ·
`tests/e2e/inbox-states.spec.ts` (the state-face rides + the
client-error census, the 8th spec) · the two-phase decode cure in
`src/app/not-found-body.tsx` (+ the landing battery's decode contract)
· the plan doc
`docs/plans/2026-11-04-session199-round11-inbox-state-census.md` · the
refreshed dev-server capture set · this log + the worklog round-11
lines.

## The gate re-proof before ship

The full chain re-run after the changes: lint 0/0 · tsc 0 · **400/400
(31 files)** · build (22 routes) · smoke 14/14 · e2e **71/71 (8
specs)** — plus the live parity/drift/mobile probes re-proven — then
the push to main via `docs/ssh_git_wrapper_v3.py` (remote ref verified
== HEAD, key shredded, no new branches).

**Suggested next:** the standing cadence continues — each round
re-proves the gate + probes and picks a fresh audit angle; the
client-error class is now gate-pinned (a future hydration mismatch or
uncaught client error is a red test, not a console nobody reads), and
the state faces are ridden, not just implemented.
