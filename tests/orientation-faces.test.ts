/**
 * Round-35 orientation-faces battery: the ORIENTATION-FAMILY census —
 * the landscape phone (844×390, the md boundary crossed from below) +
 * the ROTATION ride (the mobile menu open while the boundary crosses).
 *
 * The finding (live-verified 2026-11-07, both apps):
 *
 * ① THE ROTATION RIDE (F-35a — the operator's standing emphasis at the
 *   orientation crossing, a POSITIVE census): opening the mobile menu
 *   at portrait 390×844 and ROTATING to 844×390 flips the header to
 *   its desktop face — the toggle and the inline panel ride `md:hidden`
 *   (display none) while the open-menu STATE survives hidden — and
 *   rotating back REOPENS the panel automatically. The reference
 *   behaves IDENTICALLY on every leg (its toggle label also reads
 *   "Close menu" after the round-trip, its panel also reopens); the
 *   sole delta is OUR aria-expanded (the documented a11y superset).
 *   No probe ever crossed the md boundary WITH THE MENU OPEN: the
 *   round-22 boundary legs censured the closed-state flip (640/768),
 *   the round-50 extreme ladder censured landscape GEOMETRY (the
 *   content column) never the menu behavior, and the mobile battery
 *   rode portrait only.
 * ② THE MECHANISM (the source posture this battery pins): the rotation
 *   ride is pure WIDTH-DRIVEN class flips — the toggle button carries
 *   `md:hidden`, the panel wrap carries `md:hidden`, the desktop nav
 *   family carries `hidden md:flex`/`hidden md:inline-flex`. Remove
 *   either md:hidden and the ride breaks (a visible hamburger over the
 *   desktop nav, or a panel that never hides). NEITHER app ships an
 *   orientation directive (no lock, no landscape meta) — the landscape
 *   face IS the width-driven md flip.
 * ③ THE LANDSCAPE FAMILY (F-35b/c/d/e — four more POSITIVE censuses):
 *   under print emulation at 844×390 both apps compute identical faces
 *   (h1 white, body bg white, html ink black, ZERO @media print rules —
 *   the session-56 candidate 2 closed); the login card computes
 *   identical geometry (the max-w-md card at [198,16,448,746], x=198
 *   the exact (844−448)/2 centering); the landing's axe register at
 *   landscape flags the SAME 16 sanctioned contrast nodes on both apps
 *   (+ the reference's own select-name gap; OURS binds id/htmlFor);
 *   the superset's /dashboard renders sanely with ZERO axe violations.
 * ④ THE E2E HALF: the rotation ride leg in mobile-navigation.spec.ts
 *   (the battery's first orientation-crossing leg) + the landscape
 *   print leg in landing.spec.ts + the landscape login leg in
 *   auth.spec.ts — each pinned here by source contract.
 * ⑤ THE DOC CURE: AGENTS.md's orientation note names the rotation ride
 *   and the width-driven mechanism (a fresh agent must know the
 *   crossing is censused before touching the header's md classes).
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

const landingPage = strip(read("../src/components/landing/landing-page.tsx"));
const siteContent = strip(read("../src/lib/site-content.ts"));
const layout = strip(read("../src/app/layout.tsx"));
const agents = read("../AGENTS.md");

// ---------------------------------------------------------------------------
// ① + ② the rotation mechanism — the md:hidden pair + the width-driven posture
// ---------------------------------------------------------------------------
describe("round-35: the orientation mechanism (the rotation ride's source contract)", () => {
  it("the mobile toggle button carries md:hidden — the class that hides the hamburger at landscape", () => {
    // the rotation ride's own leg: at 844 the toggle must retire;
    // remove the class and a visible hamburger renders over the
    // desktop nav (the ride REDs in mobile-navigation.spec.ts)
    expect(landingPage, "the toggle's class string").toMatch(
      /className="md:hidden[^"]*"\s*aria-label=\{menuOpen/,
    );
  });

  it("the mobile panel wrap carries md:hidden — the class that folds the open panel at landscape", () => {
    // the panel wrap lives in site-content's MOBILE_PANEL (the one
    // source) — the state survives the crossing but the panel must
    // hide; remove the class and the open panel renders under the
    // desktop nav
    expect(siteContent, "MOBILE_PANEL.wrap's class string").toMatch(
      /wrap:\s*"md:hidden[^"]*"/,
    );
  });

  it("neither the layout nor its viewport export ships an orientation directive — the landscape face is purely width-driven", () => {
    // the reference ships no orientation lock/directive (its landscape
    // face is the same width-driven md flip); an orientation property
    // planted here would diverge from the byte-mirror posture
    expect(layout).not.toMatch(/orientation/i);
  });
});

// ---------------------------------------------------------------------------
// ④ the e2e half — the three round-35 legs' source contracts
// ---------------------------------------------------------------------------
describe("round-35: the orientation e2e legs (the source contracts)", () => {
  it("mobile-navigation.spec.ts rides the rotation leg (setViewportSize across 844 with the menu open)", () => {
    const src = strip(read("../tests/e2e/mobile-navigation.spec.ts"));
    expect(src, "the leg's describe name").toContain("rotation");
    // the crossing itself: the viewport must be re-sized mid-test
    expect(src).toMatch(/setViewportSize\(\{\s*width:\s*844,\s*height:\s*390\s*\}\)/);
    // and the ride must prove the state SURVIVES the round-trip
    expect(src).toMatch(/Close menu/);
  });

  it("landing.spec.ts rides the landscape print leg (emulateMedia print at the landscape viewport)", () => {
    const src = strip(read("../tests/e2e/landing.spec.ts"));
    expect(src, "the leg's name").toContain("landscape print");
    // the print emulation + the orientation axis in one leg
    expect(src).toMatch(/emulateMedia\(\{\s*media:\s*"print"/);
    // the zero-print-rules census rides the CSSMediaRule walk (the
    // round-30 lesson — never the substring)
    expect(src).toMatch(/CSSMediaRule/);
  });

  it("auth.spec.ts rides the landscape login leg (the card at 844×390)", () => {
    const src = strip(read("../tests/e2e/auth.spec.ts"));
    expect(src, "the leg's name").toContain("landscape");
    expect(src).toMatch(/844/);
  });
});

// ---------------------------------------------------------------------------
// ⑤ the doc cure — AGENTS.md names the orientation contract
// ---------------------------------------------------------------------------
describe("round-35: the AGENTS.md doc cure (the fresh-agent pointer)", () => {
  it("AGENTS.md's orientation note names the rotation ride and the width-driven mechanism", () => {
    // the note's exact title (a re-title or a deletion REDs) + the
    // rotation-ride phrase (the mechanism's own name)
    expect(agents).toContain("The orientation posture (round-35)");
    expect(agents).toContain("rotation ride");
    expect(agents).toContain("WIDTH-DRIVEN");
  });
});
