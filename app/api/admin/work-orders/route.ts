import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { createWorkOrder, workOrderStatuses, type WorkOrderStatus } from "@/lib/admin-work-orders";

export async function POST(request: Request) {
  if (!await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body.customer !== "string" || !body.customer.trim() || typeof body.sourceQuotation !== "string" || typeof body.projectName !== "string" || !body.projectName.trim() || typeof body.scope !== "string" || !body.scope.trim() || typeof body.owner !== "string" || typeof body.startDate !== "string" || !/^\\d{4}-\\d{2}-\\d{2}$/.test(body.startDate) || typeof body.targetDate !== "string" || !/^\\d{4}-\\d{2}-\\d{2}$/.test(body.targetDate) || typeof body.totalValue !== "number" || body.totalValue < 0 || typeof body.status !== "string" || !workOrderStatuses.includes(body.status as WorkOrderStatus) || typeof body.notes !== "string") return NextResponse.json({ error: "Please complete the work order details correctly." }, { status: 400 });
  try { return NextResponse.json({ ok: true, ...(await createWorkOrder({ customer: body.customer.trim(), sourceQuotation: body.sourceQuotation.trim(), projectName: body.projectName.trim(), scope: body.scope.trim(), owner: body.owner.trim(), startDate: body.startDate, targetDate: body.targetDate, totalValue: body.totalValue, status: body.status as WorkOrderStatus, notes: body.notes.trim() })) }); } catch { return NextResponse.json({ error: "Could not save the work order. Confirm Google Sheets access." }, { status: 500 }); }
}