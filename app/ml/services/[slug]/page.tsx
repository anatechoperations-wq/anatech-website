import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { malayalamServices } from "@/lib/malayalam-services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return malayalamServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = malayalamServices.find((item) => item.slug === slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: "/ml/services/" + service.slug,
      languages: { en: service.englishHref, ml: "/ml/services/" + service.slug },
    },
    openGraph: {
      title: service.title + " | ANATECH",
      description: service.description,
      locale: "ml_IN",
      type: "website",
      url: "/ml/services/" + service.slug,
    },
  };
}

export default async function MalayalamServicePage({ params }: Props) {
  const { slug } = await params;
  const service = malayalamServices.find((item) => item.slug === slug);
  if (!service) notFound();

  const whatsappHref =
    "https://wa.me/919074262344?text=" +
    encodeURIComponent("നമസ്കാരം, " + service.title + " സംബന്ധിച്ച് സംസാരിക്കണം.");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    inLanguage: "ml-IN",
    provider: {
      "@type": "Organization",
      name: "ANATECH Technology Solutions",
      url: "https://www.anatechsolutions.in",
    },
    areaServed: { "@type": "Country", name: "India" },
  };

  return (
    <main lang="ml" className="min-h-screen bg-slate-50 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-6">
          <Link href="/ml" className="font-black tracking-[.18em]">ANATECH</Link>
          <div className="flex items-center gap-3 text-sm font-bold">
            <Link href="/ml/services">എല്ലാ സേവനങ്ങളും</Link>
            <Link href={service.englishHref} lang="en" className="text-blue-700">English</Link>
          </div>
        </div>
      </header>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-bold text-cyan-300">{service.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-5xl lg:text-6xl">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{service.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/ml/contact" className="inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-bold text-emerald-950">Enquiry അയക്കൂ</Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex rounded-xl border border-slate-500 px-6 py-3 font-bold text-white">WhatsApp-ൽ സംസാരിക്കൂ</a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="text-sm font-bold text-blue-700">ആർക്കാണ് അനുയോജ്യം?</p>
          <h2 className="mt-2 text-3xl font-black">നിങ്ങളുടെ ആവശ്യത്തിന് ചേരുന്ന രീതിയിൽ</h2>
          <ul className="mt-6 space-y-4">{service.audience.map((item) => <li key={item} className="rounded-2xl border border-slate-200 bg-white p-5 leading-7 shadow-sm">{item}</li>)}</ul>
        </div>
        <aside className="rounded-3xl border border-amber-200 bg-amber-50 p-7">
          <p className="font-bold text-amber-800">ആദ്യം വ്യക്തത, പിന്നെ തീരുമാനം</p>
          <p className="mt-3 leading-7 text-amber-950">Final scope, price, statutory requirements, delivery time എന്നിവ ഓരോ ആവശ്യവും പരിശോധിച്ച ശേഷമേ ഉറപ്പാക്കൂ. ആവശ്യമായിടത്ത് ബന്ധപ്പെട്ട authorised professional-ന്റെ സേവനം വേണമെന്നതും മുൻകൂട്ടി അറിയിക്കും.</p>
        </aside>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold text-blue-700">സേവനത്തിന്റെ പ്രധാന ഭാഗങ്ങൾ</p>
          <h2 className="mt-2 text-3xl font-black">എങ്ങനെ സഹായിക്കാം?</h2>
          <ul className="mt-7 grid gap-4 md:grid-cols-2">{service.highlights.map((item) => <li key={item} className="rounded-2xl border border-slate-200 p-5 font-semibold">{item}</li>)}</ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <p className="text-sm font-bold text-blue-700">പ്രവർത്തനരീതി</p>
        <h2 className="mt-2 text-3xl font-black">മൂന്ന് ലളിതമായ ഘട്ടങ്ങൾ</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">{service.process.map((item, index) => <li key={item} className="rounded-2xl bg-slate-900 p-6 text-white"><span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300 font-black text-slate-950">{index + 1}</span><p className="mt-5 leading-7 text-slate-200">{item}</p></li>)}</ol>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold text-blue-700">സാധാരണ ചോദ്യങ്ങൾ</p>
          <h2 className="mt-2 text-3xl font-black">തീരുമാനിക്കും മുമ്പ് അറിയേണ്ടത്</h2>
          <div className="mt-7 space-y-4">{service.faq.map((item) => <details key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><summary className="cursor-pointer font-bold">{item.question}</summary><p className="mt-4 leading-7 text-slate-600">{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="bg-blue-700 px-5 py-16 text-white sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div><p className="text-cyan-200">അടുത്ത ഘട്ടം</p><h2 className="mt-2 text-3xl font-black">നിങ്ങളുടെ ആവശ്യം ഒരു സന്ദേശമായി അയക്കൂ.</h2><p className="mt-3 max-w-2xl text-blue-100">നിങ്ങളുടെ ലക്ഷ്യം, നിലവിലെ സ്ഥിതി, ആവശ്യമുള്ള സഹായം എന്നിവ പറഞ്ഞാൽ അനുയോജ്യമായ next step സംസാരിക്കാം.</p></div>
          <Link href="/ml/contact" className="shrink-0 rounded-xl bg-white px-6 py-3 font-bold text-blue-800">Malayalam enquiry</Link>
        </div>
      </section>
    </main>
  );
}
