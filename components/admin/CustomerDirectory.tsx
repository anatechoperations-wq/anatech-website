"use client";

import { FormEvent, useMemo, useState } from "react";

type Customer = {
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
};

export function CustomerDirectory({ initialCustomers }: { initialCustomers: Customer[] }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");

  const visibleCustomers = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return customers;
    return customers.filter((customer) =>
      [customer.name, customer.email, customer.phone, customer.service].join(" ").toLowerCase().includes(needle),
    );
  }, [customers, query]);

  async function saveCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const customer = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      service: String(form.get("service") || "").trim(),
      notes: String(form.get("notes") || "").trim(),
    };
    if (!customer.name) {
      setMessage("Customer name is required.");
      return;
    }

    setIsSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      const data = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) {
        setMessage(data?.error || "Could not save the customer.");
        return;
      }
      setCustomers((current) => [{ createdAt: new Date().toISOString(), ...customer }, ...current]);
      setMessage("Customer saved to CRM.");
      setIsAdding(false);
      event.currentTarget.reset();
    } catch {
      setMessage("Could not reach the CRM customer service.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-white sm:max-w-sm" placeholder="Search customers" aria-label="Search customers" />
        <button className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-500" onClick={() => setIsAdding((open) => !open)}>{isAdding ? "Close form" : "+ Add customer"}</button>
      </div>

      {isAdding && (
        <form className="mt-5 rounded-xl border border-slate-700 bg-slate-900/70 p-6" onSubmit={saveCustomer}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-slate-300">Customer name<input className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" name="name" required /></label>
            <label className="grid gap-2 text-sm text-slate-300">Email<input className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" name="email" type="email" /></label>
            <label className="grid gap-2 text-sm text-slate-300">Phone<input className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" name="phone" /></label>
            <label className="grid gap-2 text-sm text-slate-300">Service<input className="rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" name="service" placeholder="e.g. Website Development" /></label>
          </div>
          <label className="mt-4 grid gap-2 text-sm text-slate-300">Internal notes<textarea className="min-h-24 rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" name="notes" /></label>
          <button disabled={isSaving} className="mt-5 rounded-lg bg-cyan-600 px-5 py-3 font-bold text-white disabled:opacity-60" type="submit">{isSaving ? "Saving..." : "Save customer"}</button>
        </form>
      )}

      {message && <p className="mt-4 text-sm text-cyan-200" role="status">{message}</p>}

      <section className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-6">
        <h2 className="text-lg font-bold">Customer directory</h2>
        {visibleCustomers.length ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-700 text-slate-400"><tr><th className="p-3">Customer</th><th className="p-3">Contact</th><th className="p-3">Service</th><th className="p-3">Notes</th></tr></thead>
              <tbody>{visibleCustomers.map((customer, index) => <tr className="border-b border-slate-800" key={customer.createdAt + customer.name + index}><td className="p-3 font-medium">{customer.name}</td><td className="p-3">{customer.email || "—"}<br /><span className="text-slate-400">{customer.phone || "—"}</span></td><td className="p-3">{customer.service || "—"}</td><td className="max-w-xs p-3 text-slate-400">{customer.notes || "—"}</td></tr>)}</tbody>
            </table>
          </div>
        ) : <p className="mt-3 text-slate-400">{query ? "No matching customers." : "No customers have been saved yet."}</p>}
      </section>
    </>
  );
}