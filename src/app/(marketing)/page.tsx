import Link from 'next/link';
import {
  Bot,
  Gamepad2,
  BarChart3,
  Trophy,
  Swords,
  ListChecks,
  TrendingUp,
  ArrowRight,
  Flame,
  Star,
  Shield,
  Users,
  Crown,
  ChevronRight,
  Check,
  Zap,
  Heart,
  BookOpen,
  Coins,
  Clock,
  Sparkles,
  Quote,
  Store,
  X,
} from 'lucide-react';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';

/* ───────────────────── DATA ───────────────────── */

const painPoints = [
  {
    emoji: '📱',
    text: 'Baixou 10 apps de produtividade e abandonou todos',
  },
  {
    emoji: '📊',
    text: 'Fez planilhas lindas que nunca mais abriu',
  },
  {
    emoji: '🎯',
    text: 'Definiu metas de Ano Novo que duraram até fevereiro',
  },
] as const;

const solutionCards = [
  {
    icon: Swords,
    title: 'Avatar que evolui com você',
    description:
      'Seu personagem sobe de nível quando você sobe. Cada tarefa completa é XP real na sua jornada.',
  },
  {
    icon: Bot,
    title: 'Mentor IA que te conhece',
    description:
      'Inteligência artificial que entende seu perfil e cria missões sob medida pro seu momento.',
  },
  {
    icon: Trophy,
    title: 'Sistema de XP real',
    description:
      'Conquistas, rankings, streaks e recompensas que tornam impossível parar.',
  },
] as const;

const features = [
  {
    icon: Bot,
    title: 'Mentor IA Pessoal',
    description: 'Missões personalizadas que se adaptam ao seu nível e evolução.',
    color: 'bg-accent-primary/10 text-accent-primary',
  },
  {
    icon: BarChart3,
    title: 'Analytics Profundo',
    description: 'Radar chart, heatmap, insights inteligentes e previsões de progresso.',
    color: 'bg-accent-cyan/10 text-accent-cyan',
  },
  {
    icon: Trophy,
    title: 'Conquistas & Rankings',
    description: 'Badges, leaderboards semanais e títulos épicos para desbloquear.',
    color: 'bg-accent-amber/10 text-accent-amber',
  },
  {
    icon: BookOpen,
    title: 'Diário Inteligente',
    description: 'Reflexões analisadas por IA com detecção de padrões de humor.',
    color: 'bg-accent-pink/10 text-accent-pink',
  },
  {
    icon: Store,
    title: 'Loja de Recompensas',
    description: 'Crie suas próprias recompensas e resgate com ouro conquistado.',
    color: 'bg-pillar-gold/10 text-pillar-gold',
  },
  {
    icon: Users,
    title: 'Guildas & Desafios',
    description: 'Coopere com amigos, participe de desafios temáticos e eventos.',
    color: 'bg-pillar-intelligence/10 text-pillar-intelligence',
  },
] as const;

const howItWorks = [
  {
    number: '1',
    icon: Swords,
    title: 'Crie seu personagem',
    description: 'Escolha sua classe, defina suas prioridades e monte seu avatar.',
  },
  {
    number: '2',
    icon: ListChecks,
    title: 'Complete missões diárias',
    description: 'A IA cria desafios sob medida para seu nível e objetivos.',
  },
  {
    number: '3',
    icon: TrendingUp,
    title: 'Evolua e conquiste',
    description: 'Suba de nível, desbloqueie conquistas e domine o ranking.',
  },
] as const;

