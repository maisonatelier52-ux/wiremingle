import PolicyPageLayout from "@/components/PolicyPageLayout";

export default function OwnershipAndFundingPage() {
  return (
    <PolicyPageLayout title="Ownership & Funding">
      <h2 className="text-xl font-bold text-black mt-2">Transparency & Independence</h2>
      <p>
        WireMingle believes that transparency is fundamental to public trust. We are owned by independent shareholders committed to public interest journalism. No investor, advertiser, or corporate parent has any input or veto power over our news coverage decisions.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Funding Models</h2>
      <p>
        Our operations are funded through a diversified model including digital advertisements, sponsored partnerships, content licensing, and voluntary reader contributions. This balance protects us from reliance on any single financial source, preserving our editorial integrity.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Investor Declarations</h2>
      <p>
        We do not accept funding from state governments, political committees, or lobbying groups. Any partnership, advertisement, or sponsored content on our platform is clearly labeled to ensure readers are never misled about funding origins.
      </p>
    </PolicyPageLayout>
  );
}
