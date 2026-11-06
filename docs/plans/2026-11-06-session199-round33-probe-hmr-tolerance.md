# The Round-33 Remediation Plan — the PROBE-HMR-TOLERANCE cure + the FORCED-COLORS LANDING-REGISTER census (session-199)

**The round's fresh angle:** the session-58 candidate list's first road —
the LANDING's sanctioned contrast register under forced colors (does the
collapse change the citations?) — PLUS the round's own live catch: the
probe-tooling HMR hang, diagnosed live in this sandbox while re-running
the standing probes (all four live scripts wedge against a healthy dev
server; the discovery below is the evidence).

## The census + the bug (round-33 discovery probes — both apps, guest-only GETs + the one sanctioned demo login)

- **F-33a (HIGH, tooling — the probe-hang bug, live-diagnosed)**: the
  four live scripts (`scripts/parity-199.ts`, `scripts/drift-199.ts`,
  `scripts/mobile-census-199.ts`, `scripts/capture-199.ts` — 1, 20, 1
  and 12 `waitUntil: "networkidle"` goto sites) can NEVER settle
  against a healthy Next.js 16 dev server: Turbopack's HMR websockets
  persist for the page's lifetime (diagnosed live: 32
  `ws://localhost:3000/_next/hmr` connections observed on ONE page
  load; a raw curl handshake against `/_next/hmr` returns 101 and
  holds), so `networkidle` never fires. Every such goto wedges at its
  30s timeout and the wedged run hangs the probe silently (the round-18
  launch-ceiling family). Observed live this round: the mobile-census
  script timed out at its first OURS goto against the dev server; the
  diagnostic confirmed `domcontentloaded` lands in ~1.7s while
  `networkidle` never arrives. The scripts' own header contracts
  ("expects our dev server on :3000") are unexecutable in such an
  environment — including the operator's standing screenshot
  instruction (the dev-server captures). THIS round's live probes ran
  against the STANDALONE artifact on :3000 instead (the production
  faces — the authoritative comparison target), so the round-32
  evidence stands; but the dev-server contract is broken until cured.
- **F-33b (the forced-colors LANDING-register census — the session-58
  candidate 1, a POSITIVE census)**: under `forcedColors: "active"`,
  the landing's axe-core color-contrast citations COLLAPSE from the 16
  sanctioned nodes at screen to exactly 3 — and all three are the
  amber-500 EYEBROW family (the hero, services and testimonials section
  headers — the zinc-950-section eyebrows; the at-rest below-fold
  content is reveal-hidden, so the mount-visible headers are what the
  sweep sees). The mechanism: under the collapse every eyebrow computes
  CanvasText `rgb(0,0,0)` ink over Chromium's forced-colors background
  serialization, which axe cannot resolve to a solid backdrop — the
  flag is the browser-emulation artifact, NOT a painted divergence.
  The REFERENCE's own sweep under the same condition flags the SAME
  three elements (its eyebrows carry no `text-amber-500` class — the
  F-31c class-literal decode again: the reference inks them by its own
  mechanism, ours spells the class; the ELEMENTS are the same) PLUS one
  `select-name` violation (the reference's unassociated contact select
  — OURS binds id/htmlFor, the standing a11y superset). OUR 3 nodes all
  match the sanctioned register's EXISTING amber-eyebrow arm
  (`text-amber-500`). The register already covers the collapsed face;
  nothing new to remediate.
- **The authed-world re-census (the operator's standing login
  instruction)**: re-verified live 2026-11-06 (round-33) — the demo
  login succeeds → redirects to `/` (the landing); zero cookies (the
  base44 session rides localStorage: token, base44_access_token,
  base44_analytics_session_id); every candidate authed route
  (/dashboard, /profile, /settings, /about, /contact) still serves the
  derived-title 404 shell ("Dashboard | EleganceFlow" et al., innerText
  ≈ 85–89 chars, the "404" h1). The PAD §2 record holds.

## The decision (the house doctrine applied)

