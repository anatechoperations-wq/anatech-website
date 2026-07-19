interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      className={`px-8 py-4 rounded-xl font-semibold transition duration-300 ${
        variant === "primary"
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "border border-blue-500 text-white hover:bg-blue-900"
      }`}
    >
      {children}
    </button>
  );
}