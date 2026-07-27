import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NewsTicker from "@/components/NewsTicker";
import { getAllArticlesSorted } from "@/lib/articles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WireMingle - Global News & Insights",
  description: "WireMingle is your top source for business, finance, technology, politics, lifestyle, opinion, and investigative journalism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Select one latest article from each of the 8 news categories
  const categories = [
    "opinion",
    "business",
    "world",
    "finance",
    "technology",
    "politics",
    "lifestyle",
    "investigation",
  ];
  const allArticles = getAllArticlesSorted();
  const oneArticlePerCategory = categories
    .map((cat) => allArticles.find((a) => a.category.toLowerCase() === cat))
    .filter((a): a is typeof allArticles[0] => Boolean(a));

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 font-sans">
        <Header />
        <NewsTicker articles={oneArticlePerCategory} />
        {children}
      </body>
    </html>
  );
}
