---
name: elegance-flow
description: >
  Complete engineering skill for the EleganceFlow codebase — a production-grade,
  byte-mirrored clone of the reference base44 creative-studio site
  (colossal-elevate-service-flow.base44.app) on Next.js 16 App Router +
  React 19 + Prisma/SQLite + Tailwind CSS v4, with a functional superset:
  persisted inquiries and the authenticated studio inbox at /dashboard.
  Covers the reference map, the content contracts, the computed-face parity
  doctrine, the Tailwind v4 re-pin traps, the mobile inline menu, the auth
  seams, the testing pyramid and the debugging playbook. Use it to extend,
  debug, onboard, or replicate this architecture.
version: 1.214.0
last_updated: 2026-11-05
---

# EleganceFlow — the domain skill

EleganceFlow is a premium creative-studio marketing site cloned from
`https://colossal-elevate-service-flow.base44.app` (session-199's reference).
This skill is the distilled domain knowledge: what the reference is, how the
clone mirrors it byte-for-byte, where the superset adds, and the traps an
agent will hit.

The lineage: the repo's prior 198 sessions built the NEO CRM (see
`neo-crm_SKILL.md`, kept as the lineage record). At session-199 the reference
URL re-pointed to a completely different app and the repo followed its own
domain-transformation doctrine (the budget-wiser Task-190 precedent): the CRM
surfaces retired, the infra seams carried verbatim, the app rebuilt from nine
live DOM probes of the new reference.

## 1. The reference map

A one-page marketing site (base44 SPA) + the base44 auth card. Everything
behind the login on the reference is an empty 404 shell — the authenticated
inbox is OUR superset.

| Zone | Content | Key faces |
| --- | --- | --- |
| Header | Logo "EleganceFlow" + 5 links + "GET IN TOUCH" | `fixed` transparent → on scroll `bg-zinc-950/95` + shadow-sm |
| Hero | amber eyebrow, double-span h1, paragraph, two CTAs, accent bar, SCROLL indicator | `bg-zinc-950 text-white`, h1 `text-6xl md:text-8xl lg:text-9xl font-black` |
| About | 2-col: statement + 3 stats | white section, `border-4` offset frame on the image |
| Services | 4 cards, one FEATURED | featured = `bg-amber-500` with `text-zinc-950` ink and `border-black/10` price |
| Work | 6 projects, filter chips | active chip = `bg-zinc-950 text-white`; hover-only overlay (no dialogs) |
| Testimonials | 3-quote carousel | amber `Quote` icon (40px), `border-l-4 border-amber-500` selector |
| Contact | form (name/email/service select/5-row textarea) + mail/tel links + location | white section; select uses an absolutely-positioned chevron |
| Footer | 3 columns + socials | `bg-zinc-950 text-white` |
| Mobile menu | hamburger → INLINE disclosure panel | `md:hidden bg-zinc-950 border-t border-white/10`; link click navigates AND closes |
| /login | the base44 auth card | "Welcome to EleganceFlow", the lowercase "or" divider (caps via CSS), Google button |

Case discipline: the DOM text is title-case ("Start a Project"); the ALL-CAPS
faces ride CSS `uppercase`. Locators and content pins use the DOM-case forms.
`src/lib/site-content.ts` is the ONE source for every string — all
unit-pinned.

## 2. The parity doctrine (computed-face, not class-literal)

The landing's class strings were extracted from the live reference's DOM by
nine Playwright probes (`scripts/extract-ef-reference*.ts` — the templates
for any future probe). But mirroring literals is necessary, not sufficient:
the reference compiles v3-era CSS, our build is v4, and cascade order
differs. The acceptance bar is `scripts/parity-199.ts`: computed-style diffs
of ~40 faces per viewport (1280 desktop, 390 phone) against the LIVE
reference — every face must compute identical.

The canonical decode: the reference's `leading-[0.9]`/`leading-[0.95]` on
the h1/h2 family NEVER takes effect in its own build at md+ (its `text-Nxl`
line-height:1 rules win in its plain rule order), but DOES take effect at
base width. The port reproduces the computed face, not the literal:
`leading-[0.9] md:leading-none` (h1) and `leading-[0.95] md:leading-none`
(the five h2s). Copy the COMPUTED face, never the literal class.

