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
    // Round-28: the hero cascade shifts descendant client rects while
    // it runs (a translated ancestor moves the h1's box) — the geometry
    // read waits for the cascade to SETTLE (the reveal's post-settle DOM
    // equals the pre-round DOM, so the pinned values keep).
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await expect
      .poll(async () => page.evaluate(() => getComputedStyle(document.querySelector("h1 span")!).transform), { timeout: 4000 })
      .toBe("none");
    await expect
      .poll(async () => page.evaluate(() => getComputedStyle(document.querySelector(".max-w-3xl")!).transform), { timeout: 4000 })
      .toBe("none");
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
    await expect
      .poll(async () => page.evaluate(() => getComputedStyle(document.querySelector(".max-w-3xl")!).transform), { timeout: 4000 })
      .toBe("none");
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

  test("round-24: the manifest contents mirror the reference's install family (F-24c)", async ({ request }) => {
    // The reference's own manifest, live-probed 2026-11-05: the name/
    // short_name pair, the TEMPLATE's marketing-copy description (the
    // record correction — the reference's RENDERED head ships the full
    // meta family; the prior "ships none" record read its raw SPA
    // shell), the two icon entries (192x192 + 512x512 — our same-src
    // self-hosted quirk vs its two CDN srcs, the never-point-at-their-CDN
    // doctrine), and the standalone display + theme/background pair.
    const res = await request.get("/manifest.json");
    expect(res.status()).toBe(200);
    const manifest = (await res.json()) as {
      name: string; short_name: string; description: string;
      icons: { src: string; sizes: string; type: string }[];
      display: string; theme_color: string; background_color: string;
    };
    expect(manifest.name).toBe("EleganceFlow");
    expect(manifest.short_name).toBe("EleganceFlow");
    expect(manifest.description).toBe(
      "A premium, modular website template for service-based businesses, designed for high-conversion portfolios, seamless service showcasing, and sophisticated client inquiries.",
    );
    expect(manifest.icons).toEqual([
      { src: expect.stringMatching(/\/icon\.png/), sizes: "192x192", type: "image/png" },
      { src: expect.stringMatching(/\/icon\.png/), sizes: "512x512", type: "image/png" },
    ]);
    expect(manifest.display).toBe("standalone");
    expect(manifest.theme_color).toBe("#000000");
    expect(manifest.background_color).toBe("#ffffff");
  });

  test("round-24: the install assets serve the reference's own bytes (the F-24a/F-24b byte-mirror)", async ({ request }) => {
    // The prior-domain leftovers cured: the icons had been the
    // NEO-CRM BrandMark and the og-image the NEO-CRM dashboard
    // screenshot — both carried verbatim at the session-199 domain
    // transformation and never censused. The byte-mirror serves the
    // reference's logo: /icon.png (the w_512 CDN variant),
    // /apple-icon.png (the w_180 favicon href's variant), and
    // /og-image.png (the fill/w_1200,h_630 card). The sha1s are the
    // recorded live-probe constants.
    const { createHash } = await import("node:crypto");
    const sha1 = (buf: Buffer) => createHash("sha1").update(buf).digest("hex");
    const pngDims = (buf: Buffer) => ({ w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) });
    for (const [route, sha, w, h] of [
      ["/icon.png", "bd6f57945c42055a8f3cbfc702d7e34803854968", 512, 512],
      ["/apple-icon.png", "484f2cf504efd30bb0827e42b4ebb89f206d48b7", 180, 180],
      ["/og-image.png", "4daab032e0b9a98636280fbe3b3c8d5db8d868c5", 1200, 630],
    ] as const) {
      const res = await request.get(route);
      expect(res.status(), route).toBe(200);
      expect(res.headers()["content-type"], route).toContain("image/png");
      const body = Buffer.from(await res.body());
      expect(pngDims(body), route).toEqual({ w, h });
      expect(sha1(body), route).toBe(sha);
    }
  });

  test("round-24: the root description family mirrors the reference's template copy (F-24c)", async ({ page }) => {
    // The reference's RENDERED head (runtime-injected — the raw shell
    // carries none) ships meta description + og:description +
    // twitter:description, all the TEMPLATE's marketing copy. Ours
    // mirrors through the SITE_DESCRIPTION seam.
    const REF_DESCRIPTION =
      "A premium, modular website template for service-based businesses, designed for high-conversion portfolios, seamless service showcasing, and sophisticated client inquiries.";
    await page.goto("/");
    await expect(page.locator("meta[name='description']")).toHaveAttribute("content", REF_DESCRIPTION);
    await expect(page.locator("meta[property='og:description']")).toHaveAttribute("content", REF_DESCRIPTION);
    await expect(page.locator("meta[name='twitter:description']")).toHaveAttribute("content", REF_DESCRIPTION);
  });

  test("round-24: the signup title family — the de-spaced face with the social titles following (F-24d)", async ({ page }) => {
    // The reference's /signup title is "Signup | EleganceFlow" (no
    // space) and its og:title + twitter:title follow it; ours used to
    // ship "Sign up | EleganceFlow" with the social titles stuck at
    // the bare brand.
    await page.goto("/signup");
    await expect(page).toHaveTitle("Signup | EleganceFlow");
    await expect(page.locator("meta[property='og:title']")).toHaveAttribute("content", "Signup | EleganceFlow");
    await expect(page.locator("meta[name='twitter:title']")).toHaveAttribute("content", "Signup | EleganceFlow");
  });

  test("round-24: the reset-password route carries the reference's BARE brand family (F-24d)", async ({ page }) => {
    // The reference's /reset-password (live-probed 2026-11-05) carries
    // the bare "EleganceFlow" title + og:title — the prior titled +
    // og-prefixed family ("Reset password | …" + the "Reset password
    // on …" description prefix) was invented: the reference prefixes
    // NOWHERE.
    await page.goto("/reset-password");
    await expect(page).toHaveTitle("EleganceFlow");
    await expect(page.locator("meta[property='og:title']")).toHaveAttribute("content", "EleganceFlow");
  });

  test("an unknown route renders the designed 404 (with the true 404 status)", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByText("404")).toBeVisible();
  });

  test("round-22: the sm boundary (640) — the hamburger family still rides below md", async ({ page }) => {
    // Round-22 (R-22a/F-22a): the intermediate viewports no probe ever
    // visited. At 640 the header is still the MOBILE face (the hamburger
    // visible, the desktop nav + CTA hidden) and the hero h1 computes
    // the base 48px — live-verified IDENTICAL on both apps. The
    // source-contract pins ride tests/viewport-faces.test.ts ①.
    await page.setViewportSize({ width: 640, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(page.locator("header nav ul")).toBeHidden();
    const h1 = await page.evaluate(() => getComputedStyle(document.querySelector("h1")!).fontSize);
    expect(h1).toBe("48px");
  });

  test("round-22: the md boundary (768) — the header flips, the hamburger retires, the h1 steps to 72px", async ({ page }) => {
    // The mobile menu's own RETIREMENT boundary (the operator's standing
    // emphasis): at 768 the desktop nav + the amber CTA appear and the
    // hamburger goes display:none — the md: media family computes the
    // reference's v3 breakpoints exactly (no Tailwind v4 media-query
    // bug; live-verified IDENTICAL on both apps).
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
    await expect(page.locator("header nav ul")).toBeVisible();
    await expect(page.getByRole("link", { name: "Get in Touch" })).toBeVisible();
    const h1 = await page.evaluate(() => getComputedStyle(document.querySelector("h1")!).fontSize);
    expect(h1).toBe("72px");
  });

  test("round-23: the deep-link boot (/#portfolio) lands the section — OUR superset (the reference's SPA never scrolls, R-23b)", async ({ page }) => {
    // Round-23 (R-23b/F-23a): the cold-boot deep link. Every e2e leg
    // since session-199 goto("/") plain — the hash family was never
    // ridden. The reference's own deep links are BROKEN (its SPA shell
    // renders the sections after the browser's one-time boot-time hash
    // scroll; scrollTop stays 0 at 0.5s–5s — live-probed). OURS lands
    // the native SSR scroll: the section rides to the viewport top and
    // the header flips to its scrolled state. Source pins:
    // tests/anchor-faces.test.ts ①④.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/#portfolio");
    await expect(page).toHaveURL(/\/#portfolio$/);
    await expect
      .poll(async () => page.evaluate(() => Math.abs(Math.round(document.getElementById("portfolio")?.getBoundingClientRect().top ?? -1))))
      .toBe(0);
    const scrolled = await page.evaluate(() => document.documentElement.scrollTop > 0);
    expect(scrolled).toBe(true);
    await expect(page.locator("header")).toHaveClass(/bg-zinc-950\/95 backdrop-blur-md/);
  });

  test("round-23: the desktop nav ride — click Work → #portfolio lands the section + the scrolled header (R-23a)", async ({ page }) => {
    // The DESKTOP nav link ride (the mobile panel rides are pinned in
    // mobile-navigation.spec.ts; the desktop family never was — F-23a).
    // The non-obvious mapping ridden behaviorally: Work anchors
    // #portfolio, not #work. Live-verified IDENTICAL on both apps:
    // the hash lands, the section rides to the viewport top, the
    // header flips to its scrolled state.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.locator("header nav ul").getByRole("link", { name: "Work" }).click();
    await expect(page).toHaveURL(/\/#portfolio$/);
    await expect
      .poll(async () => page.evaluate(() => Math.abs(Math.round(document.getElementById("portfolio")?.getBoundingClientRect().top ?? -1))))
      .toBe(0);
    await expect(page.locator("header")).toHaveClass(/bg-zinc-950\/95 backdrop-blur-md/);
    await expect(page.locator("header")).toHaveClass(/py-4/);
  });

  test("round-23: the hero CTA ride — Start a Project → #contact lands the contact section (R-23a)", async ({ page }) => {
    // The hero's amber CTA (the href family byte-identical both apps —
    // the discovery census; the RIDE never ridden). The click glides
    // (scroll-behavior: smooth, the round-15 pin) and the contact
    // section lands at the viewport top.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.getByRole("link", { name: /start a project/i }).click();
    await expect(page).toHaveURL(/\/#contact$/);
    await expect
      .poll(async () => page.evaluate(() => Math.abs(Math.round(document.getElementById("contact")?.getBoundingClientRect().top ?? -1))))
      .toBe(0);
  });

  test("round-23: the logo ride — the # wordmark returns the page to the top and clears the hash (R-23a)", async ({ page }) => {
    // The logo's bare `#` href (the reference's own href, byte-mirrored):
    // after a landed ride the wordmark click returns the page to the
    // top (scrollTop 0), clears the hash, and the header restores its
    // at-top transparent state. Live-verified IDENTICAL on both apps.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.locator("header nav ul").getByRole("link", { name: "About" }).click();
    await expect
      .poll(async () => page.evaluate(() => Math.abs(Math.round(document.getElementById("about")?.getBoundingClientRect().top ?? -1))))
      .toBe(0);
    await page.locator("header a").first().click();
    await expect
      .poll(async () => page.evaluate(() => Math.abs(Math.round(document.documentElement.scrollTop))))
      .toBe(0);
    const hashAfterLogo = await page.evaluate(() => location.hash);
    expect(hashAfterLogo).toBe("");
    await expect(page.locator("header")).toHaveClass(/bg-transparent py-6/);
  });

  test("round-25: the unknown-route DERIVED title family — the reference's own 404 face with OUR true 404 status (F-25a)", async ({ page }) => {
    // Round-25 (F-25a — the record correction): the reference's CURRENT
    // build DERIVES the unknown-route title from the pathname
    // ("Verify Email | EleganceFlow" at /verify-email — live-probed
    // settled 2026-11-05); ours had shipped the bare brand (the stale
    // D-194a4 record). OURS keeps the TRUE 404 STATUS (the reference's
    // SPA answers 200 everywhere — its own platform artifact). The
    // title flips at hydration (the reference's own runtime-injection
    // idiom), so the assertion rides the auto-retrying toHaveTitle.
    // Source pins: tests/route-mechanics.test.ts ①③.
    const res = await page.goto("/verify-email");
    expect(res?.status()).toBe(404);
    await expect(page).toHaveTitle("Verify Email | EleganceFlow");
    await expect(page.getByText("Page Not Found")).toBeVisible();
    await expect(page.getByText('"verify-email"')).toBeVisible();
  });

  test("round-27: the Go Home ride resets the derived title to the bare brand (F-27d, the stale-title decode)", async ({ page }) => {
    // Round-27 (F-27d — live-probed on the artifact, both apps): after
    // the Go Home client nav from a 404, OURS' derived title PERSISTED
    // on the landing ("Probe 404 | EleganceFlow" at "/") while the
    // reference's SPA resets to "EleganceFlow". The root cause: React's
    // <title> reconciliation SKIPS the DOM write when the incoming
    // route resolves the SAME string its record owns (the 404 — no
    // metadata export, the D-194a4 retirement — and the landing BOTH
    // resolve the layout-default "EleganceFlow"), so React never
    // rewrites the node the observer mutated. The cure: the not-found
    // effect's cleanup carries the GUARDED bare-brand reset (disconnect
    // first, then reset only if the DOM still holds OUR derived value).
    // Source pin: tests/route-mechanics.test.ts ③ (the re-pin).
    await page.goto("/probe-27");
    await expect(page).toHaveTitle("Probe 27 | EleganceFlow");
    await expect(page.getByText("Page Not Found")).toBeVisible();
    // the ride: the Go Home link client-navigates to the landing
    await page.getByRole("link", { name: "Go Home" }).click();
    await expect(page).toHaveURL(/^http:\/\/localhost:\d+\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Work that speaks");
    // THE CURE'S BAR: the landing owns the bare brand again — the
    // derived 404 title never persists past the route it belongs to
    await expect(page).toHaveTitle("EleganceFlow");
  });

  test("round-25: the derivation rule's load-bearing decodes — the last segment, the camel-split, the query strip (F-25a)", async ({ page }) => {
    // The three decodes that pin the RULE (not just one face):
    // /foo/bar → "Bar" (the LAST segment only); /MiXeD-cAsE →
    // "Mi Xe D C As E" (the camelCase split); /nonexistent-xyz?q=1 →
    // the query ignored. All live-verified on the reference; the seam
    // battery (tests/route-mechanics.test.ts ①) pins the full family.
    await page.goto("/foo/bar");
    await expect(page).toHaveTitle("Bar | EleganceFlow");
    await page.goto("/MiXeD-cAsE");
    await expect(page).toHaveTitle("Mi Xe D C As E | EleganceFlow");
    await page.goto("/nonexistent-xyz?q=1");
    await expect(page).toHaveTitle("Nonexistent Xyz | EleganceFlow");
  });

  test("round-25: the trailing-slash 308 — /login/ normalizes to the real login (OUR web-correct superset, F-25b)", async ({ page }) => {
    // Round-25 (F-25b): the reference's /login/ falls to its DESIGNED
    // 404 ("The page "login/" could not be found") — its own platform
    // defect (the trailing slash breaks its SPA route match). OURS
    // 308-normalizes to the canonical /login (Next's default
    // trailingSlash: false — the web-correct form). The superset is
    // ours, documented and kept; never break it to match.
    await page.goto("/login/");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  test("round-25: the query passthrough — /login?x=1 serves the real login family (F-25d, the positive census)", async ({ page }) => {
    // Round-25 (F-25d): the query passthrough computes IDENTICAL on
    // both apps (live-probed): an unknown query rides the real route —
    // the settled bare-brand title (the query never leaks into the
    // title family) and the real card face.
    await page.goto("/login?x=1");
    await expect(page).toHaveURL(/\/login\?x=1$/);
    await expect(page).toHaveTitle("EleganceFlow");
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue with Google" })).toBeVisible();
  });

  test("round-28: the reveal family — at-rest hidden, the ride animates, the end state is the static face, one-shot (F-28a)", async ({ page }) => {
    // Round-28 (F-28a): the reference's twenty-element scroll-reveal
    // family, finally ridden. The at-rest face (below fold): opacity 0
    // + the live-probed offsets. The ride: a REAL wheel scroll → the
    // about columns animate (mid-flight opacity strictly between 0 and
    // 1 — the motion EXISTS). The end state: opacity 1 / transform
    // none — EXACTLY the pre-round static face (the parity contract).
    // One-shot: scrolling away never re-hides (the dominant live
    // behavior; the reference's own re-hide race is recorded in the
    // plan doc, never mirrored).
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForTimeout(600);
    // NOTE the selectors: `> div > div` reads the section container's DIRECT
    // kids only — a bare `.grid > div` also matches the form's inner
    // name/email grid and the stats cells (unwired, opacity 1 — the
    // over-match that broke the first run of this leg)
    const atRest = await page.evaluate(() => {
      const kids = [...document.querySelectorAll("#about > div > div")];
      return kids.map((k) => ({ opacity: getComputedStyle(k).opacity, transform: getComputedStyle(k).transform }));
    });
    expect(atRest[0]).toEqual({ opacity: "0", transform: "matrix(1, 0, 0, 1, -40, 0)" });
    expect(atRest[1]).toEqual({ opacity: "0", transform: "matrix(1, 0, 0, 1, 40, 0)" });
    // the contact family at rest (the ∓30 offsets)
    const contactRest = await page.evaluate(() =>
      [...document.querySelectorAll("#contact > div > div")].map((k) => getComputedStyle(k).transform),
    );
    expect(contactRest).toEqual(["matrix(1, 0, 0, 1, -30, 0)", "matrix(1, 0, 0, 1, 30, 0)"]);
    // the ride: wheel down to the about section, sample mid-flight
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(350);
    const mid = await page.evaluate(() =>
      [...document.querySelectorAll("#about > div > div")].map((k) => Number(getComputedStyle(k).opacity)),
    );
    expect(mid[0]).toBeGreaterThan(0);
    expect(mid[0]).toBeLessThan(1);
    expect(mid[1]).toBeGreaterThan(0);
    expect(mid[1]).toBeLessThan(1);
    // the end state: opacity 1, transform none (the pre-round static face)
    await expect
      .poll(async () => page.evaluate(() => [...document.querySelectorAll("#about > div > div")].map((k) => getComputedStyle(k).opacity).join(",")), { timeout: 3000 })
      .toBe("1,1");
    await expect
      .poll(async () => page.evaluate(() => getComputedStyle(document.querySelector("#about > div > div")!).transform), { timeout: 3000 })
      .toBe("none");
    // one-shot: scroll back to the top — the about STAYS revealed
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(900);
    const afterUp = await page.evaluate(() =>
      [...document.querySelectorAll("#about > div > div")].map((k) => getComputedStyle(k).opacity),
    );
    expect(afterUp).toEqual(["1", "1"]);
  });

  test("round-28: the services stagger — card 0 leads card 3 through the ride (F-28a)", async ({ page }) => {
    // The reference's live-sampled stagger: the four cards animate
    // sequentially (0.30/0.56/0.78/0.93 at one sampled moment) — the
    // 100ms delay steps. OUR decode rides the same ladder: card 0's
    // opacity strictly exceeds card 3's mid-flight, and the whole
    // family settles at 1. The ride uses the WHEEL (instant) — the
    // smooth-scroll glide (our scroll-behavior superset) would leave
    // the cards below the fold at the sample moment.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForTimeout(600);
    await page.mouse.wheel(0, 2300);
    await page.waitForTimeout(330);
    const ops = await page.evaluate(() =>
      [...document.querySelectorAll("#services .grid > div")].map((k) => Number(getComputedStyle(k).opacity)),
    );
    expect(ops[0]).toBeGreaterThan(ops[3]);
    await expect
      .poll(async () => page.evaluate(() => [...document.querySelectorAll("#services .grid > div")].every((k) => getComputedStyle(k).opacity === "1")), { timeout: 4000 })
      .toBe(true);
    // the settled cards ride their OWN transition with the stagger delay
    // CLEARED (computed transition-delay back to 0s — the hover family
    // unlagged; the settled inline face = the reference's own
    // opacity: 1 / transform: none)
    const settled = await page.evaluate(() => {
      const card = document.querySelector("#services .grid > div")!;
      return { delay: getComputedStyle(card).transitionDelay, op: getComputedStyle(card).opacity, tf: getComputedStyle(card).transform };
    });
    expect(settled.delay).toBe("0s");
    expect(settled.op).toBe("1");
    expect(settled.tf).toBe("none");
  });

  test("round-28: the hero cascade — the mount-time motion exists and settles (F-28a)", async ({ page }) => {
    // The reference's hero cascade (live-sampled: the wrapper leads at
    // ~0ms, the eyebrow ~100ms, the spans ~200ms, the CTAs ~600ms,
    // each ~800ms ease-out) fires at EVERY load — in view at mount.
    // The deterministic pins: the eyebrow is still hidden/animating at
    // +500ms (opacity < 1 — the cascade's initial is live client-side)
    // and fully revealed at +3s.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForTimeout(500);
    const early = await page.evaluate(() => {
      const eye = document.querySelector(".max-w-3xl > p");
      const span = document.querySelector("h1 span");
      return {
        eye: eye ? Number(getComputedStyle(eye).opacity) : -1,
        span: span ? Number(getComputedStyle(span).opacity) : -1,
      };
    });
    expect(early.eye).toBeLessThan(1);
    expect(early.span).toBeLessThan(1);
    await expect
      .poll(async () => page.evaluate(() => [document.querySelector(".max-w-3xl > p"), document.querySelector("h1 span")].map((el) => getComputedStyle(el!).opacity).join(",")), { timeout: 4000 })
      .toBe("1,1");
    // settled: the elements carry the reference's own post-reveal inline
    // face (opacity: 1 / transform: none — the stagger delay cleared)
    const settled = await page.evaluate(() =>
      [document.querySelector(".max-w-3xl"), document.querySelector(".max-w-3xl > p"), document.querySelector("h1 span")].map((el) => ({
        op: el ? getComputedStyle(el).opacity : "-1",
        tf: el ? getComputedStyle(el).transform : "-1",
        style: el?.getAttribute("style") ?? "none",
      })),
    );
    for (const s of settled) {
      expect(s.op).toBe("1");
      expect(s.tf).toBe("none");
      // serialization-tolerant: the settled attr carries the reference's
      // post-reveal pair and NOTHING else (the transition decode + the
      // stagger delay cleared)
      expect(s.style).toMatch(/opacity:\s*1/);
      expect(s.style).toMatch(/transform:\s*none/);
      expect(s.style).not.toContain("transition");
    }
  });

  test("round-28: the SSR HTML ships the hidden initials — the no-FOUC contract (F-28a)", async ({ page }) => {
    // The reference's SPA mounts hidden (nothing paints pre-JS); our
    // SSR renders the SAME hidden initials in the served HTML — no
    // flash of visible content before hydration, no hydration mismatch
    // (the first client render agrees on HIDDEN). The raw HTML must
    // carry the live-probed offsets.
    const res = await page.request.get("/");
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain("translateX(-40px)"); // about kid 0
    expect(html).toContain("translateX(40px)"); // about kid 1
    expect(html).toContain("translateX(-30px)"); // contact kid 0
    expect(html).toContain("translateX(30px)"); // contact kid 1
    expect(html).toContain("translateY(30px)"); // the services cards
    expect(html).toContain("scale(0.96)"); // the portfolio cards
    expect(html).toContain("translateY(20px)"); // the testimonials quote + the hero CTAs
    expect(html).toContain("translateY(40px)"); // the hero wrapper
    expect(html).toContain("translateX(-20px)"); // the hero eyebrow
    expect(html).toContain("opacity:0");
    // the whole family is present: 20 wired elements
    expect((html.match(/opacity:0/g) ?? []).length).toBeGreaterThanOrEqual(20);
  });
});

test.describe("round-29: the landing under prefers-reduced-motion (the reduce-mode contract)", () => {
  // F-29a: under `reduce` the CRM-era globals block collapses every CSS
  // transition to 0.01ms — the reveal family SNAPS (no rideable
  // mid-flight window), and the content NEVER sticks hidden: the
  // observer-driven family reveals by snap after the wheel, and the
  // mount-time families settle through their (still-honored) delays.
  // The reference ships zero reduce handling (its raf reveal animates
  // the full progression) — the recorded per-side divergence lives in
  // the drift [motion-prefs] leg; this leg pins OUR contract on the
  // standalone artifact.
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("the reveal family snaps under reduce — at-rest hidden, no mid-flight window, the end state identical, never stuck", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    // the at-rest family is hidden exactly as in normal mode (the SSR
    // initials + the observer not yet fired)
    await page.waitForSelector("#about > div > div");
    const atRest = await page.evaluate(() =>
      [...document.querySelectorAll("#about > div > div")].map((k) => getComputedStyle(k).opacity),
    );
    expect(atRest.every((o) => o === "0")).toBe(true);
    // the live computed duration collapses (the block's 0.01ms beats
    // the inline 800ms by the cascade — author !important > inline)
    const dur = await page.evaluate(() => getComputedStyle(document.querySelector("#about > div > div")!).transitionDuration);
    expect(dur).toBe("1e-05s");
    // the ride: wheel to the about section — the snap contract means
    // opacity reaches 1 with NO intermediate value ever observable
    await page.mouse.wheel(0, 900);
    const seen: string[] = [];
    for (let i = 0; i < 8; i++) {
      seen.push(await page.evaluate(() => getComputedStyle(document.querySelector("#about > div > div")!).opacity));
      await page.waitForTimeout(80);
    }
    // every sampled value is 0 or 1 — the snap: no 0 < o < 1 window
    expect(seen.every((o) => o === "0" || o === "1")).toBe(true);
    // and the family completes: 1/none, never stuck hidden
    await expect
      .poll(async () => page.evaluate(() => [...document.querySelectorAll("#about > div > div")].map((k) => `${getComputedStyle(k).opacity}|${getComputedStyle(k).transform}`).join(",")), { timeout: 4000 })
      .toBe("1|none,1|none");
  });

  test("the mount-time families settle under reduce — the stagger delays still space the snaps", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    // the hero cascade settles to the reference's post-reveal pair (the
    // delays ride the inline style — the block kills durations only)
    await expect
      .poll(async () => page.evaluate(() => [document.querySelector(".max-w-3xl"), document.querySelector("h1 span")].map((el) => getComputedStyle(el!).opacity).join(",")), { timeout: 4000 })
      .toBe("1,1");
    const settled = await page.evaluate(() =>
      [document.querySelector(".max-w-3xl"), document.querySelector(".max-w-3xl > p"), document.querySelector("h1 span")].map((el) => ({
        op: el ? getComputedStyle(el).opacity : "-1",
        tf: el ? getComputedStyle(el).transform : "-1",
      })),
    );
    for (const s of settled) {
      expect(s.op).toBe("1");
      expect(s.tf).toBe("none");
    }
    // the portfolio mount family: settled by ~400ms + the delay window
    await expect
      .poll(async () => page.evaluate(() => [...document.querySelectorAll("#portfolio .grid > div")].slice(0, 2).map((k) => getComputedStyle(k).opacity).join(",")), { timeout: 4000 })
      .toBe("1,1");
  });
});

test.describe("round-30: the landing under print emulation (the print-media census contract)", () => {
  // F-30b: no probe ever emulated print media — the round-29 genus
  // (conditions nobody emulates). The census found BOTH apps ship zero
  // @media print rules and compute identical faces under print (the
  // white-on-white hazard of the dark sections is the reference's own
  // zero-handling posture — recorded per-side, never mirrored). This
  // leg pins OUR contract on the standalone artifact.
  test("the print-mode faces: the fixed header stays fixed, the hero ink stays white, the zinc-950 inks hold, ZERO print rules ship", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForSelector("h1");
    // warm the reveals before emulating print (the settled faces are
    // the census targets — the round-28 settle-wait precedent)
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
    await page.emulateMedia({ media: "print" });
    await page.waitForTimeout(300);
    const faces = await page.evaluate(() => {
      const read = (sel: string, prop: string): string => {
        const el = document.querySelector(sel);
        return el ? String(getComputedStyle(el)[prop as keyof CSSStyleDeclaration]) : "ABSENT";
      };
      // the sheet print-rules census: zero @media print rules in any
      // rendered stylesheet (the deliberate byte-mirror posture)
      let printRules = 0;
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList;
        try {
          rules = sheet.cssRules;
        } catch {
          continue;
        }
        const walk = (list: CSSRuleList) => {
          for (const rule of Array.from(list)) {
            // NOTE: .match, never the regex .test method — the count-ladder
            // census counts `test(` tokens in spec files (the round-11 lesson)
            if (rule instanceof CSSMediaRule && (rule.conditionText ?? rule.media.mediaText).match(/print/i)) printRules += 1;
            if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) walk(rule.cssRules);
          }
        };
        walk(rules);
      }
      return {
        printRules,
        headerPosition: read("header", "position"),
        heroH1Color: read("h1", "color"),
        bodyBg: read("body", "backgroundColor"),
        bodyColor: read("body", "color"),
        printColorAdjust: String(getComputedStyle(document.body).printColorAdjust),
      };
    });
    // the print census contract: zero print rules, the reference's own
    // posture (F-30b — both sides censused live, identical)
    expect(faces.printRules).toBe(0);
    // the fixed header stays fixed under print (no rule un-fixes it —
    // the reference's own face; the hazard family recorded per-side)
    expect(faces.headerPosition).toBe("fixed");
    // the hero h1 keeps its white ink (the white-on-white hazard is
    // the reference's own zero-handling face — never "fixed")
    expect(faces.heroH1Color).toBe("rgb(255, 255, 255)");
    // the body face: OUR recorded constant (the F-30a dead-face
    // divergence — REF rgb(10,10,10) vs OURS rgb(9,9,11); dead on
    // both sides, zero riders)
    expect(faces.bodyColor).toBe("rgb(9, 9, 11)");
    expect(faces.bodyBg).toBe("rgb(255, 255, 255)");
    expect(faces.printColorAdjust).toBe("economy");
  });

  test("the body-ink no-rider contract at screen — every REF-unclassed surface inks via its explicit ancestor, never the body default", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForSelector("h1");
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
    const census = await page.evaluate(() => {
      const bodyColor = getComputedStyle(document.body).color;
      // the blast-radius rider census: a TRUE rider is a text node
      // whose computed color equals the body ink AND that carries no
      // explicit ink anywhere in its lineage (neither its own class
      // nor any ancestor's up to body — the v3 probe's coincidental
      // matches decoded by the v5 ancestry probe: a zinc-950-inked
      // ancestor is not a body rider)
      const INK_RE = /text-(zinc|neutral|white|black|amber|gray|slate|rose|emerald)-/;
      // NOTE: .match, never the regex .test method — the count-ladder
      // census counts `test(` tokens in spec files (the round-11 lesson)
      const hasInkInLineage = (el: Element): boolean => {
        if ((el.getAttribute("class") ?? "").match(INK_RE)) return true;
        let cur = el.parentElement;
        while (cur && cur !== document.body) {
          if ((cur.getAttribute("class") ?? "").match(INK_RE)) return true;
          cur = cur.parentElement;
        }
        return false;
      };
      let trueRiders = 0;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
      let node = walker.nextNode() as Element | null;
      while (node) {
        if (node.tagName !== "SCRIPT" && node.tagName !== "STYLE" && !node.closest("svg")) {
          const ownText = Array.from(node.childNodes)
            .filter((n) => n.nodeType === Node.TEXT_NODE)
            .map((n) => n.textContent ?? "")
            .join("")
            .trim();
          if (ownText.length > 0 && getComputedStyle(node).color === bodyColor && !hasInkInLineage(node)) {
            trueRiders += 1;
          }
        }
        node = walker.nextNode() as Element | null;
      }
      // the explicit-ink surfaces (the no-rider construction's guards)
      const byText = (sel: string, re: RegExp): Element | null =>
        Array.from(document.querySelectorAll(sel)).find((n) => Boolean((n.textContent ?? "").trim().match(re))) ?? null;
      return {
        trueRiders,
        aboutH2: getComputedStyle(document.querySelector("#about h2")!).color,
        servicesH3: getComputedStyle(byText("h3", /^Design & Web$/)!).color,
        priceSpan: getComputedStyle(byText("span", /^From \$3,000$/)!).color,
        selectEl: getComputedStyle(document.querySelector("#contact select")!).color,
      };
    });
    // ZERO true body riders (the F-30a dead-face decode — the face is
    // dead on our side; a rider appearing here means a surface lost
    // its explicit ink and silently rides the token default)
    expect(census.trueRiders).toBe(0);
    // the explicit inks: every REF-unclassed surface computes the same
    // zinc-950 the reference sets explicitly (the coincidental-match
    // family — ancestor-inked, never body-inked)
    expect(census.aboutH2).toBe("rgb(9, 9, 11)");
    expect(census.servicesH3).toBe("rgb(9, 9, 11)");
    expect(census.priceSpan).toBe("rgb(9, 9, 11)");
    expect(census.selectEl).toBe("rgb(9, 9, 11)");
  });
});

