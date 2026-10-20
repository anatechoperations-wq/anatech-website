import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ബിസിനസ്സ് ഡിജിറ്റൽ പരിഹാരങ്ങൾ",
  description: "കേരളത്തിലെ ബിസിനസ്സുകൾക്കായി കസ്റ്റം സോഫ്റ്റ്‌വെയർ, ഓൺലൈൻ ഷോപ്പിംഗ് കാർട്ട്, പ്രൊഫഷണൽ വെബ്സൈറ്റ് എന്നിവ നൽകുന്ന ANATECH Technology Solutions.",
  alternates: { canonical: "/ml", languages: { en: "/", ml: "/ml" } },
  openGraph: { title: "ANATECH – ബിസിനസ്സ് ഡിജിറ്റൽ പരിഹാരങ്ങൾ", description: "നിങ്ങളുടെ ബിസിനസ്സിനനുസരിച്ച് സോഫ്റ്റ്‌വെയറും വെബ്സൈറ്റും.", locale: "ml_IN", type: "website" },
};

const services = [
  ["ബിസിനസ്സ് സോഫ്റ്റ്‌വെയർ", "ബില്ലിംഗ്, സ്റ്റോക്ക്, കസ്റ്റമർ വിവരങ്ങൾ, റിപ്പോർട്ടുകൾ എന്നിവ ഒരിടത്ത് ക്രമീകരിക്കാൻ."],
  ["ഓൺലൈൻ ഷോപ്പിംഗ് കാർട്ട്", "നിങ്ങളുടെ ഉൽപ്പന്നങ്ങൾ ഓൺലൈനിൽ വിൽക്കാൻ സ്വന്തം ബ്രാൻഡിലുള്ള store."],
  ["പ്രൊഫഷണൽ വെബ്സൈറ്റ്", "മൊബൈലിലും കമ്പ്യൂട്ടറിലും നന്നായി പ്രവർത്തിക്കുന്ന വിശ്വസനീയമായ ഓൺലൈൻ സാന്നിധ്യം."],
] as const;

export default function MalayalamPage() {
  return <main lang="ml" className="min-h-screen bg-slate-50 text-slate-900">
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link href="/ml" className="font-black tracking-[.18em] text-slate-950">ANATECH<span className="block text-[9px] font-bold tracking-[.28em] text-blue-600">TECHNOLOGY SOLUTIONS</span></Link>
        <Link href="/" lang="en" className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-50">English</Link>
      </div>
    </header>
    <section className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(37,99,235,.38),transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="text-sm font-bold tracking-wide text-cyan-300">കൊല്ലം · കേരളം · ഇന്ത്യ</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">നിങ്ങളുടെ ബിസിനസ്സ് <span className="text-cyan-300">ഡിജിറ്റൽ</span> ആക്കാം</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">നിങ്ങളുടെ ബിസിനസിന്റെ പ്രവർത്തനരീതിക്ക് അനുസരിച്ച് സോഫ്റ്റ്‌വെയർ, ഓൺലൈൻ ഷോപ്പിംഗ് കാർട്ട്, പ്രൊഫഷണൽ വെബ്സൈറ്റ് എന്നിവ തയ്യാറാക്കുന്നു.</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href="https://wa.me/919074262344?text=%E0%B4%A8%E0%B4%AE%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B4%BE%E0%B4%B0%E0%B4%82%2C%20%E0%B4%8E%E0%B4%A8%E0%B5%8D%E0%B4%B1%E0%B5%86%20%E0%B4%AC%E0%B4%BF%E0%B4%B8%E0%B4%BF%E0%B4%A8%E0%B4%B8%E0%B5%8D%E0%B4%B8%E0%B4%BF%E0%B4%A8%E0%B5%8D%20%E0%B4%A1%E0%B4%BF%E0%B4%9C%E0%B4%BF%E0%B4%B1%E0%B5%8D%E0%B4%B1%E0%B5%BD%20%E0%B4%AA%E0%B4%B0%E0%B4%BF%E0%B4%B9%E0%B4%BE%E0%B4%B0%E0%B4%82%20%E0%B4%B5%E0%B5%87%E0%B4%A3%E0%B4%82." target="_blank" rel="noreferrer" className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-emerald-950 transition hover:bg-emerald-400">WhatsApp-ൽ ബന്ധപ്പെടൂ</a>
          <a href="tel:+919074262344" className="rounded-xl border border-cyan-300/60 px-6 py-3 font-bold text-white transition hover:bg-white/10">ഇപ്പോൾ വിളിക്കൂ</a>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-bold tracking-wide text-blue-700">ഞങ്ങൾ ചെയ്തുതരുന്നത്</p>
      <h2 className="mt-3 text-3xl font-black">ബിസിനസ്സിന് ഉപയോഗപ്രദമായ ഡിജിറ്റൽ സേവനങ്ങൾ</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{services.map(([title, description]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{description}</p></article>)}</div>
      <Link href="/services" lang="en" className="mt-8 inline-flex rounded-lg font-bold text-blue-700 underline underline-offset-4">All services കാണുക →</Link>
    </section>
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl rounded-3xl bg-blue-700 p-8 text-white md:p-12">
        <p className="text-sm font-bold text-cyan-200">എങ്ങനെ തുടങ്ങാം?</p>
        <div className="mt-6 grid gap-6 md:grid-cols-3"><div><b>1. വിവരങ്ങൾ അയക്കൂ</b><p className="mt-2 text-blue-100">നിങ്ങളുടെ ബിസിനസ്സും ആവശ്യവും WhatsApp-ൽ പറയുക.</p></div><div><b>2. ഡെമോ കാണൂ</b><p className="mt-2 text-blue-100">നിങ്ങൾക്ക് അനുയോജ്യമായ പരിഹാരവും പ്രവൃത്തി രീതിയും മനസ്സിലാക്കുക.</p></div><div><b>3. തീരുമാനിക്കൂ</b><p className="mt-2 text-blue-100">വ്യക്തമായ scope, സമയം, വില എന്നിവ അംഗീകരിച്ച ശേഷം മാത്രം മുന്നോട്ട് പോകാം.</p></div></div>
        <a href="mailto:anatech.operations@gmail.com" className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-blue-800">Email അയക്കൂ</a>
      </div>
    </section>
    <footer className="px-6 py-10 text-center text-sm text-slate-500">© {new Date().getFullYear()} ANATECH Technology Solutions · കൊല്ലം, കേരളം</footer>
  </main>;
}