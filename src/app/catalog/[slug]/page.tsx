import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getToolBySlug } from '@/lib/api/tools';
import AffiliateLink from '@/features/shared/ui/AffiliateLink';

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const pricingText = {
    free: 'Бесплатно',
    freemium: 'Freemium',
    paid: 'Платный',
  };

  return (
    <div className="space-y-8">
      <Link href="/catalog" className="inline-flex items-center text-sm text-slate-400 transition hover:text-white">
        ← Назад к каталогу
      </Link>

      <section className="reveal overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <SourceBadge source={tool.externalSource} />
              {tool.provider ? <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">by {tool.provider}</span> : null}
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                {pricingText[tool.pricing]}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold text-white sm:text-5xl">
              {tool.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              {tool.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetaStat label="Рейтинг" value={`★ ${tool.rating.toFixed(1)}`} />
              <MetaStat label="Категория" value={tool.category} />
              <MetaStat label="Скачивания" value={formatNumber(tool.downloads ?? 0)} />
              <MetaStat label="Лайки" value={formatNumber(tool.likes ?? 0)} />
            </div>
          </div>

          <div className="border-t border-white/10 bg-slate-950/50 p-6 sm:p-8 lg:border-t-0 lg:border-l">
            <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(102,227,255,0.16),transparent_55%)] p-5">
              <div className="text-sm uppercase tracking-[0.28em] text-slate-400">CTA</div>
              <h2 className="mt-3 text-2xl font-semibold text-white">Перейти к инструменту</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Переход идёт через signed affiliate click, поэтому статистика не ломается и не
                принимает поддельные запросы.
              </p>

              <AffiliateLink
                href={tool.affiliateLink}
                slug={tool.slug}
                clickToken={tool.clickToken}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-cyan-300 px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Открыть {tool.name}
              </AffiliateLink>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
                Уже {tool.affiliateClicks.toLocaleString('ru-RU')} переходов
              </div>
            </div>
          </div>
        </div>
      </section>

      {tool.previewImages?.length ? (
        <section className="reveal reveal-delay-1 grid gap-4 md:grid-cols-2">
          {tool.previewImages.slice(0, 4).map((image) => (
            <div key={image} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04]">
              <div className="relative h-64 w-full">
                <Image
                  src={image}
                  alt={`${tool.name} preview`}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="reveal reveal-delay-2 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Быстрые факты</h2>
          <div className="mt-5 grid gap-3">
            <FactRow label="Источник" value={sourceLabel(tool.externalSource)} />
            <FactRow label="Ссылка" value={tool.affiliateLink} monospace />
            <FactRow label="Click token" value={tool.clickToken.slice(0, 18) + '…'} monospace />
            <FactRow label="External ID" value={tool.externalId ?? '—'} monospace />
            <FactRow label="Последняя синхронизация" value={tool.lastSyncAt ? new Date(tool.lastSyncAt).toLocaleString('ru-RU') : '—'} />
          </div>
        </section>

        <section className="reveal reveal-delay-3 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Обзор</h2>
          <div className="mt-5 space-y-4 text-slate-300">
            {tool.fullDescription.split('\n').map((line, idx) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <h3 key={idx} className="pt-2 text-lg font-semibold text-white">
                    {line.replace(/\*\*/g, '')}
                  </h3>
                );
              }

              if (line.startsWith('-')) {
                return (
                  <p key={idx} className="pl-5 text-slate-300">
                    • {line.slice(2)}
                  </p>
                );
              }

              if (!line.trim()) {
                return <div key={idx} className="h-2" />;
              }

              return (
                <p key={idx} className="leading-7 text-slate-300">
                  {line}
                </p>
              );
            })}
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="reveal rounded-[1.75rem] border border-emerald-400/15 bg-emerald-400/10 p-6">
          <h2 className="text-xl font-semibold text-emerald-100">Плюсы</h2>
          <ul className="mt-4 space-y-3">
            {tool.pros.map((pro) => (
              <li key={pro} className="flex gap-3 text-sm leading-6 text-emerald-50/90">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="reveal rounded-[1.75rem] border border-rose-400/15 bg-rose-400/10 p-6">
          <h2 className="text-xl font-semibold text-rose-100">Минусы</h2>
          <ul className="mt-4 space-y-3">
            {tool.cons.map((con) => (
              <li key={con} className="flex gap-3 text-sm leading-6 text-rose-50/90">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rose-300" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <div className="text-xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div>
    </div>
  );
}

function FactRow({ label, value, monospace = false }: { label: string; value: string; monospace?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div>
      <div className={`mt-2 break-words text-sm text-white ${monospace ? 'font-mono text-[0.8rem]' : ''}`}>{value}</div>
    </div>
  );
}

function SourceBadge({ source }: { source?: 'huggingface' | 'civitai' | null }) {
  if (source === 'huggingface') {
    return <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs text-sky-200">Hugging Face</span>;
  }

  if (source === 'civitai') {
    return <span className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-200">Civitai</span>;
  }

  return <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">Manual</span>;
}

function sourceLabel(source?: 'huggingface' | 'civitai' | null): string {
  if (source === 'huggingface') return 'Hugging Face';
  if (source === 'civitai') return 'Civitai';
  return 'Manual';
}

function formatNumber(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}
