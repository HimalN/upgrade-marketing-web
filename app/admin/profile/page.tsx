"use client";

import { useState } from "react";
import { toast } from "sonner";
import { User, Lock, Mail, Save, ShieldCheck } from "lucide-react";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({
    name: "Alexander Vance",
    email: "admin@upgrademarketing.agency",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.newPassword && profile.newPassword !== profile.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile credentials updated successfully!");
      setProfile((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    }, 600);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Administrator Profile</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Manage your personal executive credentials and security settings.
        </p>
      </div>

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-6 text-xs">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white border-l-2 border-[#D6A64B] pl-2.5">
            Identity Details
          </h3>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
              required
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Master Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
              required
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <h3 className="text-sm font-bold text-white border-l-2 border-[#D6A64B] pl-2.5">
            Change Master Password
          </h3>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Current Password</label>
            <input
              type="password"
              value={profile.currentPassword}
              onChange={(e) => setProfile((prev) => ({ ...prev, currentPassword: e.target.value }))}
              placeholder="••••••••••••"
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">New Password</label>
              <input
                type="password"
                value={profile.newPassword}
                onChange={(e) => setProfile((prev) => ({ ...prev, newPassword: e.target.value }))}
                placeholder="••••••••••••"
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Confirm New Password</label>
              <input
                type="password"
                value={profile.confirmPassword}
                onChange={(e) => setProfile((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="••••••••••••"
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#D6A64B] text-[#080808] font-bold uppercase tracking-wider hover:bg-[#E8C477] transition-all"
          >
            {isSaving ? "Updating..." : "Update Credentials"}
          </button>
        </div>
      </form>
    </div>
  );
}

