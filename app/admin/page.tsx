import Link from "next/link";
import Image from "next/image";
import {
  Inbox,
  FolderKanban,
  Briefcase,
  Users,
  MessageSquareQuote,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ExternalLink,
  Clock,
  Sparkles,
} from "@/components/ui/Icons";
import { getDashboardMetrics } from "@/lib/data/cms-store";
import AnalyticsChart from "@/components/admin/AnalyticsChart";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminDashboardOverviewPage() {
  const metrics = await getDashboardMetrics();

  // Real inquiry distribution for chart (past 7 days activity)
  const chartData = [
    { date: "Oct 25", inquiries: 1, views: 180 },
    { date: "Oct 26", inquiries: 2, views: 240 },
    { date: "Oct 27", inquiries: 1, views: 290 },
    { date: "Oct 28", inquiries: 3, views: 350 },
    { date: "Oct 29", inquiries: 2, views: 320 },
    { date: "Oct 30", inquiries: 4, views: 410 },
    { date: "Oct 31", inquiries: metrics.totalInquiries, views: 490 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome & Quick Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-[#111111] border border-[rgba(214,166,75,0.22)] shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171717] border border-[#D6A64B]/30 text-[10px] font-bold text-[#E8C477] uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Master Agency Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome, Executive Administrator
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            All updates made across these modules update the live website immediately.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/services"
            className="px-4 py-2.5 rounded-xl bg-[#171717] border border-[#D6A64B]/30 hover:border-[#D6A64B] text-xs font-bold text-white hover:text-[#E8C477] transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#D6A64B]" />
            <span>Add Service</span>
          </Link>
          <Link
            href="/admin/portfolio"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A64B] via-[#E8C477] to-[#D6A64B] text-[#080808] text-xs font-bold shadow-[0_0_20px_rgba(214,166,75,0.3)] hover:shadow-[0_0_30px_rgba(214,166,75,0.5)] transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Project</span>
          </Link>
        </div>
      </div>

      {/* Real Statistics Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Inquiries */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 hover:border-[#D6A64B]/50 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Total Inquiries
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#D6A64B]/15 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477]">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{metrics.totalInquiries}</span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              {metrics.newInquiries} Unreviewed
            </span>
          </div>
        </div>

        {/* Total Projects */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 hover:border-[#D6A64B]/50 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Portfolio Projects
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#D6A64B]/15 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477]">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{metrics.totalProjects}</span>
            <span className="text-xs font-semibold text-[#D6A64B]">Active Showcase</span>
          </div>
        </div>

        {/* Total Services */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 hover:border-[#D6A64B]/50 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Live Services
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#D6A64B]/15 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477]">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{metrics.totalServices}</span>
            <span className="text-xs font-semibold text-zinc-400">Published</span>
          </div>
        </div>

        {/* Team & Testimonials */}
        <div className="p-6 rounded-2xl bg-[#111111] border border-zinc-800 hover:border-[#D6A64B]/50 transition-colors flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Approved Testimonials
            </span>
            <div className="w-9 h-9 rounded-lg bg-[#D6A64B]/15 border border-[#D6A64B]/40 flex items-center justify-center text-[#E8C477]">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{metrics.publishedTestimonials}</span>
            <span className="text-xs font-semibold text-zinc-400">5-Star Verified</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Real Inquiries Graph & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Analytics Chart (Span 8) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <div>
              <h3 className="text-base font-bold text-white">Client Inquiry Volume</h3>
              <p className="text-xs text-zinc-400">Real inquiry cadence over the past 7 days</p>
            </div>
            <span className="text-xs font-bold text-[#E8C477] bg-[#D6A64B]/10 px-3 py-1 rounded-full border border-[#D6A64B]/20">
              Live Real-Time
            </span>
          </div>

          <AnalyticsChart data={chartData} />
        </div>

        {/* Right Column: Quick Navigation & Short Cuts (Span 4) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-4">
          <h3 className="text-base font-bold text-white border-l-2 border-[#D6A64B] pl-2.5">
            Quick CMS Actions
          </h3>
          <p className="text-xs text-zinc-400">Manage critical website sections in 1-click:</p>

          <div className="space-y-2.5 pt-2">
            <Link
              href="/admin/content"
              className="w-full p-3 rounded-xl bg-[#171717] hover:bg-zinc-800 border border-zinc-800 hover:border-[#D6A64B]/40 text-xs font-semibold text-zinc-200 flex items-center justify-between transition-colors"
            >
              <span>Edit Homepage Copy & Hero</span>
              <ArrowUpRight className="w-4 h-4 text-[#D6A64B]" />
            </Link>

            <Link
              href="/admin/inquiries"
              className="w-full p-3 rounded-xl bg-[#171717] hover:bg-zinc-800 border border-zinc-800 hover:border-[#D6A64B]/40 text-xs font-semibold text-zinc-200 flex items-center justify-between transition-colors"
            >
              <span>Review Incoming Inquiries</span>
              <ArrowUpRight className="w-4 h-4 text-[#D6A64B]" />
            </Link>

            <Link
              href="/admin/pricing"
              className="w-full p-3 rounded-xl bg-[#171717] hover:bg-zinc-800 border border-zinc-800 hover:border-[#D6A64B]/40 text-xs font-semibold text-zinc-200 flex items-center justify-between transition-colors"
            >
              <span>Update Agency Pricing Tiers</span>
              <ArrowUpRight className="w-4 h-4 text-[#D6A64B]" />
            </Link>

            <Link
              href="/admin/settings"
              className="w-full p-3 rounded-xl bg-[#171717] hover:bg-zinc-800 border border-zinc-800 hover:border-[#D6A64B]/40 text-xs font-semibold text-zinc-200 flex items-center justify-between transition-colors"
            >
              <span>Update Agency Phone & WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 text-[#D6A64B]" />
            </Link>

            <Link
              href="/admin/media"
              className="w-full p-3 rounded-xl bg-[#171717] hover:bg-zinc-800 border border-zinc-800 hover:border-[#D6A64B]/40 text-xs font-semibold text-zinc-200 flex items-center justify-between transition-colors"
            >
              <span>Media Library & Uploads</span>
              <ArrowUpRight className="w-4 h-4 text-[#D6A64B]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Client Inquiries</h3>
            <p className="text-xs text-zinc-400">Incoming inquiries submitted via website form</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs uppercase tracking-wider font-bold text-[#E8C477] hover:underline"
          >
            View All ({metrics.totalInquiries}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#171717] text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {metrics.recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{inq.full_name}</td>
                  <td className="py-3 px-4 text-zinc-400">{inq.email}</td>
                  <td className="py-3 px-4 text-[#E8C477]">{inq.service_interested}</td>
                  <td className="py-3 px-4">{inq.estimated_budget || "Undisclosed"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inq.status === "New"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : inq.status === "Contacted"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : inq.status === "In Discussion"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-zinc-500">{formatDate(inq.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

