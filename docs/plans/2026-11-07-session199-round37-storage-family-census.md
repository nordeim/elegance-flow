# The Round-37 Remediation Plan — the STORAGE-FAMILY CENSUS + the INERT-COOLDOWN CURE (session-199)

**The round's fresh angle:** the storage axis no probe ever read. The
live battery (parity reads computed styles; the drift battery reads
DOM/text/img/faces; NO probe ever enumerated `localStorage`/
`sessionStorage`) — censused live this round on both apps, and the
census's own audit of OUR storage wiring found a real defect.

**The catches:**

- **F-37a (MEDIUM-HIGH, correctness/resilience — the round's own audit
  catch, live-diagnosed by source read while censusing the storage
  wiring)**: the stale-chunk cooldown guard is INERT in the production
  wiring. Both boundaries (`src/app/error.tsx:41` and
  `src/app/global-error.tsx:37`) call `reloadOnStaleChunk(error)` with
  NO deps — the seam defaults `deps.storage ?? null`, so in production
  `storage` is null: the cooldown flag (`neo-crm:chunk-reload-at`) is
  never READ and never WRITTEN, and every stale-chunk error reloads
  with ZERO cooldown. The "crash-mid-reload cannot loop" guard the
  seam's own docblock claims ("the cooldown flag is written BEFORE
  window.location.reload() fires"; "the boundary hands the globals")
  is dead in the real path — the boundary never handed the globals.
  The reload-loop scenario the guard exists for (a reload that lands
  on a still-stale graph — cached HTML holding the old chunk hashes)
  re-fires the boundary, re-fires the reload, unguarded, forever. The
  seam's injectable form is fully unit-tested (five checks with
  storage doubles); the WIRING was never pinned — three existing pins
  (`tests/error-boundaries.test.ts:44` + `:91`,
  `tests/error-faces.test.ts:157`) pin the defective bare call shape.
  The classic injectable-seam gap: the seam was built for injection,
  the tests verify the injected form, and the production call site
  forgot the injection.
- **F-37b (the census — the storage axis finally read, live on both
  apps this round)**: the reference's platform writes localStorage key
  families no round ever recorded; OUR app writes ZERO keys on every
  surface. The recorded per-side constants (live 2026-11-07):
  - REF `/login` pre-auth: `["i18nextLng"]` only — the auth card's own
    script sets just the locale key.
  - REF `/` guest (fresh context): the platform's analytics four —
    `base44_analytics_session_id` (a 21-char lowercase-alphanumeric
    PER-SESSION random id, nanoid-class: differs across fresh
    contexts, stable across reloads within a session),
    `base44_app_id` (the constant 24-hex app id), `base44_from_url`
    (the origin), `base44_functions_version` (`"prod"`).
  - REF post-login (the authed census): seven keys — the four + `token`
    + `base44_access_token` + `i18nextLng`; ZERO cookies (the base44
    session rides client-readable localStorage).
  - OURS: ZERO keys on every surface (`/`, `/login`, `/signup`,
    `/reset-password`, `/dashboard`), both storages, guest AND authed;
    the session rides ONE httpOnly cookie (`neo_session` —
    `document.cookie` reads empty). STRICTLY the stronger posture
    (no client-readable session state), and the rendered parity
    surface is unaffected: storage is not a rendered face, and the
    platform's key families are base44 implementation, never mirrored
    (the s11-adjacent doctrine — the same posture as the body-ink
    dead face: a per-side recorded divergence, invisible on the
    parity surface).

**The standing re-validation at open** (all green, the round-36 ship
state reproduced exactly): lint 0/0 · tsc 0 · 623/623 (55 files) ·
build 22 routes · smoke 14/14 · e2e 126/126 · census MATCH · parity
IDENTICAL both viewports · drift NO DRIFT ×21 (exit 0, the full
~6.5-min runtime) · the mobile-menu census byte-equivalent — the
operator's standing emphasis works exactly as expected, NO Tailwind v4
bug. The operator's standing login instruction executed (the
reference's authed-world re-census — the PAD §2 record holds: the
demo login → `/`, the derived-title 404 shells, zero cookies, the
seven-key localStorage family). The advisory re-triage: the posture
UNCHANGED (10 advisories, all dev/build/test toolchain-transitive; the
runtime zod 4.6.7 above the patched floor — the PAD §10 ledger row
stands, no security driver). The neo-crm stack patterns re-verified
(the identical core pins). The round-deciding probes for the other
recorded candidates (both POSITIVE, recorded in the session log): the
triple-stack emulation (reduce + forcedColors + colorScheme —
IDENTICAL faces on both apps) and the superset's orientation a11y at
844×390 (signup/reset/login: ZERO axe violations).

## The decision (the house doctrine applied)

