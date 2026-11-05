import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Session-199: the AUTH SURFACES construction pins — the login card's
// brand re-point (EleganceFlow) + the carried backend funnel's wiring,
// plus the inquiries inbox's construction (the superset workspace).

function read(rel: string): string {
  const p = path.resolve(import.meta.dirname, "..", rel);
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

const loginCard = () => stripComments(read("src/components/layout/login-card.tsx"));
const loginRoute = () => stripComments(read("src/app/login/page.tsx"));
const signupRoute = () => stripComments(read("src/app/signup/page.tsx"));
const dashboardRoute = () => stripComments(read("src/app/(app)/dashboard/page.tsx"));
const inboxPage = () => stripComments(read("src/app/(app)/dashboard/inbox-page.tsx"));
const appShell = () => stripComments(read("src/components/layout/app-shell.tsx"));
const appLayout = () => stripComments(read("src/app/(app)/layout.tsx"));

describe("session-199: the login card's brand re-point", () => {
  it("the h1 is 'Welcome to EleganceFlow' (live-verified on the reference)", () => {
    expect(loginCard()).toContain("Welcome to EleganceFlow");
    expect(loginCard()).not.toContain("NEO CRM");
  });

  it("the OR divider keeps the DOM-case 'or' (the caps ride the CSS)", () => {
    expect(loginCard()).toContain('<span className={LOGIN_LAYOUT.dividerLabelSpan}>or</span>');
  });

  it("the plain-login redirect lands the studio team in the superset workspace (the documented deviation)", () => {
    const src = loginCard();
    expect(src).toContain('const POST_LOGIN_DEFAULT = "/dashboard";');
    expect(src).toContain("router.push(resolveFromUrl(fromUrl ?? POST_LOGIN_DEFAULT));");
    expect(src).not.toContain('fromUrl ?? "/"');
  });
});

describe("session-199: the auth routes' metadata", () => {
  it("/login keeps the unprefixed family (the bare brand title)", () => {
    expect(loginRoute()).toContain('pageMetadata({ route: "/login" })');
  });

  it("/signup keeps the absolute suffixed title (round-24: the reference's de-spaced face)", () => {
    expect(signupRoute()).toContain(
      'pageMetadata({ route: "/signup", title: "Signup | EleganceFlow" })',
    );
  });
});

describe("session-199: the dashboard superset (the inquiries inbox)", () => {
  it("the route renders the inbox with the absolute metadata", () => {
    const src = dashboardRoute();
    expect(src).toContain("<InboxPage />");
    expect(src).toContain('title: "Dashboard | EleganceFlow"');
  });

  it("the (app) layout still guards server-side (the guest never receives the page HTML)", () => {
    const src = appLayout();
    expect(src).toContain("getSessionUser");
    expect(src).toContain("GuestLoginRedirect");
  });

  it("the inbox's four status lenses + the search field", () => {
    const src = inboxPage();
    expect(src).toContain('key: "active", label: "Active"');
    expect(src).toContain('key: "new", label: "New"');
    expect(src).toContain('key: "archived", label: "Archived"');
    expect(src).toContain('key: "all", label: "All"');
    expect(src).toMatch(/fetch\(`\/api\/inquiry\?status=\$\{tab\}`\)/);
    expect(src).toContain('type="search"');
  });

  it("the inbox's actions hit the REAL transitions (PATCH status / DELETE)", () => {
    const src = inboxPage();
    expect(src).toContain('fetch(`/api/inquiry/${row.id}`');
    expect(src).toContain('method: "PATCH"');
    expect(src).toContain('body: JSON.stringify({ status })');
    expect(src).toContain('method: "DELETE"');
  });

  it("the delete is EXPLICIT two-step (a destructive action never rides one click)", () => {
    const src = inboxPage();
    expect(src).toContain("confirmId");
    expect(src).toContain("Confirm delete");
    expect(src).toContain("Cancel");
  });

  it("the empty/loading/error faces are explicit (never a blank surface)", () => {
    const src = inboxPage();
    expect(src).toContain('role="alert"');
    expect(src).toContain("Loading inquiries…");
    expect(src).toContain("Nothing here yet");
    expect(src).toContain("No inquiries match");
  });

  it("the shell signs out through the real route", () => {
    const src = appShell();
    expect(src).toContain('fetch("/api/auth/logout", { method: "POST" })');
    expect(src).toContain('router.push("/login")');
  });
});
