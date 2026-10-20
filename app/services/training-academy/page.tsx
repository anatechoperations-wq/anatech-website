import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BusinessDivisionPage } from "@/components/services/BusinessDivisionPage";

export const metadata: Metadata = {
  title: "Training & Academy",
  description: "Practical technology and business skills training programmes from ANATECH Technology Solutions.",
  alternates: { canonical: "/services/training-academy" },
};

export default function TrainingAcademyPage() {
  return <><Navbar /><main><BusinessDivisionPage
    eyebrow="Training & Academy"
    title="Practical skills for modern work."
    description="We create learning programmes that connect technology concepts with practical business and workplace use."
    highlights={["Technology and digital-workflow learning","Business-oriented practical sessions","Training plans tailored to the audience"]}
    services={[
      { title: "Technology Training", description: "Foundational and practical sessions on relevant digital tools, workflows and technology concepts." },
      { title: "Business Skills Sessions", description: "Learning support designed around day-to-day business operations and customer-facing work." },
      { title: "Custom Programmes", description: "Training structure tailored to your organisation, learners and defined outcomes." },
    ]}
  /></main><Footer /></>;
}