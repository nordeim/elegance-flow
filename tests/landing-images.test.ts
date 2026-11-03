import { describe, expect, it } from "vitest";

import {
  ABOUT,
  HERO,
  PROJECTS,
  TESTIMONIALS,
} from "@/lib/site-content";

// Round-12 (THE PORTFOLIO-IMAGE CENSUS): the one content family no gate
// read. The audit's live probe (2026-11-04, deterministic across two
// fresh loads of the reference) found 5 of the 6 portfolio images
// diverged from the live reference — ours reused the Hero/About/other
// project photos while the reference ships six DISTINCT photographs.
// Invisible to every tier: parity-199 reads computed styles (an img's
// src changes no style); drift-199 read the TEXT face only; this
// battery's ancestor (site-content.test.ts) pinned the hero/about/
// avatars and the projects' titles/categories — never the images; the
// e2e battery pinned the overlay text and the filter behavior — never
// the img srcs.
//
// The pins below carry the reference's LIVE image set (the extraction
// contract: every string byte-extracted from the live reference DOM).
// The uniqueness census is the class pin: the reference ships six
// distinct project photos, none borrowed from the hero or the about
// frame — a future reuse regression (this bug's exact genus) fails it
// even if the wrong URL is otherwise plausible.

const U = "https://images.unsplash.com/photo-";

describe("the landing's image contracts (the round-12 census)", () => {
  it("the six project images are the reference's live set (byte-pinned)", () => {
    expect(PROJECTS.map((p) => p.image)).toEqual([
      `${U}1634942537034-2531766767d1?w=700&q=80`,
      `${U}1467232004584-a241de8bcf5d?w=700&q=80`,
      `${U}1596462502278-27bfdc403348?w=700&q=80`,
      `${U}1618005198919-d3d4b5a92ead?w=700&q=80`,
      `${U}1558618666-fcd25c85cd64?w=700&q=80`,
      `${U}1509909756405-be0199881695?w=700&q=80`,
    ]);
  });

  it("the six project images are SIX DISTINCT photographs (the reuse-class pin)", () => {
    // photo IDs, not full URLs — the same photograph at a different
    // ?w= rendering width is still a reuse
    const photoId = (url: string) => url.split("?")[0] ?? url;
    const ids = PROJECTS.map((p) => photoId(p.image));
    expect(new Set(ids).size).toBe(6);
  });

  it("no project borrows the hero's or the about frame's photograph", () => {
    // the photo ID (before the ?w= rendering param) is the photograph —
    // the reuse regression shipped with a different width suffix
    // (w=700 vs the about frame's w=900), so a bare full-URL compare
    // would pass while showing the SAME photo
    const photoId = (url: string) => url.split("?")[0] ?? url;
    const borrowed = [HERO.image, ABOUT.image].map(photoId);
    for (const p of PROJECTS) {
      expect(borrowed).not.toContain(photoId(p.image));
    }
  });

  it("every image alt is the reference's own DOM-case face", () => {
    expect(HERO.imageAlt).toBe("Hero");
    expect(ABOUT.imageAlt).toBe("About");
    // the card renders alt={project.title} (landing-page.tsx) — the
    // reference's own alt strings, probe-verified
    for (const p of PROJECTS) {
      expect(p.title).toMatch(/^Project (One|Two|Three|Four|Five|Six)$/);
    }
  });

  it("the three testimonial avatars are the reference's byte-pinned set", () => {
    expect(TESTIMONIALS.map((t) => t.avatar)).toEqual([
      `${U}1494790108377-be9c29b29330?w=100&q=80`,
      `${U}1507003211169-0a1dd7228f2d?w=100&q=80`,
      `${U}1438761681033-6461ffad8d80?w=100&q=80`,
    ]);
  });

  it("the hero and the about frame keep the reference's byte-pinned URLs", () => {
    expect(HERO.image).toBe(`${U}1618005182384-a83a8bd57fbe?w=1600&q=80`);
    expect(ABOUT.image).toBe(`${U}1542744173-8e7e53415bb0?w=900&q=80`);
  });
});
