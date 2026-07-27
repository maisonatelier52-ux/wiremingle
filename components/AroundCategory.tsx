"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ColumnData {
  categoryTag: string;
  headline: string;
  imageType: string;
  articles: string[];
}

interface PhotoItem {
  imageType: string;
  date: string;
}

interface PhotosData {
  categoryTag: string;
  items: PhotoItem[];
}

interface AroundSectionProps {
  aroundSection: {
    title: string;
    column1: ColumnData;
    column2: ColumnData;
    photos: PhotosData;
  };
}

export default function AroundCategory({ aroundSection }: AroundSectionProps) {
  if (!aroundSection) return null;

  const { title, column1, column2, photos } = aroundSection;

  // Custom SVG Render Map for AroundCategory
  const renderSVG = (type: string): ReactNode => {
    switch (type) {
      case "economic":
        return (
          <svg viewBox="0 0 300 188" className="h-full w-full object-cover">
            <rect width="300" height="188" fill="#15803d" />
            <path d="M 20 150 Q 80 80 140 110 T 260 50" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <circle cx="260" cy="50" r="8" fill="#ffffff" />
            <line x1="20" y1="160" x2="280" y2="160" stroke="#166534" strokeWidth="3" />
            <line x1="20" y1="160" x2="20" y2="20" stroke="#166534" strokeWidth="3" />
            {/* Grid lines */}
            <line x1="20" y1="120" x2="280" y2="120" stroke="#166534" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="20" y1="80" x2="280" y2="80" stroke="#166534" strokeWidth="1" strokeDasharray="4,4" />
          </svg>
        );

      case "assembly":
        return (
          <svg viewBox="0 0 300 188" className="h-full w-full object-cover">
            <rect width="300" height="188" fill="#451a03" />
            <path d="M 0 115 Q 150 90 300 115 L 300 188 L 0 188 Z" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
            <path d="M 0 130 Q 150 110 300 130 L 300 188 L 0 188 Z" fill="#d97706" />
            {/* Delegates backs */}
            <circle cx="80" cy="115" r="5" fill="#09090b" />
            <circle cx="120" cy="118" r="5" fill="#09090b" />
            <circle cx="180" cy="118" r="5" fill="#09090b" />
            <circle cx="220" cy="115" r="5" fill="#09090b" />
          </svg>
        );

      case "world-network":
        return (
          <svg viewBox="0 0 300 188" className="h-full w-full object-cover">
            <rect width="300" height="188" fill="#1e1b4b" />
            <circle cx="150" cy="94" r="75" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
            <ellipse cx="150" cy="94" rx="75" ry="32" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
            {/* Glowing nodes */}
            <circle cx="150" cy="35" r="5" fill="#ef4444" />
            <circle cx="105" cy="70" r="4" fill="#f59e0b" />
            <circle cx="195" cy="70" r="4" fill="#f59e0b" />
            <circle cx="85" cy="115" r="4" fill="#f59e0b" />
            <circle cx="215" cy="115" r="4" fill="#f59e0b" />
            <line x1="150" y1="35" x2="105" y2="70" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="150" y1="35" x2="195" y2="70" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3,3" />
          </svg>
        );

      case "finance-coins":
        return (
          <svg viewBox="0 0 300 188" className="h-full w-full object-cover">
            <rect width="300" height="188" fill="#0f172a" />
            <g transform="translate(40, 20)">
              {/* Stack 1 */}
              <ellipse cx="50" cy="120" rx="20" ry="8" fill="#eab308" />
              <rect x="30" y="100" width="40" height="20" fill="#ca8a04" />
              <ellipse cx="50" cy="100" rx="20" ry="8" fill="#eab308" />
              <rect x="30" y="80" width="40" height="20" fill="#a16207" />
              <ellipse cx="50" cy="80" rx="20" ry="8" fill="#eab308" />
              {/* Stack 2 */}
              <ellipse cx="110" cy="130" rx="20" ry="8" fill="#eab308" />
              <rect x="90" y="110" width="40" height="20" fill="#ca8a04" />
              <ellipse cx="110" cy="110" rx="20" ry="8" fill="#eab308" />
            </g>
            {/* Chart Trend Line */}
            <path d="M 30 140 L 100 100 L 170 120 L 250 40" fill="none" stroke="#10b981" strokeWidth="3" />
            <circle cx="250" cy="40" r="5" fill="#10b981" />
          </svg>
        );

      case "puertorico":
        return (
          <svg viewBox="0 0 300 188" className="h-full w-full object-cover">
            <rect width="300" height="188" fill="#0284c7" />
            {/* Crowd representing Puerto Rico struggle / demonstration */}
            <path d="M 0 140 C 50,140 100,120 150,135 T 300 130 L 300 188 L 0 188 Z" fill="#1e293b" />
            {/* Flags waving outlines */}
            <polygon points="60,90 85,75 80,105" fill="#ef4444" />
            <line x1="60" y1="140" x2="60" y2="90" stroke="#09090b" strokeWidth="2" />
            
            <polygon points="180,80 205,65 200,95" fill="#3b82f6" />
            <line x1="180" y1="130" x2="180" y2="80" stroke="#09090b" strokeWidth="2" />

            <circle cx="65" cy="120" r="5" fill="#f87171" />
            <circle cx="120" cy="115" r="5" fill="#f87171" />
            <circle cx="190" cy="118" r="5" fill="#60a5fa" />
          </svg>
        );

      case "capitol":
        return (
          <svg viewBox="0 0 300 188" className="h-full w-full object-cover">
            <rect width="300" height="188" fill="#0c4a6e" />
            {/* Capitol dome silhouette */}
            <path d="M110,188 L110,130 L190,130 L190,188 Z" fill="#0f172a" />
            <path d="M125,130 C125,90 175,90 175,130 Z" fill="#1e293b" />
            <rect x="145" y="75" width="10" height="20" fill="#334155" />
            <line x1="150" y1="75" x2="150" y2="40" stroke="#cbd5e1" strokeWidth="2" />
            {/* Waving US Flag */}
            <polygon points="150,45 175,35 170,55 150,60" fill="#ef4444" />
          </svg>
        );

      case "crosswalk":
        return (
          <svg viewBox="0 0 300 188" className="h-full w-full object-cover">
            <rect width="300" height="188" fill="#374151" />
            {/* Crosswalk white stripes perspective */}
            <polygon points="60,188 100,188 135,110 115,110" fill="#ffffff" opacity="0.6" />
            <polygon points="140,188 180,188 185,110 165,110" fill="#ffffff" opacity="0.6" />
            <polygon points="220,188 260,188 235,110 215,110" fill="#ffffff" opacity="0.6" />
            {/* Silhouettes crossing */}
            <circle cx="110" cy="80" r="6" fill="#09090b" />
            <line x1="110" y1="86" x2="110" y2="120" stroke="#09090b" strokeWidth="4" />
            
            <circle cx="180" cy="75" r="6" fill="#09090b" />
            <line x1="180" y1="81" x2="180" y2="115" stroke="#09090b" strokeWidth="4" />
          </svg>
        );

      case "tech-robot":
        return (
          <svg viewBox="0 0 300 188" className="h-full w-full object-cover">
            <rect width="300" height="188" fill="#0f172a" />
            <circle cx="150" cy="94" r="50" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="150" cy="94" r="8" fill="#ef4444" />
            {/* Robot circuit pathways */}
            <path d="M150,44 L150,20 L100,20" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <path d="M150,144 L150,168 L200,168" fill="none" stroke="#3b82f6" strokeWidth="2" />
          </svg>
        );

      case "nyse":
        return (
          <svg viewBox="0 0 300 188" className="h-full w-full object-cover">
            <rect width="300" height="188" fill="#0f172a" />
            <rect x="75" y="20" width="150" height="40" fill="#1e293b" rx="2" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="150" y="47" fontSize="21" fontWeight="900" fill="#ffffff" textAnchor="middle">NYSE</text>
            <path d="M 0 130 Q 150 110 300 130 L 300 188 L 0 188 Z" fill="#1e293b" />
          </svg>
        );

      case "trader":
        return (
          <svg viewBox="0 0 300 188" className="h-full w-full object-cover">
            <rect width="300" height="188" fill="#18181b" />
            <g transform="translate(180, 40)">
              <circle cx="35" cy="30" r="14" fill="#a1a1aa" />
              <path d="M10,120 L25,60 C30,55 50,55 55,60 L70,120" stroke="#27272a" strokeWidth="10" strokeLinecap="round" />
            </g>
            <rect x="25" y="30" width="85" height="55" fill="#1e293b" rx="2" stroke="#52525b" strokeWidth="2" />
            <rect x="28" y="33" width="79" height="49" fill="#09090b" />
            <path d="M30,70 L45,50 L60,60 L75,40 C80,38 90,45 100,35" stroke="#ef4444" strokeWidth="2" fill="none" />
          </svg>
        );

      case "lifestyle-balance":
        return (
          <svg viewBox="0 0 300 188" className="h-full w-full object-cover">
            <rect width="300" height="188" fill="#0f766e" />
            {/* Balance scales representation */}
            <line x1="150" y1="30" x2="150" y2="150" stroke="#ffffff" strokeWidth="4" />
            <line x1="80" y1="150" x2="220" y2="150" stroke="#ffffff" strokeWidth="5" />
            {/* Crossbeam */}
            <line x1="70" y1="50" x2="230" y2="50" stroke="#ffffff" strokeWidth="4" />
            {/* Left pan */}
            <line x1="70" y1="50" x2="50" y2="90" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="70" y1="50" x2="90" y2="90" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 40 90 L 100 90 Q 70 110 40 90" fill="#cbd5e1" />
            {/* Right pan */}
            <line x1="230" y1="50" x2="210" y2="90" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="230" y1="50" x2="250" y2="90" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M 200 90 L 260 90 Q 230 110 200 90" fill="#cbd5e1" />
          </svg>
        );

      default:
        return (
          <div className="h-full w-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-400">
            NO IMAGE
          </div>
        );
    }
  };

  return (
    <section className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 py-8 md:px-6 bg-white text-black font-sans border-t border-neutral-100 mt-6">
      
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-black text-black mb-6 tracking-tight select-none">
        {title}
      </h2>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* ========================================================================= */}
        {/* COLUMN 1: Large Card + List of 4 Articles                                  */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-4">
          <div className="border-l-4 border-black pl-2 select-none">
            <span className="text-[10px] font-extrabold tracking-wider text-black uppercase">
              {column1.categoryTag}
            </span>
          </div>

          <Link href="#col1-featured" className="group flex flex-col gap-3">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200">
              <div className="h-full w-full transform transition-transform duration-500 ease-out group-hover:scale-104">
                {renderSVG(column1.imageType)}
              </div>
            </div>
            <h3 className="text-[15px] font-extrabold leading-snug tracking-tight text-black group-hover:underline transition-colors duration-150">
              {column1.headline}
            </h3>
          </Link>

          {/* List of 4 text articles */}
          <div className="flex flex-col divide-y divide-neutral-200 border-t border-neutral-200 mt-2">
            {column1.articles.map((text, idx) => (
              <Link
                key={idx}
                href={`#col1-article-${idx}`}
                className="py-3 text-[12.5px] font-medium leading-relaxed text-neutral-600 hover:underline transition-colors duration-150"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 2: Large Card 2 + List of 4 Articles                                */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-4">
          <div className="border-l-4 border-black pl-2 select-none">
            <span className="text-[10px] font-extrabold tracking-wider text-black uppercase">
              {column2.categoryTag}
            </span>
          </div>

          <Link href="#col2-featured" className="group flex flex-col gap-3">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200">
              <div className="h-full w-full transform transition-transform duration-500 ease-out group-hover:scale-104">
                {renderSVG(column2.imageType)}
              </div>
            </div>
            <h3 className="text-[15px] font-extrabold leading-snug tracking-tight text-black group-hover:underline transition-colors duration-150">
              {column2.headline}
            </h3>
          </Link>

          {/* List of 4 text articles */}
          <div className="flex flex-col divide-y divide-neutral-200 border-t border-neutral-200 mt-2">
            {column2.articles.map((text, idx) => (
              <Link
                key={idx}
                href={`#col2-article-${idx}`}
                className="py-3 text-[12.5px] font-medium leading-relaxed text-neutral-600 hover:underline transition-colors duration-150"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 3: Grid of 4 Small Photos                                          */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-4">
          <div className="border-l-4 border-black pl-2 select-none">
            <span className="text-[10px] font-extrabold tracking-wider text-black uppercase">
              {photos.categoryTag}
            </span>
          </div>

          {/* 2x2 Grid of small cards */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            {photos.items.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-md bg-neutral-100 border border-neutral-200 shadow-xs">
                  {renderSVG(item.imageType)}
                </div>
                <span className="text-[10.5px] font-bold text-neutral-500 tracking-tight select-none">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
