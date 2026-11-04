# AGENTS.md

EleganceFlow — a Next.js 16 App Router site cloned byte-mirrored from
`https://colossal-elevate-service-flow.base44.app` (a premium
creative-studio marketing one-pager) with a **functional superset**:
the reference's contact form only toasts; ours persists every inquiry
and serves an authenticated studio inbox at `/dashboard`.

The repo followed the domain-transformation doctrine at session-199
(the budget-wiser Task-190 precedent): the prior CRM domain's surfaces
retired, the infra seams carried verbatim, the app rebuilt from nine
live DOM probes of the reference. Git history preserves the CRM.

## Commands

```bash
bun install                      # the lockfile's 526 entries (bun.lock; bun's
                                 # install REPORT varies by platform — 425–522
                                 # observed; the lockfile entry count is the
                                 # stable claim)
bun run dev                      # dev server on :3000 (tee dev.log)
bun run build                    # standalone artifact (.next/standalone)
bun run start                    # the standalone server (production)

bun run lint                     # eslint --max-warnings 0 (the 0/0 standard)
bun run typecheck                # tsc --noEmit
bun run test                     # vitest run  (443 checks / 35 files)
bun run test:e2e                 # playwright (76 checks / 8 specs; needs build)
CI=1 bun run test:e2e            # force a fresh server (never reuse stale)

bun run db:push                  # prisma db push (SQLite at repo/db/custom.db)
bun run db:seed                  # idempotent seed (3 inquiries + 4 users)
bun run db:census                # counts vs the seed contract — MUST MATCH
./scripts/smoke-test.sh          # 14-rung standalone-artifact ladder (:3210)
bun scripts/parity-199.ts        # live parity vs the reference (dev server on :3000)
bun scripts/capture-199.ts       # the dev-server screenshot set

bun run gate                     # lint → typecheck → test → build → smoke → e2e
```

**Gate order before every push** (no hosted CI exists — the local gate
is the only gate): `lint → typecheck → test → build → smoke → e2e`.
The `gate` script encodes it; run that.

## Demo credentials (the seed contract)

- `sepnetflix2023@outlook.com` / `$Abcd1234` — the reference's own
  operator account, mirrored by the seed
- `sara.chen@eleganceflow.app` / `Demo1234!` (also omar.haddad, lena.fischer)

## Non-obvious rules an agent will miss

**Database path.** `.env` pins `DATABASE_URL="file:../db/custom.db"` —
relative `file:` URLs resolve against `prisma/schema.prisma` for the
Prisma CLI but against the process CWD at runtime; `src/lib/db-path.ts`
normalizes both to `<repo>/db/custom.db`. NEVER open a raw
`new PrismaClient()` — always import `@/lib/db` (the same singleton the
server uses). Censuses go through `bun run db:census` (it prints the
resolved path — a count without its path is not evidence). `db/` is
gitignored; the e2e and smoke runs use their own scratch files
(`db/e2e.db`, `db/smoke.db`).

**Auth is cookie-session, scrypt-hashed, zero-dependency.**
`src/lib/auth.ts` + `src/lib/password.ts` (node:crypto only). Every
session token embeds the row's `tokenVersion` — a password reset
increments it and evicts every prior cookie. The login family is
rate-limited per IP/15 min (login 10 / signup 10 / resend 5 / verify 20
/ inquiry 10) — the e2e suite signs in ONCE via
`tests/e2e/auth.setup.ts` (storageState), never per-test. A production
boot without a ≥16-char `AUTH_SECRET` refuses to serve
(`src/instrumentation.ts` → `src/lib/boot-env.ts`).

**API envelope.** Every route answers `{ ok: true, data }` or
`{ ok: false, error: { code, message } }` through `src/lib/api.ts`
(`ok`, `fail`, `ERR.*`, `parseBody`). Body parsing goes through
`parseBody(req, zodSchema)` — it composes the content-type CSRF gate,
the declared-length 16KB pre-gate, and the schema. A bare `req.json()`
anywhere in `src/app/api` fails the body-pregate unit gate. DB writes
wrap in try/catch → `ERR.INTERNAL()`.

