# Session 37 — Round-21: the GOOGLE-BUTTON/TIME-DIMENSION/KEYBOARD census (the surfaces no probe ever read)

Round-20 shipped `722d025` (the auth-failure/response census) + the two
session-log commits; the owner pushed nothing new, so round-21 opens at
the same HEAD (`2a35e90`) — the re-validation rotation's twenty-first
pass: the workspace refreshed over HTTPS, the environment rebuilt
(`.env` → `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo
root · db:push/db:seed · census MATCH), the gate + the live probes
re-proven, a fresh-eyes audit on the six surfaces no probe ever read,
one record + one coverage catch closed under TDD, and the count ladder
re-anchored.

## The status validation — every doc claim re-proven at `2a35e90`

- **Gate**: lint 0/0 · tsc 0 · unit **496/496 (40 files, the round-20
  ladder at the round's open)** · build (**22 routes**, standalone) ·
  smoke **14/14** · e2e **85/85 (8 specs)**.
- **Live parity**: COMPUTE IDENTICAL at 1280 + 390 (the s18
  serialization class excluded, same paint).
- **Drift**: NO DRIFT — the round-20 nine legs.
- **The mobile-menu census**: byte-equivalent both apps; the sole delta
  OUR `aria-expanded` superset.

## The fresh angle — the time-dimension/keyboard/google-button census

Every probe since session-199 read at-rest faces (computed styles,
text, geometry, inks, glyphs) or rode the side-effect-free interaction
behaviors (round-19's contact/filters/carousel-selector/header-flip,
round-20's auth FAILURE rides). Round-21 probed the six surfaces none
of them ever touched: the carousel's at-rest TIME dimension, the
keyboard TAB ORDER against the reference's own ride, the contact
select's OPTION LIST, the mailto/tel hrefs, the viewport RESIZE ride on
the mobile menu (the operator's standing emphasis — never ridden across
the desktop↔mobile transition), and the auth card's GOOGLE-BUTTON click
(inks pinned at round-13, the G glyph at round-16 — the click never
ridden).

**The record (no cure possible):**

- **R-21a**: the reference's "Continue with Google" is a REAL Google
  OAuth redirect. Live-ridden via the intercepted navigation: the click
  navigates the main frame to the platform's
  `/api/apps/auth/login?from_url=…&app_id=…` document endpoint whose
  302 Location is the full
  `accounts.google.com/v3/signin/identifier` URL carrying
  `client_id=185178814199-6a35e9aqcmlm15ig0upncg07c91av8do.apps.googleusercontent.com`,
  `redirect_uri=https://app.base44.com/api/apps/auth/callback`,
  `response_type=code`, `scope=openid email profile`,
  `prompt=select_account`. UNIMPLEMENTABLE in the self-hosted clone
  (the redirect_uri is registered to base44's Google app — the R-20d
  unverifiable-member precedent). OURS degrades to the honest info
  toast, probe-verified at both viewports (bottom-right at 1280, top at
  390, `role="status"`, auto-dismisses at 4s, zero page errors).

**The catch (curable — the coverage class):**

- **F-21a**: the honest fallback was UNPINNED — no unit
  source-contract, no e2e ride. The round-19/20 pin doctrine (every
  user-visible behavior on the card gets a pin) had never reached it: a
  regression that breaks the handler, swaps the variant, or drops the
  honest text would ship with every gate green.

**The positive censuses (clean, first time probed):**

- The carousel auto-advance ride — NO auto-advance on EITHER app over
  14s at rest; the quote, the 464x78 selector geometry, and the aria
  states identical at t0 and t14.
- The keyboard TAB ride — the first 8 focusable stops IDENTICAL (the
  logo → the five nav links → the header CTA → the hero CTA).
- The contact select's OPTION LIST — the six options + class identical.
- The mailto/tel link census — the hrefs identical.
- The viewport RESIZE ride — the full 1280→390→open→1280 cycle
  IDENTICAL on both apps (the hamburger appears/disappears, the label
  flips Open/Close, the desktop nav restores, the panel retires); the
  sole delta OUR `aria-expanded` superset. **The mobile menu works
  exactly as expected across the resize cycle — no Tailwind v4
  media-query bug on the header family.**

**The live mechanism find**: redirect followers BYPASS Playwright
route interception — the 302 chain's target (the accounts.google.com
URL) never hits the route handler, so the reliable capture channel is
the `framenavigated` event. The drift leg's first draft read all
params `(none)` (the route-captured URL was Google's own `_/bscframe`
retry, not the OAuth target); the fix reads the first
accounts.google.com framenavigated URL.

## The cure (TDD)

- **The battery** — `tests/google-fallback.test.ts` (the 41st unit
  file, 4 checks): the handler's exact toast call (title +
  description + the info variant) · the never-submits `type="button"`
  · the keeps (the class mount, the GoogleIcon, the span) · the
  no-navigation contract. **4/4 GREEN** (a pin battery on the correct
  behavior — the catch was the coverage gap, not a defect).
- **The mutation proof 4/4 classes bite**: M1 the toast call dropped
  (①④ RED) · M2 the variant swapped to success (①④ RED) · M3
  `type="button"` → `submit` (② RED) · M4 a `router.push` planted
  (①④ RED). All restored `cmp`-identical (the /tmp backup harness).
- **The e2e leg (+1, 86/86)**: the Google button click ride on the
  standalone artifact — the toast renders in the Notifications region
  (`role="status"`, the exact title + description), the URL never
  leaves /login, the 4s auto-dismiss, zero page errors.
- **The drift leg [google] (the 10th)**: the platform endpoint's shape
  (path/from_url/app_id) + the OAuth redirect's STATIC params (via
  framenavigated — the mechanism find) + our toast face, each side
  pinned against its RECORDED constant. **NO DRIFT — all TEN legs.**
- **The count ladder re-anchored**: unit **500/41** (13 seam/196 + 28
  source contracts/304 — google-fallback the 28th) · e2e **86/8**;
  the census battery's category list + all five root docs + the
  worklog verification line re-locked.
- **The captures refreshed**: the 8 `ours-*` faces + the NEW
  `ours-google-toast-1280.png` (the click ride), all PIL-verified
  non-blank.

## Ship

One atomic commit on main via `docs/ssh_git_wrapper_v3.py` (dry-run →
push → remote verification → key shredding). No new branches.
