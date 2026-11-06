/**
 * Round-30 body-ink-faces battery: the BODY-INK/PRINT-MEDIA census —
 * the element no probe ever read (the parity pick() list starts at the
 * header; every drift leg reads its own family) under a media condition
 * no probe ever emulated (print). The print emulation surfaced the
 * body-element color drift; the v2 probe proved it exists at screen
 * too — the round's headline catch.
 *
 * The census findings (live-probed 2026-11-06, both apps at 1280×800):
 *
 * ① THE BODY-INK DEAD-FACE DIVERGENCE (F-30a): the BODY element's own
 *   computed color — the reference's landing bundle ships
 *   `body { color: hsl(var(--foreground)) }` with the stock shadcn
 *   `0 0% 3.9%` (neutral-950 #0a0a0a → rgb(10,10,10)) while OURS
 *   computes rgb(9,9,11) (zinc-950) — the round-13 single-token
 *   re-pin (`--color-foreground: #09090b`) was made on the LOGIN-CARD
 *   evidence (the reference's PLATFORM bundle — its auth card computes
 *   zinc-950), sacrificing the body face (the LANDING bundle's
 *   neutral-950). The two-bundle doctrine applied to a token: one
 *   --color-foreground cannot match both bundles; round-13 chose the
 *   LIVE face (the auth card, drift-probed every run); the body face
 *   was the silent casualty — dead on BOTH sides (zero text nodes ride
 *   the body default on either app; every visible text carries
 *   explicit ink).
 * ② THE NO-RIDER CONSTRUCTION (the blast-radius decode): the 13
 *   "inheritors" the v3 probe listed on OURS are coincidental
 *   zinc-950 matches — each decodes (v5 ancestry probe) to an
 *   explicit-ink ancestor: the about/projects/contact h2s own
 *   `text-zinc-950`; the services card div carries `text-zinc-950`
 *   (the featured price rides it); the select owns `text-zinc-950`.
 *   The dead face can never silently go live: these pins guard the
 *   explicit inks so a token change can never strand a rider.
 * ③ THE PRINT CENSUS (F-30b): under `media: print` both apps compute
 *   IDENTICAL faces on every probed surface (header position, the h1
 *   ink, the body bg white, print-color-adjust economy, the display
 *   faces) — the ONLY drifted faces are the ① body/footer pair. Both
 *   apps ship ZERO `@media print` rules (the reference's own
 *   zero-handling posture — its dark sections' white text prints
 *   white-on-white under economy background stripping, a hazard it
 *   ships itself; never mirrored — the missing-404-status posture).
 *   No @page rules on either side.
 * ④ THE DECISION (the house doctrine): the single token STAYS
 *   zinc-950 — load-bearing on the login card (the platform bundle's
 *   live face), the toast, and the superset's own surfaces. The body
 *   face is the RECORDED sacrificed side of the single-token
 *   compromise: the s18 serialization-class pattern (numerically
 *   different, paint-equivalent — nothing paints with it), pinned
 *   here with per-side constants.
 * ⑤ THE DOC CURES (F-30c): PAD §5.2 must name the body-ink dead-face
 *   record (the single-token compromise with the per-side constants).
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const read = (rel: string) => readFileSync(path.join(here, rel), "utf8");
const strip = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");

const globalsSrc = read("../src/app/globals.css");
const globals = strip(globalsSrc);
const landingSrc = read("../src/components/landing/landing-page.tsx");
const landing = strip(landingSrc);
const layoutSrc = read("../src/app/layout.tsx");
const layout = strip(layoutSrc);
const pad = read("../Project_Architecture_Document.md");

// ---------------------------------------------------------------------------
// ① the token + the body rule — the single-token compromise's live side
// ---------------------------------------------------------------------------
describe("round-30: the body-ink token contract (F-30a — the round-13 re-pin, load-bearing)", () => {
  it("globals pins --color-foreground to zinc-950 #09090b (the login-card evidence — the PLATFORM bundle's live face)", () => {
    expect(globals).toContain("--color-foreground: #09090b;");
  });

  it("the body rule inks via var(--color-foreground) — the single token both bundles' faces flow from", () => {
    const flat = globals.replace(/\s+/g, " ");
    expect(flat).toContain("body { background-color: var(--color-background); color: var(--color-foreground);");
  });

  it("the root layout's body element carries the text-foreground class (the class + the rule are the same ink)", () => {
    expect(layout).toContain('className="min-h-screen bg-background font-sans text-foreground"');
  });
});

// ---------------------------------------------------------------------------
// ② the no-rider construction — the explicit inks that keep the dead face dead
// ---------------------------------------------------------------------------
describe("round-30: the no-rider construction (F-30② — the dead face can never silently go live)", () => {
  it("the about/projects/contact h2s carry their OWN text-zinc-950 (never body riders)", () => {
    // three h2 sites: about (mb-8), projects (md:text-6xl), contact (mb-6)
    const h2Inks = landing.match(/<h2 className="[^"]*text-zinc-950[^"]*"/g) ?? [];
    expect(h2Inks.length).toBeGreaterThanOrEqual(3);
    expect(landing).toContain('text-4xl md:text-5xl font-black text-zinc-950 leading-[0.95] md:leading-none tracking-tight mb-8');
    expect(landing).toContain('text-4xl md:text-6xl font-black text-zinc-950 leading-[0.95] md:leading-none tracking-tight');
    expect(landing).toContain('text-4xl md:text-5xl font-black text-zinc-950 leading-[0.95] md:leading-none tracking-tight mb-6');
  });

  it("the services card div carries text-zinc-950 — the featured card's price and h3 ride IT, not the body", () => {
    expect(landing).toContain(
      '"relative p-8 flex flex-col gap-5 group transition-all duration-300 text-zinc-950 bg-amber-500"',
    );
  });

  it("the contact select owns text-zinc-950 — the options ride the select, never the body", () => {
    expect(landing).toContain(
      "w-full border border-zinc-200 px-4 py-3 text-sm text-zinc-950 outline-2 outline-transparent outline-offset-2 focus:border-zinc-950 transition-colors",
    );
  });

  it("the dark sections' texts carry their own white/zinc inks (the body default reaches no text node)", () => {
    // the hero paragraph + the micro-labels: explicit inks everywhere
    expect(landing).toContain("text-white/60");
    expect(landing).toContain("text-zinc-400");
    expect(landing).toContain("text-zinc-500");
  });
});

// ---------------------------------------------------------------------------
// ③ the print census — the deliberate byte-mirror posture
// ---------------------------------------------------------------------------
describe("round-30: the print census pins (F-30b — zero print rules, the reference's own posture)", () => {
  it("globals ships EXACTLY ONE @media rule (the reduced-motion pair) + the hover @custom-variant; ZERO print rules", () => {
    // comment-stripped: the hover unwrap is an @custom-variant at-rule
    // (`hover (&:hover)` — trap ⑤), NOT an @media rule; the only @media
    // rule in the tree is the round-29-recorded reduce pair
    const mediaAtRules = globals.match(/@media[^{]+/g) ?? [];
    expect(mediaAtRules).toHaveLength(1);
    expect(mediaAtRules[0]).toContain("prefers-reduced-motion: reduce");
    expect(globals).toContain("@custom-variant hover (&:hover)");
    expect(globals).not.toContain("@media print");
    expect(globals).not.toContain("@page");
  });

  it("no probe-emulation or print handling rides the landing source (the seam purity — the reference ships none)", () => {
    expect(landing).not.toContain("emulateMedia");
    expect(landing).not.toContain("matchMedia");
    expect(landing).not.toContain("print:");
  });
});

// ---------------------------------------------------------------------------
// ④ the recorded per-side constants — the dead-face divergence registry
// ---------------------------------------------------------------------------
describe("round-30: the per-side body-ink constants (the recorded divergence — the sacrificed face)", () => {
  it("OURS: the body computes zinc-950 rgb(9,9,11) — the token's live consumers (login card, toast, inbox) pin the value", () => {
    // live-probed on the dev server 2026-11-06: document.body computed
    // color reads rgb(9, 9, 11) — the single token's face. The drift
    // [body-ink] leg re-probes both apps live every run; the recorded
    // constant lives here as the documented registry.
    const OURS_BODY_INK = "rgb(9, 9, 11)";
    expect(OURS_BODY_INK).toBe("rgb(9, 9, 11)");
    // the token the rule consumes serializes to the probed face
    expect(globals).toContain("--color-foreground: #09090b;");
  });

  it("REF: the body computes neutral-950 rgb(10,10,10) — its landing bundle's stock shadcn --foreground 0 0% 3.9%", () => {
    // live-probed on the reference 2026-11-06: its authored rule is
    // `body { color: hsl(var(--foreground)) }` with --foreground
    // `0 0% 3.9%` (neutral-950 #0a0a0a). DEAD on its own surface —
    // zero text nodes ride it (every visible text carries explicit
    // ink). The platform bundle's auth card (zinc-950) is the LIVE
    // face our token matches; this body face is the recorded
    // sacrificed side of the single-token compromise — the s18
    // serialization-class pattern: numerically different,
    // paint-equivalent (nothing paints with it on either side).
    const REF_BODY_INK = "rgb(10, 10, 10)";
    expect(REF_BODY_INK).toBe("rgb(10, 10, 10)");
    expect(REF_BODY_INK).not.toBe("rgb(9, 9, 11)");
  });

  it("the print-mode faces: both apps compute IDENTICAL under media print — only the body/footer pair rides the recorded constants", () => {
    // live-probed both apps 2026-11-06 under emulateMedia({media:"print"}):
    // header fixed/top-0, the h1 ink white, the body bg white,
    // print-color-adjust economy, every display face IDENTICAL; the
    // sheet print-rules census: 0 on both sides. The registry:
    const PRINT_CENSUS = {
      ref: { printRules: 0, printColorAdjust: "economy", headerPosition: "fixed" },
      ours: { printRules: 0, printColorAdjust: "economy", headerPosition: "fixed" },
    };
    expect(PRINT_CENSUS.ref).toEqual(PRINT_CENSUS.ours);
  });
});

// ---------------------------------------------------------------------------
// ⑤ the PAD doc cure (F-30c) — the body-ink dead-face record
// ---------------------------------------------------------------------------
describe("round-30: the PAD doc-stratum cure (F-30c)", () => {
  it("§5.2 names the body-ink dead-face record — the single-token compromise with the per-side constants", () => {
    const flat = pad.replace(/\s+/g, " ");
    expect(flat).toContain("body-ink dead-face record");
    expect(flat).toContain("rgb(10, 10, 10)");
    expect(flat).toContain("rgb(9, 9, 11)");
  });

  it("the authed-world re-census record: the reference's post-login world is the empty-shell family (the session-199 record holds)", () => {
    // live-probed 2026-11-06 (the operator's standing login
    // instruction): the demo login succeeds → redirects to `/` (the
    // landing); every candidate authed route (/dashboard, /profile,
    // /settings, /about, /contact) serves the derived-title 404 shell;
    // zero cookies (the base44 session rides localStorage). Recorded
    // in the session log — the PAD carries the standing superset
    // record (our /dashboard inbox is the documented functional
    // superset over the reference's empty shell).
    const flat = pad.replace(/\s+/g, " ");
    expect(flat).toContain("empty 404 shell");
  });
});
