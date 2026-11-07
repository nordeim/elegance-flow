/**
 * Round-37 storage-faces battery: the STORAGE-FAMILY census + the
 * INERT-COOLDOWN cure — the axis no probe ever read (parity reads
 * computed styles; the drift battery reads DOM/text/img/faces; no
 * probe ever enumerated localStorage/sessionStorage), and the census's
 * own audit of OUR storage wiring found a real defect.
 *
 * The findings (live-verified 2026-11-07, both apps):
 *
 * ① THE INERT COOLDOWN (F-37a, MEDIUM-HIGH — the round's own audit
 *   catch): both error boundaries called `reloadOnStaleChunk(error)`
 *   with NO deps — the seam defaults storage to null, so the cooldown
 *   flag (`neo-crm:chunk-reload-at`) was never READ or WRITTEN in
 *   production and every stale-chunk error reloaded with ZERO
 *   cooldown. The "crash-mid-reload cannot loop" guard the seam's own
 *   docblock claims was dead in the real path — the documented intent
 *   ("the boundary hands the globals") was never wired. The injectable
 *   form was fully unit-tested (five checks with storage doubles);
 *   three historical pins (error-boundaries ×2 + error-faces ×1) even
 *   pinned the defective bare call shape. THE CURE: the guarded
 *   `browserSessionStorage()` accessor exported from the seam module
 *   (typeof-window + try/catch → null — node and Safari-private-mode
 *   both disable the cooldown, never a throw), handed in by both
 *   boundaries: `reloadOnStaleChunk(error, { storage:
 *   browserSessionStorage() })`. The seam itself stays pure (its
 *   default stays null — it never touches a global it was not handed).
 * ② THE ZERO-KEY POSTURE (F-37b — the census): OUR app writes ZERO
 *   storage keys on every surface (landing, login, signup,
 *   reset-password, dashboard — guest AND authed, both storages); the
 *   session rides ONE httpOnly cookie (`neo_session` — document.cookie
 *   reads empty). The reference's platform writes localStorage key
 *   families per surface (login pre-auth: i18nextLng; the landing
 *   guest: the analytics four; post-login: seven keys) with ZERO
 *   cookies — the client-readable session. OURS is the strictly
 *   stronger posture, and the rendered parity surface is unaffected:
 *   storage is not a rendered face, and the platform families are
 *   base44 implementation, never mirrored (the s11-adjacent doctrine
 *   — the per-side recorded divergence, live-proven by the drift
 *   [storage] leg).
 * ③ THE SOURCE CONTRACTS this battery pins: the wired call in both
 *   boundaries; the guarded accessor's shape; the app-wide census
 *   (ZERO localStorage anywhere in src/, sessionStorage ONLY in the
 *   recovery seam); the seam's body purity (no global touches); the
 *   AGENTS.md doc cure; the drift [storage] leg + the three updated
 *   historical pins.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import path from "node:path";

const here = import.meta.dirname;
const read = (rel: string) =>
  existsSync(path.join(here, rel)) ? readFileSync(path.join(here, rel), "utf8") : "";
const strip = (src: string) =>
  src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");

const errorBoundary = strip(read("../src/app/error.tsx"));
const globalErrorBoundary = strip(read("../src/app/global-error.tsx"));
const recoverySeam = strip(read("../src/lib/chunk-recovery.ts"));
const agents = read("../AGENTS.md");

/** Every source file under src/ (recursive), as repo-relative paths. */
function srcFiles(): string[] {
  const root = path.resolve(here, "../src");
  const out: string[] = [];
  const walk = (dir: string) => {
    if (!existsSync(dir)) return;
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else out.push(path.relative(root, p));
    }
  };
  walk(root);
  return out.sort();
}

