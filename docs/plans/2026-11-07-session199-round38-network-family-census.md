# The Round-38 Remediation Plan — the NETWORK-FAMILY CENSUS + THE X-POWERED-BY CURE (session-199)

**The round's fresh angle:** the network axis no probe ever read. The
live battery (parity reads computed styles; the drift battery reads
DOM/text/img/storage faces; NO probe ever enumerated the REQUEST
FAMILY each app fires on load, or the RESPONSE-HEADER face of the
documents) — censused live this round on both apps, and the census's
own audit of OUR response-header wiring found a real defect.

**The catches:**

- **F-38a (MEDIUM, security-posture/divergence — the round's own audit
  catch, live-diagnosed against the standalone artifact while
  censusing the network axis)**: the production artifact DISCLOSES ITS
  SERVER FRAMEWORK on every server-rendered HTML face —
  `X-Powered-By: Next.js` rides `/`, `/login`, `/signup`,
  `/reset-password`, `/dashboard`, and the 404 (curl-verified on the
  standalone artifact, :3910 boot, 2026-11-07), while the reference
  ships NO tech-disclosure header on any face (its landing, login,
  404, manifest all clean; its platform edge's own family — `server:
  cloudflare`, `via: Caddy`, `x-render-origin-server: uvicorn` — is
  the PLATFORM's infra stack, never the app's face, never mirrored).
  The root cause is the scaffold-era default: Next's
  `config-shared.js` ships `poweredByHeader: true` and the config
  never overrode it — 37 rounds shipped the disclosure because no
  probe ever read the network axis (the exact round-37 storage
  pattern: the axis nobody reads is the axis that rots). The class:
  the OWASP fingerprinting axis (WSTG-INFO-13-class tech disclosure);
  the reference's own zero-disclosure posture is the face to match.
  Route handlers (`/api/health`, `/robots.txt`, `/sitemap.xml`,
  `/manifest.json`) and static assets never carried the header — the
  disclosure rides exactly the HTML render pipeline. NOTHING in the
  tree pins its presence (rg "powered" over tests/ + scripts/ + src/:
  zero hits) — the cure is safe. The cure: `poweredByHeader: false`
  in `next.config.ts` (the one-flag Next.js cure; the session-20
  `headers()` three-security-set is untouched — it rides a different
  config key).
  - The adjacent face, RECORDED not cured: OUR artifact's Next-internal
    cache diagnostics (`x-nextjs-cache`, `x-nextjs-prerender`,
    `x-nextjs-stale-time`) — the same class as the reference's
    `cf-cache-status`/`rndr-id` platform diagnostics: per-side
    implementation plumbing, recorded as per-side constants, never
    mirrored, no supported config to remove them.
- **F-38b (the census — the network axis finally read, live on both
  apps this round)**: the reference's platform fires a FOUR-REQUEST
  API FAMILY on every landing load (guest, fresh context,
  2026-11-07), vs OUR app's ZERO api-like requests (the document
  alone). The recorded per-side constants:
  - REF `/` guest (fresh context): 1 document + 4 platform beacons —
    `GET /api/apps/<24-hex-app-id>/entities/User/me` → **401** (the
    logged-out session check), `POST
    /api/app-logs/<app-id>/log-user-in-app/home` → 200 (**NO body**
    — the app-log beacon), `GET
    /api/apps/public/prod/public-settings/by-id/<app-id>` → 200 (the
    platform config fetch), `POST
    /api/apps/<app-id>/analytics/track/batch` → 200 (~189B,
    `{"events":[1]}`; the event's SHAPE — keys only, never values:
    `event_name` (str), `properties` (`{referrer}`), `timestamp`
    (str), `page_url` (a path str), `user_id` (null — guest),
    `session_id` (str, the 18–24 lowercase-alnum window the storage
    round recorded)).
  - OURS `/` (dev AND the standalone artifact): 1 document, ZERO
    api-like requests — every `fetch()` in `src/` is user-initiated
    (11 sites: the contact-form POST `/api/inquiry`, the auth forms
    ×5, the dashboard ops ×3, the logout, the reset screen); zero
    `navigator.sendBeacon`, zero `XMLHttpRequest`, zero absolute-URL
    fetch anywhere in `src/` (the beacon-impossibility census — the
    load-time platform chatter class cannot exist in our tree).
  - The document RESPONSE-HEADER face (both apps): the session-20
    three-header security set IDENTICAL and present
    (`referrer-policy: strict-origin-when-cross-origin`,
    `x-content-type-options: nosniff`, `strict-transport-security:
    max-age=31536000`); `x-powered-by` ABSENT both sides (post-cure
    for ours — born RED pre-cure); the per-side infra families never
    mirrored (REF: cloudflare/caddy/uvicorn; OURS: the x-nextjs
    cache diagnostics + `cache-control`).
  - The house doctrine application: the network family is base44
    platform implementation — never mirrored (the network is not a
    rendered face; OUR zero-beacon posture is the strictly cleaner
    face: no load-time chatter, no per-load analytics beacons, no
    session-check round-trip — the session rides the httpOnly cookie
    server-side). The x-powered-by disclosure is OUR OWN face (not a
    platform-mirror question) — the cure ships.

**The standing re-validation at open** (all green, the round-37 ship
state reproduced exactly): lint 0/0 · tsc 0 · 633/633 (56 files) ·
build 22 routes · smoke 14/14 · e2e 128/128 · census MATCH · parity
IDENTICAL both viewports · drift NO DRIFT ×22 (exit 0, the full
runtime) · the mobile-menu census byte-equivalent — the operator's
standing emphasis works exactly as expected, NO Tailwind v4 bug. The
operator's standing login instruction executed (the reference's
authed-world re-census — the PAD §2 record holds: the demo login →
`/`, the derived-title 404 shells, zero cookies, the seven-key
localStorage family). The advisory re-triage: the posture UNCHANGED
(10 advisories, all dev/build/test toolchain-transitive; the runtime
zod 4.6.7 above the patched floor — the PAD §10 ledger row stands,
no security driver). The other two recorded next-round candidates
remain recorded, unprobed this round (the triple-stack combination
pin; the orientation-a11y extension) — the network family selected
as the round's angle (the genuinely new axis; the census found the
round's catch, the house precedent).

**The remediation, TDD (the pin battery born RED before the cure):**

- **R-2 the born-RED pin battery** — `tests/network-faces.test.ts`
  (+7, the 44th source-contract family): ① the zero-beacon census
  (comment-stripped: zero `navigator.sendBeacon` / `XMLHttpRequest`
  across every `src/` file); ② the same-origin fetch census (every
  `fetch(` call site in `src/` rides a same-origin path literal —
  zero absolute-URL fetches, the third-party-call impossibility); ③
  the public landing's single-fetch census (`landing-page.tsx`
  carries exactly ONE `fetch(` — the contact-form POST
  `/api/inquiry` — the landing fires no other network call); ④ the
  AGENTS.md doc pin (the network-posture paragraph's exact phrases);
  ⑤ the drift `[network]` leg + its NO DRIFT line exist; ⑥ the e2e
  round-38 leg exists (the zero-disclosure face on the artifact); ⑦
  the historical-pin check (`tests/http-headers.test.ts` gains the
  `poweredByHeader: false` pin — the header family's own battery owns
  the config pin). Plus `tests/http-headers.test.ts` +1: the
  `poweredByHeader: false` pin in `next.config.ts`. **Born RED 4/8
  observed** (the three doc/leg pins ④⑤⑥ + the http-headers config
  pin RED at birth; the four standing-fact/cross-check pins ①②③⑦
  green at birth — current-tree facts; ⑦'s target landed in the same
  R-2 batch, so its green-at-birth is the lockstep cross-check's own
  shape).
- **R-3 the cure** — `poweredByHeader: false` in `next.config.ts`
  (the F-38a comment block documenting the catch + the reference's
  zero-disclosure face). No rendering-surface change; the session-20
  `headers()` set untouched.
- **R-4 the mutation proof** — M1 the `poweredByHeader` flag reverted
  to true → the http-headers pin RED; M2 a `navigator.sendBeacon`
  planted in a `src/` file → the zero-beacon census RED; M3 an
  absolute-URL fetch planted → the same-origin census RED; M4 the
  AGENTS.md note reverted → the doc pin RED. All restored
  cmp-identical (the /tmp backup harness).
- **R-5 the drift `[network]` leg (the 23rd)** — `networkFace`: one
  fresh context per app; the request family censused via
  `page.on("request")` (document + api-like pathnames, the 24-hex
  ids masked, the POST shapes decoded as SHAPES never values) + the
  document response-header face (the three security headers present;
  `x-powered-by` absent). Per-side recorded constants: REF's
  four-beacon family (the 401 session check + the bodyless app-log +
  the public-settings fetch + the analytics batch) vs OURS's
  document-only family; the analytics event's key set + `user_id:
  null` guest shape. The shared faces diff directly (the security
  set; the disclosure absence). **The full 23-leg battery re-proven
  live, exit 0.**
- **R-6 the e2e legs (+2 → 130)** — `tests/e2e/landing.spec.ts`, the
  round-38 describe: the document face (no `X-Powered-By`, the
  three-header security set present) + the 404 face (the unknown
  route's response: status 404, the same zero-disclosure + security
  set) — both against the standalone artifact. Born RED pre-cure
  (the artifact carried the header).
- **R-7 the doc cures + the count-ladder re-lock** — **641/57** (13
  seam/198 + 44 source contracts/443) · e2e 130/8; AGENTS.md gains
  the network-posture paragraph (the zero-beacon posture + the
  x-powered-by cure + the per-side infra families + the
  never-plant-a-load-time-beacon rule); CLAUDE.md + SKILL.md name the
  network-faces family; the PAD gains the §2 network-family record +
  the §10 F-38a CLOSED row + the §7.1/§7.3 gate lines re-locked; the
  drift script's header budget note 22→23 legs; the worklog
  round-38 entry + the Stage-Summary verification line re-locked.
- **R-8 the captures refresh** against the dev server (the operator's
  standing instruction) — landed 14/18 byte-identical (no
  parity-surface change — photographed proof; the 4 changed are the
  known timing family — the dashboard + the three landing fullpages,
  reveal-state timing — PIL-verified non-blank).
- **R-9 the full gate + the session log** — lint 0/0 · tsc 0 ·
  641/641 (57 files) · build 22 routes · smoke 14/14 · e2e 130/130;
  `docs/session_70.md`; the ship (one atomic commit on main via the
  SSH wrapper — dry-run → push → remote verification → key
  shredding; no new branches).

**Validation against the tree (pre-execution):** all anchors verified
live this round — the artifact boot (:3910) showing `X-Powered-By:
Next.js` on `/`, `/login`, `/signup`, `/reset-password`,
`/dashboard`, the 404, and its absence on the route handlers + the
CSS asset; the reference's faces (landing/login/404/manifest) all
zero-disclosure; Next's `config-shared.js:113` default
`poweredByHeader: true`; zero existing `powered` pins in
tests/scripts/src; the 11 user-initiated fetch sites enumerated; the
reference's four-beacon family decoded with statuses + shapes. The
round-37 storage leg (the template) re-read for the leg pattern; the
count-ladder census battery re-read for the re-lock requirements.
