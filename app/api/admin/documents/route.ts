import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { saveCrmDocument, type CrmDocumentInput } from "@/lib/admin-documents";

type DocumentPayload = {
  type?: unknown;
  customer?: unknown;
  customerGstin?: unknown;
  placeOfSupplyCode?: unknown;
  taxRate?: unknown;
  lines?: unknown;
};

type DocumentLine = { description?: unknown; quantity?: unknown; rate?: unknown; hsnSac?: unknown; unit?: unknown };

function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isValidLine(value: unknown): value is { description: string; quantity: number; rate: number; hsnSac: string; unit: string } {
  if (!value || typeof value !== "object") return false;
  const line = value as DocumentLine;
  return typeof line.description === "string" && line.description.trim().length > 0 &&
    line.description.length <= 500 && typeof line.hsnSac === "string" && /^[A-Z0-9]{4,8}$/i.test(line.hsnSac.trim()) && typeof line.unit === "string" && line.unit.trim().length > 0 && line.unit.length <= 20 && isNonNegativeNumber(line.quantity) && isNonNegativeNumber(line.rate);
}

export async function POST(request: Request) {
  const session = await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null) as DocumentPayload | null;
  const lines = Array.isArray(body?.lines) ? body.lines : [];

  if (!body || (body.type !== "Quotation" && body.type !== "Invoice") ||
    typeof body.customer !== "string" || body.customer.trim().length === 0 || body.customer.length > 250 ||
    typeof body.customerGstin !== "string" || body.customerGstin.length > 25 ||
    typeof body.placeOfSupplyCode !== "string" || !/^\\d{1,2}$/.test(body.placeOfSupplyCode) ||
    !isNonNegativeNumber(body.taxRate) || body.taxRate > 100 || lines.length === 0 || !lines.every(isValidLine)) {
    return NextResponse.json({ error: "Please add valid HSN/SAC, unit, customer, Place of Supply, GST rate and line items." }, { status: 400 });
  }

  const document: CrmDocumentInput = {
    type: body.type,
    customer: body.customer.trim(),
    customerGstin: body.customerGstin.trim(),
    placeOfSupplyCode: body.placeOfSupplyCode,
    taxRate: body.taxRate,
    lines,
  };

  try {
    const result = await saveCrmDocument(document);
    return NextResponse.json({ ok: true, reference: result.reference, calculation: result.calculation });
  } catch (error) {
    console.error("Unable to save CRM document.", error);
    return NextResponse.json({ error: "Could not save the document." }, { status: 500 });
  }
}
