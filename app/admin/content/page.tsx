"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, Sparkles, RefreshCw, Layers, CheckCircle2 } from "lucide-react";
import { HomepageSection, Statistic } from "@/lib/types/database";

export default function WebsiteContentManagementPage() {
  const [sections, setSections] = useState<Record<string, HomepageSection>>({});
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (data.success) {
        setSections(data.sections || {});
        setStatistics(data.statistics || []);
      }
    } catch {
      toast.error("Failed to load content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSectionChange = (sectionKey: string, field: string, value: string) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [field]: value,
      },
    }));
  };

  const handleStatChange = (id: string, field: string, value: string) => {
    setStatistics((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const saveSection = async (sectionKey: string) => {
    const sec = sections[sectionKey];
    if (!sec) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "section", data: sec }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Section "${sectionKey.toUpperCase()}" updated successfully!`);
      } else {
        toast.error("Failed to save section");
      }
    } catch {
      toast.error("Error saving section");
    } finally {
      setIsSaving(false);
    }
  };

  const saveStat = async (stat: Statistic) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "statistic", data: stat }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Statistic "${stat.label}" saved!`);
      } else {
        toast.error("Failed to save statistic");
      }
    } catch {
      toast.error("Error saving statistic");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <RefreshCw className="w-8 h-8 text-[#D6A64B] animate-spin mx-auto mb-2" />
        <p className="text-sm text-zinc-400">Loading website CMS sections...</p>
      </div>
    );
  }

  const hero = sections["hero"] || {};
  const about = sections["about"] || {};
  const cta = sections["cta"] || {};

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Website Content Management</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Edit global editorial copy, headlines, and animated statistics without touching code.
        </p>
      </div>

      {/* 1. Hero Section CMS */}
      <div className="p-8 rounded-3xl bg-[#111111] border border-[rgba(214,166,75,0.22)] shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6A64B]">
              SECTION 01
            </span>
            <h2 className="text-xl font-bold text-white">Homepage Hero Banner</h2>
          </div>
          <button
            onClick={() => saveSection("hero")}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#E8C477] transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Save Hero</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Badge Text</label>
            <input
              type="text"
              value={hero.badge || ""}
              onChange={(e) => handleSectionChange("hero", "badge", e.target.value)}
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">
              Main Headline (Gold Shimmer Effect)
            </label>
            <textarea
              rows={2}
              value={hero.title || ""}
              onChange={(e) => handleSectionChange("hero", "title", e.target.value)}
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Supporting Subtitle</label>
            <textarea
              rows={3}
              value={hero.subtitle || ""}
              onChange={(e) => handleSectionChange("hero", "subtitle", e.target.value)}
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Primary CTA Button Text</label>
              <input
                type="text"
                value={hero.cta_text || ""}
                onChange={(e) => handleSectionChange("hero", "cta_text", e.target.value)}
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Primary CTA Button URL</label>
              <input
                type="text"
                value={hero.cta_link || ""}
                onChange={(e) => handleSectionChange("hero", "cta_link", e.target.value)}
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. About Us Section CMS */}
      <div className="p-8 rounded-3xl bg-[#111111] border border-[rgba(214,166,75,0.22)] shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6A64B]">
              SECTION 02
            </span>
            <h2 className="text-xl font-bold text-white">About Us & Agency Philosophy</h2>
          </div>
          <button
            onClick={() => saveSection("about")}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#E8C477] transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Save About</span>
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Section Heading</label>
            <input
              type="text"
              value={about.title || ""}
              onChange={(e) => handleSectionChange("about", "title", e.target.value)}
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Subheading</label>
            <input
              type="text"
              value={about.subtitle || ""}
              onChange={(e) => handleSectionChange("about", "subtitle", e.target.value)}
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Main Narrative / Story</label>
            <textarea
              rows={4}
              value={about.description || ""}
              onChange={(e) => handleSectionChange("about", "description", e.target.value)}
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Image URL</label>
            <input
              type="text"
              value={about.image_url || ""}
              onChange={(e) => handleSectionChange("about", "image_url", e.target.value)}
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>
        </div>
      </div>

      {/* 3. Dynamic Homepage Statistics CMS */}
      <div className="p-8 rounded-3xl bg-[#111111] border border-[rgba(214,166,75,0.22)] shadow-xl space-y-6">
        <div className="pb-4 border-b border-zinc-800">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6A64B]">
            SECTION 03
          </span>
          <h2 className="text-xl font-bold text-white">Animated Agency Statistics</h2>
          <p className="text-xs text-zinc-400">
            Dynamically displayed in the About Us and Homepage counters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {statistics.map((stat) => (
            <div
              key={stat.id}
              className="p-5 rounded-2xl bg-[#080808] border border-zinc-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#E8C477]">{stat.label}</span>
                <button
                  onClick={() => saveStat(stat)}
                  className="px-3 py-1 rounded-lg bg-[#D6A64B]/20 hover:bg-[#D6A64B] text-[#D6A64B] hover:text-[#080808] text-[10px] font-bold transition-colors"
                >
                  Save
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">Display Value</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(stat.id, "value", e.target.value)}
                    className="w-full bg-[#111111] border border-zinc-700 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 block mb-1">Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(stat.id, "label", e.target.value)}
                    className="w-full bg-[#111111] border border-zinc-700 rounded-lg px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

