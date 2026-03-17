'use client';

import {
  BarChart3,
  TrendingUp,
  Target,
  Zap,
  ArrowUp,
  ArrowDown,
  Brain,
  Flame,
} from 'lucide-react';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import { useUserStore } from '@/store/user.store';
import { useTaskStore } from '@/store/task.store';
import { useAchievementStore } from '@/store/achievement.store';
import RadarChart from '@/components/charts/radar-chart';
import XpTrendChart from '@/components/charts/xp-trend-chart';
import DistributionChart from '@/components/charts/distribution-chart';
import WeeklyBars from '@/components/charts/weekly-bars';
import ActivityHeatmap from '@/components/charts/activity-heatmap';
import { mockWeeklyXpTrend, mockHeatmap, mockWeeklyActivity } from '@/lib/mock-data';
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
  const user = useUserStore((s) => s.user);
  const pillars = useUserStore((s) => s.pillars);
  const tasks = useTaskStore((s) => s.tasks);
  const getUnlockedCount = useAchievementStore((s) => s.getUnlockedCount);

  // KPIs calculated from stores
  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;
  const totalXpFromTasks = completedTasks.reduce((sum, t) => sum + t.xpReward, 0);
  const completionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  // Radar chart data from pillar levels
  const radarData = pillars.map((p) => ({
    pillar: PILLAR_LABELS[p.type],
    value: p.currentLevel,
    fullMark: 10,
  }));

  // Distribution data from tasks by pillar
  const pillarTaskCounts: Record<PillarType, number> = { health: 0, intelligence: 0, gold: 0, strength: 0 };
  tasks.forEach((t) => {
    pillarTaskCounts[t.pillarType]++;
  });

  const distributionData = (Object.keys(pillarTaskCounts) as PillarType[]).map((p) => ({
    name: PILLAR_LABELS[p],
    value: pillarTaskCounts[p],
    color: PILLAR_COLORS[p],
  }));

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
            <p className="font-mono text-2xl font-bold">
              {user.totalXp.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-text-tertiary">
              {totalXpFromTasks.toLocaleString('pt-BR')} XP de tarefas
            </p>
          </div>
        </Card>

        {/* Tarefas */}
        <Card>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Target className="h-4 w-4 text-accent-cyan" />
              <span className="text-xs text-text-secondary">Tarefas</span>
            </div>
            <p className="font-mono text-2xl font-bold">{completedCount}</p>
            <p className="text-xs text-text-tertiary">
              de {totalTasks} no total
            </p>
          </div>
        </Card>

        {/* Taxa conclusao */}
        <Card>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-accent-primary" />
              <span className="text-xs text-text-secondary">Taxa conclusao</span>
            </div>
            <p className="font-mono text-2xl font-bold text-accent-primary">
              {completionRate}%
            </p>
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
            <p className="font-mono text-2xl font-bold">{user.streakCount} dias</p>
            <p className="text-xs text-text-tertiary">atual</p>
            <p className="text-xs text-text-tertiary">Maior: {user.maxStreak}</p>
          </div>
        </Card>
      </div>

      {/* Row 2: XP Trend Chart */}
      <XpTrendChart data={mockWeeklyXpTrend} />

      {/* Row 3: Two columns — Radar + Distribution */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RadarChart data={radarData} />
        <DistributionChart data={distributionData} />
      </div>

      {/* Row 4: Heatmap Calendar */}
      <ActivityHeatmap data={mockHeatmap} />

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
