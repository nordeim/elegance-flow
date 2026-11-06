/**
 * Round-33 probe-load-contract battery: the PROBE-HMR-TOLERANCE cure —
 * the round's own live catch (F-33a), diagnosed while re-running the
 * standing probes in a fresh sandbox.
 *
 * The finding (live-diagnosed 2026-11-06):
 *
 * ① THE BUG (F-33a, HIGH, tooling): the four live scripts
 *   (`scripts/parity-199.ts` — 1 goto, `scripts/drift-199.ts` — 20,
 *   `scripts/mobile-census-199.ts` — 1, `scripts/capture-199.ts` — 12)
 *   navigate with `waitUntil: "networkidle"`, which NEVER fires
 *   against a healthy Next.js 16 dev server: Turbopack's HMR websockets
 *   persist for the page's lifetime (32 `ws://…/_next/hmr` connections
 *   observed on ONE page load; a raw curl handshake returns 101 and
 *   holds). Every such goto wedges at its 30s timeout and the wedged
 *   run hangs the probe silently (the round-18 launch-ceiling family).
 *   The scripts' own header contracts ("expects our dev server on
 *   :3000") were unexecutable — including the operator's standing
 *   screenshot instruction (the dev-server captures). This round's
 *   probes ran against the STANDALONE artifact on :3000 (the
 *   production faces) so the evidence stood; the cure restores the
 *   dev-server contract.
 * ② THE CURE: the shared HMR-tolerant load helper
 *   (`scripts/probe-load.ts` → `probeLoad(page, url)`), following the
 *   a11y spec's own tolerant pattern — `domcontentloaded` FIRST
 *   (always fires), then a BOUNDED `waitForLoadState("networkidle")`
 *   with `.catch(() => {})` (settles the reference SPA's client-side
 *   fetches — no persistent sockets there, so it fires in seconds;
 *   never fatal on the dev server), then the settle window. The
 *   production fast paths keep their semantics; the dev server gets
 *   the bounded fallback.
 * ③ THE EXEMPTION RECORD: `scripts/parity-199b.ts` (the REF-only
 *   one-off leading decode probe) carries no OURS destination — no
 *   `localhost` anywhere in its source — so the tolerant load does not
 *   apply to it.
 * ④ THE E2E HALF (F-33b, the session-58 candidate 1 — the positive
 *   census): the landing's axe-core contrast citations under
 *   forcedColors active COLLAPSE from the 16 sanctioned screen nodes
 *   to exactly 3 — the amber-500 eyebrow family (hero + services +
 *   testimonials, the zinc-950-section eyebrows) — and the reference's
 *   own sweep flags the SAME three elements (the F-31c class-literal
 *   decode again) plus its unassociated select (OURS binds id/htmlFor,
 *   the standing superset). The register's existing amber-eyebrow arm
 *   covers the collapsed face. Pinned as the e2e leg in
 *   tests/e2e/a11y.spec.ts; this battery pins the SOURCE contract (the
 *   leg's existence and its census shape).
 * ⑤ THE DOC CURE: AGENTS.md's probe-usage note names the HMR-tolerant
 *   contract (a fresh agent must know the probes tolerate the dev
 *   server's HMR sockets before re-running them).
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const read = (rel: string) =>
  existsSync(path.join(here, rel)) ? readFileSync(path.join(here, rel), "utf8") : "";
const strip = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");

const helperPath = "../scripts/probe-load.ts";
const helper = read(helperPath);
const helperStripped = strip(helper);
const agents = read("../AGENTS.md");

// ---------------------------------------------------------------------------
// ① the helper contract — the HMR-tolerant load's three semantic members
// ---------------------------------------------------------------------------
describe("round-33: the probe-load helper contract (F-33a — the cure's own shape)", () => {
  it("scripts/probe-load.ts exists and exports probeLoad(page, url)", () => {
    expect(existsSync(path.join(here, helperPath)), "the helper must exist").toBe(true);
    expect(helperStripped).toContain("export async function probeLoad(");
  });

  it("navigates on domcontentloaded FIRST — the event that always fires (the HMR sockets never block it)", () => {
    expect(helperStripped).toContain('waitUntil: "domcontentloaded"');
    // and never a bare networkidle goto inside the helper itself
    expect(helperStripped).not.toContain('waitUntil: "networkidle"');
  });

  it("the networkidle wait is BOUNDED and never fatal — waitForLoadState(...).catch, the a11y spec's own tolerant pattern", () => {
    expect(helperStripped).toMatch(
      /waitForLoadState\("networkidle",\s*\{\s*timeout:\s*12_000\s*\}\)\.catch/,
    );
  });

  it("the settle window follows (1_200) — the reference SPA's hydration absorbed on every path", () => {
    expect(helperStripped).toContain("waitForTimeout(1_200)");
  });
});

// ---------------------------------------------------------------------------
// ② the four live scripts — the helper imported, ZERO bare networkidle gotos
// ---------------------------------------------------------------------------
describe("round-33: the four live scripts ride the tolerant load (F-33a — the wedge class closed)", () => {
  // UNROLLED, one static it() per script — the count-ladder census counts
  // static blocks and must reproduce the reporter's count exactly (the
  // round-18 counting rule; a for-loop would under-count by three).
  const scriptPin = (rel: string) => {
    const src = strip(read(rel));
    expect(src, `${rel} must exist`).not.toBe("");
    expect(src, `${rel} must import the helper`).toMatch(
      /import\s*\{[^}]*probeLoad[^}]*\}\s*from\s*"\.\/probe-load"/,
    );
    // the wedge class: a bare networkidle goto wedges forever against
    // the dev server's persistent HMR websockets
    expect(src, `${rel} must not carry a bare networkidle goto`).not.toContain(
      'waitUntil: "networkidle"',
    );
  };

  it("scripts/parity-199.ts imports probeLoad and carries ZERO bare networkidle gotos", () => {
    scriptPin("../scripts/parity-199.ts");
  });

  it("scripts/drift-199.ts imports probeLoad and carries ZERO bare networkidle gotos", () => {
    scriptPin("../scripts/drift-199.ts");
  });

  it("scripts/mobile-census-199.ts imports probeLoad and carries ZERO bare networkidle gotos", () => {
    scriptPin("../scripts/mobile-census-199.ts");
  });

  it("scripts/capture-199.ts imports probeLoad and carries ZERO bare networkidle gotos", () => {
    scriptPin("../scripts/capture-199.ts");
  });

  it("every OURS-destined script in scripts/ is in the constituency (no straggler rides the wedge)", () => {
    // any script under scripts/ that references localhost:3000 must be
    // one of the four (or the helper itself) — a NEW probe script must
    // join the contract, not ship a fresh wedge
    const dir = path.join(here, "../scripts");
    const oursRiders = readdirSync(dir)
      .filter((f) => f.endsWith(".ts"))
      .filter((f) => {
        const src = read(`../scripts/${f}`);
        // .match, never regex .test( — the round-30 census-collision
        // lesson (the count-ladder census counts `.test(` as a block)
        return src.match(/localhost:3000/) && f !== "probe-load.ts";
      })
      .sort();
    expect(oursRiders).toEqual([
      "capture-199.ts",
      "drift-199.ts",
      "mobile-census-199.ts",
      "parity-199.ts",
    ]);
  });
});

// ---------------------------------------------------------------------------
// ③ the exemption record — the REF-only one-off
// ---------------------------------------------------------------------------
describe("round-33: the parity-199b exemption (the REF-only one-off)", () => {
  it("parity-199b.ts carries no OURS destination — networkidle fires against the reference, no cure needed", () => {
    const src = strip(read("../scripts/parity-199b.ts"));
    expect(src).not.toContain("localhost");
    expect(src).not.toContain("3000");
  });
});

// ---------------------------------------------------------------------------
// ④ the e2e half — the forced-colors landing-register census leg exists
// ---------------------------------------------------------------------------
describe("round-33: the forced-colors landing-register census (F-33b — the e2e leg's source contract)", () => {
  it("tests/e2e/a11y.spec.ts rides the landing forced-colors census leg (structural zero + the amber-eyebrow-only collapse)", () => {
    const src = strip(read("../tests/e2e/a11y.spec.ts"));
    // the leg's describe block + the census shape pin (exactly three
    // zinc-950-section eyebrows, every node citing the register's
    // amber-eyebrow arm)
    expect(src).toContain("forced-colors landing-register census");
    expect(src).toMatch(/forcedColors:\s*"active"/);
    expect(src).toMatch(/toHaveLength\(3\)|\.length\)\.toBe\(3\)/);
    expect(src).toContain("text-amber-500");
  });
});

// ---------------------------------------------------------------------------
// ⑤ the doc cure — AGENTS.md names the contract
// ---------------------------------------------------------------------------
describe("round-33: the AGENTS.md doc cure (the fresh-agent pointer)", () => {
  it("AGENTS.md's probe-usage note names the HMR-tolerant contract and the helper", () => {
    expect(agents).toContain("probe-load.ts");
    expect(agents).toContain("HMR");
  });
});
