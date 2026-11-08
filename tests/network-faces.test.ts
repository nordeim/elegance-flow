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

// ---------------------------------------------------------------------------
// ③ round-40: the beacon-payload VALUE census + the runtime zero-request
// pin (F-40a/b/c — born RED: the leg/e2e/doc ships land with R-3/R-4/R-6)
// ---------------------------------------------------------------------------
describe("round-40: the beacon-payload value semantics (the value census + the linkage)", () => {
  it("the drift [network] leg decodes the beacon payload VALUES — the event_name constant, the ISO-timestamp shape, the path-only page_url, the guest user_id, the direct-load referrer, the session_id shape", () => {
    // F-40a/F-40b: the round-38 leg pinned SHAPES only ({events:array(1)});
    // the values were never decoded — the platform's semantics (the
    // __initialization_event__ constant, the ISO-8601-with-ms timestamp,
    // the path-only page_url, the guest null user_id, the empty-string
    // direct-load referrer, the lower-alnum session_id in the 18–24
    // window) are now census constants a platform change must re-record
    const drift = read("../scripts/drift-199.ts");
    expect(drift).toContain("beaconSemantics");
    expect(drift).toContain("__initialization_event__");
    expect(drift, "the ISO-8601 timestamp shape decode").toContain(
      "iso8601-utc-ms",
    );
    expect(drift, "the path-only page_url face").toContain("path-only");
    expect(drift, "the guest user_id face").toContain("null-guest");
    expect(drift, "the direct-load referrer face").toContain("empty-direct");
    // decode-unique construction anchors (the face strings alone live in
    // the recorded constants too — a pin that cannot distinguish the
    // decode from the constants cannot catch the decode's removal):
    // the event_name comparison + the ISO-8601 regex ride ONLY in the
    // networkFace decode block
    expect(drift, "the decode's event_name comparison").toContain(
      'ev.event_name === "__initialization_event__"',
    );
    expect(drift, "the decode's ISO-8601 regex").toContain(
      "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}",
    );
  });

  it("the drift [network] leg cross-checks the LINKAGE — the beacon's session_id === localStorage's base44_analytics_session_id (the storage family and the beacon family ride ONE per-session id)", () => {
    // F-40b's cross-leg finding: the [storage] leg's analytics-id key and
    // the [network] leg's beacon session_id are two views of ONE id —
    // born in different rounds, never cross-checked until round-40; the
    // leg now reads the storage key post-settle and compares it against
    // the decoded beacon body in the SAME context
    const drift = read("../scripts/drift-199.ts");
    expect(drift).toContain("sessionLinkage");
    // the linkage read rides INSIDE networkFace (the [network] leg's own
    // post-settle evaluate — not merely the key name, which the [storage]
    // leg also carries; this pins the cross-check's construction site)
    expect(drift, "the [network] leg's own analytics-id read").toContain(
      'getItem("base44_analytics_session_id")',
    );
    // the decode's outcome vocabulary — "no-storage-key" rides ONLY the
    // networkFace ternary (the recorded constants carry "linked", so the
    // bare "linked" cannot distinguish the compute from the constant)
    expect(drift).toContain('"no-storage-key"');
    expect(drift).toContain('"unlinked"');
  });

  it("the drift [network] leg sweeps the INTERACTIVE axis — the load-time family is the COMPLETE family (interaction fires zero api-like requests)", () => {
    // F-40b's batch question answered: the endpoint's name says "batch"
    // but interaction (the CTA click) fires ZERO further requests — the
    // events:array(1) shape is the per-load constant, never a batching
    // artifact; the leg clears the family post-settle, clicks, and
    // expects zero on BOTH apps (the shared face)
    const drift = read("../scripts/drift-199.ts");
    expect(drift).toContain("interactiveFamily");
    // the interactive-phase router — the flag that flips the listener's
    // routing after the settle (unique to the sweep's construction; the
    // bare name also rides the type field and the recorded constants)
    expect(drift, "the interactive-phase router flag").toContain(
      "interactivePhase",
    );
  });

  it("AGENTS.md names the value semantics — the event_name constant, the linkage, the complete-family rule", () => {
    // a fresh agent must know the beacon's decoded semantics before
    // "fixing" a shape pin or planting a load-time/interactive beacon
    expect(agents).toContain("__initialization_event__");
    expect(agents).toContain("the load-time family is the COMPLETE family");
    expect(agents, "the cross-leg linkage rule").toContain(
      "two views of ONE per-session id",
    );
  });

  it("the e2e battery pins the ARTIFACT's runtime load-time zero-request family — the round-40 describe in landing.spec.ts", () => {
    // F-40c: the source census reads src/ only — a dependency-planted
    // beacon (its sendBeacon living in node_modules) would fire on the
    // wire while every source pin stays green; the runtime leg closes
    // the class: whatever fires, fires on the wire (the document alone)
    const spec = read("../tests/e2e/landing.spec.ts");
    expect(spec).toContain("round-40");
    expect(spec).toContain("zero-request");
  });
});

