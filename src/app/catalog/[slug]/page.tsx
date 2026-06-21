import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug } from '@/lib/api/tools';
import AffiliateLink from '@/features/shared/ui/AffiliateLink';

export default async function ToolPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);
  
  if (!tool) {
    notFound();
  }
  
  const pricingColors = {
    free: 'text-green-400 bg-green-900/20',
    freemium: 'text-yellow-400 bg-yellow-900/20',
    paid: 'text-blue-400 bg-blue-900/20'
  };
  
  const pricingText = {
    free: '🔓 Бесплатно',
    freemium: '💎 Freemium',
    paid: '💰 Платный'
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Link 
        href="/catalog" 
        className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition"
      >
        ← Назад к каталогу
      </Link>
      
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              <SourceBadge source={tool.externalSource} />
              {tool.provider ? <span className="rounded bg-gray-700 px-2 py-1 text-gray-300">by {tool.provider}</span> : null}
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${pricingColors[tool.pricing]}`}>
            {pricingText[tool.pricing]}
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
          <span className="text-yellow-400 text-xl">⭐ {tool.rating.toFixed(1)}</span>
          <span className="text-gray-400">Категория: {tool.category}</span>
          {tool.downloads ? <span className="text-gray-400">⬇ {tool.downloads.toLocaleString('ru-RU')}</span> : null}
          {tool.likes ? <span className="text-gray-400">♥ {tool.likes.toLocaleString('ru-RU')}</span> : null}
          {tool.ratingExternal ? <span className="text-gray-400">External: {tool.ratingExternal.toFixed(2)}</span> : null}
        </div>
        
        <p className="text-gray-300 text-lg">{tool.description}</p>
      </div>

      {tool.previewImages?.length ? (
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          {tool.previewImages.slice(0, 4).map((image) => (
            <div key={image} className="overflow-hidden rounded-lg bg-gray-800">
              <img src={image} alt={`${tool.name} preview`} className="h-64 w-full object-cover" />
            </div>
          ))}
        </div>
      ) : null}

      {tool.tags?.length ? (
        <div className="mb-8 rounded-lg bg-gray-800/50 p-6">
          <h2 className="text-xl font-semibold mb-3">Теги</h2>
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {tool.metadata && Object.keys(tool.metadata).length > 0 ? (
        <div className="mb-8 rounded-lg bg-gray-800/50 p-6">
          <h2 className="text-xl font-semibold mb-3">Дополнительно</h2>
          <dl className="grid gap-3 md:grid-cols-2">
            {Object.entries(tool.metadata).map(([key, value]) => (
              <div key={key}>
                <dt className="text-sm text-gray-400">{key}</dt>
                <dd className="text-gray-200">{Array.isArray(value) ? value.join(', ') : String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
      
      {/* Full description */}
      <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Обзор</h2>
        <div className="prose prose-invert max-w-none">
          {tool.fullDescription.split('\n').map((line, idx) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return <h3 key={idx} className="text-xl font-semibold mt-4 mb-2">{line.replace(/\*\*/g, '')}</h3>;
            }
            if (line.startsWith('-')) {
              return <li key={idx} className="ml-4 text-gray-300">{line.slice(2)}</li>;
            }
            if (line.trim() === '') return <br key={idx} />;
            return <p key={idx} className="text-gray-300 mb-2">{line}</p>;
          })}
        </div>
      </div>
      
      {/* Pros & Cons */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-3">✅ Плюсы</h3>
          <ul className="space-y-2">
            {tool.pros.map((pro, idx) => (
              <li key={idx} className="text-gray-300">• {pro}</li>
            ))}
          </ul>
        </div>
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-3">❌ Минусы</h3>
          <ul className="space-y-2">
            {tool.cons.map((con, idx) => (
              <li key={idx} className="text-gray-300">• {con}</li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* CTA Button */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Готовы попробовать?</h2>
        <AffiliateLink
          href={tool.affiliateLink}
          slug={tool.slug}
          clickToken={tool.clickToken}
          className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
        >
          Перейти на сайт {tool.name} →
        </AffiliateLink>
        <p className="text-sm text-blue-200 mt-4">
          Переходя по ссылке, вы поддерживаете проект (партнёрская ссылка)
        </p>
        <p className="mt-2 text-xs text-blue-100/80">
          Уже {tool.affiliateClicks.toLocaleString('ru-RU')} переходов
        </p>
      </div>
    </div>
  );
}

function SourceBadge({ source }: { source?: 'huggingface' | 'civitai' | null }) {
  if (source === 'huggingface') {
    return <span className="rounded bg-sky-500/15 px-2 py-1 text-xs text-sky-300">Hugging Face</span>;
  }

  if (source === 'civitai') {
    return <span className="rounded bg-fuchsia-500/15 px-2 py-1 text-xs text-fuchsia-300">Civitai</span>;
  }

  return <span className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300">Manual</span>;
}
