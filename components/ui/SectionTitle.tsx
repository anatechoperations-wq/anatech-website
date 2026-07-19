interface Props {
  title: string;
  highlight: string;
  subtitle: string;
}

export default function SectionTitle({
  title,
  highlight,
  subtitle,
}: Props) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold">
        {title}
        <span className="text-blue-600"> {highlight}</span>
      </h2>

      <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}