/**
 * Round-9 dead-code census battery: the dependency manifest, the npm
 * recovery path, and the styling surface's custom utilities finally sit
 * under the unit gate as ONE family.
 *
 * The coverage gap this battery closes: rounds 6–8 pinned the docs'
 * claims (DEPLOYMENT.md · the count ladder · the re-pin tokens · the
 * doc pointers), but NOTHING pinned the manifest ↔ recovery-script
 * lockstep or the live-import discipline. That class let THREE stragglers
 * ship at the session-199 transformation and linger for eight rounds:
 *
 * F-1 scripts/install_packages.sh — the npm-world recovery path
 *   (installs by package NAME, never consuming the lockfile) — still
 *   carried the RETIRED CRM set: 11 retired packages installed (the
 *   radix family ×6 · cva · html2canvas-pro · jspdf · recharts ·
 *   zustand) while MISSING the live zod/axe-core — the recovery path
 *   tsc-fails on the current domain.
 * F-2 fast-check ^4.10.2 (session-172's property-family devDep; its
 *   consumer retired with the CRM domain) + tw-animate-css ^1.4.0 (the
 *   npm package — the app consumes the VENDORED
 *   src/app/vendor/tw-animate.css; the npm declaration is the
 *   pre-vendoring straggler) + @types/react-dom (compile-unconsumed —
 *   empirically proven: tsc --noEmit green with the package hidden)
 *   were all declared with ZERO live consumers — the web-application
 *   skill §2's dead-dependency census is a prescribed standing duty
 *   this domain had never run.
 * F-3 globals.css carried three dead @utility blocks (chart-no-outline —
 *   selectors for the RETIRED recharts library · scrollbar-thin ·
 *   input-base — the CRM dashboard's chrome primitives) with zero
 *   consumers — tree-shaken from the build (absent from the artifact's
 *   CSS) but live in the required-reading styling surface.
 *
 * Contract (comment-stripped reads where comments could mask a claim —
 * the s64/s65/s66 lesson; .match( never .test( — the round-8
 * phantom-census lesson: the count-ladder battery counts it/test blocks):
 *
 * ① MANIFEST ↔ SCRIPT LOCKSTEP: the recovery script's package set must
 *   EQUAL package.json's dependency union, both directions — a new dep
 *   forces the script forward; a retired dep never lingers.
 * ② LIVE-IMPORT CENSUS: every declared dependency carries a consumer
 *   citation (the DEP_CONSUMERS map — the consumption mechanism
 *   documented per entry: an import, a CSS import, config wiring, a
 *   path injection, or a framework peer/runtime contract). A dep losing
 *   its consumer fails; a new dep without a citation fails — the
 *   lockstep forcing function.
 * ③ RETIRED NEVER-RETURNS: the 11 CRM names + fast-check + the npm
 *   tw-animate-css never return in the script OR the manifest.
 *   (@types/react-dom retired by empirical proof but is NOT pinned
 *   never-returns: a future direct react-dom import legitimately
 *   re-adds it — WITH a citation, which ② then enforces.)
 * ④ @UTILITY CONSUMER CENSUS: every @utility block in globals.css must
 *   have a consumer in src/ (future-proof at zero blocks) — plus the
 *   three retired names never return (the regression pin).
 */
import { readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf8");

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

/** Every file under dir (recursively), relative to ROOT. */
function walk(dir: string): string[] {
  const out: string[] = [];
  const abs = path.join(ROOT, dir);
  for (const e of readdirSync(abs, { withFileTypes: true })) {
    const p = path.join(abs, e.name);
    if (e.isDirectory()) out.push(...walk(path.join(dir, e.name)));
    else out.push(path.join(dir, e.name));
  }
  return out;
}

// ---- the manifest -----------------------------------------------------------

type Manifest = { dependencies: Record<string, string>; devDependencies: Record<string, string> };
const manifest: Manifest = JSON.parse(read("package.json")) as Manifest;
const manifestSet = new Set([...Object.keys(manifest.dependencies), ...Object.keys(manifest.devDependencies)]);

// ---- ① the recovery-script lockstep ------------------------------------------

const SCRIPT = "scripts/install_packages.sh";
const scriptSrc = stripComments(read(SCRIPT));
const installLine = scriptSrc.match(/npm install ([^\n]+)/);
if (!installLine) throw new Error(`${SCRIPT}: no "npm install <packages>" line found`);
const scriptSet = new Set(
  installLine[1]
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0 && !t.startsWith("-")),
);

