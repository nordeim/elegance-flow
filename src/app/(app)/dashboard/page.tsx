import { pageMetadata } from "@/lib/site";
import { InboxPage } from "./inbox-page";

// Session-199 (the domain transformation): /dashboard — THE SUPERSET
// WORKSPACE. The reference collects its contact form and answers a
// toast only; OURS persists every inquiry (POST /api/inquiry) and this
// authenticated inbox is where the studio team reads, triages, archives
// and deletes them. The reference itself has no authed surface at all
// (every candidate route renders its SPA's empty 404 shell) — so this
// page's own design derives from the landing's design language, not
// from any reference face.
export const metadata = pageMetadata({
  route: "/dashboard",
  title: "Dashboard | EleganceFlow",
});

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return <InboxPage />;
}
