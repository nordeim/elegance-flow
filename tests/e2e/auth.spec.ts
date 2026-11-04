import { expect, test } from "@playwright/test";

// Session-199 (the domain transformation): the LOGGED-OUT auth battery —
// the carried login/signup/forgot funnel re-anchored to the
// EleganceFlow brand. The auth backend is byte-identical to the
// session-163 ship (scrypt + HMAC cookie + the verify/reset funnels);
// only the card's brand strings and the post-login target moved (the
// plain sign-in now lands the studio team in /dashboard, the superset
// workspace — the documented deviation).
//
// The spec opts out of the shared storageState (this is the
// logged-out surface) and runs its signup/verify calls on the shared
// budget (login 10 / signup 10 / resend 5 / verify 20 per IP/15-min —
// the budget math the carried tests already respected).

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("the EleganceFlow login card (logged-out)", () => {
  test("login page renders the EleganceFlow card", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle("EleganceFlow");
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toBeVisible();
    await expect(page.getByText("Sign in to continue")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue with Google" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  // Round-8 (the trap-③ computed pin, restored from the lineage
  // session-7 spec): the glass card's backdrop-blur-sm must compute
  // blur(4px) — the --blur-sm: 4px @theme re-pin's computed face. If the
  // token pin ever drops, v4's renamed scale renders blur(8px) and this
  // check goes RED. The radius row (rounded-2xl = 16px) guards the same
  // token-scale family (v4's defaults happen to match v3 here — this
  // pins the coincidence, so a future engine change cannot drift it).
  test("the glass card computes the re-pinned token faces (blur(4px) + 16px radius)", async ({ page }) => {
    await page.goto("/login");
    const card = page.locator("div.rounded-2xl.backdrop-blur-sm").first();
    await expect(card).toBeVisible();
    await expect(card).toHaveCSS("backdrop-filter", "blur(4px)");
    await expect(card).toHaveCSS("border-radius", "16px");
  });

  test("rejects wrong credentials with the visible banner — zero toasts", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("sepnetflix2023@outlook.com");
    await page.getByLabel("Password").fill("wrong-password");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: /Invalid email or password/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("alert").filter({ hasText: /Invalid email or password/i }),
    ).toHaveClass(/bg-red-50\/70/);
    await expect(page.getByRole("status")).toHaveCount(0);
  });

  test("a guest sees the PUBLIC landing at /; /dashboard walls with from_url (the s147 mirror)", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Work that speaks");
    // the app surface login-walls with the from_url param:
    await page.goto("/dashboard");
    await page.waitForURL(/\/login\?from_url=/);
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toBeVisible();
  });

  test("forgot password swaps the card to the reset view and back", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Forgot password?" }).click();
    await expect(page.getByRole("heading", { name: "Reset your password" })).toBeVisible();
    await expect(
      page.getByText("Enter your email and we'll send you a link to reset your password"),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Send reset link" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Back to sign in" })).toBeVisible();
    // The login-only chrome is gone on the reset view.
    await expect(page.getByRole("button", { name: "Continue with Google" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toHaveCount(0);
    await expect(page).toHaveURL(/\/login$/);

    await page.getByRole("button", { name: "Back to sign in" }).click();
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  test("send reset link swaps to the check-your-email view (no enumeration)", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Forgot password?" }).click();
    await page.getByLabel("Email").fill("unknown@example.com");
    await page.getByRole("button", { name: "Send reset link" }).click();
    await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible();
    await expect(page.getByText("We've sent password reset instructions to")).toBeVisible();
    await page.getByRole("button", { name: "Back to sign in" }).click();
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toBeVisible();
  });

  test("need an account swaps the card to the minimal signup view and back", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Need an account? Sign up" }).click();

    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Confirm Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Create account" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Back to sign in" })).toBeVisible();

    await expect(page.getByRole("button", { name: "Continue with Google" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toHaveCount(0);
    await expect(page).toHaveURL(/\/login$/);

    await page.getByRole("button", { name: "Back to sign in" }).click();
    await expect(page.getByRole("heading", { name: "Welcome to EleganceFlow" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  });

  test("signup view guards mismatched confirm passwords", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Need an account? Sign up" }).click();

    await page.getByLabel("Email").fill("mismatch@example.com");
    await page.getByLabel("Password", { exact: true }).fill("TestPass123");
    await page.getByLabel("Confirm Password").fill("DifferentPass");
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(
      page.getByRole("alert").filter({ hasText: "Passwords do not match" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
  });

  test("a fresh signup swaps to the verify-email view with its ladder", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Need an account? Sign up" }).click();

    const signupEmail = `e2e-verify-${Date.now()}@example.com`;
    await page.getByLabel("Email").fill(signupEmail);
    await page.getByLabel("Password", { exact: true }).fill("TestPass123");
    await page.getByLabel("Confirm Password").fill("TestPass123");
    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page.getByRole("heading", { name: "Verify your email" })).toBeVisible();
    await expect(page.locator('input[inputmode="numeric"]').first()).toBeFocused();
    await expect(page.getByText("We've sent a 6-digit code to")).toBeVisible();
    await expect(page.getByText(signupEmail)).toBeVisible();
    for (let i = 1; i <= 6; i += 1) {
      await expect(page.getByLabel(`Digit ${i}`)).toBeVisible();
    }
    await expect(page.getByRole("button", { name: "Verify email" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Resend" })).toBeVisible();

    await page.getByRole("button", { name: "Verify email" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "Please enter all 6 digits" }),
    ).toBeVisible();

    for (let i = 1; i <= 6; i += 1) {
      await page.getByLabel(`Digit ${i}`).fill(String(i % 10));
    }
    await page.getByRole("button", { name: "Verify email" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "Invalid verification code. 4 attempts remaining." }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Resend" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: "New verification code sent to your email" }),
    ).toBeVisible();
  });

  test("the /signup page renders the same minimal signup view (our superset)", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(page.getByLabel("Confirm Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Continue with Google" })).toHaveCount(0);
  });

  test("the duplicate-email negative surfaces in the card + the API quartet (S73-P7b + the s165 CSRF probe)", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Need an account? Sign up" }).click();
    await expect(page.getByLabel("Confirm Password")).toBeVisible();

    await page.getByLabel("Email").fill("sepnetflix2023@outlook.com");
    await page.getByLabel("Password", { exact: true }).fill("TestPass123");
    await page.getByLabel("Confirm Password").fill("TestPass123");
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page.getByText("A user with this email already exists")).toBeVisible();

    const invalidEmail = await page.request.post("/api/auth/signup", {
      data: { email: "not-an-email", password: "TestPass123" },
    });
    expect(invalidEmail.status()).toBe(400);
    const invalidBody = await invalidEmail.json();
    expect(invalidBody.error.message).toBe("Enter a valid email address");

    const shortPassword = await page.request.post("/api/auth/signup", {
      data: { email: "valid@example.com", password: "short" },
    });
    expect(shortPassword.status()).toBe(400);
    const shortBody = await shortPassword.json();
    expect(shortBody.error.message).toBe("Password must be at least 8 characters");

    const oversized = await page.request.post("/api/auth/signup", {
      data: { email: "valid2@example.com", password: "TestPass123", name: "x".repeat(20 * 1024) },
    });
    expect(oversized.status()).toBe(400);
    const oversizedBody = await oversized.json();
    expect(oversizedBody.error.message).toBe("Request body too large");

    const csrfShape = await page.request.post("/api/auth/login", {
      headers: { "content-type": "text/plain", "x-forwarded-for": "198.51.100.165" },
      data: JSON.stringify({ email: "sepnetflix2023@outlook.com", password: "$Abcd1234" }),
    });
    expect(csrfShape.status()).toBe(400);
    const csrfBody = await csrfShape.json();
    expect(csrfBody.error.message).toBe("Invalid request body");
  });

  test("the public inquiry API quartet: the rate-limit shape + the Zod vocabulary (the s199 family)", async ({ page }) => {
    // The invalid service answers the byte-verified zod message.
    const badService = await page.request.post("/api/inquiry", {
      headers: { "x-forwarded-for": "198.51.100.199" },
      data: {
        name: "E2E Probe",
        email: "probe@e2e.test",
        service: "Catering",
        message: "Off-vocabulary service probe.",
      },
    });
    expect(badService.status()).toBe(400);
    const badBody = await badService.json();
    expect(badBody.error.message).toBe("Please select a service");

    // The sessioned GET walls without a cookie (the 401 envelope).
    const walled = await page.request.get("/api/inquiry");
    expect(walled.status()).toBe(401);

    // The public POST round-trip persists (the superset's own proof at
    // the envelope level — the landing.spec drives the UI face).
    const created = await page.request.post("/api/inquiry", {
      headers: { "x-forwarded-for": "198.51.100.199" },
      data: {
        name: "API Quartet Probe",
        email: "quartet@e2e.test",
        service: "Photography",
        message: "The direct API round-trip probe.",
      },
    });
    expect(created.status()).toBe(201);
    const createdBody = await created.json();
    expect(createdBody.ok).toBe(true);
    expect(typeof createdBody.data.id).toBe("string");
  });

  test("the sign-in form native-validates (an empty submit never POSTs — the reference's own gate)", async ({ page }) => {
    // Round-17 (F-17a, the F-16d genus on the auth family): the
    // reference's auth card native-validates — its forms carry NO
    // noValidate, so an empty submit fires no submit event, no POST,
    // and the browser paints its own bubbles (probe-verified live on
    // both apps). OURS carried noValidate: the empty sign-in submit
    // POSTed to /api/auth/login (400 → our banner). Pinned at the
    // source level by tests/auth-validation.test.ts ①②③.
    await page.goto("/login");
    const faces = await page.evaluate(() => {
      const form = document.querySelector("form") as HTMLFormElement | null;
      return { noValidate: form ? form.noValidate : true, checkValidity: form ? form.checkValidity() : null };
    });
    expect(faces.noValidate).toBe(false); // the reference's native gate
    expect(faces.checkValidity).toBe(false); // the empty form is invalid — an empty submit cannot fire
    let posted = false;
    page.on("request", (r) => {
      if (r.method() === "POST" && r.url().includes("/api/auth/")) posted = true;
    });
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.waitForTimeout(400);
    expect(posted).toBe(false); // the native gate blocked the empty submit
    // NOTE: the browser's own validation bubble registers in Chromium's
    // a11y tree as an alert node (found live at round-17) — the DOM-level
    // banner census is NOT asserted here because the native bubble IS
    // the reference's own feedback face (our ErrorCallout renders on
    // `error` state alone, which the native gate never sets).
  });

  test("the swapped views' validation faces (the reset email's required gate + the signup's mode mirror)", async ({ page }) => {
    // Round-17 ⑤⑥: the reference's reset email input carries required
    // (the attribute census); its signup password family carries NO
    // minlength (the placeholder + the server own the policy). The
    // verify form keeps its noValidate (the unreachable-reference
    // record — pinned at the source level by tests/auth-validation.test.ts ④).
    await page.goto("/login");
    await page.getByRole("button", { name: "Forgot password?" }).click();
    const reset = await page.evaluate(() => {
      const form = document.querySelector("form") as HTMLFormElement | null;
      const email = form?.querySelector('input[type="email"]') as HTMLInputElement | null;
      return { noValidate: form ? form.noValidate : true, required: email ? email.hasAttribute("required") : false };
    });
    expect(reset.noValidate).toBe(false);
    expect(reset.required).toBe(true);
    await page.getByRole("button", { name: "Back to sign in" }).click();
    await page.getByRole("button", { name: "Need an account? Sign up" }).click();
    const signup = await page.evaluate(() => {
      const form = document.querySelector("form") as HTMLFormElement | null;
      const pw = form?.querySelector('input[type="password"]') as HTMLInputElement | null;
      return {
        noValidate: form ? form.noValidate : true,
        minLength: pw ? pw.getAttribute("minlength") : "PRESENT",
        required: pw ? pw.hasAttribute("required") : false,
      };
    });
    expect(signup.noValidate).toBe(false);
    expect(signup.minLength).toBeNull(); // the reference ships none — the placeholder + the Zod seam own the policy
    expect(signup.required).toBe(true);
  });

  test("the login page's head carries the BreadcrumbList JSON-LD + the viewport-fit=cover declaration", async ({ page }) => {
    // Round-18 (F-18a/F-18b, the HEAD/METADATA census — the document
    // faces no probe ever read against the live reference): the
    // reference's /login head carries a schema.org BreadcrumbList
    // JSON-LD (Home → login, the platform's spaced serialization) and
    // its viewport meta declares viewport-fit=cover — LOGIN-ONLY (its
    // landing and signup-URL viewports carry none). OURS shipped zero
    // JSON-LD anywhere and a plain viewport. Pinned at the source
    // level by tests/head-faces.test.ts ①④; the drift [head] leg
    // rides the live pair.
    await page.goto("/login");
    const head = await page.evaluate(() => ({
      jsonld: Array.from(document.querySelectorAll("script[type='application/ld+json']")).map((s) => (s.textContent || "").trim()),
      viewport: document.querySelector("meta[name='viewport']")?.getAttribute("content") ?? null,
    }));
    expect(head.jsonld.length).toBe(1);
    const parsed = JSON.parse(head.jsonld[0]) as {
      itemListElement: Array<{ position: number; name: string; item: string }>;
    };
    expect(parsed.itemListElement.map((i) => `${i.position}:${i.name}`)).toEqual(["1:Home", "2:login"]);
    expect(parsed.itemListElement[1].item.endsWith("/login")).toBe(true); // origin-agnostic: the e2e port is scratch-owned
    expect(head.viewport).toContain("viewport-fit=cover");
  });

  test("the signup page's head carries its BreadcrumbList member and NO viewport-fit (the login-only shape)", async ({ page }) => {
    // Round-18 ②⑤: the reference serves the breadcrumb family at its
    // /signup URL too (riding the platform's 200-status soft-404 body —
    // our working /signup is the documented superset, and the crumb is
    // semantically true on it: one hop from home), while the
    // viewport-fit stays login-only. Pinned at the source level by
    // tests/head-faces.test.ts ②⑤.
    await page.goto("/signup");
    const head = await page.evaluate(() => ({
      jsonld: Array.from(document.querySelectorAll("script[type='application/ld+json']")).map((s) => (s.textContent || "").trim()),
      viewport: document.querySelector("meta[name='viewport']")?.getAttribute("content") ?? null,
    }));
    expect(head.jsonld.length).toBe(1);
    const parsed = JSON.parse(head.jsonld[0]) as {
      itemListElement: Array<{ position: number; name: string; item: string }>;
    };
    expect(parsed.itemListElement.map((i) => `${i.position}:${i.name}`)).toEqual(["1:Home", "2:signup"]);
    expect(parsed.itemListElement[1].item.endsWith("/signup")).toBe(true);
    expect(head.viewport).not.toContain("viewport-fit"); // the login-only shape never generalizes
  });

  test("round-21: the Google button's honest fallback — the info toast ride (the R-21a record's local face)", async ({ page }) => {
    // Round-21 (R-21a, the record; F-21a, the pin): the reference's
    // "Continue with Google" navigates to a REAL Google OAuth redirect
    // (accounts.google.com with base44's client_id + the
    // app.base44.com/api/apps/auth/callback redirect_uri — live-ridden,
    // intercepted, zero side effects). UNIMPLEMENTABLE in the
    // self-hosted clone: the redirect_uri is registered to base44's
    // Google app. OUR honest fallback — the info toast — pinned at the
    // source level by tests/google-fallback.test.ts; this leg rides it
    // BEHAVIORALLY on the standalone artifact: the toast renders, the
    // URL never leaves /login, and the card never fires a page error.
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto("/login");
    await page.getByRole("button", { name: "Continue with Google" }).click();
    const toast = page.locator('[role="region"][aria-label="Notifications"] [role="status"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText("Google sign-in not configured");
    await expect(toast).toContainText(
      "This self-hosted clone uses email and password sign-in",
    );
    // the honest LOCAL fallback: the click never navigates
    expect(page.url()).toContain("/login");
    // the auto-dismiss ride (the 4s timer, hover-paused at 0)
    await expect(toast).toHaveCount(0, { timeout: 6000 });
    expect(errors, "the ride must fire zero page errors").toEqual([]);
  });
});
