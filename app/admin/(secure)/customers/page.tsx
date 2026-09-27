import { CustomerDirectory } from "@/components/admin/CustomerDirectory";
import { getCrmCustomers } from "@/lib/admin-customers";
import { getLeads } from "@/lib/admin-leads";

export const metadata = { title: "CRM Customers" };

export default async function CustomersPage() {
  const [customers, leads] = await Promise.all([getCrmCustomers(), getLeads()]);
  const convertedLeads = leads.filter((lead) => lead.status === "Won");

  return (
    <main className="mx-auto max-w-7xl p-8 text-slate-100">
      <p className="text-xs font-bold tracking-[.15em] text-cyan-300">RELATIONSHIPS</p>
      <h1 className="mt-2 text-3xl font-black">Customers</h1>
      <p className="mt-3 text-slate-400">Manage confirmed customer details, services and internal notes in the CRM.</p>
      <CustomerDirectory initialCustomers={customers} />

      <section className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-6">
        <h2 className="text-lg font-bold">Converted leads</h2>
        {convertedLeads.length ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-700 text-slate-400"><tr><th className="p-3">Customer</th><th className="p-3">Contact</th><th className="p-3">Service</th></tr></thead>
              <tbody>{convertedLeads.map((customer) => <tr className="border-b border-slate-800" key={customer.id}><td className="p-3 font-medium">{customer.name}</td><td className="p-3">{customer.email}<br /><span className="text-slate-400">{customer.phone}</span></td><td className="p-3">{customer.service}</td></tr>)}</tbody>
            </table>
          </div>
        ) : <p className="mt-3 text-slate-400">Lead status “Won” ആക്കിയാൽ അത് ഇവിടെ converted lead ആയി കാണാം.</p>}
      </section>
    </main>
  );
}