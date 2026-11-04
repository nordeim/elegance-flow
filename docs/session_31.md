# Session 31 — Round-18: the HEAD/METADATA census (the document faces no probe read)

`docs/session_30.md` is the owner's transcript of round-17 (my `fac41b4`
push). At fresh HEAD `5cf75b4` (the delta: that doc alone), this round:
the re-validation rotation's eighteenth pass — the gate + the live probes
re-proven, a fresh-eyes audit on the one surface no probe ever read (the
`<head>` document family), two catches closed under TDD, and a live
infrastructure find on the drift probe itself (the launch-accumulation
ceiling) that restructured the tracker for good.

## Re-orientation (and the session restarts)

The round opened on a workspace cloned fresh at `5cf75b4`; the environment
rebuilt (install, `.env` carrying the mandated
`DATABASE_URL="file:../db/custom.db"`, db push/seed, census **MATCH**,
Playwright browsers restored). The doc set re-internalized (AGENTS ·
CLAUDE · README · PAD · the skill · the worklog · session_29 + session_30
+ the round-17 plan); `skills/` excluded from checking/compiling per the
standing contract.

Mid-round the session's shell channel died (five consecutive tool
failures — the round-17 born-RED live proof of the NEW drift leg was in
flight). After the first restart the round resumed precisely from the
state summary: the cure backups verified intact under `/tmp`, the
pre-cure tree re-proven born-RED (9/3), and the stalled drift diagnosis
re-run from scratch — the launch-accumulation ceiling found, the drift
probe restructured to one browser + isolated contexts, the born-RED live
proof landed (3-field DRIFT), the cures restored and verified (12/12 ·
all seven legs NO DRIFT), the e2e legs landed (the stale-artifact find
on the way), the count ladder re-anchored (484/38 · 83/8), the mutation
proofs ridden (3/3 unit + 2/2 e2e), the captures refreshed, the docs
locked step, and the FULL GATE + all live probes re-proven green.

Then the sandbox recycled the workspace entirely before the push — the
ship rode a full rebuild: the tree re-cloned at `5cf75b4`, every round-18
file re-applied from the session record (the battery, the cures, the
drift rewrite, the e2e legs, the census list, every doc edit), the
environment rebuilt (install · .env · db push/seed · census MATCH), and
the gate + every live probe re-proven on the rebuilt tree before the
commit — the same evidence, re-earned.

## The status validation — every doc claim re-proven at `5cf75b4`

- **Gate**: lint 0/0 · tsc 0 · unit **472/472 (37 files, the round-17
  ladder)** · build (**22 routes**, standalone) · smoke **14/14** · e2e
  **81/81 (8 specs)**.
- **Live parity**: COMPUTE IDENTICAL at 1280 + 390 (the s18
  serialization class excluded, same paint).
- **Drift**: NO DRIFT — the round-17 six legs (content + mobile-menu ·
  auth-card · preflight · motion/glyph · geometry · auth-validation).
- **The mobile-menu census**: byte-equivalent both apps; the sole delta
  OUR `aria-expanded` superset. No Tailwind v4 regression in the eight
  pinned traps.

## The fresh angle — the HEAD/METADATA census

Every probe in rounds 1–17 read BODY faces (computed styles, text,
geometry, glyphs, attributes, validation modes, post-login worlds). The
`<head>` document surface — the metadata family the SEO posture rides on
— was never read against the live reference: the smoke ladder curls OUR
sitemap/robots/manifest; nobody ever diffed the reference's own head
faces.

**The catches:**

- **F-18a (MODERATE, document surface)**: the reference's `/login`
  carries a schema.org `BreadcrumbList` JSON-LD in its head —
  positions 1/2, "Home" → origin, "login" → origin/login, the
  platform's spaced serialization — and OURS carried ZERO JSON-LD
  anywhere. The same family rides the reference's `/signup` URL, which
  the live platform now serves as a **200-status soft-404** (the base44
  DeadEndPage: h1 "404", h2 "Page Not Found", "Go Home" — the
  session-10 record "the reference 404s /signup" is transport-stale;
  the STATUS is 200 now). Our working `/signup` is the documented
  superset; the crumb is semantically true on it (one hop from home),
  so the member mirrors there.
- **F-18b (LOW, document surface, login-only)**: the reference's
  `/login` viewport carries `viewport-fit=cover`
  (`width=device-width, initial-scale=1.0, viewport-fit=cover`) — the
  notched-device edge-to-edge declaration. Its `/` and `/signup`
  viewports carry NONE: a login-only member.

**The positive censuses**: `sitemap.xml` shape IDENTICAL (urlset ·
weekly · 1.0 · origin the only delta) · `robots.txt` IDENTICAL ·
manifest name/short_name "EleganceFlow" IDENTICAL · the canonical family
IDENTICAL (both apps, all three pages) · the title family IDENTICAL on /
and /login. The round-18 post-login census (probe 1): the reference's
authenticated world IS the landing (`/` — no dashboard, no header state
change, no session word anywhere; our `/dashboard` superset stands,
LIVE-proven where the PAD inferred). The pre-hydration census: no
credential-in-URL leak on either app (the dev-server login flake was a
probe-side hydration race, not an app defect).

