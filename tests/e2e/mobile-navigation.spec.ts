import { expect, test } from "@playwright/test";

// Session-199: THE MOBILE NAVIGATION BATTERY — the operator's standing
// emphasis, at the reference's own phone axis (390×844, the probe
// viewport the reference audit walked). Every behavior below was
// verified live on the reference (probe-2's open-state DOM + the
// click-through):
//
//   · resting: logo + the hamburger (aria-label "Open menu", the
//     desktop ul + CTA are hidden md:*)
//   · open: the INLINE disclosure panel under the nav row (md:hidden
//     bg-zinc-950 border-t border-white/10 …) — five links + the amber
//     CTA; the button flips to "Close menu" + the X icon
//   · a link click navigates the anchor AND closes the panel
//   · the CTA click navigates to #contact AND closes the panel
//   · the header's scrolled state works at phone width too
//
// This is ALSO the Tailwind v4 sentinel surface: the disclosure rides
// plain `md:hidden`/`hidden md:flex` visibility classes — the families
// the v4 hover/space-y/shadow traps historically broke. The suite
// fails if the menu stops opening, stops closing, stops riding the
// anchor, or renders at desktop width.

const PHONE = { width: 390, height: 844 } as const;

test.describe("the mobile navigation (390×844)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto("/");
  });

  test("resting: the logo + the hamburger; the desktop nav and CTA are hidden", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(page.locator("header nav ul")).toBeHidden();
    await expect(page.locator("header nav").getByRole("link", { name: "Get in Touch" })).toBeHidden();
    await expect(page.getByRole("link", { name: "YOUR STUDIO" })).toBeVisible();
  });

  test("the toggle opens the inline panel with all five links + the amber CTA", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    const panel = page.locator("header > div.md\\:hidden");
    await expect(panel).toBeVisible();
    for (const label of ["About", "Services", "Work", "Testimonials", "Contact"]) {
      await expect(panel.getByRole("link", { name: label })).toBeVisible();
    }
    await expect(panel.getByRole("link", { name: "Get in Touch" })).toBeVisible();
    // the button flips to its close face
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  });

  test("a panel link navigates the anchor AND closes the panel (About → #about)", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    const panel = page.locator("header > div.md\\:hidden");
    await panel.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/#about$/);
    await expect(panel).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("the panel CTA navigates #contact AND closes the panel", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    const panel = page.locator("header > div.md\\:hidden");
    await panel.getByRole("link", { name: "Get in Touch" }).click();
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(panel).toBeHidden();
  });

  test("the toggle closes the open panel without navigating", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    const panel = page.locator("header > div.md\\:hidden");
    await expect(panel).toBeVisible();
    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(panel).toBeHidden();
    await expect(page).toHaveURL(/\/$/);
  });

  test("the scrolled header state works at phone width (the blur + py-4 flip)", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toHaveClass(/bg-transparent py-6/);
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await expect(header).toHaveClass(/bg-zinc-950\/95 backdrop-blur-md/);
  });

  test("the hero rides the phone column (flex-col CTA row, both CTAs reachable)", async ({ page }) => {
    await expect(page.getByRole("link", { name: /start a project/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /see our work/i })).toBeVisible();
    // the reference's hero CTA row at phone: flex-col (the sm:flex-row
    // flip rides the sm: breakpoint, not md:)
    const row = page.locator(".max-w-3xl > .flex");
    await expect(row).toHaveClass(/flex flex-col sm:flex-row gap-4/);
  });

  test("at desktop width the hamburger is gone and the inline nav is back", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
    await expect(page.locator("header nav ul")).toBeVisible();
    await expect(page.locator("header nav").getByRole("link", { name: "Get in Touch" })).toBeVisible();
  });

  test("round-35: the rotation ride — an OPEN menu crossing to landscape hides both faces, and the state survives the round-trip", async ({ page }) => {
    // The orientation crossing (844×390 — the md boundary crossed from
    // below WITH THE MENU OPEN, the one leg of the standing emphasis
    // never ridden): live-proven identical on the reference (its panel
    // also reopens, its label also stays "Close menu"); the sole delta
    // OUR aria-expanded (the documented superset). Pinned by
    // tests/orientation-faces.test.ts.
    const panel = page.locator("header > div.md\\:hidden");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(panel).toBeVisible();

    // Rotate to landscape: the toggle + the panel ride md:hidden, the
    // desktop nav family renders — the open state survives HIDDEN.
    await page.setViewportSize({ width: 844, height: 390 });
    await expect(page.getByRole("button", { name: "Close menu" })).toBeHidden();
    await expect(panel).toBeHidden();
    await expect(page.locator("header nav ul")).toBeVisible();
    await expect(page.locator("header nav").getByRole("link", { name: "Get in Touch" })).toBeVisible();

    // Rotate back: the panel REOPENS automatically — the reference's
    // own face (the state was never reset by the crossing).
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(panel).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  });
});
