"use client";

// Session-199 (the domain transformation): THE ELEGANCEFLOW APP SHELL —
// the authenticated chrome for OUR superset workspace. The reference
// app has NO surface behind its auth (live-verified: every candidate
// route renders its SPA's empty 404 shell), so this surface owns its
// design outright — the landing's own design language carried inward:
// the zinc-950 top bar, the font-black tracked wordmark, the amber
// accent, sharp corners.
//
// The CRM chrome retired with the domain: the 10-item sidebar, the
// search topbar, the mobile sheet, the crm-store hydration. The shell
// is now a lean top bar + the page-owned main scroller.

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { SITE_NAME, STUDIO_WORDMARK } from "@/lib/site-content";
import type { User as AppUser } from "@/types";

export function AppShell({ user, children }: { user: AppUser; children: React.ReactNode }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = React.useState(false);

  async function onSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="/"
            className="text-white font-black text-lg tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            {STUDIO_WORDMARK}
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-white/60 sm:inline" data-testid="shell-user-email">
              {user.email}
            </span>
            <button
              type="button"
              onClick={onSignOut}
              disabled={signingOut}
              className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-bold tracking-widest uppercase text-white transition-colors hover:border-white/50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              data-testid="sign-out"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-6 py-8 md:py-12">{children}</div>
      </main>
      <footer className="border-t border-white/5 bg-zinc-950 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-white/50 md:flex-row">
          <span>
            © 2026 Your Studio. All rights reserved. — the {SITE_NAME} inquiries workspace
          </span>
          <a
            href="/"
            className="text-white/50 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Back to the site
          </a>
        </div>
      </footer>
    </div>
  );
}
