/**
 * Round-39 stack-faces battery: the COMBINATION-MATRIX census + the
 * STACK-A11Y pin — the media-axis combinations no probe ever read
 * (rounds 29/31/32 censused reduce / forcedColors / colorScheme
 * INDIVIDUALLY; round-37 probed the triple stack POSITIVE; the
 * pairwise + triple COMBINATIONS were never censused, never pinned,
 * and never read by the a11y gate — the exact round-38 pattern: the
 * axis nobody reads is the axis that rots).
 *
 * The findings (live-verified 2026-11-08, both apps):
 *
 * ① THE COMBINATION FAMILIES (F-39a, MEDIUM, coverage-gap — the
 *   round's own audit catch): under the pairwise forced+scheme-dark
 *   the axe color-contrast artifact family EXPLODES beyond every
 *   recorded per-axis constant — /login color-contrast(11) (the h1,
 *   the subtitle, the Google span, the divider, both labels, both
 *   inputs, both bottom buttons + the Sign up span) BYTE-IDENTICAL on
 *   BOTH apps (the reference's own face); / (landing) 16 both apps;
 *   /dashboard (OURS — the superset's own surface) 22. The MECHANISM
 *   (the round-33 F-33b artifact class extended): under
 *   forced+scheme-dark text computes CanvasText WHITE while
 *   backgrounds serialize rgba(0,0,0,0) / rgba(0,0,0,0.5/0.7) — axe
 *   cannot resolve the backdrop and flags the pair. The RENDER is
 *   fully legible (pixel-verified: white glyphs on the 96.5%-black
 *   canvas — CanvasText-on-Canvas 21:1). The per-axis decomposition
 *   (/login): default ZERO · reduce only ZERO · scheme-dark only ZERO
 *   · forced only (light) ZERO · forced+scheme-dark 11 — the finding
 *   is COMBINATION-ONLY. Nothing pinned the family SHAPES; this
 *   battery + the round-39 e2e describe pin them.
 * ② THE COMBINATION CENSUS (F-39b): every shared face IDENTICAL both
 *   apps under every stack; the per-side constants COMPOSE additively
 *   (the reduce collapse — REF reveal 0.3s / header 0.5s vs OURS
 *   1e-05s — survives the forced palette: the a11y superset
 *   composes; the body-ink dead face survives the non-forced stacks);
 *   the forced palette composes with the emulated scheme (the dark
 *   system palette: bodyBg black, the CTA LinkText rgb(255,255,0));
 *   the fresh constant — html color-scheme reads "light dark" under
 *   forcedColors (vs "normal" at screen), both apps.
 * ③ THE SOURCE CONTRACTS this battery pins: the e2e round-39 describe
 *   (the combination families pinned as the artifact's census
 *   baseline); the AGENTS.md stack-posture paragraph; the drift
 *   [stack] leg (the 24th); the reduce block's universal-selector
 *   mechanism; the zero-forced-colors-rules posture; the historical
 *   round-32/33 per-axis pins; the triple-stack emulation shape.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const here = import.meta.dirname;
const read = (rel: string) =>
  existsSync(path.join(here, rel)) ? readFileSync(path.join(here, rel), "utf8") : "";
const strip = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");

const agents = read("../AGENTS.md");

/** Every source file under src/ (recursive), as src-relative paths. */
function srcFiles(): string[] {
  const root = path.resolve(here, "../src");
  const out: string[] = [];
  const walk = (dir: string) => {
    if (!existsSync(dir)) return;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else out.push(path.relative(root, p));
    }
  };
  walk(root);
  return out.sort();
}

