// Session-199 reference re-extraction, probe 4 (final): the contact form's
// inner structure, h2 span construction, eyebrow tags+colors, contact
// info-column links, hero content column order.
//
// Run: bun scripts/extract-ef-reference-4.ts
import { chromium } from "@playwright/test";

const REF = "https://colossal-elevate-service-flow.base44.app";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(REF, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const r = await page.evaluate(() => {
    const out: Record<string, unknown> = {};

    // h2 innerHTML (first two)
    out.h2html = Array.from(document.querySelectorAll("h2")).slice(0, 3).map((h) => h.innerHTML);

    // The eyebrow elements: find all elements whose computed letter-spacing is wide
    const all = Array.from(document.querySelectorAll("div,p,span"));
    const eyeb = all.filter((n) => {
      const t = (n.textContent ?? "").trim();
      return ["PREMIUM SERVICES", "ABOUT US", "WHAT WE DO", "OUR WORK", "GET IN TOUCH"].includes(t);
    });
    out.eyebrows = eyeb.map((n) => ({
      tag: n.tagName.toLowerCase(),
      text: (n.textContent ?? "").trim(),
      classes: n.className,
      style: n.getAttribute("style"),
      color: getComputedStyle(n).color,
      fontSize: getComputedStyle(n).fontSize,
    }));

    // Contact form innerHTML (structure only: strip long text)
    const form = document.querySelector("#contact form");
    out.formHTML = form?.innerHTML.replace(/>\s+</g, "><").slice(0, 2600) ?? "";

    // Contact info column: the rows after the paragraph
    const leftCol = document.querySelector("#contact .md\\:grid-cols-2 > div");
    out.contactLeftHTML = leftCol?.innerHTML.replace(/>\s+</g, "><").slice(0, 1800) ?? "";

    // Hero content column inner order (eyebrow → h1 → p → ctas)
    const heroCol = document.querySelector(".max-w-3xl");
    out.heroColHTML = heroCol?.innerHTML.replace(/>\s+</g, "><").slice(0, 1500) ?? "";

    // Testimonials quote column + selector column HTML
    const testiGrid = document.querySelector("#testimonials .grid");
    out.testiHTML = testiGrid?.innerHTML.replace(/>\s+</g, "><").slice(0, 2200) ?? "";

    return out;
  });
  console.log(JSON.stringify(r, null, 1).slice(0, 12000));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
