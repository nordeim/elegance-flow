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
// Run: bun scripts/drift-199.ts   (expects our dev server on :3000;
// round-33: the navigation rides the HMR-tolerant probeLoad — the dev
// server's Turbopack HMR websockets never let networkidle fire)
// Round-36 (F-36b, updated round-37/38/39): budget the FULL runtime — the 24
// legs (round-37 added [storage]; round-38 added [network]; round-39
// added [stack]) ride ~40
// page loads across both apps and take ~6.5–7.5 minutes end-to-end (measured
// under bun AND node). NEVER wrap this script in a sub-10-minute
// timeout: the kill cascade fakes a browser crash ("Target page,
// context or browser has been closed" at whichever deep leg was in
// flight) and bun hangs after the kill — a healthy script misdiagnosed
// as broken (this round's own near-miss).
import { createHash } from "node:crypto";
import { chromium } from "@playwright/test";
import { probeLoad } from "./probe-load";

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
  await probeLoad(page, url);
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
// Round-27 (F-27a) EXTENSION: the LOGO family — the circle span's chrome
// (radius/overflow/shadow) + the logo img's face (alt/object-fit/box) —
// the face the leg never read (ours shipped the CRM-era blue dot while
// the reference renders its real logo img; live-probed 2026-11-05).
// The img's SRC rides per-side constants (theirs the base44 CDN vs ours
// /icon.png — the round-24 never-their-CDN doctrine, the expectConst
// pattern).
type LoginFace = {
  cardColor: string;
  google: { color: string; border: string };
  googleHover: { bg: string; border: string };
  dividerColor: string;
  inputPad: string;
  submitPad: string;
  logo: {
    spanRadius: string;
    spanOverflow: string;
    spanShadow: string;
    spanBg: string;
    imgAlt: string;
    imgSrc: string;
    imgFit: string;
    imgBox: string;
    imgDisplay: string;
    innerRoundSpans: number;
  };
};

async function loginFace(url: string): Promise<LoginFace> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  await probeLoad(page, `${url}/login`);
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
    // Round-27 (F-27a): the LOGO family — the reference's real img inside
    // the circle span (ours pre-cure: a 40×40 blue-dot span). The circle:
    // the h1's preceding round sibling; the img: the alt-bearing logo.
    const logoImg = document.querySelector("img[alt*='logo']") as HTMLImageElement | null;
    const logoSpan = logoImg?.parentElement ?? null;
    const span = logoSpan && getComputedStyle(logoSpan);
    const imgBox = logoImg ? logoImg.getBoundingClientRect() : null;
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
      logo: {
        spanRadius: span?.borderRadius ?? "",
        spanOverflow: span?.overflow ?? "",
        spanShadow: span?.boxShadow.slice(0, 100) ?? "",
        spanBg: span?.backgroundColor ?? "",
        imgAlt: logoImg?.alt ?? "",
        imgSrc: logoImg?.getAttribute("src") ?? "",
        imgFit: logoImg ? getComputedStyle(logoImg).objectFit : "",
        imgBox: imgBox ? `${Math.round(imgBox.width)}x${Math.round(imgBox.height)}` : "",
        imgDisplay: logoImg ? getComputedStyle(logoImg).display : "",
        innerRoundSpans: logoSpan ? logoSpan.querySelectorAll(":scope > span").length : -1,
      },
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
  await probeLoad(page, url);
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
  await probeLoad(page, url);
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
  await probeLoad(page, url);
  await page.waitForTimeout(1000);
  // Round-28 (F-28a): the hero cascade shifts descendant client rects
  // while it runs (a translated ancestor moves the h1's box) — settle
  // the reveals before reading boxes. Both apps settle at transform:
  // none (the reference's post-cascade inline face = our settled DOM).
  await page
    .waitForFunction(
      () => {
        const wrap = document.querySelector(".max-w-3xl");
        const span = document.querySelector("h1 span");
        return (
          wrap !== null &&
          span !== null &&
          getComputedStyle(wrap).transform === "none" &&
          getComputedStyle(span).transform === "none"
        );
      },
      undefined,
      { timeout: 8000 },
    )
    .catch(() => {});
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
  await probeLoad(page, url + "/login");
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
  await probeLoad(page, url + "/login");
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
// Round-27 (F-27a) EXTENSION: the LOGO family — the circle span's chrome +
// the real logo img's face, diffed both apps. The spanRadius and the
// spanShadow ride PER-SIDE constants (the s18/round-26 serialization
// classes: v3 computes the rounded-full 9999px where v4 computes
// 33554400px — the numeric-paint-equal read, never diffed; the
// ring-4/shadow-lg composite serializes oklab-vs-rgba) — as does the
// imgSrc (the round-24 never-their-CDN doctrine: theirs the base44 CDN,
// ours the byte-mirrored /icon.png).
diff("[login]", refLogin.logo.spanOverflow, oursLogin.logo.spanOverflow, "logo.spanOverflow", out);
diff("[login]", refLogin.logo.spanBg, oursLogin.logo.spanBg, "logo.spanBg (the dot-era bg-white retired)", out);
diff("[login]", refLogin.logo.imgAlt, oursLogin.logo.imgAlt, "logo.imgAlt (the reference's real alt)", out);
diff("[login]", refLogin.logo.imgFit, oursLogin.logo.imgFit, "logo.imgFit (the byte class object-cover)", out);
diff("[login]", refLogin.logo.imgBox, oursLogin.logo.imgBox, "logo.imgBox (96×96 at 1280)", out);
diff("[login]", refLogin.logo.imgDisplay, oursLogin.logo.imgDisplay, "logo.imgDisplay (the preflight block)", out);
diff("[login]", refLogin.logo.innerRoundSpans, oursLogin.logo.innerRoundSpans, "logo.innerRoundSpans (the CRM blue dot never returns)", out);
expectConst("[login]", "REF", "9999px", refLogin.logo.spanRadius, out);
expectConst("[login]", "OURS", "3.35544e+07px", oursLogin.logo.spanRadius, out);
expectConst("[login]", "REF", "EleganceFlow logo", refLogin.logo.imgAlt, out);
expectConst("[login]", "OURS", "EleganceFlow logo", oursLogin.logo.imgAlt, out);
expectConst("[login]", "REF", "cover", refLogin.logo.imgFit, out);
expectConst("[login]", "OURS", "cover", oursLogin.logo.imgFit, out);
expectConst("[login]", "REF", "96x96", refLogin.logo.imgBox, out);
expectConst("[login]", "OURS", "96x96", oursLogin.logo.imgBox, out);
expectConst("[login]", "REF", 0, refLogin.logo.innerRoundSpans, out);
expectConst("[login]", "OURS", 0, oursLogin.logo.innerRoundSpans, out);
expectConst(
  "[login]",
  "REF",
  "https://media.base44.com/images/public/69ca8f9d112e0923462fae91/283cae1f1_logo.png/v1/fit/w_192,h_192/283cae1f1_logo.webp",
  refLogin.logo.imgSrc,
  out,
);
expectConst("[login]", "OURS", "/icon.png", oursLogin.logo.imgSrc, out);

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
    await probeLoad(page, `${url}/${route}`);
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

// The round-19 INTERACTION-BEHAVIOR census: the live rides no probe
// ever made against the reference — the contact form's submit (the
// reference fires NO domain POST and at ~400ms REMOVES the form,
// rendering the persistent in-place success panel; ours had shown a
// floating toast and kept the cleared form — F-19a; the reference's
// grid wraps the form in a bare right-column div — F-19b), plus the
// positive-census rides (the filter chips' computed active face — the
// reference paints inline styles, our class decode computes the same;
// the carousel selector swap; the header's two scroll states). OURS
// rides with a route-fulfilled POST (the dev db takes no probe row);
// the reference's ride is side-effect-free by construction (no POST
// fires — live-captured at round-19).
async function interactFace(url: string, ours: boolean) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  try {
    if (ours) {
      await context.route("**/api/inquiry", (route) =>
        route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({ ok: true, data: { inquiry: { id: "drift-probe" } } }),
        }),
      );
    }
    const page = await context.newPage();
    await probeLoad(page, url + "/");
    await page.waitForTimeout(1200);

    // the header's two scroll states — read TOP first, before any ride
    // that auto-scrolls (the round-19 probe-order lesson)
    const headerTop = await page.evaluate(() => document.querySelector("header")?.className ?? "(none)");

    // F-19b: the form's parent — the reference's bare wrapper div
    const pre = await page.evaluate(() => {
      const grid = document.querySelector("#contact .grid");
      const form = document.querySelector("#contact form");
      return {
        formParentClass: form?.parentElement ? (form.parentElement.getAttribute("class") ?? "(no-class)") : "(no form)",
        gridChildren: grid ? [...grid.children].map((c) => c.tagName) : [],
      };
    });

    // the filter ride: Branding — the surviving set + the ACTIVE chip's
    // COMPUTED face (the reference paints inline styles; our class
    // decode must compute the same — the F-15b genus, pinned live)
    await page.locator("#portfolio button", { hasText: /^\s*Branding\s*$/ }).first().click();
    await page.waitForTimeout(500);
    const filterRide = await page.evaluate(() => {
      const sec = document.querySelector("#portfolio") ?? document.body;
      const grid = sec.querySelector(".grid");
      const titles = grid
        ? [...grid.querySelectorAll("h3")].filter((h) => (h as HTMLElement).offsetParent !== null).map((h) => (h.textContent ?? "").trim())
        : [];
      const active = [...sec.querySelectorAll("button")].find((b) => /tracking-widest/.test(b.className) && (b.textContent ?? "").trim() === "Branding");
      const s = active ? getComputedStyle(active) : null;
      return { titles, activeBg: s?.backgroundColor ?? "", activeColor: s?.color ?? "" };
    });

    // the carousel ride: the 2nd selector — the swapped quote
    await page.evaluate(() => {
      const sec = document.querySelector("#testimonials") ?? document.body;
      const sels = [...sec.querySelectorAll("button")].filter((b) => /border/.test(b.className));
      (sels[1] as HTMLElement).click();
    });
    await page.waitForTimeout(500);
    const carouselRide = await page.evaluate(() => {
      const sec = document.querySelector("#testimonials") ?? document.body;
      const quote = sec.querySelector(".md\\:col-span-3 p");
      return quote ? (quote.textContent ?? "").trim() : "(no quote)";
    });

    // the contact-form ride: fill (structural selectors — the
    // reference's labels are unassociated, our label bindings the
    // documented a11y superset) + submit + the post-swap face
    const sec = page.locator("#contact");
    await sec.locator('input[type="text"], input:not([type])').first().fill("Drift Probe");
    await sec.locator('input[type="email"]').first().fill("drift@session199.test");
    await sec.locator("select").first().selectOption({ label: "Brand Strategy" });
    await sec.locator("textarea").first().fill("The round-19 drift leg — the interaction census ride.");
    await sec.getByRole("button", { name: /send/i }).click();
    await page.waitForTimeout(1400);
    const postSwap = await page.evaluate(() => {
      const c = document.querySelector("#contact");
      const panel = c?.querySelector("h3")?.parentElement ?? null;
      const icon = panel?.querySelector("svg") ?? null;
      const h3 = c?.querySelector("h3");
      const p = panel?.querySelector("p") ?? null;
      const iconS = icon ? getComputedStyle(icon) : null;
      return {
        hasForm: !!c?.querySelector("form"),
        inputCount: c ? c.querySelectorAll("input, select, textarea").length : -1,
        panelClass: panel?.getAttribute("class") ?? "(none)",
        panelParentClass: panel?.parentElement ? (panel.parentElement.getAttribute("class") ?? "(no-class)") : "(none)",
        h3Class: h3?.getAttribute("class") ?? "(none)",
        pClass: p?.getAttribute("class") ?? "(none)",
        iconWidth: icon?.getAttribute("width") ?? "(none)",
        iconColor: iconS?.color ?? "(none)",
        floatingToasts: document.querySelectorAll('[class*="max-h-screen"] [role="status"], [data-sonner-toast]').length,
      };
    });

    // the header's scrolled state (the page is down at the contact
    // section after the rides; make it explicit)
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(500);
    const headerScrolled = await page.evaluate(() => document.querySelector("header")?.className ?? "(none)");

    return { headerTop, headerScrolled, ...pre, filterRide, carouselRide, ...postSwap };
  } finally {
    await context.close();
  }
}

// The round-20 [authfail] leg — the AUTH-FAILURE/RESPONSE census: the
// response-header family (the session-20 pins were read against the OLD
// NEO-CRM reference; this leg re-reads them against the CURRENT one on
// every run) + the reset-submit ride (a GHOST email — valid format, no
// mailbox, no account: zero side effects on either app, no db row on
// our unknown-email path). The login-FAILURE ride stays a census
// record, not a standing leg (R-20e: the platform's rate-limit face is
// unknown and deliberately not hunted — today's 3 rides all identical).
async function authFailFace(url: string) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  try {
    // The header family on the five document surfaces — read ONLY the
    // reference's keys (our framework vary/cache-control are invisible
    // supersets, never diffed). R-20f (the round-20 find): the CURRENT
    // reference ships x-content-type-options ONLY on / and /login — its
    // sitemap/robots/manifest carry none (the session-20 pins were
    // measured against the OLD CRM reference, which shipped nosniff on
    // every response). OURS keeps nosniff on all five (the security
    // superset, the session-20 rationale) — so nosniff is diffed only
    // on the two surfaces the reference itself ships it; our extra
    // coverage stays the unit-pinned superset (tests/http-headers).
    const headerFace: Record<string, string> = {};
    for (const path of ["/", "/login", "/sitemap.xml", "/robots.txt", "/manifest.json"]) {
      const diffNosniff = path === "/" || path === "/login";
      try {
        const res = await context.request.get(url + path, { maxRedirects: 2, timeout: 30000 });
        const h = res.headers();
        const fields = [
          String(res.status()),
          h["content-type"] ?? "(none)",
          h["referrer-policy"] ?? "(none)",
          h["strict-transport-security"] ?? "(none)",
        ];
        if (diffNosniff) fields.push(h["x-content-type-options"] ?? "(none)");
        headerFace[path] = fields.join(" | ");
      } catch {
        headerFace[path] = "(request failed)";
      }
    }

    // The reset-submit ride: swap to the reset view, submit a ghost
    // email, read the sent card's face (structural selectors — the
    // reference's labels are unassociated).
    const page = await context.newPage();
    let forgotStatus = -1;
    page.on("response", (r) => {
      if (r.request().method() === "POST" && /forgot-password|reset-password-request/.test(r.url())) {
        forgotStatus = r.status();
      }
    });
    await probeLoad(page, url + "/login");
    await page.waitForTimeout(600);
    await page.getByText(/forgot password/i).first().click();
    await page.waitForTimeout(900);
    await page.locator('input[type="email"]').first().fill("no-such-user-drift@example.com");
    await page.locator("form").first().locator('button[type="submit"], button:not([type="button"])').first().click();
    await page.waitForTimeout(2200);
    const sent = await page.evaluate(() => {
      const callout = Array.from(document.querySelectorAll<HTMLElement>("*")).find(
        (n) => (n.getAttribute("class") ?? "").includes("bg-green-50"),
      );
      const h2 = document.querySelector("h2");
      const back = Array.from(document.querySelectorAll("button")).map((b) => (b.textContent ?? "").trim()).find((t) => /back to sign in/i.test(t)) ?? "(none)";
      return {
        h2: h2 ? (h2.textContent ?? "").trim() : "(none)",
        calloutRole: callout?.getAttribute("role") ?? "(no role)",
        calloutClass: callout?.getAttribute("class") ?? "(none)",
        calloutTextClass: callout?.firstElementChild?.getAttribute("class") ?? "(none)",
        backButton: back,
      };
    });
    await page.close();
    return { headerFace, forgotStatus, ...sent };
  } finally {
    await context.close();
  }
}

