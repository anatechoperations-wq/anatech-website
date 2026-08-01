import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/common/Breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ServiceLayoutProps {
  breadcrumb: BreadcrumbItem[];
  children: ReactNode;
}

export default function ServiceLayout({
  breadcrumb,
  children,
}: ServiceLayoutProps) {
  return (
    <>
      <Navbar />

      <Breadcrumb items={breadcrumb} />

      <main className="min-h-screen bg-[#06112A] text-white">
        {children}
      </main>

      <Footer />
    </>
  );
}