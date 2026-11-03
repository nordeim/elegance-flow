I'll start executing this task chain. Let me first check the workspace state and refresh the repository.
Workspace exists. Let me refresh it with git pull and check status.
Workspace refreshed to `82d383b` (round-8 + session_12 log). Let me set up the task plan and review the core documentation.
Now the remaining core docs:
Now the PAD and status docs:
The PAD is large; let me read it in sections directly from the file:
PAD internalized. Now the status docs:
Now session_11.md to complete the status-doc review:
Status docs internalized — this is **round-9** of the standing re-validation cadence at fresh HEAD `82d383b` (owner added `docs/session_12.md`, the round-8 transcript). Now the mandated repo skills:
The web-application skill internalized. Now let me scan the skills catalog for the relevant skills this round:
Skills catalog scanned — relevant this round: `web-application` (read), `tailwind-patterns`, `tdd`, `agent-browser`, `clone-app-pat-pro` (all used in prior rounds; parity already established). Now validating understanding against the codebase:
`.env` verified with the mandated contract. Now the census + configs:
Configs verified — `skills/` excluded across tsconfig/eslint/vitest. Now running the gate — starting with lint + typecheck + unit:
Lint 0/0 · tsc 0. Unit suite:
367/367 (28 files) — matches docs. Build:
Build green — 22 routes. Smoke ladder:
Smoke 14/14. E2E suite (CI=1, fresh server):
**Full gate green at HEAD `82d383b`**: lint 0/0 · tsc 0 · 367/367 (28) · 22 routes · smoke 14/14 · e2e 54/54. Now the live probes — starting the dev server:
Parity COMPUTE IDENTICAL at both viewports. Drift probe + mobile census:
Mobile-menu census: **byte-equivalent on both apps** — link-ride navigates AND closes; sole delta our `aria-expanded` (documented a11y superset). **No Tailwind v4 bug.** Now the standing config asks — sitemap/SEO + `.env.example`:
All config asks verified. Now the standing advisory re-triage (`bun audit`):
Advisory ledger unchanged (10, all dev-toolchain-transitive; runtime zod ^4.6.7 above the floor). Now the fresh-eyes audit for round-9. Let me examine angles not covered by prior rounds — starting with the scripts census and repo hygiene:
Working tree clean. Let me check for orphan scripts — `parity-199b.ts` and `install_packages.sh` look potentially stale:
`install_packages.sh` is a CRM-era straggler — it installs the RETIRED dependency set (radix, recharts, zustand, jspdf, html2canvas-pro, cva). Let me confirm the reference and check the live deps:
A genuine round-9 catch is emerging. Let me understand the recovery-path premise before deciding the cure:
The finding is confirmed: `install_packages.sh` (the npm-world recovery path) still installs the **retired CRM dependency set** — 11 orphan packages — while **missing `zod`** (a live runtime dep). Same straggler class as round-3's sitemap. Let me map the full delta:
Fully mapped. Let me also verify `fast-check` and `axe-core` have live consumers (the dead-dependency census is another standing angle):
A second finding: `fast-check` has zero imports. Let me sweep the whole tree to confirm it's truly dead (including scripts):
Both findings mapped. `fast-check` was session-172's CRM-era property-family devDep — its consumer (`tests/property.test.ts`) retired with the domain, the declaration stayed. Let me sweep for more CRM-era stragglers and check what pins `package.json`:
`globals.css` carries dead recharts focus rules — a third straggler. Let me see the context:
All three utilities show zero consumers. Let me be rigorous — checking dynamic class construction and the full globals.css before concluding:
Zero consumers anywhere. Let me verify these dead utilities don't even emit into the build (Tailwind v4 `@utility` tree-shaking) and check what the tests pin about globals.css:
No pins on the utilities — only the `@theme` block is pinned. Let me complete the full dead-dependency census across every declared package:
`fast-check` is the sole dead dep. Let me verify the `tw-animate-css` consumption path (vendored vs npm) since it matters for the recovery script:
The vendored copy is what globals.css imports — the npm `tw-animate-css` package may also be dead. Checking:
The npm `tw-animate-css` is never imported — the vendored copy is the only consumer path. Let me check the git history to understand the vendoring decision:
`axe-core` needs scrutiny — the a11y spec must load it somehow. Checking:
`axe-core` is consumed by file-path injection (`node_modules/axe-core/axe.min.js`) — not dead. Final census: **fast-check + tw-animate-css (npm) are the dead deps**. Now let me check the screenshots health and the existing battery structures I'll extend:
All captures healthy. Now let me study the count-ladder battery's lockstep structure (the new battery must join it):
Audit is nearly complete. Let me run one more live probe — the reference's login card (the drift probe covers the landing; the auth card deserves a fresh look given the operator's credentials):
Login card face IDENTICAL. The audit is complete — four findings, one class. Let me verify the exact import forms for the consumer-citation map before writing the plan:
All citations mapped. The audit is complete. Now writing the round-9 remediation plan (house pattern) before executing:
Plan written. Now TDD — let me check the house comment-strip helper pattern first:
House patterns clear. Before finalizing the citation map, one empirical question: is `@types/react-dom` even consumed (nothing imports react-dom directly)? Testing:
tsc is green without `@types/react-dom` — it's a third dead dep (compile-unconsumed, empirically proven). Let me check `next-env.d.ts` for react-dom references before finalizing the citation map:
`react-dom` is next's required render peer — that's the honest citation. Let me check the house file-walker pattern used by the census batteries:
Writing the round-9 battery — born RED on the real bugs:
Let me fix two defects in my battery — the `.test(` phantom-census collision (my own header documents the lesson!) and the `existsSync` awkwardness:
The TDD moment — the battery must be born RED on the real bugs:
5/5 born RED. Let me confirm each failure is the expected real bug (not a harness defect):
Every failure is the exact audited bug. Now the cures — R-3 first (the manifest is the truth the script mirrors):
Manifest at 19 — matches the citation map. Now R-2, the recovery-script cure:
Now R-4 — remove the three dead `@utility` blocks from globals.css:
Now the battery should go GREEN on the cured tree:
5/5 GREEN. Now the mutation proof — writing the harness in the workspace scripts dir (not the repo):
**6/6 mutations bite, files restored, battery GREEN.** Now the count-ladder re-anchor — the lockstep battery will enumerate every site that must move:
Exactly the four designed lockstep REDs (372/29 now). Mapping every live-tense site to re-anchor:
All sites mapped. Executing the re-anchor — first the battery's category list:
Now the doc re-anchors — AGENTS.md, CLAUDE.md, README.md:
Now the PAD (§7.1 split row, §7.3, §10) and SKILL §7:
Now the prose family lists in CLAUDE.md and SKILL §7:
Now the worklog's live-tense verification line, then check the ladder:
Ladder 7/7 GREEN. Now the package-count re-census (AGENTS' manual cadence) and the full unit suite:
**372/372 (29 files)** — new ladder holds. Package count 526 → 522 (AGENTS' manual-cadence claim):
Advisory ledger unchanged at 10 — PAD §10 row stays accurate. Now the captures refresh (dev server on :3000):
All captures refreshed and healthy. Now the docs leg — the round-9 session log:
Now the worklog round-9 lines (Work Log entry + Stage Summary bullet):
Worklog updated. Now the plan doc's execution record:
Docs complete. Full unit suite to confirm the lockstep holds across all doc edits:
372/372 holds. Now the full gate re-proof — lint, typecheck, build:
Build 22 routes · smoke 14/14. E2E:
E2E 54/54. Final live probes on the remediated tree:
All bars green on the remediated tree. **FULL GATE: lint 0/0 · tsc 0 · 372/372 (29) · 22 routes · smoke 14/14 · e2e 54/54 · parity IDENTICAL · drift NONE.** Now the ship phase — verifying the final change set:
Change set is exactly the intended delta. Now the SSH wrapper runbook:
Runbook internalized. Checking the shim from prior rounds and materializing the operator key:
Key verified. Committing with the house-style message:
Committed as `d851e1d`. Now the push — dry-run first (shim on PATH, `--remote` override):
Dry-run clean — `82d383b..d851e1d` fast-forward, remote unmoved. Executing the real push:
Let me verify the remote ref explicitly and confirm key cleanup:
The wrapper's own post-push verification already confirmed `remote verified: refs/heads/main @ d851e1d == local HEAD`. Confirming key cleanup and tree state:
Push verified — remote main @ `d851e1d` == HEAD, tree clean, no key residue. Cleaning up scratch files and stopping the dev server:
## Round-9 shipped — `d851e1d` on main, remote verified == HEAD ✅

**Status validation at the owner's `82d383b`:** full gate green (lint 0/0 · tsc 0 · 367/367 · 22 routes · smoke 14/14 · e2e 54/54), parity **COMPUTE IDENTICAL** at 1280+390, drift **NO DRIFT**, mobile-menu census byte-equivalent on both apps (link-ride navigates AND closes; sole delta our `aria-expanded`), a fresh login-card probe IDENTICAL, **no Tailwind v4 bug**. All config asks verified (`.env` db contract, configs, sitemap/SEO, `.env.example`).

**The audit catch (fresh angle — the dead-code census):** the npm recovery script still installed the **retired CRM set** (11 packages, missing live zod/axe-core); **three dead deps** (`fast-check`, npm `tw-animate-css`, `@types/react-dom` — zero consumers, empirically proven); **three dead `@utility` blocks** in globals.css (one targeting retired recharts).

**The TDD cure:** `tests/dead-code-census.test.ts` born RED 5/5 on the real bugs → cures landed (script rewritten to the live 19-package set, `bun remove` × 3, dead CSS removed — computed face unchanged, parity re-proven) → **6/6 mutations bite**. Count ladder re-anchored **372/29** at every live-tense site; packages claim 526 → 522; advisory ledger unchanged (10, all dev-toolchain). Captures refreshed, session_13 + worklog + plan + five root docs updated — one atomic commit pushed via the SSH wrapper, key shredded, no new branches.
