import PolicyPageLayout from "@/components/PolicyPageLayout";

export default function AdvertisingSponsoredPolicyPage() {
  return (
    <PolicyPageLayout title="Advertising & Sponsored Policy">
      <h2 className="text-xl font-bold text-black mt-2">Editorial & Commercial Separation</h2>
      <p>
        WireMingle maintains a wall separating our newsroom and our sales operations. Advertisers, corporate partners, and sponsors have no input, influence, or review rights over any of our news stories or opinion pieces.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Labeling Guidelines</h2>
      <p>
        Any content on our platform that is paid for, co-created with, or sponsored by an advertiser is labeled as <strong>"Sponsored Content"</strong>, <strong>"Paid Integration"</strong>, or <strong>"Advertiser Feature"</strong>. We use distinct typography treatments and labels to separate advertising from editorial copy.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Advertiser Restrictions</h2>
      <p>
        We reject ads containing misleading facts, fraudulent claims, hate speech, or content that promotes illegal goods or actions. WireMingle reserves the right to decline any advertising integration at our sole discretion.
      </p>
    </PolicyPageLayout>
  );
}
