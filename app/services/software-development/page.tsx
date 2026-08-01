import type { Metadata } from "next";
import ServiceLayout from "@/components/layouts/ServiceLayout";
import SoftwareHero from "@/components/services/SoftwareHero";

export const metadata: Metadata = {
  title: "Software Development Services | ANATECH Technology Solutions",
  description:
    "Custom software development services including enterprise applications, ERP, CRM, cloud software and business automation solutions.",

  alternates: {
    canonical:
      "https://www.anatechsolutions.in/services/software-development",
  },
};

export default function SoftwareDevelopmentPage() {
  return (
    <ServiceLayout
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Software Development" },
      ]}
    >
      <SoftwareHero />
    </ServiceLayout>
  );
}