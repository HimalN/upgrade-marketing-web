"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Calendar, Building2 } from "lucide-react";
import { Project, ProjectCategory } from "@/lib/types/database";

interface FeaturedProjectsSectionProps {
  projects: Project[];
  categories?: ProjectCategory[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedProjectsSection({
  projects = [],
  categories = [],
  title = "Our Featured Work",
  subtitle = "A Curated Exhibition of Strategic Excellence",
}: FeaturedProjectsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter(
          (p) =>
            p.category_id === activeTab ||
            p.category_name?.toLowerCase() === activeTab.toLowerCase()
        );

  const allFilterCategories = [
    { id: "all", name: "All Projects" },
    ...categories.filter(
      (cat) =>
        cat.slug !== "all" &&
        cat.id !== "cat-all" &&
        cat.name.toLowerCase() !== "all projects"
    ),
  ];

  return (
    <section id="portfolio" className="py-20 bg-[#080808] relative overflow-hidden border-t border-[rgba(214,166,75,0.15)] scroll-mt-20 lg:scroll-mt-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D6A64B]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-[1820px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A64B]" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#E8C477]">
                Selected Works
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
            <span>Request Bespoke Showcase</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Category Filter Tabs with Soft Fluid Glide Animation */}
        <div className="flex items-center gap-2 mb-8 sm:mb-10 pb-2 overflow-x-auto no-scrollbar scroll-smooth flex-nowrap sm:flex-wrap">
          {allFilterCategories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-[#080808] font-bold"
                    : "text-zinc-400 hover:text-white bg-[#111111] border border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="featuredProjectsActivePill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D6A64B] via-[#E8C477] to-[#D6A64B] shadow-[0_0_20px_rgba(214,166,75,0.35)]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid with Soft Staggered Transition */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, 6).map((project, idx) => (
              <motion.div
                layout
                key={project.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl overflow-hidden bg-[#111111] border border-[rgba(214,166,75,0.2)] hover:border-[#D6A64B]/80 transition-colors duration-300 flex flex-col hover:shadow-[0_15px_40px_-15px_rgba(214,166,75,0.3)]"
              >
                {/* Image container with zoom & hover reveal */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={project.cover_image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#080808]/85 backdrop-blur-md border border-[#D6A64B]/40 text-[11px] font-bold text-[#F5DFA9] uppercase tracking-wider">
                    {project.category_name || "Creative"}
                  </div>

                  {/* Overlay link button on hover */}
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#080808]/60 backdrop-blur-[2px] transition-opacity duration-300"
                  >
                    <span className="w-12 h-12 rounded-full bg-[#D6A64B] text-[#080808] flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                      <ArrowUpRight className="w-5 h-5 font-bold" />
                    </span>
                  </Link>
                </div>

                {/* Card Meta */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span className="flex items-center gap-1 text-zinc-400">
                        <Building2 className="w-3.5 h-3.5 text-[#D6A64B]" />
                        <span>{project.client_name}</span>
                      </span>
                      {project.completion_date && (
                        <span className="flex items-center gap-1 text-zinc-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{project.completion_date.split("-")[0]}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#E8C477] transition-colors leading-snug">
                      <Link href={`/portfolio/${project.slug}`}>{project.title}</Link>
                    </h3>

                    <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                      {project.short_description}
                    </p>
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-bold text-[#E8C477] group-hover:text-white transition-colors"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    {project.results && (
                      <span className="text-[11px] font-semibold text-[#D6A64B] bg-[#D6A64B]/10 px-2 py-0.5 rounded border border-[#D6A64B]/20">
                        High Impact
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#D6A64B] via-[#E8C477] to-[#D6A64B] text-[#080808] font-bold text-sm shadow-[0_0_25px_rgba(214,166,75,0.3)] hover:shadow-[0_0_40px_rgba(214,166,75,0.5)] transition-all"
          >
            <span>Explore All Client Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

