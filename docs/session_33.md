# Session 33 — Round-19: the INTERACTION-BEHAVIOR census (the live rides no probe ever made)

`docs/session_32.md` is the owner's transcript of round-18 (my `172eeb7`
push). At fresh HEAD `48db448` (the delta: that doc alone), this round:
the re-validation rotation's nineteenth pass — the gate + the live
probes re-proven, a fresh-eyes audit on the one surface no probe ever
rode (the reference's own interactive behaviors), two catches closed
under TDD, and a provenance correction that has been stale since
session-199.

## The status validation — every doc claim re-proven at `48db448`

- **Gate**: lint 0/0 · tsc 0 · unit **472→484/484 (38 files, the
  round-18 ladder)** · build (**22 routes**, standalone) · smoke
  **14/14** · e2e **83/83 (8 specs)**.
- **Live parity**: COMPUTE IDENTICAL at 1280 + 390 (the s18
  serialization class excluded, same paint).
- **Drift**: NO DRIFT — the round-18 seven legs.
- **The mobile-menu census**: byte-equivalent both apps; the sole delta
  OUR `aria-expanded` superset. No Tailwind v4 regression in the eight
  pinned traps.

## The fresh angle — the interaction-behavior census

Every probe since session-199 read at-rest faces (parity: computed
styles; drift: text/img/head/geometry/preflight/validation) or OUR
behaviors pinned by the e2e battery against OUR artifact. The
reference's own handlers — what they ACTUALLY do when clicked TODAY —
were never census-read: the portfolio filters, the carousel selectors,
the project cards, the header's scroll flip, and the contact form's
submit ride.

**The catches:**

- **F-19a (HIGH, VISIBLE + FUNCTIONAL)**: the contact form's SUCCESS
  STATE. Live-ridden on the reference: the submit fires **NO domain
  POST** (only base44 telemetry — live-captured on the network) and at
  ~400ms **REMOVES the form**, replacing it in place with a
  **persistent centered success panel** — `h-full flex flex-col
  items-center justify-center text-center py-16`, a 48px amber
  `circle-check-big` (`mb-5`), an `h3 text-2xl font-black
  text-zinc-950 mb-3` "Message sent!", a `p text-zinc-500` "We'll be
  in touch within 24 hours." — no floating toast, no clear, no revert
  (the panel persists 16s+; the form never returns). OURS instead kept
  the form (cleared) and showed a floating shadcn toast card
  bottom-right — a different visible construction on the parity-gated
  surface. **The provenance correction**: the byte-verified
  "Message sent!" pair is the PANEL's h3/p, not a toast's — the
  session-199 record "the reference's contact form only toasts"
  mis-read the vehicle, and the reference does not even POST: our
  persisted-row superset is stronger than documented (the
  AGENTS/README/CLAUDE lines corrected).
- **F-19b (MODERATE, structural)**: the contact grid's right column —
  the reference wraps the form in a bare `<div>` grid item (grid >
  div > form); ours mounted the form directly (grid > form).
  Invisible at rest (the round-16 geometry census passed) but a
  DOM-mirror divergence, and load-bearing: the panel's `h-full` rides
  the wrapper.

**The positive censuses (clean, first time probed)**: the portfolio
filters — all four chips ride IDENTICALLY (Branding → One+Four, Web →
Two+Five, Photography → Three+Six; the amber highlight MOVES to the
clicked chip on both apps; every computed face identical in every
state) · the carousel — all three selector rides swap the exact quote
pairs (the F-15b border decode re-proven on the ride) · the project
cards — a NO-OP on both apps (cursor-pointer with no handler, no
role/tabindex on either — the reference's own dead affordance,
mirrored) · the header's scroll flip — the two-state classes
IDENTICAL (`bg-transparent py-6` → `bg-zinc-950/95 backdrop-blur-md
border-b border-white/5 py-4`).

**The records (no cure)**: the filter chips' inline-style mechanism
(the reference paints `style="background-color: rgb(245,158,11)"` —
our `bg-amber-500` class decode computes the same in every state; the
F-15b genus on the chip family) · the project category label's inline
amber (same genus, computed identical) · the reference's in-flight
button face unobservable (the swap lands ~400ms; our
`disabled={pending}` stays) · the reference's FAILURE face structurally
unreachable (no request, no failure — our honest error toasts stay,
the round-17 unverifiable-member precedent) · the reference's empty
z-[100] container at rest (platform scaffold) · the label-association
superset re-proven live (`getByLabel` finds nothing on the reference —
its labels are unassociated).

## The cure (TDD)

- **Born-RED battery** — `tests/interaction-faces.test.ts` (the 39th
  unit file, 7 checks): pre-cure **6 RED / 1 GREEN** (the honest
  split — the keeps ⑦ GREEN by design).
- **The cures**: the `submitted` state + the panel JSX (byte-mirrored
  classes; our lucide 0.525 ships the reference's exact
  circle-check-big path data — verified at the node_modules source) +
  the bare right-column wrapper + the success path's toast/clear
  retirement + the `role="status"` a11y superset in
  `landing-page.tsx`; the `INQUIRY_TOAST` → `INQUIRY_SUCCESS` rename
  + the honest provenance comment in `site-content.ts`; the two
  existing pin sites updated deliberately. Post-cure **7/7 GREEN**,
  lint/tsc clean.
- **The drift leg [interact] (the 8th)**: the contact ride on both
  apps — the reference's ride is side-effect-free by construction (no
  POST fires); OURS rides with a route-fulfilled 201 (the dev db
  takes no probe row) — plus the filter/carousel/header rides.
  Born-RED live on the pre-cure tree: **10-field DRIFT** (the exact
  F-19a/F-19b set); **NO DRIFT after — all EIGHT legs**. Two live
  finds on the way: a bare div's `getAttribute("class")` returns null
  (the leg's `(no-class)` sentinel), and the probe-order lesson (the
  header-top read must precede any locator click that auto-scrolls —
  the first census's "no flip on either app" was a ride-order
  artifact).
- **The e2e leg (+1, 84/84)**: the panel leg on the standalone
  artifact — the form GONE, the panel rendered (the 48px icon + the
  h3/p pair), the toast viewport EMPTY, the wrapper's DOM. The
  existing submit test's prose updated (its text-pins hold on the
  panel).

## The mutation proof + the count ladder

- **Unit 5/5 classes bite**: M1 the panel block DELETED (4 RED — the
  first attempt kept the strings as dead code behind `(null) && (`
  and the source-contract pins rightly ignored it; a real regression
  deletes the block) · M2 the floating toast restored (1 RED) · M3 the
  wrapper dropped (1 RED) · M4 the role dropped (1 RED) · M5 the
  rename reverted (1 RED). All restored `cmp`-identical.
- **E2E**: M1 rebuilt → BOTH contact legs RED (17/19 — the panel leg +
  the submit test's text pins). Restored, rebuilt: 84/84.
- **The count ladder re-anchored**: unit **491/491 (39 files)** — 13
  seam/196 + 26 source contracts/295; e2e **84/84 (8 specs)**; the
  census battery's list + the five root docs + the worklog
  verification line re-locked.
- **The captures refreshed**: the 6 `ours-*` faces (5 byte-stable —
  the visual-stability re-proof) + the NEW
  `ours-contact-success-1280.png` (the route-fulfilled ride — no
  probe row in the dev db), all PIL-verified non-blank.

## Ship

One atomic commit on main via `docs/ssh_git_wrapper_v3.py` (the
paramiko shim; dry-run → push → remote verification → key shredding).
No new branches.
