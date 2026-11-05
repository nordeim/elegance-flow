import { Suspense } from "react";

import { ResetPasswordScreen } from "@/components/layout/reset-password-screen";
import { LOGIN_LAYOUT } from "@/lib/page-layout";
import { pageMetadata } from "@/lib/site";

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
export const metadata = pageMetadata({ route: "/reset-password" });

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <main className={LOGIN_LAYOUT.page}>
      <Suspense>
        <ResetPasswordScreen />
      </Suspense>
    </main>
  );
}
