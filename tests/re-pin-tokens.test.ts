/**
 * Round-8 re-pin token battery: the SIX v4 re-pin traps (AGENTS.md's
 * enumeration — "all live in src/app/globals.css @theme") finally sit
 * under the unit gate as ONE family.
 *
 * The coverage gap this battery closes: before round-8 only trap ①
 * (partially — 5 of 29 tokens) and trap ⑤ were unit-pinned; the token
 * pins --shadow-sm/--blur-sm (② ③), the space-y flip class (④) and the
 * leading re-derivations (⑥) were guarded ONLY by the manual parity
 * probe — which is not in the `gate` chain. A refactor dropping any of
 * them shipped the whole gate green while visibly breaking computed-face
 * parity (the scrolled header one notch heavier, the auth card's frost
 * at blur(8px), the hero's line-heights at 86.4px vs 96px, the auth
 * fields' 6px gap silently lost).
 *
 * Contract (comment-stripped reads — a literal pinned by a comment
 * alone is vacuous, the s64/s65/s66 lesson):
 *
 * ① PALETTE — the COMPLETE @theme re-pin block: every
 *   `--color-(zinc|amber|slate)-N` token in globals.css, exact-set
 *   equality against the v3-literal map (a dropped token fails; a new
 *   token forces this battery forward — the lockstep forcing function).
 * ② --shadow-sm: the v3 geometry, not v4's one-notch-heavier scale.
 * ③ --blur-sm: 4px, not v4's renamed 8px.
 * ④ SPACE-Y FLIP: v4 puts margin on the preceding child — inline
 *   elements ignore it; the auth fields ride `[&>*+*]:mt-1.5`.
 * ⑤ HOVER UNWRAP: @custom-variant hover (&:hover) — v4's (hover: hover)
 *   media never fires on touch (twin pin: tests/landing-page.test.ts).
 * ⑥ LEADING RE-DERIVATIONS: the reference's leading-[0.9]/[0.95] never
 *   takes effect at md+ in its own build — the port is the COMPUTED
 *   face (leading-[0.9] md:leading-none on the h1; ×5 h2s at [0.95]).
 *   The retired form (a bare leading-[0.9] without its md: companion —
 *   the class-literal-only port the s11 doctrine forbids) never
 *   returns.
 *
 * The computed faces ride the e2e gate in this domain: the auth card's
 * blur(4px) + 16px radius (tests/e2e/auth.spec.ts) and the parity
 * probe's ~80-face diff (scripts/parity-199.ts).
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

// The v3-literal re-pin contract: every (family, step) globals.css pins,
// at its exact v3 hex (the reference's computed faces — ADR-005).
const V3_REPINS: Record<string, string> = {
  "--color-zinc-50": "#fafafa",
  "--color-zinc-100": "#f4f4f5",
  "--color-zinc-200": "#e4e4e7",
  "--color-zinc-300": "#d4d4d8",
  "--color-zinc-400": "#a1a1aa",
  "--color-zinc-500": "#71717a",
  "--color-zinc-600": "#52525b",
  "--color-zinc-700": "#3f3f46",
  "--color-zinc-800": "#27272a",
  "--color-zinc-900": "#18181b",
  "--color-zinc-950": "#09090b",
  "--color-amber-50": "#fffbeb",
  "--color-amber-100": "#fef3c7",
  "--color-amber-200": "#fde68a",
  "--color-amber-300": "#fcd34d",
  "--color-amber-400": "#fbbf24",
  "--color-amber-500": "#f59e0b",
  "--color-amber-700": "#b45309",
  "--color-amber-800": "#92400e",
  "--color-slate-50": "#f8fafc",
  "--color-slate-100": "#f1f5f9",
  "--color-slate-200": "#e2e8f0",
  "--color-slate-300": "#cbd5e1",
  "--color-slate-400": "#94a3b8",
  "--color-slate-500": "#64748b",
  "--color-slate-600": "#475569",
  "--color-slate-700": "#334155",
  "--color-slate-800": "#1e293b",
  "--color-slate-900": "#0f172a",
};

describe("session-199 round-8: the six v4 re-pin traps under the unit gate", () => {
  it("① the @theme palette re-pin block is COMPLETE and exact (every zinc/amber/slate token at its v3 literal)", () => {
    const css = stripComments(read("src/app/globals.css"));
    const live: Record<string, string> = {};
    for (const m of css.matchAll(/(--color-(?:zinc|amber|slate)-\d+):\s*(#[0-9a-fA-F]+);/g)) {
      live[m[1]] = m[2].toLowerCase();
    }
    // Exact-set equality: no token dropped, none added un-pinned, every
    // value the v3 literal (a new token forces this map forward).
    expect(live).toEqual(V3_REPINS);
  });

  it("② the --shadow-sm token pin stays at v3's geometry (v4 renamed the scale one notch heavier)", () => {
    const css = stripComments(read("src/app/globals.css"));
    expect(css).toContain("--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);");
  });

  it("③ the --blur-sm token pin stays at 4px (v4 renamed blur → blur-sm → 8px)", () => {
    const css = stripComments(read("src/app/globals.css"));
    expect(css).toContain("--blur-sm: 4px;");
  });

  it("④ the space-y flip: the auth fields ride the sibling-margin class, never space-y's ignored margin", () => {
    const layout = stripComments(read("src/lib/page-layout.ts"));
    expect(layout).toContain('field: "[&>*+*]:mt-1.5"');
  });

  it("⑤ the hover unwrap stays (touch devices never fire v4's (hover: hover) media without it)", () => {
    const css = stripComments(read("src/app/globals.css"));
    expect(css).toContain("@custom-variant hover (&:hover);");
  });

  it("⑥ the leading re-derivations: the h1 at [0.9], the five h2s at [0.95], every one with its md:leading-none companion — the retired bare form never returns", () => {
    const landing = stripComments(read("src/components/landing/landing-page.tsx"));
    const h1 = (landing.match(/leading-\[0\.9\] md:leading-none/g) ?? []).length;
    const h2 = (landing.match(/leading-\[0\.95\] md:leading-none/g) ?? []).length;
    expect(h1, "exactly one h1 carries the [0.9] re-derivation").toBe(1);
    expect(h2, "exactly five h2s carry the [0.95] re-derivation").toBe(5);
    // The retired form: a bare leading-[0.9]/[0.95] without the md:
    // companion (the class-literal-only port the s11 doctrine forbids —
    // it renders 86.4px where the reference computes 96px at md+).
    expect(landing).not.toMatch(/leading-\[0\.9\](?! md:leading-none)/);
    expect(landing).not.toMatch(/leading-\[0\.95\](?! md:leading-none)/);
  });
});
