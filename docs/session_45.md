# Session 45 — Round-25: the ROUTE-MECHANICS/404-TITLE census (the un-censused unknown-route family + the reference's derived titles)

Round-24 shipped `6ff9cd9` (the document-asset/meta census) + the
session-log commit `55a9de6`; the owner pushed nothing new, so round-25
opens at that HEAD — the re-validation rotation's twenty-fifth pass:
the workspace RESET by the sandbox recycle (re-cloned over HTTPS), the
environment rebuilt (`.env` → `DATABASE_URL="file:../db/custom.db"`
with `db/` at the repo root · db:push/db:seed · census MATCH), the gate
+ the live probes re-proven, a fresh-eyes audit on the URL/route
family no probe ever rode, the positive census recorded, the coverage
catch closed under TDD, and the count ladder re-anchored.

## The status validation — every doc claim re-proven at `55a9de6`

- **Gate**: lint 0/0 · tsc 0 · unit **513/513 (44 files, the round-24
  ladder at the round's open)** · build (**22 routes**, standalone) ·
  smoke **14/14** · e2e **97/97 (8 specs)** — after the
  browser-binary reinstall the workspace reset drops (the known
  round-23 lesson: `bunx playwright install chromium`).
- **Live parity**: COMPUTE IDENTICAL at 1280 + 390 (the s18
  serialization class excluded, same paint).
- **Drift**: NO DRIFT — the round-24 thirteen legs.
- **Mobile census**: byte-equivalent — same 5 links + amber CTA ·
  link-ride navigates AND closes · the sole delta OUR aria-expanded
  (the operator's standing emphasis: the menu works exactly as
  expected, no Tailwind v4 bug).

## The round's fresh angle — the URL/ROUTE-MECHANICS family

Every probe since session-199 read real-route faces. The UNKNOWN-ROUTE
family — the 404's own TITLE derivation, the trailing-slash and
case-variant mechanics, the query passthrough, and the guest
adjudication — was never censused against the live reference (the
round-19 e2e leg and the smoke rung read OUR designed 404 alone; the
reference's own 404 face was last recorded at session-194, seventeen
sessions before the current bundle).

### The census (guest-only GETs, both apps, side-effect-free)

- **F-25a (HIGH — the 404 title family + the record correction)**:
  the reference's CURRENT build DERIVES the unknown-route title from
  the pathname — `/verify-email` → "Verify Email | EleganceFlow";
  `/nonexistent-xyz` → "Nonexistent Xyz | EleganceFlow"; `/dashboard`
  → "Dashboard | EleganceFlow" (its route-less 404); `/Login` →
  "Login | EleganceFlow" (case-sensitive routing); `/login/` →
  "Login | EleganceFlow" (the trailing slash breaks its route match).
  The rule, decoded from all ten probe cases: strip the query → strip
  trailing slashes → take the LAST path segment → replace `[-_]+`
  with spaces → split camelCase boundaries (lower→upper) → title-case
  each word (first char upper, rest untouched) → append " |
  EleganceFlow". The load-bearing decodes: `/foo/bar` → "Bar" (the
  LAST segment only); `/MiXeD-cAsE` → "Mi Xe D C As E" (the
  camel-split); `/login//` → "Login"; `/-leading-hyphen` → "Leading
  Hyphen"; `/nonexistent-xyz?q=1` → "Nonexistent Xyz". OURS shipped
  the BARE brand on every 404 — the stale D-194a4 record superseded,
  and the round-24 site.ts note conflating the reference's
  404-derived `/dashboard` title with a real route's corrected.
- **F-25b (the trailing-slash mechanics)**: the reference's `/login/`
  falls to its designed 404 ("The page "login/" could not be found")
  — its own platform defect. OURS 308-normalizes to the canonical
  `/login` (Next's default `trailingSlash: false` — the web-correct
  form). The superset is OURS, documented and kept.
- **F-25c (the record correction — the guest adjudication)**: the
  reference's CURRENT build renders its designed 404 DIRECTLY for
  guest `/dashboard` (no wall, no from_url — live-watched at
  0.5s/1.5s/3s/5s). The walk37/F-147c2 "mirroring the reference's
  guard" claim was PRIOR-BUNDLE. OURS keeps the from_url login wall
  as OUR OWN superset behavior (the superset inbox's guard).
- **F-25d (the positive census)**: `/login?x=1` serves the real
  login family IDENTICALLY on both apps.

### The cure (TDD)

- **The seam**: `src/lib/route-title.ts` — `deriveNotFoundTitle` (the
  ten-case rule + the empty-word edges returning the bare brand).
- **The wiring — the round's live decode (four failed candidates)**:
  a bare `document.title = …` in an effect REVERTS (the effect fired,
  the value computed right, the title still read the bare brand); a
  rendered `<title>` element hoists AFTER Next's metadata title (the
  browser reads the FIRST title element) and the two-phase value
  change appends a THIRD instance; a FOREIGN prepended `<title>` node
  lands first but the late write mutates the FIRST title — the
  foreign node itself (live-probed: both head titles read the bare
  brand); a zero-tick TIMER fires after every sync effect and still
  reverts (the reverter is ASYNCHRONOUS). The cure: the write + a
  MutationObserver re-win — event-driven, converging once the last
  write lands, disconnecting on unmount (the Go Home ride lands the
  landing with its own face, live-proven).
- **The record corrections**: `not-found.tsx` (D-194a4/a5),
  `not-found-body.tsx`, `guest-login-redirect.tsx`, `(app)/layout.tsx`,
  `site.ts` — the stale claims corrected in place.

### The pins

- `tests/route-mechanics.test.ts` (the 45th unit file, +5): the
  derivation battery (the fifteen recorded cases) · the empty-word
  edges · the wiring source-contract · the not-found no-metadata
  keep · the layout title.default/template keeps. Born RED 5/5 (the
  import failure); the mutation proof 5/5 classes bite (M1 the
  last-segment rule edited · M2 the empty-word fallback edited · M3
  the wiring dropped · M4 a metadata export planted · M5 the layout
  default edited), all restored cmp-identical (the /tmp backup
  harness).
- `tests/e2e/landing.spec.ts` (+4, 101/101): the derived title + OUR
  true 404 status + the designed body · the derivation rule's
  load-bearing decodes · the trailing-slash 308 · the query
  passthrough.
- `scripts/drift-199.ts` gains the `[routes]` census (the 14th leg):
  the derived-title family + the quoted-path bodies diffed REF vs
  OURS (both apps derive after the cure — the family now IDENTICAL);
  the status family, the trailing slash, and the guest `/dashboard`
  adjudication pinned per-side against their RECORDED constants (the
  google-leg expectConst pattern). NO DRIFT — all FOURTEEN legs.

## The count ladder re-anchored

Unit **518/518 (45 files** — 13 seam/196 + **32 source
contracts/322**, route-mechanics the 32nd) · e2e **101/8** · smoke
14/14 · build 22 routes. The census battery's SOURCE_CONTRACTS list +
all five root docs + the worklog verification line re-locked (the
census battery itself 7/7 GREEN). The plan:
`docs/plans/2026-11-05-session199-round25-route-mechanics-census.md`.

## The round's live finds (the harness lessons)

The late-title-write decode (four candidate wirings revert; the
MutationObserver re-win is the deterministic cure) · the terminal
display artifact's sharpest form (a literal two-char sequence
beginning with an open bracket vanishes from rg/sed/cat output — an
intact file read as corrupted three times before the python repr
proved the bytes correct; assert in python, never in the shell) · the
settled-title bar (both apps' titles are runtime-injected — the
settled face is the only comparable face; the drift leg diffs it live
every run).
