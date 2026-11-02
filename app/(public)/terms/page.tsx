export const metadata = {
  title: "Terms of Engagement | Upgrade Marketing Agency",
  description: "Terms and conditions governing agency client engagements and platform access.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 bg-[#080808]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-zinc-300">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D6A64B]">LEGAL</span>
          <h1 className="text-4xl font-black text-white">Terms of Engagement</h1>
          <p className="text-xs text-zinc-500">Effective Date: January 1, 2026</p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed border-t border-zinc-800 pt-8">
          <h2 className="text-xl font-bold text-white">1. Scope of Engagement</h2>
          <p>
            Upgrade Marketing Agency delivers bespoke branding, software engineering, performance
            marketing, and video production services according to formalized Statements of Work
            (SOW) signed by both parties.
          </p>

          <h2 className="text-xl font-bold text-white">2. Intellectual Property Rights</h2>
          <p>
            Upon settlement of all contracted milestone invoices, complete ownership and commercial
            usage rights of final approved design assets, vector artworks, codebases, and media files
            transfer unconditionally to the client.
          </p>

          <h2 className="text-xl font-bold text-white">3. Payment & Milestone Schedules</h2>
          <p>
            Standard fixed-scope engagements require a 50% retainer prior to project kickoff, with
            remaining balances billed upon deliverable acceptance. Retainers bill monthly in advance.
          </p>

          <h2 className="text-xl font-bold text-white">4. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with international commercial
            arbitration standards.
          </p>
        </div>
      </div>
    </div>
  );
}

