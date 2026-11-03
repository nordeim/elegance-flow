"use client";

// Session-199 (the domain transformation): THE ELEGANCEFLOW LANDING — the
// reference app's whole public one-pager (colossal-elevate-service-flow
// .base44.app), byte-mirrored from six live DOM probes (2026-11-03):
// every class string, text node (DOM-CASE — the caps ride the CSS
// `uppercase` transform), icon size, span structure and scroll state
// below was extracted from the reference's rendered DOM, not invented.
//
// The construction in one view:
//   header (fixed, transparent → scrolled bg-zinc-950/95 + blur + py-4)
//     · nav row: "YOUR STUDIO" wordmark · hidden md:flex 5 section links
//       · hidden md:inline-flex amber "Get in Touch" · md:hidden menu button
//     · the mobile disclosure panel (inline under the row, no drawer):
//       5 links + the amber CTA; a link click navigates AND closes
//   hero (min-h-screen zinc-950): full-bleed image opacity-30 · left
//     gradient · amber w-1 accent bar · max-w-3xl column (amber eyebrow,
//     96px font-black h1 in two block spans, white/60 paragraph, the
//     amber + outline CTA pair) · the bottom-left SCROLL indicator
//   about (white): 4/5 image + the amber border-4 offset frame · stats row
//   services (zinc-950): 4 cards — the Design & Web card is FEATURED
//     (bg-amber-500, zinc-950 ink, zinc-900/70 body, black/10 price rule)
//   work (white): the filter strip (active chip = AMBER — probe-2's
//     computed styles; the inactive chips zinc-100/zinc-500) + 6
//     aspect-square cards with hover overlays (hover-only, no dialogs —
//     verified live)
//   testimonials (zinc-950): the amber lucide-quote + the 2xl quote +
//     person row; the selector rail (active = border-l-4 amber + bg-
//     zinc-900 + white name; inactive = border-white/5 + white/40 name)
//   contact (white): the info rows (mail/phone links, location plain)
//     + the form (name/email grid pair, the select with the absolute
//     chevron, the 5-row textarea, the amber submit)
//   footer (zinc-950): wordmark + tagline · 4 text socials · copyright
//
// THE SUPERSET (the reference collects the form and toasts only):
// ours POSTs to /api/inquiry — a zod-validated, rate-limited, PERSISTED
// row (the /dashboard inbox reads it). The success toast is the
// reference's own byte-verified pair; failures answer the honest toast.
//
// Deliberate deviations, both invisible in construction (the drawer
// precedent: a11y supersets never cost the visible face):
//   1. id/htmlFor bindings on the four form fields — the reference
//      ships unassociated labels (an axe "label" violation); binding
//      them changes zero pixels.
//   2. The mobile menu button carries aria-expanded — the reference
//      ships a bare toggle (its own menu works, verified; the attribute
//      is the honest disclosure state for assistive tech).
// The reference's mount-time reveal animations (inline opacity 0 → 1)
// are a transient; the at-rest DOM parity is byte-identical without
// them, so they are not reproduced.
//
// Tailwind v4 discipline (docs/Tailwind-V4-Validation-Report.md): the
// zinc palette rides the session-199 @theme re-pin (v3 values — v4's
// oklch re-derivation diverges on every step); `bg-gradient-to-r`
// keeps compiling as the v4 alias of bg-linear-to-r; the
// `outline-2 outline-transparent outline-offset-2` composition on the
// form controls ports the reference's v3 `outline-none` COMPUTED face
// (solid 2px transparent + offset 2px — the round-13 seventh trap:
// v4 renamed outline-none to style:none, and v4.3's outline-hidden is
// ALSO style:none with the transparent outline reserved for
// forced-colors mode — only the composition computes the v3 face in
// normal mode; focus:border-zinc-950 is the reference's own focus
// face).

import * as React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  ChevronDown,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Monitor,
  Palette,
  Phone,
  Quote,
  X,
} from "lucide-react";

import { toast } from "@/components/ui/toast";
import { INQUIRY_SERVICES } from "@/lib/schemas";
import {
  ABOUT,
  CONTACT,
  FOOTER,
  HEADER_CTA,
  HEADER_SCROLL,
  HERO,
  INQUIRY_TOAST,
  MOBILE_PANEL,
  NAV_ITEMS,
  PROJECTS,
  SERVICES,
  SERVICES_HEADER,
  STUDIO_WORDMARK,
  TESTIMONIALS,
  TESTIMONIALS_HEADER,
  WORK_FILTERS,
  WORK_HEADER,
  filterProjects,
  type WorkFilter,
} from "@/lib/site-content";

