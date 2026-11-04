// Session-199 round-4 drift probe: the reference's CONTENT face —
// text landmarks + the mobile menu's open DOM (aria-expanded, panel
// structure, link order) + the round-12 IMAGE census (every img's src
// + alt in DOM order — the class that let 5 of 6 portfolio images
// drift invisibly: an img's src changes no computed style and no text
// face) + the round-13 LOGIN-FACE census (the auth card's at-rest
// computed faces — the class that let the base44 semantic-token
// refresh drift invisibly: no probe read /login since the 2026-11-03
// byte-verification) + the round-14 PREFLIGHT-FACE census (the form
// faces the preflights own: the placeholder ink, the input background,
// the transition-property list — the class that let the v3→v4
// preflight divergences ship invisibly: parity reads the elements'
// own styles, never pseudo-elements or transition lists) — beyond the
// parity script's computed-style face.
// Diffs the live reference against OUR dev build (:3000).
//
// Run: bun scripts/drift-199.ts   (expects our dev server on :3000)
import { chromium } from "@playwright/test";

const OURS = "http://localhost:3000";
const REF = "https://colossal-elevate-service-flow.base44.app";

// The round-18 LIVE FIND (the launch-accumulation ceiling): one browser
// per leg — the design since round-4 — crossed the sandbox's ceiling at
// the round-18 head leg: the tail launch's goto times out at 30s and the
// finally's browser.close() then wedges, hanging the script silently
// (isolated, the identical sequences fly — the tail alone in 10s, nine
// loads on ONE browser in 17s, and 14 launch/close cycles + the tail
// reproduce the TimeoutError). The cure: ONE browser for the whole
// script, one isolated CONTEXT per face call — contexts are cheap and
// cookie-isolated, preserving the fresh-browser semantics every leg was
// born with.
const browser = await chromium.launch();

type Face = {
  title: string;
  navLinks: string[];        // header nav: text -> href
  ctaText: string;           // header CTA
  h1: string;                // hero h1 with span breaks
  eyebrows: string[];        // section eyebrows in DOM order
  h2s: string[];             // section h2s in DOM order
  serviceTitles: string[];   // the four service cards
  stats: string[];           // the three stat numbers
  filterChips: string[];     // work filters in DOM order
  imgs: string[];            // round-12: every img "src -> alt" in DOM order
  mobileToggle: { expanded: boolean | null; label: string | null };
  mobilePanel: { visible: boolean; links: string[]; cta: string | null } | null;
};

