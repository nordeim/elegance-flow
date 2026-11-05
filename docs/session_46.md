# Session 46 — Round-26: the PLATFORM-AUTH/RESET-FAMILY census (the un-censused /reset-password faces + the reference's own second design system)

Round-25 shipped `dee3b9c` (the route-mechanics/404-title census); the
owner pushed nothing new, so round-26 opens at that HEAD — the
re-validation rotation's twenty-sixth pass: the workspace RESET by the
sandbox recycle (re-cloned over HTTPS), the environment rebuilt
(`.env` → `DATABASE_URL="file:../db/custom.db"` with `db/` at the repo
root · db:push/db:seed · census MATCH), the gate + the live probes
re-proven, a fresh-eyes audit on the auth-surface-expansion family no
probe ever rode, the positive census recorded, the coverage catch
closed under TDD, and the count ladder re-anchored.

## The status validation — every doc claim re-proven at `dee3b9c`

- **Gate**: lint 0/0 · tsc 0 · unit **518/518 (45 files, the round-25
  ladder at the round's open)** · build (**22 routes**, standalone) ·
  smoke **14/14** · e2e **101/101 (8 specs)** — after the
  browser-binary reinstall the workspace reset drops (the known
  round-23 lesson: `bunx playwright install chromium`).
- **Live parity**: COMPUTE IDENTICAL at 1280 + 390 (the s18
  serialization class excluded, same paint).
- **Drift**: NO DRIFT — the round-25 fourteen legs.
- **Mobile census**: byte-equivalent — same 5 links + amber CTA ·
  link-ride navigates AND closes · the sole delta OUR aria-expanded
  (the operator's standing emphasis: the menu works exactly as
  expected, no Tailwind v4 bug).

## The round's fresh angle — the auth-surface-expansion family

Round-24 censused the /signup and /reset-password TITLES alone; the
round-25 [routes] leg rode the UNKNOWN-route family only. What the two
real auth-expansion routes actually RENDER — the /reset-password card
faces (both states), their text family, their control family, their
JSON-LD, the reset-submit error face — was never censused against the
live reference. Our reset screen was the session-163 digma port riding
the LOGIN_LAYOUT family, on the unexamined premise that the reference's
reset route shares the login card's design system. **It does not.**

### The census (both apps, guest-only GETs + the precedented bogus-token/ghost-email submits — the [authfail] class)

- **F-26a (HIGH — the Title-Case text quartet)**: the reference's
  /reset-password carries a Title-Case family ours shipped
  sentence-cased — the invalid-link card's heading **"Invalid Reset
  Link"** and button **"Back to Login"**, the token form's labels
  **"New Password"** and **"Confirm New Password"**. The rest of the
  text family already mirrors byte-for-byte — including the token
  state's own SENTENCE-case "Back to login" (the reference's own
  in-card inconsistency, mirrored as the keep) and the submit error
  "Invalid or expired reset token" (live-ridden identical both apps).
- **F-26b (HIGH — the BreadcrumbList gap)**: the reference rides the
  BreadcrumbList JSON-LD on /reset-password on BOTH card states (the
  same platform injection /login and the /signup 404 carry); ours rode
  it on /login + /signup alone. The cure wires the third carrier
  through the `breadcrumbJsonLd` seam — the crumb name the platform's
  OWN hyphen-to-space **"reset password"** (live-probed; /login and
  /signup keep their verbatim names).
- **F-26c (HIGH — the PLATFORM control family)**: the reference's
  /reset-password renders the base44 PLATFORM's own reset family — a
  DIFFERENT design system from its own login card (its login input
  computes 48px/12px-radius/slate at 1280; its reset input
  44px/6px/gray): the flat bg-gray-50 page (ours: the slate
  gradient), the white opaque rounded-lg(8px) shadow-lg card (ours:
  white/95 rounded-2xl shadow-2xl), the FIXED 48/48/40 inner pad at
  EVERY viewport — probed at 1280 AND 390, no responsive ladder (ours:
  the login ladder), the 24px h2 gray-900 tracking-normal headings
  (ours: 30px h1 tracking-tight), the h-11 FIXED rounded-md
  border-gray-200 bg-gray-50/50 inputs with the zinc-500 placeholder
  ink and the gray-400 focus family, the gray-700 labels / 12px
  gray-500 hint / gray-600 subtitle, the h-11 rounded-md bg-gray-900
  (hover gray-800) primary buttons, the 2px gray-900 top strip on the
  token form ALONE, the 80×40 red-100 rounded-full CircleAlert icon on
  the invalid-link card (NO strip there), and the
  zinc-950-on-red-50/50 16px p-4 announced error box.
- **F-26d (THE RECORD CORRECTIONS)**: the signup page's session-10
  comment ("the live platform now serves the URL as a 200-status
  soft-404 — the base44 DeadEndPage") is superseded — the CURRENT
  bundle serves its DESIGNED 404 there (the round-25 quoted-path
  family) with the DERIVED "Signup | EleganceFlow" title and the
  BreadcrumbList riding it; our working-superset signup card stands.
  The session-163 "one design system with the login/signup cards"
  premise is retired at the screen's doc comment.
- **F-26e (the positive censuses, first time probed, clean)**: the
  login card's IN-CARD forgot views byte-identical both apps ("Reset
  your password" · "Email" · you@example.com · "Send reset link" ·
  "Back to sign in" · the sent card "Check your email … We've sent
  password reset instructions to {email} …" with role=alert on BOTH —
  the session-199 mirror stands); the reference's reset delivery is
  EMAIL-ONLY (no in-app link even for the real operator account — our
  in-app resetUrl + "Open your password reset link" stays the
  documented round-20 superset, the NEO_DISABLE_IN_APP_RESET
  kill-switch); the login card's placeholder ink slate-600 == ours
  (the [login] leg never read it — now recorded); the back-button
  rides to /login identical.
