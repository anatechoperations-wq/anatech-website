import { getBusinessDocumentSettings } from "@/lib/admin-documents";

export const metadata = { title: "CRM Settings" };

export default function SettingsPage() {
  const documents = getBusinessDocumentSettings();
  const rows = [
    ["Business name", "ANATECH Technology Solutions"],
    ["Operations", "Kollam, Kerala, India"],
    ["Business email", "anatech.operations@gmail.com"],
    ["Support number", "+91 89215 20858"],
    ["GSTIN", documents.gstin || "Not configured"],
    ["IEC", documents.iec || "Not configured"],
    ["Bank details", documents.bankName && documents.bankAccount ? "Configured" : "Not configured"],
    ["Quotation reference", (process.env.DOCUMENT_QUOTATION_PREFIX || "QTN") + "-YYYY-0001"],
    ["Invoice reference", (process.env.DOCUMENT_INVOICE_PREFIX || "INV") + "-YYYY-0001"],
    ["Payment terms", documents.paymentTerms],
  ];

  return (
    <main className="mx-auto max-w-4xl p-8 text-slate-100">
      <p className="text-xs font-bold tracking-[.15em] text-cyan-300">CONFIGURATION</p>
      <h1 className="mt-2 text-3xl font-black">Business Settings</h1>
      <section className="mt-6 overflow-hidden rounded-xl border border-slate-700 bg-slate-900/70">
        {rows.map(([label, value]) => <div className="grid gap-2 border-b border-slate-800 p-5 last:border-0 md:grid-cols-3" key={label}><span className="font-semibold text-slate-300">{label}</span><span className="text-slate-400 md:col-span-2">{value}</span></div>)}
      </section>
      <p className="mt-5 text-sm leading-6 text-slate-400">Add verified GSTIN, IEC, bank details and payment terms in Vercel Environment Variables. Do not add credentials or legal details to GitHub source files.</p>
    </main>
  );
}