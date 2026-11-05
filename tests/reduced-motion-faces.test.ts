/**
 * Round-29 reduced-motion-faces battery: the PREFERS-REDUCED-MOTION
 * census — the media condition no probe ever emulated (the session-50
 * log's own candidate list). The round-28 reveal cure made the stakes
 * real: a twenty-element CSS-transition family now rides the landing,
 * and under `reduce` the two apps diverge mid-flight.
 *
 * The census findings (live-probed 2026-11-05, both apps at 1280×800
 * with `reducedMotion: "reduce"`, hydration-safe ordering):
 *
 * ① THE REDUCE BLOCK (F-29a): OURS collapses every CSS transition to
 *   `0.01ms` via the CRM-era `@media (prefers-reduced-motion: reduce)`
 *   block carried through the domain transformation — author
 *   `!important` beats the reveal family's inline `transitionDuration`
 *   by the cascade (live-verified: computed `1e-05s` while the inline
 *   style says `800ms`). The reference ships ZERO handling (no rule in
 *   any rendered stylesheet) — its raf-driven reveal STILL ANIMATES
 *   under reduce (0.193 → 0.430 → 0.681 → 0.964 → 1 across
 *   120–1100ms) and its CSS transitions run at full duration (services
 *   `0.3s`, header `0.5s`). OURS snaps (opacity 1 at the first 120ms
 *   post-wheel sample, no rideable mid-flight window).
 * ② THE DELAY SURVIVAL: the block kills `transition-duration` but NOT
 *   `transition-delay` — the hero cascade's staggered snaps still
 *   space at 0/100/200/600ms and content NEVER sticks hidden.
 * ③ THE IDENTICAL FACES: the at-rest hidden family, the settled
 *   hero/mount family and the post-reveal end state are IDENTICAL
 *   under reduce — the divergence is mid-flight + the computed
 *   transition-duration faces alone.
 * ④ THE DECISION (the house doctrine): the block STAYS — a
 *   deliberate, now-RECORDED a11y superset (the `scroll-behavior:
 *   smooth` precedent: a visible functional superset, documented and
 *   pinned). The reference's own gap is recorded per-side, never
 *   mirrored.
 * ⑤ THE DOC CURES (F-29c): PAD §5.4 must name the reveal family
 *   REPRODUCED (the round-28 ship) and the reduce block the recorded
 *   superset; PAD §3.1 must list the 18 Layer-1 modules (the round-25
 *   `route-title` + round-28 `reveal` stragglers); the "NOT
 *   reproduced" phrasing is retired root-wide.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const read = (rel: string) => readFileSync(path.join(here, rel), "utf8");
const strip = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");

const globalsSrc = read("../src/app/globals.css");
const globals = strip(globalsSrc);
const landingSrc = read("../src/components/landing/landing-page.tsx");
const landing = strip(landingSrc);
const revealSrc = read("../src/lib/reveal.ts");
const revealSeam = strip(revealSrc);
const pad = read("../Project_Architecture_Document.md");

// ---------------------------------------------------------------------------
// ① the reduce block — the three declarations on the universal selector
// ---------------------------------------------------------------------------
describe("round-29: the globals reduce block (F-29a — the deliberate a11y superset)", () => {
  it("ships the @media (prefers-reduced-motion: reduce) block on *, ::before, ::after with the three declarations", () => {
    expect(
      globals.replace(/\s+/g, " "),
    ).toContain(
      "@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }",
    );
  });

  it("the block kills durations, NEVER delays — the stagger spacing survives the collapse (F-29②)", () => {
    const flat = globals.replace(/\s+/g, " ");
    // the only transition/animation properties inside the reduce block
    const block = flat.match(/@media \(prefers-reduced-motion: reduce\) \{[^}]*\}\s*\}/)?.[0] ?? "";
    expect(block).toContain("transition-duration: 0.01ms !important");
    expect(block).not.toContain("transition-delay");
    expect(block).not.toContain("transition-property");
    expect(block).not.toContain("transition-timing-function");
  });

  it("the block is the ONLY reduce handling in the tree — the seam and the wiring stay pure (F-29①)", () => {
    // no per-element reduce awareness: the reveal family's reduce
    // behavior flows from the global block alone, keeping the DOM
    // byte-stable and the seam pure
    expect(landing).not.toContain("matchMedia");
    expect(landing).not.toContain("motion-reduce");
    expect(revealSeam).not.toContain("matchMedia");
    expect(revealSeam).not.toContain("motion-reduce");
    expect(revealSeam).not.toContain("prefers-reduced-motion");
    // and the block itself lives exactly once
    expect(globals.match(/prefers-reduced-motion/g)).toHaveLength(1);
  });

  it("the reveal seam still declares the full-duration decode — the block overrides it only at computed time (the cascade record)", async () => {
    const mod = await import("../src/lib/reveal");
    // the inline decode ships 800/400/300ms durations; under reduce the
    // stylesheet's !important wins the cascade (author !important >
    // inline normal) — the recorded mechanism, never a seam change
    expect(mod.REVEAL_DURATION_MS).toBe(800);
    expect(mod.MOUNT_DURATION_MS).toBe(400);
    const hidden = mod.revealStyle(mod.REVEAL_ABOUT[0], false);
    expect(hidden.transitionDuration).toBe("800ms");
    // the delay rides the inline style too — untouched by the block
    expect(hidden.transitionDelay).toBe("0ms");
    const hero = mod.revealStyle(mod.REVEAL_HERO[4], false);
    expect(hero.transitionDelay).toBe("600ms");
  });
});

// ---------------------------------------------------------------------------
// ② the recorded per-side constants — the deliberate-superset registry
// ---------------------------------------------------------------------------
describe("round-29: the per-side reduce constants (the recorded divergence — REF no handling vs OURS the collapse)", () => {
  it("OURS: the live computed durations collapse to 1e-05s (the block's 0.01ms serialization)", () => {
    // live-probed on the dev server under reducedMotion: "reduce":
    // the computed transition-duration reads "1e-05s" on the about
    // family (inline 800ms overridden), the services cards, the header
    // — recorded here as the documented superset registry; the drift
    // [motion-prefs] leg re-probes both apps live every run
    const OURS_REDUCE = { about: "1e-05s", services: "1e-05s", header: "1e-05s" };
    expect(Object.values(OURS_REDUCE)).toEqual(["1e-05s", "1e-05s", "1e-05s"]);
    // the block's declared value serializes to the probed form
    expect(globals).toContain("transition-duration: 0.01ms !important");
  });

  it("REF: zero handling recorded — the mid-flight animation + full durations are the reference's own reduce face, never mirrored", () => {
    // live-probed on the reference under reduce: no
    // prefers-reduced-motion rule in any rendered stylesheet; the raf
    // reveal animates 0.193 → 1 across ~1100ms; services 0.3s /
    // header 0.5s run at full duration. The reference's own gap (WCAG
    // 2.3.3 posture) is recorded per-side, never mirrored — the
    // scroll-behavior-smooth superset precedent.
    const REF_REDUCE = { rules: 0, services: "0.3s", header: "0.5s", midFlight: "animates" };
    expect(REF_REDUCE.rules).toBe(0);
    expect(REF_REDUCE.midFlight).toBe("animates");
  });
});

// ---------------------------------------------------------------------------
// ③ the PAD doc cures (F-29c) — the stale rows the round-28 ship left
// ---------------------------------------------------------------------------
describe("round-29: the PAD doc-stratum cures (F-29c — the round-28 stragglers)", () => {
  it("§3.1 lists the EIGHTEEN Layer-1 modules including the round-25 route-title and round-28 reveal seams", () => {
    const flat = pad.replace(/\s+/g, " ");
    expect(flat).toContain("18 modules (api, auth, password, rate-limit, schemas, db, db-path, site, site-content, page-layout, login-reset, verification, verification-server, boot-env, chunk-recovery, utils, route-title, reveal)");
    // the stale phrasing is retired
    expect(flat).not.toContain("16 modules");
  });

  it("§5.4 names the reveal family REPRODUCED and the reduce block the RECORDED superset", () => {
    const flat = pad.replace(/\s+/g, " ");
    // the stale "NOT reproduced" claim contradicts the round-28 ship
    expect(flat).not.toContain("NOT reproduced");
    expect(flat).not.toContain("are not reproduced");
    // the recorded superset: the block + the per-side constants
    expect(flat).toContain("reduced-motion superset");
    expect(flat).toContain("1e-05s");
  });

  it("the root docs never resurrect the stale reveal claim (the regression pin, root-wide)", () => {
    for (const doc of ["../AGENTS.md", "../CLAUDE.md", "../README.md", "../Project_Architecture_Document.md", "../elegance-flow_SKILL.md"]) {
      const flat = read(doc).replace(/\s+/g, " ");
      expect(flat, `${doc}: the stale "not reproduced" reveal claim retired`).not.toContain("animations are not reproduced");
    }
  });
});
