"use client";

import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Industries", href: "#industries" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();

  const [small, setSmall] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => {
      setSmall(v > 40);
    });
  }, [scrollY]);

  return (
    <motion.header
      animate={{
        height: small ? 72 : 90,
        backgroundColor: small
          ? "rgba(2,6,23,.95)"
          : "rgba(2,6,23,.80)",
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-blue-900/30"
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="ANATECH"
            width={52}
            height={52}
          />

          <div>
            <h1 className="font-bold text-white text-xl">
              ANATECH
            </h1>

            <p className="text-blue-400 tracking-[4px] text-[10px]">
              TECHNOLOGY SOLUTIONS
            </p>
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-gray-300 hover:text-white transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Button */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#contact"
          className="hidden md:block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition"
        >
          Get Started
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-900 border-t border-slate-700 shadow-xl"
          >
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-4 text-gray-300 hover:text-white hover:bg-slate-800 transition"
              >
                {item.name}
              </a>
            ))}

            <div className="p-4">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-blue-600 hover:bg-blue-700 rounded-lg py-3 text-white font-semibold transition"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}