/**
 * Round-27 error-faces battery: the CRM-BLUE/RESILIENCE-BOUNDARY census —
 * the surfaces and tokens no probe ever rode (the round-26 log's own
 * candidate list named the family first) finally sit under the unit gate.
 *
 * The coverage gap this battery closes (live-probed settled 2026-11-05):
 *
 * ① THE ERROR_LAYOUT SEAM (F-27b, HIGH): the boundaries' doc comments
 *   always claimed "the house dialect the 404 established" — but they rode
 *   INLINE literals with a `bg-primary hover:bg-primary-hover
 *   focus:ring-primary` (#2563eb) button — the NEO-CRM brand-blue family
 *   the round-24 asset cure retired from the icons; the token survived the
 *   domain transformation ONLY because the boundary family never carried a
 *   face pin. The seam carries the 404's own construction (the NOT_FOUND
 *   idiom: page/card/center/headingGroup/divider/textGroup/buttonGroup +
 *   the Go Home pill family) with ONE deliberate ink change — the h1
 *   slate-500 AA cure (②).
 * ② THE AA CONTRACT (F-27c, HIGH): the boundary h1 rode `text-slate-300`
 *   (#cbd5e1) on `bg-slate-50` (#f8fafc) = 1.42:1 — a WCAG 1.4.3 fail on
 *   OUR OWN superset surface (the house doctrine: our surfaces pass AA
 *   outright; the a11y two-gate audits landing/auth/workspace only). The
 *   seam's h1 rides slate-500; the battery COMPUTES the contrast ratios
 *   from the live @theme hex values (never a comment-pinned claim): the
 *   404's own "404" numeral keeps slate-300 — the REFERENCE's own face
 *   (the s12 byte-pin, the sanctioned class; never "fixed").
 * ③ THE @THEME TOKEN CENSUS (F-27e): after the cures the CRM-brand token
 *   family loses every consumer — sidebar/-hover/-active (the logo dot was
 *   the last), brand (the NEO-CRM reference's marketing token, zero
 *   consumers already), primary (the boundary button; the toast's info
 *   icon re-pins to the Feedback family's --color-info), primary-hover,
 *   primary-foreground — SEVEN retired names, NONE of them may return.
 * ④ THE BOUNDARY POSTURE KEEPS: "use client" on both, the
 *   reloadOnStaleChunk(error, { storage: browserSessionStorage() }) wiring with
 *   [error] deps (the round-37 F-37a guarded hand-off), the digest ref,
 *   reset(), ZERO component-tree imports (the resilience posture), and
 *   global-error's own <html lang="en"> + globals.css import.
 * ⑤ THE LOGIN-LOGO CURE (F-27a, HIGH, VISIBLE): the reference's login card
 *   renders its REAL logo — an <img alt="EleganceFlow logo"> (the SAME
 *   283cae1f1_logo the round-24 assets byte-mirror to src/app/icon.png) at
 *   aspect-square h-full w-full object-cover inside the byte-class circle;
 *   OURS rendered a 40×40 `bg-sidebar` (#2563eb) blue dot — the CRM-era
 *   "CSS brand mark". The img is self-hosted (/icon.png — NEVER their CDN);
 *   the circle span drops the dot-era extras (bg-white/items-center/
 *   justify-center) to the reference's byte class and loses aria-hidden
 *   (the reference's logo is a real informative img with a real alt).
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

const layoutSrc = read("../src/lib/page-layout.ts");
const errorSrc = read("../src/app/error.tsx");
const globalErrorSrc = read("../src/app/global-error.tsx");
const cssSrc = read("../src/app/globals.css");
const loginCardSrc = read("../src/components/layout/login-card.tsx");
const toastSrc = read("../src/components/ui/toast.tsx");

// the ERROR_LAYOUT block (the RESET_LAYOUT extraction pattern)
const errorBlock = /export const ERROR_LAYOUT = \{[\s\S]*?\n\} as const;/.exec(layoutSrc)?.[0] ?? "";
const cssStripped = strip(cssSrc);

// ---- the WCAG contrast math, computed from the LIVE @theme hex values ----
const themeHex = (token: string): string | null =>
  new RegExp(`--color-${token}:\\s*(#[0-9a-fA-F]+);`).exec(cssStripped)?.[1] ?? null;

const luminance = (hex: string): number => {
  const c = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4]
    .map((i) => parseInt(c.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (fg: string, bg: string): number => {
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
};

describe("session-199 round-27: the CRM-blue/resilience-boundary census", () => {
  it("the ERROR_LAYOUT seam carries the 404's house construction + the AA ink family (F-27b/c)", () => {
    // the chrome family — the 404's own construction (NOT_FOUND's
    // page/card/center idiom; the boundary always claimed this dialect)
    expect(errorBlock).toMatch(/page: "min-h-screen flex items-center justify-center p-6 bg-slate-50"/);
    expect(errorBlock).toMatch(/card: "max-w-md w-full"/);
    expect(errorBlock).toMatch(/center: "text-center space-y-6"/);
    expect(errorBlock).toMatch(/headingGroup: "space-y-2"/);
    expect(errorBlock).toMatch(/divider: "h-0.5 w-16 bg-slate-200 mx-auto"/);
    expect(errorBlock).toMatch(/textGroup: "space-y-3"/);
    expect(errorBlock).toMatch(/buttonGroup: "pt-6"/);
    // THE AA CURE (F-27c): the h1 ink slate-500, never slate-300 (the
    // 1.42:1 fail); the muted font-light display idiom keeps
    expect(errorBlock).toMatch(/h1: "text-4xl font-light text-slate-500"/);
    expect(errorBlock).toMatch(/h2: "text-2xl font-medium text-slate-800"/);
    expect(errorBlock).toMatch(/p: "text-slate-600 leading-relaxed"/);
    // THE HOUSE PILL (F-27b): the 404's Go Home button family — white
    // bordered, slate-700 ink, slate-500 focus ring; the CRM-blue
    // bg-primary/hover:bg-primary-hover/focus:ring-primary never returns
    expect(errorBlock).toMatch(
      /button:\s*"inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"/,
    );
    expect(errorBlock).toMatch(/buttonIcon: "h-4 w-4 mr-2"/);
  });

  it("the seam's ink family passes WCAG AA outright — the ratios COMPUTED from the live @theme hex (never comment-pinned)", () => {
    const bg = themeHex("slate-50");
    expect(bg).toBe("#f8fafc"); // the @theme re-pin is the source of truth
    // the h1 (36px font-light — LARGE text, the 3:1 bar; we hold 4.5)
    expect(contrast(themeHex("slate-500") ?? "", bg ?? "")).toBeGreaterThanOrEqual(3);
    // the h2 and p (normal text — the 4.5:1 bar)
    expect(contrast(themeHex("slate-800") ?? "", bg ?? "")).toBeGreaterThanOrEqual(4.5);
    expect(contrast(themeHex("slate-600") ?? "", bg ?? "")).toBeGreaterThanOrEqual(4.5);
    // the retired fail never returns: slate-300 on slate-50 computes
    // 1.42:1 — the boundary's h1 may never ride it (the 404's own
    // numeral is the REFERENCE's sanctioned face, exempt by doctrine)
    expect(contrast(themeHex("slate-300") ?? "", bg ?? "")).toBeLessThan(3);
  });

  it("the CRM-blue token family retires from @theme — seven names, none may return (F-27e)", () => {
    for (const token of [
      "sidebar",
      "sidebar-hover",
      "sidebar-active",
      "brand",
      "primary",
      "primary-hover",
      "primary-foreground",
    ]) {
      expect(cssStripped).not.toMatch(new RegExp(`--color-${token}:`));
    }
    // the Feedback family stays intact (the info icon's new home)
    expect(cssStripped).toMatch(/--color-success: #10b981;/);
    expect(cssStripped).toMatch(/--color-danger: #ef4444;/);
    expect(cssStripped).toMatch(/--color-info: #06b6d4;/);
    // the toast's info icon rides the Feedback token, never the retired
    // primary (toast-anatomy's icon pin re-pinned deliberately)
    expect(strip(toastSrc)).toContain('"h-4.5 w-4.5 text-info"');
  });

  it("both boundaries ride the seam + the resilience posture keeps (F-27b)", () => {
    for (const src of [errorSrc, globalErrorSrc]) {
      const stripped = strip(src).replace(/\s+/g, " ");
      expect(src).toContain('"use client"');
      // the seam is the ONE class source (the inline literals retire)
      expect(stripped).toContain('className={ERROR_LAYOUT.page}');
      expect(stripped).toContain('className={ERROR_LAYOUT.h1}');
      expect(stripped).toContain('className={ERROR_LAYOUT.button}');
      // the CRM-blue regression: the retired primary family never
      // returns on the boundary sources
      expect(stripped).not.toMatch(/bg-primary\b/);
      expect(stripped).not.toMatch(/ring-primary\b/);
      // the posture keeps: the recovery seam, the digest, the reset
      expect(stripped).toContain("reloadOnStaleChunk(error, { storage: browserSessionStorage() })");
      expect(stripped).toContain("error.digest");
      expect(stripped).toContain("reset");
      // the resilience posture: no component-tree imports
      const imports = [...src.matchAll(/^import .* from "([^"]+)"/gm)].map((m) => m[1]);
      for (const imp of imports) {
        expect(imp.startsWith("@/components/")).toBe(false);
      }
    }
    // global-error's own construction: html lang + body + globals.css
    const g = strip(globalErrorSrc);
    expect(g).toMatch(/<html lang="en">/);
    expect(g).toMatch(/<body/);
    expect(globalErrorSrc).toContain('import "./globals.css"');
  });

  it("the login-card logo is the reference's real img — the CRM blue dot never returns (F-27a)", () => {
    const stripped = strip(loginCardSrc).replace(/\s+/g, " ");
    // the img: the reference's byte class + its real alt, self-hosted
    expect(stripped).toContain('alt="EleganceFlow logo"');
    expect(stripped).toContain('className={LOGIN_LAYOUT.logoImg}');
    expect(stripped).toContain('src="/icon.png"');
    // the circle span rides the seam member (no inline literals)
    expect(stripped).toContain('className={LOGIN_LAYOUT.logo}');
    // the CRM sidebar-blue dot never returns anywhere in src/
    const banned = ["bg-sidebar", "bg-primary", "ring-primary", "primary-hover", "bg-brand", "text-brand"];
    for (const rel of [
      "../src/components/layout/login-card.tsx",
      "../src/components/ui/toast.tsx",
      "../src/app/error.tsx",
      "../src/app/global-error.tsx",
      "../src/app/not-found-body.tsx",
    ]) {
      const s = strip(read(rel));
      for (const b of banned) {
        expect(s).not.toMatch(new RegExp(b.replace("-", "\\-") + "(?![\\w-])"));
      }
    }
  });
});
