import { MapPin } from 'lucide-react';
import Card from '@/components/ui/card';
import { mockRanking } from '@/lib/mock-data';

const MEDAL: Record<number, string> = {
  1: '\uD83E\uDD47',
  2: '\uD83E\uDD48',
  3: '\uD83E\uDD49',
};

const TOP_BG: Record<number, string> = {
  1: 'bg-accent-amber/10 border-accent-amber/30',
  2: 'bg-white/5 border-white/15',
  3: 'bg-accent-amber/5 border-accent-amber/15',
};

const AVATAR_COLORS = [
  'bg-accent-primary',
  'bg-accent-cyan',
  'bg-accent-green',
  'bg-accent-amber',
  'bg-accent-pink',
  'bg-accent-red',
];

function avatarColor(index: number) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

const topPlayers = mockRanking.filter((r) => !r.isCurrentUser);
const currentUser = mockRanking.find((r) => r.isCurrentUser);

export default function RankingPage() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold">Ranking</h1>

      {/* Tab toggle */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-lg bg-accent-primary/15 px-4 py-1.5 text-sm font-medium text-accent-primary">
          Semanal
        </span>
        <span className="inline-flex items-center rounded-lg px-4 py-1.5 text-sm font-medium text-text-secondary hover:bg-white/5">
          All-Time
        </span>
      </div>

      {/* Countdown */}
      <p className="text-sm text-text-secondary">Reseta em 2d 14h</p>

      {/* Ranking list */}
      <div className="space-y-2">
        {topPlayers.map((entry, i) => {
          const isTop3 = entry.position <= 3;
          const medal = MEDAL[entry.position];
          const bgClass = isTop3
            ? TOP_BG[entry.position]
            : '';

          return (
            <Card
              key={entry.userId}
              className={isTop3 ? bgClass : ''}
              hover
            >
              <div className="flex items-center gap-3">
                {/* Position */}
                <span className="w-8 text-center font-mono text-sm font-bold text-text-secondary">
                  {medal ?? `#${entry.position}`}
                </span>

                {/* Avatar placeholder */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor(
                    i
                  )}`}
                >
                  {entry.displayName.slice(0, 2).toUpperCase()}
                </div>

                {/* Name + level */}
                <div className="flex-1">
                  <p className="text-sm font-semibold">{entry.displayName}</p>
                  <p className="font-mono text-xs text-text-secondary">
                    Lv. {entry.level}
                  </p>
                </div>

                {/* XP */}
                <span className="font-mono text-sm font-semibold text-accent-primary">
                  {entry.xpEarned.toLocaleString('pt-BR')} XP
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Current user (sticky-style) */}
      {currentUser && (
        <div className="sticky bottom-4">
          <Card className="border-accent-primary/50 shadow-lg shadow-accent-primary/10">
            <div className="flex items-center gap-3">
              {/* Position with pin */}
              <span className="flex w-8 items-center justify-center gap-1">
                <MapPin className="h-4 w-4 text-accent-primary" />
              </span>

              {/* Avatar */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-primary text-xs font-bold text-white">
                {currentUser.displayName.slice(0, 2).toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-sm font-semibold">{currentUser.displayName}</p>
                <p className="font-mono text-xs text-text-secondary">
                  Lv. {currentUser.level}
                </p>
              </div>

              {/* Position + XP */}
              <div className="text-right">
                <p className="font-mono text-sm font-semibold text-accent-primary">
                  {currentUser.xpEarned.toLocaleString('pt-BR')} XP
                </p>
                <p className="font-mono text-xs text-text-tertiary">
                  #{currentUser.position}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
