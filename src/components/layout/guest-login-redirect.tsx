"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

// Session-147 (F-147c2 — the guest re-gating) — the round-25 record
// correction: the s147 record ("the reference's bundle LOGIN-WALLS its
// marketing pages; guest /About → a CLIENT-side guard redirect to
// /login?from_url=<absolute-url>") was the PRIOR-BUNDLE behavior. The
// CURRENT reference (round-25, live-watched 0.5s–5s) renders its
// designed 404 DIRECTLY for guests on every unknown route — no wall,
// no from_url. THIS SHIM IS NOW OUR OWN SUPERSET BEHAVIOR, kept on
// purpose: OUR /dashboard is a REAL route (the superset inbox — the
// reference has no dashboard at all), and the from_url round-trip is
// our own auth-wall design. The LAYOUT still makes the session
// decision SERVER-side (a guest never receives the page's HTML — the
// shim renders instead of the shell + children), and the navigation
// rides the client. The (app) group's old server 307 retired with the
// s147 cure: the from_url round-trip needs the current URL, which a
// server layout cannot know (headers() carries no path — probed live
// that session).
export function GuestLoginRedirect() {
  const router = useRouter();

  React.useEffect(() => {
    // location.href (the ABSOLUTE URL, query included) — the reference's
    // own from_url form, urlencoded exactly like its guard
    router.replace(`/login?from_url=${encodeURIComponent(window.location.href)}`);
  }, [router]);

  // Nothing paints — the wall is the login page the guard lands on
  return null;
}
