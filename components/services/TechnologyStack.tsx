const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "REST API",
  "Cloud Deployment",
  "SEO",
  "AI Integration",
];

export default function TechnologyStack() {
  return (
    <section className="bg-[#06112A] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            Technology Stack
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Modern Technologies We Use
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            We build enterprise-grade solutions using modern,
            scalable and future-ready technologies that deliver
            performance, security and long-term maintainability.
          </p>

        </div>

        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">

          {technologies.map((tech) => (

            <div
              key={tech}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:bg-white/10"
            >

              <h3 className="text-lg font-semibold text-white">
                {tech}
              </h3>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}