/** The reference's amber CTA pair (its inline rgb(245,158,11)/rgb(0,0,0)
 *  expressed through the re-pinned palette). */
const AMBER_CTA_INK = "bg-amber-500 text-black";

const SERVICE_ICONS = {
  palette: Palette,
  monitor: Monitor,
  camera: Camera,
  megaphone: Megaphone,
} as const;

export function LandingPage() {
  // The header's two scroll states (probe-1: scrolled past the top adds
  // bg-zinc-950/95 + backdrop-blur-md + border-b + py-4).
  const [scrolled, setScrolled] = React.useState(false);
  // The mobile disclosure (probe-2's open-state DOM: an inline panel under
  // the nav row — verified working live, closes on link click).
  const [menuOpen, setMenuOpen] = React.useState(false);
  // The work filter (live-verified: Branding leaves Projects One + Four).
  const [filter, setFilter] = React.useState<WorkFilter>("All");
  // The testimonial carousel (live-verified: 3 distinct quotes).
  const [active, setActive] = React.useState(0);
  // The contact form.
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [service, setService] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [pending, setPending] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok || !body?.ok) {
        toast.error(
          "Message could not be sent",
          body?.error?.message ?? "Please try again.",
        );
        return;
      }
      // The reference's byte-verified success toast.
      toast.success(INQUIRY_TOAST.title, INQUIRY_TOAST.description);
      setName("");
      setEmail("");
      setService("");
      setMessage("");
    } catch {
      toast.error(
        "Message could not be sent",
        "Network error — check your connection and try again.",
      );
    } finally {
      setPending(false);
    }
  }

  const visibleProjects = filterProjects(PROJECTS, filter);
  const testimonial = TESTIMONIALS[active];

  return (
    <div>
      {/* ---- header (fixed; the two scroll states swap classes) ------------- */}
      <header className={scrolled ? HEADER_SCROLL.scrolled : HEADER_SCROLL.top}>
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="text-white font-black text-lg tracking-widest">
            {STUDIO_WORDMARK}
          </a>
          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-white/60 hover:text-white text-sm font-medium tracking-wider uppercase transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={HEADER_CTA.href}
            className={`hidden md:inline-flex items-center px-5 py-2.5 text-sm font-semibold tracking-wider uppercase transition-all duration-200 ${AMBER_CTA_INK}`}
          >
            {HEADER_CTA.label}
          </a>
          <button
            type="button"
            className="md:hidden text-white p-1"
            aria-label={menuOpen ? MOBILE_PANEL.openLabel : MOBILE_PANEL.closedLabel}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        {menuOpen && (
          <div className={MOBILE_PANEL.wrap}>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={MOBILE_PANEL.link}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={HEADER_CTA.href}
              className={`${MOBILE_PANEL.cta} ${AMBER_CTA_INK}`}
              onClick={() => setMenuOpen(false)}
            >
              {HEADER_CTA.label}
            </a>
          </div>
        )}
      </header>

      {/* ---- hero ------------------------------------------------------------- */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950">
        <img
          src={HERO.image}
          alt={HERO.imageAlt}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.3em] uppercase mb-6 text-amber-500">
              {HERO.eyebrow}
            </p>
            {/* Session-199 (the s11 re-derivation doctrine, the
                two-breakpoint decode): the reference's computed
                line-heights are 0.9×font at <md (its plain .leading-
                [0.9] sorts after its plain .text-5xl) but 1×font at
                md+ (its media-block .md\:text-7xl / .lg\:text-8xl
                line-height:1 rules sort AFTER the plain leading —
                live-probed: 43.2px at 390, 72px at md, 96px at 1280).
                OUR v4 sorts the arbitrary leading LAST at every width,
                so the parity port is leading-[0.9] md:leading-none —
                0.9 below md, 1 from md up. The five h2s carry the same
                construction at 0.95. */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] md:leading-none tracking-tight mb-8">
              <span className="block">{HERO.headingLines[0]}</span>
              <span className="block">{HERO.headingLines[1]}</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
              {HERO.paragraph}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className={`group inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:gap-5 ${AMBER_CTA_INK}`}
              >
                {HERO.primaryCta}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase border border-white/20 text-white hover:border-white/50 transition-all duration-300"
              >
                {HERO.secondaryCta}
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-6 flex items-center gap-3">
          <div className="w-8 h-px bg-white/30" />
          <span className="text-white/30 text-xs tracking-widest uppercase">
            {HERO.scrollLabel}
          </span>
        </div>
      </section>

      {/* ---- about ------------------------------------------------------------- */}
      <section id="about" className="bg-white py-28 md:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src={ABOUT.image}
              alt={ABOUT.imageAlt}
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 w-1/2 h-1/2 border-4 border-amber-500 -z-10" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-5 text-amber-500">
              {ABOUT.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-950 leading-[0.95] md:leading-none tracking-tight mb-8">
              <span className="block">{ABOUT.headingLines[0]}</span>
              <span className="block">{ABOUT.headingLines[1]}</span>
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed mb-12">{ABOUT.paragraph}</p>
            <div className="grid grid-cols-3 gap-6 border-t border-zinc-100 pt-10">
              {ABOUT.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black mb-1 text-amber-500">{stat.value}</div>
                  <div className="text-zinc-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- services ----------------------------------------------------------- */}
      <section id="services" className="bg-zinc-950 py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-amber-500">
              {SERVICES_HEADER.eyebrow}
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] md:leading-none tracking-tight">
              <span className="block">{SERVICES_HEADER.headingLines[0]}</span>
              <span className="block">{SERVICES_HEADER.headingLines[1]}</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc) => {
              const Icon = SERVICE_ICONS[svc.icon];
              return (
                <div
                  key={svc.title}
                  className={
                    svc.featured
                      ? "relative p-8 flex flex-col gap-5 group transition-all duration-300 text-zinc-950 bg-amber-500"
                      : "relative p-8 flex flex-col gap-5 group transition-all duration-300 bg-zinc-900 border border-white/5 text-white hover:border-white/20"
                  }
                >
                  <Icon
                    size={28}
                    className={svc.featured ? "text-zinc-950" : "text-white/50"}
                  />
                  <div>
                    <h3 className="text-xl font-black mb-2">{svc.title}</h3>
                    <p
                      className={
                        svc.featured
                          ? "text-sm leading-relaxed text-zinc-900/70"
                          : "text-sm leading-relaxed text-white/50"
                      }
                    >
                      {svc.description}
                    </p>
                  </div>
                  <div
                    className={
                      svc.featured
                        ? "mt-auto pt-4 border-t border-black/10"
                        : "mt-auto pt-4 border-t border-white/10"
                    }
                  >
                    <span className="text-sm font-bold tracking-wide">{svc.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- work (the portfolio) ------------------------------------------------ */}
      <section id="portfolio" className="bg-white py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-amber-500">
                {WORK_HEADER.eyebrow}
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-zinc-950 leading-[0.95] md:leading-none tracking-tight">
                {WORK_HEADER.heading}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {WORK_FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
                    filter === f ? AMBER_CTA_INK : "bg-zinc-100 text-zinc-500"
                  }`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleProjects.map((project) => (
              <div
                key={project.title}
                className="group relative overflow-hidden aspect-square cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-zinc-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-7">
                  <p className="text-xs font-bold tracking-widest uppercase mb-1 text-amber-500">
                    {project.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-xl font-black">{project.title}</h3>
                    <ArrowUpRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- testimonials ---------------------------------------------------------- */}
      <section id="testimonials" className="bg-zinc-950 py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-amber-500">
              {TESTIMONIALS_HEADER.eyebrow}
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.95] md:leading-none tracking-tight">
              <span className="block">{TESTIMONIALS_HEADER.headingLines[0]}</span>
              <span className="block">{TESTIMONIALS_HEADER.headingLines[1]}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-12 items-start">
            <div className="md:col-span-3">
              <div>
                <Quote size={40} className="mb-6 opacity-30 text-amber-500" />
                <p className="text-white text-2xl md:text-3xl font-semibold leading-snug mb-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-white font-bold text-sm">{testimonial.name}</div>
                    <div className="text-white/40 text-xs mt-0.5">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-4">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.role}
                  type="button"
                  className={
                    active === idx
                      ? "text-left p-5 border transition-all duration-200 border-l-4 border-l-amber-500 bg-zinc-900"
                      : "text-left p-5 border transition-all duration-200 border-white/5 hover:border-white/15"
                  }
                  onClick={() => setActive(idx)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover opacity-80"
                    />
                    <div>
                      <div
                        className={
                          active === idx
                            ? "text-sm font-bold text-white"
                            : "text-sm font-bold text-white/40"
                        }
                      >
                        {t.name}
                      </div>
                      <div className="text-white/30 text-xs">{t.role}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- contact ----------------------------------------------------------------- */}
      <section id="contact" className="bg-white py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-5 text-amber-500">
              {CONTACT.eyebrow}
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-950 leading-[0.95] md:leading-none tracking-tight mb-6">
              <span className="block">{CONTACT.headingLines[0]}</span>
              <span className="block">{CONTACT.headingLines[1]}</span>
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed mb-12">{CONTACT.paragraph}</p>
            <div className="flex flex-col gap-5">
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center border border-zinc-200 group-hover:border-zinc-400 transition-colors">
                  <Mail size={16} className="text-zinc-400" />
                </div>
                <span className="text-zinc-600 group-hover:text-zinc-950 transition-colors text-sm">
                  {CONTACT.email}
                </span>
              </a>
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center border border-zinc-200 group-hover:border-zinc-400 transition-colors">
                  <Phone size={16} className="text-zinc-400" />
                </div>
                <span className="text-zinc-600 group-hover:text-zinc-950 transition-colors text-sm">
                  {CONTACT.phone}
                </span>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-zinc-200">
                  <MapPin size={16} className="text-zinc-400" />
                </div>
                <span className="text-zinc-600 text-sm">{CONTACT.location}</span>
              </div>
            </div>
          </div>
          <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="inquiry-name"
                  className="text-xs font-bold tracking-widest uppercase text-zinc-400 block mb-2"
                >
                  {CONTACT.labels.name}
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  required
                  className="w-full border border-zinc-200 px-4 py-3 text-sm text-zinc-950 outline-2 outline-transparent outline-offset-2 focus:border-zinc-950 transition-colors"
                  placeholder={CONTACT.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="inquiry-email"
                  className="text-xs font-bold tracking-widest uppercase text-zinc-400 block mb-2"
                >
                  {CONTACT.labels.email}
                </label>
                <input
                  id="inquiry-email"
                  type="email"
                  required
                  className="w-full border border-zinc-200 px-4 py-3 text-sm text-zinc-950 outline-2 outline-transparent outline-offset-2 focus:border-zinc-950 transition-colors"
                  placeholder={CONTACT.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="inquiry-service"
                className="text-xs font-bold tracking-widest uppercase text-zinc-400 block mb-2"
              >
                {CONTACT.labels.service}
              </label>
              <select
                id="inquiry-service"
                className="w-full border border-zinc-200 px-4 py-3 text-sm text-zinc-950 outline-2 outline-transparent outline-offset-2 focus:border-zinc-950 transition-colors bg-white appearance-none pr-10"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">{CONTACT.servicePlaceholder}</option>
                {INQUIRY_SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-4 top-1/2 translate-y-1 pointer-events-none text-zinc-400"
              />
            </div>
            <div>
              <label
                htmlFor="inquiry-message"
                className="text-xs font-bold tracking-widest uppercase text-zinc-400 block mb-2"
              >
                {CONTACT.labels.message}
              </label>
              <textarea
                id="inquiry-message"
                required
                rows={5}
                className="w-full border border-zinc-200 px-4 py-3 text-sm text-zinc-950 outline-2 outline-transparent outline-offset-2 focus:border-zinc-950 transition-colors resize-none"
                placeholder={CONTACT.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className={`group flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 self-start ${AMBER_CTA_INK}`}
            >
              {CONTACT.submit}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </form>
        </div>
      </section>

      {/* ---- footer -------------------------------------------------------------------- */}
      <footer className="bg-zinc-950 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-white font-black text-sm tracking-widest mb-1">
              {FOOTER.wordmark}
            </div>
            <div className="text-white/30 text-xs">{FOOTER.tagline}</div>
          </div>
          <div className="flex items-center gap-6">
            {FOOTER.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-white/30 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
          <div className="text-white/20 text-xs">{FOOTER.copyright}</div>
        </div>
      </footer>
    </div>
  );
}
