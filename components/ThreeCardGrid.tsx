"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface ThreeCardGridProps {
  title?: string;
  data: Article[];
}

export default function ThreeCardGrid({ title, data = [] }: ThreeCardGridProps) {
  const articles = data.slice(0, 3);

  return (
    <section className="mx-auto max-w-[94%] xl:max-w-[1360px] px-5 md:px-8 pt-3 pb-6 bg-white text-black font-sans">
      {title && (
        <div className="border-l-4 border-amber-600 pl-2 mb-5">
          <h2 className="text-[15px] font-extrabold tracking-wider text-black uppercase">
            {title}
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((item, idx) => (
          <article key={item.slug || idx} className="flex flex-col gap-2.5">
            <Link href={`/${item.category}/${item.slug}`} title={item.title}>
              <ArticleCardImage article={item} aspectRatio="aspect-16/10" className="rounded-lg" />
            </Link>
            <Link href={`/${item.category}/${item.slug}`}>
              <h3 className="text-[13.5px] font-semibold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1 line-clamp-3">
                {item.title}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
