import { DocumentStudio } from "@/components/admin/DocumentStudio";
import { getCrmDocuments } from "@/lib/admin-documents";

export const metadata = { title: "CRM Quotations" };

export default async function Page() {
  const documents = await getCrmDocuments("Quotation");
  return (
    <>
      <DocumentStudio type="Quotation" />
      <section className="mx-auto mb-12 max-w-7xl rounded-xl border border-slate-700 bg-slate-900/70 p-6 text-slate-100">
        <h2 className="text-xl font-bold">Saved quotation history</h2>
        {documents.length ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-700 text-slate-400"><tr><th className="p-3">Reference</th><th className="p-3">Date</th><th className="p-3">Customer</th><th className="p-3">Total</th></tr></thead>
              <tbody>{documents.map((document, index) => <tr className="border-b border-slate-800" key={index}><td className="p-3 font-medium">{document.reference || "—"}</td><td className="p-3">{document.createdAt ? new Date(document.createdAt).toLocaleDateString("en-IN") : "—"}</td><td className="p-3">{document.customer || "—"}</td><td className="p-3">₹{Number(document.total || 0).toLocaleString("en-IN")}</td></tr>)}</tbody>
            </table>
          </div>
        ) : <p className="mt-3 text-slate-400">Saved quotations will appear here.</p>}
      </section>
    </>
  );
}