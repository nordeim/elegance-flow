// Session-170 (WP-4): THE ERROR-BOUNDARY FAMILY — the two resilience
// surfaces the repo never had (the scandihaven ports, the s169-deferred
// "new visual surface" rotation — this one):
//
//   src/app/error.tsx        the route-segment boundary — renders inside
//                             the root layout (which stays alive), wired
//                             to reloadOnStaleChunk + reset()
//   src/app/global-error.tsx the root boundary — replaces the root
//                             layout entirely (own <html lang="en"> +
//                             <body>), imports ./globals.css itself (a
//                             crashed root layout never loaded it)
//
// The house contract (source-pinned, the page-layout family idiom):
//   "use client" on both (reset/digest are client concerns)
//   the reloadOnStaleChunk(error) wiring in useEffect with [error] deps
//   the digest-ref conditional ((ref: ${error.digest}))
//   the reset() "Try again" button
//   ZERO component-tree imports beyond the recovery seam (a resilience
//   surface must not depend on the tree that might be broken)
//   the copy vocabulary: Something went wrong / An unexpected error
//   occurred / We have logged the issue / Try again
//
// Plus the smoke-script contract (WP-5's surface): the §13.4 skeleton
// pinned — the smoke db, the :3210 port, the assertion ladder, the
// artifact-hygiene block, the boot-gate probe.
//
// RED at birth (the files do not exist yet); GREEN when WP-4/WP-5 land.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const read = (p: string) => readFileSync(join(root, p), "utf8");

describe("session-170 (WP-4): the route-segment boundary (src/app/error.tsx)", () => {
  const src = read("src/app/error.tsx");

  it('is a client component ("use client")', () => {
    expect(src).toContain('"use client"');
  });

  it("wires the stale-chunk self-heal in useEffect with the [error] deps + the guarded storage hand-off (round-37 F-37a)", () => {
    expect(src).toContain("reloadOnStaleChunk(error, { storage: browserSessionStorage() })");
    expect(src).toMatch(/useEffect\(\(\) => \{[\s\S]*?reloadOnStaleChunk\(error, \{ storage: browserSessionStorage\(\) \}\)[\s\S]*?\}, \[error\]\)/);
  });

  it("carries the reset() Try-again affordance + the digest ref", () => {
    expect(src).toContain("reset");
    expect(src).toContain("Try again");
    expect(src).toContain("error.digest");
  });

  it("carries the copy vocabulary", () => {
    expect(src).toContain("Something went wrong");
    expect(src).toContain("An unexpected error occurred");
    expect(src).toContain("We have logged the issue");
  });

  it("imports NOTHING from the component tree beyond the recovery seam (the resilience posture)", () => {
    const imports = [...src.matchAll(/^import .* from "([^"]+)"/gm)].map((m) => m[1]);
    expect(imports).toContain("@/lib/chunk-recovery");
    for (const imp of imports) {
      expect(imp.startsWith("@/components/")).toBe(false); // no tree deps
    }
  });

  it("does NOT render html/body (the root layout stays alive around it)", () => {
    expect(src).not.toContain("<html");
    expect(src).not.toContain("<body");
  });
});

describe("session-170 (WP-4): the root boundary (src/app/global-error.tsx)", () => {
  const src = read("src/app/global-error.tsx");

  it('is a client component ("use client")', () => {
    expect(src).toContain('"use client"');
  });

  it("renders its own <html lang> + <body> (it replaces the crashed root layout)", () => {
    expect(src).toMatch(/<html lang="en">/);
    expect(src).toMatch(/<body/);
  });

  it("imports ./globals.css itself (a crashed root layout never loaded it)", () => {
    expect(src).toContain('import "./globals.css"');
  });

  it("wires the same recovery + copy + reset contract as the segment boundary (the guarded storage hand-off included)", () => {
    expect(src).toContain("reloadOnStaleChunk(error, { storage: browserSessionStorage() })");
    expect(src).toContain("reset");
    expect(src).toContain("Try again");
    expect(src).toContain("error.digest");
    expect(src).toContain("Something went wrong");
    expect(src).toContain("An unexpected error occurred");
  });

  it("imports NOTHING from the component tree beyond the recovery seam", () => {
    const imports = [...src.matchAll(/^import .* from "([^"]+)"/gm)].map((m) => m[1]);
    expect(imports).toContain("@/lib/chunk-recovery");
    for (const imp of imports) {
      expect(imp.startsWith("@/components/")).toBe(false);
    }
  });
});

describe("session-170 (WP-5): the smoke leg (scripts/smoke-test.sh, the §13.4 skeleton)", () => {
  const script = read("scripts/smoke-test.sh");

  it("pins its own database + port + secret (immune to the shell-env trap)", () => {
    expect(script).toContain('file:../db/smoke.db');
    expect(script).toContain("3210");
    expect(script).toMatch(/AUTH_SECRET/);
    expect(script).toContain("set -euo pipefail");
  });

  it("boots the STANDALONE artifact + health-waits before asserting", () => {
    expect(script).toContain(".next/standalone/server.js");
    expect(script).toContain("/api/health");
    expect(script).toContain("NODE_ENV=production");
  });

  it("asserts the §13.4 ladder: 401s, the login round-trip, the invalid 400, the 429, the page greps", () => {
    expect(script).toContain("401");
    expect(script).toMatch(/neo_session/);
    expect(script).toContain("400");
    expect(script).toContain("429");
    expect(script).toMatch(/<title>/);
  });

  it("carries the artifact-hygiene assertions (the F-170a cure policed at every smoke run)", () => {
    expect(script).toContain(".next/standalone/$entry");
    expect(script).toContain('for entry in .env .git db skills docs uploads worklog.md test-results dev.log');
  });

  it("carries the boot-gate probe (a secretless production boot must refuse to serve)", () => {
    expect(script).toContain("AUTH_SECRET=\"\"");
    expect(script).toContain("refuses");
  });

  it("kills its own server on exit (the trap)", () => {
    expect(script).toContain("trap");
  });
});
