"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LinkedinIcon, TwitterIcon, InstagramIcon, GithubIcon } from "@/components/ui/Icons";
import { TeamMember } from "@/lib/types/database";

interface TeamSectionProps {
  team: TeamMember[];
  title?: string;
  subtitle?: string;
}

export default function TeamSection({
  team = [],
  title = "The Creative Minds Behind Upgrade",
  subtitle = "World-Class Visionaries, Strategists, & Technical Pioneers",
}: TeamSectionProps) {
  return (
    <section id="team" className="py-20 bg-[#080808] relative overflow-hidden border-t border-[rgba(214,166,75,0.15)] scroll-mt-20 lg:scroll-mt-24">
      {/* Background glow */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#D6A64B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#E8C477]">
                Leadership & Talent
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-normal">{subtitle}</p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8C477] hover:text-white transition-colors group shrink-0"
          >
            <span>Consult With Our Directors</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {team.map((member, idx) => (
            <div
              key={member.id || idx}
              className="group rounded-2xl overflow-hidden bg-[#111111] border border-[rgba(214,166,75,0.2)] hover:border-[#D6A64B]/70 transition-all duration-300 flex flex-col hover:shadow-[0_15px_35px_-10px_rgba(214,166,75,0.2)]"
            >
              {/* Photo container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                <Image
                  src={member.profile_photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />

                {/* Social icons on photo bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#080808]/90 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477] hover:bg-[#D6A64B] hover:text-[#080808] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.twitter_url && (
                    <a
                      href={member.twitter_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#080808]/90 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477] hover:bg-[#D6A64B] hover:text-[#080808] transition-colors"
                      aria-label="Twitter"
                    >
                      <TwitterIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.instagram_url && (
                    <a
                      href={member.instagram_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#080808]/90 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477] hover:bg-[#D6A64B] hover:text-[#080808] transition-colors"
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {member.github_url && (
                    <a
                      href={member.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#080808]/90 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477] hover:bg-[#D6A64B] hover:text-[#080808] transition-colors"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E8C477] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#D6A64B] font-semibold mt-1">
                    {member.designation}
                  </p>
                  <p className="text-xs text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Skills tags */}
                {member.skills && member.skills.length > 0 && (
                  <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                    {member.skills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded"
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
  );
}
