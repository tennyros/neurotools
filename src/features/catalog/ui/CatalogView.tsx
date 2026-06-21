'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className="space-y-8">
      <section className="reveal overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="text-sm uppercase tracking-[0.28em] text-sky-300/80">
              Каталог
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              AI-инструменты с акцентом на качество выбора
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Фильтруйте инструменты по категории, сравнивайте характеристики и быстро
              переходите к карточке нужного сервиса.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Stat label="Найдено" value={filteredTools.length} />
            <Stat label="Категорий" value={categories.length} />
            <Stat label="Всего" value={tools.length} />
          </div>
        </div>
      </section>

      <div className="reveal reveal-delay-1">
        <SearchBar
        onSearch={setSearchQuery}
        onFilter={setSelectedCategory}
        categories={categories}
        />
      </div>

      {filteredTools.length === 0 ? (
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-2xl">
            ↯
          </div>
          <p className="text-lg font-medium text-white">Ничего не найдено</p>
          <p className="mt-2 text-slate-400">Попробуйте другой запрос или сбросьте фильтр категории.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTools.map((tool, index) => (
            <Link
              href={`/catalog/${tool.slug}`}
              key={tool.id}
              className="reveal group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.06]"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900/60">
                {tool.previewImages?.[0] ? (
                  <Image
                    src={tool.previewImages[0]}
                    alt={tool.name}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(102,227,255,0.14),transparent_55%)]">
                    <div className="text-4xl font-semibold text-slate-300/70">
                      {tool.name.charAt(0)}
                    </div>
                  </div>
                )}
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-white">
                  #{String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-xl font-semibold text-white">{tool.name}</h2>
                    <p className="mt-1 text-sm text-slate-400">{tool.category}</p>
                  </div>
                  <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-sm font-medium text-yellow-200">
                    ★ {tool.rating.toFixed(1)}
                  </span>
                </div>

                <p className="mb-5 flex-1 text-sm leading-6 text-slate-300">{tool.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  <SourceBadge source={tool.externalSource} />
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {tool.pricing === 'free' ? 'Бесплатно' : tool.pricing === 'freemium' ? 'Freemium' : 'Платный'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  {tool.provider ? <span>by {tool.provider}</span> : null}
                  {tool.downloads ? <span>⬇ {formatNumber(tool.downloads)}</span> : null}
                  {tool.likes ? <span>♥ {formatNumber(tool.likes)}</span> : null}
                  {tool.tags?.length ? <span>{tool.tags.slice(0, 3).join(', ')}</span> : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div>
    </div>
  );
}

function SourceBadge({ source }: { source?: ToolData['externalSource'] }) {
  if (source === 'huggingface') {
    return <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">Hugging Face</span>;
  }

  if (source === 'civitai') {
    return <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-200">Civitai</span>;
  }

  return <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">Manual</span>;
}

function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}
