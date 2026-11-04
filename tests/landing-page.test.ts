import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-199: the LANDING construction pins — the source-contract
// battery for the EleganceFlow one-pager. Every pinned class string was
// byte-extracted from the live reference DOM (six probes, 2026-11-03);
// these pins freeze the construction so a refactor cannot silently
// drift a class or a string.
//
// The house convention (the s46/s66/s67 doctrine): source-contract pins
// read COMMENT-STRIPPED sources — a literal pinned by a record comment
// alone is a vacuous pin, and an absence pin must not fail on the
// retired form quoted inside its own documentation.

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const landing = () => stripComments(read("src/components/landing/landing-page.tsx"));
const rootRoute = () => stripComments(read("src/app/page.tsx"));
const rootLayout = () => stripComments(read("src/app/layout.tsx"));

describe("session-199: the landing construction (the byte-extracted reference classes)", () => {
  it("the route renders the landing (the public one-pager at /)", () => {
    expect(rootRoute()).toMatch(/LandingPage/);
    // No page-level metadata export: the ROOT layout's object IS the
    // landing head (the s142 doctrine carried).
    expect(rootRoute()).not.toMatch(/export const metadata/);
  });

  it("the root layout's metadata is rebranded EleganceFlow (title + OG family)", () => {
    const src = rootLayout();
    expect(src).toContain('default: "EleganceFlow"');
    expect(src).toContain('template: "%s | EleganceFlow"');
    expect(src).not.toContain("NEO CRM");
  });

  it("the header rides the two scroll states from site-content (never a hand-built class)", () => {
    const src = landing();
    expect(src).toContain("scrolled ? HEADER_SCROLL.scrolled : HEADER_SCROLL.top");
    // the wordmark + the amber CTA pair
    expect(src).toMatch(/bg-amber-500 text-black/);
  });

  it("the mobile disclosure panel is the reference's INLINE construction (no drawer)", () => {
    const src = landing();
    expect(src).toContain("{menuOpen && (");
    expect(src).toContain("MOBILE_PANEL.wrap");
    // a link click closes the panel (the live-verified behavior)
    expect(src).toMatch(/onClick=\{\(\) => setMenuOpen\(false\)\}/);
    // the toggle flips icons + the aria state
    expect(src).toMatch(/aria-expanded=\{menuOpen\}/);
    expect(src).toContain("<X size={24} />");
    expect(src).toContain("<Menu size={24} />");
  });

  it("the hero: the h1 spans, the gradient overlay, the amber accent bar, the scroll indicator", () => {
    const src = landing();
    expect(src).toContain(
      "absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent",
    );
    expect(src).toContain("absolute left-0 top-0 bottom-0 w-1 bg-amber-500");
    expect(src).toContain('<span className="block">{HERO.headingLines[0]}</span>');
    expect(src).toContain("absolute bottom-10 left-6 flex items-center gap-3");
    expect(src).toContain("w-8 h-px bg-white/30");
  });

  it("the services: the FEATURED Design & Web card (amber bg + zinc ink + the /70 body)", () => {
    const src = landing();
    expect(src).toContain(
      '"relative p-8 flex flex-col gap-5 group transition-all duration-300 text-zinc-950 bg-amber-500"',
    );
    expect(src).toContain("text-sm leading-relaxed text-zinc-900/70");
    expect(src).toContain("mt-auto pt-4 border-t border-black/10");
    // the regular card family
    expect(src).toContain(
      "relative p-8 flex flex-col gap-5 group transition-all duration-300 bg-zinc-900 border border-white/5 text-white hover:border-white/20",
    );
    expect(src).toContain("mt-auto pt-4 border-t border-white/10");
  });

  it("the work section: the active filter chip is AMBER (probe-2's computed styles)", () => {
    const src = landing();
    expect(src).toContain(
      'filter === f ? AMBER_CTA_INK : "bg-zinc-100 text-zinc-500"',
    );
    // the card overlay (hover-only — no dialog onClick anywhere)
    expect(src).toContain("absolute inset-0 bg-zinc-950/80 opacity-0 group-hover:opacity-100");
    expect(src).not.toMatch(/group-hover:opacity-100[\s\S]{0,400}onClick/);
  });

  it("the testimonials: the amber quote icon + the selector's border-l-4 amber active state", () => {
    const src = landing();
    expect(src).toContain('<Quote size={40} className="mb-6 opacity-30 text-amber-500" />');
    expect(src).toContain(
      '"text-left p-5 border transition-all duration-200 border-l-4 border-l-amber-500 bg-zinc-900"',
    );
    expect(src).toContain(
      '"text-left p-5 border transition-all duration-200 border-white/5 hover:border-white/15"',
    );
  });

  it("the contact form: the byte-extracted input/select/textarea classes + the label bindings", () => {
    const src = landing();
    expect(src).toContain(
      "w-full border border-zinc-200 px-4 py-3 text-sm text-zinc-950 outline-2 outline-transparent outline-offset-2 focus:border-zinc-950 transition-colors",
    );
    expect(src).toContain("bg-white appearance-none pr-10");
    expect(src).toContain("resize-none");
    // the a11y superset: every field is id/htmlFor-bound (the drawer
    // precedent — invisible in construction, honest for assistive tech)
    for (const id of ["inquiry-name", "inquiry-email", "inquiry-service", "inquiry-message"]) {
      expect(src).toContain(`htmlFor="${id}"`);
      expect(src).toContain(`id="${id}"`);
    }
    // the select's chevron: the reference's own odd placement (top-1/2
    // of the WRAPPER + translate-y-1) — byte-carried, never "fixed"
    expect(src).toContain(
      "absolute right-4 top-1/2 translate-y-1 pointer-events-none text-zinc-400",
    );
  });

  it("the contact rows: mail/phone links + the plain location row (no group-hover)", () => {
    const src = landing();
    expect(src).toContain(`mailto:`);
    expect(src).toContain(`tel:`);
    // the location row is the ONLY row without the group-hover border
    expect(src).toContain(
      "w-10 h-10 flex items-center justify-center border border-zinc-200 group-hover:border-zinc-400 transition-colors",
    );
    expect(src).toContain("w-10 h-10 flex items-center justify-center border border-zinc-200\"");
  });

  it("the footer: the three-column flex row + the four text socials", () => {
    const src = landing();
    expect(src).toContain("bg-zinc-950 border-t border-white/5 py-12");
    expect(src).toContain("text-white font-black text-sm tracking-widest mb-1");
    expect(src).toContain("text-white/30 text-xs");
    expect(src).toContain("text-white/20 text-xs");
  });

  it("the submit posts to the REAL route (the superset) and swaps to the in-place success panel (round-19)", () => {
    const src = landing();
    expect(src).toContain('fetch("/api/inquiry"');
    // Round-19 (the interaction-behavior census — F-19a): the success
    // face is the reference's IN-PLACE PANEL (the form is removed; the
    // floating success toast is retired). Pinned here at the mechanism
    // level; interaction-faces ①②③ owns the full family.
    expect(src).toContain("setSubmitted(true);");
    expect(src).not.toContain("toast.success");
    // failures answer the honest error toast, never a silent catch
    expect(src).toContain("toast.error(");
  });
});

