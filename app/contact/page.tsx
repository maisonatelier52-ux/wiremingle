import PolicyPageLayout from "@/components/PolicyPageLayout";

export default function ContactPage() {
  return (
    <PolicyPageLayout title="Contact Us">
      <h2 className="text-xl font-bold text-black mt-2">Get in Touch</h2>
      <p>
        We value feedback from our readers and are committed to open communication lines. Whether you have editorial tips, inquiries, corrections requests, or business proposals, you can reach out to our dedicated desks.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Editorial Desk</h2>
      <p>
        For general news tips, article submissions, or questions regarding our news coverage, please contact our central editorial desk at <strong>editor@wiremingle.com</strong>.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Press & Media Inquiries</h2>
      <p>
        For media relations, interview requests, or official press statements, please email our communications department at <strong>press@wiremingle.com</strong>.
      </p>

      <h2 className="text-xl font-bold text-black mt-4">Advertising & Sponsorship</h2>
      <p>
        To explore advertising formats, sponsored integrations, or custom partnership campaigns, reach our business team at <strong>advertise@wiremingle.com</strong>.
      </p>
    </PolicyPageLayout>
  );
}
