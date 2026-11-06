/**
 * Round-34 scroll-behavior-attr battery: the ROUTE-TRANSITION SCROLL
 * CURE — the round's own live catch (F-34a), diagnosed while
 * re-validating the standing probes in a fresh sandbox.
 *
 * The finding (live-verified 2026-11-07):
 *
 * ① THE BUG (F-34a, HIGH, functional): the `<html>` element carries
 *   the CSS `scroll-behavior: smooth` face (the reference's own rule,
 *   mirrored byte-for-byte in globals.css — the drift [reveal] leg
 *   censuses it IDENTICAL both apps) but NOT the
 *   `data-scroll-behavior="smooth"` attribute Next.js 16 requires.
 *   The App Router wraps every route-transition scroll in
 *   `disableSmoothScrollDuringRouteTransition` (verified against the
 *   installed next@16.4.2 source,
 *   node_modules/next/dist/shared/lib/router/utils/disable-smooth-scroll.js):
 *   it reads `htmlElement.dataset.scrollBehavior === 'smooth'`; without
 *   the attribute it runs the router's scroll NAKED under the CSS
 *   smooth rule (and warns in dev on every load). The live symptom
 *   probe (against `bun run dev`): the post-login transition
 *   `/login` (scrolled to 300px) → `router.push('/dashboard')` —
 *   scrollY ANIMATED 300 → 188 → 163 → 121 → 115 across ~500ms (47
 *   intermediate samples) instead of the instant reset. Every
 *   client-side transition rides the animation: the post-login push,
 *   the guest wall's router.replace, the 404's Go Home Link, the
 *   shell's logout push and its wordmark/back-to-site links.
 * ② THE CURE: ONE attribute — `<html lang="en"
 *   data-scroll-behavior="smooth">`. With the attribute present the
 *   router temporarily sets `scroll-behavior: auto` around its
 *   transition scrolls and restores it after; hash-only changes keep
 *   the smooth ride (the landing's anchor navigation — the parity
 *   face — untouched). The attribute is INVISIBLE to every
 *   computed-face probe (a data attribute changes no CSS): parity,
 *   drift, the mobile census and the captures are all unaffected —
 *   the a11y-superset doctrine's next member (the aria-expanded
 *   pattern).
 * ③ THE BOTH-ENDS PIN: the attribute without the CSS would be
 *   vacuous (nothing to disable); the CSS without the attribute is
 *   the bug. The battery pins BOTH ends — the attribute on the html
 *   element AND the raw `scroll-behavior: smooth` rule in globals —
 *   so neither can silently regress.
 * ④ THE E2E HALF: the instant-scroll logout leg in
 *   dashboard-inbox.spec.ts (the transition scroll sampled at 40ms —
 *   zero intermediate values; the pre-cure tree animates ~500ms and
 *   REDS) + the stacked-emulation census leg in landing.spec.ts (the
 *   session-60 candidate 1: reducedMotion AND forcedColors stacked —
 *   both apps identical live; the leg pins OUR side on the standalone
 *   artifact, including the html smooth face the cure must never
 *   change).
 * ⑤ THE DOC CURE: AGENTS.md's superset note names the attribute and
 *   the mechanism (a fresh agent must know the contract before
 *   touching the html element or the globals rule).
 */
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const read = (rel: string) =>
  existsSync(path.join(here, rel)) ? readFileSync(path.join(here, rel), "utf8") : "";
const strip = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");

const layout = strip(read("../src/app/layout.tsx"));
const globals = strip(read("../src/app/globals.css"));
const agents = read("../AGENTS.md");

// ---------------------------------------------------------------------------
// ① + ② the attribute contract — the html element, the exact value
// ---------------------------------------------------------------------------
describe("round-34: the route-transition scroll cure (F-34a — the attribute contract)", () => {
  it("the layout's <html> element carries data-scroll-behavior=\"smooth\" (the Next.js 16 route-transition contract)", () => {
    // the exact shape the installed router reads:
    // htmlElement.dataset.scrollBehavior === 'smooth'
    expect(layout, "the <html> opening tag must carry the attribute").toMatch(
      /<html\s+[^>]*data-scroll-behavior="smooth"/,
    );
  });

  it("the attribute rides the <html> element ALONE — never <body>, never a wrapper div — and its value is exactly \"smooth\"", () => {
    // the only value the installed check accepts; a corrupted value
    // ("auto", "instant") silently re-opens the bug the warning names
    expect(layout).not.toMatch(/data-scroll-behavior="(?!smooth)[^"]*"/);
    expect(layout, "the body element must never carry it").not.toMatch(
      /<body[^>]*data-scroll-behavior/,
    );
    // exactly ONE declaration site in the whole tree's own source
    expect(layout.match(/data-scroll-behavior/g) ?? []).toHaveLength(1);
  });

  it("globals.css still pins the raw html scroll-behavior: smooth rule — the parity face (the attribute without the CSS would be vacuous)", () => {
    // the reference's own rule, mirrored byte-for-byte — the drift
    // [reveal] leg censuses html scroll-behavior smooth IDENTICAL both
    // apps; removing it would break parity (and the anchor rides)
    expect(globals).toMatch(/scroll-behavior:\s*smooth/);
    // and exactly one declaration — a second site would fight the
    // first in the cascade
    expect(globals.match(/scroll-behavior:\s*smooth/g) ?? []).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// ④ the e2e half — the two round-34 legs' source contracts
// ---------------------------------------------------------------------------
describe("round-34: the route-transition e2e legs (the source contracts)", () => {
  it("dashboard-inbox.spec.ts rides the instant-scroll logout leg (the transition sampled — zero intermediate values)", () => {
    const src = strip(read("../tests/e2e/dashboard-inbox.spec.ts"));
    expect(src, "the leg's describe/test name").toContain("instant");
    // the leg must sample the transition (the animation window is
    // what the pre-cure tree exhibits — the live probe caught 47
    // intermediate samples at 40ms cadence)
    expect(src).toMatch(/sign-out/);
    expect(src).toMatch(/scrollY/);
    // and pin the parity face the cure must never change
    expect(src).toMatch(/scrollBehavior/);
  });

  it("landing.spec.ts rides the stacked-emulation census leg (reducedMotion AND forcedColors together — the session-60 candidate 1)", () => {
    const src = strip(read("../tests/e2e/landing.spec.ts"));
    expect(src, "the leg's describe name").toContain("stacked");
    // BOTH axes in one emulateMedia call — the census's own shape
    expect(src).toMatch(/emulateMedia\(\{\s*reducedMotion:\s*"reduce",\s*forcedColors:\s*"active"/);
  });
});

// ---------------------------------------------------------------------------
// ⑤ the doc cure — AGENTS.md names the contract
// ---------------------------------------------------------------------------
describe("round-34: the AGENTS.md doc cure (the fresh-agent pointer)", () => {
  it("AGENTS.md's superset note names the attribute and the route-transition mechanism", () => {
    expect(agents).toContain("data-scroll-behavior");
    expect(agents).toContain("route-transition");
  });
});
