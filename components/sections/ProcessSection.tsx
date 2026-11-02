"use client";

import Link from "next/link";
import { ArrowRight, Search, Target, PenTool, Rocket } from "lucide-react";

const STEPS = [
  {
    step: "01",
    phase: "Discover",
    icon: Search,
    title: "Deep Market & Brand Immersion",
    description:
      "We begin with exhaustive stakeholder interviews, category audits, audience psychographics, and commercial goal alignment. No assumptions; only clarity.",
  },
  {
    step: "02",
    phase: "Strategize",
    icon: Target,
    title: "Architectural Positioning Blueprint",
    description:
      "We synthesize our discovery into an unassailable strategic angle: defining brand archetype, key psychological triggers, conversion funnels, and creative themes.",
  },
  {
    step: "03",
    phase: "Create",
    icon: PenTool,
    title: "Uncompromising Production & Design",
    description:
      "Concepts materialize into world-class art: custom typography, luxury physical packaging, responsive Next.js architectures, cinematic commercials, and ad creatives.",
  },
  {
    step: "04",
    phase: "Deliver & Grow",
    icon: Rocket,
    title: "Launch Orchestration & Scaling",
    description:
      "We orchestrate market rollout, monitor performance analytics, test conversion lift, and provide continuous iterative refinement to ensure enduring category leadership.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 bg-[#080808] relative overflow-hidden border-t border-[rgba(214,166,75,0.15)] scroll-mt-20 lg:scroll-mt-24">
      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#E8C477]">
              Our Proven Protocol
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            The Blueprint to Distinction
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            A disciplined four-phase methodology engineered to take brands from concept to category dominance.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[rgba(214,166,75,0.22)] hover:border-[#D6A64B]/70 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_15px_35px_-10px_rgba(214,166,75,0.2)]"
              >
                <div>
                  {/* Step Number with Metallic Gold typography */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-black gold-gradient-text tracking-tighter">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#171717] border border-[#D6A64B]/30 flex items-center justify-center text-[#E8C477] group-hover:border-[#E8C477] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-xs uppercase tracking-widest font-bold text-[#E8C477] block mb-2">
                    Phase {step.step} — {step.phase}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#F5DFA9] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-medium">Standard SLA</span>
                  <span className="text-[11px] text-[#D6A64B] font-semibold">100% Quality Assurance</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#171717] border border-[#D6A64B]/40 text-white font-semibold text-sm hover:border-[#D6A64B] hover:text-[#E8C477] hover:shadow-[0_0_25px_rgba(214,166,75,0.2)] transition-all"
          >
            <span>Initiate Phase 01: Discover Your Brand Potential</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

