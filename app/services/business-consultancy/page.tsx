import type { Metadata } from "next";

import ServiceLayout from "@/components/layouts/ServiceLayout";

import BusinessHero from "@/components/services/BusinessHero";

import BusinessOverview from "@/components/services/BusinessOverview";

import BusinessServices from "@/components/services/BusinessServices";

export const metadata: Metadata = {
  title:
    "Business Consultancy Services | ANATECH Technology Solutions",

  description:
    "Professional business consultancy services for startups, MSMEs, enterprises and organizations.",

  alternates: {
    canonical:
      "https://www.anatechsolutions.in/services/business-consultancy",
  },
};

export default function BusinessConsultancyPage() {
  return (
    <ServiceLayout
      breadcrumb={[
        {
          label: "Home",
          href: "/",
        },
        {
          label: "Services",
          href: "/#services",
        },
        {
          label: "Business Consultancy",
        },
      ]}
    >
      <BusinessHero />
      <BusinessOverview />
      <BusinessServices />
    </ServiceLayout>
  );
}