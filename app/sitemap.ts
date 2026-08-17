import type { MetadataRoute } from "next";
import {
  getPublishedArticles,
  getPublishedInterviews,
  getPublishedReports,
  loadIndustries,
  loadThemes,
} from "@/lib/content";
import { getSiteUrl } from "@/lib/seo/site";

/**
 * docs/08-technical-architecture.md §61-62: index対象ページのみを掲載する。
 * Draft・Thank You・/consultation/・/dev/は除外する（docs/02-sitemap-url.mdの方針）。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticPaths = [
    "/",
    ...loadThemes().map((theme) => theme.url),
    ...loadIndustries()
      .filter((industry) => industry.status === "active" && industry.id !== "cross-industry")
      .map((industry) => `/industries/${industry.id}/`),
    "/reports/",
    "/interviews/",
    "/contact/",
    "/interview-request/",
  ];

  const articlePaths = getPublishedArticles().map(
    (article) => `/${article.frontmatter.primaryTheme}/${article.frontmatter.slug}/`,
  );
  const reportPaths = getPublishedReports().map((report) => `/reports/${report.frontmatter.slug}/`);
  const interviewPaths = getPublishedInterviews().map((interview) => `/interviews/${interview.frontmatter.slug}/`);

  const paths = [...staticPaths, ...articlePaths, ...reportPaths, ...interviewPaths];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));
}
