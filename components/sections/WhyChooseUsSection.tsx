"use client";

import {
  Sparkles,
  Compass,
  Lightbulb,
  ShieldCheck,
  Users2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const PILLARS = [
  {
    icon: Sparkles,
    title: "Creative Excellence",
    description:
      "We adhere to uncompromising artistic and aesthetic standards. Every asset, typography pairing, and visual frame is crafted to evoke luxury and timeless prestige.",
  },
  {
    icon: Compass,
    title: "Strategic Thinking",
    description:
      "Design without market strategy is mere decoration. We dissect your industry, map competitor vulnerabilities, and build unassailable market positioning.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description:
      "Pioneering next-generation technologies: from Next.js 16 high-speed web apps and 3D WebGL to AI-accelerated workflows and cinematic drone production.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Execution",
    description:
      "Rigorous project management, predictable timelines, and transparent communication. We deliver on-budget with white-glove executive care.",
  },
  {
    icon: Users2,
    title: "Client-Focused Approach",
    description:
      "You collaborate directly with senior creative directors and strategists—not junior intermediaries. Your vision drives our creative obsession.",
  },
  {
    icon: TrendingUp,
    title: "Results-Driven Strategies",
    description:
      "Creative work measured against commercial milestones: revenue scale, pre-order surges, customer lifetime value, and brand valuation growth.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-20 bg-[#080808] relative overflow-hidden border-t border-[rgba(214,166,75,0.15)] scroll-mt-20 lg:scroll-mt-24">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#D6A64B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#E8C477]">
              The Upgrade Advantage
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Why Visionary Leaders Choose Upgrade
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
            We operate at the nexus of high-end aesthetics, psychological consumer influence, and
            rigorous technical engineering.
          </p>
        </div>

        {/* 6 Advantage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[rgba(214,166,75,0.2)] hover:border-[#D6A64B]/60 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(214,166,75,0.15)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-[#171717] border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477] group-hover:border-[#E8C477] group-hover:scale-105 transition-all shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#E8C477] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed">{pillar.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-semibold text-zinc-500">
                  <span className="text-[#D6A64B]/70 uppercase tracking-wider">Advantage 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]/40 group-hover:bg-[#D6A64B] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#E8C477] transition-colors group"
          >
            <span>Have a specific agency requirement? Let&apos;s talk</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

