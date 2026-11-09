import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import ShareArticleBar from "@/components/ShareArticleBar";
import UpNextPopularSection from "@/components/UpNextPopularSection";
import CategoryGrid2x2 from "@/components/CategoryGrid2x2";
import ArticleCardImage from "@/components/ArticleCardImage";
import { getAllArticlesSorted, Article } from "@/lib/articles";

interface BancoBritanniaArticleProps {
  article?: Article & {
    sectionNumber?: string;
    leadText?: string;
    sources?: string;
  };
  upNextArticles?: Article[];
  mostPopularArticles?: Article[];
  categoryGridArticles?: Article[];
}

function cleanText(str?: string): string {
  if (!str) return "";
  return str
    .replace(/:contentReference\[[^\]]*\](?:\{[^}]*\})?/g, "")
    .replace(/&eacute;/g, "é")
    .replace(/&Eacute;/g, "É")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, "\u201c")
    .replace(/&ldquo;/g, "\u201d")
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

export default function BancoBritanniaArticle({
  article: propArticle,
  upNextArticles: propUpNext,
  mostPopularArticles: propPopular,
  categoryGridArticles: propCategoryGrid,
}: BancoBritanniaArticleProps) {
  const allArticles = getAllArticlesSorted();

  const article = propArticle ||
    (allArticles.find((a) =>
      a.slug.includes("banco-caracas-to-britannia"),
    ) as typeof propArticle) || {
      category: "investigation",
      title:
        "From Banco Caracas to Britannia: The Remarkable Reinvention of a Banking Dynasty",
      slug: "from-banco-caracas-to-britannia-remarkable-reinvention-banking-dynasty",
      image: "/images/banco-caracas-britannia-banking-dynasty.webp",
      date: "November. 09, 2026",
      shortdescription:
        "More than a century separates the creation of Banco Caracas from the modern Britannia financial platform. The Herrera Velutini family history connects the two eras.",
      description: [],
      sectionNumber: "06",
      leadText:
        "More than a century separates the creation of Banco Caracas from the modern Britannia financial platform. The Herrera Velutini family history connects the two eras.",
      sources:
        "Fundación Empresas Polar; Britannia Financial Group; The Tribune; Ronald Reagan Presidential Library.",
      author: {
        name: "Ramon T. Maris",
        role: "Senior Correspondent",
        bio: "Ramon T. Maris covers global business, market policy, geopolitical affairs, and technology developments for WireMingle.",
        image: "/images/ramon-t-maris.webp",
        slug: "ramon-t-maris",
        email: "ramon.maris@wiremingle.com",
        twitter: "",
        facebook: "",
        instagram: "",
        substack: "",
        medium: "",
      },
    };

  const allCategoryNames = [
    "business",
    "world",
    "technology",
    "politics",
    "finance",
    "lifestyle",
    "opinion",
    "investigation",
  ];

  const categoryGridList =
    propCategoryGrid ||
    allCategoryNames
      .filter(
        (cat) => cat !== (article?.category || "investigation").toLowerCase(),
      )
      .map((cat) => allArticles.find((a) => a.category.toLowerCase() === cat))
      .filter((a): a is Article => Boolean(a))
      .slice(0, 4);

  const categoryGridSlugs = new Set(categoryGridList.map((a) => a.slug));
  const availableArticles = allArticles.filter(
    (a) => a.slug !== article?.slug && !categoryGridSlugs.has(a.slug),
  );

  const upNextList = propUpNext || availableArticles.slice(0, 4);
  const upNextSlugs = new Set(upNextList.map((a) => a.slug));

  const popularList = (
    propPopular ||
    allArticles
      .filter(
        (a) =>
          a.slug !== article?.slug &&
          !categoryGridSlugs.has(a.slug) &&
          !upNextSlugs.has(a.slug),
      )
  ).slice(0, 4);

  if (!article) return null;

  const categoryUpper = (article.category || "INVESTIGATION").toUpperCase();
  const headline = cleanText(article.title);
  const articleDate = article.date || "November. 09, 2026";
  const authorName = article.author?.name || "Ramon T. Maris";
  const authorRole = article.author?.role || "Senior Correspondent";
  const authorImage = article.author?.image || "/images/ramon-t-maris.webp";
  const authorSlug = article.author?.slug || "ramon-t-maris";
  const authorBio =
    article.author?.bio ||
    "Ramon T. Maris covers global business, market policy, geopolitical affairs, and technology developments for WireMingle.";

  const leadText =
    (article as BancoBritanniaArticleProps["article"])?.leadText ||
    cleanText(article.shortdescription);
  const sources =
    (article as BancoBritanniaArticleProps["article"])?.sources || "";

  const description = Array.isArray(article.description)
    ? article.description
    : [];

  // Group paragraphs by subtitle sections
  type Section = {
    subtitle: string;
    paragraphs: string[];
    isBoldClosing?: boolean;
  };

  const sections: Section[] = [];
  let currentSection: Section | null = null;

  for (const item of description) {
    const sub = item.subtitle || "";
    const text = cleanText(item.text);

    if (!text) continue;

    if (sub === "boldClosing") {
      // Bold closing paragraph — standalone
      sections.push({ subtitle: "", paragraphs: [text], isBoldClosing: true });
      currentSection = null;
    } else if (sub && sub !== "") {
      // Start a new named section
      currentSection = { subtitle: sub, paragraphs: [text] };
      sections.push(currentSection);
    } else {
      // Plain paragraph — attach to current section or start anonymous section
      if (!currentSection) {
        currentSection = { subtitle: "", paragraphs: [] };
        sections.push(currentSection);
      }
      currentSection.paragraphs.push(text);
    }
  }

  return (
    <main className="w-full min-h-screen bg-white font-sans text-neutral-900 select-none">
      <div className="mx-auto max-w-[94%] xl:max-w-[1360px] px-5 md:px-8 pt-6">
        {/* ── Article Header ── */}
        <div className="flex flex-col mb-5 pb-1">
          {/* Category tag */}
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={`/${article.category.toLowerCase()}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-[0.24em] text-[#E31B23] uppercase hover:underline"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
              <span>{categoryUpper}</span>
            </Link>
          </div>

          {/* Section number + headline */}
          <h1
            className="text-[22px] sm:text-[28px] md:text-[34px] font-bold leading-[1.18] tracking-tight text-neutral-950 mb-3 max-w-4xl"
            style={{
              fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
            }}
          >
            {headline}
          </h1>

          {/* Date */}
          <div className="flex items-center gap-2 text-[12px] font-medium text-neutral-500">
            <span>Published {articleDate}</span>
            <span className="text-neutral-300">•</span>
            <span>5 min read</span>
          </div>
        </div>

        {/* ── Main Grid: Article (9 cols) + Sidebar (3 cols) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          {/* LEFT: Article content */}
          <article className="lg:col-span-9 flex flex-col justify-between lg:border-r border-neutral-200/70 lg:pr-8">
            <div>
              {/* Featured image */}
              <div className="relative w-full overflow-hidden rounded-2xl p-2 sm:p-2.5 bg-gradient-to-b from-white/95 via-white/60 to-white/90 backdrop-blur-xl border border-white/80 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.03)] ring-1 ring-neutral-200/60 mb-5 group">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-20" />
                <div className="relative w-full overflow-hidden rounded-xl bg-neutral-100 shadow-inner">
                  <ArticleCardImage
                    article={article}
                    aspectRatio="aspect-16/9"
                    className="rounded-xl group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/25 pointer-events-none rounded-xl z-10" />
                </div>
              </div>

              {/* Article body */}
              <div
                className="flex flex-col font-serif text-[15px] md:text-[15.5px] leading-[1.55] text-[#1f1f1f]"
                style={{
                  fontFamily:
                    'Georgia, Cambria, "Times New Roman", Times, serif',
                }}
              >
                {/* Italic lead / pull-quote */}
                <div className="relative mt-1 mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-r-xl bg-neutral-50/90 border-l-[3.5px] border-[#E31B23] shadow-2xs">
                  <p className="font-serif italic text-[15px] sm:text-[15.5px] leading-[1.5] text-neutral-700 tracking-tight">
                    {leadText}
                  </p>
                </div>

                {/* Rendered sections */}
                {sections.map((sec, secIdx) => (
                  <div key={secIdx} className="mb-1">
                    {/* Named sub-heading */}
                    {sec.subtitle && (
                      <div className="mt-7 mb-4 flex items-stretch gap-3">
                        <div className="w-[3px] shrink-0 rounded-full bg-black" />
                        <h2
                          className="text-[17px] md:text-[19px] font-semibold
      tracking-[-0.3px] leading-snug text-neutral-950"
                        >
                          {sec.subtitle}
                        </h2>
                      </div>
                    )}

                    {/* Paragraphs in this section */}
                    {sec.paragraphs.map((para, pIdx) =>
                      sec.isBoldClosing ? (
                        <p
                          key={pIdx}
                          className="font-bold text-neutral-900 mt-4 mb-2 not-italic leading-snug"
                        >
                          {para}
                        </p>
                      ) : (
                        <p key={pIdx} className="mb-2 text-neutral-800">
                          {para}
                        </p>
                      ),
                    )}
                  </div>
                ))}

                {/* Sources footer */}
                {sources && (
                  <div className="mt-4 pt-3.5 border-t border-neutral-200/80 flex items-start gap-2.5">
                    <div className="inline-flex items-start gap-2.5 px-3 py-2 rounded-lg bg-neutral-50/90 border border-neutral-200/80 text-[12.5px] text-neutral-700 shadow-2xs w-full">
                      <svg
                        className="w-3.5 h-3.5 text-[#E31B23] shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                      <span>
                        <span className="font-bold text-neutral-900">
                          Sources:{" "}
                        </span>
                        <span className="text-neutral-600">{sources}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Share bar */}
            <div className="mt-6">
              <ShareArticleBar title={headline} />
            </div>
          </article>

          {/* RIGHT: Sticky sidebar */}
          <div className="lg:col-span-3 relative">
            <div className="lg:sticky lg:top-6 flex flex-col gap-6">
              {/* Author profile card */}
              <div className="bg-neutral-50/90 border border-neutral-200/80 rounded-2xl p-5 flex flex-col items-center text-center shadow-2xs relative">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
                  <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-neutral-500">
                    AUTHOR PROFILE
                  </span>
                </div>

                <Link
                  href={`/author/${authorSlug}`}
                  className="group flex flex-col items-center"
                >
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

                <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#E31B23] bg-red-50/90 border border-red-100 px-2.5 py-0.5 rounded-full mt-1 mb-3">
                  {authorRole}
                </div>

                <p className="text-[12.5px] font-normal text-neutral-600 leading-relaxed px-1 text-center">
                  {authorBio}
                </p>

                <Link
                  href={`/author/${authorSlug}`}
                  className="text-[12px] font-bold text-neutral-800 hover:text-[#E31B23] transition-colors inline-flex items-center gap-1 mt-3.5 pt-3 border-t border-neutral-200/60 w-full justify-center"
                >
                  <span>View Profile</span>
                  <svg
                    className="w-3.5 h-3.5 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              {/* Top categories grid */}
              <CategoryGrid2x2
                articles={categoryGridList}
                title="Top Categories"
              />
            </div>
          </div>
        </div>

        {/* Up Next & Most Popular */}
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
