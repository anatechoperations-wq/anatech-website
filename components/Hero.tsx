"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  Globe,
  LayoutDashboard,
} from "lucide-react";

const services = [
  {
    icon: LayoutDashboard,
    title: "Business Software",
    text: "Billing, stock and reports in one place.",
  },
  {
    icon: ShoppingCart,
    title: "Shopping Cart",
    text: "Sell online with your own branded store.",
  },
  {
    icon: Globe,
    title: "Business Website",
    text: "A professional, mobile-friendly website.",
  },
];

const points = [
  "See a demo first",
  "Tailored to your business",
  "Based in Kollam, Kerala",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 pt-32 pb-28"
    >
      <div className="absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-white/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold text-blue-100">
              Kollam, Kerala
            </p>

            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              Software, Shopping Cart and Website for your business
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-50">
              ANATECH Technology Solutions builds business software, online
              shopping carts and professional websites, tailored to the way
              your business works. Start with a demo and continue only if you
              like it.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-blue-900 shadow-lg transition hover:bg-blue-50"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Our Services
              </a>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 text-sm text-blue-50"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-blue-100">
              Also: AI solutions, digital media, government e-services and
              more.
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="ANATECH Logo"
                  className="h-16 w-16 rounded-full bg-slate-900 object-contain p-1"
                />
                <div>
                  <p className="text-xl font-bold text-white">ANATECH</p>
                  <p className="text-xs tracking-[3px] text-blue-100">
                    TECHNOLOGY SOLUTIONS
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {services.map((s) => (
                  <div
                    key={s.title}
                    className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-md"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-slate-600">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
