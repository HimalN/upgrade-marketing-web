"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FolderKanban,
  Tags,
  Users,
  MessageSquareQuote,
  DollarSign,
  HelpCircle,
  Inbox,
  Building,
  Image as ImageIcon,
  Compass,
  Share2,
  Settings,
  Search,
  UserCheck,
  User,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SIDEBAR_ITEMS = [
  { label: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Website Content", href: "/admin/content", icon: FileText },
  { label: "Services Management", href: "/admin/services", icon: Briefcase },
  { label: "Portfolio Management", href: "/admin/portfolio", icon: FolderKanban },
  { label: "Project Categories", href: "/admin/categories", icon: Tags },
  { label: "Team Management", href: "/admin/team", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Pricing & Packages", href: "/admin/pricing", icon: DollarSign },
  { label: "FAQ Management", href: "/admin/faqs", icon: HelpCircle },
  { label: "Contact Inquiries", href: "/admin/inquiries", icon: Inbox },
  { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  { label: "Website Settings", href: "/admin/settings", icon: Settings },
  { label: "SEO Management", href: "/admin/seo", icon: Search },
  { label: "User Management", href: "/admin/users", icon: UserCheck },
  { label: "Profile", href: "/admin/profile", icon: User },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, don't show admin sidebar/header
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0d0d0d] border-r border-[rgba(214,166,75,0.2)] flex flex-col transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-zinc-800/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#D6A64B]/40 shadow-[0_0_15px_rgba(214,166,75,0.2)]">
              <Image src="/images/logo.png" alt="Logo" fill sizes="40px" className="object-cover" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider text-white block">
                UPGRADE CMS
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#D6A64B] font-bold">
                Admin Console
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Site Quick Link */}
        <div className="p-4 border-b border-zinc-800/60">
          <Link
            href="/"
            target="_blank"
            className="w-full px-3.5 py-2 rounded-xl bg-[#171717] hover:bg-[#1f1f1f] border border-zinc-800 text-xs font-semibold text-zinc-300 flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>View Live Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors",
                  isActive
                    ? "bg-[#D6A64B] text-[#080808] font-bold shadow-[0_0_15px_rgba(214,166,75,0.25)]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-[#080808]" : "text-[#E8C477]")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer with Logout */}
        <div className="p-4 border-t border-zinc-800/80">
          <button
            onClick={handleLogout}
            className="w-full px-3.5 py-2.5 rounded-xl bg-red-950/30 hover:bg-red-900/40 border border-red-900/40 text-xs font-bold text-red-400 flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[rgba(214,166,75,0.18)] px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
              <span>Admin Console</span>
              <span>/</span>
              <span className="text-[#E8C477] font-semibold capitalize">
                {pathname.replace("/admin", "").replace("/", "") || "Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30 text-xs text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-[#E8C477]" />
              <span>Full CMS Mode Active</span>
            </div>

            {/* Admin Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-[#D6A64B] text-[#080808] font-bold text-xs flex items-center justify-center shadow-md">
                UA
              </div>
              <div className="hidden md:block text-left">
                <span className="text-xs font-bold text-white block leading-tight">
                  Super Administrator
                </span>
                <span className="text-[10px] text-zinc-500">Master Access</span>
              </div>
            </div>
          </div>
        </header>

        {/* Child Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

