import type { Source } from "@/lib/validation";

/** docs/03-content-model.md §26-27: 記事末尾に参考資料・出典を自動表示する */
export function SourceList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null;

  return (
    <section className="my-8 rounded-md border border-border bg-surface p-6">
      <h2 className="text-lg">参考資料・出典</h2>
      <ul className="mt-4 flex flex-col gap-2 text-sm text-text-secondary">
        {sources.map((source) => (
          <li key={source.id}>
            {source.url ? (
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {source.publisher}「{source.title}」
              </a>
            ) : (
              <span>
                {source.publisher}「{source.title}」
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