async function face(url: string, w: number, h: number): Promise<Face> {
  const context = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const base: Face = await page.evaluate(() => {
    const txt = (el: Element | null) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();
    const nav = [...document.querySelectorAll("header nav a")].map((a) => `${txt(a)} -> ${(a as HTMLAnchorElement).getAttribute("href")}`);
    const cta = [...document.querySelectorAll("header a")].filter((a) => !a.closest("nav")).map((a) => txt(a)).find((t) => t.length > 0) ?? "";
    const eyebrows = [...document.querySelectorAll("p")].filter((p) => /tracking-\[0\.3em\]|tracking-\[0\.2em\]/.test(p.className)).map((p) => txt(p));
    const h2s = [...document.querySelectorAll("h2")].map((h) => txt(h));
    const serviceTitles = [...document.querySelectorAll("section h3")].map((s) => txt(s));
    const stats = [...document.querySelectorAll("span,div,p")].filter((e) => /^(50\+|5|100%)$/.test(txt(e))).map((e) => txt(e));
    const chips = [...document.querySelectorAll("button")].filter((b) => /tracking-widest/.test(b.className) && txt(b).length > 0 && txt(b).length < 20).map((b) => txt(b));
    const imgs = [...document.querySelectorAll("img")].map((i) => `${i.getAttribute("src")} -> ${i.getAttribute("alt")}`);
    const toggle = document.querySelector('header button[aria-label], header button');
    return {
      title: document.title,
      navLinks: nav,
      ctaText: cta,
      h1: txt(document.querySelector("h1")),
      eyebrows,
      h2s,
      serviceTitles,
      stats,
      filterChips: chips,
      imgs,
      mobileToggle: {
        expanded: toggle ? toggle.getAttribute("aria-expanded") === "true" : null,
        label: toggle ? toggle.getAttribute("aria-label") : null,
      },
      mobilePanel: null,
    };
  });

  // The mobile menu face — only meaningful at phone width: open it.
  if (w <= 480) {
    const toggle = page.locator("header button").first();
    if (await toggle.count()) {
      await toggle.click();
      await page.waitForTimeout(600);
      base.mobilePanel = await page.evaluate(() => {
        const txt = (el: Element | null) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();
        // the panel: the nav list that becomes visible after the toggle
        const navs = [...document.querySelectorAll("header nav, header div")].filter((n) => {
          const r = n.getBoundingClientRect();
          const s = getComputedStyle(n as HTMLElement);
          return r.height > 40 && s.visibility !== "hidden" && txt(n).includes("About");
        });
        const panel = navs[0];
        if (!panel) return null;
        const links = [...panel.querySelectorAll("a")].map((a) => `${txt(a)} -> ${(a as HTMLAnchorElement).getAttribute("href")}`);
        const cta = [...panel.querySelectorAll("a")].map((a) => txt(a)).find((t) => t.toLowerCase().includes("touch")) ?? null;
        return { visible: true, links, cta };
      });
    }
  }

  await context.close();
  return base;
}

function diff(label: string, a: unknown, b: unknown, path: string, out: string[]) {
  const ja = JSON.stringify(a);
  const jb = JSON.stringify(b);
  if (ja !== jb) out.push(`${label} ${path}:\n  REF : ${ja}\n  OURS: ${jb}`);
}

// The round-13 LOGIN-FACE census: the auth card's at-rest computed faces
// at 1280 — the family the base44 semantic-token refresh moved while no
// probe read /login (the foreground, the Google button's ink/border +
// hover pair, the divider ink, the input/submit pads). The hover pair
// rides a real .hover() + settle (the transition-all duration-200
// lesson — a mid-transition read is a false face).
type LoginFace = {
  cardColor: string;
  google: { color: string; border: string };
  googleHover: { bg: string; border: string };
  dividerColor: string;
  inputPad: string;
  submitPad: string;
};

