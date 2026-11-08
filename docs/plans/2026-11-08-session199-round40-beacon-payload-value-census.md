# The Round-40 Remediation Plan — THE BEACON-PAYLOAD VALUE CENSUS + THE RUNTIME ZERO-REQUEST PIN (session-199)

**The round's fresh angle:** the round-39 recorded candidate — the
network leg pinned the request SHAPES (the postShape
`/api/apps/<hex24>/analytics/track/batch => {events:array(1)}`), but
the payload VALUES were never decoded, and the two network-facing legs
never cross-checked each other. Three unread faces ride the same axis:

1. **The payload VALUE semantics** — the event_name constant, the
   timestamp format, the user_id/referrer faces: the round-38 census
   decoded the event shape's KEY SET only (`{event_name,
   properties{referrer}, timestamp, page_url, user_id, session_id}`);
   what those fields carry was never read.
2. **The cross-leg LINKAGE** — the beacon's `session_id` and the
   storage leg's `base44_analytics_session_id` are two views of ONE
   per-session id (never established: the legs were born in different
   rounds and never cross-checked).
3. **The interactive axis** — the endpoint's name says "batch"; no
   probe ever established whether interaction fires MORE events or
   whether the load-time family is the complete family.

**The catches:**

- **F-40a (MEDIUM, coverage-gap/census-shape — the round's own audit
  catch, live-diagnosed while decoding the values)**: the beacon
  payload's VALUE semantics are unpinned — a platform change (a new
  event_name, a timestamp format change, a referrer-policy change)
  would drift with no census to catch it. The drift `[network]` leg
  decodes SHAPES only; the PAD §2 network record carries the key set,
  never the semantics.
- **F-40b (the census — the values finally decoded, live 2026-11-08,
  fresh-context probes on the reference)**:
  - `event_name`: the CONSTANT `"__initialization_event__"` — the
    platform's only event.
  - The INTERACTIVE AXIS (the batch question answered): interaction
    fires ZERO beacons — the CTA click, the nav-link click, the
    portfolio-filter click, and the mobile-menu ride (open + link
    click) each fire zero api-like requests. The load-time four-request
    family is the COMPLETE family; `events:array(1)` is the constant
    per-load batch, never a batching artifact.
  - `timestamp`: ISO-8601 UTC with milliseconds
    (`2026-11-07T23:34:04.396Z` — the `YYYY-MM-DDTHH:mm:ss.sssZ`
    shape), never epoch-ms.
  - `page_url`: the PATH ONLY (`"/"`), never absolute.
  - `user_id`: `null` on the guest load; the 24-hex user id after the
    demo login (the authed-world beacon family: the same
    `__initialization_event__`, the user_id now set).
  - `properties.referrer`: `""` on a direct load; the ABSOLUTE login
    URL (`https://…base44.app/login`) on the post-login landing load.
  - `session_id`: the lowercase-alnum per-session id (the recorded
    18–24 window), STABLE across the login — and LINKED to
    localStorage's `base44_analytics_session_id` (verified live: the
    beacon body's session_id === the storage key's value in the same
    context; the storage family and the beacon family ride ONE id).
- **F-40c (the runtime twin gap)**: OUR zero-beacon posture is pinned
  at the SOURCE level (the network-faces census reads `src/` only) and
  on the dev server (the drift `[network]` leg), but the ARTIFACT's
  runtime load-time request family is not e2e-pinned — the round-38
  e2e describe pins the response-HEADER face only. A future
  dependency planted in a client component (an analytics package whose
  own sendBeacon lives in `node_modules`, outside the src-census
  needles) would fire on the wire while every source pin stays green.
  The runtime leg closes the class: whatever fires, fires on the wire.

**The standing re-validation at open** (all green, the round-39 ship
state reproduced exactly): lint 0/0 · tsc 0 · 648/648 (58 files) ·
build 22 routes · smoke 14/14 · e2e 133/133 · census MATCH · parity
IDENTICAL both viewports · drift NO DRIFT ×24 (exit 0, the full
runtime) · the mobile-menu census byte-equivalent — the operator's
standing emphasis: the menu works exactly as expected, NO Tailwind v4
bug. The operator's standing login instruction executed (the
reference's authed-world re-census — the PAD §2 record holds: the demo
login → `/`, the derived-title 404 shells, zero cookies, the
seven-key localStorage family). The advisory re-triage: the posture
UNCHANGED (10 advisories — 4 high, 5 moderate, 1 low — all
dev/build/test toolchain-transitive; the runtime zod 4.6.7 above the
`<4.6.6` patched floor — the PAD §10 ledger row stands, no security
driver). The neo-crm stack patterns re-verified (the identical core
pins: next ^16.4.2 · react ^19.3.1 · @prisma/client ^6.19.3 · zod
^4.6.7 · tailwindcss ^4.3.3 · typescript ^5.9.3 · vitest ^5.0.5 ·
@playwright/test ^1.64.1 · lucide-react ^0.525.0).

