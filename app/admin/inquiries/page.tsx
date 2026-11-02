"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  RefreshCw,
  X,
  Mail,
  Phone,
  Building2,
  Calendar,
} from "lucide-react";
import { ContactInquiry, InquiryStatus } from "@/lib/types/database";
import { formatDate } from "@/lib/utils";

const STATUS_OPTIONS: InquiryStatus[] = [
  "New",
  "Contacted",
  "In Discussion",
  "Proposal Sent",
  "Converted",
  "Closed",
];

export default function InquiriesManagementPage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      if (data.success) setInquiries(data.data || []);
    } catch {
      toast.error("Failed to load inquiries");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Status updated to "${newStatus}"`);
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Inquiry removed");
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch {
      toast.error("Failed to delete inquiry");
    }
  };

  const exportCSV = () => {
    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Company",
      "Service",
      "Budget",
      "Status",
      "Received Date",
      "Description",
    ];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.full_name}"`,
      `"${i.email}"`,
      `"${i.phone_number || ""}"`,
      `"${i.company_name || ""}"`,
      `"${i.service_interested}"`,
      `"${i.estimated_budget || ""}"`,
      i.status,
      i.created_at,
      `"${(i.project_description || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `upgrade_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported inquiries to CSV");
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inq.full_name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        (inq.company_name && inq.company_name.toLowerCase().includes(q)) ||
        inq.service_interested.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [inquiries, statusFilter, searchQuery]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Contact Inquiries</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Incoming prospect inquiries, briefs, and sales pipeline status.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-5 py-2.5 rounded-xl bg-[#171717] border border-[#D6A64B]/40 hover:border-[#D6A64B] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4 text-[#D6A64B]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#111111] border border-zinc-800">
        <div className="flex flex-wrap items-center gap-2">
          {["All", ...STATUS_OPTIONS].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                statusFilter === status
                  ? "bg-[#D6A64B] text-[#080808]"
                  : "bg-[#171717] text-zinc-400 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full bg-[#080808] border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D6A64B]"
          />
        </div>
      </div>

      {/* Detail Drawer / Modal */}
      {selectedInquiry && (
        <div className="p-8 rounded-3xl bg-[#111111] border-2 border-[#D6A64B] shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#D6A64B]">
                INQUIRY DOSSIER
              </span>
              <h2 className="text-xl font-bold text-white">{selectedInquiry.full_name}</h2>
            </div>
            <button
              onClick={() => setSelectedInquiry(null)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#080808] border border-zinc-800 space-y-1">
              <span className="text-zinc-500 font-semibold">Corporate Email</span>
              <p className="text-white font-medium flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D6A64B]" />
                <a href={`mailto:${selectedInquiry.email}`} className="hover:underline">
                  {selectedInquiry.email}
                </a>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-zinc-800 space-y-1">
              <span className="text-zinc-500 font-semibold">Phone / WhatsApp</span>
              <p className="text-white font-medium flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D6A64B]" />
                <span>{selectedInquiry.phone_number || "Not provided"}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-zinc-800 space-y-1">
              <span className="text-zinc-500 font-semibold">Company</span>
              <p className="text-white font-medium flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#D6A64B]" />
                <span>{selectedInquiry.company_name || "Confidential"}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-zinc-800 space-y-1">
              <span className="text-zinc-500 font-semibold">Current Pipeline Status</span>
              <select
                value={selectedInquiry.status}
                onChange={(e) =>
                  handleStatusChange(selectedInquiry.id, e.target.value as InquiryStatus)
                }
                className="w-full bg-[#111111] border border-[#D6A64B]/40 rounded-lg px-2 py-1 text-xs text-[#E8C477] font-bold"
              >
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#080808] border border-zinc-800 space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
              <span className="text-[#E8C477] font-bold">
                Interested in: {selectedInquiry.service_interested}
              </span>
              <span>Budget Bracket: {selectedInquiry.estimated_budget || "Undisclosed"}</span>
            </div>
            <h4 className="font-semibold text-white pt-2">Project Briefing & Description:</h4>
            <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
              {selectedInquiry.project_description}
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
            >
              Close Dossier
            </button>
            <a
              href={`mailto:${selectedInquiry.email}?subject=Regarding Your Inquiry with Upgrade Marketing Agency`}
              className="px-5 py-2.5 rounded-xl bg-[#D6A64B] text-[#080808] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Reply via Email</span>
            </a>
          </div>
        </div>
      )}

      {/* Inquiries Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-zinc-800">
        {isLoading ? (
          <div className="py-16 text-center">
            <RefreshCw className="w-8 h-8 text-[#D6A64B] animate-spin mx-auto mb-2" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#171717] text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-white block">{inq.full_name}</span>
                      <span className="text-[10px] text-zinc-500">
                        {inq.company_name || "Individual"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-400">
                      <span>{inq.email}</span>
                      {inq.phone_number && (
                        <span className="block text-[10px] text-zinc-500">{inq.phone_number}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#E8C477]">{inq.service_interested}</td>
                    <td className="py-3 px-4">{inq.estimated_budget || "—"}</td>
                    <td className="py-3 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleStatusChange(inq.id, e.target.value as InquiryStatus)
                        }
                        className="bg-[#080808] border border-zinc-800 rounded px-2 py-1 text-[11px] text-[#E8C477] font-semibold"
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-zinc-500">{formatDate(inq.created_at)}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-[#D6A64B] text-zinc-300 hover:text-black"
                        title="View Full Brief"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-800 text-red-400 hover:text-white"
                        title="Delete Inquiry"
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