// The round-21 [google] census leg — the Google button's CLICK ride on
// both apps (the surface no probe ever read: inks at round-13, the G
// glyph at round-16 — the click never ridden). R-21a (the record): the
// reference's button navigates to a REAL Google OAuth redirect
// (accounts.google.com with base44's client_id and the
// app.base44.com/api/apps/auth/callback redirect_uri — intercepted +
// aborted here, zero side effects). UNIMPLEMENTABLE in the self-hosted
// clone (the redirect_uri is registered to base44's Google app), so
// OURS degrades to the honest info toast (the fallback pinned by
// tests/google-fallback.test.ts + the auth e2e leg). The two faces
// differ BY DESIGN — each side is pinned against its RECORDED constant;
// a change on either side (the reference drops the button, swaps the
// client_id, or changes the scope; our toast breaks or drops the text)
// reads DRIFT. The dynamic OAuth params (nonce, dsh, state, continue,
// rart) are per-session by construction and excluded.
async function googleFace(url: string, ours: boolean) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  try {
    // The ride's capture channels (the round-21 experiment probe decoded
    // the mechanism): the click navigates the MAIN FRAME to the
    // platform's OWN document endpoint
    // `{REF}/api/apps/auth/login?from_url=…&app_id=…` (route-visible),
    // whose 302 Location IS the Google OAuth URL — and redirect
    // followers BYPASS route interception (the Playwright/Chromium
    // redirect-chain behavior), so the OAuth URL's reliable capture is
    // the framenavigated event. Google's own page resources (ssl.
    // gstatic, /_/bscframe) are aborted — the signin page never fully
    // loads; the single anonymous navigation-request hit is the ride's
    // whole external footprint (no credentials, no state change — the
    // round-20 zero-side-effects doctrine).
    const googleNavs: string[] = [];
    const platformAuthLogin: string[] = [];
    await context.route("**/*", (route) => {
      const req = route.request();
      const u = req.url();
      if (req.resourceType() === "document" && u.includes("/api/apps/auth/login")) {
        platformAuthLogin.push(u); // the chain's head — CONTINUE (the 302 is the signal's source)
        return route.continue();
      }
      if (u.includes("accounts.google.com") || u.includes("ssl.gstatic.com")) {
        return route.abort();
      }
      return route.continue();
    });
    const page = await context.newPage();
    page.on("framenavigated", (f) => {
      const u = f.url();
      if (u.startsWith("https://accounts.google.com/")) googleNavs.push(u);
    });
    await probeLoad(page, url + "/login");
    await page.waitForTimeout(600);
    const google = page.getByRole("button", { name: "Continue with Google" });
    const buttonCount = await google.count();
    if (buttonCount > 0) {
      await google.first().click();
      await page.waitForTimeout(1800);
    }
    // OURS: the honest toast face
    const toastFace = ours
      ? await page.evaluate(() => {
          const card = document.querySelector('[role="region"][aria-label="Notifications"] [role="status"]');
          return card
            ? {
                rendered: true,
                role: card.getAttribute("role"),
                text: (card.textContent ?? "").replace(/\s+/g, " ").trim(),
              }
            : { rendered: false, role: null, text: null };
        })
      : null;
    // REF: the platform endpoint's shape + the OAuth redirect's STATIC params
    let platform: Record<string, string> | null = null;
    if (platformAuthLogin[0]) {
      try {
        const u = new URL(platformAuthLogin[0]);
        platform = {
          path: u.pathname,
          fromUrl: u.searchParams.get("from_url") ?? "(none)",
          appId: u.searchParams.get("app_id") ?? "(none)",
        };
      } catch {
        platform = null;
      }
    }
    let oauth: Record<string, string> | null = null;
    const oauthNav = googleNavs[0];
    if (oauthNav) {
      try {
        const u = new URL(oauthNav);
        oauth = {
          host: u.host,
          clientId: u.searchParams.get("client_id") ?? "(none)",
          redirectUri: u.searchParams.get("redirect_uri") ?? "(none)",
          responseType: u.searchParams.get("response_type") ?? "(none)",
          scope: u.searchParams.get("scope") ?? "(none)",
          prompt: u.searchParams.get("prompt") ?? "(none)",
        };
      } catch {
        oauth = null;
      }
    }
    await page.close();
    return { buttonCount, platform, oauth, toastFace };
  } finally {
    await context.close();
  }
}

// The round-22 [viewport] census leg — the INTERMEDIATE-VIEWPORT family
// no probe ever visited: every probe since session-199 read 1280 and
// 390 only (the parity script's two viewports, the drift legs' widths,
// the e2e device 1280×720). The two breakpoint BOUNDARIES — sm (640)
// and md (768) — carry whole computed families: the landing's header
// flip (the mobile menu's own retirement boundary, the operator's
// standing emphasis), the hero h1's text ladder, the about grid's md:
// flip, the auth card's sm:/md: family, the mobile panel's OPEN wrap
// class at 640 (the between-boundary state), and the html font-size —
// the v4 REM-BREAKPOINT CARRIER (v3's media queries were px-based;
// v4's are rem-based — at the 16px default they agree; a declared root
// size would shift every boundary on OUR build only). R-22a: the
// positive census (clean, first time probed 2026-11-05) — every face
// COMPUTE IDENTICAL both apps at both boundaries. The pins ride
// tests/viewport-faces.test.ts + the landing e2e's two boundary legs.
async function viewportFace(url: string, w: number) {
  const context = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await context.newPage();
  try {
    await probeLoad(page, url);
    await page.waitForTimeout(1000);
    const landingFace = await page.evaluate(() => {
      const cs = (el: Element | null | undefined) => (el ? getComputedStyle(el as HTMLElement) : null);
      const header = document.querySelector("header");
      const nav = header?.querySelector("nav");
      const desktopUl = nav?.querySelector("ul");
      const hamburger = [...(nav?.querySelectorAll("button") ?? [])].find((b) =>
        /menu/i.test(b.getAttribute("aria-label") ?? "") || b.querySelector("svg") !== null,
      );
      const cta = [...(nav?.querySelectorAll("a") ?? [])].find((a) => !a.closest("ul") && (a.getAttribute("href") ?? "") !== "#");
      const h1 = document.querySelector("h1");
      const about = [...document.querySelectorAll("section")].find((s) => /about/i.test(s.id ?? ""));
      const aboutGrid = about?.querySelector("div[class*='md\\:grid-cols-2'], div.grid");
      return {
        htmlFontSize: getComputedStyle(document.documentElement).fontSize,
        hamburgerDisplay: cs(hamburger)?.display ?? "",
        desktopNavDisplay: cs(desktopUl)?.display ?? "",
        headerCtaDisplay: cs(cta)?.display ?? "",
        h1Font: cs(h1)?.fontSize ?? "",
        aboutGrid: aboutGrid ? getComputedStyle(aboutGrid as HTMLElement).gridTemplateColumns : "",
      };
    });
    // the auth card's boundary family (the LOGIN_LAYOUT sm:/md: faces)
    await probeLoad(page, `${url}/login`);
    await page.waitForTimeout(1000);
    const cardFace = await page.evaluate(() => {
      const cs = (el: Element | null | undefined) => (el ? getComputedStyle(el as HTMLElement) : null);
      const h1 = document.querySelector("h1");
      const card = h1?.closest("form")?.parentElement ?? h1?.closest("div[class*='rounded']");
      const inner = card?.firstElementChild;
      const email = document.querySelector('input[type="email"], input[name="email"]');
      return {
        inputHeight: cs(email)?.height ?? "",
        inputFont: cs(email)?.fontSize ?? "",
        innerPad: inner ? cs(inner)?.padding ?? "" : "",
      };
    });
    return { w, ...landingFace, ...cardFace };
  } finally {
    await context.close();
  }
}

// The round-22 [viewport] panel leg — the mobile panel OPEN at 640 (the
// between-boundary state: the hamburger shows below md; the panel census
// rode at 390 only). Byte-diffed both apps: the wrap class + the links.
async function viewportPanelFace(url: string) {
  const context = await browser.newContext({ viewport: { width: 640, height: 900 } });
  const page = await context.newPage();
  try {
    await probeLoad(page, url);
    await page.waitForTimeout(800);
    const toggle = page.locator("header button").first();
    if (await toggle.count()) {
      await toggle.click();
      await page.waitForTimeout(600);
    }
    return await page.evaluate(() => {
      const txt = (el: Element | null) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();
      const navs = [...document.querySelectorAll("header nav, header div")].filter((n) => {
        const r = n.getBoundingClientRect();
        return r.height > 40 && txt(n).includes("About");
      });
      const panel = navs[0];
      if (!panel) return { panelVisible: false, links: [] as string[], wrapClass: "" };
      return {
        panelVisible: true,
        links: [...panel.querySelectorAll("a")].map((a) => `${txt(a)} -> ${(a as HTMLAnchorElement).getAttribute("href")}`),
        wrapClass: (panel as HTMLElement).className,
      };
    });
  } finally {
    await context.close();
  }
}

/** The recorded-constant pin (the two-sided leg's diff: recorded vs live). */
function expectConst(label: string, side: string, recorded: unknown, live: unknown, out: string[]) {
  const jr = JSON.stringify(recorded);
  const jl = JSON.stringify(live);
  if (jr !== jl) {
    out.push(`${label} ${side} face changed:\n  RECORDED: ${jr}\n  LIVE    : ${jl}`);
  }
}

// The round-24 [docs] leg — the DOCUMENT-ASSET/META census: the ROOT
// rendered head family no probe ever read (the round-18 head census read
// /login+/signup JSON-LD/viewport/theme-color/canonical only; the raw
// SPA shell carries none of the meta family — the runtime injects it,
// which is how the stale "the reference ships no SEO family" record
// survived), the manifest CONTENTS, the robots/sitemap bytes, the
// fetched icon + og-image BYTES, the login tab order, and the
// font-loading family. The reference's own defects (the favicon
// type-lie, the /login-only og:image dimension trio, the platform's
// boilerplate alt) ride per-side RECORDED constants; the mirrored
// families diff REF vs OURS directly.
type DocsFace = {
  title: string;
  signupTitle: string;
  resetTitle: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  ogSiteName: string;
  ogImageMeta: { width: string | null; height: string | null; alt: string | null };
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterUrl: string;
  iconLinks: { rel: string; type: string | null; sizes: string | null }[];
  iconSha1: string;
  ogImageSha1: string;
  manifest: {
    name: string;
    short_name: string;
    description: string;
    iconSizes: string[];
    iconSrcs: string[];
    display: string;
    theme_color: string;
    background_color: string;
    start_url: string;
    scope: string;
  };
  robots: string;
  sitemapUrls: string[];
  loginTabStops: string[];
  fonts: {
    bodyFont: string;
    nonNextjsFaces: number;
    preloadFonts: number;
    googleFonts: number;
  };
};

async function docsFace(url: string): Promise<DocsFace> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const origin = new URL(url).origin;
  const stripOrigin = (s: string) => s.split(origin).join("");

  await probeLoad(page, url + "/");
  await page.waitForTimeout(1200);

  const rootHead = await page.evaluate(() => {
    const meta = (sel: string) => document.querySelector(sel)?.getAttribute("content") ?? null;
    return {
      title: document.title,
      description: meta("meta[name='description']"),
      ogTitle: meta("meta[property='og:title']"),
      ogDescription: meta("meta[property='og:description']"),
      ogUrl: meta("meta[property='og:url']"),
      ogType: meta("meta[property='og:type']"),
      ogSiteName: meta("meta[property='og:site_name']"),
      ogImageWidth: meta("meta[property='og:image:width']"),
      ogImageHeight: meta("meta[property='og:image:height']"),
      ogImageAlt: meta("meta[property='og:image:alt']"),
      twitterCard: meta("meta[name='twitter:card']"),
      twitterTitle: meta("meta[name='twitter:title']"),
      twitterDescription: meta("meta[name='twitter:description']"),
      twitterUrl: meta("meta[name='twitter:url']"),
      ogImageUrl: meta("meta[property='og:image']"),
      iconLinks: Array.from(document.querySelectorAll("link[rel*='icon']")).map((l) => ({
        rel: l.getAttribute("rel") ?? "",
        type: l.getAttribute("type"),
        sizes: l.getAttribute("sizes"),
      })),
      fonts: {
        // the __nextjs-* families are the dev-overlay artifact on OUR
        // dev server (the CRM session-22 lesson) — excluded on BOTH
        // sides so the census reads the CONTENT fonts only
        nonNextjsFaces: Array.from(document.fonts).filter((f) => !f.family.startsWith("__nextjs")).length,
        preloadFonts: document.querySelectorAll("link[rel='preload'][as='font']").length,
        googleFonts: document.querySelectorAll("link[href*='fonts.googleapis'], link[href*='fonts.gstatic']").length,
        bodyFont: getComputedStyle(document.body).fontFamily,
      },
    };
  });

  // the tab order on /login — the round-21 keyboard census rode the
  // LANDING only; this is the auth card's own ride
  await probeLoad(page, url + "/login");
  await page.waitForTimeout(800);
  const loginTabStops: string[] = [];
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    const stop = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return "(body)";
      return `${el.tagName.toLowerCase()}#${el.id || ""}`;
    });
    if (stop === "(body)") break;
    loginTabStops.push(stop);
  }

  // the titles of the two named auth routes (the reference's SPA sets
  // document.title at runtime — the same settle the census probed)
  await probeLoad(page, url + "/signup");
  await page.waitForTimeout(1500);
  const signupTitle = await page.evaluate(() => document.title);
  await page.goto(url + "/reset-password", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1800);
  const resetTitle = await page.evaluate(() => document.title);

  // the document-family routes' CONTENT (round-20 read their response
  // headers; the contents were never censused) + the fetched asset bytes
  const manifestRes = await context.request.get(url + "/manifest.json");
  const manifest = (await manifestRes.json()) as Record<string, unknown>;
  const robots = await (await context.request.get(url + "/robots.txt")).text();
  const sitemap = await (await context.request.get(url + "/sitemap.xml")).text();
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    stripOrigin(m[1]!),
  );
  const iconHref = await page.evaluate(() => document.querySelector("link[rel='icon']")?.getAttribute("href") ?? "");
  const iconAbs = iconHref.startsWith("http") ? iconHref : url + iconHref;
  const iconBuf = await (await context.request.get(iconAbs)).body();
  const ogMetaUrl = rootHead.ogImageUrl ?? "";
  const ogAbs = ogMetaUrl.startsWith("http") ? ogMetaUrl : url + ogMetaUrl;
  const ogBuf = await (await context.request.get(ogAbs)).body();

  await context.close();

  const icons = (manifest["icons"] ?? []) as { src: string; sizes: string }[];
  return {
    title: rootHead.title,
    signupTitle,
    resetTitle,
    description: rootHead.description ?? "",
    ogTitle: rootHead.ogTitle ?? "",
    ogDescription: rootHead.ogDescription ?? "",
    ogUrl: stripOrigin(rootHead.ogUrl ?? ""),
    ogType: rootHead.ogType ?? "",
    ogSiteName: rootHead.ogSiteName ?? "",
    ogImageMeta: {
      width: rootHead.ogImageWidth,
      height: rootHead.ogImageHeight,
      alt: rootHead.ogImageAlt,
    },
    twitterCard: rootHead.twitterCard ?? "",
    twitterTitle: rootHead.twitterTitle ?? "",
    twitterDescription: rootHead.twitterDescription ?? "",
    twitterUrl: stripOrigin(rootHead.twitterUrl ?? ""),
    iconLinks: rootHead.iconLinks,
    iconSha1: sha1Hex(Buffer.from(iconBuf)),
    ogImageSha1: sha1Hex(Buffer.from(ogBuf)),
    manifest: {
      name: String(manifest["name"] ?? ""),
      short_name: String(manifest["short_name"] ?? ""),
      description: String(manifest["description"] ?? ""),
      iconSizes: icons.map((i) => i.sizes),
      iconSrcs: icons.map((i) => stripOrigin(i.src)),
      display: String(manifest["display"] ?? ""),
      theme_color: String(manifest["theme_color"] ?? ""),
      background_color: String(manifest["background_color"] ?? ""),
      start_url: stripOrigin(String(manifest["start_url"] ?? "")),
      scope: stripOrigin(String(manifest["scope"] ?? "")),
    },
    robots: stripOrigin(robots),
    sitemapUrls,
    loginTabStops,
    fonts: {
      bodyFont: rootHead.fonts.bodyFont,
      nonNextjsFaces: rootHead.fonts.nonNextjsFaces,
      preloadFonts: rootHead.fonts.preloadFonts,
      googleFonts: rootHead.fonts.googleFonts,
    },
  };
}

/** sha1 hex of a Buffer (the drift script's node-side helper). */
function sha1Hex(buf: Buffer): string {
  return createHash("sha1").update(buf).digest("hex");
}

