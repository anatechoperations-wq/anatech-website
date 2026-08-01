import Link from "next/link";
import {
  BrainCircuit,
  Code2,
  Briefcase,
  Globe,
} from "lucide-react";

const services = [
  {
    title: "AI Solutions",
    description: "Artificial Intelligence solutions for modern businesses.",
    href: "/services/ai-solutions",
    icon: BrainCircuit,
  },
  {
    title: "Software Development",
    description: "Custom software tailored to your business requirements.",
    href: "/services/software-development",
    icon: Code2,
  },
  {
    title: "Business Consultancy",
    description: "Technology consulting and digital transformation services.",
    href: "/services/business-consultancy",
    icon: Briefcase,
  },
  {
    title: "Digital Services",
    description: "Professional digital services for business growth.",
    href: "/services/digital-services",
    icon: Globe,
  },
];

export default function RelatedServices() {
  return (
    <section className="bg-[#06112A] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Related Services
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            Explore other professional technology services offered by
            ANATECH Technology Solutions.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:bg-white/10"
              >
                <Icon className="mb-6 h-8 w-8 text-cyan-400" />

                <h3 className="text-xl font-bold text-white">
                  {service.title}
                </h3>

                <p className="mt-4 text-slate-300">
                  {service.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}