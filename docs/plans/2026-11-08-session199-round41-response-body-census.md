# The Round-41 Remediation Plan — THE RESPONSE-BODY CENSUS + THE RUNTIME ZERO-RESPONSE PIN (session-199)

**The round's fresh angle:** the round-40 recorded candidate — the
network axis's response side. Round-38 pinned the request family's
SHAPES (the four-request landing family), round-40 the beacon's
request-payload VALUES; the RESPONSES those requests carry (the
status semantics + the body constants) ride no record. Three unread
faces ride the same axis:

1. **The response-body semantics** — the public-settings fetch answers
   `{"id":"<hex24>","public_settings":"public_without_login"}` (the
   app's access-policy CONSTANT), the app-log beacon answers
   `{"success":true}`, the analytics batch answers `{"accepted":1}`
   (mirroring the request's `events:array(1)`), and the guest
   User/me session check answers **401** with the platform's
   auth-required error envelope (`message`/`detail`/`traceback`/
   `extra_data`/`request_id`) — a DESIGNED failing check on every
   guest load (the guest landing family is 3×200 + 1×401).
2. **The login-surface response family** — the /login surface's own
   fetches, decoded live this round (twice, fresh-context): the
   domain→app-id resolution (`GET /api/apps/public/prod/domain/
   <host>` → 200, the BARE QUOTED hex24 app id) and the login-info
   record (`GET /api/apps/public/login-info/by-id/<hex24>` → 200:
   id, name "EleganceFlow", slug, logo_url, user_description
   byte-identical to SITE_DESCRIPTION, created/updated dates, and
   the `auth_config` object — `enable_username_password: true`,
   `enable_google_login: true`, `mfa_policy: "off"` — the record
   that DRIVES the reference's login card: its Google button rides
   the platform's own auth_config). The authed family adds the
   User/me SUCCESS record (role, id, email, `is_verified: true`,
   app_id, `_app_role`) and the platform frontend-config script
   (`/api/frontend-config.js?v=3` — `window.__APP_CONFIG__`, the
   platform's BACKEND_URL/TURNSTILE/GOOGLE_CLIENT_ID plumbing,
   application/javascript, NOT json).
3. **The response-side runtime twin** — the round-40 e2e legs pin the
   artifact's zero-REQUEST family; the RESPONSE side
   (`page.on("response")`) rides no runtime pin. The response event
   is a distinct instrumentation: whatever arrives, arrives on the
   wire (the same class-closing logic as F-40c).

**The catches:**

- **F-41a (MEDIUM, coverage-gap/census-shape — the round's own audit
  catch, live-diagnosed while decoding the response bodies)**: the
  response semantics are unpinned — a platform change (the
  public-settings policy constant flipping, the accepted-count
  changing, the 401 policy softening to 200, the error envelope
  reshaping) would drift with no census to catch it. The drift
  `[network]` leg decodes the request family + the beacon's payload
  values; the RESPONSES ride no leg, and the PAD §2 network record
  carries the request shapes only.
- **F-41b (the census — the response family decoded, live 2026-11-08,
  fresh-context probes on the reference, twice — the guest landing
  face + the login/authed face; constants stable byte-identical
  across both runs)**:
  - `public-settings` → 200 `{"id":"<hex24>","public_settings":
    "public_without_login"}` — the access-policy constant
    (public_without_login: the app renders its public surface
    without a login wall).
  - `User/me` (guest) → **401** `{"message":"Authentication required
    to view users","detail":"You must be logged in to perform this
    operation.","traceback":null,"extra_data":null,"request_id":
    null}` — the platform's auth-required error envelope (5-key
    shape; the DESIGNED failing session check).
  - `app-log` → 200 `{"success":true}` — the constant receipt.
  - `analytics/track/batch` → 200 `{"accepted":1}` — the constant
    receipt, mirroring the request's `events:array(1)`.
  - The login-surface family (the PAD §2 record, probed live):
    the domain resolution (200, the bare quoted hex24), login-info
    (200, the app identity + auth_config — the record behind the
    reference's login-card provider set), the authed User/me (200,
    the user record with `is_verified: true`), the frontend-config
    script (the platform's JS config, not an api/json face).
- **F-41c (the response-side runtime twin gap)**: the round-40 e2e
  legs pin the artifact's zero-REQUEST family on the wire; the
  RESPONSE side rides no runtime leg — the response event is a
  distinct instrumentation (a service-worker-served or prefetched
  api-like response arrives without a page-initiated request event).
  The runtime leg closes the axis's response side: whatever arrives,
  arrives on the wire.

**The standing re-validation at open** (the round-40 ship state
reproduced): lint 0/0 · tsc 0 · 653/653 (58 files) · build 22 routes ·
smoke 14/14 · e2e 135/135 · census MATCH · parity IDENTICAL both
viewports · the mobile-menu census byte-equivalent — the operator's
standing emphasis: the menu works exactly as expected, NO Tailwind v4
bug. The operator's standing login instruction executed (the
authed-world record holds: the demo login → `/`, the derived-title 404
shells, zero cookies, the seven-key localStorage family). The drift
run at open: 23/24 legs NO DRIFT; the `[reset]` leg reported a FACE
READ FAILURE (a null face — the leg never completed) — re-probed
immediately by an independent two-settle diagnostic: every probed
face IDENTICAL on both apps at 1800ms and 4000ms settles (the
transient hydration-race class, not a divergence; the closing full
drift re-runs the leg). The advisory re-triage: the posture UNCHANGED
(10 advisories — 4 high, 5 moderate, 1 low — all dev/build/test
toolchain-transitive; the runtime zod 4.6.7 above the `<4.6.6`
patched floor). The neo-crm stack patterns re-verified against the
live repo (the identical core pins: next ^16.4.2 · react ^19.3.1 ·
@prisma/client ^6.19.3 · zod ^4.6.7 · tailwindcss ^4.3.3 ·
typescript ^5.9.3 · vitest ^5.0.5 · @playwright/test ^1.64.1 ·
lucide-react ^0.525.0).

**The remediation, TDD (the pin battery born RED before the cures):**

- **R-2 the born-RED pin battery** — `tests/network-faces.test.ts`
  gains the round-41 describe (+4):
  ① the drift leg's RESPONSE-decode pin (the `responseSemantics`
  machinery: the response listener, the promise collection + settle,
  the body decode's ≤2-key verbatim/key-set rule, the hex mask on
  bodies — construction anchors unique to the decode, never face
  strings that live in the constants too);
  ② the recorded-constants pin (the drift script's expectConst REF
  rows carry the four decoded response constants —
  `public_without_login`, `{"success":true}`, `{"accepted":1}`, the
  401 envelope key set — plus OURS's `[]` zero-response row);
  ③ the AGENTS.md + PAD doc pin (the network-posture paragraph's
  response-semantics sentences + the PAD §2 response-body record's
  key phrases);
  ④ the e2e round-41 leg pin (the zero-response family describe in
  landing.spec.ts).
  **Born RED 4/4 expected.**
- **R-3 the drift `[network]` leg extension** — `networkFace` gains
  `responseSemantics`: a `page.on("response")` listener mirroring the
  request router (api-like, load-phase only — the interactive family
  is already request-censused), collecting `resp.text()` promises,
  awaited post-settle, decoded as `[status] METHOD <masked-path> =>
  <body-face>` entries — verbatim-with-hex-mask for ≤2-key bodies ≤96
  chars (the constants), the key set for larger objects (the 401
  envelope's 5-key shape), `<non-json NB>` otherwise. The per-side
  recorded constants gain the REF response family (4 rows) and
  OURS's `[]` (zero requests, zero responses — the strictly cleaner
  face).
- **R-4 the e2e round-41 describe (+1 → 136)** — the ARTIFACT's
  runtime load-time zero-RESPONSE family (the response-side twin of
  the round-40 request leg: zero api-like responses on the landing
  load — `.match()`, never a bare `.test()` call, per the round-40
  census-counting lesson).
- **R-5 the mutation proof** — M1 the response listener removed → ①
  RED · M2 the recorded constants' response rows removed → ② RED ·
  M3 the AGENTS.md/PAD response sentences reverted → ③ RED · M4 the
  e2e describe removed → ④ RED. All restored cmp-identical (the
  /tmp backup harness).
- **R-6 the doc cures + the count-ladder re-lock** — the new counts
  (653 + 4 = 657/58 files · e2e 135 + 1 = 136/8); the PAD §2 gains
  the response-body record (the four landing-family constants + the
  login-surface family + the status semantics) + the §10 F-41a
  CLOSED row; AGENTS.md's network-posture paragraph gains the
  response-semantics sentences (the policy constant + the designed
  401 + the receipt constants + the never-mirror rule);
  CLAUDE.md + SKILL.md extend the network-faces family description;
  the worklog round-41 entry + the Stage-Summary verification line
  re-locked (the census battery flags exactly the stale sites at the
  first run).
- **R-7 the captures refresh** against the dev server (the operator's
  standing instruction) — the timing-family expectation documented.
- **R-8 the full gate + the session log** — lint 0/0 · tsc 0 ·
  657/657 (58 files) · build 22 routes · smoke 14/14 · e2e 136/136 ·
  the closing drift NO DRIFT all twenty-four legs (the [reset] leg's
  open-run transient re-proven); `docs/session_76.md`; the ship (one
  atomic commit on main via the SSH wrapper — dry-run → push →
  remote verification → key shredding; no new branches).

**Validation against the tree (pre-execution):** all anchors verified
live this round — the response family decoded on fresh-context loads
(twice: the guest landing face + the login/authed face, constants
byte-stable across runs); the drift `[network]` leg's current shape
re-read (the request router, the beacon holder, the interactive-phase
flag, the expectConst per-side constants block); the network-faces
battery's round-38/40 describe shapes re-read (the read/strip
helpers, the construction-anchor doctrine); the round-40 e2e
describe re-read (the apiLike regex, the `.match()` counting lesson,
the describe shape); the count-ladder census's counting rule re-read
(comment-stripped `it(`/`test(` blocks — the +4/+1 arithmetic rides
the existing family rows, no new family).
