import "server-only";

import { getGstComplianceReport } from "@/lib/admin-gst-reports";

type ExportLine = { description?: string; quantity?: number; rate?: number; hsnSac?: string; unit?: string };

function readLines(lines: unknown) {
  return Array.isArray(lines) ? lines as ExportLine[] : [];
}

export async function getGstr1ReviewExport(period: string) {
  const report = await getGstComplianceReport(period);
  const validation: string[] = [];
  const invoices = report.rows.map((row) => {
    const lines = readLines(row.lines);
    if (!row.reference) validation.push("Invoice with missing reference.");
    if (!lines.length || lines.some((line) => !line.hsnSac || !line.unit)) validation.push("Invoice " + (row.reference || "without reference") + " needs HSN/SAC and unit details.");
    return {
      invoice_number: row.reference,
      invoice_date: row.date.slice(0, 10),
      receiver_name: row.customer,
      receiver_gstin: row.customerGstin,
      place_of_supply: row.placeOfSupply,
      supply_type: row.supplyType,
      taxable_value: row.taxableValue,
      tax_rate: row.taxRate,
      cgst: row.cgst,
      kgst: row.kgst,
      igst: row.igst,
      invoice_value: row.total,
      lines: lines.map((line) => ({ description: line.description || "", hsn_sac: line.hsnSac || "", quantity: Number(line.quantity || 0), unit: line.unit || "", rate: Number(line.rate || 0) })),
    };
  });

  const hsnSummary = new Map<string, { hsn_sac: string; unit: string; category: string; quantity: number; taxable_value: number; cgst: number; kgst: number; igst: number }>();
  for (const invoice of invoices) {
    for (const line of invoice.lines) {
      const key = [invoice.receiver_gstin.length === 15 ? "B2B" : "B2C", line.hsn_sac, line.unit].join("|");
      const current = hsnSummary.get(key) || { hsn_sac: line.hsn_sac, unit: line.unit, category: invoice.receiver_gstin.length === 15 ? "B2B" : "B2C", quantity: 0, taxable_value: 0, cgst: 0, kgst: 0, igst: 0 };
      const share = invoice.lines.length ? line.rate * line.quantity / Math.max(invoice.taxable_value, 1) : 0;
      current.quantity += line.quantity;
      current.taxable_value += line.rate * line.quantity;
      current.cgst += invoice.cgst * share;
      current.kgst += invoice.kgst * share;
      current.igst += invoice.igst * share;
      hsnSummary.set(key, current);
    }
  }

  return {
    export_kind: "ANATECH CRM GSTR-1 review export",
    status: "REVIEW_ONLY_NOT_PORTAL_UPLOAD",
    tax_period: period,
    generated_at: new Date().toISOString(),
    b2b_invoices: invoices.filter((invoice) => invoice.receiver_gstin.length === 15),
    b2cl_review: invoices.filter((invoice) => invoice.receiver_gstin.length !== 15 && invoice.supply_type === "Inter-state" && invoice.invoice_value > 250000),
    b2cs_review: invoices.filter((invoice) => invoice.receiver_gstin.length !== 15 && !(invoice.supply_type === "Inter-state" && invoice.invoice_value > 250000)),
    hsn_sac_summary: [...hsnSummary.values()].map((row) => ({ ...row, quantity: Number(row.quantity.toFixed(3)), taxable_value: Number(row.taxable_value.toFixed(2)), cgst: Number(row.cgst.toFixed(2)), kgst: Number(row.kgst.toFixed(2)), igst: Number(row.igst.toFixed(2)) })),
    validation: [...new Set([...report.filingReadiness, ...validation])],
  };
}
