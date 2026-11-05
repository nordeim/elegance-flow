/**
 * Round-19 interaction-faces battery: the INTERACTIVE BEHAVIORS no probe
 * ever read against the live reference (every probe since session-199
 * read at-rest faces — parity: computed styles; drift: text/img/head/
 * geometry/preflight — or OUR behaviors pinned by the e2e battery
 * against OUR artifact) finally sit under the unit gate.
 *
 * The coverage gap this battery closes (live-ridden 2026-11-04, both
 * apps, 1280×800 — the contact-form submit ride, the filter rides, the
 * carousel rides, the project-card clicks, the header scroll flip):
 *
 * ① THE SUCCESS PANEL (F-19a, HIGH, VISIBLE + FUNCTIONAL): the
 *   reference's submit fires NO domain POST (only base44 telemetry —
 *   live-captured) and at ~400ms REMOVES the form, replacing it in
 *   place with a persistent centered success panel: the wrapper
 *   `h-full flex flex-col items-center justify-center text-center
 *   py-16`, a 48px amber CircleCheckBig (`mb-5`, the reference's
 *   inline rgb(245,158,11) — our text-amber-500 class decode, the
 *   F-15b genus), an h3 `text-2xl font-black text-zinc-950 mb-3` →
 *   "Message sent!", a p `text-zinc-500` → "We'll be in touch within
 *   24 hours." OURS instead kept the form (cleared) and showed a
 *   floating shadcn toast bottom-right — a different visible
 *   construction on the parity-gated surface. The provenance
 *   correction: the byte-verified pair is the PANEL's h3/p, not a
 *   toast's (the session-199 "only toasts" record mis-read the
 *   vehicle).
 * ② THE FORM'S REMOVAL: the panel PERSISTS (16s+ live-watched; the
 *   form never returns) — ours swaps via a `submitted` gate and the
 *   post-success field-clear family RETIRES (the form unmounts; the
 *   clears are dead code).
 * ③ THE FLOATING SUCCESS TOAST RETIRES on the landing (the reference
 *   fires none); the honest ERROR toasts stay (the reference's
 *   failure face is structurally unreachable — no request, no
 *   failure; our error family is the unverifiable-member keep, the
 *   round-17 verify-form precedent).
 * ④ THE RIGHT-COLUMN WRAPPER (F-19b, structural): the reference's
 *   contact grid wraps BOTH columns in bare <div> grid items (grid >
 *   div > form); ours mounted the form directly (grid > form) —
 *   invisible at rest (the round-16 geometry census passed) but a
 *   DOM-mirror divergence, and load-bearing: the panel's h-full rides
 *   the wrapper.
 * ⑤ THE PANEL'S role="status": OUR a11y superset — the reference's
 *   panel is screen-reader-silent (no live region); ours announces
 *   (the label-binding genus: invisible supersets only).
 * ⑥ THE RENAME: INQUIRY_TOAST → INQUIRY_SUCCESS (the object is the
 *   panel's h3/p — the name must tell the truth; the values stay
 *   byte-identical).
 * ⑦ THE KEEPS: the native-validation gate (no noValidate — the
 *   round-16 cure), the four controlled inputs, the required trio
 *   (name/email/message — the select carries none on EITHER app,
 *   live-proven), the disabled={pending} in-flight guard (the
 *   reference's in-flight face unobservable — the swap lands ~400ms;
 *   the invisible superset keep).
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const landingRaw = readFileSync(path.join(here, "../src/components/landing/landing-page.tsx"), "utf8");
const siteContentRaw = readFileSync(path.join(here, "../src/lib/site-content.ts"), "utf8");

// comment-stripped source for the NEGATIVE pins — the round-19 cure
// comments themselves name the retired strings (the toast family, the
// clears), so negatives must read code-only (the toast-anatomy idiom)
function stripComments(s: string): string {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}
const landing = stripComments(landingRaw);
const siteContent = stripComments(siteContentRaw);

// The round-16 tolerant-import lesson: an absent export errors the
// whole battery at import time — catch-to-null so the content checks
// fail honestly (and the pre-existing keeps stay green by design).
const siteContentModule = await (async () => {
  try {
    return await import("../src/lib/site-content");
  } catch {
    return null;
  }
})();

/** A bounded region around an anchor (a failed anchor fails the pin). */
function regionAt(src: string, anchor: string, before: number, after: number): string {
  const i = src.indexOf(anchor);
  expect(i, `anchor not found: ${anchor}`).toBeGreaterThanOrEqual(0);
  return src.slice(Math.max(0, i - before), i + after);
}

