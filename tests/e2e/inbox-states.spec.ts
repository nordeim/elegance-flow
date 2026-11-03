import { expect, test } from "@playwright/test";

// Round-11: THE INBOX-STATES BATTERY — the web-application skill §20
// pre-ship's "Empty-state, loading, and error paths exercised for every
// changed surface", never before run in this domain. The inbox's five
// state faces were implemented and live-working but carried ZERO gate
// coverage (the dashboard-inbox battery pins rows/tabs/transitions/
// delete/search/sign-out/401 — never a state face). Here every face
// rides the REAL UI against route interception:
//
//   the initial-load loading face     (a delayed GET → the spinner)
//   the network-error face            (an aborted GET → the alert)
//   the server-error face             (a 500 envelope → the HONEST
//                                      server message, verbatim)
//   the recovery face                 (error → a good load → the alert
//                                      clears, the list returns)
//   the empty-search face             (the query echoed in the miss)
//
// Plus the CLIENT-ERROR census (the round-11 second finding): the e2e
// suite carried ZERO console/page-error pins — the hydration-mismatch /
// uncaught-exception class (the skill §18 incident family) is invisible
// to every other gate. The census pins ZERO console errors and ZERO
// page errors on the clean surfaces (landing at both viewports, the
// login card, the authenticated dashboard), with the designed 404's
// SANCTIONED register: the true-404 document's own
// "Failed to load resource … 404" browser report is the only entry
// allowed there (the superset answers 404 honestly), and page errors
// stay zero everywhere.
//
// SELF-SUFFICIENCY DISCIPLINE (the alphabetical-execution contract):
// this spec runs after dashboard-inbox and before keyboard — it never
// asserts another spec's rows. The state tests read only the SEED
// contract's stable rows (Maya/David/Priya) or faces that no other spec
// mutates; the route interception is local to each test and always
// unrooted in-place. The storageState is the shared session (the
// authenticated surface is the surface under test — the login census
// test stays on /login: the card has NO authenticated redirect, the
// session-23 decode).

const ALERT = '[role="alert"]';

// The designed 404's sanctioned register: the browser's own report of
// the true-404 document (and any same-class 404 resource on that
// surface) — everything else is a finding.
const SANCTIONED_404_REPORT = /^Failed to load resource: the server responded with a status of 404/;

test.describe("the inbox state faces (authenticated, route-intercepted)", () => {
  test("the initial load renders the explicit loading face (the delayed GET → the spinner, never a blank)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    // Intercept BEFORE the visit: the mount-time fetch rides the delay.
    await page.route("**/api/inquiry*", async (route) => {
      await new Promise((r) => setTimeout(r, 1200));
      await route.continue();
    });
    await page.goto("/dashboard");
    await expect(page.getByText("Loading inquiries…")).toBeVisible();
    // the delay passes and the seeded rows settle in
    await expect(page.getByText("Maya Rodriguez").first()).toBeVisible({ timeout: 15_000 });
    await page.unroute("**/api/inquiry*");
  });

  test("a failed fetch renders the network-error alert (the aborted GET)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await expect(page.getByText("Maya Rodriguez").first()).toBeVisible();
    await page.route("**/api/inquiry*", async (route) => {
      await route.abort("failed");
    });
    // a tab switch fires a fresh load() → the abort → the error face
    await page.getByTestId("tab-archived").click();
    await expect(
      page.locator(ALERT).filter({ hasText: "Network error — check your connection and try again." }),
    ).toBeVisible();
    // the stale list never lingers under the error face
    await expect(page.getByTestId("inquiry-list")).toHaveCount(0);
    await page.unroute("**/api/inquiry*");
  });

  test("a 500 envelope renders the HONEST server message (the error.message surfaced verbatim)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await expect(page.getByText("Maya Rodriguez").first()).toBeVisible();
    await page.route("**/api/inquiry*", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          error: { code: "INTERNAL", message: "The studio server had a hiccup" },
        }),
      });
    });
    await page.getByTestId("tab-new").click();
    await expect(
      page.locator(ALERT).filter({ hasText: "The studio server had a hiccup" }),
    ).toBeVisible();
    await page.unroute("**/api/inquiry*");
  });

  test("the recovery face: a good load after an error clears the alert and returns the list", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await expect(page.getByText("Maya Rodriguez").first()).toBeVisible();
    await page.route("**/api/inquiry*", async (route) => {
      await route.abort("failed");
    });
    await page.getByTestId("tab-archived").click();
    await expect(
      page.locator(ALERT).filter({ hasText: "Network error" }),
    ).toBeVisible();
    // the network heals: the next load succeeds
    await page.unroute("**/api/inquiry*");
    await page.getByTestId("tab-active").click();
    await expect(page.getByText("Maya Rodriguez").first()).toBeVisible();
    await expect(page.locator(ALERT).filter({ hasText: "Network error" })).toHaveCount(0);
  });

  test("the empty-search face echoes the query (no match → the explicit miss)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await expect(page.getByText("Maya Rodriguez").first()).toBeVisible();
    await page.getByTestId("inquiry-search").fill("zzz-no-such-inquiry");
    await expect(page.getByText("No inquiries match")).toBeVisible();
    await expect(page.getByText("zzz-no-such-inquiry").first()).toBeVisible();
    // the seeded rows are gone from the visible face
    await expect(page.getByTestId("inquiry-list")).toHaveCount(0);
  });
});

test.describe("the client-error census (zero console errors, zero page errors — the skill §18 incident family under the gate)", () => {
  test("the landing at 1280 ships ZERO console errors and ZERO page errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(`PAGEERROR: ${String(e)}`));
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    expect(errors).toEqual([]);
  });

  test("the landing at 390 ships ZERO console errors and ZERO page errors (the mobile face)", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(`PAGEERROR: ${String(e)}`));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    expect(errors).toEqual([]);
  });

  test("the login card ships ZERO console errors and ZERO page errors (the production artifact — no dev-mode warning)", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(`PAGEERROR: ${String(e)}`));
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/login", { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    expect(errors).toEqual([]);
  });

  test("the authenticated dashboard ships ZERO console errors and ZERO page errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(`PAGEERROR: ${String(e)}`));
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/dashboard");
    await expect(page.getByText("Maya Rodriguez").first()).toBeVisible();
    await page.waitForTimeout(800);
    expect(errors).toEqual([]);
  });

  test("the designed 404 carries ONLY its sanctioned register (the true-404 document's own report) and ZERO page errors", async ({ page }) => {
    const errors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => pageErrors.push(String(e)));
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/nonexistent-round-11-probe", { waitUntil: "networkidle" }).catch(() => {
      // the true-404 status aborts the load promise on some builds —
      // the face itself is asserted below
    });
    await page.waitForTimeout(800);
    // the designed face (the superset answers 404 with a real surface)
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
    await expect(page.getByText("Page Not Found")).toBeVisible();
    // the register: only the document's own 404 resource report is
    // sanctioned — every other console error is a finding. (NB: .match,
    // never .test — the count-ladder census regex counts a bare
    // `.test(` as a test block, the recorded lesson.)
    const sanctioned = errors.filter((t) => t.match(SANCTIONED_404_REPORT) !== null);
    const unsanctioned = errors.filter((t) => t.match(SANCTIONED_404_REPORT) === null);
    expect(sanctioned.length).toBeGreaterThan(0);
    expect(sanctioned.length).toBeLessThanOrEqual(2);
    expect(unsanctioned).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
});
