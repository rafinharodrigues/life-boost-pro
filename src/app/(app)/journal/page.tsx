'use client';

import { useState } from 'react';
import {
  BookHeart,
  Plus,
  Filter,
  Lock,
  Sparkles,
} from 'lucide-react';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import { mockJournalEntries } from '@/lib/mock-data';
import { PILLAR_CONFIG, MOOD_EMOJIS } from '@/types';
import type { Mood, PillarType } from '@/types';

const PILLAR_TAGS: { value: PillarType | 'general'; label: string }[] = [
  { value: 'health', label: 'Saude' },
  { value: 'intelligence', label: 'Estudos' },
  { value: 'gold', label: 'Financas' },
  { value: 'strength', label: 'Rotina' },
  { value: 'general', label: 'Geral' },
];

const PILLAR_COLORS: Record<string, string> = {
  health: '#00E676',
  intelligence: '#00D2FF',
  gold: '#FFAB00',
  strength: '#39FF14',
};

const moods: Mood[] = [1, 2, 3, 4, 5];

function formatDate(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr);
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return {
    day: String(d.getDate()).padStart(2, '0'),
    month: months[d.getMonth()],
  };
}

export default function JournalPage() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(4);
  const [selectedPillar, setSelectedPillar] = useState<PillarType | 'general'>('general');
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookHeart className="h-6 w-6 text-accent-primary" />
          <h1 className="text-2xl font-bold">Diario de Reflexao</h1>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4" />
          Nova entrada
        </Button>
      </div>

      {/* Prompt suggestion */}
      <Card className="border-accent-primary/20 bg-gradient-to-r from-accent-primary/5 to-transparent">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent-primary" />
          <div>
            <p className="text-sm font-medium text-text-primary">Reflexao do dia:</p>
            <p className="mt-1 text-sm text-text-secondary italic">
              &ldquo;O que voce aprendeu sobre si mesmo esta semana?&rdquo;
            </p>
          </div>
        </div>
      </Card>

      {/* Entry Form */}
      <Card>
        <h3 className="mb-4 text-base font-semibold">Nova reflexao</h3>

        {/* Mood selector */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium text-text-secondary">Como voce esta se sentindo?</p>
          <div className="flex items-center gap-2">
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={[
                  'flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-all',
                  selectedMood === mood
                    ? 'bg-accent-primary/20 border border-accent-primary scale-110'
                    : 'bg-bg-tertiary border border-transparent hover:bg-bg-elevated',
                ].join(' ')}
              >
                {MOOD_EMOJIS[mood]}
              </button>
            ))}
          </div>
        </div>

        {/* Pillar tags */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium text-text-secondary">Relacionado a</p>
          <div className="flex flex-wrap items-center gap-2">
            {PILLAR_TAGS.map((tag) => (
              <button
                key={tag.value}
                onClick={() => setSelectedPillar(tag.value)}
                className={[
                  'rounded-full px-3 py-1 text-xs font-medium transition-all',
                  selectedPillar === tag.value
                    ? 'bg-accent-primary/15 text-accent-primary border border-accent-primary/40'
                    : 'bg-bg-tertiary text-text-secondary border border-transparent hover:bg-bg-elevated',
                ].join(' ')}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva sua reflexao..."
            className="h-32 w-full resize-none rounded-lg border border-white/6 bg-bg-tertiary p-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-primary/40 focus:outline-none focus:ring-1 focus:ring-accent-primary/20"
          />
        </div>

        {/* Private toggle + Save */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsPrivate(!isPrivate)}
            className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <div
              className={[
                'flex h-5 w-9 items-center rounded-full p-0.5 transition-colors',
                isPrivate ? 'bg-accent-primary' : 'bg-white/10',
              ].join(' ')}
            >
              <div
                className={[
                  'h-4 w-4 rounded-full bg-white transition-transform shadow-sm',
                  isPrivate ? 'translate-x-4' : 'translate-x-0',
                ].join(' ')}
              />
            </div>
            <Lock className="h-3.5 w-3.5" />
            <span className="text-xs">Entrada privada</span>
          </button>

          <Button variant="primary" size="sm">
            Salvar reflexao
          </Button>
        </div>
      </Card>

      {/* Timeline */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
          Entradas anteriores
          <button className="ml-auto flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary">
            <Filter className="h-3.5 w-3.5" />
            Filtrar
          </button>
        </h3>

        <div className="relative space-y-0">
          {/* Vertical timeline line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-white/6" />

          {mockJournalEntries.map((entry, i) => {
            const { day, month } = formatDate(entry.createdAt);
            const pillarConfig = entry.pillarType ? PILLAR_CONFIG[entry.pillarType] : null;
            const pillarColor = entry.pillarType ? PILLAR_COLORS[entry.pillarType] : null;

            return (
              <div key={entry.id} className="relative flex gap-4 pb-4">
                {/* Left: date + dot */}
                <div className="flex w-[56px] shrink-0 flex-col items-center">
                  <div className="text-center">
                    <p className="text-xs font-bold text-text-primary">{day}</p>
                    <p className="text-[10px] text-text-tertiary">{month}</p>
                  </div>
                  {/* Dot on timeline */}
                  <div className="relative z-10 mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-bg-secondary bg-bg-tertiary">
                    <span className="text-xs">{MOOD_EMOJIS[entry.mood as Mood]}</span>
                  </div>
                </div>

                {/* Right: content card */}
                <Card className="flex-1">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">{MOOD_EMOJIS[entry.mood as Mood]}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary line-clamp-3">{entry.content}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {pillarConfig && pillarColor && (
                          <Badge
                            variant="pillar"
                            label={pillarConfig.label}
                            color={pillarColor}
                          />
                        )}
                        {entry.isPrivate && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-text-tertiary">
                            <Lock className="h-3 w-3" />
                            Privada
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
