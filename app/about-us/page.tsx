import PolicyPageLayout from "@/components/PolicyPageLayout";

export default function AboutUsPage() {
  return (
    <PolicyPageLayout title="About Us">
      <h2 className="text-xl font-bold text-black mt-2">Who We Are</h2>
      <p>
        WireMingle is a leading independent digital news platform dedicated to delivering timely, accurate, and comprehensive coverage of politics, finance, technology, and global affairs. Our team of experienced correspondents and editorial professionals work around the clock to provide readers with high-quality journalism.
      </p>
      
      <h2 className="text-xl font-bold text-black mt-4">Our Mission</h2>
      <p>
        Our mission is to empower citizens and businesses with high-fidelity, independent reporting. We seek to foster informed public debate and hold public and private entities accountable. We operate with strict editorial independence and adhere to the highest standards of integrity.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Editorial Integrity</h2>
      <p>
        At WireMingle, we place factual verification and source transparency above speed. Our journalists adhere to rigorous fact-checking guidelines to ensure our reporting is unbiased, fair, and objective. We believe in providing clear distinctions between our news reporting and opinion analysis pieces.
      </p>
    </PolicyPageLayout>
  );
}
