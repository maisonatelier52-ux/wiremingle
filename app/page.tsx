import HeroGrid from "@/components/HeroGrid";
import SecondaryGrid from "@/components/SecondaryGrid";
import WorldSection from "@/components/WorldSection";
import ThreeCardGrid from "@/components/ThreeCardGrid";
import CategoryColumnsRow from "@/components/CategoryColumnsRow";
import ShortsCarousel from "@/components/ShortsCarousel";
import PuertoRicoSection from "@/components/PuertoRicoSection";
import MoreFromWireMingle from "@/components/MoreFromWireMingle";
import Footer from "@/components/Footer";

// Category data imports
import businessData from "@/public/data/business.json";
import worldData from "@/public/data/world.json";
import financeData from "@/public/data/finance.json";
import technologyData from "@/public/data/technology.json";
import politicsData from "@/public/data/politics.json";
import lifestyleData from "@/public/data/lifestyle.json";
import opinionData from "@/public/data/opinion.json";
import investigationData from "@/public/data/investigation.json";

import { getSortedNews, Article } from "@/lib/newsUtils";

export default function Home() {
  const rawAllNews = getSortedNews([
    businessData as Article[],
    worldData as Article[],
    financeData as Article[],
    technologyData as Article[],
    politicsData as Article[],
    lifestyleData as Article[],
    opinionData as Article[],
    investigationData as Article[]
  ]);

  // Strictly deduplicate all articles by slug/title to ensure zero repeats
  const seenSlugs = new Set<string>();
  const allNews: Article[] = [];
  for (const article of rawAllNews) {
    const key = article.slug || article.title;
    if (!seenSlugs.has(key)) {
      seenSlugs.add(key);
      allNews.push(article);
    }
  }

  // Sequentially distribute unique articles across home page sections
  let cursor = 0;

  const heroNews = allNews.slice(cursor, cursor + 15);
  cursor += 15;

  const secondaryNews = allNews.slice(cursor, cursor + 9);
  cursor += 9;

  const worldNews = allNews.slice(cursor, cursor + 3);
  cursor += 3;

  const worldThreeCardNews = allNews.slice(cursor, cursor + 3);
  cursor += 3;

  // Category Columns 1 (BUSINESS, WORLD, FINANCE) - pick unique unused articles
  const cat1Article1 = allNews.slice(cursor).find((a) => a.category.toLowerCase() === "business") || allNews[cursor];
  const cat1Article2 = allNews.slice(cursor).find((a) => a.category.toLowerCase() === "world" && a.slug !== cat1Article1.slug) || allNews[cursor + 1];
  const cat1Article3 = allNews.slice(cursor).find((a) => a.category.toLowerCase() === "finance" && a.slug !== cat1Article1.slug && a.slug !== cat1Article2.slug) || allNews[cursor + 2];

  const categoryColumnsData1 = [
    { title: "BUSINESS", article: cat1Article1 },
    { title: "WORLD", article: cat1Article2 },
    { title: "FINANCE", article: cat1Article3 }
  ];

  // Exclude used category articles from remaining queue
  const usedCat1Slugs = new Set([cat1Article1.slug, cat1Article2.slug, cat1Article3.slug]);
  const queueAfterCat1 = allNews.slice(cursor).filter((a) => !usedCat1Slugs.has(a.slug));

  // Category Columns 2 (TECHNOLOGY, POLITICS, LIFESTYLE) - pick unique unused articles
  const cat2Article1 = queueAfterCat1.find((a) => a.category.toLowerCase() === "technology") || queueAfterCat1[0];
  const cat2Article2 = queueAfterCat1.find((a) => a.category.toLowerCase() === "politics" && a.slug !== cat2Article1.slug) || queueAfterCat1[1];
  const cat2Article3 = queueAfterCat1.find((a) => a.category.toLowerCase() === "lifestyle" && a.slug !== cat2Article1.slug && a.slug !== cat2Article2.slug) || queueAfterCat1[2];

  const categoryColumnsData2 = [
    { title: "TECHNOLOGY", article: cat2Article1 },
    { title: "POLITICS", article: cat2Article2 },
    { title: "LIFESTYLE", article: cat2Article3 }
  ];

  const usedCat2Slugs = new Set([cat2Article1.slug, cat2Article2.slug, cat2Article3.slug]);
  const finalQueue = queueAfterCat1.filter((a) => !usedCat2Slugs.has(a.slug));

  let qCursor = 0;

  const shortsNews = finalQueue.slice(qCursor, qCursor + 14);
  qCursor += 14;

  const regionalNews = finalQueue.slice(qCursor, qCursor + 4);
  qCursor += 4;

  const moreNews = finalQueue.slice(qCursor, qCursor + 8);

  return (
    <main className="flex-1 w-full bg-white text-black font-sans">

      {/* Editorial Hero Layout */}
      <HeroGrid data={heroNews} />

      {/* Horizontal Divider Line */}
      <div className="w-full">
        <hr className="border-t border-neutral-200/50" />
      </div>

      {/* Secondary Grid Layout */}
      <SecondaryGrid data={secondaryNews} />

      {/* Horizontal Divider Line */}
      <div className="w-full">
        <hr className="border-t border-neutral-200/50" />
      </div>

      {/* World Section Layout */}
      <WorldSection data={worldNews} />

      {/* Horizontal Divider Line */}
      <div className="w-full">
        <hr className="border-t border-neutral-200/50" />
      </div>

      {/* Reusable 3-Card Grid Section (WORLD) */}
      <ThreeCardGrid title="WORLD" data={worldThreeCardNews} />

      {/* Horizontal Divider Line */}
      <div className="w-full">
        <hr className="border-t border-neutral-200/50" />
      </div>

      {/* Multi-Category Columns Row 1 (BUSINESS | WORLD | FINANCE) */}
      <CategoryColumnsRow columns={categoryColumnsData1} />

      {/* Horizontal Divider Line */}
      <div className="w-full">
        <hr className="border-t border-neutral-200/50" />
      </div>

      {/* Multi-Category Columns Row 2 (TECHNOLOGY | POLITICS | LIFESTYLE) */}
      <CategoryColumnsRow columns={categoryColumnsData2} />

      {/* Visual Shorts Carousel */}
      <ShortsCarousel data={shortsNews} />

      {/* Regional & Spotlight Section */}
      <PuertoRicoSection data={regionalNews} />

      {/* Horizontal Divider Line */}
      <div className="w-full">
        <hr className="border-t border-neutral-200/50" />
      </div>

      {/* More News */}
      <MoreFromWireMingle data={moreNews} />

      {/* Footer */}
      <Footer />

    </main>
  );
}
