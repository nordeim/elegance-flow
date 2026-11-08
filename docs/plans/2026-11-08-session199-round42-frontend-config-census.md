# The Round-42 Remediation Plan — THE FRONTEND-CONFIG PLATFORM-CONFIG CENSUS + THE LOGIN-SURFACE ZERO-RESPONSE PIN (session-199)

**The round's fresh angle:** the round-41 recorded candidate — the
login-surface response family's last unread member. Round-41 decoded
the landing family's four responses + the login-surface family's
domain/login-info/User-me members; the platform's
`frontend-config.js` script response was SEEN (the round-41 probe
captured its head) but never decoded. Three unread faces ride it:

1. **The config record's structure** — the `window.__APP_CONFIG__`
   assignment's KEY SET (probed live this round, twice, fresh
   contexts: **35 keys**, byte-stable across both runs — the sorted
   set from APP_FLAVOR through WS_BACKEND_URL: the BACKEND/
   PLATFORM/SDK/SUPERAGENT/TENZAI URL family, the TURNSTILE key +
   its three feature flags, GOOGLE_CLIENT_ID, the DATADOG family,
   MIXPANEL/FROG/MP_CDN_DOMAIN, the FIVERR family, the BACKOFFICE
   family, GIT_SHA, APP_FLAVOR "platform", FIVERR_ENV "prod").
2. **The value faces** — which values are constants (APP_FLAVOR
   "platform", FIVERR_ENV "prod" — stable across runs), which are
   MOVING (GIT_SHA — the platform's per-build sha, face-decoded as
   the hex40 shape, never pinned per-value; PRE_AUTH_EXPERIMENTS —
   the per-VISITOR uuid + the experiment assignment record, the
   visitor id face-decoded, never pinned per-value), and the flag
   constants (PRE_AUTH_FLAGS `app-origin-no-gsi-frog`).
