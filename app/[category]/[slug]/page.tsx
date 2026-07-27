import Link from "next/link";
import Footer from "@/components/Footer";
import UpNextPopularSection from "@/components/UpNextPopularSection";
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
  const authorBio = article.author?.bio || "";
  const authorImage =
    article.author?.image ||
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=350&q=80";

  // Up Next & Most Popular articles datasets
  const categoryRelated = allArticles.filter(
    (a) => a.category.toLowerCase() === article.category.toLowerCase() && a.slug !== article.slug
  );
  const otherRelated = allArticles.filter((a) => a.slug !== article.slug);

  const upNextList = (
    categoryRelated.length >= 6 ? categoryRelated : [...categoryRelated, ...otherRelated]
  ).slice(0, 6);

  const popularList = otherRelated
    .filter((a) => !upNextList.some((u) => u.slug === a.slug))
    .slice(0, 7);

  return (
    <main className="w-full min-h-screen bg-white text-black font-sans flex flex-col justify-between">
      
      {/* Main Container */}
      <div className="mx-auto w-full max-w-[96%] xl:max-w-[1240px] px-4 md:px-6 pt-8 md:pt-10">
        
        {/* Category Indicator Tag */}
        <div className="flex items-center gap-1.5 mb-3 select-none">
          <span className="w-[3px] h-3.5 bg-black block flex-shrink-0" />
          <span className="text-[12px] font-extrabold uppercase tracking-wider text-black">
            {categoryUpper} •
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.15] text-neutral-900 mb-3">
          {headline}
        </h1>

        {/* Red Accent Sub-Headline */}
        <div className="text-[12.5px] md:text-[13.5px] font-bold uppercase text-red-600 tracking-wider mb-4">
          {headline}
        </div>

        {/* Left-aligned Date */}
        <div className="text-[12px] font-medium text-neutral-500 text-left mb-6">
          {articleDate}
        </div>

        {/* Grid Layout: Left Main Content & Image, Right Sticky Author Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-4">
          
          {/* Left Column (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col">
            <div>
              {/* Featured Image */}
              <div className="w-full mb-8">
                <ArticleCardImage article={article} aspectRatio="aspect-16/10" className="rounded-xl shadow-xs" />
              </div>

              {/* Paragraph Content in Serif Font */}
              <div className="w-full font-serif text-[17.5px] md:text-[18.5px] text-neutral-800 leading-[1.85] space-y-6">
                {article.description && article.description.length > 0 ? (
                  article.description.map((sec, idx) => (
                    <div key={idx} className="space-y-3">
                      {sec.subtitle && (
                        <h2 className="font-sans text-[21px] md:text-[23px] font-bold text-neutral-900 tracking-tight mt-6 mb-2">
                          {cleanText(sec.subtitle)}
                        </h2>
                      )}
                      <p className="leading-[1.85]">
                        {cleanText(sec.text)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="leading-[1.85]">
                    {cleanText(article.shortdescription)}
                  </p>
                )}
              </div>
            </div>

            {/* End Red Accent Bar Line */}
            <div className="w-24 h-[4px] bg-red-700 rounded-full mt-10 mb-0" />
          </div>

          {/* Right Column: Sticky Author Card (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className="sticky top-6 rounded-xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col items-center text-center">
              
              {/* Author Avatar Image */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 border border-neutral-200 bg-neutral-100">
                <img
                  src={authorImage}
                  alt={authorName}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-widest mb-0.5">
                By
              </span>
              <h3 className="text-[16px] font-bold text-neutral-900 leading-tight mb-1">
                {authorName}
              </h3>
              <p className="text-[12px] font-semibold text-neutral-500 mb-3">
                {authorRole}
              </p>
              {authorBio && (
                <p className="text-[12.5px] font-normal text-neutral-600 leading-relaxed mb-4 px-1">
                  {authorBio}
                </p>
              )}

              {/* Social Icons */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-neutral-800 pt-3 border-t border-neutral-100 w-full">
                {/* Twitter / X */}
                <a href="#twitter" title="Share on Twitter" className="hover:text-black transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Facebook Icon */}
                <a href="#facebook" title="Share on Facebook" className="hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram Icon */}
                <a href="#instagram" title="Share on Instagram" className="hover:text-pink-600 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Reddit Icon */}
                <a href="#reddit" title="Share on Reddit" className="hover:text-orange-600 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.363.043-.538A1.758 1.758 0 0 1 4.08 12c0-.968.786-1.754 1.754-1.754.463 0 .88.18 1.186.476 1.185-.845 2.822-1.402 4.629-1.482l.966-4.526 3.2.673c.045-.632.573-1.143 1.195-1.143z"/>
                  </svg>
                </a>

                {/* Substack Icon */}
                <a href="#substack" title="Share on Substack" className="hover:text-[#FF6719] transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.539 0H1.46v2.836h21.08V0z"/>
                  </svg>
                </a>

                {/* Medium Icon */}
                <a href="#medium" title="Share on Medium" className="hover:text-black transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                </a>
              </div>

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

