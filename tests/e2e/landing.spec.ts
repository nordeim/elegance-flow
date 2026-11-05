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
});
