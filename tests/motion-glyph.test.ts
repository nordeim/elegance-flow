/**
 * Round-15 motion/glyph battery: the TIME-DIMENSION and GLYPH faces no
 * probe read (parity-199 reads the elements' own at-rest styles — never
 * the html element's scroll-behavior or any scroll trajectory; the drift
 * probe read text/img/login/preflight faces but its text census walks
 * nav/h1/h2/services/stats/chips — never the testimonial quote block; the
 * e2e carousel test checks distinct-ness, not bytes) finally sit under
 * the unit gate.
 *
 * The coverage gap this battery closes (live-probed settled 2026-11-04,
 * both apps):
 *
 * ① THE ANCHOR-RIDE MOTION FACE (F-15a, VISIBLE, functional): the
 *   reference's app CSS ships the raw rule `html { scroll-behavior:
 *   smooth }` (found live in its stylesheets; its html computes smooth) —
 *   every anchor navigation GLIDES through intermediate positions
 *   (trajectory-probed: 0→27→199→552→686→751→778→796→800 over ~700ms on
 *   the #about ride). OURS computed auto and JUMPED (the target on the
 *   first sample). The divergence rode EVERY in-page navigation: the 5
 *   desktop nav links, the 5 mobile-menu links, both hero CTAs, the
 *   footer links. The raw-rule genus (the session-10 cursor and
 *   session-16 th/td precedents — reference CSS rules outside the
 *   utility system that the port must carry explicitly); NOT a v4 trap.
 *   The cure: the same rule in globals.css's base layer.
 * ② THE HTML-ELEMENT PURITY: the reference's html element ships BARE (no
 *   class attribute — its smooth scroll is the CSS rule, never a utility)
 *   and ours byte-mirrors it: the cure is the rule, never a scroll-smooth
 *   class on the element.
 * ③ THE TESTIMONIAL QUOTE GLYPH (F-15c, VISIBLE, text): OURS rendered
 *   typographic quotes (U+201C/U+201D via the &ldquo;/&rdquo; entities)
 *   where the live reference renders STRAIGHT double quotes (U+0022) as
 *   standalone text-node children (the DOM structure matches — 3 children
 *   both sides; only the glyph bytes differ). The FULL-TEXT census (96 vs
 *   96 text nodes, byte-diffed) proved this the SOLE text divergence on
 *   the entire landing. The cure: the straight-quote literal at the
 *   render site.
 * ④ THE RETIRED-FORM REGRESSION: the &ldquo;/&rdquo; entities (and the
 *   raw U+201C/U+201D code points) never return to the landing source —
 *   the reference's own glyph face is the straight quote.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf8");

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const globalsCode = stripComments(read("src/app/globals.css"));
const landing = stripComments(read("src/components/landing/landing-page.tsx"));
const layout = stripComments(read("src/app/layout.tsx"));

describe("round-15 ①: the anchor-ride motion face (the reference's raw smooth-scroll rule)", () => {
  it("globals.css's base layer carries the raw html { scroll-behavior: smooth } rule", () => {
    // indented inside @layer base — the raw-rule genus (session-10
    // cursor / session-16 th/td precedents)
    expect(globalsCode).toMatch(/^\s*html\s*\{\s*\n?\s*scroll-behavior:\s*smooth;/m);
  });

  it("the rule lives exactly once (the raw-rule genus — no duplicate variants)", () => {
    const hits = globalsCode.match(/^\s*html\s*\{\s*\n?\s*scroll-behavior:/gm);
    expect(hits?.length).toBe(1);
  });
});

describe("round-15 ②: the html-element purity (the rule, never the class)", () => {
  // Round-34 (F-34a) evolution: the element now also carries the
  // data-scroll-behavior="smooth" attribute (the Next.js 16
  // route-transition contract — pinned by tests/scroll-behavior-attr
  // .test.ts). The CLASS-purity invariant below is unchanged: the
  // reference's html carries no class attribute, and the smooth-scroll
  // cure remains the CSS rule, never a Tailwind utility.
  it("the layout's html element carries lang + the round-34 data attribute, and never a class (the reference's html carries no class attribute)", () => {
    expect(layout).toMatch(/<html lang="en" data-scroll-behavior="smooth">/);
  });

  it("the html element never gains a scroll-smooth/scroll-auto utility (the cure is the CSS rule)", () => {
    expect(layout).not.toMatch(/<html[^>]*scroll-smooth/);
    expect(layout).not.toMatch(/<html[^>]*scroll-auto/);
    expect(layout).not.toMatch(/<html[^>]*\sclass=/);
  });
});

describe("round-15 ③: the testimonial quote glyph (the reference's straight double quotes)", () => {
  it("landing-page.tsx renders the quote wrapped in STRAIGHT double quotes", () => {
    expect(landing).toContain('"{testimonial.quote}"');
  });
});

describe("round-15 ④: the retired-form regression (the typographic glyphs never return)", () => {
  it("the &ldquo;/&rdquo; entities never return to the landing source", () => {
    expect(landing).not.toContain("&ldquo;");
    expect(landing).not.toContain("&rdquo;");
  });

  it("the raw U+201C/U+201D code points never appear in the landing source", () => {
    expect(landing).not.toContain("\u201C");
    expect(landing).not.toContain("\u201D");
  });
});
