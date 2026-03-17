'use client';

import { useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUiStore } from '@/store/ui.store';
import LevelUpOverlay from '@/components/ui/level-up-overlay';
import AchievementToast from '@/components/ui/achievement-toast';
import XpToast from '@/components/ui/xp-toast';

const toastColorMap: Record<string, string> = {
  xp: 'border-accent-primary/30 text-accent-primary',
  success: 'border-semantic-success/30 text-semantic-success',
  error: 'border-semantic-error/30 text-semantic-error',
  info: 'border-accent-cyan/30 text-accent-cyan',
};

export default function ToastProvider() {
  const toasts = useUiStore((s) => s.toasts);
  const levelUpData = useUiStore((s) => s.levelUpData);
  const achievementData = useUiStore((s) => s.achievementData);
  const removeToast = useUiStore((s) => s.removeToast);

  const closeLevelUp = useCallback(() => {
    useUiStore.setState({ levelUpData: null });
  }, []);

  const closeAchievement = useCallback(() => {
    useUiStore.setState({ achievementData: null });
  }, []);

  // Separate XP toasts from generic toasts
  const xpToasts = toasts.filter((t) => t.type === 'xp');
  const genericToasts = toasts.filter((t) => t.type !== 'xp');

  return (
    <>
      {/* Level up overlay */}
      <AnimatePresence>
        {levelUpData?.show && (
          <LevelUpOverlay level={levelUpData.newLevel} onClose={closeLevelUp} />
        )}
      </AnimatePresence>

      {/* Achievement toast */}
      <AnimatePresence>
        {achievementData?.show && (
          <AchievementToast
            key="achievement"
            name={achievementData.achievement.name}
            description={achievementData.achievement.description}
            xpBonus={achievementData.achievement.xpBonus}
            onClose={closeAchievement}
          />
        )}
      </AnimatePresence>

      {/* XP toasts — stacked bottom-right */}
      <AnimatePresence>
        {xpToasts.map((toast, i) => (
          <XpToast
            key={toast.id}
            xp={Number(toast.message) || 0}
            pillar={toast.pillar}
            index={i}
          />
        ))}
      </AnimatePresence>

      {/* Generic toasts — stacked bottom-right above XP toasts */}
      <AnimatePresence>
        {genericToasts.map((toast, i) => {
          const colorClasses =
            toastColorMap[toast.type] ?? toastColorMap.info;
          const offsetY = xpToasts.length * 56 + i * 56;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`fixed right-4 z-[80] flex items-center gap-2 rounded-lg border bg-bg-elevated/90 px-3 py-2 text-sm shadow-lg backdrop-blur-sm ${colorClasses}`}
              style={{ bottom: `${16 + offsetY}px` }}
            >
              <span>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-1 text-text-tertiary hover:text-text-primary transition-colors text-xs"
                aria-label="Fechar"
              >
                &times;
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
}
