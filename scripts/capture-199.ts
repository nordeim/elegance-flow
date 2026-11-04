// Session-199: THE DEV-SERVER SCREENSHOT SET — the remediated codebase's
// faces (the operator's standing ask). Pairs with the reference captures
// already under docs/screenshots/ (ref-landing-desktop-1280-fullpage.png,
// ref-landing-mobile-390-fullpage.png, ref-mobile-menu-open-390.png,
// ref-login-desktop-1280.png).
//
// Run: bun scripts/capture-199.ts   (expects the dev server on :3000)
import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const OURS = "http://localhost:3000";
const OUT = "docs/screenshots";

async function main() {
  mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  // ---- desktop landing (full page) ---------------------------------------
  const desk = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await desk.goto(OURS, { waitUntil: "networkidle" });
  await desk.waitForTimeout(1500);
  await desk.screenshot({ path: `${OUT}/ours-landing-desktop-1280-fullpage.png`, fullPage: true });

  // ---- desktop login -------------------------------------------------------
  await desk.goto(`${OURS}/login`, { waitUntil: "networkidle" });
  await desk.waitForTimeout(600);
  await desk.screenshot({ path: `${OUT}/ours-login-desktop-1280.png` });

  // ---- desktop inbox (the authenticated superset) --------------------------
  await desk.goto(`${OURS}/login`, { waitUntil: "networkidle" });
  await desk.getByLabel("Email").fill("sepnetflix2023@outlook.com");
  await desk.getByLabel("Password").fill("$Abcd1234");
  await desk.getByRole("button", { name: "Sign in" }).click();
  await desk.waitForURL("**/dashboard");
  await desk.waitForTimeout(1200);
  await desk.screenshot({ path: `${OUT}/ours-dashboard-inbox-desktop-1280.png`, fullPage: true });
  await desk.context().clearCookies();

  // ---- phone landing (full page) -------------------------------------------
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mob.goto(OURS, { waitUntil: "networkidle" });
  await mob.waitForTimeout(1200);
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
  await panelPage.goto(OURS, { waitUntil: "networkidle" });
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
  await sentPage.goto(`${OURS}/login`, { waitUntil: "networkidle" });
  await sentPage.waitForTimeout(600);
  await sentPage.getByRole("button", { name: "Forgot password?" }).click();
  await sentPage.waitForTimeout(900);
  await sentPage.getByLabel("Email").fill("no-such-user-round20@example.com");
  await sentPage.getByRole("button", { name: "Send reset link" }).click();
  await sentPage.waitForTimeout(1600);
  await sentPage.screenshot({ path: `${OUT}/ours-reset-sent-1280.png` });
  await sentCtx.close();

  // ---- the GOOGLE-BUTTON TOAST (round-21 — the honest fallback face) ------
  // The click ride on OUR card: the reference navigates to a REAL Google
  // OAuth redirect (unimplementable here — the redirect_uri is base44's);
  // ours degrades to the honest info toast (bottom-right at 1280,
  // role=status, auto-dismisses at 4s). Captured mid-toast (600ms after
  // the click — before the 4s timer retires it).
  const toastCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const toastPage = await toastCtx.newPage();
  await toastPage.goto(`${OURS}/login`, { waitUntil: "networkidle" });
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
  await b768.goto(OURS, { waitUntil: "networkidle" });
  await b768.waitForTimeout(1200);
  await b768.screenshot({ path: `${OUT}/ours-landing-768.png`, fullPage: true });

  const b640 = await browser.newPage({ viewport: { width: 640, height: 900 } });
  await b640.goto(`${OURS}/login`, { waitUntil: "networkidle" });
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
  await deepPage.goto(`${OURS}/#portfolio`, { waitUntil: "networkidle" });
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
