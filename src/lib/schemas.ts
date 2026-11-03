// Zod schemas for the API inputs — session-163 (the Zod layer) carried
// through the session-199 domain transformation.
//
// Pattern donor: zero-balance (`zod ^4`, per-route schemas, field-level
// messages, nothing reaches Prisma unvalidated). The AUTH family's message
// strings are the CURRENT route strings — pinned by the unit + e2e suites.
// The session-166 CRUD family retired with the CRM surfaces; the INQUIRY
// family (the landing's contact-form round trip + the authenticated inbox's
// status transitions) joins the seam.
//
// The FK-EXISTENCE checks and the merged-record invariants stay
// route-side (§7.3: parseBody → ownership checks → mutation — a DB-bound
// check cannot live in a schema).

import { z } from "zod";

import { VERIFICATION_CODE_LENGTH } from "@/lib/verification";

/** The shared email contract: trimmed, lowercased, the 160-char cap that
 *  bounds the SQLite lookup. The pre-163 asString form TRUNCATED silently;
 *  the schema REJECTS with an honest message. The `message` override is
 *  per-consumer: the missing/non-string TYPE error is the caller-specific
 *  required message, not a generic zod string. */
const emailField = (typeMessage: string) =>
  z
    .string({ message: typeMessage })
    .trim()
    .toLowerCase()
    .max(160, "Email must be reasonably sized");

const emailFormat = emailField("Enter a valid email address").regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "Enter a valid email address",
);

export const emailSchema = emailFormat;

/** Passwords: the 8-char minimum every password-setting surface enforces. */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const loginSchema = z
  .object({
    // Session-163: the N-63i "160 everywhere" truncation-parity contract
    // rides the schema now (the pre-163 form read login's email
    // untruncated while signup stored the 160-prefix — a >160 signup
    // could never log in; both surfaces cap at 160 in the one seam).
    email: z
      .string({ message: "Email and password are required" })
      .trim()
      .toLowerCase()
      .max(160, "Email must be reasonably sized"),
    password: z.string({ message: "Email and password are required" }),
  })
  .superRefine((body, ctx) => {
    // The route's composite required-check, preserved verbatim: EITHER
    // field missing answers the ONE message (the per-field ladder would
    // change a pinned string).
    if (!body.email || !body.password) {
      ctx.addIssue({ code: "custom", message: "Email and password are required", path: [] });
    }
  });

export const signupSchema = z.object({
  name: z
    .string({ message: "Invalid name" })
    .trim()
    .max(80)
    .transform((v) => (v === "" ? undefined : v))
    .optional(),
  email: emailFormat,
  password: passwordSchema,
});

export const verifySchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
  code: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length === VERIFICATION_CODE_LENGTH, "Please enter all 6 digits"),
});

export const resendSchema = z.object({
  email: emailField("Email is required").min(1, "Email is required"),
});

export const forgotPasswordSchema = z.object({
  email: emailFormat,
});

export const resetPasswordSchema = z.object({
  reset_token: z
    .string({ message: "Invalid or expired reset token" })
    .trim()
    .min(1, "Invalid or expired reset token")
    .max(200, "Token must be reasonably sized"),
  new_password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(200, "Password must be reasonably sized"),
});

// ---------------------------------------------------------------------------
// Session-199: the INQUIRY family — the landing's contact-form POST (the
// public route) and the inbox's status transition (the authenticated
// route). The service vocabulary is the reference's own form-select list,
// byte-verified live (the five options below, "Select a service…" is the
// placeholder, never a submitted value).
// ---------------------------------------------------------------------------

/** The reference's exact form-select vocabulary (live-verified). */
export const INQUIRY_SERVICES = [
  "Creative Direction",
  "Design & Web",
  "Photography",
  "Brand Strategy",
  "Other / Not Sure",
] as const;

export type InquiryService = (typeof INQUIRY_SERVICES)[number];

/** The inbox's status vocabulary. */
export const INQUIRY_STATUSES = ["new", "read", "archived"] as const;

export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

/** The contact form's POST body — the field order matches the form's
 *  label order (NAME, EMAIL, SERVICE, MESSAGE); parseBody answers the
 *  FIRST issue. */
export const inquiryCreateSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must be reasonably sized"),
  email: emailFormat,
  service: z.enum(INQUIRY_SERVICES, {
    message: "Please select a service",
  }),
  message: z
    .string({ message: "Message is required" })
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message must be reasonably sized"),
});

export type InquiryCreateInput = z.infer<typeof inquiryCreateSchema>;

/** The inbox's status transition body. */
export const inquiryStatusSchema = z.object({
  status: z.enum(INQUIRY_STATUSES, {
    message: "Invalid status",
  }),
});

export type InquiryStatusInput = z.infer<typeof inquiryStatusSchema>;
