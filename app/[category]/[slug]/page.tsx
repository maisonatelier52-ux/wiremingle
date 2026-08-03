import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import UpNextPopularSection from "@/components/UpNextPopularSection";
import ShareArticleBar from "@/components/ShareArticleBar";
import { notFound } from "next/navigation";
import { getAllArticlesSorted } from "@/lib/articles";
import ArticleCardImage from "@/components/ArticleCardImage";

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
  const authorBio = article.author?.bio;
  const authorImage = article.author?.image || "/images/ramon-t-maris.webp";
  const authorSlug = article.author?.slug || "ramon-t-maris";

  // Related articles distribution
  const otherArticles = allArticles.filter((a) => a.slug !== article.slug);
  const upNextList = otherArticles.slice(0, 4);
  const popularList = otherArticles.slice(4, 9);

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

      <div className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 md:px-6 pt-6">
        
        {/* Main Article Container Grid: Article Left (9 cols) + Author Sidebar Right (3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Full Article Content */}
          <article className="lg:col-span-9 flex flex-col">
            
            {/* Category Breadcrumb / Tag */}
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#E31B23] uppercase mb-2">
              <Link href={`/${article.category.toLowerCase()}`} className="hover:underline">
                {categoryUpper}
              </Link>
            </div>

            {/* Headline Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight tracking-tight text-neutral-950 mb-3">
              {headline}
            </h1>

            {/* Date */}
            <div className="text-xs font-semibold text-neutral-500 mb-6">
              Published {articleDate}
            </div>

            {/* Main Featured Image */}
            <div className="w-full overflow-hidden rounded-xl bg-neutral-100 mb-8">
              <ArticleCardImage article={article} aspectRatio="aspect-16/9" className="rounded-xl" priority />
            </div>

            {/* Article Body Paragraphs */}
            <div className="flex flex-col gap-6 text-base md:text-[17.5px] leading-relaxed text-neutral-800 font-normal">
              {/* Short Description Lead */}
              <p className="font-semibold text-neutral-900 text-lg md:text-xl leading-relaxed">
                {cleanText(article.shortdescription)}
              </p>

              {/* Extended Paragraphs */}
              {article.description && article.description.length > 0 ? (
                article.description.map((sec, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    {sec.subtitle && (
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 mt-4">
                        {cleanText(sec.subtitle)}
                      </h2>
                    )}
                    <p>{cleanText(sec.text)}</p>
                  </div>
                ))
              ) : (
                <p>
                  Additional details and real-time updates regarding this breaking story will continue to be posted by WireMingle correspondents.
                </p>
              )}
            </div>

            {/* Share Article Bar below article content */}
            <ShareArticleBar title={cleanText(article.title)} />

          </article>

          {/* RIGHT: Author Info Box (Sticky Sidebar) */}
          <div className="lg:col-span-3 lg:sticky lg:top-6 flex flex-col gap-6">
            <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-2xs">
              
              {/* Author Photo */}
              <Link href={`/author/${authorSlug}`} className="group flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white shadow-md relative group-hover:scale-105 transition-transform duration-200">
                  <img
                    src={authorImage}
                    alt={authorName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-bold text-neutral-900 tracking-tight group-hover:text-[#E31B23] transition-colors">
                  {authorName}
                </h3>
              </Link>

              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mt-1 mb-3">
                {authorRole}
              </div>

              {authorBio && (
                <p className="text-[12.5px] font-normal text-neutral-600 leading-relaxed px-1">
                  {authorBio}
                </p>
              )}
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
