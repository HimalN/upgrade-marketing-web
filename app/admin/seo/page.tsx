"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save, Search, Globe, ShieldCheck, Sparkles } from "lucide-react";

export default function SeoManagementPage() {
  const [seo, setSeo] = useState({
    site_title: "Upgrade Marketing Agency | Unforgettable Brand Experiences",
    meta_description:
      "Transforming ideas into powerful brand experiences through creative design, strategic marketing, and innovative digital solutions.",
    keywords:
      "marketing agency, luxury branding, next.js web development, video production, performance ads",
    og_image: "/images/logo.png",
    canonical_url: "https://upgrademarketing.agency",
    enable_indexing: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Global SEO metadata configured successfully!");
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">SEO Management</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Meta tags, Google search snippets, OpenGraph previews, and indexing parameters.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A64B] via-[#E8C477] to-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>Save SEO</span>
        </button>
      </div>

      {/* Google Preview Card */}
      <div className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 space-y-2">
        <span className="text-[10px] uppercase font-bold text-[#D6A64B] tracking-wider">
          GOOGLE SERP SIMULATION PREVIEW
        </span>
        <div className="space-y-1">
          <p className="text-xs text-zinc-400 font-mono">{seo.canonical_url}</p>
          <h3 className="text-base font-medium text-[#8ab4f8] hover:underline cursor-pointer">
            {seo.site_title}
          </h3>
          <p className="text-xs text-zinc-300 line-clamp-2 max-w-xl">{seo.meta_description}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-6 text-xs">
        <div className="space-y-4">
          <div>
            <label className="font-semibold text-zinc-300 block mb-1">
              Global Meta Title Tag <span className="text-[#D6A64B]">*</span>
            </label>
            <input
              type="text"
              value={seo.site_title}
              onChange={(e) => setSeo((prev) => ({ ...prev, site_title: e.target.value }))}
              required
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">
              Meta Description (Optimal: 150-160 characters)
            </label>
            <textarea
              rows={3}
              value={seo.meta_description}
              onChange={(e) => setSeo((prev) => ({ ...prev, meta_description: e.target.value }))}
              required
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Target Keywords</label>
            <input
              type="text"
              value={seo.keywords}
              onChange={(e) => setSeo((prev) => ({ ...prev, keywords: e.target.value }))}
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Canonical URL</label>
              <input
                type="url"
                value={seo.canonical_url}
                onChange={(e) => setSeo((prev) => ({ ...prev, canonical_url: e.target.value }))}
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">OpenGraph Share Image URL</label>
              <input
                type="text"
                value={seo.og_image}
                onChange={(e) => setSeo((prev) => ({ ...prev, og_image: e.target.value }))}
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={seo.enable_indexing}
                onChange={(e) => setSeo((prev) => ({ ...prev, enable_indexing: e.target.checked }))}
                className="w-4 h-4 accent-[#D6A64B] rounded"
              />
              <span className="font-semibold text-white">
                Permit Search Engine Indexing (Robots: index, follow)
              </span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#D6A64B] text-[#080808] font-bold uppercase tracking-wider hover:bg-[#E8C477]"
          >
            Save Meta Settings
          </button>
        </div>
      </form>
    </div>
  );
}

