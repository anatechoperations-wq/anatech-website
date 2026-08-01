"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Bot,
  Cpu,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function AIHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#030712] via-[#071A35] to-[#0A2547]">

      {/* Background Glow */}

      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">

        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >

            <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">

              <Sparkles className="mr-2 h-4 w-4" />

              Enterprise Artificial Intelligence

            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white lg:text-7xl">

              AI Solutions

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">

                For Modern Businesses

              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">

              Transform your business using Artificial Intelligence,
              intelligent automation, AI chatbots, workflow optimization,
              predictive analytics and enterprise AI solutions from
              ANATECH Technology Solutions.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="/#contact"
                className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Start AI Project
              </Link>

              <Link
                href="/services/web-development"
                className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 font-semibold text-white transition hover:border-cyan-400"
              >
                Explore Services

                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >

            <div className="grid gap-6">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

                <BrainCircuit className="mb-4 h-12 w-12 text-cyan-400" />

                <h3 className="text-2xl font-bold text-white">

                  AI Automation

                </h3>

                <p className="mt-4 text-slate-300">

                  Intelligent business automation powered by Artificial Intelligence.

                </p>

              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                  <Bot className="text-cyan-400" />

                  <h4 className="mt-4 font-semibold text-white">

                    AI Chatbots

                  </h4>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                  <Cpu className="text-cyan-400" />

                  <h4 className="mt-4 font-semibold text-white">

                    Machine Learning

                  </h4>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}