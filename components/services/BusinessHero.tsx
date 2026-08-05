"use client";

export default function BusinessHero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#06112A]">
      <div className="text-center px-6">

        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300">
          Business Consultancy
        </span>

        <h1 className="mt-8 text-5xl font-extrabold text-white md:text-6xl lg:text-7xl">
          Business
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Consultancy
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
          Strategic consulting services that help businesses improve
          operations, accelerate growth and embrace digital transformation.
        </p>

      </div>
    </section>
  );
}