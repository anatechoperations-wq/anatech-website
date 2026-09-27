import { Download } from "lucide-react";
import type { GstComplianceReport } from "@/lib/gst-types";

const money = (value: number) => "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 2 });

export function GstComplianceRegister({ report }: { report: GstComplianceReport }) {
  return <section className="mt-8 rounded-xl border border-slate-700 bg-slate-900/70 p-6">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-xs font-bold tracking-[.15em] text-cyan-300">GST COMPLIANCE</p><h2 className="mt-1 text-2xl font-black">Monthly sales register</h2><p className="mt-1 text-sm text-slate-400">Period: {report.period}</p></div>
      <a href={"/api/admin/reports/gst?format=csv&period=" + encodeURIComponent(report.period)} className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-bold"><Download size={16} />Download CSV</a>
    </div>
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {[["Taxable sales", report.totalTaxableValue], ["CGST", report.totalCgst], ["KGST", report.totalKgst], ["IGST", report.totalIgst]].map(([label, value]) => <div className="rounded-lg border border-slate-700 bg-slate-950/60 p-4" key={String(label)}><p className="text-xs text-slate-400">{label}</p><p className="mt-1 text-xl font-black">{money(Number(value))}</p></div>)}
    </div>
    <div className="mt-5 grid gap-3 text-sm md:grid-cols-3"><p>Invoices: <b>{report.rows.length}</b></p><p>B2B: <b>{report.b2bCount}</b> · B2C: <b>{report.b2cCount}</b></p><p>Invoice value: <b>{money(report.totalInvoiceValue)}</b></p></div>
    <div className="mt-5 rounded-lg border border-amber-800/70 bg-amber-950/30 p-4 text-sm text-amber-100"><b>Filing review</b><ul className="mt-2 list-disc space-y-1 pl-5">{report.filingReadiness.map((item) => <li key={item}>{item}</li>)}</ul></div>
    <div className="mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-slate-700 text-slate-400"><tr><th className="p-3">Date</th><th className="p-3">Invoice</th><th className="p-3">Customer</th><th className="p-3">Type</th><th className="p-3">Taxable</th><th className="p-3">CGST</th><th className="p-3">KGST</th><th className="p-3">IGST</th><th className="p-3">Total</th></tr></thead>
      <tbody>{report.rows.length ? report.rows.map((row) => <tr className="border-b border-slate-800" key={row.reference + row.date}><td className="p-3">{row.date ? new Date(row.date).toLocaleDateString("en-IN") : "—"}</td><td className="p-3 font-medium">{row.reference || "Review"}</td><td className="p-3">{row.customer}</td><td className="p-3">{row.category}</td><td className="p-3">{money(row.taxableValue)}</td><td className="p-3">{money(row.cgst)}</td><td className="p-3">{money(row.kgst)}</td><td className="p-3">{money(row.igst)}</td><td className="p-3">{money(row.total)}</td></tr>) : <tr><td className="p-5 text-slate-400" colSpan={9}>No structured invoices for this month.</td></tr>}</tbody>
    </table></div>
  </section>;
}
