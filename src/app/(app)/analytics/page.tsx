import {
  BarChart3,
  TrendingUp,
  Target,
  Calendar,
  Zap,
  ArrowUp,
  ArrowDown,
  Brain,
  Flame,
} from 'lucide-react';
import Card from '@/components/ui/card';
import ProgressBar from '@/components/ui/progress-bar';
import Badge from '@/components/ui/badge';
import {
  mockPillars,
  mockWeeklyActivity,
  mockHeatmap,
  mockWeeklyXpTrend,
  mockAchievements,
  mockTasks,
  mockUser,
} from '@/lib/mock-data';
import { PILLAR_CONFIG } from '@/types';
import type { PillarType } from '@/types';

const PILLAR_COLORS: Record<PillarType, string> = {
  health: '#00E676',
  intelligence: '#00D2FF',
  gold: '#FFAB00',
  strength: '#39FF14',
};

const PILLAR_LABELS: Record<PillarType, string> = {
  health: 'Saude',
  intelligence: 'Estudos',
  gold: 'Financas',
  strength: 'Rotina',
};

const periods = ['7d', '30d', '90d', '6m', '1 ano'] as const;

const comparisonRows = [
  { metric: 'XP ganho', thisWeek: '620', lastWeek: '540', change: +14.8, positive: true },
  { metric: 'Tarefas', thisWeek: '18', lastWeek: '15', change: +20, positive: true },
  { metric: 'Taxa', thisWeek: '87%', lastWeek: '82%', change: +6.1, positive: true },
  { metric: 'Streak', thisWeek: '12', lastWeek: '9', change: +33.3, positive: true },
];

const insights = [
  'Seu melhor dia da semana e Terca-feira — 42% mais produtivo',
  'Voce completa mais tarefas entre 9h e 12h',
  'Pilar de Saude caiu 23% nas ultimas 2 semanas',
  'Seu streak atual e 3x maior que a media dos usuarios',
  'Taxa de conclusao de missoes IA: 91% (excelente)',
];