// The round-25 [routes] leg — the URL/ROUTE-MECHANICS census: the
// 404's own TITLE-DERIVATION family (the reference's CURRENT build
// derives the unknown-route title from the pathname — "Verify Email |
// EleganceFlow" at /verify-email — the round-25 record correction of
// the stale D-194a4 "bare brand on the 404" record; OURS mirrors it
// through src/lib/route-title.ts + the NotFoundBody write/re-win),
// the quoted-path body family, and the query passthrough — all diffed
// REF vs OURS. The per-side mechanics ride RECORDED constants (the
// google-leg expectConst pattern): the STATUS family (the reference's
// SPA answers 200 everywhere vs OUR true-404 superset), the
// trailing-slash family (the reference's /login/ falls to its
// designed 404 — its own platform defect; OURS 308-normalizes to the
// canonical login), and the guest /dashboard adjudication (the
// reference renders its designed 404 directly — no wall, no from_url;
// OURS rides OUR OWN from_url login wall, the superset inbox's guard).
async function routesFace(url: string) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const titles: Record<string, string> = {};
  const statuses: Record<string, number | null> = {};
  const quoted: Record<string, string | null> = {};
  for (const p of [
    "/verify-email",
    "/nonexistent-xyz",
    "/foo/bar",
    "/MiXeD-cAsE",
    "/UPPER-CASE",
    "/with_underscore",
    "/digits-123",
    "/-leading-hyphen",
    "/nonexistent-xyz?q=1",
  ]) {
    const resp = await page.goto(url + p, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200); // the SPA's runtime title injection + our write/re-win settle
    titles[p] = await page.title();
    statuses[p] = resp ? resp.status() : null;
    const body = (await page.locator("body").innerText().catch(() => "")) || "";
    quoted[p] = /The page "([^"]+)"/.exec(body)?.[1] ?? null;
  }
  // the trailing-slash mechanics + the query passthrough + the guest wall
  const respSlash = await page.goto(url + "/login/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  const slash = {
    finalPath: new URL(page.url()).pathname,
    title: await page.title(),
    status: respSlash ? respSlash.status() : null,
    quoted: /The page "([^"]+)"/.exec((await page.locator("body").innerText().catch(() => "")) || "")?.[1] ?? null,
  };
  await page.goto(url + "/login?x=1", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  const query = {
    finalPath: new URL(page.url()).pathname + new URL(page.url()).search,
    title: await page.title(),
  };
  await page.goto(url + "/dashboard", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500); // the client-guard settle (OURS' from_url wall)
  const u = new URL(page.url());
  const dash = {
    finalPath: u.pathname,
    fromUrlTarget: u.searchParams.get("from_url") ?? null,
    title: await page.title(),
    quoted: /The page "([^"]+)"/.exec((await page.locator("body").innerText().catch(() => "")) || "")?.[1] ?? null,
  };
  // Round-27 (F-27d) EXTENSION: the post-Go-Home TITLE ride — the
  // stale-title drift the round's discovery probe found (OURS' derived
  // 404 title PERSISTED on the landing after the Go Home client nav;
  // the reference's SPA resets to the bare brand). The reference's Go
  // Home is a BUTTON (its SPA JS-router idiom — the D-194a2 record);
  // ours is the WCAG-correct <Link> — the ride clicks whichever control
  // carries the name on each side.
  await page.goto(url + "/probe-27", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  const goHomeTitleBefore = await page.title();
  const homeCtl = page.getByRole("link", { name: "Go Home" }).or(page.getByRole("button", { name: "Go Home" })).first();
  await homeCtl.click();
  await page.waitForTimeout(2500);
  const gu = new URL(page.url());
  const goHome = {
    before: goHomeTitleBefore,
    finalPath: gu.pathname,
    title: await page.title(),
  };
  await context.close();
  return { titles, statuses, quoted, slash, query, dash, goHome };
}

// The round-19 interact leg — sequential on ONE context per app (the
// rides auto-scroll; the header-top read must precede them).
{
  const refInteract = await interactFace(REF, false);
  const oursInteract = await interactFace(OURS, true);
  diff("[interact]", refInteract.headerTop, oursInteract.headerTop, "headerTop (the two-state family — the at-top face)", out);
  diff("[interact]", refInteract.headerScrolled, oursInteract.headerScrolled, "headerScrolled (the flip face)", out);
  diff("[interact]", refInteract.formParentClass, oursInteract.formParentClass, "formParentClass (F-19b: the bare right-column wrapper)", out);
  diff("[interact]", refInteract.gridChildren.join(","), oursInteract.gridChildren.join(","), "gridChildren (the two bare columns)", out);
  diff("[interact]", refInteract.filterRide.titles, oursInteract.filterRide.titles, "filterBrandingTitles (the surviving set)", out);
  diff("[interact]", refInteract.filterRide.activeBg, oursInteract.filterRide.activeBg, "filterActiveBg (the inline-style genus — computed)", out);
  diff("[interact]", refInteract.filterRide.activeColor, oursInteract.filterRide.activeColor, "filterActiveColor (computed)", out);
  diff("[interact]", refInteract.carouselRide, oursInteract.carouselRide, "carouselQuote (the selector-2 swap)", out);
  diff("[interact]", refInteract.hasForm, oursInteract.hasForm, "postSubmitHasForm (F-19a: the form is REMOVED)", out);
  diff("[interact]", refInteract.inputCount, oursInteract.inputCount, "postSubmitInputCount", out);
  diff("[interact]", refInteract.panelClass, oursInteract.panelClass, "panelClass (the reference's in-place face)", out);
  diff("[interact]", refInteract.panelParentClass, oursInteract.panelParentClass, "panelParentClass (the wrapper)", out);
  diff("[interact]", refInteract.h3Class, oursInteract.h3Class, "panelH3Class", out);
  diff("[interact]", refInteract.pClass, oursInteract.pClass, "panelPClass", out);
  diff("[interact]", refInteract.iconWidth, oursInteract.iconWidth, "panelIconWidth (48)", out);
  diff("[interact]", refInteract.iconColor, oursInteract.iconColor, "panelIconColor (the amber — computed, the inline-style genus)", out);
  diff("[interact]", refInteract.floatingToasts, oursInteract.floatingToasts, "floatingToasts (the reference fires NONE — F-19a)", out);
}

// The round-20 [authfail] leg — sequential on ONE context per app.
{
  const refAuthFail = await authFailFace(REF);
  const oursAuthFail = await authFailFace(OURS);
  for (const path of ["/", "/login", "/sitemap.xml", "/robots.txt", "/manifest.json"]) {
    const keys = path === "/" || path === "/login"
      ? "status | content-type | referrer-policy | hsts | nosniff"
      : "status | content-type | referrer-policy | hsts (nosniff: the ours-only superset — R-20f)";
    diff("[authfail]", refAuthFail.headerFace[path], oursAuthFail.headerFace[path], `headers ${path} (${keys} — the session-20 family re-read on the CURRENT reference)`, out);
  }
  diff("[authfail]", refAuthFail.forgotStatus, oursAuthFail.forgotStatus, "forgotPostStatus (the ghost-email 200 both)", out);
  diff("[authfail]", refAuthFail.h2, oursAuthFail.h2, "sentH2 (Check your email)", out);
  diff("[authfail]", refAuthFail.calloutRole, oursAuthFail.calloutRole, "sentCalloutRole (F-20a: the platform callouts all announce)", out);
  diff("[authfail]", refAuthFail.calloutClass, oursAuthFail.calloutClass, "sentCalloutClass (the green banner family)", out);
  diff("[authfail]", refAuthFail.calloutTextClass, oursAuthFail.calloutTextClass, "sentCalloutTextClass (the bare-text inner div)", out);
  diff("[authfail]", refAuthFail.backButton, oursAuthFail.backButton, "sentBackButton", out);
}

// The round-21 [google] leg — the click ride on both apps; the two
// faces differ BY DESIGN (R-21a) so each side pins against its own
// recorded constant.
{
  const refGoogle = await googleFace(REF, false);
  const oursGoogle = await googleFace(OURS, true);
  expectConst(
    "[google]",
    "REF",
    {
      path: "/api/apps/auth/login",
      fromUrl: "https://colossal-elevate-service-flow.base44.app/",
      appId: "69ca8f9d112e0923462fae91",
    },
    refGoogle.platform,
    out,
  );
  expectConst(
    "[google]",
    "REF",
    {
      host: "accounts.google.com",
      clientId: "185178814199-6a35e9aqcmlm15ig0upncg07c91av8do.apps.googleusercontent.com",
      redirectUri: "https://app.base44.com/api/apps/auth/callback",
      responseType: "code",
      scope: "openid email profile",
      prompt: "select_account",
    },
    refGoogle.oauth,
    out,
  );
  expectConst(
    "[google]",
    "OURS",
    {
      rendered: true,
      role: "status",
      text: "Google sign-in not configuredThis self-hosted clone uses email and password sign-in (demo credentials in the README).",
    },
    oursGoogle.toastFace,
    out,
  );
  expectConst("[google]", "REF", 1, refGoogle.buttonCount, out);
  expectConst("[google]", "OURS", 1, oursGoogle.buttonCount, out);
}

// The round-23 [anchors] leg — the hash-link RIDE family no probe ever
// rode: the five DESKTOP nav rides + the logo `#` ride on BOTH apps
// (each diffed REF vs OURS — the settled hash + the target's landing),
// plus the deep-link boot pinned per-side against its RECORDED constant
// (the R-23b record: the reference's SPA never scrolls its deep links —
// scrollTop 0; OURS lands the native SSR scroll — the section at the
// viewport top).
async function navRideFace(url: string, label: string) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  try {
    await probeLoad(page, url);
    await page.waitForTimeout(800);
    await page.locator("header nav ul").getByRole("link", { name: label }).click();
    // scroll-behavior: smooth — poll until the scroll settles.
    await page.waitForTimeout(400);
    for (let i = 0; i < 20; i++) {
      const stable = await page.evaluate(() => {
        const y = document.documentElement.scrollTop;
        return new Promise<boolean>((res) => setTimeout(() => res(Math.abs(document.documentElement.scrollTop - y) < 1), 120));
      });
      if (stable) break;
      await page.waitForTimeout(150);
    }
    return await page.evaluate(() => ({
      hashAfter: location.hash,
      scrollTop: Math.round(document.documentElement.scrollTop),
      targetTop: Math.round(
        (document.querySelector(
          ["#about", "#services", "#portfolio", "#testimonials", "#contact"].find((h) => h === location.hash) ?? "#about",
        ) as HTMLElement | null)?.getBoundingClientRect().top ?? -1,
      ),
    }));
  } finally {
    await context.close();
  }
}

async function logoRideFace(url: string) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  try {
    await probeLoad(page, url);
    await page.waitForTimeout(600);
    await page.evaluate(() => document.getElementById("services")?.scrollIntoView());
    await page.waitForTimeout(900);
    await page.locator("header a").first().click();
    await page.waitForTimeout(1200);
    return await page.evaluate(() => ({
      hashAfter: location.hash,
      scrollTop: Math.round(document.documentElement.scrollTop),
    }));
  } finally {
    await context.close();
  }
}

async function deepLinkFace(url: string) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  try {
    await probeLoad(page, `${url}/#portfolio`);
    await page.waitForTimeout(1600);
    return await page.evaluate(() => ({
      hashAfter: location.hash,
      scrollTop: Math.round(document.documentElement.scrollTop),
      targetTop: Math.round(document.getElementById("portfolio")?.getBoundingClientRect().top ?? -1),
    }));
  } finally {
    await context.close();
  }
}

{
  // The five desktop rides — sequential, each face diffed REF vs OURS
  // (R-23a: the positive census — IDENTICAL on both apps).
  for (const label of ["About", "Services", "Work", "Testimonials", "Contact"]) {
    const refRide = await navRideFace(REF, label);
    const oursRide = await navRideFace(OURS, label);
    diff("[anchors]", refRide.hashAfter, oursRide.hashAfter, `${label} navRide hashAfter`, out);
    diff("[anchors]", refRide.scrollTop, oursRide.scrollTop, `${label} navRide scrollTop (the settled landing)`, out);
    diff("[anchors]", refRide.targetTop, oursRide.targetTop, `${label} navRide targetTop (the target at the viewport top)`, out);
  }
  const refLogo = await logoRideFace(REF);
  const oursLogo = await logoRideFace(OURS);
  diff("[anchors]", refLogo.hashAfter, oursLogo.hashAfter, "logoRide hashAfter (the # wordmark)", out);
  diff("[anchors]", refLogo.scrollTop, oursLogo.scrollTop, "logoRide scrollTop (the return to top)", out);
  // The deep-link boot — the R-23b record, per-side RECORDED constants
  // (the reference's SPA never scrolls its deep links — the round-18
  // soft-404 precedent's transport sibling; OURS the working superset).
  // Each side projects to the fields that carry the semantic (the
  // layout-dependent numbers ride the diffed legs, never the constants).
  const refDeep = await deepLinkFace(REF);
  const oursDeep = await deepLinkFace(OURS);
  expectConst("[anchors]", "REF", { hashAfter: "#portfolio", scrollTop: 0 }, { hashAfter: refDeep.hashAfter, scrollTop: refDeep.scrollTop }, out);
  expectConst("[anchors]", "OURS", { hashAfter: "#portfolio", targetTop: 0 }, { hashAfter: oursDeep.hashAfter, targetTop: oursDeep.targetTop }, out);
}

// The round-22 [viewport] leg — the intermediate-viewport family at the
// sm (640) and md (768) boundaries, both apps, each face diffed REF vs
// OURS (R-22a: the positive census — every face COMPUTE IDENTICAL).
{
  for (const w of [640, 768]) {
    const refFace = await viewportFace(REF, w);
    const oursFace = await viewportFace(OURS, w);
    diff("[viewport]", refFace.htmlFontSize, oursFace.htmlFontSize, `@${w} htmlFontSize (the v4 rem-breakpoint carrier)`, out);
    diff("[viewport]", refFace.hamburgerDisplay, oursFace.hamburgerDisplay, `@${w} hamburgerDisplay (the mobile-menu family)`, out);
    diff("[viewport]", refFace.desktopNavDisplay, oursFace.desktopNavDisplay, `@${w} desktopNavDisplay`, out);
    diff("[viewport]", refFace.headerCtaDisplay, oursFace.headerCtaDisplay, `@${w} headerCtaDisplay`, out);
    diff("[viewport]", refFace.h1Font, oursFace.h1Font, `@${w} h1Font (the text ladder boundary)`, out);
    diff("[viewport]", refFace.aboutGrid, oursFace.aboutGrid, `@${w} aboutGrid (the md:grid-cols-2 flip)`, out);
    diff("[viewport]", refFace.inputHeight, oursFace.inputHeight, `@${w} loginInputHeight (the sm:h-12 flip)`, out);
    diff("[viewport]", refFace.inputFont, oursFace.inputFont, `@${w} loginInputFont (the md:text-sm flip)`, out);
    diff("[viewport]", refFace.innerPad, oursFace.innerPad, `@${w} loginInnerPad (the p-8 sm:p-10 md:… family)`, out);
  }
  const refPanel = await viewportPanelFace(REF);
  const oursPanel = await viewportPanelFace(OURS);
  diff("[viewport]", refPanel.panelVisible, oursPanel.panelVisible, "@640 panelOpen (the between-boundary state)", out);
  diff("[viewport]", refPanel.links, oursPanel.links, "@640 panelLinks (the open panel's census)", out);
  diff("[viewport]", refPanel.wrapClass, oursPanel.wrapClass, "@640 panelWrapClass (the byte-mirrored wrap)", out);
}

