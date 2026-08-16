import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  extractToc,
  findRelatedArticles,
  getAllArticles,
  getPublishedArticles,
  loadPeople,
  loadSources,
  loadThemes,
  type ArticleContent,
} from "@/lib/content";
import { ThemeIdSchema, type Person, type Source } from "@/lib/validation";
import { mdxComponents } from "@/components/mdx";
import { Breadcrumb, Container } from "@/components/ui";
import { ArticleToc, AuthorList, CategoryMeta, RelatedContentList, SourceList } from "@/components/article";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/article-json-ld";

type ArticlePageParams = { theme: string; slug: string };

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({
    theme: article.frontmatter.primaryTheme,
    slug: article.frontmatter.slug,
  }));
}

function findArticle(theme: string, slug: string): ArticleContent | undefined {
  const themeResult = ThemeIdSchema.safeParse(theme);
  if (!themeResult.success) return undefined;
  return getAllArticles().find(
    (article) => article.frontmatter.primaryTheme === themeResult.data && article.frontmatter.slug === slug,
  );
}

function resolveByIds<T extends { id: string }>(ids: string[], all: T[]): T[] {
  return ids.map((id) => all.find((entry) => entry.id === id)).filter((entry): entry is T => Boolean(entry));
}

export async function generateMetadata({ params }: { params: Promise<ArticlePageParams> }): Promise<Metadata> {
  const { theme, slug } = await params;
  const article = findArticle(theme, slug);
  if (!article) return {};

  const { frontmatter } = article;
  const path = `/${frontmatter.primaryTheme}/${frontmatter.slug}/`;
  const title = frontmatter.seo?.title ?? frontmatter.title;
  const description = frontmatter.seo?.description ?? frontmatter.description;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: frontmatter.status === "published" ? undefined : { index: false, follow: false },
    openGraph: {
      type: "article",
      title,
      description,
      url: path,
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<ArticlePageParams> }) {
  const { theme, slug } = await params;
  const article = findArticle(theme, slug);
  if (!article) notFound();

  const { frontmatter, body } = article;

  const themeEntry = loadThemes().find((entry) => entry.id === frontmatter.primaryTheme);
  if (!themeEntry) notFound();

  const people = loadPeople();
  const authors: Person[] = resolveByIds(frontmatter.authors, people);
  const editors: Person[] = resolveByIds(frontmatter.editors, people);
  const reviewers: Person[] = resolveByIds(frontmatter.reviewers, people);

  const sources: Source[] = resolveByIds(frontmatter.sources, loadSources());

  const toc = extractToc(body);
  const related = findRelatedArticles(article, getAllArticles());

  // KeyFinding/StatCard/Chart/DataTable等はJSXのexpression属性（例: data={[...]}）で
  // 値を受け取る。next-mdx-remote@6のblockJSはデフォルトtrueでこれらを除去してしまうため
  // 無効化する。content/はGit管理下の一次コンテンツのみで外部入力を受け付けないため、
  // blockDangerousJS（eval/Function/process等のブロック）はデフォルトのtrueのまま維持する。
  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    options: { blockJS: false },
  });

  const breadcrumbItems = [
    { label: "TOP", href: "/" },
    { label: themeEntry.label, href: themeEntry.url },
    { label: frontmatter.title },
  ];

  const articleJsonLd = buildArticleJsonLd(frontmatter, authors);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "TOP", path: "/" },
    { name: themeEntry.label, path: themeEntry.url },
    { name: frontmatter.title, path: `/${frontmatter.primaryTheme}/${frontmatter.slug}/` },
  ]);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />

      <Container size="narrow" className="py-12">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-6">
          <CategoryMeta theme={themeEntry} publishedAt={frontmatter.publishedAt} updatedAt={frontmatter.updatedAt} />
          <h1 className="mt-4">{frontmatter.title}</h1>
          <p className="mt-4 text-lg text-text-secondary">{frontmatter.description}</p>
        </div>

        <ArticleToc items={toc} />

        <div className="mt-8">{content}</div>

        <RelatedContentList articles={related} />
        <AuthorList authors={authors} editors={editors} reviewers={reviewers} />
        <SourceList sources={sources} />
      </Container>
    </article>
  );
}
