I'll continue the task chain. Let me set up the work plan and start by refreshing the workspace.
Repo cloned at `ba734f3` (round-9 dead-code census round complete). Now let me review the structure and core docs.
All target docs exist, including `docs/session_14.md`. Prior rounds already delivered `.env.example`, `db/`, vitest/playwright configs, screenshots. Let me read the core docs now.
Now the architecture document:
Core docs understood. Now the status docs:
`docs/session_14.md` is the round-9 execution transcript; the owner's HEAD commit `ba734f3` added it. Now session_13 and the round-9 plan:
Round-9 is fully shipped; the owner added `session_14.md` (transcript) at HEAD. This round is **round-10** of the standing cadence. Let me read the full worklog and check the repo skills:
Worklog fully internalized — this is **round-10** of the standing cadence at owner HEAD `ba734f3`. Now the mandated repo skills:
Skill refreshed. Now the catalog and environment setup in parallel:
Skills catalog scanned. Now environment setup — bun install, `.env` contract, db push/seed/census:
`.env` created with the mandated contract. Now install and DB setup:
Census MATCH (3 + 4 users). Note: bun reports 425 packages here (AGENTS claims 522 — the manual-cadence claim; I'll re-check in the audit). Now the gate — lint, typecheck, unit:
Unit 372/372 (29 files) — matches docs. Now build + smoke:
Playwright browsers missing in this fresh sandbox — installing:
**Full gate green at HEAD `ba734f3`**: lint 0/0 · tsc 0 · 372/372 (29) · 22 routes · smoke 14/14 · e2e 54/54. Now the live probes — dev server + parity/drift/mobile census:
All live probes green — parity IDENTICAL both viewports, NO DRIFT, mobile census byte-equivalent, no Tailwind v4 bug. Now the fresh-eyes audit for round-10:
`parity-199b.ts` is a deliberately-exempted historical diagnostic — not a straggler. Now the guardrail-hygiene and security sweep:
Clean on suppressions. Checking console usage and cookie security:
Cookie `secure` in prod ✓. Checking whether the OTP console.info is gated by the disable knob:
OTP logging is documented in-place ("the console log stays either way") — accepted-and-written. Now toast a11y and README badge drift:
Toast carries `role="status"` ✓, badges match package.json ✓. Now investigating the bun package-count discrepancy (AGENTS claims 522; fresh install reports 425):
Lockfile carries 526 entries; bun's install report varies by platform (425 here, 522 in round-9's sandbox) — the AGENTS claim is machine-unstable. Noting it. Now checking next.config.ts for the security-headers story (an angle no prior round touched):
Security headers present (the reference's edge set). Now checking the 404 superset's pin coverage, SEO family live, and TODO sweep:
404 pinned, TODO clean, gitignore solid. Now probing a candidate pin-gap: the `skills/` exclusion contract — what file types live under skills/, and is the exclusion pinned by any battery?
tsconfig + eslint exclude skills/ — but vitest.config.ts shows no match. Let me inspect it:
vitest uses an include allowlist (src/ + tests/ only) — skills/ is excluded by design, and the tsconfig/eslint exclusions are self-enforcing (the 81 skills .ts files would fail the gate if swept). Now the SEO family live check:
SEO family healthy. Now checking the inbox e2e keyboard coverage and http-headers battery:
The inbox e2e has no keyboard assertions. Checking across all e2e specs and the a11y spec:
**Zero keyboard usage across the entire e2e suite** — while the web-application skill §13 prescribes "Keyboard paths are tested" and we claim WCAG 2.2 AA (which requires keyboard operability 2.1.1 that axe cannot verify). This is a genuine unpinned class candidate. Let me probe both apps live to map the real keyboard behaviors before deciding:
Mobile menu + login Enter behaviors mapped (both apps keyboard-operable; ref's Enter-login lands on `/` — the empty shell — vs our real `/dashboard`). My inbox probe's button selector missed — checking the house login locator:
Tabs carry `role="tab"`. Fixing the probe:
The full picture emerges — keyboard operability works, but **`focusedTabOutline: outlineStyle "none", boxShadow false`** — no visible focus indicator on OUR inbox tab. Let me map the exact scope — all inbox controls + the login card + landing, both apps:
Tabs have zero focus classes at source level. Checking the row-action buttons, confirm/cancel, and the app-shell:
All inbox row buttons lack focus styles too. Now the comprehensive computed focus-face census — ours vs reference:
The focus census reveals real findings — but shadows may be mid-transition. Re-probing with settle waits for accurate faces:
Settled faces are decisive. The login card's input rings MATCH the reference — but the **sign-in button's focus ring computes rgb(10,10,10) (neutral-950 #0a0a0a) vs the reference's rgb(9,9,11) (zinc-950 #09090b)** — a real focus-face divergence. And the inbox controls have **invisible focus** (WCAG 2.4.7 failure on our own surface). Finding the ring's source:
The submit uses `focus-visible:ring-ring` — the `ring` theme token. Checking its value in globals.css:
The smoking gun: `globals.css:101` pins `--color-ring: #0a0a0a` (neutral-950, a session-9-era value) while the **live reference's** ring computes rgb(9,9,11) = **zinc-950 #09090b** — a focus-face divergence on the auth card, and the focus-face class was never in the parity probe's face set. Checking whether the ring token is pinned:
Both gaps confirmed: the ring token is unpinned and the parity probe reads at-rest faces only. Mapping the ring-token blast radius before writing the plan:
Blast radius mapped — the ring token feeds the auth family only (all reference-mirrored or our own auth surfaces). Checking the 404's documented `focus:outline-none` known issue:
The 404's button already carries `focus:ring-2 ... ring-slate-500` (outline-none + ring = the standard pattern) — not a cure target. The audit is complete. Running the standing advisory re-triage:
Advisory ledger unchanged (10, all dev-toolchain). One last look at the e2e config + the round-8 computed-pin pattern I'll model:
The audit is complete. Writing the round-10 remediation plan (house pattern):
Plan written and validated against the audited evidence. Now enumerating the exact cure surfaces (the plan's validation pass):
Full inventory: 8 inbox buttons + 3 shell controls. Now studying the house battery patterns before writing the RED battery:
Studying how existing batteries pin classNames (auth-surfaces pattern):
`toContain` whole-reads are the house pattern. One design check before writing the battery — the shell's dark background (a zinc-950 ring would vanish on zinc-950):
Dark shell → white focus family there; zinc-950 ring token family for the inbox card. Now the e2e house patterns for the keyboard spec:
Patterns internalized. Now TDD — writing the unit battery **born RED** on the real bugs:
**Born RED exactly as designed — 5/8 failures, each the exact audited bug.** Now the cures. First the ring token:
Now the inbox buttons — adding the focus-visible family to all 8:
Now the app-shell — the white variant family on sign-out + both links:
One more button found by the battery (the generic contract doing its job). Locating it:
The battery's naive regex truncates tags at arrow-function `=>` — the failure surfaced a real harness defect (the good kind: the TDD loop catching my own tooling). Fixing the extractor to skip `>` inside JSX expressions and strings:
The shell links are now multi-line (`<a\n`) — the anchor scanner needs `\s` matching:
**8/8 GREEN on the cured tree.** Now the e2e keyboard spec — checking the login form's DOM order for deterministic Tab navigation:
DOM order confirmed (email → password → submit). Checking the storageState opt-out pattern, then writing the spec:
Two defects in my spec: `test.use` inside a test is invalid (needs describe-level), a stray non-English fragment in a comment, and I need the real row locator. Checking the house row locator first:
Rewriting the spec correctly — two describes (logged-out opt-out vs shared state), house row locators, clean comments:
Now the lockstep moment — the full unit suite with the new file (the count-ladder battery should go RED, forcing the doc re-anchor):
The lockstep battery went RED exactly as designed — the same 4 forcing REDs as round-9. Adding the family to the battery's list, then re-anchoring every site:
Before re-anchoring docs, I must prove the e2e spec green (its Tab-focus assumptions need live validation). Building and running just the keyboard spec:
7/8 green — all keyboard rides work. Debugging the ring pin failure against the standalone build:
The ring IS applying — my read caught `transition-all duration-200` mid-flight (0.34px of 4px, alpha 0.086). Adding the settle wait:
**8/8 green.** Now the mutation proof — every class must bite. Writing the harness (git-guaranteed restoration):
**Harness bug caught**: `git checkout --` restores to HEAD, but my cures are UNCOMMITTED — the proof wiped them. The battery's "born RED" state is actually still correct evidence (it fails 5/8 on the now-pre-cure tree — the same 5 birth failures). Re-applying the cures, then fixing the harness to use /tmp backups:
All cures wiped as suspected. Re-applying them exactly:
Cures re-applied. Fixing the harness to use /tmp backups (git checkout is unsafe on an uncommitted tree):
**7/7 bite, restored byte-identical, 8/8 green.** One more proof leg — the e2e computed pin must bite too (revert token → rebuild → the ring check RED):
The e2e pin bites on exactly the audited face (`rgb(10,10,10)`). Now rebuild with the cure and run the full e2e suite for the new count:
**E2E: 61/61 across 7 specs.** Now the count-ladder re-anchor at every live-tense site — AGENTS first (including the R-5 packages-claim re-word):
Now CLAUDE.md:
Now README.md:
Now the PAD — §3.2, §5.2, §7.1, §7.3, §10:
Now PAD §10 (the round-10 close in the ledger sentence):
Now the SKILL §7 (unit + e2e sections and family enumerations):
The SKILL §4 superset posture line and the worklog verification line:
Only the worklog verification line remains:
**380/380 (30 files) — ladder holds.** Now the worklog round-10 lines:
A stray duplicate at line 37 — inspecting the region:
The earlier "failed" MultiEdit actually left a merged line (my entry spliced into the LIVE FINDS line). Repairing — remove the duplicate entry, restore the LIVE FINDS head:
Worklog repaired, ladder green. Adding the round's lessons to LIVE FINDS:
Worklog complete. Now `docs/session_15.md` — the formal round-10 log (session_13 house pattern):
Now the plan doc's execution record (Phase 5):
Now cleanup + dev-server restart + live probes on the cured tree:
All probes green on the cured tree. Now the captures refresh:
All captures pixel-verified. Now the full gate re-proof before ship:
**FULL GATE GREEN**: lint 0/0 · tsc 0 · 380/380 (30) · 22 routes · smoke 14/14 · e2e 61/61 (7 specs). Now the ship phase — verifying the final change set:
Change set is exactly the intended delta. Now the SSH wrapper runbook:
Runbook internalized. Checking for the ssh binary / deploying the paramiko shim:
Key verified. Committing with the house-style message:
Committed as `e4aa92b`. Now the push — shim on PATH, dry-run first:
Dry-run clean — `ba734f3..e4aa92b` fast-forward, remote unmoved. Executing the real push:
The wrapper's own post-push verification already confirmed the remote ref; let me get one explicit direct verification for the record:
**Push verified directly**: remote `refs/heads/main @ e4aa92b == local HEAD`. Final state checks:
## Round-10 shipped — `e4aa92b` on main, remote verified == HEAD ✅

**Status validation at the owner's `ba734f3`:** full gate green (lint 0/0 · tsc 0 · 372/372 · 22 routes · smoke 14/14 · e2e 54/54), parity **COMPUTE IDENTICAL** at 1280+390, drift **NO DRIFT**, mobile-menu census byte-equivalent on both apps, **no Tailwind v4 bug**. All standing config asks verified (`.env` db contract, vitest/playwright configs, sitemap/SEO live-fetched, `.env.example`, screenshots health).

**The audit catch (fresh angle — the keyboard/focus census, the skill §13's prescribed standing duty never run in this domain):**
- **F-1**: Our superset surface (inbox tabs, every row-action button, shell controls) rendered focused controls with **no visible focus indicator** — a WCAG 2.4.7 failure on the surface the docs claimed "passes AA outright". Keyboard *operability* worked (Enter rides everything); the class was *visibility* — and axe cannot check focus styling.
- **F-2**: The auth card's sign-in ring computed `rgb(10,10,10)` (`--color-ring:#0a0a0a`, session-9 stock) vs the live reference's `rgb(9,9,11)` (zinc-950) — a focus-face divergence no probe read (parity reads at-rest faces only).
- **F-3**: Zero keyboard pins anywhere in the e2e suite.

**The TDD cure:** `tests/focus-contract.test.ts` (+8, born RED 5/8 on the real bugs) pins the `--color-ring` re-pin (#09090b) + the focus-visible source contracts; `tests/e2e/keyboard.spec.ts` (+7, the 7th spec) pins the keyboard rides + both focus computed faces — **8/8 mutation classes bite** (including the e2e computed pin recomputing the exact audited divergence on the reverted build). Cures: the ring token re-pinned, focus-visible families on all 8 inbox buttons + 3 shell controls. Count ladder re-anchored **380/30 unit · 61/7 e2e**; parity re-proven IDENTICAL; captures refreshed; advisory ledger unchanged (10, all dev-toolchain); AGENTS' package claim platform-stabilized. One atomic commit pushed via the SSH wrapper, key shredded, no new branches.

**Suggested next:** the standing cadence continues — each round re-proves the gate + probes and picks a fresh audit angle; an unfocused control or keyboard regression is now a red test, not a probe discipline.
