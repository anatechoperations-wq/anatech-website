import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { createCrmCustomer } from "@/lib/admin-customers";

type CustomerPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  notes?: unknown;
};

export async function POST(request: Request) {
  const session = await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null) as CustomerPayload | null;
  if (!body ||
    typeof body.name !== "string" || body.name.trim().length === 0 || body.name.length > 250 ||
    typeof body.email !== "string" || body.email.length > 254 ||
    typeof body.phone !== "string" || body.phone.length > 50 ||
    typeof body.service !== "string" || body.service.length > 250 ||
    typeof body.notes !== "string" || body.notes.length > 2000) {
    return NextResponse.json({ error: "Invalid customer data." }, { status: 400 });
  }

  try {
    await createCrmCustomer({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      service: body.service.trim(),
      notes: body.notes.trim(),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to save CRM customer.", error);
    return NextResponse.json({ error: "Could not save the customer." }, { status: 500 });
  }
}