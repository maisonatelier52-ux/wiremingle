// Shared types for WireMingle data

export interface ArticleAuthor {
  name: string;
  role: string;
  bio: string;
  image: string;
  slug: string;
  email: string;
  twitter: string;
  facebook: string;
  instagram: string;
  substack: string;
  medium: string;
}

export interface ArticleSection {
  subtitle: string;
  text: string;
}

export interface Article {
  category: string;
  title: string;
  slug: string;
  image: string;
  date: string;
  shortdescription: string;
  description: ArticleSection[];
  author: ArticleAuthor;
}
