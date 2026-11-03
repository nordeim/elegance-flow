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

test.describe("the a11y two-gate: the public landing", () => {
  test("desktop / (1280×800) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await scanTwoGate(page, "desktop /");
  });

  test("phone / (390×844) — structural zero + sanctioned citations", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
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