**Tailwind v4 — EIGHT re-pin traps (all live in `src/app/globals.css`
@theme + the class-spelling sites).** The reference compiles v3-era CSS;
our v4 build diverges unless pinned: ① the v3 literal palette (zinc/amber/etc. re-pinned to
v3 hex — v4's oklch re-derivation differs at every step); ②
`--shadow-sm` (v4 renamed the scale one step heavier); ③ `--blur-sm`
(same rename family); ④ `space-y` puts margin-bottom on the preceding
child — inline elements ignore it, so the auth fields use
`[&>*+*]:mt-1.5` instead; ⑤ `@custom-variant hover (&:hover)` unwraps
v4's `(hover: hover)` media (touch devices never fired hovers); ⑥ the
reference's own class strings that never take effect in ITS build (the
`leading-[0.9]`/`leading-[0.95]` pair is beaten by its text-Nxl
line-height:1 rules at md+) port as `leading-[0.9] md:leading-none` —
copy the COMPUTED face, never the literal class (the s11 doctrine);
⑦ the `outline-none` semantic rename (v3 computes 2px-solid-transparent
+ offset-2; v4 spells style:none — only the `outline-2
outline-transparent outline-offset-2` composition ports the face);
⑧ `transition-colors`' property list expanded (v4 adds outline-color
+ the gradient vars; v4.3 hardcodes it — NOT theme-driven, and a
custom `@utility` colliding with the functional built-in is silently
dropped; the cure is the UNLAYERED `.transition-colors` rule
re-pinning the v3 six-property list — while `transition-transform`'s
v4 list is the LOAD-BEARING decode: v4 compiles translate-x/scale to
the individual properties, so re-pinning it would kill the hover
motions — never override it).
See `docs/Tailwind-V4-Validation-Report.md`.

**Reference parity is COMPUTED-face parity, proven live.** The landing
mirrors the reference's DOM byte-for-byte (class strings extracted by
nine Playwright probes, `scripts/extract-ef-reference*.ts`). The parity
bar: `bun scripts/parity-199.ts` diffs computed styles against the live
reference at 1280 and 390 — every probed face must compute IDENTICAL
(only the oklab/rgba serialization form of the scrolled header differs
— same paint, numerically proven). `docs/screenshots/` carries both
apps' captures.

**Case discipline.** The reference's DOM text is title-case ("Start a
Project", "What We Do"); the ALL-CAPS faces ride the CSS `uppercase`
transform. Locators and content pins use the DOM-case forms
(`src/lib/site-content.ts` is the one source).

**The mobile menu is the operator's standing emphasis.** At 390 the
header collapses to the hamburger; the toggle opens the reference's
INLINE disclosure panel (no drawer) — five links + the amber CTA, each
link click navigates AND closes. `tests/e2e/mobile-navigation.spec.ts`
pins every behavior; if it fails, fix the menu, never the test.

**A11y two-gate** (`tests/e2e/a11y.spec.ts`): structural violations
must be zero; color-contrast nodes on the LANDING must cite the
sanctioned register (the reference's own byte-parity palette — the
citations live in the spec). OUR OWN surfaces (the inbox, the shell)
carry no sanctioned matchers — they pass AA outright.

**Testing.** Vitest (`*.test.ts`, node env, `@` alias → `src/`) holds
the pure-seam batteries + source-contract pins (comment-stripped
source reads — a literal pinned by a comment alone is vacuous).
Playwright (`tests/e2e/*.spec.ts`) boots the STANDALONE artifact on
:3100 with `db/e2e.db`, one worker, alphabetical file order — specs
must be self-sufficient (never assert another spec's rows; use your own
probe row on an isolated `x-forwarded-for` bucket). The smoke ladder
(`scripts/smoke-test.sh`) validates the artifact on :3210 with
`db/smoke.db` — including the secretless-boot refusal and
artifact-hygiene checks.

**Git contract.** main only, no feature branches. Clone over HTTPS;
push over SSH (`git@github.com:nordeim/elegance-flow.git`) via
`python3 docs/ssh_git_wrapper_v3.py --key-file <key>` — see
`docs/how-to-git-push-using-ssh-wrapper_SKILL.md` (sandboxes without
an OpenSSH binary deploy the Appendix-A paramiko shim on PATH). Never
commit keys, the shim, `db/`, or `dev.log`/`server.log`.

**The skills catalog.** `skills/skills-catalog.md` indexes 100+ skills;
the repo's own lineage skill is `neo-crm_SKILL.md` (the CRM era) and
`elegance-flow_SKILL.md` (this domain). `docs/Tailwind-V4-Validation-Report.md`
is required reading before touching styling.
