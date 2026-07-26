import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Chatbase from "@/components/Chatbase";

const organizationSchema = {
  "@context": "https://schema.org",

  "@type": "Organization",

  "@id": "https://www.anatechsolutions.in/#organization",

  name: "ANATECH Technology Solutions",

  url: "https://www.anatechsolutions.in",

  logo: "https://www.anatechsolutions.in/logo.png",

  image: "https://www.anatechsolutions.in/opengraph-image.png",

  description:
    "Professional Web Development, Artificial Intelligence, Software Development, Digital Media, Business Consultancy and Government e-Service Solutions.",

  email: "anatech.operations@gmail.com",

  telephone: "+91-8921520858",

  foundingLocation: {
    "@type": "Place",
    name: "Kollam, Kerala, India",
  },

  address: {
    "@type": "PostalAddress",
    addressLocality: "Kollam",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },

  areaServed: {
    "@type": "Country",
    name: "India",
  },  
  };

export const metadata: Metadata = {
  metadataBase: new URL("https://www.anatechsolutions.in"),

  title: {
    default: "ANATECH Technology Solutions",
    template: "%s | ANATECH Technology Solutions",
  },

  description:
    "Professional Web Development, AI Solutions, Software Development, Branding, Cloud & Digital Transformation.",

  applicationName: "ANATECH Technology Solutions",
  
 verification: {
  google: "fzvyZq03T-uZEyrCADvd2yG8_jEWqixeM9AikvR3TtQ",
},

  keywords: [
    "ANATECH",
    "ANATECH Technology Solutions",
    "Web Development Kerala",
    "AI Solutions Kerala",
    "Software Development Kerala",
    "Digital Media Kerala",
    "Business Consultancy Kerala",
    "Government e Services",
    "Import Export Kerala",
    "Technology Solutions",
  ],

  authors: [
    {
      name: "ANATECH Technology Solutions",
    },
  ],

  creator: "ANATECH Technology Solutions",

  publisher: "ANATECH Technology Solutions",

  category: "Technology",

  alternates: {
    canonical: "https://www.anatechsolutions.in",
  },

  openGraph: {
    title: "ANATECH Technology Solutions",
    description:
      "Empowering Businesses Through Technology & Artificial Intelligence.",

    url: "https://www.anatechsolutions.in",

    siteName: "ANATECH Technology Solutions",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ANATECH Technology Solutions Logo",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   <body>

  <GoogleAnalytics />

  <Chatbase />

  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(organizationSchema),
    }}
  />

  {children}

</body>
    </html>
  );
}