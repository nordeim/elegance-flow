# The Round-45 Remediation Plan — THE BEACON-SUFFIX SEPARATOR/MULTI-SEGMENT DECODE FAMILY (the suffix derivation's edge variants)

**The round's fresh angle:** the round-44 recorded candidate — the
beacon-suffix hyphen/underscore decode family (session_82.md's third
candidate): the round-44 census pinned the suffix on exactly three
surfaces (`/` → `home`, `/signup` → `signup`, `/nonexistent-xyz` →
`nonexistent-xyz`), but the derivation's EDGE variants rode no record:
no probe ever established what the suffix carries on a MULTI-SEGMENT
path, an UNDERSCORE path, a MIXED-CASE path, or a TRAILING-SLASH path.

**The census (F-45b — live 2026-11-09, fresh-context probes on the
reference, twice; byte-stable across every run):**

- **Multi-segment: the FIRST segment only.** `/foo/bar` → the suffix
  `foo` — the beacon's derivation reads the FIRST path segment while
  the 404 TITLE derivation reads the LAST (`"Bar | EleganceFlow"`, the
  round-25 rule) — TWO different derivations off ONE pathname, never
  contrasted before this round.
- **Mixed case: the suffix is RAW.** `/MiXeD-cAsE` → the suffix
  `MiXeD-cAsE` VERBATIM — no camel-split (the title family splits to
  "Mi Xe D C As E"), no title-casing, no case folding. The suffix is
  the raw path segment, never a derived display string.
- **Underscore: preserved.** `/with_underscore` → `with_underscore`
  (hyphens ride the round-44 record verbatim already; the underscore
  variant completes the separator family).
- **Trailing slash: stripped.** `/trailing/` → the suffix `trailing`
  (the trailing slash drops before the first-segment read).
