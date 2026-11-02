"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Sparkles, Trophy, Award, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSection({
  badge = "Premier Creative & Digital Agency",
  title = "We Don't Just Market Brands. We Make Them Unforgettable.",
  subtitle = "Transforming ideas into powerful brand experiences through creative design, strategic marketing, and innovative digital solutions.",
  description = "We partner with visionary founders and established market leaders to forge commanding brand legacies.",
  ctaText = "Explore Our Services",
  ctaLink = "#services",
}: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#080808]">
      {/* Background radial gold glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] lg:w-[800px] h-[500px] sm:h-[600px] lg:h-[800px] bg-[#D6A64B]/10 rounded-full blur-[120px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-64 sm:w-80 h-64 sm:h-80 bg-[#E8C477]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-[#B6862D]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle luxury geometric grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#D6A64B 1px, transparent 1px), linear-gradient(90deg, #D6A64B 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 text-center">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#171717] border border-[#D6A64B]/35 shadow-[0_0_20px_rgba(214,166,75,0.15)] mb-5 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#E8C477]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#F5DFA9]">
            {badge}
          </span>
        </div>

        {/* Main Editorial Headline - Scaled for 1080p and Mobile */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white max-w-3xl xl:max-w-4xl mx-auto leading-tight sm:leading-tight mb-4 sm:mb-5">
          We Don&apos;t Just Market Brands.{" "}
          <span className="gold-gradient-text block sm:inline">
            We Make Them Unforgettable.
          </span>
        </h1>

        {/* Supporting Subtitle */}
        <p className="text-xs sm:text-base md:text-lg xl:text-xl text-zinc-300 max-w-2xl xl:max-w-3xl mx-auto font-normal leading-relaxed mb-6 sm:mb-8 lg:mb-10">
          {subtitle}
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-10 sm:mb-14">
          <a
            href={ctaLink}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#F5DFA9] via-[#D6A64B] to-[#99732B] text-[#080808] font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(214,166,75,0.3)] hover:shadow-[0_0_35px_rgba(214,166,75,0.5)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#portfolio"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-[#111111] text-white font-medium text-xs sm:text-sm border border-[#D6A64B]/30 hover:border-[#D6A64B] hover:bg-[#171717] hover:shadow-[0_0_20px_rgba(214,166,75,0.2)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Selected Work</span>
          </a>
        </div>

        {/* Luxury Trust Indicators */}
        <div className="pt-8 sm:pt-10 border-t border-zinc-800/60 max-w-5xl xl:max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 lg:gap-12 text-center">
          <div className="flex flex-col items-center p-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">250+</span>
            <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-0.5 sm:mt-1">
              Projects Delivered
            </span>
          </div>
          <div className="flex flex-col items-center p-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#E8C477] tracking-tight">120+</span>
            <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-0.5 sm:mt-1">
              Global Brands
            </span>
          </div>
          <div className="flex flex-col items-center p-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">8+ Years</span>
            <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-0.5 sm:mt-1">
              Market Mastery
            </span>
          </div>
          <div className="flex flex-col items-center p-2">
            <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#E8C477] tracking-tight">99.4%</span>
            <span className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider mt-0.5 sm:mt-1">
              Satisfaction Rate
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 sm:mt-14 flex flex-col items-center justify-center text-zinc-500 animate-bounce">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#D6A64B]/80 font-bold mb-1">
            Discover Distinction
          </span>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#D6A64B]" />
        </div>
      </div>
    </section>
  );
}
