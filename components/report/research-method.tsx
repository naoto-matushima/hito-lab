import type { Research } from "@/lib/validation";

const RESEARCH_TYPE_LABELS: Record<string, string> = {
  "statistical-analysis": "統計分析",
  survey: "アンケート調査",
  "interview-research": "取材・インタビュー調査",
  "market-research": "市場調査",
  "case-analysis": "事例分析",
  "mixed-method": "複合調査",
};

export type ResearchMethodRow = { label: string; value: string };

/** docs/05-page-template.md §42: 存在する情報のみ表示する。ページ描画から切り離してテスト可能にする */
export function buildResearchMethodRows(research: Research): ResearchMethodRow[] {
  const rows: ResearchMethodRow[] = [];

  if (research.types.length > 0) {
    rows.push({
      label: "調査方法",
      value: research.types.map((type) => RESEARCH_TYPE_LABELS[type] ?? type).join("・"),
    });
  }
  if (research.period?.start || research.period?.end) {
    rows.push({
      label: "調査期間",
      value: [research.period.start, research.period.end].filter(Boolean).join(" 〜 "),
    });
  } else if (research.year) {
    rows.push({ label: "調査年", value: `${research.year}年` });
  }
  if (research.targetPopulation) {
    rows.push({ label: "調査対象", value: research.targetPopulation });
  }
  if (research.sampleSize !== undefined) {
    rows.push({ label: "回答数・対象数", value: `${research.sampleSize}` });
  }
  if (research.methodology) {
    rows.push({ label: "調査手法の詳細", value: research.methodology });
  }
  if (research.notes) {
    rows.push({ label: "備考", value: research.notes });
  }

  return rows;
}

/** docs/05-page-template.md §42: 03のResearch Dataから自動生成。存在する情報のみ表示する */
export function ResearchMethod({ research }: { research: Research }) {
  const rows = buildResearchMethodRows(research);

  if (rows.length === 0) return null;

  return (
    <section className="my-8 rounded-lg border border-border bg-surface-subtle p-6">
      <h2 className="text-lg">調査概要</h2>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs text-text-muted">{row.label}</dt>
            <dd className="mt-1 text-sm text-text">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
