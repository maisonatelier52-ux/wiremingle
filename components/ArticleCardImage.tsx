"use client";

import { useState } from "react";
import { Article } from "@/lib/types";

interface ArticleCardImageProps {
  article?: Article;
  aspectRatio?: string; // e.g. "aspect-16/10", "aspect-4/3", "aspect-3/2"
  className?: string;
}

export default function ArticleCardImage({
  article,
  aspectRatio = "aspect-16/10",
  className = "",
}: ArticleCardImageProps) {
  const [imageError, setImageError] = useState(false);

  const category = (article?.category || "general").toLowerCase();

  // Category theme configurations for fallbacks
  const themeMap: Record<string, { bg: string; text: string; label: string; icon: string }> = {
    business: { bg: "bg-slate-900", text: "text-blue-400", label: "BUSINESS", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
    technology: { bg: "bg-neutral-900", text: "text-cyan-400", label: "TECHNOLOGY", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    politics: { bg: "bg-stone-900", text: "text-red-400", label: "POLITICS", icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v4H4z" },
    world: { bg: "bg-slate-950", text: "text-emerald-400", label: "WORLD", icon: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3.6 9h16.8 M3.6 15h16.8" },
    finance: { bg: "bg-indigo-950", text: "text-amber-400", label: "FINANCE", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" },
    lifestyle: { bg: "bg-neutral-900", text: "text-rose-400", label: "LIFESTYLE", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
    opinion: { bg: "bg-purple-950", text: "text-purple-300", label: "OPINION", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
    investigation: { bg: "bg-zinc-900", text: "text-amber-500", label: "INVESTIGATION", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  };

  const theme = themeMap[category] || {
    bg: "bg-neutral-900",
    text: "text-red-500",
    label: category.toUpperCase(),
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  };

  const hasImage = Boolean(article?.image) && !imageError;

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden rounded bg-neutral-100 border border-neutral-200 ${className}`}
    >
      {hasImage ? (
        <img
          src={article!.image}
          alt={article?.title || "News article image"}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className={`h-full w-full ${theme.bg} flex flex-col items-center justify-center p-4 text-center select-none`}>
          <svg className={`h-10 w-10 ${theme.text} mb-2 opacity-80`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d={theme.icon} />
          </svg>
          <span className={`text-[11px] font-black tracking-widest uppercase ${theme.text}`}>
            {theme.label}
          </span>
        </div>
      )}
    </div>
  );
}
