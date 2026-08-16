import type { Person } from "@/lib/validation";

/** docs/03-content-model.md §23: 執筆・編集・監修。表示対象が存在する項目のみ出力する */
export type AuthorListProps = {
  authors: Person[];
  editors?: Person[];
  reviewers?: Person[];
};

export function AuthorList({ authors, editors = [], reviewers = [] }: AuthorListProps) {
  if (authors.length === 0 && editors.length === 0 && reviewers.length === 0) return null;

  return (
    <section className="my-8 rounded-md border border-border bg-surface p-6">
      <h2 className="text-lg">執筆・編集・監修</h2>
      <dl className="mt-4 flex flex-col gap-3 text-sm">
        {authors.length > 0 && (
          <div>
            <dt className="text-text-muted">執筆</dt>
            <dd className="mt-1 text-text">{authors.map((person) => person.name).join("、")}</dd>
          </div>
        )}
        {editors.length > 0 && (
          <div>
            <dt className="text-text-muted">編集</dt>
            <dd className="mt-1 text-text">{editors.map((person) => person.name).join("、")}</dd>
          </div>
        )}
        {reviewers.length > 0 && (
          <div>
            <dt className="text-text-muted">監修</dt>
            <dd className="mt-1 text-text">{reviewers.map((person) => person.name).join("、")}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
