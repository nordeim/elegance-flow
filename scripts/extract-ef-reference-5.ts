// Session-199 reference re-extraction, probe 5: the section inner wrappers
// (services header, testimonials header, about columns) + the location row.
//
// Run: bun scripts/extract-ef-reference-5.ts
import { chromium } from "@playwright/test";

const REF = "https://colossal-elevate-service-flow.base44.app";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(REF, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const r = await page.evaluate(() => {
    const trim = (html: string) => html.replace(/>\s+</g, "><").replace(/\s+style="[^"]*"/g, "");
    const sec = (id: string, n: number) => {
      const el = document.getElementById(id);
      return trim(el?.innerHTML ?? "").slice(0, n);
    };
    return {
      services: sec("services", 1000),
      testi: sec("testimonials", 500),
      about: sec("about", 1400),
      // the location row (third contact row)
      location: (() => {
        const rows = document.querySelectorAll("#contact .flex.items-center.gap-4");
        const loc = rows[rows.length - 1];
        return loc ? trim((loc as HTMLElement).outerHTML) : "";
      })(),
    };
  });
  console.log(JSON.stringify(r, null, 1).slice(0, 6000));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
