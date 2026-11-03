import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The session-199 POST-SHIP AUDIT CATCH: the sitemap's ROUTES literal
// still carried the RETIRED CRM surface (/accounts, /contacts, /leads,
// /calendar, /activities, /reports, /settings, /profile, /about,
// /contact — every one a 404 after the domain transformation shipped;
// the manifest was rebranded but the sitemap was missed). The bug
// escaped because the sitemap's CONTENT was the one surface no test
// pinned: the smoke ladder's SEO rung and the e2e family assert only
// the 200s, and http-headers.test.ts pins only the content-type.
//
// The rule (the s18 "list what the router actually serves" decision,
// re-derived for the new domain): the sitemap carries exactly the
// PUBLIC CRAWLABLE page surface — the landing (priority "1.0") + the
// auth card family /login, /signup, /reset-password ("0.8"). The
// session-guarded (app) group and the api/ family are NEVER sitemap
// material — a crawler meets the login redirect or envelope JSON, not
// content.
//
// The battery pins the list against the LIVE directory census of
// src/app, so any future page addition or retirement that forgets the
// sitemap fails here (the census-overcount house pattern).
//
// The house convention (the s46/s66/s67 doctrine): source-contract pins
// read COMMENT-STRIPPED sources — a literal pinned by a record comment
// alone is a vacuous pin, and an absence pin must not fail on the
// retired form quoted inside its own documentation.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const sitemapSrc = () => stripComments(read("src/app/sitemap.xml/route.ts"));

const ROUTE_RE = /\{\s*path:\s*"([^"]*)"\s*,\s*priority:\s*"([^"]*)"\s*\}/g;

function sitemapRoutes(): Array<{ path: string; priority: string }> {
  const out: Array<{ path: string; priority: string }> = [];
  for (const m of sitemapSrc().matchAll(ROUTE_RE)) {
    out.push({ path: m[1] ?? "", priority: m[2] ?? "" });
  }
  return out;
}

const APP_DIR = path.resolve(import.meta.dirname, "..", "src", "app");

/**
 * Every PUBLIC page route the router actually serves: the root page
 * plus each non-group page directory. Route groups ("(app)") and the
 * api/ family are excluded by construction — they are never sitemap
 * material.
 */
function publicPageRoutes(): string[] {
  const routes = ["/"];
  for (const entry of readdirSync(APP_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("(") || entry.name === "api") continue;
    if (existsSync(path.join(APP_DIR, entry.name, "page.tsx"))) {
      routes.push(`/${entry.name}`);
    }
  }
  return routes.sort();
}

/** The session-guarded (app) group's pages — the never-listed family. */
function gatedRoutes(): string[] {
  const out: string[] = [];
  const group = path.join(APP_DIR, "(app)");
  if (!existsSync(group)) return out;
  for (const entry of readdirSync(group, { withFileTypes: true })) {
    if (entry.isDirectory() && existsSync(path.join(group, entry.name, "page.tsx"))) {
      out.push(`/${entry.name}`);
    }
  }
  return out;
}

describe("session-199 audit: the sitemap lists the router's real public surface", () => {
  it("the ROUTES literal resolves to exactly the public pages on disk", () => {
    const listed = sitemapRoutes().map((r) => r.path).sort();
    expect(listed).toEqual(publicPageRoutes());
  });

  it("the landing is the sole 1.0 entry; every other entry is 0.8", () => {
    const routes = sitemapRoutes();
    expect(routes.find((r) => r.path === "/")?.priority).toBe("1.0");
    for (const r of routes) {
      if (r.path !== "/") expect(r.priority).toBe("0.8");
    }
  });

  it("no retired CRM route survives in the list (the straggler regression pin)", () => {
    const src = sitemapSrc();
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
      expect(src).not.toContain(`"${retired}"`);
    }
  });

  it("the session-guarded (app) group is never listed", () => {
    const listed = sitemapRoutes().map((r) => r.path);
    for (const gated of gatedRoutes()) {
      expect(listed).not.toContain(gated);
    }
  });
});
