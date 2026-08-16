import { Breadcrumb, type BreadcrumbItem } from "@/components/ui";

/** docs/05-page-template.md §41: 01 Breadcrumb → 02 Report Label → 03 H1 → 04 Description */
export type ReportHeaderProps = {
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  description: string;
  publishedAt?: string;
  updatedAt?: string;
};

export function ReportHeader({ breadcrumbItems, title, description, publishedAt, updatedAt }: ReportHeaderProps) {
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <p className="mt-4 text-xs font-medium tracking-wide text-accent-dark">REPORT</p>
      <h1 className="mt-2">{title}</h1>
      <p className="mt-4 text-lg text-text-secondary">{description}</p>
      {(publishedAt || updatedAt) && (
        <p className="mt-4 text-sm text-text-muted">
          {publishedAt && <>公開日：{publishedAt}</>}
          {updatedAt && updatedAt !== publishedAt && <> ／ 更新日：{updatedAt}</>}
        </p>
      )}
    </div>
  );
}
