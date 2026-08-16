import type { Company, Person } from "@/lib/validation";

/** docs/05-page-template.md §50: 冒頭はコンパクトに、記事理解に必要な最低限の情報のみ */
export type CompactCompanyProfileProps = {
  company?: Company;
  industryLabel?: string;
  interviewees: Person[];
};

export function CompactCompanyProfile({ company, industryLabel, interviewees }: CompactCompanyProfileProps) {
  if (!company && interviewees.length === 0) return null;

  return (
    <div className="my-8 rounded-lg border border-border bg-primary-pale p-6">
      <p className="text-xs font-medium tracking-wide text-primary-dark">今回お話を聞いた会社</p>
      {company && (
        <div className="mt-2">
          <p className="text-lg font-bold text-text">{company.name}</p>
          {industryLabel && <p className="mt-1 text-sm text-text-secondary">{industryLabel}</p>}
          {company.description && <p className="mt-1 text-sm text-text-secondary">{company.description}</p>}
        </div>
      )}
      {interviewees.length > 0 && (
        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
          {interviewees.map((person) => (
            <div key={person.id}>
              <p className="font-bold text-text">{person.name}さん</p>
              {person.position && <p className="text-sm text-text-secondary">{person.position}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
