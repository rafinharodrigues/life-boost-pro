'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ListChecks,
  Trophy,
  Swords,
  Bot,
  User,
  Settings,
  BarChart3,
  BookHeart,
  Store,
} from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  'layout-dashboard': LayoutDashboard,
  'list-checks': ListChecks,
  'bar-chart-3': BarChart3,
  'book-heart': BookHeart,
  store: Store,
  trophy: Trophy,
  swords: Swords,
  bot: Bot,
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-60 flex-col bg-bg-secondary border-r border-white/6 z-40">
      {/* Logo */}
      <div className="px-6 py-5">
        <Link href="/dashboard" className="text-lg font-bold text-accent-primary">
          ◆ LB PRO
        </Link>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-bg-tertiary text-accent-primary border-l-2 border-accent-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
            >
              {Icon && <Icon size={18} />}
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Separator */}
        <div className="my-4 border-t border-white/6" />

        {/* Secondary nav */}
        {[
          { href: '/profile', label: 'Profile', icon: User },
          { href: '/settings', label: 'Settings', icon: Settings },
        ].map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-bg-tertiary text-accent-primary border-l-2 border-accent-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom avatar area */}
      <div className="px-4 py-4 border-t border-white/6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-bg-tertiary flex items-center justify-center">
            <User size={16} className="text-text-secondary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-text-primary">Player</span>
            <span className="text-xs font-mono text-accent-primary-light">Lv. 12</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
