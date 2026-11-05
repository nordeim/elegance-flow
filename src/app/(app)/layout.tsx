import { getSessionUser } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";
import { GuestLoginRedirect } from "@/components/layout/guest-login-redirect";

export const dynamic = "force-dynamic";

// Session-147 (F-147c2): the (app) guard keeps its SERVER-side session
// decision (the guest never receives the CRM page's HTML — the fix-over-
// defect property survives) and the GuestLoginRedirect shim lands guests
// on /login?from_url=<absolute-url> (walk37: post-login → the from_url
// target). Round-25 record correction: the CURRENT reference renders its
// designed 404 directly for guests (no wall, no from_url — the walk37
// mirror claim was prior-bundle); the shim is now OUR OWN superset
// behavior (the inbox is real, the wall is ours). The 307 stays retired
// because a server layout cannot know the current path (headers()
// carries none — probed live that session), and the from_url round-trip
// needs it.
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) return <GuestLoginRedirect />;
  return <AppShell user={user}>{children}</AppShell>;
}
