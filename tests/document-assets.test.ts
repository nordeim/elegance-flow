/**
 * Round-24 document-assets battery: the DOCUMENT-ASSET/META family no
 * probe ever read (the round-18 head census read the reference's
 * /login+/signup JSON-LD/viewport/theme-color/canonical; the ROOT
 * page's rendered meta family, the favicon/icon/apple-icon BYTES, the
 * og-image BYTES, and the manifest CONTENTS were never censused — the
 * smoke ladder reduces all three assets to 200-status checks) finally
 * sits under the unit gate.
 *
 * The coverage gap this battery closes (live-probed settled
 * 2026-11-05, both apps):
 *
 * ① THE ICON BYTE-MIRROR (F-24a, HIGH, the prior-domain leftover): our
 *   favicon/install icons had shipped the NEO-CRM BrandMark (the
 *   #2563eb tile carried verbatim at the session-199 domain
 *   transformation). The cure byte-mirrors the reference's logo —
 *   w_512 → src/app/icon.png (sha1 bd6f57945c42…), w_180 →
 *   src/app/apple-icon.png (sha1 484f2cf504ef…) — PNG magic + IHDR
 *   dimensions + the recorded reference bytes.
 * ② THE OG-IMAGE BYTE-MIRROR (F-24b, HIGH, the prior-domain leftover):
 *   public/og-image.png had been the NEO-CRM dashboard screenshot.
 *   The cure byte-mirrors the reference's og:image — the CDN
 *   /v1/fill/w_1200,h_630/ logo canvas (sha1 4daab032e0b9…) — and the
 *   metadata family (site.ts + the root layout) declares the same
 *   1200×630 the reference declares.
 * ③ THE DESCRIPTION MIRROR (F-24c, the record correction): the
 *   reference's RENDERED head ships the FULL meta family on every
 *   public route (the "ships none" record was stale — the raw SPA
 *   shell carries none; the runtime injects them). Its description is
 *   the TEMPLATE's marketing copy — 171 chars, byte-identical in the
 *   meta, og, twitter, and manifest surfaces. SITE_DESCRIPTION mirrors
 *   it (the "YOUR STUDIO" placeholder doctrine); the manifest route +
 *   the root layout ride the seam; the INVENTED prefix family
 *   (pageOgDescription — exists nowhere in the reference) is RETIRED.
 * ④ THE TITLE FAMILY (F-24d): the reference's titles — / + /login +
 *   /reset-password carry the BARE brand; /signup carries
 *   "Signup | EleganceFlow" (no space); /dashboard carries
 *   "Dashboard | EleganceFlow"; og/twitter titles FOLLOW the title.
 *   Ours had shipped "Sign up | EleganceFlow" with the social titles
 *   stuck at the bare brand (the factory ignored opts.title), and the
 *   invented titled+prefixed reset-password family.
 * ⑤ THE FAVICON-LINK KEEP (the CRM session-19 serializer hazard):
 *   metadata.icons on the layout REPLACES the file-convention
 *   link[rel=icon] — the layout declares NO icons field; the two icon
 *   files ARE the links.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const read = (rel: string) => readFileSync(path.join(here, rel), "utf8");
const readBin = (rel: string) => readFileSync(path.join(here, rel));

const siteSrc = read("../src/lib/site.ts");
const layoutSrc = read("../src/app/layout.tsx");
const signupSrc = read("../src/app/signup/page.tsx");
const loginSrc = read("../src/app/login/page.tsx");
const resetSrc = read("../src/app/reset-password/page.tsx");
const dashSrc = read("../src/app/(app)/dashboard/page.tsx");
const manifestSrc = read("../src/app/manifest.json/route.ts");

// The reference's own description — the TEMPLATE's marketing copy,
// live-probed 2026-11-05, byte-identical in its meta description, its
// og:description, its twitter:description, and its manifest.
const REF_DESCRIPTION =
  "A premium, modular website template for service-based businesses, designed for high-conversion portfolios, seamless service showcasing, and sophisticated client inquiries.";

// The recorded reference asset bytes (live-probed 2026-11-05):
//   w_512   = media.base44.com …/283cae1f1_logo.png /v1/fit/w_512,h_512
//   w_180   = …/v1/fit/w_180,h_180 (the favicon link's own href)
//   og-card = …/v1/fill/w_1200,h_630 (the og:image/twitter:image href)
const REF_ICON_SHA1 = "bd6f57945c42055a8f3cbfc702d7e34803854968";
const REF_APPLE_SHA1 = "484f2cf504efd30bb0827e42b4ebb89f206d48b7";
const REF_OG_SHA1 = "4daab032e0b9a98636280fbe3b3c8d5db8d868c5";

/** PNG contract: the 8-byte signature + the IHDR dimensions (bytes
 *  16..24, big-endian) — the pure-seam PNG read (no image deps). */
