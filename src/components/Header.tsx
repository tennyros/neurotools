'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold hover:opacity-80 transition">
            🤖 НейроИнструменты
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-gray-300 transition">Главная</Link>
            <Link href="/catalog" className="hover:text-gray-300 transition">Каталог</Link>
            <Link href="/compare" className="hover:text-gray-300 transition">Сравнение</Link>
            <Link href="/about" className="hover:text-gray-300 transition">О проекте</Link>
          </nav>

          {/* Mobile button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-800 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden flex flex-col gap-4 mt-4 pb-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-gray-300">Главная</Link>
            <Link href="/catalog" onClick={() => setIsOpen(false)} className="hover:text-gray-300">Каталог</Link>
            <Link href="/compare" onClick={() => setIsOpen(false)} className="hover:text-gray-300">Сравнение</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-300">О проекте</Link>
          </nav>
        )}
      </div>
    </header>
  );
}