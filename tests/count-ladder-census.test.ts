import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The round-7 catch's own cure: THREE stale count sites in the root docs
// (README's tree annotation "24 unit files", PAD §3.2's "23 *.test.ts",
// PAD §7.1's mis-derived split rows "10 | 169" + "15 | 182") had drifted
// through FOUR consecutive count-ladder re-anchors — every round re-pins
// the ladder BY HAND at the sites its grep shapes happen to cover, and
// no test pinned ANY root-doc claim. This is the same unpinned-doc class
// that let the round-3 sitemap and round-5 DEPLOYMENT.md stragglers ship;
// round-6 closed it for DEPLOYMENT.md alone. This battery closes it at
// the ROOT level: AGENTS.md, CLAUDE.md, README.md, the PAD, the domain
// SKILL, and the worklog's live-tense Stage-Summary verification line.
//
// The rule: every live-tense count-ladder claim — however phrased — must
// equal the LIVE census (computed from the tree at run time, never
// hard-coded here). The claim SHAPES are the recorded regex families
// below; a new phrasing convention joins the table when a doc adopts it
// (the shapes are reformat-tolerant: docs are read whitespace-flattened,
// so a ~76-column re-wrap can never hide or orphan a claim).
//
// Documented NON-pins: AGENTS.md's "526 packages" is a bun-install OUTPUT
// claim — the lockfile's raw entries (530 keys / 525 unique resolved ids)
// do not carry bun's own counting semantics, so no static census can
// verify it; it stays on the standing manual cadence (every round's
// `bun install` prints it). The PAD §11 "~Lines" column is explicitly
// approximate and unpinned by design.
//
// The house convention (the s46/s66/s67 doctrine): source-contract pins
// read COMMENT-STRIPPED sources — a literal pinned by a record comment
// alone is a vacuous pin. The docs themselves are read RAW (their claims
// are the payload), and this battery's own census counts comment-stripped
// `it(`/`test(` blocks — the counting rule that reproduces the suite's
// own "358 passed" exactly (no it.each/skip/only in the tree; the census
// would over/under-count the reporter the moment one appears).

// ---- the live censuses ------------------------------------------------------

const ROOT = path.resolve(import.meta.dirname, "..");

function read(rel: string): string {
  const p = path.resolve(ROOT, rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

function stripHashComments(src: string): string {
  return src.replace(/#[^\n]*/g, "");
}

/** Every *.test.ts file under tests/ and src/ (the vitest include scope), as basenames. */
function unitTestFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    if (!existsSync(dir)) return;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".test.ts")) out.push(e.name);
    }
  };
  walk(path.join(ROOT, "tests"));
  walk(path.join(ROOT, "src"));
  return out.sort();
}

/** The it()/test() blocks of one comment-stripped test file (the reporter's counting rule). */
function testBlocks(src: string): number {
  return (stripComments(src).match(/\b(?:it|test)\(/g) ?? []).length;
}

const unitFiles = unitTestFiles();
const unitChecks = unitFiles.reduce((n, f) => n + testBlocks(read(path.join("tests", f))), 0);

/** The e2e specs + the setup project's own test (the reporter counts both). */
function e2eCensus(): { specs: string[]; checks: number } {
  const dir = path.join(ROOT, "tests", "e2e");
  const specs = readdirSync(dir).filter((f) => f.endsWith(".spec.ts")).sort();
  const setups = readdirSync(dir).filter((f) => f.endsWith(".setup.ts")).sort();
  let checks = 0;
  for (const f of [...specs, ...setups]) {
    checks += testBlocks(readFileSync(path.join(dir, f), "utf-8"));
  }
  return { specs, checks };
}
const e2e = e2eCensus();

/** The smoke ladder's rung numbers — the ok NN calls (unique, sequential). */
function smokeRungs(): string[] {
  const src = stripHashComments(read("scripts/smoke-test.sh"));
  return [...new Set(src.match(/\bok (\d{2})\b/g) ?? [])]
    .map((s) => s.slice(3))
    .sort();
}
const rungs = smokeRungs();

/** The build table's total: pages + api route files + SEO handlers + icons + /_not-found. */
function buildRouteTotal(): number {
  const app = path.join(ROOT, "src", "app");
  let n = 0;
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === "route.ts" || e.name === "page.tsx") n += 1;
    }
  };
  walk(app);
  // icon conventions (icon.png / apple-icon.png generate a route each) + /_not-found
  for (const icon of ["icon.png", "apple-icon.png"]) {
    if (existsSync(path.join(app, icon))) n += 1;
  }
  return n + 1;
}
const routes = buildRouteTotal();

