"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Article } from "@/lib/newsUtils";
import ArticleCardImage from "./ArticleCardImage";

interface Props {
  data: Article[];
}

export default function ShortsCarousel({ data = [] }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollSpeedRef = useRef<number>(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollLimits = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    const tolerance = 5;
    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollLimits();
    el.addEventListener("scroll", checkScrollLimits);
    window.addEventListener("resize", checkScrollLimits);

    return () => {
      el.removeEventListener("scroll", checkScrollLimits);
      window.removeEventListener("resize", checkScrollLimits);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [checkScrollLimits]);

  // Continuous animation loop for mouse hover scroll
  const step = useCallback(() => {
    if (scrollContainerRef.current && scrollSpeedRef.current !== 0) {
      scrollContainerRef.current.scrollLeft += scrollSpeedRef.current;
      checkScrollLimits();
      animationFrameRef.current = requestAnimationFrame(step);
    } else {
      animationFrameRef.current = null;
    }
  }, [checkScrollLimits]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    const leftZone = width * 0.35;
    const rightZone = width * 0.65;

    let speed = 0;
    if (x > rightZone) {
      // Mouse in right zone -> scroll right automatically (gentle & slow)
      const ratio = (x - rightZone) / (width - rightZone);
      speed = Math.min(3, Math.max(0.8, ratio * 3.5));
    } else if (x < leftZone) {
      // Mouse in left zone -> scroll left automatically (gentle & slow)
      const ratio = (leftZone - x) / leftZone;
      speed = -Math.min(3, Math.max(0.8, ratio * 3.5));
    }

    scrollSpeedRef.current = speed;

    if (speed !== 0 && !animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(step);
    }
  };

  const handleMouseLeave = () => {
    scrollSpeedRef.current = 0;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollOffset = direction === "left" ? -350 : 350;
    el.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[94%] xl:max-w-[1360px] px-5 md:px-8 py-8 bg-white text-black font-sans relative select-none">
      {/* Header Title */}
      <h2 className="text-xl md:text-2xl font-black text-black mb-5 tracking-tight flex items-baseline gap-1.5 select-none">
        wiremingle <span className="font-black">Shorts</span>
      </h2>

      <div 
        className="relative group/carousel"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Carousel Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-3 px-1.5 -mx-1.5"
        >
          {data.map((item, idx) => (
            <article
              key={item.slug || idx}
              className="relative aspect-[3/4] w-[210px] sm:w-[220px] md:w-[230px] shrink-0 overflow-hidden rounded-xl bg-neutral-950 border border-neutral-200 group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Link href={`/${item.category.toLowerCase()}/${item.slug}`} className="h-full w-full block">
                <ArticleCardImage article={item} aspectRatio="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white text-[10.5px] md:text-[11.5px] font-bold leading-snug tracking-tight group-hover:underline transition-colors line-clamp-3">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
