'use client';

import { useState } from 'react';
import {
  Store,
  Coins,
  Plus,
  Star,
  Gift,
  Sparkles,
  Crown,
  Palette,
  CalendarDays,
  Lock,
  Sword,
  Shield,
  Gem,
  Wand2,
  Flame,
  Zap,
  Swords,
  Heart,
} from 'lucide-react';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import Button from '@/components/ui/button';
import { useShopStore } from '@/store/shop.store';
import { useUserStore } from '@/store/user.store';

type ShopTab = 'rewards' | 'avatar' | 'themes' | 'seasonal';

const tabs: { key: ShopTab; label: string }[] = [
  { key: 'rewards', label: 'Auto-recompensas' },
  { key: 'avatar', label: 'Avatar' },
  { key: 'themes', label: 'Temas' },
  { key: 'seasonal', label: 'Sazonais' },
];

// Avatar items data
const avatarItems = [
  { id: 'av1', name: 'Espada de Fogo', icon: Sword, color: '#FF4081', unlocked: true, equipped: true, cost: 0 },
  { id: 'av2', name: 'Escudo Real', icon: Shield, color: '#00D2FF', unlocked: true, equipped: false, cost: 0 },
  { id: 'av3', name: 'Coroa Dourada', icon: Crown, color: '#FFAB00', unlocked: true, equipped: false, cost: 0 },
  { id: 'av4', name: 'Gema Mistica', icon: Gem, color: '#6C5CE7', unlocked: false, equipped: false, cost: 180 },
  { id: 'av5', name: 'Varinha Arcana', icon: Wand2, color: '#39FF14', unlocked: false, equipped: false, cost: 220 },
  { id: 'av6', name: 'Aura de Fogo', icon: Flame, color: '#FF4081', unlocked: false, equipped: false, cost: 250 },
  { id: 'av7', name: 'Raio Divino', icon: Zap, color: '#FFAB00', unlocked: false, equipped: false, cost: 300 },
  { id: 'av8', name: 'Dual Blades', icon: Swords, color: '#00D2FF', unlocked: false, equipped: false, cost: 350 },
];

// Theme data
const themes = [
  { id: 'th1', name: 'Neon Verde', swatches: ['#050508', '#39FF14', '#0A0A0F'], cost: 0, active: true },
  { id: 'th2', name: 'Cyber Roxo', swatches: ['#0D0015', '#6C5CE7', '#1A0A2E'], cost: 150, active: false },
  { id: 'th3', name: 'Samurai Vermelho', swatches: ['#0A0000', '#FF4081', '#1A0A0A'], cost: 200, active: false },
  { id: 'th4', name: 'Oceano Azul', swatches: ['#000A10', '#00D2FF', '#001520'], cost: 200, active: false },
];

