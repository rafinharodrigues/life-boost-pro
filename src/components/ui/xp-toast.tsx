'use client';

import { motion } from 'framer-motion';

interface XpToastProps {
  xp: number;
  pillar?: string;
  index?: number;
}

export default function XpToast({ xp, pillar, index = 0 }: XpToastProps) {
  const offsetY = index * 56;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed right-4 z-[80] flex items-center gap-2 rounded-lg bg-bg-elevated/90 border border-accent-primary/20 px-3 py-2 shadow-lg shadow-accent-primary/10 backdrop-blur-sm"
      style={{ bottom: `${16 + offsetY}px` }}
    >
      <span className="font-mono font-bold text-accent-primary text-sm">
        +{xp} XP
      </span>
      {pillar && (
        <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-medium text-text-secondary uppercase tracking-wide">
          {pillar}
        </span>
      )}
    </motion.div>
  );
}
