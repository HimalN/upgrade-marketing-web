"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, X, RefreshCw } from "lucide-react";
import { TeamMember } from "@/lib/types/database";
import Image from "next/image";

export default function TeamManagementPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<Partial<TeamMember>>({});
  const [skillsText, setSkillsText] = useState("");

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      if (data.success) setTeam(data.data || []);
    } catch {
      toast.error("Failed to load team");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    setCurrentMember({
      name: "",
      designation: "",
      bio: "",
      profile_photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      skills: [],
      linkedin_url: "https://linkedin.com",
      is_active: true,
      display_order: team.length + 1,
    });
    setSkillsText("");
    setIsEditing(true);
  };

  const handleEdit = (member: TeamMember) => {
    setCurrentMember(member);
    setSkillsText((member.skills || []).join(", "));
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove "${name}" from team?`)) return;
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Removed "${name}"`);
        fetchTeam();
      }
    } catch {
      toast.error("Failed to remove member");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMember.name || !currentMember.designation) {
      toast.error("Name and designation required");
      return;
    }

    const skills = skillsText.split(",").map((s) => s.trim()).filter(Boolean);

    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentMember, skills }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Team member saved!");
        setIsEditing(false);
        fetchTeam();
      }
    } catch {
      toast.error("Error saving team member");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Team Management</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage agency partners, executive creative directors, and bios.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-2.5 rounded-xl bg-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:bg-[#E8C477]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {isEditing && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded-3xl bg-[#111111] border border-[#D6A64B] space-y-4 text-xs"
        >
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="font-bold text-white text-base">Team Member Profile</h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={currentMember.name || ""}
                onChange={(e) => setCurrentMember((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Designation</label>
              <input
                type="text"
                value={currentMember.designation || ""}
                onChange={(e) =>
                  setCurrentMember((prev) => ({ ...prev, designation: e.target.value }))
                }
                required
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Profile Photo URL</label>
            <input
              type="text"
              value={currentMember.profile_photo || ""}
              onChange={(e) =>
                setCurrentMember((prev) => ({ ...prev, profile_photo: e.target.value }))
              }
              className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Biography</label>
            <textarea
              rows={3}
              value={currentMember.bio || ""}
              onChange={(e) => setCurrentMember((prev) => ({ ...prev, bio: e.target.value }))}
              className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Skills (Comma-separated)</label>
            <input
              type="text"
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="Creative Direction, Brand Strategy, 3D WebGL"
              className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={currentMember.linkedin_url || ""}
                onChange={(e) =>
                  setCurrentMember((prev) => ({ ...prev, linkedin_url: e.target.value }))
                }
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Twitter / X URL</label>
              <input
                type="text"
                value={currentMember.twitter_url || ""}
                onChange={(e) =>
                  setCurrentMember((prev) => ({ ...prev, twitter_url: e.target.value }))
                }
                className="w-full bg-[#080808] border border-zinc-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
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
              Save Member
            </button>
          </div>
        </form>
      )}

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="p-6 rounded-3xl bg-[#111111] border border-zinc-800 flex items-start gap-4"
          >
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-zinc-800">
              <Image src={member.profile_photo} alt={member.name} fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-bold text-white text-sm">{member.name}</h4>
              <p className="text-xs text-[#E8C477]">{member.designation}</p>
              <p className="text-[11px] text-zinc-400 line-clamp-2">{member.bio}</p>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="p-1 rounded bg-zinc-800 hover:bg-[#D6A64B] text-zinc-300 hover:text-black"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(member.id, member.name)}
                  className="p-1 rounded bg-red-950/40 hover:bg-red-800 text-red-400 hover:text-white"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

