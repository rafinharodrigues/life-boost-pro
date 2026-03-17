'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

interface AchievementToastProps {
  name: string;
  description: string;
  xpBonus: number;
  onClose: () => void;
}

export default function AchievementToast({
  name,
  description,
  xpBonus,
  onClose,
}: AchievementToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed top-4 right-4 z-[90] max-w-sm rounded-xl border border-accent-amber/30 bg-bg-elevated p-4 shadow-lg shadow-accent-amber/10"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 rounded-md p-1 text-text-tertiary transition-colors hover:text-text-primary"
        aria-label="Fechar"
      >
        <X size={14} />
      </button>

      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex-shrink-0">
          <Trophy size={20} className="text-accent-amber" />
        </div>

        <div className="flex flex-col gap-1 pr-4">
          <span className="text-xs font-medium text-accent-amber">
            Conquista desbloqueada!
          </span>
          <span className="font-semibold text-text-primary">{name}</span>
          <span className="text-xs text-text-secondary">{description}</span>
          <span className="mt-1 font-mono text-xs text-accent-primary">
            +{xpBonus} XP bônus
          </span>
        </div>
      </div>
    </motion.div>
  );
}