export default function AnalyticsPage() {
  // Compute max XP across all weekly trend data for scaling bars
  const allXpValues = mockWeeklyXpTrend.flatMap((w) => [
    w.health,
    w.intelligence,
    w.gold,
    w.strength,
  ]);
  const maxWeeklyXp = Math.max(...allXpValues, 1);

  // Heatmap month labels
  const heatmapMonths: { label: string; colStart: number }[] = [];
  let lastMonth = -1;
  mockHeatmap.forEach((day, i) => {
    const date = new Date(day.date);
    const month = date.getMonth();
    if (month !== lastMonth) {
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      heatmapMonths.push({ label: monthNames[month], colStart: Math.floor(i / 7) });
      lastMonth = month;
    }
  });

  // Organize heatmap into weeks (columns) of 7 days (rows)
  const heatmapWeeks: (typeof mockHeatmap)[] = [];
  for (let i = 0; i < mockHeatmap.length; i += 7) {
    heatmapWeeks.push(mockHeatmap.slice(i, i + 7));
  }

  // Pillar distribution percentages
  const pillarTaskCounts: Record<PillarType, number> = { health: 0, intelligence: 0, gold: 0, strength: 0 };
  mockTasks.forEach((t) => {
    pillarTaskCounts[t.pillarType]++;
  });
  const totalTasks = mockTasks.length;

  return (
    <div className="space-y-6">
      {/* Page title + period selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-accent-primary" />
          <h1 className="text-2xl font-bold">Analytics &amp; Insights</h1>
        </div>

        <div className="flex items-center gap-1.5">
          {periods.map((p) => (
            <button
              key={p}
              className={[
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                p === '30d'
                  ? 'bg-accent-primary/15 text-accent-primary'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary',
              ].join(' ')}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: 4 KPI Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {/* XP Total */}
        <Card>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-accent-primary" />
              <span className="text-xs text-text-secondary">XP Total</span>
            </div>
            <p className="font-mono text-2xl font-bold">2.340</p>
            <p className="text-xs text-text-tertiary">XP no periodo</p>
            <p className="text-xs text-semantic-success">+18% ↑</p>
          </div>
        </Card>

        {/* Tarefas */}
        <Card>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-accent-cyan" />
              <span className="text-xs text-text-secondary">Tarefas</span>
            </div>
            <p className="font-mono text-2xl font-bold">47</p>
            <p className="text-xs text-text-tertiary">no periodo</p>
            <p className="text-xs text-semantic-success">+5 vs anterior</p>
          </div>
        </Card>

        {/* Taxa conclusao */}
        <Card>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-accent-primary" />
              <span className="text-xs text-text-secondary">Taxa conclusao</span>
            </div>
            <p className="font-mono text-2xl font-bold text-accent-primary">87%</p>
            <p className="text-xs text-text-tertiary">conclusao</p>
          </div>
        </Card>

        {/* Streak */}
        <Card>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-accent-amber" />
              <span className="text-xs text-text-secondary">Streak</span>
            </div>
            <p className="font-mono text-2xl font-bold">12 dias</p>
            <p className="text-xs text-text-tertiary">atual</p>
            <p className="text-xs text-text-tertiary">Maior: 34</p>
          </div>
        </Card>
      </div>

      {/* Row 2: XP Trend Chart */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">Evolucao de XP por Semana</h3>
          <div className="flex items-center gap-3">
            {(['health', 'intelligence', 'gold', 'strength'] as PillarType[]).map((p) => (
              <div key={p} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: PILLAR_COLORS[p] }}
                />
                <span className="text-[10px] text-text-tertiary">{PILLAR_LABELS[p]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-end gap-2" style={{ height: 180 }}>
          {mockWeeklyXpTrend.map((week) => (
            <div key={week.week} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full items-end justify-center gap-[2px]" style={{ height: 150 }}>
                {(['health', 'intelligence', 'gold', 'strength'] as PillarType[]).map((pillar) => {
                  const val = week[pillar];
                  const barHeight = Math.max((val / maxWeeklyXp) * 100, 3);
                  return (
                    <div
                      key={pillar}
                      className="flex-1 rounded-t transition-all"
                      style={{
                        height: `${barHeight}%`,
                        backgroundColor: PILLAR_COLORS[pillar],
                        maxWidth: 12,
                      }}
                    />
                  );
                })}
              </div>
              <span className="text-[10px] text-text-tertiary">{week.week}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Row 3: Two columns */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Left: Balance/Radar */}
        <Card>
          <h3 className="mb-4 text-base font-semibold">Equilibrio dos Pilares</h3>
          <div className="space-y-3">
            {mockPillars.map((pillar) => {
              const percent = Math.round((pillar.currentLevel / 20) * 100);
              return (
                <div key={pillar.type} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: PILLAR_COLORS[pillar.type] }}
                      />
                      <span className="text-sm text-text-primary">
                        {PILLAR_LABELS[pillar.type]}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-text-secondary">
                      Nv. {pillar.currentLevel}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/6">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: PILLAR_COLORS[pillar.type],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right: Distribution */}
        <Card>
          <h3 className="mb-4 text-base font-semibold">Distribuicao por Pilar</h3>

          {/* Stacked bar */}
          <div className="mb-4 flex h-4 w-full overflow-hidden rounded-full">
            {(['health', 'intelligence', 'gold', 'strength'] as PillarType[]).map((p) => {
              const pct = totalTasks > 0 ? (pillarTaskCounts[p] / totalTasks) * 100 : 25;
              return (
                <div
                  key={p}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: PILLAR_COLORS[p],
                  }}
                />
              );
            })}
          </div>

          <div className="space-y-2.5">
            {(['health', 'intelligence', 'gold', 'strength'] as PillarType[]).map((p) => {
              const count = pillarTaskCounts[p];
              const pct = totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0;
              return (
                <div key={p} className="flex items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 rounded"
                    style={{ backgroundColor: PILLAR_COLORS[p] }}
                  />
                  <span className="flex-1 text-sm text-text-primary">{PILLAR_LABELS[p]}</span>
                  <span className="font-mono text-xs text-text-secondary">{count} tarefas</span>
                  <span className="font-mono text-xs text-text-tertiary">{pct}%</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Row 4: Heatmap Calendar */}
      <Card>
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-accent-primary" />
          <h3 className="text-base font-semibold">Mapa de Atividade</h3>
        </div>

        {/* Month labels */}
        <div className="mb-1 flex gap-[3px] pl-0">
          {heatmapMonths.map((m, i) => (
            <span
              key={`${m.label}-${i}`}
              className="text-[10px] text-text-tertiary"
              style={{
                marginLeft: i === 0 ? m.colStart * 15 : undefined,
                width: i < heatmapMonths.length - 1
                  ? (heatmapMonths[i + 1].colStart - m.colStart) * 15
                  : undefined,
              }}
            >
              {m.label}
            </span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-[3px] overflow-x-auto pb-2">
          {heatmapWeeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => {
                let intensity = 'bg-white/4';
                if (day.xp > 0 && day.xp <= 30) intensity = 'bg-accent-primary/20';
                else if (day.xp > 30 && day.xp <= 80) intensity = 'bg-accent-primary/40';
                else if (day.xp > 80 && day.xp <= 130) intensity = 'bg-accent-primary/60';
                else if (day.xp > 130) intensity = 'bg-accent-primary/90';

                return (
                  <div
                    key={day.date}
                    className={`h-3 w-3 rounded-sm ${intensity}`}
                    title={`${day.date}: ${day.xp} XP, ${day.tasks} tarefas`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-2 flex items-center gap-1 justify-end">
          <span className="text-[10px] text-text-tertiary mr-1">Menos</span>
          <div className="h-3 w-3 rounded-sm bg-white/4" />
          <div className="h-3 w-3 rounded-sm bg-accent-primary/20" />
          <div className="h-3 w-3 rounded-sm bg-accent-primary/40" />
          <div className="h-3 w-3 rounded-sm bg-accent-primary/60" />
          <div className="h-3 w-3 rounded-sm bg-accent-primary/90" />
          <span className="text-[10px] text-text-tertiary ml-1">Mais</span>
        </div>
      </Card>

      {/* Row 5: AI Insights */}
      <Card className="border-accent-primary/30">
        <div className="mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5 text-accent-primary" />
          <h3 className="text-base font-semibold">Insights da IA</h3>
          <Badge variant="source" label="IA" color="#39FF14" />
        </div>
        <ul className="space-y-3">
          {insights.map((insight, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-primary/10 text-[10px] font-bold text-accent-primary">
                {i + 1}
              </span>
              <p className="text-sm text-text-secondary">{insight}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* Row 6: Comparison Table */}
      <Card>
        <h3 className="mb-4 text-base font-semibold">Comparativo</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/6">
                <th className="pb-2 text-left text-xs font-medium text-text-tertiary">Metrica</th>
                <th className="pb-2 text-right text-xs font-medium text-text-tertiary">Esta Semana</th>
                <th className="pb-2 text-right text-xs font-medium text-text-tertiary">Semana Anterior</th>
                <th className="pb-2 text-right text-xs font-medium text-text-tertiary">Variacao</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.metric} className="border-b border-white/4">
                  <td className="py-2.5 text-text-primary">{row.metric}</td>
                  <td className="py-2.5 text-right font-mono">{row.thisWeek}</td>
                  <td className="py-2.5 text-right font-mono text-text-tertiary">{row.lastWeek}</td>
                  <td className="py-2.5 text-right">
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-xs ${
                        row.positive ? 'text-semantic-success' : 'text-semantic-error'
                      }`}
                    >
                      {row.positive ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      {Math.abs(row.change).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
