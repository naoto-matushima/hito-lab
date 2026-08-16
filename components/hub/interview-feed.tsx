import Link from "next/link";
import { getPublishedInterviews } from "@/lib/content";
import { Card } from "@/components/ui";
import type { ThemeId } from "@/lib/validation";

/**
 * docs/05-page-template.md §13・§25: 企業・専門家インタビュー。0件時は非表示。
 * Phase 4時点ではInterviewコンテンツが存在しないため常に非表示になるが、
 * Phase 5でcontent/interviews/にファイルが追加されれば自動的に表示される。
 */
export type InterviewFeedProps = {
  title?: string;
  themeId?: ThemeId;
  industryId?: string;
  limit?: number;
};

export function InterviewFeed({ title = "企業・専門家インタビュー", themeId, industryId, limit = 3 }: InterviewFeedProps) {
  const interviews = getPublishedInterviews()
    .filter((interview) => !themeId || interview.frontmatter.themes.includes(themeId))
    .filter((interview) => !industryId || interview.frontmatter.industries.includes(industryId))
    .slice(0, limit);

  if (interviews.length === 0) return null;

  return (
    <section className="my-16">
      <h2>{title}</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {interviews.map((interview) => (
          <Link key={interview.frontmatter.id} href={`/interviews/${interview.frontmatter.slug}/`}>
            <Card className="h-full transition-colors hover:border-primary">
              <p className="text-xs font-medium text-primary-dark">INTERVIEW</p>
              <p className="mt-2 font-medium text-text">{interview.frontmatter.title}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
