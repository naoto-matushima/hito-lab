/** docs/06-brand-ui.md §41: 背景=Pale Sage、数字=Charcoal/Sage Dark。重要な比較のみTerracotta可 */
export type KeyFindingProps = {
  headline: string;
  detail?: string;
};

export function KeyFinding({ headline, detail }: KeyFindingProps) {
  return (
    <div className="not-prose my-8 rounded-lg bg-primary-pale p-6">
      <p className="text-xs font-medium tracking-wide text-primary-dark">KEY FINDING</p>
      <p className="mt-3 text-2xl font-bold leading-snug text-text">{headline}</p>
      {detail && <p className="mt-2 text-sm text-text-secondary">{detail}</p>}
    </div>
  );
}