const testimonials = [
  {
    name: 'Marina S.',
    role: 'Designer',
    quote:
      'Finalmente um app que me mantém consistente. O sistema de XP é viciante!',
    stars: 5,
    color: 'bg-accent-pink',
  },
  {
    name: 'Pedro L.',
    role: 'Dev',
    quote:
      'O Mentor IA entende exatamente o que eu preciso. É como ter um coach pessoal.',
    stars: 5,
    color: 'bg-accent-cyan',
  },
  {
    name: 'Ana K.',
    role: 'Estudante',
    quote:
      'Meu streak de 45 dias no Life Boost PRO é a maior conquista do ano.',
    stars: 5,
    color: 'bg-accent-primary',
  },
] as const;

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  price: string;
  oldPrice?: string;
  period: string;
  tagline: string;
  badge?: string;
  highlight?: boolean;
  features: PlanFeature[];
  cta: string;
  ctaVariant: 'primary' | 'secondary';
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: 'R$0',
    period: '',
    tagline: 'Para experimentar',
    features: [
      { text: '15 tarefas', included: true },
      { text: '3 missões IA/dia', included: true },
      { text: 'Avatar base', included: true },
      { text: '10 conquistas', included: true },
      { text: '7 dias histórico', included: true },
      { text: 'Relatórios', included: false },
      { text: 'Mentor IA chat', included: false },
    ],
    cta: 'Começar Grátis',
    ctaVariant: 'secondary',
  },
  {
    name: 'Starter',
    price: 'R$9,90',
    period: '/mês',
    tagline: 'Para começar a evoluir',
    features: [
      { text: '50 tarefas', included: true },
      { text: '8 missões IA/dia', included: true },
      { text: 'Evolução avatar (5 estágios)', included: true },
      { text: '30 conquistas', included: true },
      { text: 'Relatório semanal', included: true },
      { text: '30 dias histórico', included: true },
      { text: 'Mentor IA chat', included: false },
    ],
    cta: 'Assinar',
    ctaVariant: 'secondary',
  },
  {
    name: 'Boost',
    price: 'R$19,90',
    oldPrice: 'R$29,90',
    period: '/mês',
    tagline: 'Mais popular',
    badge: '⭐ Recomendado',
    highlight: true,
    features: [
      { text: 'Tarefas ilimitadas', included: true },
      { text: '20 missões IA/dia', included: true },
      { text: 'Avatar completo + skins', included: true },
      { text: 'Todas conquistas (50+)', included: true },
      { text: 'Mentor IA chat', included: true },
      { text: 'Relatório detalhado', included: true },
      { text: '6 meses histórico', included: true },
    ],
    cta: 'Assinar Boost',
    ctaVariant: 'primary',
  },
  {
    name: 'Ultra',
    price: 'R$34,90',
    period: '/mês',
    tagline: 'Para quem quer tudo',
    badge: '👑 Premium',
    features: [
      { text: 'Tudo do Boost +', included: true },
      { text: 'Missões IA ilimitadas', included: true },
      { text: 'Skins exclusivas + efeitos', included: true },
      { text: 'Conquistas secretas', included: true },
      { text: 'Análise profunda IA', included: true },
      { text: 'Histórico ilimitado', included: true },
      { text: 'Suporte prioritário', included: true },
    ],
    cta: 'Assinar',
    ctaVariant: 'secondary',
  },
];

const faqs = [
  {
    q: 'Preciso pagar para usar?',
    a: 'Não! O plano Free é gratuito para sempre. Você pode usar as funcionalidades básicas sem pagar nada. Os planos pagos desbloqueiam recursos avançados como o Mentor IA e conquistas ilimitadas.',
  },
  {
    q: 'Como funciona a IA?',
    a: 'Nosso Mentor IA analisa seu perfil, seus hábitos e objetivos para criar missões personalizadas. Quanto mais você usa, mais inteligente ele fica — aprendendo o que funciona melhor para você.',
  },
  {
    q: 'Posso cancelar quando quiser?',
    a: 'Sim, sem multa e sem burocracia. Você pode cancelar seu plano a qualquer momento direto nas configurações da conta. Seu acesso continua até o fim do período pago.',
  },
  {
    q: 'Funciona no celular?',
    a: 'Sim, o Life Boost PRO é totalmente responsivo e funciona perfeitamente em qualquer dispositivo — celular, tablet ou desktop.',
  },
  {
    q: 'Meus dados são seguros?',
    a: 'Sim, levamos sua privacidade a sério. Estamos em total conformidade com a LGPD. Seus dados são criptografados e nunca compartilhados com terceiros.',
  },
] as const;

