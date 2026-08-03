import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import AuthorArticlesList from "@/components/AuthorArticlesList";
import { notFound } from "next/navigation";
import { getAllAuthors, getAuthorBySlug, getArticlesByAuthorSlug } from "@/lib/articles";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({
    slug: author.slug.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const author = getAuthorBySlug(slug || "");
  if (!author) {
    return { title: "Author Not Found | WireMingle" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wiremingle.com";
  const title = `${author.name} - ${author.role}`;
  const description =
    author.bio ||
    `${author.name} is a ${author.role} at WireMingle reporting on world news and insights.`;
  const authorUrl = `${siteUrl}/author/${author.slug}`;
  const imageUrl = author.image.startsWith("http")
    ? author.image
    : `${siteUrl}${author.image}`;

  return {
    title,
    description,
    alternates: {
      canonical: authorUrl,
    },
    openGraph: {
      title: `${title} | WireMingle`,
      description,
      url: authorUrl,
      type: "profile",
      siteName: "WireMingle",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${title} | WireMingle`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function AuthorProfilePage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const author = getAuthorBySlug(slug);
  if (!author) {
    notFound();
  }

  const articles = getArticlesByAuthorSlug(slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wiremingle.com";
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${author.name} - ${author.role}`,
    url: `${siteUrl}/author/${author.slug}`,
    mainEntity: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      description: author.bio,
      image: `${siteUrl}${author.image}`,
      worksFor: {
        "@type": "NewsMediaOrganization",
        name: "WireMingle",
        logo: `${siteUrl}/images/wiremingle-logo.webp`,
      },
    },
  };

  return (
    <main className="w-full min-h-screen bg-white font-sans select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      <div className="mx-auto max-w-[96%] xl:max-w-[1400px] px-4 md:px-6 py-8">
        
        {/* Author Header Card */}
        <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-6 md:p-10 mb-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 shadow-2xs">
          
          {/* Avatar */}
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
            <img
              src={author.image}
              alt={author.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Author Meta & Bio */}
          <div className="flex flex-col text-center md:text-left flex-grow">
            <span className="text-xs font-bold text-[#E31B23] uppercase tracking-widest mb-1">
              Author Profile
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {author.name}
            </h1>
            <p className="text-xs md:text-sm font-bold text-neutral-500 uppercase tracking-wider mt-1 mb-3">
              {author.role}
            </p>

            {author.bio && (
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed max-w-3xl mb-4 font-normal">
                {author.bio}
              </p>
            )}

            {/* Email & Meta info */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-neutral-500">
              {author.email && (
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-2xs">
                  <svg className="w-3.5 h-3.5 stroke-neutral-600" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{author.email}</span>
                </div>
              )}

              <div className="bg-white px-3 py-1.5 rounded-full border border-neutral-200 shadow-2xs text-neutral-700 font-bold">
                {articles.length} {articles.length === 1 ? "Article" : "Articles"} Published
              </div>
            </div>
          </div>
        </div>

        {/* Articles List Section with 6-item Pagination */}
        <AuthorArticlesList articles={articles} authorName={author.name} />

      </div>

      <Footer />
    </main>
  );
}
