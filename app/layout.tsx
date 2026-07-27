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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wiremingle.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WireMingle - Global Breaking News, Markets & Investigative Reporting",
    template: "%s | WireMingle",
  },
  description:
    "WireMingle delivers independent breaking news, world politics, financial market updates, technology trends, lifestyle, opinion, and in-depth investigative reporting.",
  keywords: [
    "WireMingle",
    "Breaking News",
    "World News",
    "Business News",
    "Finance Markets",
    "Technology News",
    "Politics",
    "Investigative Journalism",
    "Opinion Columns",
    "Lifestyle",
  ],
  authors: [{ name: "WireMingle Editorial Board", url: `${siteUrl}/our-team` }],
  creator: "WireMingle",
  publisher: "WireMingle Media",
  icons: {
    icon: "/images/wiremingle-logo.webp",
    shortcut: "/images/wiremingle-logo.webp",
    apple: "/images/wiremingle-logo.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "WireMingle",
    title: "WireMingle - Global Breaking News, Markets & Investigative Reporting",
    description:
      "WireMingle delivers independent breaking news, world politics, financial market updates, technology trends, lifestyle, opinion, and in-depth investigative reporting.",
    images: [
      {
        url: `${siteUrl}/images/wiremingle-logo.webp`,
        width: 1200,
        height: 630,
        alt: "WireMingle Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WireMingle - Global Breaking News & Insights",
    description:
      "WireMingle delivers independent breaking news, world politics, financial market updates, technology trends, and investigative reporting.",
    images: [`${siteUrl}/images/wiremingle-logo.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "WireMingle",
    url: siteUrl,
    logo: `${siteUrl}/images/wiremingle-logo.webp`,
    sameAs: [
      "https://facebook.com",
      "https://instagram.com",
      "https://reddit.com",
      "https://substack.com",
      "https://medium.com",
    ],
    publishingPrinciples: `${siteUrl}/editorial-policy`,
    correctionsPolicy: `${siteUrl}/right-of-reply`,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WireMingle",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-black dark:text-zinc-50 font-sans">
        <Header />
        <NewsTicker articles={oneArticlePerCategory} />
        {children}
      </body>
    </html>
  );
}
