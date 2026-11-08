# The Round-44 Remediation Plan — THE APP-LOG BEACON'S PATH-SUFFIX SEMANTICS + THE 404-SHELL NETWORK FAMILY (the beacon family's last unread members)

**The round's fresh angle:** the round-43 recorded candidate — the
app-log beacon's `log-user-in-app/home` path-suffix semantics, the
beacon family's one path member whose suffix semantics ride no record.
The [network] leg's recorded constant bakes
`POST /api/app-logs/<hex24>/log-user-in-app/home` as a LANDING-surface
literal, but the suffix's DERIVATION rule rode no census: no probe ever
established WHAT the suffix is on any other surface, whether the
auth-chrome family fires the beacon at all, or what the reference's SPA
404 shells fire on the network axis (the [routes] leg reads titles,
statuses and bodies — never requests).

**The census (F-44b — live 2026-11-09, fresh-context probes on the
reference, twice; byte-stable across every run):**

- **The suffix rule is PATH-DERIVED.** The app-log beacon's path
  carries the page's own first path segment VERBATIM — `/` → the
  literal `home` (the root's own mapping, the [network] leg's recorded
  landing constant), `/signup` → `signup`, `/nonexistent-xyz` →
  `nonexistent-xyz` (the segment carried verbatim, hyphens and all).
  The beacon family is per-surface derived, never a fixed path.
