import ServiceCard from "@/components/common/ServiceCard";
import {
  Zap,
  ShieldCheck,
  Smartphone,
  Search,
  Cloud,
  BrainCircuit,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "High-performance websites optimized for speed and excellent user experience.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Secure architecture with modern security practices and data protection.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Perfect viewing experience across desktops, tablets and mobile devices.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description:
      "Built with technical SEO best practices to improve search visibility.",
  },
  {
    icon: Cloud,
    title: "Cloud Ready",
    description:
      "Deployment-ready applications with scalable cloud infrastructure support.",
  },
  {
    icon: BrainCircuit,
    title: "AI Ready",
    description:
      "Designed to integrate AI-powered features as your business grows.",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="bg-[#06112A] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Why Choose ANATECH?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            We build enterprise-grade websites that combine performance,
            security, scalability and outstanding user experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <ServiceCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}