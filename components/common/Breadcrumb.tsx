import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-white/10 bg-[#041126]"
    >
      <div className="mx-auto flex max-w-7xl items-center px-6 py-4 text-sm">

        {items.map((item, index) => (
          <div
            key={item.label}
            className="flex items-center"
          >
            {item.href ? (
              <Link
                href={item.href}
                className="text-slate-300 transition hover:text-cyan-400"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-white">
                {item.label}
              </span>
            )}

            {index < items.length - 1 && (
              <ChevronRight
                className="mx-2 h-4 w-4 text-slate-500"
              />
            )}
          </div>
        ))}

      </div>
    </nav>
  );
}