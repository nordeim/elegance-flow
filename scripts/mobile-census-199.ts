// Session-199 round-8 mobile-menu census (the operator's standing emphasis):
// the live LINK-RIDE on BOTH apps at 390×844 — toggle open → panel face
// (links + CTA, order) → a link click navigates the anchor AND closes the
// panel → the aria-expanded cycle. Complements drift-199.ts's static DOM
// face with the behavior face. Run: bun scripts/mobile-census-199.ts
import { chromium } from "@playwright/test";

const OURS = "http://localhost:3000";
const REF = "https://colossal-elevate-service-flow.base44.app";

type Ride = {
  toggleLabel: string | null;
  panelLinks: string[];          // panel nav links in DOM order
  panelCta: string | null;       // the panel's amber CTA
  expandedAfterOpen: string | null;
  hashAfterRide: string;         // location.hash after clicking the About link
  panelClosedAfterRide: boolean; // the panel's links no longer visible
  expandedAfterRide: string | null;
};

async function ride(url: string): Promise<Ride> {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const toggle = page.locator("header button").first();
  const toggleLabel = await toggle.getAttribute("aria-label");
  await toggle.click();
  await page.waitForTimeout(600);

  const face = await page.evaluate(() => {
    const txt = (el: Element | null) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();
    const navs = [...document.querySelectorAll("header nav, header div")].filter((n) => {
      const r = n.getBoundingClientRect();
      const s = getComputedStyle(n as HTMLElement);
      return r.height > 40 && s.visibility !== "hidden" && txt(n).includes("About");
    });
    const panel = navs[0];
    const links = panel
      ? [...panel.querySelectorAll("a")].map((a) => txt(a))
      : [];
    const cta = panel
      ? ([...panel.querySelectorAll("a")].map((a) => txt(a)).find((t) => t.toLowerCase().includes("touch")) ?? null)
      : null;
    return { links, cta };
  });
  const expandedAfterOpen = await toggle.getAttribute("aria-expanded");

  // The link-ride: click the About link — visible-only (the desktop nav's
  // copy is display:none at 390; skill §14's responsive-DOM pattern).
  const about = page
    .locator("header a")
    .filter({ hasText: "About" })
    .filter({ visible: true })
    .first();
  await about.click();
  await page.waitForTimeout(900);

  const after = await page.evaluate(() => {
    const txt = (el: Element | null) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();
    const navs = [...document.querySelectorAll("header nav, header div")].filter((n) =>
      txt(n).includes("About")
    );
    const stillVisible = navs.some((n) => {
      const r = n.getBoundingClientRect();
      return r.height > 40 && getComputedStyle(n as HTMLElement).visibility !== "hidden";
    });
    return { hash: location.hash, panelClosed: !stillVisible };
  });
  const expandedAfterRide = await toggle.getAttribute("aria-expanded");

  await browser.close();
  return {
    toggleLabel,
    panelLinks: face.links,
    panelCta: face.cta,
    expandedAfterOpen,
    hashAfterRide: after.hash,
    panelClosedAfterRide: after.panelClosed,
    expandedAfterRide,
  };
}

const [ref, ours] = await Promise.all([ride(REF), ride(OURS)]);
console.log("REF :", JSON.stringify(ref, null, 1));
console.log("OURS:", JSON.stringify(ours, null, 1));

const out: string[] = [];
const cmp = (label: string, a: unknown, b: unknown) => {
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    out.push(`${label}: REF ${JSON.stringify(a)} vs OURS ${JSON.stringify(b)}`);
  }
};
cmp("panelLinks", ref.panelLinks, ours.panelLinks);
cmp("panelCta", ref.panelCta, ours.panelCta);
cmp("hashAfterRide", ref.hashAfterRide, ours.hashAfterRide);
cmp("panelClosedAfterRide", ref.panelClosedAfterRide, ours.panelClosedAfterRide);

const rideOk = ours.hashAfterRide === ref.hashAfterRide && ours.panelClosedAfterRide && ref.panelClosedAfterRide;
const panelOk = JSON.stringify(ref.panelLinks) === JSON.stringify(ours.panelLinks) && ref.panelCta === ours.panelCta;
// The sole documented delta: OUR toggle carries aria-expanded (false → true → false);
// the reference's carries none — the invisible a11y superset.
const a11yDelta =
  ours.expandedAfterOpen === "true" && ref.expandedAfterOpen === null &&
  ours.expandedAfterRide === "false";

console.log(
  rideOk && panelOk && a11yDelta
    ? "MOBILE-MENU CENSUS: byte-equivalent on both apps — same links + CTA, link-ride navigates AND closes; the sole delta OUR aria-expanded (the documented a11y superset)"
    : `MOBILE-MENU CENSUS: DELTAS — ${out.join("; ") || "a11y cycle unexpected"}`
);
