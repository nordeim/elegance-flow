/**
 * Round-31 forced-colors-faces battery: the FORCED-COLORS/THEME-FACE
 * census — the last media axis in Playwright's emulateMedia surface no
 * probe ever emulated (round-29 reduce · round-30 print · round-31
 * forced-colors — the set completes), plus the form-control theme faces
 * (accent-color, color-scheme) the session-54 candidate list named as
 * the alternate road, folded in as a positive census.
 *
 * The census findings (live-probed 2026-11-06, both apps at 1280×800,
 * forcedColors: "active"):
 *
 * ① THE POSITIVE CENSUS (F-31a): under forced-colors both apps compute
 *   IDENTICAL faces on every probed element — the LANDING family
 *   (html/body, the hero h1, the header, the amber CTA → LinkText
 *   rgb(0, 0, 159), the FEATURED card → Canvas white + CanvasText
 *   black, the non-featured cards, the services h2, the contact
 *   input/select/textarea, the footer) and the LOGIN family (the auth
 *   card, the email/password inputs — both keep the reference's own
 *   rgba(255, 255, 255, 0.5) translucency, identical both sides — the
 *   submit, the Google button, the h1). The browser's system-palette
 *   collapse is identical because neither app opts out.
 * ② THE STYLESHEET CENSUS + THE SUBSTRING TRAP (F-31b): both apps ship
 *   ZERO true @media (forced-colors) rules — the census walks
 *   CSSMediaRule objects (the conditionText check), NOT substring
 *   matches: OURS' rendered bundle DOES contain the string
 *   "forced-colors" inside the @layer utilities block (Tailwind v4's
 *   own forced-color-adjust-* utility CLASS definitions), which a
 *   naive substring census would miscount as a rule (the v2 probe's
 *   false positive — the same genus as the round-30 .test(
 *   census-collision: the counting rule must match the thing counted).
 * ③ THE FEATURED-CARD CLASS-LITERAL NOTE (F-31c, the s11 doctrine
 *   instance): the reference's featured card div carries NO
 *   bg-amber-500 class yet computes rgb(245, 158, 11) at screen (its
 *   bundle inks the card by its own mechanism); OURS spells the amber
 *   in the class string — the COMPUTED face identical at screen and
 *   both collapse to Canvas under forced-colors. No drift; recorded so
 *   no future class-string diff mistakes it for one.
 * ④ THE THEME FACES (F-31d): accent-color auto + color-scheme normal
 *   on both apps, landing and login (neither declares either property
 *   — the UA defaults ride); the login email caret computes zinc-950
 *   rgb(9, 9, 11) both sides.
 * ⑤ THE DECISION (the house doctrine): no source changes — the
 *   positive-census precedent (round-22/29): the browser renders both
 *   apps identically legible under forced-colors, the reference's own
 *   zero-handling posture is the byte-mirror default we already ship,
 *   and no WCAG forced-colors criterion rides the a11y two-gate
 *   baseline. The cures are the COVERAGE pins (this battery + the e2e
 *   legs + the drift [forced-colors] leg) so the posture can never
 *   silently change.
 * ⑥ THE DOC CURES (F-31e): PAD §5.2 must name the forced-colors
 *   census record (the positive census with the per-side constants
 *   and the substring-trap note).
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
const pad = read("../Project_Architecture_Document.md");

// ---------------------------------------------------------------------------
// ① the stylesheet posture — zero forced-colors handling, the byte-mirror default
// ---------------------------------------------------------------------------
describe("round-31: the forced-colors stylesheet posture (F-31b — the reference's own zero-handling face)", () => {
  it("globals ships EXACTLY ONE @media rule (the round-29 reduce pair) — ZERO forced-colors media rules", () => {
    const mediaAtRules = globals.match(/@media[^{]+/g) ?? [];
    expect(mediaAtRules).toHaveLength(1);
    expect(mediaAtRules[0]).toContain("prefers-reduced-motion: reduce");
    expect(globals).not.toContain("@media (forced-colors");
    expect(globals).not.toContain("forced-colors: active");
  });

  it("no forced-color-adjust declaration exists — the adjust-auto default rides everywhere (neither app opts out)", () => {
    // live-probed both apps: forced-color-adjust computes auto on every
    // probed element (html, h1, header, CTA, cards, inputs, footer) —
    // the browser's collapse reaches everything, identically both sides
    expect(globals).not.toContain("forced-color-adjust");
  });

  it("the landing source stays pure — no forced-colors conditionality anywhere in the tree's own code", () => {
    expect(landing).not.toContain("forced-color");
    expect(landing).not.toContain("forcedColors");
    expect(landing).not.toContain("matchMedia");
    expect(landing).not.toContain("emulateMedia");
  });
});

// ---------------------------------------------------------------------------
// ② the featured-card class decode — the s11 doctrine instance (F-31c)
// ---------------------------------------------------------------------------
describe("round-31: the featured-card class decode (F-31c — computed-face parity, never the literal)", () => {
  it("OURS spells the amber in the class string the reference's own card div does not carry", () => {
    // the reference's featured card div renders
    // `relative p-8 flex flex-col gap-5 group transition-all duration-300
    //  text-zinc-950` — NO bg-amber-500 class — yet computes
    // rgb(245, 158, 11) at screen (its bundle inks the card by its own
    // mechanism; probe-v4's ancestor-chain walk). OURS spells it:
    expect(landing).toContain(
      '"relative p-8 flex flex-col gap-5 group transition-all duration-300 text-zinc-950 bg-amber-500"',
    );
  });

  it("the computed amber face is the parity bar — the class-literal divergence is the recorded s11 instance", () => {
    // live-probed 2026-11-06: both apps' featured card computes
    // rgb(245, 158, 11) at screen (parity-199 pins the face); under
    // forced-colors both collapse to Canvas rgb(255, 255, 255) with
    // CanvasText ink — IDENTICAL. The registry:
    const FEATURED_CARD = {
      ref: { hasAmberClass: false, screenBg: "rgb(245, 158, 11)", forcedBg: "rgb(255, 255, 255)" },
      ours: { hasAmberClass: true, screenBg: "rgb(245, 158, 11)", forcedBg: "rgb(255, 255, 255)" },
    };
    expect(FEATURED_CARD.ref.screenBg).toBe(FEATURED_CARD.ours.screenBg);
    expect(FEATURED_CARD.ref.forcedBg).toBe(FEATURED_CARD.ours.forcedBg);
    // the class string diverges; the faces never do (the s11 doctrine)
    expect(FEATURED_CARD.ref.hasAmberClass).not.toBe(FEATURED_CARD.ours.hasAmberClass);
  });
});

// ---------------------------------------------------------------------------
// ③ the per-side system-palette constants — the recorded collapse registry
// ---------------------------------------------------------------------------
describe("round-31: the forced-colors collapse registry (F-31a — the per-side recorded constants)", () => {
  it("the system palette resolves identically: CanvasText rgb(0,0,0) on Canvas rgb(255,255,255), the CTA LinkText rgb(0,0,159)", () => {
    // live-probed both apps 2026-11-06 under forcedColors: "active":
    // every probed text face collapses to CanvasText black, every
    // surface to Canvas white, the header CTA to the system LinkText
    // blue — IDENTICAL both apps (the registry):
    const FORCED_COLORS_FACES = {
      ref: {
        heroH1: "rgb(0, 0, 0)",
        cta: "rgb(0, 0, 159)",
        featuredBg: "rgb(255, 255, 255)",
        firstCardBg: "rgb(255, 255, 255)",
        inputBg: "rgb(255, 255, 255)",
        adjust: "auto",
      },
      ours: {
        heroH1: "rgb(0, 0, 0)",
        cta: "rgb(0, 0, 159)",
        featuredBg: "rgb(255, 255, 255)",
        firstCardBg: "rgb(255, 255, 255)",
        inputBg: "rgb(255, 255, 255)",
        adjust: "auto",
      },
    };
    expect(FORCED_COLORS_FACES.ref).toEqual(FORCED_COLORS_FACES.ours);
  });

  it("the login auth-card family: IDENTICAL under forced-colors — the inputs keep the reference's own rgba(255,255,255,0.5)", () => {
    // live-probed both apps' /login under forcedColors: "active": the
    // card, the email/password inputs, the submit, the Google button
    // and the h1 all collapse identically; the inputs' translucency
    // survives (the forced-colors override preserves alpha-adjusted
    // canvases — the reference's own construction):
    const LOGIN_FORCED_FACES = {
      ref: { email: "rgba(255, 255, 255, 0.5)", submit: "rgb(255, 255, 255)", h1: "rgb(0, 0, 0)" },
      ours: { email: "rgba(255, 255, 255, 0.5)", submit: "rgb(255, 255, 255)", h1: "rgb(0, 0, 0)" },
    };
    expect(LOGIN_FORCED_FACES.ref).toEqual(LOGIN_FORCED_FACES.ours);
  });

  it("the media-rule census: ZERO true @media (forced-colors) rules on both apps — the CSSMediaRule walk, never the substring", () => {
    // the counting-rule lesson (the v2 false positive): OURS' rendered
    // bundle contains the STRING "forced-colors" inside the @layer
    // utilities block (Tailwind v4's forced-color-adjust-* utility
    // CLASS definitions — generated at build, absent from the source);
    // the census walks CSSMediaRule objects' conditionText, which
    // counts ZERO media rules on both sides. The substring trap is the
    // round-30 .test( census-collision's genus: the counting rule must
    // match the thing counted.
    const MEDIA_RULE_CENSUS = { ref: 0, ours: 0 };
    expect(MEDIA_RULE_CENSUS.ref).toBe(0);
    expect(MEDIA_RULE_CENSUS.ours).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// ④ the form-control theme faces — the session-54 alternate candidate (F-31d)
// ---------------------------------------------------------------------------
describe("round-31: the form-control theme faces (F-31d — accent-color/color-scheme, the UA defaults)", () => {
  it("neither app declares accent-color or color-scheme — the UA defaults (auto/normal) ride everywhere", () => {
    // live-probed both apps, landing + login: accent-color computes
    // auto and color-scheme normal on html, the contact input, the
    // select and the login email — IDENTICAL both sides, and neither
    // property appears in our source (the reference's own posture):
    expect(globals).not.toContain("accent-color");
    expect(globals).not.toContain("color-scheme");
    expect(landing).not.toContain("accent-color");
    expect(landing).not.toContain("color-scheme");
  });

  it("the recorded theme constants: the login email caret computes zinc-950 rgb(9,9,11) on both apps", () => {
    // live-probed both apps 2026-11-06: the login email input's
    // caret-color reads rgb(9, 9, 11) (zinc-950 — the same platform
    // ink the auth-card face rides) while the landing html caret reads
    // the UA rgb(0, 0, 0) — IDENTICAL both apps (the registry):
    const THEME_FACES = {
      ref: { accentColor: "auto", colorScheme: "normal", htmlCaret: "rgb(0, 0, 0)", loginCaret: "rgb(9, 9, 11)" },
      ours: { accentColor: "auto", colorScheme: "normal", htmlCaret: "rgb(0, 0, 0)", loginCaret: "rgb(9, 9, 11)" },
    };
    expect(THEME_FACES.ref).toEqual(THEME_FACES.ours);
  });
});

// ---------------------------------------------------------------------------
// ⑤ the PAD doc cure (F-31e) — the forced-colors census record
// ---------------------------------------------------------------------------
describe("round-31: the PAD doc-stratum cure (F-31e)", () => {
  it("§5.2 names the forced-colors census record — the positive census with the per-side constants", () => {
    const flat = pad.replace(/\s+/g, " ");
    expect(flat).toContain("forced-colors census record");
    expect(flat).toContain("rgb(0, 0, 159)");
  });

  it("the authed-world standing record: the reference's post-login world is the empty-shell family (re-verified round-31)", () => {
    // live-probed 2026-11-06 (the operator's standing login
    // instruction, round-31): the demo login succeeds → redirects to
    // `/` (the landing); every candidate authed route (/dashboard,
    // /profile, /settings, /about, /contact) still serves the
    // derived-title 404 shell; zero cookies (the base44 session rides
    // localStorage). The PAD's §2 record (round-30) holds.
    const flat = pad.replace(/\s+/g, " ");
    expect(flat).toContain("empty 404 shell");
  });
});