// ---------------------------------------------------------------------------
// ① the combination-matrix mechanisms (standing-fact pins:
// current-tree facts, green at birth)
// ---------------------------------------------------------------------------
describe("round-39: the combination-matrix mechanisms (the compose contracts)", () => {
  it("the globals.css reduce block rides the UNIVERSAL selector + the 0.01ms !important pair — the collapse mechanism every stack composes", () => {
    // the a11y superset's mechanism: the *, *::before, *::after
    // selector with 0.01ms !important durations is what makes OUR
    // reduce collapse survive the forced-colors system palette (the
    // composition proof: OURS 1e-05s vs REF 0.3s/0.5s under every
    // stack). Narrow the selector (or drop the !important) and the
    // collapse stops composing — the drift [stack] leg would catch
    // the drifted durations, this pin catches the mechanism's shape.
    const css = read("../src/app/globals.css");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    const block = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
    const head = block.slice(0, block.indexOf("}"));
    expect(head).toContain("*,");
    expect(head).toContain("*::before");
    expect(head).toContain("*::after");
    expect(head).toContain("0.01ms !important");
  });

  it("ZERO @media (forced-colors) rules and ZERO forced-color-adjust overrides across src/ (comment-stripped) — the zero-handling posture every stack rides", () => {
    // the round-31 record: neither app ships forced-colors handling —
    // the browser's system palette renders both apps identically
    // legible, so no superset ships (the print posture, not the
    // reduce one). A planted forced-colors rule or adjust override
    // would fork our stack faces from the reference's — the
    // combination census's IDENTICAL-face proof depends on this
    // posture. (The .includes needle — never a bare /re/.test()
    // call — keeps the count-ladder census's it/test-block counting
    // exact.)
    const offenders = srcFiles().filter((f) => {
      const s = strip(read(`../src/${f}`));
      return s.includes("forced-colors") || s.includes("forced-color-adjust");
    });
    expect(offenders, "files carrying forced-colors handling").toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// ② the doc + battery cures (born RED: the note/leg/describe land
// with R-3/R-5/R-6)
// ---------------------------------------------------------------------------
describe("round-39: the doc + battery cures (the fresh-agent pointers)", () => {
  it("AGENTS.md names the stack posture — the combination matrix + the artifact-family census + the compose doctrine", () => {
    // a fresh agent must know the media-axis COMBINATIONS are
    // censused before planting a pairwise-only probe, and that the
    // axe-under-combination families are the recorded artifact
    // baseline (a moved count is a conscious re-record, never a
    // silent repaint)
    expect(agents).toContain("The stack posture (round-39)");
    expect(agents).toContain("the combination matrix");
    expect(agents).toContain("the a11y superset composes");
    expect(agents).toContain("the drift `[stack]` leg (the 24th)");
  });

  it("the drift script rides the [stack] leg — the combination-matrix computed-face census, both apps", () => {
    // the drift battery's 24th leg censuses both apps under the full
    // triple stack: the shared faces IDENTICAL (the dark system
    // palette), the per-side constants (the reduce collapse pair)
    // recorded per side
    const drift = read("../scripts/drift-199.ts");
    expect(drift).toContain("[stack]");
    expect(drift).toContain("stackFace");
  });

  it("the e2e battery pins the combination families — the round-39 describe in a11y.spec.ts", () => {
    // the standalone artifact's census baseline: the login's
    // color-contrast(11) family, the landing's (16), and the
    // dashboard's (22) under the full triple stack — the counts a
    // future repaint or engine change must move CONSCIOUSLY
    const spec = read("../tests/e2e/a11y.spec.ts");
    expect(spec).toContain("round-39");
    expect(spec).toContain("forcedColors: \"active\"");
    expect(spec).toContain("reducedMotion: \"reduce\"");
  });

  it("the e2e round-39 describe rides ALL THREE axes in one emulation — never a pairwise-only stack leg", () => {
    // the combination matrix's census value is the FULL stack (the
    // pairwise legs would leave the triple un-pinned — the exact
    // unread-axis class this round closes). The round-39 describe
    // carries the three axes in ONE STACK constant, applied by ONE
    // emulateMedia call.
    const spec = read("../tests/e2e/a11y.spec.ts");
    const stackConst = spec.match(/const STACK = \{[^}]*\} as const;/);
    expect(stackConst, "the round-39 STACK constant exists").toBeDefined();
    const body = stackConst?.[0] ?? "";
    expect(body).toContain("forcedColors");
    expect(body).toContain("colorScheme");
    expect(body).toContain("reducedMotion");
    expect(spec).toContain("page.emulateMedia(STACK)");
  });

  it("the historical per-axis pins survive alongside the combination families — the round-32 clean sweep + the round-33 collapse census", () => {
    // the per-axis families are the recorded constants the
    // combination families EXTEND (never replace): round-32's
    // forced-light dashboard clean sweep and round-33's forced-light
    // landing 3-node collapse stay pinned in the same spec
    const spec = read("../tests/e2e/a11y.spec.ts");
    expect(spec).toContain("round-32: the forced-colors a11y sweep");
    expect(spec).toContain("round-33: the forced-colors landing-register census");
  });
});
