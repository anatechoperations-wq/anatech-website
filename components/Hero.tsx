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
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 pt-32 pb-24"
    >
      {/* Background Blur */}

      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >

            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2">

              <Sparkles className="w-4 h-4 text-cyan-400" />

              <span className="text-sm font-semibold tracking-[3px] uppercase text-cyan-300">
                Enterprise Technology Solutions
              </span>

            </div>

            {/* Heading */}

            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white">

              Empowering Businesses

              <br />

              Through

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 bg-clip-text text-transparent">

                Technology & AI

              </span>

            </h1>

            {/* Description */}

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">

              ANATECH Technology Solutions delivers enterprise-grade
              IT services, Artificial Intelligence solutions,
              digital transformation, business consultancy,
              government e-services, digital media,
              and international trade support to help
              businesses innovate, grow and succeed.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-col sm:flex-row gap-5">

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Free Consultation

                <ArrowRight className="ml-2 w-5 h-5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-cyan-400 hover:bg-slate-800"
              >
                Explore Our Services
              </a>

            </div>

            {/* Trust Badges */}

            <div className="mt-12 grid grid-cols-2 gap-5">

              <div className="flex items-center gap-3 text-slate-300">

                <CheckCircle2 className="w-5 h-5 text-cyan-400" />

                <span>AI Powered</span>

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <ShieldCheck className="w-5 h-5 text-cyan-400" />

                <span>Secure Solutions</span>

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <BrainCircuit className="w-5 h-5 text-cyan-400" />

                <span>Enterprise Ready</span>

              </div>

              <div className="flex items-center gap-3 text-slate-300">

                <Building2 className="w-5 h-5 text-cyan-400" />

                <span>Digital Transformation</span>

              </div>

            </div>

          </motion.div>
                    {/* RIGHT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center"
          >

            {/* Outer Glow */}

            <div className="absolute h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-3xl" />

            {/* Animated Ring */}

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
              className="absolute h-[380px] w-[380px] rounded-full border-2 border-cyan-400/30 border-dashed"
            />

            {/* Second Ring */}

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: 45,
                ease: "linear",
              }}
              className="absolute h-[300px] w-[300px] rounded-full border border-blue-500/30"
            />

            {/* Logo */}

            <div className="relative z-10 flex h-64 w-64 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900 shadow-[0_0_80px_rgba(0,180,255,0.35)]">

              <img
                src="/logo.png"
                alt="ANATECH Logo"
                className="h-44 w-44 object-contain"
              />

            </div>

            {/* Floating Card 1 */}

            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute left-0 top-12 rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 backdrop-blur-xl"
            >
              <p className="text-cyan-400 font-semibold">
                🤖 AI Solutions
              </p>
            </motion.div>

            {/* Floating Card 2 */}

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute right-0 top-28 rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 backdrop-blur-xl"
            >
              <p className="text-cyan-400 font-semibold">
                💻 IT Services
              </p>
            </motion.div>

            {/* Floating Card 3 */}

            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
              }}
              className="absolute bottom-20 left-8 rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 backdrop-blur-xl"
            >
              <p className="text-cyan-400 font-semibold">
                🌐 Digital Transformation
              </p>
            </motion.div>

            {/* Floating Card 4 */}

            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{
                repeat: Infinity,
                duration: 6,
              }}
              className="absolute bottom-6 right-4 rounded-2xl border border-slate-700 bg-slate-900/90 px-5 py-4 backdrop-blur-xl"
            >
              <p className="text-cyan-400 font-semibold">
                ☁ Cloud Technologies
              </p>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}