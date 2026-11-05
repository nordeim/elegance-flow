/**
 * Round-26 reset-faces battery: the /reset-password FACE family no probe
 * ever rode (the platform-auth-expansion census) finally sits under the
 * unit gate.
 *
 * The coverage gap this battery closes (live-probed settled
 * 2026-11-05, both apps, guest-only GETs + the precedented
 * bogus-token submits — the [authfail] class):
 *
 * ① THE PLATFORM CONTROL FAMILY (F-26c, HIGH — the reference's reset
 *   route renders the base44 PLATFORM's own family, a different design
 *   system from its own login card: its login input is 48px/12px/slate
 *   at 1280; its reset input is 44px/6px/gray): the flat bg-gray-50
 *   page, the white rounded-lg shadow-lg card, the FIXED 48/48/40 inner
 *   pad (live-probed IDENTICAL at 1280 AND 390 — no responsive ladder),
 *   the h2 24px/700 gray-900 headings (tracking NORMAL — the login
 *   family's tracking-tight retired), the h-11 FIXED rounded-md
 *   border-gray-200 bg-gray-50/50 inputs with the zinc-500 placeholder
 *   ink and the gray-400 focus family, the gray-700 labels, the 12px
 *   gray-500 hint, the gray-600 subtitle, the h-11 rounded-md bg-gray-900
 *   (hover gray-800) primary buttons, the gray-600 back button, the
 *   red-100 80×40 icon family, the 2px gray-900 top strip (the token
 *   form alone), the red-50/50 zinc-950 error box. The ONE responsive
 *   arm is the input's own font ladder (text-base md:text-sm — 16px at
 *   390, 14px at 1280, live-probed both).
 * ② THE DOM-CASE TEXT FAMILY (F-26a, HIGH): the reference carries a
 *   Title-Case quartet ours shipped sentence-cased — "Invalid Reset
 *   Link", "Back to Login", "New Password", "Confirm New Password" —
 *   while the REST of the family mirrors byte-for-byte ("Set new
 *   password", "Enter your new password for EleganceFlow", "Must be at
 *   least 8 characters", "Reset password", the token state's
 *   SENTENCE-case "Back to login" — the reference's own in-card
 *   inconsistency, mirrored — "This password reset link is invalid or
 *   has expired.", "Invalid or expired reset token").
 * ③ THE JSON-LD WIRING (F-26b, HIGH): the reference rides the
 *   BreadcrumbList JSON-LD on /reset-password (BOTH states — the same
 *   platform injection /login and the /signup 404 carry); ours rode it
 *   on /login and /signup alone. The page now rides the seam.
 * ④ THE SUPERSET KEEPS: autoComplete="new-password" on both password
 *   inputs (the reference ships none — the WCAG 1.3.5 superset), the
 *   role="alert" error box, the client-side mismatch guard, the three
 *   back-button rides to /login.
 * ⑤ THE RETIRED-FORM REGRESSION: the login-family expression
 *   (LOGIN_LAYOUT, the slate inks, rounded-xl, shadow-2xl, the gradient
 *   page, the 30px tracking-tight h1, the red-700 error ink) never
 *   returns on the reset screen.
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
const screenSrc = read("../src/components/layout/reset-password-screen.tsx");
const pageSrc = read("../src/app/reset-password/page.tsx");
const loginPageSrc = read("../src/app/login/page.tsx");
const signupPageSrc = read("../src/app/signup/page.tsx");

// the RESET_LAYOUT block (the LOGIN_LAYOUT extraction pattern)
const resetBlock = /export const RESET_LAYOUT = \{[\s\S]*?\n\} as const;/.exec(layoutSrc)?.[0] ?? "";

describe("session-199 round-26: the reset-family/platform-auth census", () => {
  it("the RESET_LAYOUT seam carries the reference's platform reset family (the probed literals)", () => {
    // the chrome family — live-probed at 1280 AND 390 (the fixed ladder)
    expect(resetBlock).toMatch(/page: "min-h-screen flex items-center justify-center bg-gray-50 p-4"/);
    expect(resetBlock).toMatch(/card: "relative overflow-hidden rounded-lg bg-white shadow-lg"/);
    expect(resetBlock).toMatch(/inner: "px-12 pb-10 pt-12"/);
    // the heading family — h2 24px/700 gray-900, tracking NORMAL (the
    // login family's tracking-tight retired), FIXED at every viewport
    expect(resetBlock).toMatch(/heading: "text-2xl font-bold text-gray-900"/);
    // the control family — h-11 FIXED (no sm:h-12), rounded-md(6px),
    // gray-200 border, gray-50/50 fill, the zinc-500 placeholder ink
    // (the reference's own platform family — its LOGIN placeholder is
    // slate-600, live-probed distinct), the gray-400 focus family
    expect(resetBlock).toMatch(
      /input:\s*"h-11 w-full rounded-md border border-gray-200 bg-gray-50\/50 py-2 pl-10 pr-3 placeholder:text-zinc-500 focus:border-gray-400 focus:outline-2 focus:outline-transparent focus:outline-offset-2 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-base md:text-sm"/,
    );
    // the primary buttons — h-11 rounded-md bg-gray-900, hover gray-800
    // (the live-probed hover face rgb(31,41,55))
    expect(resetBlock).toMatch(
      /primary:\s*"h-11 w-full rounded-md bg-gray-900 text-sm font-medium text-white transition-colors hover:bg-gray-800/,
    );
    // the text family carriers
    expect(resetBlock).toMatch(/label: "text-sm font-medium text-gray-700"/);
    expect(resetBlock).toMatch(/hint: "text-xs text-gray-500"/);
    expect(resetBlock).toMatch(/subtitle: "text-base text-gray-600"/);
    // the icon family — the 80×80 red-100 wrap + the 40×40 red-600 glyph
    expect(resetBlock).toMatch(/iconWrap: "flex h-20 w-20 items-center justify-center rounded-full bg-red-100"/);
    expect(resetBlock).toMatch(/icon: "h-10 w-10 text-red-600"/);
    // the 2px gray-900 strip (the token form alone) + the back button
    expect(resetBlock).toMatch(/strip: "absolute inset-x-0 top-0 h-0.5 bg-gray-900"/);
    expect(resetBlock).toMatch(/back: "w-full text-sm text-gray-600 hover:text-gray-900"/);
    // the error box — the reference's own zinc-950-on-red-50 family
    expect(resetBlock).toMatch(
      /error:\s*"rounded-lg border border-red-200 bg-red-50\/50 p-4 text-base text-zinc-950"/,
    );
    // THE FIXED-LADDER KEEP: the platform family is STATIC — the ONE
    // responsive arm is the input's own font ladder (text-base
    // md:text-sm). No sm: arms anywhere (the login family's
    // h-11 sm:h-12 / p-8 sm:p-10 / text-2xl sm:text-3xl ladder retired).
    const smArms = resetBlock.match(/sm:/g) ?? [];
    expect(smArms.length).toBe(0);
    const mdArms = resetBlock.match(/md:/g) ?? [];
    expect(mdArms.length).toBe(1);
  });

  it("the DOM-case text family mirrors the reference (the Title-Case quartet + the byte-identical keeps)", () => {
    const src = strip(screenSrc);
    // the Title-Case quartet (F-26a — ours shipped sentence-cased)
    expect(src).toContain("Invalid Reset Link");
    expect(src).toContain("Back to Login");
    expect(src).toContain("New Password");
    expect(src).toContain("Confirm New Password");
    // the retired sentence-case forms never return
    expect(src).not.toMatch(/Invalid reset link/);
    expect(src).not.toMatch(/Confirm password/);
    expect(src).not.toMatch(/New password/);
    // the byte-identical keeps (live-probed both apps)
    expect(src).toContain("Set new password");
    expect(src).toContain("Enter your new password for EleganceFlow");
    expect(src).toContain("Must be at least 8 characters");
    expect(src).toContain("Reset password");
    // the token state's back button stays SENTENCE case — the
    // reference's own in-card inconsistency, mirrored (probed:
    // invalid card "Back to Login", token form "Back to login")
    expect(src).toContain("Back to login");
    expect(src).toContain("This password reset link is invalid or has expired.");
    expect(src).toContain("Invalid or expired reset token");
    // the headings are h2 (the reference's own tag — probed), never h1
    expect(src).toMatch(/<h2 className=\{RESET_LAYOUT\.heading\}/);
    expect(src).not.toMatch(/<h1/);
    // the strip rides the token form (the screen wires it)
    expect(src.indexOf("RESET_LAYOUT.strip")).toBeGreaterThan(-1);
  });

  it("the BreadcrumbList JSON-LD rides the reset route (the F-26b cure) and the login/signup keeps stand", () => {
    const src = strip(pageSrc);
    expect(src).toContain('breadcrumbJsonLd("/reset-password")');
    expect(src).toMatch(/type="application\/ld\+json"/);
    expect(src).toMatch(/dangerouslySetInnerHTML=\{\{ __html: breadcrumbJsonLd\("/);
    // the keeps — the other two BreadcrumbList carriers stand
    expect(strip(loginPageSrc)).toContain('breadcrumbJsonLd("/login")');
    expect(strip(signupPageSrc)).toContain('breadcrumbJsonLd("/signup")');
  });

  it("the superset keeps stand (the a11y family the reference lacks)", () => {
    const src = strip(screenSrc);
    // autoComplete on BOTH password inputs (the reference ships none —
    // the WCAG 1.3.5 identify-input-purpose superset)
    const acCount = src.match(/autoComplete="new-password"/g) ?? [];
    expect(acCount.length).toBe(2);
    // the error box announces (role=alert — the reference carries it
    // too, probed; ours keeps the explicit declaration)
    expect(src).toMatch(/role="alert"/);
    // the client-side mismatch guard blocks the submit
    expect(src).toContain("Passwords do not match");
    // the three back-button rides to /login (invalid / token / success)
    const rides = src.match(/router\.push\("\/login"\)/g) ?? [];
    expect(rides.length).toBe(3);
    // the success state keeps its own face (unreachable on the
    // reference — email-only delivery; our superset on the family)
    expect(src).toContain("Password reset");
    expect(src).toContain("Your password has been reset successfully. Sign in with your new password.");
  });

  it("the retired login-family expression never returns on the reset screen", () => {
    const src = strip(screenSrc);
    // the login-family carriers (LOGIN_LAYOUT, the slate inks, the
    // rounded-xl/shadow-2xl chrome, the gradient page, the 30px
    // tracking-tight h1, the red-700 error ink, the red-50/70 fill)
    expect(src).not.toMatch(/LOGIN_LAYOUT/);
    // slate-\d (the ink scale) — the -translate-y-1/2 carrier in the
    // icon position class contains the bare substring "slate-"; the
    // ink-family regression targets the scale
    expect(src).not.toMatch(/slate-\d/);
    expect(src).not.toMatch(/rounded-xl/);
    expect(src).not.toMatch(/shadow-2xl/);
    expect(src).not.toMatch(/bg-gradient/);
    expect(src).not.toMatch(/text-3xl/);
    expect(src).not.toMatch(/tracking-tight/);
    expect(src).not.toMatch(/text-red-700/);
    expect(src).not.toMatch(/bg-red-50\/70/);
    // the seam block itself stays in the platform family
    expect(resetBlock).not.toMatch(/slate-\d/);
    expect(resetBlock).not.toMatch(/rounded-xl/);
    expect(resetBlock).not.toMatch(/shadow-2xl/);
    expect(resetBlock).not.toMatch(/bg-gradient/);
  });
});