// ---- the categorized census (CLAUDE.md's and SKILL.md's own family lists) ---

// The seam batteries — behavioral files that exercise the src/lib seams.
const SEAM_BATTERIES = [
  "auth",
  "password-seam",
  "rate-limit",
  "parse-body",
  "db-path",
  "boot-env",
  "db-census",
  "schemas",
  "coercion-guards",
  "bounded-reader",
  "http-headers",
  "chunk-recovery",
  "login-reset",
];

// The source contracts — comment-stripped source reads + module pins +
// the doc/route census batteries (round-18's head-faces is the
// newest member).
const SOURCE_CONTRACTS = [
  "site-content",
  "inquiry-schemas",
  "landing-page",
  "auth-surfaces",
  "auth-contract",
  "auth-reset",
  "body-pregate",
  "gate-script",
  "error-boundaries",
  "toast-anatomy",
  "sitemap-routes",
  "deployment-doc-census",
  "count-ladder-census",
  "re-pin-tokens",
  "doc-pointer-census",
  "dead-code-census",
  "focus-contract",
  "inbox-states",
  "landing-images",
  "focus-outline",
  "preflight-faces",
  "motion-glyph",
  "geometry-faces",
  "auth-validation",
  "head-faces",
];

const fileOf = (family: string) => `${family}.test.ts`;
const checksOf = (families: string[]) =>
  families.reduce((n, f) => n + testBlocks(read(path.join("tests", fileOf(f)))), 0);

// The prose family labels where they differ from the file basenames
// (CLAUDE.md/SKILL.md name the families; the batteries carry the names).
const PROSE_LABEL: Record<string, string> = {
  "password-seam": "password",
  "db-census": "census",
};

// ---- the claim shapes -------------------------------------------------------

type Family =
  | "unitChecks"
  | "unitFiles"
  | "e2eChecks"
  | "e2eSpecs"
  | "smokeRungs"
  | "routes";

const census: Record<Family, number> = {
  unitChecks,
  unitFiles: unitFiles.length,
  e2eChecks: e2e.checks,
  e2eSpecs: e2e.specs.length,
  smokeRungs: rungs.length,
  routes,
};

