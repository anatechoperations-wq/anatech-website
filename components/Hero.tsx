"use client";

import { motion, useReducedMotion } from "framer-motion";
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

function BackgroundGraphics() {
  const reduce = useReducedMotion();

  const loop = (duration: number) => ({
    duration,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(37,99,235,0.16) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft glow 1 */}
      <motion.div
        animate={reduce ? {} : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={loop(14)}
        className="absolute -top-32 -right-24 h-[460px] w-[460px] rounded-full bg-blue-400/20 blur-[110px]"
      />

      {/* Soft glow 2 */}
      <motion.div
        animate={reduce ? {} : { x: [0, -50, 0], y: [0, -30, 0] }}
        transition={loop(16)}
        className="absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-cyan-300/25 blur-[110px]"
      />

      {/* Growth line graph */}
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 left-0 h-full w-full"
        fill="none"
      >
        <motion.path
          d="M0 540 C 150 500, 260 520, 390 450 S 610 400, 730 320 S 960 230, 1200 100"
          stroke="rgba(37,99,235,0.35)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }
          }
        />
        {[
          { cx: 390, cy: 450 },
          { cx: 730, cy: 320 },
          { cx: 1020, cy: 190 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="8"
            fill="rgba(37,99,235,0.55)"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={reduce ? {} : { scale: [1, 1.8, 1], opacity: [0.7, 0.25, 0.7] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating shapes */}
      <motion.div
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute left-[6%] top-[22%] h-16 w-16 rounded-2xl border-2 border-blue-300/50"
      />
      <motion.div
        animate={reduce ? {} : { rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute right-[8%] bottom-[18%] h-24 w-24 rounded-3xl border border-blue-300/40"
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-200 bg-white pt-32 pb-28"
    >
      <BackgroundGraphics />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold text-blue-600">
              Kollam, Kerala
            </p>

            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              Software, Shopping Cart and Website for your business
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              ANATECH Technology Solutions builds business software, online
              shopping carts and professional websites, tailored to the way
              your business works. Start with a demo and continue only if you
              like it.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/70 px-8 py-4 font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Explore Our Services
              </a>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-slate-500">
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
            <div className="rounded-3xl border border-blue-100 bg-white/80 p-6 shadow-xl shadow-blue-900/10 backdrop-blur-md">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="ANATECH Logo"
                  className="h-16 w-16 rounded-full bg-slate-900 object-contain p-1"
                />
                <div>
                  <p className="text-xl font-bold text-slate-900">ANATECH</p>
                  <p className="text-xs tracking-[3px] text-blue-600">
                    TECHNOLOGY SOLUTIONS
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {services.map((s) => (
                  <div
                    key={s.title}
                    className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
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
    </section>
  );
}
