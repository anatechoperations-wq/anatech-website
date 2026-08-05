const steps = [
  {
    number: "01",
    title: "Business Assessment",
    description:
      "We analyze your current business processes, challenges and growth opportunities.",
  },
  {
    number: "02",
    title: "Strategic Planning",
    description:
      "Develop a customized roadmap aligned with your business goals and industry requirements.",
  },
  {
    number: "03",
    title: "Implementation",
    description:
      "Execute practical solutions with measurable outcomes and continuous monitoring.",
  },
  {
    number: "04",
    title: "Growth & Optimization",
    description:
      "Continuously improve performance through innovation, analytics and strategic guidance.",
  },
];

export default function BusinessProcess() {
  return (
    <section className="bg-[#08152F] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            Our Process
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Our Consulting Process
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            We follow a structured methodology that delivers measurable
            business value and long-term success.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step) => (

            <div
              key={step.number}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-cyan-400 hover:bg-white/10"
            >

              <div className="text-4xl font-extrabold text-cyan-400">
                {step.number}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                {step.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}