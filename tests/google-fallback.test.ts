import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

/**
 * The round-21 GOOGLE-BUTTON census — the click ride no probe ever made
 * (inks pinned at round-13, the G glyph at round-16 — the CLICK was
 * never ridden on either app).
 *
 * **R-21a (RECORD, functional — no cure possible)**: the reference's
 * "Continue with Google" button is a REAL Google OAuth redirect
 * (live-ridden, external navigation intercepted, zero side effects):
 * the click navigates to accounts.google.com/v3/signin/identifier with
 * client_id 185178814199-6a35e9aqcmlm15ig0upncg07c91av8do.apps.googleusercontent.com,
 * redirect_uri https://app.base44.com/api/apps/auth/callback,
 * response_type=code, scope "openid email profile", prompt=select_account,
 * and a state object carrying {domain, from_url, app_id}. UNIMPLEMENTABLE
 * in the self-hosted clone: the OAuth redirect_uri is registered to
 * base44's Google app — completing the flow needs the owner's Google
 * credentials (the R-20d unverifiable-member precedent).
 *
 * **F-21a (the coverage catch)**: our honest fallback — the info toast
 * — was UNPINNED: no unit source-contract, no e2e ride. A regression
 * that breaks the handler, swaps the variant, or drops the honest text
 * would ship with every gate green. This battery pins the fallback's
 * four faces (the round-19/20 pin doctrine: every user-visible
 * behavior on the card gets a pin).
 *
 * The face (probe-verified at both viewports): the toast renders in
 * the Notifications region — bottom-right at 1280, top at 390 —
 * role="status", auto-dismisses at 4s, zero page errors. The URL never
 * leaves /login.
 */
const here = path.dirname(new URL(import.meta.url).pathname);
const cardRaw = readFileSync(path.join(here, "../src/components/layout/login-card.tsx"), "utf8");

// comment-stripped source for the NEGATIVE pins — the round-21 record
// comment above names the retired navigation family, so negatives must
// read code-only (the toast-anatomy / interaction-faces idiom).
function stripComments(s: string): string {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}
const card = stripComments(cardRaw);

// The Google button's bounded source window: from the button tag to its
// close (the round-20 bounded-window lesson — the [^>]* tag-regex
// truncation class).
const googleClassAt = card.indexOf("className={LOGIN_LAYOUT.google}");
const googleBtn = card.slice(
  card.lastIndexOf("<button", googleClassAt),
  card.indexOf("</button>", googleClassAt),
);

describe("the round-21 google-fallback census (F-21a + the keeps)", () => {
  it("1. the click handler fires the HONEST info toast — the exact title + description (the unconfigured-third-party fallback)", () => {
    // The R-21a record: the reference navigates to Google OAuth; ours
    // cannot (the redirect_uri is base44's) — the honest local face is
    // the toast, and its text must stay actionable (what happened, why,
    // where the credentials live).
    expect(googleBtn).toMatch(/onClick=\{\(\) =>\s*toast\.info\(/);
    expect(googleBtn).toContain('"Google sign-in not configured"');
    expect(googleBtn).toContain(
      '"This self-hosted clone uses email and password sign-in (demo credentials in the README)."',
    );
  });

  it("2. the button never submits the form — type=button (the block-section placement hazard)", () => {
    // The button rides the card's w-full block section BESIDE the form
    // (the reference's own construction) — but a type-less button that
    // ever migrates INTO a form would submit it. The never-submits pin.
    const attrs = googleBtn.slice(0, googleBtn.indexOf("onClick"));
    expect(attrs).toContain('type="button"');
    expect(attrs).toContain("className={LOGIN_LAYOUT.google}");
    // exactly one type attribute, and it precedes the className
    expect(attrs.match(/type=/g)?.length).toBe(1);
    expect(attrs.indexOf('type="button"')).toBeLessThan(
      attrs.indexOf("className={LOGIN_LAYOUT.google}"),
    );
  });

  it("3. the keeps — the class mount, the reference's G glyph, the span text", () => {
    expect(googleBtn).toContain('className={LOGIN_LAYOUT.google}');
    expect(googleBtn).toContain('className={LOGIN_LAYOUT.googleIcon}');
    expect(googleBtn).toContain("<GoogleIcon />");
    expect(googleBtn).toContain("<span>Continue with Google</span>");
  });

  it("4. the no-navigation contract — the handler carries NO navigation (the honest LOCAL fallback)", () => {
    // The R-21a mirror boundary: the reference's button navigates to
    // accounts.google.com; OURS must stay local (no router.push, no
    // window.open, no location assignment) — the unimplementable flow
    // degrades to the honest toast, never to a half-working redirect.
    expect(googleBtn).not.toMatch(/router\.push|window\.open|location\.(href|assign|replace)/);
    // and the toast call is the handler's ONLY statement
    expect(googleBtn).toMatch(/onClick=\{\(\) =>\s*toast\.info\([\s\S]*?\)\s*\}\s*>/);
  });
});
