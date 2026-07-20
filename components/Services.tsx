"use client";

import { motion } from "framer-motion";
import {
  MonitorSmartphone,
  BrainCircuit,
  Palette,
  Globe2,
  BriefcaseBusiness,
  Landmark,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    icon: MonitorSmartphone,
    title: "IT Services",
    description:
      "Complete IT solutions for businesses, organizations and institutions.",
    color: "from-blue-600 to-cyan-500",
    features: [
      "Website Development",
      "Custom Software",
      "Mobile Applications",
      "Network Solutions",
    ],
  },
  {
    icon: BrainCircuit,
    title: "AI Solutions",
    description:
      "Artificial Intelligence solutions that automate and accelerate business growth.",
    color: "from-cyan-600 to-sky-500",
    features: [
      "AI Chatbots",
      "Business Automation",
      "AI Integration",
      "AI Consulting",
    ],
  },
  {
    icon: Palette,
    title: "Digital Media",
    description:
      "Creative branding and digital marketing services for modern businesses.",
    color: "from-indigo-600 to-blue-600",
    features: [
      "Graphic Design",
      "Brand Identity",
      "Social Media",
      "Video Production",
    ],
  },
  {
    icon: Globe2,
    title: "Import & Export",
    description:
      "Professional support for international trade documentation and business expansion.",
    color: "from-blue-700 to-indigo-600",
    features: [
      "IEC Assistance",
      "Trade Documentation",
      "ICEGATE Support",
      "Export Guidance",
    ],
  },
  {
    icon: BriefcaseBusiness,
    title: "Business Consultancy",
    description:
      "Strategic consulting services to improve business performance and growth.",
    color: "from-sky-600 to-cyan-600",
    features: [
      "MSME Support",
      "Startup Guidance",
      "Business Planning",
      "Digital Transformation",
    ],
  },
  {
    icon: Landmark,
    title: "Government e-Services",
    description:
      "Professional assistance for various government digital services and portals.",
    color: "from-blue-600 to-slate-700",
    features: [
      "GST Assistance",
      "Digital Signature",
      "Online Applications",
      "Government Portals",
    ],
  },
  {
    icon: GraduationCap,
    title: "Training & Academy",
    description:
      "Professional technology training programs for students and businesses.",
    color: "from-cyan-600 to-blue-700",
    features: [
      "AI Training",
      "Software Training",
      "Digital Skills",
      "Corporate Workshops",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center"
        >

          <span className="inline-block px-5 py-2 rounded-full border border-blue-700 bg-blue-900/30 text-blue-300 text-sm tracking-[3px] uppercase font-semibold">
            Business Operations Divisions
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Enterprise Business &
            <span className="text-blue-500">
              {" "}Technology Solutions
            </span>
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-slate-400 text-lg leading-8">
            ANATECH Technology Solutions provides integrated business,
            technology and digital transformation services through
            specialized operational divisions designed to support
            startups, enterprises, institutions and government sectors.
          </p>

        </motion.div>

        {/* Services Grid */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

          {services.map((service, index) => {

            const Icon = service.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .5,
                  delay: index * .08,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="group rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl p-8 shadow-xl hover:border-blue-500 transition-all duration-300"
              >

                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="mt-5 text-slate-400 leading-7">
                  {service.description}
                </p>

                <div className="mt-6 space-y-3">

                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                                  </div>

                {/* Learn More Button */}

                <div className="mt-8">
                  <button className="inline-flex items-center gap-2 text-blue-400 font-semibold transition-all duration-300 group-hover:text-cyan-300">
                    Learn More

                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

              </motion.div>

            );

          })}

        </div>

        {/* Business Statement */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-24"
        >
          <div className="rounded-[32px] border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-10 md:p-14">

            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <div>

                <span className="text-blue-400 font-semibold uppercase tracking-[4px]">
                  Why ANATECH?
                </span>

                <h3 className="mt-5 text-4xl font-bold text-white leading-tight">
                  One Company.
                  <br />
                  Multiple Business Solutions.
                </h3>

                <p className="mt-6 text-slate-400 leading-8">
                  ANATECH Technology Solutions brings together
                  technology, artificial intelligence, creative
                  services, business consultancy, government
                  e-services, international trade support and
                  professional training under one trusted brand.
                </p>

              </div>

              <div className="grid grid-cols-2 gap-5">

                {[
                  "Enterprise Solutions",
                  "AI Powered",
                  "Business Focused",
                  "Customer Centric",
                  "Secure Technology",
                  "Professional Support",
                  "Scalable Services",
                  "Future Ready",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl bg-slate-800 border border-slate-700 p-5 text-center"
                  >
                    <CheckCircle2 className="mx-auto w-7 h-7 text-blue-400 mb-3" />

                    <p className="text-white font-medium">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </motion.div>
                {/* Premium CTA */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="rounded-[36px] overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-10 md:p-16 shadow-2xl">

            <div className="max-w-4xl mx-auto text-center">

              <span className="inline-block rounded-full bg-white/20 px-5 py-2 text-sm font-semibold tracking-[3px] uppercase text-white">
                Let's Work Together
              </span>

              <h3 className="mt-6 text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Transform Your Ideas into
                <br />
                Digital Success
              </h3>

              <p className="mt-8 text-lg leading-8 text-blue-100">
                Whether you need a modern business website,
                AI-powered software, digital branding,
                import & export assistance,
                government e-services,
                business consultancy,
                or professional training,
                ANATECH Technology Solutions is ready
                to become your trusted technology partner.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

                <a
                  href="#contact"
                  className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Get Free Consultation
                </a>

                <a
                  href="#contact"
                  className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-blue-700"
                >
                  Request a Proposal
                </a>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}