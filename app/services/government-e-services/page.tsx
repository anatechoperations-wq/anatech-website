import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BusinessDivisionPage } from "@/components/services/BusinessDivisionPage";

export const metadata: Metadata = {
  title: "Government e-Services",
  description: "Government e-service guidance, business registration support and digital documentation assistance by ANATECH Technology Solutions.",
  alternates: { canonical: "/services/government-e-services" },
};

export default function GovernmentEServicesPage() {
  return <><Navbar /><main><BusinessDivisionPage
    eyebrow="Government e-Services"
    title="Make business formalities easier to manage."
    description="We support businesses with process guidance and digital documentation preparation for relevant registrations and online service workflows."
    highlights={["Business registration and application workflow guidance","Digital document preparation support","Clear, step-by-step process communication"]}
    services={[
      { title: "Registration Support", description: "Assistance in organising the information and documents needed for relevant business registration processes." },
      { title: "Digital Applications", description: "Guidance for online applications and document submission workflows based on your requirement." },
      { title: "Compliance Records", description: "Structured help to keep business details and supporting documents ready for future use." },
    ]}
  /></main><Footer /></>;
}