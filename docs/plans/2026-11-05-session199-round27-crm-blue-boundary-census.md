# The Round-27 Remediation Plan — the CRM-BLUE/RESILIENCE-BOUNDARY census (session-199)

**The round's fresh angle:** the surfaces and tokens no probe ever censused —
the login-card LOGO face (the drift [login] leg reads
card/google/divider/input/submit only; no unit pin, no e2e leg), the
ERROR-BOUNDARY family's own visual faces (the error-boundaries battery pins
the wiring + copy vocabulary only — never the classes), the @theme token
axis (the dead-code-census battery pins devDeps + @utility consumers, never
@theme token consumers), and the post-404 TITLE ride (the round-25 e2e leg
pins the derived title at rest; nothing pins the title AFTER the navigation
away). The round's candidate list (the round-26 log's own suggestion) named
this family first.

## The census (round-27 discovery probes — both apps, guest-only GETs; the boundary ride attempted two ways on the standalone artifact)

- **F-27a (HIGH, VISIBLE — the login-logo blue dot)**: the reference's
  login card renders its REAL logo — an `<img
  src="…base44…/283cae1f1_logo.png/v1/fit/w_192,h_192/…webp" alt="EleganceFlow
  logo" class="aspect-square h-full w-full object-cover">` (96×96, object-fit
  cover) inside the same `flex shrink-0 overflow-hidden rounded-full relative
  h-20 w-20 sm:h-24 sm:w-24 shadow-lg ring-4 ring-white/50
  group-hover:shadow-xl transition-all duration-300` circle span — the SAME
  283cae1f1_logo the round-24 asset cure already byte-mirrors to
  src/app/icon.png. OURS renders a 40×40 `bg-sidebar` (#2563eb) blue dot —
  the CRM-era sidebar-blue "CSS brand mark" (white circle + blue dot)
  construction. A visible divergence on the parity-gated surface that every
  gate missed: the drift [login] leg never reads the logo, no unit pin
  exists, no e2e leg reads it.
- **F-27b (HIGH — the boundary's CRM-blue button)**: the error-boundary
  "Try again" buttons ride `bg-primary hover:bg-primary-hover
  focus:ring-primary` — `--color-primary: #2563eb` (blue-600), the NEO-CRM
  brand-blue family the round-24 icon cure retired from the assets; the
  token survived because the boundary family (the surfaces no probe ever
  censused) still consumes it. The boundary's own doc comment claims "the
  styling mirrors the reference's own 404 family (the slate centered card
  … the NOT_FOUND_LAYOUT idiom)" — but the card rides inline literals and
  the button is the domain's only blue element.
- **F-27c (HIGH, AA — the boundary h1 contrast fail)**: the boundary h1
  "Something went wrong" rides `text-slate-300` (#cbd5e1) on `bg-slate-50`
  (#f8fafc) = **1.42:1** — fails WCAG 1.4.3 AA (3:1 even for large text) on
  OUR OWN superset surface (the house doctrine: our surfaces pass AA
  outright; the a11y two-gate audits landing/auth/workspace only). The
  404's own "404" numeral keeps slate-300 — the REFERENCE's own face (the
  s12 byte-pin, the sanctioned class; never "fixed").
- **F-27d (HIGH, DRIFT — the stale 404 title after Go Home)**: live-probed
  on the standalone artifact: after the Go Home client nav from a 404, OURS'
  derived title PERSISTS on the landing ("Probe 404 | EleganceFlow" at "/");
  the reference's SPA resets to **"EleganceFlow"** (live-ridden: its Go
  Home button → "/" → the bare brand). Root cause: React's `<title>`
  reconciliation SKIPS the DOM write when the incoming route's resolved
  title equals React's own record — the 404 (no metadata export, the
  D-194a4 retirement) and the landing BOTH resolve the layout-default
  "EleganceFlow", so React never rewrites the title node our observer
  mutated; the observer is disconnected at unmount and nothing corrects the
  DOM.
- **F-27e (the @theme straggler census — the domain transformation's
  token-axis blind spot)**: after the F-27a/b cures, the CRM-brand token
  family loses its consumers: `--color-sidebar` (#2563eb, the logo dot was
  the last consumer), `--color-sidebar-hover`, `--color-sidebar-active`,
  `--color-brand` (zero consumers already — the NEO-CRM reference's
  marketing token), `--color-primary-hover` (the boundary buttons), and
  `--color-primary-foreground` (zero consumers already) — all RETIRED.
  `--color-primary`'s last consumer is the toast's info icon
  (`text-primary`); the Feedback block already owns the semantic slot
  (`--color-info: #06b6d4`) — the icon re-pins to `text-info` (the
  conventional info status ink; the icon is redundant with the toast's
  title/description text so WCAG 1.4.11 exempts it). The @theme header's
  stale CRM record ("Brand palette … session-7 live computed-color probe:
  primary buttons render rgb(37,99,235)") corrected.
- **F-27f (the coverage catch + the unverifiable member)**: NONE of the
  family carried pins — the boundary visual family, the login logo, the
  post-Go-Home title. The boundary itself is UNRIDEABLE on the standalone
  artifact without shipping test-only code (both experiments probed:
  poisoned chunk fetches → the router serves the nav from the prefetch
  cache; a 500 on the RSC fetch → React falls back to the full-page load,
  never the boundary) — recorded as the unverifiable member (the round-20
  precedent); its coverage rides the unit seam battery with the computed
  contrast math.

## The cures (TDD — the pin batteries born RED; the mutation proof follows)

1. **The layout seam** `ERROR_LAYOUT` in `src/lib/page-layout.ts` — the
   404's own construction as class constants (page/card/center/
   headingGroup/divider/textGroup/buttonGroup + the Go Home pill family),
   with the ONE deliberate ink change: the boundary h1 `text-slate-500`
   (4.55:1 — AA outright) where the 404's own numeral keeps slate-300 (the
   reference's face). Both boundaries ride the seam.
2. **The boundary rewrites** — `src/app/error.tsx` +
   `src/app/global-error.tsx` ride ERROR_LAYOUT (the house dialect their
   own comments already claim); the resilience posture keeps verbatim
   ("use client", the reloadOnStaleChunk wiring with [error] deps, the
   digest ref, reset(), zero component-tree imports, global-error's own
   <html lang="en"> + globals.css import).
3. **The login-logo cure** — `LOGIN_LAYOUT.logo` drops the dot-era extras
   (`bg-white items-center justify-center`) to the reference's byte class;
   the inner span replaced by `<img src="/icon.png" alt="EleganceFlow
   logo" className="aspect-square h-full w-full object-cover" />` (the
   self-hosted byte-mirror — NEVER their CDN; the round-24 doctrine); the
   span's `aria-hidden` dropped (the reference's logo is a real informative
   img with a real alt).
