/**
 * Round-8 doc-pointer census: every path-shaped FILE reference in the
 * load-bearing doc set must resolve in the live tree — the
 * dangling-POINTER class finally gets its pin.
 *
 * The class lineage: round-5 caught DEPLOYMENT.md citing the retired
 * ORBITAL-era runbook claims; round-6 pinned DEPLOYMENT.md's COUNTS;
 * round-7 pinned the five root docs' count LADDER. What no battery
 * guarded: a load-bearing doc pointing at a FILE that no longer exists
 * — and round-8's audit found exactly that class live:
 * docs/Tailwind-V4-Validation-Report.md (required reading before
 * touching styling, cited by all five root docs) still named
 * tests/e2e/session7-parity.spec.ts and session8-parity.spec.ts — the
 * PRIOR domain's parity specs, retired at session-199.
 *
 * Scope contract (the doc set): the five root docs (the count-ladder
 * battery's own set) + docs/DEPLOYMENT.md + the Tailwind report. The
 * historical-tense surfaces (docs/session_*.md, docs/plans/*,
 * worklog.md) are EXEMPT BY DESIGN — a session log may legitimately
 * name a file the same round retires; the load-bearing set is what a
 * fresh agent navigates by.
 *
 * Extraction contract: URLs are stripped first (external GitHub
 * citations carry path-shaped fragments that are NOT tree pointers);
 * glob tokens (scripts/extract-ef-reference*.ts, tests/e2e/*.spec.ts)
 * never match the class-excluded pattern. Prefixes: tests|src|scripts|
 * prisma|docs — the app tree + the doc set. skills/ is deliberately
 * NOT swept: the vendored catalog is explicitly removable-for-fork
 * (skill §19), so no doc may be forced to point at it permanently.
 *
 * The lineage exemption: a doc MAY cite a retired file ONLY inside a
 * sentence that marks it (retired|lineage) — the marker rides the same
 * line as the citation. An exemption entry whose citation loses its
 * marker fails the battery: a future rewrite can never quietly restore
 * a dangling pointer to "current" reading.
 *
 * Documented NON-pins: db/*.db scratch names (run-time artifacts, not
 * tree files — a fresh clone has no db/); the AGENTS.md "526 packages"
 * bun-install output claim (already the count-ladder battery's own
 * documented non-pin); references without a directory prefix
 * (`.env.example`, `package.json`, `AGENTS.md` at the root).
 */
import { readFileSync, existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

// The load-bearing doc set — the five root docs + the two reference
// runbooks. A doc added to this set later joins the census here.
const DOC_SET = [
  "AGENTS.md",
  "CLAUDE.md",
  "README.md",
  "Project_Architecture_Document.md",
  "elegance-flow_SKILL.md",
  "docs/DEPLOYMENT.md",
  "docs/Tailwind-V4-Validation-Report.md",
] as const;

// The lineage exemption list: the retired prior-domain parity specs the
// Tailwind report's trap log cites. Every entry MUST keep its
// retired/lineage marker in the citing line (checked below).
const LINEAGE_EXEMPT: Record<string, readonly string[]> = {
  "docs/Tailwind-V4-Validation-Report.md": [
    "tests/e2e/session7-parity.spec.ts",
    "tests/e2e/session8-parity.spec.ts",
  ],
};

// Path-shaped FILE references: an app-tree or docs prefix, class-safe
// characters (no `*` — glob citations are patterns, not pointers), and
// a code/doc extension (longest-first: `tsx` before `ts`, else the
// pattern truncates .tsx citations at .ts). URLs are stripped BEFORE
// extraction so external GitHub citations (github.com/…/docs/foo.md)
// are never mistaken for tree pointers.
const POINTER_RE =
  /(?:tests|src|scripts|prisma|docs)\/[A-Za-z0-9_./-]+\.(?:tsx|ts|sh|css|mjs|prisma|md|py)/g;

const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf8");

// Extract [line, path] pairs: URLs stripped per line, then the pattern.
function pointers(doc: string): Array<{ line: string; path: string }> {
  const out: Array<{ line: string; path: string }> = [];
  for (const line of read(doc).split("\n")) {
    const bare = line.replace(/https?:\/\/\S+/g, " ");
    for (const m of bare.match(POINTER_RE) ?? []) {
      out.push({ line: bare, path: m });
    }
  }
  return out;
}

describe("session-199 round-8: the doc-pointer census (the dangling-pointer class pinned)", () => {
  it("every load-bearing doc in the set exists (the set itself is the contract)", () => {
    for (const doc of DOC_SET) {
      expect(existsSync(path.join(ROOT, doc)), doc).toBe(true);
    }
  });

  it("every path-shaped FILE reference in the load-bearing docs resolves in the live tree (or carries its lineage marker)", () => {
    const violations: string[] = [];
    for (const doc of DOC_SET) {
      const exempt = LINEAGE_EXEMPT[doc] ?? [];
      for (const { line, path: p } of pointers(doc)) {
        if (existsSync(path.join(ROOT, p))) continue;
        if (exempt.includes(p)) {
          // The exemption's contract: the citing line must MARK the
          // citation as lineage/retired — a bare citation of a
          // nonexistent file fails even when exempted. (.match, never
          // RegExp.test — the method call's `.test(` token collides
          // with the count-ladder battery's comment-stripped
          // it/test-block census regex and inflates the unit count.)
          if (!line.match(/retired|lineage/i)) {
            violations.push(
              `${doc}: lineage citation "${p}" lost its retired/lineage marker`,
            );
          }
          continue;
        }
        violations.push(`${doc}: dangling pointer "${p}" (no such file in the tree)`);
      }
    }
    expect(violations.join("\n")).toBe("");
  });

  it("the lineage exemption list stays honest: every exempted path is still cited, and no exemption exists for a file that now resolves", () => {
    for (const [doc, paths] of Object.entries(LINEAGE_EXEMPT)) {
      const cited = pointers(doc).map((x) => x.path);
      for (const p of paths) {
        expect(cited.includes(p), `${doc} must still cite ${p} (or the exemption is dead)`).toBe(true);
        expect(
          existsSync(path.join(ROOT, p)),
          `${p} resolved — remove the exemption, it is no longer lineage`,
        ).toBe(false);
      }
    }
  });
});
