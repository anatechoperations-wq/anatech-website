"use client";

import { useMemo, useState } from "react";
import { Plus, Printer, Save, Trash2 } from "lucide-react";

type Line = { description: string; quantity: number; rate: number; hsnSac: string; unit: string };
type Settings = {
  companyName: string; address: string; email: string; phone: string; gstin: string;
  iec: string; bankName: string; bankAccount: string; bankIfsc: string; paymentTerms: string;
  sellerStateCode: string; defaultTaxRate: string;
};
const states = [
  ["01", "Jammu & Kashmir"], ["02", "Himachal Pradesh"], ["03", "Punjab"], ["04", "Chandigarh"],
  ["05", "Uttarakhand"], ["06", "Haryana"], ["07", "Delhi"], ["08", "Rajasthan"], ["09", "Uttar Pradesh"],
  ["10", "Bihar"], ["11", "Sikkim"], ["12", "Arunachal Pradesh"], ["13", "Nagaland"], ["14", "Manipur"],
  ["15", "Mizoram"], ["16", "Tripura"], ["17", "Meghalaya"], ["18", "Assam"], ["19", "West Bengal"],
  ["20", "Jharkhand"], ["21", "Odisha"], ["22", "Chhattisgarh"], ["23", "Madhya Pradesh"], ["24", "Gujarat"],
  ["26", "Dadra & Nagar Haveli and Daman & Diu"], ["27", "Maharashtra"], ["29", "Karnataka"], ["30", "Goa"],
  ["32", "Kerala"], ["33", "Tamil Nadu"], ["34", "Puducherry"], ["35", "Andaman & Nicobar Islands"], ["36", "Telangana"], ["37", "Andhra Pradesh"],
  ["38", "Ladakh"],
] as const;

