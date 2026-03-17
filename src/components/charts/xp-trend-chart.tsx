'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface XpTrendDataPoint {
  week: string;
  health: number;
  intelligence: number;
  gold: number;
  strength: number;
}

interface XpTrendChartProps {
  data: XpTrendDataPoint[];
}

const PILLAR_COLORS = {
  health: '#00E676',
  intelligence: '#00D2FF',
  gold: '#FFAB00',
  strength: '#39FF14',
} as const;

const PILLAR_LABELS: Record<string, string> = {
  health: 'Saude',
  intelligence: 'Inteligencia',
  gold: 'Ouro',
  strength: 'Forca',
};

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-white/10 bg-[#18181F] px-3 py-2 text-sm shadow-xl">
      <p className="mb-1 font-medium text-text-primary">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-text-secondary">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>{PILLAR_LABELS[entry.name] ?? entry.name}:</span>
          <span className="font-mono text-text-primary">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function CustomLegend({
  payload,
}: {
  payload?: Array<{ color: string; value: string }>;
}) {
  if (!payload?.length) return null;

  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5 text-xs text-text-secondary">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>{PILLAR_LABELS[entry.value] ?? entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function XpTrendChart({ data }: XpTrendChartProps) {
  return (
    <div className="bg-bg-secondary border border-white/6 rounded-xl p-4">
      <h3 className="text-text-primary text-sm font-semibold mb-3">
        Evolu&ccedil;&atilde;o de XP por Semana
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="week"
            tick={{ fill: '#9494A8', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#9494A8', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
          <Legend content={<CustomLegend />} />

          {(Object.keys(PILLAR_COLORS) as Array<keyof typeof PILLAR_COLORS>).map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={PILLAR_COLORS[key]}
              strokeWidth={2}
              dot={{ r: 3, fill: PILLAR_COLORS[key], strokeWidth: 0 }}
              activeDot={{ r: 5, fill: PILLAR_COLORS[key], strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
