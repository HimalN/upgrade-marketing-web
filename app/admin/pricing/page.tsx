"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X, Star, RefreshCw } from "lucide-react";
import { PricingPackage } from "@/lib/types/database";

export default function PricingManagementPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPkg, setCurrentPkg] = useState<Partial<PricingPackage>>({});
  const [featuresText, setFeaturesText] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/pricing");
      const data = await res.json();
      if (data.success) setPackages(data.data || []);
    } catch {
      toast.error("Failed to load pricing packages");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    setCurrentPkg({
      name: "",
      service_name: "Branding & Identity",
      price: "$2,500",
      numeric_price: 2500,
      currency: "USD",
      billing_type: "one-time",
      description: "",
      features: [],
      is_popular: false,
      is_published: true,
      display_order: packages.length + 1,
    });
    setFeaturesText("");
    setIsEditing(true);
  };

  const handleEdit = (pkg: PricingPackage) => {
    setCurrentPkg(pkg);
    setFeaturesText((pkg.features || []).join("\n"));
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete package "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/pricing?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Package deleted");
        fetchPackages();
      }
    } catch {
      toast.error("Failed to delete package");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPkg.name || !currentPkg.price) {
      toast.error("Package name and price required");
      return;
    }

    const features = featuresText.split("\n").map((f) => f.trim()).filter(Boolean);

    try {
      const res = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentPkg, features }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Pricing package saved!");
        setIsEditing(false);
        fetchPackages();
      }
    } catch {
      toast.error("Error saving package");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Pricing & Packages</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Configure tiered agency retainers, fixed engagements, and feature lists.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:bg-[#E8C477]"
        >
          <Plus className="w-4 h-4" />
          <span>New Package</span>
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded-3xl bg-[#111111] border border-[#D6A64B] space-y-4 text-xs"
        >
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="font-bold text-white text-base">Package Setup</h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Package Name</label>
              <input
                type="text"
                value={currentPkg.name || ""}
                onChange={(e) => setCurrentPkg((prev) => ({ ...prev, name: e.target.value }))}
                required
                placeholder="e.g. Growth Accelerator"
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Price Tag</label>
              <input
                type="text"
                value={currentPkg.price || ""}
                onChange={(e) => setCurrentPkg((prev) => ({ ...prev, price: e.target.value }))}
                required
                placeholder="e.g. $3,600 or Custom"
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Billing Type</label>
              <select
                value={currentPkg.billing_type || "one-time"}
                onChange={(e) =>
                  setCurrentPkg((prev) => ({
                    ...prev,
                    billing_type: e.target.value as "one-time" | "monthly" | "custom",
                  }))
                }
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              >
                <option value="one-time">One-Time Project</option>
                <option value="monthly">Monthly Retainer</option>
                <option value="custom">Custom Quotation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Brief Description</label>
            <textarea
              rows={2}
              value={currentPkg.description || ""}
              onChange={(e) => setCurrentPkg((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">
              Included Features (One item per line)
            </label>
            <textarea
              rows={4}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Brand Guideline Documentation&#10;Next.js Web Experience&#10;Social Media Templates"
              className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentPkg.is_popular ?? false}
                onChange={(e) =>
                  setCurrentPkg((prev) => ({ ...prev, is_popular: e.target.checked }))
                }
                className="w-4 h-4 accent-[#D6A64B] rounded"
              />
              <span className="font-semibold text-white">Highlight as Popular (Gold Ribbon)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentPkg.is_published ?? true}
                onChange={(e) =>
                  setCurrentPkg((prev) => ({ ...prev, is_published: e.target.checked }))
                }
                className="w-4 h-4 accent-[#D6A64B] rounded"
              />
              <span className="font-semibold text-white">Published & Visible</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#D6A64B] text-[#080808] font-bold"
            >
              Save Package
            </button>
          </div>
        </form>
      )}

      {/* Pricing Cards List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`p-6 rounded-3xl bg-[#111111] border flex flex-col justify-between ${
              pkg.is_popular ? "border-[#D6A64B]" : "border-zinc-800"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">{pkg.name}</h4>
                  <span className="text-xs text-[#E8C477]">{pkg.service_name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-white">{pkg.price}</span>
                  <span className="block text-[10px] text-zinc-400">/{pkg.billing_type}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-400">{pkg.description}</p>

              {pkg.features && (
                <ul className="text-xs text-zinc-300 space-y-1 pt-2 border-t border-zinc-800">
                  {pkg.features.slice(0, 4).map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-800">
              <span className="text-[10px] text-zinc-500">
                {pkg.is_popular ? "⭐ Featured Tier" : "Standard"}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-[#D6A64B] text-zinc-300 hover:text-black"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id, pkg.name)}
                  className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-800 text-red-400 hover:text-white"
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

