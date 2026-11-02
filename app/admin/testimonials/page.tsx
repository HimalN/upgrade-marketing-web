"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X, Star, CheckCircle, EyeOff, RefreshCw } from "lucide-react";
import { Testimonial } from "@/lib/types/database";
import Image from "next/image";

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTst, setCurrentTst] = useState<Partial<Testimonial>>({});

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (data.success) setTestimonials(data.data || []);
    } catch {
      toast.error("Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    setCurrentTst({
      client_name: "",
      designation: "CEO",
      company_name: "",
      client_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      feedback: "",
      is_approved: true,
      display_order: testimonials.length + 1,
    });
    setIsEditing(true);
  };

  const handleEdit = (tst: Testimonial) => {
    setCurrentTst(tst);
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Testimonial removed");
        fetchTestimonials();
      }
    } catch {
      toast.error("Failed to delete testimonial");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentTst.client_name || !currentTst.feedback) {
      toast.error("Client name and feedback required");
      return;
    }

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentTst),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Testimonial saved!");
        setIsEditing(false);
        fetchTestimonials();
      }
    } catch {
      toast.error("Error saving testimonial");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Testimonials Management</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Approve, edit, or add verified client reviews and ratings.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:bg-[#E8C477]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded-3xl bg-[#111111] border border-[#D6A64B] space-y-4 text-xs"
        >
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="font-bold text-white text-base">Testimonial Entry</h3>
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
              <label className="font-semibold text-zinc-300 block mb-1">Client Name</label>
              <input
                type="text"
                value={currentTst.client_name || ""}
                onChange={(e) =>
                  setCurrentTst((prev) => ({ ...prev, client_name: e.target.value }))
                }
                required
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Company</label>
              <input
                type="text"
                value={currentTst.company_name || ""}
                onChange={(e) =>
                  setCurrentTst((prev) => ({ ...prev, company_name: e.target.value }))
                }
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Designation</label>
              <input
                type="text"
                value={currentTst.designation || ""}
                onChange={(e) =>
                  setCurrentTst((prev) => ({ ...prev, designation: e.target.value }))
                }
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Client Avatar Image URL</label>
            <input
              type="text"
              value={currentTst.client_image || ""}
              onChange={(e) =>
                setCurrentTst((prev) => ({ ...prev, client_image: e.target.value }))
              }
              className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Feedback Quote</label>
            <textarea
              rows={4}
              value={currentTst.feedback || ""}
              onChange={(e) =>
                setCurrentTst((prev) => ({ ...prev, feedback: e.target.value }))
              }
              required
              className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Rating (1 to 5)</label>
              <select
                value={currentTst.rating || 5}
                onChange={(e) =>
                  setCurrentTst((prev) => ({ ...prev, rating: parseInt(e.target.value) }))
                }
                className="bg-[#080808] border border-zinc-800 rounded-lg px-3 py-1.5 text-white"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-4">
              <input
                type="checkbox"
                checked={currentTst.is_approved ?? true}
                onChange={(e) =>
                  setCurrentTst((prev) => ({ ...prev, is_approved: e.target.checked }))
                }
                className="w-4 h-4 accent-[#D6A64B] rounded"
              />
              <span className="font-semibold text-white">Approved for Public Display</span>
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
              Save Testimonial
            </button>
          </div>
        </form>
      )}

      {/* Testimonials List */}
      <div className="space-y-4">
        {testimonials.map((tst) => (
          <div
            key={tst.id}
            className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-zinc-800">
                <Image src={tst.client_image} alt={tst.client_name} fill sizes="48px" className="object-cover" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm">{tst.client_name}</h4>
                  <span className="text-xs text-zinc-400">({tst.company_name})</span>
                  <div className="flex items-center gap-0.5 text-[#D6A64B]">
                    {[...Array(tst.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#D6A64B]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-zinc-300 italic max-w-xl">&ldquo;{tst.feedback}&rdquo;</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => handleEdit(tst)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-[#D6A64B] text-zinc-300 hover:text-black"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(tst.id, tst.client_name)}
                className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-800 text-red-400 hover:text-white"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

