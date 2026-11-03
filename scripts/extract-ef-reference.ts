// Session-199 reference re-extraction: the byte-level details the plan doc
// summarizes but doesn't carry verbatim (header scroll state, hero h1 span
// structure, mobile-menu open-state classes, service icon sizes, filter
// buttons, select chevron, decorative frame border).
//
// Run: bun /home/z/my-project/scripts/extract-ef-reference.ts
import { chromium } from "@playwright/test";

const REF = "https://colossal-elevate-service-flow.base44.app";

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(REF, { waitUntil: "networkidle" });

  const header = page.locator("header").first();
  const headerInfo = await header.evaluate((el: HTMLElement) => ({
    classes: el.className,
    inner: el.firstElementChild?.className ?? "",
  }));
  console.log("HEADER top:", JSON.stringify(headerInfo));

  // Hero h1 structure (line-break spans)
  const h1 = await page.locator("h1").first().evaluate((el: HTMLElement) => el.innerHTML);
  console.log("H1 innerHTML:", JSON.stringify(h1));

  // Scroll state: scroll to #services and re-read the header
  await page.evaluate(() => document.querySelector("#services")?.scrollIntoView());
  await page.waitForTimeout(800);
  const headerScrolled = await header.evaluate((el: HTMLElement) => el.className);
  console.log("HEADER scrolled:", JSON.stringify(headerScrolled));

  // Hero CTAs (the two buttons in the hero)
  const ctaClasses = await page.evaluate(() => {
    const hero = document.querySelector("#about")?.previousElementSibling;
    const scope = hero ?? document.body;
    const btns = Array.from(scope.querySelectorAll("a")).filter((a) =>
      /start a project|see our work/i.test(a.textContent ?? ""),
    );
    return btns.map((b) => ({ text: b.textContent, classes: b.className, href: b.getAttribute("href") }));
  });
  console.log("HERO CTAs:", JSON.stringify(ctaClasses));

  // Scroll indicator
  const scrollInd = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("span,b,div,p")).find((n) => n.textContent === "SCROLL");
    return el ? (el.parentElement?.className ?? "") + " | " + el.className : "NOT FOUND";
  });
  console.log("SCROLL ind:", JSON.stringify(scrollInd));

  // Services icons: the icon svg wrapper classes inside the service cards
  const svcIcons = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll("#services .grid > div"));
    return cards.map((c) => {
      const svg = c.querySelector("svg");
      return {
        cardClasses: c.className,
        svgClasses: svg?.className ?? "",
        priceClasses: c.querySelector("span,p,div")?.className,
        priceText: (c.textContent ?? "").match(/From \$[\d,]+/)?.[0] ?? "",
      };
    });
  });
  console.log("SERVICE CARDS:", JSON.stringify(svcIcons, null, 1).slice(0, 2200));

  // Work filter buttons
  const filters = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button")).filter((b) =>
      ["all", "branding", "web", "photography"].includes((b.textContent ?? "").toLowerCase()),
    );
    return btns.map((b) => ({ text: b.textContent, classes: b.className, aria: b.getAttribute("aria-pressed") }));
  });
  console.log("FILTERS:", JSON.stringify(filters, null, 1));

  // Project card overlay structure
  const proj = await page.evaluate(() => {
    const card = document.querySelector("#portfolio .grid > div");
    const overlay = card?.querySelector(".absolute.inset-0") ?? card;
    return {
      cardClasses: card?.className ?? "",
      overlayClasses: overlay?.className ?? "",
      imgClasses: card?.querySelector("img")?.className ?? "",
      overlayHTML: overlay?.innerHTML?.slice(0, 400) ?? "",
    };
  });
  console.log("PROJECT CARD:", JSON.stringify(proj, null, 1).slice(0, 1500));

  // Testimonials: quote svg + avatars + selector buttons
  const testi = await page.evaluate(() => {
    const section = document.querySelector("#testimonials");
    const svg = section?.querySelector("svg");
    const avatar = section?.querySelector("img");
    const sel = section ? Array.from(section.querySelectorAll("button")).map((b) => b.className) : [];
    return { quoteSvg: svg?.className ?? "", avatarClasses: avatar?.className ?? "", selectorClasses: sel.slice(0, 3) };
  });
  console.log("TESTIMONIALS:", JSON.stringify(testi, null, 1));

  // Contact form select + textarea exact classes
  const formEls = await page.evaluate(() => {
    const select = document.querySelector("#contact select");
    const textarea = document.querySelector("#contact textarea");
    const chev = select?.parentElement?.querySelector("svg");
    const submit = Array.from(document.querySelectorAll("#contact button")).find((b) =>
      /send inquiry/i.test(b.textContent ?? ""),
    );
    return {
      selectClasses: select?.className ?? "",
      selectParent: select?.parentElement?.className ?? "",
      chevronClasses: chev?.className ?? "",
      textareaClasses: textarea?.className ?? "",
      submitClasses: submit?.className ?? "",
    };
  });
  console.log("CONTACT FORM:", JSON.stringify(formEls, null, 1));

  // About decorative frame + stats
  const about = await page.evaluate(() => {
    const section = document.querySelector("#about");
    const frame = section?.querySelector('[class*="-z-10"]') ?? section?.querySelector('[class*="border-4"]');
    const stats = section ? Array.from(section.querySelectorAll("h3, [class*=text-3xl]")).map((n) => n.className) : [];
    const img = section?.querySelector("img");
    return { frameClasses: frame?.className ?? "", statsClasses: stats, imgClasses: img?.className ?? "" };
  });
  console.log("ABOUT:", JSON.stringify(about, null, 1));

  // ---- mobile 390: the menu open state --------------------------------------
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mob.goto(REF, { waitUntil: "networkidle" });
  const btn = mob.getByRole("button", { name: /open menu/i }).first();
  const btnClasses = await btn.getAttribute("class");
  console.log("MOBILE BTN closed:", JSON.stringify({ btnClasses }));
  await btn.click();
  await mob.waitForTimeout(400);
  const panelHTML = await mob.evaluate(() => {
    const header = document.querySelector("header")!;
    const nav = header.querySelector("nav");
    return {
      headerClasses: header.className,
      navClasses: nav?.className ?? "",
      navHTML: nav ? (nav as HTMLElement).innerHTML : "NO NAV",
      btnOpenClasses: Array.from(header.querySelectorAll("button")).map((b) => b.className),
    };
  });
  console.log("MOBILE OPEN:", JSON.stringify(panelHTML, null, 1).slice(0, 3000));

  // Hero CTAs at mobile (flex-col)
  const mobCtas = await mob.evaluate(() => {
    const row = document.querySelector('a[href="#contact"]');
    return row?.parentElement?.className ?? "";
  });
  console.log("MOBILE CTA row parent:", JSON.stringify(mobCtas));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
