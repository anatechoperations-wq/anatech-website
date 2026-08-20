import {
  Globe,
  Bot,
  MonitorSmartphone,
  Building2,
  Cloud,
  ShieldCheck,
} from "lucide-react";

const solutions = [
  {
    icon: Globe,
    title: "Business Websites",
    description:
      "Modern corporate websites designed for speed, credibility and business growth.",
  },
  {
    icon: Bot,
    title: "AI Solutions",
    description:
      "AI chatbots, workflow automation and intelligent business assistants.",
  },
  {
    icon: MonitorSmartphone,
    title: "Custom Software",
    description:
      "ERP, CRM, HRMS and business management applications tailored to your needs.",
  },
  {
    icon: Building2,
    title: "Government Solutions",
    description:
      "Digital transformation solutions for public sector and e-Governance projects.",
  },
  {
    icon: Cloud,
    title: "Cloud Applications",
    description:
      "Scalable cloud-native applications with secure deployment architecture.",
  },
  {
    icon: ShieldCheck,
    title: "Technology Consulting",
    description:
      "Strategic consulting to help businesses adopt modern digital technologies.",
  },
];
export default function SolutionsGrid() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-[5px] text-cyan-400">
            SOLUTIONS WE BUILD
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Digital Solutions That
            <span className="text-cyan-400"> Drive Business Growth</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            We design and develop secure, scalable and future-ready digital
            solutions that help organizations improve efficiency, automate
            processes and accelerate growth.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {solutions.map((solution) => {

            const Icon = solution.icon;

            return (
              <div
                key={solution.title}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10"
              >

                <div className="mb-6 inline-flex rounded-2xl bg-cyan-500/10 p-4">

                  <Icon className="h-8 w-8 text-cyan-400" />

                </div>

                <h3 className="text-2xl font-semibold text-white">

                  {solution.title}

                </h3>

                <p className="mt-4 leading-7 text-slate-300">

                  {solution.description}

                </p>

              </div>
            );

          })}

        </div>

      </div>
    </section>
  );
}