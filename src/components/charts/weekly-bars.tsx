'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface WeeklyBarDataPoint {
  day: string;
  xp: number;
}

interface WeeklyBarsProps {
  data: WeeklyBarDataPoint[];
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-white/10 bg-[#18181F] px-3 py-2 text-sm shadow-xl">
      <p className="mb-0.5 text-text-secondary">{label}</p>
      <p className="font-mono font-semibold text-text-primary">
        {payload[0].value} <span className="text-xs font-normal text-text-secondary">XP</span>
      </p>
    </div>
  );
}

export default function WeeklyBars({ data }: WeeklyBarsProps) {
  return (
    <div className="bg-bg-secondary border border-white/6 rounded-xl p-4">
      <h3 className="text-text-primary text-sm font-semibold mb-3">
        Atividade Semanal
      </h3>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <XAxis
            dataKey="day"
            tick={{ fill: '#9494A8', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar
            dataKey="xp"
            fill="#39FF14"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
