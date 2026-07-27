"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface StoryItem {
  headline: string;
  imageType?: string;
  href: string;
}

interface Props {
  data?: Article[];
  stories?: StoryItem[];
  category?: string;
  sectionTitle?: string;
  columnTitles?: string[];
}

function cleanText(str?: string): string {
  if (!str) return "";
  return str
    .replace(/:contentReference\[[^\]]*\](?:\{[^}]*\})?/g, "")
    .replace(/&eacute;/g, "é")
    .replace(/&Eacute;/g, "É")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .trim();
}

const categorySubTitlesMap: Record<string, string[]> = {
  world: ["WORLD", "GLOBAL", "INTERNATIONAL"],
  business: ["BUSINESS", "GLOBAL BUSINESS", "MARKETS"],
  finance: ["FINANCE", "GLOBAL FINANCE", "MARKETS"],
  technology: ["TECHNOLOGY", "INNOVATION", "GLOBAL TECH"],
  politics: ["POLITICS", "WORLD POLITICS", "GOVERNMENT"],
  lifestyle: ["LIFESTYLE", "WORLD CULTURE", "WELLNESS"],
  opinion: ["OPINION", "EDITORIAL", "PERSPECTIVE"],
  investigation: ["INVESTIGATION", "WORLD REPORTS", "SPECIAL"],
};

export default function LatestStoriesGrid({
  data = [],
  stories,
  category,
  sectionTitle = "FEATURED",
  columnTitles,
}: Props) {
  const articlesList =
    data.length > 0
      ? data
      : (stories || []).map(
          (s) =>
            ({
              title: s.headline,
              slug: s.href.split("/").pop() || "",
              category: s.href.split("/")[1] || "news",
              date: "July. 22, 2026",
            } as Article)
        );

  if (articlesList.length === 0) return null;

  const activeCategory = (category || "").toLowerCase();
  const defaultSubTitles =
    columnTitles ||
    categorySubTitlesMap[activeCategory] ||
    ["WORLD", "GLOBAL", "INTERNATIONAL"];

  // Group articles into 3-column rows (12 articles per row: 4 articles per column = 1 featured + 3 sub-articles)
  const rowSize = 12;
  const rows: Array<Array<{ subTitle: string; featured?: Article; subArticles: Article[] }>> = [];

  for (let r = 0; r < articlesList.length; r += rowSize) {
    const rowArticles = articlesList.slice(r, r + rowSize);
    const cols = [];

    const itemsPerCol = Math.ceil(rowArticles.length / 3);

    for (let c = 0; c < 3; c++) {
      const subTitle = defaultSubTitles[c % defaultSubTitles.length];
      const colArticles = rowArticles.slice(c * itemsPerCol, (c + 1) * itemsPerCol);

      if (colArticles.length > 0) {
        cols.push({
          subTitle,
          featured: colArticles[0],
          subArticles: colArticles.slice(1, 4),
        });
      }
    }

    if (cols.length > 0) {
      rows.push(cols);
    }
  }

  return (
    <section className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 py-8 md:px-6 bg-white text-black font-sans">
      {/* Top Main Section Title */}
      <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-neutral-900 mb-6 select-none">
        {sectionTitle}
      </h2>

      <div className="flex flex-col gap-10">
        {rows.map((cols, rowIdx) => {
          const gridColsClass =
            cols.length === 1
              ? "grid-cols-1"
              : cols.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-3";

          return (
            <div key={rowIdx} className={`grid ${gridColsClass} gap-6 lg:gap-8 items-start`}>
              {cols.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-3">
                  {/* Column Sub Title with black vertical bar indicator */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-[4px] h-[15px] bg-black block flex-shrink-0" />
                    <h3 className="text-[14px] font-extrabold tracking-wider text-black uppercase">
                      {col.subTitle}
                    </h3>
                  </div>

                  {/* Featured Article */}
                  {col.featured && (
                    <div className="flex flex-col gap-2.5">
                      <Link href={`/${col.featured.category}/${col.featured.slug}`} title={col.featured.title}>
                        <ArticleCardImage article={col.featured} aspectRatio="aspect-16/10" className="rounded-lg" />
                      </Link>
                      <Link href={`/${col.featured.category}/${col.featured.slug}`}>
                        <h4 className="text-[17px] md:text-[18.5px] font-bold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1 line-clamp-3">
                          {cleanText(col.featured.title)}
                        </h4>
                      </Link>
                    </div>
                  )}

                  {/* Sub-articles News Headlines List separated by horizontal dividers */}
                  {col.subArticles.length > 0 && (
                    <div className="flex flex-col divide-y divide-neutral-200/80 border-t border-neutral-200/80 mt-2">
                      {col.subArticles.map((sub, sIdx) => (
                        <Link
                          key={sub.slug || sIdx}
                          href={`/${sub.category}/${sub.slug}`}
                          className="py-3 text-[13.5px] font-medium text-neutral-900 leading-snug hover:underline transition-colors duration-150 line-clamp-2"
                        >
                          {cleanText(sub.title)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}


