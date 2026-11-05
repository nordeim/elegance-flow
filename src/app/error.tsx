"use client";

// The route-segment error boundary (session-170, WP-4 — the scandihaven
// port, the s169-deferred "new visual surface" rotation). An uncaught
// error in ANY page below the root layout unwinds here: the root layout
// (html/body/fonts) stays alive around this card, so the surface keeps
// the house chrome. The stale-chunk self-heal rides the useEffect — a
// redeployed build's hashed chunks heal with one guarded reload before
// the user ever reads the card; every OTHER error is a real bug and the
// card is the honest surface (the digest is the operator's correlation
// handle — Next attaches it server-side and in the logs).
//
// Round-27 (F-27b/c, the CRM-blue/resilience-boundary census): the card
// NOW rides the ERROR_LAYOUT seam — the 404's own construction + its Go
// Home pill family, the house dialect this comment always claimed. The
// pre-round-27 card rode INLINE literals with a `bg-primary`-blue
// Try-again button (the NEO-CRM #2563eb brand family that survived the
// domain transformation only because this family never carried a face
// pin) and a slate-300 h1 that computed 1.42:1 — a WCAG 1.4.3 fail on
// OUR OWN surface. The seam's h1 rides slate-500 (AA outright); the
// 404's own "404" numeral keeps the reference's sanctioned slate-300.
//
// Deliberately imports NOTHING from the component tree beyond the
// recovery seam and the pure layout constants — a resilience surface
// must not depend on the tree that might be broken (page-layout is a
// leaf constant module, the same class as chunk-recovery).

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { reloadOnStaleChunk } from "@/lib/chunk-recovery";
import { ERROR_LAYOUT } from "@/lib/page-layout";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reloadOnStaleChunk(error);
  }, [error]);

  return (
    <div className={ERROR_LAYOUT.page}>
      <div className={ERROR_LAYOUT.card}>
        <div className={ERROR_LAYOUT.center}>
          <div className={ERROR_LAYOUT.headingGroup}>
            <h1 className={ERROR_LAYOUT.h1}>Something went wrong</h1>
            <div className={ERROR_LAYOUT.divider} aria-hidden="true" />
          </div>
          <div className={ERROR_LAYOUT.textGroup}>
            <h2 className={ERROR_LAYOUT.h2}>An unexpected error occurred</h2>
            <p className={ERROR_LAYOUT.p}>
              We have logged the issue{error.digest ? ` (ref: ${error.digest})` : ""}. Please
              try again.
            </p>
          </div>
          <div className={ERROR_LAYOUT.buttonGroup}>
            <button type="button" onClick={reset} className={ERROR_LAYOUT.button}>
              <RotateCcw className={ERROR_LAYOUT.buttonIcon} aria-hidden="true" />
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
