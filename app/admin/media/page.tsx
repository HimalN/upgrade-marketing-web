"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Upload, Copy, Check, Trash2, Search, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
}

const DEFAULT_ASSETS: MediaItem[] = [
  {
    id: "med-1",
    name: "upgrade-agency-master-logo.png",
    url: "/images/logo.png",
    size: "226 KB",
  },
  {
    id: "med-2",
    name: "aura-luxury-fragrance.jpg",
    url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    size: "480 KB",
  },
  {
    id: "med-3",
    name: "nexus-fintech-dashboard.jpg",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    size: "520 KB",
  },
  {
    id: "med-4",
    name: "apex-hypercar-launch.jpg",
    url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    size: "610 KB",
  },
  {
    id: "med-5",
    name: "verve-beverage-cans.jpg",
    url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
    size: "390 KB",
  },
  {
    id: "med-6",
    name: "whiskey-reserve-packaging.jpg",
    url: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&q=80",
    size: "720 KB",
  },
];

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>(DEFAULT_ASSETS);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("File uploaded successfully!");
        setMediaList((prev) => [
          {
            id: `med-${Date.now()}`,
            name: data.file_name,
            url: data.file_url,
            size: `${(data.file_size / 1024).toFixed(0)} KB`,
          },
          ...prev,
        ]);
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch {
      toast.error("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  const filteredMedia = mediaList.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Media Library</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Upload images, view assets, and copy CDN links for services and case studies.
          </p>
        </div>

        <label className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A64B] via-[#E8C477] to-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? "Uploading..." : "Upload New File"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-[#111111] border border-zinc-800 flex items-center">
        <Search className="w-4 h-4 text-zinc-500 mr-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter media assets by name..."
          className="bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none w-full"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl overflow-hidden bg-[#111111] border border-zinc-800 hover:border-[#D6A64B]/60 transition-all flex flex-col"
          >
            <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden">
              <Image src={item.url} alt={item.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover" />
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between text-xs">
              <div>
                <p className="font-semibold text-white truncate" title={item.name}>
                  {item.name}
                </p>
                <span className="text-[10px] text-zinc-500">{item.size}</span>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                <button
                  onClick={() => copyToClipboard(item.url, item.id)}
                  className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-[#D6A64B] text-zinc-300 hover:text-black text-[10px] font-bold flex items-center gap-1 transition-colors"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setMediaList((prev) => prev.filter((m) => m.id !== item.id))}
                  className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

