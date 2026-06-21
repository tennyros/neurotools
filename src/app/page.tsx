import Link from 'next/link';
import { getCatalogSummary } from '@/lib/api/tools';

export default async function Home() {
  const summary = await getCatalogSummary(3);

  return (
    <div className="space-y-12">
      <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-cyan-300">
            Каталог AI-сервисов
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Выбирайте нейроинструменты по задачам, цене и реальным ограничениям
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
            НейроИнструменты собирает обзоры, сравнения и короткие выводы по сервисам
            для текста, изображений и разработки.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-gray-950 transition hover:bg-cyan-300"
            >
              Открыть каталог
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center rounded-lg border border-gray-700 px-5 py-3 font-semibold text-white transition hover:border-gray-500 hover:bg-gray-800"
            >
              Сравнить инструменты
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 rounded-lg border border-gray-800 bg-gray-900 p-4">
          <div className="rounded-lg bg-gray-800 p-4">
            <p className="text-3xl font-bold text-white">{summary.totalTools}</p>
            <p className="mt-1 text-sm text-gray-400">инструмента</p>
          </div>
          <div className="rounded-lg bg-gray-800 p-4">
            <p className="text-3xl font-bold text-white">{summary.categoriesCount}</p>
            <p className="mt-1 text-sm text-gray-400">категории</p>
          </div>
          <div className="rounded-lg bg-gray-800 p-4">
            <p className="text-3xl font-bold text-white">{summary.averageRating.toFixed(1)}</p>
            <p className="mt-1 text-sm text-gray-400">средний рейтинг</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Популярные инструменты</h2>
            <p className="mt-2 text-gray-400">Быстрый вход в самые востребованные обзоры.</p>
          </div>
          <Link href="/catalog" className="hidden text-sm font-medium text-cyan-300 hover:text-cyan-200 sm:block">
            Все инструменты
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {summary.featuredTools.map((tool) => (
            <Link
              href={`/catalog/${tool.slug}`}
              key={tool.id}
              className="rounded-lg border border-gray-800 bg-gray-900 p-5 transition hover:border-cyan-400/50 hover:bg-gray-800"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold">{tool.name}</h3>
                <span className="shrink-0 text-sm text-yellow-300">★ {tool.rating}</span>
              </div>
              <p className="mt-3 text-gray-400">{tool.description}</p>
              <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                <span className="rounded bg-gray-800 px-2 py-1 text-gray-300">{tool.category}</span>
                <span className="text-cyan-300">{tool.votes} оценок</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
        <h2 className="text-2xl font-bold">Каталог подключен к API</h2>
        <p className="mt-3 max-w-3xl text-gray-300">
          Инструменты, категории, обзоры и рейтинги загружаются из Kotlin backend
          с PostgreSQL и миграциями Liquibase.
        </p>
      </div>
    </div>
  );
}
