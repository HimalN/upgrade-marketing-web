"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Crown,
  Palette,
  Share2,
  TrendingUp,
  Globe,
  Video,
  Camera,
  Sparkles,
  Check,
} from "lucide-react";
import { Service } from "@/lib/types/database";

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

interface ServicesOverviewSectionProps {
  services: Service[];
  title?: string;
  subtitle?: string;
}

export default function ServicesOverviewSection({
  services = [],
  title = "What We Do",
  subtitle = "Creative Solutions. Powerful Strategies. Measurable Results.",
}: ServicesOverviewSectionProps) {
  return (
    <section id="services" className="py-20 bg-[#080808] relative overflow-hidden scroll-mt-20 lg:scroll-mt-24">
      {/* Glow elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D6A64B]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#E8C477]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#E8C477]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#F5DFA9]">
              Capabilities & Expertise
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Editorial Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon_name] || Sparkles;
            return (
              <div
                key={service.id || index}
                className="group relative rounded-2xl bg-[#111111] border border-[rgba(214,166,75,0.22)] hover:border-[#D6A64B]/70 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-[0_10px_35px_-10px_rgba(214,166,75,0.25)] hover:-translate-y-1"
              >
                {/* Service Image banner with overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={service.cover_image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-70 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[#080808]/90 backdrop-blur-md border border-[#D6A64B]/50 flex items-center justify-center text-[#E8C477] shadow-lg group-hover:border-[#E8C477] transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Starting price tag */}
                  {service.starting_price && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#080808]/85 backdrop-blur-md border border-zinc-700 text-xs font-semibold text-zinc-300">
                      From {service.starting_price}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#E8C477] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                      {service.short_description}
                    </p>

                    {/* Features Snippet */}
                    {service.features && service.features.length > 0 && (
                      <div className="pt-3 space-y-2 border-t border-zinc-800/80">
                        {service.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                            <Check className="w-3.5 h-3.5 text-[#D6A64B] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Learn More Link */}
                  <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#E8C477] group-hover:text-white transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      href={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="text-xs text-zinc-400 hover:text-[#D6A64B] transition-colors"
                    >
                      Inquire
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Capabilities CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#171717] border border-[#D6A64B]/40 text-white font-semibold text-sm hover:border-[#D6A64B] hover:text-[#E8C477] hover:shadow-[0_0_25px_rgba(214,166,75,0.2)] transition-all"
          >
            <span>Explore All Capabilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

