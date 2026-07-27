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

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-2.5 text-neutral-400 mt-4">
              <div className="p-1.5 rounded-full bg-white border border-neutral-200 hover:border-black transition-colors cursor-pointer" title="Substack">
                <svg className="w-3.5 h-3.5 fill-neutral-700" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.539 0H1.46v2.836h21.08V0z" />
                </svg>
              </div>
              <div className="p-1.5 rounded-full bg-white border border-neutral-200 hover:border-black transition-colors cursor-pointer" title="Reddit">
                <svg className="w-3.5 h-3.5 fill-neutral-700" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.363.043-.538A1.758 1.758 0 0 1 4.08 12c0-.968.786-1.754 1.754-1.754.463 0 .88.18 1.186.476 1.185-.845 2.822-1.402 4.629-1.482l.966-4.526 3.2.673c.045-.632.573-1.143 1.195-1.143z" />
                </svg>
              </div>
              <div className="p-1.5 rounded-full bg-white border border-neutral-200 hover:border-black transition-colors cursor-pointer" title="Instagram">
                <svg className="w-3.5 h-3.5 fill-neutral-700" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
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
