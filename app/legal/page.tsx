import PolicyPageLayout from "@/components/PolicyPageLayout";

export default function LegalPage() {
  return (
    <PolicyPageLayout title="Legal & Compliance">
      <h2 className="text-xl font-bold text-black mt-2">Corporate Structure</h2>
      <p>
        WireMingle is owned and operated by WireMingle Media Group, LLC. We are a registered media corporation structured to preserve absolute operational neutrality and news coverage transparency.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Regulatory Compliance</h2>
      <p>
        WireMingle maintains compliance with global digital commerce and publishing regulations. Our editorial policies comply with standard libel laws, intellectual property rights, and fair usage guidelines.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Disclaimers</h2>
      <p>
        The content on this website is for informational and educational purposes only. Opinion columns and guest editorials represent the views of the individual authors and do not necessarily reflect the official corporate position of WireMingle Media Group.
      </p>
    </PolicyPageLayout>
  );
}
