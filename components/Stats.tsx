"use client";

import { motion } from "framer-motion";

const stats = [
  {
    number: "250+",
    title: "Projects",
  },
  {
    number: "120+",
    title: "Clients",
  },
  {
    number: "15+",
    title: "Industries",
  },
  {
    number: "24/7",
    title: "Support",
  },
];

export default function Stats() {
  return (
    <section className="bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-900 rounded-2xl p-10 text-center border border-blue-900 hover:border-cyan-400 duration-300"
            >
              <h2 className="text-5xl font-bold text-blue-400">
                {item.number}
              </h2>

              <p className="mt-4 text-gray-300 text-lg">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}