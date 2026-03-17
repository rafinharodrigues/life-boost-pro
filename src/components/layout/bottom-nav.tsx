'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ListChecks,
  Trophy,
  User,
  Plus,
} from 'lucide-react';
import { NAV_BOTTOM } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  'layout-dashboard': LayoutDashboard,
  'list-checks': ListChecks,
  trophy: Trophy,
  user: User,
  plus: Plus,
};

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-bg-secondary border-t border-white/6 z-40 lg:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5">
        {NAV_BOTTOM.map((item, index) => {
          const Icon = iconMap[item.icon];
          const isCreate = index === 2;
          const isActive =
            !isCreate &&
            (pathname === item.href || pathname.startsWith(item.href + '/'));

          if (isCreate) {
            return (
              <div key={item.label} className="flex items-center justify-center">
                <Link
                  href="/tasks/new"
                  className="bg-accent-primary rounded-full w-12 h-12 flex items-center justify-center -mt-6 shadow-lg"
                >
                  <Plus size={24} className="text-white" />
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 text-[10px] transition-colors ${
                isActive ? 'text-accent-primary' : 'text-text-tertiary'
              }`}
            >
              {Icon && <Icon size={20} />}
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
