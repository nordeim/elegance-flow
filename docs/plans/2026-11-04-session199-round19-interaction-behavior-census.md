# The Round-19 Remediation Plan — the INTERACTION-BEHAVIOR census (session-199)

**The round's fresh angle:** every probe since session-199 read at-rest
faces (parity: computed styles; drift: text/img/head/geometry/preflight)
or OUR behaviors pinned by the e2e battery against OUR artifact. The
reference's own live interactive behaviors — what its handlers ACTUALLY
do when clicked TODAY — were never census-read: the portfolio filters,
the testimonial carousel, the project cards, the header's scroll flip,
and the contact form's submit ride.

**The census (round-19 probes 1–6, both apps, 1280×800):**

- **F-19a (HIGH, VISIBLE + FUNCTIONAL — THE CATCH)**: the contact
  form's SUCCESS STATE. The reference's submit (live-ridden) fires NO
  domain POST — only base44 telemetry — and at ~400ms **REMOVES the
  form and replaces it, in place, with a persistent centered success
  panel**: `<div class="h-full flex flex-col items-center
  justify-center text-center py-16">` carrying a 48px amber
  `lucide-circle-check-big` (`mb-5`, inline `color: rgb(245, 158, 11)`),
  an `h3 class="text-2xl font-black text-zinc-950 mb-3"` → "Message
  sent!", and a `p class="text-zinc-500"` → "We'll be in touch within
  24 hours." — **no floating toast, no form-clear, no revert** (the
  panel persists 16s+; the form never returns). OURS instead kept the
  form (cleared) and showed a floating shadcn toast card bottom-right —
  a different visible construction on the parity-gated surface. The
  provenance correction: the byte-verified "Message sent!" pair is the
  PANEL's h3/p, not a toast's — the session-199 record "the reference's
  contact form only toasts" mis-read the vehicle (and the reference
  does not even POST — our persisted-row superset is stronger than
  documented).
- **F-19b (MODERATE, structural)**: the contact grid's right column —
  the reference wraps the form in a bare `<div>` grid item (`grid >
  div > form`); OURS mounts the form directly as the grid item
  (`grid > form`). Invisible at rest (the round-16 geometry census
  passed), but a DOM-mirror divergence and load-bearing for F-19a:
  the panel's `h-full` rides the wrapper.
- **The positive censuses (clean, first time probed)**: the portfolio
  filters — all four chips ride IDENTICALLY (Branding → One+Four,
  Web → Two+Five, Photography → Three+Six, All → all six; the amber
  highlight MOVES to the clicked chip on both apps; every chip's
  computed bg/ink identical in every state) · the carousel — all three
  selector rides swap the exact quote pairs, the active class matches
  modulo the recorded F-15b border decode · the project cards — a
  NO-OP on both apps (cursor-pointer with no handler, no role/tabindex
  on either; node count unchanged, no overlay, no navigation — the
  reference's own dead affordance, mirrored) · the header's scroll
  flip — the two-state classes IDENTICAL (`bg-transparent py-6` →
  `bg-zinc-950/95 backdrop-blur-md border-b border-white/5 py-4`).
- **The records (no cure)**: (R-19c) the filter chips' active/inactive
  faces ride INLINE STYLES on the reference (`style="background-color:
  rgb(245, 158, 11); color: rgb(0, 0, 0)"` active /
  `rgb(244,244,245)`+`rgb(113,113,122)` inactive) vs our class decode
  (`bg-amber-500 text-black` / `bg-zinc-100 text-zinc-500`) — computed
  IDENTICAL in every state; the F-15b class-string-vs-face genus on
  the chip family · (R-19d) the project category label's amber ink —
  inline on the reference, our `text-amber-500` class decode,
  computed identical (live-proven rgb(245,158,11) both) · (R-19e) the
  reference's submit fires no domain POST (the superset record
  sharpened: zero persistence, a pure client-side swap) · (R-19f) the
  reference's in-flight button face unobservable (the swap lands
  within ~400ms; no disabled/loading face caught) — our
  `disabled={pending}` stays, the invisible superset · (R-19g) the
  reference's FAILURE face is structurally unreachable (no request,
  no failure) — our honest error toasts stay (the round-17
  unverifiable-member precedent) · (R-19h) the reference's empty
  z-[100] container at rest (platform scaffold; never fires on the
  contact ride) — our toast viewport (pointer-events-none + gap-2,
  the CRM-era superset construction) stays for OUR surfaces ·
  (R-19i) the label-association superset re-proven live
  (getByLabel("Name") finds nothing on the reference — its labels are
  unassociated; ours bind).

