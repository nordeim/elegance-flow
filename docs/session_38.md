I'll start by internalizing the operating instructions and setting up the workspace. This is a large multi-phase task, so let me create a structured plan first.
Workspace has been reset — I'll clone the elegance-flow repo fresh.
Repo cloned successfully. It's a mature project with extensive session history (session-199 rounds 17-20). Now let me review the core documentation.
Core docs reviewed. Now let me read the Project Architecture Document and explore the docs structure.
Now let me review the requested session documents.
I now have a clear picture of the project status. The repo is a mature session-199 lineage at round-20 (`2a35e90`), with gate claims: lint 0/0 · tsc 0 · unit 496/496 (40 files) · build 22 routes · smoke 14/14 · e2e 85/85. Let me update my todos and validate against the actual codebase.
`.env` is missing (workspace was reset). Let me find the relevant skills in the catalog, then set up the environment.
Skills internalized. Now let me set up the environment per the repo's bootstrap contract and run the full validation gate.
数据库已启动并符合种子合同。现在正在分阶段运行完整的验证网关。
第一阶段 GREEN (lint 0/0 · tsc 0 · 496/496 unit)。接下来进行第二阶段：build + smoke。
Build 22 routes ✓, smoke 14/14 ✓. Phase 3: e2e against the standalone artifact.
Playwright browser binaries are missing (workspace reset). Installing Chromium.
**FULL GATE GREEN at `2a35e90`**: lint 0/0 · tsc 0 · unit 496/496 (40 files) · build 22 routes · smoke 14/14 · e2e 85/85 — every doc claim verified against the codebase. Status validation complete.

Now let me start the dev server and run the live probes (parity + drift + mobile census), and clone the neo-crm reference repo in parallel.
Dev server up, neo-crm cloned. Running the live probes now.
All live probes GREEN: parity IDENTICAL both viewports · drift NO DRIFT (9 legs) · mobile census byte-equivalent. The documented status is fully re-proven.

Now let me review the neo-crm reference repo docs (as the tech-stack patterns source).
neo-crm's tech-stack patterns confirmed — same family contract (gate chain, CI=1 e2e, drift doctrine, mobile nav parity). EleganceFlow already carries these patterns from the lineage.

