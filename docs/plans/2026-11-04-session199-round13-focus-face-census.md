# Session 199 — Round 13: THE FRESH-CONTEXT RE-VALIDATION + THE FOCUS-FACE CENSUS (2026-11-04)

The rotation trigger: the owner's newest commit (`7f42923` "update session
log") adds `docs/session_20.md` — the raw narration transcript of the
round-12 session. This round: pull at `7f42923`, re-internalize the doc
set, re-prove the gate + the live parity/drift bars + the mobile-menu
census, audit with a fresh angle, then close the focus-face class the
fresh angle surfaces.

## Phase 0 — The intake (Verified)

- Workspace refreshed at `7f42923` (the delta from round-12's ship
  `ca1579d` is `docs/session_20.md` alone — a doc, no code). Environment:
  `.env` carried the mandated contract
  `DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), census
  **MATCH (3 + 4 users)**. The doc set re-internalized (AGENTS · CLAUDE ·
  README · PAD v2.0 · the skill v1.199.0 · the worklog · session_19 +
  session_20 · the round-12 plan · the web-application skill §12–§16/§18/§20
  + the catalog · the Tailwind v4 report · the ssh-wrapper runbook). The
  neo-crm lineage repo stands as the tech-stack pattern reference — the
  patterns already carried verbatim (no new tech-stack surface; recorded).

## Phase 1 — The status validation (Verified — every claim re-proven)

| Doc claim | Live evidence |
| --- | --- |
| lint 0/0 · tsc 0 | Both green at HEAD |
| Unit 406/406 (32 files) | `bun run test` — 406 passed |
| Build 22 routes | Route table counted |
| Smoke 14/14 | The ladder green on :3210 with `db/smoke.db` |
| E2E 72/72 (8 specs) | `CI=1 bun run test:e2e` — 72 passed |
| Live parity COMPUTE IDENTICAL | `scripts/parity-199.ts` at 1280 + 390 |
| Content + mobile-menu + img NO DRIFT | `scripts/drift-199.ts` |
| Mobile-menu census (link-ride) | byte-equivalent on both apps; link-ride navigates AND closes; sole delta OUR aria-expanded |
| Census MATCH 3+4 | `bun run db:census` (resolved path printed) |
| skills/ excluded | tsconfig `exclude`, eslint `ignores`, vitest include-allowlist |

No Tailwind v4 bug in the SIX pinned traps (the round-8 battery green
inside the 406, computed faces IDENTICAL, the e2e mobile battery green).
The standing config asks re-verified live: the `.env`/db-path contract,
the vitest/playwright configs (the `skills/` exclusions), the sitemap/SEO
family (smoke rung 12), `.env.example` var-by-var, the TODO/FIXME sweep
clean, the advisory ledger **unchanged at 10** (4 high, 5 moderate,
1 low — all dev-toolchain transitive; runtime zod ^4.6.7 above the GHSA
floor; no security driver).

**Round-13 fresh-angle census legs run clean (positive findings):**
the INTERMEDIATE-VIEWPORT parity census (the same face family the parity
probe reads, at the unprobed 768/1024/767 boundaries — COMPUTE IDENTICAL,
zero deltas); the HEAD-ASSET family (og-image 1200×630 · icon 512 ·
apple-icon 180 · manifest icons — every head-referenced asset exists,
serves 200 with the pinned content-types).

## Phase 2 — The audit findings (the fresh angle: the FOCUS-FACE census — the interactive faces no probe reads; parity-199 reads at-rest faces only, round-10 pinned OUR superset + the sign-in ring, and the auth card outside /login was never probed since the byte-verification of 2026-11-03)

**F-1 (HIGH, reference parity, the LANDING — visible at keyboard focus):
the landing's focus-outline COLOR computes divergent.** Live-probed
(settled, real keyboard focus): every UA-outline-painting focusable
landing control (the 6 nav links, GET IN TOUCH, the filter chips, the
carousel selector, the form submit, the hamburger at 390) renders its
focus outline at OURS `oklab(0.140764 0.00120224 -0.00421676 / 0.5)` =
**zinc-950 rgb(9,9,11) @ 50%** vs the LIVE reference's
`rgba(10, 10, 10, 0.5)` = **neutral-950 @ 50%**. Root cause — a
CURE-COLLISION: the session-193 universal rule
`* { outline-color: color-mix(in oklab, var(--color-ring) 50%, transparent) }`
was authored when `--color-ring` was #0a0a0a (the CRM reference's base
`hsl(var(--ring)/.5)` face); round-10 legitimately re-pinned
`--color-ring` to #09090b (the LIVE auth-card sign-in ring) — silently
dragging the universal outline face along. The reference carries TWO
independent faces (its auth-card ring zinc-950; its landing bundle's
universal outline-color neutral-950@50%); our build had collapsed both
onto ONE token. Invisible to every gate: parity-199 reads at-rest faces,
round-10's battery pins the superset's focus-visible rings + the auth
ring, no probe reads the landing's outline colors.

**F-2 (MEDIUM, the SEVENTH Tailwind v4 re-pin trap — the `outline-none`
v3→v4 semantic rename).** The reference's compiled CSS ships
`.outline-none { outline-offset: 2px; outline: rgba(0, 0, 0, 0) solid 2px }`
(verified live via the CSSOM walk + CDP matched-rules); v4's `outline-none`
computes `outline-style: none`. The class-string byte-mirror hides the
rename — the trap-⑥ genus (port the COMPUTED face). Live settled
keyboard focus on both apps: REF `solid 2px rgba(0,0,0,0)` + offset 2px
vs OURS `none` + offset 0 — on the landing's 4 form controls
(`outline-none focus:border-zinc-950`), the auth card's inputs
(`focus:outline-none`) and submit/verify family (`focus-visible:
outline-none`). Both faces invisible (transparent vs none) — a
computed-face divergence by the doctrine's letter, and the forcing
mechanism behind any future visible divergence in the family.

**F-4 (MEDIUM, reference DRIFT — the base44 platform's semantic-token
refresh): the auth card's live faces moved after the 2026-11-03
byte-verification, and no probe reads /login.** Live-probed settled
at-rest + hover:

| Face | REFERENCE (live) | OURS (HEAD) | |
| --- | --- | --- | --- |
| Google button ink | rgb(15, 14, 14) `--sem-text-icon-primary` | rgb(51, 65, 85) slate-700 | ✗ visible |
| Google button border | rgb(233, 230, 224) `--sem-border-light-default` | rgb(226, 232, 240) slate-200 | ✗ visible |
| Google hover bg/border | rgb(241,238,234) / rgb(221,216,210) | rgb(248,250,252) / rgb(203,213,225) | ✗ visible |
| "or" divider ink | rgb(93, 93, 93) `--sem-text-icon-secondary` | rgb(100, 116, 139) slate-500 | ✗ visible |
| Card/input foreground | rgb(9, 9, 11) zinc-950 | rgb(10, 10, 10) neutral-950 (`--color-foreground`) | ✗ 1-bit |
| Universal border default | rgb(229, 231, 235) gray-200 (the v3 preflight) | rgb(229, 229, 229) neutral-200 (`--color-line`) | ✗ latent |
| Email input vertical pad | 8px (py-2) | 0px | ✗ invisible (fixed height) |
| Submit pad | 8px 12px (px-3 py-2) | 0px | ✗ invisible (w-full/h-fixed) |

The reference's auth card now rides `--sem-*` semantic tokens (the
`[data-ds="base44"]` design-system refresh); our mirror still ships the
slate utility family extracted at the byte-verification. The ring faces
STILL MATCH (round-10's pins re-proven live: inputs white@2px +
slate-400@4px; submit white@2px + rgb(9,9,11)@4px) — the drift is the
ink/border/pad family. The `email.bg`/`card.bg` oklab-vs-rgba
serializations are the s18 same-paint class (no action).

**F-3 (Informational, engine observations — no action).** At
programmatic/plain focus (a state real users don't reach on a fresh page)
the reference's sign-in button computes Chrome's adaptive UA ring
(`-webkit-focus-ring-color` resolving `solid 3px rgb(255,255,255)` over
the dark button), and mid-transition reads show fractional ring values
(the transition-all lesson). The settled keyboard faces — the real parity
bar — are covered by F-1/F-2's cures and round-10's pins. Also recorded:
OUR superset surfaces (inbox/shell/error/404) keep `outline-none` as the
designed suppress+ring idiom; `outline-hidden` there would additionally
preserve the forced-colors outline (a future-round candidate, noted).

## Phase 3 — The remediation ToDo list

1. **[R-1, TDD — the focus-face source-contract battery]** Create
   `tests/focus-outline.test.ts` (comment-stripped source reads, the
   house pattern): ① the universal outline-color literal pin
   (`outline-color: rgba(10, 10, 10, 0.5);` — the round-13 decouple from
   `--color-ring`; the retired color-mix form never returns); ② the
   `--color-foreground` re-pin (#09090b + the retired #0a0a0a never
   returns); ③ the `--color-line` re-pin (#e5e7eb + the retired #e5e5e5
   never returns); ④ the outline-hidden census on every
   reference-mirrored carrier (the landing's 4 form controls, the
   LOGIN_LAYOUT input/submit, the login-reset input/submit/code-input
   family, the verify-code inputs); ⑤ the scoped retired-form pins
   (`outline-none` never returns on the reference-mirrored members — OUR
   superset surfaces keep it by design); ⑥ the google/divider ink+border
   re-pins (the literals + the retired slate forms never return); ⑦ the
   pad faces (input py-2, submit px-3 py-2). **Born RED on the live
   tree** — the honest record.
2. **[R-2, the cures]** `globals.css`: the universal rule → the literal
   `rgba(10, 10, 10, 0.5)` (comment records the decouple);
   `--color-foreground: #09090b`; `--color-line: #e5e7eb`.
   `landing-page.tsx` ×4: `outline-none` → `outline-hidden`.
   `page-layout.ts`: input gains `py-2` + `focus:outline-hidden`; submit
   gains `px-3 py-2` + `focus-visible:outline-hidden`; google
   `text-[#0f0e0e] border-[#e9e6e0] hover:border-[#ddd8d2] hover:bg-[#f1eeea]`
   (the retired slate forms out); dividerLabelSpan `text-[#5d5d5d]`.
   `login-reset.ts` + `login-card.tsx:536`: the outline-none →
   outline-hidden swaps.