## The cure set (TDD)

- **R-1** `tests/interaction-faces.test.ts` (the 39th unit file) —
  born RED: ① the success panel's exact structure (the wrapper class
  string, the 48px CircleCheckBig + `mb-5` + the amber class decode,
  the h3/p class strings + the INQUIRY_SUCCESS pair); ② the form's
  REMOVAL on success (a `submitted` state gates the render; the
  post-success form-clear family RETIRED); ③ the floating success
  toast RETIRED on the landing (no `toast.success` in the submit
  path; the error toasts stay); ④ the right-column bare wrapper div
  (F-19b); ⑤ the panel's `role="status"` (the a11y superset — the
  reference's panel is screen-reader-silent); ⑥ the
  `INQUIRY_TOAST` → `INQUIRY_SUCCESS` rename with the corrected
  provenance comment; ⑦ the keeps (the error-path toasts, the native
  validation gate, the four controlled inputs pre-submit).
- **R-2** the cures: `src/lib/site-content.ts` (the rename + the
  honest comment) + `src/components/landing/landing-page.tsx` (the
  `submitted` state; the success path drops the toast + clears; the
  bare right-column wrapper; the panel JSX with the reference's exact
  class strings; the CircleCheckBig import — our lucide 0.525 ships
  the reference's exact path data, verified).
- **R-3** `scripts/drift-199.ts` gains the **[interact] census** (the
  8th leg): the contact-form ride on both apps — the reference's ride
  is side-effect-free (no domain POST, live-proven); OURS rides with
  a route-fulfilled 201 (our envelope — no probe row in the dev db);
  diff the post-swap DOM (the panel's classes, the form's absence,
  the floating toast's absence) + the filter/carousel/header-flip
  rides (the positive censuses pinned live). Born-RED live proof on
  the pre-cure tree; NO DRIFT after (all eight legs).
- **R-4** `tests/e2e/landing.spec.ts` (+1, 84): the new panel leg —
  after a real submit on the standalone artifact the form is GONE,
  the panel renders (icon + h3 + p), and the floating toast viewport
  stays EMPTY; the existing submit test's prose updated (its
  text-pins already hold on the panel) with the persisted-row proof
  unchanged.
- **R-5** the count ladder re-anchor (unit 484 → 484+N / 38 → 39
  files; e2e 83 → 84) at every live-tense site + the ladder's
  SOURCE_CONTRACTS list.
- **R-6** the mutation proof: M1 drop the panel render (①② RED) ·
  M2 restore the floating `toast.success` (③ RED) · M3 drop the
  wrapper div (④ RED) · M4 drop `role="status"` (⑤ RED) · M5 revert
  the rename (⑥ RED). All restored `cmp`-identical; the M1 e2e
  rebuild turns the panel leg RED.
- **R-7** the captures: the 6 `ours-*` faces refreshed + the new
  `ours-contact-success-1280.png` (the route-fulfilled ride — the
  panel's visual face, PIL-verified).
- **R-8** the doc lockstep: `docs/session_33.md` + this plan's
  Phase-5 + the worklog round-19 entry + the PAD §10 round-19 clause
  + the provenance corrections (AGENTS.md's "only toasts" line, the
  site-content record) + the CLAUDE/SKILL prose lists + the count
  re-anchors.
- **R-9** the full gate re-proof (lint 0/0 · tsc 0 · unit · build 22
  routes · smoke 14/14 · e2e 84/84) + the final live probes (parity ·
  drift all eight legs · the mobile census).
- **R-10** ship: one atomic commit on main via
  `docs/ssh_git_wrapper_v3.py --remote git@github.com:nordeim/elegance-flow.git`.

## Phase 5 — The execution record (filled at ship)

- **R-1** ✓ `tests/interaction-faces.test.ts` (the 39th unit file, 7
  checks) — born-RED **6/1** on the live tree (all real divergences
  RED; the keeps ⑦ GREEN by design; the first harness's ⑦ region was
  widened 2600→4600 chars to reach the third `required` — the honest
  pre-keep split re-proven after).
- **R-2** ✓ the cures: the `submitted` state + the panel JSX
  (byte-mirrored classes; the `CircleCheckBig` import — our lucide
  0.525 ships the reference's exact `M21.801 10A10 10 0 1 1 17
  3.335` + `m9 11 3 3L22 4` path data, verified at the node_modules
  source) + the bare right-column wrapper + the success path's
  toast/clear retirement + the `role="status"` superset in
  `landing-page.tsx`; the `INQUIRY_TOAST` → `INQUIRY_SUCCESS` rename
  + the honest provenance comment in `site-content.ts`; the two
  existing pin sites updated deliberately (landing-page.test.ts's
  toast pin → the `setSubmitted` mechanism pin; site-content.test.ts's
  import + shape pin). Battery **7/7** · tsc 0.
- **R-3** ✓ the `[interact]` leg (the 8th) — born-RED live on the
  pre-cure tree (the /tmp backup + `git show HEAD:` restore harness):
  **10-field DRIFT** (formParentClass · gridChildren · hasForm ·
  inputCount · panelClass · h3Class · pClass · iconWidth · iconColor ·
  floatingToasts — the exact F-19a/F-19b set); **NO DRIFT after — all
  EIGHT legs**. Two live finds on the way: a bare div's
  `getAttribute("class")` returns null (the leg's `(no-class)`
  sentinel — the first draft's `?? "(no form)"` mislabeled it); and
  the probe-order lesson (the header-top read must precede any
  locator click that auto-scrolls — the first census's "no flip on
  either app" was a ride-order artifact; the clean read proves both
  apps flip identically).
- **R-4** ✓ e2e +1 (**84/84**): the panel leg (the form GONE, the
  panel rendered with the 48px icon + the h3/p pair, the toast
  viewport EMPTY, the wrapper's DOM pinned via the form's parent DIV +
  the grid's two children) + the existing submit test's prose updated
  (its text-pins hold on the panel). Found live: the first draft's
  CSS locator escaped a dash that isn't special (`text-center\.py-16`
  — a class named `.py-16` doesn't exist; the fix:
  `div.h-full.py-16`).
- **R-5** ✓ the count ladder re-anchored at **491/39** (13 seam/196 +
  26 source contracts/295 — interaction-faces the 26th) · e2e
  **84/8**; the census battery's SOURCE_CONTRACTS list + all five
  root docs + the worklog verification line re-locked.
- **R-6** ✓ the mutation proof: unit **5/5** (M1 the panel block
  DELETED 4 RED — ①②④⑤; the first M1 attempt kept the strings as
  dead code behind `(null) && (` and the source-contract pins
  rightly ignored it — a real regression deletes the block; M2 the
  floating toast restored 1 RED · M3 the wrapper dropped 1 RED · M4
  the role dropped 1 RED · M5 the rename reverted 1 RED), all
  restored `cmp`-identical; e2e **M1 rebuilt → BOTH contact legs RED**
  (17/19 — the panel leg + the submit test's text pins).
- **R-7** ✓ the 6 `ours-*` captures refreshed + the NEW
  `ours-contact-success-1280.png` (the route-fulfilled ride — no
  probe row in the dev db), all PIL-verified non-blank.
- **R-8** ✓ session_33 + this Phase-5 + the worklog round-19 entry +
  the PAD §10 round-19 clause + the provenance corrections
  (AGENTS/README/CLAUDE's "only toasts" → the panel fact) + the
  CLAUDE/SKILL prose lists + the count re-anchors.
- **R-9** ✓ the full gate re-proven green (lint 0/0 · tsc 0 · 491/491
  · 22 routes · smoke 14/14 · e2e 84/84) + the final live probes
  (parity IDENTICAL · drift NO DRIFT all eight legs · the mobile
  census byte-equivalent).
- **R-10** ✓ one atomic commit on main via the ssh wrapper (dry-run →
  push → remote verification → key shredding).
