# The Round-26 Remediation Plan — the RESET-FAMILY/PLATFORM-AUTH census (session-199)

**The round's fresh angle:** the auth-surface-expansion family no probe ever
rode. Round-24 censused the /signup and /reset-password TITLES alone; the
round-25 [routes] leg rode the UNKNOWN-route family only. What the two real
auth-expansion routes actually RENDER — the /reset-password card faces
(both states), their text family, their control family, their JSON-LD, the
reset-submit error face — was never censused against the live reference.
Our reset screen was built at session-163 as the digma port riding the
LOGIN_LAYOUT family, on the unexamined premise that the reference's reset
route shares the login card's design system. It does not.

## The census (round-26 discovery probes, both apps, guest-only GETs + the precedented bogus-token/ghost-email submits — the [authfail] class)

- **F-26a (HIGH, VISIBLE — the Title-Case text family)**: the reference's
  /reset-password carries a Title-Case family ours ships sentence-cased —
  live-probed settled 2026-11-05: the invalid-link card's heading
  **"Invalid Reset Link"** (ours: "Invalid reset link") and its button
  **"Back to Login"** (ours: "Back to login"); the token form's labels
  **"New Password"** and **"Confirm New Password"** (ours: "New password" /
  "Confirm password"). The rest of the text family already mirrors
  byte-for-byte: "Set new password", "Enter your new password for
  EleganceFlow", "Must be at least 8 characters", "Reset password",
  "Back to login" (the token state's back button — SENTENCE case, the
  reference's own in-card inconsistency, mirrored), "This password reset
  link is invalid or has expired.", and the submit error "Invalid or
  expired reset token" (byte-identical, live-ridden both apps).
- **F-26b (HIGH — the BreadcrumbList JSON-LD gap)**: the reference rides
  the BreadcrumbList JSON-LD on /reset-password (BOTH states — the same
  platform injection /login and the /signup 404 carry). OURS carries it on
  /login and /signup alone; the reset route ships NONE. Cured by riding
  the existing `breadcrumbJsonLd("/reset-password")` seam.
- **F-26c (HIGH, VISIBLE — the PLATFORM reset control family)**: the
  reference's /reset-password renders the base44 platform's OWN reset
  family — a DIFFERENT design system from its own login card (its login
  input is 48px/12px/slate at 1280; its reset input is 44px/6px/gray):
  the page a FLAT bg-gray-50 (ours: the slate gradient); the card
  bg-white opaque rounded-lg(8px) shadow-lg (ours: white/95 rounded-2xl
  shadow-2xl); the inner pad pt-12 px-12 pb-10 FIXED at every viewport
  (ours: the login ladder p-8 sm:p-10 md:pt-12 md:px-10 md:pb-10); the
  headings h2 24px/700 text-gray-900 tracking-normal (ours: h1 30px
  slate-900 tracking-tight); the inputs h-11 FIXED rounded-md(6px)
  border-gray-200 bg-gray-50/50 placeholder:text-zinc-500 with the
  gray-400 focus family (ours: h-11 sm:h-12 rounded-xl slate-200
  slate-600 placeholder, slate-400 focus); the labels text-gray-700; the
  hint text-xs(12px) text-gray-500 (ours: text-sm slate-500); the
  subtitle text-gray-600 (ours: slate-500); the primary buttons h-11
  rounded-md bg-gray-900 hover:bg-gray-800 (ours: h-12 rounded-xl
  slate-900); the token-state back button text-gray-600 (ours:
  slate-600); the error box role=alert text-base text-zinc-950
  bg-red-50/50 border-red-200 rounded-lg p-4 (ours: text-sm text-red-700
  bg-red-50/70 px-4 py-3); the token form's 2px bg-gray-900 absolute top
  strip (ours: the 4px slate gradient accent on BOTH states); the
  invalid-link card's icon an 80×80 rounded-full bg-red-100 wrap + the
  40×40 red-600 CircleAlert (ours: 40×40 bg-red-50 + 20×20 icon) and NO
  strip on that state (ours carries the accent there).
- **F-26d (THE RECORD CORRECTION)**: the signup page's session-10 comment
  ("the live platform now serves the URL as a 200-status soft-404 — the
  base44 DeadEndPage") is STALE for the current bundle — the reference now
  serves its DESIGNED 404 there (the quoted-path body "The page "signup"
  could not be found", the round-25 family), and its "Signup |
  EleganceFlow" title is that family's DERIVED title. Our working-superset
  signup card stands; the comment is corrected. The reset screen's
  session-163 doc comment ("reads as one design system with the
  login/signup cards") is corrected to the platform-family mirror.
- **F-26e (the positive censuses, no action)**: (1) the login card's
  IN-CARD forgot views — "Reset your password" / "Email" /
  you@example.com / "Send reset link" / "Back to sign in" / the sent card
  "Check your email … We've sent password reset instructions to {email} …"
  with role=alert on BOTH apps — byte-identical, the session-199 mirror
  stands, first time probed; (2) the reference's reset delivery is
  EMAIL-ONLY (no in-app link even for the real operator account) — our
  in-app resetUrl + "Open your password reset link" is OUR documented
  superset (round-20 F-20a, the NEO_DISABLE_IN_APP_RESET kill-switch),
  kept; (3) the reference's login input placeholder ink slate-600 ==
  ours (the [login] leg never read it — now recorded); (4) the
  reset-submit error text and the "Back to Login"→/login and
  "Back to login"→/login navigation rides identical both apps.
- **F-26f (the coverage catch)**: NONE of the /reset-password face family
  carried a pin — the reset e2e rides flows (the funnel, the guards), the
  unit batteries pin the API contract, no drift leg ever read the route.
  A class-edit on the family (or a reversion to the login family) would
  ship with every gate green.

## The cures (TDD — the pin battery is born RED; the mutation proof follows)

1. **The layout seam** `RESET_LAYOUT` in `src/lib/page-layout.ts` — the
   platform family as class constants (the LOGIN_LAYOUT pattern):
   the flat gray-50 page, the white rounded-lg shadow-lg card, the fixed
   48/48/40 inner, the h2 24px gray-900 heading, the gray-700 labels,
   the h-11 rounded-md gray control family (inputs + buttons + focus),
   the zinc-500 placeholder, the gray-600 subtitle/back, the 12px
   gray-500 hint, the red-100 80×80 icon wrap, the 2px gray-900 strip.
2. **The screen rewrite** — `src/components/layout/reset-password-screen.tsx`
   rides RESET_LAYOUT on all three states (invalid-link / token form /
   success): the Title-Case text family, the h2 tags, the per-state chrome
   (strip on the token form alone), the error box re-pinned, the success
   state re-skinned (the uncensused-because-unreachable superset face on
   the mirrored family). The superset keeps: autoComplete="new-password"
   ×2, the name/id attrs, role="alert", the mismatch guard.
3. **The JSON-LD** — `src/app/reset-password/page.tsx` rides
   `breadcrumbJsonLd("/reset-password")` (the F-26b cure) + the record
   corrections (F-26d) here and on the signup page.
4. **The pins** — `tests/reset-faces.test.ts` (+5, the 46th unit file):
   ① the RESET_LAYOUT seam family (the platform literals, incl. the
   fixed-ladder keeps — no sm:/md: arms on the controls), ② the DOM-case
   text family (the Title-Case quartet + the sentence-case keeps + the
   error/success texts), ③ the JSON-LD wiring (the page script tag + the
   seam call), ④ the superset keeps (autocomplete ×2, role=alert, the
   guard), ⑤ the retired-form regression (the LOGIN_LAYOUT family never
   returns on the reset screen — no slate inks, no rounded-xl, no
   shadow-2xl, no gradient page, no 30px title, no h1). Born RED ①–④
   (⑤ green by design until the rewrite lands, then all five).
5. **The mutation proof** — 5 classes bite (the seam literals, the text
   case, the JSON-LD drop, the autocomplete drop, a planted login-family
   class), all restored cmp-identical via the /tmp backup harness.
6. **The e2e legs** — `tests/e2e/reset-password.spec.ts` gains the FACE
   battery on the standalone artifact (+4): the invalid-link card's
   platform face (the Title-Case heading + button, the 80×80 icon, the
   44/6px controls, the JSON-LD, the ride to /login); the token form's
   platform face (the Title-Case labels, the h2 24px, the 44/6/gray
   control family, the 2px strip, the JSON-LD); the retired-form
   negatives (no rounded-xl/shadow-2xl/gradient); the a11y superset
   keeps (autocomplete ×2, the role=alert error after the bogus submit).
   The three stale heading assertions re-pinned to the exact Title Case.
7. **The drift leg** — `scripts/drift-199.ts` gains the [reset] census
   leg (the 15th): the invalid-link + token-form faces diffed REF vs OURS
   (the text family, the heading/label fonts, the input/button computed
   family incl. the placeholder ink, the card chrome, the icon family,
   the strip, the error box after the bogus-token submit, the JSON-LD
   presence) — the v3-shadow-shim and oklab-serialization classes pinned
   per-side against their RECORDED constants where the paint is equal
   (the google-leg expectConst pattern).
8. **The ladder + docs** — the count ladder re-locked at 523/46 · e2e
   105/8 · drift 15 legs · SOURCE_CONTRACTS 33 — every root doc, the
   census battery's list, and the worklog verification line re-locked;
   the captures refreshed; the session log written.

## The execution order

R-1 the pin battery born RED → R-2 the seam + the screen + the JSON-LD →
R-3 GREEN + the mutation proof → R-4 the e2e legs (rebuild the artifact
first — the round-18 stale-standalone lesson) → R-5 the drift leg →
R-6 the ladder + the docs → R-7 the captures → R-8 the full gate +
the live probes → R-9 the ship.
