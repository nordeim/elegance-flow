import { SITE_DESCRIPTION, siteUrl } from "@/lib/site";

// Session-19 (S19-P1) re-branded at session-199: /manifest.json — the
// installable web app manifest (the reference's platform family;
// EleganceFlow's own live manifest fetched and mirrored):
//   {name, short_name} "EleganceFlow", the reference's own description
//   (round-24: the TEMPLATE's marketing copy, byte-mirrored through the
//   SITE_DESCRIPTION seam — the reference serves it identically in its
//   meta/og/twitter/manifest surfaces), TWO icon entries (192x192 +
//   512x512 — the SAME src on both; the self-hosted expression is our
//   /icon.png, byte-mirroring the reference's logo — the reference's
//   own entries point at its CDN, which we never do), start_url + scope
//   at the origin, display "standalone", theme_color "#000000",
//   background_color "#ffffff".
// Served through an explicit route handler (NEVER app/manifest.ts) —
// Next's MetadataRoute.Manifest serializer re-orders the keys, and the
// object below is built in the reference's exact key order (JSON.stringify
// preserves insertion order). The reference serves it as application/json.
// Static content: prerendered at build time (NEXT_PUBLIC_SITE_URL is
// inlined — set it before `bun run build` in production).
// tests/document-assets.test.ts ③ pins the description seam; the drift
// [docs] leg diffs the contents against the live reference.
export const dynamic = "force-static";

export function GET(): Response {
  const origin = siteUrl();
  const manifest = {
    name: "EleganceFlow",
    short_name: "EleganceFlow",
    description: SITE_DESCRIPTION,
    icons: [
      {
        src: `${origin}/icon.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${origin}/icon.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
    start_url: origin,
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
    scope: origin,
  };
  return new Response(JSON.stringify(manifest), {
    headers: { "content-type": "application/json" },
  });
}
