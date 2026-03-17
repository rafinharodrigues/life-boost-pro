'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';

const variantClasses = {
  primary:
    'bg-accent-primary hover:bg-accent-primary/80 text-text-inverse shadow-lg shadow-accent-primary/20',
  secondary:
    'bg-bg-tertiary hover:bg-bg-elevated text-text-primary border border-white/10',
  ghost:
    'bg-transparent hover:bg-white/5 text-text-secondary hover:text-text-primary',
  danger:
    'bg-semantic-error hover:bg-semantic-error/80 text-white shadow-lg shadow-semantic-error/20',
  success:
    'bg-semantic-success hover:bg-semantic-success/80 text-text-inverse shadow-lg shadow-semantic-success/20',
} as const;

const sizeClasses = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
  xl: 'h-14 px-8 text-lg gap-3',
} as const;

type ButtonVariant = keyof typeof variantClasses;
type ButtonSize = keyof typeof sizeClasses;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className ?? 'h-4 w-4'}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer select-none',
        variantClasses[variant],
        sizeClasses[size],
        isDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {loading && <Spinner className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />}
      {children}
    </button>
  );
}
