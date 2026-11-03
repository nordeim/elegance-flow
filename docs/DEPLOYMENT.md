# Deployment Guide

EleganceFlow ships as a single Next.js **standalone** build with a SQLite
file database — one process, zero external services. This guide covers
the supported production paths and the environment contract.

## 1. Build

```bash
bun install
bun run build          # next build + standalone assembly (.next/standalone)
```

The build compiles the page shell (the landing, the auth card family, the
server-guarded `/dashboard`), the **11 API route files (13 verb
handlers** — the 8-route auth family, the inquiry pair `POST/GET` +
`PATCH/DELETE /api/inquiry/[id]`, and `GET /api/health`**)** and the 3
SEO route handlers (`/robots.txt`, `/sitemap.xml`, `/manifest.json`) —
22 routes in the build table — then copies `.next/static` and `public/`
into `.next/standalone/` (see the `build` script in `package.json`).
`next.config.ts` pins `outputFileTracingRoot` to the repo root — keep it;
the standalone trace depends on it.

## 2. Run

```bash
bun run start          # NODE_ENV=production bun .next/standalone/server.js
```

The server listens on port 3000 by default (`PORT` overrides). Always
start it from the repo root via the npm/bun script — the scripts
guarantee the working directory that the SQLite path resolution and the
standalone trace rely on. **Cookie scheme note (session-67):** the
session cookie's `Secure` flag derives from `NODE_ENV` (set in
production boots) — the app NEVER reads `X-Forwarded-Proto` or any other
request header to decide it. Behind an HTTPS-terminating reverse proxy
that speaks plain HTTP to the app, `NODE_ENV=production` is what marks
the cookie `Secure`; a plain-HTTP production boot still sets `Secure`,
and browsers will silently drop the cookie (a login loop) — serve the
app over HTTPS end-to-end or terminate TLS at the app process if you
must run without the flag.

## 3. Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | SQLite connection string. See §4. |
| `AUTH_SECRET` | **Yes in production** | HMAC secret for session cookies. Generate with `openssl rand -hex 32`. Must be at least 16 characters — in production a missing OR shorter value **FAILS FAST AT BOOT** (`src/lib/boot-env.ts` via `src/instrumentation.ts`: the server refuses to serve, and the `[boot]` log names the fix — pinned by smoke rung 13). Dev/test fall back to the insecure dev-only constant with a server warning. Never ship the dev constant. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical public origin, used for `metadataBase`, the OG/Twitter cards, `/robots.txt`, `/sitemap.xml` and `/manifest.json` (e.g. `https://eleganceflow.example.com`). **Inlined at build time** — set it before `bun run build`. A localhost/unset value in production logs a boot warning. |
| `NEO_PROXY_HOPS` | Optional | Trusted `x-forwarded-for` proxy depth for the rate-limit IP key. Unset = 1 (exactly one appending proxy — the LAST hop is the client). `0` = direct exposure. Unparsable values fail CLOSED onto 1 (a bad value never widens trust). |
| `NEO_DISABLE_IN_APP_OTP` | Optional | `"1"` stops the signup/resend responses carrying the demo verification code (a real mail transport owns delivery). |
| `NEO_DISABLE_IN_APP_RESET` | Optional | `"1"` stops the forgot-password response carrying the demo reset link (same posture). |

## 4. Database location (§4 — the `.env.example` reference)

`DATABASE_URL` accepts three forms:

1. **Relative `file:` URL (the default, zero-config local story).**
   ```
   DATABASE_URL="file:../db/custom.db"
   ```
   Relative URLs resolve against the **`prisma/` directory that owns
   `schema.prisma`** — exactly like the Prisma CLI — so this string points
   at `<repo>/db/custom.db` for `prisma db push`, `prisma/seed.ts`,
   `next build` and the running server alike, regardless of the process
   working directory. The resolution rule lives in
   `src/lib/db-path.ts` and is pinned by `tests/db-path.test.ts`.

2. **Absolute `file:` URL (recommended for production).**
   ```
   DATABASE_URL="file:/var/lib/eleganceflow/custom.db"
   ```
   Absolute paths pass through untouched — immune to any working-directory
   ambiguity across service managers, containers, or cron wrappers. Point
   them at a persisted volume and back the file up.

3. **PostgreSQL.** Switch `provider = "postgresql"` in
   `prisma/schema.prisma`, set a `postgresql://` URL, then
   `bun run db:push && bun run db:seed`.

Initialize (or reset) the database with:

```bash
bun run db:push        # apply schema (db push — no migrations folder)
bun run db:seed        # idempotent demo workspace (wipes domain tables)
```

`db/*.db` is gitignored; every fresh clone recreates it from the two
commands above.

## 5. Updating

```bash
git pull
bun install
bunx prisma generate   # after schema changes
bun run db:push
bun run build
# restart the server process
```

## 6. Verification checklist

```bash
curl -s https://your-host/api/health    # {"ok":true,"data":{"status":"healthy","db":"up"}} (503 envelope on db-down)
bun run lint && bun run typecheck && bun run test
bun run gate                           # the one-command gate (local): lint → typecheck → test → build → smoke → e2e
```

## 7. Common production issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Error code 14: Unable to open the database file` | Server started from a directory that has no `prisma/schema.prisma` and no absolute `DATABASE_URL` | Start via `bun run start`, or set an absolute `file:` URL (§4) |
| The server refuses to boot: `[boot] AUTH_SECRET is missing or shorter than 16 chars` | The production boot gate (a forgeable-sessions refusal) | Set a real `AUTH_SECRET` (`openssl rand -hex 32`) and restart |
| Logins loop back to `/login` | `AUTH_SECRET` changed between restarts | Keep the secret stable across restarts |
| Rate-limited logins (429) | 10 attempts/IP/15 min fixed window | Wait for `Retry-After`, or restart to clear the in-memory buckets (single-node) |
