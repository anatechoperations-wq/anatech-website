import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";
import { createCrmCustomer, getCrmCustomers } from "@/lib/admin-customers";
import { getLeads, updateLeadStatus } from "@/lib/admin-leads";

export async function POST(_request: Request, { params }: { params: Promise<{ row: string }> }) {
  const session = await verifyAdminSession((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const row = Number((await params).row);
  if (!Number.isInteger(row) || row < 2) return NextResponse.json({ error: "Invalid lead." }, { status: 400 });

  try {
    const lead = (await getLeads()).find((item) => item.row === row);
    if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

    const customers = await getCrmCustomers();
    const exists = customers.some((customer) =>
      (lead.email && customer.email.toLowerCase() === lead.email.toLowerCase()) ||
      (lead.phone && customer.phone.replace(/\D/g, "") === lead.phone.replace(/\D/g, "")),
    );

    if (!exists) {
      await createCrmCustomer({
        name: lead.name || "Customer",
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        notes: lead.message ? "Converted from lead: " + lead.message : "Converted from lead",
      });
    }

    await updateLeadStatus(row, "Won");
    return NextResponse.json({ ok: true, customerCreated: !exists });
  } catch (error) {
    console.error("Unable to convert lead.", error);
    return NextResponse.json({ error: "Could not convert this lead." }, { status: 500 });
  }
}