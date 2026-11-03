import { describe, expect, it } from "vitest";

import {
  ABOUT,
  AUTH,
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

// Session-199 (the domain transformation): the SITE-CONTENT contracts —
// every string below was byte-extracted from the LIVE reference DOM
// (colossal-elevate-service-flow.base44.app; six probes, 2026-11-03).
// The strings are the DOM-CASE forms: the ALL-CAPS faces ride the CSS
// `uppercase` text-transform, so getByText in the e2e layer must match
// THESE forms.
//
// The CASE doctrine's poster child: the hero CTA is "Start a Project"
// in the DOM (rendering "START A PROJECT" through the CSS) — a
// well-meaning "START A PROJECT" literal would fail every case-
// sensitive locator while looking identical in a screenshot.

describe("header contracts", () => {
  it("the wordmark is the reference's own placeholder branding", () => {
    expect(STUDIO_WORDMARK).toBe("YOUR STUDIO");
  });

  it("the five section links carry the byte-verified hrefs (Work anchors #portfolio)", () => {
    expect(NAV_ITEMS).toEqual([
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Work", href: "#portfolio" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ]);
  });

  it("the header CTA targets the contact section", () => {
    expect(HEADER_CTA).toEqual({ label: "Get in Touch", href: "#contact" });
  });

  it("the two scroll states (probe-1, byte-extracted)", () => {
    expect(HEADER_SCROLL.top).toBe(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-6",
    );
    expect(HEADER_SCROLL.scrolled).toBe(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-zinc-950/95 backdrop-blur-md border-b border-white/5 py-4",
    );
  });

  it("the mobile disclosure panel's byte-verified classes + the toggle labels", () => {
    expect(MOBILE_PANEL.wrap).toBe(
      "md:hidden bg-zinc-950 border-t border-white/10 px-6 py-6 flex flex-col gap-4",
    );
    expect(MOBILE_PANEL.link).toBe(
      "text-white/70 hover:text-white text-base font-medium tracking-wide uppercase",
    );
    expect(MOBILE_PANEL.cta).toBe(
      "mt-2 inline-flex items-center justify-center px-5 py-3 text-sm font-bold tracking-wider uppercase",
    );
    expect(MOBILE_PANEL.openLabel).toBe("Close menu");
    expect(MOBILE_PANEL.closedLabel).toBe("Open menu");
  });
});

describe("hero contracts", () => {
  it("the eyebrow + the two h1 span lines + the paragraph, DOM-case", () => {
    expect(HERO.eyebrow).toBe("Premium Services");
    expect(HERO.headingLines).toEqual(["Work that speaks", "for itself."]);
    expect(HERO.paragraph).toBe(
      "We deliver exceptional results for clients who care about quality. Tell us about your project — we'd love to work together.",
    );
    expect(HERO.primaryCta).toBe("Start a Project");
    expect(HERO.secondaryCta).toBe("See Our Work");
    expect(HERO.scrollLabel).toBe("Scroll");
  });

  it("the hero image is the reference's byte-captured Unsplash URL", () => {
    expect(HERO.image).toBe(
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80",
    );
    expect(HERO.imageAlt).toBe("Hero");
  });
});

describe("about contracts", () => {
  it("the eyebrow + h1 span lines + paragraph", () => {
    expect(ABOUT.eyebrow).toBe("About Us");
    expect(ABOUT.headingLines).toEqual(["Obsessed with", "craft and results."]);
    expect(ABOUT.paragraph).toContain("We don't do average.");
    expect(ABOUT.image).toBe(
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80",
    );
    expect(ABOUT.imageAlt).toBe("About");
  });

  it("the three stats (50+ / 5 / 100%)", () => {
    expect(ABOUT.stats).toEqual([
      { value: "50+", label: "Happy Clients" },
      { value: "5", label: "Years in Business" },
      { value: "100%", label: "Client Satisfaction" },
    ]);
  });
});

describe("services contracts", () => {
  it("the section header", () => {
    expect(SERVICES_HEADER.eyebrow).toBe("What We Do");
    expect(SERVICES_HEADER.headingLines).toEqual([
      "Services tailored",
      "to your goals.",
    ]);
  });

  it("the four services with their byte-verified prices", () => {
    expect(SERVICES).toHaveLength(4);
    expect(SERVICES.map((s) => [s.title, s.price])).toEqual([
      ["Creative Direction", "From $1,500"],
      ["Design & Web", "From $3,000"],
      ["Photography", "From $800"],
      ["Brand Strategy", "From $1,200"],
    ]);
  });

  it("the Design & Web card is the reference's FEATURED card (amber bg, zinc ink — probe-2)", () => {
    const featured = SERVICES.filter((s) => s.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0].title).toBe("Design & Web");
  });

  it("the four lucide icons map 1:1", () => {
    expect(SERVICES.map((s) => s.icon)).toEqual([
      "palette",
      "monitor",
      "camera",
      "megaphone",
    ]);
  });
});

describe("work (portfolio) contracts", () => {
  it("the section header — the ONE heading without line spans", () => {
    expect(WORK_HEADER.eyebrow).toBe("Our Work");
    expect(WORK_HEADER.heading).toBe("Selected projects.");
  });

  it("the four filters, byte-verified labels", () => {
    expect(WORK_FILTERS).toEqual(["All", "Branding", "Web", "Photography"]);
  });

  it("the six projects with their categories (the live filter semantics)", () => {
    expect(PROJECTS).toHaveLength(6);
    expect(PROJECTS.map((p) => [p.title, p.category])).toEqual([
      ["Project One", "Branding"],
      ["Project Two", "Web"],
      ["Project Three", "Photography"],
      ["Project Four", "Branding"],
      ["Project Five", "Web"],
      ["Project Six", "Photography"],
    ]);
  });

  it("filterProjects: Branding leaves EXACTLY Projects One + Four (the live-verified behavior)", () => {
    const branding = filterProjects(PROJECTS, "Branding");
    expect(branding.map((p) => p.title)).toEqual(["Project One", "Project Four"]);
  });

  it("filterProjects: every filter narrows honestly (All returns the full list)", () => {
    expect(filterProjects(PROJECTS, "All")).toHaveLength(6);
    expect(filterProjects(PROJECTS, "Web").map((p) => p.title)).toEqual([
      "Project Two",
      "Project Five",
    ]);
    expect(filterProjects(PROJECTS, "Photography").map((p) => p.title)).toEqual([
      "Project Three",
      "Project Six",
    ]);
    const unknown = "Other" as WorkFilter;
    expect(filterProjects(PROJECTS, unknown)).toEqual([]);
  });
});

describe("testimonials contracts", () => {
  it("the section header ('Client Love' — NOT 'Testimonials')", () => {
    expect(TESTIMONIALS_HEADER.eyebrow).toBe("Client Love");
    expect(TESTIMONIALS_HEADER.headingLines).toEqual([
      "Trusted by clients",
      "who value quality.",
    ]);
  });

  it("the three testimonials (roles + the avatar↔role pairing the live selector shows)", () => {
    expect(TESTIMONIALS.map((t) => [t.role, t.avatar])).toEqual([
      ["Founder, Company", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"],
      ["CEO, Company", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"],
      ["Creative Director, Company", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"],
    ]);
    expect(TESTIMONIALS.every((t) => t.name === "Client Name")).toBe(true);
  });

  it("the quotes are distinct (the carousel rotates REAL content)", () => {
    expect(new Set(TESTIMONIALS.map((t) => t.quote)).size).toBe(3);
  });
});

describe("contact contracts", () => {
  it("the left column's words", () => {
    expect(CONTACT.eyebrow).toBe("Get in Touch");
    expect(CONTACT.headingLines).toEqual(["Let's work", "together."]);
    expect(CONTACT.paragraph).toBe(
      "Fill out the form and we'll get back to you within 24 hours with next steps.",
    );
    expect(CONTACT.email).toBe("hello@yourstudio.com");
    expect(CONTACT.phone).toBe("+1 (000) 000-0000");
    expect(CONTACT.location).toBe("Your City, Country");
  });

  it("the form's labels + placeholders + submit, DOM-case", () => {
    expect(CONTACT.labels).toEqual({
      name: "Name",
      email: "Email",
      service: "Service",
      message: "Message",
    });
    expect(CONTACT.servicePlaceholder).toBe("Select a service...");
    expect(CONTACT.messagePlaceholder).toBe("Tell us about your project...");
    expect(CONTACT.namePlaceholder).toBe("Alex Johnson");
    expect(CONTACT.emailPlaceholder).toBe("alex@company.com");
    expect(CONTACT.submit).toBe("Send Inquiry");
  });

  it("the success toast pair (live-verified after a REAL submit)", () => {
    expect(INQUIRY_TOAST).toEqual({
      title: "Message sent!",
      description: "We'll be in touch within 24 hours.",
    });
  });
});

describe("footer contracts", () => {
  it("the wordmark + tagline + the four text socials (all href=\"#\")", () => {
    expect(FOOTER.wordmark).toBe("YOUR STUDIO");
    expect(FOOTER.tagline).toBe("Quality work for quality clients.");
    expect(FOOTER.socials.map((s) => s.label)).toEqual([
      "Instagram",
      "Twitter",
      "LinkedIn",
      "Dribbble",
    ]);
    expect(FOOTER.socials.every((s) => s.href === "#")).toBe(true);
    expect(FOOTER.copyright).toBe("© 2026 Your Studio. All rights reserved.");
  });
});

describe("auth-card contracts", () => {
  it("the brand strings, byte-verified on all three views", () => {
    expect(AUTH.welcomeHeading).toBe("Welcome to EleganceFlow");
    expect(AUTH.welcomeSub).toBe("Sign in to continue");
    expect(AUTH.googleButton).toBe("Continue with Google");
    expect(AUTH.orDivider).toBe("or");
    expect(AUTH.signIn).toBe("Sign in");
    expect(AUTH.forgotPassword).toBe("Forgot password?");
    expect(AUTH.needAccount).toBe("Need an account? Sign up");
    expect(AUTH.backToSignIn).toBe("Back to sign in");
    expect(AUTH.createHeading).toBe("Create your account");
    expect(AUTH.createButton).toBe("Create account");
    expect(AUTH.confirmPasswordLabel).toBe("Confirm Password");
    expect(AUTH.resetHeading).toBe("Reset your password");
    expect(AUTH.resetSub).toBe(
      "Enter your email and we'll send you a link to reset your password",
    );
    expect(AUTH.sendResetLink).toBe("Send reset link");
  });
});
