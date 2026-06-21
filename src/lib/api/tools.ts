import type { ToolData, ToolPricing } from '@/lib/types/tool';

type ApiToolPricing = 'FREE' | 'FREEMIUM' | 'PAID';

interface ApiToolResponse {
  id: string;
  slug: string;
  name: string;
  category: string;
  rating: number | string;
  votes: number;
  description: string;
  fullDescription: string;
  affiliateLink: string;
  affiliateClicks: number;
  pricing: ApiToolPricing;
  pros: string[];
  cons: string[];
}

interface ApiToolCatalogSummaryResponse {
  totalTools: number;
  categoriesCount: number;
  averageRating: number | string;
  featuredTools: ApiToolResponse[];
}

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

function normalizePricing(pricing: ApiToolPricing): ToolPricing {
  return pricing.toLowerCase() as ToolPricing;
}

function normalizeTool(tool: ApiToolResponse): ToolData {
  return {
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    category: tool.category,
    rating: Number(tool.rating),
    votes: tool.votes,
    description: tool.description,
    fullDescription: tool.fullDescription,
    affiliateLink: tool.affiliateLink,
    affiliateClicks: tool.affiliateClicks,
    pricing: normalizePricing(tool.pricing),
    pros: tool.pros,
    cons: tool.cons,
  };
}

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getToolsList(): Promise<ToolData[]> {
  const tools = await apiFetch<ApiToolResponse[]>('/api/tools');
  return tools.map(normalizeTool);
}

export async function getToolBySlug(slug: string): Promise<ToolData | undefined> {
  try {
    const tool = await apiFetch<ApiToolResponse>(`/api/tools/${encodeURIComponent(slug)}`);
    return normalizeTool(tool);
  } catch (error) {
    if (error instanceof Error && error.message.includes('404')) {
      return undefined;
    }

    throw error;
  }
}

export interface ToolCatalogSummary {
  totalTools: number;
  categoriesCount: number;
  averageRating: number;
  featuredTools: ToolData[];
}

export async function getCatalogSummary(featuredLimit = 3): Promise<ToolCatalogSummary> {
  const summary = await apiFetch<ApiToolCatalogSummaryResponse>(
    `/api/tools/summary?featuredLimit=${featuredLimit}`
  );

  return {
    totalTools: summary.totalTools,
    categoriesCount: summary.categoriesCount,
    averageRating: Number(summary.averageRating),
    featuredTools: summary.featuredTools.map(normalizeTool),
  };
}

export async function trackAffiliateClick(slug: string): Promise<void> {
  const endpoint = `${API_URL}/api/tools/${encodeURIComponent(slug)}/click`;

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const sent = navigator.sendBeacon(endpoint, new Blob([], { type: 'text/plain;charset=UTF-8' }));
    if (sent) {
      return;
    }
  }

  await fetch(endpoint, {
    method: 'POST',
    keepalive: true,
    mode: 'cors',
  });
}
