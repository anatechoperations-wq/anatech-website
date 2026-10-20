import type { MetadataRoute } from "next";
import { malayalamServices } from "@/lib/malayalam-services";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.anatechsolutions.in";
  const now = new Date();
  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: baseUrl + "/services", lastModified: now, changeFrequency: "weekly", priority: 0.9, alternates: { languages: { en: baseUrl + "/services", ml: baseUrl + "/ml/services" } } },
    { url: baseUrl + "/ml", lastModified: now, changeFrequency: "weekly", priority: 0.9, alternates: { languages: { en: baseUrl, ml: baseUrl + "/ml" } } },
    { url: baseUrl + "/ml/services", lastModified: now, changeFrequency: "weekly", priority: 0.85, alternates: { languages: { en: baseUrl + "/services", ml: baseUrl + "/ml/services" } } },
    ...malayalamServices.map(service => ({ url: baseUrl + "/ml/services/" + service.slug, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8, alternates: { languages: { en: baseUrl + service.englishHref, ml: baseUrl + "/ml/services/" + service.slug } } })),
    ...malayalamServices.map(service => ({ url: baseUrl + service.englishHref, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8, alternates: { languages: { en: baseUrl + service.englishHref, ml: baseUrl + "/ml/services/" + service.slug } } })),
    { url: baseUrl + "/ml/contact", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}