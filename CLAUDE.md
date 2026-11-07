---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# EleganceFlow

## Core Identity & Purpose

EleganceFlow is a production-grade clone of the reference creative-studio
site (`https://colossal-elevate-service-flow.base44.app/`) built as a
single Next.js 16 application — plus a functional superset: the
reference's contact form only answers a toast; ours persists every
inquiry and gives the studio team an authenticated inbox at
`/dashboard` (list / search / status transitions / two-step delete).
The public surface (the one-page landing: hero, about, services, work,
testimonials, contact, footer, the inline mobile menu) mirrors the
reference's DOM byte-for-byte — nine live Playwright probes extracted
every class string, text node and icon size; the parity bar is
computed-face identity, proven live at 1280 and 390
(`scripts/parity-199.ts`).

Maintained by the repo owner (nordeim); agents work directly on `main`.

Key technical decisions that shape everything else: Next.js 16 App
Router with a server-guarded `(app)` route group, Prisma + SQLite
(zero-config, path-normalized), hand-rolled scrypt + HMAC cookie
sessions (zero auth dependencies), Zod at every body-parsing seam, and
Tailwind CSS v4 configured CSS-first (literal-hex `@theme` tokens
re-pinned to the reference's v3 palette).

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)

1. **ANALYZE** — Read the relevant files in full before planning; never
   work from partial excerpts. Identify explicit requirements, implicit
   needs and ambiguities. Check what the reference app actually does
   before assuming (probe it live — `scripts/extract-ef-reference*.ts`
   are the templates).
2. **PLAN** — Write a structured plan with sequential phases; confirm
   scope with the user before implementing when the request is
   ambiguous. Session plans live under `docs/plans/`.
3. **VALIDATE** — Verify assumptions against executable truth (configs,
   lockfiles, the running app) — prose docs may be stale.
4. **IMPLEMENT** — Incremental, testable components. Extend the pure
   seams in `src/lib/` rather than inlining logic. Keep lint green as
   you go.
5. **VERIFY** — Run the full gate: `bun run lint` → `bun run typecheck`
   → `bun run test` (641) → `bun run build` → `./scripts/smoke-test.sh`
   (14) → `CI=1 bun run test:e2e` (130). The `gate` script chains them.
6. **DOCUMENT** — Update the touched docs (`README.md`, this file, the
   PAD, `worklog.md`) in the same change; the counts in the docs must
   match the suites (the lockstep doctrine — doc claims about the tree
   are verified against it, never written from memory).

### Reference-Parity Doctrine

The landing mirrors the reference's COMPUTED face, never blindly its
class literals: if a reference class never takes effect in its own
build (the `leading-[0.9]` family), our port reproduces the computed
face (`leading-[0.9] md:leading-none`), with the decode documented at
the site. Deviations on the reference's faces are limited to invisible
a11y supersets (label bindings, `aria-expanded`) — never visible
construction. OUR OWN surfaces (the inbox, the shell) pass WCAG AA
outright and cite no sanctioned matchers.

### Superset Doctrine

