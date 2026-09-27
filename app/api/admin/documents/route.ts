import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { saveCrmDocument, type CrmDocumentInput } from "@/lib/admin-documents";

type DocumentPayload = {
  type?: unknown;
  customer?: unknown;
  taxRate?: unknown;
  subtotal?: unknown;
  taxAmount?: unknown;
  total?: unknown;
  lines?: unknown;
};

type DocumentLine = {
  description?: unknown;
  quantity?: unknown;
  rate?: unknown;
};

function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isValidLine(value: unknown): value is { description: string; quantity: number; rate: number } {
  if (!value || typeof value !== "object") return false;
  const line = value as DocumentLine;
  return typeof line.description === "string" &&
    line.description.trim().length > 0 &&
    line.description.length <= 500 &&
    isNonNegativeNumber(line.quantity) &&
    isNonNegativeNumber(line.rate);
}

export async function POST(request: Request) {
  const session = await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null) as DocumentPayload | null;
  const lines = Array.isArray(body?.lines) ? body.lines : [];

  if (!body ||
    (body.type !== "Quotation" && body.type !== "Invoice") ||
    typeof body.customer !== "string" || body.customer.trim().length === 0 || body.customer.length > 250 ||
    !isNonNegativeNumber(body.taxRate) || body.taxRate > 100 ||
    !isNonNegativeNumber(body.subtotal) ||
    !isNonNegativeNumber(body.taxAmount) ||
    !isNonNegativeNumber(body.total) ||
    lines.length === 0 || !lines.every(isValidLine)) {
    return NextResponse.json({ error: "Invalid document data." }, { status: 400 });
  }

  const document: CrmDocumentInput = {
    type: body.type,
    customer: body.customer.trim(),
    taxRate: body.taxRate,
    subtotal: body.subtotal,
    taxAmount: body.taxAmount,
    total: body.total,
    lines,
  };

  try {
    const reference = await saveCrmDocument(document);
    return NextResponse.json({ ok: true, reference });
  } catch (error) {
    console.error("Unable to save CRM document.", error);
    return NextResponse.json({ error: "Could not save the document." }, { status: 500 });
  }
}