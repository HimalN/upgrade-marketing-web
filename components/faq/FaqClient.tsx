"use client";

import { useState, useMemo } from "react";
import { ChevronDown, Search, HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Faq } from "@/lib/types/database";

interface FaqClientProps {
  initialFaqs: Faq[];
}

export default function FaqClient({ initialFaqs = [] }: FaqClientProps) {
  const [openId, setOpenId] = useState<string | null>(initialFaqs[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(initialFaqs.map((f) => f.category || "General")));
    return cats;
  }, [initialFaqs]);

  const filteredFaqs = useMemo(() => {
    return initialFaqs.filter((faq) => {
      const matchesCat =
        selectedCategory === "all" ||
        faq.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.category.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [initialFaqs, selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-10">
      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#111111] border border-[rgba(214,166,75,0.22)]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-[#D6A64B] text-[#080808]"
                : "bg-[#171717] text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            All Questions ({initialFaqs.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-[#D6A64B] text-[#080808]"
                  : "bg-[#171717] text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full bg-[#080808] border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D6A64B] transition-colors"
          />
        </div>
      </div>

      {/* Accordion List */}
      {filteredFaqs.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[#111111] border border-zinc-800 space-y-3">
          <p className="text-zinc-400 text-sm">No matching questions found.</p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="text-xs font-bold text-[#E8C477] hover:underline"
          >
            Reset Search
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl overflow-hidden bg-[#111111] border border-[rgba(214,166,75,0.2)] transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#D6A64B] shrink-0" />
                    <span className="font-bold text-white text-base sm:text-lg">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#E8C477] transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-zinc-800/60 text-zinc-300 text-sm leading-relaxed whitespace-pre-line pl-11 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Need more help banner */}
      <div className="p-8 rounded-3xl bg-[#141414] border border-[#D6A64B]/30 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Have a Unique Question or Requirement?</h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          Our client advisory team is available to discuss custom project structures, NDAs, and
          tailored service timelines.
        </p>
        <div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#171717] border border-[#D6A64B]/40 text-xs uppercase tracking-wider font-bold text-[#E8C477] hover:border-[#D6A64B] hover:text-white transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect with Executive Advisory</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

