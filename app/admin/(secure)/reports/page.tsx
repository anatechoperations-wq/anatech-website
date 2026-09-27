import { GstComplianceRegister } from "@/components/admin/GstComplianceRegister";
import { getGstComplianceReport } from "@/lib/admin-gst-reports";
import { getLeads } from "@/lib/admin-leads";

export const dynamic = "force-dynamic";\nexport const metadata = { title: "CRM Reports" };
const statuses = ["New", "Contacted", "Interested", "Proposal Sent", "Negotiation", "Won", "Lost"] as const;

export default async function ReportsPage() {
  const [leads, gstReport] = await Promise.all([getLeads(), getGstComplianceReport()]);
  return <main className="mx-auto max-w-6xl p-8 text-slate-100">
    <p className="text-xs font-bold tracking-[.15em] text-cyan-300">PERFORMANCE & COMPLIANCE</p>
    <h1 className="mt-2 text-3xl font-black">Business reports</h1>
    <section className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-6">
      <h2 className="text-xl font-bold">Lead reports</h2>
      {statuses.map((status) => {
        const count = leads.filter((lead) => lead.status === status).length;
        const width = leads.length ? Math.round(count / leads.length * 100) : 0;
        return <div className="mt-5 first:mt-4" key={status}><div className="mb-2 flex justify-between text-sm"><span>{status}</span><span className="text-slate-400">{count}</span></div><div className="h-2 rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" style={{ width: width + "%" }} /></div></div>;
      })}
    </section>
    <GstComplianceRegister initialReport={gstReport} />
  </main>;
}
