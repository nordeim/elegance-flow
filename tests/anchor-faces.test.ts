import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

/**
 * The round-23 ANCHOR-NAVIGATION/DEEP-LINK census — the hash-link ride
 * family no probe ever rode (every probe since session-199 read at-rest
 * faces; the rides that were never censused: the DESKTOP nav's five
 * section links, the header CTA, the hero CTA pair, the logo's `#`, and
 * the COLD-BOOT deep link — the mobile panel rides ARE pinned; the
 * desktop family never).
 *
 * **R-23a (RECORD — the positive census, clean, first time probed,
 * live on both apps 2026-11-05)**: the whole desktop anchor family
 * behaves IDENTICALLY on both apps — the href family (nav + header CTA
 * + hero pair + logo `#`), the five section ids, the five desktop nav
 * rides (hash + settled scrollTop + the target's landing: About 800 ·
 * Services 1818 · Work 2624 · Testimonials 3875 · Contact 4711 at
 * 1280×800), the logo ride (hash "" + back to top), and the
 * scroll-landing carriers (scroll-behavior smooth both, root
 * scroll-padding auto both, section scroll-margin 0px both).
 *
 * **R-23b (the RECORD, no cure — the reference's own defect)**: the
 * reference's DEEP LINKS ARE BROKEN — cold-booting /#portfolio or
 * /#about NEVER scrolls there (the raw HTML is a SPA shell with no
 * section ids; the browser's one-time boot-time hash scroll finds
 * nothing; the SPA's mount never re-attempts it — scrollTop 0 at
 * 0.5s/1.5s/3s/5s). OURS lands the native SSR scroll (2624/800, the
 * section at the viewport top) — the working superset, the round-18
 * soft-404 precedent: documented, never broken to match.
 *
 * **F-23a (the coverage catch — the class this battery closes)**: none
 * of the ride family carried a pin. The drift classes that would ship
 * with every gate green: an edited section id (the anchor target dies
 * — the link still sets the hash but nothing scrolls); an edited
 * hero-CTA/logo href; a planted scroll-margin/scroll-padding family
 * (shifts every anchor landing invisibly — the round-22
 * root-font-size-purity class); a dynamic-import boundary on the
 * landing route (defers the section HTML past the boot-time hash
 * scroll — silently breaking every deep link the way the reference's
 * SPA does).
 *
 * Contract (comment-stripped reads — a literal pinned by a comment
 * alone is vacuous, the s64/s65/s66 lesson):
 * ① THE SECTION-ID FAMILY — the five id attributes on the five
 *   sections (the anchor TARGETS; the link side — NAV_ITEMS incl. the
 *   non-obvious Work→#portfolio mapping — is pinned since
 *   session-199 in site-content.test.ts).
 * ② THE ANCHOR HREF WIRING — the hero CTA pair's #contact/#portfolio
 *   + the logo's # literals.
 * ③ THE SCROLL-LANDING PURITY — no scroll-margin/scroll-padding family
 *   in the landing source or globals.css (the landing-position
 *   carrier; the reference ships none).
 * ④ THE SSR-BOOT KEEP — the landing route renders LandingPage with NO
 *   dynamic-import boundary (the boot-time hash scroll needs the
 *   section ids in the initial HTML).
 */
const ROOT = path.resolve(import.meta.dirname, "..");

const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf8");

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const landing = stripComments(read("src/components/landing/landing-page.tsx"));
const route = stripComments(read("src/app/page.tsx"));
const css = stripComments(read("src/app/globals.css"));

describe("the round-23 anchor-faces census (F-23a + the keeps)", () => {
  it("1. the section-id family — the five anchor targets (the rides' landing ids)", () => {
    // The five section ids are the anchor TARGETS of the whole nav
    // family. An edited id (the F-23a drift class) kills its landing
    // while every at-rest probe stays green — the href still fires, the
    // hash still lands in the URL, nothing scrolls.
    expect(landing).toMatch(/<section id="about" className="bg-white py-28 md:py-36 overflow-hidden">/);
    expect(landing).toMatch(/<section id="services" className="bg-zinc-950 py-28 md:py-36">/);
    expect(landing).toMatch(/<section id="portfolio" className="bg-white py-28 md:py-36">/);
    expect(landing).toMatch(/<section id="testimonials" className="bg-zinc-950 py-28 md:py-36">/);
    expect(landing).toMatch(/<section id="contact" className="bg-white py-28 md:py-36">/);
    // Exactly five section anchors — no sixth target ever joins the
    // family silently (a sixth id would change the anchor universe the
    // ride census recorded).
    expect(landing.match(/<section id="/g)?.length ?? 0).toBe(5);
  });

  it("2. the anchor href wiring — the hero CTA pair + the logo's # (the link side of the rides)", () => {
    // The hero CTA pair: Start a Project → #contact (the amber CTA),
    // See Our Work → #portfolio (the bordered CTA). The logo's bare #
    // (the reference's own href — the wordmark return-to-top ride).
    // The NAV_ITEMS/HEADER_CTA href family is pinned in
    // site-content.test.ts (the one source); these three literals are
    // the landing-page JSX wiring.
    expect(landing).toMatch(/href="#contact"\s+className=\{`group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:gap-5/);
    expect(landing).toMatch(/href="#portfolio"\s+className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase border border-white\/20 text-white hover:border-white\/50 transition-all duration-300"/);
    expect(landing).toMatch(/<a href="#" className="text-white font-black text-lg tracking-widest">/);
  });

  it("3. the scroll-landing purity — NO scroll-margin/scroll-padding family anywhere (the landing-position carrier)", () => {
    // The reference ships no scroll-margin/scroll-padding (root
    // scroll-padding-top: auto, section scroll-margin-top: 0px —
    // live-read on both apps). A planted family (scroll-mt-*, the
    // F-23a drift class) shifts every anchor landing while every
    // gate stays green — the round-22 root-font-size-purity class.
    // Use .match (never a bare /…/.test( — the count-ladder census
    // counts it as a test block, the round-22 harness lesson).
    expect(landing.match(/\bscroll-(m|p|mt|mb|ml|mr|mx|my|pt|pb|pl|pr|px|py|t|b|l|r|x|y)-[\w[\]./-]*\b/g)).toBeNull();
    expect(css.match(/\bscroll-(m|p|mt|mb|ml|mr|mx|my|pt|pb|pl|pr|px|py|t|b|l|r|x|y)-[\w[\]./-]*\b/g)).toBeNull();
    expect(css.match(/scroll-margin|scroll-padding/g)).toBeNull();
  });

  it("4. the SSR-boot keep — the landing route renders LandingPage with NO dynamic-import boundary (the deep-link carrier)", () => {
    // The R-23b superset's own guard: the boot-time hash scroll needs
    // the section ids in the INITIAL HTML. The landing is a client
    // component SSR'd by the route's direct import — a next/dynamic
    // boundary would defer the section HTML past the browser's
    // one-time hash scroll and silently break every deep link (the
    // reference SPA's own defect, R-23b).
    expect(route).toMatch(/import \{ LandingPage \} from "@\/components\/landing\/landing-page";/);
    expect(route).toMatch(/return <LandingPage \/>;/);
    expect(route.match(/next\/dynamic|dynamic\(/g)).toBeNull();
    expect(landing.match(/next\/dynamic|dynamic\(/g)).toBeNull();
  });
});
