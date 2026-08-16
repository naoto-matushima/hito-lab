/**
 * サーバー生成SVGの棒グラフ。11-open-issues.md B-2の推奨方式。
 * JSを使わずビルド時にSVGとして描画し、数値はテキストノードとして出力する
 * （docs/04-seo-aio.md §58のテキスト化方針と整合）。
 * docs/06-brand-ui.md §43: 基本系列=Sage、比較・注目系列=Terracotta、補助系列=Gray。
 */
export type ChartSeriesPoint = {
  seriesLabel: string;
  value: number;
};

export type ChartDataPoint = {
  label: string;
  values: ChartSeriesPoint[];
};

export type ChartProps = {
  title: string;
  unit: string;
  data: ChartDataPoint[];
  source: string;
  keyMessage?: string;
};

const SERIES_COLORS = ["var(--color-primary)", "var(--color-accent)", "var(--color-text-muted)"];

const GROUP_WIDTH = 110;
const BAR_GAP = 6;
const PLOT_HEIGHT = 220;
const PLOT_TOP = 40;
const LEFT_PADDING = 16;
const RIGHT_PADDING = 16;
const LABEL_MARGIN = 40;

export function Chart({ title, unit, data, source, keyMessage }: ChartProps) {
  const seriesLabels = data[0]?.values.map((v) => v.seriesLabel) ?? [];
  const seriesCount = seriesLabels.length || 1;
  const barWidth = (GROUP_WIDTH - BAR_GAP * (seriesCount + 1)) / seriesCount;
  const maxValue = Math.max(1, ...data.flatMap((d) => d.values.map((v) => v.value))) * 1.15;
  const chartWidth = LEFT_PADDING + RIGHT_PADDING + GROUP_WIDTH * data.length;
  const chartHeight = PLOT_TOP + PLOT_HEIGHT + LABEL_MARGIN;
  const baselineY = PLOT_TOP + PLOT_HEIGHT;

  return (
    <figure className="not-prose my-8">
      <p className="text-sm font-bold text-text">
        {title} <span className="font-normal text-text-muted">（単位：{unit}）</span>
      </p>
      <div className="mt-3 overflow-x-auto rounded-md border border-border bg-surface p-4">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          role="img"
          aria-label={`${title}（単位：${unit}）`}
          className="h-auto min-w-[480px]"
        >
          <title>{title}</title>
          {seriesLabels.map((label, i) => (
            <g key={label} transform={`translate(${LEFT_PADDING + i * 120}, 16)`}>
              <rect width="12" height="12" fill={SERIES_COLORS[i % SERIES_COLORS.length]} rx="2" />
              <text x="18" y="10" fontSize="11" fill="var(--color-text-secondary)">
                {label}
              </text>
            </g>
          ))}

          <line
            x1={LEFT_PADDING}
            y1={baselineY}
            x2={chartWidth - RIGHT_PADDING}
            y2={baselineY}
            stroke="var(--color-border)"
          />

          {data.map((point, groupIndex) => {
            const groupX = LEFT_PADDING + groupIndex * GROUP_WIDTH;
            return (
              <g key={point.label}>
                {point.values.map((v, seriesIndex) => {
                  const barHeight = (v.value / maxValue) * PLOT_HEIGHT;
                  const x = groupX + BAR_GAP + seriesIndex * (barWidth + BAR_GAP);
                  const y = baselineY - barHeight;
                  return (
                    <g key={v.seriesLabel}>
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={SERIES_COLORS[seriesIndex % SERIES_COLORS.length]}
                        rx="2"
                      />
                      <text x={x + barWidth / 2} y={y - 6} fontSize="11" textAnchor="middle" fill="var(--color-text)">
                        {v.value}
                      </text>
                    </g>
                  );
                })}
                <text
                  x={groupX + GROUP_WIDTH / 2}
                  y={baselineY + 20}
                  fontSize="12"
                  textAnchor="middle"
                  fill="var(--color-text-secondary)"
                >
                  {point.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      {keyMessage && <p className="mt-3 text-sm text-text-secondary">{keyMessage}</p>}
      <figcaption className="mt-2 text-xs text-text-muted">出典：{source}</figcaption>
    </figure>
  );
}
