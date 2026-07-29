import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="bg-gradient-to-r from-cyan-700 via-blue-700 to-indigo-800 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">

        <h2 className="text-4xl font-bold text-white lg:text-5xl">
          Ready to Build Your Next Website?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-cyan-100">
          Whether you need a corporate website, business portal,
          e-commerce platform or a custom web application,
          ANATECH Technology Solutions is ready to help you
          transform your ideas into a secure, scalable and
          high-performance digital solution.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">

          <Link
            href="/#contact"
            className="inline-flex items-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:scale-105"
          >
            Get Free Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

          <a
            href="tel:+918921520858"
            className="inline-flex items-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white hover:bg-white/10"
          >
            <Phone className="mr-2 h-5 w-5" />
            Call Us
          </a>

          <a
            href="mailto:anatech.operations@gmail.com"
            className="inline-flex items-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white hover:bg-white/10"
          >
            <Mail className="mr-2 h-5 w-5" />
            Email Us
          </a>

        </div>

      </div>
    </section>
  );
}