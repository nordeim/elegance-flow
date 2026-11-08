# Session 78 — Round-42: The Frontend-Config Platform-Config Census + The Login-Surface Zero-Response Pin (session-199)

**The opening state.** The round opens at the owner's `5a36d80` (the
round-41 ship `2032e72` + the owner's session-77 process-log push; the
owner pushed nothing new). The workspace pulled clean — the
environment intact from the round-41 rebuild (bun install 522 no
changes, census MATCH (3 inquiries + 4 users)).

**The standing re-validation at open — all green:**
- The full gate: lint 0/0 · tsc 0 · **657/657 (58 files)** · build 22
  routes · smoke 14/14 · e2e 136/136 — the round-41 ship state
  reproduced exactly.
- The live probes: parity IDENTICAL both viewports (1280 + 390) ·
  **the mobile-menu census byte-equivalent — the operator's standing
  emphasis: the menu works exactly as expected, NO Tailwind v4 bug** ·
  drift NO DRIFT all twenty-four legs (the round-41 `[reset]`
  open-run transient did not recur).
- The operator's standing login instruction executed (the reference's
  authed-world re-census — the PAD §2 record holds: the demo login →
  `/`, every candidate authed route serves the derived-title 404
  shell, zero cookies, the post-login seven-key localStorage family).
- The advisory re-triage: the posture UNCHANGED (10 advisories — 4
  high, 5 moderate, 1 low — all dev/build/test toolchain-transitive;
  the runtime zod 4.6.7 above the `<4.6.6` patched floor).
- The neo-crm stack patterns re-verified (the identical core pins).

**The round's angle — the round-41 recorded candidate executed:** the
login-surface response family's last unread member. Round-41 decoded
the landing family's four responses + the login-surface family's
domain/login-info/User-me members; the platform's
`frontend-config.js` script response was SEEN but never decoded.

**THE CENSUS (F-42b — the config record decoded, live 2026-11-08,
fresh-context probes on the reference, twice; byte-stable across
both runs):**
- `GET /api/frontend-config.js?v=3` → 200, `application/javascript`
  (the JS-assignment shape `window.__APP_CONFIG__ = {...}`, never
  JSON).
- The KEY SET (**35 keys**, sorted): APP_FLAVOR through
  WS_BACKEND_URL — the BACKEND/PLATFORM/SDK/SUPERAGENT/TENZAI URL
  family, the TURNSTILE site key + its three feature flags
  (TURNSTILE_ENABLED / LOGIN_ENABLED / PASSWORD_RESET_ENABLED),
  GOOGLE_CLIENT_ID, the DATADOG family (application id, client
  token, service, site, enable-dev), MIXPANEL_ENABLED, FROG_ENABLED,
  MP_CDN_DOMAIN, the FIVERR family (env + the two SDK CDNs), the
  BACKOFFICE family (URL + the three flags), NATIVE_CONSENT_ENABLED,
  FERPA_STAFF_ACCESS_NOTIFICATIONS_ENABLED,
  CODER_REMOTE_DEV_PLATFORM_BASE_DOMAIN, WS_BACKEND_URL, GIT_SHA.
- The marker constants: APP_FLAVOR "platform", FIVERR_ENV "prod".
- The MOVING values (face-decoded, never pinned): **GIT_SHA** — the
  platform's per-build 40-hex sha; **PRE_AUTH_EXPERIMENTS** — the
  per-VISITOR uuid + the `auth-signup-free-tagline` assignment
  record (the visitor id differs on every fresh context).
- The flag constants: PRE_AUTH_FLAGS `app-origin-no-gsi-frog` true.
- The surface scope: the LANDING never fetches it (the /login
  family's own member — the platform auth chrome's config).

**THE CATCHES:**
- **F-42a (MEDIUM, coverage-gap/census-shape)**: the platform-config
  record was unpinned — a platform change (a key added or retired, a
  flag flipped, the experiments record reshaped) would drift with no
  census to catch it.
- **F-42c (the login-surface runtime twin gap)**: the round-40/41
  e2e legs pin the LANDING's request/response families; the AUTH
  surface's response family rode no runtime leg.

