"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Bot,
  Palette,
  Globe,
  Briefcase,
  Landmark,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "IT Services",
      icon: Monitor,
      description:
        "Web Development, Software Solutions, Cloud Services & Technical Support",
    },
    {
      title: "AI Solutions",
      icon: Bot,
      description:
        "AI Chatbots, Automation, Prompt Engineering & Business Intelligence",
    },
    {
      title: "Digital Media",
      icon: Palette,
      description:
        "Graphic Design, Branding, Social Media, Video Editing & Marketing",
    },
    {
      title: "Import & Export",
      icon: Globe,
      description:
        "IEC Support, Export Documentation & International Trade Assistance",
    },
    {
      title: "Business Consultancy",
      icon: Briefcase,
      description:
        "Startup Guidance, DPR, MSME Support & Strategic Business Planning",
    },
    {
      title: "Government e-Services",
      icon: Landmark,
      description:
        "GeM, e-Tender, Digital Documentation & Government Portal Support",
    },
    {
      title: "Training & Academy",
      icon: GraduationCap,
      description:
        "AI Training, Computer Courses, Export Training & Skill Development",
    },
  ];

  return (
    <section
      id="services"
      className="scroll-mt-24 py-24 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-blue-600 font-semibold text-sm">
            OUR SERVICES
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">
            Comprehensive Business &
            <span className="text-blue-600">
              {" "}Technology Solutions
            </span>
          </h2>

          <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-lg leading-8">
            We deliver innovative technology, AI and business solutions
            designed to accelerate digital transformation and sustainable growth.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {services.map((service, index) => {

            const Icon = service.icon;

            return (

              <motion.div
                key={service.title}
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
                className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md p-8 shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition">

                  <Icon
                    size={32}
                    className="text-blue-600 group-hover:text-white transition"
                  />

                </div>

                <h3 className="text-2xl font-bold text-slate-900 mt-6">
                  {service.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                  {service.description}
                </p>

                <button className="mt-8 inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight size={18} />
                </button>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}