# The Round-18 Remediation Plan — the HEAD/METADATA census (session-199)

**The round's fresh angle:** every probe in rounds 1–17 read the BODY
faces — computed styles, text bytes, geometry, glyphs, attributes,
validation modes, post-login worlds. The `<head>` document surface —
the metadata family the SEO posture rides on — was never read against
the live reference (the smoke ladder only curled OUR sitemap/robots/
manifest; nobody ever diffed the reference's own head faces).

**The census (round-18 probes 5–8, both apps, / and /login and
/signup):**

- **F-18a (MODERATE, document surface, login — THE CATCH)**: the
  reference's `/login` carries a schema.org `BreadcrumbList` JSON-LD
  block in its head —
  `{"@context": "https://schema.org", "@type": "BreadcrumbList",
  "itemListElement": [{"@type": "ListItem", "position": 1, "name":
  "Home", "item": "<origin>/"}, {"@type": "ListItem", "position": 2,
  "name": "login", "item": "<origin>/login"}]}` — and ours carries
  ZERO JSON-LD anywhere. The same family rides the reference's
  `/signup` URL (which the live platform now serves as a **200-status
  soft-404**: h1 "404" · h2 "Page Not Found" · 'The page "signup"
  could not be found in this application.' · a "Go Home" button —
  the base44 DeadEndPage; the session-10 record "the reference 404s
  /signup" is now a transport-stale detail: the STATUS is 200, the
  body is the platform's styled dead end). Our `/signup` is the
  working superset — the breadcrumb is semantically true on it (one
  hop from home), so the member mirrors there too.
- **F-18b (LOW, document surface, login-only)**: the reference's
  `/login` viewport carries `viewport-fit=cover`
  (`width=device-width, initial-scale=1.0, viewport-fit=cover`) —
  the notched-device edge-to-edge declaration; ours reads plain
  (`initial-scale=1`). The reference's `/` and `/signup` viewports do
  NOT carry it — **login-only**; our cure mirrors exactly that shape.
- **The positive censuses**: `sitemap.xml` shape IDENTICAL (urlset ·
  weekly · 1.0 priority · the origin the only delta) · `robots.txt`
  IDENTICAL (`User-agent: * / Allow: / / Sitemap: <origin>/sitemap.xml`)
  · `manifest.json` name/short_name "EleganceFlow" IDENTICAL · the
  canonical family IDENTICAL (both apps, all three pages) · the
  title family IDENTICAL on / and /login · the post-login world
  census (round-18 probe 1): the reference's authenticated surface
  IS the landing (`/` — no dashboard, no header state change, no
  session word anywhere; our `/dashboard` superset stands, now
  LIVE-proven where the PAD inferred) · the pre-hydration census:
  no credential-in-URL leak on either app (ours: the inputs wipe at
  hydration + `required` blocks the empty submit; the reference:
  fast prod bundle) — the dev-server login flake was a probe-side
  hydration race, not an app defect.
- **The records (no cure)**: the theirs-only platform metas
  (`base44-analytics=on`, `bundle-commit=<sha>`, the login-only
  `og:image:alt="Base44 link preview"`) · the `initial-scale=1.0`
  vs `1` serialization (the round-16 record — numerically equal) ·
  our supersets: `theme-color=#000000` on every page (the reference
  carries it on /login only), the self-hosted `og-image.png` family,
  the 512 PNG + apple-touch 180 icon family (the reference ships one
  mis-typed icon: `type="image/svg+xml"` on a `.png` URL) · the
  reference's soft-404 body family (ours is the designed 404, the
  documented superset) · the reference's signup title "Signup |
  EleganceFlow" (the soft-404's own title; ours is the superset's
  "Sign up | EleganceFlow").

## The cure set (TDD)

- **R-1** `tests/head-faces.test.ts` (the 38th unit file) — born RED:
  ① /login's JSON-LD: the exact BreadcrumbList object (positions 1/2,
  "Home"/"login", the origin items) + the exact spaced serialization;
  ② /signup's JSON-LD ("signup"/`/signup`);
  ③ the landing's purity — NO JSON-LD on `/` (the reference's landing
  carries none);
  ④ /login's viewport export carries `viewportFit: "cover"`;
  ⑤ /signup carries NO viewportFit (the reference's signup-URL
  viewport has none);
  ⑥ the root layout's `themeColor: "#000000"` stays (the every-page
  family — the keep pin);
  ⑦ the helper's route-type contract ("/login" | "/signup" only).
- **R-2** the cures: `breadcrumbJsonLd(route)` in `src/lib/site.ts`
  (the byte-mirrored spaced serialization, origin via `siteUrl()`);
  the `<script type="application/ld+json">` render + the
  `viewportFit: "cover"` export in `src/app/login/page.tsx`; the
  script render in `src/app/signup/page.tsx` (no viewport change —
  the login-only shape); mechanism comments at each site.
- **R-3** `scripts/drift-199.ts` gains the **[head] HEAD/METADATA
  census** (the 7th leg): both apps, /login + /signup — the JSON-LD
  text (origin-normalized), the viewport content, theme-color,
  canonical. Born-RED live proof on the pre-cure tree; NO DRIFT
  after (all seven legs).