// The round-24 [docs] leg — the DOCUMENT-ASSET/META census. The mirrored
// families diff REF vs OURS directly; the reference's own defects and
// our recorded supersets ride per-side RECORDED constants (the
// google-leg pattern).
{
  const refDocs = await docsFace(REF);
  const oursDocs = await docsFace(OURS);
  // the ROOT rendered head family (origin-normalized)
  diff("[docs]", refDocs.title, oursDocs.title, "rootTitle (the bare brand)", out);
  diff("[docs]", refDocs.signupTitle, oursDocs.signupTitle, "signupTitle (the de-spaced face — F-24d)", out);
  diff("[docs]", refDocs.resetTitle, oursDocs.resetTitle, "resetTitle (the bare brand — F-24d)", out);
  diff("[docs]", refDocs.description, oursDocs.description, "metaDescription (the reference's TEMPLATE copy — F-24c, the record correction)", out);
  diff("[docs]", refDocs.ogTitle, oursDocs.ogTitle, "ogTitle", out);
  diff("[docs]", refDocs.ogDescription, oursDocs.ogDescription, "ogDescription", out);
  diff("[docs]", refDocs.ogUrl, oursDocs.ogUrl, "ogUrl (origin-normalized)", out);
  diff("[docs]", refDocs.ogType, oursDocs.ogType, "ogType", out);
  diff("[docs]", refDocs.ogSiteName, oursDocs.ogSiteName, "ogSiteName", out);
  diff("[docs]", refDocs.twitterCard, oursDocs.twitterCard, "twitterCard", out);
  diff("[docs]", refDocs.twitterTitle, oursDocs.twitterTitle, "twitterTitle", out);
  diff("[docs]", refDocs.twitterDescription, oursDocs.twitterDescription, "twitterDescription", out);
  diff("[docs]", refDocs.twitterUrl, oursDocs.twitterUrl, "twitterUrl (origin-normalized)", out);
  // the og-image BYTES — the byte-mirror makes both sides the SAME
  // image (the strongest parity proof of the round-24 cure)
  diff("[docs]", refDocs.ogImageSha1, oursDocs.ogImageSha1, "ogImageSha1 (the reference's fill/w_1200,h_630 card, byte-mirrored — F-24b)", out);
  // the manifest contents (origin-normalized)
  diff("[docs]", refDocs.manifest.name, oursDocs.manifest.name, "manifestName", out);
  diff("[docs]", refDocs.manifest.short_name, oursDocs.manifest.short_name, "manifestShortName", out);
  diff("[docs]", refDocs.manifest.description, oursDocs.manifest.description, "manifestDescription (F-24c)", out);
  diff("[docs]", refDocs.manifest.iconSizes, oursDocs.manifest.iconSizes, "manifestIconSizes (192x192 + 512x512)", out);
  diff("[docs]", refDocs.manifest.display, oursDocs.manifest.display, "manifestDisplay", out);
  diff("[docs]", refDocs.manifest.theme_color, oursDocs.manifest.theme_color, "manifestThemeColor", out);
  diff("[docs]", refDocs.manifest.background_color, oursDocs.manifest.background_color, "manifestBackgroundColor", out);
  diff("[docs]", refDocs.manifest.start_url, oursDocs.manifest.start_url, "manifestStartUrl (origin-normalized)", out);
  diff("[docs]", refDocs.manifest.scope, oursDocs.manifest.scope, "manifestScope (origin-normalized)", out);
  // robots + the login tab order + the fonts family
  diff("[docs]", refDocs.robots, oursDocs.robots, "robotsTxt (origin-normalized bytes)", out);
  diff("[docs]", refDocs.loginTabStops, oursDocs.loginTabStops, "loginTabStops (the six-stop ride — R-24c)", out);
  diff("[docs]", refDocs.fonts.bodyFont, oursDocs.fonts.bodyFont, "bodyFontFamily (the stock sans stack — R-24b)", out);
  diff("[docs]", refDocs.fonts.nonNextjsFaces, oursDocs.fonts.nonNextjsFaces, "nonNextjsFontFaces (zero webfonts both)", out);
  diff("[docs]", refDocs.fonts.preloadFonts, oursDocs.fonts.preloadFonts, "preloadFonts (none both)", out);
  diff("[docs]", refDocs.fonts.googleFonts, oursDocs.fonts.googleFonts, "googleFontsLinks (none both)", out);
  // the sitemap — the documented superset (the reference ships ONE
  // url; ours the deep-linkable public family), pinned per side
  expectConst("[docs]", "REF", ["/"], refDocs.sitemapUrls, out);
  expectConst("[docs]", "OURS", ["/", "/login", "/signup", "/reset-password"], oursDocs.sitemapUrls, out);
  // the favicon-link family + the fetched icon bytes + the manifest
  // icon srcs — the reference's own defects (the svg+xml type-lie, no
  // sizes, no apple icon, the CDN srcs) vs OUR honest-type superset,
  // pinned per side
  expectConst(
    "[docs]",
    "REF",
    [{ rel: "icon", type: "image/svg+xml", sizes: null }],
    refDocs.iconLinks,
    out,
  );
  expectConst(
    "[docs]",
    "OURS",
    [
      { rel: "icon", type: "image/png", sizes: "512x512" },
      { rel: "apple-touch-icon", type: "image/png", sizes: "180x180" },
    ],
    oursDocs.iconLinks,
    out,
  );
  expectConst("[docs]", "REF", "484f2cf504efd30bb0827e42b4ebb89f206d48b7", refDocs.iconSha1, out);
  expectConst("[docs]", "OURS", "bd6f57945c42055a8f3cbfc702d7e34803854968", oursDocs.iconSha1, out);
  expectConst(
    "[docs]",
    "REF",
    [
      "https://media.base44.com/images/public/69ca8f9d112e0923462fae91/283cae1f1_logo.png/v1/fit/w_192,h_192/283cae1f1_logo.png",
      "https://media.base44.com/images/public/69ca8f9d112e0923462fae91/283cae1f1_logo.png/v1/fit/w_512,h_512/283cae1f1_logo.png",
    ],
    refDocs.manifest.iconSrcs,
    out,
  );
  expectConst("[docs]", "OURS", ["/icon.png", "/icon.png"], oursDocs.manifest.iconSrcs, out);
  // the og:image dimension/alt trio — the reference's /login-ONLY
  // platform variance ("Base44 link preview"), ours the every-page
  // width/height superset matching its declared 1200x630, no alt
  expectConst("[docs]", "REF", { width: null, height: null, alt: null }, refDocs.ogImageMeta, out);
  expectConst("[docs]", "OURS", { width: "1200", height: "630", alt: null }, oursDocs.ogImageMeta, out);
}

// The round-25 [routes] leg — the mirrored families diffed directly;
// the per-side mechanics (status, trailing slash, the guest wall)
// pinned per side.
{
  const refRoutes = await routesFace(REF);
  const oursRoutes = await routesFace(OURS);
  // the derived-title family — IDENTICAL both apps after the round-25
  // cure (the reference derives; ours mirrors through the seam)
  for (const p of Object.keys(refRoutes.titles)) {
    diff("[routes]", refRoutes.titles[p], oursRoutes.titles[p], `derivedTitle ${p} (the pathname-derived 404 title — F-25a)`, out);
    diff("[routes]", refRoutes.quoted[p], oursRoutes.quoted[p], `quotedPath ${p} (the designed 404's interpolated path)`, out);
  }
  // the STATUS family — per-side constants (the reference's SPA
  // answers 200 everywhere — its own platform artifact; OURS keeps
  // the TRUE 404 status, the documented superset)
  expectConst("[routes]", "REF", Object.fromEntries(
    Object.keys(refRoutes.statuses).map((p) => [p, 200]),
  ), refRoutes.statuses, out);
  expectConst("[routes]", "OURS", Object.fromEntries(
    Object.keys(oursRoutes.statuses).map((p) => [p, 404]),
  ), oursRoutes.statuses, out);
  // the trailing-slash family — per-side constants (the reference's
  // /login/ falls to its designed 404; OURS 308-normalizes to the
  // canonical /login — the web-correct superset, never broken to match)
  expectConst("[routes]", "REF", {
    finalPath: "/login/",
    title: "Login | EleganceFlow",
    status: 200,
    quoted: "login/",
  }, refRoutes.slash, out);
  expectConst("[routes]", "OURS", {
    finalPath: "/login",
    title: "EleganceFlow",
    status: 200,
    quoted: null,
  }, oursRoutes.slash, out);
  // the query passthrough — diffed (IDENTICAL both apps: the real
  // login family, the bare-brand title)
  diff("[routes]", refRoutes.query.finalPath, oursRoutes.query.finalPath, "queryPassthrough finalPath (F-25d)", out);
  diff("[routes]", refRoutes.query.title, oursRoutes.query.title, "queryPassthrough title (F-25d)", out);
  // the guest /dashboard adjudication — per-side constants (the
  // reference's designed 404 with its derived title vs OUR from_url
  // wall — the superset inbox's own guard)
  expectConst("[routes]", "REF", {
    finalPath: "/dashboard",
    fromUrlTarget: null,
    title: "Dashboard | EleganceFlow",
    quoted: "dashboard",
  }, refRoutes.dash, out);
  expectConst("[routes]", "OURS", {
    finalPath: "/login",
    fromUrlTarget: "http://localhost:3000/dashboard",
    title: "EleganceFlow",
    quoted: null,
  }, oursRoutes.dash, out);
  // Round-27 (F-27d) EXTENSION: the post-Go-Home title ride — diffed
  // both apps (IDENTICAL after the cure: both reset to the bare brand
  // at "/"; the pre-cure OURS face read "Probe 27 | EleganceFlow"
  // PERSISTED on the landing — the React title-skip decode)
  diff("[routes]", refRoutes.goHome.before, oursRoutes.goHome.before, "goHome titleBefore (the derived 404 title)", out);
  diff("[routes]", refRoutes.goHome.finalPath, oursRoutes.goHome.finalPath, "goHome finalPath (the landing)", out);
  diff("[routes]", refRoutes.goHome.title, oursRoutes.goHome.title, "goHome titleAfter (the stale-title cure — the bare brand)", out);
}

// The round-26 [reset] leg — the PLATFORM RESET FAMILY census: the
// /reset-password route's own faces (the auth-surface-expansion family
// no probe ever rode — round-24 read the route's TITLES alone). The
// reference renders the base44 PLATFORM's own reset family there — a
// different design system from its own login card (its login input
// computes 48px/12px/slate at 1280; its reset input 44px/6px/gray) —
// and OURS now mirrors it after the F-26a/b/c cure: the Title-Case
// text quartet, the BreadcrumbList JSON-LD (the third carrier), the
// flat gray-50 page, the white rounded-lg(8px) shadow-lg card, the
// FIXED 48/48/40 inner, the 24px h2 gray-900 headings, the h-11/6px
// gray controls with the zinc-500 placeholder ink, the 2px gray-900
// strip on the token form alone, the red-100 80×40 icon on the
// invalid-link card, the zinc-950-on-red-50/50 error box. Diffed REF
// vs OURS (BOTH apps ship the platform family — the round's parity
// proof); the TWO oklab-vs-rgba fills (the input + the error box)
// pinned per-side against their RECORDED constants (the s18
// serialization class, numerically equal paint — the google-leg
// expectConst pattern), the v3/v4 shadow-shim prefixes stripped so
// the PAYLOAD diffs (the same paint, 2 vs 4 zero-shims).
async function resetFace(url: string) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  // the invalid-link state (no token)
  await page.goto(url + "/reset-password", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1800);
  const invalid = await page.evaluate(() => {
    const card = (() => {
      let el: HTMLElement | null = (document.querySelector("button") as HTMLElement | null);
      for (let i = 0; i < 8 && el?.parentElement; i++) {
        el = el.parentElement;
        const s = getComputedStyle(el);
        if (s.boxShadow !== "none" || (s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== "transparent")) return el;
      }
      return null;
    })();
    const h2 = document.querySelector("h1, h2") as HTMLElement | null;
    const btn = document.querySelector("button") as HTMLElement | null;
    const iconWrap = (document.querySelector("svg") as SVGSVGElement | null)?.parentElement ?? null;
    const icon = document.querySelector("svg");
    if (!card || !h2 || !btn || !iconWrap || !icon) return null;
    const gs = (el: Element) => getComputedStyle(el);
    const shadowPayload = gs(card).boxShadow
      // strip the v3/v4 zero-shims (rgba(0,0,0,0) 0px 0px 0px 0px, ) —
      // a split(", ") would shatter the rgba() itself (its inner
      // commas); the global replace is the shatter-proof form
      .replace(/rgba\(0, 0, 0, 0\) 0px 0px 0px 0px, /g, "");
    return {
      headingTag: h2.tagName.toLowerCase(),
      headingText: h2.textContent?.trim() ?? "",
      headingFont: gs(h2).fontSize,
      headingWeight: gs(h2).fontWeight,
      headingColor: gs(h2).color,
      headingTracking: gs(h2).letterSpacing,
      bodyText: (document.querySelector("p")?.textContent ?? "").trim(),
      btnText: btn.textContent?.trim() ?? "",
      btnH: Math.round(btn.getBoundingClientRect().height),
      btnRadius: gs(btn).borderRadius,
      btnBg: gs(btn).backgroundColor,
      iconW: Math.round(iconWrap.getBoundingClientRect().width),
      iconBg: gs(iconWrap).backgroundColor,
      iconColor: gs(icon).color,
      iconSize: Math.round(icon.getBoundingClientRect().width),
      cardBg: gs(card).backgroundColor,
      cardRadius: gs(card).borderRadius,
      cardShadowPayload: shadowPayload,
      hasStrip: !!card.querySelector(".absolute.top-0, .absolute.inset-x-0"),
      jsonLdName: /"name": "([^"]+)"/.exec(
        document.querySelector('script[type="application/ld+json"]')?.textContent ?? "")?.[1] ?? "",
    };
  });
  // the token state + the bogus-token submit's error face
  await page.goto(url + "/reset-password?token=drift-r26-bogus", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1800);
  const token = await page.evaluate(() => {
    // app-agnostic card walk — the reference's SPA carries no <main>
    const card = (() => {
      let el: HTMLElement | null = (document.querySelector("form") as HTMLElement | null);
      for (let i = 0; i < 8 && el?.parentElement; i++) {
        el = el.parentElement;
        const s = getComputedStyle(el);
        if (s.boxShadow !== "none" || (s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== "transparent")) return el;
      }
      return null;
    })();
    const form = document.querySelector("form");
    const input = form?.querySelector("input") as HTMLInputElement | null;
    const btn = form?.querySelector('button[type="submit"]') as HTMLElement | null;
    const h2 = document.querySelector("h1, h2") as HTMLElement | null;
    const labels = [...document.querySelectorAll("label")].map((l) => l.textContent?.trim() ?? "");
    const strip = card?.querySelector(".absolute.top-0, .absolute.inset-x-0") as HTMLElement | null;
    const hint = [...document.querySelectorAll("p")].find((p) => p.textContent?.includes("at least 8 characters")) as HTMLElement | null;
    const sub = [...document.querySelectorAll("p")].find((p) => p.textContent?.includes("Enter your new password")) as HTMLElement | null;
    const back = [...document.querySelectorAll("button")].pop() as HTMLElement | null;
    const icon = form?.querySelector("svg");
    if (!card || !input || !btn || !h2 || !back) return null;
    const gs = (el: Element) => getComputedStyle(el);
    return {
      headingText: h2.textContent?.trim() ?? "",
      headingFont: gs(h2).fontSize,
      headingColor: gs(h2).color,
      subText: sub?.textContent?.trim() ?? "",
      subColor: sub ? gs(sub).color : "",
      labels,
      labelColor: document.querySelector("label") ? gs(document.querySelector("label") as Element).color : "",
      hintFont: hint ? gs(hint).fontSize : "",
      hintColor: hint ? gs(hint).color : "",
      inputH: Math.round(input.getBoundingClientRect().height),
      inputRadius: gs(input).borderRadius,
      inputBorder: gs(input).borderColor,
      ph: getComputedStyle(input, "::placeholder").color,
      inputText: gs(input).color,
      iconSize: icon ? Math.round(icon.getBoundingClientRect().width) : 0,
      stripH: strip ? Math.round(strip.getBoundingClientRect().height) : null,
      stripBg: strip ? gs(strip).backgroundColor : "",
      btnText: btn.textContent?.trim() ?? "",
      btnH: Math.round(btn.getBoundingClientRect().height),
      btnRadius: gs(btn).borderRadius,
      btnBg: gs(btn).backgroundColor,
      backText: back.textContent?.trim() ?? "",
      backColor: gs(back).color,
      jsonLdName: /"name": "([^"]+)"/.exec(
        document.querySelector('script[type="application/ld+json"]')?.textContent ?? "")?.[1] ?? "",
    };
  });
  const tabStops: string[] = [];
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    const stop = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return "(body)";
      return `${el.tagName.toLowerCase()}#${el.id || ""}`;
    });
    if (stop === "(body)") break;
    tabStops.push(stop);
  }
  await page.locator("form input").nth(0).fill("ValidPass123!");
  await page.locator("form input").nth(1).fill("ValidPass123!");
  await page.locator('form button[type="submit"]').click();
  await page.waitForTimeout(2400);
  const error = await page.evaluate(() => {
    const el = [...document.querySelectorAll("div, p")].find((e) => e.textContent?.trim() === "Invalid or expired reset token") as HTMLElement | null;
    const input = document.querySelector("form input") as HTMLInputElement | null;
    if (!el || !input) return null;
    const s = getComputedStyle(el);
    return {
      errorText: el.textContent?.trim() ?? "",
      errorColor: s.color,
      errorBg: s.backgroundColor,
      errorFont: s.fontSize,
      errorRadius: s.borderRadius,
      errorPad: s.padding,
      errorRole: el.getAttribute("role") ?? "",
      inputBg: getComputedStyle(input).backgroundColor,
    };
  });
  await context.close();
  return { invalid, token, error, tabStops };
}