function pngFace(buf: Buffer): { isPng: boolean; width: number; height: number } {
  const isPng =
    buf.length > 24 &&
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47 &&
    buf[4] === 0x0d && buf[5] === 0x0a && buf[6] === 0x1a && buf[7] === 0x0a;
  return { isPng, width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const sha1 = (buf: Buffer) => createHash("sha1").update(buf).digest("hex");

describe("session-199 round-24: the document-asset byte-mirror", () => {
  it("the install icons carry the reference's logo bytes (icon 512 + apple 180)", () => {
    for (const [rel, w, h, want] of [
      ["../src/app/icon.png", 512, 512, REF_ICON_SHA1],
      ["../src/app/apple-icon.png", 180, 180, REF_APPLE_SHA1],
    ] as const) {
      expect(existsSync(path.join(here, rel))).toBe(true);
      const buf = readBin(rel);
      const face = pngFace(buf);
      expect(face.isPng).toBe(true);
      expect(face.width).toBe(w);
      expect(face.height).toBe(h);
      expect(sha1(buf)).toBe(want);
    }
  });

  it("the og-image carries the reference's card bytes (1200x630) and the metadata declares the same family", () => {
    const buf = readBin("../public/og-image.png");
    const face = pngFace(buf);
    expect(face.isPng).toBe(true);
    expect(face.width).toBe(1200);
    expect(face.height).toBe(630);
    expect(sha1(buf)).toBe(REF_OG_SHA1);
    // the declared family rides the seam + the root layout, both at
    // the reference's own declared dimensions
    expect(siteSrc).toContain('images: [{ url: "/og-image.png", width: 1200, height: 630 }]');
    expect(layoutSrc).toMatch(/url: "\/og-image\.png",\s*width: 1200,\s*height: 630,/);
  });

  it("SITE_DESCRIPTION is the reference's template copy (the record-corrected mirror), and every surface rides the seam", () => {
    // the seam itself (comment-stripped + whitespace-flattened — a
    // literal pinned by a comment alone is vacuous, and a ~76-column
    // re-wrap can never hide the claim)
    const stripped = siteSrc
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "")
      .replace(/\s+/g, " ");
    expect(stripped).toContain(
      `SITE_DESCRIPTION = "${REF_DESCRIPTION}";`,
    );
    // the manifest route + the root layout ride the seam (never a
    // re-typed literal)
    expect(manifestSrc).toContain("description: SITE_DESCRIPTION");
    expect(layoutSrc).toContain("description: SITE_DESCRIPTION");
    // the INVENTED prefix family is retired (exists nowhere in the
    // reference — the round-24 record; comment-stripped, so the
    // retirement record itself can name it)
    expect(stripped).not.toContain("pageOgDescription");
  });

  it("the title family mirrors: signup de-spaced, reset-password bare, the social titles follow the absolute title", () => {
    // the calls (comment-stripped)
    const strip = (src: string) =>
      src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
    expect(strip(signupSrc)).toContain('pageMetadata({ route: "/signup", title: "Signup | EleganceFlow" })');
    expect(strip(resetSrc)).toContain('pageMetadata({ route: "/reset-password" })');
    expect(strip(loginSrc)).toContain('pageMetadata({ route: "/login" })');
    expect(strip(dashSrc)).toContain('title: "Dashboard | EleganceFlow"');
    // the factory: the social titles follow the EFFECTIVE title (the
    // F-24d cure — opts.title used to leave og/twitter at the bare
    // brand on titled routes)
    expect(strip(siteSrc)).toContain(
      "const fullTitle = opts.title ?? SITE_NAME;",
    );
  });

  it("the layout declares no icons field — the file conventions own the favicon links (the s19 serializer hazard)", () => {
    const stripped = layoutSrc
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/[^\n]*/g, "");
    expect(stripped).not.toContain("icons:");
    expect(existsSync(path.join(here, "../src/app/icon.png"))).toBe(true);
    expect(existsSync(path.join(here, "../src/app/apple-icon.png"))).toBe(true);
  });
});
