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
 *  `h-11 sm:h-12` slate inputs. Round-27 (F-27a): the logo is the
 *  reference's REAL img — the same 283cae1f1_logo the round-24 asset cure
 *  byte-mirrors to src/app/icon.png — self-hosted at /icon.png (never their
 *  CDN), riding the reference's byte classes (the circle span's own class
 *  set + the img's aspect-square h-full w-full object-cover) with its real
 *  alt "EleganceFlow logo"; the CRM-era blue-dot construction retired. */
export const LOGIN_LAYOUT = {
  page: "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4",
  card: "relative overflow-hidden rounded-2xl border-0 bg-white/95 shadow-2xl backdrop-blur-sm",
  accent: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200",
  inner: "p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10",
  centered: "flex flex-col items-center text-center space-y-6 sm:space-y-8",
  logoWrap: "relative group",
  logoGlow:
    "absolute inset-0 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-40",
  // Round-27 (F-27a): the reference's byte class (its own order kept
  // from the live DOM read): flex shrink-0 overflow-hidden rounded-full
  // relative h-20 w-20 sm:h-24 sm:w-24 shadow-lg ring-4 ring-white/50
  // group-hover:shadow-xl transition-all duration-300 — the dot-era
  // extras (bg-white items-center justify-center) retired with the dot.
  logo: "relative flex h-20 w-20 shrink-0 overflow-hidden rounded-full shadow-lg ring-4 ring-white/50 transition-all duration-300 group-hover:shadow-xl sm:h-24 sm:w-24",
  // the reference's img: aspect-square h-full w-full object-cover (its
  // byte class) — self-hosted /icon.png, alt "EleganceFlow logo"
  logoImg: "aspect-square h-full w-full object-cover",
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

/** Reset screen — round-26 (the platform-auth census): the reference's
 *  /reset-password renders the base44 PLATFORM's own reset family — a
 *  DIFFERENT design system from its own login card (live-probed settled
 *  2026-11-05 at 1280 AND 390: its login input computes 48px/12px
 *  radius/slate at 1280; its reset input computes 44px/6px/gray — the
 *  platform template's flat gray-50 page, its white rounded-lg(8px)
 *  shadow-lg card, its FIXED 48/48/40 inner pad, its 24px h2 gray-900
 *  headings with tracking NORMAL, its zinc-500 placeholder ink, its
 *  gray-400 focus family, its 2px gray-900 top strip on the token form
 *  alone, its red-100 80×40 icon on the invalid-link card, its
 *  zinc-950-on-red-50/50 error box). The family is STATIC at every
 *  viewport — the ONE responsive arm is the input's own font ladder
 *  (text-base md:text-sm: 16px at 390 → 14px at 1280, probed). The
 *  session-163 login-family expression (LOGIN_LAYOUT on the reset
 *  screen) is retired — the premise that the reset route shares the
 *  login card's design system never held; pinned by
 *  tests/reset-faces.test.ts. */
export const RESET_LAYOUT = {
  page: "min-h-screen flex items-center justify-center bg-gray-50 p-4",
  card: "relative overflow-hidden rounded-lg bg-white shadow-lg",
  strip: "absolute inset-x-0 top-0 h-0.5 bg-gray-900",
  inner: "px-12 pb-10 pt-12",
  heading: "text-2xl font-bold text-gray-900",
  subtitle: "text-base text-gray-600",
  iconWrap: "flex h-20 w-20 items-center justify-center rounded-full bg-red-100",
  icon: "h-10 w-10 text-red-600",
  label: "text-sm font-medium text-gray-700",
  inputWrap: "relative",
  inputIcon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500",
  input:
    "h-11 w-full rounded-md border border-gray-200 bg-gray-50/50 py-2 pl-10 pr-3 placeholder:text-zinc-500 focus:border-gray-400 focus:outline-2 focus:outline-transparent focus:outline-offset-2 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-base md:text-sm",
  hint: "text-xs text-gray-500",
  primary:
    "h-11 w-full rounded-md bg-gray-900 text-sm font-medium text-white transition-colors hover:bg-gray-800 flex items-center justify-center px-3 py-2 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-transparent focus-visible:outline-offset-2 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
  back: "w-full text-sm text-gray-600 hover:text-gray-900",
  error:
    "rounded-lg border border-red-200 bg-red-50/50 p-4 text-base text-zinc-950",
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

/** Error boundary — round-27 (the CRM-blue/resilience-boundary census):
 *  the boundary family's own comments always claimed "the house dialect
 *  the 404 established" — but rode INLINE literals with a
 *  `bg-primary`-blue Try-again button (the NEO-CRM #2563eb brand family
 *  the round-24 asset cure retired from the icons; the token survived the
 *  domain transformation only because the boundary never carried a face
 *  pin). The seam is the 404's own construction + its Go Home pill family,
 *  with ONE deliberate ink change: the h1 rides slate-500 (4.55:1 — AA
 *  outright, the house doctrine for OUR OWN surfaces) where the 404's
 *  "404" numeral keeps the reference's own slate-300 (the s12 byte-pin,
 *  the sanctioned class). The pre-round-27 boundaries computed 1.42:1 on
 *  the h1 — a WCAG 1.4.3 fail. Pinned by tests/error-faces.test.ts (the
 *  contrast ratios COMPUTED from the live @theme hex, never
 *  comment-pinned). */
export const ERROR_LAYOUT = {
  page: "min-h-screen flex items-center justify-center p-6 bg-slate-50",
  card: "max-w-md w-full",
  center: "text-center space-y-6",
  headingGroup: "space-y-2",
  h1: "text-4xl font-light text-slate-500",
  divider: "h-0.5 w-16 bg-slate-200 mx-auto",
  textGroup: "space-y-3",
  h2: "text-2xl font-medium text-slate-800",
  p: "text-slate-600 leading-relaxed",
  buttonGroup: "pt-6",
  button:
    "inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500",
  buttonIcon: "h-4 w-4 mr-2",
} as const;
