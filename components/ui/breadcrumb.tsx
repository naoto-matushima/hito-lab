import Link from "next/link";

/** docs/06-brand-ui.md §62: 視覚的には控えめに。本文タイトルより目立たせない */
export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="パンくずリスト" className="overflow-x-auto text-sm text-text-muted">
      <ol className="flex flex-nowrap items-center gap-1 whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-text-secondary" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
