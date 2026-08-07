import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.leonsailingtenerife.com";

  return [
    { url: `${baseUrl}/es`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/en`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/es/aviso-legal`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/en/aviso-legal`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/es/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/en/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/es/cookies`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/en/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
