// Session-199 reference re-extraction, probe 2: svg class ATTRIBUTES (not
// .className), the mobile disclosure panel (outside the nav row), the
// featured service card's computed bg, filter active colors, the about
// frame's border color, hero icons, the scroll indicator.
//
// Run: bun scripts/extract-ef-reference-2.ts
import { chromium } from "@playwright/test";

const REF = "https://colossal-elevate-service-flow.base44.app";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(REF, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500); // let reveal animations settle

  const r1 = await page.evaluate(() => {
    const out: Record<string, unknown> = {};

    // All svgs per section with their class ATTR
    const svc = document.querySelectorAll("#services .grid > div");
    out.serviceCards = Array.from(svc).map((c) => {
      const div = c as HTMLElement;
      const svg = c.querySelector("svg");
      const price = Array.from(c.querySelectorAll("p,div,span")).find((n) => /From \$/.test(n.textContent ?? ""));
      return {
        classes: div.className,
        style: div.getAttribute("style"),
        svgClass: svg?.getAttribute("class") ?? "",
        priceClass: price?.className ?? "",
        priceStyle: price?.getAttribute("style"),
      };
    });

    // Filter buttons: classes + computed colors
    out.filters = Array.from(document.querySelectorAll("button"))
      .filter((b) => ["all", "branding", "web", "photography"].includes((b.textContent ?? "").toLowerCase()))
      .map((b) => {
        const cs = getComputedStyle(b);
        return {
          text: b.textContent,
          classes: b.className,
          style: b.getAttribute("style"),
          bg: cs.backgroundColor,
          color: cs.color,
        };
      });

    // Testimonial selector buttons active/inactive
    out.testiSel = Array.from(document.querySelectorAll("#testimonials button")).map((b) => {
      const cs = getComputedStyle(b);
      return {
        classes: b.className,
        style: b.getAttribute("style"),
        borderColor: cs.borderLeftColor,
        bg: cs.backgroundColor,
      };
    });

    // About frame border color + stats colors + eyebrow colors
    const frame = document.querySelector("#about [class*='-z-10']");
    if (frame) {
      const cs = getComputedStyle(frame);
      out.aboutFrame = { classes: frame.className, borderColor: cs.borderTopColor };
    }
    out.aboutStats = Array.from(document.querySelectorAll("#about .text-3xl")).map((n) => ({
      classes: n.className,
      style: n.getAttribute("style"),
      color: getComputedStyle(n).color,
    }));
    // Every element whose text is a short uppercase eyebrow — get its color
    out.eyebrows = Array.from(document.querySelectorAll("p"))
      .filter((n) => /^[A-Z ]{5,20}$/.test((n.textContent ?? "").trim()) && n.children.length === 0)
      .map((n) => ({
        text: (n.textContent ?? "").trim(),
        classes: n.className,
        style: n.getAttribute("style"),
        color: getComputedStyle(n).color,
      }));

    // Hero CTAs: inner svgs + styles
    out.heroCtas = Array.from(document.querySelectorAll("a")).filter((a) =>
      /start a project|see our work/i.test(a.textContent ?? ""),
    ).map((a) => ({
      text: a.textContent,
      classes: a.className,
      style: a.getAttribute("style"),
      svgClass: a.querySelector("svg")?.getAttribute("class") ?? "",
      svgHTML: a.querySelector("svg")?.outerHTML.slice(0, 220) ?? "",
    }));

    // SCROLL indicator — search case-insensitive across all elements
    const all = Array.from(document.querySelectorAll("*"));
    const scrollEl = all.find((n) => n.children.length === 0 && /scroll/i.test(n.textContent ?? ""));
    if (scrollEl) {
      let chain = "";
      let cur: Element | null = scrollEl;
      for (let i = 0; i < 3 && cur; i++) {
        chain += ` <${cur.tagName.toLowerCase()} class="${cur.getAttribute("class") ?? ""}" style="${cur.getAttribute("style") ?? ""}">`;
        cur = cur.parentElement;
      }
      out.scrollIndicator = chain;
    }

    // Contact icon boxes + svgs
    out.contactRows = Array.from(document.querySelectorAll("#contact .w-10")).map((n) => ({
      boxClasses: n.className,
      svgClass: n.querySelector("svg")?.getAttribute("class") ?? "",
    }));

    // The select chevron svg + parent
    const sel = document.querySelector("#contact select");
    if (sel?.parentElement) {
      out.selectWrap = {
        parentClasses: sel.parentElement.className,
        chev: Array.from(sel.parentElement.querySelectorAll("svg")).map((s) => s.getAttribute("class") ?? ""),
      };
    }

    // Footer socials
    out.footer = Array.from(document.querySelectorAll("footer a")).map((a) => ({
      text: (a.textContent ?? "").trim().slice(0, 30),
      classes: a.className,
      svg: a.querySelector("svg")?.getAttribute("class") ?? "",
      href: a.getAttribute("href"),
    }));

    // Hero image attrs + section wrappers
    const heroImg = document.querySelector("img");
    out.heroImg = heroImg
      ? {
          classes: heroImg.className,
          src: (heroImg as HTMLImageElement).src,
          loading: heroImg.getAttribute("loading"),
          fetchpriority: heroImg.getAttribute("fetchpriority"),
          alt: heroImg.getAttribute("alt"),
        }
      : null;

    // Section wrappers: the alternating backgrounds
    out.sections = ["about", "services", "portfolio", "testimonials", "contact"].map((id) => ({
      id,
      classes: document.getElementById(id)?.className ?? "",
    }));

    return out;
  });
  console.log(JSON.stringify(r1, null, 1).slice(0, 12000));

  // ---- mobile: the full header innerHTML when open --------------------------------
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mob.goto(REF, { waitUntil: "networkidle" });
  await mob.waitForTimeout(600);
  await mob.getByRole("button", { name: /open menu/i }).click();
  await mob.waitForTimeout(500);
  const openHTML = await mob.evaluate(() => document.querySelector("header")?.innerHTML ?? "");
  console.log("=== HEADER OPEN HTML ===");
  console.log(openHTML.slice(0, 4000));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