**The remediation, TDD (the pin battery born RED before the cures):**

- **R-2 the born-RED pin battery** — `tests/network-faces.test.ts`
  gains the round-40 describe (+4):
  ① the drift leg's VALUE-decode pin (the `networkFace` sweep decodes
  the beacon semantics — the event_name constant, the ISO-timestamp
  shape, the path-only page_url, the guest user_id face, the
  direct-load referrer face, the session_id shape — and the post-settle
  localStorage cross-check);
  ② the interactive-zero pin (the leg's post-settle interaction sweep:
  the CTA click fires zero api-like requests both apps);
  ③ the AGENTS.md doc pin (the network-posture paragraph's
  value-semantics sentences);
  ④ the e2e round-40 leg pin (the runtime zero-request family describe
  in landing.spec.ts).
  **Born RED 4/4 expected** (all four pin ships that land with R-3+).
- **R-3 the drift `[network]` leg extension** — `networkFace` gains
  the `beaconSemantics` decode (the payload's semantic constants —
  shapes and constants, never per-session values) + the LINKAGE
  cross-check (the post-settle localStorage analytics id === the
  beacon body's session_id) + the interactive check (the load family
  settles, the arrays clear, one CTA click, zero api-like requests —
  the complete-family census). The recorded per-side constants gain
  the semantics rows (REF: the decoded family; OURS: no beacons to
  decode — the `[]` face).
- **R-4 the e2e legs (+2 → 135)** — the round-40 describe in
  `tests/e2e/landing.spec.ts`: the artifact's runtime load-time
  zero-request family (ONE document request, zero api-like pathnames)
  + the interactive zero (a CTA click fires no api-like request — the
  runtime twin of the source census, closing F-40c).
- **R-5 the mutation proof** — M1 the leg's linkage check removed → ①
  RED · M2 the interactive sweep removed → ② RED · M3 the AGENTS.md
  note reverted → ③ RED · M4 the e2e family constant loosened → ④
  RED. All restored cmp-identical (the /tmp backup harness).
- **R-6 the doc cures + the count-ladder re-lock** — the new counts
  (648 + 4 = 652/58 files · e2e 133 + 2 = 135/8); the PAD §2 network
  record extension (the value semantics + the linkage + the
  interactive-zero + the complete-family census) + the §10 F-40a
  CLOSED row + the §7.1/§7.3 gate lines re-locked; AGENTS.md's
  network-posture paragraph gains the value-semantics sentences + the
  linkage rule; CLAUDE.md + SKILL.md extend the network-faces family
  description; the worklog round-40 entry + the Stage-Summary
  verification line re-locked (the census battery flags exactly the
  stale sites at the first run).
- **R-7 the captures refresh** against the dev server (the operator's
  standing instruction) — the timing-family expectation documented.
- **R-8 the full gate + the session log** — lint 0/0 · tsc 0 ·
  652/652 (58 files) · build 22 routes · smoke 14/14 · e2e 135/135;
  `docs/session_73.md`; the ship (one atomic commit on main via the
  SSH wrapper — dry-run → push → remote verification → key
  shredding; no new branches).

**Validation against the tree (pre-execution):** all anchors verified
live this round — the payload values decoded on fresh-context loads
(twice: the landing guest face + the login/redirect authed face); the
session_id ↔ localStorage linkage verified in-context (the same id in
the beacon body and the storage key); the interactive axis swept
(the CTA, the nav link, the portfolio filter, the mobile-menu ride —
zero beacons each); the drift `[network]` leg's current shape re-read
(the postShape decode, the per-side constants block, the 5s settle
window); the network-faces battery's structure re-read (the describe
shape, the strip/srcFiles helpers); the round-38 e2e describe re-read
(the header-face legs, the comment's own "the load-time request family
rides the drift leg" gap); the count-ladder census's SOURCE_CONTRACTS
list re-read (network-faces the 44th — the extension rides the
existing family, no new family row).