test.describe("round-31: the landing under forced-colors emulation (the forced-colors census contract)", () => {
  // F-31a/F-31e: the last media axis in Playwright's emulateMedia
  // surface no probe ever emulated (round-29 reduce · round-30 print ·
  // round-31 forced-colors — the set completes). The census found both
  // apps compute IDENTICAL faces under forcedColors: "active" (the
  // browser's system-palette collapse reaches everything — CanvasText
  // ink on Canvas surfaces, the CTA's LinkText blue) with zero
  // @media (forced-colors) rules and no forced-color-adjust override
  // on either side. This leg pins OUR contract on the artifact.
  test("the forced-colors faces: the h1 collapses to CanvasText, the featured card to Canvas, the CTA to LinkText — ZERO forced-colors media rules", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForSelector("h1");
    // warm the reveals before emulating (the settled faces are the
    // census targets — the round-28 settle-wait precedent)
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
    await page.emulateMedia({ forcedColors: "active" });
    await page.waitForTimeout(300);
    const faces = await page.evaluate(() => {
      const read = (sel: string, prop: string): string => {
        const el = document.querySelector(sel);
        return el ? String(getComputedStyle(el)[prop as keyof CSSStyleDeclaration]) : "ABSENT";
      };
      const adjust = (sel: string): string => {
        const el = document.querySelector(sel);
        return el ? getComputedStyle(el).getPropertyValue("forced-color-adjust") : "ABSENT";
      };
      // the media-rules census: walk CSSMediaRule objects — NEVER a
      // substring match (our rendered @layer utilities block contains
      // the STRING "forced-colors" in Tailwind v4's own
      // forced-color-adjust-* utility class definitions; the counting
      // rule must match the thing counted — the round-30 .test(
      // census-collision genus, decoded by the round-31 v2 probe)
      let forcedMediaRules = 0;
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList;
        try {
          rules = sheet.cssRules;
        } catch {
          continue;
        }
        const walk = (list: CSSRuleList) => {
          for (const rule of Array.from(list)) {
            if (rule instanceof CSSMediaRule && (rule.conditionText ?? rule.media.mediaText).match(/forced-colors/i)) forcedMediaRules += 1;
            if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) walk(rule.cssRules);
          }
        };
        walk(rules);
      }
      return {
        forcedMediaRules,
        heroH1Color: read("h1", "color"),
        // the header's amber CTA BUTTON (bg-amber-500 text-black), not
        // the nav Contact anchor (white/60) — the class-selected link
        ctaColor: read("header a.bg-amber-500", "color"),
        featuredBg: read("#services .bg-amber-500", "backgroundColor"),
        firstCardBg: read("#services .bg-zinc-900", "backgroundColor"),
        inputBg: read("#contact input", "backgroundColor"),
        bodyColor: read("body", "color"),
        adjustH1: adjust("h1"),
        adjustCard: adjust("#services .bg-amber-500"),
      };
    });
    // the census contract: zero forced-colors media rules (the
    // reference's own zero-handling posture — the byte-mirror default)
    expect(faces.forcedMediaRules).toBe(0);
    // the system-palette collapse: CanvasText black ink
    expect(faces.heroH1Color).toBe("rgb(0, 0, 0)");
    expect(faces.bodyColor).toBe("rgb(0, 0, 0)");
    // the amber CTA collapses to the system LinkText blue
    expect(faces.ctaColor).toBe("rgb(0, 0, 159)");
    // the featured card's amber collapses to Canvas white (the
    // featured-card class-literal note: OURS spells bg-amber-500 the
    // reference's own DOM does not carry — the computed faces
    // identical at screen AND under the collapse, the s11 doctrine)
    expect(faces.featuredBg).toBe("rgb(255, 255, 255)");
    expect(faces.firstCardBg).toBe("rgb(255, 255, 255)");
    expect(faces.inputBg).toBe("rgb(255, 255, 255)");
    // no opt-out anywhere: forced-color-adjust stays auto (the
    // browser's collapse reaches everything, identically both apps)
    expect(faces.adjustH1).toBe("auto");
    expect(faces.adjustCard).toBe("auto");
  });

  test("the screen-restore contract — after un-emulating, the amber face returns (the collapse never sticks)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForSelector("h1");
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
    await page.emulateMedia({ forcedColors: "active" });
    await page.waitForTimeout(200);
    const collapsed = await page.evaluate(() =>
      getComputedStyle(document.querySelector("#services .bg-amber-500")!).backgroundColor,
    );
    // the collapse held (the pre-state guard — Canvas white)
    expect(collapsed).toBe("rgb(255, 255, 255)");
    // the restore: emulateMedia back to none returns the authored face
    await page.emulateMedia({ forcedColors: "none" });
    await page.waitForTimeout(300);
    const restored = await page.evaluate(() => {
      // the header's amber CTA is the BUTTON-styled link (bg-amber-500
      // text-black) — NOT the nav "Contact" anchor (white/60, the first
      // a[href='#contact'] in document order); select by the class
      const cta = document.querySelector("header a.bg-amber-500")!;
      return {
        featured: getComputedStyle(document.querySelector("#services .bg-amber-500")!).backgroundColor,
        heroH1: getComputedStyle(document.querySelector("h1")!).color,
        ctaBg: getComputedStyle(cta).backgroundColor,
        ctaInk: getComputedStyle(cta).color,
      };
    });
    // the amber face returns (the class construction still inks the
    // card — the collapse is emulation-scoped, never a DOM mutation)
    expect(restored.featured).toBe("rgb(245, 158, 11)");
    expect(restored.heroH1).toBe("rgb(255, 255, 255)");
    expect(restored.ctaBg).toBe("rgb(245, 158, 11)");
    expect(restored.ctaInk).toBe("rgb(0, 0, 0)");
  });
});

