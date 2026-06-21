'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/features/catalog/ui/SearchBar';
import type { ToolData } from '@/lib/types/tool';

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
              <div className="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-gray-800 transition hover:bg-gray-700">
                {tool.previewImages?.[0] ? (
                  <div className="aspect-[16/9] w-full overflow-hidden bg-gray-900">
                    <img
                      src={tool.previewImages[0]}
                      alt={tool.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-xl font-semibold">{tool.name}</h2>
                      <p className="mt-1 text-sm text-gray-400">{tool.category}</p>
                    </div>
                    <span className="whitespace-nowrap text-yellow-400">⭐ {tool.rating.toFixed(1)}</span>
                  </div>
                  <p className="mb-4 flex-1 text-sm text-gray-400">{tool.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <SourceBadge source={tool.externalSource} />
                    <span className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300">
                      {tool.pricing === 'free' ? 'Бесплатно' :
                        tool.pricing === 'freemium' ? 'Freemium' : 'Платный'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    {tool.provider ? <span>by {tool.provider}</span> : null}
                    {tool.downloads ? <span>⬇ {formatNumber(tool.downloads)}</span> : null}
                    {tool.likes ? <span>♥ {formatNumber(tool.likes)}</span> : null}
                    {tool.tags?.length ? <span>{tool.tags.slice(0, 3).join(', ')}</span> : null}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function SourceBadge({ source }: { source?: ToolData['externalSource'] }) {
  if (source === 'huggingface') {
    return <span className="rounded bg-sky-500/15 px-2 py-1 text-xs text-sky-300">Hugging Face</span>;
  }

  if (source === 'civitai') {
    return <span className="rounded bg-fuchsia-500/15 px-2 py-1 text-xs text-fuchsia-300">Civitai</span>;
  }

  return <span className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300">Manual</span>;
}

function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}
