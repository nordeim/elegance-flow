// EleganceFlow site content — the landing's content contracts, byte-mirrored
// from the reference app (colossal-elevate-service-flow.base44.app; every
// string below was live-verified 2026-11-03, session-199's reference audit —
// six DOM probes, the class strings + text nodes quoted verbatim).
//
// CASE DISCIPLINE (probe-4/5 finding): the reference's DOM text nodes are
// TITLE-CASE ("Start a Project", "What We Do", "Premium Services") — the
// ALL-CAPS faces ride the CSS `uppercase` text-transform. The strings here
// are the DOM-case forms so tests assert on getByText-visible content while
// the rendered faces still compute the reference's caps.
//
// This module is the ONE source for the landing's words/links/assets so the
// unit battery (tests/site-content.test.ts) can pin the reference's
// vocabulary without scraping JSX, and the component layer stays pure
// presentation.

// ---- header ----------------------------------------------------------------

export const SITE_NAME = "EleganceFlow";

/** The reference's text logo — its own placeholder branding. */
export const STUDIO_WORDMARK = "YOUR STUDIO";

export interface NavItem {
  label: string;
  href: string;
}

/** The header's five section links + the CTA (byte-verified hrefs — the
 *  Work link anchors #portfolio, not #work). */
export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const HEADER_CTA = { label: "Get in Touch", href: "#contact" };

/** The header's two scroll states (probe-1, byte-extracted):
 *  resting over the hero vs scrolled (bg-zinc-950/95 + blur + border + py-4). */
export const HEADER_SCROLL = {
  top: "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-6",
  scrolled:
    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-zinc-950/95 backdrop-blur-md border-b border-white/5 py-4",
} as const;

/** The mobile disclosure panel (probe-2, the open-state innerHTML): the
 *  five links + the CTA, inline under the nav row (no drawer). */
export const MOBILE_PANEL = {
  wrap: "md:hidden bg-zinc-950 border-t border-white/10 px-6 py-6 flex flex-col gap-4",
  link: "text-white/70 hover:text-white text-base font-medium tracking-wide uppercase",
  cta: "mt-2 inline-flex items-center justify-center px-5 py-3 text-sm font-bold tracking-wider uppercase",
  openLabel: "Close menu",
  closedLabel: "Open menu",
} as const;

// ---- hero ------------------------------------------------------------------

export const HERO = {
  eyebrow: "Premium Services",
  /** The h1's two block spans (probe-1 innerHTML). */
  headingLines: ["Work that speaks", "for itself."] as const,
  paragraph:
    "We deliver exceptional results for clients who care about quality. Tell us about your project — we'd love to work together.",
  primaryCta: "Start a Project",
  secondaryCta: "See Our Work",
  scrollLabel: "Scroll",
  /** The reference's full-bleed hero image (Unsplash, byte-verified URL + alt). */
  image:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80",
  imageAlt: "Hero",
} as const;

// ---- about -----------------------------------------------------------------

export const ABOUT = {
  eyebrow: "About Us",
  headingLines: ["Obsessed with", "craft and results."] as const,
  paragraph:
    "We're a small, focused team that believes great work comes from genuine care. Every project gets our full attention — from the first conversation to final delivery. We don't do average.",
  /** The reference's about image (Unsplash, byte-verified URL + alt). */
  image:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80",
  imageAlt: "About",
  stats: [
    { value: "50+", label: "Happy Clients" },
    { value: "5", label: "Years in Business" },
    { value: "100%", label: "Client Satisfaction" },
  ],
} as const;

// ---- services ----------------------------------------------------------------

export interface Service {
  icon: "palette" | "monitor" | "camera" | "megaphone";
  title: string;
  description: string;
  price: string;
  /** The Design & Web card is the reference's FEATURED card (bg-amber-500,
   *  zinc-950 ink, black/10 price rule — probe-2's computed styles). */
  featured?: boolean;
}

export const SERVICES_HEADER = {
  eyebrow: "What We Do",
  headingLines: ["Services tailored", "to your goals."] as const,
} as const;

export const SERVICES: Service[] = [
  {
    icon: "palette",
    title: "Creative Direction",
    description:
      "Visual storytelling that captures the essence of your brand and resonates with the right audience.",
    price: "From $1,500",
  },
  {
    icon: "monitor",
    title: "Design & Web",
    description:
      "Thoughtful design and fast, modern websites that convert visitors into clients.",
    price: "From $3,000",
    featured: true,
  },
  {
    icon: "camera",
    title: "Photography",
    description:
      "Professional photography that makes your brand look its absolute best — online and in print.",
    price: "From $800",
  },
  {
    icon: "megaphone",
    title: "Brand Strategy",
    description:
      "Positioning, messaging, and audience clarity so every decision you make is pointed in the right direction.",
    price: "From $1,200",
  },
];