- **The surface-family split.** The auth-chrome surfaces (`/login`,
  `/reset-password`) fire NO app-log beacon and NO User/me session
  check — their family is the public pair only (the domain resolution
  + the login-info fetch; the round-41 record's own family). Every
  app-shell surface (the landing + every SPA 404 shell) fires the full
  app-shell family (User/me + the app-log beacon + public-settings +
  the analytics batch) with its own path-derived suffix.
- **The 404-shell DOUBLE session check.** The reference's SPA 404
  shells (its `/signup` soft-404 + every derived-title 404) fire
  User/me TWICE per load (both 401s on the guest load — the five-
  request family: 2× User/me + the suffix beacon + public-settings +
  the batch) while the landing fires it ONCE — the platform's own
  404-shell face (the SPA shell's double mount), never censused
  before this round.
- **OUR side.** The zero-beacon posture extends to EVERY surface —
  the landing, the auth family, AND the designed 404 (a TRUE 404
  status — zero api-like requests, zero api-like responses). The
  strictly cleaner face; the platform family is base44
  implementation, never mirrored (the network is not a rendered
  face).

**The catches:**

- **F-44a (MEDIUM, coverage-gap/census-shape — the round-43 recorded
  candidate)**: the beacon's path-suffix semantics rode no record — a
  platform change (the suffix scheme changing, the auth-chrome family
  growing the beacon, the 404 shells dropping their double mount)
  would drift with no census to catch it (the [network] leg loads only
  `/`; the [routes] leg never read the request axis).
- **F-44b (the census above — the 404-shell network family was never
  part of ANY record)**: the round-38 network census read the landing
  alone; the reference's own 404 shells fire a five-request family no
  probe ever enumerated, and the double User/me is a fresh face (the
  round-38 "four-request family" record is the LANDING's family, not
  the 404 shell's).

**The standing re-validation at open** (the round-43 ship state
reproduced exactly): lint 0/0 · tsc 0 · 665/665 (58 files) · build 22
routes · smoke 14/14 · e2e 142/142 · census MATCH (3 + 4 users) ·
parity IDENTICAL both viewports · the mobile-menu census
byte-equivalent — the operator's standing emphasis: the menu works
exactly as expected, NO Tailwind v4 bug · the operator's standing
login instruction executed (the authed-world record holds: the demo
login → `/`, the derived-title 404 shells, zero cookies, the seven-key
localStorage family) · the advisory re-triage UNCHANGED (10 advisories
— 4 high, 5 moderate, 1 low — all dev/build/test toolchain-transitive;
the runtime zod 4.6.7 above the `<4.6.6` patched floor) · the neo-crm
stack patterns re-verified (the identical core pins: next ^16.4.2 ·
react ^19.3.1 · @prisma/client ^6.19.3 · zod ^4.6.7 · tailwindcss
^4.3.3 · typescript ^5.9.3 · vitest ^5.0.5 · @playwright/test ^1.64.1
· lucide-react ^0.525.0).

**The remediation, TDD (the pin battery born RED before the cures):**

- **R-2 the born-RED pin battery** — `tests/network-faces.test.ts`
  gains the round-44 describe (+4):
  ① the drift [network] leg's SUFFIX-decode pin (the construction
  anchors: the beacon-suffix extraction from the captured app-log
  request path + the suffix face vocabulary — `home` on the landing,
  `no-beacon` on OURS; never a bare literal);
  ② the drift [routes] leg's 404-SHELL family pin (the construction
  anchors: the fresh-context 404-shell capture — the api-like request
  family, the User/me count, the beacon suffix — plus the recorded
  constants rows: REF's five-request double-mount family with the
  path-derived suffix vs OURS's zero-request true-404);
  ③ the AGENTS.md + PAD doc pins (the suffix-rule sentences + the
  surface-family split + the double session-check record — the
  phrases UNWRAPPED, the round-40 line-wrap lesson);
  ④ the e2e leg pin (the ARTIFACT's 404-surface zero-request family —
  the designed 404's runtime twin).
  **Born RED 4/4 expected.**
- **R-3 the drift leg extensions** (extend the richest legs, no new
  leg — the round-40/41/42 doctrine):
  - `networkFace` gains `beaconSuffix` — the app-log beacon's suffix
    extracted from the captured request family (the
    `log-user-in-app/<suffix>` decode; the landing's `home` constant
    both censused and recorded);
  - `routesFace` gains the 404-shell network capture — a fresh
    context loading `/nonexistent-xyz` per app, the api-like family +
    the User/me count + the suffix decoded (REF: the five-request
    double-mount family, suffix `nonexistent-xyz`, User/me ×2; OURS:
    the zero-request true-404 face).
- **R-4 the mutation proof** — M1 the suffix decode removed → ① RED ·
  M2 the 404-shell capture removed → ② RED · M3 the recorded
  constants rows removed → ② RED · M4 the AGENTS.md/PAD sentences
  surgically reverted → ③ RED. All restored cmp-identical (the /tmp
  backup harness).
- **R-5 the doc cures** — AGENTS.md's network-posture paragraph gains
  the suffix-rule sentences (the path-derived rule + the surface split
  + the 404-shell double mount + the never-plant-a-beacon rule's
  every-surface scope); the PAD §2 network-family record EXTENDED
  with the round-44 decode + the §10 F-44a CLOSED row; CLAUDE.md +
  SKILL.md extend the network-faces family description; the count
  ladder re-locked at **669/58** (13 seam/199 · 45 source
  contracts/470) · e2e **143/8** — the census battery flags exactly
  the stale sites at the first run.
- **R-6 the captures refresh** against the dev server (the
  operator's standing instruction) — the timing-family expectation
  documented (16/18 byte-identical at round-43; the dashboard +
  landing-768 captures are the known animated pair).
- **R-7 the full gate + the closing drift + the session log** — lint
  0/0 · tsc 0 · 669/669 (58 files) · build 22 routes · smoke 14/14 ·
  e2e 143/143; the closing drift NO DRIFT all twenty-four legs (the
  extended [network]/[routes] legs' new constants verified live);
  `docs/session_82.md`; the worklog round-44 entry.
- **R-8 the ship** — one atomic commit on main via the SSH wrapper
  (dry-run → push → remote verification → key shredding; no new
  branches).

**Validation against the tree (pre-execution):** all anchors verified
live this round — the census probed on fresh contexts on the reference
(twice, byte-stable: the suffix rule + the family split + the double
User/me), the [network] leg's request-family constants re-read (the
`log-user-in-app/home` landing literal this round decodes as its own
face), the [routes] leg's routesFace loop re-read (the fresh-context
extension point after the loop), the network-faces battery's
round-40/41/42 blocks re-read (the construction-anchor doctrine), the
count-ladder census's counting rule re-read (the +4/+1 arithmetic
rides the existing family rows, no new family).
