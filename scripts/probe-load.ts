import type { Frame, Page } from "@playwright/test";

/**
 * Round-33 (F-33a): the HMR-tolerant navigation contract for the live
 * probe scripts — the cure for the probe-hang bug diagnosed live that
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
 *
 * Round-36 (F-36a): the STABILITY RIDE — the cold-boot Fast-Refresh
 * reload-loop guard, the cure for the wedge class diagnosed live that
 * round. A dev server booted cold right after a gate's `next build`
 * wiped `.next/dev` can — intermittently — enter an infinite
 * full-page-reload loop (the console signature `[HMR] connected` +
 * `[Fast Refresh] rebuilding` at sub-second cadence; 126 main-frame
 * navigations observed on ONE idle load). Every in-flight
 * evaluate/click throws "Execution context was destroyed", and clicks
 * between reloads land on UN-HYDRATED pages — the mobile-menu toggle
 * reads aria-expanded false after a click, the standing emphasis's
 * exact false-negative. The guard: a main-frame navigation counter
 * riding the EXISTING settle window (zero net time on the healthy
 * path). A stray post-connect reload — the dev server's normal
 * on-demand-compile face — settles inside ONE confirming extension
 * window and the load proceeds; a SUSTAINED loop keeps firing through
 * the extension and throws the DIAGNOSED error (the restart cure
 * named in the message — loud seconds instead of a silent
 * minutes-long wedge). Pinned by the round-36 blocks of the same
 * battery.
 */
export async function probeLoad(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => {});
  // the stability ride (F-36a): the counter attaches AFTER the goto —
  // the load's own navigation is never counted — and detaches in the
  // finally (no listener leak across the drift script's ~40 calls)
  let reloads = 0;
  const onNav = (frame: Frame) => {
    if (frame === page.mainFrame()) reloads += 1;
  };
  page.on("framenavigated", onNav);
  try {
    await page.waitForTimeout(1_200);
    if (reloads > 0) {
      // the confirming extension: a stray reload settles (the page
      // goes quiet); a sustained loop keeps firing
      const stray = reloads;
      await page.waitForTimeout(1_500);
      if (reloads > stray) {
        throw new Error(
          'probeLoad: the page is in a sustained reload loop (the dev server\'s cold-boot Fast-Refresh pathology — the console signature "[HMR] connected" + "[Fast Refresh] rebuilding" at sub-second cadence; dev.log floods GET /). The empirical cure: RESTART the dev server (`bun run dev` again) — the second boot reads the warmed .next/dev state and is stable. Every probe against the looping server wedges or reads an un-hydrated page.',
        );
      }
    }
  } finally {
    page.off("framenavigated", onNav);
  }
}