// ---- work (the portfolio) ----------------------------------------------------

export type ProjectCategory = "Branding" | "Web" | "Photography";

/** The filter strip's labels, byte-verified (title-case text; the uppercase
 *  is the CSS text-transform). */
export const WORK_FILTERS = ["All", "Branding", "Web", "Photography"] as const;
export type WorkFilter = (typeof WORK_FILTERS)[number];

export const WORK_HEADER = {
  eyebrow: "Our Work",
  /** The portfolio h2 is the ONE heading without line-break spans. */
  heading: "Selected projects.",
} as const;

export interface Project {
  title: string;
  category: ProjectCategory;
  /** Unsplash, byte-verified URLs from the reference's DOM. */
  image: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Project One",
    category: "Branding",
    image:
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=700&q=80",
  },
  {
    title: "Project Two",
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=700&q=80",
  },
  {
    title: "Project Three",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80",
  },
  {
    title: "Project Four",
    category: "Branding",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&q=80",
  },
  {
    title: "Project Five",
    category: "Web",
    image:
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=700&q=80",
  },
  {
    title: "Project Six",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=700&q=80",
  },
];

/**
 * The portfolio filter — a pure seam (the reference's live behavior,
 * click-verified: Branding leaves exactly Projects One + Four).
 */
export function filterProjects(
  projects: Project[],
  filter: WorkFilter,
): Project[] {
  if (filter === "All") return projects;
  return projects.filter((p) => p.category === filter);
}

// ---- testimonials --------------------------------------------------------------

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export const TESTIMONIALS_HEADER = {
  eyebrow: "Client Love",
  headingLines: ["Trusted by clients", "who value quality."] as const,
} as const;

/** The avatar↔role pairing is the reference's own (probe-6's selector
 *  order: Founder=1494790108377, CEO=1507003211169, CD=1438761681033). */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They took the time to truly understand our business before touching a single design. The result was something we're genuinely proud of — and our customers noticed immediately.",
    name: "Client Name",
    role: "Founder, Company",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    quote:
      "Professional, responsive, and talented. We've worked with other studios before, but none of them came close to this level of attention to detail.",
    name: "Client Name",
    role: "CEO, Company",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    quote:
      "Working with this team was the best investment we made for our brand this year. The clarity and quality they brought to the project was remarkable.",
    name: "Client Name",
    role: "Creative Director, Company",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

// ---- contact -----------------------------------------------------------------

export const CONTACT = {
  eyebrow: "Get in Touch",
  headingLines: ["Let's work", "together."] as const,
  paragraph:
    "Fill out the form and we'll get back to you within 24 hours with next steps.",
  email: "hello@yourstudio.com",
  phone: "+1 (000) 000-0000",
  location: "Your City, Country",
  /** The form's labels, byte-verified (uppercase rides the CSS). */
  labels: {
    name: "Name",
    email: "Email",
    service: "Service",
    message: "Message",
  } as const,
  servicePlaceholder: "Select a service...",
  messagePlaceholder: "Tell us about your project...",
  namePlaceholder: "Alex Johnson",
  emailPlaceholder: "alex@company.com",
  submit: "Send Inquiry",
} as const;

/** The reference's success toast, byte-verified live after a real submit. */
export const INQUIRY_TOAST = {
  title: "Message sent!",
  description: "We'll be in touch within 24 hours.",
} as const;

// ---- footer -----------------------------------------------------------------

export const FOOTER = {
  wordmark: "YOUR STUDIO",
  tagline: "Quality work for quality clients.",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Dribbble", href: "#" },
  ],
  copyright: "© 2026 Your Studio. All rights reserved.",
} as const;

// ---- auth card ----------------------------------------------------------------

/** The auth card's strings, byte-verified live on all three views. */
export const AUTH = {
  brand: SITE_NAME,
  welcomeHeading: "Welcome to EleganceFlow",
  welcomeSub: "Sign in to continue",
  googleButton: "Continue with Google",
  orDivider: "or",
  emailLabel: "Email",
  passwordLabel: "Password",
  signIn: "Sign in",
  forgotPassword: "Forgot password?",
  needAccount: "Need an account? Sign up",
  backToSignIn: "Back to sign in",
  createHeading: "Create your account",
  createButton: "Create account",
  confirmPasswordLabel: "Confirm Password",
  resetHeading: "Reset your password",
  resetSub: "Enter your email and we'll send you a link to reset your password",
  sendResetLink: "Send reset link",
} as const;