describe("round-41: the response-body semantics (the response census + the status semantics)", () => {
  it("the drift [network] leg decodes the RESPONSE family — the status semantics + the body constants (the public-settings policy constant, the receipt constants, the designed 401 envelope)", () => {
    // F-41a/F-41b: round-38 pinned the request family's SHAPES and
    // round-40 the beacon's request-payload VALUES; the RESPONSES those
    // requests carry rode no record — the platform's response
    // semantics (the public_without_login policy constant, the
    // {"success":true}/{"accepted":1} receipt constants, the guest
    // User/me check's DESIGNED 401 with the 5-key auth-required error
    // envelope — the guest landing family is 3×200 + 1×401) are now
    // census constants a platform change must re-record
    const drift = read("../scripts/drift-199.ts");
    expect(drift).toContain("responseSemantics");
    // decode-unique construction anchors (the response listener at
    // large is NOT unique — the auth-validation leg rides its own; the
    // decode's collection + body-face rule ride ONLY in networkFace):
    // the promise collection (resp.text() is async — the bodies are
    // gathered during the load and awaited post-settle)
    expect(drift, "the post-settle body collection").toContain(
      "Promise.allSettled",
    );
    // the body decode's verbatim/key-set rule — ≤2-key bodies ≤96
    // chars ride VERBATIM (the constants, hex-masked), larger objects
    // ride their key set (the 401 envelope's shape), never per-session
    // values
    expect(drift, "the ≤2-key verbatim rule").toContain("keys.length <= 2");
    // the status rides every entry (the DESIGNED 401 is the census
    // value — the guest session check's rejection is the platform's
    // own face, never "fixed" to 200)
    expect(drift, "the status-semantics carrier").toContain(
      "${resp.status()}",
    );
  });

  it("the drift leg's recorded constants carry the four decoded response rows — OURS's zero-response face", () => {
    // the RECORDED per-side constants (the constants-block literals —
    // decode-unique in reverse: the decode produces these faces from
    // the wire, never from literals, so the literals live ONLY in the
    // expectConst rows a mutation of the constants block must trip)
    const drift = read("../scripts/drift-199.ts");
    expect(drift, "the public-settings policy constant").toContain(
      "public_without_login",
    );
    expect(drift, "the app-log receipt constant").toContain(
      '{"success":true}',
    );
    expect(drift, "the analytics receipt constant").toContain(
      '{"accepted":1}',
    );
    expect(drift, "the 401 envelope's key-set shape").toContain(
      "{message,detail,traceback,extra_data,request_id}",
    );
  });

  it("AGENTS.md + the PAD name the response semantics — the policy constant, the designed 401, the receipt constants", () => {
    // a fresh agent must know the platform's response semantics before
    // "fixing" a status pin or planting a load-time responder — and the
    // PAD §2 record carries the response-body census (incl. the
    // login-surface family: the domain resolution + the login-info
    // record whose auth_config drives the reference's login card)
    expect(agents).toContain("public_without_login");
    expect(agents, "the designed-failing-check rule").toContain(
      "DESIGNED failing session check",
    );
    const pad = read("../Project_Architecture_Document.md");
    expect(pad, "the PAD §2 response-body record").toContain(
      "response-body record (round-41",
    );
    expect(pad, "the login-info record's driver note").toContain(
      "auth_config",
    );
  });

  it("the e2e battery pins the ARTIFACT's runtime load-time zero-RESPONSE family — the round-41 describe in landing.spec.ts", () => {
    // F-41c: the response-side runtime twin — the round-40 legs pin
    // the zero-REQUEST family; the RESPONSE event is a distinct
    // instrumentation (a service-worker-served or prefetched api-like
    // response arrives without a page-initiated request event), so the
    // response side rides its own runtime leg: whatever arrives,
    // arrives on the wire
    const spec = read("../tests/e2e/landing.spec.ts");
    expect(spec).toContain("round-41");
    expect(spec).toContain("zero-response");
  });
});
