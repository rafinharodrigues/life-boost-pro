import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={[
        'bg-bg-secondary border border-white/6 rounded-xl p-4',
        hover
          ? 'transition-shadow duration-300 hover:shadow-lg hover:shadow-accent-primary/10 hover:border-white/10'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
