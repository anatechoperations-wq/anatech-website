import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { boqStatuses, defaultTenderChecklist, getTenders, saveTender, tenderStatuses } from "@/lib/admin-tenders";

export async function GET() {
  if (!await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ tenders: await getTenders() });
}
export async function POST(request: Request) {
  if (!await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const validChecklist = body?.checklist && typeof body.checklist === "object" && !Array.isArray(body.checklist) ? Object.fromEntries(defaultTenderChecklist.map((item) => [item, Boolean((body.checklist as Record<string, unknown>)[item])])) : null;
  if (!body || typeof body.title !== "string" || !body.title.trim() || typeof body.reference !== "string" || typeof body.authority !== "string" || typeof body.portalUrl !== "string" || typeof body.dueDate !== "string" || !/^\\d{4}-\\d{2}-\\d{2}$/.test(body.dueDate) || typeof body.emdAmount !== "number" || body.emdAmount < 0 || typeof body.status !== "string" || !tenderStatuses.includes(body.status as typeof tenderStatuses[number]) || typeof body.boqStatus !== "string" || !boqStatuses.includes(body.boqStatus as typeof boqStatuses[number]) || typeof body.notes !== "string" || !validChecklist) return NextResponse.json({ error: "Please complete the tender details correctly." }, { status: 400 });
  const mandatoryDocuments = defaultTenderChecklist.filter((item) => !validChecklist[item]);
  try {
    return NextResponse.json({ ok: true, ...(await saveTender({ reference: body.reference.trim(), title: body.title.trim(), authority: body.authority.trim(), portalUrl: body.portalUrl.trim(), dueDate: body.dueDate, emdAmount: body.emdAmount, status: body.status, boqStatus: body.boqStatus, mandatoryDocuments, notes: body.notes.trim(), checklist: validChecklist })) });
  } catch { return NextResponse.json({ error: "Could not save tender. Confirm Google Sheets credentials and access." }, { status: 500 }); }
}