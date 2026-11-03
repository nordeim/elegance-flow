import { LandingPage } from "@/components/landing/landing-page";

// Session-199 (the domain transformation): the PUBLIC LANDING at `/` —
// the EleganceFlow reference's whole public app (its one-page marketing
// surface: hero, about, services, work, testimonials, contact + footer).
//
// PUBLIC: this page sits OUTSIDE the (app) route group — no session
// resolution, no redirect (the reference serves its landing to guests
// and authenticated visitors alike; live-verified logged-out AND
// post-login — the login card redirects back to `/`).
//
// NO page-level metadata export: the ROOT layout's object already IS the
// reference's landing head — title "EleganceFlow" (absolute, no
// template), the honest site description (the reference ships none —
// our documented SEO superset), the bare-origin canonical, the OG
// family (+ og-image.png), the Twitter family (summary_large_image +
// twitter:url via `other`), the PWA metas.
export default function RootLandingRoute() {
  return <LandingPage />;
}
