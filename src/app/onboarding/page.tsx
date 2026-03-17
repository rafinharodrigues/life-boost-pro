'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sword,
  Wand2,
  Target,
  EyeOff,
  Heart,
  Wrench,
  HeartPulse,
  BookOpen,
  Wallet,
  CalendarCheck,
  ArrowLeft,
} from 'lucide-react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Card from '@/components/ui/card';

const TOTAL_STEPS = 5;

const avatars = [
  { id: 'guerreiro', icon: Sword, label: 'Guerreiro' },
  { id: 'mago', icon: Wand2, label: 'Mago' },
  { id: 'arqueiro', icon: Target, label: 'Arqueiro' },
  { id: 'ninja', icon: EyeOff, label: 'Ninja' },
  { id: 'curandeiro', icon: Heart, label: 'Curandeiro' },
  { id: 'engenheiro', icon: Wrench, label: 'Engenheiro' },
] as const;

const pillars = [
  {
    id: 'saude',
    icon: HeartPulse,
    label: 'Saúde',
    description: 'Exercícios, alimentação, sono',
    color: 'text-pillar-health',
    borderColor: 'border-pillar-health',
  },
  {
    id: 'estudos',
    icon: BookOpen,
    label: 'Estudos',
    description: 'Aprendizado, carreira, skills',
    color: 'text-pillar-intelligence',
    borderColor: 'border-pillar-intelligence',
  },
  {
    id: 'financas',
    icon: Wallet,
    label: 'Finanças',
    description: 'Economia, investimentos, controle',
    color: 'text-pillar-gold',
    borderColor: 'border-pillar-gold',
  },
  {
    id: 'rotina',
    icon: CalendarCheck,
    label: 'Rotina',
    description: 'Hábitos, produtividade, organização',
    color: 'text-pillar-strength',
    borderColor: 'border-pillar-strength',
  },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('João');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedPillars, setSelectedPillars] = useState<string[]>([]);

  function next() {
    if (currentStep < TOTAL_STEPS - 1) setCurrentStep((s) => s + 1);
  }

  function back() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  function togglePillar(id: string) {
    setSelectedPillars((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }

  function finish() {
    router.push('/dashboard');
  }

  const selectedAvatarData = avatars.find((a) => a.id === selectedAvatar);

  return (
    <div className="min-h-screen bg-bg-primary p-4 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-text-secondary text-sm">
          Etapa {currentStep + 1} de {TOTAL_STEPS}
        </span>
        <button
          type="button"
          onClick={() => router.push('/dashboard')}
          className="text-text-tertiary text-sm hover:text-text-secondary transition-colors cursor-pointer"
        >
          Pular
        </button>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-8">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
              i <= currentStep ? 'bg-accent-primary' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
        {/* Step 0 - Welcome */}
        {currentStep === 0 && (
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-bold">
              Transforme sua vida em um jogo
            </h1>
            <p className="text-text-secondary">
              Crie seu avatar, defina suas prioridades e comece a evoluir.
              Cada tarefa concluída te dá XP, cada hábito te sobe de nível.
            </p>
            <Button size="lg" onClick={next}>
              Começar
            </Button>
          </div>
        )}

        {/* Step 1 - Profile */}
        {currentStep === 1 && (
          <div className="w-full space-y-6">
            <h1 className="text-2xl font-bold text-center">
              Como quer ser chamado?
            </h1>
            <Input
              label="Nome de exibição"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
            />
            <Button size="lg" className="w-full" onClick={next}>
              Próximo
            </Button>
          </div>
        )}

        {/* Step 2 - Avatar */}
        {currentStep === 2 && (
          <div className="w-full space-y-6">
            <h1 className="text-2xl font-bold text-center">
              Escolha seu avatar
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {avatars.map((avatar) => {
                const Icon = avatar.icon;
                const isSelected = selectedAvatar === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar.id)}
                    className={`w-full aspect-square bg-bg-tertiary rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-accent-primary shadow-lg shadow-accent-primary/20'
                        : 'border-transparent hover:border-white/10'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        isSelected ? 'text-accent-primary' : 'text-text-secondary'
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        isSelected ? 'text-text-primary' : 'text-text-tertiary'
                      }`}
                    >
                      {avatar.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <Button size="lg" className="w-full" onClick={next}>
              Próximo
            </Button>
          </div>
        )}

        {/* Step 3 - Priorities */}
        {currentStep === 3 && (
          <div className="w-full space-y-6">
            <h1 className="text-2xl font-bold text-center">
              Quais são suas prioridades?
            </h1>
            <div className="space-y-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                const isSelected = selectedPillars.includes(pillar.id);
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => togglePillar(pillar.id)}
                    className={`w-full text-left rounded-xl border p-4 flex items-center gap-4 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-accent-primary bg-accent-primary/5'
                        : 'border-white/6 bg-bg-secondary hover:border-white/10'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${pillar.color} shrink-0`} />
                    <div>
                      <p className="font-medium text-sm">{pillar.label}</p>
                      <p className="text-text-tertiary text-xs">
                        {pillar.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <Button size="lg" className="w-full" onClick={next}>
              Próximo
            </Button>
          </div>
        )}

        {/* Step 4 - Summary */}
        {currentStep === 4 && (
          <div className="w-full space-y-6">
            <h1 className="text-2xl font-bold text-center">Tudo pronto!</h1>

            <Card className="p-6 space-y-4">
              {/* Name */}
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Nome</span>
                <span className="font-medium">{name || 'Jogador'}</span>
              </div>

              {/* Avatar */}
              <div className="flex items-center justify-between">
                <span className="text-text-secondary text-sm">Classe</span>
                <div className="flex items-center gap-2">
                  {selectedAvatarData ? (
                    <>
                      <selectedAvatarData.icon className="w-4 h-4 text-accent-primary" />
                      <span className="font-medium">
                        {selectedAvatarData.label}
                      </span>
                    </>
                  ) : (
                    <span className="text-text-tertiary">Nenhuma</span>
                  )}
                </div>
              </div>

              {/* Pillars */}
              <div>
                <span className="text-text-secondary text-sm block mb-2">
                  Prioridades
                </span>
                {selectedPillars.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedPillars.map((id) => {
                      const pillar = pillars.find((p) => p.id === id);
                      if (!pillar) return null;
                      const Icon = pillar.icon;
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1.5 bg-bg-tertiary rounded-lg px-3 py-1.5 text-xs font-medium"
                        >
                          <Icon className={`w-3.5 h-3.5 ${pillar.color}`} />
                          {pillar.label}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-text-tertiary text-xs">
                    Nenhuma selecionada
                  </span>
                )}
              </div>
            </Card>

            <Button size="xl" className="w-full" onClick={finish}>
              Começar Jornada!
            </Button>
          </div>
        )}
      </div>

      {/* Back button for steps 1-4 */}
      {currentStep > 0 && (
        <div className="mt-4 max-w-lg mx-auto w-full">
          <Button variant="ghost" onClick={back} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      )}
    </div>
  );
}
