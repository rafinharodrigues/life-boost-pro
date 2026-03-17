'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DistributionDataPoint {
  name: string;
  value: number;
  color: string;
}

interface DistributionChartProps {
  data: DistributionDataPoint[];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: DistributionDataPoint }>;
}) {
  if (!active || !payload?.length) return null;

  const entry = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-[#18181F] px-3 py-2 text-sm shadow-xl">
      <div className="flex items-center gap-2 text-text-secondary">
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ backgroundColor: entry.payload.color }}
        />
        <span>{entry.name}:</span>
        <span className="font-mono text-text-primary">{entry.value}</span>
      </div>
    </div>
  );
}

function CenterLabel({ viewBox, total }: { viewBox?: { cx: number; cy: number }; total: number }) {
  if (!viewBox) return null;
  const { cx, cy } = viewBox;

  return (
    <g>
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-text-primary font-mono text-2xl font-bold"
        style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-mono), monospace' }}
      >
        {total}
      </text>
      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: 11, fill: '#9494A8' }}
      >
        tarefas
      </text>
    </g>
  );
}

export default function DistributionChart({ data }: DistributionChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-bg-secondary border border-white/6 rounded-xl p-4">
      <h3 className="text-text-primary text-sm font-semibold mb-3">
        Distribui&ccedil;&atilde;o por Pilar
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            nameKey="name"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <CenterLabel total={total} />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Manual legend */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        {data.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center gap-1.5 text-xs text-text-secondary"
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}</span>
            <span className="font-mono text-text-primary">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
