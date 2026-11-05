# The Round-24 Remediation Plan — the DOCUMENT-ASSET/META census (session-199)

**The round's fresh angle:** the document-asset/meta family no probe ever
read. Every probe since session-199 read the landing's computed faces
(parity), its body faces (drift), or OUR behaviors (e2e). The round-18
head census read the reference's /login+/signup JSON-LD/viewport/
theme-color/canonical — but never the ROOT page's rendered meta family,
and no probe ever read the INSTALL ASSETS: the favicon/icon/apple-icon
BYTES, the og-image BYTES, or the manifest CONTENTS (the smoke ladder
reduces all three to 200-status checks; the reference's own faces were
never censused). Plus the never-ridden login tab order and the
font-loading family.

## The census (round-24 discovery probes, both apps, side-effect-free)

- **F-24a (HIGH, VISIBLE — the prior-domain leftover)**: OUR
  favicon/install icons ship the NEO-CRM BrandMark — `src/app/icon.png`
  (512×512) + `src/app/apple-icon.png` (180×180) were carried verbatim
  at the session-199 domain transformation (last touched at the CRM-era
  session-18; PIL-verified: the #2563eb blue tile, center px
  37,99,235). The reference ships ITS logo — the black template logo
  (media.base44.com …/283cae1f1_logo.png): `link[rel=icon]` → the
  CDN w_180 variant (19051 bytes), manifest icons → the w_192/w_512
  variants. The browser-tab icon is a user-visible face shipping the
  WRONG DOMAIN's brand.
- **F-24b (HIGH, VISIBLE-ON-UNFURL — the prior-domain leftover)**: OUR
  `public/og-image.png` (1200×630) is the NEO-CRM dashboard screenshot
  (carried verbatim since the CRM era). The reference's og:image
  (og:image:width=1200, og:image:height=630) is its logo on the
  1200×630 dark canvas — the CDN `/v1/fill/w_1200,h_630/` variant
  (598838 bytes, sha1 4daab032e0b9a98636280fbe3b3c8d5db8d868c5). Every
  link unfurl of OUR site advertises the wrong product.
- **F-24c (HIGH — the RECORD CORRECTION + the description family)**:
  the standing record — site.ts's "It ships NO meta description",
  the layout comment's "the description is OUR documented SEO superset
  (the reference ships none)", CLAUDE.md's "the SEO metadata family
  (the reference ships none)" — is STALE. The reference's RENDERED head
  (SPA-runtime-injected; the raw shell carries none) ships the FULL
  family on EVERY public route: meta description + og:title/description
  /url/type/site_name/image + twitter:card/title/description/url/image
  + the PWA meta trio — all carrying the TEMPLATE's marketing copy
  ("A premium, modular website template for service-based businesses,
  designed for high-conversion portfolios, seamless service
  showcasing, and sophisticated client inquiries." — 171 chars,
  byte-identical in the meta, og, twitter, and manifest surfaces).
  OURS ships the family (the shape mirrors) with the CURATED
  description — invented at session-199 under the false premise, an
  un-recorded deviation (the deviation-nobody-wrote-down bug).
- **F-24d (MODERATE — the title family)**: the reference's titles —
  `/` and `/login` and `/reset-password` carry the BARE brand
  ("EleganceFlow"); `/signup` carries "Signup | EleganceFlow" (no
  space); `/dashboard` carries "Dashboard | EleganceFlow"; og:title +
  twitter:title FOLLOW the title on every route. OURS: /signup ships
  "Sign up | EleganceFlow" (the space) with og/twitter titles stuck at
  the bare brand (the pageMetadata factory's fullTitle ignores
  opts.title); /reset-password ships the INVENTED titled+prefixed
  family ("Reset password" + og "Reset password | EleganceFlow" + the
  "Reset password on EleganceFlow. " description prefix) — the
  reference's reset route was never title-censused; the prefix family
  (pageOgDescription) exists NOWHERE in the reference.
- **F-24e (the coverage catch)**: NONE of the document-asset/meta
  family carries a pin — no unit source-contract, no e2e leg, no drift
  leg. The drift classes that would ship with every gate green: an
  icon/og-image byte swap (any wrong-domain image), a description
  edit, a title regression, an icons-field plant on the layout (the
  CRM session-19 serializer hazard: metadata.icons REPLACES the
  file-convention link[rel=icon]).

## The positive records (clean, first time probed)

- **R-24a**: robots.txt byte-identical modulo origin; the sitemap —
  the reference ships ONE url (/), ours the public-route superset
  (documented), format-identical.
- **R-24b**: fonts — ZERO webfonts on both apps (no @font-face, no
  preload, no Google links); the computed stock sans stack
  byte-identical; the ours-side `__nextjs-Geist` faces are the KNOWN
  dev-overlay artifact (the production artifact ships none).
- **R-24c**: the login tab order — the same six stops in the same
  order on both apps (Google button → email → password → submit →
  toggle → forgot).
