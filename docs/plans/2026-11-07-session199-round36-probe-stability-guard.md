# The Round-36 Remediation Plan — the PROBE-STABILITY guard (the cold-boot Fast-Refresh reload loop + the drift runtime budget) (session-199)

**The round's fresh angle:** the round's own live catch (F-36a,
HIGH, tooling — live-diagnosed while executing the operator's standing
probe battery in a fresh sandbox): the dev server's COLD-BOOT
FAST-REFRESH RELOAD LOOP. After a gate that runs `next build` (which
wipes `.next/dev`), the FIRST `bun run dev` boot can — intermittently —
enter an infinite full-page-reload loop: every HMR connect announces
`[Fast Refresh] rebuilding`, the page reloads at ~25ms cadence (126
main-frame navigations observed on ONE idle load; 549 `GET /` requests
in dev.log), and every live probe wedges or lies — the mobile census
dies with `Execution context was destroyed`, the toggle click lands on
an un-hydrated page (`aria-expanded` false — the operator's standing
emphasis LOOKS broken), parity/drift/captures hang or read fresh-boot
faces. The empirical cure (live-proven this round): RESTART the dev
server — the second boot reads the warmed `.next/dev` state and is
stable (the census re-proven byte-equivalent after the restart; NOT
reproduced on a controlled rebuild+boot — the pathology is
intermittent, which is exactly why the guard must catch it whenever it
fires).

The secondary catch (F-36b, informational — this round's own
near-miss): the drift script takes ~6.5 minutes end-to-end; wrapping it
in a sub-6-minute `timeout` kills it mid-flight and the kill cascade
FAKES a browser crash (`Target page, context or browser has been
closed` at whichever deep leg was in flight — resetFace, motionPrefs,
bodyInk all observed), with bun hanging after the kill. The budget must
be documented so no future agent misdiagnoses a healthy script.

## The census (round-36 discovery — live-diagnosed in this round's sandbox)