{
  const refReset = await resetFace(REF);
  const oursReset = await resetFace(OURS);
  if (!refReset.invalid || !oursReset.invalid || !refReset.token || !oursReset.token || !refReset.error || !oursReset.error) {
    out.push("[reset] FACE READ FAILURE — a null face (the leg never completed)");
  } else {
    // the invalid-link state — the family diffed (F-26a/c)
    diff("[reset]", refReset.invalid.headingTag, oursReset.invalid.headingTag, "invalid headingTag (h2)", out);
    diff("[reset]", refReset.invalid.headingText, oursReset.invalid.headingText, "invalid headingText (F-26a: Invalid Reset Link)", out);
    diff("[reset]", refReset.invalid.headingFont, oursReset.invalid.headingFont, "invalid headingFont (24px)", out);
    diff("[reset]", refReset.invalid.headingWeight, oursReset.invalid.headingWeight, "invalid headingWeight (700)", out);
    diff("[reset]", refReset.invalid.headingColor, oursReset.invalid.headingColor, "invalid headingColor (gray-900)", out);
    diff("[reset]", refReset.invalid.headingTracking, oursReset.invalid.headingTracking, "invalid headingTracking (normal)", out);
    diff("[reset]", refReset.invalid.bodyText, oursReset.invalid.bodyText, "invalid bodyText", out);
    diff("[reset]", refReset.invalid.btnText, oursReset.invalid.btnText, "invalid btnText (F-26a: Back to Login)", out);
    diff("[reset]", refReset.invalid.btnH, oursReset.invalid.btnH, "invalid btnH (44)", out);
    diff("[reset]", refReset.invalid.btnRadius, oursReset.invalid.btnRadius, "invalid btnRadius (6px)", out);
    diff("[reset]", refReset.invalid.btnBg, oursReset.invalid.btnBg, "invalid btnBg (gray-900)", out);
    diff("[reset]", refReset.invalid.iconW, oursReset.invalid.iconW, "invalid iconW (80)", out);
    diff("[reset]", refReset.invalid.iconBg, oursReset.invalid.iconBg, "invalid iconBg (red-100)", out);
    diff("[reset]", refReset.invalid.iconColor, oursReset.invalid.iconColor, "invalid iconColor (red-600)", out);
    diff("[reset]", refReset.invalid.iconSize, oursReset.invalid.iconSize, "invalid iconSize (40)", out);
    diff("[reset]", refReset.invalid.cardBg, oursReset.invalid.cardBg, "invalid cardBg (white)", out);
    diff("[reset]", refReset.invalid.cardRadius, oursReset.invalid.cardRadius, "invalid cardRadius (8px)", out);
    diff("[reset]", refReset.invalid.cardShadowPayload, oursReset.invalid.cardShadowPayload, "invalid cardShadowPayload (shadow-lg, the shims stripped — the s18 class)", out);
    diff("[reset]", refReset.invalid.hasStrip, oursReset.invalid.hasStrip, "invalid hasStrip (NO strip on this state — F-26c)", out);
    diff("[reset]", refReset.invalid.jsonLdName, oursReset.invalid.jsonLdName, "invalid jsonLdName (reset password — F-26b)", out);
    // the token-form state — the family diffed
    diff("[reset]", refReset.token.headingText, oursReset.token.headingText, "token headingText (Set new password)", out);
    diff("[reset]", refReset.token.headingFont, oursReset.token.headingFont, "token headingFont (24px)", out);
    diff("[reset]", refReset.token.headingColor, oursReset.token.headingColor, "token headingColor (gray-900)", out);
    diff("[reset]", refReset.token.subText, oursReset.token.subText, "token subText", out);
    diff("[reset]", refReset.token.subColor, oursReset.token.subColor, "token subColor (gray-600)", out);
    diff("[reset]", refReset.token.labels, oursReset.token.labels, "token labels (F-26a: New Password / Confirm New Password)", out);
    diff("[reset]", refReset.token.labelColor, oursReset.token.labelColor, "token labelColor (gray-700)", out);
    diff("[reset]", refReset.token.hintFont, oursReset.token.hintFont, "token hintFont (12px)", out);
    diff("[reset]", refReset.token.hintColor, oursReset.token.hintColor, "token hintColor (gray-500)", out);
    diff("[reset]", refReset.token.inputH, oursReset.token.inputH, "token inputH (44 — h-11 FIXED, the login ladder retired)", out);
    diff("[reset]", refReset.token.inputRadius, oursReset.token.inputRadius, "token inputRadius (6px)", out);
    diff("[reset]", refReset.token.inputBorder, oursReset.token.inputBorder, "token inputBorder (gray-200)", out);
    diff("[reset]", refReset.token.ph, oursReset.token.ph, "token placeholderInk (zinc-500, the v3 literal)", out);
    diff("[reset]", refReset.token.inputText, oursReset.token.inputText, "token inputText (zinc-950)", out);
    diff("[reset]", refReset.token.iconSize, oursReset.token.iconSize, "token iconSize (16)", out);
    diff("[reset]", refReset.token.stripH, oursReset.token.stripH, "token stripH (2px — F-26c)", out);
    diff("[reset]", refReset.token.stripBg, oursReset.token.stripBg, "token stripBg (gray-900)", out);
    diff("[reset]", refReset.token.btnText, oursReset.token.btnText, "token btnText (Reset password)", out);
    diff("[reset]", refReset.token.btnH, oursReset.token.btnH, "token btnH (44)", out);
    diff("[reset]", refReset.token.btnRadius, oursReset.token.btnRadius, "token btnRadius (6px)", out);
    diff("[reset]", refReset.token.btnBg, oursReset.token.btnBg, "token btnBg (gray-900)", out);
    diff("[reset]", refReset.token.backText, oursReset.token.backText, "token backText (Back to login — the sentence-case keep)", out);
    diff("[reset]", refReset.token.backColor, oursReset.token.backColor, "token backColor (gray-600)", out);
    diff("[reset]", refReset.token.jsonLdName, oursReset.token.jsonLdName, "token jsonLdName (reset password — F-26b)", out);
    diff("[reset]", refReset.tabStops, oursReset.tabStops, "token tabStops (password → confirm → submit → back)", out);
    // the error face — the text/chrome family diffed
    diff("[reset]", refReset.error.errorText, oursReset.error.errorText, "errorText (Invalid or expired reset token)", out);
    diff("[reset]", refReset.error.errorColor, oursReset.error.errorColor, "errorColor (zinc-950)", out);
    diff("[reset]", refReset.error.errorFont, oursReset.error.errorFont, "errorFont (16px)", out);
    diff("[reset]", refReset.error.errorRadius, oursReset.error.errorRadius, "errorRadius (8px)", out);
    diff("[reset]", refReset.error.errorPad, oursReset.error.errorPad, "errorPad (16px)", out);
    diff("[reset]", refReset.error.errorRole, oursReset.error.errorRole, "errorRole (alert — the platform's own announcement)", out);
    // the TWO oklab-vs-rgba fills — per-side RECORDED constants (the s18
    // serialization class: numerically equal paint, different
    // serialization — REF rgba vs OURS oklab)
    expectConst("[reset]", "REF", {
      errorBg: "rgba(254, 242, 242, 0.5)",
      inputBg: "rgba(249, 250, 251, 0.5)",
    }, { errorBg: refReset.error.errorBg, inputBg: refReset.error.inputBg }, out);
    expectConst("[reset]", "OURS", {
      errorBg: "oklab(0.970522 0.0123999 0.00388682 / 0.5)",
      inputBg: "oklab(0.984619 -0.000598699 -0.00156033 / 0.5)",
    }, { errorBg: oursReset.error.errorBg, inputBg: oursReset.error.inputBg }, out);
  }
}

// The round-28 [reveal] leg — the SCROLL-REVEAL/MOTION census: the
// twenty-element family no probe ever rode at rest (the parity probe's
// pick() reads bg/color/fs/fw/lh — transform-independent; every drift
// leg reads faces/attrs/class strings; full-page captures auto-reveal;
// Playwright's visible is opacity-agnostic — F-28c, the coverage
// catch). Read on BOTH apps at 1280 + 390: the at-rest hidden family
// (opacity 0 + the live-probed offsets), the mid-flight motion
// presence (a real wheel scroll → opacity strictly between 0 and 1 —
// the motion EXISTS on both apps), the post-reveal end state (opacity
// 1 / transform none — our prior static face, the reason every
// at-load probe passed while the motion was absent), and the
// transition-mechanism constants per side (the reference animates via
// a raf loop — its computed transition stays 0s; OURS decodes the same
// two properties through a CSS transition — 0.8s — the expectConst
// pattern; the services cards ride the cards' OWN class transition on
// both apps: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` IDENTICAL).
type RevealFace = {
  atRest: {
    about: string[];
    services: string[];
    contact: string[];
  };
  heroSettled: string[];
  mountSettled: { portfolio: string[]; testimonials: string[] };
  midFlight: string[];
  postReveal: string[];
  transitionDuration: { about: string; services: string };
};

async function revealFace(url: string, w: number, h: number): Promise<RevealFace> {
  const context = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await context.newPage();
  try {
    // THE EARLY READ — the at-rest initial family at the FIRST STYLED
    // MOMENT (waitForSelector on the LAST family member = the whole
    // landing DOM parsed; ours is the pre-hydration SSR, theirs is the
    // SPA mount). Reading here — NOT at networkidle+900 — dodges the
    // reference's own racy auto-reveal (the portfolio/testimonials
    // members flip to revealed ~1-3s after mount on ~half its loads:
    // F-28d, recorded in the plan doc; the mount-time initial styles
    // are the stable 3/3 face).
    await page.goto(url, { waitUntil: "commit" });
    await page.waitForSelector("#contact > div > div", { timeout: 20000 });
    const atRest = await page.evaluate(() => {
      const f = (sel: string) =>
        [...document.querySelectorAll(sel)].map(
          (k) => `${getComputedStyle(k).opacity}|${getComputedStyle(k).transform}`,
        );
      // the DETERMINISTIC scroll family only — about/services/contact
      // stay hidden until scrolled on every load; the portfolio/
      // testimonials mount family is read LATE (settled) below
      return {
        about: f("#about > div > div"),
        services: f("#services .grid > div"),
        contact: f("#contact > div > div"),
      };
    });
    // the transition-mechanism constants, read while the inline styles
    // are live (ours hidden-with-inline-transition = 0.8s; the
    // reference's raf family = 0s — its computed transition never
    // changes; the services cards' OWN class = 0.3s on both)
    const transitionDuration = await page.evaluate(() => ({
      about: getComputedStyle(document.querySelector("#about > div > div")!).transitionDuration,
      services: getComputedStyle(document.querySelector("#services .grid > div")!).transitionDuration,
    }));
    // the hero cascade settles (~1.6s after mount) — read the
    // post-cascade state (1/none on both apps) PLUS the mount family
    // (portfolio/testimonials: the reference's own dominant load
    // behavior — auto-revealed by ~400ms post-mount; ours the wired
    // mount-time family — both settled 1/none at this read)
    await page.waitForTimeout(2600);
    const heroSettled = await page.evaluate(() =>
      [document.querySelector(".max-w-3xl"), document.querySelector(".max-w-3xl > p"), document.querySelector("h1 span")].map(
        (el) => (el ? `${getComputedStyle(el).opacity}|${getComputedStyle(el).transform}` : "MISSING"),
      ),
    );
    const mountSettled = await page.evaluate(() => {
      const f = (sel: string) =>
        [...document.querySelectorAll(sel)].map(
          (k) => `${getComputedStyle(k).opacity}|${getComputedStyle(k).transform}`,
        );
      return {
        portfolio: f("#portfolio .grid > div").slice(0, 2),
        testimonials: f("#testimonials .md\\:col-span-3 > div"),
      };
    });
    // the ride: a REAL wheel scroll to the about section — sample mid-flight
    await page.mouse.wheel(0, Math.round(h * 1.1));
    await page.waitForTimeout(380);
    const midFlight = await page.evaluate(() =>
      [...document.querySelectorAll("#about > div > div")].map((k) => getComputedStyle(k).opacity),
    );
    // the end state: wait out the animation (~800ms family)
    await page.waitForTimeout(1300);
    const postReveal = await page.evaluate(() =>
      [...document.querySelectorAll("#about > div > div")].map(
        (k) => `${getComputedStyle(k).opacity}|${getComputedStyle(k).transform}`,
      ),
    );
    return { atRest, heroSettled, mountSettled, midFlight, postReveal, transitionDuration };
  } finally {
    await context.close();
  }
}

for (const [w, h] of [[1280, 800], [390, 844]] as const) {
  const [refReveal, oursReveal] = await Promise.all([revealFace(REF, w, h), revealFace(OURS, w, h)]);
  const label = `[reveal${w}]`;
  diff(label, refReveal.atRest.about, oursReveal.atRest.about, "atRest.about (∓40X, opacity 0 — F-28a)", out);
  diff(label, refReveal.atRest.services, oursReveal.atRest.services, "atRest.services (+30Y, opacity 0)", out);
  diff(label, refReveal.atRest.contact, oursReveal.atRest.contact, "atRest.contact (∓30X, opacity 0)", out);
  diff(label, refReveal.heroSettled, oursReveal.heroSettled, "heroSettled (post-cascade 1/none — in view at load)", out);
  diff(label, refReveal.mountSettled.portfolio, oursReveal.mountSettled.portfolio, "mountSettled.portfolio (1/none — the mount family, live-sampled ~400ms post-mount)", out);
  diff(label, refReveal.mountSettled.testimonials, oursReveal.mountSettled.testimonials, "mountSettled.testimonials (1/none — the mount family)", out);
  diff(label, refReveal.postReveal, oursReveal.postReveal, "postReveal.about (1/none — the static face)", out);
  // the motion EXISTS on both apps: mid-flight strictly between 0 and 1
  const refMotion = refReveal.midFlight.every((o) => Number(o) > 0 && Number(o) < 1);
  const oursMotion = oursReveal.midFlight.every((o) => Number(o) > 0 && Number(o) < 1);
  diff(label, refMotion, oursMotion, "midFlight motion presence (0 < opacity < 1 on both apps)", out);
  // the transition-mechanism constants per side (the raf vs CSS decode)
  expectConst(label, "REF", { about: "0s", services: "0.3s" }, refReveal.transitionDuration, out);
  expectConst(label, "OURS", { about: "0.8s", services: "0.3s" }, oursReveal.transitionDuration, out);
}

// The round-29 [motion-prefs] leg — the PREFERS-REDUCED-MOTION census
// (the 17th): the media condition no probe ever emulated (the parity
// probe, every prior leg, the e2e suite and the captures all run at
// default emulation). Under `reduce` the reference ships ZERO handling
// — its raf-driven reveal STILL animates the full progression (0.19 →
// 0.43 → 0.68 → 0.96 → 1 live-sampled) and its CSS transitions run at
// full duration (services 0.3s, header 0.5s) — while OURS collapses
// every CSS transition to 0.01ms (computed 1e-05s — the CRM-era
// globals block beating the reveal family's inline durations by the
// cascade; the deliberate a11y superset, F-29a, pinned by
// tests/reduced-motion-faces.test.ts). The IDENTICAL faces (the
// at-rest hidden family, the settled hero/mount family, the
// post-reveal end state, the scroll-behavior) are DIFFED; the
// divergence rides per-side recorded constants (the expectConst
// pattern — the scroll-behavior-smooth superset precedent). Runs at
// 1280 only: the family is viewport-independent global CSS.
type MotionPrefsFace = {
  reduceRules: string[];
  atRest: { about: string[]; services: string[]; contact: string[] };
  heroSettled: string[];
  mountSettled: { portfolio: string[]; testimonials: string[] };
  wheelSamples: string[];
  postReveal: string[];
  scrollBehavior: string;
  durations: { services: string; header: string };
};
async function motionPrefsFace(url: string): Promise<MotionPrefsFace> {
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "commit" });
    await page.waitForSelector("#contact > div > div", { timeout: 20000 });
    // the reduce-rules census: does the app's own CSS carry a
    // prefers-reduced-motion block at all? (REF: none; OURS: the one)
    const reduceRules = await page.evaluate(() => {
      const found: string[] = [];
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList;
        try {
          rules = sheet.cssRules;
        } catch {
          continue; // cross-origin sheet without CORS
        }
        for (const rule of Array.from(rules)) {
          if (rule instanceof CSSMediaRule && rule.media.mediaText.includes("prefers-reduced-motion")) {
            for (const inner of Array.from(rule.cssRules)) {
              found.push(`${rule.conditionText} :: ${(inner as CSSStyleRule).selectorText}`);
            }
          }
        }
      }
      return found;
    });
    // wait out both the reference's raf family and our hydration +
    // mount family (the [reveal] leg's own settle window) — read the
    // settled faces BEFORE any wheel (hydration-safe ordering)
    await page.waitForTimeout(2600);
    const atRest = await page.evaluate(() => {
      const f = (sel: string) =>
        [...document.querySelectorAll(sel)].map((k) => `${getComputedStyle(k).opacity}|${getComputedStyle(k).transform}`);
      return { about: f("#about > div > div"), services: f("#services .grid > div"), contact: f("#contact > div > div") };
    });
    const heroSettled = await page.evaluate(() =>
      [".max-w-3xl", ".max-w-3xl > p", "h1 span"].map((s) => {
        const el = document.querySelector(s);
        return el ? `${getComputedStyle(el).opacity}|${getComputedStyle(el).transform}` : "MISSING";
      }),
    );
    const mountSettled = await page.evaluate(() => {
      const f = (sel: string) =>
        [...document.querySelectorAll(sel)].map((k) => `${getComputedStyle(k).opacity}|${getComputedStyle(k).transform}`);
      return { portfolio: f("#portfolio .grid > div").slice(0, 2), testimonials: f("#testimonials .md\\:col-span-3 > div") };
    });
    // the wheel ride, sampled fine: REF animates (0 < o < 1 windows);
    // OURS snaps (0-or-1 samples only — no mid-flight window)
    await page.mouse.wheel(0, 900);
    const wheelSamples: string[] = [];
    let waited = 0;
    for (const t of [120, 140, 160, 280, 420, 700, 1100]) {
      await page.waitForTimeout(t - waited);
      waited = t;
      wheelSamples.push(await page.evaluate(() => [...document.querySelectorAll("#about > div > div")].map((k) => getComputedStyle(k).opacity).join(",")));
    }
    await page.waitForTimeout(1300);
    const postReveal = await page.evaluate(() =>
      [...document.querySelectorAll("#about > div > div")].map((k) => `${getComputedStyle(k).opacity}|${getComputedStyle(k).transform}`),
    );
    // the settled-mode durations (the inline styles cleared at settle —
    // read the services card's OWN class + the header's own class)
    const durations = await page.evaluate(() => {
      const card = document.querySelector("#services .grid > div");
      const h = document.querySelector("header");
      return {
        services: card ? getComputedStyle(card).transitionDuration : "MISSING",
        header: h ? getComputedStyle(h).transitionDuration : "MISSING",
      };
    });
    const scrollBehavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
    return { reduceRules, atRest, heroSettled, mountSettled, wheelSamples, postReveal, scrollBehavior, durations };
  } finally {
    await context.close();
  }
}

