"use client";

import { motion } from "framer-motion";
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-gray-300 border-t border-slate-800">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Company */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >

            <h2 className="text-3xl font-bold text-white">
              ANATECH
            </h2>

            <p className="text-blue-400 tracking-[4px] mt-2 text-sm">
              TECHNOLOGY SOLUTIONS
            </p>

            <p className="mt-6 leading-8 text-gray-400">
              Empowering businesses through Artificial Intelligence,
              Digital Transformation, Software Development,
              Government e-Services, Import & Export Consultancy
              and Smart Technology Solutions.
            </p>

            {/* Newsletter Placeholder */}

            <div className="mt-8">

              <h3 className="text-white font-semibold mb-3">
                Newsletter
              </h3>

              <div className="flex">

                <input
                  type="email"
                  placeholder="Coming Soon"
                  disabled
                  className="flex-1 rounded-l-xl bg-slate-900 border border-slate-700 px-4 py-3 text-gray-500"
                />

                <button
                  disabled
                  className="rounded-r-xl bg-blue-600 px-6 text-white opacity-70"
                >
                  Join
                </button>

              </div>

            </div>

          </motion.div>

          {/* Quick Links */}

          <div>

            <h3 className="text-white font-semibold text-xl mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li><a href="#home" className="hover:text-blue-400 transition">Home</a></li>

              <li><a href="#about" className="hover:text-blue-400 transition">About</a></li>

              <li><a href="#services" className="hover:text-blue-400 transition">Services</a></li>

              <li><a href="#industries" className="hover:text-blue-400 transition">Industries</a></li>

              <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-white font-semibold text-xl mb-5">
              Our Services
            </h3>

            <ul className="space-y-3">

              <li>AI Solutions</li>

              <li>Software Development</li>

              <li>Business Consultancy</li>

              <li>Digital Media</li>

              <li>Import & Export</li>

              <li>Government e-Services</li>

              <li>Training & Academy</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-white font-semibold text-xl mb-5">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <MapPin className="text-blue-400 mt-1" size={18} />

                <span>
                  Virtual Operations
                  <br />
                  Kollam, Kerala, India
                </span>

              </div>

              <div className="flex gap-3">

                <Mail className="text-blue-400 mt-1" size={18} />

                <a
                  href="mailto:anatech.operations@gmail.com"
                  className="hover:text-blue-400 transition"
                >
                  anatech.operations@gmail.com
                </a>

              </div>

              <div className="flex gap-3">

                <Phone className="text-blue-400 mt-1" size={18} />

                <a
                  href="tel:+918921520858"
                  className="hover:text-blue-400 transition"
                >
                  +91 89215 20858
                </a>

              </div>

            </div>

            {/* Future Social */}

            <div className="mt-8">

              <h4 className="text-white font-semibold mb-3">
                Social Media
              </h4>

              <div className="flex flex-wrap gap-2">

                <span className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm">
                  LinkedIn
                </span>

                <span className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm">
                  Facebook
                </span>

                <span className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm">
                  Instagram
                </span>

                <span className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm">
                  YouTube
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 mt-14 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">

          <p className="text-center lg:text-left text-gray-400">
            © {year} ANATECH Technology Solutions.
            All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">

            <a href="#" className="hover:text-blue-400 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-blue-400 transition">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-blue-400 transition">
              Support
            </a>

          </div>

        </div>

      </div>

      {/* Back To Top */}

      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl flex items-center justify-center text-white transition"
        aria-label="Back to top"
      >
        <ArrowUp size={22} />
      </button>

    </footer>
  );
}