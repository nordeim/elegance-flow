import { expect, test } from "@playwright/test";

// Session-163 (the digma reset-password.spec.ts port): the reset funnel's
// behavioral battery. The spec OPTS OUT of the shared storageState (the
// surface is public and session-agnostic) and declares its OWN
// X-Forwarded-For bucket — a single-value header is both first and last
// hop, so the session-163 last-hop re-key leaves this isolation form
// byte-identical — so its auth calls (the scratch account's signup +
// verify + the round-trip's forgot + reset + old-login + new-login, plus
// the invalid-token submit's reset POST) never touch the auth.spec.ts
// shared budget.
//
// The round-trip runs on a DEDICATED SCRATCH ACCOUNT (digma's S67-A
// lesson): resetting the DEMO user mid-suite would bump its tokenVersion
// and evict the shared storageState's cookie for every spec running
// after this file alphabetically.

test.use({ storageState: { cookies: [], origins: [] } });
test.use({ extraHTTPHeaders: { "X-Forwarded-For": "198.51.100.46" } });

test.describe("reset-password landing (no token → the invalid-link card)", () => {
  test("renders the invalid-link card and Back to Login navigates to /login", async ({ page }) => {
    await page.goto("/reset-password");
    // Round-26 (F-26a): the exact Title-Case face — the reference's own
    // DOM-case (live-probed settled 2026-11-05), pinned exactly.
    await expect(page.getByRole("heading", { name: "Invalid Reset Link", exact: true })).toBeVisible();
    await expect(
      page.getByText("This password reset link is invalid or has expired."),
    ).toBeVisible();

    await page.getByRole("button", { name: "Back to Login", exact: true }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toBeVisible();
  });

  test("an empty token and a differently-named param both render the invalid card", async ({ page }) => {
    await page.goto("/reset-password?token=");
    await expect(page.getByRole("heading", { name: "Invalid Reset Link", exact: true })).toBeVisible();
    await page.goto("/reset-password?code=abc123");
    await expect(page.getByRole("heading", { name: "Invalid Reset Link", exact: true })).toBeVisible();
  });
});

test.describe("reset-password form (a non-empty token)", () => {
  test("renders the set-password form with the helper text", async ({ page }) => {
    await page.goto("/reset-password?token=e2e-shape-probe");
    await expect(page.getByRole("heading", { name: "Set new password" })).toBeVisible();
    await expect(page.getByText("Enter your new password for EleganceFlow")).toBeVisible();

    const password = page.locator("input#password");
    const confirm = page.locator("input#confirmPassword");
    await expect(password).toBeVisible();
    await expect(confirm).toBeVisible();
    await expect(page.getByText("Must be at least 8 characters")).toBeVisible();
    await expect(page.getByRole("button", { name: "Reset password", exact: true })).toBeVisible();
  });

  test("mismatched passwords render the inline error and do not submit", async ({ page }) => {
    await page.goto("/reset-password?token=e2e-shape-probe");
    await page.locator("input#password").fill("NewPass1234!");
    await page.locator("input#confirmPassword").fill("Different99!");
    await page.getByRole("button", { name: "Reset password", exact: true }).click();
    await expect(page.getByRole("alert").filter({ hasText: "Passwords do not match" })).toBeVisible();
    // Still on the reset page — the guard blocked the submit.
    await expect(page).toHaveURL(/\/reset-password/);
  });

  test("the invalid-token submit renders the inline alert", async ({ page }) => {
    await page.goto("/reset-password?token=e2e-invalid-token");
    await page.locator("input#password").fill("NewPass1234!");
    await page.locator("input#confirmPassword").fill("NewPass1234!");
    await page.getByRole("button", { name: "Reset password", exact: true }).click();
    const alert = page.getByRole("alert").filter({ hasText: "Invalid or expired reset token" });
    await expect(alert).toBeVisible({ timeout: 15_000 });
  });

  test("the bare Back to login link returns to the sign-in card", async ({ page }) => {
    await page.goto("/reset-password?token=e2e-shape-probe");
    // Round-26: the token state's back button stays SENTENCE case (the
    // reference's own in-card inconsistency — probed: the invalid card
    // ships "Back to Login", the token form "Back to login").
    await page.getByRole("button", { name: "Back to login", exact: true }).first().click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toBeVisible();
  });
});

test.describe("round-26: the platform reset FACE census (F-26a/b/c on the standalone artifact)", () => {
  // The reference's /reset-password renders the base44 PLATFORM's own
  // reset family — a different design system from its own login card
  // (live-probed settled 2026-11-05 at 1280 AND 390: the flat gray-50
  // page, the white rounded-lg(8px) shadow-lg card, the FIXED 48/48/40
  // inner, the 24px h2 gray-900 headings, the 44px/6px gray controls,
  // the zinc-500 placeholder, the 80×40 red-100 icon on the invalid
  // card, the 2px gray-900 strip on the token form). These legs pin the
  // family's computed faces so a reversion to the login family (the
  // session-163 expression) can never ship silently.

  test("the invalid-link card renders the platform chrome + icon + the BreadcrumbList JSON-LD", async ({ page }) => {
    await page.goto("/reset-password");
    await expect(page.getByRole("heading", { name: "Invalid Reset Link", exact: true })).toBeVisible();

    const face = await page.evaluate(() => {
      const main = document.querySelector("main");
      const card = main?.querySelector("div.relative") as HTMLElement | null;
      const inner = card?.querySelector("div.px-12") as HTMLElement | null;
      const iconWrap = document.querySelector(".rounded-full.bg-red-100") as HTMLElement | null;
      const icon = iconWrap?.querySelector("svg");
      const btn = document.querySelector("button") as HTMLElement | null;
      const h2 = document.querySelector("h2") as HTMLElement | null;
      if (!main || !card || !iconWrap || !btn || !h2) return null;
      const gs = (el: Element) => getComputedStyle(el);
      return {
        pageBg: gs(main).backgroundColor,
        cardBg: gs(card).backgroundColor,
        cardRadius: gs(card).borderRadius,
        cardShadow: gs(card).boxShadow !== "none",
        innerPad: inner ? gs(inner).padding : "",
        iconW: Math.round(iconWrap.getBoundingClientRect().width),
        iconWrapBg: gs(iconWrap).backgroundColor,
        iconWrapRadius: gs(iconWrap).borderRadius,
        iconSize: icon ? Math.round(icon.getBoundingClientRect().width) : 0,
        iconColor: icon ? gs(icon).color : "",
        h2Font: gs(h2).fontSize,
        h2Weight: gs(h2).fontWeight,
        h2Color: gs(h2).color,
        h2Tracking: gs(h2).letterSpacing,
        btnH: Math.round(btn.getBoundingClientRect().height),
        btnRadius: gs(btn).borderRadius,
        btnBg: gs(btn).backgroundColor,
      };
    });
    expect(face).not.toBeNull();
    expect(face!.pageBg).toBe("rgb(249, 250, 251)"); // the FLAT gray-50 page
    expect(face!.cardBg).toBe("rgb(255, 255, 255)");
    expect(face!.cardRadius).toBe("8px");
    expect(face!.cardShadow).toBe(true);
    expect(face!.innerPad).toBe("48px 48px 40px");
    expect(face!.iconW).toBe(80);
    expect(face!.iconWrapBg).toBe("rgb(254, 226, 226)"); // red-100
    // the full-round radius: v3 computes 9999px, v4 computes
    // 33554400px (2^25) — both fully round an 80px box; the numeric
    // read is the serialization-agnostic assertion
    expect(Number.parseFloat(face!.iconWrapRadius)).toBeGreaterThanOrEqual(80);
    expect(face!.iconSize).toBe(40);
    expect(face!.iconColor).toBe("rgb(220, 38, 38)"); // red-600
    expect(face!.h2Font).toBe("24px");
    expect(face!.h2Weight).toBe("700");
    expect(face!.h2Color).toBe("rgb(17, 24, 39)"); // gray-900
    expect(face!.h2Tracking).toBe("normal");
    expect(face!.btnH).toBe(44);
    expect(face!.btnRadius).toBe("6px");
    expect(face!.btnBg).toBe("rgb(17, 24, 39)");

    // F-26b: the BreadcrumbList JSON-LD rides the route (the platform's
    // own injection — /login and the /signup superset carry the same);
    // the reset crumb name mirrors the platform's hyphen-to-space face
    const ld = await page.evaluate(
      () => document.querySelector('script[type="application/ld+json"]')?.textContent ?? "",
    );
    expect(ld).toContain('"@type": "BreadcrumbList"');
    expect(ld).toContain('"name": "reset password"');
    expect(ld).toMatch(/"item": "[^"]*\/reset-password"/);
  });

  test("the token form renders the platform control family + the strip + the labels", async ({ page }) => {
    await page.goto("/reset-password?token=e2e-shape-probe");
    await expect(page.getByRole("heading", { name: "Set new password" })).toBeVisible();
    // the Title-Case labels (F-26a) — exact: "New Password" is a
    // substring of "Confirm New Password"
    await expect(page.getByLabel("New Password", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Confirm New Password", { exact: true })).toBeVisible();

    const face = await page.evaluate(() => {
      const card = document.querySelector("main div.relative") as HTMLElement | null;
      const strip = card?.querySelector(".absolute.inset-x-0") as HTMLElement | null;
      const input = document.querySelector("form input") as HTMLInputElement | null;
      const btn = document.querySelector('form button[type="submit"]') as HTMLElement | null;
      const label = document.querySelector("label") as HTMLElement | null;
      const hint = [...document.querySelectorAll("p")].find((p) =>
        p.textContent?.includes("at least 8 characters")) as HTMLElement | null;
      const sub = [...document.querySelectorAll("p")].find((p) =>
        p.textContent?.includes("Enter your new password")) as HTMLElement | null;
      if (!card || !input || !btn) return null;
      const gs = (el: Element) => getComputedStyle(el);
      return {
        stripH: strip ? Math.round(strip.getBoundingClientRect().height) : null,
        stripBg: strip ? gs(strip).backgroundColor : "",
        inputH: Math.round(input.getBoundingClientRect().height),
        inputRadius: gs(input).borderRadius,
        inputBorder: gs(input).borderColor,
        inputBg: gs(input).backgroundColor,
        ph: getComputedStyle(input, "::placeholder").color,
        inputText: gs(input).color,
        btnH: Math.round(btn.getBoundingClientRect().height),
        btnRadius: gs(btn).borderRadius,
        btnBg: gs(btn).backgroundColor,
        labelFont: label ? gs(label).fontSize : "",
        labelColor: label ? gs(label).color : "",
        hintFont: hint ? gs(hint).fontSize : "",
        hintColor: hint ? gs(hint).color : "",
        subColor: sub ? gs(sub).color : "",
      };
    });
    expect(face).not.toBeNull();
    expect(face!.stripH).toBe(2);
    expect(face!.stripBg).toBe("rgb(17, 24, 39)");
    expect(face!.inputH).toBe(44); // h-11 FIXED (the login ladder retired)
    expect(face!.inputRadius).toBe("6px");
    expect(face!.inputBorder).toBe("rgb(229, 231, 235)"); // gray-200
    expect(face!.inputBg).toContain("0.5"); // gray-50/50 (the oklab class)
    expect(face!.ph).toBe("rgb(113, 113, 122)"); // zinc-500, the v3 literal
    expect(face!.inputText).toBe("rgb(9, 9, 11)"); // zinc-950
    expect(face!.btnH).toBe(44);
    expect(face!.btnRadius).toBe("6px");
    expect(face!.btnBg).toBe("rgb(17, 24, 39)"); // gray-900
    expect(face!.labelFont).toBe("14px");
    expect(face!.labelColor).toBe("rgb(55, 65, 81)"); // gray-700
    expect(face!.hintFont).toBe("12px");
    expect(face!.hintColor).toBe("rgb(107, 114, 128)"); // gray-500
    expect(face!.subColor).toBe("rgb(75, 85, 99)"); // gray-600

    // F-26b: the JSON-LD rides this state too
    const ld2 = await page.evaluate(
      () => document.querySelector('script[type="application/ld+json"]')?.textContent ?? "",
    );
    expect(ld2).toContain('"@type": "BreadcrumbList"');
    expect(ld2).toContain('"name": "reset password"');
  });

  test("the retired login-family chrome never returns (the negatives)", async ({ page }) => {
    await page.goto("/reset-password?token=e2e-shape-probe");
    const classes = await page.evaluate(() => {
      const all = [...document.querySelectorAll("main *")].flatMap((el) =>
        (el as HTMLElement).className?.split?.(/\s+/) ?? []);
      return [...new Set(all)];
    });
    // the login-family carriers (the session-163 expression) are retired
    expect(classes).not.toContain("rounded-xl");
    expect(classes).not.toContain("rounded-2xl");
    expect(classes).not.toContain("shadow-2xl");
    expect(classes).not.toContain("bg-gradient-to-br");
    expect(classes).not.toContain("text-3xl");
    expect(classes).not.toContain("tracking-tight");
    expect(classes).not.toContain("sm:h-12");
    expect(classes).not.toContain("sm:p-10");
    // the headings are h2 (the reference's own tag), never h1
    const h1s = await page.locator("h1").count();
    expect(h1s).toBe(0);
  });

  test("the a11y superset keeps: autocomplete on both inputs, the announced error box", async ({ page }) => {
    await page.goto("/reset-password?token=e2e-shape-probe");
    // the WCAG 1.3.5 identify-input-purpose superset (the reference
    // ships none — probed: ac="" on both its inputs)
    await expect(page.locator("input#password")).toHaveAttribute("autocomplete", "new-password");
    await expect(page.locator("input#confirmPassword")).toHaveAttribute("autocomplete", "new-password");
    // the error box announces with the reference's own ink family
    // (zinc-950 on red-50/50 — F-26c) after the bogus-token submit
    await page.locator("input#password").fill("NewPass1234!");
    await page.locator("input#confirmPassword").fill("NewPass1234!");
    await page.getByRole("button", { name: "Reset password", exact: true }).click();
    const alert = page.getByRole("alert").filter({ hasText: "Invalid or expired reset token" });
    await expect(alert).toBeVisible({ timeout: 15_000 });
    const errorFace = await alert.evaluate((el) => {
      const s = getComputedStyle(el);
      return { color: s.color, bg: s.backgroundColor, font: s.fontSize, radius: s.borderRadius, pad: s.padding };
    });
    expect(errorFace.color).toBe("rgb(9, 9, 11)"); // zinc-950
    expect(errorFace.bg).toContain("0.5"); // red-50/50
    expect(errorFace.font).toBe("16px");
    expect(errorFace.radius).toBe("8px");
    expect(errorFace.pad).toBe("16px");
  });
});

test.describe("the full reset round-trip (the in-app delivery)", () => {
  test("forgot → the sent card carries the link → set a new password → sign in with it", async ({ page }) => {
    // The scratch flow: signup (the in-app OTP delivery answers the code
    // in the response — the digma ADR-014 port), verify, then the reset
    // round-trip. The scratch account is disposable; the e2e DB re-seeds
    // per run. No restore step is needed.
    const scratchEmail = `s163-reset-${Date.now()}@e2e.test`;
    await page.goto("/login");
    const registered = await page.evaluate(
      async ({ email }) => {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: "Scratch1234!" }),
        });
        return res.json();
      },
      { email: scratchEmail },
    );
    expect(registered.ok).toBe(true);
    expect(typeof registered.data.verificationCode).toBe("string");

    const verified = await page.evaluate(
      async ({ email, code }) => {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        });
        return res.json();
      },
      { email: scratchEmail, code: registered.data.verificationCode },
    );
    expect(verified.ok).toBe(true);

    // The scratch session is LIVE in this context — the forgot flow needs
    // the signed-out card, so log the scratch session out first.
    await page.evaluate(() => fetch("/api/auth/logout", { method: "POST" }).then(() => undefined));

    // 1. The forgot request on the scratch account (the reset view's
    //    submit is now the REAL endpoint — the client-side theater is
    //    retired).
    await page.goto("/login");
    await page.getByRole("button", { name: "Forgot password?" }).click();
    await page.getByLabel("Email").fill(scratchEmail);
    await page.getByRole("button", { name: "Send reset link" }).click();
    await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible({ timeout: 15_000 });

    // 2. The self-hosted in-app delivery: the sent card carries the reset
    //    link (a RELATIVE href resolving against the page's own origin).
    const infoLink = page.getByRole("link", { name: /reset link/i });
    await expect(infoLink).toBeVisible({ timeout: 15_000 });
    const href = await infoLink.evaluate((el) => (el as HTMLAnchorElement).href);
    expect(href).toMatch(/\/reset-password\?token=.+/);

    // 3. Follow the link → the form renders with the LIVE token.
    await infoLink.click();
    await expect(page.getByRole("heading", { name: "Set new password" })).toBeVisible();
    await expect(page).toHaveURL(/\/reset-password\?token=.+/);

    // 4. Set the new password.
    await page.locator("input#password").fill("Reset1234!");
    await page.locator("input#confirmPassword").fill("Reset1234!");
    await page.getByRole("button", { name: "Reset password", exact: true }).click();

    // 5. The success card, then back to login.
    await expect(page.getByRole("heading", { name: "Password reset" })).toBeVisible({ timeout: 15_000 });
    await page.getByRole("button", { name: "Back to login" }).first().click();
    await expect(page).toHaveURL(/\/login$/);

    // 6. The OLD password no longer signs in; the NEW one does.
    await page.getByLabel("Email").fill(scratchEmail);
    await page.getByLabel("Password").fill("Scratch1234!");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page.getByRole("alert").filter({ hasText: "Invalid email or password" })).toBeVisible();

    await page.getByLabel("Password").fill("Reset1234!");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Inquiries" })).toBeVisible({ timeout: 15_000 });

    // 7. The new session is live: /api/auth/me answers with the scratch
    //    user (the me route answers 200 with data:null when signed out,
    //    so the honest form asserts the resolved user).
    const me = await page.request.get("/api/auth/me");
    expect(me.status()).toBe(200);
    const meBody = await me.json();
    expect(meBody.data?.email).toBe(scratchEmail);
  });

  test("the ghost email's sent card ANNOUNCES the callout (role=alert) with no link — the round-20 F-20a pin", async ({ page }) => {
    // Round-20 (the auth-failure/response census): the sent view's green
    // callout carries role="alert" — the platform's own callout idiom
    // (live-ridden on the reference: its red failure banner AND its green
    // sent banner both announce), completing our Error/Info/sent family.
    // The ghost email (valid format, no mailbox, no account) proves the
    // no-enumeration 200 swap AND the graceful link degrade in one ride —
    // the unknown path writes no row, so the e2e DB stays clean.
    await page.goto("/login");
    await page.getByRole("button", { name: "Forgot password?" }).click();
    await page.getByLabel("Email").fill("no-such-user-round20@example.com");
    await page.getByRole("button", { name: "Send reset link" }).click();

    // The sent card's faces (the round-20 census: byte-identical on both
    // apps — the h2, the email line, the back button).
    await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/We've sent password reset instructions to/)).toBeVisible();
    await expect(page.getByRole("button", { name: "Back to sign in" })).toBeVisible();

    // F-20a: the callout ANNOUNCES (role=alert) with the exact text.
    const callout = page.getByRole("alert").filter({
      hasText: "Please check your email for the password reset link. It may take a few minutes to arrive.",
    });
    await expect(callout).toBeVisible();

    // The graceful degrade: NO reset link on the ghost path (the null
    // resetUrl renders nothing — the knob-off production posture).
    await expect(page.getByRole("link", { name: /reset link/i })).toHaveCount(0);
  });

  test("a pre-reset session dies at the version comparison (the S67-A eviction, behavioral)", async ({ page }) => {
    // The eviction's honest behavioral pin: mint a session, reset the
    // password through the API, then the OLD cookie no longer resolves a
    // user. (The reset bumps tokenVersion; the old token embeds the
    // pre-increment version.)
    const scratchEmail = `s163-evict-${Date.now()}@e2e.test`;
    await page.goto("/login");
    const registered = await page.evaluate(
      async ({ email }) => {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: "Scratch1234!" }),
        });
        return res.json();
      },
      { email: scratchEmail },
    );
    expect(registered.ok).toBe(true);
    const verified = await page.evaluate(
      async ({ email, code }) => {
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        });
        return res.json();
      },
      { email: scratchEmail, code: registered.data.verificationCode },
    );
    expect(verified.ok).toBe(true);

    // The scratch session is live (verify signs the account in).
    const before = await page.request.get("/api/auth/me");
    expect((await before.json()).data?.email).toBe(scratchEmail);

    // The forgot + reset through the API (the page.request context rides
    // the browser's cookie jar — but the reset endpoint needs no session).
    const forgot = await page.evaluate(
      async ({ email }) => {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        return res.json();
      },
      { email: scratchEmail },
    );
    expect(forgot.ok).toBe(true);
    expect(typeof forgot.data.resetUrl).toBe("string");
    const token = String(forgot.data.resetUrl).split("token=")[1];

    const reset = await page.evaluate(
      async ({ token }) => {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reset_token: token, new_password: "Evicted1234!" }),
        });
        return res.json();
      },
      { token },
    );
    expect(reset.ok).toBe(true);

    // THE EVICTION: the still-held cookie no longer resolves a user (the
    // live row's tokenVersion moved past the token's embedded version).
    const after = await page.request.get("/api/auth/me");
    expect(after.status()).toBe(200);
    const afterBody = await after.json();
    expect(afterBody.data).toBeNull();

    // And the consumed token is single-use: a replay answers the
    // invalid-token 400.
    const replay = await page.evaluate(
      async ({ token }) => {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reset_token: token, new_password: "Replayed1234!" }),
        });
        return { status: res.status, body: await res.json() };
      },
      { token },
    );
    expect(replay.status).toBe(400);
    expect(replay.body.error.message).toBe("Invalid or expired reset token");
  });
});
