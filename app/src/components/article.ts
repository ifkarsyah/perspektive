import type { Article } from '@/data/types'

export const ARTICLE_STYLE: Record<Article, { text: string; border: string; fill: string }> = {
  der: { text: 'text-blue-600', border: 'border-l-blue-500', fill: '#3b82f6' },
  die: { text: 'text-rose-600', border: 'border-l-rose-500', fill: '#f43f5e' },
  das: { text: 'text-emerald-600', border: 'border-l-emerald-500', fill: '#10b981' },
}
