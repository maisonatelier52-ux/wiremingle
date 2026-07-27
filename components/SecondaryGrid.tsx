"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  data: Article[];
}

export default function SecondaryGrid({ data = [] }: Props) {
  const col1Featured = data[0];
  const col1List = data.slice(1, 3);

  const col2Featured = data[3];
  const col2List = data.slice(4, 6);

  const col3Featured = data[6];
  const col3List = data.slice(7, 9);

  return (
    <section className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 pt-4 pb-8 md:px-6 bg-white text-black font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* COLUMN 1: MORE TOP STORIES */}
        <div className="flex flex-col gap-4 md:border-r border-neutral-200/50 md:pr-5 h-full">
          <div className="border-l-4 border-black pl-2">
            <h2 className="text-[14.5px] font-extrabold tracking-wider text-black uppercase">
              MORE TOP STORIES
            </h2>
          </div>

          {col1Featured && (
            <article className="flex flex-col gap-2">
              <Link href={`/${col1Featured.category}/${col1Featured.slug}`}>
                <ArticleCardImage article={col1Featured} aspectRatio="aspect-16/10" />
              </Link>
              <Link href={`/${col1Featured.category}/${col1Featured.slug}`}>
                <h3 className="text-[20px] font-semibold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1">
                  {col1Featured.title}
                </h3>
              </Link>
            </article>
          )}

          <div className="h-[1px] bg-neutral-200/50 w-full my-1" />

          <div className="flex flex-col divide-y divide-neutral-200/50">
            {col1List.map((item, idx) => (
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

        {/* COLUMN 2: POLITICS & POLICY */}
        <div className="flex flex-col gap-4 md:border-r border-neutral-200/50 md:pr-5 h-full">
          <div className="border-l-4 border-black pl-2">
            <h2 className="text-[14.5px] font-extrabold tracking-wider text-black uppercase">
              POLITICS & POLICY
            </h2>
          </div>

          {col2Featured && (
            <article className="flex flex-col gap-2">
              <Link href={`/${col2Featured.category}/${col2Featured.slug}`}>
                <ArticleCardImage article={col2Featured} aspectRatio="aspect-16/10" />
              </Link>
              <Link href={`/${col2Featured.category}/${col2Featured.slug}`}>
                <h3 className="text-[20px] font-semibold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1">
                  {col2Featured.title}
                </h3>
              </Link>
            </article>
          )}

          <div className="h-[1px] bg-neutral-200/50 w-full my-1" />

          <div className="flex flex-col divide-y divide-neutral-200/50">
            {col2List.map((item, idx) => (
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

        {/* COLUMN 3: INVESTIGATION & INSIGHTS */}
        <div className="flex flex-col gap-4 h-full">
          <div className="border-l-4 border-black pl-2">
            <h2 className="text-[14.5px] font-extrabold tracking-wider text-black uppercase">
              INVESTIGATION & INSIGHTS
            </h2>
          </div>

          {col3Featured && (
            <article className="flex flex-col gap-2">
              <Link href={`/${col3Featured.category}/${col3Featured.slug}`}>
                <ArticleCardImage article={col3Featured} aspectRatio="aspect-16/10" />
              </Link>
              <Link href={`/${col3Featured.category}/${col3Featured.slug}`}>
                <h3 className="text-[20px] font-semibold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1">
                  {col3Featured.title}
                </h3>
              </Link>
            </article>
          )}

          <div className="h-[1px] bg-neutral-200/50 w-full my-1" />

          <div className="flex flex-col divide-y divide-neutral-200/50">
            {col3List.map((item, idx) => (
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
    </section>
  );
}
