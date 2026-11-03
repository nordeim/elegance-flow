import { expect, test } from "@playwright/test";

import { e2ePort } from "./e2e-port";

// Round-10: THE KEYBOARD-OPERABILITY BATTERY — the web-application
// skill §13's prescribed "Keyboard paths are tested" standing duty,
// never before run in this domain (the e2e suite carried ZERO keyboard
// interaction; axe cannot check focus-visibility STYLING; the parity
// probe reads at-rest faces only). Every check here rides the KEYBOARD
// alone: Enter opens, Enter rides, Tab focuses — the pointer never
// touches the control under assertion (the login form is FILLED, its
// submit never clicked).
//
// The two computed pins:
//   - the focus-visible ring on an inbox control (WCAG 2.4.7 — F-1's
//     gate-level face: the superset shipped INVISIBLE focus),
//   - the auth card's sign-in ring arm rgb(9, 9, 11) 0px 0px 0px 4px
//     (the LIVE reference's computed ring — F-2's pin, the round-8
//     blur(4px) trap pattern; --color-ring re-pinned #0a0a0a → #09090b).
//
// SELF-SUFFICIENCY DISCIPLINE (the alphabetical-execution contract):
// this spec runs after dashboard-inbox and before landing — it never
// asserts another spec's rows; the two-step delete drives THIS spec's
// OWN probe row on a DEDICATED XFF bucket (the s163 isolation
// doctrine). The logged-out describe opts out of the shared
// storageState (the auth.spec pattern).

const PORT = e2ePort();

