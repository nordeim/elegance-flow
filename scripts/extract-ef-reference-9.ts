import { chromium } from "@playwright/test";
const REF = "https://colossal-elevate-service-flow.base44.app";
async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(REF, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const cards = document.querySelectorAll("#services .grid > div");
    const featured = cards[1] as HTMLElement;
    const p = featured.querySelector("p");
    const span = featured.querySelector("div:last-child span");
    return {
      featuredHTML: featured.innerHTML.replace(/>\s+</g, "><").replace(/<path[^>]*>/g, "<path…/>").slice(0, 600),
      pClasses: p?.className,
      pColor: p ? getComputedStyle(p).color : "",
      spanClasses: span?.className,
      spanColor: span ? getComputedStyle(span).color : "",
    };
  });
  console.log(JSON.stringify(r, null, 1));
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
