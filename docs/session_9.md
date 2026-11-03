`docs/session_7.md` logs the round-6 re-validation (the deployment-doc
census pin at the owner's `5fc5a84`); `docs/session_8.md` is the
owner-committed narration transcript of that session. Now at fresh HEAD
`622173b`, this round: clone re-orientation (the sandbox recycled), the
gate + both live probes + the mobile-menu census re-proven, a fresh-eyes
audit — and the unpinned-doc class closed at its ROOT level: the five
root docs' count-ladder claims get their census pin, after the audit
caught three stale sites that had drifted through four re-anchors.

## Re-orientation

Cloned at `622173b` (the delta from round-6's ship `41fd88e` is
`docs/session_8.md` alone — a doc, no code). The environment rebuilt
from pristine: `.env` pinned to the mandated contract
`DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root),
`bun install` ("checked 434 installs across 526 packages" — the AGENTS.md
claim exact), db:push/db:seed, census MATCH (3 + 4 users). The doc set
re-internalized (AGENTS · CLAUDE · README · PAD v2.0 · the skill v1.199.0
· the worklog · session_7/session_8 · the round-6 plan · the
web-application skill + the catalog's named skills · the Tailwind v4
report · the ssh-wrapper runbook). The neo-crm lineage repo stands as the
tech-stack pattern reference — the patterns already carried verbatim.

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **351/351 (25 files)** ·
  build (**22 routes**) · smoke **14/14** · e2e **53/53 (6 specs)**.
- **Live parity**: `scripts/parity-199.ts` — **COMPUTE IDENTICAL at 1280
  + 390** (the oklab/rgba s18 serialization class excluded, same paint).
- **Drift**: `scripts/drift-199.ts` — **NO DRIFT** (content face + the
  mobile menu's open DOM).
- **The mobile-menu census (the operator's standing emphasis), taken
  live on BOTH apps at 390×844**: the toggle opens the inline panel —
  the same 5 links + the amber CTA in the same order — and a link-ride
  navigates the anchor AND closes on both. The one delta: OUR toggle
  carries `aria-expanded` (false → true → false across the cycle); the
  reference's carries none — exactly the documented invisible a11y
  superset. No Tailwind v4 bug: the six re-pin traps verified in
  `globals.css`, the computed faces IDENTICAL, the e2e mobile battery
  green.
- The standing config asks re-verified: the vitest/playwright configs
  (the `skills/` exclusions across tsconfig/eslint/vitest include), the
  sitemap/SEO family (the 4 public locs, smoke rung 12 + the census
  batteries), `.env.example` var-by-var, the TODO/FIXME sweep clean.

## The audit — the fresh angle: the docs' own bookkeeping

**The catch: THREE stale count sites in the root docs.** The count
ladder is re-anchored BY HAND every round the suite changes — and the
root docs carry ~20 live-tense claim sites in a dozen different
phrasings. Three sites escaped every re-anchor since round-3:

- **F-1** `README.md`'s file-hierarchy annotation: "**24 unit files** +
  e2e/ (6 specs)" — the live census was 25 (round-6's +1 was missed: the
  re-anchor's grep shapes covered "N checks / M files" but not the
  tree-annotation "N unit files" shape).
- **F-2** `Project_Architecture_Document.md` §3.2's annotation: "**23
  *.test.ts** + e2e/" — stale since round-3 added
  `tests/sitemap-routes.test.ts`; two full re-anchors passed it by.
- **F-3** `Project_Architecture_Document.md` §7.1's unit split rows:
  "seam batteries | **10 | 169**" + "source contracts | **15 | 182**" —
  mis-derived at round-6's re-anchor (the worklog's own line records the
  wrong intermediate "14/174 → 15/182"). The live categorized census,
  per CLAUDE.md's and SKILL.md's own exhaustive family lists: **13 seam
  batteries / 196 checks + 12 source contracts / 155 checks**.

**F-4, the class:** no test pinned ANY root-doc count-ladder claim. This
is the same unpinned-doc class that shipped the round-3 sitemap and
round-5 DEPLOYMENT.md stragglers — round-6 closed it for DEPLOYMENT.md
alone; the ROOT docs (the very surfaces every round's re-anchor edits)
stayed unpinned, and F-1/F-2/F-3 are its proof.

**The standing duty re-triaged (I-1, unchanged):** `bun audit` reports
10 advisories (4 high, 5 moderate, 1 low) — ALL dev/build/lint/test
toolchain-transitive (minimatch via eslint, deepmerge-ts via the prisma
CLI, vite/launch-editor via vitest, source-map-js via postcss, zod@4.6.5
NESTED in eslint-plugin-react-hooks while the RUNTIME direct zod is
4.6.7, above the GHSA floor). Zero runtime exposure; the lockfile
untouched per the surgical doctrine — no security driver.

## The remediation (TDD)

`tests/count-ladder-census.test.ts` (+7 checks) — the root-docs census
battery, **born RED on the three real bugs** (the aggregate printed
README's `unitFiles=24`, PAD's `unitFiles=23`, and the split row's `10 ≠
13` before any cure):

- **The live censuses, computed at run time, never hard-coded**: the
  `*.test.ts` filesystem census (26 files) + the comment-stripped
  `it(`/`test(` block census (358 — the reporter's own counting rule,
  verified exact), the e2e spec+setup census (6 specs / 53 checks), the
  smoke script's sequential `ok NN` rung census (14) **+ its own
  "SMOKE: N/N PASS" self-report**, and the routes census (22).
- **Every claim SHAPE × every doc**: 26 regex families — "N checks / M
  files", "M files / N checks", "N unit checks (M files)", "N unit
  files", "N *.test.ts", "test (N)", "test # N/N", "N/N unit", "N
  checks — pure", "N unit / N e2e / N smoke" (the §10 compound), the
  e2e/spec shapes, the smoke/rung shapes, "N routes, standalone"
  (disambiguated from the auth family's "(8 routes)"), and the §7.1
  table rows — across AGENTS · CLAUDE · README · PAD · SKILL, plus the
  worklog's live-tense Stage-Summary verification line (the append-only
  history is exempt by design; the pins target the `THE VERIFICATION:`
  line alone).
- **The coverage map**: each doc must still CLAIM each family it always
  claimed — a silently dropped claim is as wrong as a stale one.
- **The category-union lockstep**: the battery's two family lists (13
  batteries + 13 contracts) must union to the filesystem census — a NEW
  test file now forces the battery lists, PAD §7.1's split rows, and the
  CLAUDE/SKILL prose enumerations to move together (the forcing function
  the class never had).
- **The prose enumeration pin**: every family named in CLAUDE.md and
  SKILL.md (with the recorded `password→password-seam` /
  `census→db-census` label map).
- **The retired-form regression pins**: "24 unit files", "23
  \*.test.ts", and the "10 | 169" / "15 | 182" split rows never return.
- **Documented non-pins**: the "526 packages" claim (a bun-install
  OUTPUT claim — the lockfile's raw entries carry no bun counting
  semantics) stays on the standing manual cadence; the PAD §11 "~Lines"
  column is approximate by design.
- **The mutation proof: 10 classes, 10 REDs** — a stale check count, a
  stale file count, the two retired tree annotations, the retired split
  row, the stale gate line, the wrong command-table count, the smoke
  script's lying self-report, the stale worklog verification line, a
  dropped prose family, and a dropped whole-claim — each failed its
  check; every file restored byte-identical; 10/10 green after.

The doc cures: README's annotation → 26 unit files; PAD §3.2 → 26
\*.test.ts; PAD §7.1 → the categorized census (13/196 + 13/162 with the
battery itself in the contracts column). The count ladder re-anchored
**351/25 → 358/26** at every live-tense site (AGENTS · CLAUDE · README ·
PAD §3.2/§7.1/§7.3/§10 · SKILL §7 · the worklog Stage Summary), with the
new family named in the CLAUDE/SKILL prose lists.

## The round's deliverables

`tests/count-ladder-census.test.ts` (the root-docs census pin,
mutation-proven) · `docs/plans/2026-11-03-session199-round7-root-docs-census-pin.md`
(the round's plan, validated against the tree before execution) · the
refreshed dev-server capture set (the 6 `ours-*` faces under
`docs/screenshots/`, pixel-verified) · the doc cures + the count-ladder
re-anchor across the five root docs · this log + the worklog round-7
lines.

## The gate re-proof before ship

The full chain re-run after the changes: lint 0/0 · tsc 0 · **358/358
(26 files)** · build (22 routes) · smoke 14/14 · e2e 53/53 — then the
push to main via `docs/ssh_git_wrapper_v3.py` (the paramiko shim — this
sandbox has no OpenSSH binary), remote ref verified == HEAD, key
shredded, no new branches.

**Suggested next:** the standing cadence — `bun audit` re-triage each
round (any advisory reaching a runtime dep is the security driver that
reopens the lockfile) — and the count-ladder battery now makes every
future suite change self-enforcing: the re-anchor is no longer a grep
discipline but a red test.
