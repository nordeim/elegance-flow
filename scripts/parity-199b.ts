import { chromium } from "@playwright/test";
const REF = "https://colossal-elevate-service-flow.base44.app";
async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(REF, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const r = await page.evaluate(() => {
    const h1 = document.querySelector("h1")!;
    const cs = getComputedStyle(h1);
    const h2 = document.querySelector("#about h2")!;
    const cs2 = getComputedStyle(h2);
    // walk the stylesheet for the leading-\[0\.9\] rule
    let rule = null;
    for (const sheet of Array.from(document.styleSheets)) {
      let rules: CSSRuleList;
      try { rules = sheet.cssRules; } catch { continue; }
      for (const r2 of Array.from(rules)) {
        const style = (r2 as CSSStyleRule).style;
        if (style && style.lineHeight && (r2 as CSSStyleRule).selectorText?.includes("leading")) {
          const sel = (r2 as CSSStyleRule).selectorText;
          if (sel.includes("0\\.9") || sel.includes("0.9")) rule = { sel, lh: style.lineHeight };
        }
      }
    }
    return {
      h1Classes: h1.className,
      h1LH: cs.lineHeight,
      h1FS: cs.fontSize,
      h2LH: cs2.lineHeight,
      h2FS: cs2.fontSize,
      leadingRule: rule,
    };
  });
  console.log(JSON.stringify(r, null, 1));
  await browser.close();
}
main().catch((e) => { console.error(e); process.exit(1); });
