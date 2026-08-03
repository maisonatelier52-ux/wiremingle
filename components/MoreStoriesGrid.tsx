"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  data?: Article[];
  title?: string;
  count?: number;
}

function cleanText(str?: string): string {
  if (!str) return "";
  return str
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
    .replace(/&mdash;/g, "—");
}

export default function MoreStoriesGrid({
  data = [],
  title = "More of the latest stories",
  count = 8,
}: Props) {
  const articlesList = data.slice(0, count);

  if (articlesList.length === 0) return null;

  return (
    <section className="mx-auto max-w-[94%] xl:max-w-[1360px] px-5 md:px-8 py-8 bg-white text-black font-sans">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 mb-6 select-none">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {articlesList.map((item, idx) => (
          <article key={item.slug || idx} className="group flex flex-col gap-2.5">
            <Link href={`/${item.category}/${item.slug}`} title={item.title}>
              <ArticleCardImage article={item} aspectRatio="aspect-16/10" className="rounded-lg" />
            </Link>
            <Link href={`/${item.category}/${item.slug}`}>
              <h3 className="text-[13.5px] md:text-[14px] font-bold leading-snug tracking-tight text-neutral-900 group-hover:underline transition-colors duration-150 line-clamp-3">
                {cleanText(item.title)}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
