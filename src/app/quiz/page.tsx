'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  HeartPulse,
  BookOpen,
  Coins,
  Clock,
  Sword,
  Wand2,
  Target,
  EyeOff,
  Heart,
  Wrench,
  Swords,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  Star,
  ChevronRight,
} from 'lucide-react';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';

/* ───────────────────── TYPES ───────────────────── */

interface Answers {
  pillars: string[];
  experience: string;
  quittingReason: string;
  competition: string;
  dailyTime: string;
  characterClass: string;
  selfRating: { saude: number; estudos: number; financas: number; rotina: number };
}

/* ───────────────────── DATA ───────────────────── */

const pillarOptions = [
  { id: 'saude', label: 'Saúde', icon: HeartPulse, color: 'text-pillar-health border-pillar-health bg-pillar-health/5' },
  { id: 'estudos', label: 'Estudos', icon: BookOpen, color: 'text-pillar-intelligence border-pillar-intelligence bg-pillar-intelligence/5' },
  { id: 'financas', label: 'Finanças', icon: Coins, color: 'text-pillar-gold border-pillar-gold bg-pillar-gold/5' },
  { id: 'rotina', label: 'Rotina', icon: Clock, color: 'text-accent-primary border-accent-primary bg-accent-primary/5' },
] as const;

const experienceOptions = ['Nunca usei', 'Já testei alguns', 'Uso vários'] as const;

const quittingOptions = [
  'Falta de motivação',
  'Muito complexo',
  'Esqueço de usar',
  'Não vejo resultado',
] as const;

const competitionOptions = [
  'Adoro competir! 🏆',
  'Um pouco, me motiva',
  'Prefiro cooperar',
  'Sou mais individual',
] as const;

const timeOptions = ['5 minutos', '15 minutos', '30 minutos', '1 hora+'] as const;

const characterClasses = [
  { id: 'guerreiro', label: 'Guerreiro', icon: Sword },
  { id: 'mago', label: 'Mago', icon: Wand2 },
  { id: 'arqueiro', label: 'Arqueiro', icon: Target },
  { id: 'ninja', label: 'Ninja', icon: EyeOff },
  { id: 'curandeiro', label: 'Curandeiro', icon: Heart },
  { id: 'engenheiro', label: 'Engenheiro', icon: Wrench },
] as const;

const classIcons: Record<string, typeof Swords> = {
  guerreiro: Sword,
  mago: Wand2,
  arqueiro: Target,
  ninja: EyeOff,
  curandeiro: Heart,
  engenheiro: Wrench,
};

const TOTAL_STEPS = 8;

/* ───────────────────── COMPONENT ───────────────────── */