/* ───────────────────── PAGE ───────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* ══════════ HEADER ══════════ */}
      <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-white/6">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-accent-primary">
            ◆ Life Boost PRO
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-text-secondary hover:text-text-primary text-sm transition-colors"
            >
              Login
            </Link>
            <Link href="/register">
              <Button size="sm">Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ══════════ HERO ══════════ */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Pre-title badge */}
            <span className="inline-flex items-center text-xs bg-accent-primary/10 text-accent-primary px-3 py-1 rounded-full">
              🎮 A revolução da produtividade gamificada
            </span>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Pare de usar apps chatos.
              <br />
              Comece a jogar sua vida.
            </h1>

            <p className="text-lg text-text-secondary max-w-2xl">
              O Life Boost PRO transforma sua rotina em uma aventura RPG com IA.
              Crie seu avatar, complete missões personalizadas e evolua de
              verdade — enquanto se diverte.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/register">
                <Button size="xl">Começar Grátis</Button>
              </Link>
              <Link
                href="/quiz"
                className="text-accent-primary-light hover:text-accent-primary transition-colors font-medium"
              >
                Descobrir meu perfil →
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              {[
                { value: '2.4k+', label: 'jogadores' },
                { value: '94%', label: 'de retenção' },
                { value: '4.9 ★', label: 'avaliação' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-mono font-bold text-lg">
                    {stat.value}
                  </span>
                  <span className="text-xs text-text-tertiary">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="mt-16">
            <Card className="p-6 max-w-2xl relative overflow-hidden">
              {/* Subtle glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-primary/5 rounded-full blur-3xl" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center ring-2 ring-accent-primary/30">
                    <Swords className="w-6 h-6 text-accent-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Guerreiro Lvl 12</p>
                    <p className="text-text-tertiary text-xs">
                      2.450 / 3.000 XP
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-accent-amber bg-accent-amber/10 px-2 py-1 rounded-full">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm font-bold">7 dias</span>
                  </div>
                </div>
              </div>

              {/* XP bar */}
              <div className="w-full bg-white/6 rounded-full h-2.5 mb-6">
                <div className="h-full bg-gradient-to-r from-accent-primary to-accent-primary-light rounded-full w-4/5 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent-primary-light rounded-full shadow-lg shadow-accent-primary/40" />
                </div>
              </div>

              {/* Pillar bars */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Saúde', pct: 72, color: 'bg-pillar-health' },
                  {
                    label: 'Estudos',
                    pct: 58,
                    color: 'bg-pillar-intelligence',
                  },
                  { label: 'Finanças', pct: 45, color: 'bg-pillar-gold' },
                  { label: 'Rotina', pct: 85, color: 'bg-pillar-strength' },
                ].map((p) => (
                  <div key={p.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-secondary">
                        {p.label}
                      </span>
                      <span className="text-xs font-mono text-text-tertiary">
                        {p.pct}%
                      </span>
                    </div>
                    <div className="w-full bg-white/6 rounded-full h-1.5">
                      <div
                        className={`h-full rounded-full ${p.color}`}
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-white/6 my-4" />

              {/* Today's missions */}
              <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">
                Missões de hoje
              </p>
              <div className="space-y-2.5">
                {[
                  {
                    text: 'Treino de 30min',
                    done: true,
                    xp: 25,
                    pillar: 'Saúde',
                  },
                  {
                    text: 'Estudar TypeScript 1h',
                    done: true,
                    xp: 40,
                    pillar: 'Estudos',
                  },
                  {
                    text: 'Revisar orçamento mensal',
                    done: false,
                    xp: 30,
                    pillar: 'Finanças',
                  },
                  {
                    text: 'Organizar agenda da semana',
                    done: false,
                    xp: 20,
                    pillar: 'Rotina',
                  },
                ].map((m) => (
                  <div
                    key={m.text}
                    className="flex items-center gap-3 text-sm text-text-secondary"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                        m.done
                          ? 'bg-semantic-success border-semantic-success'
                          : 'border-white/15'
                      }`}
                    >
                      {m.done && (
                        <Check className="w-3 h-3 text-text-inverse" />
                      )}
                    </div>
                    <span
                      className={
                        m.done ? 'line-through text-text-tertiary' : ''
                      }
                    >
                      {m.text}
                    </span>
                    <span className="text-[10px] text-text-tertiary ml-auto">
                      {m.pillar}
                    </span>
                    <span
                      className={`text-xs font-bold font-mono ${m.done ? 'text-accent-green' : 'text-text-tertiary'}`}
                    >
                      +{m.xp} XP
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ══════════ PROBLEM / PAIN (PAS) ══════════ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-center">
            Você já tentou...
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {painPoints.map((point) => (
              <Card
                key={point.text}
                className="p-6 text-center space-y-3"
                hover
              >
                <span className="text-4xl">{point.emoji}</span>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {point.text}
                </p>
              </Card>
            ))}
          </div>

          <p className="text-xl lg:text-2xl font-bold text-center max-w-xl mx-auto leading-snug">
            O problema não é você.
            <br />
            <span className="text-accent-primary">
              É que esses apps são entediantes.
            </span>
          </p>
        </div>
      </section>

      {/* ══════════ SOLUTION ══════════ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-center max-w-xl mx-auto">
            E se organizar sua vida fosse tão{' '}
            <span className="text-accent-primary">viciante</span> quanto um
            jogo?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutionCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.title} className="p-6 space-y-4" hover>
                  <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent-primary" />
                  </div>
                  <h3 className="font-bold">{card.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {card.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURES (2x3 grid) ══════════ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
            Tudo que você precisa para evoluir
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-lg mx-auto">
            Ferramentas poderosas projetadas para manter você engajado e
            progredindo todos os dias.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} className="p-6 space-y-4" hover>
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center ${f.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm">{f.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {f.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-16">
            Como funciona?
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex items-center gap-8">
                  <div className="flex flex-col items-center gap-4 max-w-[200px] text-center">
                    <div className="w-20 h-20 rounded-full bg-accent-primary/10 border-2 border-accent-primary flex items-center justify-center relative">
                      <Icon className="w-8 h-8 text-accent-primary" />
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent-primary text-text-inverse text-xs font-bold flex items-center justify-center shadow-lg shadow-accent-primary/30">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm">{step.title}</h3>
                    <p className="text-text-secondary text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {i < howItWorks.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-text-tertiary hidden lg:block shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ SOCIAL PROOF ══════════ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
            Milhares de jogadores já estão evoluindo
          </h2>
          <p className="text-text-secondary text-center mb-12">
            Veja o que eles estão dizendo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6 space-y-4" hover>
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-accent-amber fill-accent-amber"
                    />
                  ))}
                </div>
                <div className="flex items-start gap-2">
                  <Quote className="w-5 h-5 text-text-tertiary shrink-0 mt-0.5" />
                  <p className="text-text-secondary text-sm leading-relaxed italic">
                    {t.quote}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div
                    className={`w-9 h-9 rounded-full ${t.color}/20 flex items-center justify-center`}
                  >
                    <span className="text-xs font-bold">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-text-tertiary">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PRICING ══════════ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
            Escolha seu plano
          </h2>
          <p className="text-text-secondary text-center mb-8">
            Comece grátis. Evolua quando quiser.
          </p>

          {/* Toggle (visual only — shows annual) */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="text-sm text-text-tertiary">Mensal</span>
            <div className="w-12 h-7 bg-accent-primary/20 rounded-full p-1 cursor-pointer">
              <div className="w-5 h-5 bg-accent-primary rounded-full ml-auto shadow-lg shadow-accent-primary/30" />
            </div>
            <span className="text-sm text-text-primary font-medium">
              Anual{' '}
              <span className="text-accent-primary text-xs">
                — Economize 33%
              </span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`p-6 relative flex flex-col ${
                  plan.highlight
                    ? 'border-accent-primary shadow-lg shadow-accent-primary/10'
                    : ''
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-accent-primary/10 text-accent-primary px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}

                <div className="space-y-2 mb-6">
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    {plan.oldPrice && (
                      <span className="text-sm text-text-tertiary line-through">
                        {plan.oldPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold font-mono">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-text-tertiary text-sm">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-text-tertiary text-xs">{plan.tagline}</p>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feat) => (
                    <div
                      key={feat.text}
                      className="flex items-center gap-2 text-sm"
                    >
                      {feat.included ? (
                        <Check className="w-4 h-4 text-accent-green shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-text-tertiary shrink-0" />
                      )}
                      <span
                        className={
                          feat.included
                            ? 'text-text-secondary'
                            : 'text-text-tertiary'
                        }
                      >
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href="/register" className="mt-auto">
                  <Button
                    variant={plan.ctaVariant}
                    className="w-full"
                    size="md"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">
            Perguntas frequentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.q} className="p-6">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-accent-primary shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed pl-6">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Sua jornada começa agora.
          </h2>
          <p className="text-text-secondary text-lg max-w-md mx-auto">
            Junte-se a milhares de jogadores que estão transformando suas vidas.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="xl">Criar Conta Grátis</Button>
            </Link>
            <Link
              href="/quiz"
              className="text-text-secondary hover:text-accent-primary transition-colors font-medium"
            >
              Descobrir meu perfil
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="border-t border-white/6 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
          <Link href="/" className="text-lg font-bold text-accent-primary">
            ◆ Life Boost PRO
          </Link>
          <div className="flex items-center gap-4 text-text-tertiary text-sm">
            <Link
              href="#"
              className="hover:text-text-secondary transition-colors"
            >
              Termos
            </Link>
            <span>·</span>
            <Link
              href="#"
              className="hover:text-text-secondary transition-colors"
            >
              Privacidade
            </Link>
            <span>·</span>
            <Link
              href="#"
              className="hover:text-text-secondary transition-colors"
            >
              Contato
            </Link>
          </div>
          <p className="text-text-tertiary text-sm">
            © 2026 Life Boost PRO. Todos os direitos reservados.
          </p>
          <p className="text-text-tertiary text-xs">Feito com 💚 e IA</p>
        </div>
      </footer>
    </div>
  );
}
