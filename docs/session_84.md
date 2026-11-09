# Session 84 — Round-45: The Beacon-Suffix Separator/Multi-Segment Decode Family (the derivation's edge variants)

**The opening state.** The round opens at the owner's `0101119` (the
round-44 ship `88aa4c2` + the owner's session-83 process-log push; the
owner pushed nothing new). The workspace pulled clean over HTTPS — the
environment intact from the round-44 rebuild (node_modules/.next/db
verified, census MATCH (3 inquiries + 4 users)), no rebuild needed.

**The standing re-validation at open — all green:**
- The full gate: lint 0/0 · tsc 0 · **669/669 (58 files)** · build 22
  routes · smoke 14/14 · e2e 143/143 — the round-44 ship state
  reproduced exactly.
- The live probes: parity IDENTICAL both viewports (1280 + 390) ·
  **the mobile-menu census byte-equivalent — the operator's standing
  emphasis: the menu works exactly as expected, NO Tailwind v4 bug** ·
  drift NO DRIFT all twenty-four legs exit 0 (no transient this open).
- The operator's standing login instruction executed (the reference's
  authed-world re-census — the PAD §2 record holds: the demo login →
  `/`, every candidate authed route (/dashboard, /inbox, /settings,
  /profile, /admin) serves the derived-title 404 shell, zero cookies,
  the seven-key localStorage family).
- The advisory re-triage: the posture UNCHANGED (10 advisories — 4
  high, 5 moderate, 1 low — all dev/build/test toolchain-transitive;
  the runtime zod 4.6.7 above the `<4.6.6` patched floor).
- The neo-crm stack patterns re-verified against the live clone (the
  identical core pins: next ^16.4.2 · react ^19.3.1 ·
  @prisma/client ^6.19.3 · zod ^4.6.7 · tailwindcss ^4.3.3 ·
  typescript ^5.9.3 · vitest ^5.0.5 · @playwright/test ^1.64.1 ·
  lucide-react ^0.525.0).
