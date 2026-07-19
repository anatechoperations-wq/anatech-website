"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Bot,
  TrendingUp,
  Landmark,
  ShieldCheck,
  Star,
} from "lucide-react";

export default function WhyChoose() {
  const features = [
    {
      title: "Innovation First",
      icon: Rocket,
      description:
        "Modern technology solutions designed for tomorrow's businesses.",
    },
    {
      title: "AI Powered",
      icon: Bot,
      description:
        "Artificial Intelligence integrated into practical business solutions.",
    },
    {
      title: "Business Focused",
      icon: TrendingUp,
      description:
        "Every solution is designed to improve productivity and profitability.",
    },
    {
      title: "Government Expertise",
      icon: Landmark,
      description:
        "Professional support for Government e-Services and compliance.",
    },
    {
      title: "Trusted Support",
      icon: ShieldCheck,
      description:
        "Reliable technical assistance with long-term customer relationships.",
    },
    {
      title: "Customer Success",
      icon: Star,
      description:
        "Your business growth is the center of everything we build.",
    },
  ];

  return (
    <section
      id="why-choose"
      className="scroll-mt-24 py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-blue-400 font-semibold text-sm">
            WHY CHOOSE ANATECH
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Your Trusted Technology
            <span className="text-blue-500"> Partner</span>
          </h2>

          <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg leading-8">
            We combine innovation, technology and business expertise
            to deliver practical, scalable and future-ready solutions
            that help organizations succeed in a rapidly evolving digital world.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group rounded-2xl border border-slate-700 bg-slate-900/60 backdrop-blur-md p-8 shadow-lg hover:border-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-all duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-blue-900/40 flex items-center justify-center group-hover:bg-blue-600 transition">

                  <Icon
                    size={32}
                    className="text-blue-400 group-hover:text-white transition"
                  />

                </div>

                <h3 className="text-2xl font-bold mt-6">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-300 leading-7">
                  {item.description}
                </p>

              </motion.div>

            );

          })}

        </div>

        {/* Bottom Banner */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-10 text-center shadow-2xl"
        >
          <h3 className="text-3xl font-bold">
            Technology That Builds Trust & Delivers Results
          </h3>

          <p className="mt-5 max-w-3xl mx-auto text-blue-100 leading-8">
            At ANATECH, we don't just deliver technology—we build
            long-term partnerships through innovation, transparency,
            security and customer-focused solutions that help businesses
            grow with confidence.
          </p>
        </motion.div>

      </div>
    </section>
  );
}