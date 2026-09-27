"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { MasterSettings as MasterSettingsData } from "@/lib/admin-master-settings";

type Field = keyof MasterSettingsData;
const sections: Array<{ title: string; note: string; fields: Array<[Field, string, string]> }> = [
  { title: "Business profile", note: "These details are used on future quotations and invoices.", fields: [
    ["companyName", "Business name", "text"], ["address", "Address", "text"], ["email", "Business email", "email"], ["phone", "Support phone", "text"],
  ] },
  { title: "Legal and banking", note: "Enter only verified values. This page is available only inside the protected CRM.", fields: [
    ["gstin", "GSTIN", "text"], ["iec", "IEC code", "text"], ["bankName", "Bank name", "text"], ["bankAccount", "Bank account number", "text"], ["bankIfsc", "IFSC code", "text"],
  ] },
  { title: "GST and document rules", note: "Kerala GST state code is 32. The tax type is selected automatically from Place of Supply.", fields: [
    ["sellerStateCode", "Seller GST state code", "text"], ["defaultTaxRate", "Default GST rate (%)", "number"], ["quotationPrefix", "Quotation prefix", "text"], ["invoicePrefix", "Invoice prefix", "text"], ["paymentTerms", "Payment terms", "text"],
  ] },
];

export function MasterSettings({ initialSettings }: { initialSettings: MasterSettingsData }) {
  const [settings, setSettings] = useState(initialSettings);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function update(field: Field, value: string) {
    setSettings((current) => ({ ...current, [field]: value }));
  }

  async function save() {
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await response.json().catch(() => null) as { settings?: MasterSettingsData; error?: string } | null;
      if (!response.ok) throw new Error(data?.error || "Could not save settings.");
      if (data?.settings) setSettings(data.settings);
      setStatus("Master settings saved. New documents will use these details.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  return <main className="mx-auto max-w-5xl p-8 text-slate-100">
    <p className="text-xs font-bold tracking-[.15em] text-cyan-300">MASTER SETTINGS</p>
    <h1 className="mt-2 text-3xl font-black">Business control centre</h1>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">Update your business and GST rules once. New CRM documents use the saved values automatically.</p>
    <div className="mt-6 space-y-5">
      {sections.map((section) => <section key={section.title} className="rounded-xl border border-slate-700 bg-slate-900/70 p-6">
        <h2 className="text-lg font-bold">{section.title}</h2>
        <p className="mt-1 text-sm text-slate-400">{section.note}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {section.fields.map(([field, label, type]) => <label className={field === "address" || field === "paymentTerms" ? "md:col-span-2" : ""} key={field}>
            <span className="text-sm font-medium text-slate-300">{label}</span>
            <input type={type} value={settings[field]} onChange={(event) => update(field, event.target.value)} className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" />
          </label>)}
        </div>
      </section>)}
    </div>
    <button type="button" disabled={saving} onClick={save} className="mt-6 flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 font-bold disabled:opacity-60"><Save size={18} />{saving ? "Saving…" : "Save master settings"}</button>
    {status && <p className="mt-3 text-sm text-cyan-200" role="status">{status}</p>}
  </main>;
}
