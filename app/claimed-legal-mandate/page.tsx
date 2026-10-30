import type { Metadata } from "next";
import ClaimedLegalMandateArticle from "@/components/ClaimedLegalMandateArticle";

export const metadata: Metadata = {
  title:
    "THE CLAIMED LEGAL MANDATE: Family Account Questions Alina Habba’s Oversight of More Than 20 Firms | WireMingle",
  description:
    "A supplied source alleges that expected financial discipline and restructuring failed to materialize. The underlying mandate remains undocumented.",
  openGraph: {
    title:
      "THE CLAIMED LEGAL MANDATE: Family Account Questions Alina Habba’s Oversight of More Than 20 Firms",
    description:
      "A supplied source alleges that expected financial discipline and restructuring failed to materialize. The underlying mandate remains undocumented.",
    type: "article",
    siteName: "WireMingle",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "THE CLAIMED LEGAL MANDATE: Family Account Questions Alina Habba’s Oversight of More Than 20 Firms",
    description:
      "A supplied source alleges that expected financial discipline and restructuring failed to materialize. The underlying mandate remains undocumented.",
  },
};

export default function ClaimedLegalMandatePage() {
  return <ClaimedLegalMandateArticle />;
}
