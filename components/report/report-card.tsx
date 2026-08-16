import Link from "next/link";
import { Card } from "@/components/ui";
import type { ReportContent } from "@/lib/content";

/** docs/06-brand-ui.md §36・§56: Reportは「資料感」を強くし、Articleカードと差別化する */
export function ReportCard({ report }: { report: ReportContent }) {
  const { frontmatter } = report;

  return (
    <Link href={`/reports/${frontmatter.slug}/`}>
      <Card className="h-full border-2 border-primary-dark bg-surface transition-colors hover:border-accent">
        <p className="text-xs font-bold tracking-wide text-accent-dark">
          REPORT{frontmatter.research.year ? ` ${frontmatter.research.year}` : ""}
        </p>
        <p className="mt-3 text-lg font-bold text-text">{frontmatter.title}</p>
        <p className="mt-2 text-sm text-text-muted">{frontmatter.description}</p>
      </Card>
    </Link>
  );
}
