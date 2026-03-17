'use client';

import Link from 'next/link';
import { Flame, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full h-14 bg-bg-secondary/80 backdrop-blur-md border-b border-white/6 z-40 lg:hidden">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo */}
        <Link href="/dashboard" className="text-base font-bold text-accent-primary">
          LB PRO
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Streak badge */}
          <div className="flex items-center gap-1.5">
            <Flame size={16} className="text-accent-amber" />
            <span className="font-mono text-sm text-accent-amber">12</span>
          </div>

          {/* Notification bell */}
          <button className="text-text-secondary hover:text-text-primary transition-colors">
            <Bell size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
