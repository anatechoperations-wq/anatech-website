"use client";

import { motion } from "framer-motion";

const stats = [
  {
    icon: "🤖",
    title: "AI Solutions",
    description: "Intelligent automation and AI-powered applications",
  },
  {
    icon: "🌐",
    title: "Web Development",
    description: "Modern, responsive and SEO-friendly websites",
  },
  {
    icon: "💻",
    title: "Custom Software",
    description: "Business software tailored to your requirements",
  },
  {
    icon: "☁️",
    title: "Cloud & Support",
    description: "Secure deployment and continuous technical support",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-950 py-24">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <p className="text-blue-400 font-semibold uppercase tracking-[4px]">
        OUR EXPERTISE
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
        Technology That Drives Business Growth
      </h2>

      <p className="text-gray-400 mt-6 max-w-3xl mx-auto">
        We deliver innovative digital solutions that help businesses
        become faster, smarter and more efficient.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {stats.map((item, index) => (

        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          whileHover={{
            y: -8,
            scale: 1.03
          }}
          className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-lg p-8 text-center shadow-lg hover:border-blue-500 transition-all duration-300"
        >

          <div className="text-5xl mb-5">
            {item.icon}
          </div>

          <h3 className="text-2xl font-bold text-white">
            {item.title}
          </h3>

          <p className="text-gray-400 mt-4 leading-7">
            {item.description}
          </p>

        </motion.div>

      ))}

    </div>

  </div>
</section>
  );
}