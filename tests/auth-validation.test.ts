/**
 * Round-17 auth-validation battery: the VALIDATION-MODE faces no probe
 * read (the drift login leg reads at-rest computed inks/pads; parity-199
 * reads the landing; the e2e auth battery fills VALID non-empty
 * credentials — the empty-submit mode never rode; the round-16 geometry
 * census read the LANDING's form) finally sit under the unit gate.
 *
 * The coverage gap this battery closes (live-probed settled 2026-11-04,
 * both apps, 1280×800, the dev server):
 *
 * ①②③ THE VALIDATION MODE (F-17a, HIGH, VISIBLE, behavioral — the
 *   F-16d genus on the auth family): the reference's auth card
 *   NATIVE-VALIDATES — its sign-in, signup, and reset forms carry NO
 *   noValidate, and an empty submit never fires the submit event
 *   (probe: submitFired false, posts [] — the browser's own bubbles).
 *   OURS carried noValidate on all three reachable forms: the empty
 *   sign-in submit FIRED and POSTed /api/auth/login; the empty signup
 *   submit POSTed /api/auth/signup; the empty reset submit fired our
 *   custom guard's banner. The cures: drop the attribute from the
 *   three forms; the Zod seam stays the server-side backstop for
 *   non-empty-but-invalid payloads.
 * ④ THE VERIFY-FORM KEEP: the verify view's form KEEPS its
 *   noValidate — the reference's verify view is unreachable without a
 *   REAL signup on the operator's app (no safe probe exists); our
 *   verify view's own incomplete-guard UX stands, recorded as the
 *   unverifiable member.
 * ⑤ THE RESET EMAIL GATE: the reference's reset email input carries
 *   `required` (the attribute census); OURS carried none — the
 *   missing member that made our empty-submit path reachable. The
 *   cure adds it; canSubmitReset stays the programmatic backstop.
 * ⑥ THE MINLENGTH MIRROR: OURS' signup password/confirm inputs
 *   carried minLength={8} (ours-only; the reference's inputs carry NO
 *   minlength — its "Min. 8 characters" PLACEHOLDER communicates the
 *   policy, its server enforces it). While noValidate rode the form
 *   the attribute was INERT; dropping noValidate without dropping
 *   minLength would ACTIVATE a client gate STRICTER than the
 *   reference's. The mirror: drop both; the Zod seam (min 8, "Password
 *   must be at least 8 characters" — pinned by the auth e2e quartet)
 *   owns the enforcement exactly as the reference's server owns its.
 * ⑦ THE AUTOCOMPLETE SUPERSET (keep): our email/current-password/
 *   new-password autocomplete attributes are the invisible a11y
 *   superset (the reference ships none) — pinned so they never
 *   silently disappear.
 * ⑧ THE RETIRED-FORM REGRESSION: noValidate never returns to the
 *   three cured forms (the login card carries exactly one — the
 *   verify form's recorded keep).
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const read = (rel: string): string => readFileSync(path.join(ROOT, rel), "utf8");

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const loginCard = stripComments(read("src/components/layout/login-card.tsx"));

/** Extract a full form tag (multiline attrs) by its submit handler. */
const formTag = (handler: string): string => {
  const m = loginCard.match(new RegExp(`<form[^>]*onSubmit=\\{${handler}\\}[^>]*>`, "i"));
  return m ? m[0] : "";
};

describe("round-17 ①②③: the validation mode (the reference's native gate on the three reachable forms)", () => {
  it("the sign-in form carries NO noValidate (an empty submit native-validates, like the reference)", () => {
    const tag = formTag("onSigninSubmit");
    expect(tag).toMatch(/<form/);
    expect(tag).not.toMatch(/novalidate/i);
  });

  it("the signup form carries NO noValidate", () => {
    const tag = formTag("onSignupSubmit");
    expect(tag).toMatch(/<form/);
    expect(tag).not.toMatch(/novalidate/i);
  });

  it("the reset form carries NO noValidate", () => {
    const tag = formTag("onSendResetLink");
    expect(tag).toMatch(/<form/);
    expect(tag).not.toMatch(/novalidate/i);
  });
});

describe("round-17 ④: the verify-form keep (the unreachable reference view)", () => {
  it("the verify view's form KEEPS its noValidate (our own incomplete-guard UX — recorded)", () => {
    const tag = formTag("onVerifySubmit");
    expect(tag).toMatch(/<form/);
    expect(tag).toMatch(/novalidate/i);
  });
});

describe("round-17 ⑤: the reset view's email gate", () => {
  it("the reset view's email input carries required (the reference's attribute census)", () => {
    // bounded-window match: the [^>]* tag-regex truncates at the JSX
    // arrow "=>" inside onChange (the round-10 LIVE-FINDS lesson)
    const m = loginCard.match(/<input[\s\S]{0,700}?className=\{LOGIN_RESET_LAYOUT\.resetInput\}\s*\/>/);
    expect(m).not.toBeNull();
    expect(m![0]).toMatch(/\brequired\b/);
  });
});

describe("round-17 ⑥: the minlength mirror (the placeholder + the Zod seam own the policy)", () => {
  it("the login card carries NO minLength anywhere (the reference's auth inputs ship none — the placeholder + the Zod seam own the policy)", () => {
    expect(loginCard).not.toMatch(/minLength/i);
  });

  it("the signup password inputs keep their required gates (the mode mirror's active members)", () => {
    // the signup family: id="password"/"confirmPassword" with the
    // LOGIN_SIGNUP_LAYOUT.input class — bounded windows past the "=>"
    const pw = loginCard.match(/[\s\S]{0,120}?id="password"[\s\S]{0,600}?LOGIN_SIGNUP_LAYOUT\.input[\s\S]{0,60}?\/>/);
    const confirm = loginCard.match(/[\s\S]{0,120}?id="confirmPassword"[\s\S]{0,600}?LOGIN_SIGNUP_LAYOUT\.input[\s\S]{0,60}?\/>/);
    expect(pw).not.toBeNull();
    expect(confirm).not.toBeNull();
    expect(pw![0]).toMatch(/\brequired\b/);
    expect(confirm![0]).toMatch(/\brequired\b/);
  });
});

describe("round-17 ⑦: the autocomplete superset family (keep — the aria-expanded genus)", () => {
  it("the sign-in family carries email + current-password autocomplete", () => {
    expect(loginCard).toContain('autoComplete="email"');
    expect(loginCard).toContain('autoComplete="current-password"');
  });

  it("the signup family carries new-password autocomplete", () => {
    expect(loginCard).toContain('autoComplete="new-password"');
  });
});

describe("round-17 ⑧: the retired-form regression (noValidate never returns)", () => {
  it("the login card carries EXACTLY ONE noValidate — the verify form's recorded keep", () => {
    const count = (loginCard.match(/novalidate/gi) ?? []).length;
    expect(count).toBe(1);
  });
});
