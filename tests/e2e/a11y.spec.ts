import { expect, test } from "@playwright/test";

// Session-199 (the domain transformation): THE A11Y TWO-GATE for the
// EleganceFlow surfaces — carried from the session-171 doctrine
// (web-app-foundation §8.3):
//
//   1. STRUCTURAL violations must be ZERO — button-name, link-name,
//      label, list, heading-order, every rule outside the sanctioned
//      register. Our own supersets ride here: every form field is
//      id/htmlFor-bound (the reference ships unassociated labels), the
//      mobile toggle carries aria-expanded, the icon-only delete carries
//      its aria-label, the two-step confirm is a real named button.
//
//   2. COLOR-CONTRAST nodes must cite the SANCTIONED register — the
//      reference's OWN byte-parity palette, every matcher carrying its
//      live-verified citation (the six DOM probes of the reference
//      audit, 2026-11-03). Fixing these would break visual parity with
//      the reference's rendered face; the drawer precedent runs the
//      other way for NAMEABLE controls, but color parity is the
//      reference's own design decision.
//
// OUR OWN surfaces (the inbox, the shell) carry NO sanctioned matchers:
// they pass AA outright (amber-700 inks, zinc-500 muted text, white/50
// footer — the calendar-chip lesson applied at design time).
//
// The axe engine rides the DECLARED devDep (axe-core ^4.13.0).

const AXE_PATH = "node_modules/axe-core/axe.min.js";

type Violation = { id: string; targets: string[] };

// The SANCTIONED register — rule → matcher list, every matcher carrying
// its citation. A flagged node matching NONE of them REDs the gate.
// The match arms are plain SUBSTRING tests (the s171 doctrine).
const SANCTIONED: Record<string, Array<{ any: string[]; cite: string }>> = {
  "color-contrast": [
    {
      // the amber eyebrow family (text-amber-500 on white AND zinc-950
      // sections) — the reference's own accent, byte-verified on every
      // section header (probe-3/4/5: rgb(245,158,11) inline on each)
      any: ["text-amber-500", "text-\\[0\\.3em\\]"],
      cite: "the amber eyebrow micro-labels — the reference's own accent on every section header",
    },
    {
      // the about stat values (amber-500 at text-3xl font-black on
      // white — the reference's inline rgb(245,158,11) on all three)
      any: ["text-3xl"],
      cite: "the about stat values — the reference's own amber-on-white display figures",
    },
    {
      // the muted-ink family on zinc-950 — white/20, /30, /40 (the
      // SCROLL label, the footer socials + copyright, the testimonial
      // roles + the inactive selector names) — the reference's own
      // opacity ladder, byte-identical classes. The "mt-0" arm covers
      // axe's shortest-unique-selector form for the testimonial role
      // line (text-white/40 text-xs mt-0.5 — the ONLY mt-0.5 on the page).
      any: ["text-white\\/20", "text-white\\/30", "text-white\\/40", "mt-0"],
      cite: "the white/20-40 muted-ink ladder on zinc-950 — the reference's own classes",
    },
    {
      // the INACTIVE filter chips (zinc-500 on zinc-100 — the reference's
      // own inactive face, probe-2's computed styles: rgb(113,113,122) on
      // rgb(244,244,245) = 4.39:1 per axe's live report (a hair under the
      // 4.5 small-text floor; repainting it would change the reference's
      // designed chip pair)
      any: ["bg-zinc-100.py-2.px-5"],
      cite: "the inactive filter chips (zinc-500 on zinc-100) — the reference's own face at 4.39:1",
    },
    {
      // the FEATURED Design & Web card's body ink (zinc-900/70 on the
      // amber-500 background — probe-9's byte extraction: the reference's
      // own featured-card body, blended #5a4016 on #f59e0b = 4.48:1 per
      // axe's live report, under the 4.5 small-text floor; fixing it would
      // repaint the reference's designed face)
      any: ["text-zinc-900\\/70"],
      cite: "the featured service card's body ink (zinc-900/70 on amber) — the reference's own face",
    },
    {
      // the zinc-400 micro-labels + muted rows on white (the contact
      // form labels — the reference ships them unassociated; ours bind
      // id/htmlFor, so axe emits the label[for="inquiry-…"] selector
      // form — both arms carry the citation — the stat labels, the
      // contact icons' muted siblings) — the reference's own zinc-400 on
      // white
      any: ["text-zinc-400", "label[for=\"inquiry-"],
      cite: "the zinc-400 micro-labels on white — the reference's own form-label ink",
    },
  ],
};

