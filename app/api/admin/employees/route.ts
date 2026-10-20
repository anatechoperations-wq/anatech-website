import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { createEmployee, employeeStatuses, employmentTypes, type EmployeeStatus, type EmploymentType } from "@/lib/admin-employees";

export async function POST(request: Request) {
  if (!await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body.name !== "string" || !body.name.trim() || typeof body.department !== "string" || typeof body.designation !== "string" || typeof body.workEmail !== "string" || typeof body.phone !== "string" || typeof body.joinDate !== "string" || !/^\\d{4}-\\d{2}-\\d{2}$/.test(body.joinDate) || typeof body.employmentType !== "string" || !employmentTypes.includes(body.employmentType as EmploymentType) || typeof body.monthlyCtc !== "number" || body.monthlyCtc < 0 || typeof body.status !== "string" || !employeeStatuses.includes(body.status as EmployeeStatus) || typeof body.notes !== "string") return NextResponse.json({ error: "Please complete employee details correctly." }, { status: 400 });
  try { return NextResponse.json({ ok: true, ...(await createEmployee({ name: body.name.trim(), department: body.department.trim(), designation: body.designation.trim(), workEmail: body.workEmail.trim(), phone: body.phone.trim(), joinDate: body.joinDate, employmentType: body.employmentType as EmploymentType, monthlyCtc: body.monthlyCtc, status: body.status as EmployeeStatus, notes: body.notes.trim() })) }); } catch { return NextResponse.json({ error: "Could not save employee. Confirm Google Sheets access." }, { status: 500 }); }
}