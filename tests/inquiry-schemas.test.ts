import { describe, expect, it } from "vitest";

import {
  INQUIRY_SERVICES,
  INQUIRY_STATUSES,
  inquiryCreateSchema,
  inquiryStatusSchema,
} from "@/lib/schemas";

// Session-199: the INQUIRY zod family — the landing's contact-form POST
// body + the inbox's status transition. The service vocabulary is the
// reference's own form-select list (byte-verified live; "Select a
// service…" is the placeholder, never a submitted value).

const VALID_BODY = {
  name: "Maya Rodriguez",
  email: "Maya@BrightLabs.io",
  service: "Design & Web",
  message: "We need a full marketing site for Q1.",
} as const;

describe("INQUIRY_SERVICES (the form-select vocabulary)", () => {
  it("carries the reference's five byte-verified options", () => {
    expect(INQUIRY_SERVICES).toEqual([
      "Creative Direction",
      "Design & Web",
      "Photography",
      "Brand Strategy",
      "Other / Not Sure",
    ]);
  });

  it("never admits the placeholder as a value", () => {
    expect(INQUIRY_SERVICES).not.toContain("Select a service...");
  });
});

describe("INQUIRY_STATUSES (the inbox vocabulary)", () => {
  it("is new | read | archived", () => {
    expect(INQUIRY_STATUSES).toEqual(["new", "read", "archived"]);
  });
});

describe("inquiryCreateSchema", () => {
  it("parses a well-formed body (email normalized to lowercase)", () => {
    const parsed = inquiryCreateSchema.parse(VALID_BODY);
    expect(parsed.email).toBe("maya@brightlabs.io");
    expect(parsed.name).toBe("Maya Rodriguez");
    expect(parsed.service).toBe("Design & Web");
  });

  it("trims whitespace around every field", () => {
    const parsed = inquiryCreateSchema.parse({
      ...VALID_BODY,
      name: "  Maya  ",
      message: "  Hello  ",
    });
    expect(parsed.name).toBe("Maya");
    expect(parsed.message).toBe("Hello");
  });

  it("answers 'Name is required' for a missing name (the typeof form)", () => {
    const result = inquiryCreateSchema.safeParse({ ...VALID_BODY, name: undefined });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Name is required");
    }
  });

  it("answers 'Name is required' for an empty name", () => {
    const result = inquiryCreateSchema.safeParse({ ...VALID_BODY, name: "   " });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Name is required");
    }
  });

  it("bounds the name at 120 chars (the honest-rejection form)", () => {
    const result = inquiryCreateSchema.safeParse({ ...VALID_BODY, name: "x".repeat(121) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Name must be reasonably sized");
    }
  });

  it("answers the email-format message for a malformed email", () => {
    const result = inquiryCreateSchema.safeParse({ ...VALID_BODY, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Enter a valid email address");
    }
  });

  it("answers 'Please select a service' for the placeholder/empty service", () => {
    const result = inquiryCreateSchema.safeParse({ ...VALID_BODY, service: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Please select a service");
    }
  });

  it("answers 'Please select a service' for an off-vocabulary service", () => {
    const result = inquiryCreateSchema.safeParse({ ...VALID_BODY, service: "Catering" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Please select a service");
    }
  });

  it("answers 'Message is required' for a missing/empty message", () => {
    const missing = inquiryCreateSchema.safeParse({ ...VALID_BODY, message: undefined });
    expect(missing.success).toBe(false);
    const empty = inquiryCreateSchema.safeParse({ ...VALID_BODY, message: "" });
    expect(empty.success).toBe(false);
    if (!empty.success) {
      expect(empty.error.issues[0].message).toBe("Message is required");
    }
  });

  it("bounds the message at 2000 chars", () => {
    const result = inquiryCreateSchema.safeParse({ ...VALID_BODY, message: "x".repeat(2001) });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Message must be reasonably sized");
    }
  });
});

describe("inquiryStatusSchema", () => {
  it("accepts each of the three statuses", () => {
    for (const status of INQUIRY_STATUSES) {
      expect(inquiryStatusSchema.parse({ status })).toEqual({ status });
    }
  });

  it("answers 'Invalid status' for anything off the vocabulary", () => {
    const result = inquiryStatusSchema.safeParse({ status: "deleted" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid status");
    }
  });
});
