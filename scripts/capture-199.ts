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

  await browser.close();
  console.log("captures saved under", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
