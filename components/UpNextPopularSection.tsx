"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  upNextArticles?: Article[];
  mostPopularArticles?: Article[];
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

export default function UpNextPopularSection({
  upNextArticles = [],
  mostPopularArticles = [],
}: Props) {
  const upNextList = upNextArticles.slice(0, 6);
  const popularList = mostPopularArticles.slice(0, 7);

  if (upNextList.length === 0 && popularList.length === 0) return null;

  return (
    <section className="w-full bg-white text-black font-sans pt-8 pb-6 mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* LEFT COLUMN: Up next (col-span-8) */}
        <div className="lg:col-span-8 flex flex-col">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 mb-6 select-none">
            Up next
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {upNextList.map((item, idx) => (
              <article key={item.slug || idx} className="group flex flex-col min-w-0">
                <Link href={`/${item.category}/${item.slug}`} title={item.title}>
                  <ArticleCardImage article={item} aspectRatio="aspect-square" className="rounded-xl" />
                </Link>
                <Link href={`/${item.category}/${item.slug}`} className="mt-2.5">
                  <h3 className="text-[13px] font-bold leading-snug tracking-tight text-neutral-900 group-hover:underline transition-colors duration-150 line-clamp-3">
                    {cleanText(item.title)}
                  </h3>
                </Link>
                <span className="text-[11.5px] text-neutral-500 font-normal mt-1.5">
                  {item.date || "April 29, 2026"}
                </span>
              </article>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Most popular (col-span-4) - STICKY WHILE UP NEXT SCROLLS */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <div className="sticky top-6">
            <h2 className="text-[22px] md:text-[24px] font-extrabold tracking-tight text-black mb-5 select-none">
              Most popular
            </h2>

            <div className="flex flex-col divide-y divide-neutral-200/70">
              {popularList.map((item, idx) => (
                <article key={item.slug || idx} className="py-3.5 first:pt-0 flex items-start gap-5 group">
                  <span className="text-[17px] md:text-[18px] font-extrabold text-black w-4 flex-shrink-0 text-left mt-0.5 select-none">
                    {idx + 1}
                  </span>
                  <Link href={`/${item.category}/${item.slug}`} className="flex-1 min-w-0">
                    <h3 className="text-[13px] md:text-[13.5px] font-normal leading-[1.35] text-neutral-900 group-hover:underline transition-colors duration-150 line-clamp-2">
                      {cleanText(item.title)}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
