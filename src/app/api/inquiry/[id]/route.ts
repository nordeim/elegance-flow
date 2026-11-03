// The inbox's per-inquiry transitions — PATCH (the status move) + DELETE,
// both behind requireSession.
//
// Session-199: the authenticated superset's write paths. The status move
// is ATOMIC (updateMany + count — a racing replay on a deleted row lands
// count 0 and answers 404, the reset funnel's own posture).

import { db } from "@/lib/db";
import { ok, ERR, parseBody, isGuarded, requireSession } from "@/lib/api";
import { inquiryStatusSchema, INQUIRY_STATUSES } from "@/lib/schemas";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  const parsed = await parseBody(req, inquiryStatusSchema);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;

  try {
    // The conditional atomic move: the id rides the WHERE, so a missing
    // row answers count 0 → 404 and a racing replay can never resurrect.
    const moved = await db.inquiry.updateMany({
      where: { id },
      data: { status: body.status },
    });
    if (moved.count === 0) return ERR.NOT_FOUND("Inquiry");
    return ok({ id, status: body.status });
  } catch {
    return ERR.INTERNAL();
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const guard = await requireSession();
  if (isGuarded(guard)) return guard.response;
  const { id } = await params;

  try {
    // deleteMany + count over delete's void: a missing row answers 404
    // (the honest 404 is the inbox's own contract; a replay deletes 0).
    // The ARCHIVED tab keeps the soft-delete ledger — DELETE is the
    // studio's explicit, permanent removal.
    const deleted = await db.inquiry.deleteMany({
      where: { id, status: { in: [...INQUIRY_STATUSES] } },
    });
    if (deleted.count === 0) return ERR.NOT_FOUND("Inquiry");
    return ok({ id });
  } catch {
    return ERR.INTERNAL();
  }
}
