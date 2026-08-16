import Link from "next/link";
import { loadIndustries } from "@/lib/content";
import { Card } from "@/components/ui";

/**
 * docs/05-page-template.md §11: 業界から探す（Industry Masterを利用）。
 * docs/09 §34: 初期は建設のみ本格実装。status:plannedの業界は「準備中」表示に留め、
 * 存在しないHubへのリンクは張らない。
 */
export function IndustryExplorer() {
  const industries = loadIndustries().filter((industry) => industry.id !== "cross-industry");

  return (
    <section className="my-16">
      <h2>業界から探す</h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {industries.map((industry) =>
          industry.status === "active" ? (
            <Link key={industry.id} href={`/industries/${industry.id}/`}>
              <Card className="h-full transition-colors hover:border-primary">
                <p className="font-bold text-text">{industry.label}</p>
              </Card>
            </Link>
          ) : (
            <Card key={industry.id} className="h-full opacity-60">
              <p className="font-bold text-text">{industry.label}</p>
              <p className="mt-2 text-xs text-text-muted">準備中</p>
            </Card>
          ),
        )}
      </div>
    </section>
  );
}
