import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { createCrmProject, PROJECT_STAGES, type ProjectStage } from "@/lib/admin-projects";

type ProjectPayload = { name?: unknown; client?: unknown; stage?: unknown };

export async function POST(request: Request) {
  const session = await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null) as ProjectPayload | null;
  if (!body ||
    typeof body.name !== "string" || body.name.trim().length === 0 || body.name.length > 250 ||
    typeof body.client !== "string" || body.client.trim().length === 0 || body.client.length > 250 ||
    typeof body.stage !== "string" || !PROJECT_STAGES.includes(body.stage as ProjectStage)) {
    return NextResponse.json({ error: "Invalid project data." }, { status: 400 });
  }

  try {
    await createCrmProject({
      name: body.name.trim(),
      client: body.client.trim(),
      stage: body.stage as ProjectStage,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to save CRM project.", error);
    return NextResponse.json({ error: "Could not save the project." }, { status: 500 });
  }
}