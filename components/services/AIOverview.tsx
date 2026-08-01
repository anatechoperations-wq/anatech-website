import { BrainCircuit, Bot, Cpu, Workflow } from "lucide-react";
import SectionHeader from "@/components/common/SectionHeader";
import ServiceCard from "@/components/common/ServiceCard";

const services = [
  {
    icon: BrainCircuit,
    title: "AI Strategy",
    description:
      "Develop AI roadmaps aligned with your business objectives and digital transformation goals.",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    description:
      "Intelligent customer support chatbots for websites, WhatsApp and business platforms.",
  },
  {
    icon: Cpu,
    title: "Machine Learning",
    description:
      "Predictive analytics and intelligent decision support using machine learning models.",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    description:
      "Automate repetitive business processes using AI-powered workflows and integrations.",
  },
];

export default function AIOverview() {
  return (
    <section className="bg-[#08152F] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          badge="AI Services"
          title="Enterprise AI Solutions"
          description="We help organizations adopt Artificial Intelligence to improve efficiency, reduce operational costs and deliver better customer experiences."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}