import { Article, ArticleAuthor } from "./types";
import { getSortedNews as getSortedNewsUtils } from "./newsUtils";

import businessData from "@/public/data/business.json";
import worldData from "@/public/data/world.json";
import financeData from "@/public/data/finance.json";
import technologyData from "@/public/data/technology.json";
import politicsData from "@/public/data/politics.json";
import lifestyleData from "@/public/data/lifestyle.json";
import opinionData from "@/public/data/opinion.json";
import investigationData from "@/public/data/investigation.json";

export type { Article, ArticleAuthor };

export { parseArticleDate, getSortedNews } from "./newsUtils";

export function getAllArticlesSorted(): Article[] {
  return getSortedNewsUtils([
    businessData as Article[],
    worldData as Article[],
    financeData as Article[],
    technologyData as Article[],
    politicsData as Article[],
    lifestyleData as Article[],
    opinionData as Article[],
    investigationData as Article[],
  ]);
}

export function getAllAuthors(): ArticleAuthor[] {
  const articles = getAllArticlesSorted();
  const authorsMap = new Map<string, ArticleAuthor>();

  for (const article of articles) {
    if (article.author && article.author.slug && article.author.name) {
      const slug = article.author.slug.toLowerCase();
      if (!authorsMap.has(slug)) {
        authorsMap.set(slug, article.author);
      }
    }
  }

  return Array.from(authorsMap.values());
}

export function getAuthorBySlug(slug: string): ArticleAuthor | null {
  const authors = getAllAuthors();
  const normalizedSlug = slug.toLowerCase();
  return authors.find((a) => a.slug.toLowerCase() === normalizedSlug) || null;
}

export function getArticlesByAuthorSlug(slug: string): Article[] {
  const articles = getAllArticlesSorted();
  const normalizedSlug = slug.toLowerCase();
  return articles.filter(
    (a) => a.author && a.author.slug && a.author.slug.toLowerCase() === normalizedSlug
  );
}
