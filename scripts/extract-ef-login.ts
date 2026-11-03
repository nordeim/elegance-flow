import { chromium } from "@playwright/test";
const REF = "https://colossal-elevate-service-flow.base44.app/login";
async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(REF, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const divider = Array.from(document.querySelectorAll("span")).find((n) => /^or$/i.test((n.textContent ?? "").trim()));
    const h1 = document.querySelector("h1");
    return {
      dividerText: divider?.textContent,
      h1: h1?.textContent,
      title: document.title,
    };
  });
  console.log(JSON.stringify(r));
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
