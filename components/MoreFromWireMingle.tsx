"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  data: Article[];
}

export default function MoreFromWireMingle({ data = [] }: Props) {
  const featuredArticle = data[0];
  const listArticles = data.slice(1, 8);

  return (
    <section className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 pt-4 pb-8 md:px-6 bg-white text-black font-sans">
      <h2 className="text-xl md:text-[24px] font-extrabold text-black mb-3 tracking-tight">
        More News
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN: Featured Article with Overlaid Text (col-span-7) */}
        <div className="lg:col-span-7">
          {featuredArticle && (
            <article className="group relative w-full overflow-hidden rounded-xl bg-neutral-900 border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300">
              <Link href={`/${featuredArticle.category}/${featuredArticle.slug}`} className="w-full block relative">
                <ArticleCardImage article={featuredArticle} aspectRatio="aspect-16/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                  <div className="w-6 h-[3px] bg-white mb-2.5" />
                  <h3 className="text-white text-lg md:text-[22px] font-bold leading-snug tracking-tight hover:underline transition-colors">
                    {featuredArticle.title}
                  </h3>
                </div>
              </Link>
            </article>
          )}
        </div>

        {/* RIGHT COLUMN: Stacked Headline List (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col divide-y divide-neutral-300">
          {listArticles.map((item, idx) => (
            <article
              key={item.slug || idx}
              className="py-2.5 first:pt-0 last:pb-0 flex flex-col justify-center min-w-0"
            >
              <Link href={`/${item.category}/${item.slug}`}>
                <h4 className="text-[17.5px] font-medium leading-snug tracking-tight text-neutral-800 hover:underline transition-colors duration-150 line-clamp-2">
                  {item.title}
                </h4>
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
