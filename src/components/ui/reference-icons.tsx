/**
 * Round-16 (the attribute/geometry census): the reference's own icon
 * glyphs for the four lucide-era divergent shapes. Our lucide-react
 * 0.525 ships REDESIGNED glyphs where the live reference ships its
 * older lucide-era set (probe-verified 2026-11-04, svg-by-svg, 18
 * index-matched landing icons): the palette (the reference's
 * circles-and-body vs the redesign's teardrop), the megaphone (the
 * reference's horn-and-handle vs the redesign's solid horn with sound
 * waves), the mail (the reference's 1.94-radius arc vs the redesign's
 * 2.009), the phone (the reference's classic handset vs the redesign's
 * continuous-stroke redraw). The glyph face is a visible byte-parity
 * surface (the round-15 quote-glyph precedent) — so these four carry
 * the reference's EXACT path data, in its exact child order, on the
 * exact lucide svg skeleton (`lucide lucide-<name>` class pair, the
 * stroke attrs). The other 14 landing glyphs (and the auth card's Lock)
 * paint identically across both lucide eras and stay lucide-react; the
 * menu icon differs only in internals (line vs path primitives — the
 * same painted geometry, recorded). `aria-hidden` stays on: the
 * documented invisible-a11y-superset family.
 *
 * The rejected alternative (recorded): pinning lucide-react down to the
 * reference's era — the exact version is unreadable (the reference's
 * sheets are cross-origin) and the currently-identical 13 glyphs would
 * ride the downgrade's own era drift. The surgical swap touches only
 * the four divergent faces.
 */
import * as React from "react";

type GlyphProps = {
  size?: number;
  className?: string;
  /** passthrough — the sites spell the superset explicitly; the
   * glyph defaults it on regardless. */
  "aria-hidden"?: boolean | "true" | "false";
};

function ReferenceGlyph({
  name,
  size = 24,
  className = "",
  "aria-hidden": ariaHidden = true,
  children,
}: GlyphProps & { name: string; children: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-${name} ${className}`.trim()}
      aria-hidden={ariaHidden}
    >
      {children}
    </svg>
  );
}

/** The reference's palette: four paint dots + the classic body path. */
export function ReferencePalette({ size, className }: GlyphProps) {
  return (
    <ReferenceGlyph name="palette" size={size} className={className}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </ReferenceGlyph>
  );
}

/** The reference's megaphone: the horn + the round handle. */
export function ReferenceMegaphone({ size, className }: GlyphProps) {
  return (
    <ReferenceGlyph name="megaphone" size={size} className={className}>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </ReferenceGlyph>
  );
}

/** The reference's mail: the rect body + the 1.94-radius flap arc. */
export function ReferenceMail({ size, className }: GlyphProps) {
  return (
    <ReferenceGlyph name="mail" size={size} className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </ReferenceGlyph>
  );
}

/** The reference's phone: the classic handset silhouette. */
export function ReferencePhone({ size, className }: GlyphProps) {
  return (
    <ReferenceGlyph name="phone" size={size} className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </ReferenceGlyph>
  );
}
