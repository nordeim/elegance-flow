import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

/**
 * The round-22 INTERMEDIATE-VIEWPORT census — the breakpoint boundaries
 * no probe ever visited (every probe since session-199 read 1280 and
 * 390 only: the parity script's two viewports, the drift legs' widths,
 * the e2e device 1280×720, the captures).
 *
 * **R-22a (RECORD — the positive census, clean, first time probed,
 * live on both apps 2026-11-05)**: every boundary face COMPUTES
 * IDENTICAL at sm (640) and md (768):
 *   · html font-size 16px both apps — the v4 REM-BREAKPOINT CARRIER
 *     (v3's media queries were px-based; v4's are rem-based — at the
 *     16px default they agree; a declared root size would shift every
 *     boundary on OUR build only).
 *   · The header flip at 768 (hamburger display:none, desktop nav
 *     display:flex, CTA display:flex) — the mobile menu's retirement
 *     boundary works exactly as expected; no Tailwind v4 media-query
 *     bug on the header family.
 *   · The hero h1 48px/43.2px at 640 → 72px/72px at 768; the h2 family
 *     36px/34.2px → 48/60px with leading=font at md+ (the trap-⑥
 *     decodes' own boundary).
 *   · The grids: about 592px → 328px×2 (md:grid-cols-2), work 284×2 →
 *     348×2, testimonials 286×2 → 350×2, the contact form pair 286×2 →
 *     154×2.
 *   · The auth card's sm:/md: family: input 48px at sm (h-11 sm:h-12),
 *     input font 16px → 14px at md (text-base md:text-sm), logo 96×96
 *     (sm:h-24), title 30px (sm:text-3xl), inner pad 40px → 48px 40px
 *     40px (p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10), the trailing
 *     sm:hidden spacer display:none from sm.
 *   · The mobile panel OPEN at 640: the byte-identical wrap class + the
 *     same 5 links + the amber CTA.
 *   · The toast viewport (ours-side ride): bottom-right from sm, max-w
 *     420px from md — the byte-extracted viewport string's own
 *     breakpoints live-verified.
 *   · The footer socials (# hrefs ×4) and the img attrs (no
 *     loading/decoding on either app) — width-independent, IDENTICAL.
 *
 * **F-22a (the coverage catch — the class this battery closes)**: none
 * of these faces carried a pin. The drift classes that would ship with
 * every gate green: a sm:/md: class edit in the boundary families; a
 * root `html { font-size: … }` declaration (the v4 REM-BREAKPOINT
 * SHIFT — every boundary moves 640→720/768→864 at 18px while the
 * reference's px-based v3 build stays put); a viewport-class regression
 * in the toast or the LOGIN_LAYOUT contract. The round-19/20/21 pin
 * doctrine (every user-visible face gets a pin) had never reached the
 * intermediate widths.
 *
 * Contract (comment-stripped reads — a literal pinned by a comment
 * alone is vacuous, the s64/s65/s66 lesson):
 * ① THE LANDING'S BREAKPOINT-CLASS FAMILY — the header trio, the h1's
 *   text ladder, the five grid flips, the contact form pair, the mobile
 *   panel's wrap.
 * ② THE LOGIN_LAYOUT sm:/md: FAMILY — the input/submit heights, the
 *   logo, the title/subtitle, the inner pads, the form/fields stacks,
 *   the footer row, the trailing spacer, the input's text ladder.
 * ③ THE TOAST VIEWPORT'S BREAKPOINT STRING — top-0/flex-col-reverse at
 *   base (phones, top-of-screen), the sm: flip to bottom-right
 *   column, the md: max-w cap.
 * ④ THE ROOT-FONT-SIZE PURITY — globals.css declares NO font-size on
 *   html/:root (the UA 16px default IS the rem-breakpoint carrier; a
 *   declared size shifts every v4 boundary invisibly — the standing
 *   Tailwind-v4 hunt's live member).
 */
const ROOT = path.resolve(import.meta.dirname, "..");

const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf8");

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const landing = stripComments(read("src/components/landing/landing-page.tsx"));
const layout = stripComments(read("src/lib/page-layout.ts"));
const cardRaw = read("src/components/layout/login-card.tsx");
const toast = stripComments(read("src/components/ui/toast.tsx"));
const css = stripComments(read("src/app/globals.css"));
const content = stripComments(read("src/lib/site-content.ts"));