- **The double-mount invariant.** Every 404-shell variant fires
  User/me ×2 (the round-44 double session check holds across the
  whole variant family — the count is the SHELL's face, not the
  suffix spelling's).

**The catches:**

- **F-45a (MEDIUM, coverage-gap/census-shape — the round-44 recorded
  candidate)**: the separator/multi-segment/case variants ride no
  record — a platform change (the suffix scheme switching to the
  full path, or to a camel-split display form) would drift with no
  census to catch it (the [network] leg loads only `/`; the [routes]
  leg's shell404 capture loads only `/nonexistent-xyz`).
- **F-45b (the census above — the first-vs-last contrast and the
  raw-vs-derived contrast were never part of ANY record)**.
- **F-45c (the runtime twin gap)**: the round-44 e2e 404-surface leg
  pins ONE variant surface (`/nonexistent-e2e-probe`); the separator
  variants ride no runtime leg — OUR designed 404's zero-request
  family on the underscore/multi-segment spellings is unpinned on
  the wire.

**The standing re-validation at open** (the round-44 ship state
reproduced exactly at the owner's `0101119`): lint 0/0 · tsc 0 ·
669/669 (58 files) · build 22 routes · smoke 14/14 · e2e 143/143 ·
census MATCH (3 + 4 users) · parity IDENTICAL both viewports · the
mobile-menu census byte-equivalent — the operator's standing
emphasis: the menu works exactly as expected, NO Tailwind v4 bug ·
drift NO DRIFT all twenty-four legs exit 0 (no transient this open)
· the operator's standing login instruction executed (the authed
world record holds: the demo login → `/`, the derived-title 404
shells, zero cookies, the seven-key localStorage family) · the
advisory re-triage UNCHANGED (10 advisories — 4 high, 5 moderate,
1 low — all dev/build/test toolchain-transitive; the runtime zod
4.6.7 above the `<4.6.6` patched floor) · the neo-crm stack
patterns re-verified (the identical core pins: next ^16.4.2 ·
react ^19.3.1 · @prisma/client ^6.19.3 · zod ^4.6.7 · tailwindcss
^4.3.3 · typescript ^5.9.3 · vitest ^5.0.5 · @playwright/test
^1.64.1 · lucide-react ^0.525.0) · the standing contract items
verified intact (the .env → `DATABASE_URL="file:../db/custom.db"`
with `db/` at the repo root · the vitest + playwright config
families · the sitemap/SEO family serving · the `.env.example`
matching the codebase).

**The remediation, TDD (the pin battery born RED before the cures):**

- **R-2 the born-RED pin battery** — `tests/network-faces.test.ts`
  gains the round-45 describe (+4 → 28 in the family):
  ① the drift [routes] leg's SEPARATOR-FAMILY capture pin (the
  construction anchors: the fresh-context variant loop — the
  `/with_underscore` + `/foo/bar` + `/MiXeD-cAsE` family — the
  per-path suffix decode, decode-unique in the routesFace
  extension, never the bare literals);
  ② the recorded per-side separator constants pin (REF's
  first-segment/raw-case/underscore-preserved family with the ×2
  User/me invariant vs OURS's zero-request true-404 face);
  ③ the AGENTS.md + PAD doc pins (the first-segment-only rule + the
  raw-vs-derived contrast + the trailing-slash strip — the phrases
  UNWRAPPED, the round-40 line-wrap lesson);
  ④ the e2e leg pin (the ARTIFACT's 404-surface SEPARATOR-VARIANT
  zero-request family — the runtime twin of the variant surfaces).
  **Born RED 4/4 expected.**
- **R-3 the drift leg extension** (extend the richest legs, no new
  leg — the round-40/41/42/44 doctrine): `routesFace`'s shell404
  capture gains the `separatorFamily` — fresh contexts per app
  loading the three canonical variants (`/with_underscore`,
  `/foo/bar`, `/MiXeD-cAsE`), the api-like family + the User/me
  count + the suffix decoded per path (REF: the first-segment
  raw-case family, User/me ×2 each; OURS: the zero-request
  true-404 face on every variant).
- **R-4 the mutation proof** — M1 the separator-family capture
  removed → ① RED · M2 the recorded separator constants rows
  removed → ② RED · M3 the AGENTS.md/PAD sentences surgically
  reverted → ③ RED · M4 the e2e describe removed → ④ RED. All
  restored cmp-identical (the /tmp backup harness).
- **R-5 the doc cures** — AGENTS.md's network-posture paragraph
  gains the separator-family sentences (the first-segment-only
  rule + the raw-vs-derived contrast + the ×2 invariant); the PAD
  §2 path-suffix record EXTENDED with the round-45 decode + the
  §10 F-45a CLOSED row; CLAUDE.md + SKILL.md extend the
  network-faces family description; the count ladder re-locked at
  **673/58** (13 seam/199 · 45 source contracts/474) · e2e
  **146/8** — the census battery flags exactly the stale sites at
  the first run.
- **R-6 the captures refresh** against the dev server (the
  operator's standing instruction) — the timing-family expectation
  documented (16/18 byte-identical at round-44; the dashboard +
  landing-768 captures are the known animated pair).
- **R-7 the full gate + the closing drift + the session log** —
  lint 0/0 · tsc 0 · 673/673 (58 files) · build 22 routes · smoke
  14/14 · e2e 146/146; the closing drift NO DRIFT all twenty-four
  legs (the extended [routes] leg's new constants verified live);
  `docs/session_84.md`; the worklog round-45 entry.
- **R-8 the ship** — one atomic commit on main via the SSH wrapper
  (dry-run → push → remote verification → key shredding; no new
  branches).

**Validation against the tree (pre-execution):** all anchors
verified live this round — the census probed on fresh contexts on
the reference (twice, byte-stable: the three variants + the
trailing-slash strip + the ×2 User/me invariant), the [routes]
leg's shell404 construction re-read (the fresh-context extension
point after the canonical shell capture), the round-44 pin blocks
re-read (the construction-anchor doctrine), the e2e round-44
describe re-read (the runtime-twin pattern to extend), the
count-ladder census's counting rule re-read (the +4/+1 arithmetic
rides the existing family rows, no new family).
