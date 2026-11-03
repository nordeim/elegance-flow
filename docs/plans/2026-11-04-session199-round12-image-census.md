# Session 199 — Round 12: THE FRESH-CONTEXT RE-VALIDATION + THE PORTFOLIO-IMAGE CENSUS (2026-11-04)

The rotation trigger: the owner's newest commit (`9b17414` "update session
log") adds `docs/session_18.md` — the raw narration transcript of the
round-11 session. This round: pull at `9b17414`, re-internalize the doc
set, re-prove the gate + the live parity/drift bars + the mobile-menu
census, audit with a fresh angle, then close the image-drift class the
fresh angle surfaces.

## Phase 0 — The intake (Verified)

- Workspace refreshed at `9b17414` (the delta from round-11's ship
  `faccd20` is `docs/session_18.md` alone — a doc, no code). Environment:
  `.env` carried the mandated contract
  `DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root),
  db:push/db:seed run, census **MATCH (3 + 4 users)**. The doc set
  re-internalized (AGENTS · CLAUDE · README · PAD v2.0 · the skill
  v1.199.0 · the worklog · session_17 + session_18 · the round-11 plan ·
  the web-application skill §12/§14–§16/§18/§20 + the catalog · the
  Tailwind v4 report · the ssh-wrapper runbook). The neo-crm lineage repo
  stands as the tech-stack pattern reference — the patterns already
  carried verbatim (no new tech-stack surface this round; recorded).

## Phase 1 — The status validation (Verified — every claim re-proven)

| Doc claim | Live evidence |
| --- | --- |
| lint 0/0 · tsc 0 | Both green at HEAD |
| Unit 400/400 (31 files) | `bun run test` — 400 passed |
| Build 22 routes | Route table counted |
| Smoke 14/14 | The ladder green on :3210 with `db/smoke.db` |
| E2E 71/71 (8 specs) | `CI=1 bun run test:e2e` — 71 passed |
| Live parity COMPUTE IDENTICAL | `scripts/parity-199.ts` at 1280 + 390 |
| Content + mobile-menu NO DRIFT | `scripts/drift-199.ts` (text face only — see F-2) |
| Mobile-menu census (link-ride) | `scripts/mobile-census-199.ts` — byte-equivalent on both apps; link-ride navigates AND closes; sole delta OUR aria-expanded |
| Census MATCH 3+4 | `bun run db:census` (resolved path printed) |
| skills/ excluded | tsconfig `exclude`, eslint `ignores`, vitest include-allowlist |

No Tailwind v4 bug: the six re-pin traps verified (the round-8 re-pin
battery green inside the 400), the computed faces IDENTICAL, the e2e
mobile battery green. The standing config asks re-verified live this
round: the `.env`/db-path contract, the vitest/playwright configs (the
`skills/` exclusions), the sitemap/SEO family (live-served on the
standalone artifact: the four titles + canonicals + OG/Twitter cards +
the designed 404's `noindex` + sitemap/robots/manifest 200s with the
pinned content-types), `.env.example` var-by-var, the TODO/FIXME sweep
clean, the advisory ledger **unchanged at 10** (4 high, 5 moderate,
1 low — all dev-toolchain transitive; runtime zod ^4.6.7 above the
GHSA floor; no security driver).

## Phase 2 — The audit findings (the fresh angle: the IMAGE census — the one content family no gate reads, riding the user's standing "visual parity" + "SEO/perf" asks)

**F-1 (HIGH, reference-parity, OUR public surface) — 5 of the 6
portfolio project images diverge from the live reference.** Live-probed
2026-11-04 (deterministic across two fresh loads; the overlay text and
the filter behavior match byte-for-byte):

| Card | REFERENCE (live) | OURS (HEAD) | |
| --- | --- | --- | --- |
| Project One | photo-1634942537034 | photo-1634942537034 | match |
| Project Two | photo-1467232004584 | photo-1618005198919 | ✗ (Four's image) |
| Project Three | photo-1596462502278 | photo-1542744173 | ✗ (the About image) |
| Project Four | photo-1618005198919 | photo-1618005182384 | ✗ (the Hero image) |
| Project Five | photo-1558618666 | photo-1634942537034 | ✗ (One's image) |
| Project Six | photo-1509909756405 | photo-1618005198919 | ✗ (Four's image) |

The Work section renders the WRONG PHOTOGRAPHS on five of six cards —
a visible-face parity failure on the public landing (our portfolio
shows 4 unique photos where the reference shows 6). Invisible to every
gate: `parity-199.ts` reads computed styles (an img's `src` changes no
style); `drift-199.ts` reads the TEXT face (title/nav/h1/h2s/services/
stats/chips — no image fields); the site-content unit battery pins the
hero/about/avatars but never the projects; the e2e suite pins the
overlay text and the filter behavior, never the img srcs; the captures
were never region-diffed.

**F-2 (MEDIUM, the unpinned class — F-1's escape hatch) — the image
family carries ZERO pins at every tier.** No unit pin on the project
images (`tests/site-content.test.ts` covers hero/about/avatars only),
no img census in the drift probe (the "content face" is text-only), no
e2e img-src assertion. The same prescribed-surface-never-pinned genus
as round-3's sitemap, round-10's keyboard, and round-11's state faces:
whatever the live probes don't read is exactly where drift ships. A
future reference image change OR a future regression in
`site-content.ts` would stay invisible today.

**F-3 (Informational, platform behavior — no action) — our SSR head
carries React-19-generated `<link rel="preload" as="image">` entries
(10 unique URLs) where the client-rendered SPA reference carries none.**
Invisible (head-level), load-improving, automatic — documented here as
the platform delta (the aria-expanded genus: invisible supersets).

**Positive findings (live-verified, no action):** the SEO family is
complete and correct on the standalone artifact (the four route titles
incl. the reference's bare-brand `/` and `/login` + per-route
canonicals + the full OG/Twitter card family + `noindex` on the
designed 404 + sitemap/robots/manifest with pinned content-types); the
production posture is healthy (hashed assets serve
`Cache-Control: public, max-age=31536000, immutable`; gzip compression
active on HTML (36.8→7.1KB) and CSS (150.8→23.5KB) — the HEAD-probe
false-negative lesson re-proven with GET; the three security headers on
every response); the alts match the reference's own DOM-case face
(incl. its four `alt="Client Name"` avatars — parity by doctrine);
census MATCH; git tree clean (probe scripts untracked, removed at ship).

## Phase 3 — The remediation ToDo list

1. **[R-1, TDD — the project-image source-contract battery]** Create
   `tests/landing-images.test.ts` (comment-stripped source reads, the
   house pattern): ① the six project images pinned EXACTLY to the
   reference's live set; ② the uniqueness census (six DISTINCT images;
   none equal to the hero or about image — the reuse-class pin that
   catches this bug's genus); ③ the alt contract (the alt is the
   project title); ④ the hero/about/avatar families re-pinned at the
   same battery (the one-family census). **Born RED on the live tree**
   (five wrong URLs + the reuse violations) — the honest record.
2. **[R-2, the cure]** Fix `src/lib/site-content.ts` `PROJECTS[1..5]`
   .image to the reference's live URLs (One unchanged) — the battery
   goes GREEN; the visible face now matches the reference.
3. **[R-3, the live-probe cure — F-2's class]** Extend
   `scripts/drift-199.ts`'s Face with `imgs: {src, alt}[]` (all imgs in
   DOM order) + the diff call. Run it BEFORE the R-2 cure against the
   dev server → **DRIFT DETECTED on the real bug** (the born-red live
   leg); after the cure → NO DRIFT.
4. **[R-4, the e2e leg — the artifact-level pin]** Add ONE check to
   `tests/e2e/landing.spec.ts`: the landing's rendered img census (12
   srcs + alts in DOM order — the same face the drift probe reads)
   against the standalone artifact.
5. **[R-5, count ladder]** Unit 400/31 → 400+N/32; e2e 71/8 → 72/8 —
   the count-ladder battery enforces the re-anchor at EVERY live-tense
   site (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 ·
   the worklog Stage Summary) + the family lists in the CLAUDE/SKILL
   prose.
6. **[R-6, mutation proof]** The batteries must BITE: one project URL
   reverted (unit RED + e2e RED + drift RED on the live probe); a reuse
   re-introduced (the uniqueness pin RED); the uniqueness pin dropped
   (the reuse mutation stays RED — the pin-bites-its-own-class proof).
   All files restored byte-identical after (the /tmp-backup harness).
7. **[R-7, captures]** Re-run `scripts/capture-199.ts` against the dev
   server on :3000 — the 6 `ours-*` faces refreshed (the landing
   captures now show the corrected portfolio).
8. **[R-8, doc lockstep]** `docs/session_19.md` (the session_17 house
   pattern) + the worklog round-12 lines + this plan's execution
   record; PAD §10 records the round-12 close; F-3 recorded in the
   session log.
9. **[R-9, gate re-proof]** The full chain re-run after the changes:
   `bun run gate` + `CI=1` e2e + the live parity/drift/mobile probes
   (parity stays green — no computed-style face changed; drift now
   carries the img census).
10. **[R-10, ship]** One atomic commit on main; push via
    `python3 docs/ssh_git_wrapper_v3.py --key-file <key> --remote
    git@github.com:nordeim/elegance-flow.git` (the round-11 lesson:
    the wrapper's default remote is the retired task-management repo —
    pass `--remote` explicitly); remote ref verified == HEAD; the
    operator key shredded after; the scratch probe scripts removed.

## Phase 4 — The verification bar

- The unit battery born RED on the real bug, GREEN after the cure, and
  proven to bite by mutation; the drift probe's img census red on the
  pre-fix tree, NO DRIFT after; the e2e census green on the standalone
  artifact.
- The gate green at ship; the parity/mobile bars re-proven (the
  computed faces untouched — this round changes image CONTENT, not
  styles); the count ladder consistent everywhere; the push verified;
  the working tree clean; no key/shim/db/log artifacts staged.

## Phase 5 — The execution record (filled at ship)

- **R-1 born RED 3/6 on the live tree** (the exact-set pin, the
  uniqueness census, the borrow pin — the honest record; hero/about/
  avatars/alts were already correct and pinned green from the first
  run). The verification pass itself STRENGTHENED two pins at birth:
  the reuse shipped under a different `?w=` width suffix (the About
  frame reused at w=700 vs its native w=900), so the uniqueness and
  borrow pins compare PHOTO IDs (the URL before `?`), not full URLs —
  a bare full-URL compare passes while showing the same photograph.
- **R-2 the cure**: `site-content.ts` PROJECTS[1..5] re-pinned (One
  was already correct); the battery 6/6 GREEN.
- **R-3 born-RED live proof**: the extended drift probe ran against
  the REVERTED tree → **DRIFT DETECTED on imgs** (the exact five-image
  divergence, REF vs OURS printed); after the cure → **NO DRIFT**. One
  harness find recorded: the first probe edit landed without its diff
  call (the type/evaluate/return wired, the comparison never run — a
  probe that reads a field it never diffs is vacuously green; the
  born-red run is what proves the wiring).
- **R-4 the e2e leg**: the 12-img census check green on the standalone
  artifact (72/72).
- **R-5 the count ladder re-anchored 400/31 → 406/32 (13 seam/196 +
  19 source contracts/210) + 71/8 → 72/8 (e2e)** at every live-tense
  site — the lockstep battery's four designed REDs walked every site
  forward (including the two tree-annotation stragglers the shapes
  caught: README's "31 unit files" + PAD's "31 *.test.ts").
- **R-6 the mutation proof: 4/4 bite + the e2e leg** — M1 the reuse
  form (2 RED: exact-set + uniqueness) · M2 a plausible different
  photo (1 RED: the exact-set carries alone — not riding the reuse
  heuristic) · M3 the hero borrow under a width suffix (2 RED:
  exact-set + the borrow pin — the shipped genus) · M4 the naive
  re-pin world (the code reuses AND the exact-set is "helpfully"
  updated to match — 1 RED: the uniqueness census bites ALONE, the
  pin's independent class) · the e2e leg (M1 rebuilt into the
  artifact → the census check RED; restored, rebuilt, 72/72) · all
  files restored byte-identical (the /tmp-backup harness).
- **The visual confirmation**: the 6 project cells cropped from the
  refreshed fullpage capture by their live DOM rects each match THEIR
  assigned photograph (6/6, healthy margins) — the captures now show
  the corrected portfolio.
- **The positive census recorded**: the SEO family live-verified
  complete on the artifact; the production posture healthy (immutable
  hashed assets · gzip active on GET · the three security headers on
  every response); the React-19 SSR image preloads documented as the
  platform delta (F-3).
- **The advisory ledger held at 10** post-cure.
- **The gate re-proof**: lint 0/0 · tsc 0 · **406/406 (32 files)** ·
  build (22 routes) · smoke 14/14 · e2e **72/72 (8 specs)** · parity
  COMPUTE IDENTICAL (both viewports) · drift NO DRIFT (now carrying
  the img census) · the mobile census byte-equivalent.
- **Shipped** as one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --remote git@github.com:nordeim/elegance-flow.git`
  (the round-11 `--remote` lesson applied), remote verified == HEAD,
  key shredded, the scratch probe scripts removed.
