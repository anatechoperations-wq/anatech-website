"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  BrainCircuit,
  ShieldCheck,
  Sparkles,
  Building2,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-32 pb-28"
    >
      {/* Background Effects */}

      <div className="absolute -top-52 -right-52 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[150px]" />

      <div className="absolute bottom-0 -left-32 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ================= LEFT CONTENT ================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* Enterprise Badge */}

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />

              <span className="text-xs md:text-sm font-semibold uppercase tracking-[3px] text-cyan-300">
                Enterprise Technology Solutions
              </span>

            </motion.div>

            {/* Main Heading */}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white"
            >
              Empowering Businesses

              <br />

              Through

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 bg-clip-text text-transparent">

                Technology & AI

              </span>

            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-8 max-w-2xl text-lg leading-8 text-slate-300"
            >
              ANATECH Technology Solutions delivers enterprise-grade
              Web Development, Artificial Intelligence, Software
              Development, Digital Media, Business Consultancy,
              Government e-Services and Technology Solutions
              that empower organisations to innovate, transform,
              and grow with confidence.
            </motion.p>

            {/* CTA Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-5"
            >

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
              >
                Get Free Consultation

                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-400 hover:bg-slate-800"
              >
                Explore Our Services
              </a>

            </motion.div>

            {/* Trust Indicators */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 grid grid-cols-2 gap-5"
            >

              <div className="flex items-center gap-3 text-slate-300">

                <CheckCircle2 className="h-5 w-5 text-cyan-400" />

                <span>AI Powered</span>

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <ShieldCheck className="h-5 w-5 text-cyan-400" />

                <span>Secure Solutions</span>

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <BrainCircuit className="h-5 w-5 text-cyan-400" />

                <span>Enterprise Ready</span>

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <Building2 className="h-5 w-5 text-cyan-400" />

                <span>Digital Transformation</span>

              </div>

            </motion.div>

          </motion.div>

          {/* ================= RIGHT CONTENT STARTS IN PART 2 ================= */}
          {/* ================= RIGHT CONTENT STARTS IN PART 2 ================= */}
                    <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center min-h-[620px]"
          >
            {/* Glow Background */}

            <div className="absolute h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />

            {/* Outer Rotating Ring */}

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[400px] w-[400px] rounded-full border-2 border-dashed border-cyan-400/30"
            />

            {/* Inner Rotating Ring */}

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute h-[320px] w-[320px] rounded-full border border-blue-500/30"
            />

            {/* Logo */}

            <motion.div
              animate={{
                y: [-6, 6, -6],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="relative z-20 flex h-64 w-64 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900 shadow-[0_0_80px_rgba(0,180,255,0.35)]"
            >
              <img
                src="/logo.png"
                alt="ANATECH Logo"
                className="h-44 w-44 object-contain"
              />
            </motion.div>

            {/* Floating Card 1 */}

            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute top-16 left-0 rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 backdrop-blur-xl shadow-xl"
            >
              <p className="font-semibold text-cyan-400">
                🤖 AI Solutions
              </p>
            </motion.div>

            {/* Floating Card 2 */}

            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute top-24 right-0 rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 backdrop-blur-xl shadow-xl"
            >
              <p className="font-semibold text-cyan-400">
                💻 IT Services
              </p>
            </motion.div>

            {/* Floating Card 3 */}

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
              }}
              className="absolute bottom-40 left-6 rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 backdrop-blur-xl shadow-xl"
            >
              <p className="font-semibold text-cyan-400">
                🌐 Digital Transformation
              </p>
            </motion.div>

            {/* Floating Card 4 */}
            {/* Positioned higher to avoid Chatbase overlap */}

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                repeat: Infinity,
                duration: 5.5,
              }}
              className="absolute bottom-40 right-8 rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 backdrop-blur-xl shadow-xl"
            >
              <p className="font-semibold text-cyan-400">
                ☁ Cloud Technologies
              </p>
            </motion.div>

            {/* Floating Badge */}

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-cyan-500/30 bg-slate-900/90 px-6 py-3 backdrop-blur-xl shadow-xl"
            >
              <span className="font-semibold text-cyan-300">
                Trusted Technology Partner
              </span>
            </motion.div>

          </motion.div>
                  </div>

      </div>

      {/* Bottom Fade */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

    </section>
  );
}