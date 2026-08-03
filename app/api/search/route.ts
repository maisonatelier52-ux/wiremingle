import { NextResponse } from "next/server";
import { getAllArticlesSorted } from "@/lib/articles";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  if (!query) {
    return NextResponse.json([]);
  }

  const allArticles = getAllArticlesSorted();

  const filtered = allArticles.filter((article) => {
    const titleMatch = article.title?.toLowerCase().includes(query);
    const categoryMatch = article.category?.toLowerCase().includes(query);
    const shortDescMatch = article.shortdescription?.toLowerCase().includes(query);
    const authorMatch = article.author?.name?.toLowerCase().includes(query);
    const textMatch = article.description?.some(
      (sec) => sec.subtitle?.toLowerCase().includes(query) || sec.text?.toLowerCase().includes(query)
    );

    return titleMatch || categoryMatch || shortDescMatch || authorMatch || textMatch;
  });

  // Limit results to top 15 matches for quick rendering
  const results = filtered.slice(0, 15).map((article) => ({
    category: article.category,
    title: article.title,
    slug: article.slug,
    image: article.image,
    date: article.date,
    shortdescription: article.shortdescription,
    authorName: article.author?.name,
  }));

  return NextResponse.json(results);
}
