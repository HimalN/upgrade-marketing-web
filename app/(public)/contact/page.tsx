import { getSiteSettings } from "@/lib/data/cms-store";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
  title: "Contact Upgrade Marketing Agency | Book Consultation",
  description: "Get in touch with Upgrade Marketing Agency for bespoke branding, web development, and digital marketing inquiries.",
};

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-28 pb-16 bg-[#080808]">
      {/* Header */}
      <section className="py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D6A64B]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#D6A64B]/35 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-xs font-bold tracking-widest text-[#F5DFA9] uppercase">
              EXECUTIVE CONVERSATIONS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-snug">
            LET&apos;S ELEVATE YOUR BRAND <br />
            <span className="gold-gradient-text">TO UNFORGETTABLE HEIGHTS</span>
          </h1>

          <p className="text-lg text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
            Whether launching a new venture, repositioning an established legacy, or scaling an ad engine—our partners are ready.
          </p>
        </div>
      </section>

      {/* Main Interactive Contact Section */}
      <ContactSection settings={settings} />
    </div>
  );
}

