# The Round-25 Remediation Plan — the ROUTE-MECHANICS/404-TITLE census (session-199)

**The round's fresh angle:** the URL/route-mechanics family no probe ever
rode. Every probe since session-199 read real-route faces — the landing's
computed styles (parity), its body faces (drift), our behaviors (e2e), the
auth surfaces, the document assets (round-24). The UNKNOWN-ROUTE family —
the 404's own TITLE derivation, the trailing-slash and case-variant route
mechanics, the query passthrough, and the guest /dashboard adjudication —
was never censused against the live reference (the round-19 e2e leg and
the smoke rung read OUR designed 404 alone; the reference's own 404 face
was last recorded at session-194, seventeen sessions before the current
bundle).

## The census (round-25 discovery probes, both apps, guest-only GETs, side-effect-free)

- **F-25a (HIGH, VISIBLE — the 404 title family + the RECORD
  CORRECTION)**: the reference's CURRENT build DERIVES the unknown-route
  title from the pathname — live-probed settled 2026-11-05:
  `/verify-email` → "Verify Email | EleganceFlow"; `/nonexistent-xyz` →
  "Nonexistent Xyz | EleganceFlow"; `/dashboard` → "Dashboard |
  EleganceFlow"; `/Login` → "Login | EleganceFlow" (case-sensitive
  routing — /Login is UNKNOWN to it); `/login/` → "Login | EleganceFlow"
  (the trailing slash breaks its route match). The derivation rule
  (all ten probe cases decode one rule): strip the query → strip trailing
  slashes → take the LAST path segment → replace [-_]+ with spaces →
  split camelCase boundaries (lower→upper) → title-case each word (first
  char upper, rest untouched) → append " | EleganceFlow". Verified:
  `/foo/bar` → "Bar" (last segment only); `/foo-bar-baz` → "Foo Bar Baz";
  `/UPPER-CASE` → "UPPER CASE" (already-upper first chars stay);
  `/with_underscore` → "With Underscore"; `/digits-123` → "Digits 123";
  `/a` → "A"; `/login//` → "Login"; `/-leading-hyphen` → "Leading
  Hyphen" (the empty word drops); `/MiXeD-cAsE` → "Mi Xe D C As E" (the
  camel-split: "MiXeD" → "Mi Xe D", "cAsE" → "c As E" → title-cased
  "C As E"); `/nonexistent-xyz?q=1` → "Nonexistent Xyz" (query ignored).
  OURS ships the BARE brand on every 404 — the D-194a4 record ("the
  reference's CURRENT build ships the bare brand on its 404") is STALE
  twice over (it was recorded against the pre-current bundle). The
  round-24 site.ts comment's "/dashboard 'Dashboard | …' — live-verified"
  record conflates the reference's 404-DERIVED title with a real-route
  title — the reference has NO /dashboard route (it is the designed 404
  that carries the derived title there).
- **F-25b (the trailing-slash mechanics)**: the reference's `/login/`
  falls to its designed 404 ("The page "login/" could not be found") —
  its own platform defect (the trailing slash breaks its SPA route
  match). OURS 308-normalizes `/login/` → `/login` (Next's default
  `trailingSlash: false` — the web-correct canonical form). The superset
  is OURS, documented and kept; never break it to match.
- **F-25c (the RECORD CORRECTION — the guest adjudication)**: the
  reference's CURRENT build renders its designed 404 DIRECTLY for guest
  `/dashboard` (200 status, no login wall, no from_url, no late guard —
  live-watched at 0.5s/1.5s/3s/5s). The F-147c2/walk37 record ("the
  reference's auth-first client-router guard redirects anon unknown
  routes to /login?from_url=<absolute-url>") is STALE for the current
  bundle — it was the prior-bundle behavior. OURS keeps the from_url
  login wall on the (app) group (our /dashboard is a REAL route — the
  superset inbox — and its wall is OUR OWN superset behavior, no longer
  a reference mirror). The "mirroring the reference's guard" comments
  stand corrected; the BEHAVIOR is unchanged (the e2e pins hold).
- **F-25d (the query passthrough — the positive census)**:
  `/login?x=1` serves the real login family IDENTICALLY on both apps
  (the settled title, the card face). Clean, first time probed.

## The cures (TDD — the pin battery is born RED; the mutation proof follows)

1. **The derivation seam** `src/lib/route-title.ts` (pure, the house
   style): `deriveNotFoundTitle(pathname: string): string` — the rule
   above, returning the FULL title (`${words} | ${SITE_NAME}`); the
   empty-word edge (an all-slash pathname) returns the bare brand.
2. **The wiring** — `src/app/not-found-body.tsx` sets `document.title =
   deriveNotFoundTitle(pathname)` in an effect (the reference's own SPA
   injects its titles at runtime the same way; the settled face is the
   parity bar). The initial server-rendered title stays the layout's
   bare brand until hydration — the same flip the reference's raw shell
   performs at SPA mount.
3. **The record corrections** — `src/app/not-found.tsx` (D-194a4/a5),
   `src/app/not-found-body.tsx`, `src/components/layout/
   guest-login-redirect.tsx`, `src/app/(app)/layout.tsx`, and
   `src/lib/site.ts` (the /dashboard title record): the stale claims
   corrected in place with the round-25 records.
4. **The pins**:
   - `tests/route-mechanics.test.ts` (the 45th unit file, +5): ① the
     derivation battery (the ten probed cases + the recorded derived
     titles); ② the edge family (root/all-slash/empty → the bare brand);
     ③ the NotFoundBody wiring source-contract (the document.title
     assignment rides the seam — comment-stripped); ④ the not-found
     no-metadata keep (the D-194a4 retirement stands — the bare-brand
     default the flip rides on); ⑤ the layout title.default keep.
   - e2e legs in `tests/e2e/landing.spec.ts` (+4, 97 → 101): the
     unknown-route derived title + the true 404 status (our superset);
     the multi-segment + camel-case derivation; the trailing-slash 308
     (our web-correct superset); the query passthrough.
   - the drift `[routes]` leg (the 14th): the unknown-route title family
     diffed REF vs OURS (both derive after the cure — IDENTICAL); the
     quoted-path body family diffed; the per-side status constants (REF
     200 / OURS 404 — the true-status superset); the trailing-slash
     per-side constants (REF: the designed 404 at /login/; OURS: the 308
     → the real login); the guest /dashboard per-side constants (REF:
     the designed 404; OURS: the from_url wall); the query passthrough
     diffed.
5. **The ladder re-lock**: unit 513 → 518 / 44 → 45 files; e2e 97 → 101;
   source contracts 31 → 32 (route-mechanics the 32nd); drift legs 13 →
   14. The census battery's SOURCE_CONTRACTS list + all five root docs +
   the worklog verification line re-locked.
6. **The captures refreshed** (`bun scripts/capture-199.ts`) + the docs
   lockstep (README, AGENTS, CLAUDE, PAD, SKILL, worklog, session_45).
7. **The gate re-proof** (lint → tsc → unit → build → smoke → e2e) + the
   final live probes (parity both viewports, drift ×14, the mobile
   census) before the ship.

## The execution order

R-1 the pin battery (born RED) → R-2 the cures (the seam + the wiring +
the record corrections) → R-3 the battery GREEN → R-4 the mutation proof
(every check class bites) → R-5 the e2e legs → R-6 the drift [routes]
leg → R-7 the ladder re-lock + the docs lockstep → R-8 the captures →
R-9 the session_45 log + the worklog → R-10 the full gate + the live
probes → the ship (one atomic commit to main, the SSH-wrapper push).
