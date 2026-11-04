/**
 * Round-16 geometry/structure battery: the ATTRIBUTE/GEOMETRY faces no
 * probe read (parity-199 reads ~40 computed at-rest styles — never
 * bounding boxes or the flex layout that produces them; the drift probe
 * read text/img/login/preflight/motion faces; the e2e hero test rode
 * toBeVisible/toContainText — an element with a non-empty box passes
 * "visible" ENTIRELY OFF-CANVAS; the smoke ladder curls the SSR HTML)
 * finally sit under the unit gate.
 *
 * The coverage gap this battery closes (live-probed settled 2026-11-04,
 * both apps, dev server AND the standalone artifact):
 *
 * ① THE HERO BACKGROUND STRUCTURE (F-16a, CRITICAL, VISIBLE, BOTH
 *   viewports): the reference nests its hero photo inside
 *   `<div class="absolute inset-0">` (img + gradient together, OUT of
 *   the flex flow); OURS rendered the `<img>` as a DIRECT section child
 *   — a second IN-FLOW FLEX ITEM that squeezed the content column to
 *   min-content (410px at 1280 / 229px at 390) and pushed it ENTIRELY
 *   OFF-CANVAS (x=1280 / x=390, clipped by overflow-hidden) while
 *   every gate stayed green. The hero rendered 1008px tall (vs 800)
 *   and the body scroll height ran +234px. The cure: the reference's
 *   own wrapper.
 * ② THE IMG-OUT-OF-FLOW NEGATIVE: the hero section opens with the
 *   wrapper div, never the bare img — the wrapper is the ONLY shape
 *   that keeps the photo out of the flex line.
 * ③ THE SCROLL-LABEL PARENT (F-16a's second member): the reference's
 *   `absolute bottom-10 left-6` indicator sits INSIDE the content
 *   column (its `relative` establishes the containing block → renders
 *   at [256,719]); OURS sat at section level ([24,952]) — a visible
 *   position divergence that survives the wrapper cure unless the
 *   label moves with it.
 * ④ THE LEADING DECODES (F-16b/F-16c, VISIBLE — the trap-⑥ genus, two
 *   new members): the reference's v3-era cascade makes plain
 *   `leading-snug`/`leading-relaxed` LOSE to its media-block
 *   `md:text-3xl`/`md:text-xl` rules at md+ (v3 pairs the text steps
 *   with their own line-heights — 36px at 30px font, 28px at 20px —
 *   and media rules sort after the plain leading rule), while our v4
 *   sorts the leading utility LAST at every width. The quote paragraph
 *   computed 41.25px where the reference computes 36px (the entire
 *   +26px testimonials delta); the hero paragraph computed 32.5px
 *   where the reference computes 28px. Below md both agree (33px /
 *   29.25px — verified at 390). The cures ride the h1/h2 precedent:
 *   the md: override that reproduces the reference's computed face.
 * ⑤ THE VALIDATION MODE (F-16d, behavioral): the reference's form
 *   NATIVE-VALIDATES (its four required controls block an empty
 *   submit — no submit event, no POST, the browser's own bubbles);
 *   OURS carried `noValidate`, so an empty submit FIRED and posted to
 *   the API (400 → our error toast) — a visible behavioral
 *   divergence. The cure: drop the attribute; the reference's native
 *   gate is the byte-mirror face.
 * ⑥ THE ICON GLYPHS (F-16e, VISIBLE): our lucide-react 0.525 ships
 *   REDESIGNED glyphs where the reference ships its older lucide-era
 *   set — the palette (the reference's circles-and-body vs our
 *   teardrop), the megaphone (horn-and-handle vs the new solid horn),
 *   the mail (the 1.94-radius arc vs our 2.009), the phone (the
 *   classic handset vs our continuous-stroke redraw) — plus the login
 *   card's Google G (the classic 22.56-based quartet vs our 23.5-based
 *   redraw). 13 of 18 landing glyphs + the menu internals paint
 *   identically (recorded, kept lucide-react); the divergent five are
 *   now the reference-exact glyphs.
 * ⑦ THE RETIRED-FORM REGRESSIONS: the new-lucide glyph paths, the
 *   redrawn Google quartet, and the noValidate attribute never return
 *   to the sources.
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

const landing = stripComments(read("src/components/landing/landing-page.tsx"));
const loginCard = stripComments(read("src/components/layout/login-card.tsx"));
// tolerant pre-cure: the module ships with R-2 — an absent file reads
// as "" so the content checks fail honestly instead of erroring the
// whole suite at import time (the round-15 born-RED-split lesson).
const refIcons = (() => {
  try {
    return stripComments(read("src/components/ui/reference-icons.tsx"));
  } catch {
    return "";
  }
})();

describe("round-16 ①②: the hero background structure (the reference's absolute wrapper)", () => {
  it("the hero photo + gradient live inside the reference's `absolute inset-0` wrapper", () => {
    expect(landing).toMatch(
      /<div className="absolute inset-0">\s*<img[\s\S]*?className="w-full h-full object-cover opacity-30"\s*\/>\s*<div className="absolute inset-0 bg-gradient-to-r[^"]*"\s*\/>\s*<\/div>/,
    );
  });

  it("the hero section opens with the wrapper div — the img is never a direct (in-flow flex) child", () => {
    // ({} = the stripped JSX comment the mechanism note leaves behind)
    expect(landing).toMatch(
      /className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950">\s*(?:\{\}\s*)*<div className="absolute inset-0">/,
    );
  });
});

describe("round-16 ③: the scroll indicator rides inside the content column (the reference's nesting)", () => {
  it("the label closes, then the content column closes, then the section (the inside form)", () => {
    // the reference: label ← content div (relative) ← section → renders
    // at [256,719]; at section level it renders at the section's own
    // bottom-left — the label's close must be followed by the COLUMN's
    // close before the section's.
    expect(landing).toMatch(
      /<div className="absolute bottom-10 left-6[\s\S]{0,300}?<\/span>\s*<\/div>\s*<\/div>\s*<\/section>/,
    );
  });

  it("the section-level placement never returns (label-close must not meet the section close directly)", () => {
    expect(landing).not.toMatch(
      /<div className="absolute bottom-10 left-6[\s\S]{0,300}?<\/span>\s*<\/div>\s*<\/section>/,
    );
  });
});

describe("round-16 ④: the leading decodes (the trap-⑥ genus — the md+ computed faces)", () => {
  it("the quote paragraph carries the md:leading-9 decode (36px at md+, the reference's own md:text-3xl pairing)", () => {
    expect(landing).toContain("leading-snug md:leading-9");
  });

  it("the hero paragraph carries the md:leading-7 decode (28px at md+, the reference's own md:text-xl pairing)", () => {
    expect(landing).toContain("leading-relaxed md:leading-7");
  });
});

describe("round-16 ⑤: the validation mode (the reference's native gate)", () => {
  it("the contact form carries NO noValidate (empty submits native-validate, like the reference)", () => {
    expect(landing).not.toMatch(/novalidate/i);
  });
});

describe("round-16 ⑥a: the reference-exact glyph components (the four landing glyphs)", () => {
  it("the palette carries the reference's circles-and-body path", () => {
    expect(refIcons).toContain("M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z");
    expect(refIcons).toContain('cx="13.5" cy="6.5" r=".5"');
  });

  it("the megaphone carries the reference's horn-and-handle pair", () => {
    expect(refIcons).toContain("m3 11 18-5v12L3 14v-3z");
    expect(refIcons).toContain("M11.6 16.8a3 3 0 1 1-5.8-1.6");
  });

  it("the mail carries the reference's rect + 1.94-radius arc", () => {
    expect(refIcons).toContain('width="20" height="16" x="2" y="4" rx="2"');
    expect(refIcons).toContain("m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7");
  });

  it("the phone carries the reference's classic handset path", () => {
    expect(refIcons).toContain("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z");
  });

  it("the components render the reference's lucide skeleton (the class-pair template + the stroke attrs + the four glyph names)", () => {
    expect(refIcons).toMatch(/className=\{`lucide lucide-\$\{name\}/);
    expect(refIcons).toMatch(/strokeWidth=\{2\}/);
    expect(refIcons).toMatch(/strokeLinecap="round"/);
    expect(refIcons).toMatch(/strokeLinejoin="round"/);
    for (const name of ["palette", "megaphone", "mail", "phone"]) {
      expect(refIcons).toContain(`name="${name}"`);
    }
  });
});

describe("round-16 ⑥b: the glyph sites (the landing swaps the divergent four)", () => {
  it("SERVICE_ICONS maps palette/megaphone to the reference glyphs", () => {
    expect(landing).toMatch(/palette:\s*ReferencePalette,/);
    expect(landing).toMatch(/megaphone:\s*ReferenceMegaphone,/);
  });

  it("the contact links render the reference Mail/Phone glyphs (MapPin stays lucide — identical on both apps)", () => {
    expect(landing).toMatch(/<ReferenceMail size=\{16\} className="text-zinc-400" \/>/);
    expect(landing).toMatch(/<ReferencePhone size=\{16\} className="text-zinc-400" \/>/);
    expect(landing).toMatch(/<MapPin size=\{16\} className="text-zinc-400" \/>/);
  });

  it("the lucide-react import list no longer carries the four divergent glyphs", () => {
    const importBlock = landing.match(/import \{[\s\S]*?\} from "lucide-react";/)?.[0] ?? "";
    expect(importBlock).not.toMatch(/\bPalette\b/);
    expect(importBlock).not.toMatch(/\bMegaphone\b/);
    expect(importBlock).not.toMatch(/\bMail\b/);
    expect(importBlock).not.toMatch(/\bPhone\b/);
  });
});

describe("round-16 ⑦a: the retired glyph forms never return", () => {
  it("the new-lucide path data (the redesigned glyphs) never returns to the landing sources", () => {
    const both = landing + refIcons;
    expect(both).not.toContain("M12 22a1 1 0 0 1 0-20"); // the redrawn palette body
    expect(both).not.toContain("M11 6a13 13 0 0 0 8.4-2.8"); // the solid megaphone horn
    expect(both).not.toContain("m22 7-8.991 5.727"); // the 2.009-radius mail arc
    expect(both).not.toContain("M13.832 16.568"); // the continuous-stroke phone
  });
});

describe("round-16 ⑥c: the login card's Google quartet + the auth Mail (the reference glyphs)", () => {
  it("the GoogleIcon carries the reference's classic 22.56-based quartet", () => {
    expect(loginCard).toContain("M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z");
    expect(loginCard).toContain("M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z");
    expect(loginCard).toContain("M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z");
    expect(loginCard).toContain("M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z");
  });

  it("the redrawn 23.5-based quartet never returns", () => {
    expect(loginCard).not.toContain("M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.3h6.5c-.1 1.1-.8 2.7-2.4 3.8");
    expect(loginCard).not.toContain("M12 24c3.2 0 5.9-1.1 7.9-2.9");
    expect(loginCard).not.toContain("M5.2 14.4c-.2-.7-.4-1.5-.4-2.4");
    expect(loginCard).not.toContain("M12 4.7c2.2 0 3.7.9 4.5 1.9");
  });

  it("the auth Mail usages render the reference glyph (the login card imports it from the reference-icons module)", () => {
    expect(loginCard).toMatch(/ReferenceMail/);
    const importBlock = loginCard.match(/import \{[\s\S]*?\} from "lucide-react";/)?.[0] ?? "";
    expect(importBlock).not.toMatch(/\bMail\b/);
  });
});