3. **The surface-scope face** — the script fires on the LOGIN
   surface ONLY (the platform auth chrome's config); the LANDING
   load never fetches it (probed live: no frontend-config.js capture
   on `/`). OUR login surface ships the ZERO-SCRIPT-CONFIG posture
   (no api-like/script-config responses at all — the strictly
   cleaner face), and no runtime e2e leg pins the LOGIN surface's
   response family (the round-40/41 legs pin the LANDING only).

**The catches:**

- **F-42a (MEDIUM, coverage-gap/census-shape — the round's own audit
  catch, live-diagnosed while decoding the config record)**: the
  platform-config record is unpinned — the login-surface family's
  last unread member. A platform change (a config key added or
  retired, a flag flipped, the experiments record reshaped) would
  drift with no census to catch it; the PAD §2 record carries the
  script's EXISTENCE and content-type (round-41) but never its
  decoded structure.
- **F-42b (the census — the config record decoded, live 2026-11-08,
  fresh-context probes on the reference, twice; byte-stable across
  both runs)**:
  - The response: `GET /api/frontend-config.js?v=3` → 200,
    `application/javascript` (NOT json — the JS-assignment shape
    `window.__APP_CONFIG__ = {...}`).
  - The KEY SET (35, sorted): APP_FLAVOR, APPS_BASE_DOMAIN,
    BACKEND_URL, BACKOFFICE_OKTA_LOGIN_ENABLED,
    BACKOFFICE_OKTA_ONLY, BACKOFFICE_RESOURCE_SEARCH_AVAILABLE,
    BACKOFFICE_URL, CODER_REMOTE_DEV_PLATFORM_BASE_DOMAIN,
    DATADOG_APPLICATION_ID, DATADOG_CLIENT_TOKEN,
    DATADOG_ENABLE_DEV, DATADOG_SERVICE, DATADOG_SITE,
    FERPA_STAFF_ACCESS_NOTIFICATIONS_ENABLED, FIVERR_ENV,
    FIVERR_SDK_CDN_PROD, FIVERR_SDK_CDN_TEST, FROG_ENABLED, GIT_SHA,
    GOOGLE_CLIENT_ID, MIXPANEL_ENABLED, MP_CDN_DOMAIN,
    NATIVE_CONSENT_ENABLED, PLATFORM_URL, PRE_AUTH_EXPERIMENTS,
    PRE_AUTH_FLAG_OVERRIDES, PRE_AUTH_FLAGS, SDK_BACKEND_URL,
    SUPERAGENT_PLATFORM_URL, TENZAI_APP_URL, TURNSTILE_ENABLED,
    TURNSTILE_LOGIN_ENABLED, TURNSTILE_PASSWORD_RESET_ENABLED,
    TURNSTILE_SITE_KEY, WS_BACKEND_URL.
  - The marker constants: APP_FLAVOR "platform", FIVERR_ENV "prod"
    (stable both runs).
  - The MOVING values (face-decoded, never pinned): GIT_SHA (the
    platform's per-build 40-hex sha), PRE_AUTH_EXPERIMENTS (the
    per-VISITOR uuid + the `auth-signup-free-tagline` assignment
    record — the visitor id differs every fresh context).
  - The flag constants: PRE_AUTH_FLAGS `app-origin-no-gsi-frog`
    true (stable both runs).
  - The surface scope: the LANDING never fetches it (the /login
    family's own member).
- **F-42c (the login-surface runtime twin gap)**: the round-40/41
  e2e legs pin the ARTIFACT's LANDING zero-request/zero-response
  families; the LOGIN surface's response family rides no runtime
  leg — a dependency-planted script-config responder on the auth
  surface would arrive on the wire while every landing-scoped pin
  stays green.

**The standing re-validation at open** (the round-41 ship state
reproduced exactly): lint 0/0 · tsc 0 · 657/657 (58 files) · build 22
routes · smoke 14/14 · e2e 136/136 · census MATCH (3 + 4 users) ·
parity IDENTICAL both viewports · the mobile-menu census
byte-equivalent — the operator's standing emphasis: the menu works
exactly as expected, NO Tailwind v4 bug. The operator's standing
login instruction executed (the authed-world record holds: the demo
login → `/`, the derived-title 404 shells, zero cookies, the
seven-key localStorage family). The advisory re-triage: the posture
UNCHANGED (10 advisories — 4 high, 5 moderate, 1 low — all
dev/build/test toolchain-transitive; the runtime zod 4.6.7 above the
`<4.6.6` patched floor). The neo-crm stack patterns re-verified
(the identical core pins).

**The remediation, TDD (the pin battery born RED before the cures):**

- **R-2 the born-RED pin battery** — `tests/network-faces.test.ts`
  gains the round-42 describe (+4):
  ① the drift `[login]` leg's PLATFORM-CONFIG decode pin (the
  construction anchors: the response listener armed inside
  `loginFace` BEFORE the probeLoad goto, the keyset decode, the
  GIT_SHA hex40 mask, the per-visitor face vocabulary);
  ② the recorded-constants pin (the drift script's expectConst REF
  row carries the decoded platformConfig constants — the keyset
  entry, the marker constants, the sha face, the visitor face);
  ③ the AGENTS.md + PAD doc pin (the network-posture paragraph's
  frontend-config sentences + the PAD §2 record's key-count and
  per-visitor-face phrases);
  ④ the e2e round-42 leg pin (the login-surface zero-response
  describe in landing.spec.ts).
  **Born RED 4/4 expected.**
- **R-3 the drift `[login]` leg extension** — `loginFace` gains
  `platformConfig: string[]`: a `page.on("response")` listener armed
  BEFORE the probeLoad goto (the script fires during the load),
  capturing the `frontend-config.js` response's body via a
  `resp.text()` promise, decoded post-settle as face entries —
  `content-type:application/javascript`, `keyset:<the 35 sorted
  keys joined>`, `APP_FLAVOR:platform`, `FIVERR_ENV:prod`,
  `GIT_SHA:hex40` (the moving sha masked), and
  `PRE_AUTH_EXPERIMENTS:visitor-uuid+assignments` (the per-visitor
  face — never the uuid value). The per-side recorded constants:
  REF the six decoded entries; OURS `[]` (the zero-script-config
  posture — the login surface fires no platform-config family).
- **R-4 the e2e round-42 describe (+1 → 137)** — the ARTIFACT's
  LOGIN-surface runtime zero-api-like-RESPONSE family (the
  response-event twin extended to the auth surface: zero api-like
  responses on the /login load — `.match()`, never a bare
  `.test()` call, per the round-40 census-counting lesson).
- **R-5 the mutation proof** — M1 the listener/decode removed → ①
  RED · M2 the recorded constants' platformConfig rows removed → ②
  RED · M3 the AGENTS.md/PAD sentences surgically reverted → ③ RED
  · M4 the e2e describe removed → ④ RED. All restored cmp-identical
  (the /tmp backup harness).
- **R-6 the doc cures + the count-ladder re-lock** — the new counts
  (657 + 4 = 661/58 files · e2e 136 + 1 = 137/8); the PAD §2
  response-body record EXTENDED with the frontend-config decode
  (the 35-key set + the marker/moving/flag faces + the
  surface-scope rule) + the §10 F-42a CLOSED row; AGENTS.md's
  network-posture paragraph gains the frontend-config sentences;
  CLAUDE.md + SKILL.md extend the network-faces family description;
  the worklog round-42 entry + the Stage-Summary verification line
  re-locked (the census battery flags exactly the stale sites at
  the first run).
- **R-7 the captures refresh** against the dev server (the
  operator's standing instruction) — the timing-family expectation
  documented.
- **R-8 the full gate + the session log** — lint 0/0 · tsc 0 ·
  661/661 (58 files) · build 22 routes · smoke 14/14 · e2e 137/137;
  the closing drift NO DRIFT all twenty-four legs (the extended
  [login] leg's platformConfig constants verified live);
  `docs/session_78.md`; the ship (one atomic commit on main via the
  SSH wrapper — dry-run → push → remote verification → key
  shredding; no new branches).

**Validation against the tree (pre-execution):** all anchors
verified live this round — the config record decoded on fresh-context
loads (twice, the key set + marker/flag constants byte-stable, the
visitor id + GIT_SHA confirmed moving); the LANDING surface confirmed
script-free (the surface-scope face); the drift `[login]` leg's
current shape re-read (the probeLoad goto + the 1200ms settle + the
LoginFace type + the expectConst per-side constants block); the
network-faces battery's round-41 describe shapes re-read (the
construction-anchor doctrine); the round-41 e2e describe re-read (the
apiLike regex + the `.match()` counting lesson); the count-ladder
census's counting rule re-read (the +4/+1 arithmetic rides the
existing family rows, no new family).
