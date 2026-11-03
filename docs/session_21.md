`docs/session_19.md` logs the round-12 re-validation (the image census
at the owner's `9b17414`); `docs/session_20.md` is the owner-committed
narration transcript of that session. Now at fresh HEAD `7f42923`, this
round: the clone re-orientation, the gate + both live probes + the
mobile-menu census re-proven, a fresh-eyes audit — and the focus-face
class closed: the landing's focus outlines, the seventh v4 trap, and
the auth card's live drift all sit under the gate at every tier.

## Re-orientation

Workspace refreshed at `7f42923` (the delta from round-12's ship
`ca1579d` is `docs/session_20.md` alone — a doc, no code). The
environment: `.env` carries the mandated contract
`DATABASE_URL="file:../db/custom.db"` (`db/` at the repo root), census
**MATCH (3 + 4 users)**. The doc set re-internalized (AGENTS · CLAUDE ·
README · PAD v2.0 · the skill v1.199.0 · the worklog · session_19 +
session_20 · the round-12 plan · the web-application skill + the
catalog · the Tailwind v4 report · the ssh-wrapper runbook). The
neo-crm lineage repo stands as the tech-stack pattern reference — the
patterns already carried verbatim; no new tech-stack surface this
round.

## The status validation — every doc claim re-proven

- **Gate at HEAD**: lint 0/0 · tsc 0 · unit **406/406 (31→32 files,
  the round-12 census)** · build (**22 routes**) · smoke **14/14** ·
  e2e **72/72 (8 specs)** — every count matching the round-12
  re-anchor.
- **Live parity**: `scripts/parity-199.ts` — **COMPUTE IDENTICAL at
  1280 + 390** (the oklab/rgba s18 serialization class excluded, same
  paint).
- **Drift**: `scripts/drift-199.ts` — **NO DRIFT** (text + img census).
- **The mobile-menu census** (the operator's standing emphasis):
  byte-equivalent live on BOTH apps at 390×844; link-ride navigates
  `#about` AND closes on both; the sole delta OUR `aria-expanded` (the
  documented invisible a11y superset). **No Tailwind v4 bug** in the
  six pinned traps.
- The standing config asks re-verified: the `.env`/db-path contract,
  the vitest/playwright configs (the `skills/` exclusions),
  `.env.example` var-by-var, the TODO/FIXME sweep clean, the advisory
  ledger **unchanged — 10 (4 high, 5 moderate, 1 low), all dev-toolchain
  transitive**; runtime zod ^4.6.7 above the GHSA floor; no security
  driver.
- **Two fresh census legs run CLEAN (positive findings)**: the
  intermediate-viewport parity census (768/1024/767 — the unprobed
  breakpoint boundaries — COMPUTE IDENTICAL, zero deltas, the first
  time any round probed them) and the head-asset family (og-image
  1200×630 · icon 512 · apple-icon 180 · the manifest's icon
  references — every head-referenced asset exists and serves with the
  pinned content-types).

## The audit — the fresh angle: the FOCUS-FACE census (the interactive faces no probe reads)

**F-1 (HIGH) — the landing's focus-outline COLOR computed divergent.**
Live-probed settled at real keyboard focus: every UA-outline-painting
focusable landing control (the 6 nav links, GET IN TOUCH, the filter
chips, the carousel selector, the form submit, the hamburger at 390)
rendered OURS zinc-950@50% (`oklab(0.140764 0.00120224 -0.00421676 /
0.5)` = rgb(9,9,11)@0.5) vs the LIVE reference's `rgba(10, 10, 10,
0.5)` (neutral-950@50%). The root cause — a CURE-COLLISION: the
session-193 universal rule `* { outline-color: color-mix(in oklab,
var(--color-ring) 50%, transparent) }` was authored when --color-ring
was #0a0a0a; round-10 legitimately re-pinned --color-ring to #09090b
(the LIVE auth sign-in ring) — silently dragging the universal outline
face. The reference carries TWO independent faces (its landing
bundle's universal rule rides neutral-950; its auth card's ring
zinc-950); our build had collapsed both onto one token. Invisible to
every gate: parity-199 reads at-rest faces, round-10's battery pins
the superset rings + the auth ring, no probe read the landing's
outline colors.

**F-2 (MEDIUM) — the SEVENTH Tailwind v4 re-pin trap: the
`outline-none` semantic rename.** The reference's compiled CSS ships
`.outline-none { outline-offset: 2px; outline: rgba(0, 0, 0, 0) solid
2px }` (verified live via the CSSOM walk + the CDP matched-rules
dump); v4's `outline-none` computes `outline-style: none`. Live
settled at keyboard focus: REF `solid 2px rgba(0,0,0,0)` + offset 2px
vs OURS `none` + offset 0 — on the landing's four form controls and
the auth card's whole input/submit/verify family. Both faces invisible
(transparent vs none) — a computed-face divergence by the doctrine's
letter, the trap-⑥ genus.

**F-4 (MEDIUM) — the auth card DRIFTED: the base44 platform's
semantic-token refresh.** The reference's /login now rides `--sem-*`
tokens (its Google button: rgb(15,14,14) ink on rgb(233,230,224)
border, hover rgb(241,238,234)/rgb(221,216,210); its divider
rgb(93,93,93); its card foreground rgb(9,9,11); its inputs py-2) —
our mirror still shipped the 2026-11-03 slate family. No probe read
/login since the byte-verification: the drift shipped silently. The
ring families still matched (round-10's pins re-proven live).

**F-3 (Informational — engine + platform deltas, no action).** At
programmatic/plain focus the reference's sign-in button computes
Chrome's adaptive UA ring (`-webkit-focus-ring-color` resolving white
over the dark button) — not a user-reachable state on a fresh page;
and the reference's landing vs auth pages ship DIFFERENT latent border
defaults (its app bundle's shadcn neutral-200 vs its platform
bundle's v3-preflight gray-200) — ours rides the landing's (the
parity-gated surface), the platform's latent default documented.

## The TDD cure (born RED → green → proven to bite)

`tests/focus-outline.test.ts` (+19 checks, the 33rd unit file) **born
RED 18/19 on the live tree** — the universal outline-color literal,
its retired color-mix form, --color-foreground ±, --color-line ±, the
outline census, the google/divider literals, the retired slate forms,
the pad faces. The cures: the universal `* { outline-color: rgba(10,
10, 10, 0.5) }` decoupled from --color-ring (byte-identical
serialization, no color-mix); `--color-foreground: #09090b`; the
composed v3 outline face on every reference-mirrored carrier; the
auth inks re-pinned to the platform's live literals; py-2 / px-3
py-2. The battery 19/19 GREEN after.

**Two harness finds recorded (both caught by the live re-read, the
honest record):** (1) the first cure spelled the v3 face as
`outline-hidden` — and the live computed re-read caught it still
computing `none`: v4.3's outline-hidden is style:none with the
transparent outline forced-colors-only; only the
`outline-2 outline-transparent outline-offset-2` composition computes
the reference's face. (2) the first pass re-pinned --color-line to
#e5e7eb on the auth probe alone — and the live LANDING
re-verification falsified it (the focus census went 6-delta RED on
the latent borders): the reference ships two different latent border
defaults across its own bundles; ours rides the landing's, the
platform's is the documented delta.

`scripts/drift-199.ts` gains the **LOGIN-FACE census** (the auth
card's at-rest computed faces at 1280: the foreground, the Google
ink/border + hover pair, the divider ink, the input/submit pads) —
**born RED live on the pre-fix tree (6-field DRIFT), NO DRIFT after
the cure**. The keyboard e2e battery gains both computed pins (+2):
the focused filter chip computes rgba(10,10,10,0.5) + auto, the
focused auth input computes solid 2px transparent + offset 2px — the
bounded Tab-ride loop keys on the active element, never a fixed Tab
count.

**The mutation proof: 6/6 classes bite + the live drift leg + the
e2e leg** (the outline-color literal reverted · a landing control
back to outline-none · the foreground reverted · the google ink
reverted · the pad dropped · the falsified --color-line re-pin
reintroduced — each RED; the pre-fix login world re-applied → live
DRIFT; M1 rebuilt into the artifact → the round-13 e2e pin RED) — all
files restored byte-identical via the /tmp-backup harness, 425/425 +
74/74 after.

**The focus-face census re-run clean: ZERO deltas at both viewports.**

## Shipped

The count ladder re-anchored **425/33 (13 seam/196 + 20 source
contracts/229) · e2e 74/8** at every live-tense site; the trap census
six → SEVEN (AGENTS · CLAUDE · SKILL §3 · the Tailwind report's trap
log gains the trap-7 appendix); the captures refreshed (6 `ours-*`
faces, pixel-verified); the gate re-proven green (lint 0/0 · tsc 0 ·
425/425 · 22 routes · smoke 14/14 · e2e 74/74); parity IDENTICAL ·
drift NO DRIFT (both legs) · the mobile census byte-equivalent; the
advisory ledger unchanged at 10. Pushed as one atomic commit on main
via the SSH wrapper (`--remote` pointing at elegance-flow, the key
shredded after, no new branches).
