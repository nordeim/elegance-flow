import { expect, test } from "@playwright/test";

import { e2ePort } from "./e2e-port";

// Session-199: THE INQUIRIES INBOX BATTERY — the superset workspace's
// behavioral spec. The seeded e2e.db ships exactly three inquiries (one
// per status: Maya/new · David/read · Priya/archived).
//
// SELF-SUFFICIENCY DISCIPLINE (the alphabetical-execution contract):
// spec files run in one worker, alphabetically — this file runs AFTER
// auth.spec but BEFORE landing.spec, so it NEVER asserts on another
// spec's rows. Every transition drives THIS spec's OWN probe row,
// minted through the public POST on a DEDICATED XFF bucket (the s163
// isolation doctrine — the shared inquiry budget stays clean).
//
// The spec also carries the direct-API WALL probe (the 401 without a
// session — the s69 e2e-port single-source consumer).

const PORT = e2ePort();

test.describe("the inquiries inbox (authenticated)", () => {
  let probeId: string | null = null;

  test.beforeAll(async ({ request }) => {
    // This spec's own probe row — the public POST on the isolated bucket.
    const res = await request.post("/api/inquiry", {
      headers: { "x-forwarded-for": "198.51.100.201" },
      data: {
        name: "Inbox Probe Row",
        email: "inbox-probe@e2e.test",
        service: "Brand Strategy",
        message: "The dashboard-inbox battery's own seeded probe row.",
      },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.ok).toBe(true);
    probeId = typeof body.data?.id === "string" ? body.data.id : null;
    expect(probeId).not.toBeNull();
  });

  test("the inbox renders the seeded rows and the studio chrome", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await expect(page.getByRole("heading", { name: "Inquiries" })).toBeVisible();
    // the seeded names (one per status)
    await expect(page.getByText("Maya Rodriguez")).toBeVisible();
    await expect(page.getByText("David Kim")).toBeVisible();
    // this spec's probe row (new status → on the Active tab)
    await expect(page.getByText("Inbox Probe Row").first()).toBeVisible();
    // the shell's user chip
    await expect(page.getByTestId("shell-user-email")).toContainText("sepnetflix2023@outlook.com");
  });

  test("the tabs narrow the list honestly", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await expect(page.getByText("Maya Rodriguez").first()).toBeVisible();
    await page.getByTestId("tab-archived").click();
    await expect(page.getByText("Priya Nair")).toBeVisible();
    await expect(page.getByText("Maya Rodriguez")).toHaveCount(0);
    await page.getByTestId("tab-new").click();
    await expect(page.getByText("Maya Rodriguez").first()).toBeVisible();
    await expect(page.getByText("David Kim")).toHaveCount(0);
    await page.getByTestId("tab-active").click();
    await expect(page.getByText("Maya Rodriguez").first()).toBeVisible();
  });

  test("the status transition: Mark read moves a new inquiry out of the New tab", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    const li = page.locator("li").filter({ hasText: "Inbox Probe Row" });
    await expect(li).toBeVisible();
    await li.getByTestId("mark-read").click();
    await expect(page.getByText("Marked as read")).toBeVisible();
    // the New tab no longer carries the probe row
    await page.getByTestId("tab-new").click();
    await expect(page.getByText("Inbox Probe Row")).toHaveCount(0);
    // the Active tab still shows it (non-archived)
    await page.getByTestId("tab-active").click();
    await expect(li).toBeVisible();
  });

  test("archive → unarchive restores to the active list", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    const david = page.locator("li").filter({ hasText: "David Kim" });
    await expect(david).toBeVisible();
    await david.getByTestId("archive").click();
    await expect(page.getByText("Inquiry archived")).toBeVisible();
    await expect(page.getByText("David Kim")).toHaveCount(0);
    await page.getByTestId("tab-archived").click();
    await expect(david).toBeVisible();
    await david.getByTestId("unarchive").click();
    await expect(page.getByText("Restored to the active list")).toBeVisible();
    await page.getByTestId("tab-active").click();
    await expect(david).toBeVisible();
  });

  test("the delete is two-step: the trash arms a Confirm, Cancel disarms it", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    const li = page.locator("li").filter({ hasText: "Inbox Probe Row" });
    await expect(li).toBeVisible();
    await li.getByTestId("delete").click();
    await expect(li.getByTestId("confirm-delete")).toBeVisible();
    await li.getByRole("button", { name: "Cancel" }).click();
    await expect(li.getByTestId("confirm-delete")).toHaveCount(0);
    await expect(li).toBeVisible();
  });

  test("search narrows the list across name/email/message", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await page.getByTestId("inquiry-search").fill("Brand Strategy");
    await expect(page.getByText("David Kim").first()).toBeVisible();
    await expect(page.getByText("Maya Rodriguez")).toHaveCount(0);
    await page.getByTestId("inquiry-search").fill("");
    await expect(page.getByText("Maya Rodriguez").first()).toBeVisible();
  });

  test("sign out tears the session and lands on the login card", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await page.getByTestId("sign-out").click();
    await page.waitForURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toBeVisible();
    // the session is dead: /dashboard walls now
    await page.goto("/dashboard");
    await page.waitForURL(/\/login\?from_url=/);
  });
});

