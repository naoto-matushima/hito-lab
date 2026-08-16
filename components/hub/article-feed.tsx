import Link from "next/link";
import { getPublishedArticles } from "@/lib/content";
import { Card } from "@/components/ui";
import type { ThemeId } from "@/lib/validation";

/** docs/05-page-template.md §15・§26: 動的Content Feed（0件時は非表示） */
export type ArticleFeedProps = {
  title?: string;
  themeId?: ThemeId;
  industryId?: string;
  limit?: number;
};

export function ArticleFeed({ title = "最新記事", themeId, industryId, limit = 6 }: ArticleFeedProps) {
  const articles = getPublishedArticles()
    .filter((article) => !themeId || article.frontmatter.themes.includes(themeId))
    .filter((article) => !industryId || article.frontmatter.industries.includes(industryId))
    .sort((a, b) => (b.frontmatter.publishedAt ?? "").localeCompare(a.frontmatter.publishedAt ?? ""))
    .slice(0, limit);

  if (articles.length === 0) return null;

  return (
    <section className="my-16">
      <h2>{title}</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.frontmatter.id}
            href={`/${article.frontmatter.primaryTheme}/${article.frontmatter.slug}/`}
          >
            <Card className="h-full transition-colors hover:border-primary">
              <p className="font-medium text-text">{article.frontmatter.title}</p>
              <p className="mt-2 text-sm text-text-muted">{article.frontmatter.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
