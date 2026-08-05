export default function BusinessOverview() {
  const services = [
    {
      title: "Business Strategy",
      description:
        "Strategic planning and business growth consulting for startups, MSMEs and enterprises.",
    },
    {
      title: "Digital Transformation",
      description:
        "Helping organizations modernize operations through technology and digital solutions.",
    },
    {
      title: "Process Improvement",
      description:
        "Improve productivity, reduce costs and streamline business workflows.",
    },
    {
      title: "Technology Advisory",
      description:
        "Expert guidance on selecting the right technologies for sustainable business growth.",
    },
  ];

  return (
    <section className="bg-[#08152F] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="max-w-3xl">
          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            Business Consultancy
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Business Growth Through Smart Consulting
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            ANATECH provides professional consultancy services that help
            organizations improve efficiency, embrace innovation and achieve
            sustainable growth.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:border-cyan-400 hover:bg-white/10"
            >
              <h3 className="text-2xl font-semibold text-white">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}