describe("session-199: the landing's Tailwind v4 state (the re-pin family)", () => {
  it("globals.css carries the v3 zinc re-pin (the sixth re-pin member)", () => {
    const css = read("src/app/globals.css");
    expect(css).toContain("--color-zinc-950: #09090b;");
    expect(css).toContain("--color-zinc-100: #f4f4f5;");
    expect(css).toContain("--color-zinc-500: #71717a;");
  });

  it("the amber family stays pinned to the reference's computed values", () => {
    const css = read("src/app/globals.css");
    expect(css).toContain("--color-amber-500: #f59e0b;");
    expect(css).toContain("--color-amber-400: #fbbf24;");
  });

  it("the hover-variant un-wrap + the cursor-pointer base rule stay (the v4 traps)", () => {
    const css = read("src/app/globals.css");
    expect(css).toContain("@custom-variant hover (&:hover);");
    expect(css).toMatch(/button,\s*\[role="button"\]\s*\{\s*cursor: pointer;/);
  });
});

describe("round-11: the designed 404's hydration decode (the client-error census's catch)", () => {
  // The /_not-found route is PRERENDERED at build — the baked HTML
  // interpolates the build-time pathname "_not-found". Before round-11
  // the client's first render interpolated the REAL unmatched path →
  // React #418 (text mismatch) on every real 404 of the standalone
  // artifact, invisible to every gate (the smoke ladder curls the
  // status; the e2e 404 pin read the settled face AFTER React's
  // recovery re-render). The e2e client-error census
  // (tests/e2e/inbox-states.spec.ts) pins the zero-page-error bar; this
  // source contract pins the decode.
  //
  // HARNESS NOTE (the round-10 extractor lesson, next member): the
  // battery's naive `//` stripper eats the regex literal inside
  // `replace(/^\//, "")` — the code-aware stripper below skips line
  // comments inside quotes and regex literals, local to this block
  // (the battery's existing pins keep their proven harness).
  function stripCommentsCodeAware(src: string): string {
    let out = "";
    let i = 0;
    while (i < src.length) {
      const c = src[i];
      const next = src[i + 1];
      if (c === "/" && next === "*") {
        const end = src.indexOf("*/", i + 2);
        i = end === -1 ? src.length : end + 2;
        continue;
      }
      // a regex literal: a `/` in value position (after ( , = : [ ! & | ? { ; or start)
      // NB: .match, never .test — the count-ladder census regex counts
      // a bare `.test(` as a test block (the recorded lesson).
      if (c === "/" && i > 0 && src[i - 1].match(/[(,=:[!&|?;{.\n]/)) {
        let j = i + 1;
        let re = "";
        while (j < src.length && src[j] !== "\n") {
          if (src[j] === "\\") {
            re += src[j] + (src[j + 1] ?? "");
            j += 2;
            continue;
          }
          if (src[j] === "/") break;
          if (src[j] === "[" ) {
            // a character class may contain an unescaped /
            const clsEnd = src.indexOf("]", j);
            if (clsEnd !== -1) {
              re += src.slice(j, clsEnd + 1);
              j = clsEnd + 1;
              continue;
            }
          }
          re += src[j];
          j += 1;
        }
        // keep the flags arm if present
        if (src[j] === "/") {
          let k = j + 1;
          while (k < src.length && src[k].match(/[a-z]/)) k += 1;
          out += `${src.slice(i, j + 1)}${src.slice(j + 1, k)}`;
          i = k;
          continue;
        }
        // not a regex after all (no closing / before EOL) — emit as-is
        out += c;
        i += 1;
        continue;
      }
      if (c === "/" && next === "/") {
        const end = src.indexOf("\n", i);
        i = end === -1 ? src.length : end;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") {
        const quote = c;
        let j = i + 1;
        while (j < src.length && src[j] !== quote) {
          if (src[j] === "\\") j += 1;
          j += 1;
        }
        out += src.slice(i, j + 1);
        i = j + 1;
        continue;
      }
      out += c;
      i += 1;
    }
    return out;
  }
  const notFound = () => stripCommentsCodeAware(read("src/app/not-found-body.tsx"));

  it("hydrates with the baked literal (the exact value the prerendered HTML carries)", () => {
    const src = notFound();
    // the two-phase decode: mounted gates the real path; the initial
    // render carries the baked "_not-found" so hydration compares
    // equal — the mismatch class is dead at the source.
    expect(src).toContain('mounted ? pathname.replace(/^\\//, "") : "_not-found"');
    expect(src).toContain("React.useState(false)");
    expect(src).toContain("setMounted(true)");
  });

  it("keeps the reference's decode (the leading-slash strip on the real path)", () => {
    const src = notFound();
    expect(src).toContain('pathname.replace(/^\\//, "")');
    // the real path rides the mounted arm — never the initial render
    expect(src).not.toContain('"{pathname.replace(');
  });
});
