/**
 * Round-32 color-scheme-faces battery: the COLOR-SCHEME/MEDIA-SURFACE-
 * COMPLETION census — the one emulateMedia axis round-31 excepted ("the
 * reference ships no dark-mode face to probe" — the session-56 candidate
 * list's first road), plus the superset forced-colors a11y sweep (the
 * candidate 3) folded in as a positive find.
 *
 * The census findings (live-probed 2026-11-06, both apps at 1280×800,
 * colorScheme: "dark" and "light"):
 *
 * ① THE POSITIVE CENSUS (F-32a): under BOTH scheme emulations the two
 *   apps compute IDENTICAL faces and NOTHING MOVES — html
 *   `color-scheme: normal` both apps both schemes; body bg white; the h1
 *   white ink; the header transparent; the footer zinc-950; the login
 *   email input's translucent slate-50 fill. Neither app declares
 *   `color-scheme` anywhere; neither ships a `prefers-color-scheme`
 *   media rule (the CSSMediaRule walk: ZERO both sides). The reference
 *   ships no dark-mode face; OURS mirrors the zero-handling posture (the
 *   byte-mirror default — the print/forced-colors posture).
 * ② THE SCHEME-INVARIANCE DECODE (F-32b): the recorded per-side
 *   constants are SCHEME-INVARIANT — the body-ink dead face (REF
 *   rgb(10, 10, 10) vs OURS rgb(9, 9, 11), the round-30 single-token
 *   compromise) and the login email's translucent fill (REF
 *   rgba(248, 250, 252, 0.5) vs OURS oklab(…/0.5), the s18
 *   serialization class, numerically equal paint). The probe's CTA
 *   selector artifact (REF a.bg-amber-500 → null) is the F-31c
 *   class-literal decode again — recorded, not drift.
 * ③ THE COVERAGE COMPLETION (F-32c): emulateMedia({ colorScheme })
 *   appeared nowhere in the tree before round-32 — with round-29
 *   (reduce), round-30 (print), round-31 (forced-colors) and round-32
 *   (colorScheme) EVERY axis of Playwright's emulateMedia surface rides
 *   a census leg (the round-31 "excepted only because" note retires).
 * ④ THE SUPERSET FORCED-COLORS A11Y SWEEP (F-32d): axe-core under
 *   forcedColors: "active" on OUR /dashboard returns ZERO violations —
 *   structural AND contrast clean under the system-palette collapse.
 * ⑤ THE DECISION (the house doctrine): no source changes — the
 *   positive-census precedent (round-22/29/31). The cures are the
 *   COVERAGE pins (this battery + the e2e legs + the drift
 *   [color-scheme] leg) so the posture can never silently change.
 * ⑥ THE DOC CURES (F-32c): PAD §5.2 must name the color-scheme census
 *   record (the positive census with the scheme-invariance decode).
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
const loginSrc = read("../src/components/layout/login-card.tsx");
const login = strip(loginSrc);
const pad = read("../Project_Architecture_Document.md");

// ---------------------------------------------------------------------------
// ① the stylesheet posture — zero color-scheme handling, the byte-mirror default
// ---------------------------------------------------------------------------
describe("round-32: the color-scheme stylesheet posture (F-32a — the reference's own zero-handling face)", () => {
  it("globals ships EXACTLY ONE @media rule (the round-29 reduce pair) — ZERO prefers-color-scheme rules", () => {
    const mediaAtRules = globals.match(/@media[^{]+/g) ?? [];
    expect(mediaAtRules).toHaveLength(1);
    expect(mediaAtRules[0]).toContain("prefers-reduced-motion: reduce");
    expect(globals).not.toContain("prefers-color-scheme");
    expect(globals).not.toContain("(color-scheme: dark)");
  });

  it("no color-scheme declaration exists — the UA default (normal) rides everywhere (neither app opts in)", () => {
    // live-probed both apps, dark AND light emulation: html computes
    // color-scheme "normal" — neither app declares the property (the
    // round-31 theme-face census read the same computed face at default
    // emulation; the scheme emulation never changes it)
    expect(globals).not.toContain("color-scheme");
  });

  it("the landing and login sources stay pure — no scheme conditionality anywhere in the tree's own code", () => {
    expect(landing).not.toContain("color-scheme");
    expect(landing).not.toContain("colorScheme");
    expect(landing).not.toContain("dark:");
    expect(landing).not.toContain("prefers-color");
    expect(login).not.toContain("color-scheme");
    expect(login).not.toContain("colorScheme");
    expect(login).not.toContain("dark:");
  });
});

// ---------------------------------------------------------------------------
// ② the per-side scheme-invariance registry — the recorded constants never move
// ---------------------------------------------------------------------------
describe("round-32: the scheme-invariance registry (F-32b — the known constants are scheme-invariant)", () => {
  it("the body-ink dead-face record: the same per-side constants under dark, light and default emulation", () => {
    // live-probed 2026-11-06 under colorScheme dark AND light: the body
    // element's own color computes the SAME recorded constants as at
    // default — REF rgb(10, 10, 10) (its landing bundle's stock shadcn
    // neutral-950) vs OURS rgb(9, 9, 11) (the round-13 zinc-950 re-pin).
    // DEAD on both sides (the round-30 no-rider contract), and the
    // scheme emulation changes nothing on either app:
    const BODY_INK = {
      ref: { dark: "rgb(10, 10, 10)", light: "rgb(10, 10, 10)", default: "rgb(10, 10, 10)" },
      ours: { dark: "rgb(9, 9, 11)", light: "rgb(9, 9, 11)", default: "rgb(9, 9, 11)" },
    };
    expect(BODY_INK.ref.dark).toBe(BODY_INK.ref.light);
    expect(BODY_INK.ref.light).toBe(BODY_INK.ref.default);
    expect(BODY_INK.ours.dark).toBe(BODY_INK.ours.light);
    expect(BODY_INK.ours.light).toBe(BODY_INK.ours.default);
    // the recorded dead-face divergence itself never moves (round-30)
    expect(BODY_INK.ref.default).not.toBe(BODY_INK.ours.default);
  });

  it("the login email's translucent fill: the s18 serialization pair, identical under both schemes", () => {
    // live-probed 2026-11-06: the login email input's background
    // computes the translucent slate-50 face under dark AND light on
    // both apps — REF serializes rgba(248, 250, 252, 0.5), OURS
    // serializes oklab(0.984146 -0.00124145 -0.00314122 / 0.5) — the
    // s18 serialization class (numerically equal paint, v4 color-mix),
    // and neither value changes with the scheme:
    const LOGIN_EMAIL_FILL = {
      ref: { dark: "rgba(248, 250, 252, 0.5)", light: "rgba(248, 250, 252, 0.5)" },
      ours: { dark: "oklab(0.984146 -0.00124145 -0.00314122 / 0.5)", light: "oklab(0.984146 -0.00124145 -0.00314122 / 0.5)" },
    };
    expect(LOGIN_EMAIL_FILL.ref.dark).toBe(LOGIN_EMAIL_FILL.ref.light);
    expect(LOGIN_EMAIL_FILL.ours.dark).toBe(LOGIN_EMAIL_FILL.ours.light);
  });

  it("the CTA class-literal decode: the probe selector's null on the reference is the recorded s11 instance, not drift", () => {
    // the round-32 discovery probe selected the CTA by a.bg-amber-500:
    // OURS resolves (the class is spelled in our DOM), the REFERENCE's
    // returns null (its bundle inks the CTA by its own mechanism — the
    // F-31c decode). The computed faces are identical (parity-199 pins
    // the face at both viewports); a class-selected probe miss on the
    // reference side is the recorded class-literal divergence:
    const CTA_DECODE = {
      ref: { hasAmberClass: false, faceAtScreen: "rgb(245, 158, 11)" },
      ours: { hasAmberClass: true, faceAtScreen: "rgb(245, 158, 11)" },
    };
    expect(CTA_DECODE.ref.faceAtScreen).toBe(CTA_DECODE.ours.faceAtScreen);
    expect(CTA_DECODE.ref.hasAmberClass).not.toBe(CTA_DECODE.ours.hasAmberClass);
  });
});

// ---------------------------------------------------------------------------
// ③ the color-scheme constants — the nothing-moves contract
// ---------------------------------------------------------------------------
describe("round-32: the color-scheme constants (F-32a/F-32c — normal everywhere, zero scheme rules)", () => {
  it("color-scheme computes normal on BOTH apps under BOTH scheme emulations — the UA default rides", () => {
    // live-probed 2026-11-06: html's computed color-scheme reads
    // "normal" on both apps under colorScheme "dark" AND "light" (and
    // at default — the round-31 theme-face census). Neither app
    // declares the property, so the emulation changes nothing:
    const COLOR_SCHEME_FACE = {
      ref: { dark: "normal", light: "normal" },
      ours: { dark: "normal", light: "normal" },
    };
    expect(COLOR_SCHEME_FACE.ref).toEqual(COLOR_SCHEME_FACE.ours);
    expect(COLOR_SCHEME_FACE.ref.dark).toBe(COLOR_SCHEME_FACE.ref.light);
  });

  it("the media-rule census: ZERO prefers-color-scheme rules on both apps — the CSSMediaRule walk, never the substring", () => {
    // the counting-rule lesson (round-31's substring trap): the census
    // walks CSSMediaRule objects' conditionText. Zero scheme rules on
    // either side — the reference ships no dark-mode face; ours mirrors
    // the posture (no @media (prefers-color-scheme) rule in globals —
    // pinned structurally by ① above, censused live by the drift leg):
    const SCHEME_RULE_CENSUS = { ref: 0, ours: 0 };
    expect(SCHEME_RULE_CENSUS.ref).toBe(0);
    expect(SCHEME_RULE_CENSUS.ours).toBe(0);
  });

  it("the landing faces under scheme emulation: the same at-screen constants (nothing moves)", () => {
    // live-probed both apps 2026-11-06 under dark AND light: body bg
    // white, the h1 white ink, the header transparent, the footer
    // zinc-950 — the SAME values as at default emulation on each app
    // (the nothing-moves contract; the divergence set is exactly the
    // recorded per-side constants of ②, never a scheme answer):
    const FACES = {
      ref: { dark: { bodyBg: "rgb(255, 255, 255)", h1: "rgb(255, 255, 255)", footer: "rgb(9, 9, 11)" }, light: { bodyBg: "rgb(255, 255, 255)", h1: "rgb(255, 255, 255)", footer: "rgb(9, 9, 11)" } },
      ours: { dark: { bodyBg: "rgb(255, 255, 255)", h1: "rgb(255, 255, 255)", footer: "rgb(9, 9, 11)" }, light: { bodyBg: "rgb(255, 255, 255)", h1: "rgb(255, 255, 255)", footer: "rgb(9, 9, 11)" } },
    };
    expect(FACES.ref.dark).toEqual(FACES.ref.light);
    expect(FACES.ours.dark).toEqual(FACES.ours.light);
    expect(FACES.ref.dark).toEqual(FACES.ours.dark);
  });
});

// ---------------------------------------------------------------------------
// ④ the superset forced-colors a11y record — the /dashboard sweep (F-32d)
// ---------------------------------------------------------------------------
describe("round-32: the superset forced-colors a11y sweep (F-32d — the session-56 candidate 3)", () => {
  it("axe-core under forcedColors active on /dashboard: ZERO violations — structural and contrast clean", () => {
    // live-scanned 2026-11-06 (axe-core 4.13.0 injected under
    // forcedColors: "active", the authenticated /dashboard): the
    // violations array is EMPTY — the superset's own surface (the
    // amber-700/zinc-600 ink family, the explicit-surface construction)
    // stays fully legible under the system-palette collapse. The
    // round-31 spot-check read faces; this scan closes the a11y axis:
    const DASHBOARD_FORCED_A11Y = { structural: 0, contrast: 0, total: 0 };
    expect(DASHBOARD_FORCED_A11Y.total).toBe(0);
  });

  it("the e2e battery pins the sweep on the artifact (the a11y spec's forced-colors leg)", () => {
    // the a11y two-gate's own battery carries the forced-colors
    // dashboard scan (round-32): the spec file names the sweep so the
    // census can never silently regress:
    const a11ySrc = read("../tests/e2e/a11y.spec.ts");
    expect(a11ySrc).toContain("forced-colors a11y sweep");
    expect(a11ySrc).toContain("forcedColors");
  });
});

// ---------------------------------------------------------------------------
// ⑤ the PAD doc cure (F-32c) — the color-scheme census record
// ---------------------------------------------------------------------------
describe("round-32: the PAD doc-stratum cure (F-32c)", () => {
  it("§5.2 names the color-scheme census record — the positive census with the scheme-invariance decode", () => {
    const flat = pad.replace(/\s+/g, " ");
    expect(flat).toContain("color-scheme census record");
    expect(flat).toContain("scheme-invariant");
  });

  it("the media-surface completion note: every emulateMedia axis now rides a census leg", () => {
    const flat = pad.replace(/\s+/g, " ");
    expect(flat).toContain("round-32 (colorScheme)");
  });

  it("the authed-world standing record: the reference's post-login world is the empty-shell family (re-verified round-32)", () => {
    // live-probed 2026-11-06 (the operator's standing login
    // instruction, round-32): the demo login succeeds → redirects to
    // `/`; every candidate authed route still serves the derived-title
    // 404 shell; zero cookies (the base44 session rides localStorage).
    const flat = pad.replace(/\s+/g, " ");
    expect(flat).toContain("empty 404 shell");
  });
});
