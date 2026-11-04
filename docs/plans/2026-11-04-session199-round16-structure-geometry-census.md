# Session 199 — Round 16: THE FRESH-CONTEXT RE-VALIDATION + THE ATTRIBUTE/GEOMETRY CENSUS (2026-11-04)

The rotation trigger: the owner's newest commit (`afb2ec2` "update session log")
adds `docs/session_26.md` — the raw narration transcript of the round-15
session. This round: pull at `afb2ec2`, re-internalize the doc set, re-prove
the gate + the live parity/drift bars + the mobile-menu census, audit with a
fresh angle, then close the attribute/geometry class the fresh angle surfaces.

## Phase 0 — The intake (Verified)

- Workspace refreshed at `afb2ec2` (the delta from round-15's ship `8d809ea`
  is `docs/session_26.md` alone — a doc, no code). Environment: `.env`
  carries the mandated contract `DATABASE_URL="file:../db/custom.db"`
  (`db/` at the repo root), census **MATCH (3 + 4 users)**. The doc set
  re-internalized (AGENTS · CLAUDE · README · PAD v2.0 · the skill v1.199.0 ·
  the worklog · session_25 + session_26 · the round-15 plan · the
  web-application skill + the catalog · the Tailwind v4 report · the
  ssh-wrapper runbook). The neo-crm lineage repo stands as the tech-stack
  pattern reference — the patterns already carried verbatim (no new
  tech-stack surface; recorded).

## Phase 1 — The status validation (Verified — every claim re-proven)

| Doc claim | Live evidence |
| --- | --- |
| lint 0/0 · tsc 0 | Both green at HEAD |
| Unit 443/443 (35 files) | `bun run test` — 443 passed |
| Build 22 routes | Route table counted |
| Smoke 14/14 | The ladder green on :3210 with `db/smoke.db` |
| E2E 76/76 (8 specs) | `CI=1 bun run test:e2e` — 76 passed |
| Live parity COMPUTE IDENTICAL | `scripts/parity-199.ts` at 1280 + 390 |
| Drift NO DRIFT (all four legs) | `scripts/drift-199.ts` (content+mobile · auth · preflight · motion) |
| Mobile-menu census (link-ride) | byte-equivalent on both apps; link-ride navigates AND closes; sole delta OUR aria-expanded |
| Census MATCH 3+4 | `bun run db:census` (resolved path printed) |
| skills/ excluded | tsconfig `exclude`, eslint `ignores`, vitest include-allowlist, playwright `testDir` |
| Advisory ledger 10 (4 high · 5 moderate · 1 low) | `bun audit` — all dev-toolchain transitive; runtime zod ^4.6.7 patched; no security driver |

No Tailwind v4 bug in the EIGHT pinned traps. The standing config asks
re-verified live: the `.env`/db-path contract, the vitest/playwright configs,
the sitemap/SEO family (smoke rung 12), `.env.example` var-by-var (byte-equal
to `.env`), the TODO/FIXME sweep clean.

## Phase 2 — The audit findings (the fresh angle: the ATTRIBUTE/GEOMETRY census — the faces no probe reads: parity-199 reads ~40 computed at-rest styles, the drift probe reads text/img-src/login/preflight/motion faces, the e2e battery rides behaviors, the smoke ladder curls HTML — NOTHING ever read (1) every element's raw ATTRIBUTE set (hrefs, targets, rels, input types, novalidate, img loading/geometry), (2) the bounding GEOMETRY of the sections (layout identity, not style identity), (3) the computed LINE-HEIGHT sweep (the leading scale), (4) the ICON GLYPH fingerprints (the svg path data), (5) the form's VALIDATION-MODE behavior)

