import type { Metadata } from "next";
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

const categoryDescriptions: Record<string, string> = {
  business: "Latest business news, corporate earnings, market shifts, and global trade reports from WireMingle.",
  world: "Breaking world news, geopolitical developments, international diplomacy, and global affairs.",
  finance: "Comprehensive financial market news, economic policy updates, inflation reports, and investment trends.",
  technology: "Cutting-edge technology news, AI breakthroughs, semiconductor industry reports, and cyber intelligence.",
  politics: "In-depth political analysis, election coverage, legislative developments, and government policies.",
  lifestyle: "Culture, health, travel, fashion, and lifestyle trends curated by WireMingle editors.",
  opinion: "Thought-provoking opinion pieces, editorial commentary, and expert perspectives.",
  investigation: "In-depth investigative reporting, investigative exposes, corruption investigations, and special reports.",
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cat = resolvedParams?.category?.toLowerCase();
  
  if (!cat || !categoryDataMap[cat]) {
    return { title: "Category Not Found | WireMingle" };
  }

  const catTitle = cat.charAt(0).toUpperCase() + cat.slice(1);
  const title = `${catTitle} News & Global Insights`;
  const description = categoryDescriptions[cat] || `Read the latest ${catTitle} news, in-depth reports, and updates on WireMingle.`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wiremingle.com";
  const categoryUrl = `${siteUrl}/${cat}`;

  return {
    title,
    description,
    alternates: {
      canonical: categoryUrl,
    },
    openGraph: {
      title: `${title} | WireMingle`,
      description,
      url: categoryUrl,
      type: "website",
      siteName: "WireMingle",
      images: [
        {
          url: `${siteUrl}/images/wiremingle-logo.webp`,
          width: 1200,
          height: 630,
          alt: `${catTitle} News - WireMingle`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | WireMingle`,
      description,
      images: [`${siteUrl}/images/wiremingle-logo.webp`],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const category = resolvedParams?.category;
  if (!category) notFound();

  const normalizedCategory = category.toLowerCase();
  const rawArticles = categoryDataMap[normalizedCategory];
  if (!rawArticles) notFound();

  const categoryArticles = getSortedNews([rawArticles]);

  const heroArticles = categoryArticles.slice(0, 11);
  const aroundArticles = categoryArticles.slice(11, 21);
  const latestGridArticles = categoryArticles.slice(21, 33);
  const moreStoriesArticles = categoryArticles.slice(33, 41);
  const somethingExtraArticles = categoryArticles.slice(41);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wiremingle.com";
  const categoryTitle = normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1);
  const categoryUrl = `${siteUrl}/${normalizedCategory}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryTitle,
        item: categoryUrl,
      },
    ],
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryTitle} News - WireMingle`,
    url: categoryUrl,
    description: categoryDescriptions[normalizedCategory] || `Latest ${categoryTitle} news articles.`,
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "WireMingle",
      logo: `${siteUrl}/images/wiremingle-logo.webp`,
    },
  };

  return (
    <main className="w-full flex-grow bg-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />

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