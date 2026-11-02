import { getFaqs } from "@/lib/data/cms-store";
import FaqClient from "@/components/faq/FaqClient";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export const metadata = {
  title: "Frequently Asked Questions | Upgrade Marketing Agency",
  description: "Get answers to common questions regarding our creative protocol, pricing, timelines, and deliverables.",
};

export const revalidate = 0;

export default async function FaqPage() {
  const faqs = await getFaqs(true);

  return (
    <div className="pt-28 pb-16 bg-[#080808]">
      {/* Header */}
      <section className="py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D6A64B]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#D6A64B]/35 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-xs font-bold tracking-widest text-[#F5DFA9] uppercase">
              TRANSPARENCY & CLARITY
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-snug">
            FREQUENTLY ASKED <br />
            <span className="gold-gradient-text">QUESTIONS</span>
          </h1>

          <p className="text-lg text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about partnering with Upgrade, our engagement protocols, and project deliverables.
          </p>
        </div>
      </section>

      {/* Accordion Content */}
      <section className="py-12 border-t border-zinc-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqClient initialFaqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <CtaBannerSection />
    </div>
  );
}

