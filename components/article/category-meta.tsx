import Link from "next/link";
import type { ThemeMasterEntry } from "@/lib/validation";

/** docs/05-page-template.md §34: 02 Category / Metadata、05 Published / Updated */
export type CategoryMetaProps = {
  theme: ThemeMasterEntry;
  publishedAt?: string;
  updatedAt?: string;
};

export function CategoryMeta({ theme, publishedAt, updatedAt }: CategoryMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
      <Link
        href={theme.url}
        className="rounded-full bg-primary-pale px-3 py-1 font-medium text-primary-dark hover:bg-primary-light"
      >
        {theme.label}
      </Link>
      {publishedAt && <span>公開日：{publishedAt}</span>}
      {updatedAt && updatedAt !== publishedAt && <span>更新日：{updatedAt}</span>}
    </div>
  );
}
