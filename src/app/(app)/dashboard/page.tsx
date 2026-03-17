'use client';

import {
  Flame,
  Bot,
  Swords,
  HeartPulse,
  BookOpen,
  Coins,
  Clock,
  Trophy,
  TrendingUp,
  AlertTriangle,
  Target,
  MapPin,
  Zap,
  ChevronRight,
  Shield,
  ArrowUp,
  ArrowDown,
  Circle,
  CircleCheck,
  Plus,
} from 'lucide-react';
import Card from '@/components/ui/card';
import ProgressBar from '@/components/ui/progress-bar';
import Badge from '@/components/ui/badge';
import StreakFire from '@/components/ui/streak-fire';
import PillarRadarChart from '@/components/charts/radar-chart';
import WeeklyBars from '@/components/charts/weekly-bars';
import ActivityHeatmap from '@/components/charts/activity-heatmap';
import { useUserStore } from '@/store/user.store';
import { useTaskStore } from '@/store/task.store';
import { useAchievementStore } from '@/store/achievement.store';
import {
  mockBriefing,
  mockWeeklyActivity,
  mockHeatmap,
  mockWeeklyXpTrend,
  mockXpToday,
  mockXpAvgDaily,
  mockMentorMessage,
} from '@/lib/mock-data';
import { PILLAR_CONFIG } from '@/types';
import type { PillarType } from '@/types';
import Link from 'next/link';

const PILLAR_ICONS: Record<PillarType, typeof HeartPulse> = {
  health: HeartPulse,
  intelligence: BookOpen,
  gold: Coins,
  strength: Clock,
};

const PILLAR_COLORS: Record<PillarType, string> = {
  health: '#00E676',
  intelligence: '#00D2FF',
  gold: '#FFAB00',
  strength: '#39FF14',
};

const ALERT_ICONS: Record<string, { icon: typeof Flame; colorClass: string }> = {
  streak: { icon: Flame, colorClass: 'text-accent-amber' },
  pillar: { icon: Shield, colorClass: 'text-accent-cyan' },
  deadline: { icon: AlertTriangle, colorClass: 'text-semantic-error' },
};

