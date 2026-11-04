/**
 * Round-14 preflight-face battery: the PREFLIGHT-GENUS family (the form
 * faces no probe read — parity-199 reads the elements' own at-rest
 * styles, never pseudo-elements; the drift probe read text content, the
 * img srcs and the auth card's faces; no e2e pin read a placeholder, a
 * form background, or a transition-property list) finally sits under
 * the unit gate.
 *
 * The coverage gap this battery closes (live-probed settled
 * 2026-11-04, both apps):
 *
 * ① THE PLACEHOLDER INK (F-14a, VISIBLE): the reference's v3 preflight
 *   paints `input::placeholder, textarea::placeholder` gray-400
 *   (#9ca3af → rgb(156,163,175)); v4's preflight paints
 *   `::placeholder { color: color-mix(in oklab, currentcolor 50%,
 *   transparent) }` (node_modules/tailwindcss/index.css:843-847) — our
 *   inputs' placeholders computed zinc-950@50% (a near-black) where the
 *   reference renders light gray, on the parity-gated public surface.
 *   The cure: a scoped rule restoring the v3 face for the landing's
 *   mirrored contact form (the class strings stay byte-equal — no
 *   placeholder: utility creeps in, see ⑤).
 * ② THE FORM BACKGROUND (F-14b, latent): the v3 preflight left the UA
 *   `field` default (white) on inputs/textareas; v4's preflight resets
 *   `background-color: transparent` (preflight.css:255). Same paint
 *   over the white contact section — but a computed-face divergence by
 *   the doctrine's letter, and the mechanism would surface on any
 *   future non-white context. The cure: the scoped white face.
 * ③ THE transition-colors RE-PIN (F-14c — the EIGHTH v4 re-pin trap):
 *   v4.3's functional utility HARDCODES the expanded property list
 *   (`… outline-color … --tw-gradient-from, --tw-gradient-via,
 *   --tw-gradient-to` — a static value in dist/lib.mjs, NOT
 *   theme-driven; an @theme --transition-property-colors override does
 *   nothing, AND a custom @utility transition-colors colliding with
 *   the functional built-in is SILENTLY DROPPED from the build — found
 *   live, the round-14 harness find); the reference's v3-era list is
 *   the six-property form. The cure: an UNLAYERED .transition-colors
 *   rule — unlayered author styles outrank every @layer (including
 *   utilities) in the cascade — re-pinning the v3 list; the utility's
 *   own timing/duration declarations still apply from the utilities
 *   layer, so every duration-200/300 carrier keeps its face.
 * ④ THE transition-transform KEEPS-OUT (F-14d, the load-bearing
 *   decode): v4's `transform, translate, scale, rotate` list is
 *   REQUIRED — v4 compiles the translate-x and scale utilities to the
 *   individual properties, so re-pinning to v3's bare `transform` would
 *   kill the hover motions (the hero CTA arrow, the project-image zoom,
 *   the submit arrow). globals.css must NEVER override
 *   transition-transform.
 * ⑤ THE CLASS-STRING PURITY: the landing's form controls carry no
 *   placeholder: utility — the cure lives in scoped CSS, the
 *   byte-mirror holds (the reference's inputs carry none either).
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

const globalsCss = read("src/app/globals.css");
const globalsCode = stripComments(globalsCss);
const landing = stripComments(read("src/components/landing/landing-page.tsx"));

describe("round-14 ①: the placeholder ink (the v3 preflight's gray-400, scoped to the mirrored contact form)", () => {
  it("globals.css carries the scoped ::placeholder rule with the v3 gray-400 literal #9ca3af", () => {
    expect(globalsCode).toContain("#contact input::placeholder");
    expect(globalsCode).toContain("#contact textarea::placeholder");
    expect(globalsCode).toMatch(/::placeholder\s*\{[^}]*color:\s*#9ca3af/);
  });

  it("the scoped rule covers both the inputs and the textarea (the reference's v3 rule covered both element kinds)", () => {
    expect(globalsCode).toMatch(/#contact input::placeholder,\s*\n\s*#contact textarea::placeholder/);
  });
});

describe("round-14 ②: the form background (the UA field default the v3 preflight left alone)", () => {
  it("globals.css carries the scoped white background on the contact inputs + textarea", () => {
    expect(globalsCode).toMatch(/#contact input,\s*\n\s*#contact textarea\s*\{[^}]*background-color:\s*#fff/);
  });

  it("the scoped rule does NOT touch the select (its bg-white is the byte-mirrored class, pinned separately)", () => {
    expect(globalsCode).not.toContain("#contact select");
  });
});

describe("round-14 ③: the unlayered transition-colors re-pin (trap ⑧ — the property-list expansion)", () => {
  it("globals.css re-pins .transition-colors to the v3 six-property list via an UNLAYERED rule", () => {
    // The harness find: a custom @utility transition-colors colliding
    // with the functional built-in is silently dropped from the build —
    // only an unlayered rule outranks the utilities layer.
    expect(globalsCode).toMatch(
      /^\.transition-colors\s*\{\s*\n?\s*transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;/m,
    );
  });

  it("the re-pin rule carries ONLY the transition-property declaration (the utility's timing/duration declarations stay in the utilities layer)", () => {
    const block = globalsCode.match(/^\.transition-colors\s*\{([^}]*)\}/m);
    expect(block, "the unlayered .transition-colors rule must exist").toBeTruthy();
    expect(block![1]).toContain(
      "transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;",
    );
    expect(block![1]).not.toContain("transition-duration");
    expect(block![1]).not.toContain("transition-timing-function");
  });

  it("the retired v4 additions never return in the re-pin (outline-color + the gradient vars)", () => {
    const block = globalsCode.match(/^\.transition-colors\s*\{([^}]*)\}/m);
    expect(block).toBeTruthy();
    expect(block![1]).not.toContain("outline-color");
    expect(block![1]).not.toContain("--tw-gradient-from");
    expect(block![1]).not.toContain("--tw-gradient-via");
    expect(block![1]).not.toContain("--tw-gradient-to");
  });
});

describe("round-14 ④: the transition-transform keeps-out (the load-bearing decode — F-14d)", () => {
  it("globals.css never overrides transition-transform (re-pinning it would kill the hover motions)", () => {
    expect(globalsCode).not.toMatch(/@utility\s+transition-transform/);
    expect(globalsCode).not.toMatch(/--transition-property-transform/);
    expect(globalsCode).not.toMatch(/^\.transition-transform\s*\{/m);
  });

  it("the landing's motion carriers keep the transition-transform class (the hero CTA arrow + the project-image zoom + the submit arrow)", () => {
    expect(landing).toContain("transition-transform group-hover:translate-x-1");
    expect(landing).toContain("transition-transform duration-700 group-hover:scale-110");
    expect(landing).toContain("transition-transform duration-300 group-hover:translate-x-1");
  });
});

describe("round-14 ⑤: the class-string purity (the cure stays in CSS — the byte-mirror holds)", () => {
  it("the landing's form controls carry no placeholder: utility (the reference's inputs carry none)", () => {
    expect(landing).not.toMatch(/placeholder:[\w-]+/);
  });

  it("the landing's mirrored form controls keep the byte-mirrored control string (the round-13 composed outline face included)", () => {
    expect(landing).toContain(
      "outline-2 outline-transparent outline-offset-2 focus:border-zinc-950 transition-colors",
    );
  });
});
