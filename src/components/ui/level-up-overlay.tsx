'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface LevelUpOverlayProps {
  level: number;
  onClose: () => void;
}

const PARTICLE_COLORS = [
  'var(--color-accent-primary)',
  'var(--color-accent-cyan)',
  'var(--color-accent-amber)',
];

function generateParticles() {
  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const distance = 80 + Math.random() * 120;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      size: 4 + Math.random() * 6,
      delay: Math.random() * 0.3,
    };
  });
}

export default function LevelUpOverlay({ level, onClose }: LevelUpOverlayProps) {
  const prefersReduced = useReducedMotion();
  const particles = useMemo(() => generateParticles(), []);

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
      onClick={handleClick}
    >
      {/* Particles */}
      {!prefersReduced &&
        particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.5, delay: p.delay, ease: 'easeOut' }}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
            }}
          />
        ))}

      {/* Center content */}
      <motion.div
        initial={prefersReduced ? { opacity: 0 } : { scale: 0, opacity: 0 }}
        animate={prefersReduced ? { opacity: 1 } : { scale: [0, 1.1, 1], opacity: 1 }}
        transition={
          prefersReduced
            ? { duration: 0.2 }
            : { type: 'spring', stiffness: 200, damping: 12, duration: 0.6 }
        }
        className="flex flex-col items-center gap-2 select-none"
      >
        <span
          className="text-4xl font-bold text-accent-primary"
          style={{
            textShadow:
              '0 0 20px var(--color-accent-primary), 0 0 40px var(--color-accent-primary), 0 0 80px var(--color-accent-primary)',
          }}
        >
          LEVEL UP!
        </span>
        <span className="text-6xl font-mono font-bold text-white">
          Nível {level}
        </span>
      </motion.div>
    </motion.div>
  );
}
