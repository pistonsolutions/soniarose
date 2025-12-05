import type { ReactNode } from 'react';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { Sidebar } from '@/components/navigation/sidebar';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', description: 'KPIs and system status' },
  { href: '/contacts', label: 'Contacts', description: 'Profiles, tags, activity' },
  { href: '/inbox', label: 'Conversations', description: 'Two-way SMS and call log' },
  { href: '/workflows', label: 'Workflows', description: 'Automation queues and runs' },
  { href: '/media', label: 'Media Library', description: 'Video uploads and assets' },
  { href: '/compliance', label: 'Compliance', description: 'Opt-in events and STOP handling' },
  { href: '/settings', label: 'Settings', description: 'Numbers, routing, preferences' },
];

export default async function ConsoleLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  const firstName = user?.firstName || 'Sonia';

  return (
    <div className="flex min-h-screen bg-slate-200 text-slate-900 dark:bg-slate-950 dark:text-slate-100 relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-brand-gold/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200/50 bg-white/60 text-slate-900 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:text-white">
        <div className="flex h-full flex-col p-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Welcome, {firstName}</h1>
            </div>
            <div className="bg-slate-100 rounded-full p-1 dark:bg-slate-800">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
          <Sidebar items={NAV_ITEMS} />

          <div className="mt-auto border-t border-slate-200/50 pt-4 dark:border-white/10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-brand-gold/20" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.firstName} {user?.lastName}</span>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 pl-72">
        <div className="px-8 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
