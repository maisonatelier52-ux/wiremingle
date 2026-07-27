import { MetadataRoute } from "next";
import { getAllArticlesSorted, getAllAuthors } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wiremingle.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/our-team`, lastModified: new Date() },
    { url: `${siteUrl}/about-us`, lastModified: new Date() },
    { url: `${siteUrl}/contact`, lastModified: new Date() },
    { url: `${siteUrl}/editorial-policy`, lastModified: new Date() },
    { url: `${siteUrl}/terms-and-conditions`, lastModified: new Date() },
    { url: `${siteUrl}/legal`, lastModified: new Date() },
    { url: `${siteUrl}/ownership-funding`, lastModified: new Date() },
    { url: `${siteUrl}/privacy-policy`, lastModified: new Date() },
    { url: `${siteUrl}/right-of-reply`, lastModified: new Date() },
    { url: `${siteUrl}/source-methodology`, lastModified: new Date() },
    { url: `${siteUrl}/advertising-sponsored`, lastModified: new Date() },
    { url: `${siteUrl}/faq`, lastModified: new Date() },
  ];

  const categories = [
    "business",
    "world",
    "finance",
    "technology",
    "politics",
    "lifestyle",
    "opinion",
    "investigation",
  ];
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteUrl}/${cat}`,
    lastModified: new Date(),
  }));

  const authors = getAllAuthors();
  const authorRoutes: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${siteUrl}/author/${author.slug.toLowerCase()}`,
    lastModified: new Date(),
  }));

  const articles = getAllArticlesSorted();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/${article.category.toLowerCase()}/${article.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...authorRoutes, ...articleRoutes];
}
