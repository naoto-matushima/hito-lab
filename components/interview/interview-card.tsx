import Link from "next/link";
import { Card } from "@/components/ui";
import type { InterviewContent } from "@/lib/content";

/** docs/06-brand-ui.md §37・§59: Reportより人物性を感じるUIにする */
export function InterviewCard({ interview, companyName }: { interview: InterviewContent; companyName?: string }) {
  const { frontmatter } = interview;

  return (
    <Link href={`/interviews/${frontmatter.slug}/`}>
      <Card className="h-full transition-colors hover:border-primary">
        <p className="text-xs font-medium tracking-wide text-primary-dark">INTERVIEW</p>
        <p className="mt-2 text-lg font-bold text-text">{frontmatter.title}</p>
        {companyName && <p className="mt-2 text-sm text-text-muted">{companyName}</p>}
      </Card>
    </Link>
  );
}
