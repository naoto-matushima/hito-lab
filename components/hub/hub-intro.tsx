import { Breadcrumb, type BreadcrumbItem } from "@/components/ui";

/** docs/05-page-template.md §18・§28: Breadcrumb + H1 + 概要 */
export type HubIntroProps = {
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  overview: string;
};

export function HubIntro({ breadcrumbItems, title, overview }: HubIntroProps) {
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="mt-4">{title}</h1>
      <p className="mt-4 text-lg text-text-secondary">{overview}</p>
    </div>
  );
}
