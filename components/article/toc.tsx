import type { TocItem } from "@/lib/content";

/** docs/05-page-template.md §37: H2/H3から自動生成。長文の場合のみ表示、モバイルでは折りたたみ可能 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;

  return (
    <details open className="not-prose my-8 rounded-md border border-border bg-surface-subtle p-4">
      <summary className="cursor-pointer font-medium text-text">目次</summary>
      <ol className="mt-3 flex flex-col gap-1 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "ml-4" : undefined}>
            <a href={`#${item.id}`} className="text-text-secondary hover:text-primary">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
