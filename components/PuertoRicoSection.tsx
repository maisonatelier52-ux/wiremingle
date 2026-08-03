"use client";

import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  data: Article[];
}

export default function PuertoRicoSection({ data = [] }: Props) {
  const cards = data.slice(0, 3);

  return (
    <section className="mx-auto max-w-[94%] xl:max-w-[1360px] px-5 md:px-8 py-8 bg-white text-black font-sans">
      <div className="border-l-4 border-black pl-2 mb-5">
        <h2 className="text-[14.5px] font-extrabold tracking-wider text-black uppercase">
          REGIONAL & BUSINESS SPOTLIGHT
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {cards.map((item, idx) => (
          <article key={item.slug || idx} className="flex flex-col gap-2.5">
            <Link href={`/${item.category}/${item.slug}`}>
              <ArticleCardImage article={item} aspectRatio="aspect-16/10" className="rounded-lg" />
            </Link>
            <Link href={`/${item.category}/${item.slug}`}>
              <h3 className="text-[13.5px] font-bold leading-snug tracking-tight text-neutral-900 hover:underline transition-colors duration-150 mt-1 line-clamp-3">
                {item.title}
              </h3>
            </Link>
          </article>
        ))}

        {/* Taller Advertisement Card */}
        <div className="flex flex-col gap-2.5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <svg viewBox="0 0 300 225" className="h-full w-full object-cover">
              <rect width="300" height="225" fill="#171717" />
              <circle cx="150" cy="112" r="130" fill="url(#ad-glow)" />
              <text x="150" y="118" fontSize="26" fontWeight="800" fill="#f59e0b" fontFamily="Georgia, serif" textAnchor="middle" letterSpacing="-0.5">
                .newsflashpro
              </text>
              <path d="M 0 200 Q 150 185 300 200 L 300 225 L 0 225 Z" fill="#d97706" />
              <defs>
                <radialGradient id="ad-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#262626" />
                  <stop offset="100%" stopColor="#171717" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          <span className="text-[10.5px] font-bold text-neutral-400 tracking-wide uppercase mt-1">
            ADVERTISEMENT
          </span>
        </div>

      </div>
    </section>
  );
}
