import { LoginCard } from "@/components/layout/login-card";
import { LOGIN_LAYOUT } from "@/lib/page-layout";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";
import type { Viewport } from "next";

// Session-10 (S10-10) re-anchored at session-199: the reference's login
// page title is the bare brand ("EleganceFlow") — not "Sign in | …".
// Session-13 (S13-P1): the title must be ABSOLUTE — a relative string
// rides the root layout's "%s | EleganceFlow" template and SSRs the
// DOUBLED "EleganceFlow | EleganceFlow". The unprefixed metadata family
// on /login carries over (og:title, the plain description, og:url/
// twitter:url + canonical at origin/login — the pageMetadata() factory,
// page: null = the unprefixed family; the factory keeps the ABSOLUTE
// title).
export const metadata = pageMetadata({ page: null, route: "/login" });

export const dynamic = "force-dynamic";

// Round-18 (F-18b): the reference's /login viewport carries
// viewport-fit=cover (the notched-device edge-to-edge declaration —
// "width=device-width, initial-scale=1.0, viewport-fit=cover"), while
// its / and /signup viewports carry NONE — a LOGIN-ONLY member. This
// export declares ONLY viewportFit: width/initialScale/themeColor
// inherit from the root layout's viewport (the single source — the
// shallow merge composes them into the reference's exact meta).
export const viewport: Viewport = {
  viewportFit: "cover",
};

// Session-23 (S23-P2): NO authenticated redirect here. The reference
// serves the login card to AUTHENTICATED visitors too (live-verified:
// its /login renders the card with the session cookie present, and an
// authed wrong-password attempt draws the error banner on the card) —
// our `if (user) redirect("/")` was an invented scaffold pattern, never
// a reference behavior. The page stays force-dynamic (the reference
// serves /login dynamically; the s19 metadata family is
// runtime-stable either way).
export default function LoginPage() {
  return (
    <main className={LOGIN_LAYOUT.page}>
      {/* Round-18 (F-18a): the schema.org BreadcrumbList the reference's
          /login ships in its head — Home → /, login → /login (the exact
          spaced serialization, origin via siteUrl(); pinned by
          tests/head-faces.test.ts ①). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("/login") }}
      />
      <LoginCard />
    </main>
  );
}
