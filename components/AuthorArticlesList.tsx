"use client";

import { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/types";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  articles: Article[];
  authorName: string;
}

function cleanText(str?: string): string {
  if (!str) return "";
  return str
    .replace(/:contentReference\[[^\]]*\](?:\{[^}]*\})?/g, "")
    .replace(/&eacute;/g, "é")
    .replace(/&Eacute;/g, "É")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rdquo;/g, "”")
    .replace(/&ldquo;/g, "“")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .trim();
}

export default function AuthorArticlesList({ articles, authorName }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const el = document.getElementById("author-articles");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (totalArticles === 0) {
    return (
      <div id="author-articles" className="w-full py-8 text-neutral-500 italic">
        No articles currently published by this author.
      </div>
    );
  }

  const endItem = Math.min(startIndex + itemsPerPage, totalArticles);

  return (
    <section id="author-articles" className="w-full select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-neutral-900 flex items-center gap-2">
          <span className="w-[3.5px] h-5 bg-black block flex-shrink-0" />
          <span>Articles by {authorName}</span>
        </h2>

        {totalArticles > itemsPerPage && (
          <span className="text-xs font-semibold text-neutral-500">
            Showing {startIndex + 1}–{endItem} of {totalArticles} articles
          </span>
        )}
      </div>

      {/* Grid of Articles (6 per page) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentArticles.map((item, idx) => (
          <article key={item.slug || idx} className="group flex flex-col gap-3">
            <Link href={`/${item.category.toLowerCase()}/${item.slug}`} className="block overflow-hidden rounded-xl">
              <ArticleCardImage article={item} aspectRatio="aspect-16/10" className="rounded-xl" />
            </Link>

            <div className="flex items-center gap-2 text-xs font-bold text-[#E31B23] uppercase tracking-wider">
              <span>{item.category}</span>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-400 font-normal">{item.date || "July 2026"}</span>
            </div>

            <Link href={`/${item.category.toLowerCase()}/${item.slug}`}>
              <h3 className="text-lg font-bold leading-snug tracking-tight text-neutral-900 group-hover:underline transition-colors line-clamp-3">
                {cleanText(item.title)}
              </h3>
            </Link>

            <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
              {cleanText(item.shortdescription)}
            </p>
          </article>
        ))}
      </div>

      {/* Pagination Controls (Shown only if totalArticles > 6) */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-neutral-200">
          
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1.5 ${
              currentPage === 1
                ? "border-neutral-200 text-neutral-300 cursor-not-allowed bg-neutral-50"
                : "border-neutral-300 text-neutral-800 hover:bg-black hover:text-white hover:border-black cursor-pointer"
            }`}
          >
            ← Previous
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`w-8 h-8 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#E31B23] text-white border-[#E31B23]"
                    : "border-neutral-200 text-neutral-700 hover:border-black hover:text-black"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-xs font-bold rounded-lg border transition-colors flex items-center gap-1.5 ${
              currentPage === totalPages
                ? "border-neutral-200 text-neutral-300 cursor-not-allowed bg-neutral-50"
                : "border-neutral-300 text-neutral-800 hover:bg-black hover:text-white hover:border-black cursor-pointer"
            }`}
          >
            Next →
          </button>

        </div>
      )}
    </section>
  );
}
