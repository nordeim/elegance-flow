/**
 * Round-38 network-faces battery: the NETWORK-FAMILY census + the
 * X-POWERED-BY cure — the axis no probe ever read (parity reads
 * computed styles; the drift battery reads DOM/text/img/storage faces;
 * no probe ever enumerated the REQUEST family each app fires on load,
 * or the RESPONSE-HEADER face of the documents), and the census's own
 * audit of OUR response-header wiring found a real defect.
 *
 * The findings (live-verified 2026-11-07, both apps):
 *
 * ① THE TECH DISCLOSURE (F-38a, MEDIUM — the round's own audit catch,
 *   live-diagnosed against the standalone artifact): the production
 *   artifact disclosed its server framework on every server-rendered
 *   HTML face — `X-Powered-By: Next.js` rode /, /login, /signup,
 *   /reset-password, /dashboard and the 404 (curl-verified on the
 *   artifact boot) while the reference ships NO tech-disclosure header
 *   on any face (its platform edge's server/via/x-render-origin-server
 *   family is the PLATFORM's infra stack, never the app's face). The
 *   root cause: Next's scaffold default `poweredByHeader: true`
 *   (config-shared.js) — the config never overrode it; 37 rounds
 *   shipped the disclosure because no probe ever read the network
 *   axis. THE CURE: `poweredByHeader: false` in next.config.ts (the
 *   one-flag cure; the session-20 headers() three-security-set rides a
 *   different config key and is untouched). Route handlers and static
 *   assets never carried the header — the disclosure rode exactly the
 *   HTML render pipeline.
 * ② THE ZERO-BEACON POSTURE (F-38b — the census): OUR app fires ZERO
 *   api-like requests on load — the document alone; every fetch() in
 *   src/ is user-initiated (the contact-form POST, the auth forms ×5,
 *   the dashboard ops ×3, the logout, the reset screen), and the
 *   beacon families (navigator.sendBeacon, XMLHttpRequest,
 *   absolute-URL fetch) are absent from the tree. The reference's
 *   platform fires a four-request family per landing load (the User/me
 *   session check → 401 guest, the bodyless app-log beacon, the
 *   public-settings fetch, the ~189B analytics batch whose event shape
 *   is {event_name, properties{referrer}, timestamp, page_url,
 *   user_id: null, session_id}) — base44 implementation, never
 *   mirrored: the network is not a rendered face, and OUR zero-beacon
 *   posture is the strictly cleaner face (no load-time chatter; the
 *   session rides the httpOnly cookie server-side).
 * ③ THE SOURCE CONTRACTS this battery pins: the beacon-impossibility
 *   census (zero sendBeacon/XHR across src/); the same-origin fetch
 *   census (zero absolute-URL fetches); the landing's single-fetch
 *   census (the contact-form POST is the landing's ONLY network
 *   call); the AGENTS.md doc cure; the drift [network] leg; the e2e
 *   round-38 leg; the http-headers battery's config pin.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const here = import.meta.dirname;
const read = (rel: string) =>
  existsSync(path.join(here, rel)) ? readFileSync(path.join(here, rel), "utf8") : "";
const strip = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");

const agents = read("../AGENTS.md");

/** Every source file under src/ (recursive), as src-relative paths. */
function srcFiles(): string[] {
  const root = path.resolve(here, "../src");
  const out: string[] = [];
  const walk = (dir: string) => {
    if (!existsSync(dir)) return;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else out.push(path.relative(root, p));
    }
  };
  walk(root);
  return out.sort();
}

