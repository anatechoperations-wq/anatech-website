import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BusinessDivisionPage } from "@/components/services/BusinessDivisionPage";

export const metadata: Metadata = {
  title: "Import & Export Consultancy",
  description: "Import and export consultancy, documentation guidance and business support from ANATECH Technology Solutions in Kerala.",
  alternates: { canonical: "/services/import-export" },
};

export default function ImportExportPage() {
  return <><Navbar /><main><BusinessDivisionPage
    eyebrow="Import & Export"
    title="Move into trade with a clear process."
    description="We help businesses understand the documentation, registrations and planning steps needed before moving forward with import or export activities."
    highlights={["Preliminary documentation and registration guidance","Process planning for import and export requirements","Business consultation before execution"]}
    services={[
      { title: "Trade Readiness", description: "A practical review of your business requirement, product category and the steps to prepare before trade activity." },
      { title: "Documentation Guidance", description: "Guidance on common business documents and compliance inputs required for your specific workflow." },
      { title: "Business Consultation", description: "Clear, requirement-led consultation to help you decide the right next step before committing resources." },
    ]}
  /></main><Footer /></>;
}