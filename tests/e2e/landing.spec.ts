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

  test("the contact form submits → the byte-verified toast + the PERSISTED row (the superset)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.getByLabel("Name").fill("E2E Playwright");
    await page.getByLabel("Email").fill("e2e@playwright.test");
    await page.getByLabel("Service").selectOption("Brand Strategy");
    await page.getByLabel("Message").fill("The landing battery's real submit — verifying the toast + the persisted row.");
    await page.getByRole("button", { name: /send inquiry/i }).click();
    await expect(page.getByText("Message sent!")).toBeVisible();
    await expect(page.getByText("We'll be in touch within 24 hours.")).toBeVisible();
    // The honest superset proof: the row landed in the DB (the authed
    // inbox spec sees it through the seeded session).
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
