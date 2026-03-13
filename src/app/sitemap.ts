import type { MetadataRoute } from "next";

import { getAllSlugs } from "@/lib/content";

const siteUrl = "https://www.zivyklubzdravia.sk";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSlugs().map((slug) => {
    const path = slug ? `/${slug}/` : "/";

    return {
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: slug ? "monthly" : "weekly",
      priority: slug ? 0.8 : 1,
    };
  });
}
