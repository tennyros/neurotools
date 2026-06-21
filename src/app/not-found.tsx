import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4">
      <div className="reveal w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
          404
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-white">Страница не найдена</h1>
        <p className="mt-3 text-slate-300">
          Возможно, ссылка устарела или страница была перемещена.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
