/**
 * Round-11 inbox-states battery: the STATE-FACE family (the
 * web-application skill §20 pre-ship's "Empty-state, loading, and error
 * paths exercised for every changed surface", never before run in this
 * domain) finally sits under the unit gate.
 *
 * The coverage gap this battery closes: the superset inbox's five state
 * faces were implemented and live-working (round-11's route-interception
 * probe: the initial-load spinner, the network-error alert, the honest
 * server-envelope alert, the empty-search miss, the error→ok recovery)
 * but carried ZERO gate coverage — the e2e suite pinned rows/tabs/
 * transitions/delete/search/sign-out/401 and never a state face, and no
 * unit battery pinned the state source contracts. A regression (the
 * catch block dropped, role="alert" removed, setError(null) lost, a
 * message reworded) would ship green through every gate.
 *
 * Contract (comment-stripped reads — a literal pinned by a comment
 * alone is vacuous, the s64/s65/s66 lesson):
 *
 * ① THE LOADING FACE: the initial load renders the explicit loading
 *   face — the `loading && rows === null` guard (a REFRESH never blanks
 *   the list: stale rows stay visible while the button spins — the
 *   honest-UX contract), the `Loading inquiries…` text, and the
 *   animate-spin RefreshCw.
 * ② THE ERROR FACES: a role="alert" face for BOTH failure genera — the
 *   network-error message (the fetch rejection path) AND the honest
 *   server-envelope path (the body's error.message surfaced verbatim,
 *   with "The inbox could not be loaded." as the envelope-less
 *   fallback). Both set rows:null (never a stale list under an error).
 * ③ THE EMPTY FACES: BOTH empty messages — the search-miss face (the
 *   query echoed inside the message) and the tab-empty face ("Nothing
 *   here yet." + the landing→inbox pipeline sentence).
 * ④ THE RECOVERY CONTRACT: a successful load CLEARS the error
 *   (setError(null) on the ok path) — the error face never lingers
 *   after a good load.
 * ⑤ THE BUSY CONTRACT: one action in flight per row — the busyId
 *   guard, the row actions disabled during their own flight, and the
 *   finally-block reset of busyId + confirmId (the two-step delete
 *   never sticks armed).
 * ⑥ THE REFRESH CONTRACT: the refresh control sets loading, reloads,
 *   and is disabled while loading.
 *
 * Born GREEN at round-11 (the states work — the honest record, the
 * round-10 ③–⑤ precedent for already-good contracts); proven to BITE
 * by the round-11 mutation proof (see the plan's Phase 5).
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

const inbox = stripComments(read("src/app/(app)/dashboard/inbox-page.tsx"));

describe("round-11 ① the loading face (the initial load is EXPLICIT, never blank)", () => {
  it("renders the Loading inquiries… face with the spinner", () => {
    expect(inbox).toContain("Loading inquiries…");
    expect(inbox).toContain("animate-spin");
    expect(inbox).toContain("RefreshCw");
  });

  it("guards the loading face on loading AND rows === null (a refresh keeps stale rows — no blank flash)", () => {
    // The exact conditional chain: the loading face rides
    // `loading && rows === null` — a REFRESH (loading=true, rows=the
    // stale list) must NOT swap the list for the spinner.
    expect(inbox).toContain("loading && rows === null");
  });

  it("boots in the loading state with rows null (the first paint is the loading face, not an empty list)", () => {
    expect(inbox).toContain("React.useState<Inquiry[] | null>(null)");
    expect(inbox).toContain("React.useState(true)");
  });
});

describe("round-11 ② the error faces (both failure genera render an explicit alert)", () => {
  it("carries role=alert on the error face (the a11y live-region contract)", () => {
    expect(inbox).toContain('role="alert"');
  });

  it("renders the network-error message on the fetch rejection path", () => {
    // The message rides THREE arms (the load catch + both action
    // catches) — the count pin bites on the first drop (the mutation
    // proof caught the single-occurrence reword riding the other two).
    const arms = (inbox.match(/"Network error — check your connection and try again\."/g) ?? []).length;
    expect(arms).toBeGreaterThanOrEqual(3);
  });

  it("surfaces the honest server-envelope message with the envelope-less fallback", () => {
    // The server's error.message renders verbatim; a body without the
    // envelope falls back to the generic line — the user never sees a
    // blank or a raw JSON dump.
    expect(inbox).toContain(
      'body?.error?.message ?? "The inbox could not be loaded."',
    );
  });

  it("clears rows on error (never a stale list under an error face)", () => {
    // Both error arms set rows:null AFTER the failed read.
    const errorArms = inbox.match(/setError\((?:[^)]*)\);\s*setRows\(null\);/g) ?? [];
    expect(errorArms.length).toBeGreaterThanOrEqual(2);
  });
});

describe("round-11 ③ the empty faces (both empty genera render an explicit face)", () => {
  it("renders the search-miss face with the query echoed", () => {
    expect(inbox).toContain("No inquiries match");
    expect(inbox).toContain("{query.trim()}");
  });

  it("renders the tab-empty face (the pipeline sentence)", () => {
    expect(inbox).toContain("Nothing here yet.");
    expect(inbox).toContain(
      "New inquiries from the landing",
    );
  });

  it("distinguishes the two empty genera on the query state (the ternary contract)", () => {
    expect(inbox).toContain("{query ?");
  });
});

describe("round-11 ④ the recovery contract (an error never lingers past a good load)", () => {
  it("clears the error on the ok path", () => {
    expect(inbox).toContain("setError(null);");
  });

  it("the load catch arms BOTH failure genera (network + non-ok response)", () => {
    // The try carries the !res.ok / !body?.ok arm; the catch carries
    // the network arm — either way the error face owns the list area.
    expect(inbox).toContain("} catch {");
    expect(inbox).toContain("if (!res.ok || !body?.ok) {");
  });
});

describe("round-11 ⑤ the busy contract (one action in flight per row, honestly disabled)", () => {
  it("keys the busy state on the row id", () => {
    expect(inbox).toContain("setBusyId(row.id);");
    expect(inbox).toContain("busyId === row.id");
  });

  it("disables the row actions during their own flight", () => {
    const disabledCount = (inbox.match(/disabled=\{busyId === row\.id\}/g) ?? [])
      .length;
    // mark-read / unarchive / archive / confirm-delete / the trash —
    // all five row actions carry the disable (the mutation proof caught
    // the too-low floor: dropping ONE of five left the count at 4 — the
    // pin must bite on the first drop).
    expect(disabledCount).toBeGreaterThanOrEqual(5);
  });

  it("resets busyId AND confirmId in the finally block (the two-step delete never sticks armed)", () => {
    expect(inbox).toContain("setBusyId(null);");
    expect(inbox).toContain("setConfirmId(null);");
  });

  it("guards double-fires with the busyId early return", () => {
    expect(inbox).toContain("if (busyId) return;");
  });
});

describe("round-11 ⑥ the refresh contract (the manual reload is honest)", () => {
  it("sets loading, reloads, and disables while loading", () => {
    expect(inbox).toContain("setLoading(true);");
    expect(inbox).toContain("void load();");
    expect(inbox).toContain("disabled={loading}");
  });

  it("spins the refresh icon while loading (the animate-spin rides the loading state)", () => {
    expect(inbox).toContain('loading ? "animate-spin" : ""');
  });
});
