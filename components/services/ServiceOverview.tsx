export default function ServiceOverview() {
  const services = [
    {
      title: "Corporate Websites",
      description:
        "Professional websites designed to strengthen your brand and digital presence.",
    },
    {
      title: "Business Portals",
      description:
        "Custom portals that streamline business operations and improve productivity.",
    },
    {
      title: "E-Commerce Solutions",
      description:
        "Scalable online stores with secure payment integration and modern shopping experiences.",
    },
    {
      title: "Government & Institutional Websites",
      description:
        "Reliable, secure and accessible websites for public sector organizations.",
    },
  ];

  return (
    <section className="bg-[#08152F] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="max-w-3xl">

          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            Web Development Services
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Enterprise Web Solutions Built For Growth
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            We build secure, scalable and high-performance websites using
            modern technologies. Every project is designed with business
            growth, SEO, security and user experience as the primary focus.
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