{
  const [refMp, oursMp] = await Promise.all([motionPrefsFace(REF), motionPrefsFace(OURS)]);
  const label = "[motion-prefs]";
  // the IDENTICAL faces — real diffs (must match under reduce)
  diff(label, refMp.atRest.about, oursMp.atRest.about, "atRest.about under reduce (hidden family identical)", out);
  diff(label, refMp.heroSettled, oursMp.heroSettled, "heroSettled under reduce (1/none — the cascade settles by snap)", out);
  diff(label, refMp.mountSettled.portfolio, oursMp.mountSettled.portfolio, "mountSettled.portfolio under reduce", out);
  diff(label, refMp.mountSettled.testimonials, oursMp.mountSettled.testimonials, "mountSettled.testimonials under reduce", out);
  diff(label, refMp.postReveal, oursMp.postReveal, "postReveal.about under reduce (1/none — never stuck hidden)", out);
  diff(label, refMp.scrollBehavior, oursMp.scrollBehavior, "scrollBehavior under reduce (smooth on both — the superset rides)", out);
  // the deliberate-superset divergence — per-side recorded constants
  expectConst(label, "REF", { rules: 0 }, { rules: refMp.reduceRules.length }, out);
  expectConst(label, "OURS", { rules: 1 }, { rules: oursMp.reduceRules.length }, out);
  expectConst(label, "REF", { services: "0.3s", header: "0.5s" }, refMp.durations, out);
  expectConst(label, "OURS", { services: "1e-05s", header: "1e-05s" }, oursMp.durations, out);
  // the mid-flight presence per side: REF animates (a strictly-between
  // sample exists); OURS snaps (every sample 0-or-1, the family
  // completes — the reduce-mode contract)
  const refAnimates = refMp.wheelSamples.some((s) => s.split(",").some((o) => Number(o) > 0 && Number(o) < 1));
  const oursSnaps =
    oursMp.wheelSamples.every((s) => s.split(",").every((o) => o === "0" || o === "1")) &&
    oursMp.wheelSamples[oursMp.wheelSamples.length - 1].split(",").every((o) => o === "1");
  expectConst(label, "REF", { midFlight: "animates" }, { midFlight: refAnimates ? "animates" : "no-motion" }, out);
  expectConst(label, "OURS", { midFlight: "snaps" }, { midFlight: oursSnaps ? "snaps" : "animates" }, out);
}

// The round-30 BODY-INK/PRINT-MEDIA census leg — the element no probe
// ever read (the parity pick() list starts at the header; every drift
// leg reads its own family) under a media condition no probe ever
// emulated (print). F-30a: the BODY element's own color face diverges
// (the round-13 single-token re-pin's sacrificed side — REF's landing
// bundle ships the stock shadcn neutral-950 `hsl(var(--foreground))`
// while OURS computes zinc-950 via --color-foreground, the value the
// reference's PLATFORM bundle inks its auth card with). DEAD on both
// sides (zero true riders — pinned by tests/body-ink-faces.test.ts).
// F-30b: under print emulation both apps compute identical faces and
// ship ZERO @media print rules (the reference's own zero-handling
// posture, recorded per-side, never mirrored).
interface BodyInkFace {
  htmlColor: string;
  bodyColor: string;
  bodyBg: string;
  footerColor: string;
  print: {
    headerPosition: string;
    heroH1Color: string;
    bodyBg: string;
    printColorAdjust: string;
    navDisplay: string;
  };
  printRules: number;
}
async function bodyInkFace(url: string): Promise<BodyInkFace> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "commit" });
    await page.waitForSelector("header", { timeout: 20000 });
    await page.waitForTimeout(2000);
    // the at-rest element faces at SCREEN emulation (the F-30a census)
    const screen = await page.evaluate(() => ({
      htmlColor: getComputedStyle(document.documentElement).color,
      bodyColor: getComputedStyle(document.body).color,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      footerColor: document.querySelector("footer") ? getComputedStyle(document.querySelector("footer")!).color : "MISSING",
    }));
    // the print-emulation sweep (F-30b): warm the reveals first (the
    // round-28 settle-wait precedent), then emulate and read
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
    await page.emulateMedia({ media: "print" });
    await page.waitForTimeout(300);
    const print = await page.evaluate(() => ({
      headerPosition: document.querySelector("header") ? getComputedStyle(document.querySelector("header")!).position : "MISSING",
      heroH1Color: document.querySelector("h1") ? getComputedStyle(document.querySelector("h1")!).color : "MISSING",
      bodyBg: getComputedStyle(document.body).backgroundColor,
      printColorAdjust: String(getComputedStyle(document.body).printColorAdjust),
      navDisplay: document.querySelector("header nav, nav") ? getComputedStyle(document.querySelector("header nav, nav")!).display : "MISSING",
    }));
    // the sheet print-rules census (stays under print emulation — the
    // CSSOM is emulation-independent, but read it in the same context)
    const printRules = await page.evaluate(() => {
      let count = 0;
      const walk = (list: CSSRuleList) => {
        for (const rule of Array.from(list)) {
          if (rule instanceof CSSMediaRule && /print/i.test(rule.conditionText ?? rule.media.mediaText)) count += 1;
          if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) walk(rule.cssRules);
        }
      };
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList;
        try {
          rules = sheet.cssRules;
        } catch {
          continue; // cross-origin sheet without CORS
        }
        walk(rules);
      }
      return count;
    });
    return { ...screen, print, printRules };
  } finally {
    await context.close();
  }
}

{
  const [refBi, oursBi] = await Promise.all([bodyInkFace(REF), bodyInkFace(OURS)]);
  const label = "[body-ink]";
  // the IDENTICAL faces — real diffs (the html element's UA-default ink,
  // the body bg, and the whole print sweep must match)
  diff(label, refBi.htmlColor, oursBi.htmlColor, "html.color (the UA default — no rule on either side)", out);
  diff(label, refBi.bodyBg, oursBi.bodyBg, "body.backgroundColor at screen (white on both)", out);
  diff(label, refBi.print, oursBi.print, "the print-emulation sweep (header fixed, the h1 white ink, the body bg, the economy adjust, the nav display)", out);
  // the recorded dead-face divergence — per-side constants (F-30a: the
  // single-token compromise's sacrificed side; DEAD on both apps — zero
  // true riders, pinned by tests/body-ink-faces.test.ts ②)
  expectConst(label, "REF", { body: "rgb(10, 10, 10)", footer: "rgb(10, 10, 10)" }, { body: refBi.bodyColor, footer: refBi.footerColor }, out);
  expectConst(label, "OURS", { body: "rgb(9, 9, 11)", footer: "rgb(9, 9, 11)" }, { body: oursBi.bodyColor, footer: oursBi.footerColor }, out);
  // the print-rules census — the reference's own zero-handling posture
  // (F-30b: both sides ship NONE; the white-on-white hazard of the dark
  // sections is the reference's own face, never mirrored)
  expectConst(label, "REF", { printRules: 0 }, { printRules: refBi.printRules }, out);
  expectConst(label, "OURS", { printRules: 0 }, { printRules: oursBi.printRules }, out);
}


// The round-31 FORCED-COLORS/THEME-FACE census leg — the LAST media
// axis in Playwright's emulateMedia surface no probe ever emulated
// (round-29 reduce · round-30 print · round-31 forced-colors — the set
// completes), plus the form-control theme faces (accent-color,
// color-scheme) the session-54 candidate list named as the alternate
// road. F-31a: under forcedColors: "active" both apps compute
// IDENTICAL faces on every probed element (the browser's
// system-palette collapse — CanvasText ink on Canvas surfaces, the
// CTA's LinkText blue) because neither app opts out (adjust auto,
// zero @media (forced-colors) rules on both sides — the reference's
// own zero-handling posture is the byte-mirror default). F-31b: the
// media-rule census walks CSSMediaRule objects, NEVER substrings —
// OURS' rendered @layer utilities block contains the STRING
// "forced-colors" (Tailwind v4's forced-color-adjust-* utility class
// definitions) which a substring census would miscount (the round-30
// .test( census-collision genus). F-31c: the featured card is selected
// by CONTENT (the "Design & Web" title's card ancestor) — the
// reference's own card div carries no bg-amber-500 class (its bundle
// inks the card by its own mechanism; OURS spells the class — the
// computed faces identical, the s11 doctrine). F-31d: the theme faces
// (accent-color auto, color-scheme normal, the zinc-950 login caret) —
// neither app declares either property.
interface ForcedColorsFace {
  sweep: {
    htmlColor: string;
    heroH1Color: string;
    ctaColor: string;
    featuredBg: string;
    featuredInk: string;
    firstCardBg: string;
    servicesH2Color: string;
    inputBg: string;
    selectBg: string;
    footerColor: string;
    adjustH1: string;
    adjustFeatured: string;
  };
  theme: {
    accentColor: string;
    colorScheme: string;
    htmlCaret: string;
    loginCaret: string;
  };
  forcedMediaRules: number;
}
async function forcedColorsFace(url: string): Promise<ForcedColorsFace> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "commit" });
    await page.waitForSelector("header", { timeout: 20000 });
    await page.waitForTimeout(2000);
    // the theme faces at SCREEN (F-31d — before any emulation)
    const theme = await page.evaluate(() => ({
      accentColor: getComputedStyle(document.documentElement).getPropertyValue("accent-color"),
      colorScheme: getComputedStyle(document.documentElement).getPropertyValue("color-scheme"),
      htmlCaret: getComputedStyle(document.documentElement).getPropertyValue("caret-color"),
    }));
    // the login caret (the platform family's zinc-950 face)
    await page.goto(url + "/login", { waitUntil: "commit" });
    await page.waitForSelector("form", { timeout: 20000 });
    await page.waitForTimeout(1000);
    const loginCaret = await page.evaluate(() => {
      const input = document.querySelector('input[type="email"]') as HTMLElement | null;
      return input ? getComputedStyle(input).getPropertyValue("caret-color") : "MISSING";
    });
    // the forced-colors sweep (F-31a): back to the landing, warm the
    // reveals (the round-28 settle-wait precedent), then emulate
    await page.goto(url, { waitUntil: "commit" });
    await page.waitForSelector("header", { timeout: 20000 });
    await page.waitForTimeout(1500);
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
    await page.emulateMedia({ forcedColors: "active" });
    await page.waitForTimeout(300);
    const sweep = await page.evaluate(() => {
      // the cross-app content selectors: the reference's featured card
      // carries NO bg-amber-500 class (F-31c) — select by TITLE
      const cardOf = (title: string): HTMLElement | null => {
        const h = Array.from(document.querySelectorAll("h3")).find((el) => (el.textContent ?? "").trim() === title);
        return h ? ((h.closest("div")?.parentElement as HTMLElement) ?? null) : null;
      };
      const featured = cardOf("Design & Web");
      const firstCard = cardOf("Creative Direction");
      const cta = Array.from(document.querySelectorAll("header a")).find((a) => (a.textContent ?? "").trim() === "Get in Touch") ?? null;
      const read = (el: Element | null, prop: string): string =>
        el ? String(getComputedStyle(el)[prop as keyof CSSStyleDeclaration]) : "MISSING";
      return {
        htmlColor: getComputedStyle(document.documentElement).color,
        heroH1Color: read(document.querySelector("h1"), "color"),
        ctaColor: read(cta, "color"),
        featuredBg: read(featured, "backgroundColor"),
        featuredInk: read(featured, "color"),
        firstCardBg: read(firstCard, "backgroundColor"),
        servicesH2Color: read(document.querySelector("#services h2"), "color"),
        inputBg: read(document.querySelector("#contact input"), "backgroundColor"),
        selectBg: read(document.querySelector("#contact select"), "backgroundColor"),
        footerColor: read(document.querySelector("footer"), "color"),
        adjustH1: document.querySelector("h1") ? getComputedStyle(document.querySelector("h1")!).getPropertyValue("forced-color-adjust") : "MISSING",
        adjustFeatured: featured ? getComputedStyle(featured).getPropertyValue("forced-color-adjust") : "MISSING",
      };
    });
    // the media-rules census (F-31b — the CSSMediaRule walk, NEVER the
    // substring: the utilities layer's class definitions don't count)
    const forcedMediaRules = await page.evaluate(() => {
      let count = 0;
      const walk = (list: CSSRuleList) => {
        for (const rule of Array.from(list)) {
          if (rule instanceof CSSMediaRule && /forced-colors/i.test(rule.conditionText ?? rule.media.mediaText)) count += 1;
          if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) walk(rule.cssRules);
        }
      };
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList;
        try {
          rules = sheet.cssRules;
        } catch {
          continue; // cross-origin sheet without CORS
        }
        walk(rules);
      }
      return count;
    });
    return { sweep, theme: { ...theme, loginCaret }, forcedMediaRules };
  } finally {
    await context.close();
  }
}

{
  const [refFc, oursFc] = await Promise.all([forcedColorsFace(REF), forcedColorsFace(OURS)]);
  const label = "[forced-colors]";
  // the IDENTICAL faces — real diffs (the whole forced-colors sweep +
  // the theme faces must match: the system-palette collapse reaches
  // everything identically, and neither app declares the theme props)
  diff(label, refFc.sweep, oursFc.sweep, "the forced-colors face sweep (the system-palette collapse — CanvasText/Canvas/LinkText on every probed element)", out);
  diff(label, refFc.theme, oursFc.theme, "the form-control theme faces (accent-color auto, color-scheme normal, the html + zinc-950 login carets)", out);
  // the per-side constants — the media-rule census (F-31b: ZERO rules
  // both sides, the CSSMediaRule walk; the reference's own zero-handling
  // posture is the byte-mirror default, pinned by
  // tests/forced-colors-faces.test.ts)
  expectConst(label, "REF", { forcedMediaRules: 0 }, { forcedMediaRules: refFc.forcedMediaRules }, out);
  expectConst(label, "OURS", { forcedMediaRules: 0 }, { forcedMediaRules: oursFc.forcedMediaRules }, out);
}

// Round-32 (F-32a/F-32c): the COLOR-SCHEME census leg (the 20th) — the
// one emulateMedia axis round-31 excepted ("the reference ships no
// dark-mode face to probe" — the session-56 candidate list's first
// road). Both apps censused under colorScheme "dark" AND "light":
// nothing moves on either side (the faces are the at-screen constants),
// neither app declares color-scheme (html computes normal), and neither
// ships a prefers-color-scheme media rule (the CSSMediaRule walk — the
// counting rule must match the thing counted, the round-31 lesson
// applied to the scheme axis). The known per-side constants (the
// body-ink dead face, the login email's s18 serialization pair) are
// SCHEME-INVARIANT — they ride expectConst per side, never a cross-app
// diff (the numerically-equal-paint class). Pinned by
// tests/color-scheme-faces.test.ts.
interface SchemeSweep {
  htmlColorScheme: string;
  bodyBg: string;
  heroH1: string;
  footerBg: string;
}
interface SchemeFace {
  dark: SchemeSweep;
  light: SchemeSweep;
  // the known per-side constants (never cross-diffed): the body-ink
  // dead face (round-30) + the scrolled header's s18 serialization
  bodyColor: string;
  headerBg: string;
  loginDark: { emailBg: string };
  loginLight: { emailBg: string };
  schemeMediaRules: number;
}
async function schemeFace(url: string): Promise<SchemeFace> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const readSweep = () =>
    page.evaluate(() => {
      const read = (el: Element | null, prop: string): string =>
        el ? String(getComputedStyle(el)[prop as keyof CSSStyleDeclaration]) : "MISSING";
      return {
        htmlColorScheme: getComputedStyle(document.documentElement).getPropertyValue("color-scheme").trim(),
        bodyBg: read(document.body, "backgroundColor"),
        heroH1: read(document.querySelector("h1"), "color"),
        footerBg: read(document.querySelector("footer"), "backgroundColor"),
      };
    });
  try {
    await page.goto(url, { waitUntil: "commit" });
    await page.waitForSelector("header", { timeout: 20000 });
    await page.waitForTimeout(1500);
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
    // the dark leg
    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForTimeout(300);
    const dark = await readSweep();
    // the light leg
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForTimeout(300);
    const light = await readSweep();
    // the known per-side constants (read ONCE at dark — the
    // scheme-invariance legs prove they never move): the body-ink dead
    // face (round-30's recorded compromise) + the scrolled header's s18
    // serialization (the wheel left it scrolled; oklab-vs-rgba,
    // numerically equal paint)
    const { bodyColor, headerBg } = await page.evaluate(() => ({
      bodyColor: String(getComputedStyle(document.body).color),
      headerBg: String(getComputedStyle(document.querySelector("header")!).backgroundColor),
    }));
    // the scheme-rules census (F-32a: ZERO prefers-color-scheme rules —
    // the CSSMediaRule walk, never the substring)
    const schemeMediaRules = await page.evaluate(() => {
      let count = 0;
      const walk = (list: CSSRuleList) => {
        for (const rule of Array.from(list)) {
          if (rule instanceof CSSMediaRule && /prefers-color-scheme/i.test(rule.conditionText ?? rule.media.mediaText)) count += 1;
          if (rule instanceof CSSMediaRule || rule instanceof CSSSupportsRule) walk(rule.cssRules);
        }
      };
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList;
        try {
          rules = sheet.cssRules;
        } catch {
          continue; // cross-origin sheet without CORS
        }
        walk(rules);
      }
      return count;
    });
    // the login email family under both schemes (the s18 serialization
    // pair rides per-side constants — REF rgba vs OURS oklab, the same
    // numerically-equal paint; read per side, never cross-diffed)
    await page.goto(url + "/login", { waitUntil: "commit" });
    await page.waitForSelector("form", { timeout: 20000 });
    await page.waitForTimeout(1000);
    await page.emulateMedia({ colorScheme: "dark" });
    await page.waitForTimeout(300);
    const loginDark = await page.evaluate(() => {
      const input = document.querySelector('input[type="email"]') as HTMLElement | null;
      return { emailBg: input ? getComputedStyle(input).backgroundColor : "MISSING" };
    });
    await page.emulateMedia({ colorScheme: "light" });
    await page.waitForTimeout(300);
    const loginLight = await page.evaluate(() => {
      const input = document.querySelector('input[type="email"]') as HTMLElement | null;
      return { emailBg: input ? getComputedStyle(input).backgroundColor : "MISSING" };
    });
    return { dark, light, bodyColor, headerBg, loginDark, loginLight, schemeMediaRules };
  } finally {
    await context.close();
  }
}

