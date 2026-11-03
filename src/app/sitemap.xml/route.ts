import { siteUrl } from "@/lib/site";

// /sitemap.xml — OUR SEO superset surface (the EleganceFlow reference
// ships none — the documented session-199 superset family). Served
// through an explicit route handler because Next's sitemap.ts serializer
// DROPS the number formatting ("1.0" serializes as "1") and its
// MetadataRoute type spells the field changeFrequency (the s18 decision,
// carried). The XML shape carries from the s18/s20 byte-format contracts:
// LF-only, no trailing newline, 4-space URL indent, changefreq weekly on
// every entry, the "1.0"/"0.8" priority STRINGS, bare application/xml.
//
// The session-199 POST-SHIP AUDIT CATCH: this ROUTES literal still
// carried the RETIRED CRM surface (/accounts, /contacts, /leads,
// /calendar, /activities, /reports, /settings, /profile, /about,
// /contact — every one a 404 after the domain transformation; the
// manifest was rebranded but the sitemap was missed). The list is now
// derived from the router's real public page surface: the landing at
// "1.0", the auth card family at "0.8". The session-guarded (app) group
// (/dashboard) and the api/ family are NEVER sitemap material — a
// crawler meets the login redirect or envelope JSON, not content.
// tests/sitemap-routes.test.ts pins the list against the live src/app
// directory census (the pin whose absence let the straggler ship).
export const dynamic = "force-static";

const ROUTES: Array<{ path: string; priority: string }> = [
  { path: "/", priority: "1.0" },
  { path: "/login", priority: "0.8" },
  { path: "/signup", priority: "0.8" },
  { path: "/reset-password", priority: "0.8" },
];

export function GET(): Response {
  const origin = siteUrl();
  const urls = ROUTES.map(
    ({ path, priority }) => `    <url>
        <loc>${origin}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
    </url>`,
  ).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return new Response(xml, {
    // Session-20 (S20-P4): bare `application/xml` — no charset suffix
    // (the cosmetic-serialization class; pinned by
    // tests/http-headers.test.ts).
    headers: { "content-type": "application/xml" },
  });
}