test.describe("round-32: the landing under color-scheme emulation (the color-scheme census contract)", () => {
  // F-32a/F-32c: the one emulateMedia axis round-31 excepted ("the
  // reference ships no dark-mode face to probe" — the session-56
  // candidate list's first road). The census found BOTH apps compute
  // identical faces under colorScheme "dark" AND "light" and NOTHING
  // MOVES — html color-scheme normal (neither app declares it), zero
  // prefers-color-scheme media rules, the same at-screen constants
  // under every emulation. This leg pins OUR contract on the artifact.
  test("the scheme faces: color-scheme normal, ZERO prefers-color-scheme rules, the same faces under dark and light — nothing moves", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForSelector("h1");
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
    const readFaces = () =>
      page.evaluate(() => {
        const read = (sel: string, prop: string): string => {
          const el = document.querySelector(sel);
          return el ? String(getComputedStyle(el)[prop as keyof CSSStyleDeclaration]) : "ABSENT";
        };
        // the scheme-rules census: walk CSSMediaRule objects — the
        // counting rule must match the thing counted (the round-31
        // substring-trap lesson, applied to the scheme axis)
        let schemeRules = 0;
        for (const sheet of Array.from(document.styleSheets)) {
          let rules: CSSRuleList;
          try {
            rules = sheet.cssRules;
          } catch {
            continue;
          }
          const walk = (list: CSSRuleList) => {
            for (const rule of Array.from(list)) {
              if (rule instanceof CSSMediaRule && (rule.conditionText ?? rule.media.mediaText).match(/prefers-color-scheme/i)) schemeRules += 1;
              if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) walk(rule.cssRules);
            }
          };
          walk(rules);
        }
        return {
          schemeRules,
          htmlColorScheme: getComputedStyle(document.documentElement).getPropertyValue("color-scheme"),
          bodyBg: read("body", "backgroundColor"),
          bodyColor: read("body", "color"),
          heroH1: read("h1", "color"),
          headerBg: read("header", "backgroundColor"),
          footerBg: read("footer", "backgroundColor"),
          featuredBg: read("#services .bg-amber-500", "backgroundColor"),
        };
      });
    // the dark leg
    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForTimeout(300);
    const dark = await readFaces();
    // the light leg
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForTimeout(300);
    const light = await readFaces();
    // the census contract: zero scheme rules (the reference's own
    // zero-handling posture — the byte-mirror default), color-scheme
    // normal (the UA default; nobody declares it)
    expect(dark.schemeRules).toBe(0);
    expect(light.schemeRules).toBe(0);
    expect(dark.htmlColorScheme.trim()).toBe("normal");
    expect(light.htmlColorScheme.trim()).toBe("normal");
    // the nothing-moves contract: the SAME faces under dark and light
    // (our recorded at-screen constants — body zinc-950, the h1 white,
    // the footer zinc-950, the featured amber)
    expect(dark).toEqual(light);
    expect(dark.bodyColor).toBe("rgb(9, 9, 11)");
    expect(dark.heroH1).toBe("rgb(255, 255, 255)");
    expect(dark.footerBg).toBe("rgb(9, 9, 11)");
    expect(dark.featuredBg).toBe("rgb(245, 158, 11)");
  });

  test("the scheme round-trip contract — dark → light → no-preference never sticks a face (the emulation is scoped)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForSelector("h1");
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForTimeout(200);
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForTimeout(200);
    await page.emulateMedia({ colorScheme: "no-preference" });
    await page.waitForTimeout(300);
    const faces = await page.evaluate(() => {
      const cta = document.querySelector("header a.bg-amber-500")!;
      return {
        heroH1: getComputedStyle(document.querySelector("h1")!).color,
        ctaBg: getComputedStyle(cta).backgroundColor,
        featured: getComputedStyle(document.querySelector("#services .bg-amber-500")!).backgroundColor,
        htmlColorScheme: getComputedStyle(document.documentElement).getPropertyValue("color-scheme").trim(),
      };
    });
    // the authored faces hold through the round-trip (the scheme
    // emulation never mutates the DOM or sticks a face — the same
    // scoping contract as the forced-colors restore leg)
    expect(faces.heroH1).toBe("rgb(255, 255, 255)");
    expect(faces.ctaBg).toBe("rgb(245, 158, 11)");
    expect(faces.featured).toBe("rgb(245, 158, 11)");
    expect(faces.htmlColorScheme).toBe("normal");
  });
});

