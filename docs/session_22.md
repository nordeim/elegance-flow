工作区已存在。我先拉取最新更改并查看仓库状态。
The workspace is on `main` and clean at `ca1579d`. Let me pull to confirm freshness and check the docs mentioned by the user.
Pull brought in `docs/session_20.md`. Let me check the new HEAD and read the key status documents.
Round-12 is complete (`ca1579d` pushed), and the owner added `session_20.md`. This is the **round-13** cycle. Let me set up the task plan and read the core docs.
Now the Project_Architecture_Document.md and the round-12 plan + worklog tail.
让我阅读 PAD 的关键部分（testing §7, known issues §10）以及 worklog 的尾部。
The worklog confirms round-12 shipped at 406/32 unit · 72/8 e2e. Let me skim `session_19.md` to complete the intake.
Intake complete. This is **round-13** at owner's `7f42923`. Now let me check the environment and internalize the repo skills for the audit.
Environment is ready. Now internalizing the repo skills for the audit.
Skill internalized. Now the **status validation** — running the full gate chain at HEAD `7f42923`.
Lint 0/0 · tsc 0. Now unit tests:
Unit **406/406 (32 files)** — matches docs. Now build + smoke:
Smoke 14/14. Let me verify the route count and run e2e:
22 routes confirmed. Now the e2e suite (CI=1 for a fresh server):
**FULL GATE GREEN at HEAD**: lint 0/0 · tsc 0 · 406/406 (32) · 22 routes · smoke 14/14 · e2e 72/72. Now the live probes — starting the dev server:
All live probes green. Status validation complete — matching every doc claim. Now the **round-13 fresh-angle audit**. Let me survey what no gate reads yet:
Carousel is pinned. Let me check the head-asset family — the OG image, favicon, and what the metadata references vs what assets exist:
Assets exist. Let me verify their integrity and the manifest's references:
Head-asset family is complete (positive finding). Now let me probe the two strongest unprobed dimensions: **intermediate viewports** (parity only reads 1280/390) and the **landing's focus faces** vs the live reference:
The parity script is hardcoded to 1280/390 — the **md (768) and lg (1024) breakpoint boundaries are unprobed by every gate**. That's the round-13 fresh angle. Let me also check the landing's focus faces (round-10 compared only the auth card's ring live). Writing a scratch probe:
Intermediate viewports: **CLEAN — zero deltas** (positive finding). Now the second candidate — the landing's focus-visible faces vs the live reference (round-10 compared only the auth card):
**The audit bites!** The landing's focus-ring faces diverge from the live reference: ours `oklab(...zinc-950.../0.5)` vs REF `rgba(10,10,10,0.5)` — on nav links, CTAs, filter chips, carousel selector, submit, hamburger (the `auto` outlines are VISIBLE). Plus form inputs: ours `none` vs REF `solid 2px transparent`. Let me find the mechanism:
Found the mechanism — a **cure-collision**: our globals.css carries the CRM-era universal rule `* { outline-color: color-mix(in oklab, var(--color-ring) 50%, transparent) }` (session-193, pinned when `--color-ring` was #0a0a0a). Round-10 re-pinned `--color-ring` to #09090b (zinc-950) for the auth card — silently dragging the universal outline-color face along. The live reference carries BOTH: zinc-950 for the sign-in ring AND `rgba(10,10,10,0.5)` for UA outlines. Let me verify the input-face mechanism too:
**The mechanism is a genuine Tailwind v4 trap** — the `outline-none` semantic rename: in the reference's v3 build, `outline-none` = `outline: 2px solid transparent; outline-offset: 2px`; in our v4 build it's `outline-style: none`. Same class, different computed face. Let me census all `outline-none` carriers and the auth card's faces:
The landing's 4 form controls carry `outline-none` (the parity surface). The superset surfaces deliberately pair `focus-visible:outline-none` with ring classes — different family. Now let me check the auth card's input faces on both apps (the other reference-mirrored surface):
More findings: the auth card's INPUTS also diverge (REF `solid 2px transparent` + `offset 2px` vs ours `none`), and the REF's sign-in button at plain `:focus` computes `solid 3px rgb(255,255,255)`. Let me get the full class strings and matched rules:
The reference's compiled CSS confirms the trap: its `.outline-none` = `outline: rgba(0,0,0,0) solid 2px; outline-offset: 2px` (v3 semantics). Now let me find the rule behind the REF sign-in button's `solid 3px white` outline at plain focus:
The mechanism is narrowing. Let me run the decisive experiment — at-rest vs keyboard-focus faces on both apps, plus which universal rules exist on the REF:
The picture is nearly complete — the reference's landing bundle ships a universal `outline-color: rgba(10,10,10,0.5)` (shadcn base over neutral-950), while its auth card (base44 platform bundle) relies on Chrome's adaptive `auto`. One decisive micro-check on the auth button's plain-focus state:
Paradox: `:focus-visible` matches and the only matched author rules say `2px transparent`, yet computed is `solid 3px white` — something my walk skips (invalid selector lists throw in `matches()`) or a UA rule. Let me use CDP for the true matched rules:
The CDP reveals it: UA `:focus-visible { outline-color: -webkit-focus-ring-color; outline-style: auto; outline-width: 1px }` + the author rules — the `solid 3px white` is Chrome's adaptive UA ring serialization at programmatic focus (an engine artifact, not a keyboard-user face). The parity-relevant faces are clear now. Let me verify the auth card's broader at-rest faces for completeness:
The auth card shows MORE drift: foreground color (ours neutral-950 vs REF zinc-950), Google button (slate-700 vs warm-black), padding/height families, divider classes. Let me run the deeper census — real keyboard focus on the sign-in button, element heights, and the Google/divider faces:
The 90ms reads caught mid-animation faces (the card's `transition-all duration-200` animates rings in — the round-10 settle-wait lesson). Let me re-read with proper settle-waits:
Settled faces confirm: **the ring families match** (round-10's pins hold — rgb(9,9,11)@4px on both), and the outline family diverges exactly per the v3→v4 `outline-none` rename (REF: `solid 2px transparent + offset 2px`; ours: `none`). The auth card also shows at-rest drift (foreground token, Google button, divider, padding). Let me examine our login-card source and what the batteries pin:
**CONFIRMED — F-4 is a live reference drift**: the base44 platform redesigned its auth card's token family (slate utilities → `--sem-*` semantic tokens) after our 2026-11-03 byte-verification. Our mirror now diverges on the Google button ink/border, divider ink, card foreground, and input/button padding. Let me complete the standing sweeps before writing the plan:
The audit is consolidated. Let me complete the last checks — the Google button's hover faces on the live reference, and any existing pins on the tokens I'll change:
Google at-rest faces confirmed divergent. One quick hover-face check, then I'll write the plan:
Hover faces diverge too (REF: warm `#f1eeea`/`#ddd8d2` vs ours slate-50/slate-300). The audit is complete. Let me write the round-13 remediation plan:
Plan written. Per the doctrine, let me validate it against the codebase — reading the round-10 battery (the closest genus) for the house pattern:
The house pattern is clear. Now let me read the drift probe structure for the R-3 extension:
Plan validated against the codebase. Now executing **R-1 — the TDD battery, born RED on the live tree**:
**Born RED 18/19** — every real divergence bites (only the designed keeps-green `--color-ring` check passes). Now **R-3** — extend the drift probe with the login-face census, proven born-RED on the pre-fix tree:
Fixing the type widening (the parity script's permissive-Face pattern) and adding the diff calls:
Now the born-RED live proof — running the extended drift probe against the pre-fix tree:
**Born-RED live proof complete** — the login census detects the exact 6-field divergence. Now **R-2 — the cures**. First `globals.css`:
The foreground re-pin landed. Now the border block — applying separately with exact context:
Now the universal outline-color rule:
Now the landing form controls (outline-none → outline-hidden) and the page-layout members:
Now the page-layout.ts members (input py-2 + outline-hidden, submit px-3 py-2 + outline-hidden, google ink/border/hover, divider ink):
Now login-reset.ts and login-card.tsx (the verify inputs):
All cures applied. Now run the battery — expecting GREEN:
Battery GREEN 19/19. Now the full unit suite — the count-ladder lockstep should force the designed REDs:
The designed lockstep REDs — live census is now **425/33**. Let me see the two class-string pins that need the re-anchor:
Both re-anchored. Now the count-ladder re-anchor — first confirm the categorized split:
The ladder list updated. Now **R-4 — the e2e legs**. Let me read the keyboard spec's structure:
Adding the two round-13 e2e checks to the keyboard battery:
Now restart the dev server and verify the cures live — drift should go NO DRIFT:
**NO DRIFT both legs.** Now parity (the at-rest faces must stay IDENTICAL):
Parity holds. Let me re-verify the focus faces on the remediated tree:
The colors are cured, but the landing form controls still compute `none` — the `outline-hidden` utility may not be compiling. Let me check:
The DOM carries the class — but is the CSS rule compiled? Checking the actual stylesheet:
The compiled CSS shows `.outline-hidden` generating TWO rules — one must be wrapped in a media query. Let me check the context:
**Critical v4.3 discovery**: `outline-hidden` in v4.3 = `outline-style: none` normally, with the 2px transparent outline ONLY under `forced-colors` — NOT the v3 face! Let me check the composition utilities:
`outline-hidden` in v4.3 is style:none + forced-colors-only — the wrong face. The v3 face needs the **composition** `outline-2 outline-transparent outline-offset-2`. Let me verify the @property default then revise the cure:
Confirmed — `initial-value: solid`. Revising the cure to the composition everywhere:
Now updating the battery pins to the composed forms:
All green. Now the live verification of the composed face:
The live re-verification caught my own cure: the landing's REF default border is `rgb(229,229,229)` (neutral-200 — the app bundle), while the auth page's was gray-200 (the platform bundle). **The reference ships two different latent defaults across its bundles** — one universal token can't match both. The landing is the parity-gated surface → revert `--color-line` to #e5e5e5 and record the auth platform default as the documented delta:
**ZERO focus-face deltas both viewports.** Full live verification sweep on the remediated tree:
All faces now identical. Full unit suite — only the doc-ladder REDs should remain:
425/425 — only the doc-ladder REDs remain. Now the **R-5 count-ladder re-anchor** across every live-tense site:
The docs are re-anchoring. Now the prose family lists — the SKILL's contract list and the worklog verification line:
Ladder green. Full unit suite confirmation:
Unit 425/425 · lint clean, but tsc trips on my scratch probe's type. Quick fix:
The one-shot investigative probes served their purpose (findings recorded in the plan). Removing the type-broken ones; keeping the re-usable censuses for the mutation proof:
tsc clean. Now rebuild and run the full e2e suite (expecting 74/74):
**E2E 74/74.** Now **R-6 — the mutation proof** (the /tmp-backup harness):
M6 bites. Now the live drift leg — reapply M3+M4 (the pre-fix login world) and prove the drift census re-detects:
Live drift leg bites. Now the e2e mutation leg — M1 rebuilt into the artifact, the new check must go RED:
The e2e pin bites on the mutated artifact. Restore, rebuild, and verify byte-identical:
**Mutation proof complete — 6/6 classes + live drift leg + e2e leg, all restored byte-identical, 425/425 + 74/74.** Now R-7 — the captures refresh:
Captures refreshed and pixel-healthy. Visual check on the login capture (this round's most-changed surface):
I can't view images directly — using the programmatic comparison instead (the computed-face evidence is already conclusive via the drift probe):
Pixel diff is within capture-alignment noise (the computed-face census is the bar — NO DRIFT on every load-bearing face). Now **R-8 — the doc lockstep**. First the trap census (six → seven):
Now the Tailwind-V4-Validation-Report gains trap ⑦:
Now the PAD §10 round-13 row and the worklog lines:
Ladder stays green. Now the plan's execution record and the session log:
Now the session_21.md log (the session_19 house pattern):
Session log written. Now **R-9 — the full gate re-proof**:
**FULL GATE GREEN.** Final live probes on the remediated tree:
All probes green. **R-10 — ship.** Stop servers, remove scratch probes, read the push runbook:
Runbook internalized (round-11 lesson: `--remote` explicitly). Checking the tree before commit:
Two stray files from an earlier cp mistake (`src/globals.css`, `src/page-layout.ts`) — removing them:
Tree is exactly the expected delta. Committing with the house message style:
Committed `882c4fd`. No ssh binary — deploying the Appendix-A paramiko shim per the runbook:
Dry-run clean — remote at `7f42923`, fast-forward to `882c4fd`. The real push:
## Round-13 delivered — `882c4fd` pushed to main, remote verified == HEAD ✅

**Status validation at the owner's `7f42923`:** full gate green (lint 0/0 · tsc 0 · 406/406 (32) · 22 routes · smoke 14/14 · e2e 72/72), parity **COMPUTE IDENTICAL** at 1280+390, drift NO DRIFT, mobile-menu census byte-equivalent (link-ride navigates AND closes), no Tailwind v4 bug in the six pinned traps. All standing config asks verified: `.env`/db contract, vitest/playwright (`skills/` excluded), SEO/sitemap, `.env.example`, advisories unchanged (10, all dev-toolchain).

**Audit (fresh angle — the FOCUS-FACE census, the interactive faces no probe read):**
- **F-1 (HIGH)**: the landing's focus-outline color computed zinc-950@50% where the live reference computes `rgba(10,10,10,0.5)` — a round-10 **cure-collision** (the `--color-ring` re-pin silently dragged the universal outline rule; the reference carries two independent tokens).
- **F-2 (MEDIUM)**: the **SEVENTH Tailwind v4 trap** — the `outline-none` rename (v3 computes 2px-solid-transparent + offset-2, verified live via CSSOM/CDP; v4 spells style:none).
- **F-4 (MEDIUM)**: the auth card **drifted** — base44's semantic-token refresh moved its ink family after the 2026-11-03 byte-verification; no probe ever read /login.

**TDD cure:** `tests/focus-outline.test.ts` (+19, 33rd file) born RED 18/19 → cures → green. Two harness finds caught by live re-reads: v4.3's `outline-hidden` is *also* style:none (only the `outline-2 outline-transparent outline-offset-2` **composition** ports the v3 face), and the reference ships two different latent border defaults (ours rides the landing's). `drift-199.ts` gains the login-face census (born-RED live, NO DRIFT after); keyboard e2e +2 computed pins. **Mutation proof 6/6 + live drift leg + e2e leg.** Focus census re-run: **zero deltas both viewports**. Positive censuses: intermediate viewports (768/1024/767) IDENTICAL — first time probed; head-asset family complete.

**Shipped:** count ladder re-anchored **425/33 · e2e 74/8** everywhere; trap census six → SEVEN; captures refreshed; gate re-proven; pushed via the SSH wrapper (explicit `--remote`, key shredded, no new branches).