it("the npm recovery path installs exactly the live dependency set (manifest ↔ script lockstep)", () => {
  const missingFromScript = [...manifestSet].filter((p) => !scriptSet.has(p));
  const orphanedInScript = [...scriptSet].filter((p) => !manifestSet.has(p));
  expect(
    { missingFromScript, orphanedInScript },
    "the recovery path must mirror package.json exactly — the round-9 catch: the CRM-era list installed 11 retired packages while missing the live zod/axe-core",
  ).toEqual({ missingFromScript: [], orphanedInScript: [] });
});

// ---- ② the live-import census -------------------------------------------------

/**
 * The consumer citation per declared dependency — the consumption
 * MECHANISM, documented. Forms: a direct import, a CSS import, config
 * wiring, a path injection, a CLI script entry, or a framework
 * peer/runtime contract. A dep losing its citation (or a new dep
 * without one) fails the census — the lockstep forcing function.
 */
const DEP_CONSUMERS: Record<string, { file: string; cite: RegExp; how: string }> = {
  // ---- runtime -------------------------------------------------------------
  "@prisma/client": { file: "src/lib/db.ts", cite: /from "@prisma\/client"/, how: "the Prisma client singleton" },
  clsx: { file: "src/lib/utils.ts", cite: /from "clsx"/, how: "the cn() class merge" },
  "lucide-react": { file: "src/components/landing/landing-page.tsx", cite: /from "lucide-react"/, how: "the reference's icon set" },
  next: { file: "next.config.ts", cite: /from "next"/, how: "the framework config type" },
  react: { file: "src/app/error.tsx", cite: /from "react"/, how: "the error boundary hooks" },
  "react-dom": {
    file: "package.json",
    cite: /"next": "/,
    how: "next's required render peer (peerDependencies: react-dom ^19) — the manifest pairing",
  },
  "tailwind-merge": { file: "src/lib/utils.ts", cite: /from "tailwind-merge"/, how: "the cn() class merge" },
  zod: { file: "src/lib/schemas.ts", cite: /from "zod"/, how: "every body-parsing seam" },
  prisma: { file: "package.json", cite: /"db:generate": "prisma generate"/, how: "the CLI engine (db:generate)" },
  // ---- dev -----------------------------------------------------------------
  "@playwright/test": { file: "playwright.config.ts", cite: /from "@playwright\/test"/, how: "the e2e runner + the probe scripts" },
  "@tailwindcss/postcss": { file: "postcss.config.mjs", cite: /@tailwindcss\/postcss/, how: "the only PostCSS plugin" },
  "@types/node": { file: "src/lib/password.ts", cite: /from "node:crypto"/, how: "the node: import surface these types serve" },
  "@types/react": { file: "tsconfig.json", cite: /"jsx": "react-jsx"/, how: "the JSX runtime's type root" },
  "axe-core": { file: "tests/e2e/a11y.spec.ts", cite: /node_modules\/axe-core\/axe\.min\.js/, how: "injected by path (the a11y engine)" },
  eslint: { file: "package.json", cite: /"lint": "eslint \./, how: "the lint gate's engine" },
  "eslint-config-next": { file: "eslint.config.mjs", cite: /eslint-config-next/, how: "the flat-config presets" },
  tailwindcss: { file: "src/app/globals.css", cite: /@import "tailwindcss"/, how: "the CSS-first engine import" },
  typescript: { file: "package.json", cite: /"typecheck": "tsc --noEmit"/, how: "the type gate's engine" },
  vitest: { file: "vitest.config.ts", cite: /from "vitest\/config"/, how: "the unit runner's config" },
};

it("every declared dependency carries a live consumer citation (the dead-dep census)", () => {
  const declared = [...manifestSet].sort();
  const cited = Object.keys(DEP_CONSUMERS).sort();
  // The map must cover exactly the manifest — no citation for an
  // undeclared dep (a stale map entry), no declared dep without a
  // citation (a dead dependency — the round-9 catch: fast-check,
  // tw-animate-css, @types/react-dom were declared with zero consumers).
  expect({ declaredWithoutCitation: declared.filter((p) => !DEP_CONSUMERS[p]), citationWithoutDeclaration: cited.filter((p) => !manifestSet.has(p)) })
    .toEqual({ declaredWithoutCitation: [], citationWithoutDeclaration: [] });

  // Each citation must HOLD: the file exists and still carries the
  // consumption form (a dep whose consumer was deleted fails here).
  // (.match( never .test( — the phantom-census lesson this battery's
  // own header records.)
  const broken: string[] = [];
  for (const [pkg, { file, cite }] of Object.entries(DEP_CONSUMERS)) {
    const src = read(file);
    if (!src.match(cite)) broken.push(`${pkg} → ${file}`);
  }
  expect(broken, "each citation's file must still carry the consumption form").toEqual([]);
});

// ---- ③ the retired never-returns ----------------------------------------------

const RETIRED_DEPS = [
  // the 11 CRM dependencies retired at session-199
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-label",
  "@radix-ui/react-popover",
  "@radix-ui/react-select",
  "@radix-ui/react-slot",
  "class-variance-authority",
  "html2canvas-pro",
  "jspdf",
  "recharts",
  "zustand",
  // round-9's dead-dep retirements (the npm tw-animate-css: the app
  // consumes the vendored src/app/vendor/tw-animate.css)
  "fast-check",
  "tw-animate-css",
];

it("the retired dependency names never return (the recovery script + the manifest)", () => {
  const manifestRaw = read("package.json");
  const offenders = RETIRED_DEPS.filter(
    (p) =>
      scriptSet.has(p) ||
      manifestSet.has(p) ||
      scriptSrc.match(new RegExp(`\\b${p.replaceAll("/", "\\/")}\\b`)) !== null ||
      manifestRaw.includes(`"${p}"`),
  );
  expect(offenders, "a retired dependency re-declared or re-installed is a red test, not a grep discipline").toEqual([]);
});

// ---- ④ the @utility consumer census --------------------------------------------

const globalsCss = read("src/app/globals.css");
const globalsCode = stripComments(globalsCss);
const utilityNames = [...globalsCode.matchAll(/^@utility\s+([\w-]+)/gm)].map((m) => m[1]);

/** Does any src file outside globals.css reference the class name? */
function hasConsumer(name: string): boolean {
  const files = walk("src").filter((f) => f !== "src/app/globals.css");
  return files.some((f) => read(f).includes(name));
}

const RETIRED_UTILITIES = ["chart-no-outline", "scrollbar-thin", "input-base"];

it("every @utility block in globals.css has a consumer in src/ (the dead-CSS census)", () => {
  const dead = utilityNames.filter((name) => !hasConsumer(name));
  expect(
    dead,
    "a custom utility with zero consumers is dead code in the required-reading styling surface (the round-9 catch: chart-no-outline targeted the RETIRED recharts; scrollbar-thin/input-base were the CRM dashboard's chrome)",
  ).toEqual([]);
});

it("the three retired @utility names never return in globals.css", () => {
  const offenders = RETIRED_UTILITIES.filter((name) => globalsCode.includes(`@utility ${name}`));
  expect(offenders).toEqual([]);
});

// ---- the documented non-pins ---------------------------------------------------
//
// - The VENDORED src/app/vendor/tw-animate.css is a tree file (not a
//   dependency) — consumed by globals.css's `@import "./vendor/tw-animate.css"`
//   (pinned by the landing-page battery's globals reads).
// - @types/react-dom retired round-9 by empirical proof (tsc green with
//   the package hidden); NOT in RETIRED_DEPS — a future direct
//   react-dom import legitimately re-adds it, and ② then demands its
//   citation.
// - The extraction probes (scripts/extract-ef-reference*.ts) and the
//   historical diagnostics (scripts/parity-199b.ts) are deliberately
//   kept as the probe record — they consume @playwright/test (cited
//   above via playwright.config.ts; the probes' shared import).