export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    pillars: [],
    experience: '',
    quittingReason: '',
    competition: '',
    dailyTime: '',
    characterClass: '',
    selfRating: { saude: 6, estudos: 8, financas: 5, rotina: 7 },
  });

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0: return answers.pillars.length > 0;
      case 1: return answers.experience !== '';
      case 2: return answers.quittingReason !== '';
      case 3: return answers.competition !== '';
      case 4: return answers.dailyTime !== '';
      case 5: return answers.characterClass !== '';
      case 6: return true;
      case 7: return true;
      default: return false;
    }
  };

  const togglePillar = (id: string) => {
    setAnswers((prev) => ({
      ...prev,
      pillars: prev.pillars.includes(id)
        ? prev.pillars.filter((p) => p !== id)
        : [...prev.pillars, id],
    }));
  };

  const goNext = () => {
    if (currentStep < TOTAL_STEPS - 1) setCurrentStep((s) => s + 1);
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  /* ───── Render helpers ───── */

  const renderStep0 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-2">
          Qual área da sua vida você mais quer melhorar?
        </h2>
        <p className="text-text-secondary text-sm">Selecione uma ou mais.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {pillarOptions.map((p) => {
          const Icon = p.icon;
          const selected = answers.pillars.includes(p.id);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => togglePillar(p.id)}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 transition-all cursor-pointer ${
                selected
                  ? `${p.color} border-current`
                  : 'border-white/10 bg-bg-secondary hover:border-white/20'
              }`}
            >
              <Icon className={`w-8 h-8 ${selected ? '' : 'text-text-tertiary'}`} />
              <span className={`font-semibold text-sm ${selected ? '' : 'text-text-secondary'}`}>
                {p.label}
              </span>
              {selected && (
                <div className="w-5 h-5 rounded-full bg-accent-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-text-inverse" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderOptionButtons = (
    options: readonly string[],
    selected: string,
    onSelect: (val: string) => void,
  ) => (
    <div className="space-y-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect(opt)}
          className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all cursor-pointer text-sm font-medium ${
            selected === opt
              ? 'border-accent-primary bg-accent-primary/5 text-accent-primary'
              : 'border-white/10 bg-bg-secondary text-text-secondary hover:border-white/20'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl lg:text-3xl font-bold">
        Você já usou apps de produtividade antes?
      </h2>
      {renderOptionButtons(experienceOptions, answers.experience, (v) =>
        setAnswers((prev) => ({ ...prev, experience: v })),
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl lg:text-3xl font-bold">
        O que te faz desistir de apps assim?
      </h2>
      {renderOptionButtons(quittingOptions, answers.quittingReason, (v) =>
        setAnswers((prev) => ({ ...prev, quittingReason: v })),
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl lg:text-3xl font-bold">
        Você gosta de competir com outros?
      </h2>
      {renderOptionButtons(competitionOptions, answers.competition, (v) =>
        setAnswers((prev) => ({ ...prev, competition: v })),
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl lg:text-3xl font-bold">
        Quanto tempo por dia dedicaria?
      </h2>
      {renderOptionButtons(timeOptions, answers.dailyTime, (v) =>
        setAnswers((prev) => ({ ...prev, dailyTime: v })),
      )}
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-2">
          Qual classe de personagem te representa?
        </h2>
        <p className="text-text-secondary text-sm">Escolha uma classe.</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {characterClasses.map((c) => {
          const Icon = c.icon;
          const selected = answers.characterClass === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() =>
                setAnswers((prev) => ({ ...prev, characterClass: c.id }))
              }
              className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 transition-all cursor-pointer ${
                selected
                  ? 'border-accent-primary bg-accent-primary/5'
                  : 'border-white/10 bg-bg-secondary hover:border-white/20'
              }`}
            >
              <Icon
                className={`w-7 h-7 ${selected ? 'text-accent-primary' : 'text-text-tertiary'}`}
              />
              <span
                className={`text-xs font-semibold ${selected ? 'text-accent-primary' : 'text-text-secondary'}`}
              >
                {c.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStep6 = () => {
    const bars = [
      { key: 'saude' as const, label: 'Saúde', value: answers.selfRating.saude, color: 'bg-pillar-health' },
      { key: 'estudos' as const, label: 'Estudos', value: answers.selfRating.estudos, color: 'bg-pillar-intelligence' },
      { key: 'financas' as const, label: 'Finanças', value: answers.selfRating.financas, color: 'bg-pillar-gold' },
      { key: 'rotina' as const, label: 'Rotina', value: answers.selfRating.rotina, color: 'bg-accent-primary' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Como você avalia sua vida atual?
          </h2>
          <p className="text-text-secondary text-sm">
            Avalie cada área de 1 a 10.
          </p>
        </div>
        <div className="space-y-6">
          {bars.map((bar) => (
            <div key={bar.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{bar.label}</span>
                <span className="text-sm font-mono font-bold text-text-secondary">
                  {bar.value}/10
                </span>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-3 flex-1 rounded-sm transition-colors ${
                      i < bar.value ? bar.color : 'bg-white/8'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStep7 = () => {
    const SelectedClassIcon = classIcons[answers.characterClass] || Swords;
    const classLabel =
      characterClasses.find((c) => c.id === answers.characterClass)?.label ||
      'Guerreiro';

    const ratingBars = [
      { label: 'Saúde', value: answers.selfRating.saude, color: 'bg-pillar-health' },
      { label: 'Estudos', value: answers.selfRating.estudos, color: 'bg-pillar-intelligence' },
      { label: 'Finanças', value: answers.selfRating.financas, color: 'bg-pillar-gold' },
      { label: 'Rotina', value: answers.selfRating.rotina, color: 'bg-accent-primary' },
    ];

    const boostFeatures = [
      'Tarefas ilimitadas',
      '20 missões IA/dia',
      'Avatar completo + skins',
      'Todas conquistas (50+)',
      'Mentor IA chat',
    ];

    return (
      <div className="space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-accent-primary mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold">
            Seu perfil está pronto!
          </h2>
        </div>

        {/* Avatar & Class */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-accent-primary/15 border-2 border-accent-primary flex items-center justify-center shadow-lg shadow-accent-primary/20">
            <SelectedClassIcon className="w-10 h-10 text-accent-primary" />
          </div>
          <p className="text-lg font-bold">
            Classe: <span className="text-accent-primary">{classLabel}</span>
          </p>
        </div>

        {/* Pillar bars */}
        <Card className="p-5 space-y-4">
          <p className="text-xs text-text-tertiary uppercase tracking-wider">
            Seu balanço atual
          </p>
          {ratingBars.map((bar) => (
            <div key={bar.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">{bar.label}</span>
                <span className="text-xs font-mono font-bold text-text-tertiary">
                  {bar.value}/10
                </span>
              </div>
              <div className="w-full bg-white/6 rounded-full h-2">
                <div
                  className={`h-full rounded-full ${bar.color} transition-all`}
                  style={{ width: `${bar.value * 10}%` }}
                />
              </div>
            </div>
          ))}
        </Card>

        {/* Recommended plan */}
        <Card className="p-6 border-accent-primary space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent-amber fill-accent-amber" />
            <h3 className="font-bold">Plano recomendado: Boost</h3>
          </div>
          <div className="space-y-2">
            {boostFeatures.map((feat) => (
              <div key={feat} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-accent-green shrink-0" />
                <span className="text-text-secondary">{feat}</span>
              </div>
            ))}
          </div>
          <div className="flex items-baseline gap-1 pt-2">
            <span className="text-sm text-text-tertiary line-through">
              R$29,90
            </span>
            <span className="text-2xl font-bold font-mono">R$19,90</span>
            <span className="text-text-tertiary text-sm">/mês</span>
          </div>
        </Card>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3">
          <Button
            size="xl"
            className="w-full"
            onClick={() => router.push('/register')}
          >
            Criar Conta e Começar
          </Button>
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="text-text-tertiary hover:text-text-secondary text-sm transition-colors cursor-pointer"
          >
            ou comece grátis
          </button>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderStep0();
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      case 7: return renderStep7();
      default: return null;
    }
  };

  const isResultScreen = currentStep === 7;

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      {/* Progress bar */}
      <div className="w-full h-1 bg-white/6">
        <div
          className="h-full bg-accent-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 max-w-xl mx-auto w-full">
        <span className="text-xs text-text-tertiary">
          {isResultScreen
            ? 'Resultado'
            : `Pergunta ${currentStep + 1} de ${TOTAL_STEPS}`}
        </span>
        {!isResultScreen && (
          <button
            type="button"
            onClick={goNext}
            className="text-xs text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
          >
            Pular
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-xl w-full">{renderCurrentStep()}</div>
      </div>

      {/* Navigation */}
      {!isResultScreen && (
        <div className="px-4 py-6 max-w-xl mx-auto w-full flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <Button onClick={goNext} disabled={!canProceed()}>
            Próximo
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
