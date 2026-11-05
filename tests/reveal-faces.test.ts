/**
 * Round-28 reveal-faces battery: the SCROLL-REVEAL/EXTREME-VIEWPORT
 * census — the reference's twenty-element motion family no probe ever
 * rode (the session-48 log's own candidate list named the extreme
 * viewport first; the census opened there and the systematic +40px
 * geometry divergence decoded into the family below).
 *
 * The coverage gap this battery closes (live-probed settled 2026-11-05,
 * seventeen probes on both apps):
 *
 * ① THE REVEAL_FAMILY SEAM (F-28a, HIGH, VISIBLE): the reference ships
 *   a scroll-reveal/mount-cascade family ours rendered statically — the
 *   most user-visible divergence found in twenty-eight rounds (the
 *   reference's signature motion identity). Twenty elements: the hero
 *   cascade (wrapper translateY(40px) / eyebrow translateX(-20px) /
 *   h1 spans ×2 translateY(30px) / CTAs wrap translateY(20px),
 *   staggered 0/100/200/600ms, ~800ms ease-out each), the about grid
 *   kids ×2 translateX(∓40px), the services cards ×4 translateY(30px)
 *   on the cards' OWN transition-all class with a 100ms stagger, the
 *   portfolio cards ×6 scale(0.96), the testimonials quote block
 *   translateY(20px), the contact grid kids ×2 translateX(∓30px).
 * ② THE TWO END STATES (the parity contract): the reference's initial
 *   inline styles and its post-reveal faces — the reveal ends at
 *   EXACTLY our prior static state (opacity 1 / transform none), the
 *   reason every at-load probe passed for twenty-seven rounds while
 *   the motion was absent.
 * ③ THE SERVICES DECODE: the cards ride their OWN `transition-all
 *   duration-300` class (the reference's computed `all 0.3s
 *   cubic-bezier(0.4, 0, 0.2, 1)` — the inline style carries ONLY the
 *   stagger delay, never an inline transition) and the settle cleanup
 *   strips every element's inline style after the animation (the
 *   settled DOM equals the pre-round DOM; the cards' hover transitions
 *   return unlagged).
 * ④ THE NO-WIRING NEGATIVES: the SCROLL label, the hero paragraph
 *   (rides the wrapper), the section headers, the stats grid, the
 *   filter chips, the testimonial selectors, the footer, the form
 *   fields — NONE wired (the reference wires exactly twenty).
 * ⑤ THE SSR NO-FOUC CONTRACT: the server render ships the initial
 *   hidden styles (the reference's SPA mounts hidden; our SSR renders
 *   hidden — no flash of visible content before hydration).
 * ⑥ THE OBSERVER SEMANTICS: one IntersectionObserver per element,
 *   threshold 0, ONE-SHOT disconnect (the dominant live behavior; the
 *   reference's own re-hide race — F-28d — recorded in the plan doc,
 *   never mirrored).
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

const landingSrc = read("../src/components/landing/landing-page.tsx");
const landing = strip(landingSrc);

// ---------------------------------------------------------------------------
// ① the seam — the twenty-element participant map, every value live-probed
// ---------------------------------------------------------------------------
describe("round-28: the REVEAL_FAMILY seam (F-28a — the reference's motion family, live-probed 2026-11-05)", () => {
  it("exports the hero cascade: five elements, the live-sampled offsets and delays", async () => {
    const mod = await import("../src/lib/reveal");
    const hero = mod.REVEAL_HERO;
    expect(hero).toHaveLength(5);
    expect(hero.map((s) => s.transform)).toEqual([
      "translateY(40px)", // the .max-w-3xl wrapper
      "translateX(-20px)", // the amber eyebrow
      "translateY(30px)", // h1 span 1
      "translateY(30px)", // h1 span 2
      "translateY(20px)", // the CTAs wrap
    ]);
    expect(hero.map((s) => s.delayMs)).toEqual([0, 100, 200, 200, 600]);
  });

  it("exports the section families: about ±40X, services +30Y/100ms stagger/own-class, portfolio scale(0.96)/MOUNT-reveal, testimonials +20Y/MOUNT-reveal, contact ∓30X", async () => {
    const mod = await import("../src/lib/reveal");
    expect(mod.REVEAL_ABOUT.map((s) => s.transform)).toEqual(["translateX(-40px)", "translateX(40px)"]);
    expect(mod.REVEAL_ABOUT.every((s) => s.delayMs === 0 && !s.rideOwnTransition && !s.atMount)).toBe(true);
    // the services stagger: index-based 100ms steps on the cards' OWN class
    const svc = mod.servicesSpecs(4);
    expect(svc.map((s) => s.transform)).toEqual(["translateY(30px)", "translateY(30px)", "translateY(30px)", "translateY(30px)"]);
    expect(svc.map((s) => s.delayMs)).toEqual([0, 100, 200, 300]);
    expect(svc.every((s) => s.rideOwnTransition && s.durationMs === 300 && !s.atMount)).toBe(true);
    // the portfolio: scale(0.96) at mount, the MOUNT-TIME auto-reveal — all
    // six cards in lockstep (NO stagger), the ~400ms duration
    const work = mod.portfolioSpecs(6);
    expect(work.map((s) => s.transform)).toEqual(Array.from({ length: 6 }, () => "scale(0.96)"));
    expect(work.map((s) => s.delayMs)).toEqual([0, 0, 0, 0, 0, 0]);
    expect(work.every((s) => s.atMount && s.durationMs === mod.MOUNT_DURATION_MS)).toBe(true);
    expect(mod.MOUNT_DURATION_MS).toBe(400);
    // the testimonials quote block: the mount-time auto-reveal
    expect(mod.REVEAL_TESTIMONIALS.map((s) => s.transform)).toEqual(["translateY(20px)"]);
    expect(mod.REVEAL_TESTIMONIALS.every((s) => s.atMount && s.durationMs === 400 && s.delayMs === 0)).toBe(true);
    expect(mod.REVEAL_CONTACT.map((s) => s.transform)).toEqual(["translateX(-30px)", "translateX(30px)"]);
    expect(mod.REVEAL_CONTACT.every((s) => s.delayMs === 0 && !s.atMount)).toBe(true);
  });

  it("pins the ~800ms ease-out decode and the settle-window helper", async () => {
    const mod = await import("../src/lib/reveal");
    expect(mod.REVEAL_DURATION_MS).toBe(800);
    expect(mod.REVEAL_EASE).toBe("cubic-bezier(0.22, 0.61, 0.36, 1)");
    // the settle window: delay + duration + the 80ms tail (the cleanup fires AFTER the animation)
    expect(mod.settleMs({ transform: "translateY(30px)", delayMs: 300, durationMs: 300, easing: mod.REVEAL_EASE, rideOwnTransition: true, atMount: false })).toBe(680);
    expect(mod.settleMs({ transform: "translateY(40px)", delayMs: 600, durationMs: 800, easing: mod.REVEAL_EASE, rideOwnTransition: false, atMount: false })).toBe(1480);
  });
});

// ---------------------------------------------------------------------------
// ② the two end states — the parity contract (the reference's own inline
//    faces, byte-equivalent modulo the transition decode)
// ---------------------------------------------------------------------------
describe("round-28: the revealStyle resolver — the two inline states (F-28b)", () => {
  it("hidden: opacity 0 + the live-probed offset + the inline transition decode", async () => {
    const mod = await import("../src/lib/reveal");
    const spec = mod.REVEAL_ABOUT[0];
    const hidden = mod.revealStyle(spec, false);
    expect(hidden.opacity).toBe("0");
    expect(hidden.transform).toBe("translateX(-40px)");
    expect(hidden.transitionProperty).toBe("opacity, transform");
    expect(hidden.transitionDuration).toBe("800ms");
    expect(hidden.transitionTimingFunction).toBe(mod.REVEAL_EASE);
    expect(hidden.transitionDelay).toBe("0ms");
  });

  it("revealed: opacity 1 + transform none (the reference's end state = our prior static face)", async () => {
    const mod = await import("../src/lib/reveal");
    const shown = mod.revealStyle(mod.REVEAL_CONTACT[1], true);
    expect(shown.opacity).toBe("1");
    expect(shown.transform).toBe("none");
  });

  it("the services decode: NO inline transition (the cards' own class carries it) — only the stagger delay", async () => {
    const mod = await import("../src/lib/reveal");
    const svc = mod.servicesSpecs(4)[3];
    const hidden = mod.revealStyle(svc, false);
    expect(hidden.transitionDelay).toBe("300ms");
    expect(hidden.transitionProperty).toBeUndefined();
    expect(hidden.transitionDuration).toBeUndefined();
    expect(hidden.transitionTimingFunction).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// ③ the landing wiring — all twenty elements ride the seam (source contract)
// ---------------------------------------------------------------------------
describe("round-28: the landing wiring — the twenty wired elements (source contract)", () => {
  it("the hero cascade: the wrapper, the eyebrow, BOTH spans, the CTAs wrap", () => {
    // the .max-w-3xl wrapper div carries the group's first spec
    expect(landing).toMatch(/<div className="max-w-3xl"\s+ref=\{[^}]*hero\.ref\(0\)\}\s+style=\{[^}]*hero\.style\(0\)\}/);
    // the eyebrow (the amber p inside the wrapper)
    expect(landing).toMatch(/tracking-\[0\.3em\] uppercase mb-6 text-amber-500"\s+ref=\{[^}]*hero\.ref\(1\)\}\s+style=\{[^}]*hero\.style\(1\)\}/);
    // both h1 spans
    expect(landing).toMatch(/<span className="block" ref=\{[^}]*hero\.ref\(2\)\} style=\{[^}]*hero\.style\(2\)\}>\s*\{HERO\.headingLines\[0\]\}\s*<\/span>/);
    expect(landing).toMatch(/<span className="block" ref=\{[^}]*hero\.ref\(3\)\} style=\{[^}]*hero\.style\(3\)\}>\s*\{HERO\.headingLines\[1\]\}\s*<\/span>/);
    // the CTAs wrap
    expect(landing).toMatch(/<div\s+className="flex flex-col sm:flex-row gap-4"\s+ref=\{[^}]*hero\.ref\(4\)\}\s+style=\{[^}]*hero\.style\(4\)\}/);
  });

  it("the about grid kids (the image column + the text column)", () => {
    expect(landing).toMatch(/<div className="relative"\s+ref=\{[^}]*about\.ref\(0\)\}\s+style=\{[^}]*about\.style\(0\)\}/);
    // the text column: the bare <div> after the image column (grid > div:nth-child(2))
    expect(landing).toMatch(/<div ref=\{[^}]*about\.ref\(1\)\} style=\{[^}]*about\.style\(1\)\}>\s*<p className="text-xs font-bold tracking-\[0\.3em\] uppercase mb-5 text-amber-500">/);
  });

  it("the services cards (the staggered index) and the portfolio cards", () => {
    expect(landing).toMatch(/ref=\{[^}]*services\.ref\(\w+\)\}\s+style=\{[^}]*services\.style\(\w+\)\}/);
    expect(landing).toMatch(/ref=\{[^}]*portfolio\.ref\(\w+\)\}\s+style=\{[^}]*portfolio\.style\(\w+\)\}/);
  });

  it("the testimonials quote block and the contact grid kids", () => {
    // the quote block: the bare div inside .md:col-span-3 (the reference's wired node)
    expect(landing).toMatch(/<div className="md:col-span-3">\s*<div ref=\{[^}]*testimonials\.ref\(0\)\} style=\{[^}]*testimonials\.style\(0\)\}>/);
    // the contact left column (the whole text/link family reveals as one)
    expect(landing).toMatch(/<div ref=\{[^}]*contact\.ref\(0\)\} style=\{[^}]*contact\.style\(0\)\}>\s*<p className="text-xs font-bold tracking-\[0\.3em\] uppercase mb-5 text-amber-500">\s*\{CONTACT\.eyebrow\}/);
    // the contact right column (the form's bare wrapper div)
    expect(landing).toMatch(/<div ref=\{[^}]*contact\.ref\(1\)\} style=\{[^}]*contact\.style\(1\)\}>\s*\{submitted \?/);
  });

  it("the observer semantics: threshold 0, one-shot disconnect (the dominant live behavior)", () => {
    const hookBlock = /function useRevealGroup\([\s\S]*?\n\}/.exec(landingSrc)?.[0] ?? "";
    expect(hookBlock).toContain("new IntersectionObserver");
    expect(hookBlock).toContain("threshold: 0");
    expect(hookBlock).toContain("io.disconnect()");
  });

  it("the settle cleanup: the stagger delay clears after the window (the settled face = the reference's post-reveal)", () => {
    const hookBlock = /function useRevealGroup\([\s\S]*?\n\}/.exec(landingSrc)?.[0] ?? "";
    expect(hookBlock).toContain("settleMs");
    expect(hookBlock).toContain("SETTLED");
    // the settled state renders the reference's own post-reveal face —
    // opacity 1 / transform none — with the stagger delay CLEARED (the
    // services cards' hover transitions return unlagged)
    expect(hookBlock).toMatch(/if \(stage === SETTLED\) return \{ opacity: "1", transform: "none" \};/);
  });
});

// ---------------------------------------------------------------------------
// ④ the no-wiring negatives — the reference wires EXACTLY twenty elements
// ---------------------------------------------------------------------------
describe("round-28: the no-wiring negatives (F-28c — the participant map's complement)", () => {
  const noReveal = (blockName: string, block: string) => {
    expect(block, `the ${blockName} must carry no reveal wiring`).not.toMatch(/reveal|REVEAL_|style=\{/);
  };

  it("the SCROLL indicator, the hero paragraph, the section headers, the stats grid, the chips, the selectors, the footer — none wired", () => {
    // the SCROLL indicator block
    const scrollBlock = /<div className="absolute bottom-10 left-6[\s\S]*?\n\s*<\/div>/.exec(landing)?.[0] ?? "";
    noReveal("SCROLL indicator", scrollBlock);
    // the hero paragraph (rides the wrapper — its own node carries no wiring)
    const heroP = /<p className="text-white\/60[\s\S]*?<\/p>/.exec(landing)?.[0] ?? "";
    noReveal("hero paragraph", heroP);
    // the services/work/testimonials headers (the mb-16 intro blocks)
    const svcHeader = /<div className="mb-16">[\s\S]*?<h2[\s\S]*?<\/h2>\s*<\/div>/.exec(landing)?.[0] ?? "";
    noReveal("section header", svcHeader);
    // the stats grid (inside the about text column — rides the column, no own wiring)
    const stats = /<div className="grid grid-cols-3 gap-6[\s\S]*?\n\s*<\/div>/.exec(landing)?.[0] ?? "";
    noReveal("stats grid", stats);
    // the filter chips container
    const chips = /<div className="flex flex-wrap gap-2">[\s\S]*?<\/div>/.exec(landing)?.[0] ?? "";
    noReveal("filter chips", chips);
    // the testimonial selectors column
    const selectors = /<div className="md:col-span-2 flex flex-col gap-4">[\s\S]*?\n\s*<\/div>/.exec(landing)?.[0] ?? "";
    noReveal("testimonial selectors", selectors);
    // the footer
    const footer = /<footer[\s\S]*?<\/footer>/.exec(landing)?.[0] ?? "";
    noReveal("footer", footer);
  });
});

// ---------------------------------------------------------------------------
// ⑤ the SSR no-FOUC contract — the server render ships the hidden initials
// ---------------------------------------------------------------------------
describe("round-28: the SSR no-FOUC contract (F-28a's load face)", () => {
  it("the group hook's initial stage is hidden (the first client render matches the SSR render — no hydration mismatch)", async () => {
    const landingRaw = read("../src/components/landing/landing-page.tsx");
    const hookBlock = /function useRevealGroup\([\s\S]*?\n\}/.exec(landingRaw)?.[0] ?? "";
    expect(hookBlock).toMatch(/useState[\s\S]*?HIDDEN/);
    // the stages are module-level constants, not per-render literals
    expect(landingRaw).toContain('const HIDDEN = "hidden"');
    expect(landingRaw).toContain('const REVEALING = "revealing"');
    expect(landingRaw).toContain('const SETTLED = "settled"');
  });
});