**F-16a (CRITICAL, VISIBLE, functional, BOTH viewports — the parity-gated
public surface AND the phone): the HERO BACKGROUND STRUCTURE.** The
reference's hero nests its background photo inside a wrapper —
`<div class="absolute inset-0"><img class="w-full h-full object-cover
opacity-30"><div class="absolute inset-0 bg-gradient-to-r …"></div></div>` —
taking the img OUT of the flex flow; OURS renders the `<img>` (and the
gradient) as DIRECT section children, making the photo a second IN-FLOW FLEX
ITEM. The measured consequence (dev server AND the standalone artifact):
the `relative max-w-7xl mx-auto px-6 pt-32 pb-20` content column computes
its min-content width (410px at 1280 / 229px at 390) and is pushed
ENTIRELY OFF-CANVAS (x=1280 at desktop, x=390 at phone — the h1, the
eyebrow, the paragraph, both CTAs are CLIPPED by the section's
`overflow-hidden`); the hero renders 1008px tall at 1280 (vs 800) and 927
at 390 (vs 844); the photo itself rides in-flow (y=18, h=973 by intrinsic
ratio at 1280; y=315, h=296 at 390) instead of absolutely covering the
section ([0,0,1280,800] / [0,0,390,844] on the reference); the body scroll
heights diverge (+234 at 1280 = 208 hero + 26 testimonials; +82 at 390).
ALSO the scroll indicator: the reference's `absolute bottom-10 left-6`
label div sits INSIDE the content column (parent = the `relative max-w-7xl`
div → renders at [256,719] on the reference); OURS sits at section level
([24,952]) — a second visible-position divergence that survives the
wrapper cure unless the label moves too. Invisible to every gate: parity
reads computed styles (identical — the class strings match); the e2e hero
test uses `toBeVisible()` (a non-empty bounding box passes off-canvas) +
`toContainText` (DOM-only); smoke rung 5 curls the SSR HTML; the drift
probes read text/src/faces, never geometry; the capture refreshes verified
non-blank regions, never the hero's pixel content. The only pure-DOM
divergence on the whole landing (the normalized tree census).

**F-16b (HIGH, VISIBLE): the `leading-snug` × `md:text-3xl` decode (the
trap-⑥ genus, two NEW members).** The testimonial quote paragraph
(`text-white text-2xl md:text-3xl font-semibold leading-snug`) computes
**41.25px** on our v4 build (1.375 × 30) where the live reference computes
**36px** — its v3-era cascade makes the plain `.leading-snug` rule LOSE to
its media-block `.md\:text-3xl` rule at md+ (v3's text-3xl pairs
font-size 30px with line-height 36px, and media rules sort after the plain
leading rule), while our v4 sorts the leading utility LAST at every width.
Below md both compute 33px (verified at 390). The 5-line quote renders
206px tall vs the reference's 180px — the ENTIRE +26px testimonials
section delta, proven by the leading sweep.

**F-16c (HIGH, VISIBLE): the `leading-relaxed` × `md:text-xl` decode (the
same genus).** The hero paragraph (`text-white/60 text-lg md:text-xl
leading-relaxed max-w-xl`) computes **32.5px** on ours (1.625 × 20) where
the reference computes **28px** (v3's text-xl pairs 20px with 28px, and the
media rule wins in its cascade). Below md both compute 29.25px (verified).
The h1/h2 family carried this decode from session-199 (`leading-[0.9]
md:leading-none`); these two carriers were never decoded.

**F-16d (MEDIUM, VISIBLE, behavioral): the contact form's VALIDATION MODE.**
Our `<form … noValidate>` skips native validation — an EMPTY submit FIRES
the submit event and POSTs to `/api/inquiry` (400 → our error toast),
probe-verified live (`submitEventFired: true, posts: ["/api/inquiry"]`).
The reference's form (no noValidate, same four `required` controls, same
default-submit button) NATIVE-VALIDATES: the submit event never fires, no
POST leaves the page, the browser paints its validation bubbles
(`submitEventFired: false, posts: []`, `checkValidity: false ×3`). The
reference's own required-count multiset matches ours (the attribute
census) — only the mode diverges.

**F-16e (HIGH, VISIBLE, glyph family): the ICON-GLYPH census — our
lucide-react 0.525 ships REDESIGNED glyphs where the reference ships its
older lucide-era set.** The full svg-by-svg census (18 landing icons,
index-matched): **13 identical**; the menu icon differs only in internals
(`<line>` vs `<path>` — SAME painted geometry, record-only); FOUR glyph
pairs are VISIBLY different drawings: `palette` (28px, the services card:
the reference's circles-and-body vs our new teardrop blob), `megaphone`
(28px: the reference's horn-and-handle vs our new solid horn with sound
waves), `mail` (16px, the contact link AND the auth email-input family:
the reference's `1.94`-radius arc vs our `2.009`), `phone` (16px: the
reference's classic handset vs our new continuous-stroke handset). PLUS
the login card's Google G: ours is the 23.5-based redrawn quartet, the
reference ships the classic 22.56-based quartet. The glyph face is a
visible byte-parity surface (the round-15 quote-glyph precedent).

**The records (no cure):** the accent bar's class-vs-inline-style (ours
`bg-amber-500`, the reference `style="background-color: rgb(245, 158, 11)"`
— the F-15b genus, identical computed face); our 8 explicit
`type="button"` (the reference carries no type — inert outside forms);
the OPTION `selected` attr (same rendered face); `initial-scale=1` vs
`1.0` in the viewport meta (same semantics, the platform's serialization);
our 18 `aria-hidden` icon supersets; the reference's auth-card `transform`
class (v3's translate carrier — our v4 decodes without it, computed face
verified by the drift login leg).

**The positive censuses (clean, first time probed):** every OTHER
section's geometry IDENTICAL at 1280 (about 1018 · services 806 · contact
711 · footer 137); the img attribute family null-on-null (loading/
decoding/width/height/fetchPriority) with identical natural sizes; the
fonts/caret-color/accent-color/color-scheme/::selection families
identical; the hero photo's src+alt byte-identical (round-12's pins
re-proven); the login Lock glyph + the 13 shared landing glyphs identical.

