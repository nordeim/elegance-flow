// Canonical site origin seam (its consumers are pinned: the root layout
// head by tests/landing-page.test.ts; the pageMetadata call family by
// tests/auth-surfaces.test.ts; the SEO route handlers by
// tests/http-headers.test.ts + tests/sitemap-routes.test.ts).
//
// NEXT_PUBLIC_SITE_URL is consumed by every metadata surface (the root
// layout's metadataBase + OG/Twitter cards, /sitemap.xml, /robots.txt,
// /manifest.json) — the documented contract since session-18, carried
// through the session-199 domain transformation.
//
// Session-199 (the rebrand): the reference app is EleganceFlow
// (colossal-elevate-service-flow.base44.app) — its <title> is the
// absolute "EleganceFlow" on / and /login and /reset-password and the
// "%s | EleganceFlow" template on its named routes (/signup "Signup | …",
// /dashboard "Dashboard | …" — live-verified; round-24 corrected the
// reset-password shape and the signup spacing).
//
// Round-24 (the record correction): the reference's RENDERED head
// ships the FULL meta family on every public route — meta description
// + og:* + twitter:* + the PWA metas (the raw SPA shell carries none;
// the runtime injects them — the prior "ships no meta description"
// record read the shell). Its description is the TEMPLATE's marketing
// copy; SITE_DESCRIPTION mirrors it byte-for-byte (the "YOUR STUDIO"
// placeholder doctrine), and the og-image + the install icons carry
// the reference's own logo bytes (see tests/document-assets.test.ts).
//
// NEXT_PUBLIC_* values are INLINED AT BUILD TIME by Next — set the variable
// before `bun run build` in production (docs/DEPLOYMENT.md).

import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/site-content";

export const DEFAULT_SITE_URL = "http://localhost:3000";

/** The site's meta description — the reference's own (the TEMPLATE's
 *  marketing copy, live-probed 2026-11-05, byte-identical in its meta
 *  description, og:description, twitter:description, and manifest;
 *  round-24 replaced the prior curated text, which had been written
 *  under the false "the reference ships none" premise). */
export const SITE_DESCRIPTION =
  "A premium, modular website template for service-based businesses, designed for high-conversion portfolios, seamless service showcasing, and sophisticated client inquiries.";

/**
 * Canonical public origin: NEXT_PUBLIC_SITE_URL when set (trailing slashes
 * stripped — URL composition below always appends paths), otherwise the
 * localhost dev default.
 */
export function siteUrl(
  env: string | undefined = process.env.NEXT_PUBLIC_SITE_URL,
): string {
  const raw = (env ?? "").trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

/**
 * The three PWA metas the head ships (mobile-web-app-capable + the apple
 * pair). Next's Metadata object has no first-class fields for them, so
 * they ride `metadata.other` — and because page-level metadata REPLACES
 * the layout's `other` map (shallow merge), the per-page factory
 * re-declares them on every page.
 */
export const PWA_META: Record<string, string> = {
  "mobile-web-app-capable": "yes",
  "apple-mobile-web-app-status-bar-style": "black",
  "apple-mobile-web-app-title": SITE_NAME,
};

/**
 * The per-route metadata factory (canonical + OG/Twitter, live-derived
 * from the reference's per-route pattern). Next shallow-merges page
 * metadata over the layout's, so every page re-declares the FULL
 * openGraph/twitter/other sets.
 *
 * - The BARE family (`no title`): the reference's /, /login, and
 *   /reset-password all carry the bare brand in the title AND the
 *   social titles AND the plain description (round-24 censused the
 *   reset route — the prior titled+prefixed family was invented).
 * - `title` for the reference's suffixed spellings (signup:
 *   "Signup | EleganceFlow" — no space; dashboard: "Dashboard |
 *   EleganceFlow") — the social titles follow it (the F-24d cure:
 *   they used to stay at the bare brand).
 * - The description is the plain SITE_DESCRIPTION on every route (the
 *   reference never prefixes — the prior pageOgDescription prefix
 *   family is retired).
 * - The landing inherits the root layout's metadata wholesale.
 */
export function pageMetadata(opts: {
  route: string;
  title?: string;
}): Metadata {
  const fullTitle = opts.title ?? SITE_NAME;
  return {
    title: opts.title !== undefined ? { absolute: opts.title } : { absolute: SITE_NAME },
    alternates: { canonical: opts.route },
    openGraph: {
      title: fullTitle,
      description: SITE_DESCRIPTION,
      url: opts.route,
      type: "website",
      siteName: SITE_NAME,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: SITE_DESCRIPTION,
      images: ["/og-image.png"],
    },
    other: {
      "twitter:url": `${siteUrl()}${opts.route}`,
      ...PWA_META,
    },
  };
}

/**
 * Round-18 (F-18a): the schema.org BreadcrumbList JSON-LD the reference's
 * non-home public pages carry in their head — Home → /, the route → the
 * route — in the platform's exact spaced serialization (byte-mirrored:
 * the `, ` after every colon and between the elements; the drift [head]
 * leg diffs it live, origin-normalized). Rendered via
 * dangerouslySetInnerHTML on /login and /signup (tests/head-faces.test.ts
 * ①②⑦ pin the serialization, the parsed object, and this route union).
 */
export function breadcrumbJsonLd(route: "/login" | "/signup"): string {
  const origin = siteUrl();
  const name = route === "/login" ? "login" : "signup";
  return `{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "${origin}/"}, {"@type": "ListItem", "position": 2, "name": "${name}", "item": "${origin}${route}"}]}`;
}
