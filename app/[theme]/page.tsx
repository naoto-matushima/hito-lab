import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { loadSources, loadThemeHubContent, loadThemes } from "@/lib/content";
import { ThemeIdSchema, type ThemeMasterEntry, type ThemeHubContent, type Source } from "@/lib/validation";
import { Card, Container } from "@/components/ui";
import { ArticleFeed, HubIntro, InterviewFeed, KeyStats, KeyTopics, ReportFeed } from "@/components/hub";

type ThemeHubParams = { theme: string };

export function generateStaticParams() {
  return ThemeIdSchema.options.map((theme) => ({ theme }));
}

function resolveTheme(theme: string): { themeEntry: ThemeMasterEntry; content: ThemeHubContent } | undefined {
  const result = ThemeIdSchema.safeParse(theme);
  if (!result.success) return undefined;
  const themeEntry = loadThemes().find((entry) => entry.id === result.data);
  const content = loadThemeHubContent(result.data);
  if (!themeEntry || !content) return undefined;
  return { themeEntry, content };
}

export async function generateMetadata({ params }: { params: Promise<ThemeHubParams> }): Promise<Metadata> {
  const { theme } = await params;
  const resolved = resolveTheme(theme);
  if (!resolved) return {};
  return {
    title: resolved.themeEntry.label,
    description: resolved.content.metaDescription,
    alternates: { canonical: resolved.themeEntry.url },
  };
}

export default async function ThemeHubPage({ params }: { params: Promise<ThemeHubParams> }) {
  const { theme } = await params;
  const resolved = resolveTheme(theme);
  if (!resolved) notFound();
  const { themeEntry, content } = resolved;

  const allSources = loadSources();
  const sources: Source[] = content.sources
    .map((id) => allSources.find((entry) => entry.id === id))
    .filter((entry): entry is Source => Boolean(entry));

  const otherThemes = loadThemes().filter((entry) => entry.id !== themeEntry.id);

  return (
    <Container className="py-12">
      <HubIntro
        breadcrumbItems={[{ label: "TOP", href: "/" }, { label: themeEntry.label }]}
        title={themeEntry.label}
        overview={content.overview}
      />

      <KeyStats
        title="現在起きていること"
        currentSituation={content.currentSituation}
        stats={content.keyStats}
        sources={sources}
      />

      <KeyTopics title="主要課題・論点" topics={content.keyTopics} />

      <ReportFeed themeId={themeEntry.id} />

      <InterviewFeed themeId={themeEntry.id} />

      <ArticleFeed title="関連記事" themeId={themeEntry.id} />

      <section className="my-16 border-t border-border pt-12">
        <h2>関連テーマ</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {otherThemes.map((entry) => (
            <Link key={entry.id} href={entry.url}>
              <Card className="h-full transition-colors hover:border-primary">
                <p className="font-bold text-text">{entry.label}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}
