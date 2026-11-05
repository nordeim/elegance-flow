# Session 48 — Round-27: the CRM-BLUE/RESILIENCE-BOUNDARY census (the token-axis blind spot + the login logo + the stale 404 title)

Round-26 shipped `31a5997` + the owner's session-log push `1fa7e61`
(docs/session_47.md); the owner pushed nothing else, so round-27 opens at
that HEAD — the re-validation rotation's twenty-seventh pass: the
workspace re-cloned over HTTPS after the sandbox recycle, the environment
rebuilt (`.env` → `DATABASE_URL="file:../db/custom.db"` with `db/` at the
repo root · db:push/db:seed · census MATCH), the gate + the live probes
re-proven, a fresh-eyes audit on the surfaces and tokens no probe ever
censused (the round-26 log's own candidate list named the family first),
the cures landed under TDD, and the count ladder re-anchored.

## The status validation — every doc claim re-proven at `1fa7e61`

- **Gate**: lint 0/0 · tsc 0 · unit **523/523 (46 files, the round-26
  ladder at the round's open)** · build (**22 routes**, standalone) ·
  smoke **14/14** · e2e **105/105 (8 specs)** — after the
  browser-binary reinstall the workspace reset drops (the known
  round-23 lesson: `bunx playwright install chromium`).
- **Live parity**: COMPUTE IDENTICAL at 1280 + 390 (the s18
  serialization class excluded, same paint).
- **Drift**: NO DRIFT — all fifteen legs.
- **Mobile census**: byte-equivalent — same 5 links + amber CTA ·
  link-ride navigates AND closes · the sole delta OUR aria-expanded
  (the operator's standing emphasis: the menu works exactly as
  expected, no Tailwind v4 bug).
- **Configs**: vitest (`vitest.config.ts` — 47 files now) +
  Playwright (`playwright.config.ts` — the standalone artifact, the
  setup project, the pinned e2e db) verified green by the gate;
  `.env` per contract; `.env.example` matches the codebase (the
  6-var contract — unchanged this round); the sitemap/robots/manifest
  route handlers + the SEO family verified (smoke rung 12, the drift
  [docs] leg, the pinned batteries).

## The round's fresh angle — the surfaces and tokens no probe ever censused

The drift [login] leg reads card/google/divider/input/submit — never the
LOGO. The error-boundaries battery pins the wiring + copy vocabulary —
never the visual family. The dead-code census pins devDeps + @utility
consumers — never @theme TOKEN consumers. The round-25 e2e leg pins the
derived 404 title at rest — never the title AFTER the navigation away.
The round-26 log's own candidate list named the error-boundary family
first; the census widened to the whole CRM-blue token axis.

### The census (both apps, guest-only GETs + the boundary-ride experiments)

- **F-27a (HIGH, VISIBLE — the login-logo blue dot)**: the reference's
  login card renders its REAL logo — an `<img src="…base44…
  283cae1f1_logo…/w_192,h_192…webp" alt="EleganceFlow logo"
  class="aspect-square h-full w-full object-cover">` (96×96, object-fit
  cover) inside the byte-class circle span — the SAME 283cae1f1_logo
  the round-24 asset cure byte-mirrors to `src/app/icon.png`. OURS
  rendered a 40×40 `bg-sidebar` (#2563eb) blue dot — the CRM-era
  sidebar-blue "CSS brand mark". A visible divergence on the
  parity-gated surface that every gate missed.
- **F-27b (HIGH — the boundary's CRM-blue button)**: the error
  boundaries' Try-again buttons rode `bg-primary
  hover:bg-primary-hover focus:ring-primary` — `--color-primary:
  #2563eb`, the NEO-CRM brand-blue family the round-24 icon cure
  retired from the assets; the token survived the domain
  transformation only because the boundary family never carried a face
  pin. The boundaries' own comments claimed "the house dialect the 404
  established" — but rode inline literals and the domain's only blue.
- **F-27c (HIGH, AA — the boundary h1 contrast fail)**: "Something went
  wrong" rode `text-slate-300` (#cbd5e1) on `bg-slate-50` (#f8fafc) =
  **1.42:1** — a WCAG 1.4.3 fail on OUR OWN superset surface (the house
  doctrine: our surfaces pass AA outright; the a11y two-gate audits
  landing/auth/workspace only). The 404's own "404" numeral keeps
  slate-300 — the REFERENCE's own face (the s12 byte-pin, the
  sanctioned class; never "fixed").
- **F-27d (HIGH, DRIFT — the stale 404 title after Go Home)**:
  live-probed on the standalone artifact: after the Go Home client nav
  from a 404, OURS' derived title PERSISTED on the landing ("Probe 404
  | EleganceFlow" at "/"); the reference's SPA resets to
  **"EleganceFlow"** (live-ridden: its Go Home button → "/" → the bare
  brand). Root cause: React's `<title>` reconciliation SKIPS the DOM
  write when the incoming route resolves the SAME string its record
  owns — the 404 (no metadata export, the D-194a4 retirement) and the
  landing BOTH resolve the layout-default "EleganceFlow", so React
  never rewrites the node the observer mutated.
- **F-27e (the @theme token-axis census — the domain transformation's
  blind spot)**: after the cures the CRM-brand token family loses every
  consumer: `--color-sidebar` (the logo dot was the last),
  `-sidebar-hover`, `-sidebar-active`, `--color-brand` (the NEO-CRM
  reference's marketing token, zero consumers already),
  `--color-primary` (the boundary buttons; its last consumer — the
  toast's info icon — re-pinned to the Feedback family's
  `--color-info` #06b6d4, the conventional info status ink, redundant
  with the toast's text so WCAG 1.4.11 exempts it), `-primary-hover`,
  `-primary-foreground` — SEVEN names RETIRED; the stale "Brand
  palette … session-7 live computed-color probe" CRM record corrected
  at the @theme header.
- **F-27f (the coverage catch + the unverifiable member)**: none of the
  family carried pins. The boundary itself is UNRIDEABLE on the
  standalone artifact without shipping test-only code — BOTH
  experiments probed: poisoned chunk fetches → the router serves the
  nav from the prefetch cache (Next prefetches `<Link>` targets at
  mount, before the arming); a 500 on the RSC fetch → React falls back
  to the full-page load, never the boundary. Recorded per the round-20
  unverifiable-member precedent; the coverage rides the unit seam
  battery.

### The cure (TDD)

1. **The layout seam** `ERROR_LAYOUT` in `src/lib/page-layout.ts` — the
   404's own construction (page/card/center/headingGroup/divider/
   textGroup/buttonGroup + the Go Home pill family) with the ONE
   deliberate ink change: the boundary h1 `text-slate-500` (4.55:1 — AA
   outright) where the 404's numeral keeps the reference's slate-300.
2. **The boundary rewrites** — both files ride the seam; the resilience
   posture keeps verbatim ("use client", the reloadOnStaleChunk wiring
   with [error] deps, the digest ref, reset(), zero component-tree
   imports, global-error's own `<html lang="en">` + globals.css
   import).
3. **The login-logo cure** — `<img src="/icon.png" alt="EleganceFlow
   logo" className={LOGIN_LAYOUT.logoImg}>` (the self-hosted byte
   mirror — NEVER their CDN; the plain `<img>` is the house idiom, the
   eslint `no-img-element` rule off since the scaffold, the landing's
   own imgs plain); `LOGIN_LAYOUT.logo` drops the dot-era extras
   (bg-white/items-center/justify-center) to the reference's byte
   class; the span's `aria-hidden` dropped (the reference's logo is a
   real informative img with a real alt).
4. **The title-reset cure** — the not-found effect's cleanup:
   disconnect the observer FIRST, then the GUARDED bare-brand reset
   (only if the DOM still carries OUR derived value) — convergent in
   every commit order: a titled next route's React write either
   precedes the guard (fails, no clobber) or follows it (overwrites
   correctly); the skip-class next route (the landing) gets the bare
   brand.
5. **The toast ink + the token retirement** — the info icon
   `text-primary` → `text-info`; the seven zero-consumer CRM tokens
   retired from `@theme`; the header record corrected.

### The pins

- `tests/error-faces.test.ts` (**+5, the 47th unit file**): ① the
  ERROR_LAYOUT seam family + the AA ink family · ② the WCAG contrast
  MATH computed from the live @theme hex (slate-500/800/600 on
  slate-50 — the ≥4.5:1 bar; the retired 1.42:1 fail pinned <3 — REAL
  math, never comment-pinned) · ③ the seven retired token names + the
  Feedback family intact + the toast ink · ④ the boundaries-ride-the-
  seam posture keeps · ⑤ the login-logo source contract + the
  banned-token regression across the five touched surfaces. **Born RED
  4/5** (② green by design — the math computes on the live tokens).
- **The mutation proof 5/5 classes bite**: M1 the seam's h1 ink edited
  ① RED · M2 a CRM-blue class planted on the boundary ④⑤ RED · M3 a
  retired token planted back ③ RED · M4 the logo img reverted to the
  blue dot ⑤ RED · M5 the toast icon edited back to text-primary ③ RED
  — all restored cmp-identical (the /tmp backup harness).
- **The deliberate re-pins**: `tests/toast-anatomy.test.ts` (text-info
  + the not-contain regression) · `tests/viewport-faces.test.ts` (the
  LOGIN_LAYOUT.logo byte class + the logoImg member) ·
  `tests/route-mechanics.test.ts` (the guarded-reset wiring).
- `tests/e2e/auth.spec.ts` (**+1, 107/107**): the logo face on the
  artifact — the alt, the `/icon.png` src, the object-fit cover, the
  96×96 box, the circle's no-blue-dot census (one img, zero round
  spans, the transparent dot-era bg retired).
- `tests/e2e/landing.spec.ts` (**+1, 107/107**): the Go Home title leg
  — the 404 → the derived title → the ride → the bare brand again (the
  cure's bar).
- `scripts/drift-199.ts`: the **[login] leg EXTENDED** with the logo
  family (the alt/object-fit/box/display/overflow/bg diffed both apps;
  the spanRadius and the imgSrc pinned per-side — REF `9999px` + the
  base44 CDN vs OURS `3.35544e+07px` + `/icon.png`, the round-26
  rounded-full serialization lesson applied) and the **[routes] leg
  EXTENDED** with the post-Go-Home title ride (diffed both apps —
  IDENTICAL after the cure: both reset to the bare brand). **NO DRIFT
  — all FIFTEEN legs.**

## The count ladder re-anchored

**528/47** (13 seam batteries / 196 + 34 source contracts / 332 —
error-faces the 34th) · e2e **107/8** · smoke 14/14 · drift legs 15
(two EXTENDED). The census battery's SOURCE_CONTRACTS list, all five
root docs, and the worklog verification line re-locked; the census
battery itself **7/7 GREEN**.

## The round's live finds (the harness lessons)

- **The token-axis blind spot**: the dead-code census pins devDeps and
  @utility consumers but never @theme TOKEN consumers — the CRM-blue
  family survived the session-199 domain transformation for
  twenty-seven rounds because its last consumers were exactly the
  surfaces no probe ever censused (the login logo, the boundaries, the
  toast icon).
- **The React title-skip decode**: the `<title>` reconciliation SKIPS
  the DOM write when the incoming route resolves the same string its
  record already owns — a client-mutated title node persists
  invisibly; the guarded cleanup reset is the convergent cure for
  every commit order.
- **The prefetch-cache nav poison**: a client-nav chunk poison never
  fires (Next prefetches `<Link>` targets at mount, before the
  arming); a 500 RSC fetch triggers React's full-page-load fallback,
  never the error boundary — the boundary family is e2e-unrideable
  without test-only code, the unverifiable member.
- **The blue-not-cyan contrast decode**: #2563eb computes 5.17:1 on
  white — the AA-strong choice if a blue must stay; #06b6d4 computes
  2.42:1, exempt only because the toast icon is redundant with its
  text.
