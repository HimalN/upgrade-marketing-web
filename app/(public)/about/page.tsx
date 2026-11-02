import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Target, Eye, Gem, Award, ShieldCheck } from "@/components/ui/Icons";
import { getStatistics, getTeamMembers, getHomepageSections } from "@/lib/data/cms-store";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TeamSection from "@/components/sections/TeamSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export const metadata = {
  title: "About Us | Upgrade Marketing Agency",
  description: "Learn about the mission, vision, creative philosophy, and leadership of Upgrade Marketing Agency.",
};

export const revalidate = 0;

export default async function AboutPage() {
  const [statistics, team, sections] = await Promise.all([
    getStatistics(),
    getTeamMembers(true),
    getHomepageSections(),
  ]);

  return (
    <div className="pt-28 pb-16 bg-[#080808]">
      {/* Hero Header */}
      <section className="py-16 sm:py-24 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D6A64B]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#D6A64B]/35 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-xs font-bold tracking-widest text-[#F5DFA9] uppercase">
              OUR ESSENCE & HERITAGE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-snug">
            FORGING THE ARCHITECTURE OF <br />
            <span className="gold-gradient-text">BRAND IMMORTALITY</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed">
            Upgrade Marketing Agency was founded on a singular conviction: in an overcrowded world, mediocrity is fatal. We engineer unforgettable brands through elite creative craftsmanship and data-backed performance.
          </p>
        </div>
      </section>

      {/* Narrative & Story */}
      <section className="py-16 border-t border-zinc-800/80">
        <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D6A64B]">
                THE UPGRADE STORY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                From a Disrupter&apos;s Blueprint to an International Standard
              </h2>
              <p className="text-zinc-300 leading-relaxed text-base">
                Born out of dissatisfaction with bloated, formulaic legacy agencies, Upgrade was conceived to be agile, uncompromising, and deeply allied with our clients&apos; bottom-line success.
              </p>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Over the past 8+ years, our studio has evolved from crafting bespoke brand identities for boutique luxury ventures into orchestrating multi-million dollar television commercials, global digital flagships, and high-conversion ad engines across 14 international jurisdictions.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#111111] border border-zinc-800">
                  <h4 className="text-white font-bold text-sm">Direct Leadership</h4>
                  <p className="text-xs text-zinc-400 mt-1">Founders lead every key client brief directly.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#111111] border border-zinc-800">
                  <h4 className="text-white font-bold text-sm">Zero Templates</h4>
                  <p className="text-xs text-zinc-400 mt-1">Every pixel is custom-engineered from scratch.</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#D6A64B]/30 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Upgrade Collaborative Studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Core Values */}
      <section className="py-20 border-t border-zinc-800/80 bg-[#0c0c0c]">
        <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="p-8 rounded-3xl bg-[#141414] border border-[#D6A64B]/20 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D6A64B]/10 border border-[#D6A64B]/30 flex items-center justify-center text-[#E8C477]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Mission</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                To transform ambitious brands into cultural and commercial titans by uniting fearless creative aesthetics with analytical revenue architecture.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-3xl bg-[#141414] border border-[#D6A64B]/20 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D6A64B]/10 border border-[#D6A64B]/30 flex items-center justify-center text-[#E8C477]">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Vision</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                To stand as the world&apos;s gold standard in creative distinction, proving that uncompromising beauty and aggressive market growth are mutually reinforcing.
              </p>
            </div>

            {/* Core Values */}
            <div className="p-8 rounded-3xl bg-[#141414] border border-[#D6A64B]/20 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D6A64B]/10 border border-[#D6A64B]/30 flex items-center justify-center text-[#E8C477]">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Core Values</h3>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A64B]" />
                  <span>Uncompromised Creative Prestige</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A64B]" />
                  <span>Ruthless Commercial Accountability</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A64B]" />
                  <span>Radical Client Transparency</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D6A64B]" />
                  <span>Continuous Innovation & Speed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="py-16 bg-[#111111] border-y border-[rgba(214,166,75,0.2)]">
        <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statistics.map((stat) => (
              <div key={stat.id} className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black gold-gradient-text tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wider">{stat.label}</div>
                {stat.description && (
                  <p className="text-xs text-zinc-400 mt-1">{stat.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* 4-Step Working Process */}
      <ProcessSection />

      {/* Executive Team Members */}
      <TeamSection team={team} />

      {/* Final Call to Action */}
      <CtaBannerSection />
    </div>
  );
}