4. **The title-reset cure** — the not-found-body effect's cleanup:
   disconnect the observer FIRST, then reset `document.title` to the bare
   brand (the layout-default value React believes it owns) — convergent
   for every next route (a differing title → React writes it; the same
   title → already correct).
5. **The toast ink + the token retirement** — the info icon
   `text-primary` → `text-info`; the six zero-consumer CRM tokens retired
   from `@theme` (the dead-code class extended to the token axis); the
   stale header record corrected.
6. **The pins** — `tests/error-faces.test.ts` (+5, the 47th unit file):
   ① the ERROR_LAYOUT seam family + the WCAG contrast MATH computed from
   the seam's hex inks (slate-500/slate-800/slate-600 on slate-50 — the
   ≥4.5:1 bar; the 404's sanctioned numeral exempt), ② the CRM-blue
   regression (no bg-primary/ring-primary/rounded-lg-blue in the
   boundary sources; no slate-300 h1), ③ the @theme token census (the six
   retired names absent; --color-primary absent; the Feedback family
   intact), ④ the boundaries-ride-the-seam source contract (both files,
   the posture keeps), ⑤ the login-logo source contract (the img + the
   alt + the byte-class span + no bg-sidebar anywhere in src). Born RED.
7. **The re-pins** — `tests/toast-anatomy.test.ts` (text-info),
   `tests/viewport-faces.test.ts` (the LOGIN_LAYOUT.logo byte class),
   `tests/route-mechanics.test.ts` (the wiring pin gains the
   disconnect-first + bare-brand reset).
8. **The e2e legs** (+4): the login-logo face battery on the auth spec
   (the img's alt/object-fit/96×96 box/the /icon.png src — the self-hosted
   face + the no-blue-dot regression) and the Go-Home title leg on the
   landing spec (404 → Go Home → "EleganceFlow" + "/").
9. **The drift extensions** — the [login] leg gains the logo family (the
   img face diffed both apps + the src per-side constant, the
   expectConst pattern); the [routes] leg gains the post-Go-Home title
   ride (diffed both apps — IDENTICAL after the cure).
10. **The ladder + docs** — the count ladder re-locked; every root doc,
    the census battery's list, and the worklog verification line re-locked;
    the captures refreshed; the session log written.

## The execution order

R-1 the pin battery born RED → R-2 the seams + the rewrites + the cures →
R-3 GREEN + the mutation proof (5 classes bite, the /tmp backup harness) →
R-4 the e2e legs (rebuild the artifact first — the stale-standalone
lesson) → R-5 the drift extensions → R-6 the ladder + the docs → R-7 the
captures → R-8 the full gate + the live probes → R-9 the ship.