describe("the round-22 viewport-faces census (F-22a + the keeps)", () => {
  it("1. the landing's breakpoint-class family — the header trio, the h1 ladder, the five grid flips, the form pair, the panel wrap", () => {
    // The header flip at md (768) — the mobile menu's own retirement
    // boundary (the operator's standing emphasis): the desktop nav and
    // CTA appear, the hamburger retires. A lost md: prefix on any of
    // the trio breaks the flip at 768 while 1280/390 probes stay green.
    expect(landing).toContain('"hidden md:flex items-center gap-8"');
    expect(landing).toMatch(/className=\{?["'`]hidden md:inline-flex items-center px-5 py-2\.5/);
    expect(landing).toContain('"md:hidden text-white p-1"');
    // The hero h1's text ladder: 48px base, 72px from md, 96px from lg.
    expect(landing).toContain(
      '"text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] md:leading-none tracking-tight mb-8"',
    );
    // The grid flips: about md:2, services sm:2→lg:4, work sm:2→lg:3,
    // testimonials md:5, contact md:2, the form pair sm:2.
    expect(landing).toContain('"max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center"');
    expect(landing).toContain('"grid sm:grid-cols-2 lg:grid-cols-4 gap-6"');
    expect(landing).toContain('"grid sm:grid-cols-2 lg:grid-cols-3 gap-5"');
    expect(landing).toContain('"grid md:grid-cols-5 gap-12 items-start"');
    expect(landing).toContain('"max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16"');
    expect(landing).toContain('"grid sm:grid-cols-2 gap-5"');
    // The mobile panel's wrap — the md:hidden disclosure family.
    expect(content).toContain(
      '"md:hidden bg-zinc-950 border-t border-white/10 px-6 py-6 flex flex-col gap-4"',
    );
  });

  it("2. the LOGIN_LAYOUT sm:/md: family — the card's whole boundary contract", () => {
    // The auth card's sm:/md: faces (live-verified on both apps at
    // 640/768): the input's h-11→sm:h-12 (44→48px) and text-base→
    // md:text-sm (16→14px) ladders, the submit's height pair, the logo's
    // sm:h-24, the title's sm:text-3xl, the inner pad's three-stage
    // family, the form/fields stacks, the footer's sm:flex-row, and the
    // trailing sm:hidden spacer on the card component.
    expect(layout).toContain(
      '"h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-3 placeholder:text-slate-600 focus:border-slate-400 focus:outline-2 focus:outline-transparent focus:outline-offset-2 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-base md:text-sm sm:h-12"',
    );
    expect(layout).toContain(
      '"flex h-11 w-full items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-900 font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-transparent focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm sm:h-12"',
    );
    expect(layout).toContain(
      '"relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full shadow-lg ring-4 ring-white/50 transition-all duration-300 group-hover:shadow-xl sm:h-24 sm:w-24"',
    );
    // Round-27 (F-27a) re-pin: the logo img member — the reference's byte
    // class (aspect-square h-full w-full object-cover), self-hosted at
    // /icon.png with the real alt "EleganceFlow logo"; the CRM-era
    // bg-white/items-center/justify-center dot-era extras retired with
    // the blue dot.
    expect(layout).toContain('"aspect-square h-full w-full object-cover"');
    expect(layout).toContain('"text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"');
    expect(layout).toContain('"text-slate-500 text-sm sm:text-base font-medium"');
    expect(layout).toContain('"p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10"');
    expect(layout).toContain('"w-full space-y-4 sm:space-y-5"');
    expect(layout).toContain('"space-y-3 sm:space-y-4"');
    expect(layout).toContain(
      '"flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0"',
    );
    // The trailing mobile-only spacer (session-79's live extraction):
    // visible below sm, display:none from sm up — pinned on the CARD
    // component where it renders.
    expect(cardRaw).toContain('"mt-8 text-center text-xs text-slate-400 sm:hidden"');
  });

  it("3. the toast viewport's breakpoint string — top-of-screen at base, bottom-right from sm, max-w-420 from md", () => {
    // Session-7's live pin (byte-extracted from the reference's own
    // toast viewport): top-of-screen on phones and bottom-right from
    // sm (sonner-style), max-w-[420px] at md. Round-22 live-verified
    // the computed boundary faces (bottom:0px at 640; max-width:420px
    // at 768) — the class string is the reference's own, so the pin
    // holds the breakpoints it encodes.
    expect(toast).toContain(
      '"pointer-events-none fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"',
    );
    // the negative: no OTHER viewport breakpoint family on the toaster
    // (a lg:/xl: addition would move faces the reference never ships)
    const viewportClass = toast.match(
      /"pointer-events-none fixed top-0[^"]*"/,
    )?.[0] ?? "";
    expect(viewportClass.match(/lg:|xl:|2xl:/g)?.length ?? 0).toBe(0);
  });

  it("4. the root-font-size purity — NO declared font-size on html/:root (the v4 rem-breakpoint carrier)", () => {
    // v3's media queries were px-based; v4's are REM-based. At the UA
    // 16px root they agree (the round-22 census: html font-size 16px on
    // both apps, every boundary face IDENTICAL). A DECLARED root size
    // (e.g. html { font-size: 18px }) would shift every v4 breakpoint
    // (640→720, 768→864) on OUR build only — the reference's v3 build
    // stays px-anchored — while every gate stays green. The UA default
    // IS the contract; nothing may declare over it.
    const htmlBlocks = css.match(/html\s*\{[^}]*\}/g) ?? [];
    expect(htmlBlocks.length).toBe(1); // exactly the scroll-behavior rule
    expect(htmlBlocks[0]).not.toMatch(/font-size/i);
    expect(css).not.toMatch(/(?:html|:root)\s*\{[^}]*font-size/i);
    // and the body's font-size stays undeclared too (the S13-P12
    // record: the reference computes 16px via the browser default —
    // the retired scaffold-era 14px never returns)
    const bodyBlock = css.match(/body\s*\{[^}]*\}/g) ?? [];
    expect(bodyBlock.length).toBeGreaterThan(0);
    // (the census counting rule: no bare `test(` method calls — the
    // count-ladder census counts `\b(?:it|test)\(` in stripped sources)
    expect(bodyBlock.filter((b) => b.match(/font-size/i)).length).toBe(0);
  });
});