describe("session-199 round-19 parity pins (the interaction-behavior census — the reference's live contact-form ride)", () => {
  it("① the success panel — the reference's in-place face (F-19a: the form is replaced, not toasted)", () => {
    // the panel wrapper — the reference's exact class string
    expect(landing).toContain('className="h-full flex flex-col items-center justify-center text-center py-16"');
    // the 48px CircleCheckBig + mb-5 + the amber class decode (the
    // reference's inline rgb(245,158,11) — our lucide 0.525 ships the
    // reference's exact path data, verified at the node_modules source)
    expect(landing).toContain('<CircleCheckBig size={48} className="mb-5 text-amber-500" />');
    // the h3/p class strings + the INQUIRY_SUCCESS pair
    expect(landing).toContain('className="text-2xl font-black text-zinc-950 mb-3"');
    expect(landing).toContain('className="text-zinc-500"');
    expect(landing).toContain("{INQUIRY_SUCCESS.title}");
    expect(landing).toContain("{INQUIRY_SUCCESS.description}");
  });

  it("② the form is REMOVED on success — the submitted gate + the retired clear family", () => {
    expect(landing).toContain("const [submitted, setSubmitted] = React.useState(false);");
    expect(landing).toContain("setSubmitted(true);");
    // the conditional swap: the panel before, the form after
    expect(landing).toContain("{submitted ? (");
    expect(landing).toContain(") : (");
    // the form's own face is unchanged (the at-rest byte mirror)
    expect(landing).toContain('<form className="flex flex-col gap-5" onSubmit={onSubmit}>');
    // the post-success clear family RETIRED — the form unmounts, the
    // setters only live in the onChange handlers now
    expect(landing).not.toContain('setName("")');
    expect(landing).not.toContain('setEmail("")');
    expect(landing).not.toContain('setService("")');
    expect(landing).not.toContain('setMessage("")');
  });

  it("③ the floating success toast is RETIRED on the landing; the honest error family stays", () => {
    // no toast.success anywhere on the landing (the reference fires none)
    expect(landing).not.toContain("toast.success");
    // the error family — the unverifiable-member keep (the reference
    // cannot fail: no request fires)
    expect(landing).toContain("Message could not be sent");
    expect((landing.match(/toast\.error/g) ?? []).length).toBe(2);
  });

  it("④ the contact grid's right column is the bare wrapper div (F-19b — the reference's grid > div > form)", () => {
    // the wrapper <div> directly carries the submitted conditional;
    // round-28: the reveal wiring (the ref/style pair) rides the same
    // bare div — still no class, still grid > div > (form | panel)
    expect(landing).toMatch(/<div ref=\{contact\.ref\(1\)\} style=\{contact\.style\(1\)\}>\s*\{submitted \? \(/);
  });

  it("⑤ the panel's role=status — OUR a11y superset over the reference's silent panel", () => {
    const panel = regionAt(landing, "h-full flex flex-col items-center justify-center text-center py-16", 120, 400);
    expect(panel).toContain('role="status"');
  });

  it("⑥ the INQUIRY_SUCCESS rename — the provenance corrected, the values byte-identical", () => {
    expect(siteContent).toContain("export const INQUIRY_SUCCESS = {");
    expect(siteContent).not.toContain("INQUIRY_TOAST");
    if (siteContentModule) {
      const m = siteContentModule as unknown as Record<string, unknown>;
      expect(m.INQUIRY_SUCCESS).toEqual({
        title: "Message sent!",
        description: "We'll be in touch within 24 hours.",
      });
      expect("INQUIRY_TOAST" in m).toBe(false);
    } else {
      expect.fail("site-content failed to import");
    }
  });

  it("⑦ the keeps — the native gate, the controlled inputs, the required trio, the pending guard", () => {
    // the native-validation gate (the round-16 cure — never returns)
    const form = regionAt(landing, '<form className="flex flex-col gap-5" onSubmit={onSubmit}>', 0, 4600);
    expect(form).not.toContain("noValidate");
    // the required trio (the select carries none on EITHER app — live-proven)
    expect((form.match(/required/g) ?? []).length).toBe(3);
    // the four controlled inputs (the value/onChange family)
    expect(landing).toContain("value={name}");
    expect(landing).toContain("value={email}");
    expect(landing).toContain("value={service}");
    expect(landing).toContain("value={message}");
    // the in-flight guard (the invisible superset — the reference's
    // in-flight face unobservable)
    expect(landing).toContain("disabled={pending}");
  });
});
