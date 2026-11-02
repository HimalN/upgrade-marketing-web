"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquare } from "lucide-react";

interface CtaBannerSectionProps {
  headline?: string;
  supportingText?: string;
}

export default function CtaBannerSection({
  headline = "Ready to Take Your Brand to the Next Level?",
  supportingText = "Let's turn your vision into something extraordinary.",
}: CtaBannerSectionProps) {
  return (
    <section className="py-20 bg-[#080808] relative overflow-hidden border-t border-[rgba(214,166,75,0.22)]">
      {/* Background gold lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D6A64B]/10 via-transparent to-[#D6A64B]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#D6A64B]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#D6A64B]/40 shadow-[0_0_20px_rgba(214,166,75,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#E8C477]" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#F5DFA9]">
            Exclusivity & Distinction
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
          {headline}
        </h2>

        <p className="text-sm sm:text-base text-zinc-300 font-normal max-w-xl mx-auto">
          {supportingText}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F5DFA9] via-[#D6A64B] to-[#99732B] text-[#080808] font-bold text-sm tracking-wide shadow-[0_0_35px_rgba(214,166,75,0.35)] hover:shadow-[0_0_50px_rgba(214,166,75,0.55)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#111111] text-white font-medium text-sm border border-[#D6A64B]/40 hover:border-[#D6A64B] hover:bg-[#171717] hover:shadow-[0_0_20px_rgba(214,166,75,0.2)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#D6A64B]" />
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </section>
  );
}