- **F-26f (the coverage catch)**: NONE of the family carried a pin —
  the reset e2e rode flows (the funnel, the guards), the unit
  batteries pin the API contract, no drift leg ever read the route.

### The cure (TDD)

1. **The layout seam** `RESET_LAYOUT` in `src/lib/page-layout.ts` —
   the platform family as class constants (the LOGIN_LAYOUT pattern):
   the flat gray-50 page, the white rounded-lg shadow-lg card, the
   fixed 48/48/40 inner, the 24px h2 gray-900 heading, the h-11
   rounded-md gray control family (inputs + buttons + focus), the
   zinc-500 placeholder, the gray-600 subtitle/back, the 12px gray-500
   hint, the red-100 80×40 icon family, the 2px gray-900 strip, the
   zinc-950-on-red-50/50 error box. The ONE responsive arm is the
   input's own font ladder (text-base md:text-sm — 16px at 390, 14px
   at 1280, live-probed both).
2. **The screen rewrite** — `reset-password-screen.tsx` rides
   RESET_LAYOUT on all three states (invalid-link / token form /
   success): the Title-Case quartet, the h2 tags, the per-state chrome
   (the strip on the token form alone), the error box re-pinned, the
   success card re-skinned (the uncensused-because-unreachable
   superset face on the mirrored family). The superset keeps:
   autoComplete="new-password" ×2 (the reference ships none — WCAG
   1.3.5), the explicit name/id attrs, role="alert", the mismatch
   guard.
3. **The JSON-LD** — the page rides `breadcrumbJsonLd("/reset-password")`
   (the seam's route union widened; the crumb name the platform's
   hyphen-to-space face) + the F-26d record corrections on the signup
   page and the screen.
4. **The deliberate re-pins** — `tests/head-faces.test.ts` ③ (the
   ld+json surface census: two pages → three) and ⑦ (the route union)
   re-pinned; the three stale e2e heading assertions re-pinned exact.

### The pins

- `tests/reset-faces.test.ts` (**+5, the 46th unit file**): ① the
  seam's platform literals + the fixed-ladder keeps (no sm: arms; the
  ONE md: arm is the input's font ladder) · ② the DOM-case text
  family (the Title-Case quartet + the sentence-case keeps + the
  retired forms) · ③ the BreadcrumbList wiring (+ the login/signup
  keeps) · ④ the a11y superset keeps · ⑤ the retired-login-family
  regression (no LOGIN_LAYOUT, no slate inks — the `-translate-y-1/2`
  carrier's bare "slate-" substring taught the `slate-\d` form — no
  rounded-xl/shadow-2xl/gradient/30px-title/h1). **Born RED 4/5** (⑤
  green by design — the superset attrs already shipped).
- **The mutation proof 5/5 classes bite**: M1 the seam's input literal
  edited ① RED · M2 the Title-Case label edited ② RED · M3 the JSON-LD
  script dropped ③ RED · M4 an autoComplete dropped ④ RED · M5 a
  login-family class planted on the screen ⑤ RED — all restored
  cmp-identical (the /tmp backup harness).
- `tests/e2e/reset-password.spec.ts` (**+4, 105/105**): the FACE
  battery on the standalone artifact — the invalid-link card's
  platform chrome + icon + JSON-LD · the token form's control family +
  strip + Title-Case labels · the retired-form negatives (incl. the
  h2-only heading census) · the autocomplete superset + the announced
  error ink family.
- `scripts/drift-199.ts` gains the **[reset] census leg (the 15th)**:
  both states + the bogus-token error face diffed REF vs OURS (the
  text family, the heading/label/hint/subtitle fonts + inks, the
  input/button computed family incl. the placeholder ink, the card
  chrome with the shadow SHIMS STRIPPED so the payload diffs, the icon
  family, the strip, the tab order, the error box, the JSON-LD name);
  the input/error oklab-vs-rgba fills pinned per-side against their
  RECORDED constants (the s18 serialization class — numerically equal
  paint). **NO DRIFT — all FIFTEEN legs.**

## The count ladder re-anchored

**523/46** (13 seam batteries / 196 + 33 source contracts / 327 —
reset-faces the 33rd) · e2e **105/8** · smoke 14/14 · drift legs 15.
The census battery's SOURCE_CONTRACTS list, all five root docs, and
the worklog verification line re-locked; the census battery itself
**7/7 GREEN**.

## The round's live finds (the harness lessons)

- **The platform-family decode**: the reference's /reset-password is
  the base44 PLATFORM's own design system — distinct even from its OWN
  login card (44px/6px/gray vs its login's 48px/12px/slate). The
  session-163 premise that a shared route implies a shared design
  system never held; the two-bundle doctrine extends WITHIN a route
  family.
- **The split-",-shatters-rgba trap**: a shadow-payload filter that
  splits on `", "` breaks the rgba()'s own inner commas — the
  shatter-proof form is the global regex replace.
- **The rounded-full serialization**: v4 computes 33554400px (2^25)
  where v3 computes 9999px — the numeric read is the
  serialization-agnostic assertion.
- **The zinc-500-not-zinc-400 decode**: rgb(113,113,122) = #71717a =
  zinc-500 — the v3 literal (zinc-400 is #a1a1aa). Decode the probe's
  rgb BEFORE naming the token.
- **The stale-hot-reload read**: a computed face probed mid-hot-reload
  reads the PRE-cure value — re-navigate and re-probe before
  diagnosing.
