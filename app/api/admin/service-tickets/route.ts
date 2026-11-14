import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { createServiceTicket, ticketPriorities, ticketStatuses, updateServiceTicket, type TicketPriority, type TicketStatus } from "@/lib/admin-service-tickets";

async function authorised() { return verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value); }
export async function POST(request: Request) {
  if (!await authorised()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body.customer !== "string" || !body.customer.trim() || typeof body.workOrder !== "string" || typeof body.project !== "string" || typeof body.category !== "string" || !body.category.trim() || typeof body.priority !== "string" || !ticketPriorities.includes(body.priority as TicketPriority) || typeof body.location !== "string" || typeof body.request !== "string" || !body.request.trim() || typeof body.assignee !== "string" || typeof body.scheduledDate !== "string" || !/^\\d{4}-\\d{2}-\\d{2}$/.test(body.scheduledDate) || typeof body.status !== "string" || !ticketStatuses.includes(body.status as TicketStatus) || typeof body.notes !== "string") return NextResponse.json({ error: "Please complete the service ticket fields correctly." }, { status: 400 });
  try { return NextResponse.json({ ok: true, ...(await createServiceTicket({ customer: body.customer.trim(), workOrder: body.workOrder.trim(), project: body.project.trim(), category: body.category.trim(), priority: body.priority as TicketPriority, location: body.location.trim(), request: body.request.trim(), assignee: body.assignee.trim(), scheduledDate: body.scheduledDate, status: body.status as TicketStatus, notes: body.notes.trim() })) }); } catch { return NextResponse.json({ error: "Could not save service ticket. Confirm Google Sheets access." }, { status: 500 }); }
}
export async function PATCH(request: Request) {
  if (!await authorised()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body.row !== "number" || !Number.isInteger(body.row) || body.row < 2 || typeof body.status !== "string" || !ticketStatuses.includes(body.status as TicketStatus) || typeof body.resolution !== "string" || body.resolution.length > 2000) return NextResponse.json({ error: "Invalid ticket update." }, { status: 400 });
  try { await updateServiceTicket(body.row, body.status as TicketStatus, body.resolution.trim()); return NextResponse.json({ ok: true }); } catch { return NextResponse.json({ error: "Could not update service ticket." }, { status: 500 }); }
}