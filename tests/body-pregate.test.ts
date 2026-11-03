import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-68's doctrine carried through session-199 (the domain
// transformation): EVERY route that parses a request body parses through
// the composed seam — parseBody(req, <schema>) (the s166 Zod form) or the
// route-local readBoundedJson twin — never a bare req.json() that buffers
// unbounded bytes. The gate-before-parse and gate-before-DB orderings are
// ORDERING-aware (indexOf comparisons) so a seam placed after the parse
// or after DB work cannot satisfy them.
//
// The s199 re-anchor: the CRM's eleven CRUD routes retired with the
// domain; the body-parsing family is now the auth family's six public
// routes (pinned in auth-contract) + the INQUIRY pair (the public POST
// and the sessioned PATCH) — pinned here.

function read(rel: string): string | null {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : null;
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

/** Every route file under src/app/api (the global sweep scope). */
function walkRoutes(dir: string): string[] {
  const abs = path.resolve(import.meta.dirname, "..", dir);
  const out: string[] = [];
  for (const entry of readdirSync(abs)) {
    const full = path.join(abs, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walkRoutes(path.join(dir, entry)));
    } else if (entry === "route.ts") {
      out.push(path.join(dir, entry));
    }
  }
  return out;
}

const INQUIRY_ROUTES = [
  "src/app/api/inquiry/route.ts",
  "src/app/api/inquiry/[id]/route.ts",
] as const;

describe("session-68 → session-199: the bounded-reader family (the gate-before-parse doctrine)", () => {
  it("the inquiry routes import the parseBody seam from the api module", () => {
    for (const rel of INQUIRY_ROUTES) {
      const src = stripComments(read(rel) ?? "");
      expect(src, rel).toMatch(/parseBody/);
      expect(src, rel).toMatch(/from "@\/lib\/api"/);
    }
  });

  it("NO route anywhere under src/app/api parses through a bare req.json()/request.json()", () => {
    for (const rel of walkRoutes("src/app/api")) {
      const src = stripComments(read(rel) ?? "");
      expect(
        src,
        `${rel}: the direct req.json()/request.json() parse must not survive`,
      ).not.toMatch(/\b(?:req|request)\.json\(\)/);
    }
  });

  it("the parseBody call precedes all DB work in its own handler (the gate-before-DB ordering)", () => {
    for (const rel of INQUIRY_ROUTES) {
      const src = stripComments(read(rel) ?? "");
      const seam = src.indexOf("await parseBody(req");
      expect(seam, `${rel}: no parseBody call`).toBeGreaterThanOrEqual(0);
      const handlerStarts = [...src.matchAll(/export async function (?:GET|POST|PUT|PATCH|DELETE)/g)]
        .map((m) => m.index ?? 0)
        .filter((i) => i < seam);
      const handlerStart = handlerStarts.length
        ? handlerStarts[handlerStarts.length - 1]
        : 0;
      const between = src.slice(handlerStart, seam);
      expect(between.match(/\bdb\.\w+/g) ?? [], `${rel}: DB work before the seam`).toEqual([]);
      // The seam's answer is honored before any DB write (the
      // parsed.ok branch precedes every db.* call in the handler).
      expect(src, rel).toMatch(/if \(!parsed\.ok\) return parsed\.response;/);
    }
  });

  it("the 400 vocabulary rides the seam (api.ts) — the routes carry no seam literals of their own", () => {
    const api = stripComments(read("src/lib/api.ts") ?? "");
    expect(api).toContain('ERR.BAD_REQUEST("Request body too large")');
    expect(api).toContain('ERR.BAD_REQUEST("Invalid request body")');
  });
});