3. **[R-3, the live-probe cure — the /login face joins the drift bar]**
   Extend `scripts/drift-199.ts` with the login-face census (both apps,
   /login at-rest): the foreground, google ink/border/hover, divider ink,
   input/submit pads. Run it BEFORE the R-2 cure → **DRIFT DETECTED on
   the real bug** (the born-red live leg); after the cure → NO DRIFT.
4. **[R-4, the e2e legs]** Extend `tests/e2e/keyboard.spec.ts`: the
   landing's focus-outline computed pin (a focused filter chip computes
   `rgba(10, 10, 10, 0.5)` + style auto) and the auth input's outline
   face (`solid 2px rgba(0, 0, 0, 0)` + offset 2px — the v3 face ported).
5. **[R-5, count ladder]** Unit 406/32 → +N/33; e2e 72/8 → 74/8 — the
   count-ladder battery enforces the re-anchor at EVERY live-tense site
   (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 · the
   worklog Stage Summary) + the family lists in the CLAUDE/SKILL prose +
   the trap census (AGENTS "six re-pin traps" → SEVEN; the Tailwind v4
   report gains trap ⑦; SKILL §3).
6. **[R-6, mutation proof]** The batteries must BITE: the outline-color
   literal reverted to the color-mix form (RED) · a landing control back
   to outline-none (RED) · --color-foreground reverted (RED) · the google
   ink reverted (RED) · the pad dropped (RED) · the drift leg re-run on a
   reverted tree (DRIFT). All files restored byte-identical (the
   /tmp-backup harness).
