import Link from "next/link";
import type { ArticleContent } from "@/lib/content";
import { Card } from "@/components/ui";

/** docs/03-content-model.md §51-52: 手動指定＋分類一致度による自動補完で関連コンテンツを表示する */
export function RelatedContentList({ articles }: { articles: ArticleContent[] }) {
  if (articles.length === 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-lg">関連コンテンツ</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.frontmatter.id} href={`/${article.frontmatter.primaryTheme}/${article.frontmatter.slug}/`}>
            <Card className="h-full transition-colors hover:border-primary">
              <p className="text-sm font-medium text-text">{article.frontmatter.title}</p>
              <p className="mt-2 text-xs text-text-muted">{article.frontmatter.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
