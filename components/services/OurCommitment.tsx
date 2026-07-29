import { CheckCircle2 } from "lucide-react";

const commitments = [
  "Transparent communication throughout the project",
  "Modern, secure and scalable development practices",
  "SEO-friendly architecture from day one",
  "Responsive design for all screen sizes",
  "Clean, maintainable and documented code",
  "Reliable post-launch support and maintenance",
];

export default function OurCommitment() {
  return (
    <section className="bg-[#08152F] py-24">
      <div className="mx-auto max-w-6xl px-6">

        <div className="text-center">
          <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
            Our Commitment
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            What You Can Expect From ANATECH
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            As a growing technology company, our focus is on delivering
            quality solutions, building long-term relationships and
            maintaining professional standards in every project.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {commitments.map((item) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <CheckCircle2 className="mt-1 h-6 w-6 text-cyan-400" />

              <p className="text-slate-300">
                {item}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}