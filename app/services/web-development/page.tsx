import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceOverview from "@/components/services/ServiceOverview";
import FeaturesGrid from "@/components/services/FeaturesGrid";
import DevelopmentProcess from "@/components/services/DevelopmentProcess";

export const metadata: Metadata = {
  title: "Professional Web Development Services | ANATECH Technology Solutions",
  description:
    "ANATECH Technology Solutions provides enterprise-grade web development services including business websites, e-commerce, government portals, custom web applications, and SEO-optimized solutions.",

  keywords: [
    "Web Development",
    "Website Development",
    "Next.js Development",
    "React Development",
    "Business Website",
    "Corporate Website",
    "Kerala Web Development",
    "India Web Development",
    "ANATECH",
  ],

  alternates: {
    canonical:
      "https://www.anatechsolutions.in/services/web-development",
  },

  openGraph: {
    title: "Professional Web Development Services",
    description:
      "Enterprise-grade web development solutions for businesses.",
    url: "https://www.anatechsolutions.in/services/web-development",
    siteName: "ANATECH Technology Solutions",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Professional Web Development Services",
    description:
      "Enterprise-grade websites and web applications.",
  },
};

export default function WebDevelopmentPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#06112A] text-white">
        <ServiceHero />
        <ServiceOverview />
        <FeaturesGrid />
        <DevelopmentProcess />
      </main>

      <Footer />
    </>
  );
}