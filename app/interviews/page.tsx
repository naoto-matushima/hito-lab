import type { Metadata } from "next";
import { getPublishedInterviews, loadCompanies } from "@/lib/content";
import { Breadcrumb, Container } from "@/components/ui";
import { InterviewCard } from "@/components/interview";
import { IndustryExplorer, ThemeExplorer } from "@/components/hub";

/** docs/05-page-template.md §58-59: Interview一覧 */
export const metadata: Metadata = {
  title: "インタビュー",
  description: "人手不足に取り組む企業・経営者・専門家への取材記事一覧。",
  alternates: { canonical: "/interviews/" },
};

export default function InterviewsListPage() {
  const interviews = getPublishedInterviews();
  const companies = loadCompanies();

  return (
    <Container className="py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "インタビュー" }]} />
      <h1 className="mt-4">インタビュー</h1>
      <p className="mt-4 max-w-2xl text-text-secondary">人手不足に取り組む企業・経営者・専門家への取材記事です。</p>

      <section className="my-12">
        <h2>インタビュー一覧</h2>
        {interviews.length === 0 ? (
          <p className="mt-4 text-text-muted">
            現在公開しているインタビューはありません。取材のご協力をお待ちしています。
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {interviews.map((interview) => {
              const companyId = interview.frontmatter.interview.companies[0];
              const company = companies.find((entry) => entry.id === companyId);
              return (
                <InterviewCard key={interview.frontmatter.id} interview={interview} companyName={company?.name} />
              );
            })}
          </div>
        )}
      </section>

      <IndustryExplorer />
      <ThemeExplorer />
    </Container>
  );
}
