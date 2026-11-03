`docs/session_9.md` logs the round-7 re-validation (the root-docs
count-ladder census pin at the owner's `622173b`); `docs/session_10.md`
is the owner-committed narration transcript of that session. Now at
fresh HEAD `160de00`, this round: pull re-orientation, the gate + both
live probes + the mobile-menu census re-proven (the census itself now
scripted), a fresh-eyes audit — and two coverage classes closed: the
six v4 re-pin traps' token family finally sits under the unit gate, and
the dangling-POINTER class (a load-bearing doc citing a file that no
longer exists) gets its census pin.

## Re-orientation

Pulled at `160de00` (the delta from round-7's ship `7ee3bf2` is
`docs/session_10.md` alone — a doc, no code). The environment verified
in place: `.env` pinned to the mandated contract
`DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), census
MATCH (3 + 4 users). The doc set re-internalized (AGENTS · CLAUDE ·
README · PAD v2.0 · the skill v1.199.0 · the worklog · session_9 +
session_10 · the round-7 plan · the web-application skill + the
catalog's named skills · the Tailwind v4 report · the ssh-wrapper
runbook). The neo-crm lineage repo stands as the tech-stack pattern
reference — the patterns already carried verbatim.

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **358/358 (26 files)** ·
  build (**22 routes**) · smoke **14/14** · e2e **53/53 (6 specs)**.
- **Live parity**: `scripts/parity-199.ts` — **COMPUTE IDENTICAL at 1280
  + 390** (the oklab/rgba s18 serialization class excluded, same paint).
- **Drift**: `scripts/drift-199.ts` — **NO DRIFT** (content face + the
  mobile menu's open DOM).
- **The mobile-menu census (the operator's standing emphasis), taken
  live on BOTH apps at 390×844** — this round as a committed probe,
  `scripts/mobile-census-199.ts` (the link-ride BEHAVIOR face, joining
  the drift probe's static DOM face): the toggle opens the inline panel
  — the same 5 links + the amber CTA in the same order — and a
  link-ride navigates `#about` AND closes on both. The one delta: OUR
  toggle carries `aria-expanded` (false → true → false across the
  cycle); the reference's carries none — the documented invisible a11y
  superset. No Tailwind v4 bug.
- The standing config asks re-verified: the vitest/playwright configs
  (the `skills/` exclusions across tsconfig/eslint/vitest include), the
  sitemap/SEO family (the 4 public locs, smoke rung 12 + the census
  batteries), `.env.example` var-by-var, the TODO/FIXME sweep clean.

## The audit — the fresh angle: the re-pin family's GATE coverage + the styling doc's live-tree pointers

**The catch, part one (F-1): four of the six re-pin traps carried NO
gate-level pin.** AGENTS.md enumerates the six v4 re-pin traps as "all
live in `src/app/globals.css` @theme" — but only ① (partially: 5 of the
29 palette tokens) and ⑤ (the hover unwrap) sat under the unit gate:

- **② `--shadow-sm`** and **③ `--blur-sm`** — the token pins had no
  unit pin and no e2e computed pin: dropping either shipped the whole
  gate green while the scrolled header rendered one notch heavier / the
  auth card's frost computed blur(8px).
- **④ the space-y flip** — the auth fields' `[&>*+*]:mt-1.5` class had
  no pin.
- **⑥ the leading re-derivations** — `leading-[0.9] md:leading-none`
  (h1) + `leading-[0.95] md:leading-none` (the five h2s) had NO pin in
  any tier.
- The only guard for ②③④⑥ was the MANUAL parity probe — which is not
  in the `gate` chain. The palette family: 29 `@theme` tokens live in
  globals.css (zinc ×11 · amber ×8 · slate ×10); the landing battery
  pinned 5.

**The catch, part two (F-2): the required-reading styling doc carried
stale live-tree pointers.** `docs/Tailwind-V4-Validation-Report.md` —
cited by all five root docs as required reading before touching
styling — still carried the PRIOR domain's cross-references: two
DANGLING spec citations (`tests/e2e/session7-parity.spec.ts`,
`tests/e2e/session8-parity.spec.ts` — both retired at session-199; a
repo-wide doc sweep finds exactly these two), a FALSE pin claim (trap 7
cited an `auth.spec.ts` computed pin that never existed in this
domain), a stale PAD pointer (ADR-004/005 + §4.4 vs the live ADR-005 +
§5), and prior-domain consumers (CourseCatalog, p_ panels, streak
cells) that read as current.

