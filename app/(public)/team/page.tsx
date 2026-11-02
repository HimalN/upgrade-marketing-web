import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "@/components/ui/Icons";
import { LinkedinIcon, TwitterIcon, InstagramIcon, GithubIcon } from "@/components/ui/Icons";
import { getTeamMembers } from "@/lib/data/cms-store";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export const metadata = {
  title: "Our Leadership & Creative Collective | Upgrade Marketing Agency",
  description: "Meet the executive creative directors, brand strategists, and digital engineers steering Upgrade.",
};

export const revalidate = 0;

export default async function TeamPage() {
  const team = await getTeamMembers(true);

  return (
    <div className="pt-28 pb-16 bg-[#080808]">
      {/* Header */}
      <section className="py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D6A64B]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171717] border border-[#D6A64B]/35 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
            <span className="text-xs font-bold tracking-widest text-[#F5DFA9] uppercase">
              THE COLLECTIVE MINDS
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-snug">
            THE ARCHITECTS OF <br />
            <span className="gold-gradient-text">MODERN BRAND PRESTIGE</span>
          </h1>

          <p className="text-lg text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
            Our multidisciplinary collective unites senior creative directors, behavioral brand strategists, full-stack software architects, and cinematic storytellers.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 border-t border-zinc-800/80">
        <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member) => (
              <div
                key={member.id}
                className="group rounded-3xl overflow-hidden bg-[#111111] border border-[rgba(214,166,75,0.22)] hover:border-[#D6A64B]/80 transition-all duration-300 flex flex-col hover:shadow-[0_20px_45px_-15px_rgba(214,166,75,0.25)]"
              >
                {/* Photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={member.profile_photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />

                  {/* Social links */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-2">
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-[#080808]/90 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477] hover:bg-[#D6A64B] hover:text-[#080808] transition-colors"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.twitter_url && (
                      <a
                        href={member.twitter_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-[#080808]/90 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477] hover:bg-[#D6A64B] hover:text-[#080808] transition-colors"
                        aria-label="Twitter"
                      >
                        <TwitterIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.instagram_url && (
                      <a
                        href={member.instagram_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-[#080808]/90 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477] hover:bg-[#D6A64B] hover:text-[#080808] transition-colors"
                        aria-label="Instagram"
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.github_url && (
                      <a
                        href={member.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-[#080808]/90 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477] hover:bg-[#D6A64B] hover:text-[#080808] transition-colors"
                        aria-label="GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#E8C477] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#D6A64B] font-semibold mt-1">
                      {member.designation}
                    </p>
                    <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{member.bio}</p>
                  </div>

                  {member.skills && member.skills.length > 0 && (
                    <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                      {member.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBannerSection />
    </div>
  );
}
