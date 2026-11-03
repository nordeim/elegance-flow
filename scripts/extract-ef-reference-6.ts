import { chromium } from "@playwright/test";
const REF = "https://colossal-elevate-service-flow.base44.app";
async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(REF, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const trim = (h: string) => h.replace(/>\s+</g, "><").replace(/\s+style="[^"]*"/g, "");
    const headerRow = document.querySelector("#portfolio .flex.flex-col");
    const eyebrow = document.querySelector("#portfolio .tracking-\\[0\\.3em\\]");
    const filters = document.querySelector("#portfolio .flex-wrap");
    // third selector avatar
    const sels = Array.from(document.querySelectorAll("#testimonials button")).map((b) => ({
      name: (b.querySelector(".font-bold") as HTMLElement)?.className ?? "",
      img: (b.querySelector("img") as HTMLImageElement)?.src ?? "",
    }));
    return {
      headerRowHTML: headerRow ? trim((headerRow as HTMLElement).outerHTML).slice(0, 900) : "",
      eyebrowClasses: eyebrow?.className ?? "",
      eyebrowColor: eyebrow ? getComputedStyle(eyebrow).color : "",
      filterWrap: filters ? (filters as HTMLElement).className : "",
      sels,
    };
  });
  console.log(JSON.stringify(r, null, 1));
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
