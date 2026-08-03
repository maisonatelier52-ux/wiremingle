"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  articles: Article[];
  title?: string;
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

const categorySubtitles: Record<string, string> = {
  business: "Markets & Trade",
  world: "Global Insights",
  finance: "Economy & Banking",
  technology: "AI & Innovation",
  politics: "Policy & Power",
  lifestyle: "Culture & Living",
  opinion: "Editorials",
  investigation: "Special Reports",
};

export default function CategoryGrid2x2({
  articles = [],
  title = "Top Category News",
}: Props) {
  const displayArticles = articles.slice(0, 4);

  if (displayArticles.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* Section Header with vertical accent */}
      <div className="flex items-center gap-2">
        <span className="w-[3.5px] h-4 bg-[#E31B23] block flex-shrink-0 rounded-full" />
        <h3 className="text-[13px] font-extrabold tracking-wider text-neutral-900 uppercase">
          {title}
        </h3>
      </div>

      {/* 2x2 Grid of Category News Images & Links */}
      <div className="grid grid-cols-2 gap-3.5">
        {displayArticles.map((item, idx) => {
          const catLower = item.category.toLowerCase();
          const subtitle = categorySubtitles[catLower] || item.category;

          return (
            <article key={item.slug || idx} className="group flex flex-col gap-1.5 min-w-0">
              <Link
                href={`/${catLower}/${item.slug}`}
                className="block overflow-hidden rounded-lg relative border border-neutral-200/60"
              >
                <ArticleCardImage
                  article={item}
                  aspectRatio="aspect-4/3"
                  className="rounded-lg group-hover:scale-105 transition-transform duration-200"
                />
              </Link>

              {/* Subtitle / Category Badge */}
              <div className="flex flex-col gap-0.5 mt-0.5">
                <span className="text-[10px] font-extrabold text-[#E31B23] uppercase tracking-wider">
                  {subtitle}
                </span>

                <Link href={`/${catLower}/${item.slug}`}>
                  <h4 className="text-[11.5px] font-bold leading-snug tracking-tight text-neutral-900 group-hover:underline transition-colors line-clamp-2">
                    {cleanText(item.title)}
                  </h4>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
