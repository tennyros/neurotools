import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getToolBySlug } from '@/lib/api/tools';

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
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{tool.name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${pricingColors[tool.pricing]}`}>
            {pricingText[tool.pricing]}
          </span>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <span className="text-yellow-400 text-xl">⭐ {tool.rating.toFixed(1)}</span>
          <span className="text-gray-400">Категория: {tool.category}</span>
        </div>
        
        <p className="text-gray-300 text-lg">{tool.description}</p>
      </div>
      
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
        <a
          href={tool.affiliateLink}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
        >
          Перейти на сайт {tool.name} →
        </a>
        <p className="text-sm text-blue-200 mt-4">
          Переходя по ссылке, вы поддерживаете проект (партнёрская ссылка)
        </p>
      </div>
    </div>
  );
}
