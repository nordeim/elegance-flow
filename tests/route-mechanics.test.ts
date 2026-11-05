/**
 * Round-25 route-mechanics battery: the URL/ROUTE-MECHANICS family no
 * probe ever rode (the 404's own TITLE derivation, the trailing-slash
 * and case-variant mechanics, the query passthrough, the guest
 * adjudication) finally sits under the unit gate.
 *
 * The coverage gap this battery closes (live-probed settled
 * 2026-11-05, both apps, guest-only GETs):
 *
 * ① THE DERIVATION RULE (F-25a, HIGH — the 404 title family): the
 *   reference's CURRENT build DERIVES the unknown-route title from the
 *   pathname — strip the query → strip trailing slashes → take the
 *   LAST path segment → replace [-_]+ with spaces → split camelCase
 *   boundaries (lower→upper) → title-case each word → append
 *   " | EleganceFlow". All ten probe cases decode the ONE rule
 *   (including `/foo/bar` → "Bar" — last segment only — and
 *   `/MiXeD-cAsE` → "Mi Xe D C As E" — the camel-split). OURS had
 *   shipped the bare brand (the D-194a4 record was stale for the
 *   current bundle).
 * ② THE EDGE FAMILY: the empty-word edges (root, all-slashes, the
 *   empty string) return the bare brand — the seam is TOTAL, and the
 *   all-slash face is the family the bare-brand fallback owns.
 * ③ THE WIRING (the source contract): NotFoundBody writes the
 *   seam's derived title directly and RE-WINS it event-driven — a
 *   MutationObserver on the head re-writing the title after every
 *   revert (the round's live decode — four failed candidates
 *   probed: the bare effect assignment, the rendered <title>
 *   element, the foreign prepended node, and the zero-tick timer
 *   all settle back to the bare brand; the reverter is the LATE
 *   asynchronous title write that lands after each of them). The
 *   observer converges once the last patch lands and disconnects
 *   on unmount, so the next route's own assertion owns the title
 *   from there.
 * ④ THE NOT-FOUND NO-METADATA KEEP (the D-194a4 retirement stands):
 *   not-found.tsx ships NO metadata export — the layout's bare-brand
 *   default renders first, and the client flip rides on top.
 * ⑤ THE LAYOUT DEFAULT KEEP: the root layout's title.default carries
 *   the bare brand — the family both the real routes' absolute titles
 *   and the 404 flip start from.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

import { deriveNotFoundTitle } from "@/lib/route-title";

const here = path.dirname(new URL(import.meta.url).pathname);
const read = (rel: string) => readFileSync(path.join(here, rel), "utf8");
const strip = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");

const bodySrc = read("../src/app/not-found-body.tsx");
const notFoundSrc = read("../src/app/not-found.tsx");
const layoutSrc = read("../src/app/layout.tsx");

describe("session-199 round-25: the route-mechanics/404-title census", () => {
  it("the derivation rule mirrors the reference's unknown-route title family (the ten probed cases)", () => {
    // The reference's own derived titles, live-probed settled
    // 2026-11-05 (the round-25 discovery census).
    for (const [pathname, want] of [
      ["/verify-email", "Verify Email | EleganceFlow"],
      ["/Login", "Login | EleganceFlow"],
      ["/login/", "Login | EleganceFlow"],
      ["/nonexistent-xyz", "Nonexistent Xyz | EleganceFlow"],
      ["/dashboard", "Dashboard | EleganceFlow"],
      ["/foo/bar", "Bar | EleganceFlow"],
      ["/foo-bar-baz", "Foo Bar Baz | EleganceFlow"],
      ["/UPPER-CASE", "UPPER CASE | EleganceFlow"],
      ["/with_underscore", "With Underscore | EleganceFlow"],
      ["/digits-123", "Digits 123 | EleganceFlow"],
      ["/a", "A | EleganceFlow"],
      ["/login//", "Login | EleganceFlow"],
      ["/nonexistent-xyz?q=1", "Nonexistent Xyz | EleganceFlow"],
      ["/-leading-hyphen", "Leading Hyphen | EleganceFlow"],
      ["/MiXeD-cAsE", "Mi Xe D C As E | EleganceFlow"],
    ] as const) {
      expect(deriveNotFoundTitle(pathname), pathname).toBe(want);
    }
  });

  it("the empty-word edges return the bare brand (the seam is total)", () => {
    for (const p of ["/", "//", "///", ""]) {
      expect(deriveNotFoundTitle(p)).toBe("EleganceFlow");
    }
  });

  it("NotFoundBody wires the derived title through the seam (the write + the event-driven re-win)", () => {
    const stripped = strip(bodySrc).replace(/\s+/g, " ");
    // the write + the observer (the round's live decode: four failed
    // candidates — the bare assignment, the rendered element, the
    // foreign prepend, the zero-tick timer — all reverted by the LATE
    // asynchronous title write; the MutationObserver re-wins from any
    // mechanism at any latency, converging once the last patch lands)
    expect(stripped).toContain(
      "const want = deriveNotFoundTitle(pathname);",
    );
    expect(stripped).toContain("document.title = want;");
    expect(stripped).toContain("const mo = new MutationObserver(() => {");
    expect(stripped).toContain("if (document.title !== want) document.title = want;");
    expect(stripped).toContain('from "@/lib/route-title"');
    // the mounted gate (after the mounted-flip commit) and the unmount
    // disconnect (the next route's own assertion owns the title from
    // there — the Go Home ride lands the landing with its own face)
    expect(stripped).toContain("if (!mounted) return;");
    expect(stripped).toContain("mo.disconnect();");
    // Round-27 (F-27d) re-pin: the GUARDED bare-brand reset in the cleanup —
    // React's <title> reconciliation skips the write when the incoming
    // route resolves the same string its record owns (the 404 and the
    // landing BOTH resolve the layout-default "EleganceFlow"), so the
    // derived 404 title would otherwise PERSIST on the landing after the
    // Go Home ride (live-probed on the artifact; the reference's SPA
    // resets to the bare brand). The guard converges in every commit
    // order: only when the DOM still carries OUR derived value does the
    // cleanup hand the bare brand back — a titled next route (React
    // writes its own differing value, before or after this cleanup)
    // never gets clobbered.
    expect(stripped).toContain(
      'if (document.title === want) document.title = "EleganceFlow";',
    );
  });

  it("not-found.tsx ships no metadata export — the bare-brand default renders, the client flip rides on top (the D-194a4 retirement stands)", () => {
    const stripped = strip(notFoundSrc).replace(/\s+/g, " ");
    expect(stripped).not.toMatch(/\bexport\s+const\s+metadata\b/);
    expect(stripped).not.toMatch(/\bexport\s+async\s+function\s+generateMetadata\b/);
  });

  it("the root layout's title.default carries the bare brand (the family every title starts from)", () => {
    const stripped = strip(layoutSrc).replace(/\s+/g, " ");
    expect(stripped).toContain('default: "EleganceFlow"');
    expect(stripped).toContain('template: "%s | EleganceFlow"');
  });
});
