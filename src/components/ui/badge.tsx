interface BadgeProps {
  variant: 'pillar' | 'difficulty' | 'status' | 'source' | 'plan';
  label: string;
  color?: string;
  className?: string;
}

const variantDefaults: Record<BadgeProps['variant'], string> = {
  pillar: '#6C5CE7',
  difficulty: '#FFAB00',
  status: '#00E676',
  source: '#00D2FF',
  plan: '#FF4081',
};

export default function Badge({
  variant,
  label,
  color,
  className = '',
}: BadgeProps) {
  const resolvedColor = color ?? variantDefaults[variant];

  return (
    <span
      className={[
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium leading-none whitespace-nowrap',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        backgroundColor: `${resolvedColor}26`,
        color: resolvedColor,
      }}
    >
      {label}
    </span>
  );
}
