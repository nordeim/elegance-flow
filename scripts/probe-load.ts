import type { Page } from "@playwright/test";

/**
 * Round-33 (F-33a): the HMR-tolerant navigation contract for the live
 * probe scripts — the cure for the probe-hang bug diagnosed live this
 * round.
 *
 * `waitUntil: "networkidle"` NEVER fires against a healthy Next.js 16
 * dev server: Turbopack's HMR websockets persist for the page's
 * lifetime (32 `ws://…/_next/hmr` connections observed on ONE page
 * load; a raw curl handshake returns 101 and holds). Every such goto
 * wedges at its 30s timeout and the wedged run hangs the probe
 * silently (the round-18 launch-ceiling family) — the scripts' own
 * "expects our dev server on :3000" contracts were unexecutable,
 * including the operator's standing dev-server capture instruction.
 *
 * The contract (the a11y spec's own tolerant pattern, applied at the
 * navigation seam):
 *
 *   1. `domcontentloaded` FIRST — the event that always fires (the
 *      HMR sockets never block it);
 *   2. a BOUNDED `waitForLoadState("networkidle")` with `.catch` —
 *      settles the reference SPA's client-side fetches (no persistent
 *      sockets there, so it fires in seconds) and the standalone
 *      artifact's static assets; never fatal against the dev server,
 *      where it simply times out and falls through;
 *   3. the settle window — the app's own hydration absorbed on every
 *      path.
 *
 * The production fast paths (the reference, the standalone artifact)
 * keep their networkidle semantics; only the dev server rides the
 * bounded fallback. Pinned by tests/probe-load-contract.test.ts.
 */
export async function probeLoad(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => {});
  await page.waitForTimeout(1_200);
}