export default function DashboardPage() {
  // ---- Store connections ----
  const user = useUserStore((s) => s.user);
  const pillars = useUserStore((s) => s.pillars);
  const gold = useUserStore((s) => s.gold);
  const tasks = useTaskStore((s) => s.tasks);
  const achievements = useAchievementStore((s) => s.achievements);
  const getNextAchievements = useAchievementStore((s) => s.getNextAchievements);

  // ---- Derived data ----
  const pendingTasks = tasks.filter((t) => t.status === 'pending');
  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const todayTasks = [...pendingTasks, ...completedTasks];
  const completedCount = completedTasks.length;
  const totalCount = todayTasks.length;

  const upcomingAchievements = getNextAchievements();

  // User level XP progress: use the average of all pillar XP percentages
  const avgXpPercent = pillars.length > 0
    ? Math.round(
        pillars.reduce((sum, p) => sum + (p.currentXp / p.xpToNextLevel) * 100, 0) / pillars.length
      )
    : 0;

  const xpDiffPercent = mockXpAvgDaily > 0
    ? Math.round(((mockXpToday - mockXpAvgDaily) / mockXpAvgDaily) * 100)
    : 0;
  const xpAboveAvg = xpDiffPercent >= 0;

  // Radar chart data: pillar levels mapped to 0-10 scale
  const radarData = pillars.map((p) => ({
    pillar: PILLAR_CONFIG[p.type].label,
    value: Math.min(p.currentLevel, 10),
    fullMark: 10,
  }));

  // ---- Handlers ----
  const handleCompleteTask = (taskId: string) => {
    useTaskStore.getState().completeTask(taskId);
  };

  return (
    <div className="space-y-6">
      {/* Grid layout */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* ===== LEFT COLUMN ===== */}
        <div className="space-y-4 lg:col-span-2">
          {/* 1. Briefing Diario IA (Hero Card) */}
          <Card className="border-accent-primary/30 bg-gradient-to-br from-bg-secondary to-bg-tertiary/50">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-accent-cyan" />
                <span className="text-sm font-semibold">Briefing Diario</span>
                <Badge variant="source" label="IA" color="#00D2FF" />
              </div>

              {/* Greeting */}
              <p className="text-sm text-text-secondary">{mockBriefing.greeting}</p>

              {/* Motivational phrase */}
              <div className="rounded-lg bg-accent-primary/5 px-4 py-3">
                <p className="text-base font-medium italic text-accent-primary">
                  &ldquo;{mockBriefing.motivationalPhrase}&rdquo;
                </p>
              </div>

              {/* Alerts */}
              <div className="space-y-2">
                {mockBriefing.alerts.map((alert, i) => {
                  const alertCfg = ALERT_ICONS[alert.type];
                  const AlertIcon = alertCfg.icon;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <AlertIcon className={`h-3.5 w-3.5 shrink-0 ${alertCfg.colorClass}`} />
                      <span className="text-xs text-text-secondary">{alert.message}</span>
                    </div>
                  );
                })}
              </div>

              {/* Priorities */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Prioridades de hoje
                </span>
                <ol className="space-y-1">
                  {mockBriefing.priorities.map((priority, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-primary/15 font-mono text-[10px] font-bold text-accent-primary">
                        {i + 1}
                      </span>
                      {priority}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Footer prediction */}
              <div className="flex items-center gap-1.5 border-t border-white/5 pt-3">
                <TrendingUp className="h-3.5 w-3.5 text-text-tertiary" />
                <span className="text-xs text-text-tertiary">{mockBriefing.levelPrediction}</span>
              </div>
            </div>
          </Card>

          {/* 2. Radar / Pillar Balance Chart */}
          <PillarRadarChart data={radarData} />

          {/* 3. 4 Pillar Cards */}
          <div className="grid grid-cols-2 gap-3">
            {pillars.map((pillar) => {
              const config = PILLAR_CONFIG[pillar.type];
              const PillarIcon = PILLAR_ICONS[pillar.type];
              const color = PILLAR_COLORS[pillar.type];
              const percent = Math.round((pillar.currentXp / pillar.xpToNextLevel) * 100);

              return (
                <Card key={pillar.type} hover>
                  <div
                    className="space-y-2"
                    style={{ borderLeft: `3px solid ${color}`, paddingLeft: 12 }}
                  >
                    <div className="flex items-center gap-2">
                      <PillarIcon className="h-4 w-4" style={{ color }} />
                      <span className="text-xs font-medium text-text-secondary">
                        {config.label}
                      </span>
                    </div>
                    <p className="font-mono text-lg font-bold">
                      Nivel {pillar.currentLevel}
                    </p>
                    <ProgressBar value={percent} size="sm" color={`bg-[${color}]`} />
                    <p className="font-mono text-xs text-text-tertiary">
                      {pillar.currentXp} / {pillar.xpToNextLevel} XP
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* 4. Missoes de Hoje */}
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold">Missoes de Hoje</h3>
              <Badge
                variant="status"
                label={`${completedCount}/${totalCount}`}
                color="#39FF14"
              />
            </div>
            <ul className="space-y-2">
              {pendingTasks.map((task) => (
                <li key={task.id} className="flex items-center gap-3">
                  <button
                    onClick={() => handleCompleteTask(task.id)}
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-text-tertiary transition-colors hover:border-accent-primary hover:bg-accent-primary/10"
                    aria-label={`Completar tarefa: ${task.title}`}
                  />
                  <span className="flex-1 text-sm">{task.title}</span>
                  {task.source === 'ai' && (
                    <Badge variant="source" label="IA" color="#00D2FF" />
                  )}
                  <span className="font-mono text-sm text-accent-primary">
                    +{task.xpReward} XP
                  </span>
                </li>
              ))}
              {completedTasks.map((task) => (
                <li key={task.id} className="flex items-center gap-3 opacity-60">
                  <CircleCheck className="h-5 w-5 shrink-0 text-accent-green" />
                  <span className="flex-1 text-sm line-through">{task.title}</span>
                  {task.source === 'ai' && (
                    <Badge variant="source" label="IA" color="#00D2FF" />
                  )}
                  <span className="font-mono text-sm text-text-tertiary">
                    +{task.xpReward} XP
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-white/5 pt-3">
              <Link
                href="/tasks"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-primary hover:text-accent-primary-light transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Nova tarefa
              </Link>
            </div>
          </Card>

          {/* 5. Heatmap de Atividade (90 dias) — Recharts component */}
          <ActivityHeatmap data={mockHeatmap} />
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="space-y-4 lg:col-span-1">
          {/* 6. Avatar + Nivel */}
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-bg-tertiary">
                <Swords className="h-7 w-7 text-text-tertiary" />
              </div>
              <h2 className="text-lg font-semibold">{user.displayName}</h2>
              <p className="text-xs text-text-tertiary">@joaowarrior</p>
              <p className="mt-2 font-mono text-lg font-bold">
                Nivel {user.currentLevel}
              </p>
              <div className="mt-2 w-full">
                <ProgressBar value={avgXpPercent} size="sm" />
              </div>
              <p className="mt-1 font-mono text-xs text-text-tertiary">
                {user.totalXp.toLocaleString('pt-BR')} XP total
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Badge
                  variant="plan"
                  label={user.plan === 'boost' ? 'Boost' : user.plan === 'ultra' ? 'Ultra' : user.plan === 'starter' ? 'Starter' : 'Free'}
                  color="#FFAB00"
                />
                <div className="flex items-center gap-1">
                  <Coins className="h-3.5 w-3.5 text-accent-amber" />
                  <span className="font-mono text-sm font-bold text-accent-amber">{gold}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* 7. Streak Card */}
          <Card>
            <div className="flex flex-col items-center text-center">
              <StreakFire count={user.streakCount} />
              <span className="mt-2 font-mono text-3xl font-bold">{user.streakCount}</span>
              <span className="text-xs text-text-secondary">dias consecutivos</span>
              <span className="mt-1 text-xs text-text-tertiary">
                Maior: {user.maxStreak} dias
              </span>
              <span className="mt-0.5 text-xs text-accent-primary">
                Multiplicador: {user.streakCount >= 30 ? '2x' : user.streakCount >= 14 ? '1.5x' : user.streakCount >= 7 ? '1.25x' : '1x'} XP
              </span>
            </div>
          </Card>

          {/* 8. XP Hoje */}
          <Card>
            <div className="flex flex-col items-center text-center">
              <Zap className="h-6 w-6 text-accent-primary" />
              <span className="mt-1 font-mono text-2xl font-bold">{mockXpToday}</span>
              <span className="text-xs text-text-secondary">XP hoje</span>
              <div className="mt-1 flex items-center gap-1">
                {xpAboveAvg ? (
                  <ArrowUp className="h-3 w-3 text-semantic-success" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-semantic-error" />
                )}
                <span
                  className={`text-xs ${xpAboveAvg ? 'text-semantic-success' : 'text-semantic-error'}`}
                >
                  {xpAboveAvg ? '+' : ''}{xpDiffPercent}% vs media
                </span>
              </div>
            </div>
          </Card>

          {/* 9. Conquistas Proximas */}
          <Card>
            <h3 className="mb-3 text-sm font-semibold">Proximas conquistas</h3>
            <div className="space-y-3">
              {upcomingAchievements.map((ach) => {
                const progress = ach.progress ?? 0;
                const max = ach.progressMax ?? 1;
                const percent = Math.round((progress / max) * 100);
                const remaining = max - progress;

                return (
                  <div key={ach.id} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-accent-amber" />
                      <span className="flex-1 text-sm">{ach.name}</span>
                    </div>
                    <ProgressBar value={percent} size="sm" />
                    <p className="text-[10px] text-text-tertiary">
                      faltam {remaining} &mdash; {progress}/{max}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 10. Ranking */}
          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Ranking Semanal</h3>
              <MapPin className="h-4 w-4 text-text-tertiary" />
            </div>
            <div className="mt-2 flex flex-col items-center text-center">
              <span className="font-mono text-xl font-bold">#47</span>
              <span className="mt-0.5 flex items-center gap-1 text-xs text-semantic-success">
                <ArrowUp className="h-3 w-3" />
                3 posicoes
              </span>
            </div>
            <div className="mt-3 border-t border-white/5 pt-2">
              <Link
                href="/ranking"
                className="flex items-center gap-1 text-xs font-medium text-accent-primary hover:text-accent-primary-light transition-colors"
              >
                Ver ranking
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>

          {/* 11. Mentor Quick Access */}
          <Card>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-accent-cyan" />
              <span className="text-sm font-semibold">Mentor IA</span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm italic text-text-secondary">
              {mockMentorMessage}
            </p>
            <div className="mt-3 border-t border-white/5 pt-2">
              <Link
                href="/mentor"
                className="flex items-center gap-1 text-xs font-medium text-accent-cyan hover:text-accent-cyan/80 transition-colors"
              >
                Falar com Mentor
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>

          {/* 12. Atividade Semanal — Recharts component */}
          <WeeklyBars data={mockWeeklyActivity} />
        </div>
      </div>
    </div>
  );
}
