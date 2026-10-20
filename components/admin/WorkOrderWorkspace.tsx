"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses = ["Draft", "Approved", "Active", "On hold", "Completed", "Cancelled"] as const;
type Status = typeof statuses[number];
type WorkOrder = { createdAt: string; reference: string; customer: string; sourceQuotation: string; projectName: string; scope: string; owner: string; startDate: string; targetDate: string; totalValue: number; status: Status; notes: string };
type Quote = { reference: string; customer: string; total: string };

export function WorkOrderWorkspace({ workOrders, quotations }: { workOrders: WorkOrder[]; quotations: Quote[] }) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const [customer, setCustomer] = useState("");
  const [sourceQuotation, setSourceQuotation] = useState("");
  const [projectName, setProjectName] = useState("");
  const [scope, setScope] = useState("");
  const [owner, setOwner] = useState("Owner");
  const [startDate, setStartDate] = useState(today);
  const [targetDate, setTargetDate] = useState(today);
  const [totalValue, setTotalValue] = useState(0);
  const [status, setStatus] = useState<Status>("Draft");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  function chooseQuotation(reference: string) { const quote = quotations.find((item) => item.reference === reference); setSourceQuotation(reference); if (quote) { setCustomer(quote.customer); setTotalValue(Number(quote.total || 0)); } }
  async function save() {
    setMessage("Saving work order…");
    const response = await fetch("/api/admin/work-orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customer, sourceQuotation, projectName, scope, owner, startDate, targetDate, totalValue, status, notes }) });
    const data = await response.json().catch(() => null) as { error?: string; reference?: string; projectCreated?: boolean } | null;
    if (!response.ok) { setMessage(data?.error || "Could not save the work order."); return; }
    setMessage("Saved " + data?.reference + (data?.projectCreated ? ". A delivery project was created automatically." : "."));
    router.refresh();
  }
  return <main className="mx-auto max-w-7xl p-8 text-slate-100">
    <p className="text-xs font-bold tracking-[.15em] text-cyan-300">REVENUE ENGINE</p><h1 className="mt-2 text-3xl font-black">Work orders</h1>
    <p className="mt-3 max-w-3xl text-slate-400">Convert an approved proposal into a delivery instruction. Approved or active work orders create a linked project automatically.</p>
    <section className="mt-6 rounded-xl border border-cyan-700/50 bg-cyan-950/20 p-5 text-sm text-cyan-100"><strong>Control point:</strong> Mark a work order Approved only after customer acceptance, authorised confirmation or an eligible purchase order. This CRM records the decision; it does not replace a signed contract.</section>
    <section className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-6"><h2 className="text-xl font-bold">Create work order</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label>Source quotation<select value={sourceQuotation} onChange={e => chooseQuotation(e.target.value)} className="mt-2 w-full rounded border border-slate-600 bg-slate-950 p-3"><option value="">No quotation / direct order</option>{quotations.map(quote => <option key={quote.reference} value={quote.reference}>{quote.reference} — {quote.customer}</option>)}</select></label>
        <label>Customer *<input value={customer} onChange={e => setCustomer(e.target.value)} className="mt-2 w-full rounded border border-slate-600 bg-slate-950 p-3" /></label>
        <label>Project / work title *<input value={projectName} onChange={e => setProjectName(e.target.value)} className="mt-2 w-full rounded border border-slate-600 bg-slate-950 p-3" /></label>
        <label>Responsible person<input value={owner} onChange={e => setOwner(e.target.value)} className="mt-2 w-full rounded border border-slate-600 bg-slate-950 p-3" /></label>
        <label>Start date *<input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-2 w-full rounded border border-slate-600 bg-slate-950 p-3" /></label>
        <label>Target completion *<input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="mt-2 w-full rounded border border-slate-600 bg-slate-950 p-3" /></label>
        <label>Order value (₹)<input type="number" min="0" value={totalValue} onChange={e => setTotalValue(Math.max(0, Number(e.target.value) || 0))} className="mt-2 w-full rounded border border-slate-600 bg-slate-950 p-3" /></label>
        <label>Status<select value={status} onChange={e => setStatus(e.target.value as Status)} className="mt-2 w-full rounded border border-slate-600 bg-slate-950 p-3">{statuses.map(item => <option key={item}>{item}</option>)}</select></label>
      </div>
      <label className="mt-4 block">Scope of work *<textarea value={scope} onChange={e => setScope(e.target.value)} className="mt-2 min-h-24 w-full rounded border border-slate-600 bg-slate-950 p-3" placeholder="Deliverables, technical requirements, exclusions…" /></label>
      <label className="mt-4 block">Internal notes<textarea value={notes} onChange={e => setNotes(e.target.value)} className="mt-2 min-h-20 w-full rounded border border-slate-600 bg-slate-950 p-3" placeholder="Customer acceptance, PO reference, dependencies…" /></label>
      <button type="button" onClick={save} className="mt-6 rounded-lg bg-cyan-600 px-5 py-3 font-bold">Save work order</button>{message && <p className="mt-3 text-sm text-cyan-200">{message}</p>}
    </section>
    <section className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-6"><h2 className="text-xl font-bold">Work order register</h2>{workOrders.length ? <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-slate-700 text-slate-400"><tr><th className="p-3">Work order</th><th className="p-3">Customer</th><th className="p-3">Target</th><th className="p-3">Value</th><th className="p-3">Status</th></tr></thead><tbody>{workOrders.map(item => <tr key={item.reference} className="border-b border-slate-800"><td className="p-3"><strong>{item.reference}</strong><br/><span className="text-slate-400">{item.projectName}</span></td><td className="p-3">{item.customer}</td><td className="p-3">{item.targetDate}</td><td className="p-3">₹{item.totalValue.toLocaleString("en-IN")}</td><td className="p-3">{item.status}</td></tr>)}</tbody></table></div> : <p className="mt-3 text-slate-400">Create the first work order after customer approval.</p>}</section>
  </main>;
}