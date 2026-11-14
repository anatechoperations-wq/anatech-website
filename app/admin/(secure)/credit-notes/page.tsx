import { CreditNoteForm } from "@/components/admin/CreditNoteForm";
import { getCrmDocuments } from "@/lib/admin-documents";
import { getMasterSettings } from "@/lib/admin-master-settings";
export const dynamic = "force-dynamic";
export const metadata = { title: "CRM Credit Notes" };
export default async function Page() { const [invoices, settings] = await Promise.all([getCrmDocuments("Invoice"), getMasterSettings()]); return <main className="mx-auto max-w-5xl p-8 text-slate-100"><p className="text-xs font-bold tracking-[.15em] text-cyan-300">GST ADJUSTMENTS</p><h1 className="mt-2 text-3xl font-black">Credit notes</h1><CreditNoteForm invoices={invoices.map(invoice => ({ reference: invoice.reference, customer: invoice.customer })).filter(invoice => invoice.reference)} sellerStateCode={settings.sellerStateCode} /></main>; }