async function scanTwoGate(page: import("@playwright/test").Page, label: string) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1200);
  await page.addScriptTag({ path: AXE_PATH });
  const violations = await page.evaluate(async () => {
    const axe = (window as unknown as {
      axe: { run: (o: object) => Promise<{ violations: Array<{ id: string; nodes: Array<{ target: string[] }> }> }> };
    }).axe;
    const r = await axe.run({
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    });
    return r.violations.map((v) => ({
      id: v.id,
      targets: v.nodes.map((n) => n.target.join(" ")),
    }));
  });

  // GATE 1 — structural: every rule OUTSIDE the sanctioned register
  // must be ZERO.
  const structural = violations.filter((v: Violation) => !SANCTIONED[v.id]);
  expect(
    structural.map((v: Violation) => `${v.id}: ${v.targets.slice(0, 3).join(" || ")}`),
    `[${label}] STRUCTURAL violations must be zero`,
  ).toEqual([]);

  // GATE 2 — the sanctioned rules: every flagged node must match a
  // sanctioned matcher (a NEW unsanctioned contrast regression REDs here).
  for (const v of violations) {
    const matchers = SANCTIONED[v.id];
    for (const target of v.targets) {
      const sanctioned = matchers.some((m) => m.any.some((a) => target.includes(a)));
      expect(
        sanctioned,
        `[${label}] ${v.id} node "${target}" cites no sanctioned matcher`,
      ).toBe(true);
    }
  }
}

// ---------------------------------------------------------------------------
// The registrations (one test() per surface × width — the granular names
// name the failing surface directly).
// ---------------------------------------------------------------------------

/**
 * Round-28 (F-28a): the landing's below-fold sections rest at opacity 0
 * (the reveal family — the reference's own motion identity), and axe-core
 * SKIPS opacity-0 nodes for color-contrast (live-proven on a fixture:
 * an opacity:0 low-contrast <p> is never flagged). The landing audits
 * WARM the reveals first — a scroll ride through the page and back — so
 * the audit coverage keeps every section visible and the sanctioned
 * citation register stays intact (the a11y bar never regresses; the
 * reveal is the reference's byte-parity face, not an a11y regression).
 */
async function warmReveals(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    // ride the page bottom and back — one-shot reveals stay revealed
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

test.describe("the a11y two-gate: the public landing", () => {
  test("desktop / (1280×800) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await warmReveals(page);
    await scanTwoGate(page, "desktop /");
  });

  test("phone / (390×844) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await warmReveals(page);
    await scanTwoGate(page, "phone /");
  });
});

test.describe("the a11y two-gate: the auth card", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("desktop /login (1280×800) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/login");
    await scanTwoGate(page, "desktop /login");
  });

  test("phone /login (390×844) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/login");
    await scanTwoGate(page, "phone /login");
  });
});

test.describe("the a11y two-gate: the superset workspace", () => {
  test("desktop /dashboard (1280×800) — AA outright, NO sanctioned matchers apply", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await scanTwoGate(page, "desktop /dashboard");
  });

  test("phone /dashboard (390×844) — AA outright, NO sanctioned matchers apply", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dashboard");
    await scanTwoGate(page, "phone /dashboard");
  });
});

test.describe("round-32: the forced-colors a11y sweep (the superset's last un-scanned condition)", () => {
  // F-32d (the session-56 candidate 3): the round-31 spot-check read the
  // /dashboard's faces under forcedColors but never SCANNED it. The
  // round-32 live sweep (axe-core 4.13 injected under forcedColors
  // active) found ZERO violations — structural AND contrast clean under
  // the system-palette collapse. This leg pins that census on the
  // standalone artifact: the superset's own surface stays fully legible
  // under the browser's forced-colors mode.
  test("desktop /dashboard under forcedColors active — structural zero AND contrast zero (the F-32d census)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ forcedColors: "active" });
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(1200);
    // the declared devDep engine, same as the two-gate scans (never a CDN)
    await page.addScriptTag({ path: AXE_PATH });
    const violations = await page.evaluate(async () => {
      const axe = (
        window as unknown as {
          axe: { run: (o: object) => Promise<{ violations: Array<{ id: string; nodes: unknown[] }> }> };
        }
      ).axe;
      const r = await axe.run({
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      });
      return r.violations.map((v) => ({ id: v.id, count: v.nodes.length }));
    });
    // the F-32d census: the violations array is EMPTY under the
    // system-palette collapse (the amber-700/zinc-600 ink family and
    // the explicit-surface construction survive Canvas/CanvasText
    // legibly — no sanctioned register needed, the sweep is outright)
    expect(violations, "the /dashboard forced-colors a11y sweep must be clean").toEqual([]);
  });
});

