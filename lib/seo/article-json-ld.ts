import type { Person } from "@/lib/validation";
import { getSiteUrl, SITE_NAME } from "./site";

export type BreadcrumbEntry = {
  name: string;
  path: string;
};

export type ArticleJsonLdContent = {
  title: string;
  description: string;
  publishedAt?: string;
  updatedAt?: string;
};

/**
 * docs/04-seo-aio.md §46: Article構造化データ。
 * §47によりInterviewもArticle系を基本として利用するため、Report/Interviewでも共用する。
 */
export function buildArticleJsonLd(content: ArticleJsonLdContent, path: string, authors: Person[]) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.description,
    author: authors.map((author) => ({
      "@type": "Person",
      name: author.name,
    })),
    datePublished: content.publishedAt,
    dateModified: content.updatedAt ?? content.publishedAt,
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
