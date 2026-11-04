import { expect, test } from "@playwright/test";

// Session-199: THE LANDING BATTERY — the EleganceFlow one-pager at
// desktop width. Every assertion pins a live-verified reference
// behavior (the six DOM probes of the reference audit, 2026-11-03):
// the five anchors + their hrefs, the header's scroll state, the hero
// construction, the filter strip's live filtering, the carousel's
// quote rotation, the contact form → the byte-verified toast + the
// PERSISTED row (our superset), the footer, the SEO family and the
// designed 404.
//
// The public landing is guest-visible (no storageState assumptions —
// though the project boots with one, the surface is session-blind by
// construction).

test.describe("the EleganceFlow landing (desktop 1280)", () => {
  test("the five section anchors ride the byte-verified hrefs (Work → #portfolio)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const nav = page.locator("header nav ul");
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    await expect(nav.getByRole("link", { name: "Services" })).toHaveAttribute("href", "#services");
    await expect(nav.getByRole("link", { name: "Work" })).toHaveAttribute("href", "#portfolio");
    await expect(nav.getByRole("link", { name: "Testimonials" })).toHaveAttribute("href", "#testimonials");
    await expect(nav.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
  });

  test("the landing's title is the bare brand (the reference's own <title>)", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("EleganceFlow");
  });

  test("the hero renders the eyebrow, the two-span h1, the CTAs and the scroll indicator", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect(page.getByText("Premium Services")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Work that speaks");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("for itself.");
    await expect(page.getByRole("link", { name: /start a project/i })).toHaveAttribute("href", "#contact");
    await expect(page.getByRole("link", { name: /see our work/i })).toHaveAttribute("href", "#portfolio");
    await expect(page.getByText("Scroll")).toBeVisible();
  });

  test("the header flips to the scrolled state past the top (bg-zinc-950/95 + blur + py-4)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const header = page.locator("header");
    await expect(header).toHaveClass(/bg-transparent py-6/);
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(header).toHaveClass(/bg-zinc-950\/95 backdrop-blur-md/);
    await expect(header).toHaveClass(/py-4/);
  });

  test("the services render the four cards with their prices (Design & Web featured)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    for (const svc of ["Creative Direction", "Design & Web", "Photography", "Brand Strategy"]) {
      await expect(page.getByRole("heading", { name: svc })).toBeVisible();
    }
    await expect(page.getByText("From $1,500")).toBeVisible();
    await expect(page.getByText("From $3,000")).toBeVisible();
    await expect(page.getByText("From $800")).toBeVisible();
    await expect(page.getByText("From $1,200")).toBeVisible();
  });

  test("the portfolio filters filter LIVE (Branding leaves exactly Projects One + Four)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const grid = page.locator("#portfolio .grid");
    await expect(grid.locator(".group")).toHaveCount(6);
    await page.getByRole("button", { name: "Branding" }).click();
    await expect(grid.locator(".group")).toHaveCount(2);
    await expect(page.getByRole("heading", { name: "Project One" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Project Four" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Project Two" })).toHaveCount(0);
    await page.getByRole("button", { name: "All" }).click();
    await expect(grid.locator(".group")).toHaveCount(6);
  });

  test("the landing's image census is the reference's live set (the round-12 catch: 5 of 6 portfolio photos had drifted)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    // every img on the page, src + alt in DOM order — the same face the
    // drift probe reads. The reference ships SIX DISTINCT project
    // photographs (One: 1634942537034 · Two: 1467232004584 · Three:
    // 1596462502278 · Four: 1618005198919 · Five: 1558618666 · Six:
    // 1509909756405); ours had reused the hero/about/other-project photos.
    const census = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img")).map(
        (i) => `${i.getAttribute("src")} -> ${i.getAttribute("alt")}`,
      ),
    );
    const U = "https://images.unsplash.com/photo-";
    expect(census).toEqual([
      `${U}1618005182384-a83a8bd57fbe?w=1600&q=80 -> Hero`,
      `${U}1542744173-8e7e53415bb0?w=900&q=80 -> About`,
      `${U}1634942537034-2531766767d1?w=700&q=80 -> Project One`,
      `${U}1467232004584-a241de8bcf5d?w=700&q=80 -> Project Two`,
      `${U}1596462502278-27bfdc403348?w=700&q=80 -> Project Three`,
      `${U}1618005198919-d3d4b5a92ead?w=700&q=80 -> Project Four`,
      `${U}1558618666-fcd25c85cd64?w=700&q=80 -> Project Five`,
      `${U}1509909756405-be0199881695?w=700&q=80 -> Project Six`,
      `${U}1494790108377-be9c29b29330?w=100&q=80 -> Client Name`,
      `${U}1494790108377-be9c29b29330?w=100&q=80 -> Client Name`,
      `${U}1507003211169-0a1dd7228f2d?w=100&q=80 -> Client Name`,
      `${U}1438761681033-6461ffad8d80?w=100&q=80 -> Client Name`,
    ]);
  });

  test("the testimonial carousel rotates REAL content across the three quotes", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const quote = page.locator("#testimonials .md\\:col-span-3");
    const first = await quote.textContent();
    await page.getByRole("button", { name: /CEO, Company/ }).click();
    const second = await quote.textContent();
    await page.getByRole("button", { name: /Creative Director, Company/ }).click();
    const third = await quote.textContent();
    expect(new Set([first, second, third]).size).toBe(3);
  });

  test("the contact form submits → the panel pair + the PERSISTED row (the superset)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.getByLabel("Name").fill("E2E Playwright");
    await page.getByLabel("Email").fill("e2e@playwright.test");
    await page.getByLabel("Service").selectOption("Brand Strategy");
    await page.getByLabel("Message").fill("The landing battery's real submit — verifying the panel + the persisted row.");
    await page.getByRole("button", { name: /send inquiry/i }).click();
    await expect(page.getByText("Message sent!")).toBeVisible();
    await expect(page.getByText("We'll be in touch within 24 hours.")).toBeVisible();
    // The honest superset proof: the row landed in the DB (the authed
    // inbox spec sees it through the seeded session).
  });

  test("the success state swaps the form for the reference's in-place panel (round-19 — F-19a/F-19b)", async ({ page }) => {
    // Round-19 (the interaction-behavior census): live-ridden on the
    // reference — the submit fires NO domain POST and at ~400ms
    // REMOVES the form, rendering the persistent centered panel (the
    // 48px amber circle-check-big + the h3/p pair); no floating toast,
    // no clear, no revert. Ours had shown a floating shadcn toast and
    // kept the cleared form — a different visible construction. The
    // form also rides the bare right-column wrapper div (F-19b: grid >
    // div > form, the reference's structure — ours had grid > form).
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    // F-19b: the form's parent is the bare wrapper DIV, not the grid
    const formParent = await page.evaluate(() => document.querySelector("#contact form")?.parentElement?.tagName);
    expect(formParent).toBe("DIV");
    const gridKids = await page.evaluate(() => document.querySelector("#contact .grid")?.children.length);
    expect(gridKids).toBe(2);
    // the ride
    await page.getByLabel("Name").fill("E2E Panel Probe");
    await page.getByLabel("Email").fill("panel-probe@playwright.test");
    await page.getByLabel("Service").selectOption("Brand Strategy");
    await page.getByLabel("Message").fill("The round-19 panel leg — the form is removed, the panel renders.");
    await page.getByRole("button", { name: /send inquiry/i }).click();
    // the panel renders: the wrapper class, the 48px icon, the h3/p
    const panel = page.locator("#contact div.h-full.py-16");
    await expect(panel).toBeVisible();
    await expect(page.locator("#contact h3", { hasText: "Message sent!" })).toBeVisible();
    await expect(page.getByText("We'll be in touch within 24 hours.")).toBeVisible();
    const icon = page.locator("#contact svg[class*='circle-check-big']");
    await expect(icon).toBeVisible();
    await expect(icon).toHaveAttribute("width", "48");
    // the form is GONE — removed, not cleared
    await expect(page.locator("#contact form")).toHaveCount(0);
    await expect(page.locator("#contact input, #contact textarea, #contact select")).toHaveCount(0);
    // NO floating toast fires (the reference fires none) — the toast
    // viewport stays empty; the panel is the only status surface
    await expect(page.locator('[class*="max-h-screen"] [role="status"]')).toHaveCount(0);
    // the panel persists (the reference's face — no revert)
    await page.waitForTimeout(1500);
    await expect(page.locator("#contact h3", { hasText: "Message sent!" })).toBeVisible();
    await expect(page.locator("#contact form")).toHaveCount(0);
  });

  test("the form faces the preflights own compute the reference's v3-preflight faces (round-14)", async ({ page }) => {
    // The preflight-genus pins: the v3 preflight painted ::placeholder
    // gray-400 (#9ca3af) and left the UA field background (white); v4's
    // preflight paints currentcolor@50% and resets the background to
    // transparent — both cured by the scoped rules in globals.css
    // (tests/preflight-faces.test.ts). And the transition-colors
    // property list re-pinned to the v3 six-property form (trap ⑧) via
    // the unlayered rule.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const faces = await page.evaluate(() => {
      const input = document.querySelector("#contact input") as HTMLElement | null;
      const navItem = document.querySelectorAll("header nav ul a")[0];
      return {
        placeholder: input ? getComputedStyle(input, "::placeholder").color : null,
        bg: input ? getComputedStyle(input).backgroundColor : null,
        navTransition: navItem ? getComputedStyle(navItem).transitionProperty : null,
      };
    });
    expect(faces.placeholder).toBe("rgb(156, 163, 175)");
    expect(faces.bg).toBe("rgb(255, 255, 255)");
    expect(faces.navTransition).toBe("color, background-color, border-color, text-decoration-color, fill, stroke");
  });

  test("the motion/glyph faces compute the reference's faces (round-15: the smooth scroll + the straight-quote glyphs)", async ({ page }) => {
    // The round-15 motion/glyph pins: the reference's app CSS ships the
    // raw `html { scroll-behavior: smooth }` rule — every anchor ride
    // glides (trajectory-probed live: intermediate scroll positions on
    // both apps) where a bare build jumps. And the testimonial quote
    // renders STRAIGHT double quotes (U+0022) — the full-text census
    // proved the typographic pair the SOLE text divergence on the
    // landing (cured in landing-page.tsx; pinned at the source level by
    // tests/motion-glyph.test.ts).
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const faces = await page.evaluate(() => {
      const quote = document.querySelector("#testimonials .md\\:col-span-3 p");
      const t = quote?.textContent ?? "";
      return {
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
        firstGlyph: t.codePointAt(0),
        lastGlyph: t.length > 0 ? t.codePointAt(t.length - 1) : null,
      };
    });
    expect(faces.scrollBehavior).toBe("smooth");
    expect(faces.firstGlyph).toBe(34); // U+0022 — the straight double quote
    expect(faces.lastGlyph).toBe(34);
  });

  test("the hero geometry mirrors the reference (in-canvas content column, the 800px hero, the label inside the column)", async ({ page }) => {
    // Round-16 (the attribute/geometry census): the direct in-flow <img>
    // squeezed the content column entirely off-canvas at BOTH viewports
    // while toBeVisible passed (a non-empty box is "visible" wherever it
    // sits) — the geometry pin reads bounding boxes, the faces the style
    // probes never measured. Pinned at the source level by
    // tests/geometry-faces.test.ts ①②③; live-diffed by the drift
    // geometry leg.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const geo = await page.evaluate(() => {
      const rect = (el: Element | null): number[] | null => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)];
      };
      const sec = document.querySelector("section");
      const content = sec?.querySelector(".relative.max-w-7xl") ?? null;
      const h1 = document.querySelector("h1");
      const label = [...document.querySelectorAll("span")].find((s) => (s.textContent ?? "").trim() === "Scroll") ?? null;
      return { hero: rect(sec), content: rect(content), h1: rect(h1), labelX: label ? rect(label)?.[0] ?? null : null };
    });
    expect(geo.hero).toEqual([0, 0, 1280, 800]);
    expect(geo.content?.[0]).toBe(232); // centered, IN-CANVAS (the squeezed form sat at x=1280)
    expect(geo.h1).toEqual([256, 197, 768, 288]);
    expect(geo.labelX).toBe(300); // the label span inside the content column
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);
    const mob = await page.evaluate(() => {
      const rect = (el: Element | null): number[] | null => {
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)];
      };
      const sec = document.querySelector("section");
      const content = sec?.querySelector(".relative.max-w-7xl") ?? null;
      return { hero: rect(sec), content: rect(content) };
    });
    expect(mob.hero).toEqual([0, 0, 390, 844]);
    expect(mob.content?.[0]).toBe(0); // full-width at phone (the squeezed form sat at x=390)
  });

  test("the leading decodes compute the reference's faces (36px quote / 28px hero P at md+; 33px / 29.25px at phone)", async ({ page }) => {
    // Round-16 (the trap-⑥ genus, two new members): the reference's
    // md:text-3xl / md:text-xl rules pair their sizes with 36px / 28px
    // and beat the plain leading rules in ITS cascade at md+ — our v4
    // sorts the leading LAST, so the md: overrides reproduce the faces.
    // Pinned at the source level by tests/geometry-faces.test.ts ④.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const readLh = () =>
      page.evaluate(() => {
        const quote = document.querySelector("#testimonials .md\\:col-span-3 p");
        const heroP = [...document.querySelectorAll("p")].find((p) => p.className.match(/leading-relaxed/) !== null && (p.textContent ?? "").includes("exceptional")) ?? null;
        return {
          quote: quote ? getComputedStyle(quote).lineHeight : "ABSENT",
          heroP: heroP ? getComputedStyle(heroP).lineHeight : "ABSENT",
        };
      });
    const desk = await readLh();
    expect(desk.quote).toBe("36px");
    expect(desk.heroP).toBe("28px");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);
    const mob = await readLh();
    expect(mob.quote).toBe("33px");
    expect(mob.heroP).toBe("29.25px");
  });

  test("the form native-validates (empty submits never leave the page) and the glyphs render the reference's shapes", async ({ page }) => {
    // Round-16: the reference's form native-validates (browser bubbles,
    // no submit event, no POST) — ours carried noValidate, letting an
    // empty submit POST to the API. The glyphs: the reference ships its
    // older lucide-era shapes (the classic palette + handset). Pinned at
    // the source level by tests/geometry-faces.test.ts ⑤⑥.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const faces = await page.evaluate(() => {
      const form = document.querySelector("#contact form") as HTMLFormElement | null;
      const palette = document.querySelector("svg.lucide-palette path")?.getAttribute("d") ?? "ABSENT";
      const phone = document.querySelector("svg.lucide-phone path")?.getAttribute("d") ?? "ABSENT";
      return { noValidate: form ? form.noValidate : true, checkValidity: form ? form.checkValidity() : null, palette, phone };
    });
    expect(faces.noValidate).toBe(false); // the reference's native gate
    expect(faces.checkValidity).toBe(false); // the empty form is invalid — an empty submit cannot fire
    expect(faces.palette.startsWith("M12 2C6.5")).toBe(true); // the reference's circles-and-body palette
    expect(faces.phone.startsWith("M22 16.92")).toBe(true); // the reference's classic handset
    let posted = false;
    page.on("request", (r) => {
      if (r.method() === "POST") posted = true;
    });
    await page.locator("#contact button[type=submit]").click();
    await page.waitForTimeout(300);
    expect(posted).toBe(false); // the native gate blocked the empty submit
  });

  test("the footer carries the wordmark, the four socials and the copyright", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Quality work for quality clients.")).toBeVisible();
    for (const social of ["Instagram", "Twitter", "LinkedIn", "Dribbble"]) {
      await expect(page.getByRole("link", { name: social, exact: true })).toBeVisible();
    }
    await expect(page.getByText("© 2026 Your Studio. All rights reserved.")).toBeVisible();
  });

  test("the SEO family serves (sitemap + robots + manifest)", async ({ request }) => {
    for (const route of ["/sitemap.xml", "/robots.txt", "/manifest.json"]) {
      const res = await request.get(route);
      expect(res.status(), route).toBe(200);
    }
  });

  test("an unknown route renders the designed 404 (with the true 404 status)", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByText("404")).toBeVisible();
  });
});