test.describe("the sessioned API wall probe (the e2e-port consumer)", () => {
  test("the direct /api/inquiry GET answers 401 without a session (the wall at the port)", async ({ playwright }) => {
    // The N-69g single-source doctrine's behavioral half: this probe
    // consumes e2e-port (the ONE default), hitting the standalone
    // server's port directly. The request rides an ISOLATED context —
    // the project's `request` fixture would carry the shared
    // storageState's session cookie, and the wall must be probed
    // cookieless.
    const bare = await playwright.request.newContext({
      // EXPLICITLY empty — the runner default may otherwise inherit the
      // project's storageState (the shared session cookie), and the wall
      // must be probed cookieless.
      storageState: { cookies: [], origins: [] },
    });
    const res = await bare.get(`http://localhost:${PORT}/api/inquiry`);
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.ok).toBe(false);
    await bare.dispose();
  });
});

test.describe("round-34: the route-transition scroll contract (F-34a — the instant reset)", () => {
  test("the logout ride resets the scroll INSTANTLY — zero intermediate values across the transition (the data-scroll-behavior cure)", async ({ page }) => {
    // F-34a (live-verified 2026-11-07 against bun run dev): without the
    // data-scroll-behavior="smooth" attribute on <html> the App
    // Router's transition scroll rides the CSS smooth rule (the
    // installed router's disableSmoothScrollDuringRouteTransition runs
    // the scroll naked when dataset.scrollBehavior !== 'smooth') — the
    // live symptom probe: /login scrolled to 300px →
    // router.push('/dashboard') animated 300→188→163→121→115 across
    // ~500ms (47 intermediate samples at 40ms cadence). With the
    // attribute the router wraps its scroll in scroll-behavior: auto —
    // every sample is the pre-transition offset or the settled top.
    // The logout ride is the same transition class (the shell's
    // router.push('/login') after the POST) with zero rate-limit
    // pressure (the route clears the cookie only — the shared
    // storageState file is untouched).
    await page.setViewportSize({ width: 1280, height: 400 });
    await page.goto("/dashboard");
    // the scrolled source state (the CSS smooth applies to the setup
    // scroll itself — wait out the ride; 150 rides safely under the
    // dashboard's max scroll at this height, ~188px)
    await page.evaluate(() => window.scrollTo(0, 150));
    await page.waitForTimeout(900);
    expect(await page.evaluate(() => window.scrollY)).toBe(150);
    // the ride: sign out → POST /api/auth/logout → router.push("/login")
    await page.getByTestId("sign-out").click();
    const seen: number[] = [];
    const t0 = Date.now();
    while (Date.now() - t0 < 2_000) {
      seen.push(await page.evaluate(() => window.scrollY));
      await page.waitForTimeout(40);
    }
    await page.waitForURL(/\/login$/);
    // the instant-reset contract: NO animation window — every sample is
    // the pre-transition offset (150) or the settled top (0); the
    // pre-cure tree exhibits the animated descent and REDS here
    const intermediates = seen.filter((y) => y > 0 && y < 150);
    expect(
      intermediates,
      `the transition animated: ${intermediates.join(", ")} (the pre-cure face — the router's scroll must not ride the CSS smooth)`,
    ).toEqual([]);
    expect(seen.at(-1)).toBe(0);
    // the parity face the cure must never change: the CSS itself stays
    // smooth (the drift [reveal] leg censuses it IDENTICAL both apps —
    // the attribute is invisible to every computed-face probe)
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
    ).toBe("smooth");
  });
});
