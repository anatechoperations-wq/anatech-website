import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BusinessDivisionPage } from "@/components/services/BusinessDivisionPage";

export const metadata: Metadata = {
  title: "Digital Media Services",
  description: "Digital media strategy, social media management, creative campaigns and brand communication by ANATECH Technology Solutions.",
  alternates: { canonical: "/services/digital-media" },
};

export default function DigitalMediaPage() {
  return <><Navbar /><main><BusinessDivisionPage
    eyebrow="Digital Media"
    title="Build a brand people remember."
    description="We plan and produce practical digital communication for businesses—focused on clear messaging, useful creative work and measurable next steps."
    highlights={["Social media strategy and monthly content plans","Creative campaign concepts and visual communication","Brand messaging for digital channels"]}
    services={[
      { title: "Social Media Management", description: "Content calendars, publishing support and audience-focused communication for your business channels." },
      { title: "Creative Campaigns", description: "Campaign ideas, design direction and digital assets tailored to a defined business objective." },
      { title: "Brand Communication", description: "Consistent messaging, presentation assets and digital touchpoints that make your brand easier to trust." },
    ]}
  /></main><Footer /></>;
}