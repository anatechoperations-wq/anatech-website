import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://anatechsolutions.in"),

  title: {
    default: "ANATECH Technology Solutions",
    template: "%s | ANATECH Technology Solutions",
  },

  description:
    "Professional Web Development, AI Solutions, Software Development, Branding, Cloud & Digital Transformation.",

  applicationName: "ANATECH Technology Solutions",

  openGraph: {
    title: "ANATECH Technology Solutions",
    description:
      "Empowering Businesses Through Technology & Artificial Intelligence.",
    url: "https://anatechsolutions.in",
    siteName: "ANATECH Technology Solutions",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ANATECH Technology Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ANATECH Technology Solutions",
    description:
      "Empowering Businesses Through Technology & Artificial Intelligence.",
    images: ["/twitter-image.png"],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  alternates: {
    canonical: "https://anatechsolutions.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}