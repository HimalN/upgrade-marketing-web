"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Save, X, RefreshCw } from "lucide-react";
import { ProjectCategory } from "@/lib/types/database";
import { slugify } from "@/lib/utils";

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCat, setCurrentCat] = useState<Partial<ProjectCategory>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.success) setCategories(data.data || []);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    setCurrentCat({
      name: "",
      slug: "",
      description: "",
      display_order: categories.length + 1,
    });
    setIsEditing(true);
  };

  const handleEdit = (cat: ProjectCategory) => {
    setCurrentCat(cat);
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Category "${name}" removed`);
        fetchCategories();
      }
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCat.name) return;
    const slug = currentCat.slug || slugify(currentCat.name);

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentCat, slug }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Category saved!");
        setIsEditing(false);
        fetchCategories();
      }
    } catch {
      toast.error("Error saving category");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Project Categories</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Organize portfolio case studies into navigable disciplines.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:bg-[#E8C477]"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded-2xl bg-[#111111] border border-[#D6A64B] space-y-4 text-xs"
        >
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <h3 className="font-bold text-white text-sm">Category Details</h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Name</label>
              <input
                type="text"
                value={currentCat.name || ""}
                onChange={(e) =>
                  setCurrentCat((prev) => ({
                    ...prev,
                    name: e.target.value,
                    slug: prev.slug ? prev.slug : slugify(e.target.value),
                  }))
                }
                required
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Slug</label>
              <input
                type="text"
                value={currentCat.slug || ""}
                onChange={(e) =>
                  setCurrentCat((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                }
                required
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Description</label>
            <input
              type="text"
              value={currentCat.description || ""}
              onChange={(e) => setCurrentCat((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
            />
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
              Save
            </button>
          </div>
        </form>
      )}

      <div className="p-6 rounded-3xl bg-[#111111] border border-zinc-800">
        {isLoading ? (
          <div className="py-12 text-center">
            <RefreshCw className="w-6 h-6 text-[#D6A64B] animate-spin mx-auto" />
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {categories.map((cat) => (
              <div key={cat.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{cat.name}</h4>
                  <p className="text-xs text-zinc-500 font-mono">slug: {cat.slug}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-[#D6A64B] text-zinc-300 hover:text-[#080808]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-800 text-red-400 hover:text-white"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

