"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  MessageCircle,
  Map,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const [loading, setLoading] = useState(false);

const [status, setStatus] = useState("");
const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  
  console.log("FORM SUBMITTED");

  setLoading(true);
  setStatus("");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (result.success) {
      setStatus("success");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      setStatus("error");
    }
  } catch {
    setStatus("error");
  }

  setLoading(false);
};
  return (
    <section
      id="contact"
      className="scroll-mt-24 py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}

        <div className="text-center">

          <p className="uppercase tracking-[5px] text-blue-400 font-semibold text-sm">
            CONTACT US
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Let's Build Something
            <span className="text-blue-500"> Amazing Together</span>
          </h2>

          <p className="mt-6 text-gray-300 text-lg leading-8 max-w-3xl mx-auto">
            Ready to transform your business with AI, Software,
            Digital Solutions and Technology Consulting?
            We would love to hear from you.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-12 mt-20">

          {/* LEFT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            {/* Office */}

            <div className="flex gap-5 p-6 rounded-2xl bg-slate-900/70 border border-slate-700">

              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">

                <MapPin />

              </div>

              <div>

                <h3 className="font-bold text-xl">
                  Office
                </h3>

                <p className="text-gray-300 mt-2">
                  Virtual Operations
                  <br />
                  Kollam, Kerala, India
                </p>

              </div>

            </div>

            {/* Email */}

            <div className="flex gap-5 p-6 rounded-2xl bg-slate-900/70 border border-slate-700">

              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">

                <Mail />

              </div>

              <div>

                <h3 className="font-bold text-xl">
                  Email
                </h3>

                <a
                  href="mailto:anatech.operations@gmail.com"
                  className="text-gray-300 hover:text-blue-400 transition"
                >
                  anatech.operations@gmail.com
                </a>

              </div>

            </div>

            {/* Phone */}

            <div className="flex gap-5 p-6 rounded-2xl bg-slate-900/70 border border-slate-700">

              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">

                <Phone />

              </div>

              <div>

                <h3 className="font-bold text-xl">
                  Phone
                </h3>

                <a
                  href="tel:+918921520858"
                  className="text-gray-300 hover:text-blue-400 transition"
                >
                  +91 89215 20858
                </a>

              </div>

            </div>

            {/* Working Hours */}

            <div className="flex gap-5 p-6 rounded-2xl bg-slate-900/70 border border-slate-700">

              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">

                <Clock />

              </div>

              <div>

                <h3 className="font-bold text-xl">
                  Working Hours
                </h3>

                <p className="text-gray-300">
                  Monday – Saturday
                  <br />
                  9:00 AM – 6:00 PM
                </p>

              </div>

            </div>

            {/* Quick Actions */}

            <div className="flex flex-wrap gap-4 pt-3">

              <a
                href="https://wa.me/918921520858"
                target="_blank"
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>

              <a
                href="tel:+918921520858"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
              >
                <Phone size={20} />
                Call Now
              </a>

            </div>

            {/* Maps */}

            <div className="mt-8 rounded-2xl border border-dashed border-slate-600 p-6">

              <div className="flex items-center gap-3">

                <Map className="text-blue-400" />

                <h3 className="text-xl font-bold">
                  Google Maps
                </h3>

              </div>

              <p className="text-gray-400 mt-3">
                Office location will be updated soon.
              </p>

            </div>

            {/* Social */}

            <div className="mt-8 rounded-2xl border border-dashed border-slate-600 p-6">

              <h3 className="text-xl font-bold mb-5">
                Follow ANATECH
              </h3>

              <div className="flex flex-wrap gap-4">

              <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-blue-600 transition">
                 LinkedIn
              </button>

              <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-blue-600 transition">
                 Facebook
              </button>

              <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-blue-600 transition">
                 Instagram
              </button>

               <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-blue-600 transition">
                 YouTube
              </button>

            </div>

              <p className="text-gray-400 mt-4 text-sm">
                Official social media channels will be available soon.
              </p>

            </div>

          </motion.div>

          {/* RIGHT SIDE */}

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-slate-900/70 border border-slate-700 p-8 backdrop-blur-md shadow-xl"
          >

            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full mb-5 p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full mb-5 p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none"
            />

            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              className="w-full mb-5 p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none"
            />

            <textarea
              rows={6}
              placeholder="Your Message"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition rounded-xl py-4 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={20} />
              {loading ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && (
              <p className="mt-4 text-center text-green-400">
                ✅ Your message has been sent successfully.
              </p>
            )}

            {status === "error" && (
              <p className="mt-4 text-center text-red-400">
                ❌ Failed to send your message. Please try again.
              </p>
            )}

          </motion.form>

        </div>

      </div>
    </section>
  );
}