test.describe("round-33: the forced-colors landing-register census (the session-58 candidate 1)", () => {
  // F-33b (the positive census, live-probed 2026-11-06 both apps): under
  // forcedColors active the landing's axe color-contrast citations
  // COLLAPSE from the 16 sanctioned screen nodes to exactly 3 — the
  // amber-500 eyebrow family (the hero, services and testimonials
  // section headers, the zinc-950-section eyebrows; the below-fold
  // content is reveal-hidden at rest, so the mount-visible headers are
  // what the sweep sees). The mechanism: under the collapse every
  // eyebrow computes CanvasText rgb(0,0,0) ink over Chromium's
  // forced-colors background serialization, which axe cannot resolve to
  // a solid backdrop — the flag is the browser-emulation artifact, not
  // a painted divergence. The REFERENCE's own sweep under the same
  // condition flags the SAME three elements (the F-31c class-literal
  // decode: its eyebrows carry no text-amber-500 class) plus its
  // unassociated select (OURS binds id/htmlFor — the standing
  // superset). The register's existing amber-eyebrow arm covers the
  // collapsed face; this leg pins the census SHAPE so the posture can
  // never silently change.
  test("desktop / under forcedColors active — structural zero + the contrast census collapses to the amber-eyebrow family", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ forcedColors: "active" });
    await page.goto("/");
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(1200);
    // the declared devDep engine, same as the two-gate scans (never a CDN)
    await page.addScriptTag({ path: AXE_PATH });
    const violations = await page.evaluate(async () => {
      const axe = (
        window as unknown as {
          axe: {
            run: (o: object) => Promise<{
              violations: Array<{ id: string; nodes: Array<{ target: string[] }> }>;
            }>;
          };
        }
      ).axe;
      const r = await axe.run({
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      });
      return r.violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target.join(" ")),
      }));
    });
    // GATE 1 — structural: everything outside color-contrast must be
    // zero (the reference's own sweep carries a select-name violation
    // here — its unassociated contact select; OURS binds id/htmlFor,
    // the standing superset, so ours is clean)
    const structural = violations.filter((v) => v.id !== "color-contrast");
    expect(
      structural.map((v) => `${v.id}: ${v.targets.slice(0, 3).join(" || ")}`),
      "the landing forced-colors census: structural violations must be zero",
    ).toEqual([]);
    // GATE 2 — the census SHAPE: exactly the three zinc-950-section
    // eyebrows, every node citing the register's amber-eyebrow arm
    // (a NEW unsanctioned family under the collapse REDs here)
    const contrast = violations.find((v) => v.id === "color-contrast");
    expect(contrast, "the collapsed census carries the color-contrast rule").toBeDefined();
    expect(contrast?.targets, "the collapsed census is exactly the three amber eyebrows").toHaveLength(3);
    for (const target of contrast?.targets ?? []) {
      expect(
        target.includes("text-amber-500") || target.includes("0.3em"),
        `the collapsed node "${target}" cites no sanctioned matcher`,
      ).toBe(true);
    }
  });
});

