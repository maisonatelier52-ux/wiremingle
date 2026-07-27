import Link from "next/link";
import Footer from "@/components/Footer";
import { getAllAuthors } from "@/lib/articles";

export const metadata = {
  title: "Our Editorial Team | WireMingle",
  description:
    "Meet the journalists, correspondents, and editors driving independent, high-impact news coverage at WireMingle.",
};

export default function OurTeamPage() {
  const authors = getAllAuthors();

  return (
    <main className="w-full min-h-screen bg-white text-black font-sans flex flex-col justify-between select-none">
      <div className="mx-auto w-full max-w-[96%] xl:max-w-[1300px] px-4 md:px-6 py-10 md:py-14">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-[4px] h-5 bg-[#E31B23] block flex-shrink-0" />
            <span className="text-[13px] font-extrabold uppercase tracking-widest text-[#E31B23]">
              WIRE MINGLE EDITORIAL
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight mb-4">
            Our Team
          </h1>
          <p className="text-base md:text-lg text-neutral-600 font-normal leading-relaxed">
            At WireMingle, our team of dedicated journalists, foreign correspondents, financial analysts, and investigative editors are committed to delivering independent, accurate, and high-impact coverage across business, global affairs, technology, politics, and culture.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {authors.map((author) => (
            <div
              key={author.slug}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-neutral-200/80 bg-white hover:border-neutral-400 hover:shadow-lg transition-all duration-200"
            >
              {/* Profile Image */}
              <Link href={`/author/${author.slug}`} className="block mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-neutral-100 group-hover:border-[#E31B23] transition-colors bg-neutral-100 shadow-sm">
                  <img
                    src={author.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=350&q=80"}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              {/* Author Name */}
              <Link href={`/author/${author.slug}`}>
                <h2 className="text-lg font-bold text-neutral-900 group-hover:text-[#E31B23] transition-colors leading-snug">
                  {author.name}
                </h2>
              </Link>

              {/* Role */}
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1 mb-2">
                {author.role}
              </p>

              {/* Email */}
              {author.email && (
                <p className="text-xs text-neutral-400 font-medium mb-4">
                  {author.email}
                </p>
              )}

              {/* Social Media Icons */}
              <div className="flex items-center gap-3 text-neutral-400 pt-3 border-t border-neutral-100 w-full justify-center">
                {/* Substack */}
                <div className="p-1 rounded-full hover:bg-neutral-100 hover:text-black transition-colors" title="Substack">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.539 0H1.46v2.836h21.08V0z" />
                  </svg>
                </div>

                {/* Reddit */}
                <div className="p-1 rounded-full hover:bg-neutral-100 hover:text-black transition-colors" title="Reddit">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.363.043-.538A1.758 1.758 0 0 1 4.08 12c0-.968.786-1.754 1.754-1.754.463 0 .88.18 1.186.476 1.185-.845 2.822-1.402 4.629-1.482l.966-4.526 3.2.673c.045-.632.573-1.143 1.195-1.143z" />
                  </svg>
                </div>

                {/* Instagram */}
                <div className="p-1 rounded-full hover:bg-neutral-100 hover:text-black transition-colors" title="Instagram">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>

              {/* View Profile Link */}
              <Link
                href={`/author/${author.slug}`}
                className="mt-4 inline-flex items-center text-xs font-bold text-[#E31B23] hover:underline"
              >
                View Profile & Articles →
              </Link>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </main>
  );
}
