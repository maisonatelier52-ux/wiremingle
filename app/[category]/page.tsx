import CategoryHero from "@/components/CategoryHero";
import AroundCategorySection from "@/components/AroundCategorySection";
import LatestStoriesGrid from "@/components/LatestStoriesGrid";
import MoreStoriesGrid from "@/components/MoreStoriesGrid";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

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

const categoryDataMap: Record<string, Article[]> = {
  business: businessData as Article[],
  world: worldData as Article[],
  finance: financeData as Article[],
  technology: technologyData as Article[],
  politics: politicsData as Article[],
  lifestyle: lifestyleData as Article[],
  opinion: opinionData as Article[],
  investigation: investigationData as Article[],
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return [
    { category: "business" },
    { category: "world" },
    { category: "finance" },
    { category: "technology" },
    { category: "politics" },
    { category: "lifestyle" },
    { category: "opinion" },
    { category: "investigation" },
  ];
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const category = resolvedParams?.category;
  if (!category) notFound();

  const normalizedCategory = category.toLowerCase();
  const rawArticles = categoryDataMap[normalizedCategory];
  if (!rawArticles) notFound();

  // Sort and deduplicate category articles by date descending (latest news order)
  const categoryArticles = getSortedNews([rawArticles]);

  // Distribute category articles strictly without repeating any news:
  // 1. CategoryHero consumes up to 11 articles (indices 0..10)
  const heroArticles = categoryArticles.slice(0, 11);

  // 2. AroundCategorySection consumes up to 10 articles (indices 11..20)
  const aroundArticles = categoryArticles.slice(11, 21);

  // 3. LatestStoriesGrid (FEATURED section) receives up to 12 articles (indices 21..32)
  const latestGridArticles = categoryArticles.slice(21, 33);

  // 4. MoreStoriesGrid ("More of the latest stories") receives up to 8 articles (indices 33..40)
  const moreStoriesArticles = categoryArticles.slice(33, 41);

  // 5. Something Extra receives all remaining articles (indices 41 onwards)
  const somethingExtraArticles = categoryArticles.slice(41);

  return (
    <main className="w-full flex-grow bg-white font-sans">
      {heroArticles.length > 0 && (
        <CategoryHero category={normalizedCategory} data={heroArticles} />
      )}
      
      {aroundArticles.length > 0 && (
        <AroundCategorySection category={normalizedCategory} data={aroundArticles} />
      )}

      {latestGridArticles.length > 0 && (
        <LatestStoriesGrid sectionTitle="FEATURED" category={normalizedCategory} data={latestGridArticles} />
      )}

      {moreStoriesArticles.length > 0 && (
        <MoreStoriesGrid title="More of the latest stories" data={moreStoriesArticles} count={moreStoriesArticles.length} />
      )}

      {somethingExtraArticles.length > 0 && (
        <LatestStoriesGrid
          sectionTitle="Something Extra"
          category={normalizedCategory}
          data={somethingExtraArticles}
        />
      )}

      <div className="w-full mt-8">
        <hr className="border-t border-neutral-200" />
      </div>
      <Footer />
    </main>
  );
}