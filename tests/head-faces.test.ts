/**
 * Round-18 head-faces battery: the DOCUMENT SURFACE no probe read (the
 * parity probe reads the landing's computed styles; the drift legs read
 * body faces; the smoke ladder curls OUR sitemap/robots/manifest —
 * nobody ever diffed the reference's own <head> faces) finally sits
 * under the unit gate.
 *
 * The coverage gap this battery closes (live-probed settled 2026-11-04,
 * both apps, / + /login + /signup):
 *
 * ① THE LOGIN BREADCRUMB (F-18a, MODERATE, document surface): the
 *   reference's /login carries a schema.org BreadcrumbList JSON-LD in
 *   its head — {"@context": "https://schema.org", "@type":
 *   "BreadcrumbList", "itemListElement": [position 1 "Home" → origin/,
 *   position 2 "login" → origin/login]} — and OURS carried ZERO
 *   JSON-LD anywhere. The cure renders the byte-mirrored block on
 *   /login (the exact spaced serialization the platform ships).
 * ② THE SIGNUP MEMBER: the reference's /signup URL carries the same
 *   family (riding its 200-status soft-404 body — the base44
 *   DeadEndPage: h1 "404", h2 "Page Not Found", "Go Home"; the
 *   session-10 "the reference 404s /signup" record's transport is
 *   stale — the STATUS is 200 now). OUR /signup is the working
 *   superset; the breadcrumb is semantically true on it (one hop
 *   from home), so the member mirrors there too.
 * ③ THE LANDING PURITY: the reference's landing carries NO JSON-LD —
 *   and neither may ours (the census pin: application/ld+json lives
 *   on /login and /signup ONLY, across the whole src tree).
 * ④ THE LOGIN VIEWPORT (F-18b, LOW, document surface): the
 *   reference's /login viewport carries viewport-fit=cover (the
 *   notched-device edge-to-edge declaration) — LOGIN-ONLY (the
 *   reference's / and /signup viewports carry none). The cure adds
 *   `viewportFit: "cover"` to the login page's viewport export; the
 *   export declares ONLY that field (width/initialScale/themeColor
 *   inherit from the root layout — the single source).
 * ⑤ THE SIGNUP VIEWPORT KEEP: /signup declares NO viewportFit (the
 *   reference's signup-URL viewport has none) — pinned so the
 *   login-only shape never generalizes.
 * ⑥ THE THEME-COLOR KEEP: the root layout's themeColor "#000000"
 *   stays (the every-page family — OUR superset; the reference
 *   carries it on /login only).
 * ⑦ THE HELPER CONTRACT: breadcrumbJsonLd("/login" | "/signup") —
 *   the parsed BreadcrumbList object (positions, names, origin
 *   items) + the exact spaced serialization (the reference's byte
 *   shape) for both routes.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const loginPage = readFileSync(path.join(here, "../src/app/login/page.tsx"), "utf8");
const signupPage = readFileSync(path.join(here, "../src/app/signup/page.tsx"), "utf8");
const rootLayout = readFileSync(path.join(here, "../src/app/layout.tsx"), "utf8");
const siteLib = readFileSync(path.join(here, "../src/lib/site.ts"), "utf8");

// The round-16 tolerant-import lesson: an absent module errors the
// whole battery at import time — catch-to-null so the content checks
// fail honestly (and the pre-existing keeps stay green by design).
const site = await (async () => {
  try {
    return await import("../src/lib/site");
  } catch {
    return null;
  }
})();

const REF_SHAPE = `{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "ORIGIN/"}, {"@type": "ListItem", "position": 2, "name": "ROUTE", "item": "ORIGIN/ROUTE"}]}`;

function refShape(origin: string, route: "login" | "signup"): string {
  return REF_SHAPE.replaceAll("ORIGIN", origin).replaceAll("ROUTE", route);
}

describe("round-18 ① the login page renders the BreadcrumbList JSON-LD (F-18a)", () => {
  it("the page renders an application/ld+json script fed by breadcrumbJsonLd(\"/login\")", () => {
    expect(loginPage).toMatch(/type="application\/ld\+json"/);
    expect(loginPage).toMatch(/breadcrumbJsonLd\("\/login"\)/);
  });

  it("the helper emits the reference's exact spaced serialization for /login", () => {
    expect(site, "the helper must exist (the round-18 cure)").not.toBeNull();
    if (!site) return;
    const origin = site.siteUrl(process.env.NEXT_PUBLIC_SITE_URL);
    expect(site.breadcrumbJsonLd("/login")).toBe(refShape(origin, "login"));
  });

  it("the /login block parses to the reference's BreadcrumbList object", () => {
    if (!site) return;
    const origin = site.siteUrl(process.env.NEXT_PUBLIC_SITE_URL);
    const parsed = JSON.parse(site.breadcrumbJsonLd("/login")) as {
      "@context": string;
      "@type": string;
      itemListElement: Array<Record<string, unknown>>;
    };
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("BreadcrumbList");
    expect(parsed.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
      { "@type": "ListItem", position: 2, name: "login", item: `${origin}/login` },
    ]);
  });
});

describe("round-18 ② the signup page renders the same family (the superset member)", () => {
  it("the page renders an application/ld+json script fed by breadcrumbJsonLd(\"/signup\")", () => {
    expect(signupPage).toMatch(/type="application\/ld\+json"/);
    expect(signupPage).toMatch(/breadcrumbJsonLd\("\/signup"\)/);
  });

  it("the helper emits the exact serialization for /signup", () => {
    if (!site) return;
    const origin = site.siteUrl(process.env.NEXT_PUBLIC_SITE_URL);
    expect(site.breadcrumbJsonLd("/signup")).toBe(refShape(origin, "signup"));
  });
});

describe("round-18 ③ the landing purity — application/ld+json lives on the auth pages ONLY (round-26: login + signup + reset-password)", () => {
  it("the landing route and the landing component carry no JSON-LD", async () => {
    const landing = readFileSync(path.join(here, "../src/app/page.tsx"), "utf8");
    expect(landing).not.toMatch(/application\/ld\+json/);
    const landingComponent = readFileSync(
      path.join(here, "../src/components/landing/landing-page.tsx"),
      "utf8",
    );
    expect(landingComponent).not.toMatch(/application\/ld\+json/);
  });

  it("the whole src tree renders application/ld+json on exactly the three auth pages", async () => {
    // Round-26 (F-26b): the reference rides the BreadcrumbList JSON-LD
    // on /reset-password too (BOTH card states — live-probed settled
    // 2026-11-05); the platform injection's surface census moves from
    // the two pages to the three, deliberately re-pinned here.
    const { execFileSync } = await import("node:child_process");
    const hits = execFileSync(
      "rg",
      ["-l", "application/ld\\+json", "src/"],
      { encoding: "utf8" },
    )
      .trim()
      .split("\n")
      .filter(Boolean)
      .sort();
    expect(hits).toEqual([
      "src/app/login/page.tsx",
      "src/app/reset-password/page.tsx",
      "src/app/signup/page.tsx",
    ]);
  });
});

describe("round-18 ④ the login viewport carries viewport-fit=cover (F-18b, login-only)", () => {
  it("the login page exports a viewport with viewportFit: \"cover\"", () => {
    const m = loginPage.match(/export const viewport[^;]*?;/);
    expect(m, "the login page must export a viewport object").not.toBeNull();
    expect(m![0]).toMatch(/viewportFit:\s*"cover"/);
  });

  it("the export declares ONLY viewportFit — width/initialScale/themeColor inherit from the root layout", () => {
    const m = loginPage.match(/export const viewport[^;]*?;/);
    expect(m![0]).not.toMatch(/themeColor/);
    expect(m![0]).not.toMatch(/initialScale/);
    expect(m![0]).not.toMatch(/width/);
  });
});

describe("round-18 ⑤⑥ the keeps — signup's plain viewport + the layout's theme-color", () => {
  it("the signup page declares no viewportFit (the reference's signup-URL viewport has none)", () => {
    expect(signupPage).not.toMatch(/viewportFit/);
  });

  it("the root layout keeps themeColor: \"#000000\" (the every-page family)", () => {
    expect(rootLayout).toMatch(/themeColor:\s*"#000000"/);
  });
});

describe("round-18 ⑦ the helper's source contract", () => {
  it("site.ts exports breadcrumbJsonLd with the route union \"/login\" | \"/signup\" | \"/reset-password\" (round-26: the third carrier)", () => {
    expect(siteLib).toMatch(
      /export function breadcrumbJsonLd\(\s*route:\s*"\/login"\s*\|\s*"\/signup"\s*\|\s*"\/reset-password",?\s*\)/,
    );
    // the reset crumb name mirrors the platform's hyphen-to-space face
    // (live-probed: "reset password"; /login and /signup verbatim)
    expect(siteLib).toMatch(/"\/reset-password"\s*\?\s*"reset password"/);
  });
});
