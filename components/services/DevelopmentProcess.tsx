import {
  ClipboardList,
  PenTool,
  Code2,
  Bug,
  Rocket,
  Headset,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Requirement Analysis",
    description: "Understand your business goals, target audience and project requirements.",
  },
  {
    icon: PenTool,
    title: "UI / UX Design",
    description: "Design modern, intuitive and responsive user interfaces.",
  },
  {
    icon: Code2,
    title: "Development",
    description: "Develop secure, scalable and high-performance web applications.",
  },
  {
    icon: Bug,
    title: "Testing & QA",
    description: "Perform comprehensive testing to ensure reliability and quality.",
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "Launch your website with optimized hosting and performance tuning.",
  },
  {
    icon: Headset,
    title: "Support & Maintenance",
    description: "Provide continuous updates, monitoring and technical support.",
  },
];

export default function DevelopmentProcess() {
  return (
    <section className="bg-[#08152F] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Our Development Process
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            Every project follows a structured development lifecycle to ensure
            quality, security and long-term success.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:border-cyan-400 hover:bg-white/10"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="mb-3 text-sm font-semibold text-cyan-400">
                  Step {index + 1}
                </div>

                <h3 className="text-xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}