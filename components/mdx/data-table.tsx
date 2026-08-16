/** docs/06-brand-ui.md §46・§79: Header=Pale Sage、横スクロール対応、必要な場合のみStripe */
export type DataTableProps = {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
  highlightColumnIndex?: number;
};

export function DataTable({ caption, columns, rows, highlightColumnIndex }: DataTableProps) {
  return (
    <figure className="not-prose my-8">
      <p className="text-sm font-bold text-text">{caption}</p>
      <div className="mt-3 overflow-x-auto rounded-md border border-border">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="bg-primary-pale">
              {columns.map((column, i) => (
                <th
                  key={column}
                  className={`whitespace-nowrap px-4 py-3 text-left font-medium text-text ${
                    i === highlightColumnIndex ? "text-primary-dark" : ""
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 1 ? "bg-surface-subtle" : undefined}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`whitespace-nowrap px-4 py-3 text-text-secondary ${
                      cellIndex === highlightColumnIndex ? "font-bold text-accent-dark" : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
