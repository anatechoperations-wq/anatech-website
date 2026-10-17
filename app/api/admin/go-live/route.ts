import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { goLiveItems, saveGoLiveState, type GoLiveState } from "@/lib/admin-go-live";

export async function POST(request: Request) {
  if (!await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as { checklist?: unknown } | null;
  if (!body?.checklist || typeof body.checklist !== "object" || Array.isArray(body.checklist)) return NextResponse.json({ error: "Invalid checklist." }, { status: 400 });
  const source = body.checklist as Record<string, unknown>;
  const checklist = Object.fromEntries(goLiveItems.map((item) => [item, Boolean(source[item])])) as GoLiveState;
  try { await saveGoLiveState(checklist); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Could not save readiness review. Confirm Google Sheets credentials and access." }, { status: 500 }); }
}