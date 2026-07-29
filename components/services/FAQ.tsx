"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to develop a website?",
    answer:
      "The timeline depends on the project scope. A business website typically takes 2–4 weeks, while larger custom projects may require more time.",
  },
  {
    question: "Will my website be mobile responsive?",
    answer:
      "Yes. Every website we build is fully responsive and optimized for desktops, tablets and smartphones.",
  },
  {
    question: "Do you provide SEO optimization?",
    answer:
      "Yes. We follow technical SEO best practices including clean code, metadata, sitemap, robots.txt and performance optimization.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Absolutely. We can modernize your existing website while preserving your brand identity and improving performance.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. We offer maintenance, updates, security monitoring and technical support after deployment.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#08152F] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 text-lg text-slate-300">
            Find answers to common questions about our web development services.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-white/10 bg-white/5"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-slate-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}