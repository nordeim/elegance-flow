import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * The round-20 AUTH-FAILURE/RESPONSE census — the live failure rides no
 * probe ever made against the reference (round-17 rode EMPTY submits only
 * — the native gate blocked everything; round-19 rode the landing's
 * behaviors, never the auth card's), plus the response-header family
 * re-censused on the CURRENT reference (the session-20 pins were read
 * against the OLD NEO-CRM reference).
 *
 * **F-20a (MODERATE, a11y/semantic)**: the sent view's GREEN CALLOUT
 * carried NO ROLE — the screen reader was silent on the success
 * announcement. The reference's platform callouts ALL carry
 * role="alert" (the red failure banner AND the green sent banner —
 * live-ridden at round-20), and our own card's idiom already mirrors it
 * (ErrorCallout + InfoCallout both render role="alert"): the sent
 * callout was the ROLE-LESS STRAGGLER of the family. Everything else
 * byte-identical (the full class string, the inner bare-text div, the
 * mount parent, the h2/para/button — probes 1–3).
 *
 * The positive censuses (live-ridden, both apps, byte-identical): the
 * login-failure ride (the red banner's full class + inner shape + text,
 * the in-form mount, the 6s+ persistence, the single-alert retry, the
 * kept password) and the reset-submit ride (the ghost-email 200 swap —
 * no db row on the unknown path). The records: the platform's 400 vs
 * our 401 (the canonical status — R-20b), the endpoint shapes (R-20c),
 * the real-account sent card unverifiable (R-20d).
 */
const card = readFileSync("src/components/layout/login-card.tsx", "utf8");
const loginRoute = readFileSync("src/app/api/auth/login/route.ts", "utf8");

describe("the round-20 auth-failure/response census (F-20a + the keeps)", () => {
  it("1. the sent callout ANNOUNCES — role=alert (the platform's callout idiom; ours was the role-less straggler) [F-20a]", () => {
    // The cure: the sent view's callout div carries the role next to the
    // class constant — completing the family (Error/Info/sent, all alert).
    expect(card).toMatch(
      /<div\s+role="alert"\s+className=\{LOGIN_RESET_LAYOUT\.sentCallout\}/,
    );
  });

  it("2. the callout family is complete — every callout render in the card carries a role (the no-roleless-callout census)", () => {
    expect(card).toContain(
      '<div role="alert" className={LOGIN_ERROR_CALLOUT.callout}>',
    );
    expect(card).toContain(
      '<div role="alert" className={LOGIN_INFO_CALLOUT.callout}>',
    );
    // The census: exactly three callout renders, exactly three roled
    // renders (count the JSX shape, never the comment text — the
    // round-20 live find: a mechanism comment citing role="alert" made
    // the naive string census count 4).
    const calloutRenders =
      card.match(
        /LOGIN_(?:RESET_LAYOUT\.sentCallout|ERROR_CALLOUT\.callout|INFO_CALLOUT\.callout)\}/g,
      ) ?? [];
    const roled = card.match(/<div role="alert"/g) ?? [];
    expect(calloutRenders.length).toBe(3);
    expect(roled.length).toBe(3);
  });

  it("3. the login-failure callout's anatomy is byte-pinned at source (the round-20 live census: byte-identical on both apps)", () => {
    // The red banner's construction: role + the error class constant +
    // the inner text div (the reference's inner DIV carries
    // [&_p]:leading-relaxed text-red-700 text-sm — ours decodes the same).
    const errorFn = card.slice(
      card.indexOf("function ErrorCallout"),
      card.indexOf("function ErrorCallout") + 400,
    );
    expect(errorFn).toContain('<div role="alert" className={LOGIN_ERROR_CALLOUT.callout}>');
    expect(errorFn).toContain('<div className={LOGIN_ERROR_CALLOUT.text}>');
    // The NO-auto-dismiss contrast (the round-20 census: the failure
    // banner persists 6s+ on both apps): the dismiss timer rides the
    // INFO banner only — the error state never rides a setTimeout.
    expect(card).toMatch(/setTimeout\(\(\) => setInfo\(null\), INFO_BANNER_MS\)/);
    expect(card).not.toMatch(/setTimeout\(\(\) => setError\(null\)/);
  });

  it("4. the sent card's faces are unchanged by the cure (the h2, the email line, the back button, the callout's exact text)", () => {
    expect(card).toContain(
      '<h2 className={LOGIN_RESET_LAYOUT.title}>Check your email</h2>',
    );
    expect(card).toContain("We've sent password reset instructions to");
    expect(card).toContain("Back to sign in");
    expect(card).toContain(
      "Please check your email for the password reset link. It may take a few",
    );
    expect(card).toContain("minutes to arrive.");
  });

  it("5. the login-failure banner's text + status are pinned at the seam (the round-20 census: the platform answers the SAME text; our 401 is the canonical status — R-20b)", () => {
    // Session-21 chose the text from wrong-password probes on both apps;
    // round-20 re-proved it live on the CURRENT reference (byte-identical).
    expect(loginRoute).toContain(
      'fail("INVALID_CREDENTIALS", "Invalid email or password", 401)',
    );
  });
});