## Phase 3 — The remediation ToDo list

1. **[R-1, TDD — the geometry/structure source-contract battery]** Create
   `tests/geometry-faces.test.ts` (comment-stripped source reads, the
   house pattern): ① the hero-wrapper pin (landing-page.tsx wraps the
   bg `<img>` + the gradient div in `<div className="absolute inset-0">` —
   the reference's own structure); ② the img-out-of-flow negative (the
   `<img` never appears as a direct hero-section child — the wrapper-only
   form); ③ the scroll-label parent pin (the `absolute bottom-10 left-6`
   div sits INSIDE the content column, after the CTA row — the
   reference's own nesting at [256,719]); ④ the leading-decode pins
   (the quote P carries `leading-snug md:leading-9`; the hero P carries
   `leading-relaxed md:leading-7` — the 36px/28px computed faces); ⑤ the
   validation-mode pin (the form carries NO `noValidate` — the reference
   native-validates) + the retired-form regression; ⑥ the icon-glyph pins
   (the reference-exact path data at the four landing glyph sites — the
   palette body `M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 …`, the
   megaphone pair `m3 11 18-5v12L3 14v-3z` + `M11.6 16.8a3 3 0 1
   1-5.8-1.6`, the mail pair `m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7`
   + the rect, the phone handset `M22 16.92v3a2 2 0 0 1-2.18 2 …`);
   the retired new-lucide forms never return; ⑦ the GoogleIcon pin (the
   22.56-based quartet + the retired 23.5 forms never return). **Born RED
   on the live tree** (all seven classes fail on the real divergences).
2. **[R-2, the cures]** `landing-page.tsx`: the hero wrapper div; the
   scroll-label div moved inside the content column; `leading-snug` →
   `leading-snug md:leading-9`; `leading-relaxed` → `leading-relaxed
   md:leading-7` (mechanism comments, the trap-⑥ record); drop
   `noValidate`. NEW `src/components/ui/reference-icons.tsx`: the four
   reference-exact glyph components (the reference's own svg skeleton +
   children, `aria-hidden` kept — the documented superset) replacing
   `Palette`/`Megaphone` in SERVICE_ICONS and `Mail`/`Phone` at the
   contact links. `login-card.tsx`: the GoogleIcon quartet re-pinned to
   the reference's exact paths; the four Mail usages → the reference
   glyph.
3. **[R-3, the live-probe cure — the geometry joins the drift bar]**
   Extend `scripts/drift-199.ts` with the GEOMETRY census leg (both apps,
   1280 + 390): the hero section rect, the content-column rect (the
   off-canvas detector), the h1 rect, the quote-P + hero-P computed
   line-heights, the form's noValidate, the four glyph fingerprints + the
   Google G fingerprint on /login. Run it BEFORE the R-2 cure → **DRIFT
   DETECTED on the real bugs**; after → **NO DRIFT** on all five legs.
4. **[R-4, the e2e legs (+3)]** Extend `tests/e2e/landing.spec.ts`: ① the
   hero geometry pin on the standalone artifact (the content column
   IN-CANVAS at 1280×800 — x=232, the hero section exactly 800 tall, the
   h1 box at x=256/w=768; at 390×844 the content column x=0/w=390); ② the
   leading-decode pins (the quote P computes 36px and the hero P 28px at
   1280; 33px / 29.25px at 390); ③ the validation-mode + glyph pin (the
   form's noValidate is false; an empty submit fires NO submit event and
   NO network POST; the palette path data begins `M12 2C6.5`).
5. **[R-5, count ladder]** Unit 443/35 → 443+N/36; e2e 76/8 → 79/8 — the
   count-ladder battery enforces the re-anchor at EVERY live-tense site
   (AGENTS · CLAUDE · README · PAD §3.2/§7.1/§7.3/§10 · SKILL §7 · the
   worklog Stage Summary) + the geometry-faces family in the CLAUDE/SKILL
   prose lists + the ladder's SOURCE_CONTRACTS.
6. **[R-6, mutation proof]** The battery must BITE: the wrapper dropped
   (①② RED) · a leading decode reverted (④ RED) · noValidate restored
   (⑤ RED) · a glyph reverted to the new-lucide form (⑥ RED) · the
   GoogleIcon reverted (⑦ RED) · the scroll label moved back to section
   level (③ RED) · the live drift leg re-run on a reverted tree (DRIFT)
   · the e2e legs (the wrapper mutation rebuilt into the artifact → the
   geometry pin RED; the leading mutation → the line-height pin RED; the
   noValidate mutation → the validation pin RED). All files restored
   byte-identical (the /tmp-backup harness, cmp-verified).
7. **[R-7, captures]** Re-run `scripts/capture-199.ts` — the hero content
   column renders IN-CANVAS for the first time; the desktop + phone
   fullpage captures and the mobile-menu faces change materially.
8. **[R-8, doc lockstep]** `docs/session_27.md` (the session_25 house
   pattern) + the worklog round-16 lines + this plan's execution record;
   PAD §10 records the round-16 close; the trap-⑥ expansion (two more
   leading members) at AGENTS/SKILL/the Tailwind report; the icon-era
   record (the reference-glyph components) in CLAUDE/SKILL/README; the
   records (type=button · OPTION selected · viewport-meta · menu
   internals) in the session log.
9. **[R-9, gate re-proof]** The full chain re-run after the changes:
   `bun run gate` + `CI=1` e2e + the live parity/drift/mobile probes
   (parity stays green — no probed at-rest computed style changed; the
   drift bar now carries the geometry leg).
10. **[R-10, ship]** One atomic commit on main; push via
    `python3 docs/ssh_git_wrapper_v3.py --key-file <key> --remote
    git@github.com:nordeim/elegance-flow.git` (the round-11 `--remote`
    lesson); remote ref verified == HEAD; the operator key shredded
    after; the scratch probe scripts removed.

## Phase 4 — The verification bar

- The unit battery born RED on the real divergences, GREEN after the
  cures, and proven to bite by mutation; the drift probe's geometry leg
  red on the pre-fix tree, NO DRIFT after (all five legs); the e2e legs
  green on the standalone artifact (79/79).
- The gate green at ship; the parity/mobile bars re-proven (the landing's
  probed at-rest element faces untouched — the cures move structure, not
  computed styles); the count ladder consistent everywhere; the push
  verified; the working tree clean; no key/shim/db/log artifacts staged.

## Phase 5 — The execution record (filled at ship)

- **R-1 born RED 18/19 on the live tree** — the hero wrapper (×2), the
  scroll-label nesting (×2), the leading decodes (×2), the validation
  mode (×1), the glyph paths/skeleton (×5), the glyph sites + the
  import negative (×3), the GoogleIcon quartet + its retired forms
  (×2), the auth Mail swap (×1) all failed on the real divergences;
  the one keep-green (the new-lucide path data never appears in OUR
  source — the divergence rode the lucide-react package) passed by
  design. Two harness finds, recorded in the worklog's LIVE FINDS: the
  `.test(` census-collision bit a third time (the count-ladder counts
  regex method calls — `.match` again), and the born-RED split needed
  a tolerant read for the module the cure ships (catch-to-"" so the
  content checks fail honestly instead of erroring the battery at
  import).
- **R-2 the cures**: the hero wrapper div (img + gradient inside
  `absolute inset-0`) + the scroll label moved INSIDE the content
  column in landing-page.tsx; `leading-snug md:leading-9` +
  `leading-relaxed md:leading-7` (the h1/h2 decode precedent, the
  mechanism comments at both sites); the `noValidate` drop;
  `src/components/ui/reference-icons.tsx` (the four reference-exact
  glyphs on the exact lucide skeleton) swapped in at the six glyph
  sites (the services palette/megaphone, the contact mail/phone, the
  auth mail family); the login GoogleIcon re-pinned to the reference's
  22.56-based quartet. The battery 19/19 GREEN after.
- **R-3 born-RED live proof**: the extended drift probe ran against
  the PRE-FIX tree (the /tmp-backup harness: the cures backed up, the
  sources restored to HEAD, the untracked modules moved aside) →
  **DRIFT DETECTED on 20 fields across both viewports** (heroRect
  1008/927 vs 800/844 · contentX 1280/390 vs 232/0 · h1Rect ·
  scrollLabelX · quoteLh 41.25 vs 36 · heroPLh 32.5 vs 28 ·
  formNoValidate · the four glyph fingerprints · the Google-G
  fingerprint); after the cures → **NO DRIFT on all five legs**
  ([390] content+mobile · [login] auth-card · [preflight] form-face ·
  [motion] motion/glyph · [geometry] the new census at BOTH viewports
  + the login G). All files restored byte-identical (`cmp`-verified).
- **R-4 the e2e legs**: +3 checks in `tests/e2e/landing.spec.ts` — the
  hero geometry pin (the content column IN-CANVAS at both viewports,
  the 800px/844px hero, the h1 box [256,197,768,288], the label span
  inside the column), the leading-decode pins (36px/28px at md+,
  33px/29.25px at phone), and the native-validation + glyph pin (the
  empty submit fires NO POST; the reference's palette/phone shapes
  render) — green on the standalone artifact (79/79 after the clean
  rebuild).
- **R-5 the count ladder re-anchored 443/35 → 462/36 (13 seam/196 +
  23 source contracts/266) + 76/8 → 79/8 (e2e)** at every live-tense
  site (AGENTS · CLAUDE · README · PAD §7.1 table + the tree-diagram
  line + the gate command lines + §10 · SKILL §7 · the worklog Stage
  Summary) + the geometry-faces family in the CLAUDE/SKILL prose lists
  + the ladder's SOURCE_CONTRACTS list (the four lockstep checks went
  RED by design until the re-anchor; 462/462 GREEN after).