- **R-24d (the reference's own defects/variances, no cure)**: the
  favicon type-lie (rel=icon type=image/svg+xml serving PNG) + no
  sizes attr + no apple-touch-icon (ours the honest type + the apple
  superset); the manifest icons' two-CDN-src shape (ours the
  self-hosted same-src quirk — never point at their CDN); the manifest
  link's relative-vs-absolute serialization; og:image:width/height/alt
  = /login-ONLY on the reference ("Base44 link preview" = the
  platform's boilerplate alt) while ours declares width/height
  everywhere (the invisible superset, matching the reference's declared
  1200×630) and no alt; theme-color: the reference /login-only, ours
  every-page (the documented round-18 superset); the reference's
  base44-analytics/base44-visitor-tracking telemetry metas (the
  platform-scaffold genus).
- **R-24e (clean modulo the recorded superset)**: the manifest's
  name/short_name/display/theme_color/background_color/scope/start_url
  mirror modulo origin; og:type/site_name/url + twitter:card/url
  mirror modulo origin; the PWA meta trio mirrors; the JSON-LD family
  mirrors (round-18); the titles on / + /login mirror; the dashboard's
  "Dashboard | EleganceFlow" title mirrors.

## The cure (TDD)

- **R-1 — the pin battery** `tests/document-assets.test.ts` (the 44th
  unit file, 5 checks): ① the ICON byte-mirror (icon.png/apple-icon.png
  exist, PNG magic, IHDR 512×512/180×180, sha1 == the recorded
  reference constants); ② the OG-IMAGE byte-mirror (public/og-image.png
  PNG, IHDR 1200×630, sha1 == the recorded constant; site.ts + the
  layout declare the 1200×630 family); ③ the DESCRIPTION mirror
  (SITE_DESCRIPTION == the reference's 171-char template text; the
  manifest route + the layout ride the seam; the pageOgDescription
  prefix family RETIRED); ④ the TITLE family (signup
  "Signup | EleganceFlow"; reset-password BARE; the factory's
  fullTitle follows opts.title; login bare; dashboard titled); ⑤ the
  FAVICON-LINK keep (the layout declares NO icons field; the icon
  files exist — the file convention owns the links). Born RED on the
  pre-cure tree.
- **R-2 — the mutation proof**: every check class bites (an icon byte
  edited ① RED; the og-image swapped ② RED; the description edited ③
  RED; the signup title edited ④ RED; an icons field planted on the
  layout ⑤ RED); all restored cmp-identical.
- **R-3 — the asset swap** (the cure itself): the reference's
  w_512/w_180 logo PNGs → src/app/icon.png / apple-icon.png; the
  reference's fill/w_1200,h_630 og-image → public/og-image.png;
  SITE_DESCRIPTION = the template text; the signup title de-spaced;
  the reset-password call de-titled; the factory's fullTitle follows
  opts.title; pageOgDescription + the page parameter retired; the
  stale "the reference ships none" comments corrected at every site.
- **R-4 — the e2e legs (+5, 97/8)**: the manifest content family; the
  icon/apple-icon/og-image responses (200 + PNG + the byte shapes) on
  the standalone artifact; the description family on / (meta +
  og + twitter); the signup title family (title + og:title +
  twitter:title); the reset-password bare title.
- **R-5 — the drift `[docs]` census leg (the 13th)**: the ROOT rendered
  head family on both apps (title, meta description, the og/twitter
  families origin-normalized, the manifest contents diffed, robots
  byte-diff modulo origin, the sitemap per-side, the login tab order,
  the fonts family) + the per-side recorded constants for the
  reference's own defects (the icon-link attrs + the fetched icon
  bytes + the og-image meta trio). The og-image BYTES diff directly
  (the mirror makes both sides the same sha).
- **R-6 — the count ladder re-anchored**: unit 513/44 (13 seam/196 +
  31 source contracts/317 — document-assets the 31st) · e2e 97/8; the
  census battery's SOURCE_CONTRACTS list + all five root docs + the
  worklog verification line re-locked.
- **R-7 — the captures refreshed** (the 12 ours-* faces, PIL-verified
  non-blank).
- **R-8 — the doc lockstep**: session_43.md + this plan + the worklog
  entry + PAD + README + AGENTS + CLAUDE + the SKILL version bump; the
  auth-surfaces pins updated deliberately (the signup/reset call
  shapes).
- **R-9 — the gate re-proof + ship**: lint → typecheck → test → build
  → smoke → e2e, the final live probes (parity + drift ×13 + the
  mobile census), one atomic commit on main via the SSH wrapper.

## The judgment calls this round owns

1. **The description text is MIRRORED, not curated**: the reference's
   template copy is its own face on a SHARED surface (the false
   "ships none" premise is corrected); the placeholder doctrine (the
   "YOUR STUDIO" precedent) applies — the un-customized template face
   is mirrored byte-for-byte. The curated text retires with the
   record.
2. **The og-image/icon BYTES are mirrored (self-hosted)**: the
   self-hosted-expression doctrine — never point at their CDN — served
   by hosting the reference's own bytes locally.
3. **The "Base44 link preview" alt + the /login-only og:image trio are
   RECORDED, not mirrored**: the platform's boilerplate on one route;
   ours keeps the invisible width/height superset everywhere (matching
   the reference's declared 1200×630) and no alt.
4. **The prefix family is RETIRED** (pageOgDescription + the page
   parameter): it exists nowhere in the reference; the dead branch
   would ship as dead code.
