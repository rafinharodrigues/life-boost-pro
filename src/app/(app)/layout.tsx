import AppShell from '@/components/layout/app-shell';
import ToastProvider from '@/components/ui/toast-provider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
      <ToastProvider />
    </AppShell>
  );
}