Now for the fresh-angle audit (round-21). Let me examine what surfaces have never been probed. First, the carousel implementation:
Our carousel is click-only (no timer). Let me check what round-19 recorded about the carousel and identify unprobed surfaces for the fresh-angle census.
The carousel's auto-advance behavior and the Google button's click ride were never probed. Let me study the drift script's house pattern, then write the round-21 discovery probe.
Let me check our Google button implementation, then write the round-21 discovery probe.
Our Google button shows an honest "not configured" info toast — the reference's Google button click ride was never probed. Let me write the round-21 discovery probe (carousel auto-advance + keyboard Tab ride + Google button ride).
Discovery results: **Leg B (keyboard Tab order) — IDENTICAL 8/8 stops, clean census. Leg C (Google button) — MAJOR finding**: the reference's button fires a REAL Google OAuth redirect (`accounts.google.com` → `app.base44.com/api/apps/auth/callback`), ours fires an info toast. Leg A's section finder failed — let me fix it and verify our toast behavior.
The testimonial heading is "Trusted by clients" (not "What Clients Say"), and the toast container sits exactly at `bottom=innerHeight` (my `<` check failed). Fixing the probe:
Discovery results are now clean and revealing:
- **Leg A (carousel auto-advance)**: NO on both apps — clean census, identical quote/geometry/aria
- **Leg B (keyboard Tab order)**: IDENTICAL 8/8 stops — clean census
- **Leg C (Google button)**: **THE CATCH** — the reference fires a real Google OAuth redirect (base44's client_id, `app.base44.com/api/apps/auth/callback`); ours shows an honest info toast

Let me extend the discovery with three more side-effect-free legs (select options, contact/footer link hrefs, and the viewport resize ride on the mobile menu).
**Leg F (resize ride) — the mobile menu works perfectly across the full resize cycle on both apps**: 1280→390 (hamburger appears, "Open menu") → open (panel + "Close menu") → back to 1280 (desktop nav restored, panel gone). Sole delta: our documented `aria-expanded` a11y superset. **Legs D/E clean**: identical select options/links.

Discovery complete. Now let me audit the recent code changes (round-20's cure sites) for code-quality issues — Mode C audit.
Code audit of recent changes is clean. Let me verify the remaining surfaces: seed seam, sitemap/SEO, vitest/playwright configs.
All infrastructure verified: sitemap (byte-format contract + live-route census pin), robots, metadata family, vitest/playwright configs, seed seam. Let me check the toast system's a11y surface (our pure-superset component) and then settle the round-21 findings.
The toast carries `role="status"` — a11y is sound. Let me verify the Tailwind v4 re-pin block integrity (the user's standing emphasis) in globals.css:
All 8 Tailwind v4 re-pin traps verified intact. Let me check whether our Google button's honest-toast fallback is already pinned by any test:
The Google button's CLICK behavior (our honest-toast fallback) is never pinned by any test — that's the curable gap. Let me check the keyboard spec coverage too:
The keyboard rides are pinned but not the full Tab-order census. Let me probe our Google-button toast behavior in detail (both viewports) to hunt for real defects before writing the plan:
The Google toast fallback is clean at both viewports (bottom-right desktop / top mobile, role=status, auto-dismiss 4s, zero errors). The catch is the **missing pin** — no test covers this user-visible behavior. Let me verify the .env.example contract matches the code before writing the plan:
`.env.example` contract fully matches the code (all six env vars are live imports). The audit is complete. Now let me write the round-21 remediation plan per the repo's doctrine.
Plan written. Now validating it against the codebase before execution — checking all insertion points:
All insertion points validated. Now executing the plan with TDD. First, let me check the house battery idioms (comment-stripping discipline):
House idiom understood. Let me check how the count-ladder census counts the battery files, then write the born battery:
The census auto-counts live from the tree. Now writing the born battery (R-1):
Check ② needs the window to start at `<button` (type=button precedes the className). Fixing:
Battery 4/4 GREEN (pin battery on correct behavior — the catch was the coverage gap). Now the mutation proof to demonstrate every check bites:
Python method-name error — the mutations never applied. Redoing M2/M3 correctly:
**Mutation proof 4/4 classes bite** (M1: 2 RED · M2: 2 RED · M3: 1 RED · M4: 2 RED), tree restored cmp-identical. Now R-2 — the e2e leg:
E2E leg added. Now R-3 — the drift script's 10th leg. Let me study the execution block and the authfail leg as the template:
Now let me read the diff helper to write the [google] leg correctly:
Now adding the [google] leg to the drift script:
Now the execution block and report lines:
Typecheck and run the extended drift probe:
The REF side read `(none)` params — the route captured a bare `https://accounts.google.com/` URL while the full-params URL bypassed interception. Let me run a focused experiment to understand exactly what the reference's button does:
**Experiment decoded**: the click navigates the main frame to the platform's OWN endpoint `GET /api/apps/auth/login?from_url=…&app_id=…` (document request) which **302-redirects** to the full Google OAuth URL — and redirect followers bypass route interception, which is why the params read `(none)`. The reliable capture is the `framenavigated` event. Let me rewrite the leg correctly:
Now update the execution block to include the platform endpoint pin:
**NO DRIFT — all TEN legs.** Now R-4: the count ladder re-anchor. Running the unit suite to see the census failures:
500 checks / 41 files. Adding "google-fallback" to the SOURCE_CONTRACTS list, then getting the authoritative stale-site list:
The census gives the authoritative stale-site list. Let me find every count site and update them all:
Let me check which doc sites the census reads for the "27 source contracts" and worklog verification claims:
Now updating all count sites across the five root docs:
Now the PAD and SKILL updates:
Now the SKILL doc updates:
Let me add the R-21a record to the SKILL's superset section (§4) and update the worklog:
Now updating the worklog — the round-21 entry and the verification line:
Census 7/7 GREEN. Now R-6 — the captures. Let me check the capture script and add the google-toast leg:
All 9 captures PIL-verified non-blank. Let me visually verify the new google-toast capture with a cropped view:
Visual capability unavailable this session (the round-20 precedent) — the PIL check + drift-leg live DOM read + e2e assertion stack is the evidence chain. Now the remaining doc-lockstep items — session log + plan Phase-5:
Now filling the plan's Phase-5 execution record:
Docs in lockstep. Now retiring the scratch discovery probes (house convention) and running the full gate:
Full gate GREEN: 500/500 unit · 22 routes · smoke 14/14 · e2e 86/86. Let me confirm the new google toast e2e leg ran:
Now the final live probes (parity · drift · mobile census):
ALL FINAL PROBES GREEN. Filling the plan's R-8 record, then setting up the SSH push:
SSH wrapper procedure understood. Let me check the environment (ssh binary / paramiko) and set up the shim:
Shim deployed. Now the final pre-commit verification and commit:
Commit `5dc8ce7` created on main, tree clean. Now the SSH push — materializing the key (0600, outside the repo), dry-run first:
Dry-run GREEN — remote at `2a35e90`, fast-forward to `5dc8ce7` ready. Real push:
**PUSH VERIFIED** — remote `refs/heads/main @ 5dc8ce7 == local HEAD` (independently confirmed over HTTPS), tracking ref synced, operator key shredded. Let me clean up the dev server and finalize:
All tasks complete. Here's the round-21 wrap-up:

## Summary

**Round-21 re-validation shipped** — commit `5dc8ce7` pushed to `main` via the SSH wrapper (remote ref verified == local HEAD, key shredded, no new branches).

**Status validation at open (`2a35e90`)**: every doc claim re-proven live — full gate GREEN (lint 0/0 · tsc 0 · 496/496 · 22 routes · smoke 14/14 · e2e 85/85), parity COMPUTE IDENTICAL both viewports, drift NO DRIFT (9 legs), mobile census byte-equivalent. Environment rebuilt per contract (`.env` → `DATABASE_URL="file:../db/custom.db"`, `db/` at root, census MATCH).

**Fresh-angle audit** (surfaces no probe ever read, using the repo's `web-application` + `tdd` skills):
- **Mobile menu** (your standing emphasis): byte-equivalent **plus the new viewport-resize ride** — the full 1280→390→open→1280 cycle behaves identically on both apps. No Tailwind v4 media-query bug; all 8 documented re-pin traps verified intact.
- **Clean censuses**: keyboard Tab order (8/8 stops identical), carousel never auto-advances on either app, select options + mailto/tel hrefs identical.
- **R-21a (record)**: the reference's Google button fires a *real* Google OAuth redirect (base44's client_id/callback) — unimplementable self-hosted; our honest toast stays, now pinned.
- **Live mechanism find**: Playwright route interception misses 302 redirect followers — `framenavigated` is the reliable capture (drift leg's 10th leg now re-reads both faces every run).

**TDD cure**: `tests/google-fallback.test.ts` (4/4 green, mutation proof 4/4 classes bite) + e2e toast ride (86/86) + drift leg → ladder re-locked at **500 unit / 41 files · 86 e2e**. Screenshots refreshed (9 `ours-*` + new `ours-google-toast-1280.png`, PIL-verified). All docs in lockstep (session_37, plan, worklog, PAD, SKILL v1.200.0). Vitest/Playwright configs, sitemap/SEO family, and `.env.example` all verified matching the codebase.

**Next steps**: the standing rotation continues — round-22 could census the reference's signup-view submit rides (needs a side-effect decision) or the intermediate 768px viewport; or address R-21a properly by wiring a real OAuth provider if you supply Google credentials.
