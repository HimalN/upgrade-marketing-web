"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  RefreshCw,
  X,
  Save,
  Star,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import { Project, ProjectCategory } from "@/lib/types/database";
import { slugify } from "@/lib/utils";
import Image from "next/image";

export default function PortfolioManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [galleryText, setGalleryText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [projRes, catRes] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/categories"),
      ]);
      const projData = await projRes.json();
      const catData = await catRes.json();
      if (projData.success) setProjects(projData.data || []);
      if (catData.success) setCategories(catData.data || []);
    } catch {
      toast.error("Failed to load portfolio data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    const defaultCat = categories[0]?.id || "cat-branding";
    setCurrentProject({
      title: "",
      slug: "",
      client_name: "",
      category_id: defaultCat,
      short_description: "",
      full_description: "",
      objectives: "",
      approach: "",
      results: "",
      cover_image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
      gallery_images: [],
      completion_date: new Date().toISOString().split("T")[0],
      is_featured: true,
      is_published: true,
      display_order: projects.length + 1,
    });
    setGalleryText("");
    setIsEditing(true);
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setGalleryText((project.gallery_images || []).join("\n"));
    setIsEditing(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Project "${title}" deleted.`);
        fetchData();
      } else {
        toast.error("Failed to delete project");
      }
    } catch {
      toast.error("Error deleting project");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject.title || !currentProject.category_id) {
      toast.error("Please enter project title and select category");
      return;
    }

    const slug = currentProject.slug || slugify(currentProject.title);
    const gallery_images = galleryText
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentProject,
          slug,
          gallery_images,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Project saved successfully!");
        setIsEditing(false);
        fetchData();
      } else {
        toast.error(data.message || "Failed to save project");
      }
    } catch {
      toast.error("Error submitting project");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Portfolio Management</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Publish client case studies, objectives, approach, results, and galleries.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A64B] via-[#E8C477] to-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Project</span>
        </button>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="p-8 rounded-3xl bg-[#111111] border-2 border-[#D6A64B] shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <h2 className="text-xl font-bold text-white">
              {currentProject.id ? "Edit Case Study" : "Publish New Case Study"}
            </h2>
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">
                  Project Title <span className="text-[#D6A64B]">*</span>
                </label>
                <input
                  type="text"
                  value={currentProject.title || ""}
                  onChange={(e) =>
                    setCurrentProject((prev) => ({
                      ...prev,
                      title: e.target.value,
                      slug: prev.slug ? prev.slug : slugify(e.target.value),
                    }))
                  }
                  required
                  placeholder="e.g. Aura Haute Parfumerie"
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Client Name</label>
                <input
                  type="text"
                  value={currentProject.client_name || ""}
                  onChange={(e) =>
                    setCurrentProject((prev) => ({ ...prev, client_name: e.target.value }))
                  }
                  required
                  placeholder="e.g. Aura Fragrances Paris"
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Category</label>
                <select
                  value={currentProject.category_id || ""}
                  onChange={(e) =>
                    setCurrentProject((prev) => ({ ...prev, category_id: e.target.value }))
                  }
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">URL Slug</label>
                <input
                  type="text"
                  value={currentProject.slug || ""}
                  onChange={(e) =>
                    setCurrentProject((prev) => ({ ...prev, slug: slugify(e.target.value) }))
                  }
                  required
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Live URL (Optional)</label>
                <input
                  type="url"
                  value={currentProject.live_url || ""}
                  onChange={(e) =>
                    setCurrentProject((prev) => ({ ...prev, live_url: e.target.value }))
                  }
                  placeholder="https://clientwebsite.com"
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Completion Date</label>
                <input
                  type="date"
                  value={currentProject.completion_date || ""}
                  onChange={(e) =>
                    setCurrentProject((prev) => ({ ...prev, completion_date: e.target.value }))
                  }
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Cover Image URL</label>
              <input
                type="text"
                value={currentProject.cover_image || ""}
                onChange={(e) =>
                  setCurrentProject((prev) => ({ ...prev, cover_image: e.target.value }))
                }
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Short Summary (For Cards)</label>
              <textarea
                rows={2}
                value={currentProject.short_description || ""}
                onChange={(e) =>
                  setCurrentProject((prev) => ({ ...prev, short_description: e.target.value }))
                }
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Full Detailed Narrative</label>
              <textarea
                rows={4}
                value={currentProject.full_description || ""}
                onChange={(e) =>
                  setCurrentProject((prev) => ({ ...prev, full_description: e.target.value }))
                }
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Objectives</label>
                <textarea
                  rows={3}
                  value={currentProject.objectives || ""}
                  onChange={(e) =>
                    setCurrentProject((prev) => ({ ...prev, objectives: e.target.value }))
                  }
                  placeholder="Key targets and benchmarks..."
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Creative Approach</label>
                <textarea
                  rows={3}
                  value={currentProject.approach || ""}
                  onChange={(e) =>
                    setCurrentProject((prev) => ({ ...prev, approach: e.target.value }))
                  }
                  placeholder="Design decisions, aesthetic..."
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Final Results / ROI</label>
                <textarea
                  rows={3}
                  value={currentProject.results || ""}
                  onChange={(e) =>
                    setCurrentProject((prev) => ({ ...prev, results: e.target.value }))
                  }
                  placeholder="Metrics, sales lift, awards..."
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-zinc-300 block mb-1">
                Gallery Image URLs (One URL per line)
              </label>
              <textarea
                rows={3}
                value={galleryText}
                onChange={(e) => setGalleryText(e.target.value)}
                placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentProject.is_featured ?? false}
                  onChange={(e) =>
                    setCurrentProject((prev) => ({ ...prev, is_featured: e.target.checked }))
                  }
                  className="w-4 h-4 accent-[#D6A64B] rounded"
                />
                <span className="font-semibold text-white">Feature on Homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentProject.is_published ?? true}
                  onChange={(e) =>
                    setCurrentProject((prev) => ({ ...prev, is_published: e.target.checked }))
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
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-4">
        {isLoading ? (
          <div className="py-16 text-center">
            <RefreshCw className="w-8 h-8 text-[#D6A64B] animate-spin mx-auto mb-2" />
            <p className="text-xs text-zinc-400">Loading portfolio...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171717] text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-3">
                      <div className="relative w-12 h-8 rounded-lg overflow-hidden shrink-0 border border-zinc-800">
                        <Image
                          src={proj.cover_image}
                          alt={proj.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span>{proj.title}</span>
                        <span className="block text-[10px] text-zinc-500 font-mono">
                          /portfolio/{proj.slug}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-zinc-300">{proj.client_name}</td>
                    <td className="py-3 px-4 text-[#E8C477]">{proj.category_name}</td>
                    <td className="py-3 px-4">
                      {proj.is_featured ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D6A64B] bg-[#D6A64B]/10 px-2 py-0.5 rounded border border-[#D6A64B]/30">
                          <Star className="w-3 h-3 fill-[#D6A64B]" />
                          <span>Featured</span>
                        </span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {proj.is_published ? (
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
                        onClick={() => handleEdit(proj)}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-[#D6A64B] text-zinc-300 hover:text-[#080808] transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-800 text-red-400 hover:text-white transition-colors"
                        title="Delete Project"
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

