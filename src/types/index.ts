// Shared client-side domain types (API wire shapes) — session-199 (the
// domain transformation) carried the auth family's User forward and added
// the INQUIRY wire shape (the landing's contact-form row the /dashboard
// inbox reads). The CRM entity interfaces (Account/Contact/Lead/
// Opportunity/CrmEvent/Activity/Settings + the dashboard/reports
// aggregate families) retired with the CRM surfaces.

export type Result<T, E> = { ok: true; data: T } | { ok: false; error: E };

export interface User {
  id: string;
  email: string;
  name: string;
  avatarColor: string;
  photoUrl: string | null;
  role: string;
}

/** The /api/inquiry wire shape — prisma's Inquiry row, JSON-serialized
 *  (createdAt/updatedAt ride as ISO strings). */
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  service: string; // one of INQUIRY_SERVICES (src/lib/schemas.ts)
  message: string;
  status: string; // "new" | "read" | "archived"
  createdAt: string;
  updatedAt: string;
}
