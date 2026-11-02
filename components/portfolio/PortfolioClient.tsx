"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, Calendar, Building2 } from "lucide-react";
import { Project, ProjectCategory } from "@/lib/types/database";

interface PortfolioClientProps {
  initialProjects: Project[];
  categories: ProjectCategory[];
}

export default function PortfolioClient({
  initialProjects = [],
  categories = [],
}: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allCategoriesList = useMemo(() => {
    return [
      { id: "all", name: `All Works (${initialProjects.length})` },
      ...categories.map((cat) => {
        const count = initialProjects.filter(
          (p) =>
            p.category_id === cat.id ||
            p.category_name?.toLowerCase() === cat.slug.toLowerCase()
        ).length;
        return {
          id: cat.id,
          name: count > 0 ? `${cat.name} (${count})` : cat.name,
        };
      }),
    ];
  }, [categories, initialProjects]);

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" ||
        project.category_id === selectedCategory ||
        project.category_name?.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.short_description.toLowerCase().includes(query) ||
        project.client_name.toLowerCase().includes(query) ||
        (project.category_name && project.category_name.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 p-6 rounded-2xl bg-[#111111] border border-[rgba(214,166,75,0.22)]">
        {/* Category Tabs with Soft Fluid Glide */}
        <div className="flex flex-wrap items-center gap-2">
          {allCategoriesList.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-[#080808]"
                    : "text-zinc-400 hover:text-white bg-[#171717] border border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolioClientTabPill"
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

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by keyword, client..."
            className="w-full bg-[#080808] border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D6A64B] transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-24 text-center space-y-4 rounded-3xl bg-[#111111] border border-zinc-800">
          <p className="text-zinc-400 text-base">No projects found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-6 py-2 rounded-full bg-[#171717] border border-[#D6A64B]/40 text-xs font-bold text-[#E8C477] cursor-pointer hover:border-[#D6A64B] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-3xl overflow-hidden bg-[#111111] border border-[rgba(214,166,75,0.2)] hover:border-[#D6A64B]/80 transition-colors duration-300 flex flex-col hover:shadow-[0_20px_45px_-15px_rgba(214,166,75,0.25)] hover:-translate-y-1"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={project.cover_image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />

                  {/* Category label */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#080808]/85 backdrop-blur-md border border-[#D6A64B]/40 text-[10px] font-bold text-[#F5DFA9] uppercase tracking-wider">
                    {project.category_name || "Creative"}
                  </div>

                  {/* Hover overlay link */}
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-[#080808]/60 backdrop-blur-[2px] transition-opacity duration-300"
                  >
                    <span className="w-12 h-12 rounded-full bg-[#D6A64B] text-[#080808] flex items-center justify-center shadow-xl">
                      <ArrowUpRight className="w-5 h-5 font-bold" />
                    </span>
                  </Link>
                </div>

                {/* Meta & Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
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

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-bold text-[#E8C477] group-hover:text-white transition-colors"
                    >
                      <span>Inspect Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    {project.results && (
                      <span className="text-[10px] font-bold text-[#D6A64B] bg-[#D6A64B]/10 px-2 py-0.5 rounded border border-[#D6A64B]/20">
                        High Impact
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

