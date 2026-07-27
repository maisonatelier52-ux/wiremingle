import PolicyPageLayout from "@/components/PolicyPageLayout";

export default function RightOfReplyPage() {
  return (
    <PolicyPageLayout title="Right of Reply Policy">
      <h2 className="text-xl font-bold text-black mt-2">Our Commitment to Fairness</h2>
      <p>
        At WireMingle, we aim to deliver fair and balanced reporting. If an individual or organization is mentioned in our articles in a manner that they believe is critical or contains factual inaccuracies, they have a right to request a formal reply or correction.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Filing a Reply Request</h2>
      <p>
        To submit a Right of Reply request, please contact our corrections desk at <strong>corrections@wiremingle.com</strong>. The request must clearly specify:
      </p>
      <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
        <li>The specific article URL.</li>
        <li>The exact text segments or assertions in question.</li>
        <li>Factual evidence or counterarguments supporting the request.</li>
      </ul>

      <h2 className="text-xl font-bold text-black mt-4">Processing Timeframes</h2>
      <p>
        Our editorial committee reviews all submissions within 48 business hours. If the request is verified to have merit, we will print a correction notice or append the responder's statement to the article.
      </p>
    </PolicyPageLayout>
  );
}
