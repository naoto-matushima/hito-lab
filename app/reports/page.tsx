import type { Metadata } from "next";
import { getPublishedReports } from "@/lib/content";
import { Breadcrumb, Container } from "@/components/ui";
import { ReportCard } from "@/components/report";
import { IndustryExplorer, ThemeExplorer } from "@/components/hub";

/** docs/05-page-template.md §54-56: Report一覧。単純なカード一覧ではなく調査を探す場所として設計する */
export const metadata: Metadata = {
  title: "レポート",
  description: "人手不足研究所の独自調査・統計分析レポート一覧。",
  alternates: { canonical: "/reports/" },
};

export default function ReportsListPage() {
  const reports = getPublishedReports();

  return (
    <Container className="py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "レポート" }]} />
      <h1 className="mt-4">レポート</h1>
      <p className="mt-4 max-w-2xl text-text-secondary">
        人手不足研究所が独自にまとめた調査・統計分析のレポートです。PDFを取得しなくても、Web上で主要な結論・データを確認できます。
      </p>

      <section className="my-12">
        <h2>レポート一覧</h2>
        {reports.length === 0 ? (
          <p className="mt-4 text-text-muted">現在公開しているレポートはありません。近日公開予定です。</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {reports.map((report) => (
              <ReportCard key={report.frontmatter.id} report={report} />
            ))}
          </div>
        )}
      </section>

      <ThemeExplorer />
      <IndustryExplorer />
    </Container>
  );
}
