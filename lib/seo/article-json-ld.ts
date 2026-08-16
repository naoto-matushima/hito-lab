import type { ArticleFrontmatter, Person } from "@/lib/validation";
import { getSiteUrl, SITE_NAME } from "./site";

export type BreadcrumbEntry = {
  name: string;
  path: string;
};

/** docs/04-seo-aio.md §46: Article構造化データ */
export function buildArticleJsonLd(article: ArticleFrontmatter, authors: Person[]) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${article.primaryTheme}/${article.slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: authors.map((author) => ({
      "@type": "Person",
      name: author.name,
    })),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/** docs/04-seo-aio.md §51: BreadcrumbList */
export function buildBreadcrumbJsonLd(items: BreadcrumbEntry[]) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
