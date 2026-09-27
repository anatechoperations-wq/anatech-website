import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { getGstComplianceReport, gstReportCsv } from "@/lib/admin-gst-reports";

function periodFrom(value: string | null) {
  return value && /^\\d{4}-\\d{2}$/.test(value) ? value : new Date().toISOString().slice(0, 7);
}

export async function GET(request: Request) {
  const session = await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const period = periodFrom(url.searchParams.get("period"));
  const report = await getGstComplianceReport(period);

  if (url.searchParams.get("format") === "csv") {
    return new Response(gstReportCsv(report), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="anatech-gst-sales-register-' + period + '.csv"',
        "Cache-Control": "no-store",
      },
    });
  }
  return NextResponse.json(report, { headers: { "Cache-Control": "no-store" } });
}
