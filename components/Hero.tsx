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
