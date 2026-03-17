'use client';

import { useState } from 'react';
import { Trophy, Lock, HelpCircle } from 'lucide-react';
import Card from '@/components/ui/card';
import ProgressBar from '@/components/ui/progress-bar';
import { useAchievementStore } from '@/store/achievement.store';
import { useUserStore } from '@/store/user.store';
import type { AchievementCategory } from '@/types';

const CATEGORY_TABS: { key: AchievementCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'streak', label: 'Streak' },
  { key: 'milestone', label: 'Marco' },
  { key: 'pillar', label: 'Pilar' },
  { key: 'challenge', label: 'Desafio' },
  { key: 'secret', label: 'Segredo' },
];

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState<AchievementCategory | 'all'>('all');

  const achievements = useAchievementStore((s) => s.achievements);
  const user = useUserStore((s) => s.user);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  const filtered =
    activeCategory === 'all'
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Title + count */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-2xl font-bold">Conquistas</h1>
        <span className="text-sm text-text-secondary">
          {unlockedCount} / {totalCount} desbloqueadas
        </span>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key)}
            className={
              tab.key === activeCategory
                ? 'inline-flex items-center rounded-lg bg-accent-primary/15 px-3 py-1.5 text-sm font-medium text-accent-primary'
                : 'inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium text-text-secondary hover:bg-white/5'
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((ach) => {
          /* Secret + locked */
          if (ach.isSecret && !ach.unlocked) {
            return (
              <Card key={ach.id} className="flex flex-col items-center gap-2 text-center">
                <HelpCircle className="h-8 w-8 text-text-tertiary" />
                <p className="font-semibold text-text-tertiary">???</p>
                <p className="text-xs text-text-tertiary">Conquista secreta</p>
              </Card>
            );
          }

          /* Unlocked */
          if (ach.unlocked) {
            return (
              <Card
                key={ach.id}
                className="flex flex-col items-center gap-2 text-center shadow-lg shadow-accent-amber/10"
                hover
              >
                <Trophy className="h-8 w-8 text-accent-amber" />
                <p className="font-semibold">{ach.name}</p>
                <p className="text-xs text-text-secondary">{ach.description}</p>
                <p className="text-[10px] text-text-tertiary">{ach.unlockedAt}</p>
              </Card>
            );
          }

          /* Locked + not secret */
          const hasProgress =
            ach.progress !== undefined && ach.progressMax !== undefined;
          const progressPercent = hasProgress
            ? Math.round((ach.progress! / ach.progressMax!) * 100)
            : 0;

          return (
            <Card key={ach.id} className="flex flex-col items-center gap-2 text-center">
              <Lock className="h-8 w-8 text-text-tertiary" />
              <p className="font-semibold text-text-secondary">{ach.name}</p>
              <p className="text-xs text-text-tertiary">{ach.condition}</p>
              {hasProgress && (
                <div className="w-full">
                  <ProgressBar value={progressPercent} size="sm" />
                  <p className="mt-1 font-mono text-[10px] text-text-tertiary">
                    {ach.progress} / {ach.progressMax}
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
