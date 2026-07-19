"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Building2,
  GraduationCap,
  HeartPulse,
  ShoppingCart,
  Globe,
  Factory,
  Briefcase,
} from "lucide-react";

export default function Industries() {
  const industries = [
    {
      title: "MSME & Startups",
      icon: Rocket,
      description:
        "Technology, AI and business solutions for startups and MSMEs.",
    },
    {
      title: "Government Departments",
      icon: Building2,
      description:
        "Digital services, documentation, GeM, e-Tender and portal support.",
    },
    {
      title: "Educational Institutions",
      icon: GraduationCap,
      description:
        "Training, software solutions, AI learning and digital transformation.",
    },
    {
      title: "Healthcare",
      icon: HeartPulse,
      description:
        "Hospital management support, digital records and automation.",
    },
    {
      title: "Retail & Trading",
      icon: ShoppingCart,
      description:
        "Billing, inventory, POS systems and business automation.",
    },
    {
      title: "Import & Export",
      icon: Globe,
      description:
        "IEC guidance, export documentation and international trade support.",
    },
    {
      title: "Manufacturing",
      icon: Factory,
      description:
        "Digital production management and workflow automation.",
    },
    {
      title: "Professional Services",
      icon: Briefcase,
      description:
        "Technology solutions for consultants, agencies and enterprises.",
    },
  ];

  return (
    <section
      id="industries"
      className="scroll-mt-24 py-24 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-blue-600 font-semibold text-sm">
            INDUSTRIES WE SERVE
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">
            Technology Solutions for
            <span className="text-blue-600">
              {" "}Every Industry
            </span>
          </h2>

          <p className="mt-6 text-gray-600 text-lg leading-8 max-w-3xl mx-auto">
            ANATECH delivers practical technology and business
            solutions across multiple industries with innovation,
            reliability and customer-focused service.
          </p>

        </div>

        {/* Industry Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {industries.map((industry, index) => {

            const Icon = industry.icon;

            return (

              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md p-7 shadow-lg hover:border-blue-400 hover:shadow-2xl transition-all duration-300"
              >

                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition">

                  <Icon
                    size={28}
                    className="text-blue-600 group-hover:text-white transition"
                  />

                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-5">
                  {industry.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {industry.description}
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
          className="mt-20 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-10 text-center text-white shadow-xl"
        >
          <h3 className="text-3xl font-bold">
            Empowering Every Industry Through Innovation
          </h3>

          <p className="mt-4 text-blue-100 max-w-3xl mx-auto leading-8">
            From startups and government departments to healthcare,
            manufacturing and global trade, ANATECH delivers scalable,
            secure and future-ready technology solutions tailored to
            your industry's needs.
          </p>
        </motion.div>

      </div>
    </section>
  );
}