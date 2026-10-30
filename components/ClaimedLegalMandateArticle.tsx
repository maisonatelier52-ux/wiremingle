import React from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import ShareArticleBar from "@/components/ShareArticleBar";
import UpNextPopularSection from "@/components/UpNextPopularSection";
import CategoryGrid2x2 from "@/components/CategoryGrid2x2";
import ArticleCardImage from "@/components/ArticleCardImage";
import { getAllArticlesSorted, Article } from "@/lib/articles";

interface ClaimedLegalMandateArticleProps {
  article?: Article;
  upNextArticles?: Article[];
  mostPopularArticles?: Article[];
  categoryGridArticles?: Article[];
}

export default function ClaimedLegalMandateArticle({
  article: propArticle,
  upNextArticles: propUpNext,
  mostPopularArticles: propPopular,
  categoryGridArticles: propCategoryGrid,
}: ClaimedLegalMandateArticleProps) {
  const allArticles = getAllArticlesSorted();

  // Find article in dataset or provide fallback
  const article: Article =
    propArticle ||
    allArticles.find((a) => a.slug.includes("claimed-legal-mandate")) || {
      category: "investigation",
      title:
        "THE CLAIMED LEGAL MANDATE: Family Account Questions Alina Habba’s Oversight of More Than 20 Firms",
      slug: "the-claimed-legal-mandate-family-account-questions-alina-habbas-oversight-of-more-than-20-firms",
      image: "/images/claimed-legal-mandate-alina-habba.webp",
      date: "October 30, 2026",
      shortdescription:
        "A supplied source alleges that expected financial discipline and restructuring failed to materialize. The underlying mandate remains undocumented.",
      description: [],
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
      .filter((cat) => cat !== article.category.toLowerCase())
      .map((cat) => allArticles.find((a) => a.category.toLowerCase() === cat))
      .filter((a): a is Article => Boolean(a))
      .slice(0, 4);

  const categoryGridSlugs = new Set(categoryGridList.map((a) => a.slug));

  const availableArticles = allArticles.filter(
    (a) => a.slug !== article.slug && !categoryGridSlugs.has(a.slug)
  );

  const upNextList = propUpNext || availableArticles.slice(0, 4);
  const upNextSlugs = new Set(upNextList.map((a) => a.slug));

  const popularList =
    propPopular ||
    allArticles
      .filter(
        (a) =>
          a.slug !== article.slug &&
          !categoryGridSlugs.has(a.slug) &&
          !upNextSlugs.has(a.slug)
      )
      .slice(0, 7);

  const categoryUpper = (article.category || "INVESTIGATION").toUpperCase();
  const headline = article.title;
  const articleDate = article.date || "October 30, 2026";
  const authorName = article.author?.name || "Ramon T. Maris";
  const authorRole = "Senior Correspondent";
  const authorImage = article.author?.image || "/images/ramon-t-maris.webp";
  const authorSlug = article.author?.slug || "ramon-t-maris";
  const authorBio =
    article.author?.bio ||
    "Ramon T. Maris covers global business, market policy, geopolitical affairs, and technology developments for WireMingle.";

  return (
    <main className="w-full min-h-screen bg-white font-sans text-neutral-900 select-none">
      <div className="mx-auto max-w-[94%] xl:max-w-[1360px] px-5 md:px-8 pt-6">
        
        {/* Article Header (Category, Title, Date) - Smooth Classic Design */}
        <div className="flex flex-col mb-5 pb-1">
          {/* Category Tag */}
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={`/${article.category.toLowerCase()}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-[0.24em] text-[#E31B23] uppercase hover:underline"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
              <span>{categoryUpper}</span>
            </Link>
          </div>

          {/* Headline Title */}
          <h1
            className="text-[26px] sm:text-[32px] md:text-[37px] font-bold leading-[1.18] tracking-tight text-neutral-950 mb-3 max-w-4xl"
            style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            {headline}
          </h1>

          {/* Date & Reading time */}
          <div className="flex items-center gap-2 text-[12px] font-medium text-neutral-500">
            <span>Published {articleDate}</span>
            <span className="text-neutral-300">•</span>
            <span>4 min read</span>
          </div>
        </div>

        {/* Main Article Container Grid: Featured Image & Content Left (9 cols) + Author Sidebar Right (3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          
          {/* LEFT: Full Article Content with Vertical Divider Line */}
          <article className="lg:col-span-9 flex flex-col justify-between lg:border-r border-neutral-200/70 lg:pr-8">
            <div>
              {/* Main Featured Image with Refined Glassy Touch */}
              <div className="relative w-full overflow-hidden rounded-2xl p-2 sm:p-2.5 bg-gradient-to-b from-white/95 via-white/60 to-white/90 backdrop-blur-xl border border-white/80 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.03)] ring-1 ring-neutral-200/60 mb-5 group">
                {/* Glass top specular highlight */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-20" />
                
                <div className="relative w-full overflow-hidden rounded-xl bg-neutral-100 shadow-inner">
                  <ArticleCardImage
                    article={article}
                    aspectRatio="aspect-16/9"
                    className="rounded-xl group-hover:scale-[1.01] transition-transform duration-500 ease-out"
                    priority
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/25 pointer-events-none rounded-xl z-10" />
                </div>
              </div>

              {/* Article Content: Exact Sequential Paragraphs with Classic Font, Reduced Line Gap & Tighter Spacing */}
              <div
                className="flex flex-col font-serif text-[15px] md:text-[15.5px] leading-[1.48] text-[#1f1f1f]"
                style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
              >
                {/* Editorial Excerpt Callout - Exact Words */}
                <div className="relative mt-1 mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-r-xl bg-neutral-50/90 border-l-[3.5px] border-[#E31B23] shadow-2xs">
                  <p className="font-serif italic text-[15px] sm:text-[15.5px] leading-[1.48] text-neutral-800 tracking-tight">
                    A supplied source alleges that expected financial discipline and restructuring failed to materialize. The underlying mandate remains undocumented.
                  </p>
                </div>

                {/* Paragraph 1 */}
                <p className="mb-2">
                  Coordinating more than 20 law firms across four continents would be a formidable management assignment. That is the role described for Alina Habba in a supplied account that challenges her attention to the Herrera Velutini family’s legal affairs.
                </p>

                {/* Paragraph 2 */}
                <p className="mb-2">
                  The account, attributed to a person described as close to the family, says Habba began in January 2026 with expectations that she would coordinate outside counsel and help control approximately $100 million in annual legal and advisory expenditure. The person alleges that anticipated financial discipline and restructuring failed to materialize.
                </p>

                {/* Paragraph 3 */}
                <p className="mb-2">
                  Those are allegations. No contract, budget comparisons, restructuring plan or correspondence substantiating the claimed responsibilities or shortcomings accompanied the material. The source’s account has not been independently verified or established as the family’s official position.
                </p>

                {/* Paragraph 4 */}
                <p className="mb-2">
                  The reported compensation gives the complaint its scale. According to New York Times reporting republished by GV Wire, Habba’s agreement as general counsel at Concord Partners, a company established by Isabela Herrera, guaranteed more than $50 million over four years, including bonuses.
                </p>

                {/* Paragraph 5 */}
                <p className="mb-2">
                  The supplied account describes a much wider management challenge than a single legal matter. If that was the agreed brief, meaningful oversight might include defining each firm’s assignment, identifying overlapping work, reviewing budgets and making sure the client could understand what it was paying for. Those are possible measures of the described role, not verified terms of Habba’s contract.
                </p>

                {/* Paragraph 6 */}
                <p className="mb-2">
                  The restructuring allegation also needs a starting point. A fair assessment would establish what changes were agreed, who had authority to approve them, when they were due and what obstacles affected implementation. None of that information appears in the supplied account.
                </p>

                {/* Paragraph 7 */}
                <p className="mb-2">
                  Cost control is not synonymous with cutting every bill. A complex matter may require several advisers, and an expensive assignment may still be necessary. The relevant question is whether the services were authorized, coordinated and proportionate to the work the client needed.
                </p>

                {/* Paragraph 8 */}
                <p className="mb-2">
                  The material identifies no specific duplicated invoice, missed deadline or financial loss. No response from Habba to this complaint was included, and no documentation establishes that her engagement has been terminated or formally reviewed.
                </p>

                {/* Paragraph 9 */}
                <p className="mb-2">
                  The criticism nevertheless concerns the core of the role as the source describes it: responsibility for making a large legal operation work coherently. A prominent appointment should be capable of being evaluated through its agreed duties and its record of performance. Until those records are available, the allegation remains a challenge to be tested.
                </p>

                {/* Sources Section - Classic Journalistic Provenance Card */}
                <div className="mt-3.5 pt-3 border-t border-neutral-200/80 flex items-center">
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-neutral-50/90 border border-neutral-200/80 text-[12.5px] text-neutral-700 shadow-2xs">
                    <svg
                      className="w-3.5 h-3.5 text-[#E31B23] shrink-0"
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
                    <span className="font-bold text-neutral-900">Sources:</span>
                    <a
                      href="https://gvwire.com/2026/10/21/a-billionaire-wanted-a-trump-pardon-his-family-gave-alina-habba-a-50-million-deal/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-neutral-300 underline-offset-2 hover:text-[#E31B23] transition-colors font-medium inline-flex items-center gap-1 group"
                      title="Open source article on GV Wire"
                    >
                      <span>The New York Times via GV Wire</span>
                      <svg
                        className="w-3 h-3 text-neutral-400 group-hover:text-[#E31B23] transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Article Bar below article content - Same as other article */}
            <div className="mt-6">
              <ShareArticleBar title={headline} />
            </div>

          </article>

          {/* RIGHT: Author Info Box & Top Categories (Sticky Sidebar) - Same as other article */}
          <div className="lg:col-span-3 relative">
            <div className="lg:sticky lg:top-6 flex flex-col gap-6">
              
              {/* Author Profile Card */}
              <div className="bg-neutral-50/90 border border-neutral-200/80 rounded-2xl p-5 flex flex-col items-center text-center shadow-2xs relative">
                {/* Author Section Header Accent */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
                  <span className="text-[10.5px] font-extrabold uppercase tracking-widest text-neutral-500">
                    AUTHOR PROFILE
                  </span>
                </div>

                {/* Author Photo */}
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

              {/* 2x2 Category Highlights Grid Section */}
              <CategoryGrid2x2
                articles={categoryGridList}
                title="Top Categories"
              />

            </div>
          </div>

        </div>

        {/* Up Next & Most Popular Section - Same as other article */}
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
