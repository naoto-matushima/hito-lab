import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  getAllInterviews,
  getPublishedInterviews,
  loadCompanies,
  loadIndustries,
  loadPeople,
  loadSources,
} from "@/lib/content";
import type { Company, Person, Source } from "@/lib/validation";
import { mdxComponents } from "@/components/mdx";
import { Breadcrumb, Container } from "@/components/ui";
import { AuthorList, SourceList } from "@/components/article";
import { CompactCompanyProfile, DetailCompanyProfile, InterviewRequestCta } from "@/components/interview";
import { ArticleFeed, ReportFeed } from "@/components/hub";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo/article-json-ld";

type InterviewPageParams = { slug: string };

export function generateStaticParams() {
  return getPublishedInterviews().map((interview) => ({ slug: interview.frontmatter.slug }));
}

function findInterview(slug: string) {
  return getAllInterviews().find((interview) => interview.frontmatter.slug === slug);
}

function resolveByIds<T extends { id: string }>(ids: string[], all: T[]): T[] {
  return ids.map((id) => all.find((entry) => entry.id === id)).filter((entry): entry is T => Boolean(entry));
}

export async function generateMetadata({ params }: { params: Promise<InterviewPageParams> }): Promise<Metadata> {
  const { slug } = await params;
  const interview = findInterview(slug);
  if (!interview) return {};

  const { frontmatter } = interview;
  const path = `/interviews/${frontmatter.slug}/`;
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

export default async function InterviewDetailPage({ params }: { params: Promise<InterviewPageParams> }) {
  const { slug } = await params;
  const interview = findInterview(slug);
  if (!interview) notFound();

  const { frontmatter, body } = interview;

  const people = loadPeople();
  const authors: Person[] = resolveByIds(frontmatter.authors, people);
  const interviewees: Person[] = resolveByIds(frontmatter.interview.interviewees, people);

  const companies: Company[] = resolveByIds(frontmatter.interview.companies, loadCompanies());
  const company = companies[0];

  const industries = loadIndustries();
  const industryLabel = company?.industry
    .map((id) => industries.find((entry) => entry.id === id)?.label)
    .filter(Boolean)
    .join("・");

  const sources: Source[] = resolveByIds(frontmatter.sources, loadSources());

  const { content } = await compileMDX({ source: body, components: mdxComponents, options: { blockJS: false } });

  const path = `/interviews/${frontmatter.slug}/`;
  const breadcrumbItems = [
    { label: "TOP", href: "/" },
    { label: "インタビュー", href: "/interviews/" },
    { label: frontmatter.title },
  ];

  const articleJsonLd = buildArticleJsonLd(frontmatter, path, authors);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "TOP", path: "/" },
    { name: "インタビュー", path: "/interviews/" },
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
        <Breadcrumb items={breadcrumbItems} />
        <p className="mt-4 text-xs font-medium tracking-wide text-primary-dark">INTERVIEW</p>
        <h1 className="mt-2">{frontmatter.title}</h1>
        <p className="mt-4 text-lg text-text-secondary">{frontmatter.description}</p>

        <CompactCompanyProfile
          company={company}
          industryLabel={industryLabel || undefined}
          interviewees={interviewees}
        />

        <div className="mt-8">{content}</div>

        <DetailCompanyProfile company={company} />

        <ArticleFeed title="関連記事" themeId={frontmatter.primaryTheme} />
        <ReportFeed themeId={frontmatter.primaryTheme} />

        <InterviewRequestCta />

        <AuthorList authors={authors} />
        <SourceList sources={sources} />
      </Container>
    </article>
  );
}