**The ship (TDD — the pin battery born RED 4/4 observed):**
- The drift `[login]` leg EXTENDED (the leg that loads /login at
  1280 — its own scope, no new leg): `loginFace` gains
  `platformConfig` — a `page.waitForResponse` capture armed BEFORE
  the probeLoad goto (an 8s bounded window — OURS's
  zero-script-config face resolves by timeout, never inflating the
  runtime budget), decoded post-settle as face entries:
  `content-type:application/javascript`,
  `keyset:<the 35 sorted keys joined>`, `APP_FLAVOR:platform`,
  `FIVERR_ENV:prod`, `GIT_SHA:hex40`,
  `PRE_AUTH_EXPERIMENTS:visitor-uuid+assignments`.
- The round-42 blocks of `tests/network-faces.test.ts` (+4 → 20 in
  the family): the PLATFORM-CONFIG decode pin (construction anchors,
  with the born-red anchor lesson — the `"keyset:"` literal pin
  couldn't distinguish the template-literal decode from the
  constants row; re-anchored on the sorted-join construction) + the
  recorded-constants pin + the AGENTS.md/PAD doc pin (the round-40
  line-wrap lesson re-learned: the pinned phrases sit unwrapped) +
  the e2e leg pin.
- The e2e round-42 describe (+1 → 137, landing.spec.ts): the
  ARTIFACT's LOGIN-surface zero-api-like-RESPONSE family — the
  auth-surface runtime twin, closing F-42c (the `.match()`
  discipline per the round-40 census-counting lesson).
- The mutation proof 4/4 classes bite (M1 the capture + decode +
  return-field removed · M2 the recorded constants rows removed · M3
  the doc sentences surgically reverted · M4 the e2e describe
  removed — all restored cmp-identical).
- The doc cures: the PAD §2 response-body record EXTENDED with the
  frontend-config decode + the §10 F-42a CLOSED row; AGENTS.md's
  network-posture paragraph gains the frontend-config sentences;
  CLAUDE.md + SKILL.md extend the network-faces family description;
  the count ladder re-locked at **661/58** (13 seam/199 · 45 source
  contracts/462) · e2e **137/8** — the census battery flagged
  exactly the stale sites at the first run.
- The captures refreshed against the dev server (the operator's
  standing instruction): **12/14 byte-identical** (no parity-surface
  change — photographed proof); the 2 changed are the known timing
  family (the dashboard + the portfolio deep-link's animated
  capture), PIL-verified non-blank.

**The proof:** lint 0/0 · tsc 0 · **661/661 unit (58 files)** · build
22 routes · smoke 14/14 · **e2e 137/137** · census MATCH · parity
IDENTICAL both viewports · **drift NO DRIFT — all twenty-four legs**
(the extended [login] leg's platformConfig constants verified live:
the keyset + the markers + the masked faces MATCH) · the
mobile-menu census byte-equivalent.

**The leg's own born-red live catch (the drift census doing its
job):** the first closing-drift run flagged the `[login]` REF
platformConfig face — the hand-typed recorded keyset carried a
LOCALE-sorted key order (the scratch probe's `localeCompare` print)
while the leg's decode rides JS's CODE-UNIT `.sort()`
(`PRE_AUTH_FLAGS` sorts before `PRE_AUTH_FLAG_OVERRIDES` — `S`
(0x53) < `_` (0x5F) — and `APPS_BASE_DOMAIN` before `APP_FLAVOR`).
The recorded constant re-recorded to the wire's order (35 keys,
code-unit sorted) + the pin's anchor re-anchored; the battery 20/20
green, the closing drift re-run clean — the exact
moved-constant-REDs-the-pin-and-forces-a-conscious-re-record
mechanism the census exists to provide.

Next-round candidates (recorded): the orientation-a11y extension
(the auth family at landscape — re-probed zero-violations rounds 37,
39, 40 and 41; the pin remains unshipped), the reduce+forced
mid-flight window census (OUR 0.01ms collapse means no mid-flight
window exists under reduce — the composition's temporal axis,
unrecorded), or the app-log beacon's `log-user-in-app/home` path
suffix census (the per-surface `home` segment — the beacon family's
one path member whose suffix semantics ride no record).
