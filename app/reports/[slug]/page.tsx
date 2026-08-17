import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllReports, getPublishedReports, loadPeople, loadSources } from "@/lib/content";
import type { Person, Source } from "@/lib/validation";
import { mdxComponents } from "@/components/mdx";
import { Container } from "@/components/ui";
import { AuthorList, SourceList } from "@/components/article";
import { DownloadCta, ReportHeader, ResearchMethod } from "@/components/report";
import { ArticleFeed, InterviewFeed } from "@/components/hub";
import { ReportDownloadForm } from "@/components/form";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/article-json-ld";
import { getFormIndustryOptions } from "@/lib/lead";
import { shouldShowDownloadCta } from "@/components/report/download-cta";

type ReportPageParams = { slug: string };

export function generateStaticParams() {
  return getPublishedReports().map((report) => ({ slug: report.frontmatter.slug }));
}

function findReport(slug: string) {
  return getAllReports().find((report) => report.frontmatter.slug === slug);
}

function resolveByIds<T extends { id: string }>(ids: string[], all: T[]): T[] {
  return ids.map((id) => all.find((entry) => entry.id === id)).filter((entry): entry is T => Boolean(entry));
}

export async function generateMetadata({ params }: { params: Promise<ReportPageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const report = findReport(slug);
  if (!report) return {};

  const { frontmatter } = report;
  const path = `/reports/${frontmatter.slug}/`;
  const title = frontmatter.seo?.title ?? frontmatter.title;
  const description = frontmatter.seo?.description ?? frontmatter.description;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: frontmatter.status === "published" ? undefined : { index: false, follow: false },
    openGraph: { type: "article", title, description, url: path },
  };
}

export default async function ReportDetailPage({ params }: { params: Promise<ReportPageParams> }) {
  const { slug } = await params;
  const report = findReport(slug);
  if (!report) notFound();

  const { frontmatter, body } = report;

  const people = loadPeople();
  const authors: Person[] = resolveByIds(frontmatter.authors, people);
  const sources: Source[] = resolveByIds(frontmatter.sources, loadSources());

  const { content } = await compileMDX({ source: body, components: mdxComponents, options: { blockJS: false } });

  const path = `/reports/${frontmatter.slug}/`;
  const breadcrumbItems = [
    { label: "TOP", href: "/" },
    { label: "レポート", href: "/reports/" },
    { label: frontmatter.title },
  ];

  const articleJsonLd = buildArticleJsonLd(frontmatter, path, authors);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "TOP", path: "/" },
    { name: "レポート", path: "/reports/" },
    { name: frontmatter.title, path },
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
        <ReportHeader
          breadcrumbItems={breadcrumbItems}
          title={frontmatter.title}
          description={frontmatter.description}
          publishedAt={frontmatter.publishedAt}
          updatedAt={frontmatter.updatedAt}
        />

        <DownloadCta download={frontmatter.download} label="レポートを無料でダウンロード" />

        <ResearchMethod research={frontmatter.research} />

        <div className="mt-8">{content}</div>

        <DownloadCta download={frontmatter.download} variant="secondary" label="詳細データ・分析を見る" />

        <ArticleFeed title="関連記事" themeId={frontmatter.primaryTheme} />
        <InterviewFeed themeId={frontmatter.primaryTheme} />

        {shouldShowDownloadCta(frontmatter.download) && (
          <section className="my-12 rounded-lg border border-border bg-surface-subtle p-6">
            <h2 className="text-lg">レポートをダウンロードする</h2>
            <div className="mt-4">
              <ReportDownloadForm
                industries={getFormIndustryOptions()}
                reportId={frontmatter.id}
                reportTitle={frontmatter.title}
              />
            </div>
          </section>
        )}

        <AuthorList authors={authors} />
        <SourceList sources={sources} />
      </Container>
    </article>
  );
}
