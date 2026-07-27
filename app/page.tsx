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
  const allNews = getSortedNews([
    businessData as Article[],
    worldData as Article[],
    financeData as Article[],
    technologyData as Article[],
    politicsData as Article[],
    lifestyleData as Article[],
    opinionData as Article[],
    investigationData as Article[]
  ]);

  // Distribute news articles cleanly
  const heroNews = allNews.slice(0, 15);
  const secondaryNews = allNews.slice(15, 24);
  const worldNews = allNews.slice(24, 27);
  const worldThreeCardNews = allNews.slice(27, 30);
  const shortsNews = allNews.slice(0, 18);
  const regionalNews = allNews.slice(5, 9);
  const moreNews = allNews.slice(9, 17);

  const categoryColumnsData1 = [
    { title: "BUSINESS", article: (businessData as Article[])[0] },
    { title: "WORLD", article: (worldData as Article[])[1] },
    { title: "FINANCE", article: (financeData as Article[])[0] }
  ];

  const categoryColumnsData2 = [
    { title: "TECHNOLOGY", article: (technologyData as Article[])[0] },
    { title: "POLITICS", article: (politicsData as Article[])[0] },
    { title: "LIFESTYLE", article: (lifestyleData as Article[])[0] }
  ];

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
