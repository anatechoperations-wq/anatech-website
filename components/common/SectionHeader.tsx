interface SectionHeaderProps {
  badge?: string;
  title: string;
  description: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  badge,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      {badge && (
        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
        {title}
      </h2>

      <p className="mt-6 text-lg leading-8 text-slate-300">
        {description}
      </p>
    </div>
  );
}