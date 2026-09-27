import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { getGstr1ReviewExport } from "@/lib/admin-gstr1-review";

export async function GET(request: Request) {
  const session = await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const period = new URL(request.url).searchParams.get("period");
  const safePeriod = period && /^\d{4}-\d{2}$/.test(period) ? period : new Date().toISOString().slice(0, 7);
  const payload = await getGstr1ReviewExport(safePeriod);
  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="anatech-gstr1-review-' + safePeriod + '.json"',
      "Cache-Control": "no-store",
    },
  });
}
