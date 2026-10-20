"use client";

import { useState } from "react";
import { ExternalLink, Phone, UserRoundCheck } from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/admin-leads";

const statuses: LeadStatus[] = ["New", "Contacted", "Interested", "Proposal Sent", "Negotiation", "Won", "Lost"];

export function LeadTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [saving, setSaving] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  async function update(row: number, status: LeadStatus) {
    setSaving(row);
    setMessage("");
    try {
      const response = await fetch("/api/admin/leads/" + row, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setLeads((current) => current.map((lead) => lead.row === row ? { ...lead, status } : lead));
      } else {
        setMessage("Could not update the lead status.");
      }
    } finally {
      setSaving(null);
    }
  }

  async function convert(row: number) {
    setSaving(row);
    setMessage("");
    try {
      const response = await fetch("/api/admin/leads/" + row + "/convert", { method: "POST" });
      const data = await response.json().catch(() => null) as { error?: string; customerCreated?: boolean } | null;
      if (response.ok) {
        setLeads((current) => current.map((lead) => lead.row === row ? { ...lead, status: "Won" } : lead));
        setMessage(data?.customerCreated ? "Lead converted and customer record created." : "Lead marked Won; this customer already exists.");
      } else {
        setMessage(data?.error || "Could not convert this lead.");
      }
    } catch {
      setMessage("Could not reach the conversion service.");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="overflow-x-auto">
      {message && <p className="mb-3 text-sm text-cyan-200" role="status">{message}</p>}
      <table className="mt-3 w-full min-w-[940px] text-left text-sm">
        <thead className="border-b border-slate-700 text-xs uppercase tracking-wider text-slate-400"><tr><th className="p-3">Lead</th><th className="p-3">Contact</th><th className="p-3">Service</th><th className="p-3">Status</th><th className="p-3">Action</th></tr></thead>
        <tbody>
          {leads.slice().reverse().map((lead) => (
            <tr className="border-b border-slate-800" key={lead.id}>
              <td className="p-3 font-medium">{lead.name}<p className="mt-1 max-w-48 truncate text-xs font-normal text-slate-400">{lead.message || "No message"}</p></td>
              <td className="p-3 text-slate-300">{lead.phone}<br /><span className="text-xs text-slate-400">{lead.email}</span></td>
              <td className="p-3">{lead.service}</td>
              <td className="p-3"><select disabled={saving === lead.row} value={lead.status} onChange={(event) => update(lead.row, event.target.value as LeadStatus)} className="rounded-lg border border-slate-600 bg-slate-900 px-2 py-1.5 text-white">{statuses.map((status) => <option key={status}>{status}</option>)}</select></td>
              <td className="p-3"><div className="flex items-center gap-3 text-cyan-300"><a aria-label="Call lead" href={"tel:" + lead.phone}><Phone size={17} /></a><a aria-label="Message lead on WhatsApp" target="_blank" rel="noreferrer" href={"https://wa.me/" + lead.phone.replace(/\D/g, "")}><ExternalLink size={17} /></a><button disabled={saving === lead.row || lead.status === "Won"} onClick={() => convert(lead.row)} title="Convert to customer" className="disabled:cursor-not-allowed disabled:opacity-40"><UserRoundCheck size={18} /></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}