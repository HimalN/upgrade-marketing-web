"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X, RefreshCw } from "lucide-react";
import { Faq } from "@/lib/types/database";

export default function FaqsManagementPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Partial<Faq>>({});

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/faqs");
      const data = await res.json();
      if (data.success) setFaqs(data.data || []);
    } catch {
      toast.error("Failed to load FAQs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    setCurrentFaq({
      question: "",
      answer: "",
      category: "General",
      is_active: true,
      display_order: faqs.length + 1,
    });
    setIsEditing(true);
  };

  const handleEdit = (faq: Faq) => {
    setCurrentFaq(faq);
    setIsEditing(true);
  };

  const handleDelete = async (id: string, question: string) => {
    if (!confirm(`Delete question "${question}"?`)) return;
    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("FAQ deleted");
        fetchFaqs();
      }
    } catch {
      toast.error("Failed to delete FAQ");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFaq.question || !currentFaq.answer) {
      toast.error("Question and answer required");
      return;
    }

    try {
      const res = await fetch("/api/admin/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentFaq),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("FAQ saved!");
        setIsEditing(false);
        fetchFaqs();
      }
    } catch {
      toast.error("Error saving FAQ");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">FAQ Management</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Answer common client questions regarding timelines, deliverables, and payment.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:bg-[#E8C477]"
        >
          <Plus className="w-4 h-4" />
          <span>New FAQ</span>
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded-3xl bg-[#111111] border border-[#D6A64B] space-y-4 text-xs"
        >
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="font-bold text-white text-base">FAQ Entry</h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="font-semibold text-zinc-300 block mb-1">Question</label>
              <input
                type="text"
                value={currentFaq.question || ""}
                onChange={(e) => setCurrentFaq((prev) => ({ ...prev, question: e.target.value }))}
                required
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Category</label>
              <input
                type="text"
                value={currentFaq.category || "General"}
                onChange={(e) => setCurrentFaq((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Answer</label>
            <textarea
              rows={4}
              value={currentFaq.answer || ""}
              onChange={(e) => setCurrentFaq((prev) => ({ ...prev, answer: e.target.value }))}
              required
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
              Save Question
            </button>
          </div>
        </form>
      )}

      {/* FAQs List */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 flex items-start justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6A64B] bg-[#D6A64B]/10 px-2 py-0.5 rounded">
                  {faq.category}
                </span>
                <h4 className="font-bold text-white text-sm">{faq.question}</h4>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed pt-1">{faq.answer}</p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => handleEdit(faq)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-[#D6A64B] text-zinc-300 hover:text-black"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(faq.id, faq.question)}
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