The one accepted delta is a serialization class (s18): the scrolled header's
`bg-zinc-950/95` serializes as `oklab(… /0.95)` in our v4 build vs the
reference's `rgba(9,9,11,0.95)` — numerically the same paint
(`oklabToSrgb(0.140764, 0.00120224, -0.00421676) = (9,9,11)`), proven in the
script's filter.

## 3. The Tailwind v4 re-pin traps (all live in globals.css @theme)

The reference ships v3-era CSS; v4 diverges unless pinned. Eight re-pin
members (see `docs/Tailwind-V4-Validation-Report.md`, required reading):

1. **Palette**: every (family, step) pair used in `src/` re-pinned to the v3
   literal hex in `@theme` — zinc (session-199's family), amber, slate. v4's
   oklch re-derivation differs at EVERY step (zinc-100:
   oklch(96.7% 0.001 286.375) vs the reference's rgb(244,244,245)).
2. **`--shadow-sm`**: v4 renamed the scale one step heavier.
3. **`--blur-sm`**: the same rename family.
4. **`space-y` flip**: v4 puts margin-bottom on the PRECEDING child — inline
   elements ignore it; the auth fields use `[&>*+*]:mt-1.5`.
5. **`@custom-variant hover (&:hover)`**: unwraps v4's `(hover: hover)` media
   (touch devices never fire hovers without it).
6. **The computed-face re-derivations**: the leading family (§2) — a class
   that never takes effect in the reference's own build ports as the face it
   actually renders (round-16 grew the family: the plain `leading-snug`/
   `leading-relaxed` on the `md:text-3xl`/`md:text-xl` carriers are dead at
   md+ in the reference's cascade — its md: text rules re-pair 36px/28px —
   so the ports are `md:leading-9`/`md:leading-7`).
7. **The `outline-none` rename (round-13)**: the reference's v3
   `.outline-none` computes `outline: 2px solid transparent;
   outline-offset: 2px`; v4's spells `outline-style: none` — and v4.3's
   `outline-hidden` is ALSO style:none (the transparent outline
   forced-colors-only). Only the `outline-2 outline-transparent
   outline-offset-2` composition computes the v3 face.
8. **The `transition-colors` property-list expansion (round-14)**: v4
   adds `outline-color` + the gradient custom properties to the list;
   v4.3 HARDCODES it (not theme-driven — and a custom `@utility`
   colliding with the functional built-in is silently dropped from the
   build, found live). The cure: the UNLAYERED `.transition-colors`
   rule re-pinning the v3 six-property list. The inverse doctrine:
   `transition-transform`'s v4 list (`transform, translate, scale,
   rotate`) is the LOAD-BEARING decode — v4 compiles translate-x/scale
   to the individual properties, so re-pinning it to v3's bare
   `transform` would kill the hover motions. Never override it.

New colors must join the re-pin block (or be verified byte-equal); the
landing unit battery pins the zinc family.

## 4. The superset (every deviation is documented and functional)

The reference's contact form answers a toast and DISCARDS the submission
(live-verified). Ours persists every inquiry and serves the studio team:

- `POST /api/inquiry` — public, Zod through `parseBody`, rate-limited
  10/IP/15-min with `Retry-After`, 201 on success. The success toast is the
  reference's byte-verified pair.
- `/dashboard` — the authenticated inquiries inbox (server-guarded via the
  `(app)` route group): 4 tabs (active/new/archived/all), search, mark-read,
  archive/unarchive, TWO-STEP delete (Confirm/Cancel), explicit
  loading/error/empty states.
- `PATCH/DELETE /api/inquiry/[id]` — the sessioned triage family.
- The SEO metadata family (the reference ships none) + the designed 404
  (true 404 status, vs the reference's blank SPA shells) + deep-linkable
  `/signup` and `/reset-password`.
- The Google button's honest fallback (round-21, R-21a): the reference's
  "Continue with Google" is a REAL Google OAuth redirect (the click
  navigates to the platform's `/api/apps/auth/login` document endpoint
  whose 302 lands on accounts.google.com with base44's client_id and the
  app.base44.com callback) — unimplementable in the self-hosted clone
  (the redirect_uri is registered to base44's Google app), so ours
  degrades to the honest info toast; pinned by
  `tests/google-fallback.test.ts` + the auth e2e leg + the drift
  script's [google] census (the 10th leg).

Superset surfaces pass WCAG AA OUTRIGHT (zinc-600/zinc-500 honest inks, no
zinc-400; every interactive control carries a visible focus-visible ring
since round-10 — the inbox/shell family rides `focus-visible:ring-*`,
pinned by `tests/focus-contract.test.ts` + the keyboard e2e battery) and
cite no sanctioned matchers — only the reference-mirrored
landing colors carry the a11y spec's sanctioned register (the reference's
own byte-parity palette: the amber eyebrow, the white/20–40 ladder, the
featured card's zinc-900/70 at 4.48:1, the inactive filter chip at 4.39:1).

## 5. The carried seams (do not reinvent)

- **Auth**: hand-rolled scrypt (N=16384) + HMAC `neo_session` cookie
  embedding the row's `tokenVersion` (a reset evicts every prior cookie);
  7-day fixed expiry; email-verification codes stored HASHED; reset
  tokens SHA-256-hashed, single-use, consumed atomically, 60-min TTL. Zero
  dependencies (`src/lib/auth.ts` + `src/lib/password.ts`, node:crypto).
- **API envelope**: `{ ok, data } / { ok, error: { code, message } }` via
  `src/lib/api.ts`; every body parses through `parseBody(req, zodSchema)`
  (composes the content-type CSRF gate, the 16KB declared-length pre-gate,
  the schema); a bare `req.json()` anywhere in `src/app/api` fails the
  body-pregate unit gate; DB writes wrap in try/catch → `ERR.INTERNAL()`.
  Canonical route order: limiter → parseBody.
- **db-path**: `.env` pins `DATABASE_URL="file:../db/custom.db"`; relative
  `file:` URLs resolve against `prisma/schema.prisma` for the CLI but the
  process CWD at runtime — `src/lib/db-path.ts` normalizes both to
  `<repo>/db/custom.db`. Never a raw `new PrismaClient()`; always
  `@/lib/db`. Censuses via `bun run db:census` (it prints the resolved path).
- **Boot gate**: production boot without a ≥16-char `AUTH_SECRET` refuses
  to serve (`src/instrumentation.ts` → `src/lib/boot-env.ts`).
- **Toast**: `src/components/ui/toast.tsx` — the reference's own toast
  system, carried verbatim (`toast.success(title, description)`).

## 6. The data model

```
User   (id, email, passwordHash, name, role, emailVerifiedAt,
        verificationCodeHash, resetTokenHash, resetTokenExpiresAt,
        tokenVersion, timestamps)
Inquiry (id, name, email, service, message, status: new|read|archived,
        timestamps)
```

Seed contract: 3 inquiries (Maya/new, David/read, Priya/archived) + 4 users
(the operator mirror `sepnetflix2023@outlook.com` / `$Abcd1234` + three
demo accounts). `bun run db:census` must print MATCH (3 + 4).

## 7. The testing pyramid (the gate: lint → typecheck → test → build → smoke → e2e)

- **Unit — Vitest, 565 checks / 50 files**: the seam batteries (auth,
  password, rate-limit, parse-body, db-path, boot-env, census, schemas,
  coercion-guards, bounded-reader, http-headers, chunk-recovery,
  login-reset) + the source-contract pins (site-content,
  inquiry-schemas, landing-page (round-11 gains the designed 404's
  hydration-decode contract — the two-phase pathname fill that killed
  the React #418 mismatch on the standalone artifact), auth-surfaces,
  auth-contract, auth-reset, body-pregate, gate-script,
  error-boundaries, toast-anatomy, sitemap-routes — the post-ship
  audit battery that pins the sitemap to the live public-route census —
  deployment-doc-census — the round-6 battery that pins
  DEPLOYMENT.md's counts/contracts to the live tree census, closing
  the unpinned-doc class — count-ladder-census — the round-7
  battery that pins the root docs' count-ladder claims to the live
  tree census, the class closed at the root level — re-pin-tokens —
  the round-8 battery that puts the six v4 re-pin traps' token
  family (the full 29-token palette block, --shadow-sm, --blur-sm,
  the space-y flip class, the hover unwrap, the leading
  re-derivations) under the unit gate — doc-pointer-census —
  the round-8 battery that pins every load-bearing doc's file
  references to the live tree, closing the dangling-pointer class —
  dead-code-census — the round-9 battery that pins the manifest
  ↔ recovery-script lockstep, the live-import discipline (every
  declared dependency carries a consumer citation), and the @utility
  consumer census, closing the dead-code class that shipped the
  CRM-era install list, the dead devDeps, and the dead @utility
  blocks — focus-contract — the round-10 battery that pins the
  --color-ring re-pin (#09090b, the LIVE reference's computed
  sign-in ring) and the superset's focus-visible source contract
  (every interactive control on OUR surfaces carries a visible
  focus ring), closing the WCAG 2.4.7 class — and inbox-states — the
  round-11 battery that pins the inbox's five state faces (the
  initial-load loading face, both error faces, both empty faces, the
  recovery/busy/refresh contracts) at the source level, closing the
  state-face class the pre-ship checklist prescribes but no gate had
  run) — and landing-images — the round-12 battery that pins the
  landing's image set (the six DISTINCT project photographs, the
  hero/about/avatars, the alt faces) plus the reuse-class census (no
  project photo may reappear — the class that shipped five of six
  portfolio photos as silent reuses of the hero/about/other-project
  frames, invisible to the style and text probes) — and focus-outline —
  the round-13 battery that pins the landing's focus-outline family
  (the universal outline-color decoupled from --color-ring — the
  reference's landing bundle computes rgba(10,10,10,.5) while its auth
  ring computes zinc-950; our one-token collapse dragged the face at
  round-10), the --color-foreground re-pin, the outline-none rename's
  composed v3 face (the SEVENTH v4 trap: v4's outline-none is
  style:none and v4.3's outline-hidden is TOO — the transparent
  outline forced-colors-only — only the outline-2/transparent/offset-2
  composition computes the reference's face), and the auth-card ink
  re-pins (the base44 semantic-token refresh: the Google button's
  #0f0e0e/#e9e6e0 + hover pair, the divider's #5d5d5d) — and
  preflight-faces — the round-14 battery that pins the landing's
  preflight-owned form faces (the ::placeholder ink — the v3
  preflight's gray-400 #9ca3af vs v4's currentcolor@50% color-mix, a
  VISIBLE divergence on the parity-gated surface that no gate could
  see: parity reads elements, never pseudo-elements; the input/
  textarea background — the UA field default vs v4's transparent
  reset; the transition-colors property-list re-pin — the EIGHTH v4
  trap, cured by the UNLAYERED rule; the transition-transform
  keeps-out — the load-bearing decode that must never be re-pinned) —
  and motion-glyph — the round-15 battery that pins the landing's
  time-dimension and glyph faces (the reference's raw `html {
  scroll-behavior: smooth }` rule — every anchor ride glides where a
  bare build jumps, the trajectory-proven motion face; the html
  element's bare-class purity — the rule, never the scroll-smooth
  utility; the testimonial quote's STRAIGHT double quotes — the
  full-text census proved the typographic pair the sole text
  divergence on the landing; the retired &ldquo;/&rdquo; forms never
  return) — and geometry-faces — the round-16 battery that pins the
  attribute/geometry faces (the hero's absolute-wrapper structure —
  the reference nests its photo inside `absolute inset-0`, and a
  direct in-flow `<img>` becomes a second flex item that squeezed the
  ENTIRE content column off-canvas at both viewports while every gate
  stayed green: parity reads computed styles, toBeVisible passes a
  non-empty box wherever it sits; the scroll label's placement INSIDE
  the content column; the two NEW trap-⑥ leading decodes — the
  reference's md:text-Nxl media rules pair 36px/28px and beat the
  plain leading rules in ITS cascade, so the port is `md:leading-9` /
  `md:leading-7`; the form's native-validation mode — the reference
  blocks empty submits at the browser, no POST leaves the page; the
  reference-exact glyph quartet — the lucide-era palette/megaphone/
  mail/phone shapes + the login card's classic 22.56-based Google
  quartet, carried by `src/components/ui/reference-icons.tsx`) — and
  auth-validation — the round-17 battery that pins the auth card's
  VALIDATION-MODE family (the F-16d genus on the auth surfaces: the
  reference's sign-in/signup/reset forms NATIVE-VALIDATE — no
  noValidate, an empty submit fires no submit event and no POST, the
  browser paints its own bubbles; OURS carried noValidate on all
  three reachable forms — the empty sign-in submit POSTed
  `/api/auth/login`, the empty signup POSTed `/api/auth/signup`, the
  empty reset submit fired our JS guard's banner where the reference
  paints the browser bubble; the reset email's missing `required`
  gate; the signup password family's `minLength={8}` — ours-only
  attrs that activate as a STRICTER-than-reference client gate once
  the native validation turns on: the reference's "Min. 8
  characters" PLACEHOLDER communicates the policy its server
  enforces, our Zod seam owns the same enforcement server-side; the
  verify form's noValidate KEPT — the reference's verify view is
  unreachable without a real signup, our own incomplete-guard UX
  stands, recorded as the unverifiable member; the autocomplete
  superset family stays — email/current-password/new-password, the
  reference ships none) — and head-faces — the round-18 battery that
  pins the HEAD/document faces no probe ever read (F-18a: the
  reference's /login carries a schema.org BreadcrumbList JSON-LD —
  Home → login, the platform's exact spaced serialization — and
  serves the same family at its /signup URL, now a 200-status
  soft-404 (the base44 DeadEndPage; our working /signup is the
  documented superset, and the crumb is semantically true on it — one
  hop from home); OURS shipped zero JSON-LD anywhere; F-18b: the
  login-ONLY viewport-fit=cover — the reference's /login viewport
  declares it while its landing and signup-URL viewports carry none;
  the keeps: the landing's JSON-LD purity, the signup's plain
  viewport, the every-page theme-color) — and interaction-faces — the
  round-19 battery that pins the INTERACTIVE BEHAVIORS no probe ever
  rode against the live reference (F-19a: the contact form's SUCCESS
  STATE — the reference's submit fires NO domain POST and REMOVES the
  form at ~400ms, rendering the persistent in-place centered panel
  (the 48px amber circle-check-big + the h3 "Message sent!"/p "We'll
  be in touch within 24 hours." pair); OURS had shown a floating
  shadcn toast bottom-right and kept the cleared form — a different
  visible construction on the parity-gated surface; the provenance
  corrected: the byte-verified pair is the panel's h3/p, not a
  toast's; F-19b: the contact grid's bare right-column wrapper div —
  the reference's grid > div > form vs our grid > form, invisible at
  rest but load-bearing for the panel's h-full; the keeps: the honest
  error toasts (the reference cannot fail — no request fires), the
  native-validation gate, the controlled inputs, the pending guard;
  the panel's role="status" is OUR a11y superset — the reference's
  panel is screen-reader-silent) — and auth-failure-faces — the
  round-20 battery that pins the live FAILURE behaviors + the
  response-header family no current-reference probe ever read (F-20a:
  the sent view's green callout carried NO ROLE — the success
  announcement was screen-reader-silent; the reference's platform
  callouts ALL carry role="alert" (live-ridden: the red failure
  banner AND the green sent banner), and our own Error/Info callout
  idiom already mirrored it — the sent callout was the role-less
  straggler; the positive censuses: the login-failure ride
  byte-identical (the banner's full class + inner shape + text, the
  in-form mount, the persistence, the single-alert retry, the kept
  password), the reset-submit ride identical modulo the role, the
  header family re-proven on the current reference (the session-20
  pins hold on / and /login; the reference ships nosniff ONLY there —
  ours keeps it on all five surfaces, the security superset R-20f;
  the records: the platform's 400 vs our canonical 401, the endpoint
  shapes, the real-account sent card unverifiable — no email side
  effects)) — and google-fallback — the round-21 battery that pins
  the Google button's honest fallback face (R-21a, the record: the
  reference's "Continue with Google" is a REAL Google OAuth redirect —
  live-ridden via the intercepted navigation: the click navigates the
  main frame to the platform's `/api/apps/auth/login?from_url=…&
  app_id=…` document endpoint whose 302 Location is the full
  accounts.google.com/v3/signin/identifier?client_id=185178814199-
  6a35e9aqcmlm15ig0upncg07c91av8do…&redirect_uri=https://app.base44.
  com/api/apps/auth/callback&scope=openid+email+profile&prompt=
  select_account URL — UNIMPLEMENTABLE in the self-hosted clone, the
  redirect_uri is registered to base44's Google app; F-21a, the
  coverage catch: the fallback was UNPINNED — the battery pins the
  handler's exact toast call (title + description + the info
  variant), the never-submits `type="button"`, the keeps (the class
  mount, the G glyph, the span), and the no-navigation contract) — and
  viewport-faces — the round-22 battery that pins the
  INTERMEDIATE-VIEWPORT family (R-22a, the record: the two breakpoint
  boundaries no probe ever visited — every probe since session-199
  read 1280 and 390 only; the sm (640) and md (768) boundaries carry
  whole computed families: the landing's header flip — the mobile
  menu's own retirement boundary — the hero h1's text ladder
  (48px→72px), the grid flips, the auth card's whole sm:/md: family
  (h-11 sm:h-12 inputs, p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10 inner
  pads, the sm:hidden trailing spacer), the toast viewport's own
  breakpoints (bottom-right from sm, max-w-420 from md), and the html
  font-size — the v4 REM-BREAKPOINT CARRIER: v3's media queries were
  px-based, v4's are rem-based — at the 16px default they agree, and a
  declared root size would shift every boundary on OUR build only;
  F-22a, the coverage catch: none of the boundary faces carried a pin
  — the battery pins the landing's breakpoint-class family, the
  LOGIN_LAYOUT sm:/md: contract, the toast viewport's breakpoint
  string, and the root-font-size PURITY (no declared font-size on
  html/:root — the UA 16px default IS the rem-breakpoint carrier)) — and
  anchor-faces — the round-23 battery that pins the ANCHOR-NAVIGATION/
  DEEP-LINK family (R-23a, the record: the desktop hash-link rides no
  probe ever rode — the five nav links, the header CTA, the hero CTA
  pair, the logo's #, all IDENTICAL on both apps incl. the settled
  landings; R-23b: the reference's DEEP LINKS ARE BROKEN — its SPA
  shell renders the sections after the browser's one-time boot-time
  hash scroll, so /#portfolio and /#about never scroll there; OURS
  lands the native SSR scroll, the working superset, the round-18
  soft-404 precedent; F-23a: the coverage catch — the battery pins the
  five section-id targets, the hero-CTA/logo href wiring, the
  scroll-margin/scroll-padding PURITY, and the no-dynamic-import
  SSR-boot keep) — and
  document-assets — the round-24 battery that pins the DOCUMENT-ASSET/
  META family (the domain transformation's blind spot: the favicon/
  install icons had shipped the PRIOR-DOMAIN NEO-CRM BrandMark and the
  og-image the NEO-CRM dashboard screenshot, both carried verbatim and
  never censused; the record correction: the reference's RENDERED head
  ships the full meta family on every public route (runtime-injected —
  the raw SPA shell carries none, which is how the stale "ships no SEO
  family" record survived), its description the TEMPLATE's marketing
  copy; the battery pins the byte-mirrored logo/og-image sha1s + IHDR
  dims, the SITE_DESCRIPTION mirror, the de-spaced signup title + the
  bare reset title + the factory's social titles following the
  absolute title, and the no-icons-field favicon-link keep) — and
  route-mechanics — the round-25 battery that pins the URL/ROUTE-
  MECHANICS family no probe ever rode (the 404's own TITLE
  derivation: the reference's CURRENT build derives the unknown-route
  title from the pathname — "Verify Email | EleganceFlow" at
  /verify-email — the D-194a4 "bare brand on the 404" record was
  stale for the current bundle; the battery pins the ten-case
  derivation rule (last-segment, [-_]→space, camel-split,
  title-case), the empty-word edges, the NotFoundBody write + the
  event-driven re-win (the round's live decode: FOUR candidate
  wirings revert — the bare assignment, the rendered element, the
  foreign prepend, the zero-tick timer — the late asynchronous title
  write beats them all; the MutationObserver re-wins from any
  mechanism at any latency), and the not-found no-metadata +
  layout-default keeps) — and
  reset-faces — the round-26 battery that pins the /reset-password FACE
  family no probe ever rode (the platform-auth census: the reference's
  reset route renders the base44 PLATFORM's own family — 44px/6px/gray
  controls on a flat gray-50 page in a white rounded-lg shadow-lg card,
  the FIXED 48/48/40 inner, the 24px h2 gray-900 headings, the
  zinc-500 placeholder, the Title-Case text quartet, the 2px gray-900
  strip on the token form alone, the red-100 80×40 icon on the
  invalid-link card — a DIFFERENT design system from its own login
  card; the session-163 login-family expression retired; the battery
  pins the RESET_LAYOUT seam literals + the DOM-case text family + the
  BreadcrumbList third carrier + the a11y superset keeps + the
  retired-form regression) — and
  reveal-faces — the round-28 battery that pins the SCROLL-REVEAL
  family no probe ever censused (the reference's twenty-element motion
  identity: the hero mount cascade, the about/services/portfolio/
  testimonials/contact reveal specs, the two inline states, the
  services own-class decode, the settle cleanup, the no-wiring
  negatives, and the SSR no-FOUC contract) — and
  reduced-motion-faces — the round-29 battery that pins the
  PREFERS-REDUCED-MOTION census (the media condition no probe ever
  emulated: the reference ships zero reduce handling — its raf reveal
  still animates under reduce, services 0.3s / header 0.5s at full
  duration — vs OUR globals-block 0.01ms collapse (computed 1e-05s),
  the deliberate a11y superset; the delay-survival contract — the
  block kills durations, never delays, so the cascade's staggered
  snaps still space; the seam purity — no matchMedia, no
  motion-reduce, the reduce behavior flows from the global block
  alone; and the PAD doc-stratum cures — the 18-module Layer-1 list
  and the reveal-family REPRODUCED record) — and
  body-ink-faces — the round-30 battery that pins the BODY-INK/
  PRINT-MEDIA census (the element no probe ever read under a condition
  no probe ever emulated: the BODY element's own color face — the
  round-13 single-token compromise's sacrificed side, REF neutral-950
  rgb(10,10,10) vs OURS zinc-950 rgb(9,9,11), DEAD on both sides with
  zero true riders; the no-rider construction — every visible text
  carries explicit ink; and the print census — both apps ship zero
  @media print rules, the reference's own zero-handling posture) — and
  error-faces — the round-27 battery that pins the CRM-BLUE/
  RESILIENCE-BOUNDARY family no probe ever censused (the token-axis
  blind spot of the session-199 domain transformation: the login card's
  logo was the CRM-era bg-sidebar #2563eb blue dot where the reference
  renders its real 283cae1f1_logo img — the same asset the round-24
  icons byte-mirror, self-hosted at /icon.png, never their CDN; the
  error boundaries' Try-again buttons rode the NEO-CRM bg-primary
  blue family; the boundary h1 computed 1.42:1 — a WCAG 1.4.3 fail on
  OUR OWN surface — now slate-500, the ratios COMPUTED from the live
  @theme hex; the seven CRM-blue @theme tokens retired, the toast's
  info icon re-pinned to --color-info; the ERROR_LAYOUT seam = the
  404's own construction + its pill family, the house dialect the
  boundaries' comments always claimed) —
  comment-stripped source reads; a
  literal pinned by a comment alone is vacuous.
- **E2E — Playwright, 115 checks / 8 specs**: the standalone artifact on
  :3100 with `db/e2e.db`; ONE shared login (`auth.setup.ts` →
  storageState — the auth endpoints are rate-limited 10/IP/15-min); one
  worker; alphabetical file order → every spec SELF-SUFFICIENT (its own
  probe rows on an isolated `x-forwarded-for` bucket). The specs:
  landing (round-12 gains the image-census check — the landing's full
  rendered img set pinned against the reference's live photographs;
  round-14 gains the preflight-face check — the form's placeholder ink,
  background and the nav link's transition-property pinned against the
  reference's v3-preflight computed faces; round-15 gains the
  motion/glyph check — the html element's scroll-behavior computes
  smooth + the testimonial quote renders the straight-quote pair;
  round-16 gains the attribute/geometry checks — the hero's bounding
  boxes (the content column IN-CANVAS at both viewports, the 800px
  hero), the leading-decode computed faces (36px/28px at md+,
  33px/29.25px at phone), the native-validation + glyph pins (the
  empty submit never leaves the page, the reference's palette and
  phone shapes); round-19 gains the success-panel check — the submit
  REMOVES the form and renders the reference's in-place panel (the
  48px icon, the h3/p pair, no floating toast, the bare right-column
  wrapper)),
  round-22 gains the two boundary rides — at 640 the hamburger family
  still rides below md, at 768 the header flips and the h1 steps to
  72px; round-23 gains the four ANCHOR-NAVIGATION/DEEP-LINK rides —
  the cold-boot /#portfolio deep link lands the section with the
  scrolled header (OUR superset: the reference's SPA never scrolls its
  deep links — R-23b), the desktop nav ride (Work → #portfolio, the
  non-obvious mapping ridden behaviorally), the hero CTA ride
  (Start a Project → #contact), and the logo # ride (back to top, hash
  cleared, the header restored),
  mobile-navigation (THE operator's standing emphasis — the full
  390×844 battery), auth, reset-password, dashboard-inbox, keyboard
  (the round-10 keyboard-operability battery — the keyboard rides plus
  the focus-visible computed faces), inbox-states (the round-11
  state-face + client-error battery — the five state faces ridden via
  route interception plus the zero-console/page-error census on the
  clean surfaces, with the designed 404's sanctioned register), a11y
  two-gate.
- **Smoke — `scripts/smoke-test.sh`, 14 rungs**: the artifact on :3210 with
  `db/smoke.db` — health, the 401 walls, SSR faces, the login round-trip,
  Zod 400, public inquiry 201, logout, 429, the SEO family, the
  secretless-boot refusal, artifact hygiene.
- **Parity — `scripts/parity-199.ts`**: the live computed-style diff (§2).

## 8. The mobile menu (the standing emphasis)

At 390 the header collapses to the hamburger + "Open menu". The toggle opens
the reference's INLINE disclosure panel (NOT a drawer): five nav links +
the amber CTA on `md:hidden bg-zinc-950 border-t border-white/10`; every
link click NAVIGATES AND CLOSES; `aria-expanded` carries the state.
`tests/e2e/mobile-navigation.spec.ts` pins every behavior — if it fails,
fix the menu, never the test.

## 9. Extending and debugging

- New content → `src/lib/site-content.ts` (DOM-case) + pin it in
  `tests/site-content.test.ts`; new body contract → `src/lib/schemas.ts`
  (Zod) + pin the error messages.
- New route → the envelope (`src/lib/api.ts`), `parseBody`, limiter-first
  ordering, try/catch → `ERR.INTERNAL()`.
- New color → join the `@theme` re-pin block (§3) or prove byte-equality.
- The classic e2e trap: a stale standalone server — always `CI=1` (forces a
  fresh boot; `reuseExistingServer` otherwise reuses stale code).
- The classic 429 trap: repeated local runs exhaust the per-IP/15-min
  buckets — wait the window.
- Push: main only, over SSH via `python3 docs/ssh_git_wrapper_v3.py
  --key-file <key>` (see `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`;
  sandboxes without an OpenSSH binary deploy the Appendix-A paramiko shim).
  Never commit keys, the shim, `db/`, logs, or test artifacts.
