import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { saveCreditNote } from "@/lib/admin-credit-notes";
export async function POST(request: Request) {
  if (!await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || typeof body.originalInvoice !== "string" || !body.originalInvoice.trim() || typeof body.customer !== "string" || !body.customer.trim() || typeof body.reason !== "string" || !body.reason.trim() || typeof body.placeOfSupplyCode !== "string" || !/^\d{1,2}$/.test(body.placeOfSupplyCode) || typeof body.taxableValue !== "number" || body.taxableValue < 0 || typeof body.taxRate !== "number" || body.taxRate < 0 || body.taxRate > 100) return NextResponse.json({ error: "Please complete all credit note fields." }, { status: 400 });
  try { return NextResponse.json({ ok: true, ...(await saveCreditNote({ originalInvoice: body.originalInvoice.trim(), customer: body.customer.trim(), reason: body.reason.trim(), placeOfSupplyCode: body.placeOfSupplyCode, taxableValue: body.taxableValue, taxRate: body.taxRate })) }); } catch { return NextResponse.json({ error: "Could not save credit note." }, { status: 500 }); }
}
