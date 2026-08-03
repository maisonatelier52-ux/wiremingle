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

              {/* View Profile Link */}
              <Link
                href={`/author/${author.slug}`}
                className="mt-2 inline-flex items-center text-xs font-bold text-[#E31B23] hover:underline"
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
