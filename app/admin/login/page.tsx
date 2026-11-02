"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@upgrademarketing.agency");
  const [password, setPassword] = useState("UpgradeMaster2026!");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Welcome back! Redirecting to CMS dashboard...");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error(data.message || "Invalid credentials. Please verify your email and password.");
      }
    } catch {
      toast.error("Network error during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D6A64B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-8">
        {/* Brand Logo & Title */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block group">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#D6A64B]/50 shadow-[0_0_30px_rgba(214,166,75,0.3)] mx-auto group-hover:border-[#E8C477] transition-all">
              <Image src="/images/logo.png" alt="Upgrade Logo" fill sizes="64px" className="object-cover" priority />
            </div>
          </Link>

          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">UPGRADE CMS PORTAL</h1>
            <p className="text-xs text-[#D6A64B] uppercase tracking-widest font-bold mt-1">
              Administrative Control Center
            </p>
          </div>
        </div>

        {/* Demo Credentials Alert Pill */}
        <div className="p-4 rounded-2xl bg-[#141414] border border-[#D6A64B]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E8C477]">
            <KeyRound className="w-4 h-4" />
            <span>Pre-Configured Master Credentials:</span>
          </div>
          <div className="text-xs text-zinc-300 font-mono space-y-0.5 pl-6">
            <p>Email: <span className="text-white">admin@upgrademarketing.agency</span></p>
            <p>Password: <span className="text-white">UpgradeMaster2026!</span></p>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="p-8 rounded-3xl bg-[#111111] border border-[rgba(214,166,75,0.25)] shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@upgrademarketing.agency"
                  required
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#D6A64B] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Master Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#080808] border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#D6A64B] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5DFA9] via-[#D6A64B] to-[#99732B] text-[#080808] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(214,166,75,0.3)] hover:shadow-[0_0_35px_rgba(214,166,75,0.5)] transition-all disabled:opacity-50"
            >
              <span>{isLoading ? "Authenticating Master Session..." : "Authorize & Enter Console"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>

        {/* Security watermark */}
        <div className="flex items-center justify-center gap-2 text-xs text-zinc-600">
          <ShieldCheck className="w-4 h-4 text-[#D6A64B]" />
          <span>Encrypted Session • Role-Based Access Control</span>
        </div>
      </div>
    </div>
  );
}

