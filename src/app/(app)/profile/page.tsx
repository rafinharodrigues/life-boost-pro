'use client';

import {
  Swords,
  Pencil,
  HeartPulse,
  BookOpen,
  Coins,
  Clock,
  Trophy,
} from 'lucide-react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import ProgressBar from '@/components/ui/progress-bar';
import { useUserStore } from '@/store/user.store';
import { useTaskStore } from '@/store/task.store';
import { useAchievementStore } from '@/store/achievement.store';
import { useJournalStore } from '@/store/journal.store';
import RadarChart from '@/components/charts/radar-chart';
import WeeklyBars from '@/components/charts/weekly-bars';
import { mockWeeklyActivity } from '@/lib/mock-data';
import { PILLAR_CONFIG } from '@/types';
import type { PillarType } from '@/types';

const pillarIconMap: Record<PillarType, React.ComponentType<{ className?: string; size?: number }>> = {
  health: HeartPulse,
  intelligence: BookOpen,
  gold: Coins,
  strength: Clock,
};

const PILLAR_LABELS: Record<PillarType, string> = {
  health: 'Saude',
  intelligence: 'Estudos',
  gold: 'Financas',
  strength: 'Rotina',
};

export default function ProfilePage() {
  const user = useUserStore((s) => s.user);
  const pillars = useUserStore((s) => s.pillars);
  const gold = useUserStore((s) => s.gold);
  const tasks = useTaskStore((s) => s.tasks);
  const achievements = useAchievementStore((s) => s.achievements);
  const journalEntries = useJournalStore((s) => s.entries);

  // Stats calculated from stores
  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const totalCompletedCount = completedTasks.length;
  const totalXp = user.totalXp;
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalAchievements = achievements.length;

  const stats = [
    { label: 'Tarefas completadas', value: String(totalCompletedCount) },
    { label: 'XP total', value: totalXp.toLocaleString('pt-BR') },
    { label: 'Streak atual', value: `${user.streakCount} dias` },
    { label: 'Maior streak', value: `${user.maxStreak} dias` },
    { label: 'Entradas do diario', value: String(journalEntries.length) },
    { label: 'Conquistas', value: `${unlockedCount} / ${totalAchievements}` },
  ];

  const unlockedAchievements = achievements.filter((a) => a.unlocked).slice(0, 5);

  const xpPercent = Math.round(
    (pillars.reduce((s, p) => s + p.currentXp, 0) /
      pillars.reduce((s, p) => s + p.xpToNextLevel, 0)) *
      100,
  );

  // Radar chart data from pillar levels
  const radarData = pillars.map((p) => ({
    pillar: PILLAR_LABELS[p.type],
    value: p.currentLevel,
    fullMark: 10,
  }));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Meu Perfil</h1>
        <Button variant="ghost" size="sm">
          <Pencil size={16} />
          Editar
        </Button>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ===== Left column - Public profile ===== */}
        <div className="space-y-6">
          {/* Avatar & identity card */}
          <Card className="text-center space-y-4">
            {/* Avatar placeholder */}
            <div className="w-24 h-24 rounded-full bg-bg-tertiary mx-auto flex items-center justify-center border-2 border-accent-primary/30">
              <Swords size={36} className="text-accent-primary-light" />
            </div>

            {/* Name & username */}
            <div>
              <h2 className="text-xl font-bold text-text-primary">{user.displayName}</h2>
              <p className="text-sm text-text-secondary">@joaowarrior</p>
            </div>

            {/* Level + XP bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-sm text-accent-primary-light">
                  Lv. {user.currentLevel}
                </span>
                <span className="text-xs text-text-tertiary">
                  {user.totalXp.toLocaleString('pt-BR')} XP
                </span>
              </div>
              <ProgressBar value={xpPercent} size="sm" />
            </div>

            {/* Gold balance */}
            <div className="flex items-center justify-center gap-2">
              <Coins className="h-4 w-4 text-accent-amber" />
              <span className="font-mono text-sm font-semibold text-accent-amber">{gold} Gold</span>
            </div>

            {/* Plan badge */}
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-primary/15 text-accent-primary text-sm font-medium">
                {user.plan === 'boost' ? 'Boost \u2B50' : user.plan === 'ultra' ? 'Ultra \uD83D\uDC8E' : user.plan === 'starter' ? 'Starter' : 'Free'}
              </span>
            </div>

            {/* Member since */}
            <p className="text-sm text-text-secondary">Membro desde: Jan 2026</p>
          </Card>

          {/* Pillar detail cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Pilares
            </h3>
            {pillars.map((pillar) => {
              const config = PILLAR_CONFIG[pillar.type];
              const PillarIcon = pillarIconMap[pillar.type];
              const pct = Math.round((pillar.currentXp / pillar.xpToNextLevel) * 100);

              return (
                <Card key={pillar.type} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${config.color}/15`}>
                    <PillarIcon size={20} className={`text-${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text-primary">{config.label}</span>
                      <span className="text-xs font-mono text-text-tertiary">
                        Lv. {pillar.currentLevel}
                      </span>
                    </div>
                    <ProgressBar
                      value={pct}
                      size="sm"
                      color={`bg-${config.color}`}
                    />
                    <p className="text-[10px] text-text-tertiary mt-1">
                      {pillar.currentXp} / {pillar.xpToNextLevel} XP
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* ===== Right column - Stats ===== */}
        <div className="space-y-6">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <p className="text-xs text-text-secondary mb-1">{stat.label}</p>
                <p className="text-xl font-mono font-bold text-text-primary">{stat.value}</p>
              </Card>
            ))}
          </div>

          {/* Radar chart with pillar levels */}
          <RadarChart data={radarData} />

          {/* Weekly activity chart */}
          <WeeklyBars data={mockWeeklyActivity} />

          {/* Featured achievements */}
          <Card>
            <h3 className="text-sm font-semibold text-text-secondary mb-3">Conquistas em destaque</h3>
            <div className="flex gap-2 flex-wrap">
              {unlockedAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg bg-bg-tertiary min-w-[72px]"
                >
                  <div className="w-9 h-9 rounded-full bg-accent-amber/15 flex items-center justify-center">
                    <Trophy size={16} className="text-accent-amber" />
                  </div>
                  <span className="text-[10px] text-text-secondary text-center leading-tight">
                    {achievement.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
