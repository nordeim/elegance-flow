import { chromium } from "@playwright/test";
const REF = "https://colossal-elevate-service-flow.base44.app";
async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(REF, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("#services .grid > div"));
    return cards.map((c) => ({
      card: c.className,
      kids: Array.from(c.children).map((k) => ({
        tag: k.tagName.toLowerCase(),
        classes: k.className,
        style: k.getAttribute("style"),
        color: getComputedStyle(k).color,
        text: (k.textContent ?? "").slice(0, 30),
      })),
      priceSpan: (() => {
        const el = Array.from(c.querySelectorAll("span,p,div")).find((n) => /From \$/.test(n.textContent ?? ""));
        return el ? { classes: el.className, style: el.getAttribute("style"), color: getComputedStyle(el).color } : null;
      })(),
    }));
  });
  console.log(JSON.stringify(r.slice(0, 2), null, 1));
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
