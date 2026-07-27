import PolicyPageLayout from "@/components/PolicyPageLayout";

export default function TermsAndConditionsPage() {
  return (
    <PolicyPageLayout title="Terms & Conditions">
      <h2 className="text-xl font-bold text-black mt-2">1. Terms Acceptance</h2>
      <p>
        By accessing and browsing the WireMingle website, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, please refrain from using our services.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">2. Intellectual Property</h2>
      <p>
        All content, including article texts, illustrations, SVG designs, brand trademarks, and layout frameworks published on WireMingle is the intellectual property of WireMingle or its content creators. You may not copy, republish, or redistribute our contents without explicit written authorization.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">3. User Restrictions</h2>
      <p>
        Users agree to use our platform solely for lawful purposes. Prohibited activities include scraping content, injecting malicious software codes, attempting unauthorized server logins, or disrupting network operations.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">4. Disclaimer of Warranties</h2>
      <p>
        WireMingle provides news reports and analysis articles "as is" without representations or warranties of any kind. We do not guarantee the completeness, accuracy, or continuous availability of our digital services.
      </p>
    </PolicyPageLayout>
  );
}
