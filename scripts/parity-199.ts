// Session-199 LIVE PARITY PROBE: our dev build vs the reference app —
// computed-style extraction on both viewports, diffed. This is the
// parity bar's evidence pass: the class strings were byte-captured at
// build time; this probe proves the COMPUTED pixels agree.
//
// Run: bun scripts/parity-199.ts   (expects our dev server on :3000)
import { chromium } from "@playwright/test";

const OURS = "http://localhost:3000";
const REF = "https://colossal-elevate-service-flow.base44.app";

// The probed face: a permissive record — the probe ADDS the scrolled
// state and (at phone width) the mobile panel after the initial pass,
// so every value rides `unknown` and the diff walks it structurally.
type Face = Record<string, unknown>;

async function probe(browser: import("@playwright/test").Browser, url: string, w: number, h: number): Promise<Face> {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  // The permissive Face annotation widens the evaluate's inferred literal
  // so the dynamic additions below type-check.
  const face: Face = await page.evaluate(() => {
    const cs = (el: Element | null | undefined) => (el ? getComputedStyle(el as HTMLElement) : null);
    const pick = (el: Element | null | undefined) => {
      const s = cs(el);
      return s ? { bg: s.backgroundColor, color: s.color, fs: s.fontSize, fw: s.fontWeight, lh: s.lineHeight } : null;
    };
    const header = document.querySelector("header");
    const h1 = document.querySelector("h1");
    const hero = document.querySelector("h1")?.closest("section");
    const eyebrow = document.querySelector("h1")?.parentElement?.querySelector("p");
    const ctaPrimary = Array.from(document.querySelectorAll("a")).find((a) => /start a project/i.test(a.textContent ?? ""));
    const ctaSecondary = Array.from(document.querySelectorAll("a")).find((a) => /see our work/i.test(a.textContent ?? ""));
    const services = document.querySelector("#services");
    const svcCards = services ? Array.from(services.querySelectorAll(".grid > div")) : [];
    const featured = svcCards[1] ?? null;
    const filterActive = Array.from(document.querySelectorAll("button")).find((b) => b.textContent?.trim() === "All");
    const filterInactive = Array.from(document.querySelectorAll("button")).find((b) => b.textContent?.trim() === "Branding");
    const testi = document.querySelector("#testimonials");
    const selActive = testi ? testi.querySelector("button") : null;
    const about = document.querySelector("#about");
    const stats = about ? about.querySelectorAll(".text-3xl") : [];
    const frame = about?.querySelector('[class*="-z-10"]');
    const contact = document.querySelector("#contact");
    const select = contact?.querySelector("select");
    const footer = document.querySelector("footer");
    const wordmark = footer?.querySelector(".font-black");
    return {
      header: {
        classes: header?.className,
        pos: cs(header)?.position,
        py: header ? cs(header)!.paddingTop : null,
        bg: cs(header)?.backgroundColor,
      },
      hero: { bg: cs(hero)?.backgroundColor, h1: pick(h1), eyebrowColor: cs(eyebrow)?.color },
      ctaPrimary: pick(ctaPrimary),
      ctaSecondary: pick(ctaSecondary),
      featuredCard: pick(featured),
      featuredIcon: pick(featured?.querySelector("svg")),
      filterActive: pick(filterActive),
      filterInactive: pick(filterInactive),
      selActive: {
        bg: cs(selActive)?.backgroundColor,
        borderLeft: cs(selActive)?.borderLeftColor,
        borderLeftW: cs(selActive)?.borderLeftWidth,
      },
      statValue: pick(stats[0]),
      frame: { border: cs(frame)?.borderTopColor, w: cs(frame)?.borderTopWidth },
      selectBg: cs(select)?.backgroundColor,
      footer: { bg: cs(footer)?.backgroundColor, wordmark: pick(wordmark) },
      bodyBg: getComputedStyle(document.body).backgroundColor,
      font: getComputedStyle(document.body).fontFamily,
    };
  });
  // scrolled header state (added dynamically — the Face is a permissive
  // record; a typed local carries the shape). Scroll first, wait out the
  // 500ms transition, then read.
  await page.evaluate(() => document.querySelector("#services")?.scrollIntoView());
  await page.waitForTimeout(700);
  const scrolled: Record<string, unknown> = await page.evaluate(() => {
    const h = document.querySelector("header")!;
    const s = getComputedStyle(h);
    return { bg: s.backgroundColor, blur: s.backdropFilter, py: s.paddingTop, bb: s.borderBottomWidth };
  });
  face.headerScrolled = scrolled;
  // the mobile menu (phone only)
  if (w < 500) {
    const btn = page.getByRole("button", { name: /open menu/i }).first();
    if (await btn.count()) {
      await btn.click();
      await page.waitForTimeout(400);
      const panel: Record<string, unknown> = await page.evaluate(() => {
        const el = document.querySelector("header div.md\\:hidden") as HTMLElement | null;
        const s = el ? getComputedStyle(el) : null;
        return { classes: el?.className, bg: s?.backgroundColor, count: el?.querySelectorAll("a").length };
      });
      face.mobilePanel = panel;
    }
  }
  await page.close();
  return face;
}

function diff(a: Face, b: Face, path = "", out: string[] = []): string[] {
  for (const k of Object.keys(a)) {
    const pa = `${path}${path ? "." : ""}${k}`;
    const va = a[k];
    const vb = (b as Face)[k];
    if (typeof va === "object" && va !== null && !Array.isArray(va)) {
      if (typeof vb === "object" && vb !== null) diff(va as Face, vb as Face, pa, out);
      else out.push(`MISSING in REF: ${pa} (ours=${JSON.stringify(va)})`);
    } else if (va !== vb) {
      out.push(`${pa}: OURS=${JSON.stringify(va)} REF=${JSON.stringify(vb)}`);
    }
  }
  return out;
}

/** The SERIALIZATION-ONLY deltas (the s18 "viewport 1 vs 1.0" class):
 *  v4 compiles bg-zinc-950/95 through color-mix(in oklab) — Chrome
 *  serializes the computed value as oklab(…/0.95) where the reference's
 *  v3-era literal serializes as rgba(9,9,11,0.95). The oklab triple
 *  RESOLVES to rgb(9,9,11) — the identical paint, a different string
 *  form (verified numerically: oklabToSrgb(0.140764, 0.00120224,
 *  -0.00421676) = (9, 9, 11)). */
const SERIALIZATION_ONLY = (d: string) =>
  d.startsWith("headerScrolled.bg:") &&
  d.includes("oklab(0.140764 0.00120224 -0.00421676 / 0.95)") &&
  d.endsWith('REF="rgba(9, 9, 11, 0.95)"');

async function main() {
  const browser = await chromium.launch();
  for (const [w, h, label] of [[1280, 800, "desktop"], [390, 844, "phone"]] as const) {
    console.log(`\n=== ${label} ${w}x${h} ===`);
    const ours = await probe(browser, OURS, w, h);
    const ref = await probe(browser, REF, w, h);
    const deltas = diff(ours, ref).filter((d) => !SERIALIZATION_ONLY(d));
    if (deltas.length === 0) {
      console.log(
        "PARITY: all probed faces COMPUTE IDENTICAL" +
          " (the oklab/rgba scrolled-header serialization excluded — the s18 class, same paint)",
      );
    } else {
      console.log(`DELTAS (${deltas.length}):`);
      for (const d of deltas) console.log("  " + d);
    }
  }
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
