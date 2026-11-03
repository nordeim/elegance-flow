// The inquiry family — the landing's contact-form round trip (POST, public,
// rate-limited) and the authenticated inbox's list (GET).
//
// Session-199 (the domain transformation): the reference collects the form
// and answers a toast only (live-verified); OURS persists every inquiry —
// the documented superset — and /dashboard reads them here.

import { db } from "@/lib/db";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { inquiryCreateSchema } from "@/lib/schemas";

export const dynamic = "force-dynamic";

// The public POST shares the auth family's per-IP fixed-window posture
// (login 10/15min) — a form spammer is bounded the same way a password
// stuffer is. 10 submissions per IP per 15 minutes.
const INQUIRY_RATE_LIMIT = 10;
const INQUIRY_RATE_WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: Request) {
  // The auth family's canonical order: the limiter, then the composed
  // parse seam (the declared-size pre-gate rides INSIDE parseBody —
  // api.ts — alongside the schema; the Zod seam's own 400s answer).
  const limit = rateLimit(`inquiry:${clientKey(req)}`, INQUIRY_RATE_LIMIT, INQUIRY_RATE_WINDOW_MS);
  // The auth family's own posture: the 429 carries the Retry-After.
  if (!limit.allowed) return ERR.RATE_LIMITED(limit.retryAfterSec);

  const parsed = await parseBody(req, inquiryCreateSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    const inquiry = await db.inquiry.create({
      data: {
        name: body.name,
        email: body.email,
        service: body.service,
        message: body.message,
        status: "new",
      },
    });
    return ok({ id: inquiry.id }, 201);
  } catch {
    // The envelope-held failure path (the s35/s36 doctrine): every DB
    // failure stays inside { ok, error }.
    return ERR.INTERNAL();
  }
}

// The authenticated inbox's list — newest first, non-archived by default;
// ?status=<new|read|archived> narrows; ?status=all returns everything.
export async function GET(req: Request) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;

  const url = new URL(req.url);
  const status = url.searchParams.get("status") ?? "active";

  try {
    const where =
      status === "all"
        ? {}
        : status === "new" || status === "read" || status === "archived"
          ? { status }
          : { status: { not: "archived" } };
    const inquiries = await db.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return ok(inquiries);
  } catch {
    return ERR.INTERNAL();
  }
}
