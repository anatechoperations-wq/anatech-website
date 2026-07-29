"use client";

import Link from "next/link";
import {
  Globe,
  ShieldCheck,
  Smartphone,
  Rocket,
  Code2,
} from "lucide-react";

export default function ServiceHero() {
  return (
    <section className="min-h-screen bg-[#06112A] flex items-center">
      <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2">

        {/* LEFT */}

        <div className="flex flex-col justify-center">

          <div className="mb-6 inline-flex w-fit items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 backdrop-blur-md">

            <span className="mr-2 h-2 w-2 rounded-full bg-cyan-400"></span>

            <span className="text-sm font-medium tracking-wide text-cyan-300">
              Enterprise Web Development Solutions
            </span>

          </div>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white lg:text-7xl">

            Build

            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">

              Enterprise Websites

            </span>

            That Grow Your Business

          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">

            ANATECH Technology Solutions develops modern,
            secure, lightning-fast and SEO-optimized
            websites for startups, enterprises,
            educational institutions and government
            organizations.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              href="/#contact"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white transition hover:scale-105"
            >
              Start Your Project
            </Link>

            <Link
              href="/#services"
              className="rounded-xl border border-white/20 px-8 py-4 font-semibold text-white hover:border-cyan-400"
            >
              View All Services
            </Link>

          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 text-sm text-slate-300">

            <div>✓ Mobile Responsive</div>

            <div>✓ SEO Optimized</div>

            <div>✓ Enterprise Security</div>

            <div>✓ Lightning Fast</div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center justify-center">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <div className="mb-8 flex items-center gap-3">

              <Code2 size={42} className="text-cyan-400" />

              <div>

                <h3 className="text-2xl font-bold text-white">
                  Enterprise Stack
                </h3>

                <p className="text-slate-400">
                  Modern Web Technologies
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">

                <div className="flex items-center gap-3">

                  <Globe className="text-cyan-400" />

                  <span>Global Ready</span>

                </div>

                <span className="text-cyan-400 font-semibold">
                  ✓
                </span>

              </div>

              <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">

                <div className="flex items-center gap-3">

                  <ShieldCheck className="text-cyan-400" />

                  <span>Enterprise Security</span>

                </div>

                <span className="text-cyan-400 font-semibold">
                  ✓
                </span>

              </div>

              <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">

                <div className="flex items-center gap-3">

                  <Smartphone className="text-cyan-400" />

                  <span>Mobile First</span>

                </div>

                <span className="text-cyan-400 font-semibold">
                  ✓
                </span>

              </div>

              <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">

                <div className="flex items-center gap-3">

                  <Rocket className="text-cyan-400" />

                  <span>High Performance</span>

                </div>

                <span className="text-cyan-400 font-semibold">
                  ✓
                </span>

              </div>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-cyan-500/10 p-5 text-center">

                <h4 className="text-3xl font-bold text-cyan-400">
                  100%
                </h4>

                <p className="mt-2 text-sm text-slate-300">
                  Responsive
                </p>

              </div>

              <div className="rounded-xl bg-cyan-500/10 p-5 text-center">

                <h4 className="text-3xl font-bold text-cyan-400">
                  SEO
                </h4>

                <p className="mt-2 text-sm text-slate-300">
                  Optimized
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}