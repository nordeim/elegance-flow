`docs/session_5.md` logs the round-5 re-validation (the DEPLOYMENT.md
cure at the owner's `fcbc9c2`); `docs/session_6.md` is the owner-committed
narration transcript of that session. Now at fresh HEAD `5fc5a84`, this
round: pull re-orientation, the gate + both live probes re-proven, a
fresh-eyes audit, and round-5's own suggested-next CLOSED — the
unpinned-doc class gets its census pin.

## Re-orientation

Pulled at `5fc5a84` (the delta from round-5's ship `d4e4a77` is
`docs/session_6.md` alone — a doc, no code). The environment survived the
sandbox recycle: `.env` intact with the mandated contract
`DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), census
MATCH (3 + 4 users), `bun install` no-changes ("checked 434 installs
across 526 packages" — the AGENTS.md count claim exact). The doc set
re-internalized (AGENTS · CLAUDE · README · PAD v2.0 · the skill v1.199.0
· the worklog · session_5/session_6 · the round-5 plan · the
web-application skill + the catalog's named skills · the Tailwind v4
report · the ssh-wrapper runbook). The neo-crm lineage repo present as
the tech-stack pattern reference — the patterns already carried verbatim.

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **343/343 (24 files)** ·
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
- The filesystem censuses: 11 API route files / 13 verb handlers / the
  8-route auth family / 3 SEO handlers / the 4-loc sitemap (1.0/0.8
  scheme) — every doc claim held.

## The audit — one suggested-next closed, the standing duty re-triaged

- **R-1 (the remediation — round-5's own closing line, closed this
  round):** "consider a docs-census test pinning `DEPLOYMENT.md`'s
  counts the way `tests/sitemap-routes.test.ts` pins the sitemap's route
  list — the class of catch this round was exactly the unpinned-doc
  class." Two stragglers had escaped through that hole (the round-3
  sitemap, the round-5 DEPLOYMENT.md). **Cured**:
  `tests/deployment-doc-census.test.ts` (+8 checks) — §1's counts
  (11 API files / 13 verb handlers / 8-route auth family / 3 SEO
  handlers / 22-route build table) pinned against the live filesystem
  census; the retired never-returns (the ORBITAL name, the CRM-era
  "29/41" counts, the retired CRM route paths); §3's env table pinned to
  the live contract (the 3 core vars + every `KNOWN_NEO_VARS` member —
  and no invented knob); §3's AUTH_SECRET row pinned to the CURRENT
  fail-fast boot gate; §6's health example pinned to the live route's
  envelope face. The doc is read whitespace-flattened (a ~76-column
  re-wrap can never hide a retired claim — the lesson learned building
  it: the first draft missed "13 verb\nhandlers" across the wrap).
  **The pin proven to BITE** — eight mutations, eight REDs: the CRM-era
  counts (2 checks red), the ORBITAL name, the retired `/accounts` path,
  the renamed NEO knob, the stale AUTH_SECRET description, the
  pre-envelope health example, the wrong build-table count, the drifted
  SEO-handler count — each failed its check, the doc restored
  byte-identical, 8/8 green. The count ladder re-anchored 343/24 →
  **351/25** at every live-tense site (AGENTS · CLAUDE · README · PAD
  §7.1/§7.3/§10 · SKILL §7 · the worklog).
- **I-1 (INFORMATIONAL, the standing duty — unchanged):** `bun audit`
  still reports 10 advisories (4 high, 5 moderate, 1 low) — ALL
  dev/build/lint/test toolchain-transitive (minimatch via eslint ·
  deepmerge-ts via the prisma CLI · vite/launch-editor via vitest ·
  source-map-js via postcss · zod@4.6.5 NESTED in eslint-plugin-react-
  hooks while the RUNTIME direct zod is 4.6.7, above the
  GHSA-mrhx-c7xc-m3w5 floor). Zero runtime request-path exposure; the
  lockfile untouched per the surgical doctrine — no security driver.
- Everything else re-swept clean: the operator's standing config asks
  verified (`.env` db-path contract + census MATCH; the vitest/playwright
  configs with the `skills/` exclusions; the sitemap/SEO family), the
  TODO/FIXME/placeholder sweep clean, `.env.example` verified var-by-var
  against `boot-env.ts`, the 526-package claim exact.

## The round's deliverables

`tests/deployment-doc-census.test.ts` (the census pin, mutation-proven)
· `docs/plans/2026-11-03-session199-round6-docs-census-pin.md` (the
round's plan, validated against the tree before execution) · the
refreshed dev-server capture set (the 6 `ours-*` faces under
`docs/screenshots/`, pixel- and diff-verified) · the count-ladder
re-anchor across the five root docs · this log + the worklog round-6
lines.

## The gate re-proof before ship

The full chain re-run after the changes: lint 0/0 · tsc 0 · **351/351
(25 files)** · build (22 routes) · smoke 14/14 · e2e 53/53 — then the
push to main via `docs/ssh_git_wrapper_v3.py` (the paramiko shim — this
sandbox has no OpenSSH binary), remote ref verified == HEAD, key
shredded, no new branches.

**Suggested next:** the standing cadence — `bun audit` re-triage each
round (any advisory reaching a runtime dep is the security driver that
reopens the lockfile) — and the drift/parity probes stay the bar for any
future reference-face change.
