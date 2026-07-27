import PolicyPageLayout from "@/components/PolicyPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageLayout title="Privacy Policy">
      <h2 className="text-xl font-bold text-black mt-2">Information We Collect</h2>
      <p>
        At WireMingle, we protect your personal privacy. We collect minimal metadata necessary to run our platform, including browser details, IP address logs, cookies settings, and optional email subscriptions when you register for newsletters.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">How We Use Your Data</h2>
      <p>
        Your data is used to optimize user experience, personalize content delivery, analyze visitor flows, and prevent security breaches. We do not sell or lease your personal identifiers to third-party advertising companies.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Security Standards</h2>
      <p>
        We employ standard industry encryptions (including HTTPS) and database firewall security configurations to protect our server databases. While no internet transmission is 100% secure, we make reasonable commercial efforts to secure user profiles.
      </p>
    </PolicyPageLayout>
  );
}
