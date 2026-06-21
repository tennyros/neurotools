import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'НейроИнструменты',
  description: 'Обзоры и сравнения AI-инструментов',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-gray-950 text-white">
        <Header />
        <main className="container mx-auto px-4 py-8 sm:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
