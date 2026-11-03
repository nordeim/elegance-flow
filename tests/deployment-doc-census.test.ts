import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The round-5 catch's own suggested-next, closed: docs/DEPLOYMENT.md —
// the runbook README §Deployment and PAD §8.3 point at — was the domain
// transformation's missed surface (the retired pre-CRM ORBITAL name, the
// CRM-era counts "29 API route files / 41 verb handlers", the retired
// AUTH_SECRET runtime-fallback description, the pre-envelope health
// example, an env table missing the NEO_* knob family). It escaped for
// the same reason the round-3 sitemap straggler did: a content surface
// NO test pinned. This battery is the docs-census pin — the
// sitemap-routes house pattern extended from route literals to prose
// doc claims.
//
// The rule: DEPLOYMENT.md's LIVE-TENSE counts and contracts are pinned
// against the live tree census (the filesystem for route counts, the
// boot-env source for the env knob family, the health route source for
// the wire example), so any future route addition/retirement, env-knob
// change, or boot-gate behavior change that forgets the runbook fails
// here — the census-overcount house pattern.
//
// The house convention (the s46/s66/s67 doctrine): source-contract pins
// read COMMENT-STRIPPED sources — a literal pinned by a record comment
// alone is a vacuous pin. DEPLOYMENT.md itself is a doc, not source: it
// is read RAW (its claims are the payload, not comments about them),
// and the ABSENCE pins (the retired names) must hold anywhere in the
// file — the round-5 catch quoted them nowhere precisely because the
// cure removed them entirely.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const doc = read("docs/DEPLOYMENT.md");

// The doc wraps at ~76 columns — "13 verb\nhandlers" is the SAME claim as
// "13 verb handlers". Every claim check (positive AND negative) runs
// against the whitespace-flattened form so a re-wrap can never hide a
// retired claim or orphan a live one.
const flat = doc.replace(/\s+/g, " ");

// ---- the live tree census -------------------------------------------------

const APP = path.resolve(import.meta.dirname, "..", "src", "app");
const API = path.join(APP, "api");

/** Every API route file under src/app/api (recursive). */
function apiRouteFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === "route.ts") out.push(p);
    }
  };
  walk(API);
  return out.sort();
}

/** The HTTP verb handlers across the API route files. */
function verbHandlers(): number {
  let n = 0;
  for (const f of apiRouteFiles()) {
    const src = stripComments(readFileSync(f, "utf-8"));
    n += (src.match(/export async function (?:GET|POST|PUT|PATCH|DELETE)\b/g) ?? []).length;
  }
  return n;
}

/** The auth family: the route.ts files directly under src/app/api/auth. */
function authFamily(): number {
  const dir = path.join(API, "auth");
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(path.join(dir, e.name, "route.ts")))
    .length;
}

/** The SEO route handlers: robots.txt · sitemap.xml · manifest.json. */
function seoHandlers(): string[] {
  return ["robots.txt", "sitemap.xml", "manifest.json"]
    .filter((name) => existsSync(path.join(APP, name, "route.ts")))
    .sort();
}

/** Every page route the router serves (root + top-level + the (app) group). */
function pageRoutes(): string[] {
  const out = ["/"];
  for (const e of readdirSync(APP, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith("(") || e.name === "api") continue;
    if (existsSync(path.join(APP, e.name, "page.tsx"))) out.push(`/${e.name}`);
  }
  const group = path.join(APP, "(app)");
  if (existsSync(group)) {
    for (const e of readdirSync(group, { withFileTypes: true })) {
      if (e.isDirectory() && existsSync(path.join(group, e.name, "page.tsx"))) {
        out.push(`/${e.name}`);
      }
    }
  }
  return out.sort();
}

/** The metadata-generated icon routes (Next's file convention). */
function iconRoutes(): string[] {
  return ["icon.png", "apple-icon.png"]
    .filter((name) => existsSync(path.join(APP, name)))
    .sort();
}

/**
 * The build table's total route count: every page + every API route
 * file + every SEO handler + every icon + the framework's /_not-found.
 * (next build's table also lists /_not-found once — counted here as the
 * +1, matching how the docs count "22 routes".)
 */
function buildTableTotal(): number {
  return (
    pageRoutes().length +
    apiRouteFiles().length +
    seoHandlers().length +
    iconRoutes().length +
    1
  );
}

// ---- the doc's count claims (regex-extracted, reformat-tolerant) -----------

const ABSENT = "(claim absent)";
function countClaim(re: RegExp): string {
  const m = flat.match(re);
  return m?.[1] ?? ABSENT;
}

describe("session-199 round-6: DEPLOYMENT.md's claims census against the live tree", () => {
  it("§1's API counts equal the live filesystem census", () => {
    expect(countClaim(/(\d+) API route files/)).toBe(String(apiRouteFiles().length));
    expect(countClaim(/(\d+) verb handlers/)).toBe(String(verbHandlers()));
    expect(countClaim(/(\d+)-route auth family/)).toBe(String(authFamily()));
  });
  it("§1's SEO handler count and the named handlers equal the live census", () => {
    expect(countClaim(/(\d+) SEO route handlers/)).toBe(String(seoHandlers().length));
    for (const name of seoHandlers()) {
      expect(flat).toContain(`/${name}`);
    }
  });

  it("§1's build-table total equals the live route census", () => {
    expect(countClaim(/(\d+) routes in the build table/)).toBe(String(buildTableTotal()));
  });

  it("no retired pre-CRM name or CRM-era count survives (the straggler regression pins)", () => {
    expect(flat.toLowerCase()).not.toContain("orbital");
    expect(flat).not.toContain("29 API route files");
    expect(flat).not.toContain("41 verb handlers");
  });

  it("no retired CRM route name appears as a path (the round-3 family)", () => {
    for (const retired of [
      "/accounts",
      "/contacts",
      "/leads",
      "/calendar",
      "/activities",
      "/reports",
      "/settings",
      "/profile",
      "/about",
      "/contact",
    ]) {
      expect(flat).not.toContain(retired);
    }
  });

  it("§3's env table covers exactly the live env contract (core + KNOWN_NEO_VARS)", () => {
    const bootSrc = stripComments(read("src/lib/boot-env.ts"));
    const known = new Set(
      [...bootSrc.matchAll(/"(NEO_[A-Z_]+)"/g)].map((m) => m[1] ?? ""),
    );
    expect(known.size).toBeGreaterThan(0); // the extraction itself is pinned
    for (const v of ["DATABASE_URL", "AUTH_SECRET", "NEXT_PUBLIC_SITE_URL", ...known]) {
      expect(flat).toContain(`\`${v}\``);
    }
    // And no invented knob: every NEO_ var the doc names is a known one.
    for (const m of flat.matchAll(/`(NEO_[A-Z_]+)`/g)) {
      expect(known.has(m[1] ?? "")).toBe(true);
    }
  });

  it("§3's AUTH_SECRET row describes the CURRENT fail-fast boot gate", () => {
    expect(flat).toContain("FAILS FAST AT BOOT");
    expect(flat).toContain("boot-env.ts");
    expect(flat).toContain("rung 13");
  });

  it("§6's health example equals the live health route's envelope face", () => {
    const healthSrc = stripComments(read("src/app/api/health/route.ts"));
    expect(healthSrc).toContain('ok({ status: "healthy", db: "up" })');
    expect(flat).toContain('{"ok":true,"data":{"status":"healthy","db":"up"}}');
  });
});
