import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { saveCrmDocument, type CrmDocumentInput } from "@/lib/admin-documents";

function isValidNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export async function POST(request: Request) {
  const session = await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null) as Partial<CrmDocumentInput> | null;
  const validType = body?.type === "Quotation" || body?.type === "Invoice";
  const validLines = Array.isArray(body?.lines) && body.lines.length > 0 &&
    body.lines.every((line) =>
      typeof line?.description === "string" &&
      line.description.trim().length > 0 &&
      line.description.length <= 500 &&
      isValidNumber(line.quantity) &&
      isValidNumber(line.rate),
    );

  if (!body || !validType || typeof body.customer !== "string" ||
    body.customer.trim().length === 0 || body.customer.length > 250 ||
    !validLines || !isValidNumber(body.taxRate) || body.taxRate > 100 ||
    !isValidNumber(body.subtotal) || !isValidNumber(body.taxAmount) ||
    !isValidNumber(body.total)) {
    return NextResponse.json({ error: "Invalid document data." }, { status: 400 });
  }

  try {
    await saveCrmDocument({
      type: body.type,
      customer: body.customer.trim(),
      taxRate: body.taxRate,
      subtotal: body.subtotal,
      taxAmount: body.taxAmount,
      total: body.total,
      lines: body.lines,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to save CRM document.", error);
    return NextResponse.json({ error: "Could not save the document." }, { status: 500 });
  }
}