import { Article } from "./types";

export type { Article };

/**
 * Safely parses a date string into a numeric timestamp.
 * Strips periods (e.g. "July. 24, 2026" -> "July 24, 2026") so Date.parse succeeds.
 */
export function parseArticleDate(dateStr?: string): number {
  if (!dateStr) return 0;
  const cleaned = dateStr.replace(/\./g, "").trim();
  const parsed = Date.parse(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Flattens category news arrays, deduplicates articles by slug or title,
 * and sorts them by date descending (latest first).
 */
export function getSortedNews(arrays: Article[][]): Article[] {
  const flattened = arrays.flat();
  const seen = new Set<string>();
  const uniqueArticles: Article[] = [];

  for (const article of flattened) {
    if (!article) continue;
    const identifier = article.slug || article.title;
    if (identifier && !seen.has(identifier)) {
      seen.add(identifier);
      uniqueArticles.push(article);
    }
  }

  return uniqueArticles.sort((a, b) => {
    const timeA = parseArticleDate(a.date);
    const timeB = parseArticleDate(b.date);
    if (timeB !== timeA) {
      return timeB - timeA;
    }
    return (a.title || "").localeCompare(b.title || "");
  });
}
