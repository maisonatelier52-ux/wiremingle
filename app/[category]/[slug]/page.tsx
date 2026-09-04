import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import UpNextPopularSection from "@/components/UpNextPopularSection";
import ShareArticleBar from "@/components/ShareArticleBar";
import { notFound } from "next/navigation";
import { getAllArticlesSorted, Article } from "@/lib/articles";
import ArticleCardImage from "@/components/ArticleCardImage";
import CategoryGrid2x2 from "@/components/CategoryGrid2x2";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = getAllArticlesSorted();
  return articles.map((article) => ({
    category: article.category.toLowerCase(),
    slug: article.slug,
  }));
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = resolvedParams?.category?.toLowerCase();
  const slug = resolvedParams?.slug;

  const allArticles = getAllArticlesSorted();
  const article =
    allArticles.find(
      (a) => a.slug === slug && a.category.toLowerCase() === category
    ) || allArticles.find((a) => a.slug === slug);

  if (!article) {
    return { title: "Article Not Found | WireMingle" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wiremingle.com";
  const headline = cleanText(article.title);
  const description = cleanText(article.shortdescription);
  const articleUrl = `${siteUrl}/${article.category.toLowerCase()}/${article.slug}`;
  const logoUrl = `${siteUrl}/images/wiremingle-logo.webp`;
  const imageUrl = article.image
    ? article.image.startsWith("http")
      ? article.image
      : `${siteUrl}${article.image.startsWith("/") ? "" : "/"}${article.image}`
    : logoUrl;
  const authorName = article.author?.name || "WireMingle Correspondent";

  return {
    title: headline,
    description,
    authors: [{ name: authorName }],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: "article",
      title: `${headline} | WireMingle`,
      description,
      url: articleUrl,
      siteName: "WireMingle",
      publishedTime: article.date,
      authors: [authorName],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: headline,
        },
        {
          url: logoUrl,
          width: 800,
          height: 800,
          alt: "WireMingle Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${headline} | WireMingle`,
      description,
      images: [imageUrl, logoUrl],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const category = resolvedParams?.category;
  const slug = resolvedParams?.slug;

  if (!category || !slug) {
    notFound();
  }

  const allArticles = getAllArticlesSorted();
  const article =
    allArticles.find(
      (a) => a.slug === slug && a.category.toLowerCase() === category.toLowerCase()
    ) || allArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Format details for display
  const categoryUpper = article.category.toUpperCase();
  const headline = cleanText(article.title);
  const articleDate = article.date || "March 11, 2026";
  const authorName = article.author?.name || "Ramon T. Maris";
  const authorRole = article.author?.role || "Senior Business Correspondent";
  const authorImage = article.author?.image || "/images/ramon-t-maris.webp";
  const authorSlug = article.author?.slug || "ramon-t-maris";

  const defaultAuthorBios: Record<string, string> = {
    "ramon-t-maris": "Ramon T. Maris covers global business, market policy, geopolitical affairs, and technology developments for WireMingle.",
    "evelyn-st-claire": "Evelyn St. Claire leads investigative reporting, public policy, economic analysis, and financial market insights at WireMingle.",
    "helena-vance": "Helena Vance reports on technology innovation, artificial intelligence, digital economy, and enterprise technology trends."
  };

  const authorBio = article.author?.bio || defaultAuthorBios[authorSlug] || `${authorName} covers ${categoryUpper.toLowerCase()} news, market trends, and in-depth analysis for WireMingle.`;

  // Related articles distribution
  const otherArticles = allArticles.filter((a) => a.slug !== article.slug);
  const upNextList = otherArticles.slice(0, 4);
  const popularList = otherArticles.slice(4, 9);

  // Category Representative Articles (1st news article of each category)
  const allCategoryNames = ["business", "world", "technology", "politics", "finance", "lifestyle", "opinion", "investigation"];
  const categoryGridArticles = allCategoryNames
    .filter((cat) => cat !== article.category.toLowerCase())
    .map((cat) => allArticles.find((a) => a.category.toLowerCase() === cat))
    .filter((a): a is Article => Boolean(a))
    .slice(0, 4);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wiremingle.com";
  const articleUrl = `${siteUrl}/${article.category.toLowerCase()}/${article.slug}`;
  const imageUrl = article.image.startsWith("http")
    ? article.image
    : `${siteUrl}${article.image}`;

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: headline,
    description: cleanText(article.shortdescription),
    image: [imageUrl],
    datePublished: articleDate,
    dateModified: articleDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: authorRole,
      url: `${siteUrl}/author/${authorSlug}`,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "WireMingle",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/wiremingle-logo.webp`,
      },
    },
    articleSection: categoryUpper,
  };

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
        name: categoryUpper,
        item: `${siteUrl}/${article.category.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: headline,
        item: articleUrl,
      },
    ],
  };

  return (
    <main className="w-full min-h-screen bg-white font-sans text-neutral-900 select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-[94%] xl:max-w-[1360px] px-5 md:px-8 pt-6">
        
        {/* Article Header (Category, Title, Date) */}
        <div className="flex flex-col mb-6">
          {/* Category Breadcrumb / Tag */}
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#E31B23] uppercase mb-2">
            <Link href={`/${article.category.toLowerCase()}`} className="hover:underline">
              {categoryUpper}
            </Link>
          </div>

          {/* Headline Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[35px] font-bold leading-tight tracking-tight text-neutral-950 mb-3 max-w-4xl">
            {headline}
          </h1>

          {/* Date */}
          <div className="text-xs font-semibold text-neutral-500">
            Published {articleDate}
          </div>
        </div>
        
        {/* Main Article Container Grid: Featured Image & Content Left (9 cols) + Author Sidebar Right (3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          
          {/* LEFT: Full Article Content with Vertical Divider Line */}
          <article className="lg:col-span-9 flex flex-col justify-between lg:border-r border-neutral-200/70 lg:pr-8">
            <div>
              {/* Main Featured Image */}
              <div className="w-full overflow-hidden rounded-xl bg-neutral-100 mb-4">
                <ArticleCardImage article={article} aspectRatio="aspect-16/9" className="rounded-xl" priority />
              </div>

              {/* Article Body Paragraphs */}
              <div className="flex flex-col gap-3.5 text-sm md:text-[15px] leading-relaxed text-neutral-800 font-normal">
                {/* Short Description Lead */}
                <p className="font-semibold text-neutral-900 text-[14.5px] md:text-[16px] leading-snug mb-1">
                  {cleanText(article.shortdescription)}
                </p>

                {/* Extended Paragraphs */}
                {Array.isArray(article.description) && article.description.length > 0 ? (
                  article.description.map((sec, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      {sec.subtitle && (
                        <h2 className="text-base md:text-[18px] font-bold tracking-tight text-neutral-900 mt-2">
                          {cleanText(sec.subtitle)}
                        </h2>
                      )}
                      <p>{cleanText(sec.text)}</p>
                    </div>
                  ))
                ) : typeof article.description === "string" ? (
                  <div className="flex flex-col gap-2">
                    <p>{cleanText(article.description)}</p>
                  </div>
                ) : (
                  <p>
                    Additional details and real-time updates regarding this breaking story will continue to be posted by WireMingle correspondents.
                  </p>
                )}
              </div>
            </div>

            {/* Share Article Bar below article content */}
            <ShareArticleBar title={cleanText(article.title)} />

          </article>

          {/* RIGHT: Author Info Box & Top Categories (Sticky Sidebar) */}
          <div className="lg:col-span-3 relative">
            <div className="lg:sticky lg:top-6 flex flex-col gap-6">
              <div className="bg-neutral-50/90 border border-neutral-200/80 rounded-2xl p-5 flex flex-col items-center text-center shadow-2xs relative">
                {/* Author Section Header Accent */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
                  <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-neutral-500">
                    AUTHOR PROFILE
                  </span>
                </div>

                {/* Author Photo */}
                <Link href={`/author/${authorSlug}`} className="group flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-white ring-2 ring-neutral-200/80 shadow-sm relative group-hover:scale-105 transition-transform duration-200">
                    <img
                      src={authorImage}
                      alt={authorName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-[15.5px] font-extrabold text-neutral-900 tracking-tight group-hover:text-[#E31B23] transition-colors">
                    {authorName}
                  </h3>
                </Link>

                {/* Styled Role Pill */}
                <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#E31B23] bg-red-50/90 border border-red-100 px-2.5 py-0.5 rounded-full mt-1 mb-3">
                  {authorRole}
                </div>

                {/* Complete Bio Sentences */}
                <p className="text-[12.5px] font-normal text-neutral-600 leading-relaxed px-1 text-center">
                  {authorBio}
                </p>

                {/* View Profile Link */}
                <Link
                  href={`/author/${authorSlug}`}
                  className="text-[12px] font-bold text-neutral-800 hover:text-[#E31B23] transition-colors inline-flex items-center gap-1 mt-3.5 pt-3 border-t border-neutral-200/60 w-full justify-center"
                >
                  <span>View Profile</span>
                  <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* 2x2 Category Highlights Grid Section */}
              <CategoryGrid2x2 articles={categoryGridArticles} title="Top Categories" />
            </div>
          </div>
        </div>

        {/* Up Next & Most Popular Section */}
        <UpNextPopularSection
          upNextArticles={upNextList}
          mostPopularArticles={popularList}
        />

      </div>

      {/* Footer */}
      <div className="w-full mt-16">
        <Footer />
      </div>

    </main>
  );
}