// ---------------------------------------------------------------------------
// ① the wiring contract — F-37a's cure (born RED: the bare call shipped)
// ---------------------------------------------------------------------------
describe("round-37: the storage wiring contract (the F-37a inert-cooldown cure)", () => {
  it("the segment boundary hands the seam the guarded storage — the wired call, not the bare one", () => {
    // the bare `reloadOnStaleChunk(error)` shipped the inert cooldown
    // (storage null → the flag never written → zero-cooldown reloads);
    // the wired call engages the 10s cooldown in production
    expect(errorBoundary, "the import").toContain(
      'import { browserSessionStorage, reloadOnStaleChunk } from "@/lib/chunk-recovery"',
    );
    expect(errorBoundary, "the wired call").toContain(
      "reloadOnStaleChunk(error, { storage: browserSessionStorage() })",
    );
  });

  it("the root boundary hands the seam the same guarded storage", () => {
    expect(globalErrorBoundary, "the import").toContain(
      'import { browserSessionStorage, reloadOnStaleChunk } from "@/lib/chunk-recovery"',
    );
    expect(globalErrorBoundary, "the wired call").toContain(
      "reloadOnStaleChunk(error, { storage: browserSessionStorage() })",
    );
  });

  it("the guarded accessor: exported, typeof-window guarded, try/catch wrapped — the hand-off never throws", () => {
    // node/tests (no window) and an unavailable sessionStorage (Safari
    // private mode, disabled storage) both resolve to null — the
    // cooldown is disabled, never a throw (the seam's own docblock
    // contract, finally wired)
    expect(recoverySeam, "the export signature").toMatch(
      /export function browserSessionStorage\(\): ChunkStorage \| null \{/,
    );
    expect(recoverySeam, "the node guard").toMatch(/typeof window === "undefined"/);
    expect(recoverySeam, "the guarded global access").toMatch(/return window\.sessionStorage;/);
    expect(
      recoverySeam,
      "the access wrapped in try/catch (an unavailable storage resolves null)",
    ).toMatch(/export function browserSessionStorage\(\)[\s\S]*?try \{[\s\S]*?typeof window[\s\S]*?\} catch \{/);
  });
});

// ---------------------------------------------------------------------------
// ② the zero-key posture's source contract — F-37b's census
// ---------------------------------------------------------------------------
describe("round-37: the zero-key posture (the app-wide storage census)", () => {
  it("ZERO localStorage references across src/ (comment-stripped) — the app writes no client-readable state", () => {
    // the reference's platform rides client-readable localStorage (the
    // analytics four + the token family); OURS ships zero — the session
    // rides the httpOnly cookie. A planted localStorage anywhere in
    // src/ breaks the posture this pin guards. (The .includes needle —
    // never a bare /re/.test() call — keeps the count-ladder census's
    // it/test-block counting exact.)
    const offenders = srcFiles().filter((f) =>
      strip(read(`../src/${f}`)).includes("localStorage"),
    );
    expect(offenders, "files referencing localStorage").toEqual([]);
  });

  it("sessionStorage appears ONLY in the recovery seam — the single sanctioned storage touch", () => {
    // note the case discipline: `browserSessionStorage` (capital S)
    // never matches this census's lowercase `sessionStorage` needle
    const offenders = srcFiles().filter((f) =>
      strip(read(`../src/${f}`)).includes("sessionStorage"),
    );
    expect(offenders).toEqual(["lib/chunk-recovery.ts"]);
  });

  it("reloadOnStaleChunk's body never reaches for a STORAGE global — the injectable form stays pure", () => {
    // the seam's own docblock: "never touches globals it was not
    // handed" — scoped to STORAGE (the default reload closure's
    // window.location.reload() is the seam's documented built-in; the
    // STORAGE default stays null — the boundaries hand it in). The
    // accessor (which touches the guarded global) must live OUTSIDE
    // the seam function — pinned by slicing from the seam's
    // declaration to EOF and asserting it is the file's last export
    // and carries no storage-global reference
    const seamStart = recoverySeam.indexOf("export function reloadOnStaleChunk");
    expect(seamStart).toBeGreaterThan(0);
    const seamBody = recoverySeam.slice(seamStart);
    expect(
      seamBody.match(/export function/g),
      "reloadOnStaleChunk must stay the LAST export (the accessor rides above it)",
    ).toHaveLength(1);
    expect(seamBody).not.toMatch(/localStorage/);
    expect(seamBody).not.toMatch(/sessionStorage/);
    // and the storage default stays the explicit null hand-off (never
    // an auto-reach for the global — the boundary hands it)
    expect(seamBody).toMatch(/const storage = deps\.storage \?\? null;/);
  });
});

// ---------------------------------------------------------------------------
// ③ the doc + battery cures
// ---------------------------------------------------------------------------
describe("round-37: the doc + battery cures (the fresh-agent pointers)", () => {
  it("AGENTS.md names the storage posture — the zero-key face + the httpOnly contrast + the cooldown cure", () => {
    // a fresh agent must know the storage posture is censused before
    // planting a localStorage write, and that the boundaries HAND the
    // guarded storage (the F-37a class)
    expect(agents).toContain("The storage posture (round-37)");
    expect(agents).toContain("ZERO-KEY");
    expect(agents).toContain("httpOnly");
  });

  it("the drift script rides the [storage] leg + the three historical pins carry the wired call", () => {
    // the drift battery's 22nd leg censuses both apps' storage faces
    // per surface (the reference's platform families vs OUR zero-key
    // posture — the per-side recorded constants)
    const drift = read("../scripts/drift-199.ts");
    expect(drift).toContain("[storage]");
    expect(drift).toContain("storageFace");
    // the historical pins moved off the defective bare-call shape
    // (error-boundaries ×2 + error-faces ×1 — they pinned the defect)
    expect(strip(read("../tests/error-boundaries.test.ts"))).toContain("browserSessionStorage");
    expect(strip(read("../tests/error-faces.test.ts"))).toContain("browserSessionStorage");
  });
});
