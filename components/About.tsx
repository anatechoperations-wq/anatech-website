export default function About() {
  return (
  <section
  id="about"
  className="scroll-mt-24 py-24 bg-white"
>
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center">
          <p className="text-blue-600 font-semibold tracking-[4px] uppercase">
            About ANATECH
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mt-4">
            Building Technology That
            <span className="text-blue-600"> Creates Value</span>
          </h2>

          <p className="mt-8 max-w-4xl mx-auto text-gray-600 text-lg leading-8">
            ANATECH Technology Solutions is a technology-driven business
            focused on AI Solutions, Digital Transformation, Government
            e-Services, Import & Export Support, Business Consultancy,
            Software Development and Professional Training.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <div className="rounded-2xl shadow-lg p-8 border">
            <h3 className="text-2xl font-bold text-blue-600">
              Our Vision
            </h3>

            <p className="mt-5 text-gray-600 leading-7">
              To become a trusted global technology partner helping
              businesses, entrepreneurs and institutions achieve
              sustainable digital growth.
            </p>
          </div>

          <div className="rounded-2xl shadow-lg p-8 border">
            <h3 className="text-2xl font-bold text-blue-600">
              Our Mission
            </h3>

            <p className="mt-5 text-gray-600 leading-7">
              Deliver innovative, affordable and practical technology
              solutions that simplify business operations and create
              measurable value.
            </p>
          </div>

          <div className="rounded-2xl shadow-lg p-8 border">
            <h3 className="text-2xl font-bold text-blue-600">
              Core Values
            </h3>

            <ul className="mt-5 space-y-2 text-gray-600">
              <li>✔ Innovation</li>
              <li>✔ Integrity</li>
              <li>✔ Quality</li>
              <li>✔ Customer Success</li>
              <li>✔ Continuous Learning</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}