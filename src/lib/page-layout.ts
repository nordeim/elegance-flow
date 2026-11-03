/**
 * Layout-system contracts — the LOGIN + 404 families, the two surfaces
 * that carried through the session-199 domain transformation.
 *
 * Every string here was extracted from the LIVE reference app's DOM
 * (the base44 auth-card platform family — byte-verified on
 * colossal-elevate-service-flow.base44.app 2026-11-03). The consumed
 * families are read by the auth surfaces as their single, test-pinned
 * source of truth.
 *
 * Session-199: the CRM layout families (KPI grids, rails, shells,
 * toolbars, dialogs, settings, tab strips, chart geometry — ~100
 * records) retired with the CRM surfaces. Git history preserves them.
 * The login VIEW families (reset/signup/verify stacks, the callout
 * pair) live in src/lib/login-reset.ts; this file owns the CARD
 * construction (LOGIN_LAYOUT) and the designed 404.
 */

/** Login card — the reference's slate design: borderless glass card with a
 *  gradient accent strip, centered logo/title, white Google button and
 *  `h-11 sm:h-12` slate inputs. The logo is a CSS brand mark (the reference
 *  hotlinks a screenshot; we keep the same white-circle shape). */
export const LOGIN_LAYOUT = {
  page: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4",
  card: "relative overflow-hidden rounded-2xl border-0 bg-white/95 shadow-2xl backdrop-blur-sm",
  accent: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200",
  inner: "p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10",
  centered: "flex flex-col items-center text-center space-y-6 sm:space-y-8",
  logoWrap: "relative group",
  logoGlow:
    "absolute inset-0 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-40",
  logo: "relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg ring-4 ring-white/50 transition-all duration-300 group-hover:shadow-xl sm:h-24 sm:w-24",
  title: "text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight",
  subtitle: "text-slate-500 text-sm sm:text-base font-medium",
  google:
    "flex w-full items-center justify-center gap-3 rounded-xl border border-[#e9e6e0] bg-white px-5 py-3.5 font-medium text-[#0f0e0e] text-[16px] transition-all duration-200 hover:border-[#ddd8d2] hover:bg-[#f1eeea] hover:shadow-sm",
  googleIcon: "-ml-4 transition-transform duration-200",
  divider: "relative my-6",
  dividerLine: "shrink-0 h-[1px] w-full bg-slate-200",
  dividerLabel: "relative flex justify-center text-xs uppercase",
  dividerLabelSpan: "bg-white px-3 font-medium tracking-wider text-[#5d5d5d]",
  form: "w-full space-y-4 sm:space-y-5",
  fields: "space-y-3 sm:space-y-4",
  // Session-96 (S96-P0, the 96-c form-family walk): the v3 class string
  // `space-y-1.5` is v4-FALSIFIED on the auth fields — v4's space-y puts
  // margin-BOTTOM on the PRECEDING child (the label), a non-replaced
  // INLINE element where vertical margins are IGNORED, silently losing
  // the 6px gap (LIVE at 390+1440: label→input 4px ours vs 10px the
  // reference; its v3 margin-TOP lands on the inputWrap BLOCK,
  // m=[6px/0px] measured). `[&>*+*]:mt-1.5` expresses the reference's
  // computed mechanism in v4 — the M-79c2 doctrine (same genus class as
  // the back-button mb-2 fix). The label STAYS INLINE like the
  // reference's own 16px inline box.
  field: "[&>*+*]:mt-1.5",
  label: "text-sm font-medium text-slate-700",
  inputWrap: "relative",
  inputIcon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500",
  input:
    "h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-3 placeholder:text-slate-600 focus:border-slate-400 focus:outline-2 focus:outline-transparent focus:outline-offset-2 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-base md:text-sm sm:h-12",
  // Session-79 (M-79c1/M-79c4, live-probed on the reference): the auth
  // inputs carry the stock text-base md:text-sm pair (16px <768, 14px at
  // desktop — LIVE: 14px at 1440) and focus to a SOLID slate-400 2px ring
  // + a 2px WHITE offset (computed rgb(148,163,184) 0 0 0 4px over
  // rgb(255,255,255) 0 0 0 2px) — the 30%-opacity ringless-offset arm
  // we shipped since s7 computed oklab(… / 0.3) 0 0 0 2px.
  // Round-13: py-2 + the focus:outline-2/transparent/offset-2
  // composition port the reference's LIVE computed faces (8px vertical
  // padding; the v3 outline-none = solid 2px transparent + offset 2px —
  // the seventh v4 trap: v4's outline-none is style:none, and v4.3's
  // outline-hidden is ALSO style:none with the transparent outline
  // forced-colors-only — only the composition computes the v3 face).
  // The reference's auth inputs compute exactly these on /login (the
  // drift probe's login census).
  submit:
    "flex h-11 w-full items-center justify-center gap-1 px-3 py-2 rounded-xl bg-slate-900 font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-transparent focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm sm:h-12",
  footer: "flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0",
  footerLink: "text-sm text-slate-500 transition-colors hover:text-slate-700",
  footerLinkStrong: "font-medium text-slate-700",
} as const;

/** The designed 404 — OUR superset surface (the reference's SPA renders
 *  empty shells for unknown routes, never a designed 404; the s12
 *  doctrine: ours adjudicates routability and serves a designed face
 *  with the TRUE 404 status — the documented deviation that a designed
 *  404 beats a blank shell). The slate-family construction carried
 *  verbatim from the s12 pin. */
export const NOT_FOUND_LAYOUT = {
  page: "min-h-screen flex items-center justify-center p-6 bg-slate-50",
  card: "max-w-md w-full",
  center: "text-center space-y-6",
  headingGroup: "space-y-2",
  h1: "text-7xl font-light text-slate-300",
  divider: "h-0.5 w-16 bg-slate-200 mx-auto",
  textGroup: "space-y-3",
  h2: "text-2xl font-medium text-slate-800",
  p: "text-slate-600 leading-relaxed",
  pathSpan: "font-medium text-slate-700",
  buttonGroup: "pt-6",
  homeButton:
    "inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500",
  homeIcon: "w-4 h-4 mr-2",
  homeHref: "/",
} as const;