- **R-6 the mutation proof: 6/6 unit classes bite + the live drift
  leg + the e2e leg** — M1 the hero wrapper dropped (2 RED: ①②) · M2
  the quote decode reverted (1 RED) · M3 noValidate restored (1 RED) ·
  M4 the palette glyph reverted to the new-lucide body (2 RED: the
  path pin + the retired-form negative) · M5 the GoogleIcon quartet
  reverted (2 RED) · M6 the scroll label moved back to section level
  (2 RED: ③ both) — the live drift leg (the pre-fix world
  re-detected: the 20-field DRIFT; restored → NO DRIFT all five legs)
  — the e2e leg (the M1 wrapper mutation rebuilt into the artifact →
  the round-16 geometry pin RED on the real :3100 world; restored,
  rebuilt) — all files restored byte-identical via the /tmp-backup
  harness (`cmp`-verified).
- **The positive censuses recorded**: every OTHER section's geometry
  IDENTICAL at 1280 (about 1018 · services 806 · contact 711 · footer
  137); the img attribute family null-on-null with identical natural
  sizes; the fonts/caret-color/accent-color/color-scheme/::selection
  families identical; the hero photo's src+alt re-proven (round-12's
  pins); 13 of 18 landing glyphs + the auth Lock identical.
- **The records**: the accent bar's class-vs-inline-style (F-15b
  genus, identical face — keep) · our 8 explicit `type="button"`
  (inert outside forms) · the OPTION `selected` attr ·
  `initial-scale=1` vs `1.0` · our 18 `aria-hidden` supersets · the
  reference's auth-card `transform` class (the v3 translate carrier).
- **The advisory ledger held at 10** post-cure (all dev-toolchain
  transitive; no security driver).
- **R-7 the captures refreshed** — the 6 `ours-*` faces; the hero
  content column renders IN-CANVAS for the first time (the desktop
  fullpage capture carries the eyebrow/h1/CTAs that 15 rounds of
  gates never saw).
- **R-8 the doc lockstep**: `docs/session_27.md` (the session_25 house
  pattern) + the worklog round-16 lines + the LIVE FINDS additions +
  this execution record; PAD §10 gains the round-16 re-validation
  clause; the trap-⑥ expansion at AGENTS/SKILL §3 + the Tailwind
  report's round-16 appendix; the count re-anchors at every live-tense
  site.
- **R-9 the gate re-proof**: lint 0/0 · tsc 0 · **462/462 (36 files)** ·
  build (22 routes) · smoke 14/14 · e2e **79/79 (8 specs)** · parity
  COMPUTE IDENTICAL (both viewports) · drift NO DRIFT (all five legs)
  · the mobile census byte-equivalent.
- **Shipped** as one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --remote git@github.com:nordeim/elegance-flow.git`
  (the round-11 `--remote` lesson applied), remote verified == HEAD,
  key shredded, the scratch probe scripts removed.
