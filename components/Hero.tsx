"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  Globe,
  LayoutDashboard,
  Package,
  Receipt,
} from "lucide-react";

const words = [
  "Billing & Stock Software",
  "Online Shopping Cart",
  "Professional Website",
];

const chips = [
  { icon: LayoutDashboard, label: "Business Software" },
  { icon: ShoppingCart, label: "Shopping Cart" },
  { icon: Globe, label: "Business Website" },
];

const points = [
  "See a demo first",
  "Tailored to your business",
  "Based in Kollam, Kerala",
];

const bars = [38, 62, 48, 78, 58, 92, 72];

const stock = [
  { name: "Rice", pct: 82, color: "bg-blue-500" },
  { name: "Sugar", pct: 46, color: "bg-cyan-500" },
  { name: "Coconut oil", pct: 14, color: "bg-red-500" },
];

function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setI((v) => (v + 1) % words.length);
    }, 2800);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <span className="relative mt-2 block h-[1.3em] overflow-hidden whitespace-nowrap text-3xl md:text-4xl lg:text-5xl">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="absolute left-0 top-0 block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text pb-1 text-transparent"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(37,99,235,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        animate={reduce ? {} : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={loop(14)}
        className="absolute -top-32 -right-24 h-[460px] w-[460px] rounded-full bg-blue-400/20 blur-[110px]"
      />

      <motion.div
        animate={reduce ? {} : { x: [0, -50, 0], y: [0, -30, 0] }}
        transition={loop(16)}
        className="absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-cyan-300/25 blur-[110px]"
      />

      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 left-0 h-full w-full"
        fill="none"
      >
        <motion.path
          d="M0 540 C 150 500, 260 520, 390 450 S 610 400, 730 320 S 960 230, 1200 100"
          stroke="rgba(37,99,235,0.3)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 3.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 2,
                }
          }
        />
      </svg>
    </div>
  );
}

function FloatCard({
  className,
  delay,
  children,
}: {
  className: string;
  delay: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        reduce
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -10, 0] }
      }
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute z-20 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl shadow-blue-900/10 sm:flex ${className}`}
    >
      {children}
    </motion.div>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-200/50 to-cyan-100/50 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/15">
        {/* Window bar */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-300" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-green-300" />
          <span className="ml-3 text-xs font-medium text-slate-400">
            Sample preview
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-slate-500">Today&apos;s sales</p>
              <p className="text-3xl font-extrabold text-slate-900">
                ₹ 18,450
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              24 bills
            </span>
          </div>

          {/* Sales bars */}
          <div className="mt-5 flex h-32 items-end gap-2 rounded-xl bg-slate-50 p-3">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.7 }}
                className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-400"
              />
            ))}
          </div>

          {/* Stock */}
          <p className="mt-5 text-xs font-semibold text-slate-500">
            Stock level
          </p>
          <div className="mt-2 space-y-3">
            {stock.map((s, i) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>{s.name}</span>
                  <span>{s.pct < 20 ? "Low stock" : `${s.pct}%`}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ delay: 1.2 + i * 0.15, duration: 0.8 }}
                    className={`h-full rounded-full ${s.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FloatCard className="-left-6 top-20" delay={1.4}>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
          <Receipt className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900">Bill saved</p>
          <p className="text-xs text-slate-500">Stock updated</p>
        </div>
      </FloatCard>

      <FloatCard className="-right-6 top-44" delay={1.8}>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <ShoppingCart className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900">Cart: 3 items</p>
          <p className="text-xs text-slate-500">Online order</p>
        </div>
      </FloatCard>

      <FloatCard className="-bottom-6 left-10" delay={2.2}>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
          <Globe className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900">Website live</p>
          <p className="text-xs text-slate-500">Mobile friendly</p>
        </div>
      </FloatCard>

      <FloatCard className="-bottom-4 right-6" delay={2.6}>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <Package className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900">Low stock</p>
          <p className="text-xs text-slate-500">Coconut oil</p>
        </div>
      </FloatCard>
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

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold text-blue-600">
              Kollam, Kerala
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              Grow your business with
              <RotatingWord />
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              ANATECH Technology Solutions builds business software, online
              shopping carts and professional websites, tailored to the way
              your business works. Start with a demo and continue only if you
              like it.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {chips.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800"
                >
                  <c.icon className="h-4 w-4" />
                  {c.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
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
            className="pb-8"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
