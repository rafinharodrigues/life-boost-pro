'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface RadarDataPoint {
  pillar: string;
  value: number;
  fullMark: number;
}

interface PillarRadarChartProps {
  data: RadarDataPoint[];
}

export default function PillarRadarChart({ data }: PillarRadarChartProps) {
  return (
    <div className="bg-bg-secondary border border-white/6 rounded-xl p-4">
      <h3 className="text-text-primary text-sm font-semibold mb-3">
        Equil&iacute;brio dos Pilares
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.06)" />
          <PolarAngleAxis
            dataKey="pillar"
            tick={{ fill: '#9494A8', fontSize: 12 }}
          />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <Radar
            name="Balance"
            dataKey="value"
            stroke="#39FF14"
            strokeWidth={2}
            fill="#39FF14"
            fillOpacity={0.15}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
