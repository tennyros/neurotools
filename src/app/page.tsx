import Link from 'next/link';
import { getCatalogSummary } from '@/lib/api/tools';

const highlights = [
  'Обзоры с практическими выводами',
  'Сравнение по цене, рейтингу и ограничениям',
  'Актуальные данные из API backend',
];

export default async function Home() {
  const summary = await getCatalogSummary(3);

  return (
    <div className="space-y-10 lg:space-y-14">
      <section className="reveal relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-10 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:px-10 lg:px-12 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.22),transparent_30%),radial-gradient(circle_at_20%_20%,rgba(102,227,255,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-xs font-medium text-sky-200">
                AI catalog
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                Curated and updated
              </span>
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Современный каталог AI-инструментов для выбора без шума
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              NeuroTools собирает обзоры, сравнения и краткие выводы по сервисам для текста,
              изображений и разработки в одном аккуратном интерфейсе.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Открыть каталог
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Сравнить инструменты
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-slate-950/35 px-4 py-2 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-1 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { value: summary.totalTools, label: 'инструментов' },
              { value: summary.categoriesCount, label: 'категории' },
              { value: summary.averageRating.toFixed(1), label: 'средний рейтинг' },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 backdrop-blur"
              >
                <div className="text-3xl font-semibold text-white">{metric.value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-400">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {summary.featuredTools.map((tool, index) => (
          <Link
            href={`/catalog/${tool.slug}`}
            key={tool.id}
            className="reveal group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.06]"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Featured {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-white transition group-hover:text-cyan-200">
                  {tool.name}
                </h3>
              </div>
              <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-sm font-medium text-yellow-200">
                ★ {tool.rating}
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-300">{tool.description}</p>
            <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
              <span>{tool.category}</span>
              <span>{tool.votes} оценок</span>
            </div>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="reveal reveal-delay-2 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <div className="text-sm uppercase tracking-[0.28em] text-sky-300/80">
            Why this app
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Быстрый вход в свежие обзоры и сравнения
          </h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Каталог остаётся лёгким, но визуально более выразительным: акцентные карточки,
            стеклянные панели, контрастная типографика и понятная навигация.
          </p>
        </div>

        <div className="reveal reveal-delay-3 float-subtle rounded-[1.75rem] border border-cyan-400/15 bg-gradient-to-br from-cyan-400/10 via-slate-950/40 to-violet-500/10 p-6 sm:p-8">
          <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/90">
            Connected to API
          </div>
          <p className="mt-4 text-slate-300">
            Инструменты, рейтинги и партнерские переходы подхватываются из backend без ручного
            обновления контента.
          </p>
        </div>
      </section>
    </div>
  );
}
