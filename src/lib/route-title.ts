// Round-25 (F-25a — the route-mechanics/404-title census): the
// reference's CURRENT build DERIVES the unknown-route title from the
// pathname — its designed 404 carries "Verify Email | EleganceFlow" at
// /verify-email, "Nonexistent Xyz | EleganceFlow" at /nonexistent-xyz,
// "Dashboard | EleganceFlow" at its (route-less) /dashboard — the
// D-194a4 "bare brand on the 404" record was stale for the current
// bundle (it read the pre-current build). The rule, decoded from all
// ten round-25 probe cases (live-probed settled 2026-11-05):
//   strip the query → strip trailing slashes → take the LAST path
//   segment → replace [-_]+ with spaces → split camelCase boundaries
//   (lower→upper) → title-case each word (first char upper, rest
//   untouched — "UPPER" stays "UPPER", "cAsE" → "C As E") → append
//   " | EleganceFlow".
// The ten-case decode's load-bearing members: `/foo/bar` → "Bar" (the
// LAST segment only, never the full path); `/MiXeD-cAsE` → "Mi Xe D C
// As E" (the camel-split); `/login//` → "Login" (trailing slashes strip
// before the last-segment read); `/-leading-hyphen` → "Leading Hyphen"
// (the empty word drops); `/nonexistent-xyz?q=1` → "Nonexistent Xyz"
// (the query is ignored).
//
// The empty-word edges (the root, an all-slash pathname, the empty
// string) return the bare brand — the seam is total, and the layout's
// title.default carries the same face.
//
// The flip is CLIENT-side by design (the reference's own SPA injects
// document.title at runtime — its raw shell carries none of the title
// family; the settled face is the parity bar): NotFoundBody assigns
// document.title through this seam in an effect, the same
// runtime-injection idiom.

import { SITE_NAME } from "@/lib/site-content";

/** The reference's unknown-route title derivation (the round-25
 *  census rule — see the module record above). */
export function deriveNotFoundTitle(pathname: string): string {
  // strip the query (and any hash), strip trailing slashes, read the
  // LAST path segment
  const last = pathname
    .split(/[?#]/, 1)[0]!
    .replace(/\/+$/, "")
    .split("/")
    .pop()!;
  // hyphens/underscores (runs included) become spaces; the leading-run
  // empties drop via trim
  const spaced = last.replace(/[-_]+/g, " ").trim();
  if (!spaced) return SITE_NAME;
  // the camelCase split (a lower→upper boundary starts a new word)
  const camelSplit = spaced.replace(/([a-z])([A-Z])/g, "$1 $2");
  // title-case: the FIRST char of each word uppercased, the rest
  // untouched ("UPPER" stays, "123" stays, "cAsE" → "C As E")
  const titled = camelSplit.replace(/\b\w/g, (c) => c.toUpperCase());
  return `${titled.replace(/\s+/g, " ")} | ${SITE_NAME}`;
}
