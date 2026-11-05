# Session 43 — Round-24: the DOCUMENT-ASSET/META census (the un-censused install assets + the reference's rendered head)

Round-23 shipped `4c700eb` (the anchor-navigation/deep-link census) +
the session-log commit `d8f635a`; the owner pushed nothing new, so
round-24 opens at the same HEAD — the re-validation rotation's
twenty-fourth pass: the workspace refreshed over HTTPS, the environment
rebuilt (`.env` → `DATABASE_URL="file:../db/custom.db"` with `db/` at
the repo root · db:push/db:seed · census MATCH), the gate + the live
probes re-proven, a fresh-eyes audit on the surfaces no probe ever
read, the positive census recorded, the coverage catch closed under
TDD, and the count ladder re-anchored.

## The status validation — every doc claim re-proven at `d8f635a`

- **Gate**: lint 0/0 · tsc 0 · unit **508/508 (43 files, the round-23
  ladder at the round's open)** · build (**22 routes**, standalone) ·
  smoke **14/14** · e2e **92/92 (8 specs)**.
- **Live parity**: COMPUTE IDENTICAL at 1280 + 390 (the s18
  serialization class excluded, same paint).
- **Drift**: NO DRIFT — the round-23 twelve legs.
- **The mobile-menu census**: byte-equivalent both apps; the sole delta
  OUR `aria-expanded` superset.
- **Infra checks** (the standing round-open battery): the
  vitest/playwright configs match the tree, the sitemap/SEO family
  serves (smoke rung 12), and `.env.example` covers exactly the six
  code-read env vars.

## The fresh angle — the document-asset/meta census

Every probe since session-199 read the landing's computed faces, its
body faces, or OUR behaviors pinned by the e2e battery. The round-18
head census read the reference's /login+/signup JSON-LD/viewport/
theme-color/canonical — but never the ROOT page's rendered meta family
(the runtime-injected family its raw SPA shell doesn't carry), and NO
probe ever read the INSTALL ASSETS: the favicon/icon/apple-icon BYTES,
the og-image BYTES, or the manifest CONTENTS (the smoke ladder reduces
all three to 200-status checks). Round-24 censused the whole family,
plus the never-ridden login tab order and the font-loading family.

**The findings:**

- **F-24a (HIGH, visible — the prior-domain leftover)**: our
  favicon/install icons shipped the NEO-CRM BrandMark —
  `src/app/icon.png` (512×512) + `src/app/apple-icon.png` (180×180)
  were carried verbatim at the session-199 domain transformation (last
  touched at the CRM-era session-18; PIL-verified the #2563eb tile).
  The reference ships its own black template logo (the media.base44
  CDN `283cae1f1_logo.png` family). The browser-tab icon — a
  user-visible face — advertised the wrong domain's brand.
- **F-24b (HIGH, visible-on-unfurl — the prior-domain leftover)**:
  `public/og-image.png` was the NEO-CRM dashboard screenshot (1200×630,
  carried verbatim). The reference's og:image is its logo on the
  1200×630 dark canvas (the CDN `/v1/fill/w_1200,h_630/` variant,
  declared `og:image:width=1200`/`og:image:height=630`). Every link
  unfurl advertised the wrong product.
- **F-24c (HIGH — the record correction + the description family)**:
  the standing record — site.ts's "It ships NO meta description", the
  layout comment's "the description is OUR documented SEO superset
  (the reference ships none)", CLAUDE.md's superset list — was STALE:
  the reference's RENDERED head ships the FULL meta family on every
  public route (meta description + og:title/description/url/type/
  site_name/image + twitter:card/title/description/url/image + the
  PWA trio), all carrying the TEMPLATE's marketing copy (171 chars,
  byte-identical in the meta, og, twitter, and manifest surfaces).
  Ours shipped the family (the shape mirrors) with a CURATED
  description invented at session-199 under the false premise — the
  deviation-nobody-wrote-down bug.
- **F-24d (MODERATE — the title family)**: the reference's titles —
  `/`, `/login`, AND `/reset-password` carry the BARE brand;
  `/signup` carries "Signup | EleganceFlow" (no space); og:title +
  twitter:title FOLLOW the title on every route. Ours shipped
  "Sign up | EleganceFlow" (the space) with the social titles stuck
  at the bare brand on titled routes (the factory ignored
  `opts.title` for `fullTitle`), and the INVENTED titled+prefixed
  reset family ("Reset password" + og "Reset password | EleganceFlow"
  + the "Reset password on EleganceFlow. " description prefix — the
  reference prefixes NOWHERE).
- **F-24e (the coverage catch — the curable class)**: none of the
  document-asset family carried a pin — no unit source-contract, no
  e2e leg, no drift leg. An icon/og-image byte swap, a description
  edit, a title regression, or an `icons` field planted on the layout
  (the CRM session-19 serializer hazard: `metadata.icons` REPLACES
  the file-convention `link[rel=icon]`) would ship with every gate
  green.

**The positive records (clean, first time probed, live on both apps
2026-11-05):**

- **R-24a**: robots.txt byte-identical modulo origin; the sitemap —
  the reference ships ONE url (`/`), ours the public-route superset
  (documented), format-identical.
- **R-24b**: fonts — ZERO webfonts on both apps (no @font-face, no
  preload, no Google links); the computed stock sans stack
  byte-identical; the ours-side `__nextjs-Geist` faces are the KNOWN
  dev-overlay artifact (the CRM session-22 lesson; the production
  artifact ships none).
- **R-24c**: the login tab order — the SAME six stops in the same
  order on both apps (Google button → email → password → submit →
  toggle → forgot).
- **R-24d (the reference's own defects/variances, no cure — the
  soft-404 precedent applied to the document family)**: the favicon
  type-lie (`rel=icon` `type=image/svg+xml` serving PNG) + no sizes
  attr + no apple-touch-icon (ours the honest type + the apple
  superset); the manifest icons' two-CDN-src shape (ours the
  self-hosted same-src quirk — never point at their CDN); the manifest
  link's relative-vs-absolute serialization; `og:image:width/height/
  alt` = /login-ONLY on the reference ("Base44 link preview" = the
  platform's boilerplate alt) while ours declares width/height
  everywhere (the invisible superset, matching the reference's
  declared 1200×630) and no alt; theme-color: the reference
  /login-only, ours every-page (the documented round-18 superset);
  the reference's base44-analytics/base44-visitor-tracking telemetry
  metas (the platform-scaffold genus).
- **R-24e (clean modulo the recorded superset)**: the manifest's
  name/short_name/display/theme_color/background_color/scope/start_url
  mirror modulo origin; og:type/site_name/url + twitter:card/url
  mirror modulo origin; the PWA meta trio mirrors; the JSON-LD family
  mirrors (round-18); the titles on `/` + `/login` mirror; the
  dashboard's "Dashboard | EleganceFlow" title mirrors.

## The cure (TDD)

- **The battery** — `tests/document-assets.test.ts` (the 44th unit
  file, 5 checks): ① the ICON byte-mirror (`icon.png`/`apple-icon.png`
  PNG magic + IHDR 512×512/180×180 + the recorded reference sha1s) ·
  ② the OG-IMAGE byte-mirror (`public/og-image.png` IHDR 1200×630 +
  the recorded sha1 + the site.ts/layout 1200×630 declarations) ·
  ③ the DESCRIPTION mirror (SITE_DESCRIPTION = the reference's
  171-char template copy, comment-stripped + whitespace-flattened;
  the manifest route + the root layout ride the seam; the
  pageOgDescription prefix family RETIRED) · ④ the TITLE family (the
  de-spaced signup call, the bare reset call, the login/dashboard
  keeps, the `fullTitle = opts.title ?? SITE_NAME` contract) · ⑤ the
  FAVICON-LINK keep (the layout declares NO icons field; the icon
  files ARE the links). **Born RED 4/5** (the ⑤ keep green by
  design).
- **The mutation proof 5/5 classes bite**: M1 an icon byte appended
  (① RED) · M2 the og-image truncated (② RED) · M3 the description
  edited (③ RED) · M4 the signup title edited (④ RED) · M5 an
  `icons` field planted on the layout (⑤ RED). All restored
  cmp-identical (the /tmp backup harness — never `git checkout`, the
  cured tree is not in git yet).
- **The asset swap (the cure itself)**: the reference's
  `w_512`/`w_180` logo PNGs → `src/app/icon.png`/`apple-icon.png`; the
  reference's `fill/w_1200,h_630` card → `public/og-image.png`; the
  SITE_DESCRIPTION seam re-mirrored; the signup title de-spaced with
  the factory's social titles following; the reset route re-bared;
  the `page` parameter + `pageOgDescription` retired; the stale
  "ships none" comments corrected at every site (site.ts, the layout,
  CLAUDE.md, the PAD, the manifest route).
- **The e2e legs (+5, 97/97)**: the manifest contents family (the
  mirrored description, the name pair, the icons, the display/theme/
  background trio) · the served asset sha1s + IHDR dims on
  `/icon.png` + `/apple-icon.png` + `/og-image.png` · the root
  description family across meta + og + twitter · the signup title
  family (title + og:title + twitter:title) · the reset-password bare
  family.
- **The drift leg [docs] (the 13th)**: the ROOT rendered head family
  (title, meta description, og/twitter, origin-normalized) + the
  manifest contents + the robots bytes + the sitemap per-side + the
  login tab order + the fonts family, all diffed REF vs OURS; **the
  og-image BYTES diff directly — the byte-mirror makes both sides the
  same sha, the round's strongest parity proof**; the reference's own
  defects (the favicon type-lie family) vs our honest-type superset
  and the CDN-vs-local icon-src families pinned per-side against
  their RECORDED constants (the google-leg expectConst pattern).
  **NO DRIFT — all THIRTEEN legs.**
- **The count ladder re-anchored**: unit **513/44** (13 seam/196 + 31
  source contracts/317 — document-assets the 31st) · e2e **97/8**; the
  census battery's SOURCE_CONTRACTS list + all five root docs + the
  worklog verification line re-locked (the census flagged exactly the
  stale sites; the census battery itself 7/7 GREEN). The
  auth-surfaces pins updated deliberately (the signup/reset call
  shapes — the factory's `page` parameter retirement).
- **The captures refreshed**: the 12 `ours-*` faces, all PIL-verified
  non-blank.

## Ship

One atomic commit on main via `docs/ssh_git_wrapper_v3.py` (dry-run →
push → remote verification → key shredding). No new branches.