**The probe-tooling cure ships; NO parity-surface source changes.**
F-33a is a real tooling bug (the scripts' documented contract — the dev
server on :3000 — is unexecutable): the cure is the shared
HMR-tolerant load helper (`scripts/probe-load.ts`) + the four script
cures, following the a11y spec's own tolerant pattern
(`waitForLoadState("networkidle").catch()`): `domcontentloaded` first
(always fires), then a BOUNDED networkidle wait (settles the reference
SPA's client-side fetches — fires in seconds there, no persistent
sockets), never fatal, then the settle window. The production fast
paths (the reference, the standalone artifact) keep their networkidle
semantics; the dev server gets the bounded fallback. F-33b is a
positive census → the PIN (the new e2e leg), so the collapsed-register
posture can never silently change.

## The cures (TDD — the pin battery born RED on the current tree; the mutation proof follows)

1. **The pin battery** `tests/probe-load-contract.test.ts` (the 53rd
   unit file, the 40th source contract): ① the helper contract —
   `scripts/probe-load.ts` exists; comment-stripped it carries
   `waitUntil: "domcontentloaded"` first, the bounded
   `waitForLoadState("networkidle", { timeout: 12_000 }).catch`
   shape (never fatal), and the settle `waitForTimeout(1_200)`;
   ② the four live scripts import the helper and carry ZERO bare
   `waitUntil: "networkidle"` (comment-stripped reads — a literal
   pinned by a comment alone is vacuous); ③ the exemption record —
   `scripts/parity-199b.ts` (the REF-only one-off) carries no OURS
   destination (no `localhost` in source), so the tolerant load does
   not apply; ④ the AGENTS.md doc-stratum pin — the probe-usage note
   names the HMR-tolerant contract.
2. **The helper + the script cures**: `scripts/probe-load.ts` exports
   `probeLoad(page, url)`; the four scripts replace their
   networkidle gotos with it (the scripts' own post-goto settle waits
   stay — surgical diffs).
3. **The e2e leg (+1 → 121)**: `tests/e2e/a11y.spec.ts` gains the
   landing forced-colors census leg — `emulateMedia({ forcedColors:
   "active" })` on `/` at 1280×800, the declared-devDep axe engine:
   structural violations zero, and every color-contrast node cites the
   register's amber-eyebrow arm; the census SHAPE pinned at exactly
   the three zinc-950-section eyebrows (a NEW unsanctioned family
   REDs the leg).
4. **The live re-validation AGAINST THE DEV SERVER** (the cure's own
   proof): parity COMPUTE IDENTICAL both viewports · drift NO DRIFT
   all twenty legs · the mobile-menu census byte-equivalent — every
   probe this time rides the tolerant load against `bun run dev` on
   :3000.
5. **The captures refresh against the dev server** (the operator's
   standing instruction — restored by the cure): the 18-capture set
   re-run via the cured `capture-199.ts`; byte-compare against the
   committed set (no visual change expected — the round ships no
   parity-surface change); PIL-verify non-blank.
6. **The doc cures**: the session log `docs/session_60.md` + this plan
   doc; the count ladder re-locked at all sites (591+N/53 · e2e 121/8
   — the census battery's claim shapes enumerate them); the PAD §7.1
   split rows re-locked (13 seam/196 + 40 source contracts/395+N);
   the census battery's SOURCE_CONTRACTS gains `probe-load-contract`
   (the 40th); CLAUDE.md + SKILL.md name the new family; AGENTS.md's
   probe-usage note gains the HMR-tolerant contract sentence; the PAD
   §5.2 gains the forced-colors landing-register census record; the
   worklog round-33 entry + verification line.
7. **The cleanup**: the round's scratch probes (the authed-world
   census, the forced-colors sweep, the eyebrow-face read, the
   networkidle diagnostics) are removed before the commit (the house
   scratch discipline).

## The execution order

R-1 the pin battery born RED → R-2 the helper + the four script cures
→ R-3 GREEN + the mutation proof (M1 the helper's domcontentloaded
reverted to networkidle · M2 the `.catch` dropped from the bounded
wait · M3 one script's helper import dropped with a bare networkidle
goto restored · M4 the settle wait removed · M5 the AGENTS.md note
reverted — each class must bite) → R-4 the e2e leg → R-5 the live
probes re-run against the DEV server → R-6 the captures → R-7 the
ladder + docs re-lock → R-8 the full gate (lint → typecheck → test →
build → smoke → e2e) → R-9 the ship (the SSH wrapper, main only).
