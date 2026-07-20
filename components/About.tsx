"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  ShieldCheck,
  Lightbulb,
  Users,
  Award,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-blue-500" />,
    title: "Integrity",
    description:
      "We build long-term relationships through honesty, transparency and ethical business practices.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-cyan-500" />,
    title: "Innovation",
    description:
      "We continuously adopt modern technologies to create smarter digital solutions.",
  },
  {
    icon: <Users className="w-7 h-7 text-indigo-500" />,
    title: "Customer Success",
    description:
      "Our success is measured by the success and growth of our clients.",
  },
  {
    icon: <Award className="w-7 h-7 text-sky-500" />,
    title: "Quality",
    description:
      "Every solution is designed with performance, reliability and scalability in mind.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-slate-50 py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold tracking-widest uppercase">
            About ANATECH
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Building Technology That
            <span className="text-blue-600"> Creates Real Business Value</span>
          </h2>

          <p className="mt-8 max-w-4xl mx-auto text-lg leading-8 text-slate-600">
            ANATECH Technology Solutions is a modern technology company
            delivering AI-powered software, business automation, web
            development, digital transformation, cloud solutions and
            professional IT services for businesses, startups and
            government organizations.
          </p>
        </motion.div>

        {/* Mission & Vision */}

        <div className="grid lg:grid-cols-2 gap-8 mt-20">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="rounded-3xl bg-white p-10 shadow-xl border border-slate-200 hover:-translate-y-2 transition duration-300"
          >

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
              <Target className="text-blue-600 w-8 h-8" />
            </div>

            <h3 className="text-3xl font-bold text-slate-900">
              Our Mission
            </h3>

            <p className="mt-6 text-slate-600 leading-8">
              To deliver innovative, secure and affordable technology
              solutions that simplify business operations, improve
              productivity and create measurable value for our clients.
            </p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="rounded-3xl bg-white p-10 shadow-xl border border-slate-200 hover:-translate-y-2 transition duration-300"
          >

            <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center mb-6">
              <Eye className="text-cyan-600 w-8 h-8" />
            </div>

            <h3 className="text-3xl font-bold text-slate-900">
              Our Vision
            </h3>

            <p className="mt-6 text-slate-600 leading-8">
              To become a trusted technology partner recognised for
              innovation, reliability and digital excellence, helping
              businesses thrive in an increasingly connected world.
            </p>

          </motion.div>

        </div>

        {/* Core Values */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .2 }}
          className="mt-24"
        >

          <div className="text-center mb-14">

            <h3 className="text-4xl font-bold text-slate-900">
              Our Core Values
            </h3>

            <p className="mt-5 text-slate-600 max-w-3xl mx-auto">
              Every project we deliver is guided by our commitment to
              innovation, quality, transparency and customer success.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {values.map((item, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * .15 }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                className="rounded-3xl bg-white border border-slate-200 shadow-lg p-8 transition-all"
              >

                <div className="mb-6">
                  {item.icon}
                </div>

                <h4 className="text-xl font-bold text-slate-900">
                  {item.title}
                </h4>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>

              </motion.div>

            ))}

          </div>

        </motion.div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 rounded-[32px] bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-12 text-center text-white shadow-2xl"
        >

          <h3 className="text-4xl font-bold">
            Let's Build the Future Together
          </h3>

          <p className="mt-6 max-w-3xl mx-auto text-blue-100 leading-8">
            Whether you need a professional website, AI-powered software,
            business automation or digital transformation services,
            ANATECH Technology Solutions is ready to help your
            organization move forward with confidence.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 mt-10 bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:scale-105 transition duration-300"
          >
            Contact Our Team
            <ArrowRight className="w-5 h-5" />
          </a>

        </motion.div>

      </div>
    </section>
  );
}