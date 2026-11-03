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
   → `bun run test` (343) → `bun run build` → `./scripts/smoke-test.sh`
   (14) → `CI=1 bun run test:e2e` (53). The `gate` script chains them.
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
inquiries (vs. toast-only), the authenticated inbox, the designed 404
with a true 404 status (vs. the reference's blank SPA shells), the
SEO metadata family (the reference ships none), deep-linkable
`/signup` + `/reset-password`.

## Development Workflow

### Everyday commands

```bash
bun run dev        # :3000
bun run test       # vitest (343 checks / 24 files)
bun run test:e2e   # playwright (53 checks / 6 specs) — build first
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
  `@theme` only (no JS config); the six re-pin traps are documented in
  `AGENTS.md` and `docs/Tailwind-V4-Validation-Report.md`. Sharp
  corners on the landing (the reference ships radius 0); amber-500
  accents; zinc-950 sections.
- **Icons**: `lucide-react` at the reference's exact sizes (28
  services, 20 portfolio arrows, 40 the quote mark, 16 contact, 14 the
  select chevron).

## Testing Strategy

- **Unit (Vitest, 24 files / 343 checks)** — the seam batteries (auth,
  password, rate-limit, parse-body, db-path, boot-env, census, schemas,
  coercion-guards, bounded-reader, http-headers, chunk-recovery,
  login-reset) + the source-contract pins (`site-content`,
  `inquiry-schemas`, `landing-page`, `auth-surfaces`, `auth-contract`,
  `auth-reset`, `body-pregate`, `gate-script`, `error-boundaries`,
  `toast-anatomy`, `sitemap-routes`) — comment-stripped source reads; a
  literal pinned by a comment alone is vacuous.
- **E2E (Playwright, `tests/e2e/*.spec.ts`)** — the standalone
  artifact on :3100 with `db/e2e.db`; ONE shared login
  (`auth.setup.ts` → storageState); one worker; alphabetical file
  order → every spec is SELF-SUFFICIENT (its own probe rows on an
  isolated `x-forwarded-for` bucket). The mobile-navigation battery is
  the operator's standing emphasis.
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