- The standing contract items verified intact: the `.env` →
  `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo root ·
  the vitest + playwright config families · the sitemap/SEO family
  (the four public routes serving, the robots bytes, the manifest, the
  rendered head meta family) · the `.env.example` matching the
  codebase.

**The round's angle — the round-44 recorded candidate executed:** the
beacon-suffix hyphen/underscore decode family (session_82.md's third
candidate): the round-44 census pinned the suffix on exactly three
surfaces (`/`, `/signup`, `/nonexistent-xyz`) while the derivation's
EDGE variants rode no record — no probe ever established what the
suffix carries on a multi-segment path, an underscore path, a
mixed-case path, or a trailing-slash path.

**THE CENSUS (F-45b — live 2026-11-09, fresh-context probes on the
reference, twice; byte-stable across every run):**
- **Multi-segment: the FIRST segment only.** `/foo/bar` → the suffix
  `foo` — while the 404 TITLE family reads the LAST segment
  (`"Bar | EleganceFlow"`, the round-25 rule): TWO different
  derivations off ONE pathname, never contrasted before round-45.
- **Mixed case: the suffix is RAW.** `/MiXeD-cAsE` → `MiXeD-cAsE`
  verbatim — no camel-split (the title family splits to "Mi Xe D C As
  E"), no case folding. The suffix is the raw path segment, never a
  derived display string.
- **Underscore: preserved.** `/with_underscore` → `with_underscore`
  (the separator family completed; hyphens rode the round-44 record).
- **Trailing slash: stripped.** `/trailing/` → `trailing`.
- **The double-mount invariant.** Every 404-shell variant fires the
  SAME five-request double-mount family (requestCount 5, User/me ×2
  per variant — live-counted, never hand-typed). OUR side: the
  zero-request true-404 face holds on every variant (live-probed on
  the dev server: requestCount 0, meCount 0, no-beacon).

**THE CATCHES:**
- **F-45a (MEDIUM, coverage-gap/census-shape — the round-44 recorded
  candidate)**: the separator/multi-segment/case variants rode no
  record — a platform change (the suffix scheme switching to the full
  path, or to the title's camel-split display form) would drift with
  no census to catch it.
- **F-45b (the census above — the first-vs-last-segment and
  raw-vs-derived contrasts were never part of ANY record)**.
- **F-45c (the runtime twin gap)**: the round-44 e2e 404-surface leg
  pinned ONE variant surface; the separator spellings rode no runtime
  leg.

**The ship (TDD — the pin battery born RED 4/4 observed):**
- The round-45 blocks of `tests/network-faces.test.ts` (+4 → 28 in
  the family): the separator-family capture pin (decode-unique
  construction anchors: the per-variant loop + the recorded path set +
  the `path: variant` record construction — the round-42/44 born-red
  anchor doctrine) + the recorded per-side constants pin + the
  AGENTS.md/PAD doc pins + the e2e leg pin.
- The drift leg extension (extend the richest legs, no new leg — the
  round-40/41/42/44 doctrine): `routesFace`'s shell404 capture gains
  the `separatorFamily` — fresh contexts per app loading the three
  canonical variants (`/with_underscore`, `/foo/bar`, `/MiXeD-cAsE`),
  the api-like family + the User/me count + the suffix + the
  requestCount decoded per path (REF: 5/2/raw-suffix per variant;
  OURS: 0/0/no-beacon per variant).
- The e2e round-45 describe (+3 → 146, landing.spec.ts): the
  ARTIFACT's 404-surface SEPARATOR-VARIANT zero-request family — three
  explicit legs (the underscore, the multi-segment, the mixed-case
  spellings), each asserting the true-404 status + the zero-request
  face. The census-counting catch during the build: a for-loop
  describe yields ONE static `test(` but THREE runtime tests (the
  count-ladder census counts static blocks — 144 static vs 146
  runtime); the legs were UNROLLED into three explicit tests so the
  static census and the runtime reporter agree (every doc claim honest
  under both counting methods).
- The mutation proof 4/4 classes bite (M1 the separator capture
  removed · M2 the recorded constants rows removed · M3 the AGENTS.md
  round-45 sentences surgically reverted · M4 the e2e describe
  removed — each caught by its pin, all restored cmp-identical via
  the /tmp backup harness).
- The doc cures: AGENTS.md's network-posture paragraph gains the
  separator-family sentences (the first-segment-only rule + the
  raw-vs-derived contrast + the trailing-slash strip + the ×2
  invariant); the PAD §2 gains the separator/multi-segment record
  (round-45) + the §10 F-45a CLOSED row; CLAUDE.md + SKILL.md extend
  the network-faces family description; the count ladder re-locked at
  **673/58** (13 seam/199 · 45 source contracts/474) · e2e **146/8**
  — the census battery flagged exactly the stale sites at the first
  run (the five root docs + the worklog verification line + the PAD
  §7.1 rows).

**The proof:** lint 0/0 · tsc 0 · **673/673 unit (58 files)** · build
22 routes · smoke 14/14 · **e2e 146/146** · census MATCH · parity
IDENTICAL both viewports · the mobile-menu census byte-equivalent ·
the closing drift NO DRIFT all twenty-four legs (the extended
[routes] leg's separatorFamily constants verified live).

**The captures refresh** (the operator's standing instruction):
16/18 byte-identical; the 2 changed are the known timing family (the
dashboard + the deeplink-portfolio captures), PIL-verified non-blank
(20.20% / 68.33%).

Next-round candidates (recorded): the reduce+forced mid-flight window
census (the composition's temporal axis, unrecorded — the round-43
carry-over), the axe-under-orientation REFERENCE family pin (the
reference's own landscape select-name/h1 flags — recorded in the PAD,
never drift-pinned — the round-43 carry-over), or the beacon-suffix
ENCODING family (the reference's suffix on percent-encoded/query-
carrying paths — `/a%20b`, `/x?y=1` — the encoding and query variants
ride no record).
