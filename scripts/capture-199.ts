// Session-199: THE DEV-SERVER SCREENSHOT SET — the remediated codebase's
// faces (the operator's standing ask). Pairs with the reference captures
// already under docs/screenshots/ (ref-landing-desktop-1280-fullpage.png,
// ref-landing-mobile-390-fullpage.png, ref-mobile-menu-open-390.png,
// ref-login-desktop-1280.png).
//
// Run: bun scripts/capture-199.ts   (expects the dev server on :3000;
// round-33: the navigation rides the HMR-tolerant probeLoad — the dev
// server's Turbopack HMR websockets never let networkidle fire)
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";
import { probeLoad } from "./probe-load";

const OURS = "http://localhost:3000";
const OUT = "docs/screenshots";

/**
 * Round-28 (F-28a): the landing's below-fold sections rest at opacity 0
 * (the scroll-reveal family — the reference's own motion identity). A
 * full-page capture would shoot them hidden, so every LANDING capture
 * warms the reveals first — a scroll ride through the page and back,
 * waiting out the ~800ms animations — then shoots the SETTLED page
 * (the same face every prior round captured).
 */
async function warmReveals(page: import("@playwright/test").Page) {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  // ---- desktop landing (full page) ---------------------------------------
  const desk = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await probeLoad(desk, OURS);
  await desk.waitForTimeout(1500);
  await warmReveals(desk);
  await desk.screenshot({ path: `${OUT}/ours-landing-desktop-1280-fullpage.png`, fullPage: true });

  // ---- desktop login -------------------------------------------------------
  await probeLoad(desk, `${OURS}/login`);
  await desk.waitForTimeout(600);
  await desk.screenshot({ path: `${OUT}/ours-login-desktop-1280.png` });

  // ---- desktop inbox (the authenticated superset) --------------------------
  await probeLoad(desk, `${OURS}/login`);
  await desk.getByLabel("Email").fill("sepnetflix2023@outlook.com");
  await desk.getByLabel("Password").fill("$Abcd1234");
  await desk.getByRole("button", { name: "Sign in" }).click();
  await desk.waitForURL("**/dashboard");
  await desk.waitForTimeout(1200);
  await desk.screenshot({ path: `${OUT}/ours-dashboard-inbox-desktop-1280.png`, fullPage: true });
  await desk.context().clearCookies();

  // ---- phone landing (full page) -------------------------------------------
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await probeLoad(mob, OURS);
  await mob.waitForTimeout(1200);
  await warmReveals(mob);
  await mob.screenshot({ path: `${OUT}/ours-landing-mobile-390-fullpage.png`, fullPage: true });

  // ---- phone menu OPEN (the operator's emphasis) ----------------------------
  await mob.getByRole("button", { name: "Open menu" }).click();
  await mob.waitForTimeout(500);
  await mob.screenshot({ path: `${OUT}/ours-mobile-menu-open-390.png` });
  // and the close face
  await mob.getByRole("button", { name: "Close menu" }).click();
  await mob.waitForTimeout(400);
  await mob.screenshot({ path: `${OUT}/ours-mobile-menu-closed-390.png` });

  // ---- the contact SUCCESS PANEL (round-19 — F-19a's face) -----------------
  // The reference's submit REMOVES the form and renders the persistent
  // in-place panel; the capture rides OUR form with the POST
  // route-fulfilled (the dev db takes no probe row — the panel is
  // client-side state after the fetch resolves).
  const panelCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await panelCtx.route("**/api/inquiry", (route) =>
    route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, data: { inquiry: { id: "capture" } } }),
    }),
  );
  const panelPage = await panelCtx.newPage();
  await probeLoad(panelPage, OURS);
  await panelPage.waitForTimeout(1000);
  const csec = panelPage.locator("#contact");
  await csec.scrollIntoViewIfNeeded();
  await csec.locator('input[type="text"], input:not([type])').first().fill("Capture Probe");
  await csec.locator('input[type="email"]').first().fill("capture@session199.test");
  await csec.locator("select").first().selectOption({ label: "Brand Strategy" });
  await csec.locator("textarea").first().fill("The round-19 success-panel capture.");
  await csec.getByRole("button", { name: /send/i }).click();
  await panelPage.waitForTimeout(1200);
  await panelPage.screenshot({ path: `${OUT}/ours-contact-success-1280.png` });
  await panelCtx.close();

  // ---- the reset SENT CARD (round-20 — F-20a's face) -----------------------
  // The ghost-email ride: valid format, no mailbox, no account — the
  // no-enumeration 200 swaps the card in place (no db row on the
  // unknown path), the ANNOUNCED green callout (role=alert, the
  // platform's own idiom — the round-20 cure) renders under the h2,
  // and the null resetUrl degrades to no link.
  const sentCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const sentPage = await sentCtx.newPage();
  await probeLoad(sentPage, `${OURS}/login`);
  await sentPage.waitForTimeout(600);
  await sentPage.getByRole("button", { name: "Forgot password?" }).click();
  await sentPage.waitForTimeout(900);
  await sentPage.getByLabel("Email").fill("no-such-user-round20@example.com");
  await sentPage.getByRole("button", { name: "Send reset link" }).click();
  await sentPage.waitForTimeout(1600);
  await sentPage.screenshot({ path: `${OUT}/ours-reset-sent-1280.png` });
  await sentCtx.close();

  // ---- THE ROUND-26 RESET-ROUTE faces (the platform family cure) -----
  // The /reset-password route's two guest states after the F-26a/b/c
  // cure: the invalid-link card (the Title-Case heading + the 80x40
  // red-100 CircleAlert + the BreadcrumbList JSON-LD riding) and the
  // token form (the 2px gray-900 strip + the Title-Case labels + the
  // h-11/6px gray control family + the zinc-500 placeholder). The pins
  // ride tests/reset-faces.test.ts + the e2e FACE battery + the drift
  // [reset] leg.
  const r26aCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const r26aPage = await r26aCtx.newPage();
  await probeLoad(r26aPage, `${OURS}/reset-password`);
  await r26aPage.waitForTimeout(900);
  await r26aPage.screenshot({ path: `${OUT}/ours-reset-invalid-1280.png` });
  await r26aCtx.close();

  const r26bCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const r26bPage = await r26bCtx.newPage();
  await probeLoad(r26bPage, `${OURS}/reset-password?token=capture-r26`);
  await r26bPage.waitForTimeout(900);
  await r26bPage.screenshot({ path: `${OUT}/ours-reset-form-1280.png` });
  await r26bCtx.close();

  // ---- the GOOGLE-BUTTON TOAST (round-21 — the honest fallback face) ------
  // The click ride on OUR card: the reference navigates to a REAL Google
  // OAuth redirect (unimplementable here — the redirect_uri is base44's);
  // ours degrades to the honest info toast (bottom-right at 1280,
  // role=status, auto-dismisses at 4s). Captured mid-toast (600ms after
  // the click — before the 4s timer retires it).
  const toastCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const toastPage = await toastCtx.newPage();
  await probeLoad(toastPage, `${OURS}/login`);
  await toastPage.waitForTimeout(600);
  await toastPage.getByRole("button", { name: "Continue with Google" }).click();
  await toastPage.waitForTimeout(600);
  await toastPage.screenshot({ path: `${OUT}/ours-google-toast-1280.png` });
  await toastCtx.close();

  // ---- the INTERMEDIATE-VIEWPORT faces (round-22 — the boundaries) ---------
  // The two breakpoint boundaries no capture ever showed: the md (768)
  // landing — the header flipped to the desktop nav, the h1 at 72px —
  // and the sm (640) login card — the h-12 inputs, the p-10 inner pads,
  // the sm:flex-row footer. Live-verified COMPUTE IDENTICAL on both
  // apps (R-22a, the positive census; the pins ride
  // tests/viewport-faces.test.ts + the drift [viewport] leg).
  const b768 = await browser.newPage({ viewport: { width: 768, height: 900 } });
  await probeLoad(b768, OURS);
  await b768.waitForTimeout(1200);
  await warmReveals(b768);
  await b768.screenshot({ path: `${OUT}/ours-landing-768.png`, fullPage: true });

  const b640 = await browser.newPage({ viewport: { width: 640, height: 900 } });
  await probeLoad(b640, `${OURS}/login`);
  await b640.waitForTimeout(900);
  await b640.screenshot({ path: `${OUT}/ours-login-640.png` });

  // ---- the DEEP-LINK LANDED view (round-23 — the superset's own face) ------
  // The cold-boot /#portfolio ride: OURS lands the native SSR scroll (the
  // section at the viewport top, the header in its scrolled state) — the
  // reference's SPA never scrolls its deep links (R-23b: its shell renders
  // the sections after the browser's one-time boot-time hash scroll; the
  // round-18 soft-404 precedent — the reference's own defect, ours the
  // working superset). The pins ride tests/anchor-faces.test.ts ①④ + the
  // drift [anchors] leg + the e2e deep-link leg.
  const deepCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const deepPage = await deepCtx.newPage();
  await probeLoad(deepPage, `${OURS}/#portfolio`);
  await deepPage.waitForTimeout(1600);
  await deepPage.screenshot({ path: `${OUT}/ours-deeplink-portfolio-1280.png` });
  await deepCtx.close();

  await browser.close();
  console.log("captures saved under", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
