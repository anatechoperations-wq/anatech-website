import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { createCrmTask, TASK_STATUSES, type TaskStatus } from "@/lib/admin-tasks";

type TaskPayload = {
  project?: unknown;
  title?: unknown;
  owner?: unknown;
  dueDate?: unknown;
  status?: unknown;
};

export async function POST(request: Request) {
  const session = await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null) as TaskPayload | null;
  if (!body ||
    typeof body.project !== "string" || body.project.trim().length === 0 || body.project.length > 250 ||
    typeof body.title !== "string" || body.title.trim().length === 0 || body.title.length > 500 ||
    typeof body.owner !== "string" || body.owner.length > 250 ||
    typeof body.dueDate !== "string" || body.dueDate.length > 40 ||
    typeof body.status !== "string" || !TASK_STATUSES.includes(body.status as TaskStatus)) {
    return NextResponse.json({ error: "Invalid task data." }, { status: 400 });
  }

  try {
    await createCrmTask({
      project: body.project.trim(),
      title: body.title.trim(),
      owner: body.owner.trim(),
      dueDate: body.dueDate,
      status: body.status as TaskStatus,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to save CRM task.", error);
    return NextResponse.json({ error: "Could not save the task." }, { status: 500 });
  }
}