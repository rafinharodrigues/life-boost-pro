import Sidebar from './sidebar';
import Header from './header';
import BottomNav from './bottom-nav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <Header />

      <main className="lg:ml-60 pt-14 lg:pt-0 pb-20 lg:pb-0 min-h-screen">
        <div className="max-w-5xl mx-auto p-4 lg:p-8">
          {children}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