**A wiring cure + a census ship.** The wiring defect is a real
correctness/resilience bug on OUR OWN surface (the error boundary —
the superset's resilience machinery, the session-170 heritage), so the
cure ships (the boundaries are our own surfaces — NO parity-surface
source changes). The storage census ships as the drift `[storage] leg
(the 22nd) + the PAD §2 record + the pin battery. The same-defect-
pattern sweep ran clean: chunk-recovery is the ONLY seam whose
production call site forgot the documented hand-off (boot-env hands
`process.env`; not-found-body's `document.title` touches are its
documented design).

## The cure (TDD — the pin battery born RED on the current tree; the mutation proof follows)

1. **The guarded accessor** (`src/lib/chunk-recovery.ts`):
   `browserSessionStorage(): ChunkStorage | null` — `typeof window ===
   "undefined"` → null (node/tests); the `window.sessionStorage` access
   wrapped in try/catch → null (Safari-private-mode/unavailable
   storage DISABLES the cooldown, never throws). The seam itself stays
   pure (its default stays `deps.storage ?? null` — it never touches a
   global it was not handed; the accessor is the module's own leaf
   export the boundaries hand in, the docblock's documented intent).
2. **The boundary wiring** (`src/app/error.tsx` +
   `src/app/global-error.tsx`):
   `reloadOnStaleChunk(error, { storage: browserSessionStorage() })` —
   the cooldown flag now engages in production; the reload rides the
   10s window; the crash-mid-reload loop breaks.
3. **The born-RED pin battery** (`tests/storage-faces.test.ts`, +7 —
   the 43rd source-contract family):
   - ① the wiring contract: both boundaries (comment-stripped) spell
     the wired call.
   - ② the guarded-accessor contract: the export + the typeof-window
     guard + the try/catch + the null return.
   - ③ the app-wide storage census: comment-stripped reads of every
     `src/` file — ZERO `localStorage` references; `sessionStorage`
     appears ONLY in `chunk-recovery.ts` (the zero-key posture's
     source contract).
   - ④ the seam-purity contract: `reloadOnStaleChunk`'s body never
     touches a global (the injectable form stays).
   - ⑤ the doc pins: AGENTS.md names the storage posture (the
     zero-key face + the httpOnly contrast + the F-37a cure); the PAD
     §2 carries the storage-family record.
   - ⑥ the existing-pin updates: error-boundaries ×2 + error-faces ×1
     move from the bare call to the wired call (they pinned the
     defect; the intent — "wires the self-heal in useEffect with
     [error] deps" — carries).
   - ⑦ the drift-leg source contract: the drift script rides the
     `[storage]` leg.
4. **The seam-battery extension** (`tests/chunk-recovery.test.ts`,
   +2): `browserSessionStorage()` → null in node (the guard); the
   composition `reloadOnStaleChunk(err, { storage:
   browserSessionStorage() })` fires the reload once and never throws
   in node (the storage-less degraded path — still one honest reload).
5. **The drift `[storage]` leg** (the 22nd — `scripts/drift-199.ts`):
   `storageFace(url)` rides a fresh context per app: the landing's
   localStorage key set + the login's pre-auth set + both pages'
   sessionStorage, diffed per-side — the REAL identical faces
   (sessionStorage: `[]` on both pages both apps) + the recorded
   per-side constants (REF landing: the analytics four sorted; REF
   login: `["i18nextLng"]`; OURS: `[]` everywhere) + the analytics-id
   SHAPE decode (len-21 lowercase-alnum — never the value: a random
   per-session id can't be value-pinned; the app_id pinned to its
   24-hex shape).
6. **The e2e legs** (`tests/e2e/landing.spec.ts`, a round-37 describe,
   +2): the guest family (`/`, `/login`, `/signup`, `/reset-password`
   — localStorage + sessionStorage + `document.cookie` all empty, the
   logged-out storageState) and the authed dashboard face
   (`/dashboard` — both storages empty + `document.cookie` empty: the
   session rides the httpOnly cookie the page can't read).
7. **The mutation proof** (each class must bite, restored
   cmp-identical): M1 the boundary wiring reverted (bare call) → the
   wiring pins RED · M2 the accessor's guard dropped → the accessor
   pin RED · M3 a `localStorage` reference planted in a src file → the
   app-wide census RED · M4 the AGENTS.md note reverted → the doc pins
   RED.
8. **The doc cures**: AGENTS.md (the storage-posture paragraph);
   CLAUDE.md + SKILL.md (the storage-faces family named in the unit
   lists); the PAD (§2 gains the storage-family record after the
   authed-world record; §7.1 split rows re-locked 43/435 + 13/198;
   §7.3 + §10 gate lines re-locked; the F-37a row lands CLOSED
   in-round); README.md (the count ladder); worklog.md (the round-37
   entry + the Stage-Summary verification line re-lock); the
   count-ladder census battery's SOURCE_CONTRACTS list gains
   `storage-faces`; the session log `docs/session_68.md` + this plan
   doc.
9. **The captures refresh** (the operator's standing screenshot
   instruction): the 18-capture set re-run via `scripts/capture-199.ts`
   against the dev server; byte-compare; PIL-verify non-blank.

## The execution order

R-1 the plan written + validated against the tree → R-2 the born-RED
pin battery (storage-faces +7 born RED; chunk-recovery +2 born RED;
the count-ladder family list + the three existing-pin updates land
with the cure) → R-3 the cure (the accessor + the two boundary
wirings) → battery GREEN → R-4 the mutation proof (M1–M4 — each class
must bite) → R-5 the drift `[storage]` leg + the live proof (drift
NO DRIFT ×22; the e2e legs green on the standalone artifact) → R-6
the doc cures + the count-ladder re-lock (623→633/56 · source
contracts 42/427→43/435 · seam 196→198 · e2e 126→128) → R-7 the
captures refresh → R-8 the full gate (lint → typecheck → test → build
→ smoke → e2e) → R-9 the session log + the ship (the SSH wrapper,
main only).
