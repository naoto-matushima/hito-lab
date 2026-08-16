import { StatCard, StatCardGroup } from "@/components/mdx";
import type { HubStat, Source } from "@/lib/validation";

/** docs/05-page-template.md §20-21・§30: 現状・重要データ */
export type KeyStatsProps = {
  title: string;
  currentSituation: string;
  stats: HubStat[];
  sources: Source[];
};

export function KeyStats({ title, currentSituation, stats, sources }: KeyStatsProps) {
  return (
    <section className="my-12">
      <h2>{title}</h2>
      <p className="mt-4 text-text-secondary">{currentSituation}</p>
      <StatCardGroup>
        {stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} context={stat.context} />
        ))}
      </StatCardGroup>
      {sources.length > 0 && (
        <p className="mt-4 text-xs text-text-muted">
          出典：{sources.map((source) => `${source.publisher}「${source.title}」`).join("／")}
        </p>
      )}
    </section>
  );
}