export function DocumentStudio({ type, settings }: { type: "Quotation" | "Invoice"; settings: Settings }) {
  const [client, setClient] = useState("");
  const [customerGstin, setCustomerGstin] = useState("");
  const [placeOfSupplyCode, setPlaceOfSupplyCode] = useState(settings.sellerStateCode);
  const [tax, setTax] = useState(Math.max(0, Number(settings.defaultTaxRate) || 0));
  const [lines, setLines] = useState<Line[]>([{ description: "Professional service", quantity: 1, rate: 0, hsnSac: "", unit: "NOS" }]);
  const [saveMessage, setSaveMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.quantity * line.rate, 0), [lines]);
  const taxAmount = subtotal * tax / 100;
  const intraState = placeOfSupplyCode === settings.sellerStateCode;
  const cgst = intraState ? taxAmount / 2 : 0;
  const kgst = intraState ? taxAmount - cgst : 0;
  const igst = intraState ? 0 : taxAmount;
  const total = subtotal + taxAmount;

  function update(index: number, key: keyof Line, value: string) {
    setLines((current) => current.map((line, row) => row === index
      ? { ...line, [key]: key === "description" || key === "hsnSac" || key === "unit" ? value : Math.max(0, Number(value) || 0) }
      : line));
  }

  async function saveDocument() {
    const cleanedLines = lines.map((line) => ({ ...line, description: line.description.trim(), hsnSac: line.hsnSac.trim().toUpperCase(), unit: line.unit.trim().toUpperCase() }));
    if (!client.trim() || cleanedLines.some((line) => !line.description || !/^[A-Z0-9]{4,8}$/.test(line.hsnSac) || !line.unit)) {
      setSaveMessage("Add customer name, description, valid HSN/SAC and unit for every line item.");
      return;
    }
    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch("/api/admin/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, customer: client, customerGstin, placeOfSupplyCode, taxRate: tax, lines: cleanedLines }),
      });
      const data = await response.json().catch(() => null) as { error?: string; reference?: string } | null;
      setSaveMessage(response.ok ? "Saved to CRM. Reference: " + (data?.reference || "generated") : data?.error || "Could not save this document.");
    } catch {
      setSaveMessage("Could not reach the CRM document service.");
    } finally {
      setIsSaving(false);
    }
  }

  return <main className="mx-auto max-w-7xl p-8 text-slate-100">
    <p className="text-xs font-bold tracking-[.15em] text-cyan-300">BUSINESS DOCUMENTS</p>
    <h1 className="mt-2 text-3xl font-black">{type} Studio</h1>
    <div className="mt-6 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
      <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-6 print:hidden">
        <label className="mb-4 block text-sm text-slate-300">Customer / company name
          <input value={client} onChange={(event) => setClient(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" />
        </label>
        <label className="mb-4 block text-sm text-slate-300">Customer GSTIN <span className="text-slate-500">(if registered)</span>
          <input value={customerGstin} onChange={(event) => setCustomerGstin(event.target.value.toUpperCase())} maxLength={15} className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" />
        </label>
        <label className="mb-4 block text-sm text-slate-300">Place of Supply
          <select value={placeOfSupplyCode} onChange={(event) => setPlaceOfSupplyCode(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 p-3 text-white">
            {states.map(([code, name]) => <option value={code} key={code}>{code} — {name}</option>)}
          </select>
        </label>
        <div className="mb-5 rounded-lg border border-cyan-900 bg-cyan-950/30 p-3 text-sm text-cyan-100">
          {intraState ? "Intra-state: CGST + KGST will be applied." : "Inter-state: IGST will be applied."}
        </div>
        <label className="mb-5 block text-sm text-slate-300">GST percentage
          <input value={tax} onChange={(event) => setTax(Math.max(0, Number(event.target.value) || 0))} type="number" min="0" max="100" className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-950 p-3 text-white" />
        </label>
        <div className="mb-3 flex items-center justify-between"><b>Line items</b>
          <button type="button" onClick={() => setLines((current) => [...current, { description: "", quantity: 1, rate: 0, hsnSac: "", unit: "NOS" }])} className="flex items-center gap-1 rounded-lg bg-slate-700 px-3 py-2 text-sm"><Plus size={16} /> Add</button>
        </div>
        {lines.map((line, index) => <div className="mb-2 grid grid-cols-[minmax(120px,1fr)_80px_60px_58px_86px_28px] gap-2" key={index}>
          <input aria-label="Description" placeholder="Description" value={line.description} onChange={(event) => update(index, "description", event.target.value)} className="rounded border border-slate-600 bg-slate-950 p-2" />
          <input aria-label="HSN or SAC" placeholder="HSN/SAC" value={line.hsnSac} onChange={(event) => update(index, "hsnSac", event.target.value)} className="rounded border border-slate-600 bg-slate-950 p-2" />
          <input aria-label="Unit" placeholder="Unit" value={line.unit} onChange={(event) => update(index, "unit", event.target.value)} className="rounded border border-slate-600 bg-slate-950 p-2" />
          <input aria-label="Quantity" value={line.quantity} onChange={(event) => update(index, "quantity", event.target.value)} type="number" min="0" className="rounded border border-slate-600 bg-slate-950 p-2" />
          <input aria-label="Rate" value={line.rate} onChange={(event) => update(index, "rate", event.target.value)} type="number" min="0" className="rounded border border-slate-600 bg-slate-950 p-2" />
          <button type="button" aria-label="Remove item" onClick={() => setLines((current) => current.length === 1 ? current : current.filter((_, row) => row !== index))} className="text-rose-300"><Trash2 size={17} /></button>
        </div>)}
        <button type="button" disabled={isSaving} onClick={saveDocument} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 p-3 font-bold disabled:cursor-not-allowed disabled:opacity-60"><Save size={18} /> {isSaving ? "Saving..." : "Save to CRM"}</button>
        {saveMessage && <p className="mt-3 text-sm text-cyan-200" role="status">{saveMessage}</p>}
        <button type="button" onClick={() => window.print()} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 p-3 font-bold"><Printer size={18} /> Print / Save PDF</button>
      </section>

      <section className="rounded-xl bg-white p-8 text-slate-900">
        <div className="flex justify-between border-b-2 border-blue-600 pb-5">
          <div><p className="text-2xl font-black tracking-widest text-blue-900">{settings.companyName || "ANATECH"}</p><p className="text-xs tracking-[.18em] text-slate-500">TECHNOLOGY SOLUTIONS</p></div>
          <div className="text-right"><p className="text-xl font-black">{type}</p><p className="text-sm text-slate-500">{new Date().toLocaleDateString("en-IN")}</p></div>
        </div>
        <div className="my-7 grid grid-cols-2 gap-8 text-sm">
          <div><b>From</b><p className="mt-2 leading-6 text-slate-600">{settings.companyName}<br />{settings.address}<br />{settings.email}<br />{settings.phone}{settings.gstin && <><br />GSTIN: {settings.gstin}</>}</p></div>
          <div><b>Bill to</b><p className="mt-2 leading-6 text-slate-600">{client || "Customer name"}{customerGstin && <><br />GSTIN: {customerGstin}</>}<br />Place of Supply: {placeOfSupplyCode}</p></div>
        </div>
        <table className="w-full text-sm"><thead className="border-b text-left text-xs uppercase text-slate-500"><tr><th className="p-2">Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
          <tbody>{lines.map((line, index) => <tr className="border-b" key={index}><td className="p-2">{line.description || "Service"}</td><td>{line.quantity}</td><td>₹{line.rate.toLocaleString("en-IN")}</td><td>₹{(line.quantity * line.rate).toLocaleString("en-IN")}</td></tr>)}</tbody>
        </table>
        <div className="ml-auto mt-6 max-w-60 text-sm">
          <p className="flex justify-between">Subtotal <b>₹{subtotal.toLocaleString("en-IN")}</b></p>
          {intraState ? <><p className="mt-2 flex justify-between">CGST ({tax / 2}%) <b>₹{cgst.toLocaleString("en-IN")}</b></p><p className="mt-2 flex justify-between">KGST ({tax / 2}%) <b>₹{kgst.toLocaleString("en-IN")}</b></p></> : <p className="mt-2 flex justify-between">IGST ({tax}%) <b>₹{igst.toLocaleString("en-IN")}</b></p>}
          <h3 className="mt-4 flex justify-between border-t-2 border-blue-600 pt-3 text-lg">Total <b>₹{total.toLocaleString("en-IN")}</b></h3>
        </div>
        {(settings.bankName || settings.bankAccount) && <div className="mt-10 border-t pt-4 text-xs leading-5 text-slate-500"><b>Payment details</b><br />{settings.bankName}{settings.bankAccount && <> · A/C: {settings.bankAccount}</>}{settings.bankIfsc && <> · IFSC: {settings.bankIfsc}</>}<br />{settings.paymentTerms}</div>}
        <p className="mt-10 text-xs text-slate-500">{type === "Quotation" ? "This quotation is subject to final scope confirmation and applicable taxes." : "Thank you for your business."}</p>
      </section>
    </div>
  </main>;
}
