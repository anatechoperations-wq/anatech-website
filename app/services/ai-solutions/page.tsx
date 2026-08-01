import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/common/Breadcrumb";
import AIHero from "@/components/services/AIHero";
import AIOverview from "@/components/services/AIOverview";

export const metadata: Metadata = {
  title: "AI Solutions | ANATECH Technology Solutions",
  description:
    "Enterprise Artificial Intelligence solutions including AI automation, chatbots, workflow optimization and business intelligence.",
  alternates: {
    canonical: "https://www.anatechsolutions.in/services/ai-solutions",
  },
};

export default function AISolutionsPage() {
  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/#services" },
          { label: "AI Solutions" },
        ]}
      />

      <main className="min-h-screen bg-[#06112A] text-white">
        <AIHero />
        <AIOverview />
      </main>

      <Footer />
    </>
  );
}