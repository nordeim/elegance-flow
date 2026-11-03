// Session-199 round-4 drift probe: the reference's CONTENT face —
// text landmarks + the mobile menu's open DOM (aria-expanded, panel
// structure, link order) — beyond the parity script's computed-style
// face. Diffs the live reference against OUR dev build (:3000).
//
// Run: bun scripts/drift-199.ts   (expects our dev server on :3000)
import { chromium } from "@playwright/test";

const OURS = "http://localhost:3000";
const REF = "https://colossal-elevate-service-flow.base44.app";

type Face = {
  title: string;
  navLinks: string[];        // header nav: text -> href
  ctaText: string;           // header CTA
  h1: string;                // hero h1 with span breaks
  eyebrows: string[];        // section eyebrows in DOM order
  h2s: string[];             // section h2s in DOM order
  serviceTitles: string[];   // the four service cards
  stats: string[];           // the three stat numbers
  filterChips: string[];     // work filters in DOM order
  mobileToggle: { expanded: boolean | null; label: string | null };
  mobilePanel: { visible: boolean; links: string[]; cta: string | null } | null;
};

async function face(url: string, w: number, h: number): Promise<Face> {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const base: Face = await page.evaluate(() => {
    const txt = (el: Element | null) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();
    const nav = [...document.querySelectorAll("header nav a")].map((a) => `${txt(a)} -> ${(a as HTMLAnchorElement).getAttribute("href")}`);
    const cta = [...document.querySelectorAll("header a")].filter((a) => !a.closest("nav")).map((a) => txt(a)).find((t) => t.length > 0) ?? "";
    const eyebrows = [...document.querySelectorAll("p")].filter((p) => /tracking-\[0\.3em\]|tracking-\[0\.2em\]/.test(p.className)).map((p) => txt(p));
    const h2s = [...document.querySelectorAll("h2")].map((h) => txt(h));
    const serviceTitles = [...document.querySelectorAll("section h3")].map((s) => txt(s));
    const stats = [...document.querySelectorAll("span,div,p")].filter((e) => /^(50\+|5|100%)$/.test(txt(e))).map((e) => txt(e));
    const chips = [...document.querySelectorAll("button")].filter((b) => /tracking-widest/.test(b.className) && txt(b).length > 0 && txt(b).length < 20).map((b) => txt(b));
    const toggle = document.querySelector('header button[aria-label], header button');
    return {
      title: document.title,
      navLinks: nav,
      ctaText: cta,
      h1: txt(document.querySelector("h1")),
      eyebrows,
      h2s,
      serviceTitles,
      stats,
      filterChips: chips,
      mobileToggle: {
        expanded: toggle ? toggle.getAttribute("aria-expanded") === "true" : null,
        label: toggle ? toggle.getAttribute("aria-label") : null,
      },
      mobilePanel: null,
    };
  });

  // The mobile menu face — only meaningful at phone width: open it.
  if (w <= 480) {
    const toggle = page.locator("header button").first();
    if (await toggle.count()) {
      await toggle.click();
      await page.waitForTimeout(600);
      base.mobilePanel = await page.evaluate(() => {
        const txt = (el: Element | null) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();
        // the panel: the nav list that becomes visible after the toggle
        const navs = [...document.querySelectorAll("header nav, header div")].filter((n) => {
          const r = n.getBoundingClientRect();
          const s = getComputedStyle(n as HTMLElement);
          return r.height > 40 && s.visibility !== "hidden" && txt(n).includes("About");
        });
        const panel = navs[0];
        if (!panel) return null;
        const links = [...panel.querySelectorAll("a")].map((a) => `${txt(a)} -> ${(a as HTMLAnchorElement).getAttribute("href")}`);
        const cta = [...panel.querySelectorAll("a")].map((a) => txt(a)).find((t) => t.toLowerCase().includes("touch")) ?? null;
        return { visible: true, links, cta };
      });
    }
  }

  await browser.close();
  return base;
}

function diff(label: string, a: unknown, b: unknown, path: string, out: string[]) {
  const ja = JSON.stringify(a);
  const jb = JSON.stringify(b);
  if (ja !== jb) out.push(`${label} ${path}:\n  REF : ${ja}\n  OURS: ${jb}`);
}

const [ref, ours] = await Promise.all([face(REF, 390, 844), face(OURS, 390, 844)]);
const out: string[] = [];
diff("[390]", ref.title, ours.title, "title", out);
diff("[390]", ref.navLinks, ours.navLinks, "navLinks", out);
diff("[390]", ref.ctaText, ours.ctaText, "ctaText", out);
diff("[390]", ref.h1, ours.h1, "h1", out);
diff("[390]", ref.eyebrows, ours.eyebrows, "eyebrows", out);
diff("[390]", ref.h2s, ours.h2s, "h2s", out);
diff("[390]", ref.serviceTitles, ours.serviceTitles, "serviceTitles", out);
diff("[390]", ref.stats, ours.stats, "stats", out);
diff("[390]", ref.filterChips, ours.filterChips, "filterChips", out);
diff("[390]", ref.mobileToggle, ours.mobileToggle, "mobileToggle", out);
diff("[390]", ref.mobilePanel, ours.mobilePanel, "mobilePanel(open)", out);

if (out.length === 0) {
  console.log("[390] CONTENT + MOBILE-MENU FACE: NO DRIFT — the reference matches our byte-mirror");
} else {
  console.log(`[390] DRIFT DETECTED — ${out.length} field(s):`);
  for (const line of out) console.log(line);
}
