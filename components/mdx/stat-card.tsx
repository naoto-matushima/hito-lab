/** docs/06-brand-ui.md §42: 大きな数字＋短い説明。一画面に大量表示しない */
export type StatCardProps = {
  value: string;
  label: string;
  context?: string;
};

export function StatCard({ value, label, context }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 text-center">
      <p className="text-4xl font-bold text-text">{value}</p>
      <p className="mt-2 text-sm font-medium text-text-secondary">{label}</p>
      {context && <p className="mt-1 text-xs text-text-muted">{context}</p>}
    </div>
  );
}

export type StatCardGroupProps = {
  children: React.ReactNode;
};

export function StatCardGroup({ children }: StatCardGroupProps) {
  return <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">{children}</div>;
}
