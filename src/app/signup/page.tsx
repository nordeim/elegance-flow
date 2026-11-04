import { LoginCard } from "@/components/layout/login-card";
import { LOGIN_LAYOUT } from "@/lib/page-layout";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";

// Session-10: the reference has no real /signup (the live platform now
// serves the URL as a 200-status soft-404 — the base44 DeadEndPage with
// the breadcrumb JSON-LD riding it; kept as our working superset). Its
// title follows the same scheme.
// Session-13 (S13-P1): ABSOLUTE — the string already contains the
// suffix, so the root template doubled it ("Sign up | EleganceFlow | EleganceFlow").
// Session-19 (S19-P4/P5): the per-route canonical/OG/Twitter family —
// the reference has no signup to mirror, so this is our superset's own
// self-consistent expression (the factory's unprefixed family + the
// absolute suffixed title the s13 pin freezes).
export const metadata = pageMetadata({ page: null, route: "/signup", title: "Sign up | EleganceFlow" });

export const dynamic = "force-dynamic";

// Session-67 (N-67f): NO authenticated redirect here either — /login
// dropped its session-read redirect at s23-P2 as an invented scaffold
// pattern (the reference serves the login card to authed visitors too);
// /signup is our documented superset (the reference 404s it), so the
// same pure-render shape applies. The page makes no session read — no
// DB round-trip per visit — and the s43 deferred-ledger "signup-page
// session read" entry closes with it.
export default function SignupPage() {
  return (
    <main className={LOGIN_LAYOUT.page}>
      {/* Round-18 (F-18a, the superset member): the reference serves the
          BreadcrumbList JSON-LD family at its /signup URL too (riding the
          platform's soft-404 body) — the crumb is semantically true on our
          working superset as well: one hop from home. NO viewport change
          here — the reference's signup-URL viewport carries no
          viewport-fit (tests/head-faces.test.ts ②⑤). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("/signup") }}
      />
      <LoginCard mode="signup" />
    </main>
  );
}
