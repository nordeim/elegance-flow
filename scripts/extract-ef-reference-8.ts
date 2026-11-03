import { chromium } from "@playwright/test";
const REF = "https://colossal-elevate-service-flow.base44.app";
async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(REF, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const card = document.querySelector("#services .grid > div");
    return (card as HTMLElement).innerHTML.replace(/>\s+</g, "><").replace(/<path[^>]*>/g, "<path…/>").replace(/<circle[^>]*>/g, "<circle…/>").slice(0, 1200);
  });
  console.log(r);
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
