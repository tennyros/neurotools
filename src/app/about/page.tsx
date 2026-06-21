export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">О проекте</h1>
      
      <div className="prose prose-invert max-w-none">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">🤖 НейроИнструменты</h2>
          <p className="text-gray-300">
            Мы создаём независимые обзоры и сравнения AI-инструментов, чтобы помочь вам выбрать лучшие решения для работы, творчества и разработки.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">🎯 Наша цель</h3>
            <p className="text-gray-300">
              Сделать мир AI-технологий понятным и доступным для каждого. Мы тестируем инструменты, выделяем сильные и слабые стороны, даём честные рекомендации.
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-400 mb-3">📝 Как мы работаем</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Исследуем рынок AI-инструментов</li>
              <li>• Тестируем каждый инструмент</li>
              <li>• Пишем детальные обзоры</li>
              <li>• Сравниваем альтернативы</li>
            </ul>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">💡 Почему мы?</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Независимые обзоры</li>
              <li>• Реальные тесты</li>
              <li>• Честные рекомендации</li>
              <li>• Постоянное обновление</li>
            </ul>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-400 mb-3">🤝 Поддержать проект</h3>
            <p className="text-gray-300">
              Мы используем партнёрские ссылки — это помогает нам оставаться независимыми и бесплатными для вас.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}