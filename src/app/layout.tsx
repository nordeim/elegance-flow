import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/toast";
import { PWA_META, SITE_DESCRIPTION, siteUrl } from "@/lib/site";
import "./globals.css";

// Session-22 (S22-P1): the Inter webfont is RETIRED. The reference app
// ships ZERO webfonts — no @font-face rule in its 79.5KB stylesheet,
// document.fonts empty, every surface computing Tailwind's stock default
// sans stack (byte-extracted from its preflight html rule). The scaffold's
// next/font/google Inter made every text surface render in the wrong
// typeface (measured: same 62-char string at 16px — reference 466.8px/
// 522.4px regular/bold vs ours 439px/451.3px). The reference's EXACT
// stack is pinned in globals.css @theme --font-sans (Tailwind 4.3's own
// default is the v4.0 -apple-system list and NOT byte-identical).

export const metadata: Metadata = {
  // Session-199 (the domain transformation): the reference app is
  // EleganceFlow — its <title> is the bare "EleganceFlow" on / and
  // /login (live-verified) with the "%s | EleganceFlow" template on
  // named routes. The OG/Twitter card family + PWA metas carry over
  // from the session-18/19 contracts (the platform family, rebranded).
  // Round-24 (the record correction): the reference's RENDERED head
  // ships the FULL meta family — its description is the TEMPLATE's
  // marketing copy, which SITE_DESCRIPTION now mirrors byte-for-byte
  // (the prior curated superset text is retired; the raw SPA shell
  // carries none of the family, which is how the stale "ships none"
  // record survived — the runtime injects them).
  metadataBase: new URL(siteUrl()),
  manifest: `${siteUrl()}/manifest.json`,
  title: {
    default: "EleganceFlow",
    // The reference's separator is a pipe ("Signup | EleganceFlow",
    // "Dashboard | EleganceFlow" — round-24 de-spaced the signup face).
    template: "%s | EleganceFlow",
  },
  description: SITE_DESCRIPTION,
  // The reference's canonical link: origin + route (the landing's is
  // the bare origin). Next's URL resolution strips the root's trailing
  // slash (verified live — the s18 serialization class). Inner pages
  // override this through pageMetadata().
  alternates: { canonical: "/" },
  openGraph: {
    title: "EleganceFlow",
    description: SITE_DESCRIPTION,
    url: siteUrl(),
    type: "website",
    siteName: "EleganceFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EleganceFlow",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  // The Next twitter metadata object has no url field (verified against
  // next 16.3.6's twitter-types) — the reference ships twitter:url, so it
  // rides the `other` escape hatch. PWA_META adds the reference's
  // mobile-web-app-capable + apple pair (also without first-class
  // fields). NOTE: page-level metadata REPLACES this map (shallow merge),
  // which is why pageMetadata() re-declares all of it per page.
  other: {
    "twitter:url": siteUrl(),
    ...PWA_META,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Session-19 (S19-P2): the reference's meta[name=theme-color] is
  // #000000 (black — probed on both its login page and the authed shell).
  // Ours had shipped #2563eb since the scaffold.
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      {/* Round-34 (F-34a — the route-transition scroll cure): the html
          element carries the reference's CSS `scroll-behavior: smooth`
          face (globals.css — the drift [reveal] leg censuses it
          IDENTICAL both apps), and Next.js 16's App Router needs THIS
          attribute to disable that smoothness around its own
          route-transition scrolls (the installed router's
          disableSmoothScrollDuringRouteTransition reads
          dataset.scrollBehavior === 'smooth'; without the attribute the
          router's scroll-to-top rides the CSS animation — live-proven:
          the post-login transition animated 300→115 across ~500ms
          instead of the instant reset). Hash-only changes keep the
          smooth ride — the landing's anchor navigation (the parity
          face) is untouched. The attribute is INVISIBLE to every
          computed-face probe: the a11y-superset doctrine's next member
          (the aria-expanded pattern). */}
      {/* Session-22 (S22-P2): the antialiased utility is RETIRED — the
          reference ships no font-smoothing (computed auto) and no
          text-rendering override; the scaffold-era shadcn double-smoothing
          (this class + the retired html rule in globals.css) rendered
          thinner text than the reference on macOS. */}
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
