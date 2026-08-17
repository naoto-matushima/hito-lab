import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";

/** docs/08-technical-architecture.md §63: Preview/Internalページ等をクロールさせない */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dev/", "/thanks/", "/consultation/"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
