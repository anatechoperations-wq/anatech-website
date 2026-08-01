import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400 hover:bg-white/10">

      <div className="mb-6 inline-flex rounded-xl bg-cyan-500/10 p-4 transition-colors duration-300 group-hover:bg-cyan-500/20">
        <Icon className="h-8 w-8 text-cyan-400" />
      </div>

      <h3 className="text-2xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-300">
        {description}
      </p>

    </div>
  );
}