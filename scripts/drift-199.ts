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
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: w, height: h } });
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

  await browser.close();
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
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
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
  await browser.close();
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
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
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
  await browser.close();
  return base;
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

if (out.length === 0) {
  console.log("[390] CONTENT + MOBILE-MENU FACE: NO DRIFT — the reference matches our byte-mirror");
  console.log("[login] AUTH-CARD FACE: NO DRIFT — the reference matches our login mirror");
  console.log("[preflight] FORM-FACE: NO DRIFT — the reference matches our preflight mirror");
} else {
  console.log(`[390 + login + preflight] DRIFT DETECTED — ${out.length} field(s):`);
  for (const line of out) console.log(line);
}
