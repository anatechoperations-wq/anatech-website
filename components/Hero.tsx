"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden min-h-screen pt-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-44 -right-40 w-[520px] h-[520px] rounded-full bg-blue-500/20 blur-3xl" />

        <div className="absolute -bottom-44 -left-40 w-[480px] h-[480px] rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-blue-600/10 blur-3xl" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}

        <div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .2 }}
            className="uppercase tracking-[6px] text-blue-400 font-semibold mb-5 text-sm"
          >
            AI • DIGITAL • BUSINESS • GLOBAL
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: .3, duration: .8 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight"
          >
            Innovate.
            <br />
            Transform.
            <br />
            <span className="text-blue-500">
              Grow.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .5 }}
            className="mt-8 text-lg md:text-xl text-gray-300 leading-8 max-w-xl"
          >
            ANATECH Technology Solutions empowers businesses,
            startups, institutions and government organizations
            through AI, Digital Transformation, Business Consulting,
            Software Development and Smart Technology Solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .8 }}
            className="mt-10 flex flex-wrap gap-5"
          >

            <a
              href="#services"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition duration-300 font-semibold shadow-lg shadow-blue-500/30"
            >
              Explore Services
            </a>

            <a
              href="#contact"
              className="px-8 py-4 rounded-xl border border-blue-500 hover:bg-blue-900/40 transition duration-300"
            >
              Contact Us
            </a>

          </motion.div>

        </div>

        {/* RIGHT CONTENT */}

        <motion.div
          animate={{
            y: [0, -12, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex justify-center"
        >

          <div className="w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 flex items-center justify-center shadow-[0_0_70px_rgba(59,130,246,0.45)]">

            <div className="w-[260px] h-[260px] md:w-[360px] md:h-[360px] rounded-full bg-slate-900 flex items-center justify-center">

              <Image
                src="/logo.png"
                alt="ANATECH Logo"
                width={300}
                height={300}
                className="object-contain"
              />

            </div>

          </div>

        </motion.div>

      </div>

      {/* Scroll Indicator */}

      <motion.div
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-blue-400"
      >

        <p className="text-xs tracking-[4px]">
          SCROLL
        </p>

        <div className="text-center text-2xl mt-2">
          ↓
        </div>

      </motion.div>

    </motion.section>
  );
}