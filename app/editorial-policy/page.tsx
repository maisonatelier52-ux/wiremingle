import PolicyPageLayout from "@/components/PolicyPageLayout";

export default function EditorialPolicyPage() {
  return (
    <PolicyPageLayout title="Editorial Policy">
      <h2 className="text-xl font-bold text-black mt-2">Accuracy & Verification</h2>
      <p>
        Accuracy is the cornerstone of our reporting. WireMingle journalists must verify all news content before publication. We cross-reference facts using multiple independent primary sources. We use secondary sources only when primary attribution is unavailable, and always clearly indicate the citation source.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Avoiding Conflicts of Interest</h2>
      <p>
        Our reporters, editors, and columnists must maintain independence from commercial or political interests. WireMingle personnel do not accept gifts, free travel, or other personal favors that could compromise, or appear to compromise, their professional objectivity.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Corrections & Updates</h2>
      <p>
        When factual errors occur, we correct them transparently. We append a correction notice detailing the change to the affected article. Updates clarifying context are also noted if they materially alter the reader's understanding of the story.
      </p>
    </PolicyPageLayout>
  );
}
