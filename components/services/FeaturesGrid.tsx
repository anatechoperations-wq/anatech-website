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

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:bg-white/10"
              >
                <div className="mb-6 inline-flex rounded-xl bg-cyan-500/10 p-4">
                  <Icon className="h-8 w-8 text-cyan-400" />
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}