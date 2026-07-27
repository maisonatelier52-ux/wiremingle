import PolicyPageLayout from "@/components/PolicyPageLayout";

export default function FAQPage() {
  return (
    <PolicyPageLayout title="Frequently Asked Questions">
      <h2 className="text-xl font-bold text-black mt-2">Is access to WireMingle free?</h2>
      <p>
        Yes, all of our current news categories, articles, dynamic reports, and illustrations are fully accessible to the public without paywall gates.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">How do you fund your reporting?</h2>
      <p>
        We fund our independent news operations through a combination of programmatic advertising, corporate sponsorships, content licensing, and voluntary reader contributions.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">How can I submit an article or pitch a news tip?</h2>
      <p>
        If you have a breaking news lead or an investigative pitch, you can email our editorial desk directly at <strong>editor@wiremingle.com</strong>. Anonymous leads are welcome but must be verifiable.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">How do I request corrections?</h2>
      <p>
        Factual correction requests can be filed with our quality assurance committee at <strong>corrections@wiremingle.com</strong>. Please check our Right of Reply Policy page for submission requirements.
      </p>
    </PolicyPageLayout>
  );
}
