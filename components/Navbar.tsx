"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const serviceLinks = [
  {
    name: "Web Development",
    href: "/services/web-development",
  },
  {
    name: "AI Solutions",
    href: "/services/ai-solutions",
  },
  {
    name: "Software Development",
    href: "/services/software-development",
  },
  {
    name: "Business Consultancy",
    href: "/services/business-consultancy",
  },
  //{
  //  name: "Business Consultancy",
  //  href: "/services/business-consultancy",
 // }, 
];

const navLinkClass =
  "relative text-gray-300 transition-all duration-300 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full";

export default function Navbar() {
  const { scrollY } = useScroll();

  const [small, setSmall] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [servicesOpen, setServicesOpen] =
    useState(false);

  useEffect(() => {
    return scrollY.on("change", (value) => {
      setSmall(value > 40);
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
      transition={{
        duration: 0.3,
      }}
      className="fixed inset-x-0 top-0 z-50 border-b border-blue-900/30 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Image
              src="/logo.png"
              alt="ANATECH Technology Solutions"
              width={52}
              height={52}
              priority
            />

            <div>

              <h1 className="text-xl font-bold text-white">

                ANATECH

              </h1>

              <p className="text-[10px] tracking-[4px] text-blue-400">

                TECHNOLOGY SOLUTIONS

              </p>

            </div>

          </Link>

        </motion.div>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="/#home"
            className={navLinkClass}
          >
            Home
          </a>

          {/* Services Dropdown */}

          <div
            className="relative"
            onMouseEnter={() =>
              setServicesOpen(true)
            }
            onMouseLeave={() =>
              setServicesOpen(false)
            }
          >

            <button
              className={`${navLinkClass} flex items-center gap-1`}
            >
              Services

              <motion.div
                animate={{
                  rotate: servicesOpen
                    ? 180
                    : 0,
                }}
              >
                <ChevronDown size={16} />
              </motion.div>

            </button>

            <AnimatePresence>

              {servicesOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute left-0 top-full mt-4 w-72 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/95 shadow-2xl backdrop-blur-xl"
                >
                  {serviceLinks.map(
                    (service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block border-b border-slate-800 px-6 py-4 text-gray-300 transition-all duration-300 hover:bg-slate-800 hover:text-cyan-400 last:border-none"
                      >
                        {service.name}
                      </Link>
                    )
                  )}
                </motion.div>
              )}

            </AnimatePresence>

          </div>
          <a
            href="/#industries"
            className={navLinkClass}
          >
            Industries
          </a>

          <a
            href="/#about"
            className={navLinkClass}
          >
            About
          </a>

          <a
            href="/#contact"
            className={navLinkClass}
          >
            Contact
          </a>

        </nav>

        {/* Desktop CTA */}

        <motion.a
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.96,
          }}
          href="/#contact"
          className="hidden rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 md:block"
        >
          Get Started
        </motion.a>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Navigation */}

      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{
              opacity: 0,
              y: -25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -25,
            }}
            transition={{
              duration: 0.25,
            }}
            className="border-t border-slate-700 bg-slate-900 md:hidden"
          >

            <a
              href="/#home"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 text-gray-300 transition hover:bg-slate-800 hover:text-white"
            >
              Home
            </a>

            <div className="border-t border-slate-800 px-6 py-3 font-semibold text-blue-400">
              Services
            </div>

            {serviceLinks.map((service) => (

              <Link
                key={service.name}
                href={service.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 pl-10 pr-6 text-gray-300 transition hover:bg-slate-800 hover:text-cyan-400"
              >
                {service.name}
              </Link>

            ))}

            <a
              href="/#industries"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 text-gray-300 transition hover:bg-slate-800 hover:text-white"
            >
              Industries
            </a>

            <a
              href="/#about"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 text-gray-300 transition hover:bg-slate-800 hover:text-white"
            >
              About
            </a>

            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 text-gray-300 transition hover:bg-slate-800 hover:text-white"
            >
              Contact
            </a>

            <div className="p-4">

              <motion.a
                whileTap={{
                  scale: 0.97,
                }}
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Get Started
              </motion.a>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.header>
  );
}