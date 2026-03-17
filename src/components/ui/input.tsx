'use client';

import { type InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = '',
  disabled = false,
  id,
  ...rest
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs text-text-secondary font-medium"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        disabled={disabled}
        className={[
          'h-10 px-3 rounded-lg bg-bg-input border text-sm text-text-primary placeholder:text-text-tertiary',
          'outline-none transition-colors duration-200',
          error
            ? 'border-semantic-error focus:border-semantic-error'
            : 'border-white/10 focus:border-accent-primary',
          disabled ? 'opacity-40 cursor-not-allowed' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />

      {error && (
        <span className="text-xs text-semantic-error">{error}</span>
      )}
    </div>
  );
}
