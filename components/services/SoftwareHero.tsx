"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function SoftwareHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#031021] via-[#0A2345] to-[#071126]">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">
              <Sparkles className="mr-2 h-4 w-4" />
              Enterprise Software Development
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white lg:text-7xl">
              Custom
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Software Development
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              We build secure, scalable and high-performance software
              solutions tailored to your organization's unique business
              requirements.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/#contact"
                className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 hover:bg-cyan-400 transition"
              >
                Start Your Project
              </Link>

              <Link
                href="/services/web-development"
                className="inline-flex items-center rounded-xl border border-white/20 px-8 py-4 text-white hover:border-cyan-400 transition"
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid gap-6">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <Code2 className="mb-4 h-10 w-10 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">
                  Enterprise Applications
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Database className="text-cyan-400" />
                  <h4 className="mt-4 text-white font-semibold">
                    Database Systems
                  </h4>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Server className="text-cyan-400" />
                  <h4 className="mt-4 text-white font-semibold">
                    Cloud Solutions
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