async function loginFace(url: string): Promise<LoginFace> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto(`${url}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  // The permissive annotation widens the evaluate's inferred literal so
  // the dynamic googleHover addition below type-checks (the parity
  // script's Face pattern).
  const base: LoginFace = await page.evaluate(() => {
    const cs = (el: Element | null | undefined) => (el ? getComputedStyle(el as HTMLElement) : null);
    const h1 = document.querySelector("h1");
    const card = h1?.closest("form")?.parentElement ?? h1?.closest("div[class*='rounded']");
    const email = document.querySelector('input[type="email"], input[name="email"]');
    const google = Array.from(document.querySelectorAll("button")).find((b) => /google/i.test(b.textContent ?? ""));
    const btn = Array.from(document.querySelectorAll("button")).find((b) => /sign in|log in/i.test(b.textContent ?? ""));
    const divider = Array.from(document.querySelectorAll("*")).find((el) => /^or$/i.test((el.textContent ?? "").trim()) && el.children.length === 0);
    return {
      cardColor: cs(card)?.color ?? "",
      google: {
        color: cs(google)?.color ?? "",
        border: cs(google)?.borderTopColor ?? "",
      },
      googleHover: { bg: "", border: "" },
      dividerColor: cs(divider)?.color ?? "",
      inputPad: cs(email)?.padding ?? "",
      submitPad: cs(btn)?.padding ?? "",
    };
  });
  // The hover pair: a real hover ride + settle (the transition lesson)
  const googleLoc = page.locator("button", { hasText: /google/i }).first();
  if (await googleLoc.count()) {
    await googleLoc.hover();
    await page.waitForTimeout(400);
    const hover = await page.evaluate(() => {
      const google = Array.from(document.querySelectorAll("button")).find((b) => /google/i.test(b.textContent ?? ""));
      if (!google) return null;
      const s = getComputedStyle(google as HTMLElement);
      return { bg: s.backgroundColor, border: s.borderTopColor };
    });
    if (hover) base.googleHover = hover;
  }
  await context.close();
  return base;
}

// The round-14 PREFLIGHT-FACE census: the form faces the preflights
// own on the landing (the v3 preflight painted ::placeholder gray-400
// and left the UA field background; v4's preflight paints currentcolor
// @50% and resets the background to transparent — and v4's
// transition-colors list expanded). Read at 1280: the name input's
// placeholder + background, the textarea's placeholder, the nav link's
// transition-property.
type PreflightFace = {
  inputPlaceholder: string;
  inputBg: string;
  textareaPlaceholder: string;
  navTransition: string;
};

async function preflightFace(url: string): Promise<PreflightFace> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const base = await page.evaluate(() => {
    const cs = (el: Element | null | undefined) => (el ? getComputedStyle(el as HTMLElement) : null);
    const input = document.querySelector("#contact input");
    const ta = document.querySelector("#contact textarea");
    // a NAV ITEM link (not the wordmark — it carries no transition class)
    const navItem = document.querySelectorAll("header nav ul a")[0];
    return {
      inputPlaceholder: input ? getComputedStyle(input, "::placeholder").color : "",
      inputBg: cs(input)?.backgroundColor ?? "",
      textareaPlaceholder: ta ? getComputedStyle(ta, "::placeholder").color : "",
      navTransition: cs(navItem)?.transitionProperty ?? "",
    };
  });
  await context.close();
  return base;
}

// The round-15 MOTION/GLYPH census: the time-dimension and glyph faces
// no probe read (parity-199 reads the elements' own at-rest styles — never
// the html element's scroll-behavior or any scroll trajectory; the text
// census above walks nav/h1/h2/services/stats/chips — never the
// testimonial quote block). Read at 1280: the html element's computed
// scroll-behavior (the reference's raw `html { scroll-behavior: smooth }`
// rule — every anchor ride glides where a bare build jumps) + the quote
// block's glyph face (the reference renders STRAIGHT double quotes, not
// typographic ones — the full-text census proved this the sole text
// divergence on the landing).
type MotionGlyphFace = {
  scrollBehavior: string;
  quoteGlyphs: string;
};

async function motionGlyphFace(url: string): Promise<MotionGlyphFace> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const base = await page.evaluate(() => {
    // the quote PARAGRAPH itself (the .md:col-span-3 wrapper carries the
    // avatar row's text after the quote — the glyph pair is the p's first
    // + last code points)
    const quote = document.querySelector("#testimonials .md\\:col-span-3 p");
    const t = quote?.textContent ?? "";
    return {
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      // the glyph face: the code points wrapping the quote text (the
      // reference's U+0022 pair vs a typographic U+201C/U+201D pair)
      quoteGlyphs: t.length >= 2 ? `${t.codePointAt(0)}…${t.codePointAt(t.length - 1)}` : "",
    };
  });
  await context.close();
  return base;
}

// The round-16 GEOMETRY census: the attribute/geometry faces no probe
// read (parity-199 reads ~40 computed at-rest styles — never bounding
// boxes; the e2e hero test rode toBeVisible, which passes a non-empty
// box ENTIRELY off-canvas; the drift legs above read text/src/faces).
// Read at 1280 AND 390: the hero section's rect (the in-flow-img genus
// stretched it 1008/927 where the reference renders 800/844), the
// content column's x (232 both — 1280/390 when squeezed off-canvas),
// the h1's rect, the scroll label's x (256 = inside the content
// column; 24 = the section-level placement), the quote-P + hero-P
// computed line-heights (the trap-⑥ md:text-Nxl decodes: 36px/28px at
// md+, 33px/29.25px below), the form's noValidate (the reference
// native-validates), and the four glyph fingerprints + the login
// Google-G fingerprint (the lucide-era quartet).
type GeometryFace = {
  heroRect: number[];
  contentX: number;
  h1Rect: number[];
  scrollLabelX: number;
  quoteLh: string;
  heroPLh: string;
  formNoValidate: boolean;
  glyphPalette: string;
  glyphMegaphone: string;
  glyphMail: string;
  glyphPhone: string;
};

async function geometryFace(url: string, w: number, h: number): Promise<GeometryFace> {
  const context = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const base = await page.evaluate(() => {
    const rect = (el: Element | null): number[] => {
      if (!el) return [-1, -1, -1, -1];
      const b = el.getBoundingClientRect();
      return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)];
    };
    const sec = document.querySelector("section");
    const content = sec?.querySelector(".relative.max-w-7xl") ?? null;
    const h1 = document.querySelector("h1");
    const label = [...document.querySelectorAll("span")].find((s) => (s.textContent ?? "").trim() === "Scroll") ?? null;
    const quote = document.querySelector("#testimonials .md\\:col-span-3 p");
    const heroP = [...document.querySelectorAll("p")].find((p) => /leading-relaxed/.test(p.className) && (p.textContent ?? "").includes("exceptional")) ?? null;
    const form = document.querySelector("#contact form") as HTMLFormElement | null;
    const glyph = (cls: string): string => document.querySelector(`svg.lucide-${cls} path`)?.getAttribute("d")?.slice(0, 24) ?? "ABSENT";
    return {
      heroRect: rect(sec),
      contentX: content ? rect(content)[0] : -1,
      h1Rect: rect(h1),
      scrollLabelX: label ? rect(label)[0] : -1,
      quoteLh: quote ? getComputedStyle(quote).lineHeight : "ABSENT",
      heroPLh: heroP ? getComputedStyle(heroP).lineHeight : "ABSENT",
      formNoValidate: form ? form.noValidate : true,
      glyphPalette: glyph("palette"),
      glyphMegaphone: glyph("megaphone"),
      glyphMail: glyph("mail"),
      glyphPhone: glyph("phone"),
    };
  });
  await context.close();
  return base;
}

async function googleGlyphFace(url: string): Promise<string> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await page.goto(url + "/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const d = await page.evaluate(() => document.querySelector("svg path")?.getAttribute("d")?.slice(0, 24) ?? "ABSENT");
  await context.close();
  return d;
}

// The round-17 auth-validation leg: the validation-mode faces no probe
// read (the login leg reads at-rest computed inks/pads; the e2e fills
// valid credentials — the empty-submit mode never rode). Reads the
// sign-in form's noValidate, then the reset view's (via the Forgot
// password? swap) and the signup view's (via the Sign up swap), each
// form's noValidate + the reset email's required + the signup
// password's minlength census. Safe: view-swap clicks only, never a
// submit.
async function authValidationFace(url: string, page: import("@playwright/test").Page) {
  await page.goto(url + "/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const sign = await page.evaluate(() => {
    const form = document.querySelector("form") as HTMLFormElement | null;
    return { noValidate: form ? form.noValidate : null };
  });
  await page.locator("button", { hasText: /Forgot password\?/i }).first().click();
  await page.waitForTimeout(700);
  const reset = await page.evaluate(() => {
    const form = document.querySelector("form") as HTMLFormElement | null;
    const email = form?.querySelector('input[type="email"]') as HTMLInputElement | null;
    return { noValidate: form ? form.noValidate : null, emailRequired: email ? email.hasAttribute("required") : null };
  });
  await page.locator("button", { hasText: /Back to sign in/i }).first().click();
  await page.waitForTimeout(500);
  await page.locator("button", { hasText: /Sign up/i }).first().click();
  await page.waitForTimeout(700);
  const signup = await page.evaluate(() => {
    const form = document.querySelector("form") as HTMLFormElement | null;
    const pw = form?.querySelector('input[type="password"]') as HTMLInputElement | null;
    return {
      noValidate: form ? form.noValidate : null,
      pwMinLength: pw ? pw.getAttribute("minlength") : null,
      pwRequired: pw ? pw.hasAttribute("required") : null,
    };
  });
  return { sign, reset, signup };
}

const [ref, ours] = await Promise.all([face(REF, 390, 844), face(OURS, 390, 844)]);
const out: string[] = [];
diff("[390]", ref.title, ours.title, "title", out);
diff("[390]", ref.navLinks, ours.navLinks, "navLinks", out);
diff("[390]", ref.ctaText, ours.ctaText, "ctaText", out);
diff("[390]", ref.h1, ours.h1, "h1", out);
diff("[390]", ref.eyebrows, ours.eyebrows, "eyebrows", out);
diff("[390]", ref.h2s, ours.h2s, "h2s", out);
diff("[390]", ref.serviceTitles, ours.serviceTitles, "serviceTitles", out);
diff("[390]", ref.stats, ours.stats, "stats", out);
diff("[390]", ref.filterChips, ours.filterChips, "filterChips", out);
diff("[390]", ref.imgs, ours.imgs, "imgs (src -> alt, DOM order)", out);
diff("[390]", ref.mobileToggle, ours.mobileToggle, "mobileToggle", out);
diff("[390]", ref.mobilePanel, ours.mobilePanel, "mobilePanel(open)", out);

// The round-13 login-face leg (the auth card at 1280, at-rest + hover)
const [refLogin, oursLogin] = await Promise.all([loginFace(REF), loginFace(OURS)]);
diff("[login]", refLogin.cardColor, oursLogin.cardColor, "cardColor", out);
diff("[login]", refLogin.google, oursLogin.google, "google (ink/border)", out);
diff("[login]", refLogin.googleHover, oursLogin.googleHover, "googleHover (bg/border)", out);
diff("[login]", refLogin.dividerColor, oursLogin.dividerColor, "dividerColor", out);
diff("[login]", refLogin.inputPad, oursLogin.inputPad, "inputPad", out);
diff("[login]", refLogin.submitPad, oursLogin.submitPad, "submitPad", out);

// The round-14 preflight-face leg (the landing's form faces at 1280)
const [refPreflight, oursPreflight] = await Promise.all([preflightFace(REF), preflightFace(OURS)]);
diff("[preflight]", refPreflight.inputPlaceholder, oursPreflight.inputPlaceholder, "inputPlaceholder (the v3 gray-400)", out);
diff("[preflight]", refPreflight.inputBg, oursPreflight.inputBg, "inputBg (the UA field default)", out);
diff("[preflight]", refPreflight.textareaPlaceholder, oursPreflight.textareaPlaceholder, "textareaPlaceholder", out);
diff("[preflight]", refPreflight.navTransition, oursPreflight.navTransition, "navTransition (the v3 property list)", out);

// The round-15 motion/glyph leg (the html scroll face + the quote glyphs at 1280)
const [refMotion, oursMotion] = await Promise.all([motionGlyphFace(REF), motionGlyphFace(OURS)]);
diff("[motion]", refMotion.scrollBehavior, oursMotion.scrollBehavior, "scrollBehavior (the reference's raw smooth rule)", out);
diff("[motion]", refMotion.quoteGlyphs, oursMotion.quoteGlyphs, "quoteGlyphs (the straight-quote pair)", out);

// The round-16 geometry leg (the structure/leading/validation/glyph faces at 1280 + 390)
const [refGeoD, oursGeoD] = await Promise.all([geometryFace(REF, 1280, 800), geometryFace(OURS, 1280, 800)]);
const [refGeoM, oursGeoM] = await Promise.all([geometryFace(REF, 390, 844), geometryFace(OURS, 390, 844)]);
for (const [tag, r, o] of [
  ["[geometry:1280]", refGeoD, oursGeoD],
  ["[geometry:390]", refGeoM, oursGeoM],
] as const) {
  diff(tag, r.heroRect.join(","), o.heroRect.join(","), "heroRect (the wrapper vs the in-flow img)", out);
  diff(tag, r.contentX, o.contentX, "contentX (the off-canvas detector)", out);
  diff(tag, r.h1Rect.join(","), o.h1Rect.join(","), "h1Rect", out);
  diff(tag, r.scrollLabelX, o.scrollLabelX, "scrollLabelX (inside the column vs section level)", out);
  diff(tag, r.quoteLh, o.quoteLh, "quoteLh (the md:text-3xl pairing)", out);
  diff(tag, r.heroPLh, o.heroPLh, "heroPLh (the md:text-xl pairing)", out);
  diff(tag, r.formNoValidate, o.formNoValidate, "formNoValidate (the reference native-validates)", out);
  diff(tag, r.glyphPalette, o.glyphPalette, "glyphPalette (the reference's circles-and-body)", out);
  diff(tag, r.glyphMegaphone, o.glyphMegaphone, "glyphMegaphone (the reference's horn-and-handle)", out);
  diff(tag, r.glyphMail, o.glyphMail, "glyphMail (the reference's 1.94 arc)", out);
  diff(tag, r.glyphPhone, o.glyphPhone, "glyphPhone (the reference's classic handset)", out);
}
const [refGoogle, oursGoogle] = await Promise.all([googleGlyphFace(REF), googleGlyphFace(OURS)]);
diff("[geometry:login]", refGoogle, oursGoogle, "googleGlyph (the classic 22.56-based quartet)", out);

// The round-17 auth-validation leg (the three reachable forms' mode +
// the attribute census on the swapped views) — sequential on ONE
// context (round-17's own live find: a fresh launch under the
// concurrent legs' load stalled past the action timeout on the
// view-swap clicks).
// Round-18 found the ceiling itself: the head census's first tail goto
// timed out at 30s and the finally's close wedged the whole script
// (the top-of-file launch-accumulation find). The script now rides ONE
// browser with an isolated context per face — and the round-18 head
// census shares THIS context's page, right after the auth reads.
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  try {
    const page = await context.newPage();
    const refAuth = await authValidationFace(REF, page);
    const oursAuth = await authValidationFace(OURS, page);
    diff("[auth-validation]", refAuth.sign.noValidate, oursAuth.sign.noValidate, "signNoValidate (the reference native-validates)", out);
    diff("[auth-validation]", refAuth.reset.noValidate, oursAuth.reset.noValidate, "resetNoValidate (the reference native-validates)", out);
    diff("[auth-validation]", refAuth.reset.emailRequired, oursAuth.reset.emailRequired, "resetEmailRequired (the reference's attribute census)", out);
    diff("[auth-validation]", refAuth.signup.noValidate, oursAuth.signup.noValidate, "signupNoValidate (the reference native-validates)", out);
    diff("[auth-validation]", refAuth.signup.pwMinLength, oursAuth.signup.pwMinLength, "signupPwMinLength (the reference ships none)", out);
    diff("[auth-validation]", refAuth.signup.pwRequired, oursAuth.signup.pwRequired, "signupPwRequired (the shared gate)", out);
    // The round-18 head census — same shared browser (see headFace above
    // for the face's story).
    const refHead = await headFace(REF, page);
    const oursHead = await headFace(OURS, page);
    diff("[head]", refHead.login.jsonld, oursHead.login.jsonld, "loginJsonld (the reference's BreadcrumbList)", out);
    diff("[head]", refHead.signup.jsonld, oursHead.signup.jsonld, "signupJsonld (the same family the reference serves at its soft-404 /signup)", out);
    diff("[head]", refHead.login.viewport, oursHead.login.viewport, "loginViewport (viewport-fit=cover; the initial-scale serialization normalized — the round-16 record)", out);
    diff("[head]", refHead.signup.viewport, oursHead.signup.viewport, "signupViewport (no viewport-fit — the login-only shape)", out);
    diff("[head]", refHead.login.themeColor, oursHead.login.themeColor, "loginThemeColor (#000000)", out);
    diff("[head]", refHead.login.canonical, oursHead.login.canonical, "loginCanonical (origin-normalized)", out);
    diff("[head]", refHead.signup.canonical, oursHead.signup.canonical, "signupCanonical (origin-normalized)", out);
    // NOT diffed: /signup's theme-color (ours is the every-page
    // superset; the reference's soft-404 carries none — the recorded
    // delta; tests/head-faces.test.ts ⑥ pins our family).
  } finally {
    await context.close();
  }
}

// The round-18 HEAD/METADATA census: the DOCUMENT faces no probe read
// (the body legs read computed styles/text/geometry; the smoke ladder
// curls OUR sitemap/robots — the reference's own <head> was never
// diffed) — the BreadcrumbList JSON-LD family on /login + /signup, the
// viewport meta (viewport-fit=cover — LOGIN-ONLY), theme-color, and
// canonical. Origins normalize (localhost vs the base44 origin), and
// the initial-scale=1.0-vs-1 serialization folds to the recorded
// round-16 delta (numerically equal).
async function headFace(url: string, page: import("@playwright/test").Page) {
  const origin = new URL(url).origin;
  const faces: Record<string, { jsonld: string[]; viewport: string | null; themeColor: string | null; canonical: string | null }> = {};
  for (const route of ["login", "signup"] as const) {
    await page.goto(`${url}/${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const raw = await page.evaluate(() => ({
      jsonld: Array.from(document.querySelectorAll("script[type='application/ld+json']")).map((s) => (s.textContent || "").trim()),
      viewport: document.querySelector("meta[name='viewport']")?.getAttribute("content") ?? null,
      themeColor: document.querySelector("meta[name='theme-color']")?.getAttribute("content") ?? null,
      canonical: document.querySelector("link[rel='canonical']")?.getAttribute("href") ?? null,
    }));
    // normalize: the origin folds to ORIGIN; the initial-scale
    // serialization folds to the recorded round-16 delta.
    faces[route] = {
      jsonld: raw.jsonld.map((t) => t.split(origin).join("ORIGIN")),
      viewport: raw.viewport?.replace("initial-scale=1.0", "initial-scale=1") ?? null,
      themeColor: raw.themeColor,
      canonical: raw.canonical?.split(origin).join("ORIGIN") ?? null,
    };
  }
  return faces;
}

if (out.length === 0) {
  console.log("[390] CONTENT + MOBILE-MENU FACE: NO DRIFT — the reference matches our byte-mirror");
  console.log("[login] AUTH-CARD FACE: NO DRIFT — the reference matches our login mirror");
  console.log("[preflight] FORM-FACE: NO DRIFT — the reference matches our preflight mirror");
  console.log("[motion] MOTION/GLYPH FACE: NO DRIFT — the reference matches our motion/glyph mirror");
  console.log("[geometry] STRUCTURE/GEOMETRY FACE: NO DRIFT — the reference matches our geometry mirror");
  console.log("[auth-validation] AUTH-VALIDATION FACE: NO DRIFT — the reference matches our validation-mode mirror");
  console.log("[head] HEAD/METADATA FACE: NO DRIFT — the reference matches our document mirror");
} else {
  console.log(`[390 + login + preflight + motion + geometry + auth-validation + head] DRIFT DETECTED — ${out.length} field(s):`);
  for (const line of out) console.log(line);
}

// The report prints BEFORE the shared browser retires — a wedged close
// must never eat the results (the round-18 close-after-print order).
await browser.close();
