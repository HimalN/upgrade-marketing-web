import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Sparkles, Crown, Palette, Share2, TrendingUp, Globe, Video, Camera } from "@/components/ui/Icons";
import { getServices } from "@/lib/data/cms-store";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export const metadata = {
  title: "Agency Services & Capabilities | Upgrade Marketing Agency",
  description: "Explore our full suite of premium marketing, branding, web development, video production, and social media services.",
};

export const revalidate = 0;

const ICON_MAP: Record<string, React.ElementType> = {
  Crown,
  Palette,
  Share2,
  TrendingUp,
  Globe,
  Video,
  Camera,
  Sparkles,
};

export default async function ServicesPage() {
  const services = await getServices(true);

  return (
    <div className="pt-28 pb-16 bg-[#080808]">
      {/* Header */}
      <section className="py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D6A64B]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#D6A64B]/35 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-xs font-bold tracking-widest text-[#F5DFA9] uppercase">
              CAPABILITIES & SERVICES
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-snug">
            FULL-SPECTRUM <br />
            <span className="gold-gradient-text">CREATIVE & GROWTH MASTERY</span>
          </h1>

          <p className="text-lg text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
            From brand conception to multi-million dollar ad engines and television commercials, we build end-to-end assets engineered for dominance.
          </p>
        </div>
      </section>

      {/* Services Comprehensive Catalog */}
      <section className="py-16 border-t border-zinc-800/80">
        <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-16">
          {services.map((service, idx) => {
            const Icon = ICON_MAP[service.icon_name] || Sparkles;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={service.id || idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center p-8 sm:p-12 rounded-3xl bg-[#111111] border border-[rgba(214,166,75,0.22)] hover:border-[#D6A64B]/60 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]`}
              >
                {/* Image Column (Span 5) */}
                <div
                  className={`lg:col-span-5 relative aspect-[16/11] rounded-2xl overflow-hidden border border-[#D6A64B]/30 group ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Image
                    src={service.cover_image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
                  
                  {service.starting_price && (
                    <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#080808]/90 backdrop-blur-md border border-[#D6A64B]/40 text-xs font-bold text-[#E8C477]">
                      Starting from {service.starting_price}
                    </div>
                  )}
                </div>

                {/* Content Column (Span 7) */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#171717] border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#D6A64B]">
                      Service 0{idx + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white">{service.title}</h2>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {service.full_description || service.short_description}
                  </p>

                  {/* Features List */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs uppercase tracking-wider font-bold text-zinc-400 block">
                        Core Deliverables:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <Check className="w-4 h-4 text-[#D6A64B] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="p-4 rounded-xl bg-[#171717] border border-zinc-800/80 space-y-1">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-[#E8C477]">
                        Commercial Advantage:
                      </span>
                      <p className="text-xs text-zinc-400">
                        {service.benefits.join(" • ")}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D6A64B] via-[#E8C477] to-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-[0_0_20px_rgba(214,166,75,0.4)] transition-all"
                    >
                      <span>Explore Case Studies & Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="px-6 py-3 rounded-full bg-[#171717] border border-[#D6A64B]/30 text-white font-semibold text-xs uppercase tracking-wider hover:border-[#D6A64B] hover:text-[#E8C477] transition-all"
                    >
                      Inquire About This Service
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <CtaBannerSection />
    </div>
  );
}