test.describe("round-39: the combination-matrix census (the stack families, the full triple emulation)", () => {
  // F-39a/F-39b (live-probed 2026-11-08, both apps): the media-axis
  // COMBINATIONS no probe ever read. Under the pairwise
  // forced+scheme-dark the axe color-contrast artifact family EXPLODES
  // beyond every recorded per-axis constant — /login 11 nodes
  // (BYTE-IDENTICAL on both apps: the h1, the subtitle, the Google
  // span, the divider, both labels, both inputs, both bottom buttons +
  // the Sign up span — the reference's own face), the landing 16 (the
  // at-screen count with the eyebrow→hero swap), OUR /dashboard 22.
  // The MECHANISM (the round-33 F-33b artifact class extended): under
  // forced+scheme-dark text computes CanvasText WHITE while
  // backgrounds serialize rgba(0,0,0,0)/rgba(0,0,0,0.5/0.7) — axe
  // cannot resolve the backdrop and flags the pair. The RENDER is
  // pixel-verified legible (CanvasText-on-Canvas 21:1). The per-axis
  // decomposition (live, /login): default ZERO · reduce only ZERO ·
  // scheme-dark only ZERO · forced only (light) ZERO — the finding is
  // COMBINATION-ONLY. These legs pin the family SHAPES as the
  // artifact's census baseline: a moved count REDs the pin and forces
  // a conscious re-record (the round-33 precedent's census-safety
  // shape). The emulation rides ALL THREE axes in ONE call (never a
  // pairwise-only stack — the unread-axis class this round closes).
  const STACK = { forcedColors: "active", colorScheme: "dark", reducedMotion: "reduce" } as const;

  async function stackScan(page: import("@playwright/test").Page, route: string) {
    await page.emulateMedia(STACK);
    await page.goto(route);
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(1200);
    await page.addScriptTag({ path: AXE_PATH });
    return page.evaluate(async () => {
      const axe = (
        window as unknown as {
          axe: { run: (o: object) => Promise<{ violations: Array<{ id: string; nodes: Array<{ target: string[] }> }> }> };
        }
      ).axe;
      const r = await axe.run({
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      });
      return r.violations.map((v) => ({ id: v.id, count: v.nodes.length, targets: v.nodes.map((n) => n.target.join(" ")) }));
    });
  }

  test("desktop /login under the full triple stack — the combination family shape: color-contrast(11), structural zero", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const violations = await stackScan(page, "/login");
    // GATE 1 — structural: everything outside the artifact rule is zero
    const structural = violations.filter((v) => v.id !== "color-contrast");
    expect(structural, "the login stack census: structural violations must be zero").toEqual([]);
    // GATE 2 — the census SHAPE: exactly the 11-node combination family
    const contrast = violations.find((v) => v.id === "color-contrast");
    expect(contrast, "the stack census carries the color-contrast rule").toBeDefined();
    expect(contrast?.count, "the login's combination family is exactly 11 nodes (the artifact baseline)").toBe(11);
  });

  test("desktop / under the full triple stack — the combination family shape: color-contrast(16), structural zero", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const violations = await stackScan(page, "/");
    const structural = violations.filter((v) => v.id !== "color-contrast");
    expect(structural, "the landing stack census: structural violations must be zero").toEqual([]);
    const contrast = violations.find((v) => v.id === "color-contrast");
    expect(contrast, "the stack census carries the color-contrast rule").toBeDefined();
    expect(contrast?.count, "the landing's combination family is exactly 16 nodes (the at-screen count, the eyebrow→hero swap)").toBe(16);
  });

  test("desktop /dashboard under the full triple stack — the combination family shape: color-contrast(22) + the render-legibility proof", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    const violations = await stackScan(page, "/dashboard");
    const structural = violations.filter((v) => v.id !== "color-contrast");
    expect(structural, "the dashboard stack census: structural violations must be zero").toEqual([]);
    const contrast = violations.find((v) => v.id === "color-contrast");
    expect(contrast, "the stack census carries the color-contrast rule").toBeDefined();
    expect(contrast?.count, "the dashboard's combination family is exactly 22 nodes (the superset's own artifact baseline)").toBe(22);
    // THE RENDER-LEGIBILITY PROOF (the artifact-class classification):
    // under the stack the h1 computes CanvasText WHITE over the black
    // canvas — the pair the browser actually paints at 21:1 (the
    // flags are the axe backdrop-resolution math, never the paint)
    const paint = await page.evaluate(() => {
      const h1 = document.querySelector("h1") as HTMLElement | null;
      const body = document.querySelector("body");
      return {
        h1Color: h1 ? getComputedStyle(h1).color : "MISSING",
        bodyBg: body ? getComputedStyle(body).backgroundColor : "MISSING",
      };
    });
    expect(paint.h1Color, "the stack's h1 ink is the white CanvasText").toBe("rgb(255, 255, 255)");
    expect(paint.bodyBg, "the stack's canvas is the opaque black").toBe("rgb(0, 0, 0)");
  });
});