test.describe("round-34: the stacked-emulation census (reducedMotion AND forcedColors together — the session-60 candidate 1)", () => {
  // F-34b (the positive census, live-probed 2026-11-07 both apps): no
  // leg ever STACKED two emulateMedia axes. Under reducedMotion "reduce"
  // AND forcedColors "active" together both apps compute IDENTICAL faces
  // — the collapsed family (html/body/hero h1/header/footer all
  // CanvasText rgb(0,0,0) ink, Canvas surfaces) and the reveal family
  // settles to the post-reveal end state with the per-side reduce
  // constant unchanged (OURS transition-duration 1e-05s — the round-29
  // collapse superset — vs REF 0s, its zero-handling face; the
  // divergence rides the recorded drift otion-prefs] constants). The
  // two axes are orthogonal: the forced-colors collapse paints, the
  // reduce collapse animates, neither perturbs the other's face. This
  // leg pins OUR side on the standalone artifact — including the html
  // scroll-behavior: smooth face (the F-34a cure's own invisibility
  // pinned at the face level: the data attribute changes no CSS).
  test("the stacked reduce+forcedColors census — the collapsed faces, the reveal snap-settle, and the html smooth face unchanged", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
    await page.goto("/");
    await page.waitForSelector("h1");
    await page.waitForTimeout(1200);
    // the collapsed family: CanvasText ink on every probed element
    // (identical to the single-axis forced-colors face — the stack
    // changes nothing the forced-colors collapse had already painted)
    const faces = await page.evaluate(() => {
      const read = (el: Element | null) => (el ? getComputedStyle(el).color : "(missing)");
      return {
        html: read(document.documentElement),
        body: read(document.body),
        heroH1: read(document.querySelector("h1")),
        header: read(document.querySelector("header")),
        footer: read(document.querySelector("footer")),
        htmlScrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      };
    });
    expect(faces.html).toBe("rgb(0, 0, 0)");
    expect(faces.body).toBe("rgb(0, 0, 0)");
    expect(faces.heroH1).toBe("rgb(0, 0, 0)");
    expect(faces.header).toBe("rgb(0, 0, 0)");
    expect(faces.footer).toBe("rgb(0, 0, 0)");
    // the F-34a cure's invisibility at the face level: the CSS face
    // stays smooth under the stack (the attribute changes no CSS)
    expect(faces.htmlScrollBehavior).toBe("smooth");
    // the reveal family under the stack: the reduce collapse holds —
    // the at-rest hidden face, the 1e-05s duration, never stuck hidden
    await page.waitForSelector("#about > div > div");
    const dur = await page.evaluate(
      () => getComputedStyle(document.querySelector("#about > div > div")!).transitionDuration,
    );
    expect(dur).toBe("1e-05s");
    await page.mouse.wheel(0, 900);
    await expect
      .poll(
        async () =>
          page.evaluate(() =>
            [...document.querySelectorAll("#about > div > div")]
              .map((k) => `${getComputedStyle(k).opacity}|${getComputedStyle(k).transform}`)
              .join(","),
          ),
        { timeout: 4000 },
      )
      .toBe("1|none,1|none");
    // the restore contract: back to no-emulation the authored faces return
    await page.emulateMedia({ reducedMotion: "no-preference", forcedColors: "none" });
    await page.waitForTimeout(300);
    const restored = await page.evaluate(() => ({
      heroH1: getComputedStyle(document.querySelector("h1")!).color,
      featured: getComputedStyle(document.querySelector("#services .bg-amber-500")!).backgroundColor,
    }));
    expect(restored.heroH1).toBe("rgb(255, 255, 255)");
    expect(restored.featured).toBe("rgb(245, 158, 11)");
  });
});