// The round-35 [orientation] leg — the LANDSCAPE phone (844×390, the md
// boundary crossed from below): the closed-state header flip + the auth
// card's centering geometry + the print-landscape faces. The OPEN-menu
// rotation ride lives in the e2e battery (mobile-navigation.spec.ts —
// the state-coupled ride); this leg keeps the state-free faces.
async function orientationFace(url: string) {
  const context = await browser.newContext({ viewport: { width: 844, height: 390 } });
  const page = await context.newPage();
  try {
    await probeLoad(page, url);
    await page.waitForTimeout(1000);
    // the closed-state landscape landing: the hamburger retires, the
    // desktop nav + the amber CTA render, the h1 rides its md step
    const landing = await page.evaluate(() => {
      const cs = (el: Element | null | undefined) => (el ? getComputedStyle(el as HTMLElement) : null);
      const header = document.querySelector("header");
      const nav = header?.querySelector("nav");
      const desktopUl = nav?.querySelector("ul");
      const hamburger = [...(nav?.querySelectorAll("button") ?? [])].find((b) =>
        /menu/i.test(b.getAttribute("aria-label") ?? "") || b.querySelector("svg") !== null,
      );
      const cta = [...(nav?.querySelectorAll("a") ?? [])].find(
        (a) => !a.closest("ul") && (a.getAttribute("href") ?? "") !== "#",
      );
      const h1 = document.querySelector("h1");
      return {
        hamburgerDisplay: cs(hamburger)?.display ?? "",
        desktopNavDisplay: cs(desktopUl)?.display ?? "",
        headerCtaDisplay: cs(cta)?.display ?? "",
        h1Font: cs(h1)?.fontSize ?? "",
      };
    });
    // the auth card's landscape geometry: the max-w-md centering (x=198
    // — the exact (844−448)/2 decode) + the short-height scrollability
    await probeLoad(page, `${url}/login`);
    await page.waitForTimeout(1000);
    const login = await page.evaluate(() => {
      const card = document.querySelector("div.max-w-md") as HTMLElement | null;
      const r = card?.getBoundingClientRect();
      return {
        cardX: r ? Math.round(r.x) : -1,
        cardWidth: r ? Math.round(r.width) : -1,
        docScrollable: document.documentElement.scrollHeight > window.innerHeight,
      };
    });
    // the print-landscape family (the session-56 candidate 2 — the
    // round-30 print posture at the orientation axis): the faces hold
    // and ZERO @media print rules ride (the CSSMediaRule walk)
    await page.emulateMedia({ media: "print" });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => {});
    await page.waitForTimeout(1200);
    const print = await page.evaluate(() => {
      let printRules = 0;
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSMediaRule && rule.conditionText.includes("print")) printRules++;
          }
        } catch {
          /* cross-origin sheet */
        }
      }
      return {
        heroH1: getComputedStyle(document.querySelector("h1")!).color,
        bodyBg: getComputedStyle(document.body).backgroundColor,
        htmlInk: getComputedStyle(document.documentElement).color,
        printRules,
      };
    });
    return { landing, login, print };
  } finally {
    await context.close();
  }
}

{
  const [refO, oursO] = await Promise.all([orientationFace(REF), orientationFace(OURS)]);
  const label = "[orientation]";
  // the IDENTICAL faces — real diffs (the landscape family is the
  // positive census: the width-driven md flip, the max-w-md centering,
  // the zero-handling print posture — every face identical both apps)
  diff(label, refO.landing, oursO.landing, "the landscape landing's closed-state header flip (the hamburger retired, the desktop nav + CTA rendered, the h1's md step)", out);
  diff(label, refO.login, oursO.login, "the landscape login's card geometry (the max-w-md centering + the short-height scrollability)", out);
  diff(label, refO.print, oursO.print, "the print-landscape faces (the zero-handling posture at the orientation axis)", out);
}

{
  const [refS, oursS] = await Promise.all([schemeFace(REF), schemeFace(OURS)]);
  const label = "[color-scheme]";
  // the IDENTICAL faces — real diffs (both schemes' sweeps must match
  // cross-app: nothing moves on either app, so the at-screen parity
  // constants hold under emulation — the landing's mirrored family;
  // the known-divergent faces — the body-ink dead face and the scrolled
  // header's s18 serialization — ride expectConst below, never this diff)
  diff(label, refS.dark, oursS.dark, "the dark-emulation face sweep (nothing moves — the at-screen constants hold)", out);
  diff(label, refS.light, oursS.light, "the light-emulation face sweep (nothing moves — the at-screen constants hold)", out);
  // the nothing-moves contract PER SIDE (each app's dark === light —
  // the scheme answer would show here first if one ever shipped)
  diff(label, refS.dark, refS.light, "REF scheme-invariance (dark must equal light — the reference ships no dark face)", out);
  diff(label, oursS.dark, oursS.light, "OURS scheme-invariance (dark must equal light — no scheme answer ships)", out);
  diff(label, refS.loginDark, refS.loginLight, "REF login scheme-invariance (the email fill never moves)", out);
  diff(label, oursS.loginDark, oursS.loginLight, "OURS login scheme-invariance (the email fill never moves)", out);
  // the per-side constants — the scheme-invariant recorded faces: the
  // body-ink dead face (round-30) + the scrolled header's s18 pair +
  // the login email's s18 pair (REF rgba vs OURS oklab, numerically
  // equal paint; recorded, never cross-diffed)
  expectConst(label, "REF", "rgb(10, 10, 10)", refS.bodyColor, out);
  expectConst(label, "OURS", "rgb(9, 9, 11)", oursS.bodyColor, out);
  expectConst(label, "REF", "rgba(9, 9, 11, 0.95)", refS.headerBg, out);
  expectConst(label, "OURS", "oklab(0.140764 0.00120224 -0.00421676 / 0.95)", oursS.headerBg, out);
  expectConst(label, "REF", "rgba(248, 250, 252, 0.5)", refS.loginDark.emailBg, out);
  expectConst(label, "OURS", "oklab(0.984146 -0.00124145 -0.00314122 / 0.5)", oursS.loginDark.emailBg, out);
  // the scheme-rules census (F-32a: ZERO rules both sides)
  expectConst(label, "REF", { schemeMediaRules: 0 }, { schemeMediaRules: refS.schemeMediaRules }, out);
  expectConst(label, "OURS", { schemeMediaRules: 0 }, { schemeMediaRules: oursS.schemeMediaRules }, out);
}

// The round-37 STORAGE-FAMILY census leg — the axis no probe ever read
// (parity reads computed styles; this battery reads DOM/text/img/faces;
// no leg ever enumerated localStorage/sessionStorage). F-37b: the
// reference's platform writes localStorage key families per surface;
// OUR app writes ZERO keys everywhere (the zero-key posture — the
// session rides the httpOnly cookie, document.cookie reads empty; the
// platform families are base44 implementation, never mirrored — the
// storage face is not a rendered face). The analytics id is pinned by
// SHAPE, NEVER value — a random per-session id can't be value-pinned;
// the app_id by its 24-hex shape. The id's own family (six fresh
// sessions sampled): lowercase-alnum, variable length 20–22 — pinned
// as the 18–24 window (a format CHANGE — a UUID, a mixed charset, a
// long token — REDs; the generator's natural length variance
// absorbs). THE LEG'S OWN LIVE CATCH (born-red on its first run):
// localStorage is PER-ORIGIN state that accumulates across
// navigations — the login
// face AFTER a same-context landing visit carries the analytics four
// + i18nextLng (the union), while a fresh-context login visit carries
// i18nextLng alone (the per-page provenance — what the login's own
// script sets; recorded in AGENTS.md's storage note). The recorded
// constants below ride the leg's own navigation shape (landing first,
// then login — the accumulated face). Pinned alongside by
// tests/storage-faces.test.ts (the source-contract half: the app-wide
// zero-localStorage census + the single sanctioned sessionStorage
// seam).
interface StorageFace {
  landingLocal: string[];
  loginLocal: string[];
  landingSession: string[];
  loginSession: string[];
  analyticsIdShape: string;
  appIdShape: string;
}
async function storageFace(url: string): Promise<StorageFace> {
  // one fresh context per app — the storage surface is per-context
  // (the analytics id is per-session: a reused context would carry the
  // prior visit's keys and mask the provenance)
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  try {
    const keys = () =>
      page.evaluate(() => ({
        local: Object.keys(window.localStorage).sort(),
        session: Object.keys(window.sessionStorage).sort(),
      }));
    // the landing (guest): settle, then enumerate + decode the shapes
    await probeLoad(page, url);
    await page.waitForTimeout(1500);
    const landing = await keys();
    const shapes = await page.evaluate(() => {
      const id = window.localStorage.getItem("base44_analytics_session_id") ?? "";
      const app = window.localStorage.getItem("base44_app_id") ?? "";
      return {
        analyticsIdShape:
          id.length === 0
            ? "absent"
            : /^[0-9a-z]{18,24}$/.test(id)
              ? "lower-alnum-18-24"
              : "other",
        appIdShape:
          app.length === 0 ? "absent" : /^[0-9a-f]{24}$/.test(app) ? "len24-hex" : "other",
      };
    });
    // the login (pre-auth): the auth card's own script face
    await probeLoad(page, `${url}/login`);
    await page.waitForTimeout(1500);
    const login = await keys();
    return {
      landingLocal: landing.local,
      loginLocal: login.local,
      landingSession: landing.session,
      loginSession: login.session,
      ...shapes,
    };
  } finally {
    await context.close();
  }
}

{
  const [refSt, oursSt] = await Promise.all([storageFace(REF), storageFace(OURS)]);
  const label = "[storage]";
  // the IDENTICAL faces — real diffs (sessionStorage is EMPTY on both
  // pages both apps — the one truly identical storage face)
  diff(label, refSt.landingSession, oursSt.landingSession, "the landing's sessionStorage key set (empty both apps)", out);
  diff(label, refSt.loginSession, oursSt.loginSession, "the login's sessionStorage key set (empty both apps)", out);
  // the per-side recorded constants — the localStorage families (the
  // reference's platform implementation face, never mirrored; OURS the
  // zero-key posture: the session rides the httpOnly cookie)
  expectConst(
    label,
    "REF",
    {
      landingLocal: [
        "base44_analytics_session_id",
        "base44_app_id",
        "base44_from_url",
        "base44_functions_version",
      ],
      // the accumulated login face (the leg rides landing → login in
      // one context; localStorage is per-origin — the analytics four
      // persist; the login's own script adds i18nextLng)
      loginLocal: [
        "base44_analytics_session_id",
        "base44_app_id",
        "base44_from_url",
        "base44_functions_version",
        "i18nextLng",
      ],
    },
    { landingLocal: refSt.landingLocal, loginLocal: refSt.loginLocal },
    out,
  );
  expectConst(
    label,
    "OURS",
    { landingLocal: [], loginLocal: [] },
    { landingLocal: oursSt.landingLocal, loginLocal: oursSt.loginLocal },
    out,
  );
  // the analytics-id SHAPE decode (never the value — per-session
  // random; the shape census: lowercase-alnum, length 20–22 observed,
  // pinned as the 18–24 window) + the app_id's 24-hex shape
  expectConst(label, "REF", "lower-alnum-18-24", refSt.analyticsIdShape, out);
  expectConst(label, "REF", "len24-hex", refSt.appIdShape, out);
}

// The round-38 [network] leg — the NETWORK-FAMILY census: the request
// axis no probe ever read. The load-time request family per app (the
// document + every api-like request, the 24-hex platform ids masked,
// the POST payloads decoded as SHAPES — key sets and array lengths,
// never values) and the document response-header face (the session-20
// three-header security set present; the tech disclosure absent). The
// reference's four-beacon platform family is base44 implementation,
// never mirrored — the network is not a rendered face; OURS ships the
// zero-beacon posture (the document alone). F-38a (the round's catch):
// OUR artifact's X-Powered-By disclosure — cured by
// `poweredByHeader: false` (the shared face below was born RED).
type NetworkFace = {
  requestFamily: string[]; // "METHOD /api/path/<hex-masked>" per load
  postShapes: string[]; // "pathname => {events:array(N)}" — shapes only
  poweredBy: string; // "absent" | "present"
  securitySet: string[]; // the three-header set, present-value form
};

async function networkFace(url: string): Promise<NetworkFace> {
  // one fresh context per app — the request family is per-load (a
  // reused context would replay cached assets and mask the beacons)
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const requestFamily: string[] = [];
  const postShapes: string[] = [];
  page.on("request", (r) => {
    const isDoc = r.resourceType() === "document";
    const isApiLike = /api|analytics|collect|track|beacon|telemetry|monitor|function/i.test(
      r.url(),
    );
    if (!isDoc && !isApiLike) return;
    let pathname: string;
    try {
      pathname = new URL(r.url()).pathname;
    } catch {
      return;
    }
    // mask the platform's 24-hex ids (per-app constant, never re-pinned
    // per-census) and the analytics/collector's opaque tail
    const masked = pathname.replace(/[0-9a-f]{24}/g, "<hex24>");
    requestFamily.push(`${r.method()} ${masked}`);
    const postData = r.postData();
    if (postData) {
      try {
        const parsed = JSON.parse(postData) as Record<string, unknown>;
        const shape = Object.entries(parsed)
          .map(([k, v]) => `${k}:${Array.isArray(v) ? `array(${v.length})` : typeof v}`)
          .join(",");
        postShapes.push(`${masked} => {${shape}}`);
      } catch {
        postShapes.push(`${masked} => <non-json ${postData.length}B>`);
      }
    }
  });
  let poweredBy = "absent";
  let securitySet: string[] = [];
  try {
    // the document response's header face: waitForResponse armed BEFORE
    // the probeLoad goto (probeLoad returns void; the response event is
    // the header face's source)
    const docRes = page.waitForResponse(
      (r) => r.request().resourceType() === "document" && !r.url().includes("/_next/"),
      { timeout: 30_000 },
    );
    await probeLoad(page, url);
    await page.waitForTimeout(5000); // let the platform's beacon family fire
    const res = await docRes.catch(() => null);
    if (res) {
      const h = await res.allHeaders();
      poweredBy = h["x-powered-by"] ? "present" : "absent";
      securitySet = [
        h["referrer-policy"] ?? "(missing)",
        h["x-content-type-options"] ?? "(missing)",
        h["strict-transport-security"] ?? "(missing)",
      ];
    }
  } finally {
    await context.close();
  }
  return { requestFamily: [...new Set(requestFamily)].sort(), postShapes, poweredBy, securitySet };
}

