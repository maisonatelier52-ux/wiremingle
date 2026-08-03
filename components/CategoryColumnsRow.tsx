"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

export interface CategoryColumnData {
  title: string;
  article?: Article;
}

interface Props {
  columns: CategoryColumnData[];
}

export default function CategoryColumnsRow({ columns = [] }: Props) {
  return (
    <section className="mx-auto max-w-[94%] xl:max-w-[1360px] px-5 md:px-8 py-8 bg-white text-black font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            {/* Individual Column Category Header */}
            <div className="border-l-4 border-black pl-2">
              <h2 className="text-[14.5px] font-extrabold tracking-wider text-black uppercase">
                {col.title}
              </h2>
            </div>

            {/* Article Card */}
            {col.article && (
              <article className="flex flex-col gap-2.5">
                <Link href={`/${col.article.category}/${col.article.slug}`} title={col.article.title}>
                  <ArticleCardImage article={col.article} aspectRatio="aspect-16/10" className="rounded-lg" />
                </Link>
                <Link href={`/${col.article.category}/${col.article.slug}`}>
                  <h3 className="text-[13.5px] font-bold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1 line-clamp-3">
                    {col.article.title}
                  </h3>
                </Link>
              </article>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