7. **[R-7, captures]** Re-run `scripts/capture-199.ts` (the 6 `ours-*`
   faces refreshed).
8. **[R-8, doc lockstep]** `docs/session_21.md` (the session_19 house
   pattern) + the worklog round-13 lines + this plan's execution record;
   PAD §10 records the round-13 close; F-3 recorded in the session log.
9. **[R-9, gate re-proof]** The full chain re-run after the changes:
   `bun run gate` + `CI=1` e2e + the live parity/drift/mobile probes
   (parity stays green — no landing at-rest face changed; drift now
   carries the login census).
10. **[R-10, ship]** One atomic commit on main; push via
    `python3 docs/ssh_git_wrapper_v3.py --key-file <key> --remote
    git@github.com:nordeim/elegance-flow.git` (the round-11 `--remote`
    lesson); remote ref verified == HEAD; the operator key shredded
    after; the scratch probe scripts removed.

## Phase 4 — The verification bar

- The unit battery born RED on the real bugs, GREEN after the cures, and
  proven to bite by mutation; the drift probe's login census red on the
  pre-fix tree, NO DRIFT after; the e2e legs green on the standalone
  artifact (the settled focus faces — the transition lesson).
- The gate green at ship; the parity/mobile bars re-proven (the landing's
  at-rest faces untouched; the auth card's at-rest text shifts to the
  reference's live face); the count ladder consistent everywhere; the
  push verified; the working tree clean; no key/shim/db/log artifacts
  staged.

## Phase 5 — The execution record (filled at ship)

- **R-1 born RED 18/19 on the live tree** — every real divergence bit
  (the universal outline-color literal + its retired color-mix form ·
  --color-foreground ± · --color-line ± (then revised — see the
  two-bundle finding below) · the outline-hidden census (then revised
  to the composition — see the harness find) · the google/divider
  literals + retired slate forms · the pad faces; the one designed
  keeps-green check: --color-ring's round-10 pin).
- **THE FIRST HARNESS FIND (recorded at R-2, the honest record): the
  first cure spelled the composed face as `outline-hidden` — and the
  LIVE computed re-read caught it still computing `none 1px …`**: v4.3's
  `outline-hidden` is `outline-style: none` in normal mode with the
  transparent outline reserved for `@media (forced-colors: active)`
  (verified in the compiled CSS). Only the COMPOSITION
  `outline-2 outline-transparent outline-offset-2` computes the v3 face
  (`--tw-outline-style` initial-value: solid). The battery pins, the
  source cures, and the two legacy class-string pins re-anchored to the
  composed forms; the trap log records the two-layer rename. The unit
  pin alone would have "proven" the renamed class present while the
  face stayed wrong — the live re-read is the proof that counts.
- **THE SECOND HARNESS FIND (the two-bundle border discovery): the
  round-13 first pass re-pinned `--color-line` to #e5e7eb on the auth
  probe alone (the base44 platform bundle's v3-preflight default) — and
  the live LANDING re-verification falsified it**: the reference's
  LANDING bundle (the app's own CSS) computes the latent border default
  as neutral-200 rgb(229,229,229) — the shadcn base
  `hsl(var(--border))` — while its AUTH page (the platform bundle)
  rides gray-200. One universal token cannot match both; ours rides the
  landing's face (the parity-gated public surface), the platform's
  latent default is the documented F-3-genus delta. The battery's
  --color-line pins re-anchored to the keeps-form (#e5e5e5 + the
  falsified #e5e7eb never returns).
- **R-2 the cures**: globals.css (the decoupled literal
  `outline-color: rgba(10, 10, 10, 0.5)` + `--color-foreground:
  #09090b` + --color-line verified-at-#e5e5e5); the landing's 4 form
  controls + the auth input/submit/verify family on the composed v3
  face; the google ink/border/hover + divider literals; py-2 / px-3
  py-2 on LOGIN_LAYOUT.input/submit. The battery 19/19 GREEN.
- **R-3 born-RED live proof**: the extended drift probe ran against the
  PRE-FIX tree → **DRIFT DETECTED on the login face (6 fields:
  cardColor · google ink/border · googleHover · dividerColor ·
  inputPad · submitPad)**; after the cures → **NO DRIFT** on both legs
  (the [390] content+img face and the [login] auth-card face).
- **R-4 the e2e legs**: +2 checks in `tests/e2e/keyboard.spec.ts` — the
  landing's focused filter chip computes `rgba(10, 10, 10, 0.5)` +
  style auto (the bounded Tab-ride loop keys on the active element,
  never a fixed Tab count) and the auth input's focused outline
  computes `solid 2px rgba(0, 0, 0, 0)` + offset 2px (the composed v3
  face). Both green on the standalone artifact.
- **R-5 the count ladder re-anchored 406/32 → 425/33 (13 seam/196 + 20
  source contracts/229) + 72/8 → 74/8 (e2e)** at every live-tense site
  (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 · the
  worklog Stage Summary) + the focus-outline family in the CLAUDE/SKILL
  prose lists + the trap census six → SEVEN (AGENTS · CLAUDE · SKILL §3
  · the Tailwind report's trap log gains the full trap-7 appendix).
- **R-6 the mutation proof: 6/6 classes bite + the live drift leg + the
  e2e leg** — M1 the outline-color literal reverted to the color-mix
  form (2 RED) · M2 a landing control back to outline-none (2 RED) ·
  M3 --color-foreground reverted (2 RED) · M4 the google ink reverted
  (2 RED) · M5 the pad dropped (1 RED) · M6 the falsified --color-line
  re-pin reintroduced (2 RED) · the live drift leg (the pre-fix login
  world re-applied → DRIFT on cardColor + google) · the e2e leg (M1
  rebuilt into the artifact → the round-13 outline pin RED, 1 failed /
  2 passed; restored, rebuilt, 74/74) — all files restored
  byte-identical via the /tmp-backup harness.
- **The focus-face census re-run clean**: ZERO deltas at both viewports
  (desktop + phone) — every outline color, every outline style, the
  border defaults, the whole family.
- **The positive censuses recorded**: the intermediate-viewport parity
  census (768/1024/767 — COMPUTE IDENTICAL, first time probed); the
  head-asset family complete (og-image · icon · apple-icon · manifest
  icons all exist and serve).
- **The advisory ledger held at 10** post-cure.
- **The captures refreshed** (the 6 `ours-*` faces, pixel-verified).
- **The gate re-proof**: lint 0/0 · tsc 0 · **425/425 (33 files)** ·
  build (22 routes) · smoke 14/14 · e2e **74/74 (8 specs)** · parity
  COMPUTE IDENTICAL (both viewports) · drift NO DRIFT (both legs) · the
  mobile census byte-equivalent.
- **Shipped** as one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --remote git@github.com:nordeim/elegance-flow.git`
  (the round-11 `--remote` lesson applied), remote verified == HEAD,
  key shredded, the scratch probe scripts removed.
