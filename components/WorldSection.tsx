"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  data: Article[];
}

export default function WorldSection({ data = [] }: Props) {
  const mainArticle = data[0];
  const sideTop = data[1];
  const sideBottom = data[2];

  return (
    <section className="mx-auto max-w-[94%] xl:max-w-[1360px] px-5 md:px-8 py-8 bg-white text-black font-sans">
      <div className="border-l-4 border-black pl-2 mb-5">
        <h2 className="text-[14.5px] font-extrabold tracking-wider text-black uppercase">
          WORLD & GLOBAL NEWS
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Large Overlaid Featured Banner (col-span-8) */}
        {mainArticle && (
          <div className="lg:col-span-8 h-full flex flex-col">
            <article className="group relative w-full h-full min-h-[360px] md:min-h-[390px] overflow-hidden rounded-lg bg-neutral-900 border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-end">
              <Link href={`/${mainArticle.category}/${mainArticle.slug}`} className="w-full h-full block relative">
                <ArticleCardImage article={mainArticle} aspectRatio="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="w-6 h-[3px] bg-white mb-3" />
                  <h3 className="text-white text-base md:text-[17px] font-extrabold leading-snug tracking-tight hover:underline transition-colors">
                    {mainArticle.title}
                  </h3>
                </div>
              </Link>
            </article>
          </div>
        )}

        {/* Right Side: 2 Stacked Cards (col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-5 h-full">
          {sideTop && (
            <article className="flex flex-col gap-2">
              <Link href={`/${sideTop.category}/${sideTop.slug}`}>
                <ArticleCardImage article={sideTop} aspectRatio="aspect-16/9" className="rounded-lg" />
              </Link>
              <Link href={`/${sideTop.category}/${sideTop.slug}`}>
                <h4 className="text-[13.5px] font-semibold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1 line-clamp-3">
                  {sideTop.title}
                </h4>
              </Link>
            </article>
          )}

          {sideBottom && (
            <article className="flex flex-col gap-2">
              <Link href={`/${sideBottom.category}/${sideBottom.slug}`}>
                <ArticleCardImage article={sideBottom} aspectRatio="aspect-16/9" className="rounded-lg" />
              </Link>
              <Link href={`/${sideBottom.category}/${sideBottom.slug}`}>
                <h4 className="text-[13.5px] font-semibold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1 line-clamp-3">
                  {sideBottom.title}
                </h4>
              </Link>
            </article>
          )}
        </div>

      </div>
    </section>
  );
}
