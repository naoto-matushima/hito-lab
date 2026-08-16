import Link from "next/link";
import { getPublishedReports } from "@/lib/content";
import { Card } from "@/components/ui";
import type { ThemeId } from "@/lib/validation";

/**
 * docs/05-page-template.md §9・§23: 注目Report。0件時は非表示。
 * Phase 4時点ではReportコンテンツが存在しないため常に非表示になるが、
 * Phase 5でcontent/reports/にファイルが追加されれば自動的に表示される。
 */
export type ReportFeedProps = {
  title?: string;
  themeId?: ThemeId;
  industryId?: string;
  limit?: number;
};

export function ReportFeed({ title = "注目レポート", themeId, industryId, limit = 3 }: ReportFeedProps) {
  const reports = getPublishedReports()
    .filter((report) => !themeId || report.frontmatter.themes.includes(themeId))
    .filter((report) => !industryId || report.frontmatter.industries.includes(industryId))
    .slice(0, limit);

  if (reports.length === 0) return null;

  return (
    <section className="my-16">
      <h2>{title}</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {reports.map((report) => (
          <Link key={report.frontmatter.id} href={`/reports/${report.frontmatter.slug}/`}>
            <Card className="h-full transition-colors hover:border-primary">
              <p className="text-xs font-medium text-primary-dark">REPORT</p>
              <p className="mt-2 font-medium text-text">{report.frontmatter.title}</p>
              <p className="mt-2 text-sm text-text-muted">{report.frontmatter.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
