'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
  categories: string[];
}

export default function SearchBar({ onSearch, onFilter, categories }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilter(category);
  };

  return (
    <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_260px]">
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-500">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m21 21-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Поиск по названию или описанию"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-3 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/30 focus:bg-white/[0.07]"
        />
      </div>
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 pr-10 text-white outline-none transition focus:border-cyan-400/30 focus:bg-white/[0.07]"
        >
          <option value="all">Все категории</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <svg className="pointer-events-none absolute inset-y-0 right-4 my-auto h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
