import { getPricingPackages, getFaqs } from "@/lib/data/cms-store";
import PricingSection from "@/components/sections/PricingSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";
import Link from "next/link";
import { HelpCircle, ChevronDown, CheckCircle2 } from "@/components/ui/Icons";

export const metadata = {
  title: "Investment & Agency Pricing | Upgrade Marketing Agency",
  description: "Transparent fixed and retainer pricing for luxury branding, web engineering, and performance marketing.",
};

export const revalidate = 0;

export default async function PricingPage() {
  const [packages, faqs] = await Promise.all([
    getPricingPackages(true),
    getFaqs(true),
  ]);

  return (
    <div className="pt-28 pb-16 bg-[#080808]">
      {/* Header */}
      <section className="py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D6A64B]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#D6A64B]/35 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-xs font-bold tracking-widest text-[#F5DFA9] uppercase">
              TRANSPARENT VALUE ARCHITECTURE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-snug">
            INVEST IN UNASSAILABLE <br />
            <span className="gold-gradient-text">MARKET DISTINCTION</span>
          </h1>

          <p className="text-lg text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
            Clear, high-ROI agency engagements tailored for high-growth brands and enterprise leaders.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <PricingSection packages={packages} />

      {/* Pricing FAQ Section */}
      <section className="py-20 border-t border-zinc-800/80 bg-[#0c0c0c]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D6A64B]">
              CLARITY & ASSURANCE
            </span>
            <h2 className="text-3xl font-black text-white">Frequently Asked Investment Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.slice(0, 4).map((faq) => (
              <div
                key={faq.id}
                className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 space-y-3"
              >
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#D6A64B] shrink-0" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/faq"
              className="text-xs uppercase tracking-wider font-bold text-[#E8C477] hover:underline"
            >
              View Full FAQ Knowledgebase →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBannerSection />
    </div>
  );
}

