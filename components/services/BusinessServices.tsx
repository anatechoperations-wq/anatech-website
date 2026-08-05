import ServiceCard from "@/components/common/ServiceCard";
import {
  Briefcase,
  TrendingUp,
  Users,
  Landmark,
  Lightbulb,
  Target,
} from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Business Planning",
    description:
      "Comprehensive business planning and strategy development.",
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description:
      "Helping businesses scale with sustainable growth strategies.",
  },
  {
    icon: Users,
    title: "Management Consulting",
    description:
      "Improve organizational efficiency and leadership effectiveness.",
  },
  {
    icon: Landmark,
    title: "Government Projects",
    description:
      "Consultancy for government initiatives and institutional projects.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Advisory",
    description:
      "Technology-driven innovation for modern enterprises.",
  },
  {
    icon: Target,
    title: "Business Optimization",
    description:
      "Reduce costs and improve operational performance.",
  },
];

export default function BusinessServices() {
  return (
    <section className="bg-[#06112A] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Our Consultancy Services
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            Strategic consulting designed to help organizations achieve
            long-term business success.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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