// ---------------------------------------------------------------------------
// ① the beacon-impossibility census — F-38b's OUR-side face
// (standing-fact pins: current-tree facts, green at birth)
// ---------------------------------------------------------------------------
describe("round-38: the zero-beacon posture (the app-wide network census)", () => {
  it("ZERO navigator.sendBeacon / XMLHttpRequest references across src/ (comment-stripped) — no load-time platform chatter can fire", () => {
    // the reference's platform beacons analytics on every load; OURS
    // ships zero — the load-time request family is the document alone.
    // A planted beacon anywhere in src/ breaks the posture this pin
    // guards. (The .includes needle — never a bare /re/.test() call —
    // keeps the count-ladder census's it/test-block counting exact.)
    const offenders = srcFiles().filter(
      (f) =>
        strip(read(`../src/${f}`)).includes("sendBeacon") ||
        strip(read(`../src/${f}`)).includes("XMLHttpRequest"),
    );
    expect(offenders, "files referencing the beacon families").toEqual([]);
  });

  it("every fetch() call site in src/ rides a SAME-ORIGIN path — zero absolute-URL fetches (the third-party-call impossibility)", () => {
    // every network call our tree can make is a same-origin route
    // handler path; a third-party endpoint would be both a privacy
    // divergence (the reference's platform calls ITS OWN origin) and
    // an undeclared external dependency
    const offenders: string[] = [];
    for (const f of srcFiles()) {
      if (strip(read(`../src/${f}`)).match(/fetch\(\s*["'`](https?:)/)) offenders.push(f);
    }
    expect(offenders, "files fetching an absolute URL").toEqual([]);
  });

  it("the public landing carries exactly ONE fetch — the contact-form POST /api/inquiry (user-initiated, never load-time)", () => {
    // the landing fires no network call on load; its single fetch is
    // the submit handler's inquiry POST (the functional superset's
    // persistence seam — user-initiated, never a platform beacon)
    const landing = strip(read("../src/components/landing/landing-page.tsx"));
    const fetchSites = landing.match(/fetch\(/g) ?? [];
    expect(fetchSites, "the landing's fetch count").toHaveLength(1);
    expect(landing).toContain('fetch("/api/inquiry"');
  });
});

// ---------------------------------------------------------------------------
// ② the doc + battery cures (born RED: the note/leg/pin land with R-3+)
// ---------------------------------------------------------------------------
describe("round-38: the doc + battery cures (the fresh-agent pointers)", () => {
  it("AGENTS.md names the network posture — the zero-beacon face + the poweredByHeader cure + the never-plant-a-beacon rule", () => {
    // a fresh agent must know the request axis is censused before
    // planting a load-time beacon, and that the artifact's header face
    // is zero-tech-disclosure (the F-38a class)
    expect(agents).toContain("The network posture (round-38)");
    expect(agents).toContain("never plant a load-time beacon");
    expect(agents).toContain("poweredByHeader: false");
    expect(agents).toContain("the drift `[network]` leg (the 23rd)");
  });

  it("the drift script rides the [network] leg — the request-family + response-header census, both apps", () => {
    // the drift battery's 23rd leg censuses both apps' load-time
    // request families (the reference's four-beacon platform family vs
    // OUR document-only posture — the per-side recorded constants) and
    // the document response-header face (the security set present, the
    // tech disclosure absent)
    const drift = read("../scripts/drift-199.ts");
    expect(drift).toContain("[network]");
    expect(drift).toContain("networkFace");
  });

  it("the e2e battery pins the artifact's zero-disclosure face — the round-38 describe in landing.spec.ts", () => {
    // the standalone artifact's document + 404 faces carry no
    // X-Powered-By and the three-header security set (born RED against
    // the disclosed artifact; green post-cure)
    const spec = read("../tests/e2e/landing.spec.ts");
    expect(spec).toContain("round-38");
    expect(spec).toContain("x-powered-by");
  });

  it("the http-headers battery owns the config pin — poweredByHeader: false (the F-38a cure's source contract)", () => {
    // the header family's own battery pins the config flag (the
    // natural home: the next.config.ts header-face pins all live
    // there); this cross-check keeps the two batteries in lockstep
    const headers = strip(read("../tests/http-headers.test.ts"));
    expect(headers).toContain("poweredByHeader");
    expect(headers).toContain("F-38a");
  });
});
