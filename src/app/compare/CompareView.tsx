'use client';

import { useState } from 'react';
import type { ToolData } from '@/types';

interface CompareViewProps {
  tools: ToolData[];
}

export default function CompareView({ tools }: CompareViewProps) {
  const [tool1, setTool1] = useState(tools[0]?.id || '');
  const [tool2, setTool2] = useState(tools[1]?.id || '');

  const selectedTool1 = tools.find((tool) => tool.id === tool1);
  const selectedTool2 = tools.find((tool) => tool.id === tool2);

  const pricingLabels = {
    free: '🔓 Бесплатно',
    freemium: '💎 Freemium',
    paid: '💰 Платный',
  };

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-3xl font-bold">Сравнение AI-инструментов</h1>
      <p className="mb-8 text-gray-400">
        Выберите два инструмента для сравнения характеристик
      </p>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Инструмент #1
          </label>
          <select
            value={tool1}
            onChange={(event) => setTool1(event.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          >
            {tools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Инструмент #2
          </label>
          <select
            value={tool2}
            onChange={(event) => setTool2(event.target.value)}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
          >
            {tools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedTool1 && selectedTool2 && (
        <div className="overflow-hidden rounded-lg bg-gray-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="w-1/4 p-4 text-left text-sm font-medium text-gray-400">
                  Характеристика
                </th>
                <th className="w-1/3 p-4 text-left text-sm font-medium text-blue-400">
                  {selectedTool1.name}
                </th>
                <th className="w-1/3 p-4 text-left text-sm font-medium text-purple-400">
                  {selectedTool2.name}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr>
                <td className="p-4 font-medium text-gray-300">Категория</td>
                <td className="p-4 text-gray-300">{selectedTool1.category}</td>
                <td className="p-4 text-gray-300">{selectedTool2.category}</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-300">Рейтинг</td>
                <td className="p-4 text-yellow-400">⭐ {selectedTool1.rating.toFixed(1)}</td>
                <td className="p-4 text-yellow-400">⭐ {selectedTool2.rating.toFixed(1)}</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-300">Модель оплаты</td>
                <td className="p-4 text-green-400">
                  {pricingLabels[selectedTool1.pricing]}
                </td>
                <td className="p-4 text-green-400">
                  {pricingLabels[selectedTool2.pricing]}
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-300">Описание</td>
                <td className="p-4 text-gray-300">{selectedTool1.description}</td>
                <td className="p-4 text-gray-300">{selectedTool2.description}</td>
              </tr>
              <tr>
                <td className="p-4 align-top font-medium text-gray-300">✅ Плюсы</td>
                <td className="p-4 text-gray-300">
                  <ul className="list-inside list-disc space-y-1">
                    {selectedTool1.pros.map((pro) => (
                      <li key={pro} className="text-green-400">{pro}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 text-gray-300">
                  <ul className="list-inside list-disc space-y-1">
                    {selectedTool2.pros.map((pro) => (
                      <li key={pro} className="text-green-400">{pro}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="p-4 align-top font-medium text-gray-300">❌ Минусы</td>
                <td className="p-4 text-gray-300">
                  <ul className="list-inside list-disc space-y-1">
                    {selectedTool1.cons.map((con) => (
                      <li key={con} className="text-red-400">{con}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 text-gray-300">
                  <ul className="list-inside list-disc space-y-1">
                    {selectedTool2.cons.map((con) => (
                      <li key={con} className="text-red-400">{con}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-300">Ссылка</td>
                <td className="p-4">
                  <a
                    href={selectedTool1.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    Перейти →
                  </a>
                </td>
                <td className="p-4">
                  <a
                    href={selectedTool2.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    Перейти →
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="border-t border-gray-700 bg-gray-800/50 p-6">
            <h3 className="mb-2 text-xl font-semibold">🏆 Вердикт</h3>
            <p className="text-gray-300">
              {selectedTool1.rating > selectedTool2.rating ? (
                <>
                  <span className="font-bold text-blue-400">{selectedTool1.name}</span>
                  {' '}выигрывает с рейтингом {selectedTool1.rating.toFixed(1)} против {selectedTool2.rating.toFixed(1)} у{' '}
                  <span className="font-bold text-purple-400">{selectedTool2.name}</span>
                </>
              ) : selectedTool2.rating > selectedTool1.rating ? (
                <>
                  <span className="font-bold text-purple-400">{selectedTool2.name}</span>
                  {' '}выигрывает с рейтингом {selectedTool2.rating.toFixed(1)} против {selectedTool1.rating.toFixed(1)} у{' '}
                  <span className="font-bold text-blue-400">{selectedTool1.name}</span>
                </>
              ) : (
                <>
                  Ничья! Оба инструмента имеют рейтинг {selectedTool1.rating.toFixed(1)}.
                  Выбор зависит от ваших конкретных задач.
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