// Seasonal items
const seasonalItems = [
  { id: 'se1', emoji: '\u2600\uFE0F', name: 'Armadura Solar', cost: 300, type: 'avatar' },
  { id: 'se2', emoji: '\uD83C\uDFD6\uFE0F', name: 'Badge Verao 2026', cost: 100, type: 'badge' },
  { id: 'se3', emoji: '\uD83C\uDF0A', name: 'Efeito Ondas', cost: 200, type: 'effect' },
  { id: 'se4', emoji: '\uD83C\uDF79', name: 'Titulo: Curtidor', cost: 150, type: 'title' },
  { id: 'se5', emoji: '\uD83C\uDF3A', name: 'Moldura Tropical', cost: 250, type: 'frame' },
  { id: 'se6', emoji: '\uD83D\uDC1A', name: 'Pet Conchinha', cost: 400, type: 'pet' },
];

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState<ShopTab>('rewards');

  // Reactive gold balance from store
  const gold = useUserStore((s) => s.gold);
  // Rewards from shop store
  const rewards = useShopStore((s) => s.rewards);

  function handleRedeem(id: string) {
    useShopStore.getState().redeemReward(id);
  }

  function handleCreateReward() {
    useShopStore.getState().createReward({
      emoji: '\uD83C\uDF81',
      name: 'Nova Recompensa',
      costGold: 100,
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="h-6 w-6 text-accent-primary" />
          <h1 className="text-2xl font-bold">Loja</h1>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-accent-amber/15 px-3 py-1.5">
          <Coins className="h-4 w-4 text-accent-amber" />
          <span className="font-mono text-xl font-bold text-accent-amber">{gold}</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto rounded-lg bg-bg-secondary p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={[
              'whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all',
              activeTab === tab.key
                ? 'bg-accent-primary/15 text-accent-primary'
                : 'text-text-secondary hover:text-text-primary hover:bg-white/5',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'rewards' && (
        <div className="space-y-4">
          <Button variant="secondary" size="sm" onClick={handleCreateReward}>
            <Plus className="h-4 w-4" />
            Criar recompensa
          </Button>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {rewards.map((reward) => {
              const canAfford = gold >= reward.costGold;
              return (
                <Card key={reward.id} hover>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-3xl">{reward.emoji}</span>
                    <p className="text-sm font-medium text-text-primary">{reward.name}</p>
                    <div className="flex items-center gap-1">
                      <Coins className="h-3.5 w-3.5 text-accent-amber" />
                      <span className="font-mono text-sm font-semibold text-accent-amber">
                        {reward.costGold}
                      </span>
                    </div>
                    <p className="text-xs text-text-tertiary">
                      Resgatado {reward.timesRedeemed}x
                    </p>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={!canAfford}
                      className="w-full"
                      onClick={() => handleRedeem(reward.id)}
                    >
                      Resgatar
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'avatar' && (
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-4">
          {avatarItems.map((item) => {
            const IconComp = item.icon;
            return (
              <Card key={item.id} hover>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="relative">
                    <div
                      className={[
                        'flex h-14 w-14 items-center justify-center rounded-xl',
                        item.unlocked ? 'bg-white/5' : 'bg-white/3',
                      ].join(' ')}
                    >
                      <IconComp
                        className="h-7 w-7"
                        style={{ color: item.unlocked ? item.color : '#3A3A4A' }}
                      />
                    </div>
                    {!item.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
                        <Lock className="h-4 w-4 text-text-tertiary" />
                      </div>
                    )}
                  </div>

                  <p
                    className={[
                      'text-xs font-medium',
                      item.unlocked ? 'text-text-primary' : 'text-text-tertiary',
                    ].join(' ')}
                  >
                    {item.name}
                  </p>

                  {item.unlocked && item.equipped && (
                    <Badge variant="status" label="Equipado" color="#39FF14" />
                  )}

                  {item.unlocked && !item.equipped && (
                    <Button variant="ghost" size="sm" className="text-xs">
                      Equipar
                    </Button>
                  )}

                  {!item.unlocked && (
                    <>
                      <div className="flex items-center gap-1">
                        <Coins className="h-3 w-3 text-accent-amber" />
                        <span className="font-mono text-xs text-accent-amber">{item.cost}</span>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={gold < item.cost}
                        className="text-[10px]"
                      >
                        Desbloquear
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {activeTab === 'themes' && (
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => {
            const canAfford = theme.cost === 0 || gold >= theme.cost;
            return (
              <Card key={theme.id} hover>
                <div className="space-y-3">
                  {/* Color palette preview */}
                  <div className="flex h-16 w-full overflow-hidden rounded-lg">
                    {theme.swatches.map((color, i) => (
                      <div
                        key={i}
                        className="flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text-primary">{theme.name}</p>
                    {theme.active && (
                      <Badge variant="status" label="Ativo" color="#39FF14" />
                    )}
                  </div>

                  {theme.cost === 0 ? (
                    <p className="text-xs text-text-tertiary">Gratuito</p>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Coins className="h-3.5 w-3.5 text-accent-amber" />
                      <span className="font-mono text-sm text-accent-amber">{theme.cost}</span>
                    </div>
                  )}

                  {theme.active ? (
                    <Button variant="ghost" size="sm" disabled className="w-full text-xs">
                      Tema atual
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={!canAfford}
                      className="w-full"
                    >
                      {canAfford ? 'Aplicar' : 'Desbloquear'}
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {activeTab === 'seasonal' && (
        <div className="space-y-4">
          {/* Event Banner */}
          <Card className="border-accent-amber/30 bg-gradient-to-r from-accent-amber/10 via-accent-primary/5 to-transparent">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{'\u2600\uFE0F'}</span>
                <div>
                  <h3 className="text-base font-bold text-text-primary">Evento de Verao</h3>
                  <p className="text-sm text-text-secondary">
                    Itens exclusivos de edicao limitada! Conquiste antes que acabem.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-accent-amber/15 px-3 py-1.5 self-start">
                <CalendarDays className="h-4 w-4 text-accent-amber" />
                <span className="text-sm font-medium text-accent-amber">5 dias restantes</span>
              </div>
            </div>
          </Card>

          {/* Seasonal items grid */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {seasonalItems.map((item) => {
              const canAfford = gold >= item.cost;
              return (
                <Card key={item.id} hover>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Badge variant="difficulty" label="Limitado" color="#FF4081" />
                    <span className="text-3xl">{item.emoji}</span>
                    <p className="text-sm font-medium text-text-primary">{item.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-text-tertiary">
                      {item.type}
                    </p>
                    <div className="flex items-center gap-1">
                      <Coins className="h-3.5 w-3.5 text-accent-amber" />
                      <span className="font-mono text-sm font-semibold text-accent-amber">
                        {item.cost}
                      </span>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={!canAfford}
                      className="w-full"
                    >
                      {canAfford ? 'Adquirir' : 'Gold insuficiente'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
