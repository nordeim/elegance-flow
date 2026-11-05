"use client";

// The ROOT error boundary (session-170, WP-4 — the scandihaven port).
// global-error replaces the root layout entirely when the layout itself
// fails — so it must render its own <html lang="en"> + <body> AND import
// ./globals.css itself: a crashed root layout never loaded the global
// stylesheet, and the Tailwind classes below would otherwise render as
// bare prose (the Next docs' own caveat — the import is the robust
// form; it is deduplicated when the stylesheet is already loaded).
//
// Round-27 (F-27b/c): rides the ERROR_LAYOUT seam (the 404's house
// construction + its pill family; the AA h1 ink) — same contract as the
// segment boundary. The CRM-blue bg-primary button and the 1.42:1
// slate-300 h1 are retired (tests/error-faces.test.ts).
//
// Same contract as the segment boundary (src/app/error.tsx): the
// stale-chunk self-heal in useEffect, the digest correlation handle,
// the reset() affordance, and ZERO component-tree imports — the root
// failure must not stand on the tree that broke (the pure seam + the
// leaf constant module are the sanctioned exceptions).

import "./globals.css";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { reloadOnStaleChunk } from "@/lib/chunk-recovery";
import { ERROR_LAYOUT } from "@/lib/page-layout";

export default function GlobalError({
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
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900">
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
                  We have logged the issue{error.digest ? ` (ref: ${error.digest})` : ""}.
                  Please try again.
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
      </body>
    </html>
  );
}
