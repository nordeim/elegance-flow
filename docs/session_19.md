`docs/session_17.md` logs the round-11 re-validation (the inbox-state +
client-error census at the owner's `c62976e`); `docs/session_18.md` is the
owner-committed narration transcript of that session. Now at fresh HEAD
`9b17414`, this round: the clone re-orientation, the gate + both live
probes + the mobile-menu census re-proven, a fresh-eyes audit — and the
image-drift class closed: the landing's image set now sits under the gate
at every tier, and the round's catch (five of six portfolio photographs
silently reusing other frames' photos) is cured at the source.

## Re-orientation

Workspace refreshed at `9b17414` (the delta from round-11's ship
`faccd20` is `docs/session_18.md` alone — a doc, no code). The
environment: `.env` carries the mandated contract
`DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), schema
pushed + seeded, census **MATCH (3 + 4 users)**. The doc set
re-internalized (AGENTS · CLAUDE · README · PAD v2.0 · the skill
v1.199.0 · the worklog · session_17 + session_18 · the round-11 plan ·
the web-application skill + the catalog · the Tailwind v4 report · the
ssh-wrapper runbook). The neo-crm lineage repo stands as the tech-stack
pattern reference — the patterns already carried verbatim; no new
tech-stack surface this round.

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **400/400 (31 files)** ·
  build (**22 routes**) · smoke **14/14** · e2e **61+10=71/71 (8 specs)**
  — every count matching the round-11 re-anchor.
- **Live parity**: `scripts/parity-199.ts` — **COMPUTE IDENTICAL at 1280
  + 390** (the oklab/rgba s18 serialization class excluded, same paint).
- **Drift**: `scripts/drift-199.ts` — **NO DRIFT** on its text face (the
  image face joins the probe this round — see the audit).
- **The mobile-menu census (the operator's standing emphasis)**,
  `scripts/mobile-census-199.ts` live on BOTH apps at 390×844: the same
  5 links + the amber CTA, link-ride navigates `#about` AND closes on
  both; the sole delta OUR `aria-expanded` (the documented invisible
  a11y superset). **No Tailwind v4 bug** (the six re-pin traps
  unit-gated since round-8, computed faces IDENTICAL).
- The standing config asks re-verified: the `.env`/db-path contract, the
  vitest/playwright configs (the `skills/` exclusions), `.env.example`
  var-by-var, the screenshots pixel-health, the TODO/FIXME sweep clean,
  the security headers, the cookie `secure`-in-production flag, zero
  lint/type suppressions in src/.
- The advisory ledger re-triaged: **unchanged — 10 advisories (4 high,
  5 moderate, 1 low), all dev-toolchain transitive**; runtime zod
  ^4.6.7 above the GHSA floor; no security driver.

## The audit — the fresh angle: the IMAGE census (the one content family no gate read, riding the standing "visual parity" + "SEO/perf" asks)

**F-1 (HIGH) — five of the six portfolio project images silently reused
other frames' photographs.** Live-probed (deterministic across two
fresh loads): the reference ships SIX distinct project photos; ours
rendered Project Two with Four's photo, Three with the About frame
(at a different `?w=` width), Four with the Hero frame, Five with
One's, Six with Four's — only Project One was correct. The Work
section rendered the wrong photographs on five of six cards, a
visible-face parity failure invisible to every gate: the parity probe
reads computed styles (an img's src changes none), the drift probe read
the text face only, the site-content battery pinned hero/about/avatars
but never the projects, the e2e battery pinned the overlay text and the
filter behavior but never the img srcs.

**F-2 (MEDIUM) — the image family carried zero pins at every tier.**
The same prescribed-surface-never-pinned genus as round-3's sitemap,
round-10's keyboard, round-11's state faces: whatever no probe reads is
exactly where drift ships.

**F-3 (Informational, no action) — the platform delta recorded**: our
SSR head carries React-19-generated image preloads where the SPA
reference carries none (invisible, load-improving); the SEO family
live-verified COMPLETE on the artifact (four titles + canonicals +
OG/Twitter + the designed 404's `noindex` + sitemap/robots/manifest
with pinned content-types); the production posture healthy (immutable
hashed assets · gzip active on GET — the HEAD-probe false-negative
lesson · the three security headers on every response).

**Positive findings (live-verified, no action):** the overlay text and
filter behavior byte-match; the alts match the reference's own DOM face
(including its four `alt="Client Name"` avatars — parity by doctrine);
git tree clean.

## The remediation (TDD)

- **`tests/landing-images.test.ts` (+6 checks, the 32nd unit file)** —
  born RED 3/6 on the live tree: the exact six-photo set pin · the
  uniqueness census on PHOTO IDs (the shipped reuse rode a different
  `?w=` width — a full-URL compare passes while showing the same
  photograph) · the hero/about borrow pin (same ID discipline) · the
  alt faces · the hero/about/avatars re-pinned as one family.
- **The cure**: `src/lib/site-content.ts` PROJECTS[1..5] re-pinned to
  the reference's live set (One unchanged).
- **`scripts/drift-199.ts` gains the img census** (src → alt, all imgs
  in DOM order) — proven born-RED live on the reverted tree (the exact
  divergence printed), NO DRIFT after the cure. Harness find recorded:
  a probe field wired without its diff call is vacuously green — the
  born-red run is what proves the wiring.
- **`tests/e2e/landing.spec.ts` (+1 check)** — the rendered 12-img
  census pinned against the standalone artifact.
- **The mutation proof: 4/4 bite + the e2e leg** — the reuse form (2
  RED) · a plausible different photo (the exact-set carries alone) ·
  the hero borrow under a width suffix (2 RED) · the naive re-pin world
  (the code dup'd AND the exact-set "helpfully" updated — the
  uniqueness census bites ALONE) · the e2e leg rebuilt RED then
  restored green. All files restored byte-identical (the /tmp-backup
  harness).
- **The visual confirmation**: the 6 project cells cropped from the
  refreshed fullpage capture by their live DOM rects each match THEIR
  assigned photograph (6/6, healthy margins).
- **The count ladder re-anchored 400/31 → 406/32 (13 seam batteries/196
  + 19 source contracts/210) + 71/8 → 72/8 (e2e)** at every live-tense
  site (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§7.10 · SKILL §7
  · the worklog Stage Summary), the new family in the CLAUDE/SKILL
  prose lists — the round-7 lockstep battery itself going RED on the
  new file and forcing every site forward, exactly as designed.
- **The advisory ledger held at 10** post-cure.
- **The captures re-run** — the 6 `ours-*` faces refreshed,
  pixel-verified.

## The round's deliverables

`tests/landing-images.test.ts` (the image source contracts) · the
`site-content.ts` cure (the six distinct project photographs) · the
drift probe's img census · the landing e2e's image-census check · the
plan doc
`docs/plans/2026-11-04-session199-round12-image-census.md` · the
refreshed dev-server capture set · this log + the worklog round-12
lines.

## The gate re-proof before ship

The full chain re-run after the changes: lint 0/0 · tsc 0 · **406/406
(32 files)** · build (22 routes) · smoke 14/14 · e2e **72/72 (8
specs)** — plus the live parity/drift/mobile probes re-proven (the
drift probe now carrying the img census) — then the push to main via
`docs/ssh_git_wrapper_v3.py --remote git@github.com:nordeim/elegance-flow.git`
(remote ref verified == HEAD, key shredded, no new branches).

**Suggested next:** the standing cadence continues — each round
re-proves the gate + probes and picks a fresh audit angle. The image
class is now gate-pinned at all three tiers (source pin · live probe ·
artifact census); the next unpinned surface is wherever no probe reads.