- **R-4** `tests/e2e/auth.spec.ts` (+2): the login page renders the
  BreadcrumbList JSON-LD + `viewport-fit=cover` in the viewport meta;
  the signup page renders its JSON-LD + NO viewport-fit. On the
  standalone artifact.
- **R-5** the count ladder re-anchor (unit 472 → 472+N / 37 → 38
  files; e2e 81 → 83) at every live-tense site + the ladder's
  SOURCE_CONTRACTS list.
- **R-6** the mutation proof: M1 drop the /login JSON-LD (unit ① +
  e2e RED) · M2 drop the viewportFit (unit ④ + e2e RED) · M3 add a
  JSON-LD to the landing (unit ③ — the purity pin RED). 3/3 classes
  bite; all restored `cmp`-identical.
- **R-7** the captures refresh (the 6 `ours-*` faces).
- **R-8** the doc lockstep: `docs/session_31.md` + the worklog
  round-18 entry + the LIVE FINDS + this plan's Phase-5 record + the
  PAD §10 round-18 clause + the signup soft-404 transport record +
  the CLAUDE/SKILL prose lists.
- **R-9** the full gate re-proof (lint 0/0 · tsc 0 · unit · build 22
  routes · smoke 14/14 · e2e 83/83) + the final live probes (parity ·
  drift all seven legs · the mobile census).
- **R-10** ship: one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --remote git@github.com:nordeim/elegance-flow.git`.

## Phase 5 — The execution record (filled at ship)

- **R-1** ✓ `tests/head-faces.test.ts` (the 38th unit file, 12 checks)
  — born-RED **9/3** on the pre-cure tree (re-proven after the session
  restart: all real divergences RED; the landing-purity ③-1,
  signup-viewport ⑤ and theme-color ⑥ keeps GREEN by design).
- **R-2** ✓ the cures: `breadcrumbJsonLd` in `src/lib/site.ts` + the
  script renders on login/signup + the login-only `viewportFit: "cover"`
  export (ONLY that field — the root layout owns width/initialScale/
  themeColor). Battery **12/12** · lint 0/0 · tsc 0 · the dev server
  SSRs the exact spaced serialization live.
- **R-3** ✓ the `[head]` leg (the 7th) — born-RED live on the pre-cure
  tree: **3-field DRIFT** (loginJsonld · signupJsonld · loginViewport,
  the exact three the census predicted); **NO DRIFT after — all seven
  legs**. THE LIVE INFRA FIND inside R-3: the per-leg-browser design
  (one launch per leg since round-4) hit the sandbox's
  **launch-accumulation ceiling** — the tail goto timed out at 30s and
  the wedged `finally`'s `browser.close()` hung the script silently
  (proven by the marker ladder + isolated sequences + a 14-launch
  accumulation probe: ONE browser with 9 loads flies in 17s; ~15
  launch/close cycles kill the tail goto). The cure: the whole script
  now rides ONE browser with an isolated context per face call — and
  the restructure unmasked a real bug the hang always hid (headFace's
  `"/login"`-keyed record vs the `.login` access sites — fixed; the
  leg's first-ever completion WAS the born-RED proof).
- **R-4** ✓ e2e +2 (83/83): the login JSON-LD + viewport-fit leg · the
  signup JSON-LD + no-viewport-fit leg. Found live: the e2e webServer
  reuses a stale `.next/standalone` — the legs read 0 JSON-LD on the
  pre-cure artifact until the rebuild.
- **R-5** ✓ the count ladder re-anchored at **484/38** (13 seam/196 +
  25 source contracts/288 — head-faces the 25th source contract) · e2e
  **83/8**; the census battery's SOURCE_CONTRACTS list + all five root
  docs + the worklog verification line re-locked (the census test
  enforced every site, including a `38 *.test.ts` tree row the rg
  sweep nearly missed).
- **R-6** ✓ the mutation proof: unit **3/3** (M1 the login JSON-LD
  dropped 2 RED · M2 the viewportFit dropped 1 RED · M3 a landing
  JSON-LD planted 2 RED — both purity pins), all restored
  `cmp`-identical; e2e **2/2** (the M1 and M2 rebuilds each turned the
  login head leg RED; restored + rebuilt: 17/17).
- **R-7** ✓ the 6 `ours-*` captures refreshed (PIL-verified non-blank).
- **R-8** ✓ session_31 + this Phase-5 + the worklog round-18 entry +
  the LIVE FINDS (the launch-accumulation ceiling) + the PAD §10
  round-18 clause + the CLAUDE/SKILL prose lists.
- **R-9** ✓ the full gate re-proven green (lint 0/0 · tsc 0 · 484/484
  · 22 routes · smoke 14/14 · e2e 83/83) + the final live probes
  (parity IDENTICAL · drift NO DRIFT all seven legs · the mobile
  census byte-equivalent) — re-proven ON THE REBUILT TREE after the
  mid-ship sandbox recycle (every file re-applied from the session
  record; the same evidence re-earned).
- **R-10** ✓ one atomic commit on main via the ssh wrapper (dry-run →
  push → remote verification → key shredding).
