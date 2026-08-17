"use client";

import { trackEvent } from "@/lib/analytics/gtag";
import type { Company } from "@/lib/validation";

/**
 * docs/05-page-template.md §51-52: 末尾の企業詳細情報。Company Masterから自動生成。
 * リンクはstatus:activeのみ、公式サイト→採用ページ→求人情報の優先順位で表示する。
 */
export function DetailCompanyProfile({ company }: { company?: Company }) {
  if (!company) return null;

  const links: { label: string; url: string; event: string }[] = [];
  if (company.website?.status === "active" && company.website.url) {
    links.push({ label: "公式サイト", url: company.website.url, event: "company_website_click" });
  }
  if (company.recruitment?.page?.status === "active" && company.recruitment.page.url) {
    links.push({ label: "採用ページ", url: company.recruitment.page.url, event: "recruitment_page_click" });
  }
  for (const jobLink of company.recruitment?.jobLinks ?? []) {
    if (jobLink.status === "active" && jobLink.url) {
      links.push({ label: `${jobLink.label}で募集中の求人を見る`, url: jobLink.url, event: "job_link_click" });
    }
  }

  return (
    <section className="my-8 rounded-lg border border-border bg-surface p-6">
      <h2 className="text-lg">{company.name}について</h2>
      {company.description && <p className="mt-3 text-sm text-text-secondary">{company.description}</p>}
      {links.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                onClick={() => trackEvent(link.event, { companyId: company.id })}
              >
                {link.label} →
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
