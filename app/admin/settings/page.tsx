"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, RefreshCw, Sparkles, Building2, Phone, Mail, MapPin } from "lucide-react";
import { SiteSettings } from "@/lib/types/database";

export default function WebsiteSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success) setSettings(data.data || {});
    } catch {
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Website settings updated across the site!");
      } else {
        toast.error("Failed to update settings");
      }
    } catch {
      toast.error("Error saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <RefreshCw className="w-8 h-8 text-[#D6A64B] animate-spin mx-auto mb-2" />
        <p className="text-xs text-zinc-400">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Website Settings</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Global agency brand parameters, communication channels, and office metadata.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A64B] via-[#E8C477] to-[#D6A64B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving..." : "Save Settings"}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-6 text-xs">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white border-l-2 border-[#D6A64B] pl-2.5">
            Agency Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Agency Name</label>
              <input
                type="text"
                value={settings.agency_name || ""}
                onChange={(e) => setSettings((prev) => ({ ...prev, agency_name: e.target.value }))}
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Official Tagline</label>
              <input
                type="text"
                value={settings.tagline || ""}
                onChange={(e) => setSettings((prev) => ({ ...prev, tagline: e.target.value }))}
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <h3 className="text-sm font-bold text-white border-l-2 border-[#D6A64B] pl-2.5">
            Communication & Contacts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Contact Email</label>
              <input
                type="email"
                value={settings.contact_email || ""}
                onChange={(e) => setSettings((prev) => ({ ...prev, contact_email: e.target.value }))}
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Telephone</label>
              <input
                type="text"
                value={settings.phone_number || ""}
                onChange={(e) => setSettings((prev) => ({ ...prev, phone_number: e.target.value }))}
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">WhatsApp Line</label>
              <input
                type="text"
                value={settings.whatsapp_number || ""}
                onChange={(e) => setSettings((prev) => ({ ...prev, whatsapp_number: e.target.value }))}
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Physical Office Address</label>
              <textarea
                rows={2}
                value={settings.office_address || ""}
                onChange={(e) => setSettings((prev) => ({ ...prev, office_address: e.target.value }))}
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
            <div>
              <label className="font-semibold text-zinc-300 block mb-1">Business Hours</label>
              <textarea
                rows={2}
                value={settings.business_hours || ""}
                onChange={(e) => setSettings((prev) => ({ ...prev, business_hours: e.target.value }))}
                className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <h3 className="text-sm font-bold text-white border-l-2 border-[#D6A64B] pl-2.5">
            Embeds & Footers
          </h3>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Google Maps Embed URL</label>
            <input
              type="text"
              value={settings.google_maps_embed || ""}
              onChange={(e) => setSettings((prev) => ({ ...prev, google_maps_embed: e.target.value }))}
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>

          <div>
            <label className="font-semibold text-zinc-300 block mb-1">Footer Copyright String</label>
            <input
              type="text"
              value={settings.footer_copyright || ""}
              onChange={(e) => setSettings((prev) => ({ ...prev, footer_copyright: e.target.value }))}
              className="w-full bg-[#080808] border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D6A64B]"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-xl bg-[#D6A64B] text-[#080808] font-bold uppercase tracking-wider hover:bg-[#E8C477]"
          >
            {isSaving ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

