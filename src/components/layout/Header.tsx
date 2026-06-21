'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/compare', label: 'Сравнение' },
  { href: '/about', label: 'О проекте' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg shadow-[0_0_40px_rgba(102,227,255,0.15)] transition group-hover:scale-105">
            ✦
          </span>
          <span className="leading-tight">
            <span className="block text-sm uppercase tracking-[0.28em] text-sky-300/80">
              NeuroTools
            </span>
            <span className="block text-base font-semibold text-white">
              AI-инструменты
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  active
                    ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white',
                ].join(' ')}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:bg-white/10 md:hidden"
          aria-label="Открыть меню"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Menu</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d={isOpen ? 'M6 6l12 12M6 18L18 6' : 'M4 7h16M4 12h16M4 17h16'}
            />
          </svg>
        </button>
      </div>

      <div
        className={[
          'overflow-hidden border-t border-white/10 bg-slate-950/95 px-4 backdrop-blur-xl transition-[max-height,opacity,padding] duration-300 ease-out md:hidden',
          isOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0',
        ].join(' ')}
        aria-hidden={!isOpen}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={[
                    'rounded-2xl px-4 py-3 text-sm font-medium transition',
                    active
                      ? 'bg-white/10 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/8 hover:text-white',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>
      </div>
    </header>
  );
}
