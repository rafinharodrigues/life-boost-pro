'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
  showLabel?: boolean;
}

const sizeClasses = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-5',
} as const;

export default function ProgressBar({
  value,
  size = 'md',
  color,
  label,
  showLabel = false,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="flex flex-col gap-1.5">
      {showLabel && label && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">{label}</span>
          <span className="text-xs text-text-tertiary">{clampedValue}%</span>
        </div>
      )}

      <div className={`w-full bg-white/6 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          className={[
            'h-full rounded-full',
            color ?? 'bg-gradient-to-r from-accent-primary to-accent-primary-light',
          ].join(' ')}
          initial={false}
          animate={{ width: `${clampedValue}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
