'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakFireProps {
  count: number;
  isAtRisk?: boolean;
}

export default function StreakFire({ count, isAtRisk = false }: StreakFireProps) {
  return (
    <div className="flex items-center gap-1.5">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: isAtRisk ? 1 : 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex items-center"
        style={{
          filter: `drop-shadow(0 0 6px var(--color-accent-amber)) drop-shadow(0 0 12px var(--color-accent-amber))`,
        }}
      >
        <Flame
          size={22}
          className={
            isAtRisk
              ? 'text-semantic-error'
              : 'text-accent-amber'
          }
        />
      </motion.div>
      <span
        className={[
          'font-mono font-bold text-sm',
          isAtRisk ? 'text-semantic-error' : 'text-accent-amber',
        ].join(' ')}
      >
        {count}
      </span>
    </div>
  );
}
