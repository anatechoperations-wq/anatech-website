import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.anatechsolutions.in";
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: baseUrl + "/ml", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9, alternates: { languages: { en: baseUrl, ml: baseUrl + "/ml" } } },
  ];
}