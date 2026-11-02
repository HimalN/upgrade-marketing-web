export const metadata = {
  title: "Privacy Policy | Upgrade Marketing Agency",
  description: "Privacy policy and data protection protocols of Upgrade Marketing Agency.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-zinc-300">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D6A64B]">LEGAL</span>
          <h1 className="text-4xl font-black text-white">Privacy Policy</h1>
          <p className="text-xs text-zinc-500">Effective Date: January 1, 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed border-t border-zinc-800 pt-8">
          <h2 className="text-xl font-bold text-white">1. Executive Overview</h2>
          <p>
            Upgrade Marketing Agency (&ldquo;Upgrade&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is
            committed to preserving the confidentiality, privacy, and integrity of all client
            corporate data and website visitors.
          </p>

          <h2 className="text-xl font-bold text-white">2. Information Collection</h2>
          <p>
            We collect personal identification information, including name, corporate email address,
            telephone number, and project briefing specifications when voluntarily submitted via our
            inquiry forms.
          </p>

          <h2 className="text-xl font-bold text-white">3. Non-Disclosure & Client Confidentiality</h2>
          <p>
            All proprietary business information, financial metrics, and brand assets shared during
            consultation or active agency engagements are protected under mutual non-disclosure
            agreements (NDA). We never sell, lease, or monetize client data.
          </p>

          <h2 className="text-xl font-bold text-white">4. Contact & Inquiries</h2>
          <p>
            For privacy inquiries or data eradication requests, contact us at{" "}
            <a href="mailto:contact@upgrademarketing.agency" className="text-[#E8C477] underline">
              contact@upgrademarketing.agency
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