- **F-36a (the cold-boot Fast-Refresh reload loop — HIGH, tooling)**:
  the loop's console signature — `[HMR] connected` +
  `[Fast Refresh] rebuilding` pairs at sub-second cadence, the page
  fully reloading each time (the React DevTools banner re-logging per
  reload). The wedge family: every in-flight `evaluate`/`click` throws
  `Execution context was destroyed, most likely because of a
  navigation`; clicks between reloads land on un-hydrated pages (the
  mobile-menu toggle reads `aria-expanded` false after a click — the
  standing emphasis's exact false-negative). The dev.log signature:
  `GET /` flood + `✓ Compiled in 1ms` per request. The restart cure:
  the second boot serves a stable page (2 navigations on an idle load;
  the toggle opens; the census byte-equivalent). The controlled
  reproduction (wipe `.next` → `next build` → dev boot) did NOT loop —
  the pathology is intermittent; the guard exists to catch it whenever
  it fires, the round-33 precedent (the wedge class: silent minutes-long
  hangs → loud seconds-fast diagnosed errors).
- **F-36b (the drift runtime budget — informational)**: the drift
  script's 21 legs ride ~40 page loads, multi-second settle windows and
  two sequential-app passes — ~6.5 minutes wall-clock under bun AND
  node (both measured this round). A 5-minute wrapper kills a deep leg
  and the kill cascade produces the fake crash signature above. The
  budget: NEVER wrap `bun scripts/drift-199.ts` in a sub-10-minute
  timeout.
- **The standing re-validation at open** (all green, the round-35 ship
  state reproduced exactly): lint 0/0 · tsc 0 · 616/616 (55 files) ·
  build 22 routes · smoke 14/14 · e2e 126/126 · census MATCH · parity
  IDENTICAL both viewports · drift NO DRIFT ×21 (given the full
  runtime) · the mobile-menu census byte-equivalent — the operator's
  standing emphasis works exactly as expected, NO Tailwind v4 bug. The
  operator's standing login instruction executed (the reference's
  authed-world re-census — the PAD §2 record holds: the demo login →
  `/`, the derived-title 404 shells, zero cookies, the localStorage
  session family). The standing contract items verified intact (`.env`
  → `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ·
  vitest + playwright configs · the sitemap/SEO family ·
  `.env.example` · the neo-crm stack patterns embodied — the identical
  core pins). The advisory re-triage: the posture UNCHANGED (10
  advisories, all dev/build/test toolchain-transitive; the runtime zod
  4.6.7 above the patched floor — the PAD §10 ledger row stands, no
  security driver).

## The decision (the house doctrine applied)

**A probe-tooling cure ships** (a real defect in the probe tooling's
robustness — the operator's own mobile-menu emphasis was UNVERIFIABLE
until the dev-server restart; a future round hitting the loop cold
would conclude the menu is broken). NO parity-surface source changes.
The guard lives in the ONE door every live script already rides —
`scripts/probe-load.ts` → `probeLoad` — so all four scripts
(parity-199, drift-199, mobile-census-199, capture-199) inherit it
with zero script changes.

## The cure (TDD — the pin battery born RED on the current tree; the mutation proof follows)

1. **The stability ride in `probeLoad`** (`scripts/probe-load.ts`):
   - A main-frame navigation counter (`page.on("framenavigated")`,
     filtered to `page.mainFrame()`) attached AFTER the goto and
     detached in a `finally` (no listener leak across the drift
     script's ~40 calls).
   - The counter rides the EXISTING settle window (`waitForTimeout(1_200)`) —
     zero net time added on the healthy path.
   - A stray post-connect reload (the dev server's NORMAL
     on-demand-compile reload) gets ONE confirming extension window
     (`waitForTimeout(1_500)`): a stray reload settles and the load
     proceeds; a SUSTAINED loop keeps firing and the extension catches
     it.
   - The sustained loop throws the DIAGNOSED error — the message names
     the pathology (the cold-boot Fast-Refresh reload loop), its
     console signature (`[HMR] connected` + `[Fast Refresh]
     rebuilding`), and the empirical cure (RESTART `bun run dev` — the
     second boot reads the warmed `.next/dev` state). Loud failure in
     ~3 seconds instead of a silent minutes-long wedge.
2. **The born-RED pin battery extension** (`tests/probe-load-contract.test.ts`,
   +5 checks — the ⑥/⑦ blocks):
   - ⑥ the stability-guard contract: the counter's listener + mainFrame
     filter + the try/finally detach; the confirming extension window;
     the diagnosed throw (the message pins: the restart cure phrase +
     the Fast-Refresh signature phrase); the healthy-path keeps the
     existing three-member contract (domcontentloaded-first, the
     bounded networkidle, the 1_200 settle).
   - ⑦ the doc cures: AGENTS.md's probe-usage note names the stability
     guard (the reload-loop note) AND the drift runtime budget; the
     drift script's header names the budget (never a sub-10-minute
     wrapper).
3. **The mutation proof** (each class must bite, restored
   cmp-identical): M1 the counter's listener removed → the guard pins
   RED · M2 the confirming extension removed (first-window-only
   throw) → the extension/throw-shape pins RED · M3 the diagnosed
   message weakened (the restart-cure phrase dropped) → the message
   pin RED · M4 the AGENTS.md note reverted → the doc pins RED.
4. **The live proof** (the cure's own evidence, scratch probes OUTSIDE
   the repo — the house scratch discipline):
   - A synthetic looping page (a scratch HTTP server serving
     `<script>setTimeout(() => location.reload(), 120)</script>`) —
     `probeLoad` must THROW the diagnosed error in seconds.
   - A synthetic stray-reload page (one `location.reload()` on load,
     then stable) — `probeLoad` must PASS (the confirming window
     absorbs it).
   - The standing probes re-proven green against the dev server with
     the guard in place: the mobile census byte-equivalent · parity
     IDENTICAL both viewports · drift NO DRIFT ×21 (the full ~6.5-min
     runtime).
5. **The doc cures**: AGENTS.md (the probe-usage paragraph gains the
   stability-guard note + the drift budget note); the PAD (§5.2 gains
   the probe-stability record; the §7.1 count rows re-locked; the
   §7.3/§10 gate lines re-locked); CLAUDE.md + SKILL.md name the guard;
   the worklog round-36 entry + verification line; the count ladder
   re-locked at every site (616+N / 55 · e2e 126/8 unchanged); the
   session log `docs/session_66.md` + this plan doc.
6. **The captures refresh** (the operator's standing screenshot
   instruction): the 18-capture set re-run via `scripts/capture-199.ts`
   against the dev server; byte-compare against the committed set;
   PIL-verify non-blank.
7. **The cleanup**: the round's scratch probes (the isolation rides,
   the console captures, the synthetic loop server, the monitor) live
   OUTSIDE the repo (`/home/z/my-project/scratch/`) and are never
   committed.

## The execution order

R-1 the plan written + validated against the tree → R-2 the born-RED
pin battery extension (⑥/⑦) → R-3 the cure (the stability ride in
`probeLoad`) → battery GREEN → R-4 the mutation proof (M1–M4 — each
class must bite) → R-5 the live proof (the synthetic loop + the stray
reload + the standing probes re-proven) → R-6 the doc cures + the
count-ladder re-lock → R-7 the captures refresh → R-8 the full gate
(lint → typecheck → test → build → smoke → e2e) → R-9 the session log
+ the ship (the SSH wrapper, main only).