{
  const [refN, oursN] = await Promise.all([networkFace(REF), networkFace(OURS)]);
  const label = "[network]";
  // the IDENTICAL faces — the response-header contract both apps ship
  diff(label, refN.poweredBy, oursN.poweredBy, "the document's X-Powered-By face (absent both apps — the F-38a cure)", out);
  // the per-side recorded constants — the request families (the
  // reference's four-beacon platform family vs OUR zero-beacon
  // document-only posture; the platform family is base44
  // implementation, never mirrored)
  expectConst(
    label,
    "REF",
    {
      requestFamily: [
        "GET /",
        "GET /api/apps/<hex24>/entities/User/me",
        "GET /api/apps/public/prod/public-settings/by-id/<hex24>",
        "POST /api/app-logs/<hex24>/log-user-in-app/home",
        "POST /api/apps/<hex24>/analytics/track/batch",
      ],
      postShapes: ["/api/apps/<hex24>/analytics/track/batch => {events:array(1)}"],
      poweredBy: "absent",
      securitySet: [
        "strict-origin-when-cross-origin",
        "nosniff",
        "max-age=31536000",
      ],
    },
    refN,
    out,
  );
  expectConst(
    label,
    "OURS",
    {
      requestFamily: ["GET /"],
      postShapes: [],
      poweredBy: "absent",
      securitySet: [
        "strict-origin-when-cross-origin",
        "nosniff",
        "max-age=31536000",
      ],
    },
    oursN,
    out,
  );
}

// The round-39 [stack] leg — the COMBINATION-MATRIX census: the
// media-axis COMBINATIONS no probe ever read (rounds 29/31/32 censused
// reduce / forcedColors / colorScheme INDIVIDUALLY; the pairwise
// forced+scheme-dark and the full triple stack were never censused).
// One fresh context per app carrying the FULL triple stack — all three
// axes in ONE emulateMedia call (never a pairwise-only stack — the
// unread-axis class this leg closes) — sweeping the computed faces the
// stack produces: the dark system palette (the forced palette composes
// with the emulated scheme), the UA's forced color-scheme reporting,
// and the transition-duration pair where the recorded per-side
// constants COMPOSE additively (the reduce collapse survives the
// forced palette — the a11y superset composes). F-39a (the round's
// catch, the coverage gap): the axe-under-combination families this
// census decoded are pinned by the round-39 e2e describe (the a11y
// spec), not this leg — this leg owns the computed-face axis.
type StackFace = {
  h1Color: string;
  ctaColor: string;
  featuredBg: string;
  featuredInk: string;
  footerColor: string;
  bodyBg: string;
  htmlColorScheme: string;
  revealDuration: string;
  headerDuration: string;
  revealOpacity: string;
};

async function stackFace(url: string): Promise<StackFace> {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "commit" });
    await page.waitForSelector("header", { timeout: 20000 });
    await page.waitForTimeout(1500);
    // the FULL triple stack in one call (the combination-matrix census
    // never rides a pairwise-only emulation)
    await page.emulateMedia({
      forcedColors: "active",
      colorScheme: "dark",
      reducedMotion: "reduce",
    });
    await page.waitForTimeout(300);
    // warm the reveals (the round-28 settle-wait precedent)
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(1200);
    return await page.evaluate(() => {
      // the cross-app content selectors: the reference's featured card
      // carries NO bg-amber-500 class (F-31c) — select by TITLE
      const cardOf = (title: string): HTMLElement | null => {
        const h = Array.from(document.querySelectorAll("h3")).find((el) => (el.textContent ?? "").trim() === title);
        return h ? ((h.closest("div")?.parentElement as HTMLElement) ?? null) : null;
      };
      const featured = cardOf("Design & Web");
      const cta = Array.from(document.querySelectorAll("header a")).find((a) => (a.textContent ?? "").trim() === "Get in Touch") ?? null;
      const read = (el: Element | null, prop: string): string =>
        el ? String(getComputedStyle(el)[prop as keyof CSSStyleDeclaration]) : "MISSING";
      const revealEl = document.querySelector("#services .grid > div") ?? document.querySelector("#services h3");
      return {
        h1Color: read(document.querySelector("h1"), "color"),
        ctaColor: read(cta, "color"),
        featuredBg: read(featured, "backgroundColor"),
        featuredInk: read(featured, "color"),
        footerColor: read(document.querySelector("footer"), "color"),
        bodyBg: read(document.querySelector("body"), "backgroundColor"),
        htmlColorScheme: getComputedStyle(document.documentElement).getPropertyValue("color-scheme"),
        revealDuration: read(revealEl, "transitionDuration"),
        headerDuration: read(document.querySelector("header"), "transitionDuration"),
        revealOpacity: read(revealEl, "opacity"),
      };
    });
  } finally {
    await context.close();
  }
}

{
  const [refS, oursS] = await Promise.all([stackFace(REF), stackFace(OURS)]);
  const label = "[stack]";
  // the IDENTICAL faces — the dark system palette both apps compute
  // under the full triple stack (the forced palette composes with the
  // emulated scheme; the shared faces diff directly)
  diff(label, refS.h1Color, oursS.h1Color, "the h1 ink (CanvasText white under the dark system palette)", out);
  diff(label, refS.ctaColor, oursS.ctaColor, "the CTA ink (LinkText yellow under the dark system palette)", out);
  diff(label, refS.featuredBg, oursS.featuredBg, "the featured card surface (the dark Canvas)", out);
  diff(label, refS.featuredInk, oursS.featuredInk, "the featured card ink", out);
  diff(label, refS.footerColor, oursS.footerColor, "the footer ink", out);
  diff(label, refS.bodyBg, oursS.bodyBg, "the body canvas (the opaque black)", out);
  diff(
    label,
    refS.htmlColorScheme,
    oursS.htmlColorScheme,
    "the html color-scheme face (the UA's forced light-dark reporting — vs normal at screen)",
    out,
  );
  diff(label, refS.revealOpacity, oursS.revealOpacity, "the reveal at-rest opacity", out);
  // the per-side recorded constants — the reduce collapse pair COMPOSES
  // (the round-29 superset survives the forced palette: the composition
  // proof — REF still animates at full duration under the stack, OURS
  // still collapses to the 0.01ms face)
  expectConst(
    label,
    "REF",
    { revealDuration: "0.3s", headerDuration: "0.5s" },
    { revealDuration: refS.revealDuration, headerDuration: refS.headerDuration },
    out,
  );
  expectConst(
    label,
    "OURS",
    { revealDuration: "1e-05s", headerDuration: "1e-05s" },
    { revealDuration: oursS.revealDuration, headerDuration: oursS.headerDuration },
    out,
  );
}

if (out.length === 0) {
  console.log("[390] CONTENT + MOBILE-MENU FACE: NO DRIFT — the reference matches our byte-mirror");
  console.log("[login] AUTH-CARD FACE: NO DRIFT — the reference matches our login mirror (round-27: the LOGO family now censused — the reference's real img mirrored: the alt, the object-fit cover, the 96×96 box, the byte-class circle span, the blue-dot regression; the spanRadius/imgSrc ride their per-side constants — F-27a)");
  console.log("[preflight] FORM-FACE: NO DRIFT — the reference matches our preflight mirror");
  console.log("[motion] MOTION/GLYPH FACE: NO DRIFT — the reference matches our motion/glyph mirror");
  console.log("[geometry] STRUCTURE/GEOMETRY FACE: NO DRIFT — the reference matches our geometry mirror");
  console.log("[auth-validation] AUTH-VALIDATION FACE: NO DRIFT — the reference matches our validation-mode mirror");
  console.log("[head] HEAD/METADATA FACE: NO DRIFT — the reference matches our document mirror");
  console.log("[interact] INTERACTION-BEHAVIOR FACE: NO DRIFT — the reference matches our interaction mirror");
  console.log("[authfail] AUTH-FAILURE/RESPONSE FACE: NO DRIFT — the reference matches our failure/header mirror");
  console.log("[google] GOOGLE-BUTTON FACE: NO DRIFT — both faces match their recorded constants (the reference's OAuth redirect + our honest toast, R-21a)");
  console.log("[viewport] INTERMEDIATE-VIEWPORT FACE: NO DRIFT — the sm/md boundaries compute identical on both apps (R-22a: the positive census; the mobile menu's retirement boundary clean)");
  console.log("[anchors] ANCHOR-NAVIGATION/DEEP-LINK FACE: NO DRIFT — the desktop nav rides + the logo ride identical on both apps; the deep-link boot matches each side's recorded constant (R-23a + the R-23b superset record)");
  console.log("[docs] DOCUMENT-ASSET/META FACE: NO DRIFT — the root rendered head family, the manifest contents, the robots bytes, the login tab order and the fonts family all mirror (the og-image BYTES identical both sides); the sitemap superset + the favicon-link/icon-src families match their per-side recorded constants (R-24a–e)");
  console.log("[routes] ROUTE-MECHANICS FACE: NO DRIFT — the unknown-route derived-title family and the quoted-path bodies mirror (both apps derive — F-25a); the query passthrough identical (F-25d); the status family, the trailing slash and the guest /dashboard adjudication match their per-side recorded constants (the true-404 + 308 + from_url supersets — F-25b/c); the post-Go-Home title ride IDENTICAL both apps (the F-27d stale-title cure: both reset to the bare brand — the reference's own face)");
  console.log("[reset] PLATFORM-RESET FACE: NO DRIFT — the /reset-password family mirrors on both states after the F-26a/b/c cure (the Title-Case quartet, the BreadcrumbList JSON-LD third carrier, the flat gray-50 page, the white rounded-lg shadow-lg card, the FIXED 48/48/40 inner, the 24px h2 headings, the h-11/6px gray controls with the zinc-500 placeholder, the per-state strip/icon family, the tab order, the announced error box); the input/error oklab-vs-rgba fills match their per-side recorded constants (the s18 serialization class, numerically equal paint)");
  console.log("[reveal] SCROLL-REVEAL/MOTION FACE: NO DRIFT — the twenty-element family finally censused (F-28a): the at-rest hidden faces (opacity 0 + the live-probed ∓40X/+30Y/scale(0.96)/∓30X offsets) IDENTICAL both viewports, the mid-flight motion present on both apps, the post-reveal end state IDENTICAL (the static face every prior probe landed on); the transition mechanism rides per-side constants (the reference's raf 0s vs OUR CSS 0.8s decode — the services cards' own 0.3s class transition IDENTICAL)");
  console.log("[motion-prefs] REDUCED-MOTION FACE: NO DRIFT — the media condition no probe ever emulated finally censused (F-29a): under reduce the at-rest hidden family, the settled hero/mount family, the post-reveal end state and the scroll-behavior IDENTICAL; the divergence rides the recorded per-side constants (the reference ships ZERO reduce handling — its raf reveal still animates, services 0.3s / header 0.5s at full duration — vs OUR 0.01ms collapse (computed 1e-05s), the deliberate a11y superset pinned by tests/reduced-motion-faces.test.ts; OUR reveal snaps with no mid-flight window, never stuck hidden)");
  console.log("[body-ink] BODY-INK/PRINT-MEDIA FACE: NO DRIFT — the element no probe ever read finally censused (F-30a): the html element's UA-default ink, the body bg and the whole print-emulation sweep IDENTICAL both apps; the body element's own color face rides the recorded per-side constants (the single-token compromise's sacrificed side — REF rgb(10, 10, 10), its landing bundle's stock shadcn neutral-950, vs OURS rgb(9, 9, 11), the zinc-950 the reference's platform bundle inks its auth card with — DEAD on both sides, zero true riders, pinned by tests/body-ink-faces.test.ts); the print census (F-30b): both apps ship ZERO @media print rules (the reference's own zero-handling posture — the white-on-white hazard of its dark sections is its own face, never mirrored)");
  console.log("[forced-colors] FORCED-COLORS/THEME-FACE: NO DRIFT — the last media axis in Playwright's emulateMedia surface finally censused (F-31a): under forcedColors active the whole face sweep computes IDENTICAL both apps (CanvasText ink, Canvas surfaces, the CTA's LinkText rgb(0, 0, 159) — the browser's system-palette collapse reaches everything; the featured card selected by CONTENT — F-31c: the reference's own card div carries no bg-amber-500 class, OURS spells it, the computed faces identical, the s11 doctrine); the media-rule census ZERO both sides (F-31b: the CSSMediaRule walk, never the substring — our rendered @layer utilities block contains the STRING forced-colors in Tailwind v4's own utility class definitions); the theme faces IDENTICAL (F-31d: accent-color auto + color-scheme normal, neither app declares either — the UA defaults ride); the media-axis set completed (round-29 reduce · round-30 print · round-31 forced-colors), pinned by tests/forced-colors-faces.test.ts");
  console.log("[color-scheme] COLOR-SCHEME FACE: NO DRIFT — the one emulateMedia axis round-31 excepted finally censused (F-32a): under colorScheme dark AND light the face sweep computes IDENTICAL both apps and NOTHING MOVES on either side (html color-scheme normal — neither app declares it; body bg white, the h1 white ink, the footer zinc-950, the login email's translucent fill — the at-screen constants hold under every emulation); the per-side scheme-invariance holds (each app's dark === light, both landings and both logins); the s18 serialization pair rides the recorded per-side constants (REF rgba(248, 250, 252, 0.5) vs OURS oklab — numerically equal paint); the scheme-rules census ZERO both sides (the CSSMediaRule walk — the reference ships no dark-mode face, OURS mirrors the zero-handling posture); with round-29 reduce · round-30 print · round-31 forced-colors · round-32 colorScheme EVERY emulateMedia axis rides a census leg, pinned by tests/color-scheme-faces.test.ts");
  console.log("[orientation] ORIENTATION FACE: NO DRIFT — the landscape phone (844×390, the md boundary crossed from below) finally censused (F-35a/b/c, the session-56 candidate 2 closed): the closed-state header flip IDENTICAL both apps (the hamburger retired, the desktop nav + the amber CTA rendered, the h1's md step), the auth card's landscape geometry IDENTICAL (the max-w-md card at x=198 — the exact (844−448)/2 centering — width 448, the short-height scrollability), and the print-landscape faces IDENTICAL (h1 white, body bg white, html ink black, ZERO @media print rules both sides — the round-30 zero-handling posture at the orientation axis); the OPEN-menu rotation ride (the state-coupled leg — the menu survives the crossing hidden and reopens on the way back, the reference's own face) rides the e2e battery in tests/e2e/mobile-navigation.spec.ts, pinned by tests/orientation-faces.test.ts");
  console.log("[storage] STORAGE-FAMILY FACE: NO DRIFT — the axis no probe ever read finally censused (F-37b): sessionStorage EMPTY on both pages both apps; the localStorage families ride the recorded per-side constants (the reference's platform implementation face, never mirrored — the landing's analytics four + the accumulated login union vs OUR zero-key posture everywhere; OURS the session rides the httpOnly cookie, document.cookie reads empty); the analytics id pinned by SHAPE (lowercase-alnum, length 20–22 observed, the 18–24 window — per-session random, never value-pinned), the app_id by its 24-hex shape; localStorage is per-origin — the login-after-landing face carries the union (the leg's own born-red catch); pinned by tests/storage-faces.test.ts");
  console.log("[network] NETWORK-FAMILY FACE: NO DRIFT — the request axis no probe ever read finally censused (F-38b): the document response-header face IDENTICAL both apps (the session-20 three-header security set present; the tech disclosure absent — the F-38a cure: OUR artifact's X-Powered-By retired by poweredByHeader: false, the scaffold default that disclosed the framework on every HTML face while the reference discloses none); the load-time request families ride the recorded per-side constants (the reference's four-beacon platform family — the User/me session check, the bodyless app-log, the public-settings fetch, the analytics batch with its {events:array(1)} shape — vs OUR zero-beacon document-only posture: every fetch in src/ is user-initiated, the beacon families absent from the tree; the platform family is base44 implementation, never mirrored); pinned by tests/network-faces.test.ts + tests/http-headers.test.ts");
  console.log("[stack] COMBINATION-MATRIX FACE: NO DRIFT — the media-axis combinations no probe ever read finally censused (F-39b): under the FULL triple stack (forcedColors + colorScheme dark + reducedMotion, one emulateMedia call) every shared computed face IDENTICAL both apps — the dark system palette (the forced palette composes with the emulated scheme: the body canvas opaque black, the h1 CanvasText white, the CTA LinkText yellow, the featured card the dark Canvas) and the html color-scheme face reading light dark (the UA's forced reporting, vs normal at screen — a fresh constant both apps); the transition-duration pair rides the recorded per-side constants COMPOSING additively (the round-29 reduce collapse survives the forced palette — the a11y superset composes: REF still animates 0.3s/0.5s under the stack while OURS still collapses to the 1e-05s face — never beaten by the system palette); pinned by tests/stack-faces.test.ts + the round-39 e2e describe (the axe-under-combination families: the login's color-contrast(11) byte-identical both apps, the landing's 16, OUR dashboard's 22 — the artifact-class baseline)");
} else {
  console.log(`[390 + login + preflight + motion + geometry + auth-validation + head + interact + authfail + google + viewport + anchors + docs + routes + reset + reveal + motion-prefs + body-ink + forced-colors + color-scheme + orientation + storage + network + stack] DRIFT DETECTED — ${out.length} field(s):`);
  for (const line of out) console.log(line);
}

// The report prints BEFORE the shared browser retires — a wedged close
// must never eat the results (the round-18 close-after-print order).
await browser.close();
