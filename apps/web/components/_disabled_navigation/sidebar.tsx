'use client';

import { memo } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export interface NavItem {
  href: string;
  label: string;
  description?: string;
}

interface SidebarProps {
  items: NavItem[];
}

export const Sidebar = memo(function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 group',
              isActive
                ? 'text-brand-brown dark:text-white bg-slate-100 dark:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute inset-0 rounded-md bg-brand-gold shadow-md"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 block">{item.label}</span>
            {item.description && (
              <span className={clsx(
                "relative z-10 mt-0.5 block text-xs font-normal",
                isActive ? "text-brand-brown/80 dark:text-slate-200" : "text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-300"
              )}>
                {item.description}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
});
