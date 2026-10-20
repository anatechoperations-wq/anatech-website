"use client";
import { useState } from "react";
import { malayalamServices } from "@/lib/malayalam-services";

export function MalayalamLeadForm() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", service:"", message:"" });
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ ...form, service:"Malayalam: " + form.service }) });
      if (!response.ok) throw new Error("Request failed");
      const result = await response.json() as { success?: boolean };
      if (!result.success) throw new Error("Request failed");
      setForm({ name:"", email:"", phone:"", service:"", message:"" }); setStatus("success");
    } catch { setStatus("error"); }
  }
  const field="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";
  return <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
    <div className="grid gap-5 md:grid-cols-2">
      <label className="font-bold">പേര് *<input required value={form.name} onChange={e=>setForm(old=>({...old,name:e.target.value}))} className={field} autoComplete="name"/></label>
      <label className="font-bold">ഫോൺ നമ്പർ *<input required type="tel" value={form.phone} onChange={e=>setForm(old=>({...old,phone:e.target.value}))} className={field} autoComplete="tel"/></label>
      <label className="font-bold">ഇമെയിൽ *<input required type="email" value={form.email} onChange={e=>setForm(old=>({...old,email:e.target.value}))} className={field} autoComplete="email"/></label>
      <label className="font-bold">ആവശ്യമായ സേവനം *<select required value={form.service} onChange={e=>setForm(old=>({...old,service:e.target.value}))} className={field}><option value="">തിരഞ്ഞെടുക്കുക</option>{malayalamServices.map(service=><option key={service.slug}>{service.title}</option>)}<option>മറ്റൊരു സേവനം</option></select></label>
    </div>
    <label className="mt-5 block font-bold">നിങ്ങളുടെ ആവശ്യം *<textarea required value={form.message} onChange={e=>setForm(old=>({...old,message:e.target.value}))} className={field+" min-h-32"} placeholder="ബിസിനസ്സ്, ആവശ്യമുള്ള സേവനം, ലക്ഷ്യം എന്നിവ ചുരുക്കി എഴുതുക."/></label>
    <button disabled={status==="sending"} className="mt-6 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70">{status==="sending" ? "അയക്കുന്നു…" : "അന്വേഷണം അയക്കൂ"}</button>
    {status==="success"&&<p role="status" className="mt-4 font-semibold text-emerald-700">നന്ദി. നിങ്ങളുടെ അന്വേഷണം ലഭിച്ചു. ഞങ്ങൾ ഉടൻ ബന്ധപ്പെടും.</p>}
    {status==="error"&&<p role="alert" className="mt-4 font-semibold text-rose-700">അയക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക അല്ലെങ്കിൽ WhatsApp-ൽ ബന്ധപ്പെടുക.</p>}
  </form>;
}