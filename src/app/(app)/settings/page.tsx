'use client';

import { useState } from 'react';
import {
  User,
  CreditCard,
  Palette,
  Shield,
  Bell,
  Globe,
  Download,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import Card from '@/components/ui/card';

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

function Toggle({ enabled, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer',
        enabled ? 'bg-accent-primary' : 'bg-bg-tertiary',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200',
          enabled ? 'translate-x-6' : 'translate-x-1',
        ].join(' ')}
      />
    </button>
  );
}

interface SettingsRowProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}

function SettingsRow({ icon: Icon, label, danger, onClick }: SettingsRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex items-center justify-between w-full px-4 py-3.5 transition-colors hover:bg-bg-hover cursor-pointer',
        danger ? 'text-semantic-error' : 'text-text-primary',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={danger ? 'text-semantic-error' : 'text-text-secondary'} />
        <span className="text-sm">{label}</span>
      </div>
      <ChevronRight size={16} className="text-text-tertiary" />
    </button>
  );
}

const menuItems = [
  { icon: User, label: 'Perfil' },
  { icon: CreditCard, label: 'Conta e Plano' },
  { icon: Palette, label: 'Avatar' },
  { icon: Shield, label: 'Privacidade' },
  { icon: Bell, label: 'Notificacoes' },
  { icon: Globe, label: 'Idioma' },
];

export default function SettingsPage() {
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [mentorNotif, setMentorNotif] = useState(true);
  const [streakReminder, setStreakReminder] = useState(true);
  const [showRanking, setShowRanking] = useState(true);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <h1 className="text-2xl font-bold text-text-primary">Configuracoes</h1>

      {/* Mobile: navigation list */}
      <div className="lg:hidden space-y-4">
        <Card className="p-0 overflow-hidden divide-y divide-white/6">
          {menuItems.map((item) => (
            <SettingsRow key={item.label} icon={item.icon} label={item.label} />
          ))}
        </Card>

        <Card className="p-0 overflow-hidden divide-y divide-white/6">
          <SettingsRow icon={Download} label="Exportar dados" />
          <SettingsRow icon={Trash2} label="Excluir conta" danger />
        </Card>
      </div>

      {/* Desktop: inline sections */}
      <div className="hidden lg:block space-y-6">
        {/* Notifications */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Bell size={18} className="text-text-secondary" />
            Notificacoes
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-primary">Push notifications</p>
                <p className="text-xs text-text-tertiary">Receba alertas no navegador</p>
              </div>
              <Toggle enabled={pushNotif} onToggle={() => setPushNotif(!pushNotif)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-primary">E-mail semanal</p>
                <p className="text-xs text-text-tertiary">Resumo da semana por e-mail</p>
              </div>
              <Toggle enabled={emailNotif} onToggle={() => setEmailNotif(!emailNotif)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-primary">Mensagens do Mentor</p>
                <p className="text-xs text-text-tertiary">Dicas e missoes da IA</p>
              </div>
              <Toggle enabled={mentorNotif} onToggle={() => setMentorNotif(!mentorNotif)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-primary">Lembrete de streak</p>
                <p className="text-xs text-text-tertiary">Aviso antes do streak zerar</p>
              </div>
              <Toggle enabled={streakReminder} onToggle={() => setStreakReminder(!streakReminder)} />
            </div>
          </div>
        </Card>

        {/* Privacy */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Shield size={18} className="text-text-secondary" />
            Privacidade
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-primary">Aparecer no ranking</p>
                <p className="text-xs text-text-tertiary">Outros jogadores podem ver seu perfil</p>
              </div>
              <Toggle enabled={showRanking} onToggle={() => setShowRanking(!showRanking)} />
            </div>
          </div>
        </Card>

        {/* Language */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Globe size={18} className="text-text-secondary" />
            Idioma
          </h2>
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-primary">Idioma do aplicativo</p>
            <span className="text-sm text-text-secondary bg-bg-tertiary px-3 py-1.5 rounded-lg">
              Portugues (BR)
            </span>
          </div>
        </Card>

        {/* Data & danger zone */}
        <Card>
          <h2 className="text-base font-semibold text-text-primary mb-4">Dados</h2>
          <div className="space-y-3">
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <Download size={16} />
              Exportar meus dados
            </button>
            <button
              type="button"
              className="flex items-center gap-2 text-sm text-semantic-error hover:text-semantic-error/80 transition-colors cursor-pointer"
            >
              <Trash2 size={16} />
              Excluir minha conta
            </button>
          </div>
        </Card>
      </div>

      {/* Version */}
      <p className="text-sm text-text-tertiary text-center pt-4">Versao 1.0.0</p>
    </div>
  );
}
