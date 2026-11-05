"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { deriveNotFoundTitle } from "@/lib/route-title";
import { NOT_FOUND_LAYOUT } from "@/lib/page-layout";

/**
 * Client body of the custom 404 (session-12 S12-P2) — the reference's
 * message interpolates the unmatched PATHNAME inside a font-medium
 * slate-700 span, which only a client component can read. Structure
 * (VLM round-1 + DOM-verified): space-y-6 center with THREE children —
 * the space-y-2 heading group (404 + the 2px×64px slate-200 divider
 * bar), the space-y-3 text group (Page Not Found + message), and the
 * pt-6 button group (Go Home).
 *
 * Session-194 (D-194a1): the reference interpolates its router path
 * WITHOUT the leading slash — `The page "x" could not be found…` (the
 * walk67 maiden decode: the span 604,459 103x19 on the reference vs
 * our verbatim-usePathname form 601,459 108x19). Next's usePathname()
 * carries the leading slash, so the interpolation strips it:
 * pathname.replace(/^\//, "") (the deep-path form "/a/b" → "a/b"
 * matches the reference's router path on both).
 *
 * Session-194 (D-194a2): the Go Home arm is a <Link href="/"> — an
 * ANCHOR, the WCAG-correct link semantics for a navigation affordance
 * (role=link, the href affordances: right-click, cmd-click, AT
 * announcements). The reference renders a <button> with NO href (its
 * SPA JS-router idiom) — its own platform gap, the D-112a2
 * a11y-superset doctrine's next member, never mirrored. Every VISIBLE
 * layer byte-equal (the walk67 decode: box 658,556 123x38 · color ·
 * bg · border · radius · font · padding identical two-app), and the
 * rides byte-equal (both land at the landing "/").
 *
 * Session-194 (D-194a3): the Go Home glyph is the reference's
 * HEROICONS home outline inlined verbatim — exactly ONE path, NO
 * stroke-width attr (computed weight 1 — the reference's visibly
 * lighter stroke the walk decoded against lucide's weight-2 default),
 * NO width/height attrs, the bare w-4 h-4 mr-2 class. The M-82c2
 * icon-identity family's first CROSS-LIBRARY member (the D-186a1
 * pen-cure precedent — the reference's exact glyph restored); the
 * lucide `house` import retires at this one site (the reference's 404
 * view is its platform template's own origin — the one non-lucide
 * icon family in its tree). OUR aria-hidden stays (the s19 superset
 * family — the reference's svg carries none, its own a11y gap).
 *
 * Round-25 (F-25a — the 404 TITLE family): the reference's CURRENT
 * build DERIVES the unknown-route title from the pathname
 * ("Verify Email | EleganceFlow" at /verify-email — the D-194a4
 * "bare brand" record was stale for the current bundle). The flip
 * rides THIS component (the only place the pathname lives) through
 * the pure seam (src/lib/route-title.ts — the ten-case census rule)
 * written directly and RE-WON event-driven. Why the observer (the
 * round's live decode — four failed candidates probed): a bare
 * `document.title = …` in an effect is reverted by the LATE title
 * write (the effect fired, the value computed right, the assignment
 * read back derived — and the title still settled to the bare
 * brand); a RENDERED <title> element hoists AFTER Next's metadata
 * title (the browser reads the first) and the two-phase value
 * change appends a THIRD instance — the metadata title still wins;
 * a FOREIGN prepended <title> node lands first, but the late write
 * mutates the FIRST title element — the foreign node itself
 * (live-probed: both head titles read the bare brand); a zero-tick
 * TIMER write lands after every sync effect and still gets reverted
 * (the reverter is asynchronous — it fires after the timer, when the
 * streamed flight payload's head segment acquires the title
 * singleton and patches its text to the layout's bare brand). The
 * MutationObserver re-wins deterministically: every revert (from any
 * mechanism, at any latency) re-fires the rewrite, converging once
 * the last patch lands; it disconnects on unmount, and a navigation
 * away re-fires the next route's own assertion (the Go Home ride
 * lands the landing with its own face).
 */
export function NotFoundBody() {
  const pathname = usePathname();
  // Round-11 (the client-error census's catch): the /_not-found route is
  // PRERENDERED at build time — the baked HTML interpolates the
  // build-time pathname "_not-found", while the client's first render
  // would interpolate the REAL unmatched path → React #418 (text
  // mismatch) on every real 404 of the standalone artifact (the dev
  // server renders per-request and never showed it). The two-phase
  // decode (the landing scroll-state idiom): hydrate with the baked
  // literal — the exact value the server HTML carries, so hydration
  // compares equal — then fill the real path after mount. The visible
  // face settles to the reference's face (the real path); the e2e
  // client-error census pins the zero-page-error bar, and landing.spec's
  // 404 pin holds the visible face.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    // The deferred flip (the inbox's loader idiom): setState rides a
    // zero-tick timer, never the effect's synchronous pass — the
    // react-hooks/set-state-in-effect contract.
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);
  // Round-25 (F-25a): the derived title — the reference's own 404 face
  // ("Verify Email | EleganceFlow"), written directly and RE-WON
  // event-driven (the module record above decodes why every simpler
  // candidate loses to the late title revert). Gated on mounted so the
  // first write lands after the mounted-flip commit; the observer
  // handles every later revert.
  React.useEffect(() => {
    if (!mounted) return;
    // The timer lands AFTER every sync effect — including Next's own
    // client-side metadata title assertion (a parent-level effect that
    // runs after this child effect on every commit and overwrites any
    // bare assignment or prepended node; live-probed this round). The
    // LAST writer wins, and nothing writes after the timer: the page
    // is inert post-mount (no further commits), and a navigation away
    // re-fires Next's metadata assertion for the next route.
    const want = deriveNotFoundTitle(pathname);
    document.title = want;
    // The re-win: the reference's own SPA injects its titles at runtime;
    // OUR runtime has a reverter (the late head-hydration patch —
    // live-probed this round: the write lands, reads back derived, then
    // flips back to the layout's bare brand once the streamed flight
    // payload acquires the title singleton). Event-driven, self-limiting:
    // every revert re-fires the rewrite, converging once the last patch
    // lands; the observer disconnects on unmount and the next route's
    // own assertion owns the title from there.
    const mo = new MutationObserver(() => {
      if (document.title !== want) document.title = want;
    });
    mo.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => {
      mo.disconnect();
    };
  }, [mounted, pathname]);
  const shownPath = mounted ? pathname.replace(/^\//, "") : "_not-found";
  return (
    <div className={NOT_FOUND_LAYOUT.page}>
      <div className={NOT_FOUND_LAYOUT.card}>
        <div className={NOT_FOUND_LAYOUT.center}>
          <div className={NOT_FOUND_LAYOUT.headingGroup}>
            <h1 className={NOT_FOUND_LAYOUT.h1}>404</h1>
            <div className={NOT_FOUND_LAYOUT.divider} aria-hidden="true" />
          </div>
          <div className={NOT_FOUND_LAYOUT.textGroup}>
            <h2 className={NOT_FOUND_LAYOUT.h2}>Page Not Found</h2>
            <p className={NOT_FOUND_LAYOUT.p}>
              The page{" "}
              <span className={NOT_FOUND_LAYOUT.pathSpan}>&quot;{shownPath}&quot;</span> could not be
              found in this application.
            </p>
          </div>
          <div className={NOT_FOUND_LAYOUT.buttonGroup}>
            <Link href={NOT_FOUND_LAYOUT.homeHref} className={NOT_FOUND_LAYOUT.homeButton}>
              <svg
                className={NOT_FOUND_LAYOUT.homeIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