/** Each shape: a regex whose capture groups map (in order) to families. */
const SHAPES: Array<{ re: RegExp; map: Family[] }> = [
  // unit — the canonical and inverted phrasings, the features table, the tree annotations
  { re: /(\d+) checks \/ (\d+) files/g, map: ["unitChecks", "unitFiles"] },
  { re: /(\d+) files \/ (\d+) checks/g, map: ["unitFiles", "unitChecks"] },
  { re: /(\d+) unit checks \((\d+) files\)/g, map: ["unitChecks", "unitFiles"] },
  { re: /(\d+) unit files/g, map: ["unitFiles"] },
  { re: /(\d+) \*\.test\.ts/g, map: ["unitFiles"] },
  { re: /test`? \((\d+)\)/g, map: ["unitChecks"] },
  { re: /test # (\d+)\/(\d+)/g, map: ["unitChecks"] },
  { re: /(\d+)\/(\d+) unit/g, map: ["unitChecks"] },
  { re: /(\d+) checks — pure/g, map: ["unitChecks"] },
  { re: /(\d+) unit \/ (\d+) e2e \/ (\d+) smoke/g, map: ["unitChecks", "e2eChecks", "smokeRungs"] },
  // e2e — the command tables, the features table, the tree annotations, the §7.1 row
  { re: /(\d+) checks \/ (\d+) specs/g, map: ["e2eChecks", "e2eSpecs"] },
  { re: /(\d+) e2e checks \((\d+) specs\)/g, map: ["e2eChecks", "e2eSpecs"] },
  { re: /e2e`? \((\d+)\)/g, map: ["e2eChecks"] },
  { re: /test:e2e`? \((\d+)\)/g, map: ["e2eChecks"] },
  { re: /(\d+) checks — standalone/g, map: ["e2eChecks"] },
  { re: /test:e2e # (\d+)\/(\d+)/g, map: ["e2eChecks"] },
  { re: /e2e (\d+)\/(\d+)/g, map: ["e2eChecks"] },
  { re: /e2e\/ \((\d+) specs/g, map: ["e2eSpecs"] },
  { re: /E2E \| (\d+) specs \| (\d+)/g, map: ["e2eSpecs", "e2eChecks"] },
  // smoke — the command tables, the rung phrasings, the ladder row
  { re: /(\d+)-rung/g, map: ["smokeRungs"] },
  { re: /smoke`? \((\d+)\)/g, map: ["smokeRungs"] },
  { re: /smoke-test\.sh`? \((\d+)\)/g, map: ["smokeRungs"] },
  { re: /(\d+) rungs/g, map: ["smokeRungs"] },
  { re: /smoke-test\.sh # (\d+)\/(\d+)/g, map: ["smokeRungs"] },
  { re: /smoke (\d+)\/(\d+)/g, map: ["smokeRungs"] },
  // routes — the build lines (", standalone" disambiguates from the auth family's "(8 routes)")
  { re: /(\d+) routes, standalone/g, map: ["routes"] },
];

/** Every claim a flattened text makes, per family. */
function claimsIn(flat: string): Map<Family, string[]> {
  const out = new Map<Family, string[]>([
    ["unitChecks", []], ["unitFiles", []], ["e2eChecks", []],
    ["e2eSpecs", []], ["smokeRungs", []], ["routes", []],
  ]);
  for (const { re, map } of SHAPES) {
    for (const m of flat.matchAll(re)) {
      map.forEach((family, i) => {
        const v = m[i + 1];
        if (v) out.get(family)!.push(v);
      });
    }
  }
  return out;
}

// ---- the docs ----------------------------------------------------------------

const ROOT_DOCS = [
  "AGENTS.md",
  "CLAUDE.md",
  "README.md",
  "Project_Architecture_Document.md",
  "elegance-flow_SKILL.md",
] as const;

// Which families each doc must claim at least once (the coverage map — a
// silently DROPPED claim is as wrong as a stale one).
const EXPECTED: Record<string, Family[]> = {
  "AGENTS.md": ["unitChecks", "unitFiles", "e2eChecks", "e2eSpecs", "smokeRungs"],
  "CLAUDE.md": ["unitChecks", "unitFiles", "e2eChecks", "e2eSpecs", "smokeRungs"],
  "README.md": ["unitChecks", "unitFiles", "e2eChecks", "e2eSpecs", "smokeRungs"],
  "Project_Architecture_Document.md": [
    "unitChecks", "unitFiles", "e2eChecks", "e2eSpecs", "smokeRungs", "routes",
  ],
  "elegance-flow_SKILL.md": ["unitChecks", "unitFiles", "e2eChecks", "e2eSpecs", "smokeRungs"],
};

// The worklog is APPEND-ONLY HISTORY — its round lines legitimately record
// past numbers. Only the Stage Summary's verification line is live-tense;
// the pins below target that line alone.
const WORKLOG_VERIFICATION = /THE VERIFICATION:[^\n]*/;

describe("session-199 round-7: the root docs' count-ladder census", () => {
  it("the live censuses are sane and self-reported (files+checks, specs+checks, sequential rungs, the smoke script's own tally)", () => {
    expect(unitFiles.length).toBeGreaterThan(0);
    expect(unitChecks).toBeGreaterThanOrEqual(unitFiles.length);
    // The smoke rungs are sequential 01..N with no gaps or duplicates.
    expect(rungs).toEqual(rungs.map((_, i) => String(i + 1).padStart(2, "0")));
    // The script's own "SMOKE: N/N PASS" echo equals its rung census —
    // a 15th rung added without the tally is a lying script.
    const tally = read("scripts/smoke-test.sh").match(/SMOKE: (\d+)\/(\d+) PASS/);
    expect(tally?.[1]).toBe(String(rungs.length));
    expect(tally?.[2]).toBe(String(rungs.length));
    // The e2e census counts the setup project's own test alongside the specs.
    expect(e2e.checks).toBeGreaterThanOrEqual(e2e.specs.length);
  });

  it("every count-ladder claim in the five root docs equals the live census (all shapes, all sites)", () => {
    const errors: string[] = [];
    for (const doc of ROOT_DOCS) {
      const flat = read(doc).replace(/\s+/g, " ");
      const claims = claimsIn(flat);
      for (const [family, values] of claims) {
        for (const v of values) {
          if (v !== String(census[family])) {
            errors.push(`${doc}: claims ${family}=${v} (live census: ${census[family]})`);
          }
        }
      }
      for (const family of EXPECTED[doc] ?? []) {
        if (claims.get(family)!.length === 0) {
          errors.push(`${doc}: dropped its ${family} claim entirely`);
        }
      }
    }
    expect(errors, errors.join("\n")).toEqual([]);
  });

  it("the worklog's Stage-Summary verification line carries the live census", () => {
    const line = read("worklog.md").match(WORKLOG_VERIFICATION)?.[0] ?? "";
    expect(line, "the THE VERIFICATION line must exist").not.toBe("");
    const flat = line.replace(/\s+/g, " ");
    const claims = claimsIn(flat);
    for (const [family, values] of claims) {
      for (const v of values) {
        expect(v, `worklog verification: ${family}=${v}`).toBe(String(census[family]));
      }
    }
    // The line claims all four families it has always claimed.
    for (const family of ["unitChecks", "e2eChecks", "smokeRungs", "routes"] as Family[]) {
      expect(claims.get(family)!.length, `worklog verification: ${family} claim present`).toBeGreaterThan(0);
    }
  });

  it("PAD §7.1's unit split rows equal the categorized census (the F-3 pin)", () => {
    const flat = read("Project_Architecture_Document.md").replace(/\s+/g, " ");
    const seam = flat.match(/Unit — seam batteries \| (\d+) \| (\d+)/);
    const contract = flat.match(/Unit — source contracts \| (\d+) \| (\d+)/);
    expect(seam?.[1]).toBe(String(SEAM_BATTERIES.length));
    expect(seam?.[2]).toBe(String(checksOf(SEAM_BATTERIES)));
    expect(contract?.[1]).toBe(String(SOURCE_CONTRACTS.length));
    expect(contract?.[2]).toBe(String(checksOf(SOURCE_CONTRACTS)));
    // And the two rows still sum to the whole ladder.
    expect(
      SEAM_BATTERIES.length + SOURCE_CONTRACTS.length,
    ).toBe(unitFiles.length);
    expect(checksOf(SEAM_BATTERIES) + checksOf(SOURCE_CONTRACTS)).toBe(unitChecks);
  });

  it("the category lists' union equals the filesystem unit census (a new test file forces the lockstep)", () => {
    const listed = new Set([...SEAM_BATTERIES, ...SOURCE_CONTRACTS].map(fileOf));
    const onDisk = new Set(unitFiles);
    const unlisted = [...onDisk].filter((f) => !listed.has(f));
    const missing = [...listed].filter((f) => !onDisk.has(f));
    expect(unlisted, `unlisted on disk: ${unlisted.join(", ")}`).toEqual([]);
    expect(missing, `listed but absent: ${missing.join(", ")}`).toEqual([]);
  });

  it("every test family is named in CLAUDE.md's and SKILL.md's testing sections (the prose enumeration pin)", () => {
    const claude = read("CLAUDE.md").replace(/\s+/g, " ");
    const skill = read("elegance-flow_SKILL.md").replace(/\s+/g, " ");
    for (const family of [...SEAM_BATTERIES, ...SOURCE_CONTRACTS]) {
      const label = PROSE_LABEL[family] ?? family;
      expect(claude.includes(label), `CLAUDE.md must name ${label}`).toBe(true);
      expect(skill.includes(label), `elegance-flow_SKILL.md must name ${label}`).toBe(true);
    }
  });

  it("the retired forms this round caught never return (the regression pins)", () => {
    for (const doc of ROOT_DOCS) {
      const flat = read(doc).replace(/\s+/g, " ");
      expect(flat, `${doc}: "24 unit files" retired`).not.toContain("24 unit files");
      expect(flat, `${doc}: "23 *.test.ts" retired`).not.toContain("23 *.test.ts");
      expect(flat, `${doc}: the "10 | 169" split row retired`).not.toContain("seam batteries | 10 | 169");
      expect(flat, `${doc}: the "15 | 182" split row retired`).not.toContain("source contracts | 15 | 182");
    }
  });
});
