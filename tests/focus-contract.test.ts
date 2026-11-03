/**
 * Round-10 focus-contract battery: the KEYBOARD/FOCUS family (the
 * web-application skill §13's prescribed "Keyboard paths are tested"
 * standing duty, never before run in this domain) finally sits under
 * the unit gate.
 *
 * The coverage gap this battery closes: the e2e suite carried ZERO
 * keyboard interaction (no keyboard.press anywhere), the parity probe
 * reads at-rest faces only, and axe-core cannot check focus-visibility
 * STYLING — so the superset's own surfaces shipped focused controls
 * with NO visible focus indicator (the inbox tabs + every row-action
 * button + the shell's sign-out/home controls computed outline:none,
 * box-shadow:none — a WCAG 2.4.7 failure on the surface PAD §5.2
 * claimed "passes AA outright"), and the auth card's sign-in ring rode
 * a session-9 stock token (--color-ring: #0a0a0a, neutral-950) that
 * DIVERGES from the live reference's computed rgb(9,9,11) (zinc-950).
 *
 * Contract (comment-stripped reads — a literal pinned by a comment
 * alone is vacuous, the s64/s65/s66 lesson):
 *
 * ① THE RING RE-PIN: globals.css pins --color-ring to #09090b — the
 *   zinc-950 v3 literal, the LIVE reference's computed sign-in ring
 *   (rgb(9, 9, 11) 0 0 0 4px, live-probed settled 2026-11-04). The
 *   retired session-9 stock #0a0a0a (neutral-950) never returns. The
 *   e2e computed pin rides tests/e2e/keyboard.spec.ts (the round-8
 *   blur(4px) trap pattern).
 * ② THE RING CONSUMERS: every ring-ring consumer cited (the auth
 *   submit family + the verify-code inputs) — a token change's blast
 *   radius is documented in the battery, not discovered in prod.
 * ③ THE INBOX SOURCE CONTRACT: every <button> in inbox-page.tsx
 *   carries the focus-visible ring family (generic form — a NEW button
 *   without the family fails; the family rides the ring token, one
 *   design language with the auth card).
 * ④ THE SHELL SOURCE CONTRACT: the sign-out button + both home links
 *   carry the focus-visible family (the WHITE variant — the shell's
 *   bars are bg-zinc-950; a zinc-950 ring would vanish on them).
 * ⑤ THE SEARCH CUE: the inbox search input keeps its authored
 *   focus:border-zinc-950 (the one visible cue it always had).
 * ⑥ THE AUTH FAMILY: the reference-mirrored auth card keeps its own
 *   focus-visible:ring-ring family (the reference's pattern, carried).
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

const globalsCss = read("src/app/globals.css");
const inbox = stripComments(read("src/app/(app)/dashboard/inbox-page.tsx"));
const shell = stripComments(read("src/components/layout/app-shell.tsx"));
const pageLayout = stripComments(read("src/lib/page-layout.ts"));
const loginReset = stripComments(read("src/lib/login-reset.ts"));
const loginCard = stripComments(read("src/components/layout/login-card.tsx"));

// The design language: the inbox card's controls ride the ring TOKEN
// (→ --color-ring → zinc-950 after the round-10 re-pin); the shell's
// dark bars ride the WHITE variant (a zinc-950 ring on bg-zinc-950
// would be invisible).
const INBOX_FOCUS_FAMILY = [
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-ring",
  "focus-visible:ring-offset-2",
];
const SHELL_FOCUS_FAMILY = [
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-white",
  "focus-visible:ring-offset-2",
  "focus-visible:ring-offset-zinc-950",
];

// Every <button …> opening tag in a (comment-stripped) source. Opening
// tags span lines and their JSX expressions carry ">" characters the
// naive [^>]* regex would truncate at (onClick's arrow "=>" — the
// lesson learned the hard way at this battery's own birth: 7 of 8
// buttons PASSED on a truncated match that never reached the
// className). The scanner tracks quote state and brace depth, ending
// the tag only at a top-level ">" outside strings and expressions.
function buttonTags(src: string): string[] {
  const tags: string[] = [];
  let i = 0;
  while ((i = src.indexOf("<button", i)) !== -1) {
    let j = i + 1;
    let depth = 0;
    let quote: string | null = null;
    let done = -1;
    while (j < src.length) {
      const ch = src[j];
      if (quote) {
        if (ch === quote && src[j - 1] !== "\\") quote = null;
      } else if (ch === '"' || ch === "'" || ch === "`") {
        quote = ch;
      } else if (ch === "{") {
        depth++;
      } else if (ch === "}") {
        depth--;
      } else if (ch === ">" && depth === 0) {
        done = j;
        break;
      }
      j++;
    }
    if (done === -1) break;
    tags.push(src.slice(i, done + 1));
    i = done + 1;
  }
  return tags;
}

// Every <a …> opening tag (the same scanner, the anchor genus; matches
// "<a" + whitespace so multi-line anchors land too).
function anchorTags(src: string): string[] {
  const tags: string[] = [];
  const re = /<a\s/g;
  let head: RegExpExecArray | null;
  while ((head = re.exec(src)) !== null) {
    const i = head.index;
    let j = i + 1;
    let depth = 0;
    let quote: string | null = null;
    let done = -1;
    while (j < src.length) {
      const ch = src[j];
      if (quote) {
        if (ch === quote && src[j - 1] !== "\\") quote = null;
      } else if (ch === '"' || ch === "'" || ch === "`") {
        quote = ch;
      } else if (ch === "{") {
        depth++;
      } else if (ch === "}") {
        depth--;
      } else if (ch === ">" && depth === 0) {
        done = j;
        break;
      }
      j++;
    }
    if (done === -1) continue;
    tags.push(src.slice(i, done + 1));
    re.lastIndex = done + 1;
  }
  return tags;
}

describe("round-10 ①②: the --color-ring re-pin (the live reference's computed focus ring)", () => {
  it("globals.css pins --color-ring to #09090b — the zinc-950 v3 literal, the LIVE reference's computed rgb(9,9,11) sign-in ring", () => {
    expect(globalsCss).toContain("--color-ring: #09090b;");
  });

  it("the retired session-9 stock value (neutral-950 #0a0a0a) never returns", () => {
    expect(globalsCss).not.toContain("--color-ring: #0a0a0a;");
  });

  it("every ring-ring consumer is cited (the token's blast radius: the auth submit family + the verify-code inputs)", () => {
    // page-layout.ts: the auth card's submit (LOGIN_LAYOUT.submit)
    expect(pageLayout).toContain("focus-visible:ring-ring");
    // login-reset.ts: the reset screens' submit family
    expect(loginReset).toContain("focus-visible:ring-ring");
    // login-card.tsx: the verify-code inputs
    expect(loginCard).toContain("focus-visible:ring-ring");
  });
});

describe("round-10 ③④⑤⑥: the superset's focus-visible source contract (WCAG 2.4.7)", () => {
  it("every <button> in the inbox carries the focus-visible ring family (generic — a new button without it fails)", () => {
    const tags = buttonTags(inbox);
    expect(tags.length).toBeGreaterThanOrEqual(8); // refresh + 4 tabs-in-map-source + mark-read/unarchive pair + archive + confirm + cancel + delete
    for (const tag of tags) {
      for (const cls of INBOX_FOCUS_FAMILY) {
        expect(tag, `inbox button missing "${cls}": ${tag.slice(0, 120)}`).toContain(cls);
      }
    }
  });

  it("the app-shell's sign-out button carries the WHITE focus family (the dark-bar variant)", () => {
    const tags = buttonTags(shell);
    expect(tags.length).toBeGreaterThanOrEqual(1);
    for (const tag of tags) {
      for (const cls of SHELL_FOCUS_FAMILY) {
        expect(tag, `shell button missing "${cls}": ${tag.slice(0, 120)}`).toContain(cls);
      }
    }
  });

  it("the app-shell's home links carry the WHITE focus family", () => {
    const links = anchorTags(shell);
    expect(links.length).toBeGreaterThanOrEqual(2); // the wordmark + the footer link
    for (const link of links) {
      for (const cls of SHELL_FOCUS_FAMILY) {
        expect(link, `shell link missing "${cls}": ${link.slice(0, 120)}`).toContain(cls);
      }
    }
  });

  it("the inbox search input keeps its authored visible cue (focus:border-zinc-950)", () => {
    expect(inbox).toContain("focus:border-zinc-950");
  });

  it("the reference-mirrored auth card keeps its own focus-visible:ring-ring family (the reference's pattern, carried)", () => {
    expect(pageLayout).toContain("focus-visible:ring-ring");
    expect(pageLayout).toContain("focus-visible:ring-offset-2");
  });
});
