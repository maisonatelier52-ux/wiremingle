"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  category: string;
  data?: Article[];
}

export default function AroundCategorySection({ category, data = [] }: Props) {
  if (!data || data.length === 0) return null;

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  const sectionTitle = `Around the ${categoryTitle}`;
  const subCategoryLabel = category.toUpperCase();

  const col1Article = data[0];
  const col1List = data.slice(1, 3);

  const col2Article = data[3];
  const col2List = data.slice(4, 6);

  const photosList = data.slice(6, 10);

  const hasCol1 = Boolean(col1Article || col1List.length > 0);
  const hasCol2 = Boolean(col2Article || col2List.length > 0);
  const hasPhotos = photosList.length > 0;

  if (!hasCol1 && !hasCol2 && !hasPhotos) return null;

  const col1Span = "lg:col-span-4";
  const col2Span = "lg:col-span-4";
  const photosSpan = "lg:col-span-4";

  return (
    <section className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 py-8 md:px-6 bg-white text-black font-sans select-none">
      {/* Section Main Title */}
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 mb-5">
        {sectionTitle}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================================= */}
        {/* COLUMN 1: Category Column                                                 */}
        {/* ========================================================================= */}
        {hasCol1 && (
          <div className={`${col1Span} flex flex-col gap-4`}>
            <div className="flex items-center gap-2">
              <span className="w-[3px] h-4 bg-black block" />
              <span className="text-[13.5px] font-bold text-black uppercase tracking-wide">
                {categoryTitle}
              </span>
            </div>

            {col1Article && (
              <article className="flex flex-col gap-2.5">
                <Link href={`/${col1Article.category}/${col1Article.slug}`}>
                  <ArticleCardImage article={col1Article} aspectRatio="aspect-16/10" className="rounded-xl" />
                </Link>
                <Link href={`/${col1Article.category}/${col1Article.slug}`}>
                  <h3 className="text-[18px] md:text-[20px] font-bold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1">
                    {col1Article.title}
                  </h3>
                </Link>
              </article>
            )}

            {col1List.length > 0 && (
              <>
                <div className="h-[1px] bg-neutral-200/60 w-full my-0.5" />
                <div className="flex flex-col divide-y divide-neutral-200/60">
                  {col1List.map((item, idx) => (
                    <article key={item.slug || idx} className="py-2.5 first:pt-0 last:pb-0 flex flex-col">
                      <Link href={`/${item.category}/${item.slug}`}>
                        <p className="text-[14px] text-neutral-900 leading-snug line-clamp-2 hover:underline">
                          {item.shortdescription || item.title}
                        </p>
                      </Link>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* COLUMN 2: Category Column                                                 */}
        {/* ========================================================================= */}
        {hasCol2 && (
          <div className={`${col2Span} flex flex-col gap-4`}>
            <div className="flex items-center gap-2">
              <span className="w-[3px] h-4 bg-black block" />
              <span className="text-[13.5px] font-bold text-black uppercase tracking-wide">
                {categoryTitle}
              </span>
            </div>

            {col2Article && (
              <article className="flex flex-col gap-2.5">
                <Link href={`/${col2Article.category}/${col2Article.slug}`}>
                  <ArticleCardImage article={col2Article} aspectRatio="aspect-16/10" className="rounded-xl" />
                </Link>
                <Link href={`/${col2Article.category}/${col2Article.slug}`}>
                  <h3 className="text-[18px] md:text-[20px] font-bold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1">
                    {col2Article.title}
                  </h3>
                </Link>
              </article>
            )}

            {col2List.length > 0 && (
              <>
                <div className="h-[1px] bg-neutral-200/60 w-full my-0.5" />
                <div className="flex flex-col divide-y divide-neutral-200/60">
                  {col2List.map((item, idx) => (
                    <article key={item.slug || idx} className="py-2.5 first:pt-0 last:pb-0 flex flex-col">
                      <Link href={`/${item.category}/${item.slug}`}>
                        <p className="text-[14px] text-neutral-900 leading-snug line-clamp-2 hover:underline">
                          {item.shortdescription || item.title}
                        </p>
                      </Link>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* COLUMN 3: CATEGORY IN PHOTOS 2x2 Grid                                     */}
        {/* ========================================================================= */}
        {hasPhotos && (
          <div className={`${photosSpan} flex flex-col gap-4`}>
            <div className="flex items-center gap-2">
              <span className="w-[3px] h-4 bg-black block" />
              <span className="text-[13.5px] font-bold text-black uppercase tracking-wide">
                {subCategoryLabel} IN PHOTOS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {photosList.map((item, idx) => (
                <article key={item.slug || idx} className="flex flex-col">
                  <Link href={`/${item.category}/${item.slug}`} className="block overflow-hidden rounded-xl">
                    <ArticleCardImage article={item} aspectRatio="aspect-4/3" className="rounded-xl" />
                  </Link>
                  <span className="text-[12.5px] font-bold text-neutral-900 mt-2 block">
                    {item.date || "April 17, 2026"}
                  </span>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
