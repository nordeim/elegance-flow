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
// absolute "EleganceFlow" on / and /login and the "%s | EleganceFlow"
// template on named routes (live-verified). It ships NO meta description;
// ours does (the documented SEO superset the smoke ladder checks).
//
// NEXT_PUBLIC_* values are INLINED AT BUILD TIME by Next — set the variable
// before `bun run build` in production (docs/DEPLOYMENT.md).

import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/site-content";

export const DEFAULT_SITE_URL = "http://localhost:3000";

/** The site's meta description (the reference ships none — our SEO
 *  superset; keep it honest and specific). */
export const SITE_DESCRIPTION =
  "EleganceFlow is a premium creative studio delivering creative direction, design & web, photography, and brand strategy for clients who value quality. Tell us about your project — we'd love to work together.";

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
 * The per-route OG description prefix — inner pages carry
 * `"<Page> on EleganceFlow. " + <the root paragraph>`.
 */
export function pageOgDescription(page: string): string {
  return `${page} on ${SITE_NAME}. ${SITE_DESCRIPTION}`;
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
 * - `page: null` → the unprefixed root family ("EleganceFlow" + the
 *   plain paragraph). Login keeps its ABSOLUTE title (the s13
 *   anti-doubling pin); pass `title` for other absolute spellings
 *   (signup: "Sign up | EleganceFlow").
 * - The landing inherits the root layout's metadata wholesale.
 */
export function pageMetadata(opts: {
  page: string | null;
  route: string;
  title?: string;
}): Metadata {
  const page = opts.page;
  const fullTitle = page !== null ? `${page} | ${SITE_NAME}` : SITE_NAME;
  const description = page !== null ? pageOgDescription(page) : SITE_DESCRIPTION;
  return {
    title:
      opts.title !== undefined
        ? { absolute: opts.title }
        : page !== null
          ? page
          : { absolute: SITE_NAME },
    alternates: { canonical: opts.route },
    openGraph: {
      title: fullTitle,
      description,
      url: opts.route,
      type: "website",
      siteName: SITE_NAME,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.png"],
    },
    other: {
      "twitter:url": `${siteUrl()}${opts.route}`,
      ...PWA_META,
    },
  };
}
