'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import type { ToolData } from '@/types';

interface CatalogViewProps {
  tools: ToolData[];
}

export default function CatalogView({ tools }: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = tools.map((tool) => tool.category);
    return [...new Set(cats)];
  }, [tools]);

  const filteredTools = useMemo(() => {
    let result = tools;

    if (selectedCategory !== 'all') {
      result = result.filter((tool) => tool.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((tool) =>
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [tools, searchQuery, selectedCategory]);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Каталог AI-инструментов</h1>

      <SearchBar
        onSearch={setSearchQuery}
        onFilter={setSelectedCategory}
        categories={categories}
      />

      {filteredTools.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-400">Ничего не найдено</p>
          <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => (
            <Link href={`/catalog/${tool.slug}`} key={tool.id}>
              <div className="h-full cursor-pointer rounded-lg bg-gray-800 p-6 transition hover:bg-gray-700">
                <div className="mb-3 flex items-start justify-between">
                  <h2 className="text-xl font-semibold">{tool.name}</h2>
                  <span className="text-yellow-400">⭐ {tool.rating}</span>
                </div>
                <p className="mb-4 text-gray-400">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <span className="rounded bg-gray-700 px-2 py-1 text-sm">
                    {tool.category}
                  </span>
                  <span className="text-sm text-green-400">
                    {tool.pricing === 'free' ? '🔓 Бесплатно' :
                      tool.pricing === 'freemium' ? '💎 Freemium' : '💰 Платный'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
