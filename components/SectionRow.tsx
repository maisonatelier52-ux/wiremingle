"use client";

import Link from "next/link";
import { Article } from "@/lib/types";
import ArticleCardImage from "./ArticleCardImage";

export interface SectionCardData {
  sectionTitle: string;
  headline: string;
  href: string;
  badgeText?: string;
  article?: Article;
}

interface SectionRowProps {
  title?: string;
  cards: SectionCardData[];
}

export default function SectionRow({ title, cards }: SectionRowProps) {
  return (
    <div className="w-full bg-white select-none">
      {/* Optional Top Bold Title */}
      {title && (
        <div className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 md:px-6 pt-8">
          <h2 className="text-xl md:text-2xl font-black text-black tracking-tight uppercase">
            {title}
          </h2>
        </div>
      )}

      {/* Grid Cards Row */}
      <section className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 py-6 md:px-6 bg-white text-black font-sans">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              
              {/* Header with vertical black bar indicator */}
              <div className="border-l-4 border-black pl-2">
                <h3 className="text-[14.5px] font-extrabold tracking-wider text-black uppercase">
                  {card.sectionTitle}
                </h3>
              </div>

              {/* Image Card link */}
              <Link href={card.href} className="group flex flex-col gap-2.5">
                <ArticleCardImage article={card.article} aspectRatio="aspect-16/10" />

                {card.article?.date && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black tracking-widest text-[#E31B23] uppercase">
                      {card.article.category}
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-[11px] font-bold text-neutral-400">
                      {card.article.date}
                    </span>
                  </div>
                )}

                <h4 className="text-[14.5px] font-extrabold leading-snug tracking-tight text-neutral-900 group-hover:underline transition-colors duration-150">
                  {card.headline}
                </h4>

                {card.article?.shortdescription && (
                  <p className="text-[12.5px] text-neutral-600 leading-relaxed line-clamp-2">
                    {card.article.shortdescription}
                  </p>
                )}
              </Link>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
