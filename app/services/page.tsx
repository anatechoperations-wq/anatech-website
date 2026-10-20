import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore ANATECH Technology Solutions services: web development, AI, software, digital media, import-export support, business consultancy, government e-services and training.",
  alternates: { canonical: "/services" },
};

const services = [
  ["Web Development", "Professional websites, e-commerce and web applications.", "/services/web-development"],
  ["AI Solutions", "Practical AI automation and intelligent business solutions.", "/services/ai-solutions"],
  ["Software Development", "Custom business software built around your workflow.", "/services/software-development"],
  ["Digital Media", "Digital communication, campaigns and brand support.", "/services/digital-media"],
  ["Import & Export", "Trade-readiness and documentation consultation.", "/services/import-export"],
  ["Business Consultancy", "Planning and operational guidance for growing businesses.", "/services/business-consultancy"],
  ["Government e-Services", "Digital process and documentation support.", "/services/government-e-services"],
  ["Training & Academy", "Practical technology and business learning programmes.", "/services/training-academy"],
] as const;

export default function ServicesPage() {
  return <><Navbar /><main className="bg-slate-50 pt-24 text-slate-900"><section className="bg-slate-950 px-6 py-20 text-white"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[.22em] text-cyan-300">ANATECH Services</p><h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">Technology and business support for your next step.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Explore the service division that best matches your current requirement. Scope, timeline and pricing are finalised only after a clear discussion.</p></div></section><section className="mx-auto max-w-7xl px-6 py-20"><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{services.map(([title,description,href])=><article key={href} className="flex min-h-56 flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-4 leading-7 text-slate-600">{description}</p><Link href={href} className="mt-auto pt-7 font-bold text-blue-700 underline underline-offset-4">Learn more →</Link></article>)}</div></section></main><Footer /></>;
}