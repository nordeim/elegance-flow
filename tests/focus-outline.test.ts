/**
 * Round-13 focus-outline battery: the FOCUS-FACE family (the interactive
 * faces no probe read — parity-199 reads at-rest faces only, round-10
 * pinned OUR superset's focus-visible rings + the auth sign-in ring, and
 * the auth card outside /login was never probed since the 2026-11-03
 * byte-verification) finally sits under the unit gate.
 *
 * The coverage gap this battery closes (live-probed settled
 * 2026-11-04):
 *
 * ① THE UNIVERSAL OUTLINE-COLOR DECOUPLE: the reference's landing bundle
 *   ships `* { outline-color: hsl(var(--ring) / .5) }` resolving
 *   rgba(10, 10, 10, 0.5) — neutral-950 @ 50%, ITS --ring — while its
 *   auth-card sign-in ring computes zinc-950 rgb(9,9,11) (a different
 *   token). Our build had collapsed both faces onto --color-ring; the
 *   round-10 re-pin (#0a0a0a → #09090b) silently dragged the universal
 *   outline face (a CURE-COLLISION). The fix decouples: the universal
 *   rule pins the literal rgba(10, 10, 10, 0.5).
 * ② THE --color-foreground RE-PIN: the reference's auth card computes
 *   rgb(9, 9, 11) (zinc-950) for the card/input text; ours shipped the
 *   session-9 stock neutral-950 #0a0a0a (the round-10 ring genus, on the
 *   TEXT token this time).
 * ③ THE --color-line RE-PIN: the reference's universal border default is
 *   the v3-preflight gray-200 rgb(229,231,235); ours shipped the CRM-era
 *   neutral-200 #e5e5e5.
 * ④ THE outline-none RENAME (the SEVENTH v4 re-pin trap): the
 *   reference's `.outline-none` computes `outline: rgba(0,0,0,0) solid
 *   2px; outline-offset: 2px` (verified live via CSSOM + CDP); v4's
 *   spells `outline-style: none`. The trap has TWO layers: v4 renamed
 *   the class, AND v4.3's `outline-hidden` — the documented v3 alias —
 *   is ALSO style:none in normal mode (the transparent outline is
 *   forced-colors-only; found live: the first cure attempt shipped
 *   outline-hidden and the face STILL computed none). Only the
 *   COMPOSITION `outline-2 outline-transparent outline-offset-2`
 *   computes the reference's face in normal mode. OUR superset surfaces
 *   (inbox/shell/error/404/toast) keep `outline-none` as the designed
 *   suppress+ring idiom — the retired-form pins are scoped to the
 *   mirrored members.
 * ⑤ THE AUTH-CARD INK RE-PINS (the base44 semantic-token refresh): the
 *   reference's Google button computes rgb(15,14,14) ink on
 *   rgb(233,230,224) border (hover rgb(241,238,234)/rgb(221,216,210));
 *   its "or" divider computes rgb(93,93,93). Ours shipped the
 *   2026-11-03 slate family (slate-700/slate-200/slate-300/slate-500).
 * ⑥ THE PAD FACES: the reference's inputs compute py-2 (8px) and its
 *   submit px-3 py-2; ours shipped 0 (invisible on fixed-height
 *   single-line controls — a computed-face divergence by the letter).
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

const globalsCss = read("src/app/globals.css");
const landing = stripComments(read("src/components/landing/landing-page.tsx"));
const pageLayout = stripComments(read("src/lib/page-layout.ts"));
const loginReset = stripComments(read("src/lib/login-reset.ts"));
const loginCard = stripComments(read("src/components/layout/login-card.tsx"));

describe("round-13 ①: the universal outline-color decouple (the landing's focus-outline color)", () => {
  it("globals.css pins the universal outline-color to the reference's literal rgba(10, 10, 10, 0.5)", () => {
    expect(globalsCss).toContain("outline-color: rgba(10, 10, 10, 0.5);");
  });

  it("the retired color-mix-over---color-ring form never returns (the round-10 cure-collision)", () => {
    expect(globalsCss).not.toContain("outline-color: color-mix(in oklab, var(--color-ring) 50%, transparent);");
  });

  it("--color-ring KEEPS its round-10 re-pin (the auth sign-in ring — the two faces are independent tokens on the reference)", () => {
    expect(globalsCss).toContain("--color-ring: #09090b;");
  });
});

describe("round-13 ②③: the foreground + line token re-pins (the reference's live faces)", () => {
  it("globals.css pins --color-foreground to #09090b — the reference's computed card/input text rgb(9,9,11)", () => {
    expect(globalsCss).toContain("--color-foreground: #09090b;");
  });

  it("the retired session-9 stock #0a0a0a never returns on --color-foreground", () => {
    expect(globalsCss).not.toContain("--color-foreground: #0a0a0a;");
  });

  it("globals.css KEEPS --color-line at #e5e5e5 — the reference's LANDING-bundle universal default (neutral-200, live-computed rgb(229,229,229))", () => {
    // The reference carries TWO latent border defaults across its own
    // bundles: its landing (the app CSS — the parity surface) computes
    // neutral-200; its auth page (the base44 platform bundle) rides the
    // v3-preflight gray-200. One token cannot match both — ours rides
    // the landing's face; the platform's is the documented delta.
    expect(globalsCss).toContain("--color-line: #e5e5e5;");
  });

  it("the round-13 first-pass #e5e7eb re-pin (falsified live on the landing) never returns on --color-line", () => {
    expect(globalsCss).not.toContain("--color-line: #e5e7eb;");
  });
});

describe("round-13 ④: the outline-hidden census (the seventh v4 re-pin trap — the outline-none rename)", () => {
  it("the landing's four form controls port the v3 computed face (the outline-2/transparent/offset-2 composition, all four)", () => {
    const hits =
      landing.match(/outline-2 outline-transparent outline-offset-2 focus:border-zinc-950/g) ?? [];
    expect(hits.length).toBeGreaterThanOrEqual(4);
  });

  it("the retired outline-none never returns on the landing (the v4 spelling computes a different face)", () => {
    expect(landing).not.toContain("outline-none");
  });

  it("LOGIN_LAYOUT.input ports the v3 face (the focus:outline-2/transparent/offset-2 composition) — the reference's inputs compute 2px transparent + offset 2px", () => {
    expect(pageLayout).toContain("focus:outline-2 focus:outline-transparent focus:outline-offset-2");
    expect(pageLayout).not.toContain("focus:outline-none focus:ring-2 focus:ring-slate-400");
  });

  it("LOGIN_LAYOUT.submit ports the v3 face (the focus-visible:outline-2/transparent/offset-2 composition)", () => {
    expect(pageLayout).toContain(
      "focus-visible:outline-2 focus-visible:outline-transparent focus-visible:outline-offset-2",
    );
    expect(pageLayout).not.toContain("focus-visible:outline-none focus-visible:ring-2");
  });

  it("the login-reset view family ports the v3 face (no outline-none anywhere in the auth view family)", () => {
    expect(loginReset).toContain("focus:outline-2 focus:outline-transparent focus:outline-offset-2");
    expect(loginReset).toContain(
      "focus-visible:outline-2 focus-visible:outline-transparent focus-visible:outline-offset-2",
    );
    expect(loginReset).not.toContain("outline-none");
  });

  it("the verify-code inputs port the v3 face (the focus-visible composition)", () => {
    expect(loginCard).toContain(
      "focus-visible:outline-2 focus-visible:outline-transparent focus-visible:outline-offset-2",
    );
    expect(loginCard).not.toContain("focus-visible:outline-none");
  });
});

describe("round-13 ⑤: the auth-card ink re-pins (the base44 semantic-token refresh, live 2026-11-04)", () => {
  it("the Google button rides the reference's live ink + border literals", () => {
    expect(pageLayout).toContain("text-[#0f0e0e]");
    expect(pageLayout).toContain("border-[#e9e6e0]");
  });

  it("the Google button's hover rides the reference's live hover literals", () => {
    expect(pageLayout).toContain("hover:bg-[#f1eeea]");
    expect(pageLayout).toContain("hover:border-[#ddd8d2]");
  });

  it("the retired slate google forms never return", () => {
    expect(pageLayout).not.toContain("font-medium text-slate-700 text-[16px]");
    expect(pageLayout).not.toContain("hover:border-slate-300 hover:bg-slate-50");
  });

  it("the 'or' divider rides the reference's live ink (rgb(93,93,93))", () => {
    expect(pageLayout).toContain("text-[#5d5d5d]");
    expect(pageLayout).not.toContain("font-medium tracking-wider text-slate-500");
  });
});

describe("round-13 ⑥: the pad faces (the reference's computed py-2 / px-3 py-2)", () => {
  it("LOGIN_LAYOUT.input carries py-2 (the reference's inputs compute 8px vertical padding)", () => {
    expect(pageLayout).toContain("py-2 pl-10 pr-3");
  });

  it("LOGIN_LAYOUT.submit carries px-3 py-2 (the reference's submit computes 12px 8px)", () => {
    expect(pageLayout).toContain("gap-1 px-3 py-2 rounded-xl");
  });
});
