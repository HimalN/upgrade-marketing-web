"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Check,
  Eye,
  EyeOff,
  Star,
  RefreshCw,
  X,
  Save,
  ArrowRight,
} from "lucide-react";
import { Service } from "@/lib/types/database";
import { slugify } from "@/lib/utils";
import Image from "next/image";

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service>>({});
  const [featuresText, setFeaturesText] = useState("");
  const [benefitsText, setBenefitsText] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (data.success) {
        setServices(data.data || []);
      }
    } catch {
      toast.error("Failed to load services");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    setCurrentService({
      title: "",
      slug: "",
      short_description: "",
      full_description: "",
      icon_name: "Sparkles",
      cover_image:
        "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80",
      starting_price: "$1,500",
      is_featured: false,
      is_published: true,
      display_order: services.length + 1,
    });
    setFeaturesText("");
    setBenefitsText("");
    setIsEditing(true);
  };

  const handleEdit = (service: Service) => {
    setCurrentService(service);
    setFeaturesText((service.features || []).join("\n"));
    setBenefitsText((service.benefits || []).join("\n"));
    setIsEditing(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete service "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/services?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Service "${title}" deleted.`);
        fetchServices();
      } else {
        toast.error("Failed to delete service");
      }
    } catch {
      toast.error("Error deleting service");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService.title) {
      toast.error("Please enter a service title");
      return;
    }

    const slug = currentService.slug || slugify(currentService.title);
    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    const benefits = benefitsText
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentService,
          slug,
          features,
          benefits,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Service saved successfully!");
        setIsEditing(false);
        fetchServices();
      } else {
        toast.error(data.message || "Failed to save service");
      }
    } catch {
      toast.error("Error submitting service data");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Services Management</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Create, edit, feature, and price all capabilities offered by Upgrade.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A64B] via-[#E8C477] to-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Service</span>
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {isEditing && (
        <div className="p-8 rounded-3xl bg-[#111111] border-2 border-[#D6A64B] shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">
              {currentService.id ? "Edit Service" : "Create New Agency Service"}
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">
                  Service Title <span className="text-[#D6A64B]">*</span>
                </label>
                <input
                  type="text"
                  value={currentService.title || ""}
                  onChange={(e) =>
                    setCurrentService((prev) => ({
                      ...prev,
                      title: e.target.value,
                      slug: prev.slug ? prev.slug : slugify(e.target.value),
                    }))
                  }
                  required
                  placeholder="e.g. Branding & Visual Identity"
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">
                  URL Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  value={currentService.slug || ""}
                  onChange={(e) =>
                    setCurrentService((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                  }
                  required
                  placeholder="e.g. branding-and-visual-identity"
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Icon Name</label>
                <select
                  value={currentService.icon_name || "Sparkles"}
                  onChange={(e) =>
                    setCurrentService((prev) => ({ ...prev, icon_name: e.target.value }))
                  }
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                >
                  <option value="Crown">Crown (Luxury Branding)</option>
                  <option value="Palette">Palette (Graphic & Packaging)</option>
                  <option value="Share2">Share2 (Social Media)</option>
                  <option value="TrendingUp">TrendingUp (Performance Ads)</option>
                  <option value="Globe">Globe (Web Development)</option>
                  <option value="Video">Video (Cinematic Commercials)</option>
                  <option value="Camera">Camera (Commercial Photography)</option>
                  <option value="Sparkles">Sparkles (Specialized)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Starting Price Tag</label>
                <input
                  type="text"
                  value={currentService.starting_price || ""}
                  onChange={(e) =>
                    setCurrentService((prev) => ({ ...prev, starting_price: e.target.value }))
                  }
                  placeholder="e.g. $1,800 or $1,500/mo"
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Display Order</label>
                <input
                  type="number"
                  value={currentService.display_order ?? 1}
                  onChange={(e) =>
                    setCurrentService((prev) => ({
                      ...prev,
                      display_order: parseInt(e.target.value) || 1,
                    }))
                  }
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Cover Image URL</label>
              <input
                type="text"
                value={currentService.cover_image || ""}
                onChange={(e) =>
                  setCurrentService((prev) => ({ ...prev, cover_image: e.target.value }))
                }
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Short Description</label>
              <textarea
                rows={2}
                value={currentService.short_description || ""}
                onChange={(e) =>
                  setCurrentService((prev) => ({ ...prev, short_description: e.target.value }))
                }
                placeholder="Concise overview for cards and meta tags..."
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Full Detailed Explanation</label>
              <textarea
                rows={4}
                value={currentService.full_description || ""}
                onChange={(e) =>
                  setCurrentService((prev) => ({ ...prev, full_description: e.target.value }))
                }
                placeholder="In-depth methodology for the dedicated service page..."
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">
                  Features / Deliverables (One per line)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Primary Logo Architecture&#10;Brand Bible Documentation&#10;Stationery Suite"
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">
                  Commercial Benefits (One per line)
                </label>
                <textarea
                  rows={4}
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  placeholder="Command Premium Pricing&#10;300% Higher Conversions"
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentService.is_featured ?? false}
                  onChange={(e) =>
                    setCurrentService((prev) => ({ ...prev, is_featured: e.target.checked }))
                  }
                  className="w-4 h-4 accent-[#D6A64B] rounded"
                />
                <span className="font-semibold text-white">Feature on Homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentService.is_published ?? true}
                  onChange={(e) =>
                    setCurrentService((prev) => ({ ...prev, is_published: e.target.checked }))
                  }
                  className="w-4 h-4 accent-[#D6A64B] rounded"
                />
                <span className="font-semibold text-white">Published & Visible</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#D6A64B] text-[#080808] font-bold uppercase tracking-wider hover:bg-[#E8C477]"
              >
                Save Service
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services Table List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-4">
        {isLoading ? (
          <div className="py-16 text-center">
            <RefreshCw className="w-8 h-8 text-[#D6A64B] animate-spin mx-auto mb-2" />
            <p className="text-xs text-zinc-400">Loading services...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171717] text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Starting Price</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-zinc-800">
                        <Image
                          src={service.cover_image}
                          alt={service.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span>{service.title}</span>
                        <span className="block text-[10px] text-zinc-500">Order: #{service.display_order}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-400">/services/{service.slug}</td>
                    <td className="py-3 px-4 text-[#E8C477] font-semibold">{service.starting_price || "Bespoke"}</td>
                    <td className="py-3 px-4">
                      {service.is_featured ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D6A64B] bg-[#D6A64B]/10 px-2 py-0.5 rounded border border-[#D6A64B]/30">
                          <Star className="w-3 h-3 fill-[#D6A64B]" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {service.is_published ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-400">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-[#D6A64B] text-zinc-300 hover:text-[#080808] transition-colors"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id, service.title)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-800 text-red-400 hover:text-white transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

