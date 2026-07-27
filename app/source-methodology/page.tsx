import PolicyPageLayout from "@/components/PolicyPageLayout";

export default function SourceMethodologyPage() {
  return (
    <PolicyPageLayout title="Source Methodology">
      <h2 className="text-xl font-bold text-black mt-2">Principles of Attribution</h2>
      <p>
        WireMingle believes in clear attribution. We endeavor to name all sources of information, quoting official corporate reports, federal registry lists, municipal statements, and direct interview transcripts.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Anonymous Sources</h2>
      <p>
        Anonymous sources are used as a last resort, only when naming the source would expose them to professional or physical risk. Before utilizing anonymous citations:
      </p>
      <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
        <li>The information must be vital to the public interest.</li>
        <li>The reporter must explain the source's access and authority.</li>
        <li>At least one senior editor must verify the source's identity.</li>
      </ul>

      <h2 className="text-xl font-bold text-black mt-4">Citation Formats</h2>
      <p>
        Any secondary data, industry metrics, or research charts utilized in our articles are linked directly to the original publisher or academic institution.
      </p>
    </PolicyPageLayout>
  );
}