**F-3, the class:** no test pinned doc→file references — rounds 6–7
pinned counts and DEPLOYMENT.md's claims, but the dangling-POINTER
class (the same class that shipped round-5's ORBITAL-era runbook) had
no battery.

**The standing duty re-triaged (I-1, unchanged):** `bun audit` reports
10 advisories (4 high, 5 moderate, 1 low) — ALL dev/build/lint/test
toolchain-transitive (minimatch via eslint, deepmerge-ts via the
prisma CLI, vite/launch-editor via vitest, source-map-js via postcss,
zod@4.6.5 NESTED in eslint-plugin-react-hooks while the RUNTIME direct
zod is ^4.6.7, above the GHSA floor). Zero runtime exposure; the
lockfile untouched per the surgical doctrine — no security driver.

## The remediation (TDD)

- **`tests/doc-pointer-census.test.ts` (+3 checks)** — **born RED on
  the two real dangling citations** (the exact class F-2 proved), then
  GREEN on the cured report: every path-shaped FILE reference in the
  load-bearing doc set (the five root docs + DEPLOYMENT.md + the
  Tailwind report) must resolve in the live tree — URLs stripped
  first (external GitHub citations), glob tokens never match (the
  class excludes `*`), historical-tense surfaces (session logs, plans,
  the worklog) exempt by design, `skills/` deliberately unswept (the
  vendored catalog is removable-for-fork). The LINEAGE EXEMPTION
  contract: a doc may cite a retired file ONLY inside a sentence that
  MARKS it (retired|lineage on the citing line) — and the honesty
  check: an exemption whose citation is deleted, or whose file
  resolves, fails. Documented non-pins: `db/*.db` scratch names
  (run-time artifacts, never tree files).
- **`tests/re-pin-tokens.test.ts` (+6 checks)** — the six-trap family
  under the unit gate as ONE battery: ① the COMPLETE 29-token palette
  block, exact-set equality against the v3-literal map (a dropped
  token, a corrupted hex, or an un-pinned new token each fail); ② the
  `--shadow-sm` v3 geometry; ③ `--blur-sm: 4px`; ④ the auth fields'
  sibling-margin class; ⑤ the hover unwrap (twin pin with the landing
  battery); ⑥ the leading re-derivations — exactly one h1 at `[0.9]`,
  exactly five h2s at `[0.95]`, every one with its `md:leading-none`
  companion, and the retired bare form (the class-literal-only port
  the s11 doctrine forbids) never returns. Comment-stripped reads; a
  phantom-census lesson recorded inline: the JS regex method `.test(`
  collides with the count-ladder battery's `\b(?:it|test)\(` block
  census — the battery uses `.match` instead (the comment pins the
  reason).
- **The e2e computed pin** — `tests/e2e/auth.spec.ts` +1 check (the
  ladder 53 → **54**): the glass card must compute
  `backdrop-filter: blur(4px)` + `border-radius: 16px` against the
  standalone artifact — trap ③'s computed face, restoring trap 7's
  lineage citation to truth.
- **The mutation proof: 13 classes, 13 REDs** — the two token pins
  dropped, a slate token dropped, a zinc hex corrupted, a bogus token
  added, the space-y class flipped back, the hover unwrap dropped, the
  h1's bare leading port, one h2 losing its md: companion, the lineage
  marker stripped, an invented path cited in a root doc, an exempted
  citation deleted, and a dead exemption added — each failed its
  check; every file restored byte-identical; 16/16 green after.
- **The doc cures**: the Tailwind report's trap log now opens with the
  lineage orientation note (the consumers/specs named are the prior
  domain's, retired at session-199; the current domain's six members
  live in AGENTS.md; the token family unit-gated + the card's computed
  faces e2e-gated); the PAD pointer fixed (ADR-005 + §5); trap 6/8's
  citations marked as the retired lineage specs; trap 7's citation
  re-pointed at the LIVE auth.spec check.
- **The count ladder re-anchored 358/26 → 367/28** (unit) and 53 → 54
  (e2e) at every live-tense site (AGENTS · CLAUDE · README · PAD
  §3.2/§7.1/§7.3/§10 · SKILL §7 · the worklog Stage Summary), the
  category split now 13 batteries/196 + 15 contracts/171, with both
  new families named in the CLAUDE/SKILL prose lists — the round-7
  lockstep design working exactly as built (the battery itself went
  RED on the new files and forced every site forward).

## The round's deliverables

`tests/re-pin-tokens.test.ts` + `tests/doc-pointer-census.test.ts` (the
two new batteries, mutation-proven) · the `auth.spec.ts` computed pin ·
`scripts/mobile-census-199.ts` (the link-ride probe — the standing
census, now a one-command run) · the Tailwind report cure · the plan doc
`docs/plans/2026-11-03-session199-round8-repin-token-pins.md` · the
refreshed dev-server capture set (the 6 `ours-*` faces under
`docs/screenshots/`, pixel-verified) · this log + the worklog round-8
lines.

## The gate re-proof before ship

The full chain re-run after the changes: lint 0/0 · tsc 0 · **367/367
(28 files)** · build (22 routes) · smoke 14/14 · e2e **54/54 (6
specs)** — then the push to main via `docs/ssh_git_wrapper_v3.py` (the
paramiko shim — this sandbox has no OpenSSH binary), remote ref
verified == HEAD, key shredded, no new branches.

**Suggested next:** the standing cadence — `bun audit` re-triage each
round (any advisory reaching a runtime dep is the security driver that
reopens the lockfile) — and the two round-8 batteries extend the
self-enforcing perimeter: a dropped re-pin token or a re-dangled doc
citation is now a red test, not a grep discipline.
