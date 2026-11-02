"use client";

import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { PricingPackage } from "@/lib/types/database";

interface PricingSectionProps {
  packages: PricingPackage[];
  title?: string;
  subtitle?: string;
}

export default function PricingSection({
  packages = [],
  title = "Transparent Agency Packages",
  subtitle = "Invest in your brand's growth with transparent, high-ROI tiers",
}: PricingSectionProps) {
  return (
    <section id="pricing" className="py-20 bg-[#080808] relative overflow-hidden border-t border-[rgba(214,166,75,0.15)] scroll-mt-20 lg:scroll-mt-24">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D6A64B]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#E8C477]">
              Strategic Packages
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 xl:gap-10 items-stretch">
          {packages.map((pkg, idx) => {
            const isPopular = pkg.is_popular;
            return (
              <div
                key={pkg.id || idx}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "bg-[#141414] border-2 border-[#D6A64B] shadow-[0_0_40px_rgba(214,166,75,0.25)] lg:-translate-y-2"
                    : "bg-[#111111] border border-[rgba(214,166,75,0.2)] hover:border-[#D6A64B]/60"
                }`}
              >
                {/* Popular Highlight Ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#F5DFA9] via-[#D6A64B] to-[#99732B] text-[#080808] text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Most Requested</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6A64B]">
                      {pkg.service_name || "Package Tier"}
                    </span>
                    <h3 className="text-xl font-black text-white mt-1">{pkg.name}</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed min-h-[36px]">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price display */}
                  <div className="pb-6 border-b border-zinc-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {pkg.price}
                      </span>
                      {pkg.billing_type === "monthly" && (
                        <span className="text-xs text-zinc-400 font-medium">/ month</span>
                      )}
                      {pkg.billing_type === "one-time" && (
                        <span className="text-xs text-zinc-400 font-medium">/ engagement</span>
                      )}
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-400 block">
                      Included Capabilities:
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.features &&
                        pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                            <Check className="w-4 h-4 text-[#D6A64B] shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                {/* Card Button */}
                <div className="pt-8 mt-6 border-t border-zinc-800">
                  <a
                    href="#contact"
                    className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isPopular
                        ? "bg-gradient-to-r from-[#F5DFA9] via-[#D6A64B] to-[#99732B] text-[#080808] hover:shadow-[0_0_25px_rgba(214,166,75,0.4)]"
                        : "bg-[#171717] text-white border border-[#D6A64B]/30 hover:border-[#D6A64B] hover:text-[#E8C477]"
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <p className="text-[10px] text-center text-zinc-500 mt-3 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#D6A64B]" />
                    <span>Includes Custom Contract & SLA</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Pricing Note */}
        <div className="mt-16 p-8 rounded-2xl bg-[#111111] border border-[#D6A64B]/20 text-center max-w-3xl mx-auto space-y-4">
          <h4 className="text-lg font-bold text-white">Need an Enterprise or Custom Multi-Channel Retainer?</h4>
          <p className="text-sm text-zinc-400 max-w-xl mx-auto">
            We routinely architect custom packages for international television commercials, multi-country digital advertising, and enterprise headless migrations.
          </p>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#E8C477] hover:text-white cursor-pointer"
            >
              <span>Request Bespoke Proposal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

