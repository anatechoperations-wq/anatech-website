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
  { name: "Web Development", href: "/services/web-development" },
  { name: "AI Solutions", href: "/services/ai-solutions" },
  { name: "Software Development", href: "/services/software-development" },
  { name: "Digital Media", href: "/services/digital-media" },
  { name: "Import & Export", href: "/services/import-export" },
  { name: "Business Consultancy", href: "/services/business-consultancy" },
  { name: "Government e-Services", href: "/services/government-e-services" },
  { name: "Training & Academy", href: "/services/training-academy" },
];

const navLinkClass =
  "relative text-slate-600 transition-all duration-300 hover:text-blue-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full";

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

  useEffect(() => {
    document.body.dataset.mobileNavOpen = isOpen ? "true" : "false";
    return () => {
      delete document.body.dataset.mobileNavOpen;
    };
  }, [isOpen]);

  return (
    <motion.header
      animate={{
        height: small ? 72 : 90,

        backgroundColor: small
          ? "rgba(255,255,255,.97)"
          : "rgba(255,255,255,.96)",

        boxShadow: small
          ? "0 4px 20px rgba(15,23,42,0.08)"
          : "0 0 0 rgba(15,23,42,0)",
      }}
      transition={{
        duration: 0.3,
      }}
      className="fixed inset-x-0 top-0 z-[10000] border-b border-slate-200 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

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
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <Image
              src="/logo.png"
              alt="ANATECH Technology Solutions"
              width={48}
              height={48}
              priority
            />

            <div>

              <p className="text-lg font-bold text-slate-900 sm:text-xl">

                ANATECH

              </p>

              <p className="text-[8px] tracking-[3px] text-blue-600 sm:text-[10px] sm:tracking-[4px]">

                TECHNOLOGY SOLUTIONS

              </p>

            </div>

          </Link>

        </motion.div>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 xl:flex">

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
                  className="absolute left-0 top-full mt-4 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
                >
                  {serviceLinks.map(
                    (service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block border-b border-slate-100 px-6 py-4 text-slate-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 last:border-none"
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

          <Link href="/ml" lang="ml" className={navLinkClass}>
            മലയാളം
          </Link>

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
          className="hidden rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 xl:block"
        >
          Get Started
        </motion.a>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-3 shrink-0 rounded-lg p-2 text-slate-800 transition hover:bg-slate-100 xl:hidden"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
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
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-slate-200 bg-white shadow-2xl xl:hidden"
          >

            <a
              href="/#home"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
            >
              Home
            </a>

            <Link
              href="/ml"
              lang="ml"
              onClick={() => setIsOpen(false)}
              className="mx-4 my-3 flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 font-bold text-blue-800 transition hover:bg-blue-100"
            >
              <span>മലയാളത്തിൽ കാണുക</span>
              <span aria-hidden="true">മലയാളം →</span>
            </Link>

            <div className="border-t border-slate-100 px-6 py-3 font-semibold text-blue-600">
              Services
            </div>

            {serviceLinks.map((service) => (

              <Link
                key={service.name}
                href={service.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 pl-10 pr-6 text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
              >
                {service.name}
              </Link>

            ))}

            <a
              href="/#industries"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
            >
              Industries
            </a>

            <a
              href="/#about"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
            >
              About
            </a>

            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
            >
              Contact
            </a>

            <Link
              href="/ml"
              lang="ml"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              മലയാളം
            </Link>

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

