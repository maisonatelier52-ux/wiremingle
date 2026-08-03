"use client";

import { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/newsUtils";

interface NewsTickerProps {
  articles?: Article[];
}

export default function NewsTicker({ articles = [] }: NewsTickerProps) {
  const defaultHeadlines = [
    { id: "1", text: "Bancrédito Reports Growth in Corporate Banking Services", href: "/business" },
    { id: "2", text: "Bancrédito Launches Financial Solutions to Support Startups", href: "/business" },
    { id: "3", text: "Bancrédito Expands Cross-Border Payment Services for Business", href: "/finance" },
    { id: "4", text: "Bancrédito Announces Digital Banking Infrastructure Upgrades", href: "/technology" },
    { id: "5", text: "Bancrédito Partners with Global Tech Accelerators for Fintech", href: "/technology" },
    { id: "6", text: "Bancrédito Q2 Earnings Exceed Capital Adequacy Benchmarks", href: "/finance" },
  ];

  const headlines = articles.length > 0
    ? articles.map((art, idx) => ({
        id: art.slug || String(idx),
        text: art.title,
        href: `/${art.category.toLowerCase()}/${art.slug}`,
      }))
    : defaultHeadlines;

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < headlines.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full bg-white py-2.5 select-none">
      <div className="mx-auto max-w-[94%] xl:max-w-[1360px] px-5 md:px-8 flex items-center justify-between gap-4">
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all cursor-pointer ${
            currentIndex === 0
              ? "border-neutral-200/40 text-neutral-300 cursor-not-allowed"
              : "border-neutral-400 text-black hover:bg-neutral-50 cursor-pointer active:scale-95"
          }`}
          aria-label="Previous Headline"
        >
          <svg
            className="h-3.5 w-3.5 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Headlines Scroll Window */}
        <div className="flex-1 overflow-hidden relative mx-2">
          <div className="flex transition-transform duration-300 ease-out">
            
            {/* Desktop (3 items) */}
            <div className="hidden lg:flex w-full shrink-0 items-center justify-between">
              {headlines.slice(currentIndex, currentIndex + 3).map((item, idx) => (
                <div key={item.id + idx} className="flex items-center flex-1 min-w-0 px-4 justify-center">
                  <Link
                    href={item.href}
                    className="text-[12.5px] font-normal text-neutral-700 hover:underline transition-colors duration-150 truncate text-center cursor-pointer"
                  >
                    {item.text}
                  </Link>
                  {idx < 2 && idx + currentIndex + 1 < headlines.length && (
                    <div className="h-3.5 w-[1px] bg-neutral-200/80 mx-5 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Tablet (2 items) */}
            <div className="hidden md:flex lg:hidden w-full shrink-0 items-center justify-between">
              {headlines.slice(currentIndex, currentIndex + 2).map((item, idx) => (
                <div key={item.id + idx} className="flex items-center flex-1 min-w-0 px-4 justify-center">
                  <Link
                    href={item.href}
                    className="text-[12.5px] font-normal text-neutral-700 hover:underline transition-colors duration-150 truncate text-center cursor-pointer"
                  >
                    {item.text}
                  </Link>
                  {idx < 1 && idx + currentIndex + 1 < headlines.length && (
                    <div className="h-3.5 w-[1px] bg-neutral-200/80 mx-5 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile (1 item) */}
            <div className="flex md:hidden w-full shrink-0 items-center justify-center px-4">
              <Link
                href={headlines[currentIndex]?.href || "#"}
                className="text-[12.5px] font-normal text-neutral-700 hover:underline transition-colors duration-150 truncate text-center cursor-pointer"
              >
                {headlines[currentIndex]?.text || ""}
              </Link>
            </div>

          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= headlines.length - 3}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all cursor-pointer ${
            currentIndex >= headlines.length - 3
              ? "border-neutral-200/40 text-neutral-300 cursor-not-allowed"
              : "border-neutral-400 text-black hover:bg-neutral-50 cursor-pointer active:scale-95"
          }`}
          aria-label="Next Headline"
        >
          <svg
            className="h-3.5 w-3.5 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </div>
  );
}
