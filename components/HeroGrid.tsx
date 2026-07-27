"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  data: Article[];
}

export default function HeroGrid({ data = [] }: Props) {
  const mainHero = data[0];
  const subHeroGrid = data.slice(1, 4);
  const leftFeatured = data[4];
  const leftList = data.slice(5, 10);
  const rightFeatured = data[10];
  const rightThumbnails = data.slice(11, 15);

  return (
    <section className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 py-8 md:px-6 bg-white text-black font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Featured Story & News List (col-span-3)                       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-5 lg:border-r border-neutral-200/50 lg:pr-5 h-full">
          <div className="flex flex-col gap-4">
            {leftFeatured && (
              <article className="flex flex-col gap-2.5">
                <Link href={`/${leftFeatured.category}/${leftFeatured.slug}`} title={leftFeatured.title}>
                  <ArticleCardImage article={leftFeatured} aspectRatio="aspect-3/2" />
                </Link>
                <Link href={`/${leftFeatured.category}/${leftFeatured.slug}`}>
                  <h2 className="text-[20px] font-semibold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1">
                    {leftFeatured.title}
                  </h2>
                </Link>
              </article>
            )}

            <div className="h-[1px] bg-neutral-200/50 w-full my-1" />

            <div className="flex flex-col divide-y divide-neutral-200/50">
              {leftList.map((item, idx) => (
                <article key={item.slug || idx} className="py-3.5 first:pt-0 last:pb-0 flex flex-col gap-1.5">
                  <Link href={`/${item.category}/${item.slug}`}>
                    <h3 className="text-[17.5px] font-medium leading-snug tracking-tight text-neutral-800 hover:underline transition-colors duration-150">
                      {item.title}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER COLUMN: Main Hero & 3-Card Sub-Grid (col-span-6)                   */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 flex flex-col items-center justify-between text-center lg:border-r border-neutral-200/50 lg:px-5 h-full">
          {mainHero && (
            <article className="flex flex-col items-center w-full mb-0">
              <Link href={`/${mainHero.category}/${mainHero.slug}`}>
                <h1 className="text-[32px] md:text-[38px] font-bold text-neutral-900 leading-tight tracking-tight text-center mb-3 hover:underline transition-colors">
                  {mainHero.title}
                </h1>
              </Link>
              
              <div className="w-full mb-3">
                <Link href={`/${mainHero.category}/${mainHero.slug}`}>
                  <ArticleCardImage article={mainHero} aspectRatio="aspect-16/9" />
                </Link>
              </div>

              <p className="text-[15.5px] text-neutral-800 leading-relaxed w-full text-left font-normal mb-0">
                {mainHero.shortdescription}
              </p>
            </article>
          )}

          {/* 3-Column Image Cards Grid Row Below Main Article */}
          {subHeroGrid.length > 0 && (
            <div className="w-full pt-1.5 mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {subHeroGrid.map((item, idx) => (
                  <article key={item.slug || idx} className="flex flex-col gap-2">
                    <Link href={`/${item.category}/${item.slug}`}>
                      <ArticleCardImage article={item} aspectRatio="aspect-3/2" className="rounded-md" />
                    </Link>
                    <Link href={`/${item.category}/${item.slug}`}>
                      <h3 className="text-[17.5px] font-semibold leading-snug tracking-tight text-neutral-800 hover:underline transition-colors duration-150 line-clamp-3 mt-0.5">
                        {item.title}
                      </h3>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Right Featured & Thumbnail List (col-span-3)                 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-5 lg:pl-1 h-full">
          <div className="flex flex-col gap-4">
            {rightFeatured && (
              <article className="flex flex-col gap-2.5">
                <Link href={`/${rightFeatured.category}/${rightFeatured.slug}`}>
                  <ArticleCardImage article={rightFeatured} aspectRatio="aspect-3/2" />
                </Link>
                <Link href={`/${rightFeatured.category}/${rightFeatured.slug}`}>
                  <h2 className="text-[20px] font-semibold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1">
                    {rightFeatured.title}
                  </h2>
                </Link>
              </article>
            )}

            <div className="h-[1px] bg-neutral-200/50 w-full my-1" />

            <div className="flex flex-col divide-y divide-neutral-200/50">
              {rightThumbnails.map((item, idx) => (
                <article key={item.slug || idx} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5">
                  <div className="w-[130px] shrink-0 mt-0.5">
                    <Link href={`/${item.category}/${item.slug}`}>
                      <ArticleCardImage article={item} aspectRatio="aspect-3/2" className="rounded-xs" />
                    </Link>
                  </div>
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <Link href={`/${item.category}/${item.slug}`}>
                      <h3 className="text-[15.5px] font-medium leading-snug tracking-tight text-neutral-800 hover:underline transition-colors duration-150">
                        {item.title}
                      </h3>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
