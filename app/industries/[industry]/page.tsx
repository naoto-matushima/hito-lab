import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadIndustries, loadIndustryHubContent, loadSources, loadThemes } from "@/lib/content";
import type { IndustryHubContent, IndustryMasterEntry, Source } from "@/lib/validation";
import { Container } from "@/components/ui";
import { ArticleFeed, HubIntro, InterviewFeed, KeyStats, ReportFeed } from "@/components/hub";

type IndustryHubParams = { industry: string };

export function generateStaticParams() {
  return loadIndustries()
    .filter((industry) => industry.status === "active" && industry.id !== "cross-industry")
    .map((industry) => ({ industry: industry.id }));
}

function resolveIndustry(
  industryId: string,
): { industryEntry: IndustryMasterEntry; content: IndustryHubContent } | undefined {
  const industryEntry = loadIndustries().find((entry) => entry.id === industryId && entry.status === "active");
  const content = loadIndustryHubContent(industryId);
  if (!industryEntry || !content) return undefined;
  return { industryEntry, content };
}

export async function generateMetadata({ params }: { params: Promise<IndustryHubParams> }): Promise<Metadata> {
  const { industry } = await params;
  const resolved = resolveIndustry(industry);
  if (!resolved) return {};
  return {
    title: `${resolved.industryEntry.label}の人手不足`,
    description: resolved.content.metaDescription,
    alternates: { canonical: `/industries/${resolved.industryEntry.id}/` },
  };
}

export default async function IndustryHubPage({ params }: { params: Promise<IndustryHubParams> }) {
  const { industry } = await params;
  const resolved = resolveIndustry(industry);
  if (!resolved) notFound();
  const { industryEntry, content } = resolved;

  const allSources = loadSources();
  const sources: Source[] = content.sources
    .map((id) => allSources.find((entry) => entry.id === id))
    .filter((entry): entry is Source => Boolean(entry));

  const themes = loadThemes();

  return (
    <Container className="py-12">
      <HubIntro
        breadcrumbItems={[{ label: "TOP", href: "/" }, { label: "業界から探す" }, { label: industryEntry.label }]}
        title={`${industryEntry.label}の人手不足`}
        overview={content.overview}
      />

      <KeyStats
        title="人手不足の現状"
        currentSituation={content.currentSituation}
        stats={content.keyStats}
        sources={sources}
      />

      <section className="my-16 border-t border-border pt-12">
        <h2>テーマ別に見る</h2>
        <p className="mt-4 text-text-secondary">
          {industryEntry.label}の人手不足を、採用・組織・業務改善・経営の4つのテーマから見ることができます。
        </p>
        <div className="mt-4 flex flex-col gap-8">
          {themes.map((theme) => (
            <ArticleFeed
              key={theme.id}
              title={theme.label}
              themeId={theme.id}
              industryId={industryEntry.id}
              limit={3}
            />
          ))}
        </div>
      </section>

      <ReportFeed industryId={industryEntry.id} />

      <InterviewFeed industryId={industryEntry.id} />

      <ArticleFeed title="最新記事" industryId={industryEntry.id} />
    </Container>
  );
}
