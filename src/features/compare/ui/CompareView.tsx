'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ToolData } from '@/lib/types/tool';
import AffiliateLink from '@/features/shared/ui/AffiliateLink';

interface CompareViewProps {
  tools: ToolData[];
}

export default function CompareView({ tools }: CompareViewProps) {
  const [tool1, setTool1] = useState(tools[0]?.id || '');
  const [tool2, setTool2] = useState(tools[1]?.id || '');

  const selectedTool1 = tools.find((tool) => tool.id === tool1);
  const selectedTool2 = tools.find((tool) => tool.id === tool2);

  const verdict = useMemo(() => {
    if (!selectedTool1 || !selectedTool2) return null;
    if (selectedTool1.rating > selectedTool2.rating) return selectedTool1;
    if (selectedTool2.rating > selectedTool1.rating) return selectedTool2;
    return null;
  }, [selectedTool1, selectedTool2]);

  const pricingLabels = {
    free: 'Бесплатно',
    freemium: 'Freemium',
    paid: 'Платный',
  };

  return (
    <div className="space-y-8">
      <section className="reveal overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <div>
            <div className="text-sm uppercase tracking-[0.28em] text-sky-300/80">
              Сравнение
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Сопоставьте инструменты и выберите лучший быстрее
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Сравнение выстроено вокруг решений, а не сухой таблицы: цена, качество, источник,
              комментарии и прямой переход к нужному сервису.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <SummaryCard label="Инструмент 1" value={selectedTool1?.rating.toFixed(1) ?? '—'} />
            <SummaryCard label="Инструмент 2" value={selectedTool2?.rating.toFixed(1) ?? '—'} />
            <SummaryCard label="Победитель" value={verdict?.name ?? 'Ничья'} compact />
          </div>
        </div>
      </section>

      <div className="reveal reveal-delay-1 grid gap-4 md:grid-cols-2">
        <FieldCard label="Инструмент #1">
          <Select value={tool1} onChange={setTool1} tools={tools} />
        </FieldCard>
        <FieldCard label="Инструмент #2">
          <Select value={tool2} onChange={setTool2} tools={tools} />
        </FieldCard>
      </div>

      {selectedTool1 && selectedTool2 ? (
        <section className="reveal overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
          <div className="grid gap-px bg-white/10 lg:grid-cols-[1fr_1fr_1fr]">
            <div className="bg-slate-950/65 p-5">
              <CompareHeader tool={selectedTool1} tone="cyan" />
            </div>
            <div className="bg-slate-950/75 p-5">
              <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Характеристика
              </div>
              <div className="mt-3 text-2xl font-semibold text-white">Сравнение</div>
              <p className="mt-2 text-sm text-slate-400">Сильные стороны на одной шкале.</p>
            </div>
            <div className="bg-slate-950/65 p-5">
              <CompareHeader tool={selectedTool2} tone="violet" />
            </div>
          </div>

          <div className="divide-y divide-white/10">
            <Row label="Категория" left={selectedTool1.category} right={selectedTool2.category} />
            <Row
              label="Источник"
              left={sourceLabel(selectedTool1.externalSource)}
              right={sourceLabel(selectedTool2.externalSource)}
            />
            <Row label="Провайдер" left={selectedTool1.provider ?? '—'} right={selectedTool2.provider ?? '—'} />
            <Row label="Рейтинг" left={`★ ${selectedTool1.rating.toFixed(1)}`} right={`★ ${selectedTool2.rating.toFixed(1)}`} highlight />
            <Row
              label="Скачивания"
              left={formatNumber(selectedTool1.downloads ?? 0)}
              right={formatNumber(selectedTool2.downloads ?? 0)}
            />
            <Row label="Лайки" left={formatNumber(selectedTool1.likes ?? 0)} right={formatNumber(selectedTool2.likes ?? 0)} />
            <Row
              label="Модель оплаты"
              left={pricingLabels[selectedTool1.pricing]}
              right={pricingLabels[selectedTool2.pricing]}
            />
            <Row label="Описание" left={selectedTool1.description} right={selectedTool2.description} />
          </div>

          <div className="grid gap-px border-t border-white/10 lg:grid-cols-2">
            <div className="bg-slate-950/65 p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">Плюсы</h3>
              <BulletList items={selectedTool1.pros} accent="text-emerald-300" />
            </div>
            <div className="bg-slate-950/65 p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">Плюсы</h3>
              <BulletList items={selectedTool2.pros} accent="text-emerald-300" />
            </div>
            <div className="bg-slate-950/65 p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">Минусы</h3>
              <BulletList items={selectedTool1.cons} accent="text-rose-300" />
            </div>
            <div className="bg-slate-950/65 p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">Минусы</h3>
              <BulletList items={selectedTool2.cons} accent="text-rose-300" />
            </div>
          </div>

          <div className="grid gap-px border-t border-white/10 lg:grid-cols-2">
            <div className="bg-slate-950/70 p-5">
              <AffiliateLink
                href={selectedTool1.affiliateLink}
                slug={selectedTool1.slug}
                clickToken={selectedTool1.clickToken}
                className="inline-flex w-full items-center justify-center rounded-full bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Перейти к {selectedTool1.name}
              </AffiliateLink>
            </div>
            <div className="bg-slate-950/70 p-5">
              <AffiliateLink
                href={selectedTool2.affiliateLink}
                slug={selectedTool2.slug}
                clickToken={selectedTool2.clickToken}
                className="inline-flex w-full items-center justify-center rounded-full bg-violet-300 px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-violet-200"
              >
                Перейти к {selectedTool2.name}
              </AffiliateLink>
            </div>
          </div>

          <div className="border-t border-white/10 bg-slate-950/65 p-6">
            <h3 className="text-xl font-semibold text-white">Вердикт</h3>
            <p className="mt-3 text-slate-300">
              {verdict ? (
                <>
                  <span className="font-semibold text-cyan-200">{verdict.name}</span>
                  {' '}выигрывает с рейтингом {verdict.rating.toFixed(1)}.
                </>
              ) : (
                <>Ничья. Оба инструмента имеют одинаковый рейтинг.</>
              )}
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function SummaryCard({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <div className={`font-semibold text-white ${compact ? 'text-lg' : 'text-2xl'}`}>{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div>
    </div>
  );
}

function FieldCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-400">{label}</div>
      {children}
    </div>
  );
}

function Select({ value, onChange, tools }: { value: string; onChange: (value: string) => void; tools: ToolData[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 pr-10 text-white outline-none transition focus:border-cyan-400/30 focus:bg-slate-950/70"
      >
        {tools.map((tool) => (
          <option key={tool.id} value={tool.id}>
            {tool.name}
          </option>
        ))}
      </select>
      <svg className="pointer-events-none absolute inset-y-0 right-4 my-auto h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function CompareHeader({ tool, tone }: { tool: ToolData; tone: 'cyan' | 'violet' }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.28em] text-slate-400">Выбор</div>
      <div className={`mt-3 text-2xl font-semibold ${tone === 'cyan' ? 'text-cyan-100' : 'text-violet-100'}`}>
        {tool.name}
      </div>
      <div className="mt-2 text-sm text-slate-300">{tool.category}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
          {tool.pricing}
        </span>
        <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200">
          ★ {tool.rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

function Row({ label, left, right, highlight = false }: { label: string; left: string; right: string; highlight?: boolean }) {
  return (
    <div className="grid gap-0 lg:grid-cols-[1fr_1fr_1fr]">
      <div className="border-b border-white/10 px-5 py-4 text-sm font-medium text-slate-300 lg:border-b-0 lg:border-r lg:border-white/10">
        {label}
      </div>
      <div className={`border-b border-white/10 px-5 py-4 text-sm text-slate-200 lg:border-b-0 lg:border-r lg:border-white/10 ${highlight ? 'text-cyan-100' : ''}`}>
        {left}
      </div>
      <div className={`px-5 py-4 text-sm text-slate-200 ${highlight ? 'text-violet-100' : ''}`}>
        {right}
      </div>
    </div>
  );
}

function BulletList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 text-sm leading-6 text-slate-300 ${accent}`}>
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-current" />
          <span className="text-slate-300">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function sourceLabel(source?: ToolData['externalSource']): string {
  if (source === 'huggingface') return 'Hugging Face';
  if (source === 'civitai') return 'Civitai';
  return 'Manual';
}

function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}
