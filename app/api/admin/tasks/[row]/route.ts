import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { TASK_STATUSES, type TaskStatus, updateCrmTaskStatus } from "@/lib/admin-tasks";

export async function PATCH(request: Request, { params }: { params: Promise<{ row: string }> }) {
  const session = await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const row = Number((await params).row);
  const body = await request.json().catch(() => null) as { status?: unknown } | null;
  if (!Number.isInteger(row) || row < 2 || !body || typeof body.status !== "string" ||
    !TASK_STATUSES.includes(body.status as TaskStatus)) {
    return NextResponse.json({ error: "Invalid task status." }, { status: 400 });
  }

  try {
    await updateCrmTaskStatus(row, body.status as TaskStatus);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to update CRM task.", error);
    return NextResponse.json({ error: "Could not update this task." }, { status: 500 });
  }
}