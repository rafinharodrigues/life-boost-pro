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
import { mockUser, mockPillars, mockAchievements, mockWeeklyActivity } from '@/lib/mock-data';
import { PILLAR_CONFIG } from '@/types';
import type { PillarType } from '@/types';

const pillarIconMap: Record<PillarType, React.ComponentType<{ className?: string; size?: number }>> = {
  health: HeartPulse,
  intelligence: BookOpen,
  gold: Coins,
  strength: Clock,
};

const stats = [
  { label: 'Tarefas completadas', value: '847' },
  { label: 'XP total', value: '125.400' },
  { label: 'Streak atual', value: '12 dias' },
  { label: 'Maior streak', value: '34 dias' },
  { label: 'Dias ativos', value: '94' },
  { label: 'Conquistas', value: '8 / 15' },
];

const unlockedAchievements = mockAchievements.filter((a) => a.unlocked).slice(0, 5);

export default function ProfilePage() {
  const xpPercent = Math.round(
    (mockPillars.reduce((s, p) => s + p.currentXp, 0) /
      mockPillars.reduce((s, p) => s + p.xpToNextLevel, 0)) *
      100,
  );

  const maxXp = Math.max(...mockWeeklyActivity.map((d) => d.xp), 1);

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
              <h2 className="text-xl font-bold text-text-primary">{mockUser.displayName}</h2>
              <p className="text-sm text-text-secondary">@joaowarrior</p>
            </div>

            {/* Level + XP bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-sm text-accent-primary-light">
                  Lv. {mockUser.currentLevel}
                </span>
                <span className="text-xs text-text-tertiary">
                  {mockUser.totalXp.toLocaleString('pt-BR')} XP
                </span>
              </div>
              <ProgressBar value={xpPercent} size="sm" />
            </div>

            {/* Plan badge */}
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-primary/15 text-accent-primary text-sm font-medium">
                Boost &#11088;
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
            {mockPillars.map((pillar) => {
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

          {/* Weekly activity chart */}
          <Card>
            <h3 className="text-sm font-semibold text-text-secondary mb-4">Atividade semanal</h3>
            <div className="flex items-end gap-2 h-32">
              {mockWeeklyActivity.map((day) => {
                const heightPct = day.xp > 0 ? Math.max((day.xp / maxXp) * 100, 8) : 4;
                return (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-text-tertiary">
                      {day.xp > 0 ? day.xp : ''}
                    </span>
                    <div
                      className="w-full rounded-t-md bg-accent-primary/60 transition-all"
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[10px] text-text-tertiary">{day.day}</span>
                  </div>
                );
              })}
            </div>
          </Card>

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
