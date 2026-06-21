export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="reveal overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <div className="text-sm uppercase tracking-[0.28em] text-sky-300/80">
          О проекте
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Нейтральный каталог AI-инструментов, собранный как продукт
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          NeuroTools помогает выбирать сервисы для текста, изображений и разработки через
          короткие обзоры, сравнения и прозрачные переходы к источникам.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard
          title="Наша цель"
          tone="cyan"
          text="Сделать рынок AI-инструментов понятным, визуально чистым и удобным для сравнения."
        />
        <InfoCard
          title="Как мы работаем"
          tone="emerald"
          text="Собираем данные из API, обновляем карточки автоматически и держим контент коротким."
        />
        <InfoCard
          title="Почему это удобно"
          tone="amber"
          text="Фильтры, сравнение и карточки выстроены так, чтобы пользователь быстро дошёл до решения."
        />
        <InfoCard
          title="Поддержка проекта"
          tone="violet"
          text="Партнёрские ссылки помогают развивать проект без навязчивой рекламы."
        />
      </div>
    </div>
  );
}

function InfoCard({ title, text, tone }: { title: string; text: string; tone: 'cyan' | 'emerald' | 'amber' | 'violet' }) {
  const toneClasses = {
    cyan: 'from-cyan-400/15 to-slate-950/40 text-cyan-100',
    emerald: 'from-emerald-400/15 to-slate-950/40 text-emerald-100',
    amber: 'from-amber-400/15 to-slate-950/40 text-amber-100',
    violet: 'from-violet-400/15 to-slate-950/40 text-violet-100',
  };

  return (
    <div className={`reveal rounded-[1.75rem] border border-white/10 bg-gradient-to-br p-6 ${toneClasses[tone]}`}>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}