**The records (no cure)**: the theirs-only platform metas
(`base44-analytics`, `bundle-commit`, the login-only
`og:image:alt="Base44 link preview"`) · the `initial-scale=1.0` vs `1`
serialization (round-16, numerically equal) · OUR supersets: the
every-page `theme-color=#000000` (the reference carries it on /login
only), the self-hosted og-image family, the 512 PNG + apple-touch 180
icons (the reference ships one mis-typed icon: `type="image/svg+xml"` on
a `.png` URL) · the reference's soft-404 body family (ours is the
designed 404, the documented superset) · the soft-404's own title
"Signup | EleganceFlow" (ours: the superset's "Sign up | EleganceFlow").

## The cure (TDD)

- **Born-RED battery** — `tests/head-faces.test.ts` (the 38th unit
  file, 12 checks): pre-cure **9 RED / 3 GREEN** (the honest split —
  all real divergences RED; the landing-purity, signup-viewport and
  theme-color keeps GREEN by design).
- **The cures**: `breadcrumbJsonLd(route: "/login" | "/signup")` in
  `src/lib/site.ts` (the byte-mirrored spaced serialization, origin via
  `siteUrl()`); the `<script type="application/ld+json">` renders in
  `src/app/login/page.tsx` + `src/app/signup/page.tsx`; the login-only
  `viewportFit: "cover"` export on the login page (ONLY that field —
  width/initialScale/themeColor inherit from the root layout, the
  single source). Post-cure **12/12 GREEN**, lint/tsc clean, and the
  dev server live-verified SSRing the exact spaced serialization.
- **The drift leg [head]** (the 7th): both apps, /login + /signup —
  the JSON-LD text (origin-normalized), the viewport content
  (initial-scale serialization folded), theme-color, canonical.
  Born-RED live on the pre-cure tree: **3-field DRIFT**
  (loginJsonld · signupJsonld · loginViewport); **NO DRIFT after —
  all seven legs**.
- **The e2e legs (+2, 83/83)**: the login page's JSON-LD +
  viewport-fit on the standalone artifact; the signup page's JSON-LD +
  NO viewport-fit (the login-only shape). Found live: the e2e webServer
  REUSES a stale `.next/standalone` — the first run read the pre-cure
  artifact (JSON-LD count 0); the rebuild turned both legs green.

## THE LIVE INFRASTRUCTURE FIND — the drift probe's launch-accumulation ceiling

The seven-leg drift script (one browser per leg, the design since
round-4) stalled SILENTLY at the new head leg: empty logs, the process
alive but zero chrome children, no timeout error — first on the head
leg's own 16th launch, then (after merging the head census onto the
auth leg's browser) on the same goto at ~32s on a WARM browser. The
diagnosis ladder (per-leg stderr markers on an instrumented copy →
isolated single-browser sequences → a 14-launch accumulation probe)
proved the law: **one browser with any number of navigations always
flies (9 loads in 17s; the tail sequence alone in 10s); ~15
launch/close cycles in one process make the tail goto time out at 30s**
— and the TimeoutError then wedged the `finally`'s `browser.close()`,
hanging the script with the rejection never printed (the silent face).

**The cure**: `scripts/drift-199.ts` restructured to **ONE browser for
the whole script, one isolated CONTEXT per face call** (contexts are
cheap and cookie-isolated — the fresh-browser semantics every leg was
born with are preserved). The report now prints BEFORE the shared
browser retires. The restructure also unmasked a real bug the hang had
always hidden: `headFace` keyed its record `"/login"`-style while the
diffs read `.login` — fixed, and the leg ran to its first-ever
completion (the born-RED 3-field proof above).

## The mutation proof + the count ladder

- **Unit 3/3 classes bite**: M1 the login JSON-LD dropped (2 RED — the
  render pin + the tree census) · M2 the viewportFit dropped (1 RED) ·
  M3 a JSON-LD planted on the landing (2 RED — both purity pins). All
  restored `cmp`-identical; battery 12/12 after.
- **E2E 2/2 legs bite on rebuilt artifacts**: M1 → the login head leg
  RED; M2 → the same leg RED on the viewport pin. Restored, rebuilt:
  auth spec 17/17.
- **The count ladder re-anchored**: unit **484/484 (38 files)** — 13
  seam batteries/196 + 25 source contracts/288; e2e **83/83 (8
  specs)**; the census battery's SOURCE_CONTRACTS list + the five root
  docs + the worklog verification line all re-locked (the census test
  demanded it — its exact job).
- **The captures refreshed**: the 6 `ours-*` faces re-captured,
  PIL-verified non-blank.

## Ship

One atomic commit on main via `docs/ssh_git_wrapper_v3.py` (the
paramiko shim; dry-run → push → remote verification → key shredding).
No new branches.