test.describe("the keyboard-operability battery (logged-out surfaces)", () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test("the mobile menu opens by keyboard (Enter on the hamburger at 390×844)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const toggle = page.locator("header button").first();
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.locator("header a").filter({ hasText: "About" }).filter({ visible: true }).first(),
    ).toBeVisible();
  });

  test("a mobile-menu link rides by keyboard (Enter on About → the anchor AND the panel closes)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const toggle = page.locator("header button").first();
    await toggle.focus();
    await page.keyboard.press("Enter");
    const about = page
      .locator("header a")
      .filter({ hasText: "About" })
      .filter({ visible: true })
      .first();
    await about.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(600);
    expect(page.url()).toContain("#about");
    await expect(
      page.locator("header a").filter({ hasText: "About" }).filter({ visible: true }).first(),
    ).toBeHidden();
  });

  test("the login form submits by keyboard (Enter in the password field → the inbox)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/login");
    await page.getByLabel("Email").fill("sepnetflix2023@outlook.com");
    await page.getByLabel("Password").fill("$Abcd1234");
    await page.getByLabel("Password").press("Enter");
    await page.waitForURL("**/dashboard", { timeout: 15000 });
    await expect(page.getByRole("heading", { name: "Inquiries" })).toBeVisible();
  });

  test("the auth card's sign-in button computes the reference's zinc-950 focus ring (rgb(9, 9, 11))", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/login");
    await page.getByLabel("Email").fill("sepnetflix2023@outlook.com");
    await page.getByLabel("Password").fill("$Abcd1234");
    // Keyboard-focus the submit: click INTO the password field, then Tab
    // (the next focusable in DOM order is the Sign in button — the only
    // element between them is the conditional error callout, absent).
    await page.getByLabel("Password").click();
    await page.keyboard.press("Tab");
    // The card's transition-all duration-200 ANIMATES the ring in
    // (0.34px/alpha-0.09 mid-flight observed at this battery's birth) —
    // settle before reading the computed face.
    await page.waitForTimeout(400);
    const ring = await page
      .getByRole("button", { name: "Sign in" })
      .evaluate((el) => getComputedStyle(el).boxShadow);
    // The LIVE reference's computed ring arm (settled, live-probed
    // 2026-11-04): the zinc-950 --color-ring re-pin's computed face.
    expect(ring).toContain("rgb(9, 9, 11) 0px 0px 0px 4px");
  });

  test("round-13: the landing's focused filter chip computes the reference's universal outline color (rgba(10, 10, 10, 0.5))", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    // Keyboard-ride to the "All" filter chip (the chips sit after the
    // header links and the hero CTAs in tab order; the bounded loop
    // keys on the ACTIVE ELEMENT, never a fixed Tab count).
    let found = false;
    for (let i = 0; i < 24 && !found; i++) {
      await page.keyboard.press("Tab");
      await page.waitForTimeout(60);
      found = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        return !!el && el.tagName === "BUTTON" && (el.textContent ?? "").trim() === "All";
      });
    }
    expect(found, "the All filter chip was never reached by Tab").toBe(true);
    // F-1's gate-level face: the universal outline-color decoupled from
    // --color-ring — the LIVE reference's landing bundle computes
    // rgba(10, 10, 10, 0.5) (neutral-950 @ 50%) on every UA-outline-
    // painting control; ours had computed zinc-950@50% (the round-10
    // cure-collision). Settled read (the transition discipline).
    await page.waitForTimeout(300);
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const s = getComputedStyle(el);
      return { color: s.outlineColor, style: s.outlineStyle };
    });
    expect(outline.color).toBe("rgba(10, 10, 10, 0.5)");
    expect(outline.style).toBe("auto");
  });

  test("round-13: the auth card's focused input computes the reference's v3 outline-none face (2px transparent + offset 2px)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/login");
    // Text inputs match :focus-visible on ANY focus (per spec) — a
    // click into the field is a true focus ride.
    await page.getByLabel("Email").click();
    await page.waitForTimeout(300);
    const face = await page
      .getByLabel("Email")
      .evaluate((el) => {
        const s = getComputedStyle(el);
        return { outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`, offset: s.outlineOffset };
      });
    // F-2's gate-level face: the reference's v3 `outline-none` computes
    // `outline: 2px solid transparent; outline-offset: 2px` (verified
    // live via CSSOM + CDP); v4's outline-none computes style:none —
    // the seventh re-pin trap, ported via outline-hidden.
    expect(face.outline).toBe("solid 2px rgba(0, 0, 0, 0)");
    expect(face.offset).toBe("2px");
  });
});

test.describe("the keyboard-operability battery (the authenticated inbox)", () => {
  let probeId: string | null = null;

  test.beforeAll(async ({ request }) => {
    // This spec's own probe row — the public POST on the isolated bucket.
    const res = await request.post("/api/inquiry", {
      headers: { "x-forwarded-for": "198.51.100.212" },
      data: {
        name: "Keyboard Probe Row",
        email: "keyboard-probe@e2e.test",
        service: "Brand Strategy",
        message: "The keyboard battery's own seeded probe row.",
      },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.ok).toBe(true);
    probeId = typeof body.data?.id === "string" ? body.data.id : null;
    expect(probeId).not.toBeNull();
  });

  test("the inbox tabs activate by keyboard (Enter on Archived → aria-selected)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    const archived = page.getByTestId("tab-archived");
    await archived.focus();
    await page.keyboard.press("Enter");
    await expect(archived).toHaveAttribute("aria-selected", "true");
    // the seeded archived row surfaces on the Archived tab
    await expect(page.getByText("Priya Nair").first()).toBeVisible();
  });

  test("the two-step delete rides on keyboard alone (Enter → confirm → Enter → gone)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    const li = page.locator("li").filter({ hasText: "Keyboard Probe Row" });
    await expect(li).toBeVisible();
    const del = li.getByTestId("delete");
    await del.focus();
    await page.keyboard.press("Enter");
    const confirm = li.getByTestId("confirm-delete");
    await expect(confirm).toBeVisible();
    await confirm.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByText("Keyboard Probe Row")).toHaveCount(0);
  });

  test("a focused inbox control renders a VISIBLE focus ring (WCAG 2.4.7 — the focus-visible computed face)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    // Keyboard-focus a tab: click into the search input (a stable
    // focusable AFTER the tab strip in DOM order), then Shift+Tab —
    // the previous focusable is the LAST tab button (All), focused by
    // KEYBOARD, so :focus-visible applies.
    await page.getByTestId("inquiry-search").click();
    await page.keyboard.press("Shift+Tab");
    const shadow = await page
      .getByTestId("tab-all")
      .evaluate((el) => getComputedStyle(el).boxShadow);
    // F-1's gate-level face: before round-10 this computed "none" —
    // the superset shipped invisible focus (outline:none, no ring).
    expect(shadow).not.toBe("none");
    expect(shadow.length).toBeGreaterThan(4);
  });
});
