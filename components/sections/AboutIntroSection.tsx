"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Award } from "lucide-react";
import { Statistic, HomepageSection } from "@/lib/types/database";

interface AboutIntroSectionProps {
  sectionData?: HomepageSection;
  statistics?: Statistic[];
}

export default function AboutIntroSection({
  sectionData,
  statistics = [],
}: AboutIntroSectionProps) {
  const title = sectionData?.title || "Creativity That Drives Real Growth";
  const badge = sectionData?.badge || "About Upgrade";
  const subtitle = sectionData?.subtitle || "Where Luxury Aesthetic Meets Performance Engineering";
  const description =
    sectionData?.description ||
    "At Upgrade, we reject the ordinary. We believe that true brand growth stems from the fusion of fearless creative vision, psychological strategy, and flawless technical craftsmanship. Since our inception, we have elevated brands across luxury, fintech, retail, automotive, and technology sectors into market icons.";

  return (
    <section id="about" className="py-20 bg-[#080808] relative overflow-hidden border-t border-[rgba(214,166,75,0.12)] scroll-mt-20 lg:scroll-mt-24">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#D6A64B]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Image & Brand Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D6A64B]/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] aspect-[16/10] sm:aspect-[4/5] group">
              <Image
                src={
                  sectionData?.image_url ||
                  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                }
                alt="Upgrade Creative Headquarters"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
              
              {/* Floating luxury emblem card */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-5 rounded-xl bg-[#111111]/90 backdrop-blur-md border border-[#D6A64B]/40 shadow-2xl">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#D6A64B]/20 border border-[#D6A64B]/50 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8C477]" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs sm:text-sm">International Standard</h4>
                    <p className="text-[10px] sm:text-xs text-zinc-400">Award-winning creative direction & execution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Dynamic Stats */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#E8C477] uppercase">
                  {badge}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
                {title}
              </h2>
              <p className="text-xs sm:text-sm uppercase tracking-wider text-[#D6A64B] font-medium">
                {subtitle}
              </p>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* Core Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-[#D6A64B] shrink-0" />
                <span>Bespoke, Non-Template Execution</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-[#D6A64B] shrink-0" />
                <span>ROI & Conversion Driven Strategy</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-[#D6A64B] shrink-0" />
                <span>Master-Tier Art Direction</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-[#D6A64B] shrink-0" />
                <span>Direct Access to Senior Partners</span>
              </div>
            </div>

            {/* Dynamic Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {statistics.length > 0
                ? statistics.map((stat) => (
                    <div
                      key={stat.id}
                      className="p-4 rounded-xl bg-[#111111] border border-[#D6A64B]/20 hover:border-[#D6A64B]/50 transition-colors text-center"
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold gold-gradient-text">
                        {stat.value}
                      </div>
                      <div className="text-xs font-semibold text-zinc-300 mt-1">{stat.label}</div>
                    </div>
                  ))
                : (
                    <>
                      <div className="p-4 rounded-xl bg-[#111111] border border-[#D6A64B]/20 text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold gold-gradient-text">250+</div>
                        <div className="text-xs font-semibold text-zinc-300 mt-1">Projects Done</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#111111] border border-[#D6A64B]/20 text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold gold-gradient-text">120+</div>
                        <div className="text-xs font-semibold text-zinc-300 mt-1">Happy Clients</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#111111] border border-[#D6A64B]/20 text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold gold-gradient-text">8+</div>
                        <div className="text-xs font-semibold text-zinc-300 mt-1">Years Active</div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#111111] border border-[#D6A64B]/20 text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold gold-gradient-text">99.4%</div>
                        <div className="text-xs font-semibold text-zinc-300 mt-1">Satisfaction</div>
                      </div>
                    </>
                  )}
            </div>

            {/* Read More button */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171717] border border-[#D6A64B]/40 text-white font-semibold text-sm hover:border-[#D6A64B] hover:text-[#E8C477] transition-all group"
              >
                <span>Read Full Agency Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