Deviations must be functional supersets, documented: persisted
inquiries (vs. the reference's POST-less panel swap), the authenticated inbox, the designed 404
with a true 404 status (vs. the reference's blank SPA shells), the
SEO metadata family (round-24 record correction: the reference's
RENDERED head ships the full meta family — runtime-injected, which the
prior "ships none" record missed by reading the raw SPA shell — ours
now mirrors its description/og/twitter/manifest family and the
og-image/icon BYTES; the remaining supersets are the sitemap's
deep-linkable public URLs, the every-page theme-color, the honest icon
types vs its svg+xml type-lie, and the apple-touch-icon),
deep-linkable `/signup` + `/reset-password`.

## Development Workflow

### Everyday commands

```bash
bun run dev        # :3000
bun run test       # vitest (641 checks / 57 files)
bun run test:e2e   # playwright (130 checks / 8 specs) — build first
bun run gate       # the full chain, in order
bun run db:census  # MUST print "pristine: MATCH" before you trust any db read
```

See `AGENTS.md` for the complete command table and the non-obvious
rules (database path resolution, rate-limit budgets, the e2e
self-sufficiency contract, the SSH push wrapper).

### Environment

`.env` (from `.env.example`): `DATABASE_URL="file:../db/custom.db"`
(the `db/` folder at the repo root), `AUTH_SECRET` (required ≥16 chars
in production — the boot gate refuses to serve without it),
`NEXT_PUBLIC_SITE_URL` (inlined at build time).

## Implementation Standards

- **TypeScript strict**; no `any` in new code (`unknown` + narrowing).
- **API**: every route answers the `{ ok, data } / { ok, error }`
  envelope via `src/lib/api.ts`; bodies parse through
  `parseBody(req, zodSchema)`; DB writes wrap in try/catch →
  `ERR.INTERNAL()`. Never a bare `req.json()` (unit-gated).
- **Components**: pure presentation; content strings live in
  `src/lib/site-content.ts` (the one source, unit-pinned, DOM-case).
- **Styling**: Tailwind v4 CSS-first — tokens in `globals.css`
  `@theme` only (no JS config); the eight re-pin traps are documented in
  `AGENTS.md` and `docs/Tailwind-V4-Validation-Report.md`. Sharp
  corners on the landing (the reference ships radius 0); amber-500
  accents; zinc-950 sections.
- **Icons**: `lucide-react` at the reference's exact sizes (28
  services, 20 portfolio arrows, 40 the quote mark, 16 contact, 14 the
  select chevron).

## Testing Strategy

- **Unit (Vitest, 57 files / 641 checks)** — the seam batteries (auth,
  password, rate-limit, parse-body, db-path, boot-env, census, schemas,
  coercion-guards, bounded-reader, http-headers, chunk-recovery,
  login-reset) + the source-contract pins (`site-content`,
  `inquiry-schemas`, `landing-page`, `auth-surfaces`, `auth-contract`,
  `auth-reset`, `body-pregate`, `gate-script`, `error-boundaries`,
  `toast-anatomy`, `sitemap-routes`, `deployment-doc-census`,
  `count-ladder-census`, `re-pin-tokens`, `doc-pointer-census`,
  `dead-code-census`, `focus-contract`, `inbox-states`,
  `landing-images`, `focus-outline`, `preflight-faces`,
  `motion-glyph`, `geometry-faces`, `auth-validation`, `head-faces`,
  `interaction-faces`, `auth-failure-faces`, `google-fallback`,
  `viewport-faces`, `anchor-faces`, `document-assets`,
  `route-mechanics`, `reset-faces`, `error-faces`, `reveal-faces`,
  `reduced-motion-faces` — the round-29 battery: the
  prefers-reduced-motion census, pinning the globals reduce block (the
  deliberate a11y superset — the reference ships zero reduce handling,
  its raf reveal still animating under reduce vs OUR 0.01ms collapse),
  the delay-survival contract, the seam purity, and the PAD doc-stratum
  cures: the 18-module Layer-1 list + the reveal-family REPRODUCED
  record, `forced-colors-faces` — the round-31 battery: the forced-colors/theme-face census, pinning the last un-emulated media axis (both apps collapse identically to the system palette — CanvasText/Canvas/LinkText — zero forced-colors rules and no adjust override on either side, the reference's own zero-handling posture; the featured-card class-literal decode — OURS spells bg-amber-500 the reference's own DOM does not carry, the computed faces identical, the s11 doctrine; the theme faces: accent-color auto + color-scheme normal, neither app declares either), `body-ink-faces` — the round-30 battery: the body-ink/
  print-media census, pinning the BODY element's dead-face divergence
  (the round-13 single-token compromise's sacrificed side — REF
  neutral-950 rgb(10,10,10) vs OURS zinc-950 rgb(9,9,11)), the
  no-rider construction (every visible text carries explicit ink), and
  the zero-print-rules posture (both apps ship none — the reference's
  own zero-handling face), `color-scheme-faces` — the round-32
  battery: the color-scheme/media-surface-completion census, pinning
  the one emulateMedia axis round-31 excepted (under dark AND light
  emulation nothing moves on either app — html color-scheme normal,
  zero prefers-color-scheme rules, the recorded per-side constants
  scheme-invariant: the body-ink dead face + the login email's s18
  serialization pair; the superset forced-colors a11y sweep — axe-core
  under forcedColors on /dashboard returns zero violations),
  `probe-load-contract` — the round-33 battery: the probe-tooling
  HMR-tolerance cure (the four live scripts navigate through
  `scripts/probe-load.ts` — a bare networkidle goto never settles
  against the dev server's Turbopack HMR websockets and wedges the
  probe; the helper's domcontentloaded-first + bounded-networkidle +
  settle contract pinned, plus the forced-colors landing-register
  e2e leg's source contract) — EXTENDED round-36 with the STABILITY
  GUARD: the cold-boot Fast-Refresh reload-loop catch (a cold dev boot
  after a gate's build can loop full-page reloads forever, wedging
  every probe and reading un-hydrated faces — the mobile toggle's
  aria-expanded false; the helper counts main-frame navigations across
  its settle window, absorbs a stray reload through one confirming
  extension, and throws the diagnosed restart-cure error on a
  sustained loop; plus the drift runtime-budget doc pins — ~6.5
  minutes, never a sub-10-minute wrapper),
  `scroll-behavior-attr` — the round-34 battery: the route-transition
  scroll cure (the `<html>` element's `data-scroll-behavior="smooth"`
  attribute — the Next.js 16 contract that lets the App Router wrap
  its transition scrolls in scroll-behavior: auto; without it the
  router's scroll-to-top rides the CSS smooth rule — live-proven: the
  post-login transition animated 300→115 across ~500ms; the attribute
  + the globals smooth rule + the two e2e legs' source contracts
  pinned),
  `orientation-faces` — the round-35 battery: the orientation-family
  census (the landscape phone 844×390 + the ROTATION ride — an open
  mobile menu crossing the md boundary hides both `md:hidden` faces
  while the state survives, the panel reopening on the way back, the
  reference's own face; the landscape print/login/axe faces all
  IDENTICAL both apps; neither app ships an orientation directive —
  the landscape face is purely width-driven; the md:hidden pair +
  the three e2e legs' source contracts + the AGENTS.md doc pin),
  `storage-faces` — the round-37 battery: the storage-family census +
  the inert-cooldown cure (the axis no probe ever read: the reference's
  platform writes localStorage key families per surface — the landing's
  analytics four, the login's own i18nextLng, the post-login seven —
  vs OUR ZERO-KEY posture everywhere; the session rides the httpOnly
  cookie, document.cookie reads empty; the F-37a catch: both error
  boundaries called the stale-chunk seam BARE — the cooldown flag
  never written in production, the crash-mid-reload loop guard inert —
  cured by the guarded `browserSessionStorage()` hand-off; the app-wide
  zero-localStorage census + the single sanctioned sessionStorage seam +
  the seam's storage purity + the drift [storage] leg + the AGENTS.md
  doc pin),
  `network-faces` — the round-38 battery: the network-family census +
  the tech-disclosure cure (the request axis no probe ever read: the
  reference's platform fires a four-request beacon family per landing
  load — the User/me session check, the bodyless app-log, the
  public-settings fetch, the analytics batch — vs OUR zero-beacon
  document-only posture: every fetch in src/ user-initiated, the
  beacon families absent from the tree; the F-38a catch: the scaffold
  default `poweredByHeader: true` disclosed `X-Powered-By: Next.js` on
  every server-rendered HTML face while the reference ships none —
  cured by the one-flag `poweredByHeader: false`; the beacon
  impossibility census + the same-origin fetch census + the drift
  [network] leg + the e2e zero-disclosure legs + the AGENTS.md doc
  pin) —
  comment-stripped source reads; a literal pinned
  by a comment alone is vacuous.
- **E2E (Playwright, `tests/e2e/*.spec.ts`)** — the standalone
  artifact on :3100 with `db/e2e.db`; ONE shared login
  (`auth.setup.ts` → storageState); one worker; alphabetical file
  order → every spec is SELF-SUFFICIENT (its own probe rows on an
  isolated `x-forwarded-for` bucket). The mobile-navigation battery is
  the operator's standing emphasis; the keyboard-operability battery
  (round-10) pins the keyboard rides + the focus-visible computed
  faces; the inbox-states battery (round-11) pins the five state faces
  + the client-error census (zero console/page errors, the designed
  404's sanctioned register).
- **Smoke (`scripts/smoke-test.sh`)** — 14 rungs against the
  standalone artifact on :3210 with `db/smoke.db`: health, auth walls,
  the SSR faces, the login round-trip, the Zod 400, the public inquiry
  201, the logout teardown, the rate-limit 429, the SEO family, the
  secretless-boot refusal, artifact hygiene.
- **Live parity (`scripts/parity-199.ts`)** — computed-style diff vs
  the live reference at both viewports; every face must compute
  identical.

## Git & Version Control

- `main` only; Conventional Commits; atomic commits.
- Push over SSH via `docs/ssh_git_wrapper_v3.py` (see
  `docs/how-to-git-push-using-ssh-wrapper_SKILL.md`).
- Never commit: keys, the paramiko shim, `db/`, logs, test artifacts.

## Error Handling & Debugging

- Envelope errors carry honest, actionable messages; the catch-all is
  `ERR.INTERNAL()`.
- The boot gate (`src/lib/boot-env.ts`) fail-fasts a misconfigured
  production boot and names the fix in the log.
- A stale standalone server is the classic e2e trap — always `CI=1` or
  rebuild; `reuseExistingServer` otherwise reuses stale code.
- Rate-limit 429s in repeated local runs: the buckets are per-IP/15
  min; wait the window or export `CI=1`.

## Project-Specific Standards

- The domain language: an **inquiry** is a landing contact-form row
  (status `new | read | archived`); **the studio team** are the
  authenticated users; **the reference** is
  `colossal-elevate-service-flow.base44.app`.
- `worklog.md` at the root carries the per-task log; `docs/plans/`
  carries the session plans; `docs/screenshots/` carries both apps'
  captures.
