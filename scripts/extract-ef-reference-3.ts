// Session-199 reference re-extraction, probe 3: section grid containers,
// eyebrows, h2s, icon sizes, footer construction, form labels, inputs.
//
// Run: bun scripts/extract-ef-reference-3.ts
import { chromium } from "@playwright/test";

const REF = "https://colossal-elevate-service-flow.base44.app";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(REF, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const r = await page.evaluate(() => {
    const out: Record<string, unknown> = {};

    // All svg sizes per region
    out.svgSizes = Array.from(document.querySelectorAll("svg")).map((s) => ({
      w: s.getAttribute("width"),
      class: s.getAttribute("class"),
      region: s.closest("section")?.id ?? (s.closest("header") ? "header" : s.closest("footer") ? "footer" : "hero"),
    }));

    // All h2s
    out.h2s = Array.from(document.querySelectorAll("h2")).map((h) => ({
      text: (h.textContent ?? "").slice(0, 40),
      classes: h.className,
      style: h.getAttribute("style"),
    }));

    // The eyebrow paragraphs (first p in each section header)
    out.eyebrows = Array.from(document.querySelectorAll("p"))
      .filter((n) => {
        const t = (n.textContent ?? "").trim();
        return ["PREMIUM SERVICES", "ABOUT US", "WHAT WE DO", "OUR WORK", "GET IN TOUCH"].includes(t);
      })
      .map((n) => ({
        text: (n.textContent ?? "").trim(),
        classes: n.className,
        style: n.getAttribute("style"),
        color: getComputedStyle(n).color,
      }));

    // Section inner grids
    const pick = (sel: string) => (document.querySelector(sel) as HTMLElement)?.className ?? "";
    out.grids = {
      servicesGrid: pick("#services .grid"),
      portfolioGrid: pick("#portfolio .grid"),
      testiGrid: pick("#testimonials .grid"),
      contactGrid: pick("#contact .grid"),
      statsGrid: pick("#about .grid"),
      aboutGrid: pick("#about .md\\:grid-cols-2"),
    };

    // The work header row
    const workHeader = document.querySelector("#portfolio .flex");
    out.workHeader = workHeader ? (workHeader as HTMLElement).className : "";

    // Hero content wrapper + h1 classes + paragraph
    const h1 = document.querySelector("h1");
    out.hero = {
      h1Classes: h1?.className ?? "",
      h1Parent: (h1?.parentElement as HTMLElement)?.className ?? "",
      h1Grandparent: (h1?.parentElement?.parentElement as HTMLElement)?.className ?? "",
      h1GpParent: (h1?.parentElement?.parentElement?.parentElement as HTMLElement)?.className ?? "",
      heroSection: (document.querySelector("h1")?.closest("section") as HTMLElement)?.className ?? "",
      para: (h1?.parentElement?.querySelector("p") as HTMLElement)?.className ?? "",
      eyebrowClasses: (h1?.parentElement?.querySelector("p") as HTMLElement)?.previousElementSibling?.className ?? "",
      ctaRow: (h1?.parentElement?.parentElement?.querySelector(".flex") as HTMLElement)?.className ?? "",
    };

    // About paragraph + stats labels
    out.about = {
      para: (document.querySelector("#about p.text-zinc-500") as HTMLElement)?.className ?? "",
      statsLabel: (document.querySelector("#about .grid p") as HTMLElement)?.className ?? "",
      statsWrap: (document.querySelector("#about .grid")?.parentElement as HTMLElement)?.className ?? "",
      imageWrap: (document.querySelector("#about img")?.parentElement as HTMLElement)?.className ?? "",
    };

    // Testimonial quote + name + role
    out.testi = {
      quote: (document.querySelector("#testimonials blockquote, #testimonials .text-2xl") as HTMLElement)?.className ?? "",
      name: (document.querySelector("#testimonials .font-bold.text-sm") as HTMLElement)?.className ?? "",
      role: (document.querySelector("#testimonials .text-white\\/40") as HTMLElement)?.className ?? "",
      personRow: (document.querySelector("#testimonials .flex.items-center.gap-4") as HTMLElement)?.className ?? "",
      quoteIconWrap: (document.querySelector("#testimonials svg")?.parentElement as HTMLElement)?.className ?? "",
    };

    // Contact: labels, inputs, left column rows
    out.contact = {
      label: (document.querySelector("#contact label") as HTMLElement)?.className ?? "",
      input: (document.querySelector("#contact input") as HTMLElement)?.className ?? "",
      infoRow: (document.querySelector("#contact .group") as HTMLElement)?.className ?? "",
      infoText: (document.querySelector("#contact .group span, #contact .group p, #contact .group a") as HTMLElement)?.className ?? "",
      para: (document.querySelector("#contact p.text-zinc-500") as HTMLElement)?.className ?? "",
      formGrid: (document.querySelector("#contact form") as HTMLElement)?.className ?? "",
      msgFieldWrap: (document.querySelector("#contact .sm\\:col-span-2") as HTMLElement)?.className ?? "",
    };

    // Footer
    const foot = document.querySelector("footer");
    out.footer = {
      classes: foot?.className ?? "",
      inner: (foot?.firstElementChild as HTMLElement)?.className ?? "",
      wordmark: (foot?.querySelector("p") as HTMLElement)?.className ?? "",
      bottom: (foot?.lastElementChild as HTMLElement)?.className ?? "",
      socialsWrap: (foot?.querySelector(".flex.items-center.gap-6") as HTMLElement)?.className ?? "",
      html: foot?.innerHTML.slice(0, 1200) ?? "",
    };

    // Mobile menu button svg + hero CTA row at 390 handled. Get the hero scroll indicator html
    const scrollWrap = document.querySelector(".absolute.bottom-10");
    out.scrollHTML = scrollWrap?.outerHTML ?? "";

    return out;
  });
  console.log(JSON.stringify(r, null, 1).slice(0, 14000));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
