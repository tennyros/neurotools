export type ToolPricing = 'free' | 'freemium' | 'paid';

export type ToolCategory = string;

export interface ToolData {
  id: string;
  name: string;
  slug: string;
  category: ToolCategory;
  rating: number; // средний рейтинг
  votes: number;  // количество голосов
  description: string;
  fullDescription: string;
  affiliateLink: string;
  imageUrl?: string;
  pricing: ToolPricing;
  pros: string[];
  cons: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  toolId?: string;
  publishedAt: Date;
}
