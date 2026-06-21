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
  affiliateClicks: number;
  externalSource?: 'huggingface' | 'civitai' | null;
  externalId?: string | null;
  provider?: string | null;
  downloads?: number;
  likes?: number;
  ratingExternal?: number | null;
  tags?: string[] | null;
  previewImages?: string[] | null;
  metadata?: Record<string, unknown> | null;
  lastSyncAt?: string | null;
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
