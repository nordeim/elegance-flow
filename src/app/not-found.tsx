import { NotFoundBody } from "./not-found-body";

export default function NotFound() {

// Session-12 (S12-P2): the reference's custom 404 — a designed slate-family
// surface (NOT the stock Next.js built-in): centered on bg-slate-50 with a
// font-light "404" display heading, "Page Not Found", the quoted-pathname
// message and a white bordered Go Home pill that navigates to `/`. No app
// shell (the reference renders it bare — live-verified at both contexts).
// The pathname interpolation lives in the client body (usePathname).
//
// Session-194 (D-194a4) — SUPERSEDED by the round-25 record: the s12
// ABSOLUTE title ("This Page Does Not Exist | <brand>") was a PRE-DRIFT
// decode, and the s194 re-read's "the current build ships the bare brand
// on its 404" held only until the CURRENT bundle: round-25 (live-probed
// settled 2026-11-05) reads the reference DERIVING the unknown-route
// title from the pathname ("Verify Email | EleganceFlow" at
// /verify-email — the ten-case census rule). The metadata export stays
// RETIRED (a not-found cannot know its path server-side); the DERIVED
// title rides the client body's document.title flip
// (src/lib/route-title.ts + tests/route-mechanics.test.ts).
//
// Session-194 (D-194a5) — the round-25 correction: the 404 is
// SESSION-INDEPENDENT by design — no session resolution, no redirect.
// The s194 record's "the reference's auth-first client-router guard
// redirects anon unknown-routes to /login?from_url=<absolute-url>; its
// designed 404 appears only PAST the guard" was the PRIOR-BUNDLE
// behavior: the current bundle renders its designed 404 DIRECTLY for
// guests (guest /dashboard → the 404 at 0.5s–5s, live-watched — no
// wall, no from_url). OURS adjudicates routability first: known guarded
// routes → OUR OWN from_url login wall (the superset inbox is real —
// the wall is ours, no longer a reference mirror); unknown routes → the
// designed 404 with the true 404 status, for anon and authenticated
// visitors alike. The reference's 200-everywhere SPA posture is its own
// platform artifact (the s149 family) — never mirrored.
  return <NotFoundBody />;
}
