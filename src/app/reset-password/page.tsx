import { Suspense } from "react";

import { ResetPasswordScreen } from "@/components/layout/reset-password-screen";
import { RESET_LAYOUT } from "@/lib/page-layout";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";

// Session-163 (the digma S46/RA-66 port): the reset-password landing
// page — PUBLIC and session-agnostic (the reference renders it while
// logged in; no redirect). The two card states key on the ?token=
// query param inside the client component (a search-params read —
// hence the Suspense boundary; the stream renders the fallback until
// the client mounts, matching the family's route structure).
// Round-24 (F-24d): the reference's /reset-password carries the BARE
// brand family (title + og:title + twitter:title all "EleganceFlow",
// the plain description — live-probed 2026-11-05); the prior titled
// + prefixed family ("Reset password" / "Reset password on …") was
// invented (the reference prefixes nowhere) — the bare call now
// mirrors (tests/document-assets.test.ts ④).
// Round-26 (F-26b/F-26c): the reference rides the BreadcrumbList
// JSON-LD on this route (BOTH card states — the same platform
// injection /login and the /signup 404 carry; ours rode it on those
// two alone) — the seam now rides here too. And the page family is
// the reference's OWN platform reset family (the FLAT bg-gray-50
// page, not the login card's slate gradient — live-probed settled
// 2026-11-05 at 1280 AND 390; the full decode in RESET_LAYOUT's doc
// comment and tests/reset-faces.test.ts).
export const metadata = pageMetadata({ route: "/reset-password" });

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <main className={RESET_LAYOUT.page}>
      {/* Round-26 (F-26b): the platform's BreadcrumbList injection —
          one hop from home, the same family /login and the /signup
          superset carry. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd("/reset-password") }}
      />
      <Suspense>
        <ResetPasswordScreen />
      </Suspense>
    </main>
  );
}
