"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  category: string;
  data?: Article[];
}

export default function CategoryHero({ category, data = [] }: Props) {
  if (!data || data.length === 0) return null;

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  
  const leftFeatured = data[0];
  const leftList = data.slice(1, 3);
  
  const midFeatured = data[3];
  const midList = data.slice(4, 9);
  
  const sideTop = data[9];
  const sideBottom = data[10];

  const hasMid = Boolean(midFeatured || midList.length > 0);
  const hasSide = Boolean(sideTop || sideBottom);

  let leftColSpan = "lg:col-span-6";
  let midColSpan = "lg:col-span-3";
  let sideColSpan = "lg:col-span-3";

  if (hasMid && !hasSide) {
    leftColSpan = "lg:col-span-7";
    midColSpan = "lg:col-span-5";
  } else if (!hasMid && hasSide) {
    leftColSpan = "lg:col-span-7";
    sideColSpan = "lg:col-span-5";
  } else if (!hasMid && !hasSide) {
    leftColSpan = "lg:col-span-12";
  }

  return (
    <section className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 py-6 md:px-6 bg-white text-black font-sans select-none">
      {/* Category Section Title Header */}
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 mb-4">
        {categoryTitle}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Main Category Hero & Text List                               */}
        {/* ========================================================================= */}
        <div className={`${leftColSpan} flex flex-col gap-3 h-full`}>
          {leftFeatured && (
            <article className="flex flex-col gap-2.5">
              <Link href={`/${leftFeatured.category}/${leftFeatured.slug}`}>
                <ArticleCardImage article={leftFeatured} aspectRatio="aspect-16/10" className="rounded-xl" />
              </Link>
              <Link href={`/${leftFeatured.category}/${leftFeatured.slug}`}>
                <h2 className="text-[24px] md:text-[28px] font-bold leading-tight tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1">
                  {leftFeatured.title}
                </h2>
              </Link>
            </article>
          )}

          {leftList.length > 0 && (
            <div className="flex flex-col divide-y divide-neutral-200/60 mt-1">
              {leftList.map((item, idx) => (
                <article key={item.slug || idx} className="py-2.5 first:pt-0 last:pb-0 flex flex-col">
                  <Link href={`/${item.category}/${item.slug}`}>
                    <h3 className="text-[17.5px] font-medium leading-snug tracking-tight text-neutral-800 hover:underline transition-colors duration-150">
                      {item.title}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* MIDDLE COLUMN: Sub Featured & Stacked Headlines                            */}
        {/* ========================================================================= */}
        {hasMid && (
          <div className={`${midColSpan} flex flex-col gap-3 h-full`}>
            {midFeatured && (
              <article className="flex flex-col gap-2">
                <Link href={`/${midFeatured.category}/${midFeatured.slug}`}>
                  <ArticleCardImage article={midFeatured} aspectRatio="aspect-16/10" className="rounded-xl" />
                </Link>
                <Link href={`/${midFeatured.category}/${midFeatured.slug}`}>
                  <h3 className="text-[20px] font-semibold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1">
                    {midFeatured.title}
                  </h3>
                </Link>
              </article>
            )}

            {midList.length > 0 && (
              <div className="flex flex-col divide-y divide-neutral-200/60 mt-1">
                {midList.map((item, idx) => (
                  <article key={item.slug || idx} className="py-2.5 first:pt-0 last:pb-0 flex flex-col">
                    <Link href={`/${item.category}/${item.slug}`}>
                      <h4 className="text-[14.5px] md:text-[15px] font-medium leading-snug tracking-tight text-neutral-800 hover:underline transition-colors duration-150 line-clamp-2">
                        {item.title}
                      </h4>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: 2 Stacked Feature Cards                                     */}
        {/* ========================================================================= */}
        {hasSide && (
          <div className={`${sideColSpan} flex flex-col gap-5 h-full`}>
            {sideTop && (
              <article className="flex flex-col gap-2">
                <Link href={`/${sideTop.category}/${sideTop.slug}`}>
                  <ArticleCardImage article={sideTop} aspectRatio="aspect-3/2" className="rounded-xl" />
                </Link>
                <Link href={`/${sideTop.category}/${sideTop.slug}`}>
                  <h3 className="text-[17.5px] font-semibold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1 line-clamp-3">
                    {sideTop.title}
                  </h3>
                </Link>
              </article>
            )}

            {sideBottom && (
              <article className="flex flex-col gap-2">
                <Link href={`/${sideBottom.category}/${sideBottom.slug}`}>
                  <ArticleCardImage article={sideBottom} aspectRatio="aspect-3/2" className="rounded-xl" />
                </Link>
                <Link href={`/${sideBottom.category}/${sideBottom.slug}`}>
                  <h3 className="text-[17.5px] font-semibold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1 line-clamp-3">
                    {sideBottom.title}
                  </h3>
                </Link>
              </article>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
