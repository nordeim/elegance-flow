# Session 41 — Round-23: the ANCHOR-NAVIGATION/DEEP-LINK census (the hash-link rides no probe ever rode)

Round-22 shipped `2fdd110` (the intermediate-viewport census) + the
session-log commit `59bf1a0`; the owner pushed nothing new, so round-23
opens at the same HEAD — the re-validation rotation's twenty-third
pass: the workspace refreshed over HTTPS, the environment rebuilt
(`.env` → `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo
root · db:push/db:seed · census MATCH), the gate + the live probes
re-proven, a fresh-eyes audit on the surfaces no probe ever read, the
positive census recorded, the coverage catch closed under TDD, and the
count ladder re-anchored.

## The status validation — every doc claim re-proven at `59bf1a0`

- **Gate**: lint 0/0 · tsc 0 · unit **504/504 (42 files, the round-22
  ladder at the round's open)** · build (**22 routes**, standalone) ·
  smoke **14/14** · e2e **88/88 (8 specs)**. (One environment
  iteration: the workspace reset dropped the Playwright browser
  binaries — `npx playwright install chromium` restored the matching
  build.)
- **Live parity**: COMPUTE IDENTICAL at 1280 + 390 (the s18
  serialization class excluded, same paint).
- **Drift**: NO DRIFT — the round-22 eleven legs.
- **The mobile-menu census**: byte-equivalent both apps; the sole delta
  OUR `aria-expanded` superset.
- **Infra checks** (the standing round-open battery): the
  vitest/playwright configs match the tree, the sitemap/SEO family
  serves (smoke rung 12), and `.env.example` covers exactly the six
  code-read env vars (DATABASE_URL · NEXT_PUBLIC_SITE_URL ·
  AUTH_SECRET · NEO_PROXY_HOPS · NEO_DISABLE_IN_APP_OTP ·
  NEO_DISABLE_IN_APP_RESET).

## The fresh angle — the anchor-navigation/deep-link census

Every probe since session-199 read at-rest faces (computed styles,
text, geometry, glyphs, validation, heads) or OUR behaviors pinned by
the e2e battery. Round-23 probed the RIDE family none of them ever
rode: the DESKTOP nav's five section links (the mobile panel link ride
IS pinned — `mobile-census-199.ts` + `mobile-navigation.spec.ts`; the
desktop family never), the header CTA, the hero CTA pair, the logo's
`#`, the cold-boot deep link (`/#portfolio` / `/#about` — every e2e
leg `goto("/")` plain), and the never-read scroll-landing carriers
(`scroll-margin`/`scroll-padding` — the round-22 root-font-size-purity
class).

**The record:**

- **R-23a (the positive census — clean, first time probed, live on
  both apps 2026-11-05)**: the whole desktop anchor family behaves
  IDENTICALLY on both apps — the href family (nav +
  `Get in Touch→#contact` + the hero pair + the logo `#`), the five
  section ids, the five desktop nav rides (hash + settled scrollTop +
  the target's landing: About 800 · Services 1818 · Work 2624 ·
  Testimonials 3875 · Contact 4711 at 1280×800), the logo ride (hash ""
  + back to top), and the scroll-landing carriers (scroll-behavior
  smooth both, root scroll-padding auto both, section scroll-margin 0px
  both). No Tailwind v4 drift anywhere in the anchor family.
- **R-23b (the reference's own defect, no cure — the superset
  record)**: the reference's DEEP LINKS ARE BROKEN. Its raw HTML is a
  SPA shell carrying no section ids; the browser's one-time boot-time
  hash scroll finds nothing, and the SPA's mount never re-attempts it —
  cold-booting `/#portfolio` or `/#about` leaves scrollTop 0 at
  0.5s/1.5s/3s/5s (live-probed, long-wait). OURS lands the native SSR
  scroll immediately (2624 / 800, the section at the viewport top) and
  stays. The round-18 soft-404 precedent applies: the reference's own
  defect, OURS the working superset — documented, never broken to
  match.
- **F-23a (the coverage catch — the curable class)**: none of the ride
  family carried a pin. The drift classes that would ship with every
  gate green: an edited section id (the link still sets the hash but
  nothing scrolls), an edited hero-CTA/logo href, a planted
  `scroll-mt-*` family (shifts every anchor landing invisibly), or a
  `next/dynamic` boundary on the landing route (defers the section
  HTML past the boot-time hash scroll — silently breaking every deep
  link the way the reference's SPA does).

## The cure (TDD)

- **The battery** — `tests/anchor-faces.test.ts` (the 43rd unit file,
  4 checks): ① the section-id family (the five `id=` targets + the
  exactly-five census) · ② the anchor href wiring (the hero CTA pair +
  the logo `#` literals) · ③ the scroll-landing PURITY (no
  scroll-margin/scroll-padding family in the landing or globals —
  `.match` never a bare `/…/.test(`, the round-22 counting-harness
  lesson re-applied) · ④ the SSR-boot keep (the route renders
  `LandingPage` with NO dynamic-import boundary). **4/4 GREEN** (a pin
  battery on the correct behavior — the catch was the coverage gap).
- **The mutation proof 4/4 classes bite**: M1 an id edited (① RED) ·
  M2 the hero CTA's href edited (② RED) · M3 a `scroll-mt-20` planted
  on a section (①③ RED) · M4 a `next/dynamic` boundary planted on the
  route (④ RED). All restored `cmp`-identical (the /tmp backup
  harness).
- **The e2e legs (+4, 92/92)**: the four ride legs on the standalone
  artifact — the deep-link boot (`goto("/#portfolio")` → the section
  landed at the viewport top + the scrolled header + the
  never-zero scrollTop), the desktop nav ride (Work → #portfolio — the
  non-obvious mapping ridden behaviorally), the hero CTA ride
  (Start a Project → #contact), and the logo ride (back to top, hash
  cleared, the header restored). Two born-RED iterations on the
  harness itself: the negative-zero poll (a sub-pixel section top
  rounds to -0 and `Object.is(-0, 0)` is false — the polls take
  `Math.abs(Math.round(…))`) and the awaited-evaluate (a bare
  `page.evaluate` passed to `expect` compares the Promise, never the
  value).
- **The drift leg [anchors] (the 12th)**: the five desktop rides +
  the logo ride on BOTH apps, each diffed REF vs OURS (hash + settled
  scrollTop + the target's landing — NO DRIFT), plus the deep-link
  boot pinned per-side against its RECORDED constant (the google-leg
  expectConst pattern — each side projected to the semantic fields;
  the first draft diffed a 3-field live object against a 2-field
  recorded constant, a false-DRIFT shape). **NO DRIFT — all TWELVE
  legs.**
- **The count ladder re-anchored**: unit **508/43** (13 seam/196 + 30
  source contracts/312 — anchor-faces the 30th) · e2e **92/8**; the
  census battery's SOURCE_CONTRACTS list + all five root docs +
  the worklog verification line re-locked (the census flagged exactly
  the stale sites; all updated; the census battery itself 7/7 GREEN).
- **The captures refreshed**: the 11 `ours-*` faces + the NEW
  `ours-deeplink-portfolio-1280.png` (the cold-boot landed portfolio
  view — the superset's own face), all PIL-verified non-blank. (Visual
  capability unavailable this session — the round-20/21/22 precedent;
  the evidence stack is the PIL check + the drift leg's live DOM read
  + the e2e assertions.)

## Ship

One atomic commit on main via `docs/ssh_git_wrapper_v3.py` (dry-run →
push → remote verification → key shredding). No new branches.
