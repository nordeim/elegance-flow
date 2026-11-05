/**
 * Round-28 (F-28a): the SCROLL-REVEAL family seam — the reference's
 * twenty-element motion identity, decoded live (seventeen probes,
 * 2026-11-05). Every value below is the live-probed DOMINANT face:
 *
 *   hero cascade   wrapper translateY(40px) · eyebrow translateX(-20px)
 *                  · h1 spans ×2 translateY(30px) · CTAs wrap
 *                  translateY(20px) — delays 0/100/200/600ms from
 *                  mount (live-sampled: the wrap leads, the CTAs ride
 *                  last), each ~800ms ease-out;
 *   about          grid kids ×2 translateX(∓40px) — the ±40 decode
 *                  explains the extreme-viewport census (the +40px
 *                  at-rest column shift, scrollW = clientW + 6);
 *   services       cards ×4 translateY(30px) on the cards' OWN
 *                  `transition-all duration-300` class (computed
 *                  `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`), 100ms
 *                  stagger (live-sampled 0.30/0.56/0.78/0.93);
 *   portfolio      cards ×6 scale(0.96) at mount (stable 3/3 loads),
 *                  the 100ms family stagger;
 *   testimonials   the quote block translateY(20px);
 *   contact        grid kids ×2 translateX(∓30px).
 *
 * The reveal END state (`opacity: 1; transform: none`) equals the
 * pre-round static face — the parity probes' at-load in-view reads and
 * the full-page captures both land on the revealed face, which is why
 * the family survived twenty-seven rounds of gates (F-28c: the
 * coverage catch). The reference's own nondeterminism (the portfolio
 * auto-reveal race ~75% of loads, the one-load translateX(-30px)
 * portfolio variant, the about re-hide on wheel-up — F-28d) is
 * recorded in the plan doc and deliberately NOT mirrored; the port
 * ships the deterministic dominant family: one-shot reveal at
 * intersection, threshold 0.
 *
 * The decode notes (the s11 doctrine applied to motion):
 *   - the reference animates via a raf loop writing per-frame inline
 *     values (its computed transition stays `all 0s ease` mid-flight);
 *     OUR decode is a CSS transition on the same two properties —
 *     same start state, same end state, same ~800ms ease-out shape.
 *     The drift [reveal] leg pins the duration per-side (the
 *     expectConst pattern).
 *   - the services cards ride their OWN class transition (the inline
 *     style carries only the stagger delay) — the byte-closest decode
 *     of the reference's computed card transition.
 *   - every element's inline style CLEARS at settle (delay + duration
 *     + the 80ms tail): the settled DOM equals the pre-round DOM and
 *     the services cards' hover transitions return unlagged.
 */

export type RevealSpec = {
  /** the live-probed initial offset, e.g. "translateX(-40px)" */
  readonly transform: string;
  /** the stagger/cascade delay in ms (the transition-delay) */
  readonly delayMs: number;
  /** the CSS transition duration in ms (ignored when rideOwnTransition) */
  readonly durationMs: number;
  /** the ease-out decode */
  readonly easing: string;
  /** services cards: the class's own `transition-all` carries the
   *  animation — the inline style NEVER declares a transition */
  readonly rideOwnTransition: boolean;
  /** mount-time auto-reveal (the portfolio/testimonials family — the
   *  reference's own dominant load behavior, live-sampled twice: the
   *  cards animate in at mount, NO stagger, ~400ms, regardless of the
   *  viewport) — versus the default intersection-driven reveal */
  readonly atMount: boolean;
};

export const REVEAL_DURATION_MS = 800;
/** the mount family's faster duration (live-sampled ~400ms) */
export const MOUNT_DURATION_MS = 400;
export const REVEAL_EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";
export const STAGGER_MS = 100;
/** the settle tail: the cleanup fires strictly after the animation */
export const SETTLE_TAIL_MS = 80;

const spec = (
  transform: string,
  delayMs = 0,
  durationMs = REVEAL_DURATION_MS,
  opts: { rideOwnTransition?: boolean; atMount?: boolean } = {},
): RevealSpec => ({
  transform,
  delayMs,
  durationMs,
  easing: REVEAL_EASE,
  rideOwnTransition: opts.rideOwnTransition ?? false,
  atMount: opts.atMount ?? false,
});

/** the hero mount cascade (in view at load — the observer fires at mount) */
export const REVEAL_HERO: readonly RevealSpec[] = [
  spec("translateY(40px)"), // the .max-w-3xl wrapper
  spec("translateX(-20px)", 100), // the amber eyebrow
  spec("translateY(30px)", 200), // h1 span 1
  spec("translateY(30px)", 200), // h1 span 2
  spec("translateY(20px)", 600), // the CTAs wrap
];

/** the about grid kids (image column left, text column right) */
export const REVEAL_ABOUT: readonly RevealSpec[] = [
  spec("translateX(-40px)"),
  spec("translateX(40px)"),
];

/** the services cards — the cards' OWN class transition, the 100ms stagger */
export function servicesSpecs(count: number): RevealSpec[] {
  return Array.from({ length: count }, (_, i) =>
    spec("translateY(30px)", i * STAGGER_MS, 300, { rideOwnTransition: true }),
  );
}

/** the portfolio cards — scale(0.96) at mount, the MOUNT-TIME auto-reveal
 *  (live-sampled twice: all six cards animate in lockstep, NO stagger,
 *  ~400ms — the reference's own dominant load behavior; its one-load
 *  stays-hidden outlier is the F-28d race, recorded never mirrored) */
export function portfolioSpecs(count: number): RevealSpec[] {
  return Array.from({ length: count }, () =>
    spec("scale(0.96)", 0, MOUNT_DURATION_MS, { atMount: true }),
  );
}

/** the testimonials quote block — the mount-time auto-reveal (~400ms) */
export const REVEAL_TESTIMONIALS: readonly RevealSpec[] = [
  spec("translateY(20px)", 0, MOUNT_DURATION_MS, { atMount: true }),
];

/** the contact grid kids (text column left, form column right) */
export const REVEAL_CONTACT: readonly RevealSpec[] = [
  spec("translateX(-30px)"),
  spec("translateX(30px)"),
];

/** the settle window: the inline style clears only AFTER the animation
 *  (delay + duration + the tail) — pure, unit-pinned */
export function settleMs(s: RevealSpec): number {
  return s.delayMs + s.durationMs + SETTLE_TAIL_MS;
}

/**
 * The two inline states. Hidden mirrors the reference's initial inline
 * style byte-for-byte (`opacity: 0; transform: <offset>`) plus OUR
 * transition decode; revealed mirrors its end state (`opacity: 1;
 * transform: none`). The services decode declares NO inline transition
 * (the cards' own class carries it) — only the stagger delay.
 */
export function revealStyle(s: RevealSpec, revealed: boolean): Record<string, string> {
  const base: Record<string, string> = {
    opacity: revealed ? "1" : "0",
    transform: revealed ? "none" : s.transform,
    transitionDelay: `${s.delayMs}ms`,
  };
  if (!s.rideOwnTransition) {
    base.transitionProperty = "opacity, transform";
    base.transitionDuration = `${s.durationMs}ms`;
    base.transitionTimingFunction = s.easing;
  }
  return base;
}